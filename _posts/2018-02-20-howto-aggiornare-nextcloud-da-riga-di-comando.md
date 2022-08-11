---
title: '#howto - Aggiornare Nextcloud da riga di comando'
date: 2018-02-20
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - apache  
  - centos  
  - php  
  - nextcloud
---
Di cosa sia **Netxcloud** e come installarlo su **CentOS** ne abbiamo già parlato in [**questo**](https://linuxhub.it/article/howto-installare-nextcloud-centos-7) articolo. Di seguito mi rivolgerò a quegli utenti che hanno invece installato una versione non attuale di Nextcloud e che ovviamente vogliono aggiornare per godere a pieno delle ultime novità.

A meno che non sia stato disabilitato in sede di prima configurazione, l'interfaccia web di Nextcloud mette a disposizione un tool grafico per aggiornare il software in maniera molto semplice ed intuitiva, cliccando sul pulsante _"Aggiorna"_. Peccato che due volte su tre questa modalita di aggiornamento **non vada a buon fine**, interrompendosi e attivando la _manteinance mode_. 

## Aggiornamento tramite CLI

Nextcloud mette a disposizione dei tool PHP (di estensione PHAR, gli stessi che poi vengono richiamati dalla GUI) per il controllo e l'aggiornamento del software. Per prima cosa bisogna recarsi nella cartella updater, subdirectory che troverete nel path dove Nextcloud é stato installato:

    cd /var/www/html/nextcloud/updater

Apache é l utente che ha i permessi sulla cartella (nel mio caso la distribuzione é CentOS, _per gli utenti Ubuntu l'utente sarà www-data_). Eseguiamo dunque con la seguente sintassi il file **updater.phar**:

    sudo -u apache php updater.phar

Qualora doveste ricevere la notifica che la manteneince mode è attiva sul vostro sistema, andate indietro di una cartella e digitate:

    sudo -u apache php occ maintenance:mode --off

dopodichè di nuovo nella cartella updater per rilanciare il comando, che questa volta eseguirà la procedura correttamente. Non ci resta ora che tornare nella cartella nextcloud ( cd..) e digitare:

    sudo -u apache php occ upgrade

per completare il processo d aggiornamento e disporre dell'ultima versione di Nextcloud disponibile.