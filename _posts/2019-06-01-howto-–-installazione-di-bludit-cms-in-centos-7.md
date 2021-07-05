---
title: '#howto – Installazione di Bludit CMS in Centos 7'
description: "Bludit è un CMS gratuito e Open source, basato sull'archiviazione in file JSON.."
date: 2019-06-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - apache  
  - mysql  
  - centos  
  - php  
  - github
---
**Bludit** è un CMS gratuito e Open source, basato sull'archiviazione in file **JSON**, utile nella realizzazione di blog e siti web veloci e funzionali in breve tempo.

La sua assenza di un database vero e proprio, come ad esempio MySQL o SQLite, lo rende pronto all'uso in pochi minuti oltre che facilmente migrabile e poco esoso di risorse.

## Requisiti

Per la messa online di Bludit, abbiamo le seguenti necessità:

*   Un Web server (Nginx o Apache)
*   Php (5.6 o superiore)

fra cui ovviamente non è necessario un database SQL.

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione. Un esempio è proprio questo sito web, raggiungibile appunto da: linuxhub.it.

Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Installazione

Ci sono più modi in cui installare questo CMS:

*   il metodo **classico** in cui andiamo a configurare un web server
*   il metodo **semplificato** ossia un web server minimale pronto all'uso, messo a disposizione dal team di sviluppo stesso

non è chiaro se nel secondo caso ci sono dei cali di prestazioni o delle limitazioni ma è importante tenere in considerazione che si tratta più di un server di sviluppo che di produzione.

### Installazione semplificata

Come dal titolo di questa sezione, l'installazione è estremamente semplice e bastano solo pochi minuti per la messa in opera. Per prima cosa installiamo php:

    sudo rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpmsudo yum install -y php72w php72w-cli php72w-fpm php72w-common php72w-mbstring php72w-zip php72w-pgsql php72w-sqlite3 php72w-curl php72w-gd php72w-mysql php72w-intl php72w-json php72w-opcache php72w-xml

successivamente otteniamo una copia del sorgente:

    git clone https://github.com/bludit/bludit.git

ed avviamo il server:

    cd bluditphp -S localhost:8000

dove:

*   **localhost** è il dominio associato al server
*   **8000** la porta (aperta) in cui rendere accessibile il CMS

Continua nella sezione **Configurazione del CMS**.

### Installazione classica (Nginx o Apache)

Nell'instalazione classica (raccomandata in caso di produzione), procediamo con l'installazione di Nginx o Apache e php-fpm.

#### Installazione di php-fpm

Iniziamo dall'installazione di php ed i moduli necessari come da requisiti:

    sudo yum install php php-fpm

proseguiamo poi con l'installazione dei moduli:

    sudo yum install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-json

in questo modo la nostra configurazione sarà compatibile con una installazione base del CMS.

Infine avviamo il processo ed abilitiamo l'auto esecuzione all'avvio del server:

    sudo systemctl start php-fpmsudo systemctl enable php-fpm

#### Installazione del  Web server

Il resto di questa sezione si suddivide in due parti, ossia la configurazione di un server Nginx e quella di un server Apache. Importante tenere in considerazione che questi due software possono coesistere ma in questa guida non tratteremo l'installazione di Bludit su una installazione di questo tipo.

Di seguito sono riportate le guide su come installare i due Web server (Nginx e Apache). Una volta scelto, seguite l'installazione con la guida appropriata, infine procedete con la sezione: **Configurazione Web server.**

#### Installazione Nginx

Fra le scelte questa è per me la migliore. Se lo scopo del nostro sito web è quello dei grandi numeri in termini di traffico, Nginx è in grado di gestire con facilità grossi carichi, inoltre la sua struttura asincrona gli permette di gestire più eficientemente richieste multiple, occupando la RAM per meno tempo rispetto Apache.

Per una miglior fruibilità dei contenuti, la guida su come installare **Nginx** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl).

#### Installazione Apache

Per una miglior fruibilità dei contenuti, la guida su come installare **Apache** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-apache-su-centos-7).

## Configurazione (Nginx o Apache)

Procedi nella lettura solo in caso di installazione personalizzata (Nginx e Apache).

Una volta installato il web server preferito, possiamo procedere con la sua configurazione e quella dello spazio web che andremo a dedicare al CMS.

Continua di seguito con la sezione inerente il Web server che hai scelto.

### Configurazione Nginx

Per prima cosa creiamo una locazione da dedicare al CMS:

    mkdir -p /usr/share/nginx/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del dominio configurato precedentemente. 

> Non è indispensabile che nome della locazione e dominio siano uguali ma lo consiglio per una migliore gestione futura in caso il server dovesse ospitare più siti web.

Impostiamo ora i giusti permessi al nuovo percorso:

    chowh nginx:nginx /usr/share/nginx/il_mio_dominio_exchmod 775 /usr/share/nginx/il_mio_dominio_ex

