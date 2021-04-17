---
title: '#howto - Installazione di MusicBrainz Picard su Linux'
published: 2021-01-15
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
**MusicBrainz Picard** è un programma desktop che permette di aggiungere metadata alle proprie canzoni e album senza troppe difficoltà e in maniera rapida e veloce. MusicBrainz è il database, mentre Picard rappresenta lo strumento che aggiunge i tag ai file musicali.

In questa guida vedremo come installare MusicBrainz Picard sulle principali distribuzioni Linux.

## Installazione di MusicBrainz Picard

### Snap

MusicBrainz Picard è uno dei tanti programmi disponibili nello Store di **Snap**. Per installarlo possiamo semplicemente eseguire il seguente comando:

```bash
snap install picard
```

### Flatpak

MusicBrainz Picard è anche disponibile come pacchetto di **Flatpak**. Per prima cosa, aggiungiamo la repo di Flathub se non è già disponibile sul nostro dispositivo:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

ed installiamo Picard:

```bash
flatpak install flathub org.musicbrainz.Picard
```

### Ubuntu

Per installare MusicBrainz Picard su **Ubuntu** possiamo procedere aggiungendo prima la **PPA** dedicata, aggiornando il sistema e poi scaricando il pacchetto del software.

Ci sono due PPA di MusicBrainz Picard, una per il programma **stabile** e una per la versione che viene aggiornata quasi quotidianamente, ossia "**rolling**".

Per aggiungere la prima scriviamo questo comando nel terminale:

```bash
add-apt-repository ppa:musicbrainz-developers/stable
```

e per la seconda:

```bash
add-apt-repository ppa:musicbrainz-developers/daily
```

Successivamente, in entrambi i casi, eseguiamo gli altri due comandi per installare Picard:

```bash
apt update
apt install picard
```

### Debian

Su **Debian** possiamo procedere direttamente tramite `apt`:

```bash
apt install picard
```

### Fedora e derivate

Per installare MusicBrainz Picard su **Fedora e derivate** è possibile usare `dnf`:

```bash
dnf install picard
```

o anche `yum`:

```bash
yum install picard
```

### Arch Linux

MusicBrainz Picard è disponibile nelle repo di **Pacman** su **Arch Linux**:

```bash
pacman -S picard
```

## Conclusione

Dopo aver seguito questi passaggi per la vostra distribuzione, MusicBrainz Picard dovrebbe essere stato installato correttamente, ed ora potrete iniziare a taggare velocemente e con precisione la vostra libreria musicale.


Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.