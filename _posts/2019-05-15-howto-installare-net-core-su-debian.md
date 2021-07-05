---
title: '#howto - Installare .Net Core su Debian'
description: "In questa guida vediamo come installare e rendere funzionale .NET Core su server Debian."
date: 2019-05-15
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - nginx  
  - debian  
  - letsencrypt  
  - netcore
---
In questa guida vediamo come installare e rendere funzionale .NET Core su server Debian.

## Introduzione

.**NET Core** è un framework modulare gratuito e Open source sviluppato da Microsoft per sistemi operativi Windows, Linux e MacOS.

Formato da CoreCLR, un'implementazione runtime completa di CLR, la macchina virtuale che gestisce l'esecuzione di programmi .NET.

CoreCLR viene inoltre fornito con un compilatore just-in-time ottimizzato, chiamato RyuJIT.

## Installazione

Procediamo quindi con l'installazione vera e propria. È necessaria una Shell con accesso root. In questa guida utilizzeremo la versione di .NET Core stabile, la 2.2 nel momento in cui scrivo.

### InstallazioneSDK

Partiamo con l'installare il SDK ossia la strumentazione base, completa di template, toolchain e runtimes.

Prima di tutto aggiungiamo le repository ufficiali e le chiavi necessarie:

    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpgsudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/wget -q https://packages.microsoft.com/config/debian/9/prod.listsudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list

Impostiamo poi i giusti permessi:

    sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpgsudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list

Ora che abbiamo aggiunto le chiavi e le repository, procediamo con la vera e propria installazione dell'SDK

    sudo apt updatesudo apt install apt-transport-https dotnet-sdk-2.2

### Installazione .NET Core

Se tutto è andato a buon fine procediamo con l'installazione del runtime.

    sudo apt updatesudo apt install aspnetcore-runtime-2.2

> Una volta svolti i precedenti punti, consiglio un reboot affinchè sia tutto pienamente funzionale.

## Creazione della prima WebApp base

Creiamo una cartella nella directory /**root**/**testapp**  denominata testapp (nel nostro esempio):

    sudo mkdir /root/testapp

entriamo nella nuova locazione:

    cd /root/testapp

e creiamo l'applicazione via **dotnet**:

    dotnet new webapp

il risultato sarà simile a questo:

    root@hersy:~/testapp|?  dotnet new webappThe template "ASP.NET Core Web App" was created successfully.This template contains technologies from parties other than Microsoft, see https://aka.ms/aspnetcore-template-3pn-210 for details.Processing post-creation actions...Running 'dotnet restore' on /root/testapp/testapp.csproj...  Restore completed in 4.82 sec for /root/testapp/testapp.csproj.Restore succeeded.

Infine con dotnet **run** avviamo l'applicazione appena creata:

    dotnet run

A questo punto, se tutto è andato a buon fine, inizierà a funzionare restituendo come risultato localhost:5001 & 5000.

Accedendo da browser a http://localhost:5001 dovremmo vedere la nostra prima applicazione in .NET Core, funzionare.

## Pubblicazione tramite proxy_pass di Nginx

In questo extra della guida, andiamo a vedere come "distribuire" la nostra applicazione via Nginx e sfruttando un certificato SSL.

### Prerequisiti

*   Nginx
*   Certbot
*   .Net Core SDK+Runtime

### Creazione applicazione

Creiamo una directory chiamata aspnetapp (nel nostro esempio), in /var/www:

    sudo mkdir /var/www/aspnetapp

ed spostiamoci al suo interno:

    cd /var/www/aspnetapp

Come abbiamo visto precedentemente, creiamo una nuova applicazione .NET Core:

    dotnet new webapp

> La cartella /www potrebbe avere una locazione differente nel vostro server, in base alla vostra configurazione.

### proxy_pass

Andiamo ora a sfruttare il proxy_pass per creare un Reverse Proxy dalla porta della nostra applicazione a quella corretta 80 o 443.

Portiamoci in locazione:

    cd /etc/nginx

in sites-available create un file di configurazione chiamato dotnetpass.conf e copiate la seguente configurazione

    server {     listen 443 ssl;     listen [::]:443 ssl;     server_name   example.com www.example.com;         ssl_certificate /etc/letsencrypt/live/youraccount/fullchain.pem; # managed by Certbot   ssl_certificate_key /etc/letsencrypt/live/youraccount/privkey.pem; # managed by Certbot   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot       location / {        proxy_pass         https://localhost:5001;        proxy_http_version 1.1;        proxy_set_header   Upgrade $http_upgrade;        proxy_set_header   Connection keep-alive;        proxy_set_header   Host $host;        proxy_cache_bypass $http_upgrade;        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;        proxy_set_header   X-Forwarded-Proto $scheme;    }}server {    if ($host = www.example.com) {        return 301 https://$host$request_uri;    } # managed by Certbot    if ($host = example.com) {        return 301 https://$host$request_uri;    } # managed by Certbot        listen 80;     listen [::]:80;     server_name example.com www.example.com;    return 404; # managed by Certbot}

Abilitiamo infine la configurazione creando un link alla cartella sites-enabled:

Modificate la stringa server_name con il vostro dominio a disposizione, esempio: dotnet.vostrodominio.com

Nella stringa ssl_certificate & ssl_certificate:_key inserite la posizione dei vostri certificati CERTBOT

Abilitiamo infine la configurazione creando un link alla cartella sites-enabled:

    ln -s /etc/nginx/sites-availables/dotnetpass.conf /etc/nginx/sites-enabled/dotnetpass.conf

A questo punto ricarichiamo le configurazioni di Nginx:

    sudo service nginx restart

Se non restituisce errori è andato tutto a buon fine.

Proseguiamo con l'abilitazione del certificato SSL per il nostro dominio:

    certbot --nginx -d ilvostrodominio.com -d www.ilvostrodominio.com -d dotnet.vostrodominio.com -d www.dotnet.vostrodominio.com

Avviamo finalmente la nostra applicazione:

    cd /var/www/aspnetappdotnet run

che dovrebbe ora essere disponibile sul dominio da noi scelto.