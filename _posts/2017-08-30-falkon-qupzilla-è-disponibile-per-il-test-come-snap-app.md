---
class: post
title: 'Falkon (QupZilla) è disponibile per il test come Snap app'
date: 2017-08-30
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - php
---
<p><strong>Falkon</strong>, ex QupZilla, è il nuovo <strong>browser</strong> di <strong>KDE</strong>,<strong>&nbsp;</strong>ora disponibile in testing come pacchetto Snap. <!--more--></p><p>Per chi non lo sapesse, Falkon è il rebrand di QupZilla, il noto browser offerto con l'ambiente Desktop Plasma di KDE.</p><p>Dopo una recente analisi il team ha deciso di cambiare nome ed immagine al software, aggiornarne i componenti sotto il cofano e integrarlo con la famiglia KDE, migliorando l'interazione tra i componenti di sistema (Dolphin, Kontacts, ..)</p><p><img class=" size-full wp-image-118" alt="" height="576" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/08/falkon-1024x576.png" width="1024" /></p><blockquote><p>"Il browser precedentemente noto come QupZilla cambia nome in Falkon e si integra perfettamente con la famiglia KDE. Utilizza QtWebEngine e si integra con tutte le parti del Plasma Desktop."</p></blockquote><p>scrive KDE Neon in un <a href="https://blog.neon.kde.org/index.php/2017/08/29/great-web-browsing-coming-back-to-kde-with-falkon-new-packaging-formats-coming-to-kde-with-snap/">breve post sul blog</a>.</p><h2>Come installare Falkon (Ubuntu e derivate)</h2><p>Il pacchetto richiede diversi requisiti, racchiusi nel pacchetto kde-frameworks-5. Per installarlo:</p><pre><code>sudo snap install kde-frameworks-5</code></pre><p>il download è di circa 200MB, una volta installato passiamo all'installazione di Falkon:</p><pre><code>sudo snap install falkon --edge</code></pre><p>questa volta con un peso ridotto di 3.2MB.</p><p>Come ci si può aspettare, il risultato è decisamente sgradevole in un ambiente <strong>GTK</strong> quindi, se non utilizzate KDE come Desktop Environment, sconsiglio l'utilizzo di questo browser.</p><p><strong>Ricorda</strong> che questa è una versione in fase di sviluppo.</p><p><strong>Pagina del progetto</strong> |<a href="https://community.kde.org/Incubator/Projects/Falkon">&nbsp;https://community.kde.org/Incubator/Projects/Falkon</a> &nbsp;</p><p>(Revisione di gstux)</p>