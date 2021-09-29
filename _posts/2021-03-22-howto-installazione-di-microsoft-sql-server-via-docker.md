---
title: '#howto - Installazione di Microsoft SQL Server via Docker'
date: 2021-03-22
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ubuntu  
  - fedora  
  - docker
---
**Microsoft SQL** è un DBMS (Database management system) relazionale ad alta performanca, sviluppato dalla omonima azienda e distribuito per tutti i sistemi operativi Linux, MacOS e Windows.

In questa guida vedremo come installarlo su qualsiasi distribuzione Linux tramite l'utilizzo di **Docker**, il quale ci permette di sfruttare una versione containerizata di Microsoft SQL.

## Installazione Docker
Docker è disponibile per quasi tutte le distribuzioni Linux, ed è spesso reperibile dalle stesse repository di sistema. Basterà quindi installare il pacchetto `docker` o `docker-ce` tramite il gestore pacchetti di sistema per ottenerlo.

Purtroppo, però, molto spesso questi pacchetti vengono aggiornati con bassa frequenza e sono datati. Dato che per Microsoft SQL necessitiamo di una versione relativamente recente di Docker, vediamo come installare la più recente sulle principali distribuzioni Linux.

### Ubuntu e derivate
Prima di procedere con l'installazione della repository di Docker, scarichiamo alcuni pacchetti necessari:

```bash
apt install apt-transport-https ca-certificates curl gnupg lsb-release
```

ed aggiungiamo la chiave GPG di Docker:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Aggiungiamo la nuova repository:

```bash
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

e procediamo con l'installazione di Docker:

```bash
apt update
apt install docker-ce docker-ce-cli containerd.io
```

### Fedora/Centos/RHEL 8 e derivate
Installiamo il pacchetto `dnf-plugins-core`, il quale ci permetterà di gestire le repository direttamente da DNF, il gestore pacchetti di sistema:

```bash
dnf install install dnf-plugins-core
```

Anche qui, aggiungiamo la repository:

```bash
dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

ed installiamo Docker:

```bash
dnf install docker-ce docker-ce-cli containerd.io
```

## Installazione Microsoft SQL Server
Dopo aver installato Docker, assicuriamoci che il suo servizio sia in esecuzione:

```bash
systemctl enable docker
systemctl start docker
```

ed otteniamo l'ultima immagine di Microsoft SQL Server:

```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

Ora che l'immagine è presente nel sistema, possiamo avviare il nostro server:

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" \
   -p 1433:1433 --name sql1 -h sql1 \
   -d mcr.microsoft.com/mssql/server:2019-latest
```

avendo l'accortezza di modificare e annotare i parametri:
- `-e "ACCEPT_EULA=Y"` serve a confermare i termini della licenza software
- `-e "SA_PASSWORD=<YourStrong@Passw0rd>"` sarà la nostra password
- `-p 1433:1433` definisce la porta in cui viene eseguito il software e quella in cui sarà disponibile
- `--name sql1` definisce il nome del nostro container
- `-h sql1` forza l'hostname all'interno del container
- `mcr.microsoft.com/mssql/server:2019-latest` è il nome dell'immagine precedentemente scaricata

Possiamo assicurarci che questo sia in esecuzione tramite il comando `doker`:

```bash
docker ps -a
```

il quale ritornerà la lista dei container con il loro relativo stato.

Ci sono diversi aspetti da considerare nella gestione del server SQL. Per questi vi rimando alla [documentazione ufficiale](https://docs.microsoft.com/it-it/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash#change-the-sa-password) sul sito di Microsoft.

