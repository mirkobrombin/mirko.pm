---
class: post
title: "#howto - Utilizzo del comando 'screen"
description: "Sono diverse le circostanze in cui screen viene in nostro soccorso, dimostrandosi uno degli strumenti piu utili."
date: 2019-06-02
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian
---
Sono diverse le circostanze in cui **screen** viene in nostro soccorso, dimostrandosi uno degli strumenti piu utili.

Dobbiamo eseguire un processo che rimanga sempre in esecuzione? Avete per sbaglio chiuso la vostra sessione interrompendo il vostro processo di [Dotnet](https://linuxhub.it/article/howto-installare-net-core-su-debian)?

Con questo comando questi problemi scompariranno in un batter d'occhio, vediamo quindi come funziona.

## Sintassi

La sintassi di **screen** è la seguente

    screen [opzioni]

sfruttando la flag **--help** riceviamo come output la lista completa delle opzioni disponibili. Possiamo inoltre avere accesso tutti i comandi disponibili, digitiamo in sequenza **_CTRL+A_** e poi **_?_**. 

## Utilizzo del comando

Digitiamo semplicemente il comando per aprire subito una nuova sessione:

    screen

da ora ogni comando verrà eseguito nella sessione controllata da screen.

### Nome sessione

Nel caso si dovessero avere più sessioni di screen, dare un nome a ciascuna aiuterebbe non poco ad organizzarle. Per iniziare una sessione con un nome sfruttiamo la flag **-S**:

    screen -S nome_della_sessione

### Uscire dalla sessione

Abbiamo avviato il nostro processo e vogliamo uscire dalla sessione senza interromperne il funzionamento. Basta semplicemente premere in sequenza _**CTRL+A**_ e _**d**_. Se l'output è simile al seguente:

    [detached from numerocasuale.tty1.hostname]

significa che siamo usciti correttamente dalla nostra sessione.

### Riprendere una sessione

Per riprendere una sessione che abbiamo abbandonato in precedenza, viene in nostro soccorso la flag **-r**:

    screen -r

Questo funziona se abbiamo solamente una sessione aperta. Se, come spiegato prima, ne dovessimo avere più di una, ci basterà specificare il nome dato precedentemente:

    screen -r nome_della_sessione

Se non ci ricordiamo il nome della sessione o non ne abbiamo impostato uno, sfruttiamo la flag **-ls**:

    screen -ls

per avere una lista di tutte le sessioni aperte. L'output sarà simile a questo:

    There are screens on:        3225.pts-0.Senker       (05/28/2019 04:15:52 PM)        (Detached)        17302.minecraft (05/25/2019 03:02:39 PM)        (Multi, attached)2 Sockets in /run/screen/S-alex.

Per rientrare nella sessione con ID 3225, digitiamo

    screen -r 3225

### Log operazioni

Nel caso in cui una di queste sessioni deve rimanere in background per diverse ore, se non giorni o mesi, torna utile poter salvare in un file tutto il suo operato. Possiamo fare ciò eseguendo la seguente combinazione di tasti:

    CTRL+A+H

questo creerà un file chiamato **hardcopy.0**, contenente tutte le operazioni effettuate in quella sessione.