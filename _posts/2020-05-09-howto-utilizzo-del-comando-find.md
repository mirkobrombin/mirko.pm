---
title: '#howto - Utilizzo del comando find'
date: 2020-05-09
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
`find` è uno dei comandi più utili nel contesto della console.

Come è possibile intuire dal nome, `find` ha il compito di cercare file e cartelle, magari con la stessa estensione. In questa guida vedremo come utilizzarlo, imparando anche i diversi parametri.

## Utilizzo del comando

In questo esempio andiamo a cercare **tutti i file** che terminano con **estensione .txt** nella cartella home di un utente a nostra scelta includendo anche le sottocartelle.

```bash
find /home/username/ -name "*.txt"
```

Nel caso, invece, volessimo specificare la nostra home è necessario sostituire il percorso con *$HOME*, la variabile d'ambiente che indica la cartella del utente corrente.

Se avessimo intenzione di cercare un file specifico nella nostra home utilizzeremo il parametro "-name":

```bash
find $HOME -name "nomefile.estensione"
```

## Sintassi

Per utilizzare `find` sono necessari tre parametri: le **opzioni del programma**, il path (o **cartella**) in cui vogliamo cercare il nostro file e **l'espressione**, che può essere ad esempio il nome del file. Vediamo il seguente esempio:

```bash
find -L /home/username/ -name "fattura.pdf"
```

Questa sintassi indica a `find` che deve cercare nella cartella home di un utente un file chiamato "fattura.pdf" e che i link simbolici, nel caso ci fossero, devono essere seguiti, questo perchè indicato da *-L*.

In questo caso:

```bash
find -P /home/username/ -name "fattura.pdf"
```

il programma esegue esattamente lo stesso procedimento spiegato in precedenza, ma a differenza di prima, vista la presenza del parametro *-P*, i link simbolici non verranno seguiti.

Con find è anche possibile cercare delle **cartelle** e non solamente dei file. Mettiamo caso di dover individuare nei nostri documenti una cartella dedicata ai recenti pagamenti. Per fare ciò, possiamo avvalerci del parametro *-type d*:

```bash
find . -type d -iname "pagamenti"
```

A differenza dei precedenti esempi abbiamo utilizzato *iname* al posto di *name*, ma questo per un semplice motivo. Con *iname*, infatti, find cercherà tutti i file (o cartelle) con il nome da noi specificato in maniera "**non case-sensitive**", dunque ignorando la presenza o meno di una lettera maiuscola. Con *name*, infatti, sarà necessario inserire il nome esatto rispettando le lettere maiuscole e minuscole.

Ricollegandoci all'esempio appena fatto, nel caso volessimo cercare dei pagamenti salvati nel nostro dispositivo negli ultimi sette giorni, ad esempio, è possibile sfruttare il parametro *-mtime*:

```bash
find ./pagamenti/ -iname "*.pdf" -mtime -7

```

In questo modo il programma cercherà e ci mostrerà tutti i PDF dei pagamenti che abbiamo modificato o creato negli **ultimi sette giorni**.

## Eliminare un file con find

Con *find* è anche possibile trovare e **cancellare** immediatamente un file grazie a *-delete*: nonostante possa risultare utile in determinati casi, come ad esempio nella ricerca di backup inutilizzati, è necessario ricordarsi di utilizzare questo parametro con la **dovuta cautela** per non cancellare più file del voluto. Vediamo un esempio:

```bash
find ./backup/ -iname "*.bak" -delete
```

Così facendo tutti i file che terminano con l'estensione .bak e che si trovano nella cartella `backup` saranno cancellati per sempre.

## Trovare dei file in base al contenuto con grep

Un altro comando noto agli utenti di qualsiasi distribuzione Linux è `grep`, che, come sappiamo, ci permette di catturare il contenuto di un file. `grep`, però, è utilizzabile anche in combinazione con `find`. Ad esempio, supponiamo di aver bisogno di trovare un file che contiene al suo interno la parola "Linux" e di cui non ricordiamo il nome:

```bash
find . -type f -exec grep "Linux" '{}' \; -print
```

Questa sintassi all'inizio potrebbe sembrare molto complicata, ma è più facile da comprendere di quel che sembra. Con questo comando si andrà a cercare con `grep`, la cui esecuzione è specificata da *-exec*, nella stessa cartella in cui si trova l'utente (indicata da un punto) un file (specificato con *-type f*) che al suo interno contiene il termine "Linux". 

Le parentesi graffe, che sono un semplice rimpiazzo dei risultati di `find`, devono trovarsi all'interno di singole virgolette per evitare che `grep` generi male il nome del file. Il comando *-exec* viene terminato con il punto e virgola, carattere di cui si dovrebbe eseguire l'escape con *\* per evitare che il terminale interpreti tutto ciò. Il risultato finale dovrebbe essere simile al seguente:

```bash
Linux

./prova
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).
