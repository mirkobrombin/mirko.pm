---
title: '#howto - Utilizzo del comando tail'
published: 2020-08-12
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
Il comando `tail` è presente di default nelle distribuzioni Linux, e viene utilizzato per vedere la fine dei file di testo. tail è simile al comando [head](https://linuxhub.it/articles/howto-utilizzo-del-comando-head), utilizzato invece per vedere l'inizio dei file.

In questa guida vedremo come è possibile utilizzare al meglio `tail`.

## Utilizzo base di tail

Partendo dall'uso base, `tail` mostra le **ultime dieci righe** di testo di un file. Ad esempio:

```bash
tail numeri.txt
```

darà come output:

```bash
11
12
13
14
15
16
17
18
19
20
```

che è corretto visto che il file partiva dal numero 1. `tail` può essere utile per leggere la fine di file log, dove i contenuti nuovi vengono spesso aggiunti lì.

### Controllare l'output

Utilizzando il parametro *-n*, è possibile dire a `tail` quante righe devono essere mostrate. Nel caso in cui volessimo mostrare solamente le ultime 5 righe del nostro file di testo, possiamo procedere in questo modo:

```bash
tail -n 5 numeri.txt
```

dove l'output sarà simile al seguente:

```bash
16
17
18
19
20
```

Il numero di righe da mostrare può essere specificato prima o dopo il file selezionato, e ciò non ha alcun impatto sul risultato finale.

#### Output in base al byte

Con `tail` e il parametro *-c* possiamo inoltre specificare quanti byte vogliamo mostrare del nostro file specificato. Vogliamo vedere gli ultimi sei caratteri presenti in *numeri.txt*?:

```bash
tail -c 6 numeri.txt
```

e avremo un output simile a:

```bash
19
20
```

### Visualizzare file multipli

Con `tail` possiamo anche ottenere le ultime dieci righe di **file multipli** senza un limite. Per fare ciò è necessario scrivere `tail` sul terminale e inserire i percorsi dei due file, senza alcun parametro:

```bash
tail prova.txt numeri.txt
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
11
12
13
14
15
16
17
18
19
20
```

Anche qui è possibile utilizzare il parametro *-n*, e per visualizzare, ad esempio, l'ultima riga di tutti i file presenti in una cartella possiamo procedere in questo modo:

```bash
tail -n 1 *
```

con un output simile a:

```bash
==> numeri.txt <==
20

==> prova.txt <==
prova
```

### Follow Mode

La **Follow Mode**, o Modalità Follow, è una modalità di `tail` che mostra le ultime righe di un file e **continua a rimanere attivo per mostrare tutte le ultime aggiunte** alla fine di quel documento. Quando nuove righe vengono aggiunte, esse vengono mostrate al terminale, mostrando quindi in diretta cosa succede alla fine del file.

Per utilizzare la Follow Mode è necessario sfruttare tail seguito dal parametro *-f*. `tail` continuerà a seguire un file fino a che l'utente non interromperà il processo. Inoltre, se il file viene cancellato o eliminato, `tail -f` fallirà. Per evitare ciò possiamo usare il parametro *-F* che forza tail a seguire i nomi dei file invece dei contenuti.

La Follow Mode può essere utile quando si deve trovare un problema nei log di un software.



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).