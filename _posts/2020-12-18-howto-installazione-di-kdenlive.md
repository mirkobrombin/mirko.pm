---
title: '#howto - Installazione di Kdenlive sulle principali distribuzioni Linux'
date: 2020-12-18
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**Kdenlive** è un editor video leggero e gratuito acronimo di **KDE** **N**on-**Li**near **V**ideo **E**ditor in grado di girare su una varietà di sistemi operativi come GNU/Linux, su Windows e su BSD.

## Installazione
In questa guida tratteremo l'installazione sulle principali distribuzioni (e derivate). Si tratta di un pacchetto disponibile in tutte le repository di sistema quindi ci limiteremo a mostrare come procedere tramite il gestore pacchetti della distribuzione.

### Debian/Ubuntu e derivate
Su Debian, Ubuntu e derivate (come elementary OS e Pop OS), troviamo il pacchetto nelle repository di sistema, installabile via `apt`:

```bash
apt install kdenlive
```

Possiamo installare la versione più recente tramite la *ppa* dedicata:

```bash
apt-add-repository ppa:kdenlive/kdenlive-stable
apt update
apt install kdenlive
```

### Arch Linux
Su Arch Linux troviamo il pacchetto nelle repository di sistema, installabile via `pacman`:

```bash
pacman -S kdenlive
```

Se vogliamo l'ultima versione dal sorgente del progetto, possiamo optare per `kdenlive-git`:

```bash
yay -S kdenlive-git
```

> `yay` è un AUR helper. Abbiamo trattato in [questa](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper) guida l'argomento AUR helper.

### Fedora/CentOS/RHEL
Su Fedora 30+ e Centos/RHEL 8 è possibile installare Kdenlive tramite `dnf`:

```bash
dnf install kdenlive
```

Su CentOS/RHEL 7 via `yum`:
```bash
yum install kdenlive
```

Per ogni dubbio, chiarimento o curiosità ci trovate al <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.