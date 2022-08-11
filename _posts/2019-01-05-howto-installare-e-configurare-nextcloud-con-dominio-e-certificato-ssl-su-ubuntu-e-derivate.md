---
title: '#howto - Installare e configurare Nextcloud con dominio e certificato SSL su Ubuntu e derivate'
description: "Nextcloud è una piattaforma di file sharing open source che permette l'archiviazione in cloud di file personali.."
date: 2019-01-05
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nextcloud  
  - privacy
---
Nextcloud è una piattaforma di file sharing open source che permette l'archiviazione in cloud di file personali (documenti, immagini, archivi, ..), il tutto rispettando i principi di sicurezza e privacy di cui gode dalla nascita.

In questa guida andiamo a vedere come è possibile installare e configurare Nextcloud su server Ubuntu e derivate.

## Installazione

Per l'installazione andremo ad usare **snap**, un gestore di pacchetti ideato da Canonical Ltd. e distribuito con Ubuntu dalla release 18.04 in poi. La peculiarità di questo gestore sta nella sua struttura, che consente di installare un'applicazione con tutte le librerie di cui ha bisogno, separate dal sistema, evitando così possibili conflitti di dipendenza fra diverse applicazioni.

Procediamo con l'installazione via **snap**:

    sudo snap install nextcloud

verifichiamo infine la corretta installazione interrogando i cambiamenti (**changes**) con snap:

    snap changes nextcloud

verrà restituito un output con 5 colonne, leggendo la seconda (**Status**) leggiamo **Done** se l'installazione è andata a buon fine.

## Configurazione

Nextcloud viene fornito con accesso via riga di comando, per una rapida gestione e manutenzione.

### Creazione account admin

Per la configurazione della piattaforma ci servirà un account di amministrazione, per crearlo possiamo sfruttare il seguente set di istruzioni via terminale:

    sudo nextcloud.manual-install user password

dove:

*   user - è il nostro nome utente
*   password - è la password dell'utente

riceveremo come output: **Nextcloud was successfully installed**.

### Configurazione dominio di accesso

Possiamo accedere alla nostra installazione via indirizzo IP ma può tornare utile evitare di esporlo pubblicamente o semplicemente ricordarlo facilmente, collegando un dominio, ad esempio **il_mio_nextcloud.ex**.

Per prima cosa dobbiamo registrare un dominio e puntarne i DNS al nostro server: per una miglior gestione dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

Una volta puntato il dominio al nostro server, possiamo aggiungerlo via terminale:

    sudo nextcloud.occ config:system:set trusted_domains 1 --value=il_mio_nextcloud.ex

dove **il_mio_nextcloud.ex** è il dominio che abbiamo precedentemente puntato all'indirizzo IP del server.

Ora possiamo raggiungere l'installazione dal dominio appena collegato.

### Configurazione SSL

Allo scopo di migliorare la sicurezza della nostra installazione Nextcloud, andiamo ora a generare e collegare un certificato SSL, abilitando l'accesso tramite connessione sicura SSL (https). 

Prima di tutto dobbiamo configurare **ufw** (il firewall) per accettare le connessioni via SSL, per farlo digitiamo:

    sudo ufw allow 80,443/tcp

Possiamo procedere ora in due modi:

*   Let's Encrypt - osia tramite l'ottenimento di un certificato via Let's Encrypt
*   Self-Signed - generando quindi il certificato "in casa"

#### Let's Encrypt

La procedura è guidata via console con **nextcloud.enable-https** digitando:

    sudo nextcloud.enable-https lets-encrypt

ci verrà chiesto di confermare i requisiti, inserire un indirizzo e-mail valido per il recupero ed il dominio a cui si riferirà il dominio. Una volta completato ci restituirà un output di successo (**Done**).

#### Self-Signed

Scegliando la procedura Self-Signed, il metodo è lo stesso, con la sostanziale differenza che non necessità di procedura guidata, digitando quindi:

    sudo nextcloud.enable-https self-signed

riceveremo subito un messaggio di successo (**Done**).

Visitando ora il nostro dominio precedendo con **https://** avremo accesso alla nostra installazione Nextcloud sotto SSL.

_Good ***nix**?_  
_ - Mirko_