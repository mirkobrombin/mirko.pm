---
title: '#howto - Abilitare la compressione Brotli in Nginx (build) su Centos 7'
published: 2019-06-19
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  - centos  - github
---
In questa guida vediamo come installare e abilitare la compressione Brotli, su installazioni compilate di Nginx per Centos 7.

> Attenzione, nel caso in cui la tua installazione di Nginx non è stata compilata manualmente, prosegui la lettura su [questa guida](https://linuxhub.it/articles/howto-abilitare-la-compressione-brotli-in-nginx-su-centos-7), invece nel caso in cui non è già presente una installazione di Nginx o è presente una compilata, procedi con la lettura.

**Brotli** è un algoritmo di compressione sempre più difuso nei browser moderni. Questo algoritmo offre prestazioni maggiori rispetto Gzip, parliamo di quasi il **40%** di ottimizzazione della compressione, oltre che un miglioramento delle prestazioni necessarie per l'impiego.

Possiamo abilitare la compressione Brotli in Nginx grazie ad un modulo messo a disposizione dallo stesso team di pagespeed.

## Preparazione

Per prima cosa installiamo gli strumenti necessari a compilare "**Development Tools**":

```
yum groupinstall 'Development Tools' -y
yum install git
```

richiamiamo una shell root per i prossimi comandi:

```
sudo su
```

creiamo una cartella dove lavorare, ad esempio in /root:

```
mkdir /root/work
cd /root/work
```

e scarichiamo il sorgente di Nginx per poi estrarlo, nel mio caso installo la 1.15.8:

```
wget http://nginx.org/download/nginx-1.15.8.tar.gz
tar -xzvf nginx-1.15.8.tar.gz
```

scarichiamo infine il sorgente di Brotli, sempre in /root/work e aggiorniamo ogni dipendenza:

```
git clone https://github.com/google/ngx_brotli.git
cd ngx_brotligit submodule update --init --recursive
```

## Installazione

Nel caso fosse già presente una installaione compilata di Nginx, preleviamo le opzioni di configurazione:

```
nginx -V
```

dall'output ricevuto annotiamo il contenuto subito dopo **configure arguments:**, ci servirà nella nuova configurazione.

Cominciamo la configurazione, entriamo nella locazione dove e presente il sorgente di Nginx:

```
cd /root/work/nginx-1.15.8
```

e prepariamo il comando di configurazione. Se abbiamo annotato la configurazione di una precedente installazione, ci basterà aggiungere quelle stringhe subito dopo ./configure, seguite dal modulo brotli, ad esempio:

```
./configure PRECEDENTE_CONFIGURAZIONE --add-module=/root/work/ngx_brotli
```

nel caso contrario, sarà necessaria solo la dicitura del modulo Brotli:

```
./configure --add-module=/root/work/ngx_brotli
```

Una volta terminato il processo di installazione, possiamo compilare e installare la nostra versione di Nginx:

```
make
make install
```

e nel caso di una precedente installaione, riavviare il servizio:

```
systemctl restart nginx
```

Per le nuove installazioni invece, ci portiamo nella locazione di installazione:

```
cd /usr/local/nginx/sbin
```

ed avviamo nginx:

```
./nginx
```

> Per le nuove installazioni consiglio la creazione dello script d'avvio con systemctl, leggi la sezione Script di avvio [qui](https://linuxhub.it/article/howto-installazione-di-nginx-e-ngxpagespeed-su-centos-7#title6).

## Configurazione di Brotli

Ora che tutto è pronto, possiamo configurare Brotli aggiungendo la flag **brotli on** nel blocco http di Nginx:

```
nano /usr/local/nginx/conf/nginx
```

ed aggiungiamo le seguenti istruzioni:

```
brotli on;
brotli_static on;
brotli_types *;
```

all'interno del blocco `http{..}`.

Ci sono diverse istruzioni disponibili:

- *brotli* on/off che imposta lo stato attivo o spento della compressione, il mio consiglio è quello di abilitarlo di base nel blocco `http{..}` per poi disattivarlo in determinati siti web tramite il blocco `server{..}` dedicato
- *brotli_static* on/off che determina se dovrà essere consegnata la versione compressa dei file statici
- *brotli_types* i tipi di file per cui verrà abilitata la compressione, inserire `*` per tutti i file
- *brotli_comp_level* con un valore compreso da 0 a 11, indica il livello di compressione, di base è 6
- *brotli_min_length* indica la dimensione minima da cui iniziare la compressione di un file
- *brotli_buffers* per il numero e la dimensione dei buffer impiegati durante la fase di compressione

Infine riavviamo Nginx:

```
systemctl restart nginx
```

o su installazioni senza servizio:

```
./nginx -s restart
```

In questo modo verrà abilitata la compressione Brotli in tutti i siti web configurati con Nginx.

_- Mirko_