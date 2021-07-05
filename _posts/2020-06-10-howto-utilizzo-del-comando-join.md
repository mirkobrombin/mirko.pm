---
title: '#howto - Utilizzo del comando join'
date: 2020-06-10
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - bash
---
Il comando `join` permette di unire più file di testo in base ad un campo comune, mostrandone il risultato come output.

## Sintassi
Vediamo di seguito la sua semplice sintassi:

```bash
join file_1 file_2
```

basterà infatti aggiungere a seguito del comando, i file che vogliamo unire.

## Utilizzo del comando

Mettiamo caso di avere due file di testo, *prova-1.txt* e *prova-2.txt*, con all'interno delle mail in dei campi ordinati (1, 2, 3 e 4):

```bash
# prova-1.txt
1 prova1@esempio.com
2 prova2@esempio.com
# prova-2.txt
3 prova3@esempio.com
4 prova4@esempio.com
```

In questi file le informazioni all'interno sono posizionate in modo ordinato, quindi per poterle unire ci basterà digitare:

```bash
join prova-1.txt prova-2.txt
```

Una volta fatto ciò, l'output sarà il seguente:

```bash
1 prova1@esempio.com
2 prova2@esempio.com
3 prova3@esempio.com
4 prova3@esempio.com
```

## Campi non ordinati

Mettiamo caso di avere un terzo file: *prova-3.txt*:

```bash
2 prova4@gmail.com
1 prova5@gmail.com
```

In questo caso le informazioni dentro il file sono messe in modo non ordinato, e in caso provassimo ad eseguire `join prova-1.txt prova-3.txt` ci darà il seguente errore:

```bash
1 prova1@esempio.com
2 prova2@esempio.com
join: prova-3.txt: is not sorted: prova4@esempio.com
```

Per sistemare questo problema è necessario inserire in ordine le informazioni.

## File con linee mancanti

Nel file *prova-4.txt* è stata rimossa la seconda linea:

```bash
1 prova6@esempio.com
```

Una volta che proviamo ad unire i due file, `join` non darà errori di alcun tipo, e continuerà ad elaborare il resto delle linee.

Se si vogliono stampare delle linee dal *prova-1.txt* che non possono essere abbinate ci basterà aggiungere l'opzione *-a*:

```bash
join -a 1 prova-1.txt prova-4.txt
1 prova1@esempio.com
2 prova2@esempio.com
3 prova6@esempio.com
```

## Utilizzo di diversi separatori di campo

In caso in cui le informazioni dei file sono delimitate da una virgola o da qualsiasi altro tipo di punteggiatura, possiamo usare l'opzione *-t* seguito dal carattere separatore per far capire al comando `join` cosa utilizzare come separatore di campo:

```bash
join -t, prova-1.txt prova-2.txt
1,prova1@esempio.com,Prova
2,prova2@esempio.com,Prova
3,prova3@esempio.com,Prova
4,prova3@esempio.com,Prova
```

## Ignorare le maiuscole

Per far sì che il comando *join* ignori le maiuscole presenti nel documento, possiamo utilizzare l'opzione *-i* come mostrato nel comando qui sotto:

```bash
join -1 1 -2 2 -i prova-1.txt prova-2.txt
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).