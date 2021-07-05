---
title: "#howto – Utilizzo del comando 'cksum'"
description: "Capita spesso di dover verificare l'integrità di un documento trasferito/scaricato e controllarne quindi la validità con la fonte.."
date: 2019-05-31
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Capita spesso di dover verificare l'integrità di un documento trasferito/scaricato e controllarne quindi la validità con la fonte, procedura semplificata da **cksum**.

Nello scenario in cui scarichiamo l'immagine ISO di una distribuzione e vogliamo essere sicuri che corrisponda all'originale e che quindi non sia compromessa o incompleta, ci viene in soccorso il comando **cksum** con cui possiamo verificare il checksum originale con quello ottenuto dalla copia da noi scaricata.

## Sintassi

La sintassi del comando è la seguente:

    cksum [file]

ed offre le seguenti opzioni:

*   **--help **per la guida
*   **--version** per mostrare la versione dello strumento

## Utilizzo del comando

Non ci sono più modi di usare il comando, questo strumento è molto semplice e fa esclusivamente ciò per cui è stato creato, ossia mostrare la checksum da un dato file:

    cksum file_scaricato

come output ci verrà fornita la checksum da confrontare con quella originale, di norma messa a disposizione dello sviluppatore/creatore sul sito ufficiale della risorsa. Nel caso in cui le stringhe corrispondano, il file è integro.

La checksum cambierà ad ogni aggiornamento/modifica del file.

_Good ***nix**?_  
_ - Mirko_