---
title: '#howto - Installazione e configurazione di memcached con PHP su CentOS e RHEL 7/8'
date: 2020-06-24
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos  
  - php  
  - bash
---
**memcached** è un sistema di caching Open source ad alte prestazioni. In questa guida vedremo come installarlo su CentOS e RHEL 7/8 e renderlo funzionante con la nostra installazione di PHP.

> Questa guida da per scontato che sia installato PHP sul server in cui andremo a lavorare. Per CentOS 7 potete fare riferimento a <a href="https://linuxhub.it/articles/howto-installare-php7-su-centos7">questa</a> guida per l'installazione.

## Installazione
Sia per CentOS/RHEL 7 che 8, *memcached* è fornito dalle repository di sistema alla versione stabile più recente (la 1.6.5 al momento).

Procediamo all'installazione via *yum*:

```bash
yum update
yum install memcached
```

e verifichiamo la corretta installazione con l'opzione `--version` del comando `memcached`:

```bash
memcached --version
```

il quale dovrà ritornare un risultato simile al seguente:

```bash
memcached 1.6.5
```

Abilitiamo quindi il servizio al boot via `systemctl`:

```bash
systemctl enable memcached
```

### PHP
Per poterlo sfruttare in PHP è necessario installare il modulo *PECL* dedicato, questo si trova normalmente nelle repository di sistema, ma nel caso fosse installata una repository di terze parti per PHP, questa dovrebbe comunque fornire la corretta versione del modulo:

```bash
yum install php-pecl-memcache
```

Se questo dovesse eliminare per dipendenza la versione corrente di PHP (verificare prima di accettare le modifiche), è necessario fare riferimento alla documentazione per la repository in uso. Ad esempio per *remi* è necessario indicare la versione di PHP direttamente nel pacchetto, come nel caso della 7.4:

```bash
yum install php74-pecl-memcache
```

Una volta fatto ciò riavviamo il servizio PHP, e nel caso di php-fpm:

```bash
systemctl restart php-fpm
```

## Configurazione
Da installazione la configurazione base di memcached va bene per quasi tutti i contesti. All'interno del file di configurazione, posizionato in `/etc/sysconfig/memcached`, troviamo i seguenti principali valori:

- PORT="11211", ossia la porta su cui rimarrà in ascolto il servizio
- USER="memcached", l'utente a cui è dedicato il servizio
- MAXCONN="1024", il numero massimo di connessioni per volta
- CACHESIZE="64", la dimensione massima (in MB) per file di caching
- OPTIONS="", eventuali opzioni secondarie, extra

> Nel caso volessimo eseguire il servizio su una porta diversa o non dovesse risultare disponibile sulla standard è necessario aprire questa tramite firewalld, leggi <a href="https://linuxhub.it/articles/howto-aprire-e-chiudere-porte-con-firewalld">qui</a> per saperne di più.

Ad ogni modifica apportata è necessario riavviare il servizio via `systemctl`:

```bash
systemctl restart memcached
```

Per quanto riguarda l'integrazione con PHP, una volta installato il modulo come sopra indicato, tutto dovrebbe funzionare correttamente senza alcuna modifica. Digitiamo:

```bash
php -m | grep memcache
```

per ottenere le informazioni sulla corrente installazione di PHP e verifichiamo la presenza di *memcached* in lista per essere certi che questo sia stato caricato correttamente.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.
