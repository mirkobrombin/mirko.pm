---
title: '#howto - Installazione e configurazione di Ruby Version Manager (RVM)'
published: 2020-02-19
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - debian  - bash
---
**Ruby** è uno dei linguaggi di programmazione più popolari degli ultimi anni, e se utilizzato assieme a framework come Ruby on Rails, la cui installazione [è spiegata in questa guida](https://linuxhub.it/articles/howto-installazione-di-ruby-on-rails-e-creazione-di-un-app), può diventare molto potente. 

Ovviamente, questo linguaggio non serve solo per realizzare applicazioni web, ma anche programmi da eseguire nel proprio sistema, come lolcat.

In questa guida vedremo come installare e configurare **Ruby Version Manager**, abbreviato in RVM, uno strumento facile da imparare con la quale è possibile gestire più versioni di Ruby in un unico sistema alla volta (proprio come NVM per NodeJS di cui abbiamo parlato <a href="https://linuxhub.it/articles/howto-installare-node-version-manager-nvm-su-debian-9">qua</a>).

## Installazione di RVM

Installare RVM è molto semplice: per prima cosa è necessario aggiungere le **chiavi GPG**, utilizzate per verificare che il pacchetto dell'installazione non sia corrotto. Per farlo possiamo digitare il comando:

```bash
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

```

Per installare RVM su **Ubuntu**, basta semplicemente aggiungere la PPA dedicata e scaricarlo con il package manager APT:

```bash
sudo apt-get install software-properties-common
sudo apt-add-repository -y ppa:rael-gc/rvm
sudo apt-get update
sudo apt-get install rvm
```

Su altre distribuzioni, come ad esempio Fedora, CentOS e Arch Linux, possiamo ricorrere allo script di installazione ufficiale ottenibile mediante comando curl:

```bash
\curl -sSL https://get.rvm.io | bash -s stable
```

Per installare RVM con le versioni di default di Ruby e Ruby on Rails si può eseguire lo stesso script sfruttando l'opzione **--rails**:

```bash
\curl -sSL https://get.rvm.io | bash -s stable --rails
```

## Configurazione di RVM

Se l'installazione è andata a buon fine, chiudiamo la nostra sessione del terminale e riapriamola per evitare ulteriori problemi.

Per visualizzare una breve lista delle versioni di Ruby scaricabili da RVM, digitiamo questo comando:

```bash
rvm list known
```

L'output sarà simile a questo:

```bash
# MRI Rubies
(ruby-)1.8.6(-p420)
(ruby-)1.8.7(-p374)
(ruby-)1.9.1(-p431)
(ruby-)1.9.2(-p320)
(ruby-)1.9.3(-p545)
(ruby-)2.0.0(-p451)
(ruby-)2.1(.10)
(ruby-)2.2(.10)
(ruby-)2.3(.8)
(ruby-)2.4(.6)
(ruby-)2.5(.5)
(ruby-)2.6(.3)
(ruby-)2.7(.0-preview1)
ruby-head

...
```

Per installare una specifica versione di Ruby, digitiamo:

```bash
rvm install 2.6
```

mentre per renderla attiva:

```bash
rvm use 2.6
```

Controlliamo se tutto ha funzionato a dovere verificando la versione in uso di Ruby:

```bash
ruby -v

# Output
ruby 2.6.3p62 (2019-04-16 revision 67580)
```

Per impostare una versione default di Ruby, sovrascrivendo però quella di sistema, possiamo digitare questo comando:

```bash
rvm use 2.6 --default

```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).
