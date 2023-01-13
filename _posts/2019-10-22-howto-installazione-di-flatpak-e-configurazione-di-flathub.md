---
class: post
title: '#howto - Installazione di Flatpak e configurazione di Flathub'
description: "Flatpak è un formato pacchetto sempre più diffuso in Linux. Si tratta di un ambiente sandbox particolarmente responsivo che permette l'esecuz.."
date: 2019-10-22
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ubuntu  
  - gnome
---
Flatpak è un formato pacchetto sempre più diffuso in Linux.

Si tratta di un ambiente sandbox particolarmente responsivo che permette l'esecuzione di applicazioni isolate dal sistema. L'integrazione è totale, è possibile infatti lavorare con i file di sistema, accedere alle periferiche e sfruttare lo stesso tema in uso dal desktop environment.

Flathub è la repository software più generosa al momento, offre una vasta quantità di applicazioni pronte all'uso in formato Flatpak.

## Installazione

Per prima cosa vediamo come installare Flatpak nelle principali distribuzioni.

### Debian/Pop!_OS/Ubuntu e flavours

Per quanto riguarda Ubuntu, Kubuntu, Xubuntu, Lubuntu e gli altri membri della famiglia, troviamo Flatpak nelle repository di sistema, facilmente installabile tramite apt:

    sudo apt install flatpak

in questo modo sarà possibile sfruttare a pieno flatpak una volta riavviato il sistema.

Nel caso di GNOME Software presente nel sistema, possiamo installare un plugin che permette l'installazione facilitata delle flatpak direttamente dallo store:

    sudo apt install gnome-software-plugin-flatpak

### openSUSE

Possiamo installare flatpak tramite il gestore pacchetti di sistema, zypper:

    sudo zypper install flatpak

riavviamo il sistema per renderlo operativo.

### Arch Linux e derivate

Possiamo installare flatpak direttamente dal gestore pacchetti pacman:

    sudo pacman -S flatpak

### elementary OS

Per prima cosa installiamo gli strumenti necessari ad aggiungere repository di terze parti:

    sudo apt install software-properties-common --no-install-recommends

e aggiungiamo la repository di flatpak:

    sudo add-apt-repository ppa:alexlarsson/flatpak

per poi installare:

    sudo apt updatesudo apt install flatpak

come per le altre distribuzioni, riavviamo per renderlo operativo.

### Clear Linux

Possiamo procedere con l'installazione dalle repository di sistema, tramite il gestore dei pacchetti swupd:

    sudo swupd bundle-add desktop

riavviamo il sistema per renderlo operativo.

### Solus

In Solus è necessaria l'installazione di un secondo pacchetto ossia **xdg-desktop-portal-gtk** per il corretto funzionamento di Flatpak:

    sudo eopkg install flatpak xdg-desktop-portal-gtk

riavviamo il sistema per renderlo operativo.

> Se la tua distribuzione non è presente in questa guida, probabilmente perchè Flatpak è già presente come standard.
> 
> C'è da tenere in considerazione che nonostante la sua presenza da diversi anni, è comunque un pacchetto giovane e spesso necessita di una distribuzione recente e aggiornata per funzionare.

## Configurazione di Flathub

Il comando flatpak offre la flag **remote-add** per l'aggiunta di repository al sistema, sfruttiamola per aggiungere Flathub:

    flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

Possiamo installare nuovo software tramite il portale Flathub ([qui](https://flathub.org/home), premendo sul pulsante **Install** presente nella pagina di ogni applicazione) o tramite flag **install** del comando flathub:

    flatpak install com.spotify.Client

nell'esempio qui sopra installiamo il client Spotify per Linux.

In alternativa è possibile installare software tramite GNOME Software se presente il plugin **gnome-software-plugin-flatpak**, normalmente presente nelle repository di sistema e preinstallato nell'ambiente GNOME.

Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**