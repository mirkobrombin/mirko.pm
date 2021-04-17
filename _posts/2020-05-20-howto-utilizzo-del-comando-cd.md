---
title: '#howto - Utilizzo del comando cd'
published: 2020-05-20
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
`cd` (Change Directory) è senza ombra di dubbio uno dei comandi più usati in ambienti Unix.

Come è possibile intuire dal nome, con questo comando è possibile spostarsi tra **diversi percorsi** su una macchina.

## Utilizzo del comando

Supponiamo di aprire un terminale per la prima volta: normalmente ci si troverà nella propria cartella *home*, indicata da una tilde (~). Mettiamo che vogliamo spostarci nel percorso */home/utente/Documenti*, trovandoci nella nostra *home*, dovremo utilizzare `cd` nel seguente modo:

```bash
cd Documenti
```

Con `cd`, quando si sceglie in quale cartella spostarsi, è possibile utilizzare i **path assoluti** o **relativi**. I primi iniziano dalla cartella *root* (/), mentre i secondi iniziano dalla cartella **in cui ci si trova** attualmente.

Assumendo la presenza di una cartella Download nella propria home, per spostarcisi con il path relativo si utilizza `cd` nel seguente modo:

```bash
cd Download
```

mentre con il path assoluto, il comando cambierà così:

```bash
cd /home/utente/Download
```

In breve, l'inserimento di / davanti ad ogni cartella viene percepito da `cd` come l'istruzione con cui iniziare dalla root di sistema.

## Spostarsi alla cartella genitore

Nei sistemi operativi Unix-like la cartella in cui si trova viene rappresentata da un **singolo punto** (.), mentre **due punti** di seguito (..) indicano la **cartella genitore** di quella in cui siamo posizionati attualmente.

Facendo un esempio, se ci troviamo in _/home/utente/Download_ e vogliamo tornare alla home, possiamo utilizzare `cd` nella seguente maniera:

```bash
cd ..
```

Per visitare la cartella _/home_, invece, sarà necessario indicare due volte i due punti:

```bash
cd ../../
```

Inoltre, se da Download vogliamo spostarci a Documenti, posizionata in _/home_, possiamo utilizzare `cd` in questo modo:

```bash
cd ../Documenti/
```

## Spostarsi alla cartella precedente

Per tornare alla cartella precedente, magari dopo essersi spostati per sbaglio, è sufficiente inserire un trattino (-) come argomento:

```bash
cd -
```

## Spostarsi nella home

Nel caso in cui volessimo, per comodità, tornare direttamente alla nostra cartella *home* senza curarci di quella in cui ci troviamo, dovremo utilizzare come argomento il carattere della tilde (~), come in questo esempio:

```bash
cd ~
```

Nel layout della nostra tastiera, però, la tilde può essere scritta solo grazie ad una combinazione di numeri specifici che potrebbe essere difficile e complessa da ricordare per alcuni. In questo caso, la tilde si può sostituire senza alcun problema con **due trattini** di seguito (--):

```bash
cd --
```

## Spazi nei nomi

In alcuni casi sarà possibile trovare delle cartelle con degli spazi, il cui inserimento come argomento di `cd` potrebbe creare diversi problemi nell'interpretazione dell'input da parte del comando. Per ovviare a ciò, si può indicare la cartella con gli spazi in cui ci si vuole spostare utilizzando le **virgolette singole** o delle slash al contrario. Vediamo un esempio:

```bash
cd 'Cartella con spazi'
```

```bash
cd Cartella\ con\ spazi
```



Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).