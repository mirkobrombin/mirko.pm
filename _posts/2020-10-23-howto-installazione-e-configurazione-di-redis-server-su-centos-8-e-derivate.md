---
title: '#howto - Installazione e configurazione di Redis Server su CentOS 8 e derivate'
published: 2020-10-23
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - centos  
  - bash
---
**Redis** è un programma archivio chiave-valore in memoria gratuito e open source che supporta diversi tipi di strutture dati. Può essere utilizzato come database, come cache oppure molto altro ancora. Spesso viene utilizzato per creare applicazioni scalabili e che hanno bisogno di una grande performance.

In questa guida vedremo come installare Redis Server su **CentOS 8** e distribuzioni derivate.

## Installazione di Redis Server

Il pacchetto Redis è disponibile nel repository predefinito di CentOS 8, ed è possibile installarlo tramite `dnf`:

```bash
dnf install redis
```

Dopo averlo installato, avviamolo e facciamo in modo che venga eseguito all'avvio del sistema, questo via *systemctl*:

```bash
systemctl start redis
systemctl enable redis
```

Possiamo verificarne l'effettiva esecuzione con l'opzione `status`:

```bash
systemctl status redis
```

il quale dovrà ritornare un output simile al seguente:

```bash
   Loaded: loaded (/usr/lib/systemd/system/redis.service; disabled; vendor preset: disabled)
  Drop-In: /etc/systemd/system/redis.service.d
           ??limit.conf
   Active: active (running) since Mon 2020-10-19 11:28:27 CEST; 6s ago

 Main PID: 3712 (redis-server)

    Tasks: 4 (limit: 12527)
   Memory: 12.47M

   CGroup: /system.slice/redis.service
           ??3712 /usr/bin/redis-server 127.0.0.1:6379


Oct 19 11:28:27 centos8 systemd[1]: Starting Redis persistent key-value database...

Oct 19 11:28:27 centos8 systemd[1]: Started Redis persistent key-value database.
```

Eseguiamo `redis-cli` per verificare che sia effettivamente disponibile:

```bash
redis-cli
```

nella console che ci si presenta, digitiamo `ping` per verificarne la connettività:

```bash
127.0.0.1:6379> ping
```

nel caso fosse tutto configurato correttamente, l'esito sarà il seguente:

```bash
PONG
```

## Configurazione di Redis Cache

Una volta installato Redis dovremo configurarlo per fare in modo che funga da servizio di caching. Per fare ciò, apriamo il file di configurazione con un qualsiasi editor di testo:

```bash
nano /etc/redis.conf
```

e alla fine aggiungiamo le seguenti righe:

```bash
maxmemory 128mb
maxmemory-policy allkeys-lru
```

Il valore di *maxmemory* indica la memoria che Redis deve utilizzare, mentre il valore di *maxmemory-policy*, in questo caso *allkeys-lru*, specifica che cosa deve fare il programma una volta raggiunta la memoria massima allocata. Con *allkeys-lru*, ad esempio, diciamo a Redis di eliminare le chiavi provando a rimuovere prima le chiavi usate meno di recente (LRU), in modo da fare spazio per i nuovi dati aggiunti.

Una volta modificato il file, riavviamo il servizio:

```bash
systemctl restart redis
```

### Sicurezza di Redis

Come standard, `redis-cli` consente di eseguire qualsiasi comando all'interno della shell, e per questo motivo sarebbe necessario proteggere la shell utilizzando una password. Modificando il file di configurazione di Redis:

```bash
nano /etc/redis.conf
```

cerchiamo la seguente riga:

```bash
# requirepass foobared
```

togliamo il commento e cambiamo la password in una sicura e di nostra preferenza:

```bash
requirepass password
```

e riavviamo il servizio:

```bash
systemctl restart redis
```

In questo modo, provando ad eseguire un comando come:

```bash
127.0.0.1:6379> INFO server

```

dovremmo ricevere un messaggio che ci bloccherà l'accesso. Per accedere con la nostra password dovremo invece scrivere nella shell di Redis:

```bash
127.0.1:6379> AUTH password
```

#### Comandi pericolosi

È buona norma, in realtà, rinominare alcuni **comandi pericolosi** all'interno della shell di Redis, come "config", che, se eseguiti, possono fornire dati sensibili che magari uno preferisce nascondere.

Per rinominare il comando *config*, con cui si può recuperare la password in questo modo:

```bash
127.0.0.1:6379> config get requirepass
```

andiamo a modificare il file di configurazione di Redis:

```bash
nano /etc/redis.conf
```

cerchiamo la seguente riga:

```bash
# rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
```

e al posto della lunga stringa dopo *config* inseriamo un valore a nostro piacere:

```bash
rename-command CONFIG nuovo_comando_config
```

Fatto ciò riavviamo Redis:

```bash
systemctl restart redis
```

e proviamo a rieseguire il comando *config* con i parametri *get* e *requirepass*:

```bash
127.0.0.1:6379> config get requirepass
```

Se tutto ha funzionato a dovere, si dovrebbe ottenere un errore come il seguente:

```bash
(error) ERR unknown command `config`, with args beginning with: `get`, `requirepass`,

```

Sostituendo "config" con il comando da noi dato nel file di configurazione:

```bash
127.0.0.1:6379> nuovo_comando_config get requirepass
```

dovremmo riuscire ad ottenere la nostra password.



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).