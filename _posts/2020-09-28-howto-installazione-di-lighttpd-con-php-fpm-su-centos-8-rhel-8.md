---
title: '#howto - Installazione di Lighttpd con php-fpm su CentOS 8/RHEL 8'
published: 2020-09-28
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql  - php  - bash
---
**Lighttpd** è un web server Open source, semplice da configurare e promette alte performance ad un costo minimo in termini di risorse.

La sua versatilità gli permette di girare su hardware di ogni tipo, sia ad alte che basse prestazioni. In questa guida vedremo come installarlo su CentOS e RHEL 8 assieme a *php-fpm*, che sarà utilizzato per processare file PHP.

# Installazione
Per prima cosa dobbiamo installare le repository EPEL (Extract Packages for Enterprise Linux), sia su CentOS 8 che RHEL 8:

```bash
dnf install epel-release
```

Proseguiamo quindi con l'installazione del pacchetto *lighttpd*:

```bash
dnf install lighttpd
```

una volta fatto ciò verifichiamo la corretta installazione tramite il comando `lighttpd`:

```bash
lighttpd -v
```

Infine abilitiamo ed avviamo il servizio via *systemctl*:

```bash
systemctl enable lighttpd
systemctl start lighttpd
```

## Firewall
Su CentOS e RHEL troviamo *firewalld* come Firewall, questo va configurato per il corretto funzionamento di `lighttpd`. Andremo ad aprire le porte per il servizio `http`, con la regola:

```bash
firewall-cmd --add-service=http --permanent
```

quindi riavviamo *firewalld*:

```bash
firewall-cmd --reload
```

*Lighttpd* è ora in ascolto sulla porta *:80* del server, visitando quindi l'indirizzo IP pubblico ci si dovrebbe presentare la pagina informativa del server nel caso in cui tutto fosse andato come previsto.

## php-fpm
Per distribuire applicativi PHP con *Lighttpd* è necessario configurare *php-fpm*. Prima di tutto installiamo `php`, `php-fpm` e tutti i pacchetti di uso comune:

```bash
dnf install php php-fpm lighttpd-fastcgi php-mysqlnd php-pdo php-gd php-mbstring
```

Abilitiamo il servizio via *systemctl*:

```bash
systemctl enable php-fpm
```

Modifichiamo la configurazione di *php-fpm* in locazione `/etc/php-fpm.d/www.conf`:

```bash
nano /etc/php-fpm.d/www.conf
```

e modifichiamo come segue:

```
..
user = lighttpd
group = lighttpd
listen = 127.0.0.1:9000
..
```

Modifichiamo il file in locazione `/etc/php.ini`:

```bash
nano /etc/php.ini
```

eliminando il commento dalla seguente riga:

```
..
cgi.fix_pathinfo=1
..
```

Infine avviamo il servizio:

```bash
systemctl start php-fpm
```

Ora dobbiamo abilitare il modulo *mod_fastcgi* in `/etc/lighttpd/modules.conf`, eliminando il commento come segue:

```
..
include "conf.d/fastcgi.conf"
..
```

Procediamo con la sua configurazione, creiamo o modifichiamo il file in posizione `/etc/lighttpd/conf.d/fastcgi.conf`:

```bash
nano /etc/lighttpd/conf.d/fastcgi.conf
```

il quale deve contenere il seguente contenuto:

```
fastcgi.server = ( ".php" => 
        (( 
                "bin-path" => "/usr/bin/php-cgi",
                "socket" => "/var/run/lighttpd/php.socket",
                "max-procs" => 4,
                "bin-environment" => (
                "PHP_FCGI_CHILDREN" => "",
                "PHP_FCGI_MAX_REQUESTS" => "500" 
                    ),
                "broken-scriptfilename" => "enable" 
        ))
)
```

Creiamo il percorso `/var/run/lighttpd`:

```bash
mkdir -p /var/run/lighttpd
```

ed impostiamo i permessi corretti:

```bash
chown -R lighttpd:lighttpd /var/run/lighttpd
```

Infine riavviamo il servizio:

```bash
systemctl restart lighttpd
```

Possiamo testare il corretto funzionamento creando un nuovo file in posizione `/var/www/lighttpd/`, ad esempio:

```bash
echo "<?php phpinfo();" > /var/www/lighttpd/test.php
```

Visitiamo la pagina per verificarne il funzionamento.

Per ogni dubbio, chiarimento o curiosità ci trovate al [nostro gruppo Telegram](https://t.me/linuxpeople).