---
class: post
title: '#howto - Installare WordPress via Apache su Debian/Ubuntu e derivate'
description: "In questa guida vediamo appunto come Installare Wordpress via server Apache."
date: 2019-11-05
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  - apache  - mysql  - ubuntu  - php
---
Abbiamo già [impostato lo stack LAMP su Debian/Ubuntu](https://linuxhub.it/articles/howto-installare-lamp-su-ubuntu,-debian-e-derivate), ora vogliamo aprire un sito web per la nostra società o semplicemente creare il nostro portfolio personale. Per questa impresa scegliamo **WordPress**, un CMS gratuito ed open source utilizzabile da tutti, anche dai meno esperti vista la sua semplicità.

In questa guida vediamo appunto come Installare Wordpress via server Apache.

## Prerequisiti

Per poter installare correttamente WordPress sulla distro da voi utilizzata è necessario avere lo **stack LAMP**. Per sapere come aggiungerlo su Debian, Ubuntu e derivate, potete consultare [questa guida](https://linuxhub.it/articles/howto-installare-lamp-su-ubuntu-debian-e-derivate).

Se vogliamo essere più precisi, i prerequisiti consigliati sono i seguenti:

*   Apache 2.4
*   MySQL 5.6 o MariaDB 10.0
*   PHP 7.3

## Download

Per prima cosa, entrate nella cartella dove desiderate ospitare il vostro sito web realizzato con WordPress. (In questa guida si lavorerà in _/var/www/wordpress/_)

    cd /var/www/

Fatto ciò, scarichiamo l'ultima versione di WordPress in italiano utilizzando _wget_:

    wget https://it.wordpress.org/latest-it_IT.tar.gz

Scompattiamo il pacchetto compresso:

    tar -xzvf latest-it_IT.tar.gz

Entriamo nella cartella di WordPress:

    cd /var/www/wordpress/

Dando il comando _ls_ noteremo molti file assieme ad alcune cartelle, ma procediamo con ordine.

## Configurazione di Apache2

Per poter accedere in futuro al nostro sito con WordPress, abbiamo bisogno di configurare a dovere il web server che utilizziamo, in questo caso **Apache2**, creando un file di configurazione dedicato. Vediamo come fare.

Creiamo un nuovo file nella cartella _/sites-available/_ di Apache:

    sudo nano /etc/apache2/sites-available/wordpress.conf

Andiamo a scrivere quanto dovuto nel file:

    <VirtualHost *:80>        ServerName dominio.it        ServerAdmin email@amministratore.com        DocumentRoot /var/www/wordpress        <Directory /var/www/wordpress>            Options FollowSymLinks            AllowOverride Limit Options FileInfo            DirectoryIndex index.php            Require all granted        </Directory>        ErrorLog ${APACHE_LOG_DIR}/error.log        CustomLog ${APACHE_LOG_DIR}/access.log combined</VirtualHost>

Usciamo dall'editor di testo e creiamo un link simbolico in _/sites-enabled/_:

    # Per Debian e Ubuntusudo ln -s /etc/apache2/sites-available/wordpress.conf /etc/apache2/sites-enabled/

Abilitiamo il nostro sito:

    sudo a2ensite wordpress.conf

Disabilitiamo la pagina di default di Apache (se non avete toccato nulla):

    sudo a2endissiste 000-default.conf

Riavviamo Apache:

    sudo systemctl reload apache2

Apache2 è ora configurato correttamente per poter eseguire WordPress.

## Configurazione del database

WordPress non ha solamente bisogno di una cartella sull'hard disk del vostro server per poter funzionare a dovere, ma anche bisogno di scrivere dei dati in un **database**. Vediamo come andare a creare un utente dedicato esclusivamente al database su cui andrà a lavorare il CMS.

### Creazione di un utente

Eseguiamo l'accesso in MySQL o MariaDB con l'utente superuser (o root, anche se sconsigliato):

    sudo mysql -u nomeutentesuperuser -p

Creiamo un nuovo utente:

    CREATE USER nomeutente@localhost IDENTIFIED BY 'vostrapassword';

### Creazione di un database

Dopo aver creato l'utente, andiamo a realizzare il database:

    CREATE DATABASE nomedatabasewordpress;

Diamo tutti i permessi all'utente creato in precedenza per lavorare senza problemi sul database:

    GRANT ALL PRIVILEGES ON nomedatabasewordpress.* TO nomeutente@localhost;

Informiamo MySQL o MariaDB dei cambiamenti e usciamo:

    FLUSH PRIVILEGES;EXIT;

Congratulazioni! Avete impostato correttamente un utente e un database per WordPress.

## Configurazione di wp-config.php

Manca poco all'installazione vera e propria di WordPress, ma prima abbiamo ancora bisogno di scrivere nel file di configurazione, chiamato **_wp-config.php_**.

Per prima cosa, copiamo il file d'esempio:

    cp wp-config-sample.php wp-config.php

Ora, andiamo a sistemare un momento il file di configurazione appena generato. Appena entreremo con il nostro editor di testo noteremo subito dei commenti e dei parametri da modificare, ma procediamo con ordine.

Cambiamo il nome del database di WordPress in quello appena creato:

    define('DB_NAME', 'nomedatabasewordpress');

Forniamo a WordPress il nome utente e la password dell'utente del database generati in precedenza.

    define('DB_USER', 'nomeutente');define('DB_PASSWORD', 'password');

Ora, qui non dobbiamo più modificare nulla, spostiamoci più sotto nella sezione "Chiavi univoche di autenticazione e di salatura". Per una questione di sicurezza, è altamente raccomandato generare delle stringhe da inserire in "Mettere la vostra frase unica qui" nel valore appropriato.

Generiamo le chiavi da [questo link](https://api.wordpress.org/secret-key/1.1/salt/) e copiamo ed incolliamo quanto fornito da WordPress andando a sostituire i parametri già presenti. Pertanto:

    define('AUTH_KEY',         'Mettere la vostra frase unica qui');define('SECURE_AUTH_KEY',  'Mettere la vostra frase unica qui');define('LOGGED_IN_KEY',    'Mettere la vostra frase unica qui');define('NONCE_KEY',        'Mettere la vostra frase unica qui');define('AUTH_SALT',        'Mettere la vostra frase unica qui');define('SECURE_AUTH_SALT', 'Mettere la vostra frase unica qui');define('LOGGED_IN_SALT',   'Mettere la vostra frase unica qui');define('NONCE_SALT',       'Mettere la vostra frase unica qui');

Si trasformerà in:

    define('AUTH_KEY',         'Valore generato dal link');define('SECURE_AUTH_KEY',  'Valore generato dal link');define('LOGGED_IN_KEY',    'Valore generato dal link');define('NONCE_KEY',        'Valore generato dal link');define('AUTH_SALT',        'Valore generato dal link');define('SECURE_AUTH_SALT', 'Valore generato dal link');define('LOGGED_IN_SALT',   'Valore generato dal link');define('NONCE_SALT',       'Valore generato dal link');

Ora, usciamo dall'editor di testo e accediamo al file d'installazione di WordPress dal nostro dominio:

    http://dominio.it/wp-admin/install.php

## Configurazione di WordPress

Appena caricata la pagina di installazione di WordPress ci troveremo una cosa simile di fronte:

![Pagina di installazione di WordPress](https://linuxhub.it/wordpress/wp-content/uploads/2019/11/wordpress-installazione.png)

Inseriamo quanto richiesto (evitando di utilizzare nomi utenti come admin, amministratore, ecc e password deboli), clicchiamo il bottone Installa WordPress e... congratulazioni! **Avete installato WordPress correttamente**. Facciamo l'accesso con i nostri dati ed ecco a voi la dashboard.

## Conclusione

Ora sta a voi imparare ad usare questo potente strumento, impostando tutto più come vi pare e piace. Per fornire più sicurezza al vostro sito web, potete consultare [questa guida](https://forum.felinesec.com/d/32-mettere-in-sicurezza-un-sito-web-realizzato-con-wordpress) realizzata da me sul forum di FelineSec, gruppo facente parte del network GenteDiLinux.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).