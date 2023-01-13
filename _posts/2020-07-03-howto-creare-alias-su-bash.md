---
class: post
title: '#howto - Creare alias su bash'
date: 2020-07-03
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
In **bash** (e nelle shell in generale) gli **alias** sono essenzialmente delle scorciatoie a comandi e sequenze di maggior lunghezza e complessità.

In questa guida vedremo die tipologie di configurazione: base e avanzata.

## Configurazione base

Creare un alias in bash è molto semplice. Per fare ciò, dobbiamo semplicemente digitare un comando simile al seguente:

```bash
alias nome_alias="comando_da_utilizzare"
```

Ad esempio, un alias che al comando `home` ci porta alla nostra cartella *home* senza usare ogni volta il comando `cd` potrebbe essere simile al seguente:

```bash
alias home="cd /home/nomeutente"
```

Al posto di *home* è possibile inserire una parola qualsiasi, pertanto possiamo anche utilizzare *utente* o *user*.

## Alias avanzati

Su bash, volendo, si possono usare anche degli **alias avanzati**: quest'ultimi vengono spesso adoperati per evitare di utilizzare una lunga combinazione di comandi e abbreviare il tutto in uno solo senza troppe complicazioni. 

Per crearne uno dobbiamo modificare il file `~/.bashrc` con il nostro editor di testo preferito. La sintassi per creare un alias Bbsh avanzato è molto semplice. Essi possono essere dichiarati in due diversi formati:

```bash
nome_funzione () {
  [comandi]
}
```

oppure

```bash
function nome_funzione {
  [comandi]
}
```

Per fare un semplice esempio, proviamo a creare un alias che con un comando ci permetta di creare una cartella e di entrarci nello stesso momento:

```bash
function mkcd ()
{
  mkdir -p -- "$1" && cd -P -- "$1"
}
```

*mkcd* è il nome della funzione, che è anche il comando dell'alias. Una volta eseguito, bash creerà una cartella con un nome a nostra scelta ("$1" indica il nome che sceglieremo) e ci entrerà automaticamente grazie a `cd`.

Gli alias a volte possono essere ancora più complessi, ma per un uso quotidiano quelli base sono quelli più utilizzati, e spesso si possono evitare a meno che non sia necessario evitare di scrivere qualcosa di molto lungo.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.