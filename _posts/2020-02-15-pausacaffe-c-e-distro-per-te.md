---
title: "#pausacaffe -  C'è distro per te"
description: "Buongiorno o buonasera a te che prendi un caffè a qualsiasi ora del giorno e che vuoi installare la tua.."
date: 2020-02-15
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - ubuntu  
  - systemd
---
Buongiorno o buonasera a te che prendi un caffè a qualsiasi ora del giorno e che vuoi installare la tua **prima distribuzione Linux** sul tuo PC. L'idea per questo articolo mi è venuta dalle innumerevoli domande che mi vengono poste o che leggo nei vari gruppi Telegram, utenti neofiti che vogliono installare Arch perchè lo vedono da altri utenti, magari da r/unixporn, oppure altre persone che chiedono se la distro che hanno scelto va bene.<br>
Su questo mi vorrei soffermare, se ti stai chiedendo se la distro che hai scelto fa per te, vuol dire che quella distro non fa per te. Se vai per installare Arch, ma poi chiedi a che ti serve Arch, vuol dire che a te Arch non serve, dato che non hai alcun motivo per installarlo.

## Le distribuzioni

La selezione della distribuzione migliore va sia in base alla preferenza personale, il *tipo di distro*, la *continuità negli aggiornamenti* e sul *package manager* utilizzato, che può sembrare una cosa di secondo piano per molte persone poco avvezze, ma è uno dei tratti distintivi delle distribuzioni. Ad esempio, Arch si differenzia da Gentoo o da Void non solo per il *Init System*, ma anche per il package manager. Arch, infatti, usa *pacman*, Gentoo *portage* e Void *xbps*, ognuno ha vantaggi e svantaggi.
Ora vedremo le diverse distribuzioni e parleremo dei loro pregi e difetti.

### Ubuntu e derivate

Una delle distribuzioni più usate è **Ubuntu**, derivante da **Debian Unstable (o Testing per le LTS)**. Ubuntu ha la peculiarità di aver, sopratutto negli ultimi anni, migliorato la sua user experience: oramai chiunque installa Ubuntu, anche se non ha mai usato GNU/Linux, saprà sfruttarlo come si deve.<br>
Di Ubuntu esistono tre versioni principali, la standard, la LTS, e le spin: quest'ultime sono distribuzioni di Ubuntu con diversi DE, come Kubuntu o Xubuntu. Ovviamente se poi vogliamo massima stabilità possiamo anche riversare il nostro interesse verso Debian Stable, che proprio per questo fattore è molto comune nei server. Ubuntu usa, sempre come Debian, il package manager **APT**, che condivide sempre con le sue derivate.<br>
Canonical, l'azienda dietro lo sviluppo di Ubuntu, a fine 2014 rilasciò _snap_, un sistema di gestione pacchetti decentralizzato dalla distribuzione in uso, in grado di fornire aggiornamenti automatici e veloci su ogni distro. Sulle ultime versioni di Ubuntu, snap è installato di default.

Ubuntu è una distribuzione relativamente semplice per l'utente medio, e può essere usata per quasi qualsiasi ambito, dal software development alla navigazione online.

### Fedora

Un'altra distribuzione molto usata, soprattutto in ambito professionale, è **Fedora**, una distro di qualità sia lato aggiornamenti sia dal punto di vista della personalizzazione. Proprio per questo viene rilasciata in due versioni, ovvero **Workstation**, per chi desidera un sistema pronto all'uso e da personalizzare, e la **Netinstall**, un'immagine leggera circa 600mb che avviandola ti permette di modificare l'intera installazione con i pacchetti desiderati, DE, gruppi di pacchetti per sviluppo, multimedia e grafica desiderati. Fedora è gestita dalla community, ma è sponsorizzata da **Red Hat**, con cui condivide ad esempio il package manager **RPM**.

Fedora è una distribuzione che si districa tra l'utente medio e quello avanzato. Essa infatti permette di avere la semplicità d'uso richiesta dal primo tipo di persona, che magari ha già avuto a che fare con una distro Linux, fino al secondo tipo di utente, che richiede una distribuzione personalizzabile per i suoi usi e che gli dia la stabilità adatta ad una macchina di lavoro.

### Arch, Gentoo e Void

Ho voluto raggruppare Arch, Gentoo, Void e tutte le distro simili per un semplice motivo. Tutte queste, sempre con le varie differenze, sono fatte per lo stesso tipo di utente, quello avanzato, che dopo aver usato per mesi una normale distribuzione richiede ora qualcosa di sempre aggiornato e personalizzabile in ogni suo aspetto.<br>

Qui entrano in gioco distribuzioni come quelle citate qualche riga prima. Tutte e tre sono distribuzioni Rolling Release, cioè che non hanno un numero di versione fisso e i pacchetti (o l'intero sistema) sono aggiornati continuamente. Una delle maggiorni differenze tra i tre è **l'Init System**: Arch usa *<a href="https://linuxhub.it/articles/howto-introduzione-a-systemd">systemd</a>*, Gentoo **OpenRC** e Void **runit**. Questo permette ad ogni utente di scegliere l'init di sistema che preferisce. Però, attenzione. Trattandosi di distribuzioni altamente personalizzabili, nulla ci vieta di installare OpenRC su Arch o systemd su Void. Io personalmente con Arch sono riuscito senza troppi problemi ad installare OpenRC, ma non posso affatto dirlo con Ubuntu, dove non era in grado nemmeno di partire.<br>

Altre differenze tra queste distribuzioni sono il metodo di installazione pacchetti: Arch usa **pacman** come package manager e, per i pacchetti non presenti nei repository ufficiali, *AUR*, acronimo di Arch User Repository, argomento che ho già trattato in un articolo dedicato <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper">qui</a>. Un sistema che possiamo considerare simile è usato da Void, con **xbps** come package manager per i binari precompilati e **xbps-src** per i pacchetti da compilare. Gentoo, invece, è completamente diverso: su di esso abbiamo il package manager **Portage**, che a differenza di pacman e xbps, dove i pacchetti sono già compilati, richiede la compilazione di ogni singolo pacchetto che andiamo a scaricare. Proprio per questo si dice che Gentoo è altamente ottimizzato per il sistema in uso, dato che possiamo compilare ogni pacchetto, kernel compreso, per l'architettura del nostro PC.

Infine, possiamo considerare queste tre distribuzioni e tutte le altre molto simili. Sono distribuzioni per utenti avanzati, per quelle persone che non si vogliono fermare al sistema OOTB, ma vogliono sfruttare una distro che gli permetta di costruire il suo sistema per le sue richieste, così da avere il giusto equilibrio di funzionalità, personalizzazione e leggerezza.

## Ricapitoliamo

Oggi ho parlato di alcune delle principali distribuzioni, ma non tutte: non ho citato, ad esempio, OpenSuse. Mi auguro che tutto questo vi sia servito per fornirvi un'infarinatura di come scegliere la vostra distro.
Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.