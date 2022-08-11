---
title: '#howto - Installazione e configurazione di OpenLitespeed su Centos 7/RHEL 7'
description: "OpenLitespeed è la variante Open source di Litespeed, un Web Server.."
date: 2019-11-09
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos
---
**OpenLitespeed** è la variante **Open source** di Litespeed, un **Web Server** estremamente performante sviluppato da LiteSpeed Technologies.

La sua struttura permette l'esecuzione su hardware di basso livello, offrendo a consumi ridotti, prestazioni di alto livello. Fra i punti forza di questo troviamo una interfaccia web pronta all'uso da cui controllare e gestire il server.

> Questa guida si può applicare a tutte le versioni di Centos 7 e RHEL7, escluso Centos 8 e RHEL 8.

## Installazione

L'installazione è particolarmente semplice e si divide in due step:

*   Installazione della repository
*   Installazione del software

Non sono richieste dipendenze particolari durante l'installazione di openlitespeed.

### Installazione della repository

LiteSpeed Technologies offre una repository ufficiale da cui installare l'ultima versione di OpenLitespeed, aggiungiamola quindi al sistema via **rpm**:

    sudo rpm -ivh http://rpms.litespeedtech.com/centos/litespeed-repo-1.1-1.el7.noarch.rpm

una volta aggiunta verrà effettuato automaticamente l'aggiornamento delle repository per l'indice interno.

### Installazione openlitespeed

Come già detto, l'installazione è estremamente semplice e si concentra su un singolo pacchetto (**openlitespeed**), installiamolo via **yum** procedendo:

    sudo yum install openlitespeed

Una volta completata l'installazione, avviamo il servizio tramite **lswsctrl** con l'opzione **start**:

    sudo lswsctrl start

usiamo l'opzione **stop** per ottenere l'effetto contrario.

## Configurazione del firewall

Prima di procedere con l'utilizzo del nostro nuovo web server, è necessario configurare il firewall per permettere l'ascolto sulle porte 8088 e 7080 (la 8088 è standard in openlitespeed, vediamo successivamente come cambiarla).

Per aprire la porta di nostreo interesse possiamo utilizzare **firewalld**, precisamente lo strumento **firewall-cmd** in questo modo:

    sudo firewall-cmd --zone=public --permanent --add-port=8088/tcpsudo firewall-cmd --zone=public --permanent --add-port=7080/tcp

infine richiediamo al servizio di ricaricare la lista delle regole interne:

    sudo firewall-cmd --reload

Una volta completati tutti i passaggi, possiamo accedere al sito di test:

    http://INDIRIZZO_IP_DEL_SERVER:8088/ 

ed al pannello di controllo tramite:

    http://INDIRIZZO_IP_DEL_SERVER:7080/

dove ovviamente **INDIRIZZO_IP_DEL_SERVER** è l'indirizzo IP del server dove abbiamo installato openlitespeed.

## Account amministratore

Andiamo ora ad impostare l'account amministratore con cui accedere al pannello di controllo, per fare ciò sfruttiamo uno script preinstallato col pacchetto principale:

    sudo /usr/local/lsws/admin/misc/admpass.sh

una volta eseguito ci verrà richiesto un username e password (con conferma) del nuovo utente amministratore.

## Impostazione della porta 80 (http)

Per l'uso in produzione, è importante configurare la porta di accesso alla 80 anzichè la 8088 come standard. Prima di tutto apriamo le porte di nostro interesse via **firewall-cmd**:

    sudo firewall-cmd --zone=public --permanent --add-service=httpsudo firewall-cmd --reload

Accediamo alla sezione **Listeners** del pannello di controllo e portiamoci alla voce **View** della voce **Default**, clicchiamo poi su **Edit** nell'interfaccia che si apre e modifichiamo il valore 8088 in 80 alla voce **Port**, salviamo ed effettuiamo un **Graceful Restart** tramite il menu a tendina (ottenibile cliccando sull'hostname ad inizio pagina).

## Impostazione della porta 443 (ssl)

> Per questa impostazione dobbiamo essere in possesso di un certificato SSL (bundle completo).

Come per la porta 80, impostiamo le regole via firewalld-cmd:

    sudo firewall-cmd --zone=public --permanent --add-service=httpssudo firewall-cmd --reload

Portiamoci alla voce **Listeners** ed aggiungiamo una nuova regola tramite il pulsante **Add**, compilando come segue:

*   **Listener Name**: SSL
*   **IP Address**: Indirizzo IP del server
*   **Port**: 443
*   **Secure**: Yes

e salviamo le modifiche. Portiamoci nuovamente alla voce **Listeners** e modifichiamo quello appena creato, dall'interfaccia che si apre portiamoci alla sezione **SSL** e modifichiamo la voce **Private Key & Certificate** impostando i valori:

*   **Private Key File**: posizione della chiave per il certificato SSL
*   **Certificate File**: posizione del certificato SSL
*   **CA Certificate Path**: posizione del certificato intermedio fornito dal CA in fase di generazione
*   **CA Certificate File**: posizione contenenre il certificato intermedio fornito dal CA

e salviamo le modifiche. Torniamo alla scheda **SSL** e modifichiamo la voce **SSL Protocol** selezionando TLSv1.1 e TLSv1.2 3 alla voce **Protocol Version**, infine salviamo ed effettuiamo un **Graceful Restart** tramite il menu a tendina (ottenibile cliccando sull'hostname ad inizio pagina).

Possiamo infine abilitare l'accesso tramite SSL per ogni VirtualHost creato, aggiungendo questi alla voce **Virtual Host Mappings**, sezione locata nella scheda **General** del Listener SSL.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**