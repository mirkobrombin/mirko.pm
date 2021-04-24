---
title: '#howto - Come usare Pacman, comandi fondamentali'
description: "Pacman è il Package Manager di Arch Linux installato di default, scritto interamente in C."
published: 2019-10-05
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - php  - archlinux
---
Pacman è il **Package Manager di Arch Linux** installato di default, scritto interamente in C.

Questo gestore pacchetti, però, non ha una sintassi semplicissima e intuitiva, e potrebbe risultare a dir poco complesso per l'utente medio. Per ovviare a questo problema basta tenere a mente alcuni piccoli comandi utili per poter utilizzare Pacman al meglio tutti i giorni.

> Questa guida non vuole essere un sostituto alla wiki ufficiale, per comandi e usi avanzati usare _'man pacman'_ o appunto la **[wiki ufficiale.](https://wiki.archlinux.org/index.php/Pacman)**

## Comandi Fondamentali

Vediamo quali sono i **comandi base** da tenere a mente per chi si vuole approcciare per la prima volta ad Arch Linux e quindi a Pacman.

### Installare un pacchetto

La funzione forse più banale per un package manager è ovviamente quella che permette l'**installazione di un pacchetto**:

    pacman -S nome_pacchetto

talvolta è possibile inciampare in un errore causato dal mancato aggiornamento del database. Per risolvere questo problema, possiamo aggiungere l'argomento _**-_y_**:_

    pacman -Sy nome_pacchetto

### Aggiornamento di sistema

Un'altra delle funzioni essenziali è certamente l'aggiornamento di sistema e delle repository, accessibili tramite la flag **-Syu**:

    pacman -Syu

### Rimozione di un pacchetto

Questa opzione, dove la **R** sta ovviamente per **remove**, serve appunto per rimuovere un pacchetto.

    pacman -R nome_pacchetto

Ci sono altri modi per usare questa opzione: ad esempio, possiamo utilizzare le flag _**-Rs**_, _-_**_Rn_** e _**-Rns**._ La prima permette di rimuovere il pacchetto, controllare eventuali dipendenze ed eliminare dal sistema anch'esse; il secondo impedisce a pacman di creare file di backup del pacchetto eliminato, mentre il terzo è un semplice parametro che unisce le funzionalità delle precedenti flag.

### Ricerca nel database

Questa opzione permette di cercare nel database il nome di un pacchetto basandosi su delle parole chiave, come ad esempio "_pacman -Ss file-manager_". Ecco un esempio:

    pacman -Ss neofetchcommunity/neofetch 6.1.0-1    A CLI system information tool written in BASH that supports displaying    images.

### Pacchetti installati

L'opzione in questione, dove la Q sta per Query, permette di avere una lista di tutti i pacchetti installati sulla macchina dove viene eseguito.

Questa opzione può anche essere usata con gli argomenti **-_Qs_** e **-_Qi_**, dove:

*   **-Qs** permette di avere la lista dei pacchetti installati con anche una breve descrizione, come se stessimo consultando l'elenco dal database con _pacman -Ss_
*   **-Qi**, seguito da un nome di pacchetto installato sulla macchina, permette di avere il nome di esso, dettagli, dimensione, dipendenze, etc.

    pacman -Qacl 2.2.53-1adobe-source-code-pro-fonts 2.030ro+1.050it-5adwaita-icon-theme 3.34.0-1alsa-firmware 1.0.29-2alsa-lib 1.1.9-2alsa-oss 1.1.8-1...

### Pulizia della cache

L'ultima opzione essenziale permette di pulire la cache del gestore pacchetti:

    pacman -Sc

Questi sono dei semplici comandi che conoscendoli semplificano di molto l'uso di pacman e la gestione del sistema.   
Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/gentedilinux).