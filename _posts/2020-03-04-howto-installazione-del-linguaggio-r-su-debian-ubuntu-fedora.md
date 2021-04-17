---
title: '#howto - Installazione del linguaggio R su Debian 10/Ubuntu/Fedora'
published: 2020-03-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - debian  - ubuntu  - bash
---
**R** è un linguaggio di programmazione Open source indirizzato all'analisi statistica dei dati.

In questa guida vediamo come installarlo sulle principali distribuzioni (Debian/Ubuntu/Fedora e derivate).

## Debian 10 e derivate
Per quanto riguarda Debian 10 e le distribuzioni che vi si basano, andiamo ad aggiungere una repository siccome la versione disponibile in quelle ufficiali Debian non viene aggiornata con frequenza.

Per queste distribuzioni dobbiamo prima di tutto installare `dirmngr` il quale ci permette di gestire i certificati, `software-properties-common` per poter aggiungere repository di terze parti e `apt-transport-https` per accertarci di supportare il protocollo **https**:
```bash
apt install dirmngr --install-recommends
apt install software-properties-common apt-transport-https
```
Aggiungiamo la chiave GPG:
```bash
apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF'
```
e la nuova repository:
```bash
add-apt-repository 'deb http://cloud.r-project.org/bin/linux/debian buster-cran35/'
```
Possiamo procedere con l'aggiornamento dell'indice e l'installazione:
```bash
apt update
apt install r-base
```

## Ubuntu e derivate
Prima di tutto dobbiamo aggiungere la chiave GPG:
```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
```
procediamo quindi con l'aggiunta della repository via `add-apt-repository`:
```bash
add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/'
```
Nel caso il comando qui sopra non dovesse essere presente in eventuali derivate di Ubuntu (come elementary OS ad esempio), dobbiamo installare il pacchetto `software-properties-common`:
```bash
apt install software-properties-common
```
Effettuiamo l'aggiornamento dell'indice delle repository:
```bash
apt update
```
ed infine installiamo R:
```bash
apt install r-base
```

## Fedora e derivate
R è disponibile e aggiornato nelle repository ufficiali di Fedora, procediamo all'installazione come per qualsiasi altro pacchetto via *dnf*:
```bash
dnf install R
```

## Verifica dell'installazione
Possiamo verificare la corretta installazione dell'ambiente R digitando semplicemente `R`, il quale dovrà aprire una console interattiva e restituire un output simile al seguente:
```bash
R version 3.6.1 (2020-19-02)
Copyright (C) 2020 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)
...
Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).