---
title: '#howto - Utilizzo del comando head'
date: 2020-08-05
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - apache  - bash
---
Il compito del comando `head` è quello di mostrare l'**inizio di un file**. Nonostante la sua specifica funzionalità, questo strumento ci può tornare utile in molte occasioni.

In questa guida vedremo come utilizzarlo al meglio, parlando anche dei diversi parametri.

## Sintassi

La sintassi del comando è banalmente molto semplice:

```bash
head [opzioni] [file]
```

passando un file come argomento senza alcuna opzione, questo svolgerà la sua funzionalità primaria spiega di seguito.

## Utilizzo del comando

Come accennato poco fa, digitando semplicemente il comando seguito da un file:

```bash
head prova.txt
```

riceveremo a schermo le **prime dieci righe** al suo interno:

```bash
prova
prova
prova
prova
prova
prova
prova
prova
prova
prova
```

Se un file ha meno di dieci righe, `head` mostrerà tutto il file.

### Controllare l'output

Utilizzando il parametro *-n*, è possibile dire ad `head` quante righe devono essere mostrate. Nel caso in cui volessimo mostrare solamente 5 righe del nostro file di testo, possiamo procedere così:

```bash
head -n 5 prova.txt
```

dove l'output sarà simile al seguente:

```bash
prova
prova
prova
prova
prova
```

Il numero di righe da mostrare può essere specificato prima o dopo il file selezionato, e ciò non ha un impatto sul risultato finale.

#### Output in base al byte

Con `head` e il parametro *-c* possiamo inoltre specificare quanti byte vogliamo mostrare del nostro file specificato. Vogliamo vedere le prime 10 lettere di *prova.txt*? Benissimo, si può procedere così:

```bash
head -c 10 prova.txt
```

con un output simile a:

```bash
prova
prov
```

### Visualizzare file multipli

Con `head` possiamo anche ottenere le prime dieci righe di **file multipli** senza un particolare limite. Per fare ciò è semplicemente necessario utilizzare `head` e inserire i percorsi dei due file, senza alcun parametro:

```bash
head prova.txt numeri.txt
```

e in questo caso l'output sarà simile al seguente:

```bash
==> prova.txt <==
prova
prova
prova
prova
prova
prova
prova
prova
prova
prova

==> numeri.txt <==
1
2
3
4
5
6
7
8
9
10
```

Anche qui è possibile utilizzare il parametro *-n*, e per visualizzare, ad esempio, la prima riga di tutti i file presenti in una cartella possiamo procedere in questo modo:

```bash
head -n 1 *
```

con un output simile a:

```bash
==> numeri.txt <==
1

==> prova.txt <==
prova
```

### head e altri comandi

`head` può essere utilizzato assieme ad altri comandi, magari per mostrare solamente alcuni contenuti (in ordine alfabetico) di una cartella. Vogliamo vedere i primi dieci file o cartelle della cartella */etc/*?

```bash
ls /etc/ | head
```

dove l'output sarà simile al seguente:

```bash
NetworkManager
PackageKit
X11
adduser.conf
alternatives
apache2
apparmor
apparmor.d
apport
apt
```

Anche qui, possiamo specificare un numero massimo di contenuti da visualizzare grazie a *-n*:

```bash
ls /etc/ | head -n 5
```

```bash
NetworkManager
PackageKit
X11
adduser.conf
alternatives
```

Come potete vedere, `head` può essere molto utile in alcune situazioni, per evitare anche di dover aprire ogni volta il proprio editor di testo per vedere cosa c'è scritto nella prima riga.


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).