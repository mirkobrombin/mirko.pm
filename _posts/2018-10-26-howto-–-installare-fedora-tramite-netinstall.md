---
title: '#howto – Installare Fedora tramite NetInstall'
published: 2018-10-26
layout: post
author: Michael Messaggi
author_github: MichaelMessaggi
tags:
  - fedora
---
Per installare Fedora con tutti i pacchetti più aggiornati, è possibile utilizzare un'immagine NetInstall, scaricabile dalla [pagina dei download alternativi di Fedora 31 (Selezionate "Everything"/"Tutto" dalla lunga lista).](https://alt.fedoraproject.org/)

In questa guida andremo quindi a vedere, come effettuare l'installazione di Fedora tramite NetInstall.

## Configurazione iniziale

Andando oltre la normale procedura di:

*   Download
*   Scrittura della ISO sul dispositivo di installazione
*   Avvio dal dispositivo di installazione

passiamo subito al dunque con la prima schermata della nostra NetInstall.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-16-53-33.png)

Schermata di selezione della lingua.

In questa schermata é possibile selezionare la lingua di installazione, subito dopo, possiamo passare alla configurazione vera e propria del sistema.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-17-04-39.png)

Schermata di configurazione del sistema.

Attraverso questa schermata viene eseguita la configurazione del sistema, vale a dire: hostname, selezione di quale "spin" di Fedora e quali componenti aggiuntivi si vuole installare ed in che locazione installarli.

Sconsiglio agli utenti meno esperti di modificare la Sorgente di Installazione, in quanto l'immagine NetInstall è preconfigurata per installare autonomamente i pacchetti più aggiornati disponibili nei repository di Fedora.

Procediamo quindi con la configurazione **dell'hostname,** vale a dire il "nome" che vogliamo dare al nostro pc, per poterlo distinguere facilmente dagli altri nella rete. Per intenderci, sará anche la dicitura presente di prefisso nel terminale (ex. root@hostname) sarà comunque possibile modificarlo in seguito.

Selezioniamo quindi **"Network** **&** **Host Name"** per accedere al pannello di configurazione rete e hostname.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-17-19-20.png)

Pannello di configurazione rete e hostname.

Potete digitare l'hostname che volete assegnare al vostro sistema nel riquadro in basso a sinistra, quindi premere "apply" per confermarlo. 

In caso vogliate utilizzare una connessione wireless, potete selezionare la scheda di rete wireless, quindi la Wi-Fi.

Una volta ultimate le modifiche,  é opportuno premere il tasto "Fatto" in alto a sinistra per tornare alla schermata principale di configurazione.

## Configurazione storage e selezione Software

Possiamo ora passare alla configurazione dello storage, vale a dire dove vogliamo installare fisicamente il sistema.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-17-31-51.png)

Schermata di configurazione storage.

Selezioniamo, nella barra **"Dischi locali standard",** il disco su cui vogliamo installare Fedora. 

> É possibile cifrare il disco per evitare che malintenzionati abbiano accesso facile ai vostri dati, in caso di smarrimento del dispositivo.

Quando premerete "Fatto", in alto a sinistra, se l'installer non dovesse trovare spazio a sufficienza per installare Fedora sul disco che avete selezionato, vi chiederà di aggiungere altri dischi o recuperare spazio da quello selezionato (in caso contenga altre partizioni).  
Prestate molta attenzione premendo **"Recupera Spazio",** perché cancellerà tutti i dati nelle partizioni selezionate. (Nessun dato verrà toccato finché non premerete **"Avvia Installazione".)**  
**Passiamo** ora alla selezione del software da installare.

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-17-47-44.png)

Schermata di selezione del software.

In questa schermata si sceglie cosa installare. In questo screenshot, è stata selezionata Fedora Workstation "base", senza componenti aggiuntivi, con **GNOME 3.32.** Nella colonna a sinistra potete scegliere su quale "spin" di Fedora basare questa installazione, mentre nella colonna di destra potete arricchire il vostro sistema. Quando avete completato la configurazione, premete, come di consueto, "Fatto".  

Quando siete certi di aver configurato tutto correttamente, potete premere **"Avvia Installazione",** nell'angolo in basso a destra della schermata principale di configurazione, che avvierà la formattazione del disco ed il download dei dati, permettendoci di procedere verso la configurazione della password di root e dell'account utente.

## Configurazione dell'account utente

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-18-00-49.png)

Schermata di installazione, configurazione account utente e root.

In questa schermata possiamo controllare l'andamento dell'installazione e configurare il nostro account utente e quello di root.  
Potete impostare la password di root premendo sull'apposito pulsante, e digitandola nel campo apposito.  
Per creare il nostro account, apriamo questa schermata di configurazione:

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-18-05-23.png)

Schermata di creazione account utente.

In questa schermata, si configurano le credenziali di accesso al proprio account utente, che potranno comunque venir modificate in seguito nelle impostazioni. Potete modificare la posizione della cartella Home del vostro account, che normalmente si troverà in "**/home/nomeutente**", premendo su Avanzate. Quando avrete concluso, premete "Fatto", ed attendete che la procedura di installazione volga al termine.

## Completamento dell'Installazione

![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/Schermata-da-2018-10-26-19-00-26.png)

Completamento dell'installazione.

La procedura d'installazione è, ora, conclusa. Riavviamo il pc per accedere al sistema che abbiamo installato.  

Spero di esservi stati utile con questa mia guida. In caso aveste bisogno di ulteriori delucidazioni, vi aspettiamo nella sezione [Domande](https://linuxhub.it/domande-risposte/) del sito o sul gruppo [Telegram](https://t.me/gentedilinux)