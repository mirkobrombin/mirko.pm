---
class: post
title: '#howto - Installazione di Unreal Engine 4 su Linux'
date: 2020-08-24
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
Unreal Engine è un motore grafico realizzato, mantenuto e distribuito da Epic Games.

Dalla quarta versione del software, è stato introdotto il supporto a Linux. È infatti possibile scaricarne il sorgente e compilarlo per la propria macchina.

In questa guida vediamo come installare Unreal Engine 4 su Linux, nello specifico tratteremo l'installazione su Ubuntu, Fedora e Arch Linux.

## Connessione a GitHub
Prima di tutto dobbiamo richiedere accesso alla repository privata che ospita il sorgente del software. Raggiungiamo il <a href="https://www.epicgames.com/id/login">sito ufficiale</a> di Epic Games e creiamo un nuovo account o effettuiamo l'acesso con i nostri dati. Portiamoci alla dashboard del nostro profilo, nello specifico alla sezione <a href="https://www.unrealengine.com/dashboard/connected">connessioni</a> ed effettuiamo il link al nostro account GitHub.

Una volta fatto avremmo accesso alla repository privata e possiamo procedere con i prossimi step.

## Ottenere il codice
Procediamo col clonare il contenuto della repository, per farlo ci servirà lo strumento `git`, installabile su *Ubuntu* via `apt`:

```bash
apt install git
```

su *Arch Linux* via `pacman`:

```bash
pacman -S git
```

mentre su *Fedora, RHEL e Centos*:

```bash
dnf install git
```

Creiamo un nuovo percorso pulito:

```bash
mkdir $HOME/UnrealEngine
```

e cloniamo con `git`:

```bash
git clone https://github.com/EpicGames/UnrealEngine.git
```

la durata varia in base alla propria connessione.

## Compilazione
Una volta ottenuto il codice, portiamoci all'interno del percorso appena creato e procediamo alla costruzione dei file per la compilazione:

```bash
./Setup.sh
./GenerateProjectFiles.sh 
```

infine compiliamo il progetto:

```bash
make
```

## Avvio
Una volta completa la compilazione, troviamo il file eseguibile in `Engine/Binaries/Linux/UE4Editor`. Quindi:

```bash
cd Engine/Binaries/Linux
./UE4Editor
```

per avviare un progetto già esistente, basterà passare il suo percorso come parametro:

```bash
./UE4Editor /percorso/progetto/progetto.uproject
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).