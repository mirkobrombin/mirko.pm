---
title: '#howto - Installazione di un server Mumble su Centos 7'
date: 2020-05-02
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash  
  - systemd
---
Mumble è una applicazione VoIP dedicata principalmente ai giocatori e distribuita su licenza libera. Viene fornito in versione server il quale viene usato per ospitare appunto un server accessibile mediante apposito client.

In questa guida vedremo come ospitare un server Mumble su Centos 7.

## Configurazione del firewall

Il primo step prevede la configurazione del firewall (su Centos 7 *firewalld*) per permettere l'accesso sulla porta in cui sarà in ascolto il servizio *murmur*.

> Per maggiori informazioni sull'utilizzo di firewalld, potete fare riferimento a <a href="https://linuxhub.it/articles/howto-aprire-e-chiudere-porte-con-firewalld">questa</a> guida.

Andremo ad aprire la porta 64738 sia in TCP che UDP, aggiungiamo quindi delle regole permanenti mediante l'uso del comando `firewall-cmd` e le flag `--permanent` e `--add-port`:

```bash
firewall-cmd --permanent --add-port=64738/tcp
firewall-cmd --permanent --add-port=64738/udp
```

e ricarichiamo tutte le regole:

```bash
firewall-cmd --reload
```

## SELinux
Andremo ora a disabilitare SELinux in quanto non permette al servizio murmur di avviarsi correttamente. Apriamo quindi il file in locazione `/etc/sysconfig/selinux` con il nostro editor di testo preferito (in questo caso `nano`):

```bash
nano /etc/sysconfig/selinux
```

e modifichiamo la variaibile `SELINUX` in `SELINUX=disabled`.

Nel caso fosse necessario mantenere attivo SELinux, consiglio di creare una policy per prevenire che il servizio venga interrotto all'avvio.

## Installazione
Portiamoci alla <a href="https://www.mumble.info/downloads/">pagina</a> di download ufficiale di Mumble e scarichiamo sul server il pacchetto *Static Linux Server*.

In seguito, portiamoci nella medesima locazione e scompattiamo l'archivio:

```bash
tar -vxjf murmur-static_x86-1.3.0.tar.bz2
```

Creiamo ora due cartelle, `/var/log/murmur` per i log e `/usr/local/murmur` in cui andremo a posizionare i file:

```bash
mkdir /var/log/murmur
mkdir /usr/local/murmur
```

spostiamo quindi i file:

```bash
mv murmur-static_x86-1.3.0/* /usr/local/murmur/
```

e la configurazione in `/etc`:

```bash
mv murmur-static_x86-1.3.0/murmur.ini /etc/murmur.ini
```

Creiamo ora un nuovo gruppo e utente `murmur` da dedicare al servizio:

```bash
groupadd -r murmur
useradd -r -g murmur -m -d /var/lib/murmur -s /sbin/nologin murmur
```

Così facendo l'utente non avrà alcun accesso se non al servizio stesso e alla locazione in cui verranno scritti i log:

```bash
chown murmur:murmur /var/log/murmur
chmod 0770 /var/log/murmur
```

## Configurazione

Abbiamo precedentemente spostato il file `murmur.ini` in `/etc/murmur.ini`: questo è il file di configurazione del server. Ora dobbiamo modificarlo, e per fare ciò apriamo un editor di testo, come ad esempio `nano`:

```bash
nano /etc/murmur.ini
```

e modifichiamo i parametri:
- pidfile
- logfile

in **pidfile** andremo ad impostare la posizione in cui risiederà il *PID*, scriviamo `/var/run/murmur/murmur.pid`. In **logfile** inseriamo la locazione precedentemente creata per i log, ossia `/var/log/murmur/murmur.log`.

Ci sono altri parametri all'interno del file di configurazione: è possibile ad esempio configurare un server database diverso da SQLite come MariaDB o MySQL.

## Servizio

Creiamo ora il file `murmur.service` in locazione `/etc/systemd/system`:

```bash
nano /etc/systemd/system
```

con contenuto:

```bash
[Unit]
Description=Mumble Server (Murmur)
Requires=network-online.target
After=network-online.target mariadb.service time-sync.target
[Service]
User=murmur
Type=forking
PIDFile=/var/run/murmur/murmur.pid
ExecStart=/usr/local/murmur/murmur.x86 -ini /etc/murmur.ini
[Install]
WantedBy=multi-user.target
```

questo sarà il servizio con cui `systemd` comunicherà col processo. Utiliziamo `systemctl` per abilitare il nuovo servizio all'avvio col sistema:

```bash
systemctl daemon-reload
systemctl enable murmur.service
```

Infine avviamo il servizio e quindi il server sempre via `systemctl`:

```bash
systemctl start murmur
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).