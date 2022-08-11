---
title: '#howto - Creazione di servizi runit' 
date: 2021-12-09 10:10
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- Artix 
- Void 
- Devuan
- init 
- daemon
- systemd
- runit
---

## Intro

Abbiamo giá affrontato precedentemente questo argomento, e abbiamo capito il metodo [articolo precedente](https://linuxhub.it/articles/howto-gestire-servizi-runit/) per gestire dei servizi runit già esistenti. 
Saperli creare é sempre una competenza in piú, e che risulterá sempre molto utile.

Andiamo quindi a impostare i nostri servizi.


## Struttura di un servizio

Essi non sono altro che cartelle all'interno di una grande cartella d'esecuzione (se non conosci la tua magari dai un'occhiata all'[articolo](https://linuxhub.it/articles/howto-gestire-servizi-runit/) dove viene trattata la gestione dei servizi), adesso vedremo alcuni file fondamentali che l'utente dovrà includere in queste cartelle.



### File `run`

Il file `run` è uno script nella root del servizio, con un normale shebang
(comunemente `#!/bin/sh` ) che si occupa di effettuare l'avvio del servizio.

Esso deve essere eseguibile, quindi é opportuno dare i seguenti comandi

```bash
chmod +x run
```

subito dopo la sua creazione.

Nonostante la sua somiglianza ad un normale script è importante ricordare un paio di cose:

* È importante non eseguire nulla che rimanga in background rispetto all'esecuzione dello script (ad esempio l'operatore `&`)

* È opportuno eseguire i vari applicativi con la parola chiave `exec`.



Rendendo il contenuto di un file `run` in questa maniera:

```bash
#!/bin/sh

exec nome_processo
```



### File `config` 

Il file `config` esattamente come prima sarà uno script, ma il suo scopo è fornire impostazioni allo script `run`, di conseguenza nella maggiorparte dei casi si tratterà solamente di un file contentente delle variabili da esportare. Esso si attiene alle stesse regole stabilite per run.

*NB: Questo file è totalmente opzionale*



### File `finish` 

È uno script esattamente come `run` e `config`, e come loro si attiene alle regole stabilite per `run`, solo che esso viene eseguito in fase di arresto del processo.

*NB: Questo file è totalmente opzionale*



### Cartella `log` 

Questa é una parte molto interessante.

La cartella `log` contiene generalmente questi due file:

* Un secondo `run`, il cui compito è catturare lo stdout del primo e loggarlo

* Un file `current` dove viene indicato qual è lo script di log in uso.


Tuttavia qui è richiesto l'uso del logger di runit chiamato `svlogd`, che uscirebbe fuori dallo scopo di questo articolo.

*NB: Tutta questa cartella è totalmente opzionale*



### Supervise (creata da runit)

La cartella `supervise` viene creata da runit stesso al primo avvio del servizio e contiene vari file necessari a runit per tenere traccia di esso.
