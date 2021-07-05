---
title: "#howto – Utilizzo del comando 'cat'"
date: 2020-07-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Sono molti i contesti in cui uno strumento semplice come **cat** può tornare utile, ad esempio nella visualizzazione e scrittura di file.

Mettiamo che vogliamo prendere l'ultima riga di un file log, senza doverlo aprire e quindi sfogliarlo per intero: il comando **cat** ci permette di farlo senza complicazioni.

## Sintassi

La sintassi seguente è molto semplice ed offre poche, ma essenziali opzioni:

    cat [opzioni] [file]

nel fare un esempio, ipotizzando di avere un file **ciao.txt** con un contenuto, facendo:

    cat ciao.txt

ne otteniamo il contenuto come output.

## Utilizzo del comando

Come dicevo, grazie a **cat** possiamo mostrare il contenuto di uno o più file, scriverne di nuovi, prenderne l'ultima riga o mostrarne il contenuto numerandone le righe. 

Vediamo ora quelle che sono le principali funzionalità di questo strumento.

### Mostrare il contenuto di un file

Abbiamo parlato poco fa di come mostrare il contenuto di un file usando **cat**:

    cat file1.txt

che restituirà ovviamente il contenuto come output, ma nel caso in cui volessimo vedere il contenuto di più file contemporaneamente:

    cat file1.txt file2.txt

il risultato sarà un output combinato dai contenuti di entrambi i file.

#### Numerare le righe

Grazie alla flag **-n** possiamo visualizare il contenuto di un file numerandone ogni riga, molto utile nel caso in cui volessimo leggere un codice o un log. 

Nell'esempio seguente, ipotizzando di avere il file **codice.py** contenente uno script in Python:

    cat -n codice.py

otterremo un output numerato simile al seguente:

    1  print("Mario Rossi")2  print("Luigi Verdi")

### Creare un file

Possiamo usare questo strumento anche per creare nuovi file, proprio come un editor di testo:

    cat > documento.txt

da questo momento possiamo digitare quello che sarà il contenuto del nostro nuovo documento. Per salvare possiamo infine premere **CTRL+D**.

### Copiare il contenuto da un file ad un altro

Nel caso in cui volessimo unire il contenuto di un file a quello di un altro, possiamo sfruttare un procedimento simile a quello appena trattato. In questo modo:

    cat file_sorgente.txt > file_destinazione.txt

il contenuto del file sorgente verrà copiato nel file di destinazione, senza eliminare il precedente.

### Mostrare l'ultima riga di un file

Ipotizziamo di incontrare un errore e di dover leggere l'ultima riga del log. In questo caso ci torna utile la flag **-E:**

    cat -E file.log

che se utilizzata otterremo come output l'ultima riga del file.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).