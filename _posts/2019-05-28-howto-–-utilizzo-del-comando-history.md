---
title: "#howto – Utilizzo del comando 'history"
published: 2019-05-28
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
Sono molte le righe di comando che eseguiamo da terminale, soprattutto se lavoriamo su server e capita spesso di doverli rivedere, per questo il comando **history** torna molto utile in queste circostanze.

Lo strumento di cui parliamo ci permette di sfogliare lo storico delle ultime 500 righe di comando, ripercorrendo le operazioni effettuate.

## Sintassi

Questo comando è molto semplice da capire quanto la sua sintassi:

    history [opzioni]

di base senza alcuna opzione mostra l'output dei comandi eseguiti in un elenco numerato.

## Utilizzo del comando

Per funzionare, questo comando fa riferimento alla cronologia presente in _~/.bash_history_ o_ ~/.history _in base alla tipologia di shell.

### Mostrare lo storico

Digitando semplicemente il comando:

    history

riceviamo l'output in forma di lista numerata in ordine cronologico con gli ultimi 500 comandi eseguiti da riga di comando, dallo stesso utente in uso.

#### Rieseguire un comando

Una volta ricevuta la lista dei comandi eseguiti, ci basterà digitarne il numero, preceduto da **!**, ad esempio nell'output:

    38 cd40 ls -l41 cd Scaricati

ci basterà digitare:

    !40

per ripetere il comando di riga 40\. In caso di liste più lunghe, possiamo digitare:

    !!

per eseguire l'ultimo della lista, altrimenti:

    !-1

per eseguire il penultimo.

### Cerchiamo un comando

Nel caso in cui ricordiamo una parte del comando, basterà sfruttare il pattern, nell'esempio in cui cerchiamo il comando **hostname** e ricordiamo solo **host**, possiamo proseguire in questo modo:

    !hos

il che ritornerà come output il comando più recente che inizia con **hos**.

#### Ricerca avanzata

Sfruttando la combinazione di tasti **CTRL+R **da terminale, abbiamo accesso alla ricerca interattiva e digitando l'inizio o una porzione di un comando, ci verrà mostrato l'output con l'ultimo comando che corrisponde ai termini di ricerca.

### Cancellare lo storico

Possiamo cancellare la lista degli ultimi comandi eseguiti, pulendo interamente lo storico grazie all'opzione **-c**:

    history -c

### Modificare il limite dello storico

Di base il limite dello storico è di 500 ma possiamo modificarlo cambiando il valore di **HISTSIZE**:

    HISTSIZE=800

in questo caso cambiamo il limite a 800 righe.

Per dubbi e chiarimenti, utilizzate la sezione Domande nel menu in alto o il nostro gruppo [Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**