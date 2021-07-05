---
title: '#howto - Utilizzo del comando "w"'
description: "Una delle principali utilità per l'amministrazione di sistemi Linux, é il comando.."
date: 2018-05-21
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
Una delle principali utilità per l'amministrazione di sistemi Linux, é il comando _w_, che mostra informazioni sugli utenti attualmente connessi a un sistema, incluso quello che stanno facendo. In questo articolo, discuteremo questo strumento utilizzando alcuni esempi di facile comprensione. Il comando é di per se molto semplice e di pochi parametri:

    w [options] user [..]

nel dettaglio:

*   **w** restituisce la lista degli utenti online nel sistema con diverse informazioni (tty, ip, ora del login, ..)
*   **[options]** opzioni di visualizzazione
*   **user** nello specifico, l'utente che vogliamo monitorare

Digitando quindi semplicemente _w_, otterremo il seguente risultato:

    @linuxhub ~# w09:47:53 up 185 days, 14:15,  1 user,  load average: 0.11, 0.13, 0.13USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHATop2     pts/0    2-000-000-00.ip2 09:35    1.00s  0.01s  0.00s w

Come possiamo vedere, il comando ci restituisce diverse informazioni utili, compreso il processo in esecuzione da parte dell'utente (in questo caso w).

## Utente specifico

Molto utile, in certe circostanze, é monitorare un utente specifico. Per fare ció basta semplicemente aggiungere l'username di sistema dell'utente:

    @linuxhub ~# w op210:01:36 up 185 days, 14:29,  1 user,  load average: 0.01, 0.04, 0.08USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHATop2     pts/0    2-000-000-00.ip2 09:35    0.00s  0.03s  0.00s w op2

## Opzioni

Il comando dispone di una piccola raccolta di opzioni per facilitare la visualizzazione dei risultati.

### Nascondere l'header

Aggiungendo la flag **-h** andremo a nascondere l'header della tabella utenti:

    @linuxhub ~# w -hop2     pts/0    2-000-000-00.ip2 09:35    1.00s  0.01s  0.00s w -h

### Visualizzazione minimale

Per un rapido accesso alle informazioni, senza tante distrazioni ma solo l'essenziale (user, tty, indirizzo ip, idle, processo), possiamo utilizzare la flag **-s**, che mostra una versione ridotta/minimale dell'output:

    @linuxhub ~# w -s09:55:48 up 185 days, 14:23,  1 user,  load average: 0.06, 0.07, 0.10USER     TTY      FROM              IDLE WHATop2     pts/0    2-000-000-00.ip2  4.00s w -s

### Nascondere l'indirizzo IP

Invece, per nascondere l'indirizzo IP degli utenti, ci basta utilizzare la flag **-f**:

    @linuxhub ~# w -f09:58:32 up 185 days, 14:26,  1 user,  load average: 0.01, 0.05, 0.09USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHATop2     pts/0     09:35    0.00s  0.02s  0.00s w -f

Ovviamente, tutte queste flag si possono utilizzare assieme (**-hfs..**) per ottenere particolari combinazioni di dati.

## Esempio finale

Nell'esempio finale, una possibile combinazione é:

    @linuxhub ~# w  -hfs op2op2     pts/0      2.00s w -hfs op2

che restituisce le informazioni dell'utente **op2**, in formato minimale, senza header e indirizzo IP. Per dubbi e chiarimenti, utilizzate il box dei commenti qui sotto.  

_Good *nix **_Mirko**_