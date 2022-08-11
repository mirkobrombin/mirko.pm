---
title: '#howto - Sincronizzazione di Nextcloud su KDE (Calendario, contatti, files)'
description: "In questa sezione vediamo come sincronizzare i nostri file (o meglio come accedervi in remoto) con Dolphin, il gestore file predefinito in KDE."
date: 2019-11-20
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - php  - nextcloud
---
In altre guide abbiamo visto come sincronizzare Nextcloud su <a href="https://linuxhub.it/articles/howto-sincronizzare-contatti-calendario-attivit%C3%A0-da-nextcloud-su-android">Android</a> e <a href="https://linuxhub.it/articles/howto-collegare-e-sincronizzare-nextcloud-su-desktop-linux">Desktop Linux</a> usando rispettivamnete OpenSync ed il client ufficiale di Nextcloud.
In questa guida vediamo come sincronizzare tramite gli strumenti di KDE, già in dotazione da nuova installazione.

## Files
In questa sezione vediamo come sincronizzare i nostri file (o meglio come accedervi in remoto) con Dolphin, il gestore file predefinito in KDE.

Per prima cosa portiamoci alla voce *Rete* dalla colonna laterale sinistra di Dolphin e scegliamo *Aggiungi cartella di rete* per aprire l'assistente:
![Aggiungi cartella di rete](storage/Screenshot_20191117_161057.png)
Nella schermata che si apre, selezioniamo *Cartella web (webdav)* e proseguiamo, successivamente compiliamo i dati:
* **Nome** con il titolo che vogliamo dare alla cartella
* **Utente** con l'username nel nostro server Nextcloud
* **Server** con l'indirizzo del nostro server
* **Porta** con la porta in cui è in ascolto il web server (normalmente 80)
* **Cartella** col percorso remoto WebDAV, normalmente ```remote.php/webdav/```

selezioniamo *Utilizza cifratura* nel caso fosse presente un certificato SSL configurato per la nostra installazione di Nextcloud, questa opzione cambierà automaticamente la porta da 80 a 443.

Una volta terminato il processo e salvato ogni modifica, verrà posizionata una icona col nome scelto nella sezione Rete di Dolphin da cui possiamo accedere in remoto ai nostri file.

## Calendario
Il processo di sincronizzazione del calendario è relativamente semplice. Per prima cosa apriamo KOrganizer e nel box dei calendari (a sinistra, nella parte inferiore della schermata) selezioniamo la voce *Aggiungi calendario* dal menu contestuale (tasto destro del mouse):

![Aggiungi calendario](storage/Screenshot_20191117_162032.png)

Nella finestra che si apre, selezioniamo dalla lista dei servizi *Risorsa di groupware DAV*, e digitiamo successivamente i nostri dati per Nextcloud. 

Proseguiamo nella schermata successiva selezionando *Nextcloud* alla voce *Usa uno di questi server*:
![Server groupware](storage/Screenshot_20191117_162527.png)

e compiliamo i seguenti campi:
* **Host** con l'indirizzo della nostra installazione (senza protocollo http/s://)
* **Percorso di installazione** con la cartella dove è presente l'installazione (se Nextcloud è installato nella root del sito web, lasciare in bianco).

Effetuiamo il test di connessione e procediamo col salvataggio delle impostazioni per visualizzare i calendari sincronizzati.

## Contatti
Per quanto riguarda la sincronizzazione dei contatti, il procedimento si effettua in un unico passaggio.

Portiamoci in **Impostazioni di sistema / Account in Linea / Crea** e selezioniamo Nextcloud (o ownCloud) dal menu dei servizi, inseriamo semplicemente i dati del nostro server ed una volta salvate le impostazioni verranno sincronizzati tutti i contatti dal percorso remoto.

Per dubbi e chiarimenti, utilizzate il nostro <a href="https://t.me/gentedilinux">gruppo Telegram</a>.

?Good *nix _Mirko