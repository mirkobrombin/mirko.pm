---
title: '#howto - Installazione di mpv su Linux'
published: 2020-12-04
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - fedora  - bash
---
**mpv** è un media player gratuito, open source e cross-platform molto semplice, minimale, veloce e facile da imparare ad usare. 

Alcune persone possono preferirlo al più classico VLC, e in questa guida vedremo come installarlo sulle principali distribuzioni Linux.

## Installazione
### Ubuntu, Debian e derivate
Per installare *mpv* su Ubuntu, Debian e distribuzioni derivate possiamo sfruttare il nostro amato package manager `apt`:

```bash
apt install mpv
```

### Fedora
Su Fedora, CentOS e derivate dovremo procedere in un modo leggermente differente.

Prima ci toccherà abilitare le repo free di **RPM Fusion**, poiché il pacchetto di *mpv* non è presente nelle repo di default di `dnf`:

```bash
dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
```

e poi usiamo `dnf`:
```bash
dnf install mpv
```

### Arch Linux
Su Arch Linux, *mpv* è presente nelle repo di *pacman*, pertanto non dovremo usare un AUR helper:
```bash
pacman -S mpv
```

## Conclusione
Seguiti questi procedimenti, mpv dovrebbe essere installato ed utilizzabile senza problemi sulla vostra macchina.

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).