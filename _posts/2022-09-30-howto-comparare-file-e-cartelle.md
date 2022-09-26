---
title: '#howto - Comparare file e cartelle'
date: 2022-09-30 09:00
layout: post 
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: false
tags: 
- ubuntu
- fedora
- archlinux
---

È molto comune avere a che fare con file e cartelle simili in parti diverse del disco.
Qualche volta potrebbe trattarsi di duplicati, oppure potrebbero esserci due (o più) copie di uno stesso file, di cui solo una delle due versioni è la più recente.
Altre volte ancora, invece, è addirittura difficile rendersi conto di quali siano le differenze.
In quest'articolo sarà approfondito proprio come far fronte a questa problematica.


## Diff (GNU)

Il tool per eccellenza, spesso già preinstallato sulle distro Linux, è **GNU Diff**, accessibile mediante l'uso del terminale. Questa utility consente la comparazione dei file, ma non delle cartelle.
Di seguito alcuni esempi.

### Comparazione di due file

```bash
diff primo secondo
```

### Comparazione di due file (doppia colonna)

```bash
diff --side-by-side primo secondo
```

### Comparazione di due cartelle (dettagliata)

```bash
diff --recursive prima seconda
```

### Comparazione di due cartelle (sintetica)

```bash
diff --recursive --brief prima seconda
```

## Diff3 (GNU)

Un tool simile a GNU Diff, che prevede, in aggiunta, il supporto alla comparazione a tre vie, è **GNU Diff3**.

Segue un comando esemplificativo:

```bash
diff3 primo secondo terzo
```

Va evidenziato però che, proprio come *Diff*, anche *Diff3* non consente la comparazione tra cartelle.


## Meld

Tra tutti i software di questo genere, utilizzabili tramite interfaccia grafica, **Meld** è il più semplice ed immediato.
Inoltre, realizza la comparazione sia di file che di cartelle, anche a tre vie, con l'uso opzionale dei filtri.
Si precisa che la GUI di Meld può essere avviata anche da riga di comando, digitando:

```bash
meld primo secondo terzo
```

**Vantaggi**: gratuito, open source, semplicità di utilizzo, interfaccia pulita.
**Svantaggi**: velocità (scritto in Python), accessibilità (per cartelle di dimensioni elevate risulta evidente come le funzionalità siano limitate fino al termine della comparazione, anche nel caso in cui le sottocartelle siano già state scansionate).

### Ubuntu

Su distribuzioni Debian, Ubuntu e derivate, l'installazione verrà eseguita utilizzando *apt*, tramite il comando: 

```bash
apt install meld
```

### Fedora

Per quanto riguarda Fedora, l'installazione verrà eseguita tramite il gestore di pacchetti *dfn*, scrivendo:

```bash
dnf install meld
```

### Arch Linux

Su distribuzioni Arch Linux e derivate, con l'ausilio di *pacman*, basterà digitare:

```bash
pacman -S meld
```

### Altre opzioni di download

Per ulteriori informazioni è possibile visitare il sito ufficiale [meldmerge.org](https://meldmerge.org).


## Beyond Compare

Anche se è sia <i>closed source</i> che un <i>freeware</i>, **Beyond Compare** è un'alternativa piuttosto valida alla comparazione dei file, sia su Linux che su altri sistemi operativi.
La versione pro, che è possibile provare gratis per un tempo limitato, comprende la comparazione a tre vie di file e cartelle, nonché del registro di Windows.
A rendere davvero completo questo software è il supporto alla comparazione di immagini, audio, file compressi, anche via protocolli come FTP.

**Vantaggi**: completezza di funzionalità.
**Svantaggi**: closed source, freeware (prova gratuita di 30 giorni), moderata curva di apprendimento (l'interfaccia grafica è ricca di impostazioni).


### Download

Per scaricare il software si può consultare il sito ufficiale [scootersoftware.com](https://www.scootersoftware.com/download.php).


## KDiff3

**KDiff3** è un software sviluppato dalla community di KDE, che supporta la comparazione a tre vie sia dei file che delle cartelle. Inoltre, supporta vari protocolli (ftp, sftp, http, fish, smb) e ha il vantaggio di integrarsi al meglio in ambiente KDE (anche se, in realtà, avere questo DE sul proprio sistema non costituisce un prerequisito per poter usufruire di questo tool).

**Vantaggi**: gratuito, open source.
**Svantaggi**: moderata curva di apprendimento (l'interfaccia grafica è ricca di impostazioni).

Segue un elenco di comandi, ognuno specifico per la relativa distribuzione, per procedere con l'installazione di questo software.

### Ubuntu

```bash
apt install kdiff3
```

### Fedora

```bash
dnf install kdiff3
```

### Arch Linux

```bash
pacman -S kdiff3
```

### Altre opzioni di download

Visita il sito ufficiale su [download.kde.org](https://download.kde.org/stable/kdiff3/?C=M;O=D) e dai un'occhiata alla repository ufficiale su [invent.kde.org](https://invent.kde.org/sdk/kdiff3).


## Kompare (ex KDiff2)

Un altro strumento di casa KDE è **Kompare**, di origini meno recenti rispetto a KDiff3, seppur, oggigiorno, continui ad essere ancora in sviluppo. Graficamente, ricorda Meld, ben più di quanto non lo faccia KDiff3.

**Vantaggi**: gratuito, open source, semplicità di utilizzo, ergonomicità.
**Svantaggi**: assenza del supporto per la comparazione a tre vie.

Ecco come installarlo sulle varie distribuzioni.

### Ubuntu

```bash
apt install kompare
```

### Fedora

```bash
dnf install kompare
```

### Arch Linux

```bash
pacman -S kompare
```

### Altre opzioni di download

Visita il sito ufficiale: [apps.kde.org](https://apps.kde.org/kompare). 
