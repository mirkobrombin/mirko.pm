---
class: post
title: '#howto - Installazione di Discord su Linux'
date: 2020-06-19
layout: post
author: Mattia Cosma
author_github: mattiacosma
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**Discord** è sicuramente uno dei programmi di comunicazione tramite VoIP più usati al mondo. Noto principalmente come alternativa a TeamSpeak, Discord è disponibile su Windows, macOS e persino Linux.

In questa guida vedremo come installarlo nelle principali distribuzioni.

## Installazione

### Flatpak
Discord è disponibile anche come pacchetto Flatpak, installabile dalla repository *FlatHub* (leggi <a href="https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub">qui</a>). In alcune distribuzioni, Flatpak è presente di sistema e (spesso) disponibile tramite GNOME Software (come per Ubuntu) o AppCenter per quanto riguarda PopOS ed elementary OS.

Possiamo procedere all'installazione direttamente dalla <a href="https://flathub.org/apps/details/com.discordapp.Discord">pagina ufficiale</a>.

### Debian/Ubuntu e derivate

Per Debian, Ubuntu e derivate, Discord ha rilasciato la versione *stable*, scaricabile direttamente dal sito ufficiale. quindi il procedimento di installazione è abbastanza semplice.

Come prima cosa scarichiamo tramite `wget` il .deb dal sito di Discord (è necessario mantenere le singole virgolette o il download fallirà):

```bash
wget -O discord.deb 'https://discord.com/api/download?platform=linux&format=deb'
```

ed installiamolo utilizzando `dpkg`:

```bash
sudo dpkg -i /percorso/di/discord.deb
```

Una volta fatto ciò Discord sarà utilizzabile senza alcun tipo di problema, e anche gli aggiornamenti funzioneranno correttamente.

### OpenSUSE

Nelle repository standard di OpenSUSE non è disponibile un pacchetto di Discord, pertanto dovremo convertire quello per Debian con `Alien`.

Come prima cosa scarichiamo il *.deb*:

```bash
wget -O discord.deb 'https://discord.com/api/download?platform=linux&format=deb'
```

Poi tramite *Alien* convertiamo il *.deb* in un *.rpm*:

```bash
alien -r -c discord.deb
```

Una volta terminata la conversione installiamo il pacchetto con *Yast2*:

```bash
yast2 -i discord.rpm
```

### Arch Linux

Su Arch Linux, **Discord** è presente nella repo della community nella versione *stable*, installabile utilizzando `Pacman`:
```bash
pacman -S Discord
```

Su AUR invece si può trovare la versione *canary*, che non è stabile e che pertanto potrebbe avere diversi bug o problemi. Per installarla possiamo utilizzare un AUR helper come yay, di cui abbiamo parlato <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper">in una guida dedicata</a>

```bash
yay -S discord-canary
```

### Fedora e altre distribuzioni

Purtroppo la versione presente su Copr per Fedora è deprecata ma possiamo procedere come su qualsiasi altra distribuzione tramite la tarball. 

Scarichiamo prima di tutto l'archivio dal sito ufficiale:

```bash
wget -O discord.tar.gz 'https://discord.com/api/download?platform=linux&format=tar.gz'
```

ed estraiamo (<a href="https://linuxhub.it/articles/howto-decompressione-di-un-archivio-gz,-tar,-bz2,-zip,-rar,-7z">qui</a> una guida dedicata su come utilizzare al meglio *tar*):

```bash
tar xzf /percorso/di/discord.tar.gz
```

entriamo nel nuovo percorso creato ed eseguiamo il file *Discord*:

```bash
./Discord
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).