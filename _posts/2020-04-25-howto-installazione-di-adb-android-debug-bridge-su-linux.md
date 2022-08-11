---
title: '#howto - Installazione di ADB (Android Debug Bridge) su Linux'
date: 2020-04-25
layout: post
author: Niccolò Martiri
author_github: talebian
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - bash
---
**ADB** è uno strumento usato per eseguire operazioni su un telefono Android via USB o rete. La suite dei programmi ADB fornisce uno strumento per operazioni su _Android/Recovery_, uno per le operazioni in _Fastboot_ e altri per il filesystem, come la formattazione delle partizioni.

L'installazione di ADB può essere fatta sia tramite il gestore pacchetti della propria distro sia dal sito di _Android Developer_. Nel nostro caso procederemo scaricando la versione originale dal sito Google, perfetto per tutte le distribuzioni. 

## Installazione

Per prima cosa dobbiamo scaricare l'archivio `platform-tools-latest-linux.zip` dalla repository ufficiale, possiamo farlo via `wget`:

```bash
wget https://dl.google.com/android/repository/platform-tools-latest-linux.zip
```

qual'ora non fosse presente possiamo installarlo col nostro gestore pacchetti di riferimento.

Scompattiamo ora l'archivio e posizioniamolo nella corretta locazione:

```bash
unzip platform-tools-latest-linux.zip -d .bin && cp -r .bin/platform-tools/* .bin && rm -rf .bin/platform-tools
```

## Variabile d'ambiente

Procediamo aggiungendo la directory di ADB alla variabile d'ambiente *PATH*, che può variare da shell a shell.

Vediamo come fare per le più usate (bash, zsh, fish).

### bash

```bash
echo "export PATH=$HOME/.bin:$PATH" >> .bashrc
```

### zsh

```bash
echo "export PATH=$HOME/.bin:$PATH" >> .zshrc
```

### fish

```bash
echo "set PATH $HOME/.bin $PATH" >> $HOME/.config/fish/config.fish
```

Una volta fatto riavviamo la console e verifichiamo se tutto è andato correttamente, per farlo basterà dare il comando `adb --version` il quale dovrà restituire la versione dello strumento.

## Configurazione

Prima di collegare il nostro dispositivo Android dobbiamo prima configurare alcune regole per *udev* in modo da riconoscere più dispositivi possibili.

Possiamo scaricare queste regole da una repository GitHub che supporta la gran parte dei dispositivi. Per prima cosa dobbiamo installare lo strumento `git`, normalmente non preinstallato nel sistema (potete far riferimento a <a href="https://linuxhub.it/articles/howto-installazione-di-git-su-ogni-distribuzione-linux">questa guida</a>).

Portiamoci in una locazione vuota e cloniamo la repository:

```bash
git clone https://github.com/M0Rf30/android-udev-rules
```

entriamo nel percorso appena creato e procediamo all'installazione via `install.sh`:

```bash
cd android-udev-rules 
sudo bash install.sh $HOME
```

## Utilizzi di ADB

ADB può essere utilizzato per interagire con Android ed effettuare operazioni come _copiare file, installare app, eseguire il debug e flashare firmware_. Ci sono anche altri software esterni che permettono di usare in modo avanzato ADB, come **adbfs** per montare un filesystem FUSE tramite ADB per esempio, **adb-sync** per la sincronizzazione via ADB e **scrcpy** per il controllo del device.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).