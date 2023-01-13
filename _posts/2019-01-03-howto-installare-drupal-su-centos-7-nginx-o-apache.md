---
class: post
title: '#howto - Installare Drupal su Centos 7 (Nginx o Apache)'
description: "In questa #howto vediamo come si installa Drupal su Centos 7.."
date: 2019-01-03
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - apache  
  - mysql  
  - centos  
  - php
---
In questa #howto vediamo come si installa Drupal su **Centos 7**, sfruttando Nginx o Apache come Web server (in questa guida si mostra l'installazione su uno dei due Web server appena citati, non sulla loro coesistenza).

La nostra installazione si avarrà di OPCache, una estensione che ottimizza ed incrementa le prestazioni di Drupal in esecuzione con php.

## Requisiti

Per prima cosa dobbiamo accertarci di soddisfare i requisiti per l'installazione. Ecco di seguito la lista direttamente dal sito ufficiale del progetto Drupal:

*   Un Web server (Nginx o Apache)
*   Php (5.6 o 7.1 / 7.2)
*   Un Database server MySQL (MySQL o MariaDB)  
    sono supportati (ma non citati in questa guida) anche:
    *   MySQL (Percona)
    *   SQLite
    *   PostgreSQL

Sono inoltre consigliati i seguenti **requisiti hardware** per una installazione ottimale:

*   2 GHz Dual-core
*   Architettura a 64 bit
*   4 GB di RAM
*   120 GB di spazio da dedicare

> Prima di proseguire consiglio l'approfondimento con la documentazione ufficiale sui requisiti di Drupal, siccome potrebbero aver subito aggiornamenti nel corso del tempo.
> 
> [Requisiti di sistema](https://www.drupal.org/docs/8/system-requirements)

## Installazione di php-fpm

Drupal è un CMS scritto prevalentemente in PHP. Esistono molte implementazioni di php, per questa guida ho scelto php-fpm, una versione particolarmente veloce e pronta all'uso. Procediamo quindi all'installazione come da prassi:

    sudo yum install php php-fpm

Procediamo poi con l'installazione di alcuni moduli che estendono la compatibilità di php:

    sudo yum install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-mysql php-opcache

in questo modo la nostra configurazione sarà compatibile con una installazione base del CMS. Da tenere comunque in considerazione che alcuni moduli di Drupal potrebbero richiedere l'installazione di altri moduli php.

Infine avviamo il processo ed abilitiamo l'auto esecuzione all'avvio del server:

    sudo systemctl start php-fpm
    sudo systemctl enable php-fpm

### Installazione di OPCache

Come dicevo all'inizio della guida, andremo ad installare OPCache, una estensione che donerà migliori performance al nostro sito web con Drupal.

Procediamo quindi con l'installazione di **php-opcache**:

    sudo yum install php-opcache

portiamoci alla locazione **/etc/php.d/10-opcache.ini** e modifichiamo i parametri come segue:

    opcache.enable_cli=1
    opcache.memory_consumption=128
    opcache.revalidate_freq=60
    opcache.interned_strings_buffer=8
    opcache.max_accelerated_files=4000
    opcache.fast_shutdown=1

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione di Drupal. Un esempio è proprio questo sito web, raggiungibile appunto da: linuxhub.it.

Una volta scelto e acquistato il nostro dominio, procediamo con la configurazione dei DNS.

Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Preparazione Web server

Questa sezione della guida si suddivide in due parti, ossia la configurazione di un server Nginx e quella di un server Apache. Importante tenere in considerazione che questi due software possono coesistere ma in questa guida non tratteremo l'installazione di Drupal su una installazione di questo tipo.

Di seguito sono riportate le guide su come installare i due Web server (Nginx e Apache). Una volta scelto seguite l'installazione con la guida appropriata, infine procedete con la sezione: **Configurazione Web server.**

### Installazione Nginx

Fra le scelte questa è per me la migliore. Se lo scopo del nostro sito web è quello dei grandi numeri in termini di traffico, Nginx è in grado di gestire con facilità grossi carichi, inoltre la sua struttura asincrona gli permette di gestire più eficientemente richieste multiple, occupando la RAM per meno tempo rispetto Apache.

Per una miglior fruibilità dei contenuti, la guida su come installare **Nginx** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl).

