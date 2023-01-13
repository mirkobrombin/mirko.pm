---
class: post
title: '#howto - Installazione e configurazione di MongoDB su Centos 7'
description: "MongoDB è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database NoSQL."
date: 2019-08-03
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - mongodb
---
**MongoDB** è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database **NoSQL**.

In questa guida vediamo come installarlo su Centos 7.

## Preparazione repository

Per prima cosa aggiungiamo la repository ufficiale, in modo da ottenere una versione aggiornata.

Creiamo il file **mongodb-org.repo** in locazione **/etc/yum.repos.d/** col nostro editor preferito:

    sudo nano /etc/yum.repos.d/mongodb-org.repo

col seguente contenuto:

    [mongodb-org-3.4]name=MongoDB Repositorybaseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/gpgcheck=1enabled=1gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

infine salviamo il file.

## Installazione

Procediamo all'installazione come con qualunque altro pacchetto, via package-manager **yum**:

    sudo yum install mongodb-org

in questo modo verranno installati i seguenti pacchetti:

*   `mongodb-org-server`
*   `mongodb-org-mongos`
*   `mongodb-org-shell`
*   `mongodb-org-tools`

Una volta installato avviamo il servizio con **systemctl**:

    sudo systemctl start mongod

Inizialmente mongodb rimarrà in ascolto sulla porta 27017, possiamo esserne sicuri digitando:

    sudo tail /var/log/mongodb/mongod.log

subito dopo aver avviato il processo con systemctl, in questo modo otteniamo un output simile:

    [initandlisten] waiting for connections on port 27017

In questo momento mongodb è installato e pronto all'uso.

## Configurazione

Possiamo modificare le impostazioni di mongodb dal file in locazione **/etc/mongod.conf**.

Normalmente la configurazione base è ottima per qualunque scopo generale, ciò che consiglio è di attivare la sezione **security**, eliminandone il commento:

    security:  authorization: enabled

in questo modo entrerà in gioco il sistema di gestione dei ruoli, senza questo qualunque utente potrà accedere ai vostri database senza necessità di permessi speciali.

Una volta modificata la configurazione, riavviamo semplicemente:

    sudo systemctl restart mongod

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**