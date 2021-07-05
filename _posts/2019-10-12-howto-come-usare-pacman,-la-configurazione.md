---
title: '#howto - Come usare Pacman, la configurazione'
description: "Dopo aver discusso dei suoi comandi fondamentali, oggi parleremo della configurazione di Pacman, package manager di Arch Linux, gestibile tramite il suo config file."
date: 2019-10-12
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - php  
  - gnome  
  - archlinux
---
Dopo aver discusso dei suoi comandi fondamentali, oggi parleremo della configurazione di **Pacman**, package manager di Arch Linux, gestibile tramite il suo config file.

Il file di configurazione di Pacman si trova al percorso **_/etc/pacman.conf_**. Per iniziare a personalizzarlo, apriamolo con il nostro editor di testo preferito come superuser: io personalmente uso neovim, quindi _sudo neovim_, se usate nano apritelo con _sudo nano._

> Questa guida non vuole essere un sostituto alla wiki ufficiale, per configurazioni avanzate usare la **[wiki ufficiale](https://wiki.archlinux.org/index.php/pacman)**

## IgnorePkg e IgnoreGroup

**IgnorePkg** e **IgnoreGroup**, voci di default commentate e quindi non utilizzate, possono essere utilizzate per impedire _l'update di un pacchetto_ o di _un gruppo di pacchetti_. Ad esempio, se scriviamo `IgnorePkg = linux`, ad ogni update Pacman non aggiornerà il kernel, invece, se scriviamo `IgnoreGroup = gnome` e se sul PC è installato GNOME, ad ogni update non verrà aggiornato nessun pacchetto del gruppo _gnome_.

## NoUpdate

Hai paura che il tuo update possa cambiare qualche file, rischiando di rompere il tuo sistema? Usa **NoUpdate**. Abilitando questa voce, di default commentata, puoi aggiungere dei file che non vuoi che il sistema sostituisca durante l'aggiornamento: esso creerà _un file con lo stesso nome_, ma con estensione _.pacnew_, per fare in modo che tu possa applicare le tue modifiche e stare al sicuro durante l'update. Ad esempio, non vuoi che un update modifichi il tuo fstab? Scrivi semplicemente `NoUpdate = /etc/fstab`, e in questo modo Pacman creerà un fstab.pacnew che potrai controllare e modificare.

## Misc Options

Sotto _Misc Options_ abbiamo diverse opzioni, di cui una nascosta. Ma prima parliamo di quelle presenti:

*   **UseSyslog**: Prende il Log tramite _Syslog()_ e lo salva nel file log di default
*   **Color**: Abilita i _colori_ all'output di Pacman
*   **TotalDownload**: Fornisce un output più dettagliato per ogni pacchetto in download con _dimensione scaricata, velocità di download e ETA_
*   **CheckSpace**: Controlla approssimativamente _lo spazio disponibile sul disco_ per l'installazione dei pacchetti
*   **VerbosePkgInfo**: Mostra più informazioni sui pacchetti che vengono installati, _come versione che verrà installata, versione già installata, repo del pacchetto e dimensione di esso_

Ora tocca all'opzione nascosta, **ILoveCandy**, un easter egg che sostituisce alla normale progress bar un'animazione di Pacman che mangia le palline.

## Personalizzazione Repos

Con Pacman abbiamo la possibilità di abilitare o disabilitare delle repo di default, oppure aggiungerne di personalizzate. Ora vediamo i due tipi:

### Repo Ufficiali

Tra le _repo ufficiali_ possiamo attivare ad esempio _[testing]_, decommentando le sue due righe e commentando quelle di _[stable]_, oppure decommentare _[multilib]_ per abilitare le repo a 32-bit.

### Repo Non Ufficiali

Per abilitare delle _repo non ufficiali_ ([qui](https://wiki.archlinux.org/index.php/Unofficial_user_repositories) un elenco di repo firmate e non), basta aggiungere alla fine del file le determinate voci seguendo questo schema:

    [NomeRepo]SigLevel = <Signature Level>   # Sostituisci <Signature Level> con il livello firma, se unsigned non                               # aggiungere questa rigaServer = <ServerLink>          # Inserire qui il link del server della repo

Queste sono alcune tra le cose più importanti da conoscere per personalizzare la configurazione di Pacman. Una funzionalità molto utile del package manager di Arch sono gli _**Hooks**_, ma è un argomento di cui parlerò nella prossima guida. Per i comandi fondamentali di Pacman invece vai [qui](https://linuxhub.it/article/howto-come-usare-pacman-comandi-fondamentali).

Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/gentedilinux).