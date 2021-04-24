---
title: '#howto - Effettuare il backup di un database MySQL (con mysqldump)'
description: "Sono molte le cirostanze in cui torna utile il backup di un database, ad esempio nella preparazione ad una migrazione o semplice.."
published: 2019-07-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql  
  - bash
---
Sono molte le cirostanze in cui torna utile il backup di un database, ad esempio nella preparazione ad una migrazione o semplicemente per protezione dei dati.

In questa guida vediamo come è possibile esportare una copia di uno o più database MySQL, tramite **mysqldump**.

## Preparazione locazione

Per prima cosa creiamo una cartella in cui depositare le nostre copie, creiamola ad esempio in /var:

    sudo mkdir -p /var/backup/mysql

ed impostaimo i permessi corretti:

    sudo chown $(whoami):$(whoami) /var/backup/mysql

## Creiamo un backup

Dopo una breve preparazione, siamo pronti per procedere alla vera e propria operazione di backup. Con dati (username, password, nome database) alla mano, creiamo il seguente comando:

    mysqldump -u USERNAME –pPASSWORD NOME_DATABASE > /var/backup/mysql/NOME_DATABASE.sql

dove:

*   **USERNAME** è il nome dell'utente che ha accesso al database
*   **PASSWORD** la password dell'utente (non ci sono spazi fra la flag e la password)
*   **NOME_DATABASE** il nome del database che vogliamo esportare

una volta completato il comando, verrà creata una copia del database nella posizione **/var/backup/mysql**, col nome che abbiamo scelto.

### Compressione

Nel caso di database con grandi quantità di dati, possiamo specificare una compressione, sfruttando la flag **-C**:

    mysqldump -u USERNAME –pPASSWORD -C NOME_DATABASE > /var/backup/mysql/NOME_DATABASE.sql.tgz

## Backup di tutti i database

Nel caso in cui volessimo effettuare il backup di tutti i database (associati allo stesso username), ci basterà procedere sfruttando la flag **--all-databases** come segue:

    mysqldump -u USERNAME –pPASSWORD --all-databases > /var/backup/mysql/DATABASES.sql

dove **DATABASES** è il nome del backup.

_Good ***nix**?_  
_ - Mirko_