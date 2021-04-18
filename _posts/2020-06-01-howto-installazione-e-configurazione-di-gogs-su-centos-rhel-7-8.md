---
title: '#howto - Installazione e configurazione di Gogs su Centos/RHEL 7/8'
published: 2020-06-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - github  
  - bash
---
**Gogs** è un servizio git self-hosted. Rispetto a GitLab e similari, questo si presenta come un sistema molto leggero e performante.

L'installazione non è complessa, ma richiede diversi passaggi. La guida è applicabile sia a Centos/RHEL 7 che 8.

Di base sono supportate diverse tipologie di database:
* MySQL
* PostgreSQL
* SQLite3
* MSSQL
* TiDB

Nel nostro esempio useremo PostgreSQL, ma è possibile sfruttare qualsiasi altro database mutando semplicemente la configurazione.

## Installazione di PostgreSQL
Procediamo all'installazione via `yum`:

```bash
yum install postgresql-server postgresql-contrib
```

ed inizializziamo il database principale:

```bash
postgresql-setup initdb
```

## Configurazione di PostgreSQL
In questa sezione andiamo a configurare PostgreSQL per renderlo funzionante solo su IP locale.

Effettuiamo l'accesso come utente *postgres*:

```bash
su - postgres
```

e modifichiamo il file in posizione `data/postgresql.conf`, nella sua home:

```bash
nano data/postgresql.conf
```

nello specifico cerchiamo (`CTRL+W`) il parametro *listen_addresses* ed eliminiamo il commento che lo precede. In questo modo la linea dovrebbe corrispondere alla seguente:

```bash
listen_addresses = '127.0.0.1'
```

terminata la modifica salviamo (`CTRL+X`).

Infine, abilitiamo ed avviamo il servizio via `systemctl`:

```bash
systemctl start postgresql
systemctl enable postgresql
```
 
## Preparazione database
Ora, andiamo a creare il database da dedicare all'installazione di Gogs. Accertiamoci di essere ancora nella sessione dell'utente *postgres* e **se così non fosse**:

```bash
su - postgres
```

ed entriamo nella console dando il comando `psql`.

Procediamo quindi alla creazione del database che in questa guida chiameremo `gogs`:

```sql
CREATE DATABASE gogs;
```

creiamo anche l'utente `gogs` a cui daremo (per esempio) come password `gogs_password` (questa andrà cambiata):

```sql
CREATE USER gogs WITH ENCRYPTED PASSWORD 'gogs_password';
GRAND ALL PRIVILEGES ON DATABASE gogs to gogs
exit
```

Terminato, usciamo dalla sessione di postgres con `exit`.

## Installazione di Git
Git è necessario ai prossimi step, fate riferimento a <a href="https://linuxhub.it/articles/howto-installazione-di-git-su-ogni-distribuzione-linux">questa</a> guida per l'installazione.

## Installazione di Go
Assicuriamoci di essere in una posizione pulita e scarichiamo *go* dalla fonte ufficiale (reperibile <a href="https://golang.org/dl/">qui</a>):

```bash
wget https://dl.google.com/go/go1.14.3.linux-amd64.tar.gz
```

scompattiamo l'archivio:

```bash
tar -xf go*.linux-amd64.tar.gz
```

creiamo il percorso `go` nella nostra home:

```bash
mkdir ~/go
```

modifichiamo il file `~/.bash_profile` ed aggiungiamo la seguente riga alla sua fine:

```bash
export PATH=$PATH:/home/UTENTE/percorso/go/bin
```

avendo cura di modificare il percorso `/home/UTENTE/percorso/go/bin` con quello corretto. Una volta fatto ricarichiamo:

```bash
source ~/.bash_profile
```

ed ora dando il comando `go version` dovremmo ricevere in output la versione di Go installata, come prova del corretto funzionamento.

## Installazione di Gogs
Utilizzando l'opzione `get` di `go`, otteniamo gogs da GitHub:

```bash
go get -u github.com/gogits/gogs
```

Questo, una volta scaricato, sarà presente nella nostra *GOPATH*, in `/home/USER/go/`. Portiamoci al suo interno ed avviamo il build:

```bash
cd $GOPATH/src/github.com/gogits/gogs
go build
```

Una volta terminato il processo, dovremmo essere in grado di eseguire gogs dallo stesso percorso:

```bash
./gogs web
```

Nell'output che ci si presenta, facciamo riferimento all'ultima riga la quale dovrebbe essere simile alla seguente:

```bash
[INFO] Listen: http://0.0.0.0:3000
```

Facendo accesso quindi dal nostro browser al nostro IP locale, seguito dalla porta *3000*, dovremmo essere in grado di seguire la procedura guidata per la configurazione del database con i dati precedentemente salvati.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).