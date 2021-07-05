---
title: '#howto - Installazione e configurazione di Nginx su Clear Linux'
date: 2021-01-22
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - centos  
  - rhel  
  - bash
---
**Nginx** è un web server e reverse proxy potente, estremamente personalizzabile e disponibile su tutte le piattaforme.

In questa guida vediamo come installare e configurare Nginx su **Clear Linux**, la distribuzione Linux di Intel Open source (01.org).

> Abbiamo già trattato l'installazione di Nginx per [CentOS 7](https://linuxhub.it/articles/howto-installare-nginx-su-centos-7-e-configurazione-ssl) e  [CentOS/RHEL 8](https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl).

## Installazione
Nelle repository di sistema di Clear Linux, esistono 2 bundle di Nginx:
- `nginx`
- `nginx-mainline`

Il primo offre l'ultima release stabile di Nginx, mentre il secondo offre l'ultima rilasciata dal team di sviluppo. Nel nostro caso useremo `nginx` per una versione più stabile.

Poco fa abbiamo parlato di *bundle*, questo perchè in Clear Linux non vengono installati pacchetti ma bensì dei veri e propri bundle. Questi contengono tutto il necessario per far funzionare un dato programma nella distribuzione, e vengono forniti con tutte le dipendenze: non bisognerà quindi  scaricarle a cascata durante l'installazione. Parleremo meglio di *swupd* in un secondo articolo. 

Procediamo quindi all'installazione via `swupd`:

```bash
swupd bundle-add nginx
```

altrimenti per la versione *mainline*:

```bash
swupd bundle-add nginx-mainline
```

Infine abilitiamo il servizio per fare in modo che si avvii in automatico al boot del PC ed eseguiamolo:

```bash
systemctl enable nginx
systemctl start nginx
```

## Configurazione di Nginx
Una volta installato, Nginx è subito pronto all'uso e fornisce una configurazione base chiamata *default*. Possiamo usare questa come esempio e base.

Ipotizzando di voler aggiungere il dominio **il_mio_dominio.ex**, per farlo creiamo una copia della configurazione base:

```bash
cp /etc/nginx/conf.d/default /etc/nginx/conf.d/il_mio_dominio_ex
```

Nel nuovo file troveremo una configurazione simile alla seguente:
```nginx
server {
    listen       80;
    server_name  il_mio_dominio.ex www.il_mio_dominio.ex;

    location / {
        root   /usr/share/nginx/il_mio_dominio_ex;
        index  index.html index.htm;
    }
}
```

dove:
- `server {..}` è il blocco contenente la configurazione del nostro dominio
- `listen` la prota dove ascoltare (di base 80 "http", 443 per ssl "https")
- `server_name` il nome a dominio completo di prefisso www e non
- `location / {..}` sono le istruzioni per la locazione root del sito web (appunto /)
- `root` la locazione dove la location andrà a cercare i documenti
- `index` il file che verrà visualizzato come indice del sito (in questo caso, visitando il_mio_dominio.ex verrà in realtà mostrato il file index.html)

Una volta terminate le modifiche, riavviamo sempre via `systemctl`:

```bash
systemctl restart nginx
```

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/gentedilinux">gruppo telegram</a>.