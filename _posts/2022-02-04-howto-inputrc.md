---
title: '#howto - Comprendere ed usare inputrc' 
date: 2022-02-04 11:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
published: false
tags: 
- inputrc 
---

Sapevate dell'esistenza di un file *denominato inputrc* che può aiutarvi a personalizzare la mappatura dei tasti del vostro terminale?  

Combinazioni di tasti, funzioni dello standard output, dello standard input ed altro, vediamo come possiamo sfruttare al meglio questo strumento.



## La readline

La prima domanda è quali software siano affetti dai cambiamenti che apportiamo a questo file, per comprenderlo a pieno è necessario introdurre il concetto di `readline`.



Nei sistemi operativi UNIX le librerie di **readline** rappresentano un livello di interazione che si interpone tra l'inserimento utente e quei software che gestiscono *lo standard input e lo standard output*, ovvero i software che normalmente agiscono tramite linea di comando (i.e. terminali).  

È forse inutile dire che trovate tutte le informazioni che desiderate in merito sul manuale della libreria, disponibile direttamente nei vostri sistemi tramite il comando: 

```bash
man readline
```

Oppure in versione più interattiva con `info`: 

```bash
info readline
```



 ### Precisazione: bash vs altre shell 

Se vi state chiedendo perché le vostre modifiche sulla `readline` non influenzano la vostra shell (i.e. `zsh` con `oh-my-zsh`) è perché loro stesse ridefiniscono poi le opzioni della `readline`.
Quindi se volete vedere come le vostre modifiche hanno effetto poi sul sistema, utilizzate `bash`.



## Manipolare il file

È innanzitutto necessario sapere che esistono due copie del file, una globale che si trova in `/etc/inputrc`, una per ogni utente nella propria home denominata come `$HOME/.inputrc`. Se quest'ultima non dovesse esistere, è possibile crearla da sé.

### Struttura del file 

Nel file possiamo trovare due tipologie di "righe" diverse tra loro, normalmente raggruppate e divise. Una prima parte dovrebbe contenere istruzioni del tipo:

```bash
set nome-variabile valore
```



Una seconda parte dovrebbe invece contenere questo tipo di righe: 

```bash
"sequenza": comando
```



Ovviamente esiste una sintassi ben precisa per ognuna di queste righe.  

Quelle del primo tipo si chiamano "*variabili*", ogni variabile può essere impostata come attiva o no ( a volte possono avere anche più tipologie di opzioni).  

Quelli del secondo tipo sono assegnamenti di sequenze a *comandi*.  

### Le variabili

Le variabili abilitano dei determinati comportamenti dei programmi che sfruttano la `readline`.  Ad esempio *il numero di colonne che devono essere disponibili per riga*, *quando deve suonare l'allarme del terminale*, *il numero di righe disponibili quando si preme l'autocompletamento*, etc...

Le variabili nel file vengono impostate con la seguente sintassi: 

````bash
set nome-variabile valore
````

Normalmente il `valore` è selezionabile tra `on` o `off`, ma ci sono casi in cui son possibili altre scelte.  

Ovviamente la lista completa si trova nelle `info` della `readline`: `info readline` &rarr; `Command Line Editing` &rarr; `Readline init file` &rarr; `Readline Init File Syntax`, ma vediamo una selezione di alcune variabili che possono essere utili: 

- `colored-stats` :  impone l'uso dei colori nell'output dell'auto completamento, se vi è più di un risultato. 
- `comment-begin` : tramite questa variabile puoi impostare quale carattere va inserito a inizio linea per far si che un comando sia considerato un commento. Di default è `#` (modificare questo valore potrebbe invalidare diversi script)
- `completion-ignore-case` : se abilitata, l'auto completamento diventa **case-insensitive** (cioè indipendente da maiuscole/minoscole)
- `completion-map-case` : se abilitata insieme alla proprietà di cui sopra, l'auto completamento tratterà in equal modo gli *underscore* ed i *trattini*
- `skip-completed-text` : se abilitata, quando l'auto completamento avviene a metà di una parola, cancella tutto ciò che c'è davanti il cursore. Ad esempio se ci posizioniamo in mezzo a `Makefaile` (alla prima e) e premiamo tab, normalmente verrà scritto `Makefilefaile`, con questa opzione abilitata invece diventerebbe `Makefile` 
- `mark-directories` : se abilitata, l'auto completamento completerà le cartelle aggiungendo anche un `/` finale.
- `horizontal-scroll-mode`: se abilitata, quando un comando eccede la dimensione orizzontale del terminale (ovvero le colonne) la vista viene spostata sulla destra e non va a capo invece come succede normalmente.
- `enable-bracketed-paste` : se abilitata, quando si copia un blocco di istruzioni che contengono dei caratteri "a capo", non vengono inviati ma vengono lasciati in modifica fino a che non si preme invio esplicitamente. Il comportamento predefinito prevede che se si copiano 2 linee di codice su bash, la prima venga inviata e venga lasciata in modifica solo la seconda.



