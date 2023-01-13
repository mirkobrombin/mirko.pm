---
class: post
title: '#howto - Installazione di Imagick su CentOS 7/8 e derivate'
date: 2020-11-02
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - php  - bash
---
**Imagick** è un'estensione nativa di PHP che viene utilizzata per creare e modificare immagini utilizzando l'API ImageMagick. Sebbene molto spesso non sia richiesta da software web, alcuni CMS come WordPress consigliano fortemente la sua presenza.

In questa guida vedremo come installare Imagick su **CentOS 7 e 8** e distribuzioni derivate come **RHEL**.

## Installazione di Imagick

Come prima cosa, visitiamo il sito ufficiale di **PECL**, un repository per le estensioni PHP, e cerchiamo la [pagina di Imagick](http://pecl.php.net/package/imagick). Una volta aperta la pagina, copiamo il link del pacchetto *.tgz* della versione più recente di Imagick, al momento della scrittura la 3.4.4.

Fatto ciò, apriamo il terminale e spostiamoci in una cartella come */tmp*:

```bash
cd /tmp
```

e con `wget` scarichiamo il pacchetto compresso:

```bash
wget http://pecl.php.net/get/imagick-3.4.4.tgz
```

che estraiamo con `tar`:

```bash
tar xzfv imagick-3.4.4.tgz 

```

A quel punto entriamo nella cartella:

```bash
cd imagick-3.4.4
```

ed installiamo tramite `yum` il pacchetto *ImageMagick-devel* che ci servirà per compilare l'estensione:

```bash
yum install ImageMagick-devel
```

Fatto ciò, buildiamo il pacchetto. Come prima cosa, utilizziamo `phpize`:

```bash
phpize
```

modifichiamo la configurazione del codice sorgente per fare in modo che utilizzi la configurazione di PHP situata in una determinata cartella, molto probabilmente `/usr/bin/php-config` oppure, a volte, `/usr/local/bin/php-config`:

```bash
./configure --with-php-config=/usr/bin/php-config

```

eseguiamo `make`:

```bash
make
```

e creiamo l'estensione:

```bash
make install
```

Se il processo di creazione dell'estensione è andato a buon termine, copiamo il file *imagick.so* presente nella cartella del sorgente (può trovarsi anche nella sottocartella *modules*) nella cartella delle estensioni di PHP.

> Per trovare la cartella delle estensioni di PHP è possibile utilizzare il comando `php -i | grep "extension_dir"`. In questa guida si suppone sia `/usr/lib64/php/modules`.

```bash
cp imagick.so /usr/lib64/php/modules
```

Modifichiamo il file *php.ini* inserendo ove possibile la stringa `extension=imagick.so`, e riavviamo, per sicurezza, sia il proprio web server che *php-fpm* o qualsiasi altro programma utilizzato per eseguire PHP.



