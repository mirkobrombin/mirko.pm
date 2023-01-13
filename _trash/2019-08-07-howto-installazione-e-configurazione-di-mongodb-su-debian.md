---
class: post
title: '#howto - Installazione e configurazione di MongoDB su Debian'
description: "MongoDB è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database NoSQL."
date: 2019-08-07 11:00
layout: post
author: linux/hub
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - mongodb  
  - systemd  
  - systemd
---
**MongoDB** è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database **NoSQL**.

In questa guida vediamo come installarlo su Debian .

## Installazione

Per prima cosa dobbiamo installare il pacchetto **mongodb** dal gestore pacchetti:

    sudo apt install -y mongodb

questo è in realtà un metapackage che andrà ad installare un totale di 5 pacchetti:

*   `mongodb-org-server`
*   `mongodb-org-mongos`
*   `mongodb-org-shell`
*   `mongodb-org-tools`

procediamo infine con l'abilitazione e l'avvio del servizio via **systemctl**:

    sudo systemctl enable mongodbsudo systemctl start mongodb

richiedendone quindi lo stato:

    sudo systemctl status mongodb

dovremmo ricevere un output simile al seguente:

    mongodb.service - An object/document-oriented database   
    Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)   
    Active: active (running) since Wed 2019-08-07 17:55:43 BST; 38min ago     
    ..
    Started An object/document-oriented database.

Possiamo procedere nel seguente modo per ottenere una seconda verifica del suo funzionamento:

    mongo --eval 'db.runCommand({ connectionStatus: 1 })'

ottenendo quindi un esito simile al seguente:

    MongoDB shell version: 3.2.11
    connecting to: test{        
      "authInfo" : {                
        "authenticatedUsers" : [ ],                
        "authenticatedUserRoles" : [ ]        
        },        
        "ok" : 1
      }

dove **ok: 1** è la conferma che il server funziona correttamente.

## Configurazione

Per impostazione base MongoDB è configurato per funzionare nella maggior parte delle casistiche, unico accorgimento è quello di modificare l'indirizzo IP a cui è consentita la connessione. Infatti di default resta in ascolto sull'indirizzo locale **127.0.0.1** per consetire a MongoDB di funzionare con un IP pubblico ci basta modificare le impostazioni con il seguente comando:

    sudo nano /etc/mongodb.conf

andiamo quindi a modificare come segue:

    bind_ip = 127.0.0.1, NOSTRO_IP#port = 27017

dove **NOSTRO_IP** è ovviamente il nostro indirizzo IP a cui vogliamo abilitare l'accesso.

Ultimate le modifiche riavviamo il servizio via systemctl:

    sudo systemctl restart mongodb

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).
