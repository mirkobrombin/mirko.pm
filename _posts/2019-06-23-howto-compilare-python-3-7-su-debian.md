---
title: '#howto - Compilare Python 3.7 su Debian'
description: "In questa guida vediamo come installare e rendere funzionale l'ultima versione di Python (al momento la 3.7) su Debian, compilando qu.."
published: 2019-06-23
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - python
---
In questa guida vediamo come installare e rendere funzionale l'ultima versione di Python (al momento la 3.7) su Debian, compilando quindi da sorgente.

> **Python** è un linguaggio di programmazione ad alto livello, orientato agli oggetti, adatto, tra gli altri usi, a sviluppare applicazioni distribuite, scripting, computazione numerica e system testing.

## Prepariamo gli strumenti

Cominciamo col installare gli strumenti necessari alla compilazione:

    sudo apt-get install build-essential checkinstall

 proseguiamo poi con l'installazione di alcune librerie necessarie:

    sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev

### Download del sorgente

Portiamoci in una cartella di lavoro, ad esempio **/usr/src**:

    cd /usr/src

e scarichiamo il sorgente:

    sudo wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz

Una volta completato il download, l'output dovrà essere simile al seguente:

    Python-3.7.3.tgz 100%[=====>] 21,91M 8,46MB/s in 2,6s 2019-06-24 00:20:05 (8,46 MB/s) - "Python-3.7.3.tgz" salvato [22973527/22973527]

infine scompattiamo l'archivio:

    sudo tar xzf Python-3.7.3.tgz

## Compilazione

Proseguiamo ora con la vera e propria compilazione, portiamoci nella cartella in cui è stato scompattato l'archivio:

    cd Python-3.7.3

procediamo con la configurazione:

    sudo ./configure --enable-optimizations

e la successiva installazione:

    sudo make altinstall

Dovremmo ricevere un output finale simile al seguente:

    Successfully installed pip-19.0.3 setuptools-40.8.0

Ora controlliamo la versione installata:

    python3.7 -V

Se l'operazione ha avuto successo avrete il seguente output:

    Python 3.7.3

Per dubbi e chiarimenti, fate riferimento al nostro [Gruppo Telegram](https://t.me/gentedilinux).