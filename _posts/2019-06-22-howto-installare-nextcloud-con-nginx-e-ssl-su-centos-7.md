---
class: post
title: '#howto - Installare Nextcloud con Nginx e SSL su Centos 7'
description: "NextCloud è una piattaforma di Cloud Storage, basato su ownCloud, rispetto questo si distingue per il gran numero di app.."
date: 2019-06-22
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx 
  - mysql  
  - centos  
  - letsencrypt  
  - php  
  - nextcloud
---
NextCloud è una piattaforma di Cloud Storage, basato su ownCloud, rispetto questo si distingue per il gran numero di applicazioni ed integrazioni disponibili, oltre che una community vasta.

## Requisiti

Per prima controlliamo quali sono i requisiti annunciati:

*   Un database server dai seguenti: MySQL, MariaDB, Oracle Database, PostgreSQL, SQLite
*   Un webserver Nginx o Apache
*   PHP 7.0+
*   RAM 512MB

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione.

Una volta scelto e acquistato il nostro dominio, procediamo con la configurazione dei DNS. Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Installazione di Nginx

Per prima cosa aggiungiamo la repository ufficiale di Nginx, in modo da ottenere una versione aggiornata.

Creiamo il file nginx.repo col nostro editor preferito, nel mio caso nano:

    nano /etc/yum.repos.d/nginx.repo

ed aggiungiamo il seguente contenuto:

    [nginx]name=nginx repobaseurl=http://nginx.org/packages/centos/$releasever/$basearch/gpgcheck=0enabled=1

proseguiamo infine con l'installazione:

    yum install nginx

Abilitiamo ed avviamo il servizio con systemctl:

    systemctl enable nginx
    systemctl start nginx

## Installazione di php-fpm

Nextcloud è una piattaforma prevalentemente basata sul linguaggio PHP. Cominciamo dall'installazione di php-fpm:

    yum install php php-fpm

Procediamo poi con l'installazione di alcuni moduli che estendono la compatibilità di php:

    yum install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-mysql php-opcache

infine abilitiamo ed avviamo il servizio:

    systemctl enable php-fpmsudo systemctl start php-fpm

### Installazione di OPCache

Come dicevo all'inizio della guida, andremo ad installare OPCache, una estensione che donerà migliori performance alla nostra piattaforma Cloud.

Procediamo quindi con l'installazione di **php-opcache**:

    yum install php-opcache

portiamoci alla locazione **/etc/php.d/10-opcache.ini** e modifichiamo i parametri come segue:

    opcache.enable_cli=1
    opcache.memory_consumption=128
    opcache.revalidate_freq=60
    opcache.interned_strings_buffer=8
    opcache.max_accelerated_files=4000
    opcache.fast_shutdown=1

## Configurazione di php-fpm

Seguiamo la configurazione di php-fpm per Nginx, modificando il file in locazione /etc/php-fpm.d/www.conf:

    nano /etc/php-fpm.d/www.conf

modifichiamo i campi come i seguenti:

    ...
    user = nginx
    group = nginx
    ...
    listen = /run/php-fpm/www.sock
    ...

Infine creiamo la cartella per le sessioni di PHP ed impostiamo i permessi all'utente nginx:

    sudo mkdir -p /var/lib/php/sessionsudo 
    chown nginx:nginx -R /var/lib/php/session/

e riavviamo php-fpm:

    systemctl restart php-fpm

## Installazione di MariaDB

In questa guida vediamo come installare Nextcloud con MariaDB, anzichè PostgreSQL e simili.

> Nel caso in cui vuoi solo testare Nextcloud, ti consiglio di passare alla prossima sezione di questa guida e scegliere SQLite in fase di installazione.

 Procediamo con l'installazione via yum:

    yum install mariadb mariadb-server

come per i precedenti, abilitiamo ed avviamo il servizio:

    systemctl enable mariadb
    systemctl start mariadb

Per quanto riguarda la configurazione, viene in nostro soccorso il wizard mysql, una installazione guidata di mysql, digitiamo quindi:

    mysql_secure_installation

e seguiamo le istruzioni a schermo, ricordando di annotare la **password** una volta fornita poichè ci servirà nella fase di installazione.

> Personalmente consiglio le seguenti scelte nella fase di configurazione di mysql:
> 
> *   Set root password? Si
> *   Remove anonymous users? Si
> *   Disallow root login remotely? Si

### Creazione Database e user

Ora che tutto è installato e configurato, procediamo con la creazione del database vero e proprio oltre che dell'utente con cui accedervi. Useremo questi dati nella fase di installazione della piattaforma.

Facciamo accesso alla **console** **mysql** digitando quindi:

    mysql -u root -p

ci verrà chiesta la password inserita in fase di configurazione di mysql, inseriamola e creiamo il nuovo database:

    CREATE DATABASE il_mio_cloud;

dove **il_mio_dominio** sarà il nome del database. Creiamo ora l'utente, digitiamo la query:

    CREATE USER il_mio_user@localhost IDENTIFIED BY 'la_mia_password';

dove:

*   il_mio_user - è il nome utente con cui faremo accesso al database
*   la_mia_password - è la password del nostro utente

diamo ora i permessi di accesso al nostro utente con la seguente query:

    GRANT ALL PRIVILEGES ON il_mio_cloud.* TO il_mio_user@localhost;

    FLUSH PRIVILEGES;

e chiudiamo la console:

    exit

##  Certificato SSL

Procediamo con la creazione di un certificato SSL, in modo da sfruttare il protocollo https sicuro.

