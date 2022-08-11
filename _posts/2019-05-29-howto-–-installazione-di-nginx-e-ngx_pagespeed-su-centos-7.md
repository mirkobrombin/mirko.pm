---
title: '#howto – Installazione di Nginx e ngx_pagespeed su Centos 7'
description: "Il modulo ngx_pagespeed (mod_pagespeed su Apache2), è una estensione di Google per web server che ne incrementa le prestazioni."
date: 2019-05-29
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - apache  
  - centos  
  - github
---
Abbiamo già visto [come installare Nginx su Centos 7](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl) diversi mesi fa, oggi vediamo come preparare una installazione di Nginx col modulo open source **ngx_pagespeed** di Google, incrementando notevolmente le performance del nostro server web.

## Introduzione

Il modulo ngx_pagespeed (mod_pagespeed su Apache2), è una estensione di Google per web server che ne incrementa le prestazioni.

Questo modulo si occupa principalmente di ottimizzare il metodo con cui vengono distribuite le risorse (media, html, css, js), oltre che gestire al meglio la cache, migliorando così drasticamente i tempi di risposta e diminuendo il consumo di banda generale.

> Da tenere in considerazione che ngx_pagespeed non può essere installato su una installazione già esistente di Nginx.

## Preparazione dipendenze

Procediamo con la preparazione delle dipendenze per il build di Nginx da sorgente, poichè non è possibile usare questo modulo con una installazione di Nginx non "costruita" per questo scopo:

    sudo yum install gcc-c++ pcre-devel zlib-devel make unzip wget libuuid-devel

una volta installati gli strumenti necessari, entriamo in una directory "sicura" che non possa creare conflitti con altri file (meglio se vuota e senza la presenza di altri archivi), come ad esempio **/tmp**:

    cd /tmp

scarichiamo una copia aggiornata di Nginx, per fare ciò dobbiamo sfogliare la repository ufficiale:

    http://nginx.org/download/

copiare quindi il link della versione più recente (al momento nginx-1.15.10.zip) e scaricarla:

    wget http://nginx.org/download/nginx-1.15.10.tar.gz

Facciamo lo stesso col modulo ngx_pagespeed, scegliamo la versione più aggiornata da GitHub:

    https://github.com/apache/incubator-pagespeed-ngx/releases

e scarichiamola (al momento v1.13.35.2-stable):

    wget https://github.com/apache/incubator-pagespeed-ngx/archive/v1.13.35.2-stable.zip

Una volta scaricati i pacchetti, possiamo decomprimere gli archivi:

    unzip *.zip

### Preparazione ngx_pagespeed

Ora andiamo a scaricare le librerie di ottimizzazione di PageSpeed, prima di tutto entriamo nella cartella di ngx_pagespeed (il nome varia in base alla versione scaricata, di norma inizia per ngx_pagespeed-), nel nostro caso si chiama ngx_pagespeed-v1.13.35.2-stable:

    cd ngx_pagespeed-v1.13.35.2-stable

una volta dentro la directory, scarichiamo le librerie e scompattiamo l'archivio per poi tornare alla directory precedente:

    wget https://dl.google.com/dl/page-speed/psol/1.12.34.2-x64.tar.gz
    tar -xvzf 1.12.34.2-x64.tar.gz
    cd ..

## Configurazione e compilazione di Nginx

Ora che tutto è pronto possiamo passare alla configurazione e compilazione vera e propria di Nginx ed il modulo in questione.

### Configurazione

Spostiamoci nella locazione dove è presente nginx, nel nostro caso la directory si chiama nginx-1.15.10:

    cd nginx-1.15.10

e procediamo con la configurazione dal file .configure, digitiamo quindi:

    sudo ./configure --add-module=/tmp/ngx_pagespeed-1.12.34.2-stable --user=nobody --group=nobody --pid-path=/var/run/nginx.pid ${PS_NGX_EXTRA_FLAGS}

dove:

*   **--add-module** è ovviamente l'istruzione che impartiamo per l'aggiunta di un modulo, in questo caso la directory dove abbiamo scaricato nginx_pagespeed
*   **--user/--group** sono l'utente ed il gruppo che vogliamo dedicare al processo di Nginx (non modificare se non sai a cosa serve poichè potrebbe rendere inutilizzabile il processo)
*   **--pid** il percorso dove verrà riposto il processo principale di Nginx

### Compilazione e Installazione

Una volta completata la configurazione, procediamo con la compilazione e successiva installazione:

    sudo make
    sudo make install

il secondo comando non funzionerà se il primo ha restituito un errore, in questo caso controllare bene i passaggi precedenti.

Creiamo infine dei collegamenti simbolici essenziali al funzionamento:

    sudo ln -s /usr/local/nginx/conf/ /etc/nginx
    sudo ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx

dove:

*   **/etc/nginx** è la cartella in cui sono riposte le configurazioni
*   **/usr/sbin/nginx** il file eseguibile

## Script di avvio

In questa sezione della guida, creiamo uno script che ci permetterà di avviare, riavviare e fermare Nginx tramite systemctl. Creiamo quindi il file **/etc/init.d/nginx**:

    sudo touch /etc/init.d/nginx

