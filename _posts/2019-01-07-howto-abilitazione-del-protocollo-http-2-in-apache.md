---
title: '#howto - Abilitazione del protocollo HTTP/2 in Apache'
description: "Il protocollo HTTP/2 è la seconda versione del comune protocollo HTTP utilizzato nel web."
date: 2019-01-07
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
Pochi giorni fa abbiamo spiegato come [Abilitare il protocollo HTTP/2 in Nginx](https://linuxhub.it/article/howto-abilitazione-del-protocollo-http2-nginx), oggi affrontiamo lo stesso discorso per Apache.

Il protocollo HTTP/2 è la seconda versione del comune protocollo HTTP utilizzato nel web. Si basa su SPDY, un protocollo di trasferimento creato da Google che riduce la latenza e le prestazioni nella fase di caricamento delle pagine web.

Abilitare il nuovo protocollo permette non solo di godere di un nuovo sistema di trasporto dei dati ma di maggiori prestazioni facilmente notabili. Questo grazie ad un sistema che alleggerisce il trasporto dei contenuti, riducendone la dimensione e suddividendoli in unità più grandi, tutto automaticamente.

## Requisiti

*   Apache 2.4.17 o maggiore ([guida installazione per Centos 7](https://linuxhub.it/article/howto-installare-apache-su-centos-7))
*   OpenSSL 1.0.2 o maggiore
*   Un certificato SSL

## Configurazione

Il protocollo HTTP/2 necessita di un certificato SSL, per questo motivo ne andremo a generare uno per poi procedere alla configurazione di nginx.

### Certificato SSL

Di seguito è presente la procedura su come generare un certificato Self-Signed, nel caso foste interessati ad un certificato Let's Encrypt, seguite la guida disponibile a [questo link](https://linuxhub.it/article/howto-ottenere-un-certificato-ssl-con-lets-encrypt).

Possiamo generare un certificato via **openssl**:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crtsudo openssl dhparam -out /etc/ssl/certs/apache-selfsigned.pem 2048

### Configurazione di Apache

Ora procediamo con la configurazione di Apache. Per prima cosa dobbiamo abilitare i moduli **ssl** e **http2** tramite **a2enmod**:

    sudo a2enmod sslsudo a2enmod http2

 modifichiamo poi la configurazione del nostro **vhost** come segue:

    <VirtualHost *:443>  ServerName il_mio_dominio.ex  ServerAlias www.il_mio_dominio.ex  DocumentRoot /var/www/il_mio_dominio.ex/public_html  SSLEngine on  SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key  SSLCertificateFile /etc/ssl/private/apache-selfsigned.crt  SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1  Protocols h2 http/1.1</VirtualHost>

Riavviamo infine **httpd**:

    sudo systemctl restart httpd

_Good ***nix**?_  
_ - Mirko_