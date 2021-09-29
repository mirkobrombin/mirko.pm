---
title: '#howto - Installazione di Arduino IDE su Linux'
date: 2021-03-19
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**Arduino IDE** è un programma disponibile su tutti i principali sistemi operativi che viene utilizzato per programmare una propria scheda Arduino.

In questa guida vedremo come scaricare ed installare questo programma sulle principali distribuzioni Linux.

## Installazione

Ci sono due modi per effettuare l'installazione di Arduino IDE: uno è universale per tutte le distro, mentre l'altro è più specifico e valido solo per alcune distribuzioni.

### Metodo Universale

Il **metodo universale**, molto semplicemente, consiste nello scaricare un archivio contenente tutti i file del programma ed eseguire uno script per l'installazione.

Prima di tutto, scarichiamo l'ultima versione dell'Arduino IDE da [questa pagina](https://www.arduino.cc/en/software/). Ci ritroveremo con un file *.tar.xz*, estraiamolo dove desideriamo tenere il software (consiglio nella propria *home*) ed eseguiamo il seguente comando nel terminale, ovviamente nella cartella dove si trova il programma:

```bash
./install.sh
```

Se tutto è andato a buon fine, dovremmo ritrovarci sul desktop un'icona per Arduino IDE e dovremmo poter aprire ed usare il software come previsto.

### Installazione per distro
Se parliamo, invece, di **installazione per distro**, questo processo ci permette di scaricare il software dalla repo del nostro sistema preferito e di tenerlo spesso aggiornato.

#### Arch Linux

Su Arch Linux possiamo installare Arduino IDE tramite pacman:

```bash
pacman -S arduino-ide
```

#### Ubuntu, Debian e derivate

Su Ubuntu e derivate possiamo usare il pacchetto presente nelle repo. Tuttavia, non viene aggiornato molto spesso, e per questo motivo consigliamo di scaricare il software dal sito ufficiale su queste distribuzioni:

```bash
apt install arduino-ide
```

#### Fedora, CentOS e derivate

Per quanto riguarda Fedora, CentOS e distribuzioni derivate, infine, possiamo procedere con un semplice dnf:
```bash
dnf install arduino
```

## Conclusione
Una volta seguiti tutti questi passaggi, sul nostro sistema dovremmo ritrovarci un Arduino IDE completamente funzionante e pronto per la configurazione della vostra scheda.

