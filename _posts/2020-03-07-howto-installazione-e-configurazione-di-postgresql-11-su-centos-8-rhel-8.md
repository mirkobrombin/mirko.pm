---
title: '#howto - Installazione e configurazione di PostgreSQL 11 su Centos 8/RHEL 8'
published: 2020-03-07
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash  - systemd  - bash  - systemd
---
**PostgreSQL** è un DBMS (Base di dati a oggetti) completo ed Open source, uno dei più performanti disponibili.

In questa guida vediamo come installarlo su sistemi **Centos 8/RHEL 8**, nello specifico andremo ad installare la release 11 sfruttando le repository ufficiali del progetto.

## Configurazione repository
Il primo step è quello di aggiungere la repository ufficiale, possiamo farlo via *dnf*:
```bash
dnf install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```
ricordiamoci di disabilitare il modulo `postgresql` da *dnf* per evitare possibili conflitti con la nuova release:
```bash
dnf module disable postgresql
```
infine puliamo la cache dei pacchetti di sistema e facciamo riconoscere la nuova repository al sistema:
```bash
dnf clean all
dnf repolist
```

## Installazione
Andiamo ora ad installare i due pacchetti fondamentali, `postgresql11-server` e `postgresql11`, che indicano server e client:
```bash
dnf install install postgresql11-server postgresql11
```
Una volta completata l'installazione è necessario inizializzare il database di PostgreSQL:
```bash
/usr/pgsql-11/bin/postgresql-11-setup initdb
```
completato il processo abilitiamo ed avviamo il servizio:
```bash
systemctl enable postgresql-11
systemctl start postgresql-11
```
così facendo verrà eseguito con l'avvio del sistema. Possiamo verificarne il corretto funzionamento invocando lo stato del servizio sempre via *systemctl*:
```bash
systemctl status postgresql-11
```
> Scopri di più sul comando `systemctl` leggendo <a href="https://linuxhub.it/articles/howto-introduzione-a-systemd">qui</a> l'introduzione dedicata.

## Configurazione
Per prima cosa modifichiamo la password per l'utente admin postgres e ricordiamoci di salvarla. Per farlo, efettuiamo l'accesso come utente **postgres**:
```bash
sudo su - postgres 
```
e modifichiamo la password sfruttando la console attraverso `psql`:
```sql
psql -c "alter user postgres with password 'la_mia_nuova_password'" 
ALTER ROLE
```

L'installazione è completa ed il nostro server PostgreSQL è pronto all'uso.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).