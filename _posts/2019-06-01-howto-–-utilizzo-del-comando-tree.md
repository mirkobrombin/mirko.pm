---
class: post
title: "#howto – Utilizzo del comando 'tree'"
description: "Capita spesso e in diverse circostanze, di dover prelevare la struttura di una directory, cosa che possiamo fare grazie al comando tree.."
date: 2019-06-01
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Capita spesso e in diverse circostanze, di dover prelevare la struttura di una directory, cosa che possiamo fare grazie al comando **tree**.

> La struttura di una directory è sostanzialmente il risultato di una ricerca ricorsiva di file e cartelle presenti al suo interno.

## Sintassi

La seguente è la semplice sintassi del comando:

    tree [opzioni] [directory]

eseguito in una determinata locazione, ne mostra la lista dei contenuti in modo ricorsivo.

## Utilizzo del comando

Si tratta di uno strumento semplice da usare, basterà digitare il comando per riceverne subito l'output, ad esempio:

    .
    ├──est1?   ├── file1
    ├──est22 directories, 1 file

### Mostrare solo le cartelle

Nel caso in cui volessimo mostrare l'output con le sole directory, possiamo sfruttare l'opzione **-d**:

    tree -d

un esempio di output:

    .
    ├──est1
    ├──est22 directories

a differenza dell'esempio precedente, non mostra i file al loro interno.

### Mostrare i file nascosti

Di base i file nascosti non sono visibili e quindi esclusi dall'output ma grazie all'opzione **-a**, possiamo ovviare a questo problema:

    tree -a

nel nostro caso l'output sarà:

    .├── .hide
    ├──est1?   ├── file1
    ├──est2    ├── .hide22 directories, 3 files

### Escludere risultati

Nel caso specifico in cui volessimo omettere una cartella o file dall'output, possiamo usare l'opzione **-I**:

    tree -I [nome]

possiamo inoltre usare dei pattern come valore, ad esempio nel caso in cui nella directory sono presenti 3 file che terminano in **_test.** Per escluderli, possiamo procedere in questo modo:

    tree -I *_test

### Modificare la profondità

Nel caso in cui una directory contiene più livelli (più directory al suo interno), è possibile scegliere fino a che punto spingere la ricerca grazie alla opzione **-L**:

    tree -L [num]

modificando **[num]** col valore desiderato, otteniamo la ricerca che desideriamo, ad esempio nel nostro caso scegliendo **3**, riceviamo come output:

    .
    ├──est1?   ├── file1
    ├──est2    
    ├──est3        
    ├──est44 directories, 1 file

scegliendo **2**:

    .
    ├──est1?   ├── file1
    ├──est2    
    ├──est33 directories, 1 file

_Good ***nix**?_  
_ - Mirko_