---
class: post
title: '#howto - Abilitazione del protocollo HTTP/2 in Nginx'
description: "Il protocollo HTTP/2 è la seconda versione del comune protocollo HTTP utilizzato nel web."
date: 2019-01-04
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - apache  
  - centos
---
Il protocollo HTTP/2 è la seconda versione del comune protocollo HTTP utilizzato nel web. Si basa su SPDY, un protocollo di trasferimento creato da Google che riduce la latenza e le prestazioni nella fase di caricamento delle pagine web.

Abilitare il nuovo protocollo permette non solo di godere di un nuovo sistema di trasporto dei dati ma di maggiori prestazioni facilmente notabili. Questo grazie ad un sistema che alleggerisce il trasporto dei contenuti, riducendone la dimensione e suddividendoli in unità più grandi, tutto automaticamente.

## Requisiti

*   Nginx 1.9.5 o maggiore ([guida installazione per Centos 7](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl))
*   OpenSSL 1.0.2 o maggiore
*   Un certificato SSL

## Configurazione

Il protocollo HTTP/2 necessita di un certificato SSL, per questo motivo ne andremo a generare uno per poi procedere alla configurazione di nginx.

### Certificato SSL

Di seguito è presente la procedura su come generare un certificato Self-Signed, nel caso foste interessati ad un certificato Let's Encrypt, seguite la guida disponibile a [questo link](https://linuxhub.it/article/howto-ottenere-un-certificato-ssl-con-lets-encrypt).

Possiamo generare un certificato via **openssl**:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crtsudo openssl dhparam -out /etc/ssl/certs/apache-selfsigned.pem 2048

### Configurazione Nginx

Ora abilitiamo il nuovo protocollo e configuriamo il nostro blocco server col nuovo certificato SSL:

    server {    
    	listen       443 ssl http2;    
        listen [::]:443 ssl http2;    
        server_name  il_mio_dominio.ex www.il_mio_dominio.ex;    
        ssl on;    
        ssl_certificate /etc/ssl/private/nginx-selfsigned.crt;    
        ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;    
        ssl_protocols TLSv1.2;    
        
        location / {        
        	root   /usr/share/nginx/il_mio_dominio_ex;        
            index  index.html index.htm;    
        }
    }

Riavviamo infine nginx:

    sudo systemctl restart nginx

_Good ***nix**?_  
_ - Mirko_