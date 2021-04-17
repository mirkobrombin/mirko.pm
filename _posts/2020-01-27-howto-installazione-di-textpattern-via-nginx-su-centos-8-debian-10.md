---
title: '#howto - Installazione di Textpattern via Nginx su Centos 8/Debian 10'
published: 2020-01-27
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  - debian  - mysql  - centos  - php  - rhel
---
Textpattern è un CMS semplice e leggero ma potente, ottimo per la realizzazione di progetti web sia elaborati che non (come portfolio, gestione contenuti pagina, blog..).

Si tratta di un software scritto prevalentemente in PHP e JS. L'installazione è semplice e si svolge via browser. In questa guida vediamo come configurarlo e renderlo funzionante su Centos/Debian mediante l'utilizzo di Nginx.

## Requisiti
- Web server Nginx (Leggi la guida d'installazione per <a href="https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl">Centos 8</a> o <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-con-let%E2%80%99s-encrypt-di-nginx-su-debian-10">Debian 10</a>)
- php, php-fpm
- MariaDB server (o MySQL server)

## Configurazione Nginx
Per prima cosa creiamo una nuova configurazione Nginx. Ipotiziamo che vogliamo utilizzare il dominio miosito.ex, creiamo la nuova configurazione come la seguente:
```
server {
	listen       443;
	server_name  miosito.ex www.miosito.ex;
	root   /var/www/html/miosito.ex;
	index  index.php index.html index.htm;

	ssl 	on;
	ssl_certificate 	path/ssl.pem;
	ssl_certificate_key	path/ssl.key;

	location ~* .(gif|jpg|jpeg|png|ico|wmv|3gp|avi|mpg|mpeg|mp4|flv|mp3|mid|js|css|wml|swf)$ {
		expires max;
		add_header Pragma public;
		add_header Cache-Control "public, must-revalidate, proxy-revalidate";
		log_not_found off;
	}

	location / {
		try_files $uri $uri/ /index.php?$args;
	}

	location ~ .php$ {
		try_files $uri =404;
		fastcgi_pass   unix:/tmp/php7-fpm.sock;
		fastcgi_index  index.php;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
		fastcgi_buffer_size 128k;
		fastcgi_buffers 256 4k;
		fastcgi_busy_buffers_size 256k;
		fastcgi_temp_file_write_size 256k;
	}
}
```
Teniamo in considerazione alcuni parametri della configurazione che andranno sostituiti con quelli presenti nella vostra configurazione tipo:
- **listen** è configurato per ascoltare sulla porta 443 siccome la nostra intallazione d'esempio utilizzerà un certificato SSL, sostituite con 80 nel caso contrario
- **root** modifichiamo questa con la path sul disco dedicata al nostro nuovo sito web, normalmente deve essere in una posizione accessibile all'utente che gestisce il processo Nginx
- **ssl, ssl_certificate, ssl_certificate_key** identificano l'abilitazione al supporto SSL, configurateli a dovere col vostro bundle o rimuovete nel caso non fosse necessario
- **include fastcgi_params;** qui includo i parametri generali per fastcgi, in rari casi questo può essere diverso, se dovesse risultare in errore controllate il vostro **default** config per la corretta dicitura/posizione
- **fastcgi_pass unix:/tmp/php7-fpm.sock** la posizione del socket php cambia a seconda dell'installazione, della versione e della distribuzione in uso, fate riferimento alla configurazione di **default** anche per questo parametro

Una volta ultimata la nostra configurazione, riavviamo Nginx per renderla effettiva:
```
systemctl restart nginx
```

## Creazione database SQL
Per l'installazione è richiesto un database SQL, in questa sezione vediamo come crearlo mediante l'utilizzo della console mysql nel caso non fosse disponibile un pannello.

Effettuiamo l'accesso alla console:
```
mysql -u root -p
```
e creiamo un nuovo database, ad esempio col nome miosito_ex:
```
CREATE DATABASE miosito_ex;
```
creiamo di conseguenza un nuovo utente con password che useremo per l'accesso:
```
CREATE USER user IDENTIFIED BY 'password';
```
ed impostiamo i permessi per l'accesso al database:
```
GRANT ALL PRIVILEGES ON miosito_ex.* TO user;
FLUSH PRIVILEGES;
```
una volta terminato chiudiamo la console: `exit`.

## Installazione di Textpattern
L'installazione è semplicissima e si svolge interamente lato browser.

Otteniamo l'ultima release dalla <a href="https://textpattern.com/start">pagina ufficiale</a> (la 4.7.3 nel momento in cui scrivo), entriamo quindi nella posizione dedicata al nostro sito web e scarichiamola:
```
wget https://textpattern.com/File+download/91/textpattern-4.7.3.zip
```
e scompattiamone il contenuto:
```
unzip -j textpattern*.zip
```

Proseguaimo ora via browser, visitando il percorso `textpattern/setup/index.php` sul dominio impostato precedentemente nella configurazione Nginx, ad esempio: `miosito.ex/textpattern/setup/index.php`, il quale mostrerà una procedura guidata.

Il primo step richiede semplicemente la selezione della lingua, una volta selezionato ci viene richiesto di inserire i dati del database MySQL precedentemente creato:
![Configurazione database MySQL](storage/Schermata%20da%202020-01-27%2014-16-58.png)

Una volta confermati i dati ci viene richiesto di creare il file `config.php` nel percorso `/textpattern` col contenuto mostrato a schermo.

Completato lo step ci viene richiesto di inserire i dettagli basi del nostro sito web:
- Nome completo (dell'amministratore)
- Indirizzo e-mail
- Nome d'accesso
- Password
- Indirizzo del sito web (normalmente pre-compilato)
- Tema interfaccia (backend)
- Tema pubblico (frontend)

inserendo tutti i campi richiesti ed inviando il form terminerà la procedura d'installazione guidata ritrovandoci infine nella schermata di login per il pannello d'amministrazione.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/gentedilinux">gruppo telegram</a>.