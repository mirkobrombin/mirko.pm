---
title: '#howto - Installazione e configurazione di MongoDB'
description: "Installazione di Mongo DB e cenni sui sistemi NoSQL."
date: 2020-10-22 11:00
layout: post
author: linux/hub
author_github: linuxhubit
tags:
  - mongodb  
  - systemd 
  - archlinux
  - ubuntu
  - fedora
---
**MongoDB** è un database non relazionale, basato su documenti. La sua struttura lo colloca nella classifica dei database **NoSQL**.



## NoSQL - excursus

Senza addentrarsi in troppi dettagli, è stato ritenuto opportuno fornire un breve spazio informativo a cosa sia l'approccio **Not Only SQL**.   
La prima precisazione, doverosa da farsi, è che *NoSQL non significhi No-SQL* come purtroppo pensano molti, ma come svela invece l'acronimo significa "*non solo SQL*"; questa disambiguazione è importante a capirsi poiché anche i dati NoSQL sono strutturati.

Mentre la filosofia SQL si basa sui principi ACID ( che impongono al database di godere delle proprietà di Atomicità, Consistenza, Isolamento e Durabilità ), la filosofia NoSQL vuole rilassarne alcuni vincoli creando i principi **BASE**.



### Teorema CAP 

Nel 1998 un professore di informatica dell'università californiana Berkeley, tale Brewer, teorizza attraverso un enunciato che non è possibile per un sistema di database distribuito ( ovvero condiviso tra più calcolatori in diversi luoghi fisici contemporaneamente ) offrire queste proprietà: 

- **C**onsistenza 
- disponibilità (dall'inglese **A**vaibility )
- tolleranza di **P**artizione ( ovvero la tolleranza alla perdita di informazioni e malfunzionamenti )

Da queste e altre considerazioni nasce il principio **BASE** (ovvero **B**asically **A**vailable **S**oft-state (services with) **E**ventual consistency) che è alla base dei sistemi NoSQL, ciò enuncia che rilassando il principio di consistenza dei DBMN è possibile garantire disponibilità, isolamento e durabilità.   

In realtà ciò non significa che questi sistemi non godono di consistenza, ma causa ritardi ed eventuali fallimenti di comunicazione non possono essere garantiti in tempi reali.

## Installazione di MongoDB

Seguono le istruzioni per installare su diverse distribuzioni **mongodb**

### Debian e derivate

Per prima cosa dobbiamo installare il pacchetto **mongodb** dal gestore pacchetti:

    apt install -y mongodb

questo è in realtà un metapackage che andrà ad installare un totale di 5 pacchetti:

*   `mongodb-org-server`
*   `mongodb-org-mongos`
*   `mongodb-org-shell`
*   `mongodb-org-tools`



### Archlinux e derivate

Su archlinux troviamo i vari pacchetti su AUR, in particolare per il cli possiamo scegliere tra: 

- [mongodb](https://aur.archlinux.org/packages/mongodb/)  : il pacchetto da compilare direttamente tramite sorgente

- [mongodb-bin](https://aur.archlinux.org/packages/mongodb-bin/) : pacchetto precompilato

Proviamo ad installare il secondo: 

```bash
git clone https://aur.archlinux.org/packages/mongodb-bin/
cd mongodb-bin
makepkg -si 
```

Ovviamente possiamo usare anche un **AUR-helper**.  

Inoltre esiste un pacchetto con diversi strumenti utili di mongo, i [mongodb-tools](https://aur.archlinux.org/packages/mongodb-tools/) ( o se lo volete precompilato i [mongodb-tools-bin](https://aur.archlinux.org/packages/mongodb-tools-bin/) ).

Allo stesso modo possiamo installarlo con un AUR-Helper oppure manualmente: 

```bash
git clone https://aur.archlinux.org/packages/mongodb-tools-bin/
cd mongodb-tools-bin
makepkg -si
```



### Fedora e distro con dnf/yum package manager

Per installare mongodb su fedora aggiungiamo prima i repository, andiamo a creare con il nostro editor preferito un nuovo file tra i repository:

```bash
nano /etc/yum.repos.d/mongodb-4.4.repo
```

E scriviamo al suo interno:

```bash
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

Quindi aggiorniamo dnf:

```bash
dnf update
```

E installiamo mongo:

```bash
dnf install mongodb-org
```



> Se non avete dnf, provate con `yum`



## Configurazione con systemd

procediamo con l'abilitazione e l'avvio del servizio via **systemctl**:

```bash
systemctl enable mongodbsudo systemctl start mongodb
```

richiedendone quindi lo stato:
```bash
systemctl status mongodb
```
dovremmo ricevere un output simile al seguente:
```
    mongodb.service - An object/document-oriented database   
    Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)   
    Active: active (running) since Wed 2019-08-07 17:55:43 BST; 38min ago     
    ..
    Started An object/document-oriented database.
```
Possiamo procedere nel seguente modo per ottenere una seconda verifica del suo funzionamento:
```bash
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```
ottenendo quindi un esito simile al seguente:
```
    MongoDB shell version: 3.2.11
    connecting to: test{        
      "authInfo" : {                
        "authenticatedUsers" : [ ],                
        "authenticatedUserRoles" : [ ]        
        },        
        "ok" : 1
      }
```
dove **ok: 1** è la conferma che il server funziona correttamente.

## Configurazione

Per impostazione base MongoDB è configurato per funzionare nella maggior parte delle casistiche, unico accorgimento è quello di modificare l'indirizzo IP a cui è consentita la connessione. Infatti di default resta in ascolto sull'indirizzo locale **127.0.0.1** per consetire a MongoDB di funzionare con un IP pubblico ci basta modificare le impostazioni con il seguente comando:

    sudo nano /etc/mongodb.conf

andiamo quindi a modificare come segue:

    bind_ip = 127.0.0.1, NOSTRO_IP#port = 27017

dove **NOSTRO_IP** è ovviamente il nostro indirizzo IP a cui vogliamo abilitare l'accesso.

Ultimate le modifiche riavviamo il servizio via systemctl:

    sudo systemctl restart mongodb

