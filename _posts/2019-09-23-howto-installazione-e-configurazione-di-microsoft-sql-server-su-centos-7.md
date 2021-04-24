---
title: '#howto - Installazione e configurazione di Microsoft SQL Server su Centos 7'
description: "Dalla release del 2017, Microsoft SQL Server è disponibile per sistemi Linux in modo nativo."
published: 2019-09-23
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - rhel  
  - bash
---
Dalla release del 2017, Microsoft SQL Server è disponibile per sistemi Linux in modo nativo.

In questa guida vediamo come installare l'SQL Server di Microsoft su Centos 7, tramite la repository ufficiale.

## Configurazione repository

Per prima cosa dobbiamo scegliere la repository di nostro interesse, al momento Microsoft ne offre di 3 tipologie:

*   **CU** (Cumulative Updates)
*   **DGR** (General Distribution Release)
*   **Preview** (l'anteprima per la versione 2019 nel momento in cui scrivo l'articolo)

Eseguiamo quindi il relativo comando per la versione scelta della repository.

**Cumulative Updates**

    sudo curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/7/mssql-server-2017.repo

**General Distribution Release**

    sudo curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/7/mssql-server-2017-gdr.repo

**Preview**

    sudo curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/7/mssql-server-preview.repo

## Installazione

Una volta configurata la repository possiamo procedere con l'installazione vera e propria, procediamo quindi tramite **yum**:

    sudo yum install -y mssql-server

installiamo inoltre gli strumenti per la riga di comando:

    sudo curl -o /etc/yum.repos.d/msprod.repo https://packages.microsoft.com/config/rhel/7/prod.reposudo yum -y install mssql-tools unixODBC-devel

una volta ultimato, il server è pronto per la prima inizializzazione.

## Configurazione

Procediamo con la prima esecuzione del server, avviamo il setup guidato tramite:

    sudo /opt/mssql/bin/mssql-conf setup

Nel primo step ci viene chiesto di selezionare la tipologia di licenza, per scopi personali o istruzione, selezionate uno fra:

*   **Evaluation** (free, no production use rights, 180-day limit)
*   **Developer** (free, no production use rights)
*   **Express** (free)

> La licenza di tipo **Express** va bene nella maggior parte dei casi, fate riferimento al [sito ufficiale](https://www.microsoft.com/en-us/sql-server/sql-server-2017-pricing).

procediamo col secondo step in cui accettiamo la licenza del prodotto, infine ci verrà chiesta una password per l'utente admin, ricordiamo di salvarla.

### Configurazione variabile PATH

Per poter utilizzare il server e la riga di comando, dobbiamo aggiungere i binari alla variabile **$PATH**, in questo modo:

    echo 'export PATH=$PATH:/opt/mssql/bin:/opt/mssql-tools/bin' | sudo tee /etc/profile.d/mssql.sh

Gli strumenti saranno disponibili una volta riavviata la sessione.

Infine abilitiamo il servizio con systemctl:

    sudo systemctl enable mssql-server

ed avviamolo:

    sudo systemctl start mssql-server

### Configurazione Firewall

Nel caso fosse abilitato **firewalld** come Firewall di sistema, dobbiamo aggiungere qualche regola per renderlo disponibile all'esterno:

    sudo  firewall-cmd --add-port=1433/tcp --permanentsudo  firewall-cmd --reload

Ora tutto è pronto per l'utilizzo.

Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**