### Installazione Apache

Per una miglior fruibilità dei contenuti, la guida su come installare **Apache** su Centos 7 è disponibile [a questo link](https://linuxhub.it/article/howto-installare-apache-su-centos-7).

## Configurazione Web server

Una volta installato il Web server, possiamo procedere con la sua configurazione e quella dello spazio web che andremo a dedicare a Drupal.

Continua di seguito con la sezione inerente il Web server che hai scelto.

### Configurazione Nginx

Creiamo ora una posizione da usare successivamente nell'installazione di Drupal. Creiamo la directory:

    mkdir -p /usr/share/nginx/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del nostro dominio. Non è indispensabile che nome e dominio siano uguali ma lo consiglio per una migliore gestione futura in caso il server dovesse ospitare più siti web.

Impostiamo ora i giusti permessi al nuovo percorso:

    chowh nginx:nginx /usr/share/nginx/il_mio_domionio_ex
    chmod 775 /usr/share/nginx/il_mio_domionio_ex

In questa fase andiamo a creare un blocco **server** su Nginx per la nostra installazione di Drupal. Portiamoci alla locazione **/etc/nginx/conf.d/default.conf** e cerchiamo la sezione server che dovrebbe assomigliare alla seguente struttura base:

    server {
        listen       80;
        server_name  localhost;

        location / {
            ...
        }
         ...
    }

questa, come avete potuto leggere dalla guida di installazione, è la struttura base di un blocco **server**, con queste porzioni di codice possiamo definire uno "spazio" per ogni sito web che vogliamo ospitare sul nostro server.

Creiamo ora un nuovo blocco come di seguito:

    server {
        listen       80;
        server_name  il_mio_dominio.ex www.il_mio_dominio.ex;

        root   /usr/share/nginx/il_mio_dominio_ex;
        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ =404;
        }
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }

        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file di Drupal

Procediamo con la modifica di alcune impostazioni di php-fpm necessarie con Nginx. Andiamo ad aprire il file di configurazione nella locazione **/etc/php-fpm.d/www.conf**, cerchiamo la voce **listen** e modifichiamo come di seguito:

    listen = /var/run/php-fpm/php-fpm.sock

portiamoci poi alle voci **listen.owner** e **listen.group** rendendole:

    listen.owner = nobody
    listen.group = nobody

infine cerchiamo le voci **user** e **group** ed adattiamole come di seguito:

    user = nginx
    group = nginx

Non ci resta che riavviare i processi:

    sudo systemctl restart php-fpm nginx

### Configurazione Apache

Creiamo ora una posizione da usare successivamente nell'installazione di Drupal. Creiamo la directory:

    mkdir -p /var/www/il_mio_dominio_ex

dove **il_mio_dominio_ex** è il nome del nostro dominio. Non è indispensabile che nome e dominio siano uguali ma lo consiglio per una migliore gestione futura in caso il server dovesse ospitare più siti web.

Impostiamo ora i giusti permessi al nuovo percorso:

    chowh apache:apache /var/www/il_mio_domionio_ex
    chmod 775 /var/www/il_mio_domionio_ex

Andiamo ora a creare la configurazione Apache per il nostro sito web. Creiamo quindi il file alla locazione **/etc/httpd/vhosts.d/il_mio_dominio.ex.conf** (dove il_mio_dominio.ex è il nome del dominio da cui faremo accesso al sito web) col seguente contenuto:

    <VirtualHost localhost:80>
    ServerAdmin [email protected]_mio_dominio.ex
    DocumentRoot "/var/www/html/il_mio_dominio_ex/"
    ServerName il_mio_dominio.ex
    ServerAlias www.il_mio_dominio.ex
    ErrorLog "/var/log/httpd/il_mio_dominio.ex-error_log"
    CustomLog "/var/log/httpd/il_mio_dominio.ex-access_log" combined

    <Directory "/var/www/html/il_mio_dominio_ex/">
    DirectoryIndex index.html index.php
    Options FollowSymLinks
    AllowOverride All
    Require all granted
    </Directory>
    </VirtualHost>

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file di Drupal

