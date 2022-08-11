---
title: '#howto - Installare Moodle su Ubuntu e derivate via Nginx'
description: "Moodle é un software riservato ai settori dell'istruzione. Si tratta di un gestionale per docenti, studenti e collaboratori, al momento il piú usato."
date: 2018-06-10
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - mysql  
  - php
---
Moodle é un software riservato ai settori dell'istruzione. Si tratta di un gestionale per docenti, studenti e collaboratori, al momento il piú usato.

L'installazione é relativamente semplice ma richiede diversi passaggi.

Per prima cosa dobbiamo installare tutte le dipendenze. Andremo ad installare un server web (Nginx, in questo caso) e un server sql (MariaDB).

## Preparazione dipendenze

Andremo ora ad installare Nginx (Server web), MariaDB (Server SQL), PHP e alcune librerie necessarie per l'esecuzione di Moodle.

    sudo apt-get update
    sudo apt-get install software-properties-common sudo add-apt-repository ppa:ondrej/php
    sudo apt-get install nginx mariadb-server mariadb-client php7.1-fpm php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-zip php7.1-curl

## Configurazione server

Una volta installato tutto comincia la configurazione dei server Web e SQL. Procediamo avviando Nginx:

    systemctl enable nginx
    systemctl start nginx

e avviamo l'installazione guidata di MariaDB:

    sudo mysql_secure_installation

durante l'installazione vi verrá chiesta la password dell'utente root di sistema e alla domanda **Set root password?** risponderemo **Yes**, digitando di seguito password e conferma password che useremo per l'utente root del server SQL.

Rispondete **Yes** o **No** alle prossime domande in base alle vostre preferenze, ricordando di rispondere **Yes** a **Reload privilege tables now?**

Una volta ultimata l'installazione riavviamo il server SQL:

    systemctl restart mysql

Torniamo a Nginx e creiamo una configurazione per Moodle. Apriamo il file di configurazione:

    sudo vi /etc/nginx/sites-available/default

e assicuriamoci che diventi come di seguito:

    server {
        listen 80;
        listen [::]:80;
        root /var/www/html/moodle;
        index index.php index.html index.htm;
        server_name example.com www.example.com;

        location / {
            try_files $uri $uri/ =404;
        }
        location ~ .php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
        }
    }

dove **example.com** e **www.example.com** deve essere sostituito col il dominio che punta al nostro indirizzo pubblico (vedi [Come puntare un dominio ad un indirizzo IP](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip)) nel caso di installazione su rete locale, sostituire con **localhost.**

## Installazione Moodle

Portiamoci nella directory **/var/www/html** e scarichiamo/decomprimiamo Moodle:

    cd /var/www/html
    curl -L https://download.moodle.org/download.php/direct/stable32/moodle-latest-32.tgz > moodle.tgz
    sudo tar -xvzf moodle.tgz -C /var/www/html

Creiamo ora una directory esterna per i dati dei corsi e impostiamo i permessi:

    sudo mkdir /var/moodle_data
    sudo chown -R www-data /var/moodle_data
    sudo chmod -R 0770 /var/moodle_data
    sudo chmod -R 777 /var/www/html/moodle

Per il corretto funzionamento di Moodle é necessario apportare qualche modifica al server SQL, procediamo quindi alla configurazione:

    sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

e modifichiamo le seguenti voci:

    default_storage_engine = innodb 
    innodb_file_per_table = 1 
    innodb_file_format = Barracuda

una volta salvato riavviamo il servizio:

    systemctl restart mysql

### Il database

Per funzionare, Moodle richiede un database dove salvare tutte le informazioni. Accediamo quindi alla console mysql via root:

    mysql -u root -p

e creiamo un nuovo database per Moodle, digitiamo quindi la seguente query:

    CREATE DATABASE my_moodle DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

per accedere al database dobbiamo fornire a Moodle un utente, evitando quindi di esporre l'utente root ne creiamo uno nuovo, digitiamo la query:

    CREATE USER 'my_moodle_user'@'localhost' IDENTIFIED BY 'my_moodle_password';

sostituendo **my_moodle_user** con l'username che preferiamo e **my_moodle_password** con una password complessa, ricordiamo di salvare questi dati per dopo.

ora diamo i permessi al nostro utente per accedere al database:

    GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,CREATE TEMPORARY TABLES,DROP,INDEX,ALTER ON my_moodle.* TO 'my_moodle_user'@'localhost' IDENTIFIED BY 'my_moodle_password';

anche qui facendo particolare attenzione nel sostituire i dati con quelli precedentemente salvati.

Una volta impostati i permessi possiamo chiudere la console mysql:

    quit;

### Installazione guidata

Finalmente é tutto pronto per l'installazione vera e propria di Moodle che continuerá sul nostro browser. Visitiamo quindi il dominio precedentemente configurato (localhost se su rete locale) e ci ritroveremo davanti all'installazione guidata.

![](https://linuxhub.it/wp-content/uploads/2018/06/moodle_1.png)

L'installazione da qui é semplicissima, selezioniamo la lingua Italiana e procediamo come da indicazioni.  
Ricordate solo di inserire il percorso che abbiamo creato a metá guida (/var/moodle_data) quando ci verrá richiesta la path per la **Data Directory.**

Come dati per il database userete invece quelli creati nella console mysql **(user:** my_moodle_user, **name:** my_moodle, **password:** my_moodle_password) che avrete modificato e salvato per questo momento.

### Finalizzazione

Una volta ultimata l'installazione guidata dobbiamo impostare i permessi alla directory:

    sudo chmod -R 0755 /var/www/html/moodle

Diamo ora le istruzioni sui permessi a Moodle, apriamo quindi il file di configurazione

    sudo vi /var/www/html/moodle/config.php

e modifichiamo questa linea:

    $CFG->directorypermissions = 0777;

in questo modo:

    $CFG->directorypermissions = 0770;

salviamo tutto e impostiamo i nuovi permessi alla path **moodle_data:**

    sudo chmod -R 0770 /var/moodle_data

Tutto é pronto all'uso, nel caso di dubbi e problemi usate il box dei commenti qui sotto.

_Good ***nix**_  
_ - Mirko_