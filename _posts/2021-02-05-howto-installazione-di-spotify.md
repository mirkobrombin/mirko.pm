---
title: '#howto - Installazione di Spotify su Linux'
date: 2021-02-05
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  - fedora  - bash
---
**Spotify** è il servizio di streaming musicale più utilizzato e conosciuto al mondo, e probabilmente sono molti coloro che, per un motivo o per un altro, desiderano avere l'applicazione installata sulla propria distribuzione Linux.

In questa guida vedremo **come installare Spotify su Linux**.

> La versione Linux di Spotify potrebbe non ricevere la stessa frequenza di aggiornamenti come su Windows, e potrebbero anche essere presenti ulteriori bug. 

## Installazione di Spotify

### Snap

Spotify si può installare tramite `snap`:

```bash
snap install spotify
```

### Flatpak

Se si preferisce, invece, usare `Flatpak`, Spotify sarà disponibile anche con questo manager. Per prima cosa, aggiungiamo la repo di Flathub:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

e successivamente installiamo Spotify:

```bash
flatpak install flathub com.spotify.Client
```

### Ubuntu, Debian e derivate

Se invece di usare Snap o Flatpak preferiamo sfruttare il classico pacchetto, è possibile farlo senza troppi problemi.

Su **Ubuntu**, **Debian** e distribuzioni derivate dovremo prima aggiungere una chiave GPG di Spotify, inserire la repo ufficiale nella lista del nostro *sources.list.d* di `apt` e, successivamente, installare il programma:

```bash
curl -sS https://download.spotify.com/debian/pubkey_0D811D58.gpg | apt-key add - 
echo "deb http://repository.spotify.com stable non-free" | tee /etc/apt/sources.list.d/spotify.list
apt-get update && apt-get install spotify-client
```

Installando il programma da qui possiamo essere sicuri di ricevere tutti gli aggiornamenti appena disponibili direttamente da Spotify.

### Fedora, CentOS e derivate

Su Fedora, CentOS e derivate, oltre a Snap e Flatpak, è possibile usare le repo di **RPM Fusion**. Per prima cosa, attiviamo quest'ultime:

```bash
dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

e installiamo il pacchetto:

```bash
dnf install lpf-spotify-client
```

### Arch Linux

Spotify non è disponibile sulle repository standard di Arch Linux. Per installarlo dovremo invece ricorrere **all'AUR**. Con un package manager come Yay, effettuiamo il download e installazione del pacchetto con questo comando:

```bash
yay -S spotify
```

## Conclusione

Con questa guida avrete compreso come installare Spotify su tutte le principali distribuzioni Linux. Se, invece, preferite usare il servizio, ma da terminale, allora potrebbe interessarvi [Spotify TUI](https://linuxhub.it/articles/howto-come-installare-e-configurare-spotify-tui).

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.