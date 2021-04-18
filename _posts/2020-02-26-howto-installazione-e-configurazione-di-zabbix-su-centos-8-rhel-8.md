---
title: '#howto - Installazione e configurazione di Zabbix su Centos 8/RHEL 8'
published: 2020-02-26
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql  
  - php  
  - rhel  
  - bash
---
Zabbix è una piattaforma Open source per il monitoraggio di server e servizi in rete, che mette a disposizione una semplice interfaccia da cui poterne gestire l'operatività.

In questa guida vediamo come installare questo strumento su Centos 8 e RHEL 8.

## Requisiti
- Un web server Apache con supporto a php
- Un server SQL compatibile. (vedi prossima sezione) con uno dei seguenti database: MySQL, PostgreSQL, SQLite. (in questa guida vediamo l'installazione di MariaDB per MySQL)

## Installazione di MariaDB
Zabbix supporta diverse tipologie di server SQL: MySQL, PostgreSQL, SQLite.
In questa guida vediamo l'installazione di MariaDB per MySQL.

Per prima cosa installiamo il pacchetto **mariadb-server** via *dnf*:
```bash
dnf install mariadb-server
```
successivamente abilitiamo ed avviamo il servizio via *systemctl*:
```bash
systemctl enable mariadb
systemctl start mariadb
```
possiamo eventualmente controllarne lo stato sfruttando la flag *status*:
```bash
systemctl status mariadb
```
Proseguiamo l'installazione di MariaDB con la procedura guidata, digitiamo quindi `mysql_secure_installation` e seguiamo le istruzioni a schermo, ricordandoci di:

- Annotare la password dell'utente root
- Disabilitare l'accesso remoto all'utente root

## Creazione del database
Andremo ora a creare un database da dedicare a Zabbix. Effettuiamo il login alla console mysql:
```bash
mysql -u root -p
```
ed inseriamo la password root precedentemente annotata quando richiesto.

Nel nostro esempio andremo a creare un database di nome *zabbix* con utente dedicato di nome *zabbix* e password *la_mia_password*, ricordate di cambiare la password.

Creiamo il database:
```SQL
CREATE DATABASE zabbix;
```
ed un nuovo utente:
```SQL
CREATE USER zabbix IDENTIFIED BY 'la_mia_password';
```
ed impostiamo i permessi:
```SQL
GRANT ALL PRIVILEGES ON zabbix.* TO zabbix;
FLUSH PRIVILEGES;
```

## Installazione
Arriviamo al dunque ed installiamo la piattaforma in questione. Prima di tutto aggiungiamo la repository ufficiali per le release LTS:
```bash
rpm -Uvh https://repo.zabbix.com/zabbix/4.0/rhel/8/x86_64/zabbix-release-4.0-2.el8.noarch.rpm
```
puliamo la cache dei pacchetti di sistema e facciamo riconoscere la nuova repository al sistema via dnf:
```bash
dnf clean all
dnf repolist
```
Procediamo infine con l'installazione dei pacchetti necessari:
```bash
dnf -y install zabbix-server-mysql zabbix-web-mysql zabbix-agent
```

## Popoliamo il database
Ciò che andremo a fare ora è popolare il database che abbiamo precedentemente creato, con dei dati base in modo da renderlo compatibile e leggibile da Zabbix.

Entriamo in locazione `/usr/share/doc/zabbix-server-mysql` ed estraiamo il contenuto di *create.sql.gz*:
```bash
gzip -d create.sql.gz
```
e sfruttiamo la console mysql per importarlo nel nostro database:
```bash
mysql -u zabbix -p zabbix < create.sql
```
* stiamo effettuando il login con l'utente *zabbix* e dobbiamo perciò fornire *la_mia_password* quando richiesto.

## Configurazione
La configurazione è semplice, tutto ciò che dobbiamo fare è dire a Zabbix a quale database accedere. Modifichiamo il file `/etc/zabbix/zabbix_server.conf` ed aggiorniamo i dati:
```bash
...
DBHost=localhost
DBPassword=la_mia_password
...
```
Ora abilitiamo ed avviamo il servizio:
```bash
systemctl enable zabbix-server
systemctl start zabbix-server
```
Possiamo controllare eventuali errori nella configurazione sfruttando la flag *status*:
```bash
systemctl status zabbix-server
```
o via `journalctl` per maggiori informazioni:
```bash
journalctl -xe
```

Accertati che tutto funzioni correttamente, riavviamo il servizio Apache:
```bash
systemctl restart httpd
```

## Configurazione di firewalld e SELinux
Per il corretto funzionamento dobbiamo aprire le porte standard per i servizi *http* e *https*:
```bash
firewall-cmd --add-service={http,https} --permanent
firewall-cmd --add-port={10051/tcp,10050/tcp} --permanent
```
una volta completato ricarichiamo le regole di firewalld:
```bash
firewall-cmd --reload
```

### SELinux
Nel caso SELinux fosse abilitato sul server, dobbiamo istruirlo in modo da evitare conflitti. Per prima cosa installiamo alcuni pacchetti fondamentali:
```bash
dnf install policycoreutils checkpolicy setroubleshoot-server
```

Creiamo una nuova directory `~/zabbix-selinux` dove andremo a posizionare le nuove policy dedicare a Zabbix e creiamo al suo interno il file `zabbix_server_add.te` col seguente contenuto:
```
module zabbix_server_add 1.1;

require {
        type zabbix_var_run_t;
        type tmp_t;
        type zabbix_t;
        class sock_file { create unlink write };
        class unix_stream_socket connectto;
        class process setrlimit;
        class capability dac_override;
}

#============= zabbix_t ==============

#!!!! This avc is allowed in the current policy
allow zabbix_t self:process setrlimit;

#!!!! This avc is allowed in the current policy
allow zabbix_t self:unix_stream_socket connectto;

#!!!! This avc is allowed in the current policy
allow zabbix_t tmp_t:sock_file { create unlink write };

#!!!! This avc is allowed in the current policy
allow zabbix_t zabbix_var_run_t:sock_file { create unlink write };

#!!!! This avc is allowed in the current policy
allow zabbix_t self:capability dac_override;
```
Ora controlliamo, generiamo e carichiamo la nuova policy:
```bash
checkmodule -M -m -o zabbix_server_add.mod zabbix_server_add.te
semodule_package -m zabbix_server_add.mod -o zabbix_server_add.pp
semodule -i zabbix_server_add.pp
```
infine modifichiamo alcuni parametri booleani per SELinux ed abilitiamo la nuova policy:
```bash
setsebool -P httpd_can_network_connect 1
setsebool -P httpd_can_connect_zabbix 1
setsebool zabbix_can_network on
```

Se tutto è stato impostato nel modo corretto, visitando l'indirizzo IP del server seguito dalla path `/zabbix`, ci troveremo davanti alla schermata di prima configuraione guidata.


Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).