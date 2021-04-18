---
title: '#howto - Installazione di git su ogni distribuzione Linux'
published: 2020-04-24
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - github  
  - bash
---
**git** è uno dei sistemi di controllo versione più utilizzati al mondo, se non il più usato.

In questa guida vediamo come installarlo su ogni distribuzione Linux, fate riferimento alla vostra distribuzione nelle sezioni qui sotto.

## Debian/Ubuntu e derivate

Su distribuzioni Debian, Ubuntu e derivate (come Pop OS, elementary OS, KDE Neon, ..) effettuiamo l'installazione via *apt*:

```bash
apt install git
```

## RHEL 8/ Centos 8/ Fedora 30+

Da RHEL 8 il gestore pacchetti di sistema passa da yum a *dnf*, possiamo quindi installare git in questo modo:

```bash
dnf install git
```

## RHEL 7/ Centos 7 e derivate

Fino a RHEL 7, il gestore pacchetti di sistema è *yum*, stesso discorso per ogni distribuzione basata. Possiamo procedere all'installazione così:

```bash
yum install git
```

## Archlinux/ Manjaro e derivate

Su Archlinux e derivate troviamo il gestore pacchetti `pacman`, usiamo l'opzione `-S` per installare git:

```bash
pacman -S git
```

## Solus

Solus fu inizialmente una distribuzione derivata da Debian ed usava quindi il gestore pacchetti *apt*. Dalla versione 1.2 venne resa una distribuzione LFS (Linux From Scratch) e venne introdotto il gestore pacchetti *eopkg*.

Possiamo procedere all'installazione di git sfruttando l'opzione `install`:

```bash
eopkg install git
```

## openSUSE

Su openSUSE troviamo il gestore pacchetti *zypper*, procediamo sfruttando l'opzione `in`:

```bash
zypper in git
```

## Gentoo

Su Gentoo troviamo `emerge`:

```bash
emerge --ask dev-vcs/git
```

## Void Linux

Il gestore pacchetti qui è *xbps*, procediamo all'installazione col comando `xbps-install` usando l'opzione `-S`:

```bash
xbps-install -S git
```

## Chrome OS/ Android

Sia Chrome OS che Android non mettono a disposizione un gestore pacchetti di sistema, ciò nonostante è possibile accedere ad uno di questi installando l'app Android <a href="https://termux.com">Termux</a>, una volta installata basterà eseguirla per accedere alla console, da qui possiamo usare `pkg` per installare git:

```bash
pkg install git
```

## Installazione da sorgente

Possiamo installare git da sorgente qualora non fosse disponibile per la propria distribuzione o la versione offerta risulti obsoleta.

### Requisiti

Prima di tutto sarà necessario assicurarsi che siano presenti le seguenti dipendenze e nel caso procedere all'installazione:

- make
- autoconf
- libcurl4-gnutls
- gettext
- gcc
- zlib1g

### Installazione

Portiamoci in una locazione pulita, ad esempio `.tmp` nella nostra home e scarichiamo l'archivio:

```bash
wget https://github.com/git/git/archive/master.zip
```

scompattiamo via `unzip`:

```bash
unzip master.zip
```

e portiamoci all'interno del percorso appena creato:

```bash
cd master
```

procediamo con la compilazione via `make`:

```bash
make configure
./configure --prefix=/usr --without-tcltk 
make all
make install
```

### Installazione della documentazione

Possiamo installare la documentazione (pagine man) clonando la repository:

```bash
git clone git://github.com/gitster/git-manpages.git
```

entrando in locazione e digitando:

```bash
make quick-install-man
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).