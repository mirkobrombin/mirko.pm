---
class: post
title: '#howto - Installazione di Composer su Linux'
date: 2021-03-29
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - php
---
**Composer** è uno strumento per la gestione delle dipendenze di **PHP**. Questo strumento consente ad uno sviluppatore di dichiarare, scaricare ed installare le librerie da cui dipende il proprio progetto, ed è anche in grado di gestirle ed aggiornarle in maniera rapida e veloce.

In questa guida vedremo come installare Composer su Linux.

> Composer non è un gestore di pacchetti come `apt` o `dnf`. Invece di installare le librerie, o "pacchetti", globalmente, lo fa nella directory del progetto in cui si sta lavorando. Quindi, è più un gestore di dipendenze, ma se necessario è utilizzabile anche in maniera globale.

## Installazione

Come prima cosa, scarichiamo con PHP il file di setup di Composer:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

verifichiamo se l'installer scaricato è valido oppure corrotto tramite la verifica dell'hash (l'hash cambia in base alla versione di Composer, pertanto è necessario controllarlo da [questa pagina](https://getcomposer.org/download/).):

```bash
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

eseguiamo l'installer:

```bash
php composer-setup.php
```

e, se tutto è andato a buon fine, rimuoviamolo dalla macchina:

```bash
php -r "unlink('composer-setup.php');"
```

A questo punto possiamo scegliere di usare Composer in due modi: **localmente** o **globalmente**. Per eseguirlo localmente possiamo digitare:

```bash
php composer.phar
```

mentre per permettere l'utilizzo da tutti gli utenti dobbiamo spostare `composer.phar` in `/usr/local/bin`:

```bash
mv composer.phar /usr/local/bin/composer
```

Fatto ciò, possiamo semplicemente scrivere composer per eseguire il software:

```bash
composer
```

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo Telegram](https://t.me/linuxpeople).