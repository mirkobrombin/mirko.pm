---
title: '#howto - Installazione di REAPER su Linux'
date: 2020-12-07
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**REAPER** è una DAW (Digital Audio Workstation) completa e "gratuita" che viene utilizzata da produttori e artisti per creare musica. Il software in questione è molto valido perchè supporta canali MIDI e audio illimitati, e ha una serie di VST (Virtual Instruments Technology) già inclusi nel software. Supporta anche la maggior parte di controller MIDI (Tastiere MIDI, Launchpads e altro).

In questa guida vedremo come installarlo su Linux.

> REAPER è uno shareware come WinRAR: se lo usate solo per scopo personale potete usarlo gratuitamente per sempre, ma il creatore consiglia di comprare il software poiché il costo della licenza è molto basso per gli individuali (60 dollari).

## Installazione

### Prerequisiti

Prima di scaricare REAPER ci serviranno i seguenti pacchetti:

* libc6, libstdc++ per gcc 4.x e superiori
* libgdk-3
* ALSA

Per installare queste dipendenze possiamo eseguire i seguenti comandi, in base alla distribuzione usata:

#### Arch Linux

```bash
pacman -S libstdc++ alsa-utils libgdk-3
```

#### Ubuntu e derivate

```bash
apt install libstdc++ libgdk-3 alsa
```

#### Fedora

```bash
dnf install libstdc++ libgdk-3 alsa-utils
```

### Installazione

Per installare REAPER scarichiamo prima l'ultima versione da [qui](https://www.reaper.fm/) per Linux. Scaricata la cartella compressa, andiamo col terminale nella cartella dove abbiamo scaricato il file ed eseguiamo il seguente comando:

```bash
tar -xvpf nomefile.tar.xz
```

Ci ritroveremo con una cartella e una struttura simile alla seguente:

```
????reaper_linux_x86_64
    ????REAPER
    ????install-reaper.sh (Per installare REAPER dentro /opt/)
    ????readme-linux.txt
```

#### Installazione Portable

Se vogliamo tenere REAPER in versione portable dovremo entrare nel terminale dentro la cartella `REAPER` e con il seguente comando dare il permesso di esecuzione al file eseguibile:

```bash
chmod +x reaper
```

Dopodichè possiamo usare il comando `./reaper`, e a quel punto si aprirà il software.

#### Installazione Permanente

Per installare REAPER dentro la cartella `/opt` in maniera permanente dobbiamo prima dare i permessi di esecuzione allo script di installazione:
```bash
chmod +x install-reaper.sh
```
e poi eseguire lo script:
```bash
./install-reaper.sh
```
Una volta avviato, ci comparirà un piccolo menù di installazione dove dovremo premere "I" per installare REAPER. Per disinstallare REAPER una volta installato, possiamo rieseguire lo script con i seguenti parametri:

```bash
# --quiet per non far comparire il menù, --uninstall per rimuovere il software
./install-reaper.sh --quiet --uninstall
```

### Installare Plugins esterni

Esistono molti plugin gratuiti per REAPER che supportano anche Linux (Vi consiglio il sito [VST4Free](http://vst4free.com) per trovarne alcuni). Facendo un esempio, di seguito viene spiegato come installare Zebralette, un sintetizzatore gratuito della u-he.

> Ricordo che l'installazione potrebbe variare da VST a VST

Scarichiamo Zebralette da [qui](https://u-he.com/products/zebralette/) e selezioniamo la versione per Linux. Entriamo nella cartella in cui abbiamo scaricato il pacchetto compresso, e scompattiamolo con questo comando:

```bash
tar -xvpf filecompresso.tar.xz
```

Entriamo dentro la cartella di Zebralette, diamo i permessi di esecuzione allo script di installazione ed eseguiamolo:

```bash
chmod +x install.sh
./install.sh
```

Dopo aver installato Zebralette, apriamo REAPER e in automatico dovrebbe fare la scansione dei VST installati.

## Conclusione

Dopo aver seguito questi passaggi avrete un DAW per realizzare musica sulla vostra distribuzione Linux. 

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.