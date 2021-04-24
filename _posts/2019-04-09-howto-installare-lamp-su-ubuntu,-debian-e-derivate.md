---
title: '#howto - Installare LAMP su Ubuntu, Debian e derivate'
description: "LAMP, acronimo di Linux, Apache, MySQL e PHP, è un gruppo di software open-source che molto spesso viene installato per poter hostare"
published: 2019-04-09
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - nginx  
  - debian  
  - apache  
  - mysql  
  - centos  
  - php
---
**LAMP**, acronimo di **Linux**, **Apache**, **MySQL** e **PHP**, è un gruppo di software open-source che molto spesso viene installato per poter hostare siti web dinamici e applicazioni web su un server utilizzante il kernel Linux e le distribuzioni che abbiamo imparato a conoscere, come Ubuntu, Debian, CentOS e molte altre.

Questa guida è incentrata sull'installazione di questi software su **Debian** e **Ubuntu**.

> Utilizzi Centos? È disponibile una guida dedicata specifica all'installazione di [Apache](https://linuxhub.it/article/howto-installare-apache-su-centos-7) o [Nginx](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl) su Centos.

## Definizioni

Prima di procedere con la guida, è bene definire alcuni concetti per chi si interfaccia solo ora a questo argomento:

*   **Linux** è il kernel creato da Linus Torvalds presente nelle distro utilizzate da noi utenti tutti i giorni, perciò non penso abbia bisogno di ulteriori spiegazioni.
*   **Apache** è un web server, oltre a Nginx, più utilizzato e diffuso nel mondo. Esso possiede una peculiarità: il file .htaccess, che permette di configurare maggiormente il web server al livello di una directory singola.
*   **MySQL** è un sistema di gestione di database richiesto per creare siti web dinamici e da molti CMS (Content Management System, o Sistemi di Gestione dei Contenuti) come WordPress, Drupal o Joomla!.
*   **PHP** è un linguaggio di programmazione utilizzato, oltre a Python, Java o altri, per creare pagine web dinamiche.

Definiti quelli che sono i concetti chiave di questa guida, proseguiamo con l'articolo.

## Installazione Apache

Premessa: in questa guida i comandi verranno eseguiti come **utente amministratore** e non come utente _root_, pertanto ricordatevi di utilizzare sempre _sudo_.

Procediamo con l'installazione di **apache2** via apt:

    $ sudo apt install apache2

Alla fine dell'installazione, basterà digitare sul browser il proprio dominio o l'indirizzo IP collegato al server. Se l'installazione di Apache è andata a buon fine, uscirà questa finestra (potrebbe variare in base alla distribuzione utilizzata):

