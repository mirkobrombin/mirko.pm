---
title: '#howto - Ottenere il sorgente di un pacchetto via apt su Ubuntu e derivate'
date: 2020-08-03
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  
  - ubuntu  
  - bash
---
Molto spesso il comando `apt` viene semplicemente utilizzato per scaricare pacchetti da installare nel proprio sistema, ma questo può anche essere usato per scaricare il sorgente di un pacchetto.

## Abilitare i sorgenti

Come prima cosa dobbiamo abilitare le repository dove sono salvati i codici sorgenti dei pacchetti. Per fare questo dovremo modificare il file `/etc/apt/sources.list` e aggiungere alcune istruzioni.

Su **Ubuntu**:

```bash
deb-src http://archive.ubuntu.com/ubuntu codename main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu codename-updates main restricted universe multiverse
deb-src http://security.ubuntu.com/ubuntu codename-security main restricted universe multiverse
```

dove "**codename**" deve essere rimpiazzato con il nome in codice della versione di Ubuntu che si sta utilizzando (ottenibile digitando `cat /etc/lsb-release | grep CODENAME` in una console). Nel caso di 20.04 (focal) si procederà in questo modo:

```bash
deb-src http://archive.ubuntu.com/ubuntu focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu focal-updates main restricted universe multiverse
deb-src http://security.ubuntu.com/ubuntu focal-security main restricted universe multiverse
```

Su **Debian**:

```bash
deb-src deb http://deb.debian.org/debian codename main
```

dove, anche qui, "codename" dovrà essere rimpiazzato con il nome in codice della propria versione di Debian.

Una volta aggiunte le istruzioni, procediamo all'aggiornamento dell´ indice via *apt*:

```bash
apt update
```

## Scaricare i sorgenti

A questo punto è arrivato il momento di scaricare sul nostro sistema il codice sorgente dei pacchetti di cui abbiamo bisogno. Per fare ciò utilizzeremo `apt` seguito poi da `source` e dal pacchetto che vogliamo esaminare.

Prendiamo come esempio `bash`. Per scaricare il codice sorgente di `bash` da `apt` possiamo fare questo comando:

```bash
apt source bash
```

e se tutto è andato a buon fine, facendo `ls -la` dovremo avere un output simile al seguente:

```bash
drwxr-xr-x 1 alessandro alessandro     512 Jul 30 14:42 bash-5.0
-rw-r--r-- 1 alessandro alessandro   74356 Jun 29 16:43 bash_5.0-6ubuntu1.1.debian.tar.xz
-rw-r--r-- 1 alessandro alessandro    2418 Jun 29 16:43 bash_5.0-6ubuntu1.1.dsc
-rw-r--r-- 1 alessandro alessandro 5554808 Jan 14  2019 bash_5.0.orig.tar.xz
```

Normalmente il codice sorgente viene estratto automaticamente nella cartella *pacchetto-versione*. Per vedere cosa c'è dentro possiamo utilizzare `ls`:

```bash
ls bash-5.0
```

La versione compressa del codice sorgente presente sulle repo viene salvata come *pacchetto_versione.orig.tar.xz* che, in questo caso, è *bash_5.0.orig.tar.xz*. Un file che descrive il pacchetto è invece salvato con l'estensione *.dsc*. La versione compressa del codice con tutti i file creati per il pacchetto di Debian vengono invece salvati in *pacchetto_versione-6ubuntu1.1.debian.tar.xz*.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).
