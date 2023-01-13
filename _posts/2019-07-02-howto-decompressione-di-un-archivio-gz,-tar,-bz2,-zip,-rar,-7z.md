---
class: post
title: '#howto - Decompressione di un archivio (gz, tar, bz2, zip, rar, 7z)'
description: "I formati di compressione sono molti e spesso sono altrettanto differenti gli strumenti per decomprimerli."
date: 2019-07-02
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
I formati di compressione sono molti e spesso sono altrettanto differenti gli strumenti per decomprimerli.

In questa guida vediamo come decomprimere i principali formati di compressione.

## Gz

Per decomprimere un archivio in **.gz**, possiamo usare il comando **gunzip**:

    gunzip archivio.gz

in alternativa possiamo usare il comando **gzip** con la flag **-d**:

    gzip -d archivio.gz

## Bzip2

Possiamo decomprimere un archivio in formato **.bzip2**, tramite l'omonimo strumento e la flag **-d**:

    bzip2 -d archivio.bzip

in alternativa **bunzip2**:

    bunzip2 archivio.bzip2

## Zip

Forse il formato di compressione più comune, può essere decompresso mediante comando **unzip** (spesso non pre-installato nel sistema):

    unzip archivio.zip

Possiamo installarlo mediante gestore pacchetti di sistema:

    # Debian/Ubuntu e derivateapt install unzip# RHEL/Centos e derivateyum install unzip# Fedora e derivatednf install unzip# Arch Linux e derivatepacman -S unzip

## Tar

Per decomprimere un archivio **.tar**, possiamo sfruttare l'omonimo comando con l'opzione **xf** come segue:

    tar xf archivio.tar

Esistono poi altre tipologie di archivi .tar che sfruttano una compressione differente, come ad esempio **bzip2** o **gzip**.

### Tar.gz

Per decomprimere un archivio **.tar** con compressione **gzip**, possiamo usare l'opzione **xzf**:

    tar xzf archivio.tar.gz

### Tar.bz2

La decompressione di un archivio **.tar** con compressione **bzip2** avviene mediante opzione **xjf**:

    tar xjf archivio.tar.bz

## Rar

Il formato di compressione proprietario **.rar**, richiede l'installazione di uno strumento proprietario per la loro decompressione:

    # Debian/Ubuntu e derivateapt install unrar# RHEL/Centos e derivateyum install unrar# Fedora e derivatednf install unrar# Arch Linux e derivatepacman -S unrar

di norma questo pacchetto viene fornito da repository di software proprietario del sistema o di terze parti.

Infine possiamo decomprimere un archivio **.rar** mediante l'opzione **x**:

    unrar x archivio.rar

## 7z

Come per unrar e unzip, 7z non è sempre offerto come standard in una distribuzione ma possiamo installarlo tramite gestore pacchetti:

    # Debian/Ubuntu e derivateapt install p7zip-full# RHEL/Centos e derivateyum install p7zip p7zip-plugins# Fedora e derivatednf install p7zip p7zip-plugins# Arch Linux e derivatepacman -S p7zip

e possiamo decomprimere l'archivio come segue:

    7za e archivio.7z

_Good ***nix**?_  
_ - Mirko_