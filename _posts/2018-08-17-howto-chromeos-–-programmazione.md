---
title: '#howto #ChromeOS – Programmazione'
description: "Negli ultimi anni il fenomeno Chromebook si fa sentire piú che mai. Dalla sua nascita come esperimento.."
published: 2018-08-17
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
    - chromeos

---
Negli ultimi anni il fenomeno Chromebook si fa sentire piú che mai. Dalla sua nascita come esperimento di sistema cloud ready di Google, con l'appoggio di Samsung che, da subito ha dato la sua fiducia ad un mercato emergente e per molti fallimentare, ChromeOS ha saputo distinguersi dalla massa per la sua versatilitá e facilitá d'uso.

Da quasi un anno sono il felice possessore di un Samsung Chromebook Pro, un portatile compatto e guidato dalle ottime performance che ChromeOS puó offrire.

Nel mio utilizzo quotidiano ho diverse necessitá tra cui: Programmare.

Con questo articolo diamo inizio ad una nuova rubrica di linuxhub: #howto #ChromeOS (HowToChrome), una raccolta di articoli e guide volte a spiegare come utilizzare al meglio questo sistema.

## Programmazione

La programmazione su ChromeOS avviene in due metodi differenti:

*   Tramite l'abilitazione della Dev mode che permette l'esecuzione di software Linux tramite [Crouton](https://linuxhub.it/sviluppare-android-apps-da-chromebook/) (a breve sostituita dal supporto nativo alle app Linux "Crostini")
*   Sviluppo in Cloud

### Dev Mode e Crostini

Di recente é stato annunciato il supporto nativo delle App Linux, questo sistema permetterá appunto l'esecuzione di un ambiente Linux controllato e performante dove eseguire le applicazioni Linux "nativamente", come una normale app Chrome/Android.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/08/Screenshot-2018-08-17-at-14.16.45.png)

Crostini Installer (Linux Apps Support)

Non potendo ancora testare questa nuova funzionalitá non so descriverla e vi invito quindi ad attendere l'imminente aggiornamento, mentre per l'abilitazione della Dev Mode non mi sento di consigliarla. Una volta abilitata questa modalitá sarete voi a dover rispondere delle vostre azioni e non piú Google.

### Sviluppo in Cloud

Tra le due varianti questa é la mia preferita e quella che uso quotidianamente. Lo sviluppo in Cloud non é altro che un gruppo di spazi di lavoro online controllati, sicuri e sempre agibili.

Vi consiglio di prendere in considerazione questo tipo di programmazione per diversi motivi:

*   Maggior rapiditá e minor consumo di risorse   
    utilizzando una macchina online non dovrete sacrificare preziose risorse dalla vostra macchina e godrete della velocitá del web server offerto dal software che utilizzerete.
*   Maggior sicurezza e versionamento  
    programmare in Cloud vi permette di evitare possibili perdite di dati dovute ad imprevisti o guasti, inoltre essendo l'ambiente non nel vostro sistema, non si verificheranno conflitti di pacchetti e cali di performance, mai piú sudore durante l'avvio. Grazie al versionamento non perderete mai le modifiche.
*   Co-working e Git  
    nel 2018 non si puó non parlare di co-working, ossia la possibilitá di lavorare in piú persone in simultanea allo stesso progetto. Grazie all'integrazione con Git dovrete solo pensare allo sviluppo, il server penserá ad aggiornare il vostro Git in background.
*   Offline  
    web non é piú sinonimo di online, senza la vostra connessione potrete lavorare al vostro progetto e sincronizzare una volta online.

Detto ció vi elenco il parco software che mi sento di consigliarvi con le principali funzionalitá.

#### Codeanywhere

Per mia opinione il miglior IDE in Cloud. Supporta 75+ linguaggi di programmazione tra cui (HTML, JavaScript, Node.js, io.js PHP, Ruby, Python, e Go).

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/08/Screenshot-2018-08-17-at-13.59.22.png)

Codeanywhere on Chromebook ChromeOS

Codeanywhere funziona in diversi modi:

*   Container grazie ai quali é possibile sviluppare i propri progetti su macchine Linux ospitate gratuitamente online
*   Server FTP/SSH di vostra proprietá
*   Repository Git
*   Locale

Tra le funzionalitá degne di nota ci sono:

*   Auto-completamento
*   Versionamento
*   Console
*   Container
*   Co-working
*   Schemi colore/Temi
*   Linting
*   Digitazione multipla
*   Code beautify
*   Offline (solo se giá sincronizzato)
*   Layout multipli e personalizzabili
*   Backup presso Dropbox, sistemi locali e altri

**Home** | [https://codeanywhere.com/](https://codeanywhere.com/)

#### Quantum

Quantum é un Code Editor basato su Atom. Rispetto a Codeanywhere abbiamo un ambiente scarno rivolto all'uso pratico dell'utente che necessita di un ambiente rapido in cui lavorare.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/08/Screenshot-2018-08-17-at-14.04.19.png)

Quantum su Chromebook/ChromeOS

Rispetto alla proposta precedente non ci sono ne container ne connessioni FTP/SSH ma il solo supporto Locale, é comunque possibile superare questo limite aggiungendo la connessione FTP ad un server tramite il File manager di sistema e aprire la cartella come progetto.

Tra le funzionalitá:

*   Linting
*   Offline
*   Supporto a quasi tutti i linguaggi di programmazione

**Home** | [https://goo.gl/Xq9PWn](https://goo.gl/Xq9PWn)

Le qui sopra elencate sono ovviamente Web App (precisamente PWA) ed il loro consumo delle risorse é pressoché nullo, paragonabile a 24h di navigazione presso Google.it

Per dubbi e chiarimenti lasciate un commento.

_ - Mirko_