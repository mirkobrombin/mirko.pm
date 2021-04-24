---
title: '#howto - Installare Nginx su Centos 7 e configurazione SSL'
description: "In questa guida andremo a vedere come è possibile installare Nginx su Centos 7 via repository ufficiale."
published: 2019-01-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx 
  - centos
---
In questa guida andremo a vedere come è possibile installare Nginx su Centos 7 via repository ufficiale.

## Configurazione repository

Per prima cosa aggiungiamo la repository ufficiale di Nginx, portiamoci alla locazione **/etc/yum.repos.d/nginx.repo** e digitiamo come segue:

    [nginx]
    name=nginx repo
    baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
    gpgcheck=0
    enabled=1

## Installazione

Procediamo ora con l'installazione vera e propria. Per prima cosa effettuiamo un aggiornamento dei pacchetti via yum:

    sudo yum update

per poi proseguire nell'installazione come da prassi:

    sudo yum install nginx

Per garantire il corretto funzionamento di nginx, è buona idea quella di abilitarne l'auto-avvio al riavvio del server, questo via **systemctl**:

    sudo systemctl enable nginx

in questo modo verrà riavviato ogni qualvolta il server tornerà operativo.

## Stato del processo

Teniamo nota dei seguenti comandi:

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

## Configurazione di Nginx

Nginx è pronto all'uso una volta installato e fornisce una configurazione base chiamata **default**, possiamo usare questa configurazione come esempio per le nostre.

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

_Good ***nix**?_  
_ - Mirko_