---
title: '#howto - Installare Node Version Manager (NVM) su Debian 9'
description: "NodeJS è una runtime di JavaScript OpenSource multipiattaforma orientato agli eventi per l'esecuzione di codice Javascript Server Side, costruita sul motore Javascript V8 di Google Chrome."
date: 2019-04-08
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - github  
  - bash
---
Inanzitutto è doveroso capire che cos'è **NodeJS** e **NVM** (Node Version Manager) il quale gestisce appunto le varie versioni di NodeJS installate nel sistema.

> NodeJS è una runtime di JavaScript OpenSource multipiattaforma orientato agli eventi per l'esecuzione di codice Javascript Server Side, costruita sul motore Javascript V8 di Google Chrome.

## Installazione NVM

Per prima cosa apriamo un terminale o una sessione SSH accedendo come **root** e controlliamo la disponibilità di nuovi aggiornamenti ai pacchetti via **apt**:

    sudo apt update

procediamo poi con l'installazione di **curl**, necessario per il prossimo step:

    sudo apt install curl

scarichiamo poi lo script di installazione:

    curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh

e verifichiamo che il file sia effettivamente disponibile nel nostro sistema:

    cat install_nvm.sh

se vi apre la schermata correttamente siete apposto, ora andiamo avanti

Procediamo ora con la vera e propria installazione di NVM, eseguiamo quindi lo script appena scaricato:

    sh install_nvm.shsource ~/.profile

Una volta installato, possiamo controllarne l'effettivo funzionamento digitando:

    nvm ls-remote

il quale restituirà come risultato le versioni disponibili di NodeJS

## Installazione NodeJS via NVM

La versione che ho scelto per questa guida è la 10.15.4, la versione più stabile nel momento in cui scrivo.

L'installazione è semplificata, sfruttiamo la flag **install** seguita dalla versione che vogliamo installare:

    nvm install 12.13.0

successivamente all'installazione, informiamo nvm sulla versione di NodeJS che vogliamo usare tramite la flag **use**:

    nvm use 12.13.0

Infine controlliamo che la versione di NodeJS sia effettivamente quella da noi richiesta (la 10.15.3):

    node -v

dovreste avere un riscontro simile a questo:

    root@hersy:~# node -vv10.15.3root@hersy:~#

Possiamo usare la flag **ls** per verificare le versioni disponibili, installate nel sistema:

    nvm ls

Il quale restituirà un risultato simile:

    root@hersy:~# nvm ls-> v10.15.3default -> 8.11.1 (-> v8.11.1)node -> stable (-> v10.15.3) (default)stable -> 10.15 (-> v10.15.3) (default)root@hersy:~#

nell'esempio qui sopra, possiamo vedere che la mia versione di Default è la 8.11.1, possiamo cambiare questa definizione tramite la flag **alias**:

    nvm alias default 12.13.0

e selezioniamo la nuova istruzione:

    nvm use default

Per dubbi e chiarimenti scrivete nel nostro gruppo [Telegram](https://t.me/gentedilinux).