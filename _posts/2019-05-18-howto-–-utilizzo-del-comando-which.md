---
class: post
title: "#howto – Utilizzo del comando 'which'"
description: "Capita soprattutto in ambienti di lavoro e sviluppo, di dover identificare il percorso assoluto di uno strumento/comando.."
date: 2019-05-18
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Capita soprattutto in ambienti di lavoro e sviluppo, di dover identificare il percorso assoluto di uno strumento/comando/link, ed è in queste circostanze che viene in nostro aiuto il comando **which**.

Un esempio può essere quello in cui sono presenti più versioni di uno strumento nel sistema (es. **nano**)  e vogliamo capire se al suo richiamo, stiamo utilizzando la versione predefinita di sistema o quella in una differente posizione.

## Sintassi

Questo è uno di quei comandi che fa semplicemente ciò che deve, per questo la sua sintassi è estremamente semplice e non offre molte opzioni:

    which [-a] nome

dove la flag **nome** identifica il nome assoluto dello strumento o link.

## Utilizzo del comando

Come dicevo poco fa, l'utilizzo di questo comando è estremamente semplice, nell'esempio in cui vogliamo trovare il percorso assoluto di **bash**:

    which bash

il possibile output è il seguente:

    /usr/bin/bash

### Utilizzo con liste

Possiamo fornire più nomi da cui prelevare il percorso assoluto, semplicemente alternandoli ad uno spazio:

    which bash echo

di conseguenza abbiamo un output simile al seguente:

    /usr/bin/bash/bin/echo

### Tutti i percorsi

Sfruttando la flag **-a** nonchè l'unica opzione, possiamo istruire questo strumento a mostrare tutti i percorsi disponibili:

    which -a nome

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**