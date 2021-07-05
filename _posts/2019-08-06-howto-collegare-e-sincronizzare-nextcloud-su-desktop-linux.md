---
title: '#howto - Collegare e sincronizzare Nextcloud su desktop Linux'
description: "Ciò che andiamo a vedere oggi è come collegare e sincronizzare Nextcloud nella nostra distribuzione desktop di tutti i.."
date: 2019-08-06
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nextcloud  
  - github  
  - bash
---
Abbiamo già pubblicato nella raccolta di guide su Nextcloud, come installare questa piattaforma su varie distribuzioni server.

> Il termine Linux nel titolo di questo articolo fa riferimento in realtà a tutto l'insieme di distribuzioni compatibili (Fedora, Ubuntu, Debian, ..).

Ciò che andiamo a vedere oggi è come collegare e sincronizzare Nextcloud nella nostra distribuzione desktop di tutti i giorni. I pregi di mantenere la sincronia fra desktop e server sono diversi, in primis l'immediata disponibilità dei file, il loro aggiornamento ed il poterli utilizzare quando non è presente una connessione per poi salvare le modifiche quando torniamo online.

## Installazione

Il mio metodo preferito per sincronizzare i file è tramite il client ufficiale, si può poi optare per altre soluzioni come ad esempio la configurazione del percorso DAV ma non è questa la guida.

Per prima cosa scarichiamo il client ufficiale ([qui](https://nextcloud.com/install/#install-clients)) che su Linux viene fornito sotto forma di AppImage pronta all'uso:

![Download Nextcloud Linux AppImage](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/howto_nextcloud_download_linuxhub.png)

Successivamente portiamoci nella directory dove è stato scarico il file e spostiamolo nella locazione **/opt** di sistema:

    sudo mv Nextcloud*.AppImage /opt

ed impostiamo i permessi per l'esecuzione del file:

    sudo chmod +x /opt/Nextcloud*.AppImage

in questo modo lo possiamo eseguire come una normale applicazione.

## Registrazione nel sistema

Portarsi sempre alla directory **/opt** o ricorrere al terminale per avviare l'applicazione, non è di certo la miglior scelta in un contesto produttivo. In questa parte di guida vediamo come registrare l'applicazione con **appimaged** in modo da inserire la nostra AppImage nella directory di sistema e facendola così rilevare ed inserire nei menu delle applicazioni.

Per prima cosa scarichiamo **appimaged**:

    wget "https://github.com/AppImage/appimaged/releases/download/continuous/appimaged-x86_64.AppImage"

impostiamo i permessi:

    chmod +x appimaged-x86_64.AppImage

ed installiamo

    ./appimaged-x86_64.AppImage --install

rieffettuiamo il login col nostro account per renderlo funzionante. Infine eseguiamo:

    appimaged

 per rilevare le nostre AppImage, ora NextCloud compare nel nostro menu applicazioni.

## Avvio col sistema

Per facilitarne il funzionamento, può tornare utile eseguirlo col sistema in modo da avviarlo ad ogni accensione.

Ci sono diversi metodi per fare ciò, quello che consiglio io è sfruttare le impostazioni fornite col Desktop Environment in uso.

### KDE

Nel caso di KDE possiamo procedere dal gestore Impostazioni, cerchiamo **Avvio e spegnimento**, una volta entrati nella sezione clicchiamo su **Aggiungi programma** e selezioniamo la nostra AppImage in **/opt**, infine salviamo le modifiche.

### GNOME

Creiamo uno script **sh** per l'esecuzione della nostra **AppImage** in ~/.config/autostart:

    nano ~/.config/autostart/nextcloud.sh

col seguente contenuto:

    #!/bin/bashcd /opt./Nextcloud.AppImage

infine salviamo.

### XFCE/Mate

Dal menu delle Impostazioni, portiamoci su **Avvio applicazioni**, nella finestra che si apre clicchiamo su **Aggiungi** e selezioniamo il percorso della nostra AppImage in **/opt**.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**