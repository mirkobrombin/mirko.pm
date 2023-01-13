---
class: post
title: '#howto - Installazione e configurazione di VNC Server su CentOS/RHEL 8'
date: 2020-07-22
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos
  - rhel
---
**VNC** è un'applicazione per la condivisione del desktop in rete. Utilizza il protocollo Remote Frame Buffer e funziona su un modello client/server.

In questa guida vediamo nello specifico come installare su CentOS 8 un server VNC a cui possiamo successivamente accedere da client.

## Installazione
Andremo ad installare `TigerVNC` tramite il pacchetto `tigervnc-server` presente nelle repository di sistema. Procediamo con *dnf* (che in Centos/RHEL 8 sostituisce *yum*):

```bash
dnf install tigervnc-server tigervnc-server-module
```

### SELinux
Di base **SELinux** è abilitato nel sistema, che però andrà disabilitato poichè impedisce il corretto funzionamento di VNC.

Portiamoci al file `/etc/sysconfig/selinux` e modifichiamo il parametro `SELINUX=enforcing` in `SELINUX=disabled` tramite il nostro editor preferito, ad esempio *nano*:

```bash
nano /etc/sysconfig/selinux
```

## Configurazione
Prima di tutto dobbiamo creare un utente di sistema con password a cui verrà dato accesso al server VNC. Questo via *useradd*:

```bash
useradd NUOVO_UTENTE
passwd NUOVO_UTENTE
```

a questo punto accediamo col nuovo utente:

```bash
su NUOVO_UTENTE
```

ed impostiamo una nuova password VNC via comando `vncpasswd`. Una volta ultimato terminiamo la sessione con `exit`.

Creiamo il file in posizione `/etc/systemd/system/vncserver@.service` col seguente contenuto:

```
[Unit]
Description=VNC Server
After=syslog.target network.target

[Service]
Type=forking
WorkingDirectory=/home/NUOVO_UTENTE
User=hitesh
Group=hitesh

ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'
ExecStart=/usr/bin/vncserver -autokill %i
ExecStop=/usr/bin/vncserver -kill %i

[Install]
WantedBy=multi-user.target
```

avendo la premura di sostituire `NUOVO_UTENTE` con l'utente precedentemente creato.

Ricarichiamo i servizi con:

```bash
systemctl daemon-reload
```

e infine avviamo il nuovo servizio:

```bash
systemctl start vncserver@:1.service
```

Possiamo decidere di avviare il servizio al boot del sistema. Per farlo usiamo l'opzione *enable*:

```bash
systemctl enable vncserver@:1.service
```

Ora è possibile accedere da client al nostro nuovo server VNC che sarà in ascolto sulla porta `5901`.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).