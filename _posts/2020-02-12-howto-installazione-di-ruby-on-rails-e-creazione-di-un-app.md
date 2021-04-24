---
title: "#howto - Installazione di Ruby on Rails e creazione di un'app"
description: "Ruby on Rails è uno dei framework web più utilizzati nel mondo dei siti internet. Con esso è possibile creare, utilizzando il linguaggio.."
published: 2020-02-12
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
**Ruby on Rails** è uno dei framework web più utilizzati nel mondo dei siti internet. Con esso è possibile creare, utilizzando il linguaggio di programmazione **Ruby**, applicazioni web con un database ed un backend: un CMS ad esempio. 

Due ottimi esempi di servizi che utilizzano questo framework sono GitHub e GitLab.

In questa guida vedremo come installare Ruby on Rails sulle principali distribuzioni Linux.

## Installazione di Ruby

Per prima cosa abbiamo bisogno di installare il linguaggio Ruby sulla nostra macchina. Prendendo in considerazione le distribuzioni su cui andremo a lavorare, il pacchetto è reperibile dalle repository di sistema e possiamo procedere alla sua installazione tramite package manager.

Debian/Ubuntu e derivate:

```bash
sudo apt install ruby
```

Fedora e derivate:

```bash
sudo dnf install ruby
```

CentOS/RHEL e derivate:

```bash
sudo yum install ruby
```

Arch Linux:

```bash
sudo pacman -S ruby
```

Possiamo verificarne la corretta installazione controllandone la versione:

```bash
ruby --version
```
nel mio caso il comando restituirà il seguente output:

```bash
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]
```

## Installazione di Ruby on Rails

L'installazione del framework avviene tramite l'utilizzo del gestore pacchetti (o gems) di Ruby ossia *gem*:

```bash
sudo gem install rails
```

Come per ruby, verifichiamo la corretta installazione:

```bash
rails -v
```

dove l'output sarà simile al seguente:

```bash
Rails 6.0.2.1
```

## Creazione di un'app

Creare una semplice applicazione con Ruby on Rails è molto facile, e richiede pochissimo tempo.

Per prima cosa creiamo una directory per il nostro nuovo progetto con una struttura base:

> **Nota**: il processo potrebbe richiedere qualche tempo e la presenza di NodeJS

```bash
rails new nomeapplicazione
```

Una volta creata la struttura della nostra applicazione, possiamo testarla avviando il server offerto con rails:

```bash
cd nomeapplicazione
bin/rails server
```

la quale sarà quindi disponibile sulla porta *3000*:

```
http://localhost:3000
```

visitandola mostrerà una pagina come la seguente:

![Ruby on rails pagina principale](storage/ruby-on-rails-main-page.jpg)

Per maggiori informazioni, non esitate a fare domande sul nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.