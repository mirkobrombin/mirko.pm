---
title: '#howto - Guide rapide con cheat.sh'
date: 2021-07-15 11:00
layout: post
author: Massimiliano Noviello
author_github: linuxhubit
tags:

- cheat
- man
- guida
---

## Introduzione

Quante volte capita di avere bisogno di documentazione al volo ma non si ha la voglia di cercare su internet o sfogliare le pagine di man? Qui entra in gioco un fantastico servizio chiamato cheat.sh (o cht.sh).

È open source, quindi sarà possibile eseguire un'istanza di cheat.sh sulla propria macchina se lo si desidera.

Il suo segreto è la cheat.sh è la capacità di aggregare istruzioni, esempi e consigli da diverse fonti e presentarle in un modo semplice e non intrusivo.

Adesso vediamo come possiamo sfruttare questo strumento.


## Utilizzi

È possibile usare cheat.sh in vari modi:

### Ricerca comandi

Esistono molte utility di sistema di cui fin troppe persone dimenticano l'utilizzo, qui entra in gioco cheat.sh.

Per esempio facendo `curl cheat.sh/tar` (o `curl cht.sh/tar`) dal nostro emulatore di terminale sarà possibile osservare varie guide con dei comandi che vorremmo conoscere al volo come `tar xf` per l'estrazione di un file o `tar cf` per l'archiviazione.

Magari si è su una macchina Arch (o derivate) e si vuole installare yay?

Nessun problema! Basterà fare un `curl cheat.sh/yay` e comparirà una utile guida di installazione e utilizzo di yay.

### Ricerca documentazione

Se si vogliono ottenere informazioni su determinati aspetti di una tecnologia che si sta studiando, (ad esempio un linguaggio di programmazione) è possibile cercare documentazione e domande già risposte dalla community digitando la tecnologia in questione e l'argomento.

Ad esempio `curl cheat.sh/rust/print` ci mostrerà informazione sulla macro `print` del liguaggio Rust.

Magari vogliamo ottenere informazioni sulle classi i python, in quel caso ci basterà fare `curl cheat.sh/python/class`


## Ulteriori informazioni

Informazioni bonus sul servizio:

### cht.sh e client installabile

È possibile contattare cheat.sh anche usando il dominio "cht.sh", oppure scaricare l'omonimo client a riga di comando.

### Uso da browser web

Si può accedere al sito web anche tramite un normale browser web, quindi non solo tramite riga di comando con programmi come curl.


Se questo è il caso, faccelo sapere sul nostro [gruppo Telegram](https://t.me/linuxpeople).
