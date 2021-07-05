---
title: '#howto - Installazione di Drupal 9 su CentOS/RHEL 8 con Nginx e OPCache'
date: 2021-02-12
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - apache  
  - mysql  
  - centos  
  - fedora  
  - php  
  - rhel  
  - bash
---
**Drupal** è un potente CMS Open source, noto per la sua estensibilità, compatibilità ed il basso consumo di risorse.

Si tratta di un'applicazione sviluppata in PHP e JavaScript, sviluppata, mantenuta e distribuita dalla Comunità di Drupal. In questa guida vedremo come installare la versione 9 di Drupal su CentOS o RHEL 8.

> Questa guida è l'aggiornamento della precedente per [CentOS 7](https://linuxhub.it/articles/howto-installare-drupal-su-centos-7-nginx-o-apache).

La nostra installazione si avvarrà di **OPCache**, un'estensione che ottimizza ed incrementa le prestazioni di Drupal in esecuzione con PHP.

## Requisiti

In questa guida tratteremo l'installazione di **Drupal 9**. Questa versione ha requisiti differenti dalla *8* ed è indispensabile soddisfarli a pieno per procedere ed utilizzare il software senza intoppi.

*   Un Web server (Nginx 1.9+ o Apache 2.4.7+), useremo Nginx in questa guida
*   PHP (7.3+/8)
*   Un Database server MySQL (MySQL 5.7.8+ o MariaDB 10.3+), ma sono supportati (ma non citati in questa guida) anche:
    *   MySQL (Percona) 5.7.8+
    *   SQLite (3.6.8+)
    *   PostgreSQL (10.0+)

Sono inoltre consigliati i seguenti **requisiti hardware** per una installazione ottimale:

*   2 GHz Dual-core
*   Architettura a 64 bit
*   4 GB di RAM
*   120 GB di spazio da dedicare

