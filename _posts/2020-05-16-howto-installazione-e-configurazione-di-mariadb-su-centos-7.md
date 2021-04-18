---
title: '#howto - Installazione e configurazione di MariaDB su CentOS 7'
published: 2020-05-16
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql  
  - centos  
  - bash
---
**MariaDB** è una implementazione di MySQL (per meglio dire, un fork) che porta con sé diversi miglioramenti come ad esempio un supporto più esteso ai differenti storage engine, plugin e altre funzionalità degne di nota come la precisione temporale dei log e l'implementazione dei pool di thread.

In CentOS 7 la versione disponibile nelle repository ufficiali è la 5.5.x. In questa guida vediamo come installare la versione più recente (10.x) mediante l'uso delle repository ufficiali del progetto.

> È importante tenere in considerazione che nel caso fosse già installato un server MariaDB o MySQL, è indispensabile effettuarne la rimozione ed eventuale backup in quanto questa non verrà aggiornata con la nuova repository e si finirebbe per creare conflitti di dipendenze nei pacchetti.

## Repository
Per prima cosa dobbiamo creare un nuovo file in `/etc/yum.repos.d/` dove andremo ad inserire le istruzioni per la repository:

```bash
nano /etc/yum.repos.d/MariaDB.repo
```

inseriamo al suo interno il seguente contenuto:

```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.1/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

e salviamo (`CTRL+X`su nano).

## Installazione
Una volta accertati di non aver installate altre versioni di MariaDB o MySQL, possiamo procedere con l'installazione via `yum`:

```bash
yum install MariaDB-server MariaDB-client
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
* **Reload privilege table now? (Y/N)** consiglio di effettuarlo ora *(Y)

una volta risposto a tutte le domande proviamo ad accedere come utente root:

```bash
mysql -u root -p
```

inserendo quando richiesta la password scelta precedentemente. In caso di successo ci troveremo davanti alla console MySQL:

```bash
MariaDB [(none)]>
```

e digitiamo `exit` per uscire.

Il server è ora pronto all'uso, ed è possibile modificare i parmetri impostati nella configurazione guidata modificando il file `my.cnf`, normalmente in uno di questi percorsi:

* /etc/mysql/my.cnf
* /etc/my.cnf
* ~/.my.cnf 

in base alla propria distribuzione (standard o meno).

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).