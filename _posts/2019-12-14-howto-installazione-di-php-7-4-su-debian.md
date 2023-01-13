---
class: post
title: '#howto - Installazione di PHP 7.4 su Debian'
description: "ualche settimana fa, il PHP Group ha rilasciato ufficialmente la versione 7.4 di PHP.."
date: 2019-12-14
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  
  - apache  
  - mysql  
  - ubuntu  
  - php
---
Qualche settimana fa, il PHP Group ha rilasciato ufficialmente la versione 7.4 di **PHP**, che introduce varie novità per tutti gli sviluppatori che quotidianamente utilizzano questo linguaggio.

Proprio per questo, oggi vediamo come installare PHP 7.4 su sistema operativo Debian. Ricordatevi che aggiornare spesso la versione di PHP è utile per sistemare vulnerabilità di sicurezza, ma alcuni progarmmi potrebbero diventare completamente compatibili con essa solo dopo qualche tempo.

##Impostazione della repository
Prima di installare la repository che ci serve per inserire PHP 7.4 sulla nostra distro, sono necessari **alcuni pre-requisiti**:

```
sudo apt update 
sudo apt install apt-transport-https lsb-release ca-certificates
```

importiamo la chiave per la repository:

```
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```

e aggiungiamo la repository nel quale sono presenti le versioni più aggiornate di PHP:

```
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt update
```

##Installazione
Ora, installiamo PHP 7.4 ed alcuni pacchetti spesso necessari per utilizzare alcuni programmi e strumenti <a href="https://linuxhub.it/articles/howto-installare-wordpress-via-apache-su-debian-ubuntu-e-derivate">come WordPress</a>:

```
sudo apt install -y php7.4 php7.4-common php7.4-cli php7.4-fpm php7.4-mysql php7.4-xml php7.4-curl php7.4-mbstring php7.4-zip
```

Verifichiamo che l'installazione sia andata a buon fine:

```
php -v
```

L'output dovrebbe essere simile al seguente:
```
PHP 7.4.0 (cli) (built: Nov 28 2019 07:27:06) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.0, Copyright (c), by Zend Technologies
```

Per dubbi e chiarimenti, potete fare qualsiasi domanda sul nostro <a href="t.me/gentedilinux">gruppo Telegram</a>.