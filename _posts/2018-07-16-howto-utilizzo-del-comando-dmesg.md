---
title: "#howto - Utilizzo del comando 'dmesg'"
description: "L'utilizzo di questo comando torna spesso utile su macchine di produzione, dove un aggiornamento o un nuovo hardware puó causare conflitti"
published: 2018-07-16
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
Quando il sistema è attivo e in esecuzione, se si connette un dispositivo hardware, viene caricato anche il driver corrispondente. Naturalmente, il kernel fa anche molte altre cose. Spesso e volentieri é utile controllare le informazioni di questa operazione e lo possiamo fare attraverso dmesg.

L'utilizzo di questo comando torna spesso utile su macchine di produzione, dove un aggiornamento o un nuovo hardware puó causare conflitti. Grazie a questo comando possiamo identificare in poco tempo il malfunzionamento e procedere alla correzione.

Il comando dmesg consente infatti, di stampare o controllare il buffer del kernel.

## Sintassi

Vediamo la sintassi del comando:

    dmesg [opzioni]

L'output é abbastanza lungo ma di facile comprensione, ogni riga é ben documentata.

## Filtrare gli errori

Per quanto facile possa essere leggere l'output, torna spesso utile filtrare per un certo livello.

Ogni riga/log viene classificata con un livello di importanza, i seguenti:

*   emerg - Sistema inutilizzabile
*   alert - Azione immediata richiesta
*   crit - Critico
*   err - Errore
*   warn - Avviso
*   notice - Normale
*   info - Informazione
*   debug - Informazioni per sviluppatori

Nel nostro caso vogliamo visualizzare solo i log con livello: warn, quindi solo avvisi:

    dmesg --level=warn

## Data e dispositivi

Se si sta cercando un log in particolare e si conosce la fascia oraria in cui é stato creato, possiamo utilizzare la flag -T per visualizzare la Timestamp del log:

    dmesg -T

Nel caso in cui dobbiamo trovare il log di un dispositivio in particolare di cui conosciamo il nome, possiamo procedere in questo modo, nel nostro caso cerchiamo il log di eth0:

    dmesg | grep -i eth0

Per dubbi e chiarimenti, utilizzate il box dei commenti qui sotto.

_?Good *nix_ **__Mirko_**