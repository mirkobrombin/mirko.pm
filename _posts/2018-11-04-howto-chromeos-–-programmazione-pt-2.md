---
title: '#howto #ChromeOS – Programmazione pt.2'
published: 2018-11-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - chromeos  - github
---
<!-- wp:paragraph -->
<p>Questo articolo é parte di una serie denominata #howto #ChromeOS. Consiglio la lettura dei precedenti articoli, vai al <a href="https://linuxhub.it/article/howto-chromeos-programmazione">precedente</a>.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>In questo #howto andró ad approfondire l'argomento del precedente articolo: la programmazione su ChromeOS. Vedremo anche la variante crouton accennata.</p>
<!-- /wp:paragraph --><!-- wp:heading -->

<h2>Sviluppo in Cloud 2.0</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

<p>Ad aggiungersi alla strumentazione proposta precedentemente nello scorso testo, esporró di seguito un nuovo software per lavorare al meglio sul vostro Chromebook.</p>
<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->

<h3>Breve introduzione</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

<p>Lo sviluppo in Cloud é il metodo piú pratico a disposizione degli sviluppatori. Non si tratta di un metodo vincolato ai possessori di un Chromebook o dispositivo con ChromeOS e ChromiumOS ma di un sistema ibrido e spesso multipiattaforma.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>L'utilizzo dello sviluppo in Cloud permette la collaborazione completa col proprio team ad un progetto e la sua completa disponibilitá su qualsiasi dispositivo.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Spesso si pensa a sviluppo in Cloud come ad un parco software web-based limitato: dalla connessione e poca versatilitá del linguaggio. Ad oggi sono disponibili molto linguaggi di programmazione orientati al web. Linguaggi potenti e versatili ma soprattutto compatibili (NodeJS, AngularJS, Dart, ..).</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Grazie all'ottima e sempre piú costante ottimizzazione di webview e browser web, il confine tra web-based e applicazioni native é sempre piú sottile, trovando spesso le stesse funzionalitá integrate col sistema del dispositivo.</p>
<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->

<h3>CodeTasty</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

<p>Per diversi mesi ho utilizzato CodeAnyWhere come IDE per lo sviluppo dei miei progetti. Ottima soluzione che racchiude le principali funzionalitá delle principali alternative.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Da circa un mese sono passato a CodeTasty, un progetto creato sulla falsa riga di CodeAnyWhere, con l'aggiunta del supporto alle estensioni di terze parti. L'interfaccia risulta inoltre molto piú performante ed immediata del precedente.</p>
<!-- /wp:paragraph --><!-- wp:image {"id":7169} -->

<p><img alt="" src="https://linuxhub.it/wp-content/uploads/2018/11/Screenshot-2018-11-04-at-1.36.43-PM.png" /></p>
<!-- /wp:image --><!-- wp:paragraph -->

<p>Principali funzionalitá:</p>
<!-- /wp:paragraph --><!-- wp:list -->

<ul>
	<li>Auto-completamento</li>
	<li>Versionamento</li>
	<li>Supporto a Git</li>
	<li>Console</li>
	<li>Container</li>
	<li>Co-working</li>
	<li>Schemi colore/Temi</li>
	<li>Linting</li>
	<li>Digitazione multipla</li>
	<li>Code beautify</li>
	<li>Offline (solo se giá sincronizzato)</li>
	<li>Layout multipli e personalizzabili</li>
	<li>Backup presso Dropbox, sistemi locali e altri</li>
	<li>Estensioni</li>
	<li>Workspace per la gestione degli spazi di lavoro</li>
</ul>
<!-- /wp:list --><!-- wp:paragraph -->

<p><strong>Home</strong> |&nbsp;<a href="https://codetasty.com">https://codetasty.com</a></p>
<!-- /wp:paragraph --><!-- wp:heading -->

<h2>Utilizzo di crouton</h2>
<!-- /wp:heading --><!-- wp:paragraph -->

<p>Nello scorso articolo abbiamo solo accennato a questo sistema. Si tratta sostanzialmente di un ambiente dove eseguire software Linux.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Nel vicino futuro questo sistema verrá sostituito dalla tecnologia "Crostini" di Google, un rimpiazzio ufficiale del progetto che porta con se una completa integrazione col sistema ed un notevole aumento delle performance, tanto che sará possibile utilizzare applicazioni di renderizzazione.</p>
<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->

<h3>Visual Studio Code</h3>
<!-- /wp:heading --><!-- wp:paragraph -->

<p>Come esempio non potevo che prendere Code, il software Open Source per sviluppatori, progettato e distribuito da casa Microsoft.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Ho trovato il suo funzionamento in Crouton molto performante, grazie all'integrazione con le cartelle di sistema e l'Overview delle applicazioni, non é possibile notare la sua esecuzione in un ambiente differente da quello di sistema.</p>
<!-- /wp:paragraph --><!-- wp:image {"id":7171} -->

<p><img alt="" src="https://linuxhub.it/wp-content/uploads/2018/11/Screenshot-2018-11-04-at-1.54.59-PM.png" /></p>
<!-- /wp:image --><!-- wp:paragraph -->

<p>La differenza con CodeTasty é minima, troviamo in aggiunta:</p>
<!-- /wp:paragraph --><!-- wp:list -->

<ul>
	<li>IntelliSense&nbsp;</li>
	<li>Command Palette&nbsp;</li>
	<li>Peek Information&nbsp;</li>
</ul>
<!-- /wp:list --><!-- wp:paragraph -->

<p>Approfondisci <a href="https://linuxhub.it/i-migliori-15-software-open-source/?highlight=open%20source">qui</a>.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Seppur le differente che contraddistinguono sono minime, é possibile spezzare una lancia a favore di Code in quanto il suo parco estensioni é nettamente superiore a quello di CodeTasty, seppur é possibile effettuare il port delle estensioni su quest'ultimo.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p><strong>Home |&nbsp;</strong><a href="https://github.com/Microsoft/vscode">https://github.com/Microsoft/vscode</a></p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Ecco di seguito una lista di software testati tramite Crouton e che funzionano senza difetto alcuno:</p>
<!-- /wp:paragraph --><!-- wp:list -->

<ul>
	<li>Geany</li>
	<li>PyCharm Education</li>
	<li>PhpStorm</li>
	<li>CLion</li>
	<li>IntelliJ IDEA</li>
	<li>Atom</li>
	<li>Netbeans</li>
	<li>Sublime Text</li>
	<li>Brackets</li>
	<li>KDevelop</li>
	<li>Android Studio <a href="https://linuxhub.it/sviluppare-android-apps-da-chromebook/">(info)</a></li>
</ul>
<!-- /wp:list --><!-- wp:paragraph -->

<p>Il consumo delle applicazioni Linux é notevolmente piú alto di quello delle Web App o PWA, come lo é su qualsiasi altro sistema operativo. Bisogna tenerne conto se si programma in mobilitá.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p>Per dubbi e chiarimenti lasciate un commento.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->

<p><em>&nbsp;– Mirko</em></p>
<!-- /wp:paragraph -->