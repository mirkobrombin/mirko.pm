---
title: "#howto – Utilizzo del comando 'curl'"
description: "curl è un potente strumento per il download di risorse web e non solo, si può infatti utilizzare anche in altri contesti, come ad esempio interpellare delle API e inviare e/o ricevere header."
date: 2019-09-16
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Il comando **curl** è un potente strumento per il download di risorse web e non solo, si può infatti utilizzare anche in altri contesti, come ad esempio interpellare delle API e inviare e/o ricevere header.

## Sintassi

La sintassi del comando è la seguente:

    curl [opzioni] [url]

## Utilizzo del comando

Come comando è facilmente comprensibile, supporta diverse opzioni e si può utilizzare in più contesti.

Nel caso in cui vogliamo ricevere il contenuto di una risorsa (ad esempio questa guida):

    curl https://linuxhub.it/article/howto-utilizzo-del-comando-curl

riceveremo un output col contenuto della pagina web, in formato HTML.

### Download di file

Possiamo scaricare un file, ad esempio un archivio .zip, specificandone l'output mediante flag **-o**:

    curl https://url/archivio.zip -o archivio.zip

in alternativa possiamo sfruttare l'operatore **>** nel comando curl in questo modo:

    curl https://url/archivio.zip > archivio.zip

altrimenti sfruttando il nome stesso della risorsa tramite flag **-O**:

    curl -O https://url/archivio.zip

in tutti i casi, il file verrà scaricato sotto nome **archivio.zip**.

### Download di file multipli

Come visto precedentemente per la flag **-O**, possiamo utilizzare lo stesso concetto per scaricare più file semplicemente scrivendo in sequenza:

    curl -O https://url/archivio_1.zip -O https://url/archivio_2.zip

per scaricare quindi i file **archivio_1.zip** e **archivio_2.zip**.

### Riprende un download interrotto

Nel caso in cui un download viene interrotto per x motivi, possiamo recuperarlo portandoci nella locazione dove è presente il frammento del precedente download e sfruttare la flag **-C** per continuarne il download:

    curl -C - -O https://link/archivio.zip

### Reindirizzamenti

Può capitare di inciampare in un messaggio che specifica lo spostamento in nuova locazione della risorsa, possiamo istruire curl a seguire questo/i reindirizzamenti tramite flag **-L**:

    curl -OL https://url_vecchio/archivio.zip

il che farà riferimento al link nuovo nel caso di reindirizzamento.

### Ricevere gli header

Possiamo utilizzare la flag **-I** per ricevere gli header di una chiamata, ad esempio per visualizzare quelli di questo sito web:

    curl -X HEAD -i https://linuxhub.it

in questo caso l'output sarà simile al seguente:

    curl -I https://linuxhub.itHTTP/2 200 date: Mon, 16 Sep 2019 08:52:35 GMTcontent-type: text/html; charset=UTF-8x-drupal-dynamic-cache: MISSlink: <https://linuxhub.it/>; rel="shortlink", <https://linuxhub.it/>; rel="canonical"x-ua-compatible: IE=edgecontent-language: itx-content-type-options: nosniffx-frame-options: SAMEORIGIN

### Inviare header

Nel caso in cui vogliamo interagire con la risorsa inviando un header, ad esempio uno di autenticazione (**Authorization**), possiamo utilizzare la flag **--header** (o **-I**) in questo modo:

    curl --header "Authorization: AUTH_TOKEN" https:/link_risorsa

il quale restituirà un output a seconda della programmazione della risorsa.



_?Good *nix _**__Mirko_**