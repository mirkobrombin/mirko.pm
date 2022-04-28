---
title: 'PeppermintOS 8 - Focus e post-install'
date: 2017-12-13
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ubuntu
---
In data 8 Dicembre 2017 é stata rilasciata <b>PeppermintOS 8</b>. La distribuzione si basa su Ubuntu 16.04 LTS ed utilizza <b>xfce</b> come Desktop Environment. La distribuzione si focalizza per PC datati o ambienti di produttivitá che richedono stabilitá e performance. Questa distribuzione puó anche intendersi per un pubblico entry-level nel mondo Linux.<img class="aligncenter size-medium wp-image-3249 size-full wp-image-237" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/12/peppermint_logo_full_1000w-300x50.png" alt="" width="300" height="50" />La prima impressione é quella di una distribuzione ben curata nell'aspetto, performante ed assolutamente reattiva. Anche il parco software di default é abbastanza nutrito, forse grazie al grosso contributo di Ubuntu e i suoi repository. Per la sua leggerezza, la distribuzione si presta bene anche a configurazioni hardware datate.<h3>Consigli post installazione</h3>Per prima cosa abiliteremo i repository partner di Canonical. Tramite il tool <i>Software e aggiornamenti</i>, spunteremo la voce <i>Partner di Canonical</i><img class="aligncenter size-full wp-image-3253 size-full wp-image-238" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/12/Screenshot_20171213_153402.png" alt="" width="940" height="491" />Dopo aver cliccato su chiudi, ci chiederà di inserire la nostra passwort di root, inseriamola e confermiamo. Proseguiremo ora aggiornando il sistema digitando:<pre>apt update &amp;&amp; apt -y upgrade</pre><img class="aligncenter size-full wp-image-3254 size-full wp-image-239" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/12/Screenshot_20171213_153502.png" alt="" width="785" height="483" />Una volta aggiornato il sistema, andremo ad installare<b> ubuntu-restricted-extras</b>, che integrerà nel nostro sistema i seguenti pacchetti:<pre> cabextract gstreamer1.0-fluendo-mp3 libavcodec-extra libavcodec-ffmpeg-extra56 libmspack0 ttf-mscorefonts-installer ubuntu-restricted-addons ubuntu-restricted-extras unrar</pre>digitando il comando:<pre>sudo apt install ubuntu-restricted-extras</pre>Un altro applicativo da poter installare, per completare la distribuzione é <i>Openjdk</i> ed il plugin <i>icedtea</i><pre>sudo apt install openjdk-8-jre icedtea-8-plugin</pre><h3>Integrazione di una suite per l'ufficio</h3>Nonostante il parco software, come detto qualche riga fa, sia abbastanza nutrito, quello che manca in peppermintOS e' la presenza di una suite per l'ufficio di default. Installeremo dunque Libre Office, digitando da terminale:<pre>sudo apt install libreoffice<tt> </tt></pre>Terminato il processo di installazione, si conclude anche il focus sul post install.Troverete qui sotto il link alla Homepage ufficiale del progetto, da dove é possibile scaricare la distribuzione.<img class="aligncenter size-cerauno-home wp-image-3257 size-full wp-image-240" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/12/Screenshot_20171213_161325-900x300.png" alt="" width="900" height="300" /><b>PeppermintOS Home |</b><a href="https://peppermintos.com/"> https://peppermintos.com/</a>