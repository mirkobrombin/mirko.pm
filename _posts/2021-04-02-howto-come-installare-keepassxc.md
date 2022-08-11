---
title: '#howto - Installazione di KeePassXC su Linux'
date: 2021-04-02
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**KeePassXC** è un gestore di password moderno, sicuro e open source che archivia e gestisce le tue informazioni più sensibili.

In questa guida vedremo come installarlo sulle principali distribuzioni Linux.

## Installazione

Ci sono 3 modi per installare KeePassXC su Linux, tramite il nostro package manager, tramite AppImage o Snap.

### Installazione tramite Package Manager

KeePassXC si trova nelle repo delle distribuzioni principali, come Ubuntu e Debian, Arch Linux, Fedora e CentOS.

#### Ubuntu, Debian o derivate

Se abbiamo Ubuntu o una sua derivata installiamo il pacchetto `keepassxc` con `apt` con il seguente comando:

```bash
apt install keepassxc
```

#### Arch Linux

Su Arch Linux installiamo il pacchetto `keepassxc` con `pacman`:

```bash
pacman -S keepassxc
```

#### Fedora, CentOS o derivate

Mentre su Fedora, CentOS e derivate installiamo `keepassxc` con `dnf`:

```bash
dnf install keepassxc
```

### Installazione tramite AppImage

Se vogliamo usare invece **AppImage**, dovremo prima scaricare l'ultima versione da [qui](https://keepassxc.org/download/) e spostare il file dentro ad una cartella specifica:

```bash
# Andiamo nella cartella dove abbiamo scaricato KeePassXC ed eseguiamo questo comando
mv fileKeepass ~/opt/KeePassXC/
```

Dopodiché, andiamo dentro a `~/opt/KeePassXC/` e diamo a KeePassXC i permessi per l'esecuzione:

```bash
# Diamo i permessi di esecuzione a KeePass
chmod +x NomeEsecutibileDiKeePass

# Avviamo KeePass con il seguente comando
./NomeEsecutibileDiKeePass
```
> Ricordo che per avviare le applicazioni in formato AppImage bisogna aver installato il pacchetto `fuse`.

### Installazione tramite Snap

Se vogliamo usare **Snap**, infine, molto semplicemente possiamo eseguire il seguente comando:

```
snap install keepassxc
```

## Configurazione

Una volta avviato KeePassXC ci ritroveremo davanti ad una schermata simile alla seguente:

![Image 20210331191634290](storage/image-20210331191153828.png)

Da questa schermata creiamo un nuovo database premendo **Create new database** (se non abbiamo mai usato KeePassXC). Se, invece, si possiede un database, possiamo usare **Open existing database** o **Import** per aprirlo o importarlo.

Dopo aver premuto il tasto per creare il database seguiamo il setup guidato. Una volta che il processo sarà arrivato alla fine (ovviamente vuoto), dovremmo ricevere una schermata come la seguente:

![image-20210331191634290](storage/image-20210331191634290.png)

## Conclusione

A questo punto avremo un nuovo password manager **locale** funzionante al 100%. Ricordo che, se si dovesse reinstallare l'OS o cambiare PC, è necessario spostare il database delle password, altrimenti tutte le credenziali salvate andranno inevitabilmente perse.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.