---
title: '#howto - Installazione di Countly su Centos 7/Debian e derivate'
published: 2019-11-22
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash
---
Countly è una piattaforma di analitica modulare, ad alte prestazioni ed Open source per App e Siti Web.

> In questa guida vediamo come installarlo in Centos 7, non replicate la guida su RHEL 8 o Centos 8 poichè incompatibile al momento.

## Requisiti
Countly è offerto con un installer completo che si occupa dell'installazione di tutte le dipendenze necessarie, per tale motivo questa guida è compatibile sia con sistemi basati su RHEL che Debian.

Importante tenere in considerazione che non vi devono essere altri servizi in ascolto sulle porte 80 e 443 poichè richieste da Countly. Questo significa che se è presente un Web Server, non è possibile installare Countly. D'altro canto l'installazione offre una versione di Nginx che possiamo utilizzare per eventuali altri siti web.

## Installazione
In sistemi basati su RHEL, è necessario disattivare SELinux poichè rende impossibile l'esecuzione di Countly. Modifichiamo quindi il file in posizione */etc/selinux/config*:
```
nano /etc/selinux/config
```
modificando la variabile *SELINUX* in *disabled*:
```
...
SELINUX=disabled
...
```
e riavviamo il sistema:
```
reboot
```
Procediamo quindi con l'installazione tramite lo script ufficiale:
```
wget -qO- http://c.ly/install | bash
```
Una volta ultimata l'installazione, proseguiamo visitando l'indirizzo IP del server che possiamo ottenere digitando:
```
curl ifconfig.me
```
ipotizzando quindi che l'ip del server sia 192.183.182.102, visitiamolo via browser:
```
http://192.183.182.102
```
il quale mostrerà una pagina simile alla seguente:

![Countly](storage/Schermata%20da%202019-11-22%2021-40-37.png)

in questa schermata possiamo creare il nostro account amministratore e procedere con la configurazione del primo sito web o della prima applicazione.

Per dubbi e chiarimenti, utilizzate il nostro <a href="https://t.me/gentedilinux">gruppo Telegram</a>gruppo Telegram.

?Good *nix _Mirko