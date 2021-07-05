---
title: "#howto – Utilizzo del comando 'aspell'"
description: "aspell e è un correttore ortografico interattivo che si occupa di analizzare l'input o file, alla ricerca di errori ortografici, permettendoti di correggerli istantaneamente."
date: 2018-09-19
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
**aspell** e è un **correttore ortografico interattivo** che si occupa di analizzare l'input o file, alla ricerca di errori ortografici, permettendoti di correggerli istantaneamente.

Trattandosi di uno strumento da riga di comando, é utile se affiancato da un editor di testo anch'esso da riga di comando, come vi o nano.

## Sintassi

aspell é composto dalla seguente sintassi:

    aspell [opzioni]

Questo tool viene fornito con varie impostazioni che andiamo ora a trattare singolarmente.

### Correzione file di testo

Uno dei migliori impieghi per questo tool é quello nella correzione di file di testo. Possiamo infatti fornire un file al comando con la flag **-c**:

    aspell -c documento.txt

Come possiamo notare, il software evidenzierá parola per parola da correggere (solo se errata), mostrando le possibili soluzioni e strumenti di interazione (Ignora, sostituisci, aggiungi, annulla, ..).

### Controllo termine (e liste)

Un altro impiego di questo tool lo troviamo in fase consultiva, é infatti possibile **controllare singole parole** tramite la flag **-a**:

    aspell -a

Una volta digitato, il tool rimarrá in attesa del termine da analizzare, basterá digitarne uno per ricevere immediatamente risposta.

Se vogliamo invece **controllare una lista** di parole, usiamo la flag **list**:

    aspell list

Una volta digitato il tool rimarrá in attesa di una lista anziché un singolo termine, una volta digitate (una per riga), procediamo con **Ctrl+D per la risposta.**

Per dubbi e chiarimenti, utilizzate il gruppo Telegram qui sotto.

_?Good *nix _**__Mirko_**