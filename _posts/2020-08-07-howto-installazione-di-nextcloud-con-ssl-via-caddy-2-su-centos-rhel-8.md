---
class: post
title: '#howto - Installazione di Nextcloud con SSL via Caddy 2 su Centos/RHEL 8'
date: 2020-08-07
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - mysql  
  - centos  
  - fedora 
  - php  
  - nextcloud  
  - rhel  
  - caddy  
  - bash
---
**NextCloud** è una piattaforma di Cloud Storage basata su ownCloud, che rispetto a questo si distingue per il gran numero di applicazioni ed integrazioni disponibili, oltre che per una community vasta.

In un'altra guida abbiamo visto come <a href="https://linuxhub.it/articles/howto-installare-nextcloud-con-nginx-e-ssl-su-centos-7">installare Nextcloud con Nginx</a>. In questa guida vediamo come installarlo, invece, su un server Caddy.

## Requisiti
* Un database server dai seguenti: MySQL, MariaDB, Oracle Database, PostgreSQL, SQLite (in questa guida useremo MariaDB)
* Un webserver Caddy 2
* PHP 7.0+ (useremo la 7.4)
* Almeno 512MB di RAM

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione.

Una volta scelto e acquistato il nostro dominio, procediamo con la configurazione dei DNS. Per una miglior fruibilità dei contenuti, la guida su come puntare un dominio ad un IP è disponibile <a href="https://linuxhub.it/articles/howto-puntare-un-dominio-ad-un-ip">qui</a>.

## Installare Caddy 2
Prima di tutto dobbiamo aggiungere la repository *copr* ufficiale di Caddy:

```bash
yum-config-manager --add-repo https://copr.fedorainfracloud.org/coprs/g/caddy/caddy/repo/epel-7/group_caddy-caddy-epel-7.repo
```

successivamente procediamo all'installazione del pacchetto via *dnf*:

```bash
dnf install caddy
```

Facciamo in modo che il servizio si avvii assieme al sistema:

```bash
systemctl enable caddy
```

ed eseguiamo il servizio:

```bash
systemctl start caddy
```

## Installazione di php-fpm
Installeremo `php-fpm`, a cui inoltreremo tutte le chiamate php. Come prima cosa dobbiamo aggiungere le repository *EPEL* e *Remi*:

```bash
dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
dnf module enable php:remi-7.4
```

in questo modo abbiamo accesso a pacchetti più recenti rispetto quelli offerti nelle repository di sistema.

Proseguiamo con l'installazione di php, php-fpm ed alcune dipendenze di NextCloud:

```bash
dnf install php php-fpm php-common php-mbstring php-gd php-xml php-curl php-mcrypt php-zip
```

## Configurazione php-fpm
Per poter usufruire di php-fpm dobbiamo modificarne la configurazione situata `/etc/php-fpm.d/www.conf`, nello specifico:

```bash
..
user = caddy
group = caddy
..
listen.owner = caddy
listen.group = caddy
listen.mode = 0660
```

in questo modo il processo verrà creato di proprietà dell'utente *caddy* (questo viene generato in automatico al momento dell'installazione di Caddy server).

## Configurazione Caddy
Normalmente il *Caddyfile* principale (il file di configurazione iniziale di Caddy) è posizionato in `/etc/caddy/Caddyfile`. In questa guida modificheremo questo file, e nel caso voleste ospitare più domini sullo stesso server, vi rimando alla sezione **Domini multipli** di <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8#title8">questa guida</a>.

Modifichiamo il file `/etc/caddy/Caddyfile` inserendo al suo interno il seguente contenuto:

```json
il_mio_dominio.ex {
        root * /etc/caddy/web/il_mio_dominio.ex/public
        php_fastcgi * unix//run/php-fpm/www.sock
        header {
                Strict-Transport-Security max-age=31536000;
        }
        redir /.well-known/carddav /remote.php/dav 301
        redir /.well-known/caldav /remote.php/dav 301
        @forbidden {
                path    /.htaccess
                path    /data/*
                path    /config/*
                path    /db_structure
                path    /.xml
                path    /README
                path    /3rdparty/*
                path    /lib/*
                path    /templates/*
                path    /occ
                path    /console.php
        }
        respond @forbidden 404
        encode gzip
        file_server
}
```

