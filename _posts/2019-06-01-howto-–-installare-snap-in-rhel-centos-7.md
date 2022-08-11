---
title: '#howto – Installare snap in RHEL/Centos 7'
description: "Sono molti i vantaggi dei pacchetti snap, in primis la loro esecuzione sicura in una sandbox e le dipendenze pre-incluse nel pacchetto."
date: 2019-06-01
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Sono molti i vantaggi dei pacchetti snap, in primis la loro esecuzione sicura in una sandbox e le dipendenze pre-incluse nel pacchetto.

> La principale differenza rispetto flatpak è la non necessità del runtime GNOME, installato nel sistema.

Questa guida si applica a sistemi RHEL e Centos 7 ma non è escluso che funzioni anche su Fedora e altre derivate di RHEL.

## Preparazione repository

Per prima cosa installiamo la repository **epel**:

    sudo yum install epel-release

ed il plugin manager **copr**:

    sudo yum install yum-plugin-copr

infine aggiungiamo la repository **snapcore** a copr:

    sudo yum copr enable ngompa/snapcore-el7

## Installazione

Ora che la repository è stata installata, procediamo con l'installazione vera e propria via **yum**:

    sudo yum install snapd

e abilitiamo il servizio con **systemctl**:

    sudo systemctl enable snapd

ora digitiamo:

    snap --version

per verificarne il corretto funzionamento, nel caso in vui viene restituita la versione, tutto è andato per il verso giusto e snap è pronto all'uso.

### Risoluzione bug comune

Uno dei bug più frequenti è la posizione della directory /**snap**: molte applicazioni cercano infatti questa cartella nella root del sistema, ma in questo caso è presente in /var/lib/snapd/snap. Per risolvere questo problema, basta semplicemente creare un link simbolico, come di seguito:

    sudo ln -s /var/lib/snapd/snap /snap

_Good ***nix**?_  
_ - Mirko_