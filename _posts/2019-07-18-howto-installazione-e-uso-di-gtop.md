---
title: '#howto - Installazione e uso di gtop'
published: 2019-07-18
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - debian
---
<p>In questa guida vediamo come installare <strong>gtop</strong> oltre che ad una breve introduzione a questo sistema di monitoraggio basato su NodeJS.</p><h2>Installazione di NodeJS</h2><p>Inanzitutto è essenziale installare NodeJS per il funzionamento di <strong>gtop</strong>.<br />Abbiamo scritto una guida semplificata in merito a cui vi rimando <a href="https://linuxhub.it/article/howto-installare-node-version-manager-nvm-su-debian-9 ">qui</a>.</p><h2>Installazione</h2><p>L'installazione è semplice grazie all'utilizzo di npm, il package manager affiancato a NodeJS, procediamo quindi all'installazione in questo modo:</p><pre><code>npm install gtop -g</code></pre><h3>Utilizzo</h3><p>Una volta installato, possiamo banalmente avviarlo da comando:</p><pre><code>gtop</code></pre><p>a questo punto dovremmo ricevere un output simile al seguente:</p><img class=" size-full wp-image-517" alt="gtop" data-align="center" data-entity-type="file" data-entity-uuid="77b82af3-7e90-4b98-9c14-572d4bbbba60" src="https://linuxhub.it/wordpress/wp-content/uploads/2019/07/GTOP.PNG" width="1595" height="845" /><p>Vediamo ora qualche opzione interessante per sfruttare al meglio questa dashboard, digitando:</p><ul>	<li><strong>p</strong> filtriamo i processi dal loro ID</li>	<li><strong>c</strong> filtriamo per uso della CPU</li>	<li><strong>m</strong> per memoria usata</li></ul><p>digitiamo infine <strong>q</strong> per uscire dal programma.</p><p>&nbsp;</p>