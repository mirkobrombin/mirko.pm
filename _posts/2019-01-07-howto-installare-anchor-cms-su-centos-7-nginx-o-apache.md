---
title: '#howto - Installare Anchor CMS su Centos 7 (Nginx o Apache)'
description: "Anchor CMS è scritto in php e trova il consenso in chi cerca qualcosa di semplice ma potente per il proprio sito web."
date: 2019-01-07
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
> Avviso: Anchor CMS non è più mantenuto.

Spesso si utilizza un CMS per abitudine o perchè è migliore di altri per detto dire di altra gente. **Anchor CMS** è una piattaforma di blogging facile da installare, versatile nell'uso ed estremamente leggera, siccome per nulla esoso di risorse.

Anchor CMS è scritto in php e trova il consenso in chi cerca qualcosa di semplice ma potente per il proprio sito web.

In questa guida andiamo a vedere come è possibile installare Anchor CMS in **Centos 7** con **Nginx** o **Apache**.

## Requisiti

Per prima cosa dobbiamo accertarci di soddisfare i requisiti per l'installazione. Ecco di seguito la lista direttamente dalla documentazione ufficiale di Anchor CMS:

*   Un Web server (Nginx o Apache)
*   PHP 5.6 o maggiore
    *   curl
    *   mcrypt
    *   gd
    *   php-mbstring
    *   pdo_mysql o pdo_sqlite
*   Un Database server MySQL (MySQL o MariaDB)

> Anchor CMS offre una documentazione completa ed esaustiva, una volta terminata la nostra guida vi consiglio di proseguire la lettura dei testi ufficiali.
> 
> [Documentazione ufficiale](http://docs.anchorcms.com/)

## Installazione di php-fpm

Come dicevamo, Anchor CMS è scritto prevalentemente in php, quindi uno dei requisiti fondamentali. Per questa guida ho scelto php-fpm, un interprete particolarmente veloce e pronto all'uso. Procediamo quindi all'installazione come da prassi:

    sudo yum install php php-fpm

Procediamo poi con l'installazione di alcuni moduli che estendono la compatibilità di php:

    sudo yum install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-mysql php-opcache

Infine avviamo il processo ed abilitiamo l'auto esecuzione all'avvio del server:

    sudo systemctl start php-fpmsudo systemctl enable php-fpm

## Configurazione dominio

Il dominio sarà la maschera d'accesso (la base del link) da cui vogliamo raggiungere la nostra installazione. Un esempio è proprio questo sito web, raggiungibile appunto da: linuxhub.it.

Una volta scelto e acquistato il nostro dominio, procediamo con la configurazione dei DNS.

Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Preparazione Web server

Questa sezione della guida si suddivide in due parti, ossia la configurazione di un Web server (Nginx o Apache, in base alla vostra scelta).

Di seguito sono riportate le guide su come installare uno due Web server (Nginx e Apache). Una volta scelto seguite l'installazione con la guida appropriata, infine procedete con la sezione: **Configurazione Web server.**

### Installazione Nginx

Fra le scelte questa è per me la migliore. Se lo scopo del nostro sito web è quello dei grandi numeri in termini di traffico, Nginx è in grado di gestire con facilità grossi carichi, inoltre la sua struttura asincrona gli permette di gestire più eficientemente richieste multiple, occupando la RAM per meno tempo rispetto Apache.

Per una miglior fruibilità dei contenuti, la guida su come installare **Nginx** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-nginx-su-centos-7).

### Installazione Apache

Per una miglior fruibilità dei contenuti, la guida su come installare **Apache** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-apache-su-centos-7).

## Configurazione Web server

Una volta installato il Web server, possiamo procedere con lo step successivo, la configurazione.

### Configurazione Nginx

Per prima cosa creiamo una locazione per i file di installazione:

    mkdir -p /usr/share/nginx/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del nostro dominio. Non è indispensabile che il nome della cartella ed il dominio siano uguali ma lo consiglio per una migliore gestione.

Procediamo con la configurazione dei permessi:

    chowh nginx:nginx /usr/share/nginx/il_mio_domionio_exchmod 775 /usr/share/nginx/il_mio_domionio_ex

In questa fase andiamo a creare un blocco **server** su Nginx per la nostra installazione di Anchor CMS. Portiamoci alla locazione **/etc/nginx/conf.d/default.conf** e cerchiamo la sezione **server{**..**}** predefinita. Una volta indentificata aggiungiamo subito sotto la nostra come di seguito:

    server {    listen       80;    server_name  il_mio_dominio.ex www.il_mio_dominio.ex;    root   /usr/share/nginx/il_mio_dominio_ex;    index index.php index.html index.htm;    location / {        try_files $uri $uri/ =404;    }    error_page 404 /404.html;    error_page 500 502 503 504 /50x.html;    location = /50x.html {        root /usr/share/nginx/html;    }    location ~ \.php$ {        try_files $uri =404;        fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;        fastcgi_index index.php;        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;        include fastcgi_params;    }}

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file di installazione

Procediamo con la modifica di alcune impostazioni di php-fpm necessarie con Nginx. Andiamo ad aprire il file di configurazione nella locazione **/etc/php-fpm.d/www.conf**, cerchiamo la voce **listen** e modifichiamo come di seguito:

    listen = /var/run/php-fpm/php-fpm.sock

