---
class: post
title: '#howto - Modificare un PDF con LibreOffice Draw'
description: "Qualche volta è probabile trovarsi (nella scomoda) situazione di dover modificare un PDF.."
date: 2017-09-26
layout: post
author: Leonardo O.
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian
---
Qualche volta è probabile trovarsi (nella scomoda) situazione di dover **modificare un file pdf**. Un docente che per la fretta omette delle informazioni importanti, un collega di lavoro che semplicemente; durante una revisione o un progetto dimentica il sorgente ed ha da con se solo il pdf; semplicemente volete ampliare le informazioni contenute nel file aggiungendo e/o modificando parti e personalizzazioni. Imotivi possono essere molteplice e per carità, effettuare un'operazione del genere ad oggi non è nulla di trascendentale, al contrario, oserei dire main stream. Quello su cui vorrei soffermarmi è effettuare un'operazione del genere in maniera etica, seria, pulita e "open source". Usare un prodotto commerciale o un servizio online hostato da chissà chi? No grazie. Useremo **Libre Office Draw** ![](https://linuxhub.it/wordpress/wp-content/uploads/2017/09/Draw_01.png) La suite Libre Office è presente ormai di default in quasi tutte le distribuzioni Linux che si propongono come target l'utente novizio. **Draw** è parte della suite, ragion per cui dovrebbe essere già presente nel vostro sistema. Qualora non lo fosse vi basterà installarlo in accordo col gestore pacchetti del vostro sistema:

<pre>sudo apt install libreoffice-draw</pre>

se utilizzate una distribuzione come Ubuntu, Mint e derivata da debian.

<pre>sudo dnf install libreoffice-draw</pre>

se utilizzate Fedora, una sua spin o una distro da lei derivata.

## Modificare un file pdf con Draw

Il procedimento è tanto semplice quanto intuitivo. Partiamo dalle cose ovvie: avviare in primis il programma LibreOffice Draw

![](https://linuxhub.it/wordpress/wp-content/uploads/2017/09/Draw_02.png)

L' interfaccia grafica di Draw si presenta pulita ed intuitiva. Procediamo importando il file pdf che vogliamo modificare. Indovinate un po: altro non bisogna fare che cliccare su **File>Apri.** Aspettate che il file venga dunque caricato (il tempo può ovviamente variare dalla grandezza del file e dalla potenza del vostro hardware). Una volta importato il documento vi sara possibile interagire e modificarlo come fosse un comunissimo file di testo.

![](https://linuxhub.it/wordpress/wp-content/uploads/2017/09/Draw_03.png)![](https://linuxhub.it/wordpress/wp-content/uploads/2017/09/Draw_04.png)

## Conclusioni

Una volta che le modifiche sono terminate, potete salvare il file nuovamente "**Esportandolo in PDF**" in modo da non modificare il documento originale, uscendo dal programma senza ulteriori salvataggi.

![](https://linuxhub.it/wordpress/wp-content/uploads/2017/09/Draw_05.png)

_**#StayFOSS**_