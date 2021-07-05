---
title: '#howto - Installazione di Ghost CMS su Debian/Ubuntu e derivate'
description: "Ghost è una piattaforma di blogging gratis e open source, creato per semplificare il processo di pubblicazione online per blogger e testate."
date: 2019-09-12
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - debian  
  - mysql  
  - ubuntu  
  - systemd
---
Ghost è una piattaforma di blogging gratis e open source, creato per semplificare il processo di pubblicazione online per blogger e testate.

In questo articolo vediamo come installarlo e configurarlo.

> Requisito fondamentale è NodeJS, che deve essere presente sulla nostra macchina a questo proposito vi rimando alla nostra guida su come [installare NodeJS su Debian 9](https://linuxhub.it/article/howto-installare-node-version-manager-nvm-su-debian-9).

## Requisiti

In questa installazione andremo ad usare Nginx come Web Server e MariaDB come Database Server, ricapitolando quindi:

*   NodeJS
*   NGINX
*   MariaDB (leggi la sezione [qui](https://linuxhub.it/article/howto-installare-lamp-su-ubuntu-debian-e-derivate#title4))
*   CERTBOT(facoltativo)

## Preparazione del database

Procediamo per prima cosa, con la creazione del nostro database e nome utente da dedicare poi all'installazione del CMS, da console mysql quindi, accessibile mediante:

    sudo mysql -u root -p

creiamo un nuovo database:

    CREATE DATABASE ilmiodb;

 dove **ilmiodb** è il nome del nuovo database. Creiamo poi il nostro nuovo utente:

    CREATE USER il_mio_user@localhost IDENTIFIED BY 'la_mia_password';

dove:

*   **il_mio_user** - è il nome utente con cui faremo accesso al database
*   **la_mia_password** - è la password del nostro utente

ed impostiamo i permessi per l'accesso al database:

    GRANT ALL PRIVILEGES ON ilmiodb.* TO il_mio_user@localhost;FLUSH PRIVILEGES;

infine chiudiamo la console:

    exit

## Installazione

L'installazione si suddivide in due step:

*   Installazione della cli
*   Installazione del cms

### Installazione della cli

Per prima cosa, supponendo di aver installato NodeJS e quindi npm (node package manager) nel nostro sistema, andiamo ad installare **ghost-cli**, lo strumento completo offerto dagli sviluppatori, per facilitarne l'installazione:

    sudo npm install -g ghost-cli@latest

Una volta completata l'installazione del software, andiamo a creare la locazione dove posizioneremo successivamente il CMS, ad esempio in **/var/www**:

    sudo mkdir /var/www/ghost

ed impostiamo i permessi corretti:

    sudo chown -R $USER:$USER /var/www/ghostsudo chmod -R 775 /var/www/ghost

dove **$USER** corrisponde ad un utente esistente nel sistema, nel nostro esempio **hersel:hersel**.

### Installazione del CMS

Andiamo ora finalmente ad installare il CMS, portiamoci quindi nella locazione precedentemente creata:

    cd /var/www/ghost/

ed avviamo l'installazione guidata tramite comando **ghost**:

    ghost install

il che dovrebbe restituire un output simile al seguente:

    hersel@debianhersy:/var/www/ghost$ ghost install? Checking system Node.js version? Checking logged in user? Checking current folder permissionsSystem checks failed with message: 'Linux version is not Ubuntu 16 or 18'Some features of Ghost-CLI may not work without additional configuration.For local installs we recommend using `ghost install local` instead.? Continue anyway? (y/N)

> Nel caso in cui lo script rilevi un sistema differente da Ubuntu, procedete con **Yes** al prossimo step.

entro qualche minuto ci verrà chiesto di inserire l'indirizzo del nostro blog:

    ? Enter your blog URL: (http://localhost:2368)

a questa domanda possiamo rispondere in due modi:

*   nel caso in cui vogliamo installare ed eseguire in locale il nostro blog, lasciamo il campo vuoto e procediamo con invio
*   se vogliamo invece rendere reperibile il nostro blog in rete, ci basterà inserire l'indirizzo del nostro dominio, il quale dovrà puntare al server (leggi come [qui](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip)). Quindi, nell'esempio di questo blog, il dominio è linuxhub.it, andiamo quindi ad inserire **https://linuxhub.it**

Importante tenere in considerazione che, per quanto riguarda le installazioni con dominio, dobbiamo rispondere **Yes** alle seguenti domande quando ci verranno poste:

    ? Do you wish to set up Nginx? yes? Do you wish to set up SSL? yes

Successivamente ci verrà chiesto di inserire i dati del nostro database (precedentemente creato) da dedicare all'installazione:

    ? Enter your MySQL hostname: localhost? Enter your MySQL username: hersel? Enter your MySQL password: [hidden]? Enter your Ghost database name: ghost

Seguiranno poi altri step a cui rispondere **Yes** o **No**, normalmente procedo con risposta positiva a tutti gli step. Una volta terminata l'installazione, dovremmo ricevere un output simile al seguente:

    Ghost is already running! For more information, run:    ghost ls

digitiamo quindi:

    ghost ls

per verificare l'installazione.

Nel mio caso l'installazione è locale, il risultato sarà diverso nel caso abbiate scelto l'installazione pubblica tramite Nginx e SSL.

Ci basterà ora visitare l'indirizzo per proseguire con la procedura di configurazione guidata direttamente dal nostro browser.