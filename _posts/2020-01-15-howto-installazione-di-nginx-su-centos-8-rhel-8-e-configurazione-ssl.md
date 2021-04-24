---
title: '#howto - Installazione di Nginx su Centos 8/RHEL 8 e configurazione SSL'
description: "In questa guida vediamo come procedere all'installazione dell'ultima versione disponibile di Nginx su siste.."
published: 2020-01-15
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - centos  
  - rhel  
  - bash
---
Se stai cercando l'installazione di Nginx su Centos 7, procedi la lettura <a href="https://linuxhub.it/articles/howto-installare-nginx-su-centos-7-e-configurazione-ssl">qui</a>.

In questa guida vediamo come procedere all'installazione dell'ultima versione disponibile di Nginx su sistemi Centos 8 e RHEL 8, tramite l'utilizzo delle repository ufficiali.

Tramite le repository di sistema si può installare Nginx alla versione 1.14.1, in questa guida sfrutteremo le repository ufficiali Nginx per accedere ad una versione più recente.

## Strumenti
Prima di tutto dobbiamo installare `dnf-utils`:

```bash
dnf install dnf-utils
```

## Configurazione repository

Prima di tutto dobbiamo aggiungere la repository ufficiale di Nginx, creiamo quindi un file in locazione **/etc/yum.repos.d/nginx.repo** col seguente contenuto per Centos 8:

```bash
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
 
[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

o il seguente per RHEL 8:

```bash
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/rhel/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
 
[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/rhel/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```


## Installazione

Prima di procedere all'installazione istruiamo il gestore dei pacchetti alla lettura della nuova repository, questo tramite un aggiornamento dell'indice:

    sudo yum update

Abilitiamo la repository:

```bash
yum-config-manager --enable nginx-mainline
```

e proseguiamo quindi con l'installazione di nginx:

    sudo yum install nginx

Per garantire il corretto funzionamento di nginx, è buona prassi quella di abilitarne l'esecuzione al riavvio del server, questo abilitando il servizio via **systemctl**:

    sudo systemctl enable nginx

in questo modo verrà riavviato ogni qualvolta il server tornerà operativo.

## Stato del processo

Teniamo nota delle seguenti istruzioni per l'utilizzo del servizio:

riavviare il processo

    sudo systemctl restart nginx

avviare il processo

    sudo systemctl start nginx

fermare il processo

    sudo systemctl stop nginx

verificarne lo stato

    sudo systemctl status nginx

aggiornare con le nuove configurazioni

    sudo systemctl reload nginx

## Configurazione firewall

Nel caso fosse attivo il firewall di sistema, dobbiamo aprire le porte per garantire il corretto entrare/uscire delle connessioni dalle porte **80** e **443**:

    sudo firewall-cmd --permanent --zone=public --add-service=http
    sudo firewall-cmd --permanent --zone=public --add-service=https
    sudo firewall-cmd --reload

> Puoi imparare di più sull'utilizzo di **firewalld** leggendo la nostra <a href="https://linuxhub.it/articles/howto-aprire-e-chiudere-porte-con-firewalld">guida</a> dedicata.

Testiamone il corretto funzionamento visitando l'indirizzo IP pubblico del server, preleavabile mediante:

	ip addr

il risultato dovrebbe essere la pagina di benvenuto fornita col pacchetto.

## Configurazione di Nginx

Una volta installato Nginx è subito pronto all'uso e fornisce una configurazione base chiamata **default**. Possiamo usare questa configurazione come esempio e template per le nostre.

Ipotiziamo di voler aggiungere il nostro dominio **il_mio_dominio.ex** a nginx, per farlo creiamo una copia della configurazione base come segue:

    cp /etc/nginx/conf.d/default /etc/nginx/conf.d/il_mio_dominio_ex

apriamo quindi il nostro file di configurazione in **/etc/nginx/conf.d/il_mio_dominio_ex** e completiamo col seguente contenuto:

    server {
        listen       80;
        server_name  il_mio_dominio.ex www.il_mio_dominio.ex;

        location / {
            root   /usr/share/nginx/il_mio_dominio_ex;
            index  index.html index.htm;
        }
    }

### Spiegazione dei blocchi server

Di seguito la spiegazione della precedente configurazione:

*   server {} - è il blocco contenente la configurazione del nostro dominio
*   listen - la prota dove ascoltare (di base 80 "http", 443 per ssl "https")
*   server_name - il nostro dominio completo di prefisso www e non
*   location / {} - sono le istruzioni per la locazione root del sito web (appunto /)
*   root - la locazione dove la location andrà a cercare i documenti
*   index - la tipologia di file che verrà eseguita di base da nginx (visitando il_mio_dominio.ex verrà in realtà mostrato il_mio_dominio.ex/index.html)

Riavviamo per completare:

    sudo systemctl restart nginx

#### Configurazione SSL

Se vogliamo rendere disponibile il nostro sito web sotto SSL (https), dobbiamo essere in possesso di un certificato SSL.

Di seguito è presente la procedura su come generare un certificato Self-Signed, nel caso foste interessati ad un certificato Let's Encrypt, seguite la guida disponibile a [questo link](https://linuxhub.it/articles/howto-ottenere-e-rinnovare-un-certificato-ssl-con-let-s-encrypt).

Per prima cosa creiamo il certificato SSL via **openssl**:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
    sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

e modifichiamo poi il nostro blocco **<server>** come segue:

    server {
        listen       443 ssl;
        server_name  il_mio_dominio.ex www.il_mio_dominio.ex;

        ssl on;
        ssl_certificate /etc/ssl/private/nginx-selfsigned.crt;
        ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

        location / {
            root   /usr/share/nginx/il_mio_dominio_ex;
            index  index.html index.htm;
        }
    }

Riavviamo per completare:

    sudo systemctl restart nginx

Non rimane che creare la locazione dove poter archiviare tutti i dati del nostro sito web. Nell'esempio di configurazione qui sopra abbiamo posizionato tutto in **/usr/share/nginx/il_mio_dominio_ex** creiamo quindi la cartella:

    mkdir /usr/share/nginx/il_mio_dominio_ex

creiamo infine un file di prova:

    touch /usr/share/nginx/il_mio_dominio_ex/index.html
    echo "Buon divertimento da linuxhub.it!" > /usr/share/nginx/il_mio_dominio_ex/index.html

ed impostiamo i permessi corretti:

    chown -R nginx:nginx /usr/share/nginx/il_mio_dominio_ex
    chmod -R 775 /usr/share/nginx/il_mio_dominio_ex

visitiamo poi il nostro dominio per verificarne il corretto funzionamento.

In questo modo ogni volta che vogliamo aggiungere un nuovo dominio a nginx, sarà necessario copiare il file di configurazione **default** di nginx e configurarne il contenuto, riavviare, creare il percorso ed il gioco è fatto.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/gentedilinux">gruppo telegram</a>.