![Pagina default utilizzata da Apache](https://linuxhub.it/wordpress/wp-content/uploads/2019/04/debian_apache2.jpg)

### Configurazione firewall

Se si utilizza un firewall come **UFW**, bisognerà prima aggiungere alle eccezioni le porte **80** e **443**, utilizzate per il traffico HTTP e HTTPS, questo per evitare possibili conflitti o malfunzionamenti, come l'irreperibilità delle risorse.

escludiamo quindi la porta 80 (HTTP):

    $ sudo ufw allow 80

e la porta 443 (HTTPS):

    $ sudo ufw allow 443

## Installazione di MySQL

Questa parte di guida è specifica per **Ubuntu**, passa al prossimo titolo per **Debian 9**.

Anche installare MySQL è molto semplice, ma esso richiede un'ulteriore configurazione.

    $ sudo apt install mysql-server

Ora, dobbiamo rendere più sicuro MySQL con un semplice script che ci permetterà di rimuovere le impostazioni di default e proteggere i nostri database.

    $ sudo mysql_secure_installation

Per prima cosa, ci chiederà se vogliamo installare il "**Validate Password Plugin**", un plugin che ci dirà se le nostre password sono sicure. Non è indispensabile, ma se si vuole aggiungere alla propria configurazione, basta seguire questi passaggi.

    VALIDATE PASSWORD PLUGIN can be used to test passwordsand improve security. It checks the strength of passwordand allows the users to set only those passwords which aresecure enough. Would you like to setup VALIDATE PASSWORD plugin?Press y|Y for Yes, any other key for No:

Se l'input sarà Y, ci verrà chiesto di impostare un livello di convalida delle password. Nel caso volessimo scegliere 2, è obbligatorio sapere che la password non verrà accettata se è più corta di 8 caratteri e non possiede numeri, lettere minuscole e maiuscole, simboli speciali e parole comuni nei dizionari.

    There are three levels of password validation policy:LOW    Length >= 8MEDIUM Length >= 8, numeric, mixed case, and special charactersSTRONG Length >= 8, numeric, mixed case, special characters and dictionary filePlease enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1

Dopodichè ci verrà chiesto di inserire una password per l'utente **root** di **MySQL**, che è totalmente **diverso** da quello impostato sul server. Se il plugin Validate Password è attivo, la password verrà verificata e potremmo scegliere se cambiarla o tenerla.

    Using existing password for root.Estimated strength of the password: 100Change the password for root ? ((Press y|Y for Yes, any other key for No) : n

Congratulazioni, MySQL è stato correttamente installato e reso più sicuro!

P.S. Nel caso non si volesse installare il plugin, verranno mostrate le istruzioni che si possono vedere qui sotto, perciò non preoccupatevi.

## Installazione di MariaDB (Debian 9)

Su Debian 9, quando si proverà ad installare MySQL con il comando mostrato sopra, ci si troverà davanti ad una sorpresa: al posto del sistema di gestione di database che conosciamo tutti, verrà installato **MariaDB**, che molto semplicemente è una versione modificata dalla community di MySQL. Nulla di troppo diverso per noi utenti all'inizio.

Possiamo quindi installare direttamente **mariadb-server**.

    $ sudo apt install mariadb-server

 e procedere con la configurazione guidata:

    $ sudo mysql_secure_installation

Con MariaDB non ci verrà chiesto di installare il plugin per la convalida delle password, pertanto ci troveremo di fronte a nuove istruzioni, anch'esse molto semplici da comprendere.

Innanzitutto, bisognerà scegliere la nuova password da utilizzare per l'utente _root_.

    Enter current password for root (enter for none):OK, successfully used password, moving on...Setting the root password ensures that nobody can log into the MariaDBroot user without the proper authorisation.Set root password? [Y/n] yNew password:Re-enter new password:Password updated successfully!Reloading privilege tables.. ... Success!

Dopo ci verrà chiesto se vogliamo procedere alla **rimozione di utenti anonimi**, assolutamente consigliata se il server non è in locale.

    By default, a MariaDB installation has an anonymous user, allowing anyoneto log into MariaDB without having to have a user account created forthem.  This is intended only for testing, and to make the installationgo a bit smoother.  You should remove them before moving into aproduction environment.Remove anonymous users? [Y/n] y ... Success!

Ora dovremmo scegliere se **disabilitare il login all'account root** da una rete esterna e quindi poter accedere solamente da "localhost".

    Normally, root should only be allowed to connect from 'localhost'.  Thisensures that someone cannot guess at the root password from the network.Disallow root login remotely? [Y/n] y ... Success!

MariaDB possiede un database chiamato "test" a cui tutti possono accedere. È consigliatissimo **rimuoverlo** se il server non è utilizzato per scopi di prove.

    By default, MariaDB comes with a database named 'test' that anyone canaccess.  This is also intended only for testing, and should be removedbefore moving into a production environment.Remove test database and access to it? [Y/n] y - Dropping test database... ... Success! - Removing privileges on test database... ... Success!

Ricaricando le tabelle dei privilegi faremo in modo che tutte le modifiche che abbiamo fatto abbiano immediatamente effetto.

    Reloading the privilege tables will ensure that all changes made so farwill take effect immediately.Reload privilege tables now? [Y/n] y ... Success!Cleaning up...All done!  If you've completed all of the above steps, your MariaDBinstallation should now be secure.Thanks for using MariaDB!

Anche MariaDB è stato installato e reso più sicuro.

## Installazione di PHP

Installare PHP richiede qualche passaggio in più siccome la versione attualmente fornita con **apt** è la **7.0**, che tra pochi mesi non sarà più supportata. È sempre consigliato installare l'ultima versione rilasciata, in questo caso la **7.3**. Vediamo come procedere all'installazione.

Dobbiamo fare in modo che apt possa fornirci PHP 7.3, ottenibile aggiungendo la repository di sury.org alla lista delle sorgenti da cui ottenere i file.

    $ sudo apt install lsb-release apt-transport-https ca-certificates$ sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg$ echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php7.3.list$ sudo apt update

Se tutto è andato a buon fine, ci basta installare PHP con i pacchetti necessari.

    $ sudo apt install php7.3 php-pear php-mysql libapache2-mod-php

Verranno installate tutte le ultime versioni di questi pacchetti, perciò non c'è bisogno di specificare php7.3 in ciascuno di essi.

## Testiamo PHP

L'ultimo passaggio necessario è provare a vedere se PHP funziona correttamente sul nostro server. Per fare ciò, dobbiamo creare un file **.php** in /var/www/html (se non si è modificato nulla nelle configurazioni di Apache). Il file può avere qualsiasi nome, ma l'estensione .php è **obbligatoria**.

    $ cd /var/www/html$ sudo nano info.php

Non è obbligatorio utilizzare **nano**, qualsiasi editor di testo può andare bene.

    <?phpphpinfo();?>

Questo è il pezzo di codice da inserire nel file. Per uscire da nano, basta premere CTRL+X, S e poi INVIO.

Se tutto funziona correttamente, digitando nel proprio browser dominio/info.php o IP/info.php dovremmo trovarci davanti una finestra come questa qui sotto.

![File delle informazioni di PHP](https://linuxhub.it/wordpress/wp-content/uploads/2019/04/php_info.png)

Questa pagina fornisce **informazioni** riguardanti il proprio server dalla parte di PHP. È un file che può rimanere solo se il server viene utilizzato in locale, mentre in produzione generalmente viene eliminato per questioni di sicurezza.

## Riepilogo

Con questa guida avete imparato ad installare Apache, MySQL e PHP sul proprio server Linux. È ora possibile installare e configurare tutti i software che si vogliono usare, come WordPress, Drupal, Ghost o anche [NodeJS](https://linuxhub.it/article/howto-installare-node-version-manager-nvm-su-debian-9).

Per dubbi o chiarimenti potete scrivete nel nostro gruppo [Telegram](https://t.me/gentedilinux).