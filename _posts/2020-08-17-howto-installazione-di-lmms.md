---
title: '#howto - Installazione di LMMS  '
date: 2020-08-17
layout: post
author: Mattia Cosma
author_github: mattiacosma
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
Oggi andremo a vedere come installare LMMS , un software libero e gratuito progettato per la registrazione, il montaggio e la riproduzione dell&#39;audio digitale.

Questa D.A.W (Digital Audio Workstation) è disponibile in varie piattaforme e ora andremo a vedere come installarla sulle principali distro linux.

### Ubuntu, Linux Mint, Debian (deb)

```bash
 sudo apt-get install lmms
```

Per abilitare il supporto VST:

```bash
sudo apt-get install lmms-vst-full
```

## openSUSE

```bash
sudo zypper install lmms
```

## Fedora, RedHat, CentOS (rpm)

```bash
yum install lmms
```

## Arch Linux

```bash
sudo pacman -S lmms
```

In caso la vostra distrubuzione linux non possieda un pacchetto LMMS, nel sito ufficiale viene fornita una guida per la compilazione del software dalla sorgente che potrete raggiungere tramite il seguente [link](https://github.com/LMMS/lmms/wiki/Compiling).

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).