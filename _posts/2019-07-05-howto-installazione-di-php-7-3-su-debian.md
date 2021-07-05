---
title: '#howto - Installazione di PHP 7.3 su Debian'
description: "In questa breve guida vediamo come installare php nella versione più recente.."
date: 2019-07-05
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - mysql  
  - php
---
In questa breve guida vediamo come installare **php**nella versione più recente ed aggiornata (php 7.3 nel momento in cui scrivo questa guida).

È importante tenere aggiornata la versione di php per soddisfare a pieno i requisiti degli applicativi web. Nonostante ciò è importante tenere l'occhio vigile sui requisiti di un nuovo aggiornamento software, non sempre questi sono compatibili con le ultime versioni di php tempestivamente.

## Preparazione delle repository

Prima di procedere con l'installazione della repository, installiamo alcuni pacchetti necessari:

    sudo apt update 
    sudo apt install apt-transport-https lsb-release ca-certificates

importiamo la chiave per la repository:

    sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg

procediamo quindi con l'aggiunta della repository in cui possiamo trovare le versioni più recenti di php:

    sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
    sudo apt update

## Installazione

Nel momento in cui scrivo, la versione più recente di php è la 7.3, possiamo controllare la sua disponibilità via **apt**:

    sudo apt search php7.3

dovremmo ricevere un output simile:

    ....php7.3-sybase-dbgsym/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  debug symbols for php7.3-sybasephp7.3-tidy/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  modulo tidy per PHPphp7.3-tidy-dbgsym/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  debug symbols for php7.3-tidyphp7.3-xml/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  modulo DOM, SimpleXML, WDDX, XML e XSL per PHPphp7.3-xml-dbgsym/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  debug symbols for php7.3-xmlphp7.3-xmlrpc/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  modulo XMLRPC-EPI per PHPphp7.3-xmlrpc-dbgsym/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  debug symbols for php7.3-xmlrpcphp7.3-xsl/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 all  modulo XSL per PHP (fittizio)php7.3-zip/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  modulo Zip per PHPphp7.3-zip-dbgsym/sconosciuto 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 amd64  debug symbols for php7.3-zip......

Installiamo quindi php7.3 ed alcuni pacchetti comuni, spesso richiesti in qualsiasi applicazione web:

    sudo apt install -y php7.3 php7.3-common php7.3-cli php7.3-fpm php7.3-mysql php7.3-xml php7.3-curl php7.3-mbstring php7.3-zip

Controlliamo l'installazione con la flag **-v**:

    php -v

il risultato dovrebbe essere simile al seguente:

    PHP 7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7 (cli) (built: May 31 2019 11:27:35) ( NTS )Copyright (c) 1997-2018 The PHP GroupZend Engine v3.3.6, Copyright (c) 1998-2018 Zend Technologies    with Zend OPcache v7.3.6-1+0~20190531112735.39+stretch~1.gbp6131b7, Copyright (c) 1999-2018, by Zend Technologies

Per dubbi e chiarimenti, potete seguire il nostro [Gruppo Telegram](https://t.me/gentedilinux).