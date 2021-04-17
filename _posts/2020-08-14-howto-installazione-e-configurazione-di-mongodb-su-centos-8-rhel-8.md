---
title: '#howto - Installazione e configurazione di MongoDB su Centos 8/RHEL 8'
published: 2020-08-14
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mongodb  - centos  - bash
---
**MongoDB** è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database **NoSQL**.

Abbiamo già visto come installarlo su server Centos 7 <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-mongodb-su-centos-7">qui</a>, in questa guida tratteremo l'installazione su Centos 8 e RHEL 8.

## Preparazione repository
In questa guida useremo la repository ufficiale per l'installazione, in modo da ottenere una versione aggiornata e stabile di MongoDB.

Prima di tutto creiamo un nuovo file *mongodb-4.4.repo* repository in `/etc/yum.repos.d/`, al suo interno inseriamo le seguente istruzioni:

```bash
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

salviamo e controlliamo la presenza nella lista delle repository:

```bash
dnf repolist
```

## Installazione
Una volta impostata la repository possiamo procedere con la consueta installazione via `dnf`:

```bash
dnf install mongodb-org
```

questo installerà i seguenti pacchetti:

* mongodb-org-server
* mongodb-org-mongos
* mongodb-org-shell
* mongodb-org-tools

Ad installazione ultimata, abilitiamo il processo con l'avvio del sistema:

```bash
systemctl enable mongod
```

ed avviamo il processo:

```bash
systemctl start mongod
```

Una volta avviato questo rimarrà in ascolto sulla porta predefinita, la *27017*. Possiamo accertarci di questo dato tramite il log:

```bash
tail /var/log/mongodb/mongod.log
```

il quale dovrà restituire un output simile al seguente:

```bash
[initandlisten] waiting for connections on port 27017
```

## Configurazione
MongoDB è subito pronto all'uso e non richiede particolari configurazioni. Ciò nonostante tratteremo di seguito alcune modifiche.

### Creazione utente admin
Andremo ora a creare un utente amministratore per il server. Prima di tutto avviamo la console digitando `mongo` e passiamo al database *admin*:

```sql
use admin
```

e creiamo un nuovo utente *admin* con password a scelta:

```json
db.createUser(
  {
    user: "admin",
    pwd: "LA_MIA_PASSWORD",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

dove *LA_MIA_PASSWORD* è ovviamente la password scelta.

Una volta inviata l'istruzione, controlliamo la presenza del nuovo utente con:

```sql
show users
```

### Abilitare l'autenticazione
Ora andremo ad istruire il server ad accettare solo connessioni da utenti con i giusti permessi, in questo caso dall'utente *admin* appena creato.

Modifichiamo il file in posizione `/etc/mongod.conf` ed eliminiamo il commento dalle seguenti righe:

```bash
security
    authorization: "enabled"
```

una volta salvate le modifiche riavviamo mongodb via `systemctl`:

```bash
systemctl restart mongod
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).