> Prima di proseguire consiglio l'approfondimento con la documentazione ufficiale sui requisiti di Drupal, siccome potrebbero aver subito aggiornamenti nel corso del tempo.
> 
> [Requisiti di sistema di Drupal 9](https://www.drupal.org/docs/system-requirements)

## EPEL
I pacchetti offerti dalle repo di sistema in CentOS e Red Hat Linux sono di norma molto vecchi e fissi su versioni stabili, ma appunto poco aggiornate. In nostro soccorso arrivano la repository *EPEL (Extra Packages for Enterprise Linux)* e *REMI*:

```bash
dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

## Installazione di php-fpm

Come detto, Drupal è un CMS scritto prevalentemente in PHP. Esistono molte implementazioni di PHP, ma per questa guida ho scelto PHP-FPM, particolarmente veloce e pronto all'uso su Nginx.

Procediamo con l'installazione della versione *8*, fornita dalla repository REMI, precedentemente configurata:

```bash
dnf module enable php:remi-8.0
dnf install php-fpm
```

Procediamo poi con l'installazione di alcuni moduli che estendono il supporto alle funzionalità di Drupal:

```bash
dnf install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-mysql php-opcache
```

in questo modo la nostra configurazione sarà compatibile con una installazione base del CMS. Da tenere comunque in considerazione che alcuni moduli di Drupal potrebbero richiedere l'installazione di altri moduli PHP.

Infine, avviamo il processo ed abilitiamo l'auto-esecuzione all'avvio del server:

```bash
systemctl start php-fpm
systemctl enable php-fpm
```

### Installazione di OPCache

Come dicevo all'inizio della guida, per avere un'istanza di Drupal funzionante andremo ad installare OPCache, una estensione che donerà migliori performance al nostro sito web con questo CMS.

Procediamo quindi con l'installazione di **php-opcache**:

```bash
dnf install php-opcache
```

portiamoci alla locazione **/etc/php.d/10-opcache.ini** e modifichiamo i parametri come segue:

```ini
opcache.enable_cli=1
opcache.memory_consumption=128
opcache.revalidate_freq=60
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.fast_shutdown=1
```

## Configurazione dominio

Il dominio è sostanzialmente "la base del link" da cui vogliamo raggiungere la nostra installazione di Drupal. Un esempio è proprio questo sito web, raggiungibile appunto da: linuxhub.it.

Una volta scelto e acquistato il nostro dominio, procediamo con la configurazione dei DNS.

Per una miglior fruibilità dei contenuti, la guida su come **puntare un dominio ad un IP** è disponibile [a questo link](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip).

## Preparazione Web server

In questa guida utilizziamo Nginx come web server, e tratteremo di seguito l'installazione e la configurazione del software.

### Installazione Nginx

Fra le diverse scelte questa è per me la migliore. Se lo scopo del nostro sito web è quello dei grandi numeri in termini di traffico, Nginx è in grado di gestire con facilità grossi carichi, inoltre la sua struttura asincrona gli permette di gestire più eficientemente richieste multiple, occupando la RAM per meno tempo rispetto Apache.

Se volete saperne di più su come installare **Nginx** su CentOS/RHEL 8, una nostra guida è disponibile [a questo link](https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl).

### Configurazione Nginx

Creiamo ora una posizione da usare successivamente nell'installazione di Drupal. Creiamo la directory dove più preferiamo:

```bash
mkdir -p /usr/share/nginx/il_mio_dominio_ex
```

dove **il_mio_dominio_ex** è il nome del nostro dominio. Non è indispensabile che nome e dominio siano uguali, ma lo consiglio per una migliore gestione, in caso il server dovesse ospitare più siti web con il passare del tempo.

Impostiamo ora i giusti permessi al nuovo percorso:

```bash
chown nginx:nginx /usr/share/nginx/il_mio_domionio_ex
chmod 775 /usr/share/nginx/il_mio_domionio_ex
```

In questa fase andiamo a creare un blocco **server** su Nginx per la nostra installazione di Drupal. Portiamoci alla locazione **/etc/nginx/conf.d/default.conf** e cerchiamo la sezione *server* che dovrebbe assomigliare alla seguente struttura base:

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
    	...
    }
    ...
}
```

questa, come avete potuto leggere dalla guida di installazione, è la struttura base di un blocco **server**. Con queste porzioni di codice possiamo definire uno "spazio" per ogni sito web che vogliamo ospitare sul nostro server.

Creiamo ora un nuovo blocco come di seguito:

```nginx
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
```

dove:

*   **il_mio_dominio.ex** - è ovviamente il dominio in nostro possesso che vogliamo dedicare al nuovo sito web
*   **/usr/share/nginx/html/il_mio_dominio_ex** - è il percorso creato precedentemente dove andremo a posizionare i file di Drupal

Procediamo con la modifica di alcune impostazioni di PHP-FPM necessarie con Nginx. Andiamo ad aprire il file di configurazione nella locazione **/etc/php-fpm.d/www.conf**, cerchiamo la voce **listen** e modifichiamo come di seguito:

```nginx
listen = /var/run/php-fpm/php-fpm.sock
```

portiamoci poi alle voci **listen.owner** e **listen.group** rendendole:

```ini
listen.owner = nobody
listen.group = nobody
```

infine cerchiamo le voci **user** e **group** ed adattiamole come di seguito:

```ini
user = nginx
group = nginx
```

Non ci resta che riavviare i processi:

```bash
systemctl restart php-fpm nginx
```

## Preparazione Database server

Andremo ora ad installare e configurare il Database server. Nello specifico andremo ad usare MariaDB, un fork di MySQL e da sempre la mia scelta grazie alla sua grande velocitá ed efficienza nella gestione di grandi numeri di connessioni rispetto ad altri concorrenti.

### Installazione e configurazione MariaDB

Come già detto, ci servirà una versione recente di MariaDB, ottenibile tramite la repository ufficiale del progetto. Quest'ultima è facilmente installabile tramite lo script ufficiale:

```bash
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
chmod +x mariadb_repo_setup
./mariadb_repo_setup
```

Installiamo quindi i pacchetti `MariaDB` e `MariaDB-server` dalla nuova repository:

```bash
dnf install --repo="mariadb-main" MariaDB MariaDB-server
```

avviamo poi il processo con **systemctl**:

```bash
systemctl start mariadb
```

Per quanto riguarda la configurazione viene in nostro soccorso il wizard MySQL, una installazione guidata di MySQL. Digitiamo quindi:

```bash
mysql_secure_installation
```

e seguiamo le istruzioni a schermo, ricordando di annotare la **password** una volta fornita poichè ci servirà nella fase di installazione di Drupal.

> Personalmente consiglio le seguenti scelte nella fase di configurazione di MySQL:
> 
> *   Set root password? Si
> *   Remove anonymous users? Si
> *   Disallow root login remotely? Si

### Creazione Database e user

Ora che tutto è installato e configurato, procediamo con la creazione del database vero e proprio oltre che dell'utente con cui accedervi. Useremo questi dati nella fase di installazione di Drupal.

Facciamo accesso alla **console** **mysql** digitando:

```bash
mysql -u root -p
```

a questo punto ci verrà chiesta la password inserita in fase di configurazione di MySQL. Inseriamola e creiamo il nuovo database:

```sql
CREATE DATABASE il_mio_dominio;
```

dove **il_mio_dominio** sarà il nome del database. Creiamo ora l'utente, digitando la query:

```sql
CREATE USER 'utente'@'localhost' IDENTIFIED BY 'la_mia_password';
```

dove:

*   il_mio_user - è il nome utente con cui faremo accesso al database
*   la_mia_password - è la password del nostro utente

Diamo ora i permessi di accesso al nostro utente con la seguente query:

```sql
GRANT ALL PRIVILEGES ON il_mio_dominio.* TO [email protected];
FLUSH PRIVILEGES;
```

e chiudiamo la console:

```sql
exit
```

## Installazione Drupal

Siamo arrivati finalmente al nocciolo della guida, la fase in cui andiamo ad installare effettivamente Drupal sul nostro nuovo sito web.

Per prima cosa, accertiamoci che sia presente *wget* sul server (basterà digitare **wget** per controllarne la presenza). In alternativa potete utilizzare **curl**.

Otteniamo ora una copia dell'archivio di installazione Drupal dal sito ufficiale e scompattiamo il tutto nella locazione di installazione che abbiamo scelto in precedenza:

```bash
cd ~/
wget https://www.drupal.org/download-latest/tar.gz
tar -zxvf tar.gz -C /il_mio_dominio_ex
mv /il_mio_dominio_ex/drupal* /il_mio_dominio_ex/
```

dove: **/il_mio_dominio_ex** è la locazione che abbiamo configurato per la nostra installazione.

Creiamo ora il file di configurazione dove Drupal scriverà in fase di installazione guidata:

```bash
cd /il_mio_dominio_ex
cp sites/default/default.settings.php sites/default/settings.php
```

Ci basterà ora visitare il nostro dominio e procedere all'installazione guidata.

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://t.me/linuxpeople).