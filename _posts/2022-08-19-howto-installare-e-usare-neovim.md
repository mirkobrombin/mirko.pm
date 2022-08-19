---
title: '#howto - Installare e usare neovim'
date: 2022-08-19 08:00
layout: post 
author: Floppy
author_github: raspFloppy 
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags: 
- ubuntu
- fedora
- archlinux
---

Possiamo considerare Neovim come un Vim "sotto steroidi", infatti possiamo contare su una maggiore estendibilità, un supporto nativo a LSP e ad una community più aperta ed inclusiva.
Esploriamo questo fantastico editor meglio insieme.


## Installazione
Prima di tutto, installiamo Neovim sulle nostre distribuzioni preferite:

### Archlinux
```bash
pacman -S neovim
```

### Ubuntu e derivate

```bash
apt install neovim
```

### Fedora 

```bash
dnf install neovim
```

### Uso 

Una volta installato possiamo farlo partire con il comando:

```bash
nvim
```

## File di configurazione

I file di configurazione di Neovim si trovano all'interno della cartella `~/.config/nvim/`; all'interno troveremo il file `init.vim`, che contiene
tutte le configurazioni legate a Neovim, quindi tutti i 'set', le shortcut eccetera.
Avremo poi il file `plugins.lua`, che contiene tutti i plugins necessari per Neovim (volendo, quest'ultimo può essere collocato dentro la cartella `lua/`) di cui parleremo in un successivo articolo.

In breve avremo una configuarazione del genere:
```bash
.
├── init.vim
├── lua
│   └── plugins.lua
```
La comodità di Neovim è come avete visto che a differenza di Vim rispetta [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)


## Cos'è LSP
Nell'introduzione abbiamo detto che Neovim ha il supporto nativo con LSP, ma cos'è LSP?
In breve, "LSP", Language Server Protocol è un protocollo OpenSource che permette di avere tutte quelle funzionalità, tra le quali l'autocompletamento, che rende più comoda la scrittura di codice.
Esso comunica con un server di linguaggio che a sua volta si integra con una libreria di un linguaggio di programmazione per gestire tutte quelle "regole" e quei "modelli" che il linguaggio scelto segue (ad esempio, il controllo dei tipi).

LSP ha lo scopo di standardizzare come comunicano tool come quelli dell'autocompletamento, in modo tale da avere un protocollo unico per più linguaggi e semplificare lo sviluppo, per esempio, di plugins ed estensioni. Essendo LSP integrato in Neovim, questo ha una maggiore e semplificata estendibilità a livello di componenti aggiuntivi.


## Conclusioni
La scelta dell'editor è puramente personale e soggettiva, nonostante ciò non si può negare che Neovim abbia alcune peculiarità che potrebbero stuzzicare e non poco i più curiosi, questa non vuole infatti essere una gara a quale sia l'editor migliore ma a mostrare semplicemente come Neovim sia un ottima alternativa a Vim.