portiamoci poi alle voci **listen.owner** e **listen.group** rendendole:

    listen.owner = nobodylisten.group = nobody

infine cerchiamo le voci **user** e **group** ed adattiamole come di seguito:

    user = nginxgroup = nginx

Non ci resta che riavviare i processi:

    sudo systemctl restart php-fpm nginx

### Configurazione Apache

Creiamo ora una posizione da usare successivamente nell'installazione. Creiamo la directory:

    mkdir -p /var/www/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del nostro dominio. Non è indispensabile che il nome della cartella e quello del dominio siano uguali ma lo consiglio per una migliore gestione.

Impostiamo i permessi alla nuova locazione:

    chowh apache:apache /var/www/il_mio_domionio_exchmod 775 /var/www/il_mio_domionio_ex

Andiamo ora a creare la configurazione Apache per il nostro sito web. Creiamo quindi il file alla locazione **/etc/httpd/vhosts.d/il_mio_dominio.ex.conf** (dove il_mio_dominio.ex è il nome del dominio da cui faremo accesso al sito web) col seguente contenuto:

    <VirtualHost localhost:80>ServerAdmin admin@il_mio_dominio.exDocumentRoot "/var/www/html/il_mio_dominio_ex/"ServerName il_mio_dominio.exServerAlias www.il_mio_dominio.exErrorLog "/var/log/httpd/il_mio_dominio.ex-error_log"CustomLog "/var/log/httpd/il_mio_dominio.ex-access_log" combined<Directory "/var/www/html/il_mio_dominio_ex/">DirectoryIndex index.html index.phpOptions FollowSymLinksAllowOverride AllRequire all granted</Directory></VirtualHost>

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente

Andiamo ora a modificare alcune configurazioni per istruire Apache ad usare php-fpm per la gestione delle richieste php. Creiamo un nuovo file di configurazione alla locazione **/etc/httpd/conf.d/php.conf** col seguente contenuto:

    <Proxy "unix:/var/run/php-fpm/default.sock|fcgi://php-fpm">    	ProxySet disablereuse=off</Proxy><FilesMatch \.php$>	SetHandler proxy:fcgi://php-fpm</FilesMatch>## Allow php to handle Multiviews#AddType text/html .php## Add index.php to the list of files that will be served as directory# indexes.#DirectoryIndex index.php

Portiamoci al file **/etc/php-fpm.d/www.conf** e cerchiamo la voce **listen** modificandola come di seguito:

    listen = /var/run/php-fpm/default.sock

modifichiamo poi le seguenti voci:

    listen.owner = apachelisten.group = apachelisten.mode = 0660user = apachegroup = apache

Riavviamo infine i processi con:

    systemctl restart php-fpm httpd

## Installazione e configurazione di MariaDB

Procediamo ora con l'installazione del Database server, ossia di **mariadb** e **mariadb-server**:

    sudo yum install mariadb-server mariadb

ed avviamo poi il processo con **systemctl**:

    sudo systemctl start mariadb

Per quanto riguarda la configurazione, viene in nostro soccorso il wizard mysql, una installazione guidata di mysql, digitiamo quindi:

    sudo mysql_secure_installation

e seguiamo le istruzioni a schermo, ricordando di annotare la **password** una volta fornita poichè ci servirà nella fase di installazione.

> Di seguito le scelte che consiglio nella fase di installazione guidata di mysql:
> 
> *   Set root password? Si
> *   Remove anonymous users? Si
> *   Disallow root login remotely? Si

### Creazione del database

In questa sezione andiamo a creare un database che useremo poi in fase di installazione di Anchor CMS.

Facciamo accesso alla **console** **mysql** digitando quindi:

    mysql -u root -p

ci verrà chiesta la password inserita in fase di configurazione di mysql, inseriamola e creiamo il nuovo database:

    CREATE DATABASE il_mio_dominio;

dove **il_mio_dominio** sarà il nome del database. Creiamo ora l'utente, digitiamo la query:

    CREATE USER il_mio_user@localhost IDENTIFIED BY 'la_mia_password';

dove:

*   il_mio_user - è il nome utente con cui faremo accesso al database
*   la_mia_password - è la password del nostro utente

diamo ora i permessi di accesso al nostro utente con la seguente query:

    GRANT ALL PRIVILEGES ON il_mio_dominio.* TO il_mio_user@localhost;FLUSH PRIVILEGES;

chiudiamo infine la console:

    exit

## Installazione di Anchor CMS:

Eccoci alla fase finale, la vera e propria installazione di Anchor CMS.

Per questa fase utilizzeremo **git** per clonare i file di installazione dalla repository GitHub di Anchor CMS. Otteniamo quindi una copia dei file di installazione:

    cd /il_mio_dominio_exgit clone https://github.com/anchorcms/anchor-cms.gitmv /il_mio_dominio_ex/anchor-cms/* /il_mio_dominio_ex/

dove: **/il_mio_dominio_ex** è la directory che abbiamo precedentemente configurato per la nostra installazione.

Impostiamo i permessi per **content** e **admin/config**:

    chmod -R 775 content admin/config

Visitiamo ora il nostro dominio e proseguiamo con l'installazione guidata da browser.

_Good ***nix**?_  
_ - Mirko_