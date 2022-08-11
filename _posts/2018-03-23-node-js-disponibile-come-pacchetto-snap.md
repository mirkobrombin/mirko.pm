---
title: 'Node.js disponibile come pacchetto Snap'
date: 2018-03-23
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nodejs
---
NodeSource, l'organizzazione dietro <strong>Node.js</strong>, ha annunciato oggi di aver creato un pacchetto <strong>Snap</strong> per consentire agli sviluppatori Linux di installare più facilmente il popolare ambiente JavaScript sui loro sistemi operativi. Snap è un formato di pacchetto binario universale, sviluppato da <strong>Canonical</strong> per <strong>Ubuntu</strong>.<blockquote>Il pacchetto snap contiene il runtime, insieme al gestore di pacchetti largamente usato <strong>npm</strong>, quindi con un singolo comando, agli sviluppatori viene predisposta l'installazione di Node.js e gli strumenti di supporto.</blockquote>cita l'annuncio di NodeSource.Il vantaggio nell'utilizzare il pacchetto Snap è scontato, poiché riceverai sempre la versione più recente non appena verrà rilasciata. Grazie alle tecnologie Snappy di Canonical, NodeSource può fornire la versione più recente di Node.js in poche ore o minuti.<h2>Installare la snap</h2>Per installare Node.js sulla tua distribuzione con Snap abilitato, tutto ciò che devi fare è eseguire il seguente comando:La tecnologia Snappy di Canonical sono attualmente supportate su Ubuntu, Debian, Linux Mint, Fedora, Arch Linux, OpenSuSE, Solus, Gentoo Linux e altri sistemi operativi embedded come OpenWrt e OpenEmbedded.<pre>sudo snap install node --classic --channel=8/stable</pre>Utilizzando il set di comandi qui sopra viene installato il branch stabile.<strong>Annuncio</strong> | <a href="https://nodesource.com/blog/announcing-node-js-snap-linux-users">https://nodesource.com/blog/announcing-node-js-snap-linux-users</a><strong>Home</strong> | <a href="https://nodejs.org/en/">https://nodejs.org/en/</a><strong>Altro su Snap</strong> | <a href="https://linuxhub.it/?s=snap">https://linuxhub.it/?s=snap</a>