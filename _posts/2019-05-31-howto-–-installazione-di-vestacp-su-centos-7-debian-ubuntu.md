---
title: '#howto – Installazione di VestaCP su Centos 7/Debian/Ubuntu'
description: "VestaCP è una delle tante soluzioni gratuite ed open source che permette di avere una completa e rapida gestione del proprio web server."
date: 2019-05-31
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - apache  
  - mysql  
  - vestacp  
  - php  
  - bash
---
**VestaCP** è una delle tante soluzioni gratuite ed open source che permette di avere una completa e rapida gestione del proprio web server.

Come altri pannelli di controllo in grado di facilitare le operazioni di un webmaster, VestaCP offre una completa gestione di: siti web, database, email, zone DNS, ftp, utenti ed una sezione firewall che permette la gestione di **iptables** da interfaccia grafica.

> Importante è da tenere in considerazione che questo applicativo non funziona su macchine in cui è già presente una installazione di Nginx, Apache, php-fpm, mysql o altri pannelli.

In questa guida vediamo come installare il pannello su Centos 7, Debian o Ubuntu e derivate.

## Requisiti

Citando il sito ufficiale del progetto, i requisiti minimi sono:

*   512 Mb di RAM
*   20 Gb di spazio
*   1 Ghz di CPU
*   Centos 7 o Debian o Ubuntu e derivate
*   Un [dominio che punta all'indirizzo IP](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip) del server

## Installazione

Questa sarà in realtà una sezione molto breve, poichè l'installazione è resa semplice dal team di sviluppo che ha sviluppato uno script di installazione automatizzata.

Vediamo quindi due metodi di installazione (semplificata e personalizzata), in entrambi i casi sfruttando lo script di installazione ufficiale.

> Ricordate di creare 2 record di tipo A (ns1, ns2) nei DNS del dominio che punta al server su cui andiamo ad installare VestaCP, questi devono puntare a loro volta all'indirizzo IP del server.

### Installazione semplificata

Sfruttando questo metodo, possiamo installare VestaCP completo di Nginx e Apache, vsftpd, iptables e fail2ban, softacolus per l'installazione semplificata di software, exim, dovecot, spamassassin e clamav antivirus.

Prima di tutto scarichiamo lo script di installazione sulla macchina in cui vogliamo installare VestaCP:

    curl -O http://vestacp.com/pub/vst-install.sh

successivamente avviamo l'installazione dallo script appena scaricato:

    curl -O http://vestacp.com/pub/vst-install.sh

seguiamo infine le istruzioni che ci vengono fornite, riavviamo una volta terminato.

Visitando infine il dominio o l'indirizzo IP del server dalla porta 8083, esempio **127.0.0.1:8083**, abbiamo accesso al pannello appena installato.

### Installazione personalizzata

Questo tipo di installazione sfrutta le opzioni della precedente e ci permette di scegliere quale software installare.

Come per l'installazione precedente, scarichiamo lo script di installazione sulla macchina in cui vogliamo installare il pannello:

    curl -O http://vestacp.com/pub/vst-install.sh

poi teniamo in considerazione le seguenti opzioni configurabili:

*   --nginx
*   --apache
*   --phpfpm
*   --named
*   --remi
*   --vsftpd
*   --proftpd
*   --iptables
*   --fail2ban
*   --quota
*   --exim
*   --dovecot
*   --spamassassin
*   --clamav
*   --softaculous
*   --mysql 
*   --postgresql
*   --hostname
*   --user
*   --password

a differenza delle ultime tre, ognuna di queste opzioni supporta un valore a scelta tra **yes** e **no**, il che significa se vogliamo che lo script installi o meno quel determinato componente. Possiamo quindi scegliere se installare Nginx rispetto Apache o se installarli entrambi, scegliere se vogliamo o meno softacolus.

Una volta fatte le nostre scelte, proseguiamo in questo modo:

    bash vst-install.sh --nginx yes --apache yes --phpfpm no --named yes --remi yes --vsftpd yes --proftpd no --iptables yes --fail2ban yes --quota no --exim yes --dovecot yes --spamassassin yes --clamav yes --softaculous yes --mysql yes --postgresql yes --hostname MIOSERVER --email MIAEMAIL --password MIAPASSWORD

ovviamente avendo premura di cambiare il valore di:

*   --hostname
*   --user
*   --password

con i dati corretti.

Come per la precedente installazione, riavviamo e visitando la porta 8083 del server possiamo accedere al pannello appena installato.

## Disinstallazione

Nel caso in cui vogliamo rimuovere VestaCP dal server, possiamo procedere in questo modo.

Per prima cosa fermiamo il processo dall'esecuzione via systemctl:

    sudo systemctl stop vesta

procediamo poi con la rimozione dei pacchetti:

**RHEL/Centos**:

    sudo yum remove vesta*sudo rm -f /etc/yum.repos.d/vesta.repo

**Debian/Ubuntu**:

    sudo apt-get remove vesta*sudo rm -f /etc/apt/sources.list.d/vesta.list

ed infine in entrambe le distribuzioni, eliminiamo i dati:

    sudo rm -rf /usr/local/vesta

e riavviamo la macchina.

_Good ***nix**?_  
_ - Mirko_