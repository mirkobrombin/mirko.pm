---
title: '#howto - Installazione di Go'
date: 2021-03-01
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**Go** è un linguaggio di programmazione open source che semplifica la creazione di software semplice, affidabile ed efficiente. Viene usato principalmente in backend web, ma può essere usato anche per creare programmi da CLI e molto altro.

In questa guida vedremo come scaricare Go per tutte le principali distribuzioni Linux.

## Installazione
Prima di tutto, scarichiamo il pacchetto ufficiale di Go dal sito di [Golang](https://golang.org/dl/). Suggeriamo di scaricare l'archivio sotto la versione per Linux. Il sorgente non è consigliato poiché sarebbe necessario compilare Go, un lungo processo a volte macchinoso.

Successivamente, spostiamo il file scaricato dentro la cartella `/usr/local`:
```bash
# Le X indicano la versione
mv goX.XX.linux-amd64.tar.gz /usr/local
```

Muoviamoci dentro la cartella `/usr/local` ed estraiamo l'archivio:

```bash
cd /usr/local
tar -C /usr/local -xzf goX.XX.linux-amd64.tar.gz
```

Una volta che abbiamo estratto l'archivio, dovremmo poter trovare in `/usr/local` una cartella chiamata `go`, a sua volta contenente la sottocartella `bin`. Dopo aver verificato ciò con `ls`, dovremo aggiungere il PATH di Go all'ambiente delle variabili.

Modifichiamo il file `$HOME/.profile` aggiungendo, alla fine, la seguente stringa:

```bash
export PATH=$PATH:/usr/local/go/bin
```

Salviamo il file ed effettuiamo un logout per confermare le modifiche del file `.profile`. Se tutto è andato a buon fine, una volta che eseguiremo il comando `go version` dovremmo ottenere come output la versione installata di Go, quella specificata nell'archivio.