> Nel caso in cui utilizzi sistemi come Cloudflare, ti basterà generare il certificato direttamente dalla Dashboard per poi importarlo sul server.

Per una migliore gestione dei contenuti, questa parte di guida è stata spostata [qui](https://linuxhub.it/article/howto-ottenere-e-rinnovare-un-certificato-ssl-con-lets-encrypt).

## Configurazione di Nginx

Creiamo un file di configurazione in Nginx per Nextcloud:

    touch /etc/nginx/conf.d/il_mio_sito.ex.conf

e modifichiamolo dal nostro editor di testo preferito:

    nano /etc/nginx/conf.d/il_mio_sito.ex.conf

col seguente contenuto:

    server {
    	listen 443 ssl http2;    
        listen [::]:443 ssl http2;    
        server_name  il_mio_sito.ex www.il_mio_sito.ex;    
        ssl_certificate     /etc/letsencrypt/il_mio_sito.ex.pem;    
        ssl_certificate_key /etc/letsencrypt/il_mio_sito.ex.key;    
        client_max_body_size 512M;    
        fastcgi_buffers 64 4K;    
        add_header X-Content-Type-Options nosniff;    
        add_header X-XSS-Protection "1; mode=block";    
        add_header X-Robots-Tag none;    
        add_header X-Download-Options noopen;    
        add_header X-Permitted-Cross-Domain-Policies none;   
        add_header Referrer-Policy no-referrer;    
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;    
        gzip on;    
        gzip_vary on;    
        gzip_comp_level 4;    
        gzip_min_length 256;    
        gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;    
        gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json a$    
        root   /usr/share/nginx/html/il_mio_sito.ex;    
        index   index.php index.html index.htm;    
        location = /robots.txt {      
        	allow all;      
            log_not_found off;      
            access_log off;    
        }    
        location = /.well-known/carddav {     
        	return 301 $scheme://$host/remote.php/dav;    
        }    
        location = /.well-known/caldav {      
        	return 301 $scheme://$host/remote.php/dav;    
        }    
        location / {        
        	rewrite ^ /index.php$request_uri;    
        }    
        location ~ ^\/(?:build|tests|config|lib|3rdparty|templates|data)\/ {        
        	deny all;    
        }    
        location ~ ^\/(?:\.|autotest|occ|issue|indie|db_|console) {        
        	deny all;    
        }   
        location ~ ^\/(?:index|remote|public|cron|core\/ajax\/update|status|ocs\/v[12]|updater\/.+|oc[ms]-provider\/.+)\.php(?:$|\/) {
        	fastcgi_split_path_info ^(.+?\.php)(\/.*|)$;        
            include fastcgi_params;        
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;        
            fastcgi_param PATH_INFO $fastcgi_path_info;        
            fastcgi_param HTTPS on;        
            fastcgi_param modHeadersAvailable true;        
            fastcgi_param front_controller_active true;        
            fastcgi_pass unix:/run/php-fpm/www.sock;        
            fastcgi_intercept_errors on;        
            fastcgi_request_buffering off;    
        }    
        location ~ ^\/(?:updater|oc[ms]-provider)(?:$|\/) {        
        	try_files $uri/ =404;        
            index index.php;    
        }    
        location ~ \.(?:css|js|woff2?|svg|gif)$ {        
        	try_files $uri /index.php$request_uri;        
            add_header Cache-Control "public, max-age=15778463";        
            add_header X-Content-Type-Options nosniff;        
            add_header X-XSS-Protection "1; mode=block";        
            add_header X-Robots-Tag none;        
            add_header X-Download-Options noopen;        
            add_header X-Permitted-Cross-Domain-Policies none;        
            add_header Referrer-Policy no-referrer;        
            access_log off;    
        }    
        location ~ \.(?:png|html|ttf|ico|jpg|jpeg)$ {        
        	try_files $uri /index.php$request_uri;        
            access_log off;    
        }
    }

dove:

*   **server_name** è il nome a dominio che abbiamo configurato e dedicato alla nostra installazione
*   **ssl_certificate** è la locazione del certificato SSL precedentemente generato
*   **ssl_certificate_key** è la locazione del chiave del certificato SSL
*   **root** è la locazione dove andremo ad aggiungere i file di installazione

Creiamo ora la locazione per i file di installazione:

    mkdir -p /usr/share/nginx/html/il_mio_sito.ex

ed impostiamo i permessi all'utente nginx:

    chown -R nginx:nginx /usr/share/nginx/html/il_mio_sito.ex

infine riavviamo Nginx:

    systemctl restart nginx

## Installazione di Nextcloud

Portiamoci alla locazione precedentemente creata:

    cd /usr/share/nginx/html/il_mio_sito.ex

e scarichiamo l'ultima versione di Nextcloud (la 16.0.1 nel momento in cui scrivo):

    wget https://download.nextcloud.com/server/releases/nextcloud-16.0.1.zip

installiamo unzip nel caso non fosse presente:

    yum install unzip

scompattiamo l'archivio:

    unzip *.zip

e spostiamo il contenuto della cartella appena creata, nella locazione corrente:

    mv nextcloud/* ./

Creiamo la cartella data che verrà usata da NextCloud per i dati utente:

    mkdir data

ed impostiamo i permessi all'utente nginx:

    chown -R nginx:nginx ./

Infine riavviamo Nginx:

    systemctl restart nginx

Ora visitiamo il dominio che abbiamo configurato e procediamo con l'installazione guidata.

_Good ***nix**?_  
_ - Mirko_