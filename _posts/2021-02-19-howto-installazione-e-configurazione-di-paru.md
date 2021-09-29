---
title: '#howto - Installazione e configurazione di Paru'
date: 2021-02-19
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - archlinux  - bash
---
**Paru** è un nuovo AUR Helper creato in Rust con la stessa idea di *yay*. In parole povere, si tratta di un programma che scarica, compila ed installa automaticamente un pacchetto presente sull'AUR di Arch Linux, senza dover effettuare questo processo a mano.

In questa guida vedremo come installare Paru ed effettuare qualche modifica al file di configurazione per migliorare l'esperienza complessiva.

## Installazione
Installare Paru è molto semplice. Prima dovremo installare il pacchetto *base-devel*:
```bash
pacman -S --needed base-devel
```
successivamente cloniamo il pacchetto di Paru dalla AUR:
```bash
git clone https://aur.archlinux.org/paru.git
```
Entriamo nella sua cartella:
```bash
cd paru
```
ed infine usiamo *makepkg* per compilare ed installare il pacchetto:
```bash
makepkg -si
```

## Configurazione
È consigliato decommentare dentro alla configurazione di Paru, situata in _/etc/paru/paru.conf_, la riga `BottomUp`, che ci permette di ottenere risultati di ricerca che iniziano dal basso e vanno verso l'alto.

Successivamente, se desideriamo avere i colori quando usiamo Pacman, decommentiamo dentro al file di configurazione di Pacman la riga `Color`.