Andiamo ora a modificare alcune configurazioni per istruire Apache ad usare php-fpm per la gestione delle richieste php. Creiamo un nuovo file di configurazione alla locazione **/etc/httpd/conf.d/php.conf** col seguente contenuto:

    <Proxy "unix:/var/run/php-fpm/default.sock|fcgi://php-fpm">
        	ProxySet disablereuse=off
    </Proxy>

    <FilesMatch \.php$>
    	SetHandler proxy:fcgi://php-fpm
    </FilesMatch>

    #
    # Allow php to handle Multiviews
    #
    AddType text/html .php

    #
    # Add index.php to the list of files that will be served as directory
    # indexes.
    #
    DirectoryIndex index.php

Portiamoci al file **/etc/php-fpm.d/www.conf** e cerchiamo la voce **listen** modificandola come di seguito:

    listen = /var/run/php-fpm/default.sock

modifichiamo poi le seguenti voci:

    listen.owner = apache
    listen.group = apache
    listen.mode = 0660
    user = apache
    group = apache

Riavviamo infine i processi con:

    systemctl restart php-fpm httpd

## Preparazione Database server

Andremo ora ad installare e configurare il Database server, nello specifico andremo ad usare MariaDB, un fork di MySQL e da sempre la mia scelta grazie alla sua grande velocitá ed eficienza nella gestione di grandi numeri di connessioni rispetto ad altri concorrenti.

### Installazione e configurazione MariaDB

Procediamo con l'installazione di **mariadb** e **mariadb-server**, come di consueto:

    sudo yum install mariadb-server mariadb

avviamo poi il processo con **systemctl**:

    sudo systemctl start mariadb

Per quanto riguarda la configurazione, viene in nostro soccorso il wizard mysql, una installazione guidata di mysql, digitiamo quindi:

    sudo mysql_secure_installation

e seguiamo le istruzioni a schermo, ricordando di annotare la **password** una volta fornita poichè ci servirà nella fase di installazione di Drupal.

> Personalmente consiglio le seguenti scelte nella fase di configurazione di mysql:
> 
> *   Set root password? Si
> *   Remove anonymous users? Si
> *   Disallow root login remotely? Si

### Creazione Database e user

Ora che tutto è installato e configurato, procediamo con la creazione del database vero e proprio oltre che dell'utente con cui accedervi. Useremo questi dati nella fase di installazione di Drupal.

Facciamo accesso alla **console** **mysql** digitando quindi:

    mysql -u root -p

ci verrà chiesta la password inserita in fase di configurazione di mysql, inseriamola e creiamo il nuovo database:

    CREATE DATABASE il_mio_dominio;

dove **il_mio_dominio** sarà il nome del database. Creiamo ora l'utente, digitiamo la query:

    CREATE USER [email protected] IDENTIFIED BY 'la_mia_password';

dove:

*   il_mio_user - è il nome utente con cui faremo accesso al database
*   la_mia_password - è la password del nostro utente

diamo ora i permessi di accesso al nostro utente con la seguente query:

    GRANT ALL PRIVILEGES ON il_mio_dominio.* TO [email protected];

    FLUSH PRIVILEGES;

e chiudiamo la console:

    exit

## Installazione Drupal

Siamo arrivati finalmente al nocciolo, la fase in cui andiamo ad installare effettivamente Drupal sul nostro nuovo sito web.

Per prima cosa ci accertiamo che sia presente wget sul server, basterà digitare **wget** per controllarne la presenza. In alternativa potete utilizzare **curl**.

Otteniamo ora una copia dell'archivio di installazione Drupal dal sito ufficiale e scompattiamo il tutto nella locazione di installazione che abbiamo scelto in precedenza:

    cd ~/
    wget https://www.drupal.org/download-latest/tar.gz
    tar -zxvf tar.gz -C /il_mio_dominio_ex
    mv /il_mio_dominio_ex/drupal* /il_mio_dominio_ex/

dove: **/il_mio_dominio_ex** è la locazione che abbiamo configurato per la nostra installazione.

Creiamo ora il file di configurazione dove Drupal scriverà in fase di installazione guidata:

    cd /il_mio_dominio_ex
    cp sites/default/default.settings.php sites/default/settings.php

ci basterà ora visitare il nostro dominio e procedere all'installazione guidata.

_Good ***nix**?_  
_ - Mirko_