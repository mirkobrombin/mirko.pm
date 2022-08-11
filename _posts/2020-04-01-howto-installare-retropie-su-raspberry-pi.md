---
title: '#howto - Installare RetroPie su Raspberry Pi'
description: "Retropie è un software che ci permette di giocare ad una vastità di giochi per console retro (NES, SN.."
date: 2020-04-01
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - bash
---
**Retropie** è un software che ci permette di giocare ad una vastità di giochi per console retro (NES, SNES, SEGA Master System ecc.) direttamente dal nostro Rapsberry Pi.

Una delle funzionalità principali di Retropie è quella che usa come base RetroArch, uno dei migliori Emulation Station che potete trovare online, essendo il più personalizzabile e flessibile rispetto alla concorrenza.

**Disclaimer**: la pirateria è un crimine, per possedere una ROM è necessario avere con sè una copia del gioco originale.

## Installazione

Per prima cosa scarichiamo l'immagine di Retropie da [qui](https://retropie.org.uk/download/) (Se avete un Pi 4 andate alla fine della guida), ed una volta completato il download apriamo un programma di scrittura su SD come [Etcher](https://www.balena.io/etcher/) o qualsiasi utility da CLI e flashiamo il file sulla nostra piccola scheda.

Dopodichè, collegate al Raspberry PI un monitor ed un controller, e siete pronti a configurare a dovere Retropie.

## Configurazione

Se l'installazione è stata completata senza particolari problemi, una volta avviato il proprio dispositivo ci si potrà trovare di fronte il classico menù da dove è possibile eseguire la configurazione.

Fatto ciò è il momento di inviare le ROM al nostro Raspberry Pi. Pe prima cosa scarichiamo un client FTP, come ad esempio Filezilla, e copiamo i file nella seguente posizione:

```bash
/home/pi/RetroPie/roms
```

Una volta completato il processo, riavviate la EmulationStation cliccando Start -> Quit -> Restart EmulationStation.

## Installazione su Raspberry Pi 4

Nel caso possedeste un Raspberry Pi 4, la procedura da seguire sarà diversa perchè al momento non esiste una versione dedicata alla nuova versione del dispositivo. Per ovviare a questo problema, però, basterà seguire procedimento presente qui sotto.

Prima di tutto scarichiamo dal <a href="https://www.raspberrypi.org/downloads/">sito di Raspberry Pi</a> **Raspbian Desktop**, la distribuzione Linux principale per il dispositivo, e flashiamola nella nostra scheda SD con gli strumenti citati all'inizio della guida.

Dopo aver effettuato il setup iniziale ed esserci assicurati di aver installato git, installabile con questo comando:
```bash
sudo apt-get install git
```
cloniamo la repo di RetroPie:

```bash
sudo git clone --depth=1 https://github.com/RetroPie/RetroPie-Setup.git
```

Ora, apriamo il file di configurazione `retropie_packages.sh` con un comune editor di testo e sotto alla stringa `__version` inseriamo il seguente parametro: `__platform=rpi3`.

![image-20200331133449147](storage/image-20200331133521221.png)

Salviamo il file ed avviamo l'installer con questo comando:

```bash
sudo ./retropie_setup.sh
```

All'apertura del menù di installazione dovremo scegliere di eseguire una Basic Install come evidenziato nell'immagine sottostante.

![image-20200331133720329](storage/image-20200331133720329.png)

Una volta completata l'installazione sarà necessario inserire il seguente comando alla fine del file presente in `/etc/xdg/lxsession/LXDE-pi/autostart`:

```bash
lxterminal -e /usr/bin/emulationstation
```

## Conclusione

Retropie è stato installato correttamente: per avviare un gioco bisognerà selezionare la ROM desiderata, e sarà possibile configurare l'emulatore come ci pare, modificando anche il tema e l'input dei comandi del proprio controller.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).