---
title: '#howto - Impostare un reverse proxy di un server NodeJS su Nginx'
description: "NodeJS è una runtime di JavaScript costruita sul motore V8 di Chrome che viene utilizzata principalmente per real.."
published: 2020-04-10
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - nginx  
  - debian  
  - nodejs  
  - centos  
  - rhel  
  - bash
---
**NodeJS** è una runtime di JavaScript costruita sul motore V8 di Chrome che viene utilizzata principalmente per realizzare applicazioni web come siti statici o veri e propri CMS.

Per accedere ad una risorsa che gira su NodeJS solitamente è necessario visitare un dominio o un indirizzo IP seguito da una porta specifica, ma sono molteplici i casi in cui si vorrebbe che funzionasse tramite i protocolli HTTP e, più consigliato, HTTPS.

In questa guida vedremo come impostare il **reverse proxy** di un server NodeJS sul server web **Nginx** in diverse distribuzioni.

## Installazione di NodeJS

Per prima cosa è necessario installare NodeJS sul proprio sistema: ciò si può fare sfruttando un package manager, come *apt* o *yum*, oppure utilizzando *Node Version Manager*, un piccolo strumento che permette comodamente di gestire più versioni di Node allo stesso tempo. Nel caso foste interessati ad utilizzarlo su Debian 9, vi rimandiamo ad una nostra [precedente guida](https://linuxhub.it/articles/howto-installare-node-version-manager-nvm-su-debian-9).

### Debian e Ubuntu

Per installare NodeJS su **Debian** e derivate, come **Ubuntu**, possiamo utilizzare i pacchetti pre-compilati disponibili sulle repo del sito ufficiale del programma. Innanzitutto, accertiamoci di aver installato *curl*:

```bash
curl -V
```

Nel caso curl non fosse installato, si può rimediare utilizzando apt:

```bash
sudo apt-get install curl

```

Ora, procediamo ad aggiungere la repo della versione 12 di NodeJS, l'ultima LTS, sul nostro sistema:

```bash
# Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# Debian
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -

```

E installiamo NodeJS:

```bash
sudo apt-get update
sudo apt-get install nodejs
```

Controlliamo che NodeJS sia stato installato correttamente:

```bash
nodejs --version
```

L'output dovrebbe essere simile al seguente:

```bash
v12.16.1
```

### CentOS e Fedora

Come già discusso in precedenza, anche su CentOS e Fedora dobbiamo accertarci di avere installato curl nel nostro sistema. Facciamolo con il seguente comando:

```bash
curl -V
```

Nel caso non fosse installato, rimediamo grazie al package manager yum:

```bash
sudo yum install curl
```

Aggiungiamo al sistema la repo di NodeJS 12:

```bash
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
```

E installiamo NodeJS:

```bash
sudo yum install nodejs
```

Controlliamo che NodeJS sia stato installato correttamente:

```bash
nodejs --version
```

L'output dovrebbe essere simile al seguente:

```bash
v12.16.1
```

## Creazione di un'app con NodeJS

Creare un'applicazione con NodeJS è molto semplice. Per prima cosa, creiamo una nuova cartella ed entriamoci:

```bash
mkdir cartellaprogetto
cd cartellaprogetto
```

Ed installiamo il framework web *express*:

```bash
npm install express
```

Dopodichè, creiamo il file principale dell'applicazione con il proprio editor preferito (in questo caso nano):

```
nano app.js
```

E scriviamo il seguente codice in **JavaScript**:

```javascript
var express = require('express');
var app = express();
app.get('/', function(req, res){
   res.send("Prova");

});
app.listen(3000, '127.0.0.1');
```

Chiudiamo l'editor e salviamo il file.

In questo file abbiamo richiesto l'esplicito utilizzo di express, abbiamo inizializzato un'applicazione con esso e abbiamo fatto in modo che la risposta a localhost:3000 o 127.0.0.1:3000 sia un semplice "Prova". La porta **non deve** necessariamente essere 3000.

## Esecuzione di un'app con NodeJS

Abbiamo scritto la nostra prima applicazione, ed è il momento di eseguirla con NodeJS, che avvieremo con il seguente comando:

```bash
node app.js
```

Ora, visitando 127.0.0.1:3000 o localhost:3000, se tutto funziona correttamente, dovremmo trovarci di fronte ad una semplice pagina con scritto "Prova".

## Configurazione di Nginx come reverse proxy per NodeJS

Innanzitutto, assicuriamoci di aver installato **Nginx** sulla nostra distribuzione preferita: per Debian vi rimandiamo a [questa guida](https://linuxhub.it/articles/howto-installazione-e-configurazione-con-let%E2%80%99s-encrypt-di-nginx-su-debian-10), mentre per CentOS e Fedora a [quest'altra](https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl).

Creiamo un virtual host:

```bash
# Debian e Ubuntu
sudo nano /etc/nginx/sites-enabled/app.conf

# CentOS e Fedora
sudo nano /etc/nginx/conf.d/app.conf
```

E inseriamo la seguente configurazione:

```nginx
server {
    listen 80;
    server_name miodominio.tld;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }
}
```

Il valore del parametro *listen* indica la porta del server web su cui deve rispondere l'applicazione, mentre quello di *proxy_pass* indica l'indirizzo IP e la porta di cui effettuare il reverse proxy, in questo caso 3000.

Riavviamo Nginx:

```bash
sudo systemctl restart nginx

```

Riavviamo per sicurezza l'applicazione in NodeJS nel caso non fosse in esecuzione:

```bash
node app.js
```

E, se tutto è stato configurato correttamente, visitando miodominio.tld dovremmo trovarci di fronte alla pagina con scritto "Prova" che abbiamo impostato in precedenza.

## Conclusione

In questa guida avete imparato come installare NodeJS, creare un'applicazione base ed effettuare il reverse proxy su Nginx.

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://t.me/gentedilinux).