In questa fase andiamo a creare un blocco **server** su Nginx per la nostra installazione. Portiamoci alla locazione **/etc/nginx/conf.d/default.conf** e creiamo un nuovo blocco come la seguente:

    server {    listen       80;    server_name  il_mio_dominio.ex www.il_mio_dominio.ex;    root   /usr/share/nginx/il_mio_dominio_ex;    index index.php index.html index.htm;    location / {        try_files $uri $uri/ =404;    }    error_page 404 /404.html;    error_page 500 502 503 504 /50x.html;    location = /50x.html {        root /usr/share/nginx/html;    }    location ~ \.php$ {        try_files $uri =404;        fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;        fastcgi_index index.php;        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;        include fastcgi_params;    }}

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file del CMS

Procediamo con la modifica di alcune impostazioni di php-fpm necessarie con Nginx. Andiamo ad aprire il file di configurazione nella locazione **/etc/php-fpm.d/www.conf**, cerchiamo la voce **listen** e modifichiamo come di seguito:

    listen = /var/run/php-fpm/php-fpm.sock

portiamoci poi alle voci **listen.owner** e **listen.group** rendendole:

    listen.owner = nobodylisten.group = nobody

infine cerchiamo le voci **user** e **group** ed adattiamole come di seguito:

    user = nginxgroup = nginx

Non ci resta che riavviare i processi:

    sudo systemctl restart php-fpm nginx

### Configurazione Apache

Per prima cosa creiamo una locazione dedicata ai file del CMS:

    mkdir -p /var/www/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del nostro dominio.

Impostiamo poi i permessi:

    chowh apache:apache /var/www/il_mio_dominio_exchmod 775 /var/www/il_mio_dominio_ex

Andiamo ora a creare la configurazione Apache per il nostro sito web. Creiamo quindi il file alla locazione **/etc/httpd/vhosts.d/il_mio_dominio.ex.conf** col seguente contenuto:

    <VirtualHost localhost:80>ServerAdmin admin@il_mio_dominio.exDocumentRoot "/var/www/html/il_mio_dominio_ex/"ServerName il_mio_dominio.exServerAlias www.il_mio_dominio.exErrorLog "/var/log/httpd/il_mio_dominio.ex-error_log"CustomLog "/var/log/httpd/il_mio_dominio.ex-access_log" combined<Directory "/var/www/html/il_mio_dominio_ex/">DirectoryIndex index.html index.phpOptions FollowSymLinksAllowOverride AllRequire all granted</Directory></VirtualHost>

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file di installazione del CMS

Andiamo ora a modificare alcune configurazioni per istruire Apache all'uso di php-fpm per la gestione delle richieste php. Creiamo un nuovo file di configurazione alla locazione **/etc/httpd/conf.d/php.conf** col seguente contenuto:

    <Proxy "unix:/var/run/php-fpm/default.sock|fcgi://php-fpm">    	ProxySet disablereuse=off</Proxy><FilesMatch \.php$>	SetHandler proxy:fcgi://php-fpm</FilesMatch>## Allow php to handle Multiviews#AddType text/html .php## Add index.php to the list of files that will be served as directory# indexes.#DirectoryIndex index.php

Portiamoci al file **/etc/php-fpm.d/www.conf** e cerchiamo la voce **listen** modificandola come di seguito:

    listen = /var/run/php-fpm/default.sock

modifichiamo poi le seguenti voci:

    listen.owner = apachelisten.group = apachelisten.mode = 0660user = apachegroup = apache

Riavviamo infine i processi con:

    systemctl restart php-fpm httpd

## Installazione del CMS

Andiamo ora effettivamente ad installare il CMS sul web server scelto. Per prima cosa ci rechiamo nella locazione che abbiamo precedentemente creato e dedicato allo scopo (differente in Nginx e Apache), nel nostro esempio:

    cd /usr/share/nginx/il_mio_dominio_ex

Preleviamo dal sito ufficiale ([https://www.bludit.com/](https://www.bludit.com/)) il link al download del CMS e scarichiamone la risorsa:

    wget https://www.bludit.com/releases/bludit-3-9-1.zip

possiamo ora decomprimere l'archivio con **unzip**:

    unzip bludit*zip

e spostiamo le risorse nella root del sito:

    mv bludit*/* ./

## Configurazione del CMS

Bludit viene offerto di base con una installazione guidata, basterà visitare il dominio o indirizzo IP:

*   sulla porta 8000 in caso di installazione semplificata
*   direttamente il dominio configurato in precedenza sulla porta 80 in caso di Nginx o Apache

per accedere alla prima configurazione del CMS, basterà poi seguire le istruzioni su schermo.

Consigliamo di proseguire la lettura della [documentazione ufficiale](https://docs.bludit.com/en/getting-started/introduction) per quanto riguarda: temi, plugin e contenuti.

_Good ***nix**?_  
_ - Mirko_