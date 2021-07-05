---
title: '#howto - Creare e modificare template personalizzati su VestaCP'
date: 2020-04-29
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - php  
  - bash
---
**VestaCP** è un pannello di gestione e controllo per web server Nginx + php-fpm e/o Apache, oltre che database server come MySQL e PostgreSQL.

Possiamo usare questo pannello per servire applicativi web come siti internet semplici o applicazioni che girano con NodeJS, Python e di qualsiasi altro tipo. Questo grazie ai template, i quali offrono un insieme di istruzioni per la messa online ad esempio tramite php-fpm o proxy-pass.

Da installazione, VestaCP offre un vasto insieme di template per i più comuni CMS (Wordpress, Drupal, Magento..). Possiamo modificare questi template o crearne di nuovi in modo da replicare le regole su più applicativi.

## Modificare template
Tutti i template sono posizionati in locazione `/usr/local/vesta/data/templates`, qui troviamo le categorie:

- awstats  
- httpd  
- nginx  
- php-fpm  
- skel  
- suspend  
- webalizer

In questa guida tratteremo le regole del server web, nello specifico nginx, portiamoci quindi su `nginx` dove troviamo i seguenti file:

```bash
user@host:~ $ ls nginx 
caching.sh    caching.tpl   default.tpl  hosting.stpl  http2.stpl  php-fpm
caching.stpl  default.stpl  hosting.sh   hosting.tpl   http2.tpl   proxy_ip.tpl
```

qui troviamo le istruzioni principali, modificando il file `default.tpl` andremo a modificare le regole del template base. Nella stessa locazione troviamo anche il percorso `php-fpm` il quale contiene tutti i template dedicati ai CMS e script che girano via `php`, come ad esempio Wordpress e Drupal.

Volendo modificare il template per Wordpress, dobbiamo toccare i file:

- wordpress.stpl
- wordpress.tpl


Ogni template offre due varianti: *stpl* e *tpl*. Il primo (stpl) entrerà in funzione solo nel caso si utilizzi il protocollo *https* mentre il secondo (tpl) nel caso del protocollo *http*.

Modificando il file `wordpress.stpl` troviamo una configurazione Nginx la quale contiene alcune variabili interpretate da VestaCP per generare la configurazione specifica per sito. Ad esempio le seguenti verranno automaticamente sostituite col valore corretto configurato dal pannello:

- **%ip%** con l'indirizzo IP del server
- **%web_ssl_port%** con la porta su cui serve https
- **%domain_idn%** col nome a dominio dedicato all'applicativo web
- **%alias_idn%** con gli alias per l'applicativo web (ad esempio www..)
- **%sdocroot%** con il percorso dedicato alle risorse che verranno servite
- **%home%** col percorso `/home` dell'utente che possiede l'applicativo web
- **%user%** con l'username dell'utente che possiede l'applicativo web
- **%domain%** col dominio principale dedicato all'applicativo web

queste variabili non dovrebbero essere modificate e possiamo usarle per generare regole personalizzate.

## Aggiungere template
Come per la sezione precedente della guida, ogni nuovo template deve essere posizionato in locazione `/usr/local/vesta/data/templates`. Nel nostro caso vogliamo creare un nuovo template Nginx per servire uno script php. 

Portiamoci in `/usr/local/vesta/data/templates/nginx/php/fpm` e creiamo un nuovo file, ad esempio `custom_script.stpl` e `custom_script.tpl`.

Nel primo (custom_script.stpl) inseriamo la seguente configurazione d'esempio:

```nginx
server {
    listen	%ip%:%web_ssl_port%;
    server_name %domain_idn% %alias_idn%;
    root        %sdocroot%;
    index	index.php index.html index.htm;
    access_log  /var/log/nginx/domains/%domain%.log combined;
    access_log  /var/log/nginx/domains/%domain%.bytes bytes;
    error_log   /var/log/nginx/domains/%domain%.error.log error;

    ssl         on;
    ssl_certificate	 %ssl_pem%;
    ssl_certificate_key  %ssl_key%;

    location / {

	    location ~ [^/]\.php(/|$) {
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            if (!-f $document_root$fastcgi_script_name) {
                return  404;
            }

            fastcgi_pass    %backend_lsnr%;
            fastcgi_index   index.php;
            include         /etc/nginx/fastcgi_params;
        }
    }
    
    location /test {
        return 200 'Il mio nuovo template!';
        add_header Content-Type text/plain;
    }

    location /error/ {
        alias   %home%/%user%/web/%domain%/document_errors/;
    }

    location ~* "/\.(htaccess|htpasswd)$" {
        deny    all;
        return  404;
    }

    location /vstats/ {
        alias   %home%/%user%/web/%domain%/stats/;
        include %home%/%user%/conf/web/%domain%.auth*;
    }

    include     /etc/nginx/conf.d/phpmyadmin.inc*;
    include     /etc/nginx/conf.d/phppgadmin.inc*;
    include     /etc/nginx/conf.d/webmail.inc*;

    include     %home%/%user%/conf/web/snginx.%domain%.conf*;
}
```

Nel secondo (custom_script.tpl) il seguente:

```nginx
server {
    listen	%ip%:%web_port%;
    server_name %domain_idn% %alias_idn%;
    return 301 https://$host$request_uri;
}
```
Salviamo le modifiche, riavviamo VestaCP e selezioniamo il nuovo template per il nostro sito web di prova. Ora, visitando il nome a dominio del sito web via *https* sul percorso `/test` ad esempio `https://example.org/test`, verrà mostrato il testo `Il mio nuovo template!`, mentre visitando il percorso su protocollo *http* verrà effetuato il redirect automatico su *https*.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).