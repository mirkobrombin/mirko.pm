---
title: '#howto - Creare una USB di Windows con WoeUSB'
date: 2020-09-14
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - ubuntu  - bash
---
Ogni tanto capita che ci serva una chiavetta con una ISO avviabile di Windows (per installarlo sul PC di un amico o il nostro), però su Linux non esiste lo strumento **Media Creation Tool** di Microsoft. Per questo motivo arriva in nostro soccorso **WoeUSB**, che è un fork open-source di WinUSB, altro programma discontinuato dal 2012.

WoeUSB supporta tutte le versioni da Windows XP in su (Windows Vista, 7, 8, 10) e supporta sia BIOS Legacy che UEFI. In questa guida vedremo come installare ed utilizzare WoeUSB.

## Installazione

Prima di tutto installiamo il pacchetto `WoeUSB` nel nostro sistema, disponibile nelle principali repository delle varie distribuzioni.

### Fedora, CentOS e derivate

Su Fedora, CentOS o derivate possiamo tranquillamente sfruttare `dnf`:

```bash
dnf install WoeUSB
```

### openSUSE

Su openSUSE procediamo invece con `zypper`:

```bash
zypper install WoeUSB
```

### Ubuntu e derivate

Nelle repository di default di Ubuntu e derivate WoeUSB non si trova, pertanto dovremo aggiungere la PPA di [WebUpd8](https://launchpad.net/%7Enilarimogard/+archive/ubuntu/webupd8).

```bash
add-apt-repository ppa:nilarimogard/webupd8
apt-get update
apt-get install WoeUSB
```

### Debian e derivate

Come su Ubuntu, WoeUSB non è incluso nelle repo di default di Debian e derivate, ma in questo caso dovremo importarne una noi.

Aggiungiamola al file delle fonti per `apt`:
```bash
echo 'deb http://download.opensuse.org/repositories/home:/Provessor/Debian_10/ /' | sudo tee /etc/apt/sources.list.d/home:Provessor.list
curl -fsSL https://download.opensuse.org/repositories/home:Provessor/Debian_10/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home:Provessor.gpg > /dev/null
```

effettuiamo un update:
```bash
apt update
```

e installiamo il software:
```bash
apt install woeusb
```

### Arch Linux

Con Arch Linux possiamo sfruttare `pacman`:

```bash
pacman -S WoeUSB
```

## Utilizzo di WoeUSB

Avviando WoeUSB ci ritroveremo davanti una GUI simile alla seguente:

![Woeusb gui](storage/woeusb.png)

Qua potremo come prima cosa selezionare **quale ISO utilizzare** (o se prendere il media di installazione da un disco) e flashare sul nostro supporto USB (scaricabile dal sito di Microsoft gratuitamente), per poi selezionare il **filesystem** che vogliamo usare per la chiavetta (ricordate che FAT32 ha un limite di 4GB per file, quindi se la ISO pesa più di 4GB usate NTFS).

Fatto ciò selezioniamo la USB che vogliamo utilizzare, che ovviamente dovrà essere montata, e il gioco è fatto.

> Il tempo che impiegherà il software a flashare la ISO sulla USB dipende da quanto sono veloci la vostra chiavetta e le porte.

## Conclusione

Una volta concluso il processo di flash, il programma installerà GRUB2 sulla USB (In modo da abilitare il boot Legacy) e cosi avremo una USB di Windows avviabile da qualsiasi PC.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.