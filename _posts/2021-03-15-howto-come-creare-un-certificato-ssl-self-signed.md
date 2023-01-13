---
class: post
title: '#howto - Come creare un certificato SSL self-signed'
date: 2021-03-15
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
In questa nuova guida vedremo come installare sulla propria macchina un **certificato SSL self-signed**, ovvero creato da noi e non da un ente come Let's Encrypt o Digicert.

A differenza di quelli generati da queste due ultime compagnie, un certificato self-signed è molto utile nel caso in cui stessimo sviluppando in locale un'applicazione web che, per qualche motivo, si vuole usare sotto HTTPS.

Per un sito web aperto al mondo, tuttavia, l'uso di questi certificati è **altamente sconsigliato**.

## Creazione del certificato

Come prima cosa, accediamo al terminale e creiamo dove si preferisce (solitamente sotto `/etc/` o persino `/root/`) una cartella in cui andremo ad inserire i nostri certificati. Supponiamo di lavorare sotto `/etc/certs`:

```bash
mkdir /etc/certs
```

Dopo aver creato la cartella dove preferiamo, andiamo a creare il certificato con questo comando:

```bash
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out /etc/certs/cert.crt -keyout /etc/certs/mykey.key
```

Prima di procedere ad incollare, ecco una spiegazione di tutti i parametri inclusi nel comando `openssl`:

- `-newkey rsa:4096` - Questo parametro ci permette di scegliere la dimensione in bit della nostra chiave RSA. Sebbene 2048 sia il valore di default, è sempre bene specificarla manualmente.

- `-x509` - Specifica che stiamo andando a creare un certificato self-signed.

- `-sha256` - Genera il certificato utilizzando un algoritmo SHA da 256 bit.

- `-days` - Specifica la durata del certificato in giorni.

- `-nodes` - Serve a generare un certificato che non richiede una password. Senza questo parametro, bisognerà inserire la password ogni volta che l'applicazione con cui si usa il certificato viene riavviata.

- `-out` - Indica il percorso dove andremo a salvare il certificato (il nome è a scelta personale).

- `-keyout` - Indica il percorso in cui si andrà a salvare la chiave del certificato (anche qui, il nome è a scelta).

Una volta inserito il comando ci verranno chieste alcune informazioni, non essenziali da inserire se il certificato è per uso personale.

L'output sarà simile al seguente:

```bash
Generating a RSA private key
............................................................................................................................................................................................++++
...................................................................................................++++
writing new private key to '/etc/certs/MyKey.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:IT
State or Province Name (full name) [Some-State]:Piemonte
Locality Name (eg, city) []:Torino
Organization Name (eg, company) [Internet Widgits Pty Ltd]:linux/hub
Organizational Unit Name (eg, section) []:IT
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:email@dominio.com
```

## Conclusione

Dopo aver salvato il nostro certificato, dovremo usarlo nella nostra applicazione web. Per fare ciò, bisognerà specificare il percorso del certificato SSL e della sua chiave nelle configurazioni dei web server (Apache, Nginx, ecc.). Questo processo varia in base al web server che si utilizza.

