---
title: '#howto - Sincronizzare contatti/calendario/attività da Nextcloud su Android'
description: "In questa guida vediamo come sincronizzare contatti, calendario ed attività su Android tramite app OpenSync, disponibile gratuitamente tramite Play Store di Google."
date: 2019-10-28
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nextcloud
---
Abbiamo parlato più volte di come [installare](https://linuxhub.it/search?searchword=nextcloud+server&ordering=newest&searchphrase=all&limit=10) Nextcloud su server e [sincronizzarne](https://linuxhub.it/articles/howto-collegare-e-sincronizzare-nextcloud-su-desktop-linux) il contenuto su desktop tramite le apposite applicazioni ed integrazioni.

In questa guida vediamo come sincronizzare contatti, calendario ed attività su Android tramite app OpenSync, disponibile gratuitamente tramite Play Store di Google.

> OpenSync è un fork di DavDroid per Android, il cui sviluppo prosegue sotto nome di DAVx5\. Potete usare entrambe le app poichè condividono le stesse funzionalità ed esperienza utente.

## Installazione di OpenSync

Per quanto riguada [OpenSync](https://play.google.com/store/apps/details?id=com.deependhulla.opensync&hl=it), possiamo procedere all'installazione tramite Play Store, comunemente fornito di base nella maggior parte degli smartphone Android. Cerchiamo quindi l'applicazione nello store o via [link diretto](https://play.google.com/store/apps/details?id=com.deependhulla.opensync&hl=it).

### DAVx5 (opzionale)

Nel caso volessimo utilizzare l'alternativa [DAVx5](https://f-droid.org/en/packages/at.bitfire.davdroid/), dobbiamo per prima cosa installare F-Droid al seguente [link](https://f-droid.org/FDroid.apk), una volta installato lo store, procediamo con la sincronizzazione delle repository, procedimento che può impiegare fino a 3 minuti in base alla connessione del dispositivo.

> È possibile installare DAVx5 tramite APK e senza installare F-Droid, sconsiglio questo metodo poichè non è possibile ricevere aggiornamenti se non scaricando manualmente le APK ad ogni rilascio.

Una volta completato il processo di aggiornamento delle repository, installiamo l'app cercando DAVx5 nello store o accedendo tramite [link diretto](https://f-droid.org/en/packages/at.bitfire.davdroid/).

## Configurazione

Il procedimento di configurazione è lo stesso in entrambi i casi. Per prima cosa lanciamo l'applicazione installata, subito ci verrà richiesto di associare un account Nextcloud:

*   Rimaniamo su **Accedi con indirizzo e-mail** nel caso di account presso i server ufficiali di Nextcloud
*   Spostiamoci su **Accedi con URL e nome utente** in caso di installazioni self-hosted

Una volta completati i campi di login, possiamo selezionare quali contenuti sincronizzare col sistema:

*   CardDAV per i contatti
*   CalDAV per calendari ed attività (per la sincronizzazione delle attività è richiesta la presenza di OpenTasks, disponibile presso Play Store)

dopo la prima sincronizzazione viene mostrata una notifica che avverte la mancana di permessi, una volta impostati procediamo nuovamente con la sincronizzazione.

Essenziale è rimuovere l'applicazione dalla ottimizzazione della batteria, questo evita la mancata sincronizzazione dei contenuti.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**