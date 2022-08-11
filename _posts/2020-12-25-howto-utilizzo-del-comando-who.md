---
title: '#howto - Utilizzo del comando who'
date: 2020-12-25
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Il comando `who` permette di sapere quali sono gli utenti attualmente loggati in un sistema Linux, oltre a mostrare informazioni come l'attuale runlevel, quando è stato effettuato il boot per l'ultima volta e molto altro ancora.

In questa guida andremo proprio a vedere **come usare who**, presente di default nelle distribuzioni Linux.

## Utilizzo di who

Quando `who` viene chiamato senza alcuna opzione o argomento, l'output sarà simile al seguente:

```bash
pi       pts/0        2020-12-24 12:44 (192.168.2.28)
```

in questo modo, `who` mostrerà una lista di tutti gli utenti attualmente collegati al sistema. Ogni linea contiene quattro campi, che mostrano il nome utente, il terminale, la data e ora in cui l'utente si è connesso e l'hostname o indirizzo IP da dove è connesso l'utente.

### Opzioni di who

`who` accetta diverse opzioni che raramente vengono usate. Tra queste troviamo `-b`, o `--boot`, che mostra l'ultima volta in cui si è avviato il sistema:

```bash
    system boot    2020-12-14 15:18
```

Per ottenere la lista dei "dead processes" è possibile usare invece `-d` o `--dead`, sempre se ce ne sono:

```bash
who -d
```

L'opzione `-r` o `--runlevel` dice a `who` di mostrare il runlevel attuale:

```bash
         run-level 5  2020-12-14 15:18
```

Per avere solo i nomi utenti e il numero degli utenti attualmente loggati, si usa l'opzione `-q` o `--count`:

```bash
pi
# users=1
```

L'opzione `-a`, `--all` forza `who` a stampare tutte le informazioni:

```bash
           system boot  2020-12-14 15:16
LOGIN      tty1         2020-12-14 15:17               407 id=tty1
LOGIN      ttyAMA0      2020-12-14 15:17               400 id=AMA0
           run-level 5  2020-12-14 15:18
pi       + pts/0        2020-12-24 12:44   .         15981 (192.168.2.28)

```

