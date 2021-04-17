---
title: '#howto - Installazione di Rust e Cargo con rustup'
published: 2020-03-11
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
**Rust** è un linguaggio di programmazione performante, veloce e sicuro sviluppato da Mozilla Research.

In questa guida vedremo come installare sulle principali distribuzioni Linux: Rust e **Cargo**, il suo package manager e build tool, utilizzando lo strumento **rustup**.

## Utilizzo di rustup

Quello che andremo ora ad utilizzare è uno strumento che in pochissimi minuti ci permette di installare sia il linguaggio Rust che il suo package manager sul nostro sistema. Per cominciare, dovremo semplicemente scaricare ed eseguire lo script ufficiale via *curl*:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

A questo punto avremo la possibilità di configurare alcune opzioni, come l'*host triple*, che identifica l'architettura e il sistema operativo che possediamo, la *toolchain* di Rust, composta da stable, beta e nightly, e il *profilo*, che può essere minimal, default o complete.

Per scegliere le impostazioni a noi più gradite, dovremo premere il tasto *2* quando richiesto. Dopo aver configurato tutto, se siamo sicuri di voler procedere, premiamo *1*.

Una volta completata la configurazione ci basterà riavviare la sessione corrente o banalmente riavviare il terminale in uso per usufruire di Rust, ma nel caso non fosse così possiamo digitare il seguente comando per entrare nell'ambiente:

```bash
source $HOME/.cargo/env
```

## Verifica installazione

Per verificare di aver installato correttamente Rust, possiamo digitare il comando:

```bash
rustc -V
```
il quale dovrà restituire la versione installata come segue:

```bash
rustc 1.41.1 (f3e1a954d 2020-02-24)
```

Possiamo procedere allo stesso modo per controllare che anche Cargo sia stato installato correttamente:

```bash
cargo -V
```
dove l'output sarà:

```bash
cargo 1.41.0 (626f0f40e 2019-12-03)
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).