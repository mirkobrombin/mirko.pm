---
title: '#howto – Nginx impostare la cache dei file statici su Centos 7'
description: "Una delle pratiche più conosciute per diminuire l'utilizzo di banda in un web server che ospita siti web st.."
published: 2019-06-14
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx
---
Una delle pratiche più conosciute per diminuire l'utilizzo di banda in un web server che ospita siti web statici ma anche dinamici, è di certo quello di sfruttare la cache, forzando quindi una scadenza differente per uno o più file nel browser dell'utente.

> Di norma i file che vengono contrassegnati con una scadenza maggiore, sono quelli statici (jpg, png, css, ..).
> 
> Ci sono poi file statici come HTML che non dovrebbero essere contrassegnati con una scadenza futura elevata, questo per evitare che l'utente non riceva più la versione aggiornata del file.

## Configurazione della cache

Possiamo creare una locazione dedicata ai file statici in ogni blocco server {...}, impostando una scadenza differente, in questo caso:

    location ~*  \.(jpg|jpeg|png|gif|ico|js|css)$ {   expires 365d;}

informiamo il browser di impostare una scadenza di un anno per tutti i file di tipo: jpg, jpeg, png, gif, ico, js, css.

Una volta configurato il blocco, ricarichiamo la configurazione di nginx via systemctl:

    sudo systemctl reload nginx

## Versionamento dei file CSS e JS

I documenti di tipo CSS e JS, potrebbero essere visti come file non del tutto statici, in quanto lo stile e la funzione dinamica di un sito potrebbe essere rivisto spesso nel corso di un anno, è importante sottolineare che in questo caso bisogna sfruttare il versionamento dei file (file.css?v1, file.js?v1, ..) in modo da offrire sempre la versione aggiornata del foglio di stile nella cache del browser.

Nell'esempio in cui la versione dello stile **style.css** presente nella cache del browser è la seguente:

    body {    background-color: #242424;    color: cyan;    font-family: sans-serif;}

e vogliamo riscriverla con la seguente:

    body {    background-color: #191919;    color: #fcfcfc;    font-family: "Roboto", sans-serif;    font-size: 13px;}

ma la scadenza della cache è impostata a 365 giorni, possiamo semplicemente modificare il modo in cui includiamo il file, nel seguente metodo:

    <link rel="stylesheet" type="text/css" href="style.css?v2" />

in questo modo, alla prossima, il browser dell'utente scaricherà in cache la nuova versione del foglio di stile, con una validità di 365 giorni.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**