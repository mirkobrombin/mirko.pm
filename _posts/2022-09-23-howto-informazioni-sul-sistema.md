---
title: '#howto - Raccogliere informazioni sul proprio pc da terminale' 
date: 2022-09-23 09:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags: 
- archlinux
- ubuntu
- fedora
- systeminfo 
---

Sui nostri gruppi di supporto la difficoltà più frequente è quella di capire configurazioni hardware e software di chi vuole farsi aiutare. Ecco una piccola guida su come raccogliere dati sul proprio sistema da dare a coloro a cui chiediamo aiuto!

## Nome della distribuzione

Normalmente l'unica informazione che non manca mai è proprio il nome della distribuzione, ma per non farci mancare nulla in questa guida copriamo anche il caso in cui non abbiamo quest'informazione basilare.

### OS-release

In alcune distribuzioni è disponibile la libreria `os-release` che rende disponibile quest'informazione, per interrogarla basta un semplice comando cat :

```bash
cat /etc/os-release
```

Le informazioni stampate includeranno il nome, la documentazione, il logo e modello di rilascio. 
Ecco un esempio di output:

```plain
NAME="Arch Linux"
PRETTY_NAME="Arch Linux"
ID=arch
BUILD_ID=rolling
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://archlinux.org/"
DOCUMENTATION_URL="https://wiki.archlinux.org/"
SUPPORT_URL="https://bbs.archlinux.org/"
BUG_REPORT_URL="https://bugs.archlinux.org/"
LOGO=archlinux-logo
```

### LSB Release

lsb-release è un tool più semplice, che mostra molte meno informazioni sulla distribuzione ma permette una maggiore malleabilità dell'output. Generalmente bisogna installarlo nelle varie distribuzioni esplicitamente, anche tramite il package manager.  

#### Ubuntu e derivate

Per installare il pacchetto in Ubuntu e derivate scrivere:

```bash
apt install lsb-release
```

#### Fedora

Per installare il pacchetto in Fedora è necessario un pacchetto chiamato `redhat-lsb`:

```bash
dnf install redhat-lsb
```

#### Archlinux

Per installare il pacchetto in Archlinux scrivere:

```bash
pacman -S lsb-release
```

#### Utilizzo

Scrivere:

```bash
lsb_release -a
```

Per avere tutte le informazioni (notare che mentre il nome del pacchetto ha il carattere `-` che separa le parole `lsb` e `release`, il nome del comando usa l'underscore `_`).

È possibile come già detto in precedenza personalizzare leggermente l'output, utilizzando vari flag che fanno da filtro. Ad esempio per avere solo il nome della distribuzione senza numero di release è possibile usare il flag `-i`: 

```bash
lsb_release -i
```

O ancora per avere solo il nome in codice della release si può scrivere:

```bash
lsb_release -c
```

Per saperne di più, è possibile usare l'help:

```bash
lsb_release --help
```

### File release in /etc

Un ulteriore metodo per identificare la distribuzione è utilizzare il file `*-release` in `/etc`, un file che ha come postfisso sempre la parola "`release`" ma dove cambia il prefisso, che rappresenta la distribuzione.  

Purtroppo questo file non è comune a tutte le distribuzioni, lo si ha in Archlinux:

```bash
if [ -f /etc/arch-release ]; then 
	echo "Sei su Archlinux"; 
fi  
```

E lo si ha su Fedora:

```bash
if [ -f /etc/fedora-release ]; then 
	echo "Sei su Fedora"; 
fi  
```

Ma Ubuntu ad esempio ne è *sprovvisto*.

## Kernel in esecuzione

Per sapere il kernel in esecuzione è possibile utilizzare il comando `uname`:

```bash 
uname -rs
```

Sul comando abbiamo già un [ottima guida che ne parla in maniera esaustiva](https://linuxhub.it/articles/howto-utilizzo-del-comando-uname/).

## Ram e swap 

Sulla ram è importante avere tre tipi di informazioni:  

- Quanta memoria è rimasta/quanta ne è utilizzata.
- Quanta memoria totale è disponibile.
- Informazioni di natura hardware sui banchi di ram.

Sulla swap altresì è importante sapere:

- Quanta swap è utilizzata (se è utilizzzata).
- Quanta swap è disponibile.
- Su che file è montata la swap.

## Disco usato e libero 

## Le usb attaccate 

## Le periferiche pci 

## I software *fetch