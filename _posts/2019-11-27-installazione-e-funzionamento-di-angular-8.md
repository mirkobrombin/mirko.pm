---
title: '#howto - Installazione e funzionamento di Angular 8+ su Debian'
published: 2019-11-27
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - debian
---
<p>
Benvenuti in questa breve guida all'installazione di Angular, inanzitutto è doveroso spiegare che cos'è Angular:
</p>
> Angular 2+ (o semplicemente Angular) è una piattaforma open source per lo sviluppo di applicazioni web con licenza MIT, evoluzione di AngularJS, sviluppato principalmente da Google.

<br>
Per prima cosa abbiamo bisogno di **NodeJS** e di **NPM** che potete installare leggendo una delle nostre <a href="https://linuxhub.it/articles/howto-installare-node-version-manager-nvm-su-debian-9">guide</a>


<p>Una volta soddisfatti i prerequisiti per l'installazione di Angular possiamo procedere con la guida:</p>
<pre><code>npm install -g @angular/cli</code></pre>
<p>
Dove <strong>-g</strong> significa GLOBAL
</p>
<p>
Ora possiamo procedere alla creazione vera e propria di un'applicazione Angular di test!
</p>
<pre><code>ng new test</code></pre>
<p>
Andiamo all'interno della cartella del nostro progetto digitando
</p>
<pre><code>cd test</code></pre>
<p>
Una volta dentro la cartella del nostro progetto digitiamo
</p>
<pre><code>ng serve</code></pre>
<p>
In questo modo il progetto si avvierà in <strong>localhost:4200</strong>, ma possiamo specificare un host differente<br>
Digitando:
</p>
<pre><code>ng serve --host example.com</code></pre>
<h3>
Alcuni comandi utili per Angular</h3>
<ul>
<li>ng new component nomecomponente(Crea un componente)</li>
<li>ng new service nomeservizio(Crea un servizio)</li>
<li>ng new class nomeclasse(Crea una classe)</li>
</ul>
<p>
Una volta che abbiamo installato il nostro progetto possiamo anche aggiungere delle componenti come ad esempio <a href="https://material.angular.io">Angular-Material</a><br>
Installabile con il seguente comando:
</p>
<pre><code>ng add @angular/material</code></pre>
<p>
<strong>Nota Bene:</strong> questo comando va digitato all'interno del progetto.
<br>
<br>
A questo punto vi chiederà che tema desiderate utilizzare (consigliamo indigo-pink), e se volete installare le animazioni & HammerJS cliccate <strong>YES</strong> a tutte le opzioni disponibili
<br>
Per i componenti di Angular Material visitare il seguente <a href="https://material.angular.io/components/categories">link</a>
<br>
<br>
Per inserire un componente basta aggiungere il suo codice HTML all'interno di un componente e la parte TypeScript nel relativo componente.ts: nell'app.module.ts, invece, dovete incorporare l'import che potete trovare nel flag API.
</p>

Per dubbi e chiarimenti, utilizzate il nostro gruppo Telegram.