dove:
* **root** è la locazione dove andremo a posizionare i file di NextCloud
* **php_fastcgi** è la locazione del socket PHP a cui verranno passate le chiamate
* **redir** sono istruzioni che creano un redirect, in questo caso di tipo 301, che serviranno all'utilizzo del protocollo *dav*
* **@forbidden** sono un insieme di istruzioni che impediscono l'accesso diretto ad alcune risorse
	* **respond @forbidden 404** è la risposta a queste istruzioni, ossia *404*, pagina non trovata
* **encode gzip** abilita la compressione *gzip* per le risorse statiche
* **file_server** abilita la distribuzione dei file

## Installazione MariaDB
La versione presente nelle repository di sistema è stabile ma poco aggiornata, e per questioni di sicurezza e supporto alle nuove funzionalità, andremo ad installare la 10.5 tramite repository ufficiale.

Creiamo un nuovo file repo in `/etc/yum.repos.d/MariaDB.repo` ed al suo interno inseriamo il seguente contenuto:

```bash
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos8-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

Procediamo all'installazione disabilitando (per l'operazione) la repository *AppStream* per evitare conflitti:

```bash
dnf install MariaDB-server MariaDB-client --disablerepo=AppStream
```

infine abilitiamo il servizio all'avvio del sistema ed eseguiamolo:

```bash
systemctl enable mariadb
systemctl start mariadb
```

Avviamo la procedura di configurazione guidata con:

```bash
mysql_secure_installation
```

Consiglio di disabilitare il login remoto, eliminare gli utenti anonimi ed i database di test. Ricordiamo di salvare le credenziali di root una volta impostate.

## Creazione database
Ora che web server e database server sono pronti, procediamo con la creazione di un utente ed un database da dedicare a NextCloud.

Facciamo accesso alla console MySQL digitando quindi:

```bash
mysql -u root -p
```

dove la password è quella che abbiamo scelto in fase di configurazione di MariaDB.

Creiamo un nuovo database, ad esempio:

```sql
CREATE DATABASE il_mio_dominio;
```

Creiamo il nuovo utente:

```sql
CREATE USER utente IDENTIFIED BY 'la_mia_password';
```

dove:
* **utente** è il nome utente che vogliamo dare
* **la_mia_password** la password dedicata a questo utente

e infine impostiamo all'utente i permessi di accesso al database:

```sql
GRANT ALL PRIVILEGES ON il_mio_dominio.* TO utente;
FLUSH PRIVILEGES;
```

usciamo dalla console digitando `quit`.

## Installazione di NextCloud
Infine passiamo all'installazione del software. Creiamo un nuovo percorso `/etc/caddy/web/il_mio_dominio.ex/public`:

```bash
mkdir -p /etc/caddy/web/il_mio_dominio.ex/public
```

ed impostiamo i permessi al gruppo `www-data`. Portiamoci all'interno del nuovo percorso e scarichiamo l'installer ufficiale:

```bash
curl -o setup-nextcloud.php https://download.nextcloud.com/server/installer/setup-nextcloud.php
```

impostiamo a questo i permessi all'utente `caddy`:

```bash
chown caddy setup-nextcloud.php
```

Riavviamo il web server in modo da applicare le impostazioni apportate inizialmente al *Caddyfile*:

```bash
systemctl restart caddy
```

Dopo alcuni minuti il dominio scelto sarà disponibile sotto SSL. Navighiamo verso il file `setup-nextcloud.php` e seguiamo le istruzioni a schermo per completare l'installazione di NextCloud, ricordando di selezionare *MySQL* come database al posto di *SQLite*, inserendo quindi i dati del database precedentemente creato.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).