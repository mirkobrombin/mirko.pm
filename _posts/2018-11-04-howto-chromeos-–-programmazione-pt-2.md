---
title: '#howto #ChromeOS – Programmazione pt.2'
published: 2018-11-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - chromeos  
  - github
---
Questo articolo é parte di una serie denominata #howto #ChromeOS. Consiglio la lettura dei precedenti articoli, vai al [precedente](https://linuxhub.it/article/howto-chromeos-programmazione).

In questo #howto andró ad approfondire l'argomento del precedente articolo: la programmazione su ChromeOS. Vedremo anche la variante crouton accennata.

## Sviluppo in Cloud 2.0

Ad aggiungersi alla strumentazione proposta precedentemente nello scorso testo, esporró di seguito un nuovo software per lavorare al meglio sul vostro Chromebook.

### Breve introduzione

Lo sviluppo in Cloud é il metodo piú pratico a disposizione degli sviluppatori. Non si tratta di un metodo vincolato ai possessori di un Chromebook o dispositivo con ChromeOS e ChromiumOS ma di un sistema ibrido e spesso multipiattaforma.

L'utilizzo dello sviluppo in Cloud permette la collaborazione completa col proprio team ad un progetto e la sua completa disponibilitá su qualsiasi dispositivo.

Spesso si pensa a sviluppo in Cloud come ad un parco software web-based limitato: dalla connessione e poca versatilitá del linguaggio. Ad oggi sono disponibili molto linguaggi di programmazione orientati al web. Linguaggi potenti e versatili ma soprattutto compatibili (NodeJS, AngularJS, Dart, ..).

Grazie all'ottima e sempre piú costante ottimizzazione di webview e browser web, il confine tra web-based e applicazioni native é sempre piú sottile, trovando spesso le stesse funzionalitá integrate col sistema del dispositivo.

### CodeTasty

Per diversi mesi ho utilizzato CodeAnyWhere come IDE per lo sviluppo dei miei progetti. Ottima soluzione che racchiude le principali funzionalitá delle principali alternative.

Da circa un mese sono passato a CodeTasty, un progetto creato sulla falsa riga di CodeAnyWhere, con l'aggiunta del supporto alle estensioni di terze parti. L'interfaccia risulta inoltre molto piú performante ed immediata del precedente.

![](https://linuxhub.it/wp-content/uploads/2018/11/Screenshot-2018-11-04-at-1.36.43-PM.png)

Principali funzionalitá:

*   Auto-completamento
*   Versionamento
*   Supporto a Git
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
*   Estensioni
*   Workspace per la gestione degli spazi di lavoro

**Home** | [https://codetasty.com](https://codetasty.com)

## Utilizzo di crouton

Nello scorso articolo abbiamo solo accennato a questo sistema. Si tratta sostanzialmente di un ambiente dove eseguire software Linux.

Nel vicino futuro questo sistema verrá sostituito dalla tecnologia "Crostini" di Google, un rimpiazzio ufficiale del progetto che porta con se una completa integrazione col sistema ed un notevole aumento delle performance, tanto che sará possibile utilizzare applicazioni di renderizzazione.

### Visual Studio Code

Come esempio non potevo che prendere Code, il software Open Source per sviluppatori, progettato e distribuito da casa Microsoft.

Ho trovato il suo funzionamento in Crouton molto performante, grazie all'integrazione con le cartelle di sistema e l'Overview delle applicazioni, non é possibile notare la sua esecuzione in un ambiente differente da quello di sistema.

![](https://linuxhub.it/wp-content/uploads/2018/11/Screenshot-2018-11-04-at-1.54.59-PM.png)

La differenza con CodeTasty é minima, troviamo in aggiunta:

*   IntelliSense 
*   Command Palette 
*   Peek Information 

Approfondisci [qui](https://linuxhub.it/i-migliori-15-software-open-source/?highlight=open%20source).

Seppur le differente che contraddistinguono sono minime, é possibile spezzare una lancia a favore di Code in quanto il suo parco estensioni é nettamente superiore a quello di CodeTasty, seppur é possibile effettuare il port delle estensioni su quest'ultimo.

**Home | **[https://github.com/Microsoft/vscode](https://github.com/Microsoft/vscode)

Ecco di seguito una lista di software testati tramite Crouton e che funzionano senza difetto alcuno:

*   Geany
*   PyCharm Education
*   PhpStorm
*   CLion
*   IntelliJ IDEA
*   Atom
*   Netbeans
*   Sublime Text
*   Brackets
*   KDevelop
*   Android Studio [(info)](https://linuxhub.it/sviluppare-android-apps-da-chromebook/)

Il consumo delle applicazioni Linux é notevolmente piú alto di quello delle Web App o PWA, come lo é su qualsiasi altro sistema operativo. Bisogna tenerne conto se si programma in mobilitá.

Per dubbi e chiarimenti lasciate un commento.

_ – Mirko_