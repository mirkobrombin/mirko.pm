---
class: post
title: '#howto - Installazione e configurazione di MariaDB su CentOS 8/RHEL 8'
date: 2020-09-07
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - mysql  - centos  - rhel  - bash
---
**MariaDB** è una implementazione di MySQL che porta con sé diversi miglioramenti come ad esempio un supporto più esteso ai differenti storage engine, plugin e altre funzionalità degne di nota come la precisione temporale dei log.

> Questa guida è indicata per Centos 8, RHEL 8 e derivate. Per CentOS 7 e RHEL 7, fate riferimento a <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-mariadb-su-centos-7">questa guida</a>.

In CentOS 8/RHEL 8, MariaDB è fornito dalle repo di sistema alla versione 5.5.x. Si tratta di una versione stabile ma comunque poco recente, per tale motivo andremo ad installare l'ultima versione offerta dalle repo ufficiali del progetto.

> È importante tenere in considerazione che nel caso fosse già installato un server MariaDB o MySQL, è indispensabile effettuarne la rimozione ed eventuale backup in quanto questa non verrà aggiornata con la nuova repository e si finirebbe per creare conflitti di dipendenze nei pacchetti.

## Configurazione repository
Per prima cosa dobbiamo aggiungere la repository ufficiale del progetto nel sistema, e per fare ciò andiamo a creare un nuovo file in `/etc/yum.repos.d/` dove andremo ad inserire le istruzioni della repository.

Per **CentOS 8** il contenuto è il seguente:

```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos8-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

mentre per **RHEL 8**:

```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/rhel8-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

## Installazione
Una volta accertati di non aver installate altre versioni di MariaDB o MySQL, possiamo procedere con l'installazione via *dnf* (che da CentOS 8 e RHEL 8 sostituisce *yum*:

```bash
dnf install MariaDB-server MariaDB-client
```

completato il processo accertiamoci sia installata la versione corretta, sfruttando l'opzione `-V` del comando `mysql`:

```bash
mysql -V
```

Infine abilitiamo via `systemctl` il servizio con l'avvio del sistema:

```bash
systemctl enable mariadb
```

ed avviamolo:

```bash
systemctl start mariadb
```

## Configurazione
Oltre a server e client, viene fornito un sistema di configurazione guidata, raggiungibile da comando:

```bash
mysql_secure_installation
```

Una volta eseguito ci troveremo di fronte un questionario a cui rispendere in base alle proprie esigenze:
* **Change the root password? (Y/N)** questo cambierà la password dell'utente di root, consiglio di rispondere si *(Y)*. Fatto ciò, inseriamo la nuova password e salviamola
* **Remove anonymous users? (Y/N)** questo andrà ad eliminare l'accesso con utenti anonimi, consigliato *(Y)*
* **Disallow remote login? (Y/N)** questo implica se l'accesso al server potrà essere eseguito in remoto, ossia tramite IP pubblico o dominio del server. Nel caso non aveste particolari necessità, vi consigliamo di disattivarlo *(N)*
* **Remove test database? (Y/N)** si tratta del database di test interno, normalmente inutile
* **Reload privilege table now? (Y/N)** consiglio di effettuarlo ora *(Y)*

una volta risposto a tutte le domande proviamo ad accedere come utente root:

```bash
mysql -u root -p
```

inserendo quando richiesta la password scelta precedentemente. In caso di successo ci troveremo davanti alla console MySQL:

```bash
MariaDB [(none)]>
```

e digitiamo `exit` per uscire.

Il server è ora pronto all'uso, ed è possibile modificare i parametri impostati nella configurazione guidata modificando il file `my.cnf`, normalmente in uno di questi percorsi:

* /etc/mysql/my.cnf
* /etc/my.cnf
* ~/.my.cnf 

in base alla propria distribuzione (standard o meno).

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).