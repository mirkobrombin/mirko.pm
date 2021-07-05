---
title: '#howto - Installazione ed utilizzo di Bitwarden su Linux'
date: 2020-06-15
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - github  
  - bash
---
**Bitwarden** è un gestore password open source e sincronizzato disponibile per tutti i sistemi operativi desktop e mobili sia come client che come estensione browser.

In questa guida vediamo come installarlo ed utilizzarlo su Linux in 3 modi:
- client da riga di comando (CLI)
- applicazione desktop ufficiale
- menu rofi

## CLI
Si tratta della versione da riga di comando. Su Arch Linux è possibile installarlo da AUR col pacchetto `bitwarden-cli` (leggi come <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper">qui</a>). Per tutte le altre distribuzioni possiamo procedere in due modi:
- snap
- npm

Nel caso fosse presente `snap`:

```bash
snap install bw
```

mentre nel caso di `npm`:

```bash
npm install -g @bitwarden/cli
```

### Utilizzo
Si tratta di uno strumento abbastanza semplice da usare, trovate <a href="https://bitwarden.com/help/article/cli/">qui</a> la documentazione dettagliata. Vediamo di seguito quali sono i controlli di uso comune.

Possiamo restituire il **menu delle opzioni** sfruttando l'opzione *help*:

```bash
bw --help
```

Prima di tutto è necessario configurare la sessione di accesso indicando con l'opzione *login* email e password:

```bash
bw login EMAIL PASSWORD --raw
```

sostituendo ovviamente **EMAIL** e **PASSWORD** con i vostri dati. Una volta fatto questo restituisce una chiave di sessione che dobbiamo andare ad assegnare alla variabile *BW_SESSION*:

```bash
export BW_SESSION="CHIAVE_SESSIONE"
```

in questo modo sfruttando le opzioni *list* e *items* riceviamo tutti gli elementi salvati:

```bash
bw list items
```

## Applicazione desktop
Il metodo più semplice per installare l'applicazione desktop ufficiale è sicuramente via *flatpak* tramite il portale **fluthub**.

Per prima cosa installiamo il supporto flatpak nel caso non fosse installato (leggi <a href="https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub">qui</a>) e successivamente procediamo all'installazione da <a href="https://flathub.org/apps/details/com.bitwarden.desktop">qui</a>.

Su **Arch Linux** possiamo procedere all'installazione di *bitwarden* via AUR (leggi come <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper">qui</a>).

## Menu Rofi
Per gli utilizzatori del menu Rofi, esiste un wrapper per la *cli* che può essere usato appunto via rofi. 

> Prima di tutto dobbiamo installare la versione *cli* di bitwarden dalla apposita sezione in questa guida, dobbiamo inoltre procedere alla configurazione della sessione come indicato nella guida.

Gli utenti **Arch Linux** possono trovare il pacchetto *bitwarden-rofi* su AUR. Per tutte le altre distribuzioni procediamo con l'installazione di:
- **rofi** utilizzando il proprio gestore pacchetti
- **bitwarden-cli**
- **jq** sempre tramite il gestore pacchetti di sistema

Scarichiamo quindi il sorgente:

```bash
wget https://github.com/mattydebie/bitwarden-rofi/archive/master.zip
```

e procediamo con la decompressione dell'archivio:

```bash
unzip master.zip
```

Creiamo il percorso `~/.local/bin` nel caso non fosse presente:

```bash
mkdir -p ~/.local/bin
```

e spostiamo al suo interno il file `bwmenu`:

```bash
cp bwmenu ~/.local/bin/bwmenu
```

per poi renderlo eseguibile:

```bash
chmod +x ~/.local/bin/bwmenu
```

Una volta riavviata la sessione possiamo richiamare il menu col comando `bwmenu`.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).