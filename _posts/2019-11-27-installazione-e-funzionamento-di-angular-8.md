---
title: '#howto - Installazione e funzionamento di Angular 8+ su Debian'
description: Angular 2+ (o semplicemente Angular) è una piattaforma open source per lo sviluppo di applicazioni web con licenza MIT, evoluzione di AngularJS, sviluppato principalmente da Google."
published: 2019-11-27
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - debian
---
Angular 2+ (o semplicemente Angular) è una piattaforma open source per lo sviluppo di applicazioni web con licenza MIT, evoluzione di AngularJS, sviluppato principalmente da Google.  
Per prima cosa abbiamo bisogno di **NodeJS** e di **NPM** che potete installare leggendo una delle nostre [guide](https://linuxhub.it/articles/howto-installare-node-version-manager-nvm-su-debian-9)

Una volta soddisfatti i prerequisiti per l'installazione di Angular possiamo procedere con la guida:

    npm install -g @angular/cli

Dove **-g** significa GLOBAL

Ora possiamo procedere alla creazione vera e propria di un'applicazione Angular di test!

    ng new test

Andiamo all'interno della cartella del nostro progetto digitando

    cd test

Una volta dentro la cartella del nostro progetto digitiamo

    ng serve

In questo modo il progetto si avvierà in **localhost:4200**, ma possiamo specificare un host differente  
Digitando:

    ng serve --host example.com

### Alcuni comandi utili per Angular

*   ng new component nomecomponente(Crea un componente)
*   ng new service nomeservizio(Crea un servizio)
*   ng new class nomeclasse(Crea una classe)

Una volta che abbiamo installato il nostro progetto possiamo anche aggiungere delle componenti come ad esempio [Angular-Material](https://material.angular.io)  
Installabile con il seguente comando:

    ng add @angular/material

**Nota Bene:** questo comando va digitato all'interno del progetto.  

A questo punto vi chiederà che tema desiderate utilizzare (consigliamo indigo-pink), e se volete installare le animazioni & HammerJS cliccate **YES** a tutte le opzioni disponibili  
Per i componenti di Angular Material visitare il seguente [link](https://material.angular.io/components/categories)  

Per inserire un componente basta aggiungere il suo codice HTML all'interno di un componente e la parte TypeScript nel relativo componente.ts: nell'app.module.ts, invece, dovete incorporare l'import che potete trovare nel flag API.

Per dubbi e chiarimenti, utilizzate il nostro gruppo Telegram.