---
title: '#howto - Utilizzo del comando date'
date: 2020-08-10
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
In Linux, il comando `date` serve a mostrare la **data e ora** attualmente impostate sul proprio sistema, ma può essere utile anche per calcolare o mostrare una data in un formato ben specifico.

In questa guida vedremo come sfruttare al meglio `date`, e perché può tornare utile in certi casi.

## Utilizzo del comando

Quando utilizzato senza opzioni, `date` mostra data e ora attuali, includendo anche giorno della settimana, mese, ora, fuso orario e anno:

```bash
Fri Jul 31 17:08:00 CEST 2020
```

Per sapere magari che giorno era in una data particolare, possiamo utilizzare il parametro *-d* (la data deve essere in formato anno-mese-giorno e tra virgolette doppie):

```bash
date -d "2020-07-30"
```

In questo caso, l'output dovrebbe essere il seguente:

```bash
Thu Jul 30 00:00:00 CEST 2020
```

con `date` che ci dice che il 30 luglio era giovedì.

### Opzioni di formattazione

`date` ha diverse **opzioni di formattazione** che, una volta scritto il simbolo della percentuale seguito da una lettera (esempio: %A), mostra a schermo delle determinate cose.

Ecco un elenco di alcune opzioni di formattazione utili:

- %a - Mostra il giorno di oggi abbreviato

- %A - Mostra il giorno di oggi per intero

- %b - Mostra il mese attuale abbreviato

- %B - Mostra il mese attuale per intero

- %c - Mostra data e ora attuale

- %F - Mostra data intera

- %s - Numero di secondi passati da 1970-01-01 00:00:00 UTC

Per poter utilizzare queste opzioni è semplicemente necessario scrivere `date` seguito da un "+" e dall'opzione desiderata tra virgolette. Un esempio:

```bash
date +"%A"
```

darà un output simile al seguente:

```bash
Friday
```

### Fusi orari

Con date possiamo anche vedere che ora è in un determinato **fuso orario**. Mettiamo caso di voler sapere che ora è in Regno Unito: per fare ciò scriviamo *TZ=codicefusoorario* seguito poi dal comando `date`. Ad esempio:

```bash
TZ=GB date
```

darà un output simile al seguente:

```bash
Fri Jul 31 15:23:06 GB 2020
```

visto che al momento in Regno Unito sono un'ora indietro, l'output è corretto. I codici dei fusi orari si trovano nella cartella */usr/share/zoneinfo/*.

### Esempi

Con `date` possiamo sapere davvero molte cose. Che giorno sarà domani? Ce lo dice date seguito dal parametro *-d* e *tomorrow*:

```bash
date -d tomorrow
```

con un output simile a:

```bash
Sat Aug  1 17:27:02 CEST 2020
```

Che giorno era la scorsa domenica?:

```bash
date -d last-sunday

Sun Jul 26 00:00:00 CEST 2020
```

Che giorno sarà oggi, ma il prossimo anno?

```bash
date -d next-year

Sat Jul 31 17:28:32 CEST 2021
```

### Altre utilità

Con date possiamo sapere che ora era in una determinata data dopo un certo ammontare di secondi:

```bash
date -d "CET 1970-01-01 126507600 secs"

Fri Jan  4 05:00:00 CET 1974
```

che giorno della settimana era una certa data:

```bash
date -d "1970-01-01" +"%A"

Thursday
```

o, ultimo ma non ultimo, in che settimana di che anno ci troviamo:

```
date +"Numero della settimana: %V Anno: %Y"

Numero della settimana: 31 Anno: 2020
```

Come potete vedere, con date possiamo conoscere data e ora di questo momento, così come di anni fa, in tutti i modi possibili ed inimmaginabili.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).