#### un esempio: 

Abilitiamo alcune variabiuli come `horizontal-scroll-mode`, `completion-ignore-case` e 

`colored-stats`: 

```bash
set colored-stats on
set completion-ignore-case on
set horizontal-scroll-mode on
```



### Mappatura dei comandi 

I comandi possono essere assegnati a particolari combinazioni di tasti, questo avviene già con molte combinazioni se ci pensiamo.

Ad esempio il tasto "`tab`" è mappato con il comando di **auto completamento**, oppure `CTRL-c` è mappato con il segnale di **INTERRUZIONE per l'applicazione corrente**.

Possiamo quindi, facendo attenzione a non sovrascrivere comportamenti predefiniti, cambiare o aggiungere nuovi comandi associati a nuove combinazioni. 

Un associazione è scritta con questa sintassi: 

```bash
"combinazione tasti": comando
```

Se per associare un normale carattere è semplicemente necessario scrivere il simbolo corrispondente sulla propria tastiera, i tasti che non hanno un simbolo son invece rappresentati da una sequenza di caratteri. Questa sequenza è normalmente definita attraverso *una nomenclatura definita dalla libreria readline* stessa. 

#### La nomenclatura dei tasti secondo readline

Il glossario dei "*nomi* e delle *funzioni*" della readline è ovviamente incluso nel manuale, precisamente nella sezione "*Command Line Editing*", poi "*Readline Init File*" quindi "*Readline Init File Syntax*". 

Per riassumere, la mappatura di tutte le lettera della tastiera può essere fatta semplicemente scrivendo il simbolo della lettera stessa (quindi per il mapping del carattere `a` minuscolo, scrivere semplicemente `a`), tutti i tasti che non hanno un simbolo invece trovano la loro mappatura in particolari combinazioni di caratteri, ecco qualche esempio: 

- **Ctrl** : `\C`.  

- **tasto start** : `\M`.  

- **ESC** : `\e`.  

- **backspace** : `\b`.  

- **tab** : `\t`.  

- **canc** : `\d`.  

- **back slash (\)** : `\\`.  

A scansare ogni equivoco si può comunque usare il valore del carattere ascii stesso tramite una di queste due sequenze: 

- `\NNN` : valore in ottale
-  `\xHH`: Valore in esadecimale

Le combinazioni di tasti vanno scritte separate da `-`, ad esempio CTRL+c diventa:  
"`\C-c`"  



#### La lista dei comandi disponibili 

I comandi possibili sono veramente tanti, ancora una volta vi è l'esortazione a controllare la sezione apposita delle info ( sempre in  "*Command Line Editing*", poi "*Readline Init File*" quindi "*Readline Init File Syntax*"), dove potete trovarli addirittura divisi per tipologia.



Vediamone alcuni tra quelli che si potrebbero considerare più utili:

- "`tab-insert`" : inserisce il carattere tab. Normalmente non potreste farlo perché a tab è già assegnato l'autocompletamento
- "`overwrite-mode`" : inserisce la modalità di sovrascrittura, ovvero ogni carattere che scriverete sostituirà quello antecedente al cursore
- "` possible-completions`" : normalmente mappato come `alt+?`, chiede la lista dei possibili auto completamenti
- " `copy-forward-word`" : copia la parola davanti al cursore 
- "`copy-backward-word`" : copia la parola prima del cursore
- "`yank-last-arg`": normalmente mappato con `alt+.`, richiama l'ultimo argomento del comando precedente. Continuando a premerlo, scorre la lista di tutti gli ultimi argomenti dei comandi prima.
- "`beginning-of-line`" : normalmente mappato con `ctrl+a`, sposta il cursore ad inizio linea
- "`end-of-line`" : normalmente mappato come `ctrl+e`, sposta il cursore a fine linea 
- "`insert-comment`" : normalmente mappato con `alt+#`, inserisce a inizio riga il simbolo del commento e invia la riga corrente (che quindi diventa un commento)

## Un esempio 

Un esempio di file inputrc potrebbe essere questo: 

```bash
"\C-t": tab-insert
"\C-p": overwrite-mode
"\C-\M-o": possible-completions

set enable-bracketed-paste off
set colored-stats on
set completion-ignore-case on
set horizontal-scroll-mode on
```



