---
title: '#howto - Abilitare la compressione Brotli in Nginx su Centos 7'
description: "Brotli è un algoritmo di compressione sempre più difuso nei browser moderni."
date: 2019-01-22
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - centos
---
**Brotli** è un algoritmo di compressione sempre più difuso nei browser moderni. Questo algoritmo offre prestazioni maggiori rispetto Gzip, parliamo di quasi il **40%** di ottimizzazione della compressione, oltre che un miglioramento delle prestazioni necessarie per l'impiego.

> Attenzione, nel caso in cui la tua installazione di Nginx è stata compilata manualmente da sorgente, si prega di far riferimento a [questa](https://linuxhub.it/article/howto-abilitare-la-compressione-brotli-nginx-build-su-centos-7) guida.

Possiamo abilitare la compressione Brotli in Nginx grazie ad un modulo messo a disposizione dallo stesso team di pagespeed.

## Requisiti

*   Nginx 1.9.5 con abilitazione **--compat** (vediamo l'installazione in questa guida)
*   Repository pagespeed

## Installazione

L'installazione è facilitata dalla messa a disposizione di una repository dedicata, per sistemi RHEL. Procediamo quindi con l'installazione della repository via **yum**:

    yum install https://extras.getpagespeed.com/release-el7-latest.rpm

e la consecutiva installazione di nginx e del modulo:

    yum install nginx nginx-module-nbr

consiglio di leggere la nostra [guida](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl) per la fase di configurazione dei blocchi **server{}**.

> Nel caso delle installazioni nginx con build da sorgente, bisogna tenere in considerazione che la compilaione deve avvenire con la flag **--compat**, altrimenti non sarà possibile eseguire moduli dinamici. Le versioni più recenti distribuite precompilate dovrebbero essere già compatibili.

## Abilitazione modulo

Una volta installati i requisiti proseguiamo con il caricamento del modulo. A seconda della posizione del vostro file di configurazione **nginx.conf**, di norma in locazioine **/etc/nginx/nginx.conf**, aggiungiamo i seguenti moduli:

    load_module modules/ngx_http_brotli_filter_module.so;load_module modules/ngx_http_brotli_static_module.so;

e riavviamo il processo:

    systemctl restart nginx

## Configurazione

Una volta percorsi i precedenti passaggi, possiamo abilitare la compressione, semplicemente aggiungendo la configurazione Brotli nei **server{}** block dei siti web a cui vogliamo venga applicato il nuovo algoritmo. Nel nostro caso per **il_mio_dominio.ex**:

    server {    
        ..    
        server_name  il_mio_dominio.ex www.il_mio_dominio.ex;    
        ..    
        brotli on;    
        brotli_types text/xml image/svg+xml application/x-font-ttf image/vnd.microsoft.icon application/x-font-opentype application/json font/eot application/vnd.ms-fontobject application/javascript font/otf application/xml application/xhtml+xml text/javascript  application/x-javascript text/plain application/x-font-truetype application/xml+rss image/x-icon font/opentype text/css image/x-win-bitmap;        
        ..    
        location / {        
            ..    
        }    
        ..
    }

dove:

*   **brotli on** - è l'effettiva abilitazione del modulo
*   **brotli_types** - sono i tipi di file per cui verrà abilitata la compressione

Ricordiamo di riavviare il processo **nginx** dopo l'abilitazione (in generale ad ogni modifica di configurazione).

## Verifica

Se tutti i passaggi sono stati seguiti alla lettera, possiamo effettuare l'effettiva abilitazione via **curl**:

    curl -IL https://il_mio_dominio.ex -H "Accept-Encoding: br"

se il risultato è **HTTP/1.1 200 OK**, la compressione è effettivamente attiva.

_Good ***nix**?_  
_ - Mirko_