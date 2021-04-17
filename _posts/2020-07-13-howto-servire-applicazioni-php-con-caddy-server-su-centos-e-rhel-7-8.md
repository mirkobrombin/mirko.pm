---
title: '#howto - Servire applicazioni PHP con Caddy Server su CentOS e RHEL 8'
published: 2020-07-13
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - apache  - centos  - fedora  - php  - rhel  - caddy  - bash
---
**Caddy** è un Web Server altamente estensibile e performante scritto in linguaggio Go.

Abbiamo già parlato di questo Web Server in un articolo disponibile <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8">qui</a>, e in questa guida vediamo come servire applicazioni scritte in **PHP** e quindi come configurare il *caddyfile* (ossia la configurazione).

## Installazione PHP
Avendo già trattato l'installazione di Caddy Server nel precedente articolo, proseguiamo con l'installazione di PHP.

Per prima cosa dobbiamo aggiungere le repository *EPEL* e *Remi*:

```bash
dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

in questo modo abbiamo accesso a pacchetti più recenti rispetto quelli offerti nelle repository di sistema.

Proseguiamo con l'installazione di *php*, *php-fpm* ed alcuni moduli di uso comune:

```bash
dnf install php php-fpm php-common php-mbstring php-gd php-xml php-curl php-mcrypt
```

Infine abilitiamo ed avviamo il servizio via `systemctl`:

```bash
systemctl enable php-fpm
systemctl start php-fpm
```

## Configurazione php-fpm
Per poter usufruire di php-fpm è necessario apportare alcune modifiche, modifichiamo quindi il file in posizione `/etc/php-fpm.d/www.conf`:

```bash
nano /etc/php-fpm.d/www.conf
```

e modifichiamo i seguenti paramentri:
* **user**: apache in **user**: caddy
* **group**: apache in **user**: caddy

infine riavviamo il servizio:

```bash
systemctl restart php-fpm
```

## Configurazione Caddyfile
Creiamo un nuovo caddyfile (o modifichiamo quello già esistente) in locazione `/etc/caddy/Caddyfile` con il nostro editor preferito (in questo caso `nano`):

```bash
nano /etc/caddy/Caddyfile
```

inserendo al suo interno il seguente contenuto:

```json
linuxhub.it {
        root * /var/www/ilmiodominio.ex
        php_fastcgi * unix//run/php-fpm/www.sock
        encode gzip
        file_server
}
```

avendo cura di modificare *ilmiodominio.ex* con un dominio che punta al nostro server.

In questa configurazione, la riga che più ci interessa è:

```json
php_fastcgi * unix//run/php-fpm/www.sock
```

questa infatti darà istruzioni al proxy passando le richieste a *php-fpm* quando si tratta di file con estensione *.php*.

Una volta fatto riavviamo il servizio *caddy*:

```bash
systemctl restart caddy
```

La configurazione è completa e ci basterà inserire un nuovo file di prova (ad es. test.php) in posizione `/var/www/ilmiodominio.ex` per verificarne il corretto funzionamento.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).