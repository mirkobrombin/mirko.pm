---
title: "#howto - Utilizzo del comando 'crontab'"
description: "L'automatizzazione di varie operazioni su una macchina, sono un tassello fondamentale per l'amministrazione di sistemi ma anche.."
date: 2018-05-24
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
L'automatizzazione di varie operazioni su una macchina, sono un tassello fondamentale per l'amministrazione di sistemi ma anche per la normale quotidianità "casalinga". Possiamo trarre beneficio dall'automatizzare inviando, ad esempio, report via e-mail sull'utilizzo della memoria della nostra macchina.

## Cosa sono

I cron non sono altro che delle istruzioni lette ad intervalli temporali regolari dal sistema, cui a loro volta forniscono istruzioni a quest'ultimo, sull'azione da automatizzare in quel preciso intervallo di tempo. Precisamente, nel caso necessitassimo di avviare un processo, in una determinata ora del giorno, ogni giorno, questo sistema ci permetterá di fornire al sistema l'istruzione per farlo.![](https://linuxhub.it/wordpress/wp-content/uploads/2018/05/cron_mail.png)

## La sintassi

Un cron é un insieme di istruzioni, come abbiamo giá detto, formato principalmente da 2 elementi:

*   fascia temporale
*   operazione da automatizzare

    * * * * * echo "Eseguimi ad ogni minuto" >> esempio.log

Quello qui sopra é un'esempio di cron che, ad ogni minuto, scrive sul file esempio.log la frase: "Eseguimi ad ogni minuto".

### Le fasi temporali

Le fasi temporali, sono il lasso di tempo tra un'operazione e l'altra e sono raffigurate da degli asterischi all'inizio dell'istruzione.

Ci sono cinque campi (nell'esempio precedente sono cinque asterischi), separati da uno spazio, ognuno dei quali accetta un numero, un asterisco o una variabile. I campi specificano, in ordine da sinistra a destra:

*   minuti da 0 a 59
*   ore da 0 a 23
*   giorno del mese da 1 a 31
*   mese da 1 a 12
*   giorno della settimana da 0 (domenica) a 6 (sabato)

Per facilitarne l'uso, esistono diverse variabili (variabile - significato):

*   `@hourly` - `0 * * * *`
*   `@daily` - `0 0 * * *`
*   `@weekly` - `0 0 * * 0`
*   `@monthly` - `0 0 1 * *`
*   `@yearly` - `0 0 1 1 *`
*   `@reboot` - ad ogni riavvio

## Registrare cron

La registrazione dei cron avviene tramite editor VIM (v):

    crontab -e

digitando il comando qui sopra si aprirá l'editor dove é possibile registrare nuovi cron (uno per riga).

Per abilitare la scrittura digitiamo **i** e successivamente aggiungo una riga di prova:

    @hourly echo "www.linuxhub.it" >> /home/<nostro_username>/test.log

una volta terminato, premiamo ESC e successivamente **:wq** per salvare le modifiche. In questo modo il nostro nuovo cron é registrato ed entrerá in funzione ad ogni ora.

## Lista dei cron registrati

Per mostrare la lista dei cron registrati é opportuno sfruttare la flag **-l** del comando:

    crontab -l

che ci mostrerá il seguente output:

    0 * * * * echo "www.linuxhub.it" >> /home/<nostro_username>/test.log

## Modificare e disattivare i cron

Per modificare un cron possiamo ricorrere allo stesso procedimento per registrarli, aprendo con la flag **-e** il file crontab e modificando la riga del cron interessato. Per eliminare/disattivare un cron ci basterá semplicemente eliminare la riga del cron in causa.

### Modificare i cron di altri utenti

Per modificare un cron, registrato da un terzo utente, possiamo sfruttare la flag **-u** specificando l'username dell'utente usato in fase di registrazione del cron:

    crontab -u <username> -e

e procediamo con lo stesso metodo usato per la registrazione e modifica.

### Eliminare tutti i cron

Per disattivare in un colpo solo tutti i cron ci basterá digitare:

    crontab -r

Buon divertimento con i cron e ricordate di disattivare il cron registrato nell'esempio.

_Good *nix **_Mirko**_