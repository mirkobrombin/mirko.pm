---
title: "#howto – Utilizzo del comando 'mv'"
description: "Il comando mv è la soluzione integrata in Linux per spostare e rinominare file nel sistema. Il suo utilizzo è estremamente facile e non richiede istruzioni complicate."
date: 2019-03-23
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Il comando "**mv**" è la soluzione integrata in Linux per spostare e rinominare file nel sistema. Il suo utilizzo è estremamente facile e non richiede istruzioni complicate.

## Sintassi

La sintassi del comando è la seguente:

    mv path nuova_path

indifferentemente dall'uso che ne vogliamo fare (rinominare o spostare file), la sinstassi è sempre composta nel seguente modo:

*   locazione corrente
*   nuova locazione

sempre in questo ordine.

## Utilizzo del comando

Come dicevo, l'utilizzo di questo comando è estremamente semplice, sia per spostare che rinominare un file, un possibile esempio è il seguente:

    mv ~/Scaricati/file.tar.gz ~/il_mio_file.tar.gz

in questo caso stiamo spostando **file.tar.gz** dalla cartella Scaricati alla Home, rinominandolo in **il_mio_file.tar.gz**. Possiamo quindi eseguire due operazioni in una.

### Sovrascrittura

Nel caso specifico in cui stiamo per spostare un file in una locazione dove ne esiste già uno con lo stesso nome, questo comando non ci informa della sovrascrittura e procede comunque (a meno di insufficienti permessi).

Ad ovviare questo problema entra in gioco la flag **-i**, nell'esempio:

    mv -i  ~/Scaricati/file.tar.gz ~/il_mio_file.tar.gz

l'output sarà:

    mv: overwrite 'il_mio_file.tar.gz'?

dove sarà necessario rispondere **Y** o **N** per sovrascrivere o annullare l'operazione.

In alternativa è possibile usare la flag **-n** per evitare a priori di sovrascrivere un file già esistente, digitando quindi:

    mv -n  ~/Scaricati/file.tar.gz ~/il_mio_file.tar.gz

nel caso **~/il_mio_file.tar.gz** esista già, non verrà sovrascritto.

> Importante è tenere a mente che questo comando non supporta più flag contemporaneamente, utilizzando quindi più opzioni come **-i -n** verrà presa in considerazione solo quest'ultima.

### Aggiornamento file

Una delle flag meno conosciute di questo comando è **-u**, una opzione che permette di "aggiornare" un file con una versione più recente. Facciamo l'esempio pratico in cui abbiamo 2 file:

*   testo.txt in ~/Scaricati aggiornato alle 17:00 di oggi
*   testo.txt in ~/Testi aggiornato alle 16:35 di oggi

utilizzando la flag **-u** come nell'esempio qui sotto:

    mv -u ~/Scaricati/testo.txt ~/Testi/testo.txt

il file in **~/Testi** verrà sovrascritto poichè la nuova versione rsiulta più recente, nel caso contrario non verrà modificato alcun file.

### Backup dei file

Nel caso in cui vogliamo spostare un file in una locazione in cui ne è già presente uno con lo stesso nome, possiamo usare la flag **-b** per crearne un backup:

    mv -b ~/Scaricati/testo.txt ~/Testi/testo.txt

quindi nella locazione **~/Testi** troveremo i seguenti file:

*   testo.txt
*   testo.txt~

dove **testo.txt****~** è la copia backup del file che abbiamo sovrascritto.

### Stato delle operazioni

Utilizzando la flag **-v** possiamo controllare lo stato delle operazioni in esecuzione, digitando ad esempio:

    mv -v ~/Scaricati/testi.tar.gz ~/Archivi/testi.tar.gz

l'output sarà:

    '~/Scaricati/testi.tar.gz' -> '~/Archivi/testi.tar.gz'

utile nel caso in cui vogliamo spostare più file da una locazione all'altra.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**