---
title: '#howto - Controllare la velocitá della connessione su Linux'
date: 2018-02-20
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - debian  
  - python  
  - php  
  - github
---
Spesso capita la necessitá di **controllare la velocitá** **della** propria **connessione** internet. C'é chi utilizza tool grafici, chi siti web. In questo articolo vi proponiamo 2 comandi pratici all'uso, con cui potrete testare la velocitá della vostra connessione.

## speedtest-cli

In **Ubuntu e derivate** vi basterá installare speedtest-cli dalle repository ufficiali, digitando sul vostro terminale:

    sudo apt install speedtest-cli

una volta instalato potete testare la velocitá della vostra connessione digitando il comando:

    speedtest-cli

Di seguito un esempio di output:

    Testing download speed........................................
    Download: 916.39 Mbit/s
    Testing upload speed..................................................
    Upload: 489.57 Mbit/s

Se invece state utilizzando una **distribuzione** **differente**, controllate se é presente nelle repository ufficiali, altrimenti sfruttate il comando sottostante:

    curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -

speedtest-cli é inoltre disponibile all'installazione tramite **pip**, **brew** e **easy_install**.

## tespeed.git

Lo sviluppatore Janhouse ha messo a disposizione un pratico tool, molto simile al precedente, in grado di restituire la velocitá di download e upload, in modo assolutamente piú user-friendly del precedente. Per scaricare tesspeed tramite **GitHub**, digitando:

    git clone git://github.com/Janhouse/tespeed.git
    cd tespeed
    git submodule init
    git submodule update

Una volta scaricato eseguite lo script con la flag **-h** per tutte le opzioni:

    ./tespeed.py -h

## Log della connessione

L'ultimo della lista non é un tool per misurare la velocitá della connessione, ma bensí un metodo pratico per registrarne uno storico. Tener traccia della velocitá della rete é molto utile quando si parla di un server, per gli utenti desktop puó essere usato per soddisfare una curiositá personale.

Procedendo, per tener traccia della velocitá di connessione, andremo ad utilizzare speedtest-cli (di cui abbiamo parlato poco prima) e crontab (un comando che consente di registrare determinate operazioni presso il sistema per essere poi mandati in esecuzione periodicamente, ad intervalli di tempo regolari).

Come abbiamo giá visto, il comando speedtest-cli restituisce in output la velocitá di download e upload in mbit ma, nel caso necessitassimo di ricevere le nostre statistiche in mbytes, basterá sfruttare la flag **--bytes**. Nel caso é anche possibile utilizzare la flag **--simple** che, non solo ritornerá la velocitá di download e upload in un formato piú compatto ma ci mostrerá anche il ping verso il server di prova.

Procedendo nell'esempio, ci basterá salvare il seguente set di istruzioni in crontab via terminale per procedere con la creazione del cronjob, ossia l'azione pianificata che verrá eseguita ogni giorno, alle 00:00.

    00 00 * * * /usr/local/bin/speedtest-cli >> /tmp/log_speedtest.txt

Per salvare il set di istruzioni qui sopra digitiamo prima:

    crontab -e

Una volta copiato il set di istruzioni sopra, salviamo e chiudiamo. Analizzando attentamente il set precedente:

*   00 00 * * * (da sinistra a destra: minuto, ora, giorno, mese, giorno) é la pianificazione nel tempo dell'azione, ossia ogni quanto deve essere eseguita
*   /usr/local/bin/speedtest-cli >> /tmp/log_speedtest.txt é il comando che andiamo ad eseguire, in questo caso eseguiamo speedtest-cli salvandone l'output nel file /tmp/log_speedtest.txt

**crontab** | [http://guide.debianizzati.org/index.php/Utilizzo_del_servizio_di_scheduling_Cron](http://guide.debianizzati.org/index.php/Utilizzo_del_servizio_di_scheduling_Cron)