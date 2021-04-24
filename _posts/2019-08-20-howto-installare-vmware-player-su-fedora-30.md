---
title: '#howto - Installare VMware Player su Fedora 30'
description: "In questa guida vediamo come installare il player su Fedora 30, la quale richiede alcuni accorgimenti come la compilazione dei moduli, al momento non supportati nella versione 5 del kernel Linux."
published: 2019-08-20
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - github
---
Il **player** **di** **VMware** permette la creazione, gestione ed esecuzione di macchine virtuali. Il pacchetto offerto dall'azienda è vasto ed offre più strumenti, fra cui l'insieme Workstation/Professional.

In questa guida vediamo come installare il player su Fedora 30, la quale richiede alcuni accorgimenti come la compilazione dei moduli, al momento non supportati nella versione 5 del kernel Linux.

## Compilazione moduli

Per prima cosa scarichiamo ed installiamo via **dnf**, gli strumenti necessari alla compilazione del moduli:

    sudo dnf install git make gcc gcc-c++ kernel-devel kernel-headers

portiamoci in una locazione su cui lavorare, ad esempio nella cartella Download (Scaricati su sistemi in Italiano) del nostro utente:

    cd ~/Scaricati

ed [otteniamo](https://github.com/mkubecek/vmware-host-modules/releases)/scompattiamo la versione più recente della patch (la 15.1.0 nel momento in cui scrivo):

    wget https://github.com/mkubecek/vmware-host-modules/archive/player-15.1.0.zipunzip player-15.1.0.zip

successivamente procediamo con la compilazione via **make**:

    makesudo make install

## Installazione di VMware Player

Otteniamo una copia gratuita del player dal [portale ufficiale](https://my.vmware.com/en/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/15_0) (la 15.1.0 nel momento in cui scrivo), portiamoci alla sua locazione da terminale e rendiamo il file eseguibile:

    chmod +x VMware-Player-*.bundle

ed avviamo l'installazione:

    sudo ./VMware-Player-*.bundle

Infine una volta terminata l'installazione (per non riavviare la macchina), carichiamo manualmente il modulo **vmmon**:

    sudo modprobe vmmon

Possiamo ora avviare l'interfaccia del player dal menu applicazioni di sistema o semplicemente digitando `vmplayer`.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**