---
title: "#howto – Utilizzo del comando 'chpasswd'"
description: "L'utilizzo del comando chpasswd si applica principalmente in un contesto produttivo dove si vede la condivisione di una macchina con piú utenti."
published: 2018-08-30
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
L'utilizzo del comando chpasswd si applica principalmente in un contesto produttivo dove si vede la condivisione di una macchina con piú utenti.

Questo comando mette a disposizione dell'Amministrazione, la capacitá di modificare la password di piú utenti simultaneamente, evitando frustanti perdite di tempo.

## Sintassi

La sintassi del comando é per lo piú standard:

    chpasswd [opzioni]

Il comando legge le informazioni dalle istruzioni che gli forniamo. Istruzioni che devono seguire il seguente schema:

    username:password

Fornendo una lista di username con relativa password in linea con lo schema, si andranno a modificare le password degli utenti citati con la nuova fornita.

Le password devono essere di tipo testuale, sará compito del comando criptarle.

## Utilizzo del comando

L'utilizzo é estremamente semplice, digitiamo e inviamo al Terminale:

    chpasswd

di conseguenza qualsiasi altra risposta inviata al comando verrá interpretata con istruzione, ad esempio inviando:

    mario:nuovaPassword123#

verrá cambiata la password dell'utente mario con: nuovaPassword123#.

Una volta modificate le password utente, usciamo dal comando inviando EOF, ossia digitando:

    Ctrl+D

## Crittografia

Normalmente le password vengono criptate da PAM.

É possibile istruire il comando per imporre un differente metodo di crittografia tramite l'opzione -c. Ad esempio per imporre il formato MD5:

    chpasswd -c MD5

Nel caso fosse necessario fornire password giá criptate, possiamo usare l'opzione -e ossia:

    chpasswd -e

e di conseguenza inviare le password giá criptate, sempre nella struttura:

    username:password

## Istruzioni via file

Un buon trucco é quello che scrivere un file/documento contenente le combinazioni di password, esempio:

    mario:nuovaPassword123#luigi:nuovaPassword987$

e impartirli con cat:

    cat [file] | chpasswd

Ad esempio se il nostro file si chiama lista_password.txt, esempio:

    cat lista_password.txt | chpasswd

Per dubbi e chiarimenti, utilizzate il box dei commenti qui sotto.

_?Good *nix _**__Mirko_**