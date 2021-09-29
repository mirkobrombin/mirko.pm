---
title: '#howto - Installare Biskuit CMS con Caddy Server 2 su CentOS 8/RHEL 8'
date: 2020-10-09
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - apache  - mysql  - nodejs  - centos  - fedora  - php  - github  - rhel  - caddy  - bash
---
**Biskuit** è un CMS scritto in PHP e Vue.js, nato dalle ceneri di Pagekit.

In questa guida vediamo come installare l'ultima versione stabile (la 1.0.19) su CentOS 8 con Caddy Server v2.

> A titolo informativo, l'ultima versione stabile è la 1.9, la versione in sviluppo è la 2.0. Il procedimento è lo stesso, ma nel secondo caso è altamente sconsigliato l'uso in un ambiente in produzione.

## Installazione Caddy Server
Prima di tutto, per installare Caddy Server, dobbiamo aggiungere le repository *EPEL* e *Copr*. Su entrambi i sistemi questi avviene via *dnf* e *yum-config-manager*:

```bash
dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
yum-config-manager --add-repo https://copr.fedorainfracloud.org/coprs/g/caddy/caddy/repo/epel-7/group_caddy-caddy-epel-7.repo
```

una volta fatto proseguiamo con l'installazione del pacchetto `caddy`:

```bash
dnf install caddy
```

Infine abilitiamo il servizio via `systemctl`:

```bash
systemctl enable caddy
```

### Configurazione
Creiamo un nuovo *Caddyfile* per la nostra installazione di Biskuit. Creeremo questo file in locazione `/etc/caddy/Caddyfile` che è il percorso predefinito di Caddy, ma consiglio di seguire la <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8#title8">guida dedicata</a> per la configurazione di Caddy con più configurazioni.

Creiamo quindi il file col seguente contenuto:

```json
il_mio_dominio.ex {
	root * /var/www/ilmiodominio.ex
        header {
                Cache-Control: max-age=31536000
                Strict-Transport-Security max-age=31536000;
                X-Frame-Options "SAMEORIGIN"
        }
	    php_fastcgi * unix//run/php-fpm/www.sock
        encode gzip
        file_server
}
```

dove:

- **il_mio_dominio.ex** è il dominio che vogliamo utilizzare per la nostra installazione di Biskuit
- **/var/www/ilmiodominio.ex** il percorso che andremo a dedicare ai file

Salviamo ed avviamo Caddy via `systemctl`:

```bash
systemctl start caddy
```

All'avvio, il web server creerà automaticamente un certificato Let's Encrypt per il nostro dominio.

## Installazione php-fpm
Come spiegato <a href="https://linuxhub.it/articles/howto-servire-applicazioni-php-con-caddy-server-su-centos-e-rhel-7-8">qui</a>, per poter distribuire *applicazioni php* dobbiamo installare e configurare *php-fpm*.

Prima di tutto installiamo la repository *REMI*, da cui possiamo ottenere l'ultima versione di php-fpm:

```bash
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

Installiamo quindi i pacchetti necessari:

```bash
dnf install php php-fpm php-common php-mbstring php-gd php-xml php-curl php-mcrypt
```

Infine abilitiamo il servizio via `systemctl`:

```bash
systemctl enable php-fpm
```

### Configurazione
Per poter usufruire di php-fpm è necessario apportare alcune modifiche, modifichiamo quindi il file in posizione `/etc/php-fpm.d/www.conf` tramite il nostro editor preferito e cambiamo i seguenti paramentri:

- **user**: apache in user: caddy
- **group**: apache in user: caddy

infine avviamo il servizio:

```bash
systemctl start php-fpm
```

### Composer
Installiamo alcuni pacchetti necessari all'utilizzo di composer:

```bash
dnf install php php-cli php-zip php-json
```

quindi procediamo all'installazione:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```

Verifichiamo la corretta installazione controllando la versione installata:

```bash
composer -V
```

## MariaDB
La versione presente nelle repository di sistema è stabile, ma poco aggiornata, e per questioni di sicurezza e supporto alle nuove funzionalità, andremo ad installare la 10.5 tramite repository ufficiale.

> Se vogliamo semplicemente testare Biskuit possiamo saltare questa sezione ed installare `sqlite`.

Creiamo un nuovo file repo in `/etc/yum.repos.d/MariaDB.repo` ed al suo interno inseriamo il seguente contenuto:

```ini
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos8-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

Procediamo all'installazione disabilitando (per l'operazione) la repository AppStream per evitare conflitti:

```bash
dnf install MariaDB-server MariaDB-client --disablerepo=AppStream
```

infine abilitiamo il servizio all'avvio del sistema ed eseguiamolo:

```bash
systemctl enable mariadb
systemctl start mariadb
```

Avviamo la procedura di configurazione guidata digitando `mysql_secure_installation`. Consiglio di disabilitare il login remoto, eliminare gli utenti anonimi ed i database di test. Ricordiamo di salvare le credenziali di root una volta impostate.

### Creazione database
Ora che web server e database server sono pronti, procediamo con la creazione di un utente ed un database da dedicare a Biskuit.

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
- **utente** è il nome utente che vogliamo dare
- **la_mia_password** la password dedicata a questo utente

e infine impostiamo all'utente i permessi di accesso al database:

```sql
GRANT ALL PRIVILEGES ON il_mio_dominio.* TO utente;
FLUSH PRIVILEGES;
```

usciamo dalla console digitando `quit`.

## Installazione di NodeJS
Prima di tutto verifichiamo quali versioni di NodeJS sono disponibili nelle repository:

```bash
dnf module list nodejs
```

dalla lista che ci si presenta, cerchiamo la più recente (colonna *Stream*), nel mio caso la *12*, quindi:

```bash
dnf module enable nodejs:12
```

ed installiamo:

```bash
dnf install nodejs
```

## Installazione di Biskuit
Otteniamo l'ultima release stabile di Biskuit da GitHub:

```bash
wget https://github.com/biskuitorg/biskuit/releases/download/1.0.19/biskuit.zip
```

e portiamo i file nella locazione creata precedentemente:

```bash
unzip biskuit.zip -d /var/www/ilmiodominio.ex
```

Portiamoci al suo interno:

```bash
cd /var/www/ilmiodominio.ex
```

e procediamo in ordine con l'installazione prima dei pacchetti via *npm*:

```bash
npm install
```

successivamente di *composer*:

```bash
composer install
```

Una volta ultimato proseguiamo con l'installazione guidata, visitando l'indirizzo del dominio che abbiamo configurato sul server Caddy.

