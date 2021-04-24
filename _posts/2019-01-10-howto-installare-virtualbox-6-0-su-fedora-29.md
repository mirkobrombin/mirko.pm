---
title: '#howto - Installare VirtualBox 6.0 su Fedora 29'
description: "VirtualBox è un software di virtualizzazione sviluppato da Oracle, uno dei migliori software del settore Open source ma non solo."
published: 2019-01-10
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - fedora
---
VirtualBox è un software di virtualizzazione sviluppato da **Oracle**, uno dei migliori software del settore Open source ma non solo.

In questa guida vediamo come installare VirtualBox in versione 6.0, su Fedora 29 tramite repository ufficiale.

> La guida si può applicare anche a versioni minori di Fedora, fino alle 26.

## Repository

VirtualBox mette a disposizione una repository ufficiale per l'installazione su Fedora (e altre distribuzioni). Ci basterà aggiungerla nella locazione **/etc/yum.repos.d**:

    su -cd /etc/yum.repos.d/wget http://download.virtualbox.org/virtualbox/rpm/fedora/virtualbox.repo

infine aggiorniamo via **dnf**:

    dnf update

## Installazione dipendenze

Prima di proseguire consiglio di effettuare il **reboot** della macchina, specialmente se abbiamo effettuato di recente l'aggiornamento del kernel Linux senza riavviare, di conseguenza il kernel installato non è quello in esecuzione ora e questo potrebbe arrecare problemi in fase di installazione e configurazione di VirtualBox. Riavviamo quindi:

    reboot

o procediamo in base alla vostra scelta.

Per l'installazione sono necessarie alcune dipendenze che andiamo ora a installare.

    sudo -dnf install binutils gcc make patch libgomp glibc-headers glibc-devel kernel-headers kernel-devel dkms qt5-qtx11extras libxkbcommon

## Installazione VirtualBox

Passiamo ora alla fase di installazione vera e propria, come da prassi via **dnf**:

    dnf install VirtualBox-6.0

Procediamo infine con la ricostruzione dei moduli del kernel Linux, possiamo farlo tramite lo script predisposto da VirtualBox:

    /usr/lib/virtualbox/vboxdrv.sh setup

Durante l'installazione, viene creato un nuovo gruppo **vboxusers** che andiamo ora ad assegnare al nostro utente:

    usermod -a -G vboxusers username

dove **username** è il nome dell'utente a cui vogliamo assegnare il gruppo, è possiible usare la variabile $USER per l'username dell'utente corrente.

Una volta terminato è possibile avviare VirtualBox:

    VirtualBox

### Installazione Guest Additions

Questa fase è opzionale. Le Guest Additions sono strumentazioni messe a disposizione da VirtualBox, per migliorare le performance e l'integrazione col sistema della macchina virtuale.

L'installazione è semplice, ci basta avviare VirtualBox, portarci sulla voce **Devices** del menu e cliccare su **Insert Guest Additions CD Image**, seguire le istruzioni a schermo.

Possiamo effettuare la stessa operazione via Terminale della macchina virtuale:

    mount -r /dev/cdrom /mediacd /media/./VBoxLinuxAdditions.run 

riavviamo infine la macchina.

_Good ***nix**?_  
_ - Mirko_