e modifichiamo il contenuto come segue, usando il nostro editor preferito:

    #!/bin/sh## nginx - this script starts and stops the nginx daemon## chkconfig:   - 85 15# description:  NGINX is an HTTP(S) server, HTTP(S) reverse \#               proxy and IMAP/POP3 proxy server# processname: nginx# config:      /etc/nginx/nginx.conf# config:      /etc/sysconfig/nginx# pidfile:     /var/run/nginx.pid# Source function library.. /etc/rc.d/init.d/functions# Source networking configuration.. /etc/sysconfig/network# Check that networking is up.[ "$NETWORKING" = "no" ] && exit 0nginx="/usr/sbin/nginx"prog=$(basename $nginx)NGINX_CONF_FILE="/etc/nginx/nginx.conf"[ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginxlockfile=/var/lock/subsys/nginxmake_dirs() {   # make required directories   user=`$nginx -V 2>&1 | grep "configure arguments:.*--user=" | sed 's/[^*]*--user=\([^ ]*\).*/\1/g' -`   if [ -n "$user" ]; then      if [ -z "`grep $user /etc/passwd`" ]; then         useradd -M -s /bin/nologin $user      fi      options=`$nginx -V 2>&1 | grep 'configure arguments:'`      for opt in $options; do          if [ `echo $opt | grep '.*-temp-path'` ]; then              value=`echo $opt | cut -d "=" -f 2`              if [ ! -d "$value" ]; then                  # echo "creating" $value                  mkdir -p $value && chown -R $user $value              fi          fi       done    fi}start() {    [ -x $nginx ] || exit 5    [ -f $NGINX_CONF_FILE ] || exit 6    make_dirs    echo -n $"Starting $prog: "    daemon $nginx -c $NGINX_CONF_FILE    retval=$?    echo    [ $retval -eq 0 ] && touch $lockfile    return $retval}stop() {    echo -n $"Stopping $prog: "    killproc $prog -QUIT    retval=$?    echo    [ $retval -eq 0 ] && rm -f $lockfile    return $retval}restart() {    configtest || return $?    stop    sleep 1    start}reload() {    configtest || return $?    echo -n $"Reloading $prog: "    killproc $nginx -HUP    RETVAL=$?    echo}force_reload() {    restart}configtest() {  $nginx -t -c $NGINX_CONF_FILE}rh_status() {    status $prog}rh_status_q() {    rh_status >/dev/null 2>&1}case "$1" in    start)        rh_status_q && exit 0        $1        ;;    stop)        rh_status_q || exit 0        $1        ;;    restart|configtest)        $1        ;;    reload)        rh_status_q || exit 7        $1        ;;    force-reload)        force_reload        ;;    status)        rh_status        ;;    condrestart|try-restart)        rh_status_q || exit 0            ;;    *)        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"        exit 2esac

salviamo e impostiamo i permessi di esecuzione:

    sudo chmod +x /etc/init.d/nginx

Infine abilitiamo e avviamo il servizio:

    sudo systemctl enable nginx
    sudo systemctl start nginx

## Configurazione Nginx e PageSpeed

L'ultimo passo prima di poter essere online con PageSpeed, è quello di creare la cartella che raccoglierà la cache di elaborazione di ngx_pagespeed.

Creiamo quindi la cartella in locazione **/var/ngx_pagespeed_cache** ed impostiamo i permessi corretti (nobody come nella configurazione):

    sudo mkdir /var/ngx_pagespeed_cachesudo chown -R nobody:nobody /var/ngx_pagespeed_cache

### Abilitazione di PageSpeed sul dominio

Ora che tutto è pronto, possiamo abilitare PageSpeed e renderlo così funzionante sul nostro sito web.

Apriamo quindi il file di configurazione **/etc/nginx/nginx.conf** e creiamo il nostro primo blocco server come segue:

    server {    listen       80;    server_name  il_mio_dominio.ex www.il_mio_dominio.ex;    # Pagespeed    pagespeed on;    pagespeed FileCachePath /var/ngx_pagespeed_cache;    location ~ "\.pagespeed\.([a-z]\.)?[a-z]{2}\.[^.]{10}\.[^.]+" { add_header "" ""; }    location ~ "^/ngx_pagespeed_static/" { }    location ~ "^/ngx_pagespeed_beacon" { }    location / {        root   /usr/share/nginx/il_mio_dominio_ex;        index  index.html index.htm;    }}

dove **il_mio_dominio.ex** è il dominio del nostro sito web (che deve puntare al nostro server ([leggi qui come](https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip)).

> Per maggiori informazioni sui blocchi server di Nginx, leggi la sezione **Spiegazione blocchi server** in [questa guida](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl#title5).

Salviamo il file e riavviamo quindi Nginx:

    sudo systemctl restart nginx

e testiamo il corretto funzionamento di PageSpeed via **curl** come segue:

    curl -I -p http://il_mio_dominio.ex

il che dovrebbe restituire fra le righe dell'output, la variabile **X-Page-Speed** a conferma del corretto funzionamento.

Se desideri configurare un certificato SSL sul tuo dominio, segui [questa guida](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl#title6) dalla sezione **Configurazione SSL**.

_Good ***nix**?_  
_ - Mirko_