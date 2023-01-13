---
class: post
title: '#howto - Introduzione ad AUR e AUR helper'
description: "La AUR (Arch User Repository) è una repository di pacchetti per Arch Linux gestito dalla comunità. La AUR contiene dei file.."
date: 2019-12-31
layout: post
author: Niccolò Martiri
author_github: talebian
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - archlinux  
  - bash
---
La **AUR** (*Arch User Repository*) è una repository di pacchetti per Arch Linux gestito dalla comunità. La AUR contiene dei file, i **PKGBUILD** che contengono le informazioni per compilare un pacchetto e installarlo con _Pacman_. 

I PKGBUILD  contengono le istruzioni per compilare un pacchetto dal source oppure da pacchetti gia esistenti, ad esempio il PKGBUILD per chrome prende il .deb, lo scompatta e successivamente crea il pacchetto per Pacman. La AUR si può consultare da aur.archlinux.org dove possiamo appunto trovare i pacchetti e scaricarli.
Ora però vediamo i due modi di usare la AUR.

## Installare pacchetti da AUR

### Installazione Manuale

Per installare pacchetti dalla AUR manualmente è molto semplice. Prima cosa creiamo una cartella di build, io preferisco avere una ramdisk per lavorare, quindi creiamo sulla home una cartella chiamata _ramdisk_ e diamo il comando `mount -t tmpfs tmpfs $HOME/ramdisk -o size=XG` dove ad X mettiamo la dimensione in gigabyte della tmpfs, io consiglio di assegnarli almeno 1/4 della RAM a disposizione, nel mio caso qundi gli darò 8G, questo per essere sicuri di avere spazio per pacchetti anche più grandi, anche se sopra i 5G a parte pacchetti particolari difficilmente li satureremo. 

Ora installiamo i pacchetti base per la compilazione, a noi per la maggior parte dei lavori basterà il gruppo _base-devel_, installiamolo quindi con `sudo pacman -S base-devel`.

Ora procediamo a scaricare il pacchetto andiamo nella nostra cartella ramdisk e con git scarichiamo il pacchetto che ci interessa, ora nel mio caso __yay__, che ci servirà per la prossima parte. Scarichiamolo allora così:

```bash
git clone https://aur.archlinux.org/yay.git
```

A questo punto ci serve solo installarlo, useremo per questo **makepkg**, un software che automatizza il build dei pacchetti sfruttando i PKGBUILD. Io consiglio prima di tutto di modificare il file _/etc/makepkg.conf_ decommentando la linea MAKEFLAGS e scrviendo dentro `-jX`, dove X sono il numero di core del nostro processore, quindi nel mio caso metterò -j16, in caso di CPU 32 Core avremmo dovuto mette -j32 o se  Core -j8. Salviamo e chiudiamo l'editor.

Ora possiamo procedere quindi alla creazione del pacchetto ecco come dobbiamo fare:

```bash
cd yay # Per entrare nella cartella del pacchetto

makepkg -si # -s per controllare eventuali dipendenze e -i per installare automaticamente il pacchetto con pacman.
```

Alla fine dell'installazione il nostro programma sarà installato, ora vediamo come automatizzare tutto questo.

### Installazione Automatica

Nel installazione manuale abbiamo installato un pacchetto, **yay**. Yay è un così detto _AUR Helper_, cioè ti "aiuta" ad usare la AUR e installare i pacchetti.
Prima di usare un AUR Helper io consiglio di imparare prima il procedimento manuale, così da essere capaci di riparare eventuali errori in futuro.

**Yay** come abbiamo visto prima va installato manualmente. Quando avremo installato _yay_ l'utilizzo sarà quasi del tutto uguale a quello di <a href="https://linuxhub.it/articles/howto-come-usare-pacman,-comandi-fondamentali">pacman</a>, installazione, rimozione e aggiornamento dei pacchetti funzionano alla stessa maniera, soltanto che in questo caso, invece di cercare solo nei repository ufficiali, cercheremo anche nella AUR.

Un esempio:

```bash
yay -S google-chrome
```

con questo comando yay automaticamente scaricherà il PKGBUILD per Google Chrome e lo installerà.

Possiamo usare yay anche solo per scaricare i PKGBUILD senza dover cercare il link, basta sostituire nel procedimento manuale il la parte di git clone.

Il build diventerebbe così:

```bash
yay -G google-chrome
cd google-chrome
makepkg -si
```

## Conclusioni

La AUR è uno dei più grandi vantaggi di Arch Linux, permette di installare praticamente qualsiasi pacchetto semplicemente con pochi comandi, l'unico risvolto negativo è che i pacchetti non sono controllati, quindi io consiglio sempre di usare la AUR con cautela e quando i pacchetti sono disponibili nelle repo ufficiali, di usare quelli.

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://linuxhub.it/t.me/gentedilinux).