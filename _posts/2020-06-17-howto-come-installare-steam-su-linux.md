---
title: '#howto - Installazione di Steam sulle principali distribuzioni Linux'
published: 2020-06-17
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - fedora  
  - bash
---
**Steam** è senza ombra di dubbio uno dei negozi digitali per i videogiochi conosciuti al mondo, se non il più popolare. Nonostante il supporto sia notevolmente minore rispetto a Windows, molti giochi funzionano su distribuzioni Linux senza troppi problemi, sia direttamente che utilizzando **Proton**.

In questa guida vedremo come installare Steam sulle principali distribuzioni Linux.

## Installazione

Vediamo nello specifico quali sono gli step per installare Steam in una distribuzione specifica.

### Flatpak
Steam è disponibile anche come pacchetto Flatpak, installabile dalla repository *FlatHub* (leggi <a href="https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub">qui</a>). In alcune distribuzioni, Flatpak è presente di sistema e (spesso) disponibile tramite GNOME Software (come per Ubuntu) o AppCenter per quanto riguarda PopOS ed elementary OS.

Possiamo procedere all'installazione direttamente dalla <a href="https://flathub.org/apps/details/com.valvesoftware.Steam">pagina ufficiale</a>.

### Debian.Ubuntu e derivate

Steam su **Ubuntu, Debian e derivate** è installabile in tre modi diversi: sfruttando l'applicazione **Ubuntu Software**, tramite linea di comando oppure attraverso il pacchetto fornito direttamente da Valve.

Per installare Steam tramite Ubuntu Software è necessario:

- aprire l'applicazione "Ubuntu Software"

- cercare Steam

- installare Steam

Per installare Steam via **terminale**, invece, dovremo prima aggiungere la repository `multiverse`, che darà accesso non solo allo store di Valve, ma anche a molti altri software.

Aggiungiamo `multiverse`:

```bash
add-apt-repository multiverse
```

cerchiamo se sono presenti aggiornamenti:

```bash
apt update
```

e installiamo Steam:

```bash
apt install steam
```

Per installare Steam via pacchetto .deb possiamo sfruttare `wget`:

```bash
wget https://steamcdn-a.akamaihd.net/client/installer/steam.deb
```

e `dpkg` con l'opzione *-i*:

```bash
dpkg -i steam_latest.deb
```

Una volta avviata l'applicazione su sistemi 64-bit, potrebbe aprirsi una nuova finestra del terminale che ci chiederà di installare alcuni pacchetti a 32-bit (l'applicazione è scritta per questa architettura). Fatto ciò Steam cercherà aggiornamenti dal server e chiederà di aggiungere la propria repo per futuri update.

### Fedora e derivate

Per installare Steam su **Fedora, RHEL o derivate** possiamo utilizzare **RPM Fusion**, la nota repository della community molto apprezzata e conosciuta dagli utenti. L'abilitazione delle repository* Free e Non-Free* deve avvenire come illustrato nella [guida dedicata](https://linuxhub.it/articles/howto-fedora-31-post-installazione#title1).

Cerchiamo la presenza di aggiornamenti dei pacchetti:

```bash
dnf update
```

e installiamo Steam:

```bash
dnf install steam
```

Fatto ciò, sarà possibile aprire tranquillamente l'applicazione ed eseguire l'accesso.

### Arch linux

Nonostante non sia supportato ufficialmente, Steam su Arch Linux è relativamente facile e semplice da installare. Per prima cosa dobbiamo abilitare la repo multilib modificando il file `/etc/pacman.conf` e aggiungendo:

```bash
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Cerchiamo aggiornamenti:

```bash
pacman -Syu
```

e installiamo Steam:

```bash
pacman -S steam
```


Siete pronti a giocare? Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).