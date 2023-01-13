---
class: post
title: '#howto - Installare Open Web Analytics con Nginx e SSL su Centos 7'
description: "OWA (Open Web Analytics) è una piattaforma di analitca performante e completa, oltre che Open source."
date: 2019-06-24
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
  - github  
  - bash
---
OWA (Open Web Analytics) è una piattaforma di analitca performante e completa, oltre che Open source.

> Abbiamo già parlato di Open Web Analytics e altre piattaforme di analitica, in [questo articolo](https://linuxhub.it/article/le-migliori-piattaforme-web-analytics-open-source#title2).

In questa guida vediamo come installarla su Centos 7, tramite web server Nginx.

## Requisiti

Prima di procedere è opportuno consultare i requisiti annunciati dal team di sviluppo:

*   Un Web Server (in questa guida Nginx)
*   MySQL 4.1+
*   PHP 5.2+

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione. Un esempio è proprio questo sito web, raggiungibile appunto da: linuxhub.it.

Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Installazione di php-fpm

Iniziamo dall'installazione di php ed i moduli necessari come da requisiti:

    sudo yum install php php-fpm

proseguiamo poi con l'installazione dei moduli:

    sudo yum install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-json

in questo modo la nostra configurazione sarà compatibile con una installazione base della piattaforma.

Infine avviamo il processo ed abilitiamo l'auto esecuzione all'avvio del server:

    sudo systemctl start php-fpm sudo systemctl enable php-fpm

## Installazione di Nginx

Per prima cosa aggiungiamo la repository ufficiale di Nginx, in modo da ottenere una versione aggiornata. Creiamo quindi il file **nginx.repo** col nostro editor preferito:

    sudo nano /etc/yum.repos.d/nginx.repo

con il seguente contenuto:

    [nginx] name=nginx repo baseurl=http://nginx.org/packages/centos/$releasever/$basearch/ gpgcheck=0 enabled=1

proseguiamo infine con l'installazione:

    sudo yum install nginx

e l'abilitazione ed avvio del servizio via systemctl:

    sudo systemctl enable nginx sudo systemctl start nginx

## Installazione di MariaDB

In questa guida usiamo MariaDB come Database Server, procediamo quindi alla sua installazione via yum:

    sudo yum install mariadb mariadb-server

come per i precedenti, abilitiamo ed avviamo il servizio:

    sudo systemctl enable mariadbsudo systemctl start mariadb

Proseguiamo poi la configurazione guidata:

    sudo mysql_secure_installation

e seguiamo le istruzioni a schermo, ricordando di annotare la **password** una volta fornita poichè ci servirà nella fase di installazione.

> Personalmente consiglio le seguenti scelte nella fase di configurazione di mysql:
> 
> *   Set root password? Si
> *   Remove anonymous users? Si
> *   Disallow root login remotely? Si

### Creazione Database e user

Ora che tutto è installato e configurato, procediamo con la creazione del database vero e proprio oltre che dell'utente con cui accedervi. Useremo questi dati nella fase di installazione della piattaforma.

Facciamo accesso alla **console** **mysql** digitando quindi:

    mysql -u root -p

ci verrà chiesta la password inserita in fase di configurazione di mysql, inseriamola e creiamo il nuovo database:

    CREATE DATABASE il_mio_owa;

dove **il_mio_dominio** sarà il nome del database. Creiamo ora l'utente, digitiamo la query:

    CREATE USER il_mio_user@localhost IDENTIFIED BY 'la_mia_password';

dove:

*   il_mio_user - è il nome utente con cui faremo accesso al database
*   la_mia_password - è la password del nostro utente

diamo ora i permessi di accesso al nostro utente con la seguente query:

    GRANT ALL PRIVILEGES ON il_mio_owa.* TO il_mio_user@localhost;

    FLUSH PRIVILEGES;

e chiudiamo la console:

    exit

## Configurazione di php-fpm

Procediamo con la configurazione di php-fpm, per renderlo "compatibile" col nostro server nginx. Modifichiamo il file in locazione **/etc/php-fpm.d/www.conf**:

    sudo nano /etc/php-fpm.d/www.conf

modificando i seguenti campi come da esempio:

    ...user = nginxgroup = nginx...listen = /run/php-fpm/www.sock...

Infine creiamo la cartella per le sessioni di PHP ed impostiamo i permessi all'utente nginx:

    sudo mkdir -p /var/lib/php/sessionsudo chown nginx:nginx -R /var/lib/php/session/

riavviamo il servizio:

    sudo systemctl restart php-fpm

## Certificato SSL

Procediamo con la creazione di un certificato SSL, in modo da sfruttare il protocollo https sicuro.

> Nel caso in cui utilizzi sistemi come Cloudflare, ti basterà generare il certificato direttamente dalla Dashboard per poi importarlo sul server.

Per una migliore gestione dei contenuti, questa parte di guida è stata spostata [qui](https://linuxhub.it/article/howto-ottenere-e-rinnovare-un-certificato-ssl-con-lets-encrypt).

## Configurazione di Nginx

Andiamo ora a creare un file di configurazione Nginx per il sito che ospiterà la piattaforma OWA:

    sudo nano /etc/nginx/conf.d/il_mio_sito.ex.conf

dove al suo interno poniamo il seguente contenuto:

    server {    listen 443 ssl http2;    listen [::]:443 ssl http2;    server_name  il_mio_sito.ex www.il_mio_sito.ex;    ssl_certificate     /etc/letsencrypt/il_mio_sito.ex.pem;    ssl_certificate_key /etc/letsencrypt/il_mio_sito.ex.key;        client_max_body_size 100M;    root   public/il_mio_sito.ex;    index  index.php index.html index.htm;        location / {        try_files $uri $uri/ /index.php?q=$uri&$args;    }    location ~ \.php$ {        try_files $uri =404;        fastcgi_pass unix:/run/php-fpm/www.sock;        fastcgi_index index.php;        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;        include fastcgi_params;    }}

dove:

*   **server_name** è il nome a dominio che abbiamo configurato e dedicato alla nostra installazione
*   **ssl_certificate** è la locazione del certificato SSL precedentemente generato
*   **ssl_certificate_key** è la locazione del chiave del certificato SSL
*   **root** è la locazione dove andremo ad aggiungere i file di installazione

Creiamo ora la locazione per i file di installazione:

    sudo mkdir -p /usr/share/nginx/html/il_mio_sito.ex

ed impostiamo i permessi all'utente nginx:

    sudo chown -R nginx:nginx /usr/share/nginx/html/il_mio_sito.ex

infine riavviamo Nginx:

    sudo systemctl restart nginx

## Installazione di Open Web Analytics

Portiamoci alla locazione precedentemente creata, nel nostro esempio /usr/share/nginx/html/il_mio_sito.ex:

    cd /usr/share/nginx/html/il_mio_sito.ex

Installiamo **wget** per il download delle risorse:

    sudo yum install wget

Scarichiamo l'ultima versione di Open Web Analytics (la **1.6.2** nel momento in cui scrivo) dalla [repository](https://github.com/padams/Open-Web-Analytics/tags) ufficiale:

    wget https://github.com/padams/Open-Web-Analytics/archive/1.6.2.zip

ora scompattiamo l'archivio scaricato e spostiamo il suo contenuto nella cartella in cui siamo:

    unzip *.zipmv Open-Web-Analytics*/* ./

e impostiamo i permessi corretti:

    sudo chown -R nginx: nginx ./sudo chmod -R 777 owa-data

Ora visitiamo il dominio che abbiamo configurato e procediamo con l'installazione guidata.

Consiglio di proseguire la lettura con la [Wiki ufficiale](https://github.com/padams/Open-Web-Analytics/wiki/Configuration) di Open Web Analytics, per una configurazione ottimale.

_Good ***nix**?_  
_ - Mirko_