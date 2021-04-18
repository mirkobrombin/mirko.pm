---
title: '#howto - Installazione e configurazione di Projector'
published: 2021-04-21
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - python  
  - github  
  - bash
---
Projector è un programma creato da JetBrains, il suo scopo è quello di poter avviare da un server (o da un PC locale più potente della nostra macchina) una delle tante IDE JetBrains e di poterle usare direttamente dal Browser senza dover installare nulla sul nostro computer.

Questo è molto utile se per caso stiamo utilizzando un PC non molto performante e dobbiamo programmare qualcosa.

## Installazione

Per utilizzare Projector dobbiamo installare Python e alcune dipendenze, qui sotto metto i comandi per le distro più comuni

### Ubuntu

Se usiamo Ubuntu e derivate facciamo questo comando per installare Python:

```bash
apt install python3 python3-pip
```

Una volta aver installato Python dobbiamo installare delle librerie per far funzionare Projector con questo comando:

```bash
apt install less libxext6 libxrender1 libxtst6 libfreetype6 libxi6
```


### Fedora

Su Fedora installiamo Python utilizzando `dnf`:

```bash
dnf install python3 python3-pip
```

Anche qua una volta aver installato Python dobbiamo installare delle librerie per far funzionare Projector con questo comando:

```bash
dnf install less libxext6 libxrender1 libxtst6 libfreetype6 libxi6
```


### Arch Linux

Se utilizzato Arch Linux installiamo Python utilizzando `pacman`:

```bash
pacman -S python3 python3-pip
```

Su Arch Linux invece dobbiamo fare alcuni comandi in più perché le librerie hanno dei nomi diversi

```bash
pacman -S libxtst freetype2 libxi less libxrender
```

Dopo dobbiamo linkare alcune librerie perché hanno un nome diverso da quello che Projector cerca, quindi facciamo i se guanti comandi per linkare le librerie

Per linkare `libxext` facciamo:

```bash
ln -sf  ls -l /lib64/libXext.so.6.4.0 /lib64/libxext.so.6
```

E per linkare `libxrender` facciamo:

```bash
ln -sf  ls -l 
/lib64/libXrender.so.1.3.0 /lib64/libxrender.so.1.3.0
```

### CentOS/RHEL

Se utilizziamo CentOS/RHEL installiamo Python usando `yum`:

```bash
yum install python3 python3-pip
```

Anche qua una volta aver installato Python dobbiamo installare delle librerie per far funzionare Projector con questo comando:

```bash
yum install less libxext6 libxrender1 libxtst6 libfreetype6 libxi6
```

Bene, una volta aver installato tutte le dipendenze e Python ora possiamo installare Projector, facciamo il seguente comando per installare Projector utilizzando `pip`:

```bash
pip3 install projector-installer --user
# Facciamo il comando source cosi per ricaricare la path
source ~/.profile 
```

> Ricordo che utilizziamo la flag `--user` per non dover installare Projector come root

## Configurazione
 
 Una volta aver installato Projector, utilizziamo il comando `projector install`, ci ritroveremo con una UI del genere
 
![Screenshot%202021 04 15%20at%2009.58.30](storage/Screenshot%202021-04-15%20at%2009.58.30.png)

Qua possiamo scegliere una IDE da installare, una volta scelta la IDE preferita (Ricordo che per alcune IDE c'è bisogno di una licenza)

Una volta aver installato l'IDE che vogliamo facciamo  `projector run`, ci dovrebbe dare un indirizzo dove è hostata la nostra istanza della IDE, possiamo andarci direttamente dal nostro browser

![Screenshot%202021 04 15%20at%2010.05.28](storage/Screenshot%202021-04-15%20at%2010.05.28.png)

## Conclusione
Bene, una volta aver fatto tutti questi passaggi possiamo utilizzare la nostra IDE senza dover usare la nostra potenza di calcolo per esempio per compilare un programma, qui sotto lascio 2 link utili che riportano direttamente alla Wiki della Jetbrains, una per poter installare un vostro certificato SSL per poter utilizzare <a href="https://github.com/JetBrains/projector-installer#secure-connection">Projector sotto HTTPS</a> (che abilità delle funzioni in più) e la seconda spiega come installare <a href="https://github.com/JetBrains/projector-installer#android-studio-support">Android Studio</a>, perché per ragioni legali non si può installare direttamente dalla CLI di Projector

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
