---
title: '#howto - Installazione e configurazione di fail2ban su Fedora 33/CentOS 8'
date: 2020-12-11
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  - bash  - ssh  - systemd  - ssh  - bash  - systemd
---
**fail2ban** è uno strumento che si occupa di controllare il log accessi del server in tempo reale, bloccando l'indirizzo IP di chi prova ad accedere alla macchina con ripetuti tentativi falliti.

In questa guida vedremo come installarlo e configurarlo su Fedora 33, CentOS 8 e derivate.

> Se utilizzi CentOS/RHEL 7 puoi far riferimento a [questa](https://linuxhub.it/articles/howto-%E2%80%93-installare-e-configurare-fail2ban-in-centos-7) guida.

## Installazione
Il pacchetto `fail2ban` è disponibile nella repository *EPEL* che andremo ad installare:

```bash
dnf install epel-release
```

procediamo quindi all'installazione di `fail2ban`:

```bash
dnf install fail2ban
```

Una volta installato il pacchetto, abilitiamo ed avviamo il servizio via `systemctl`:

```bash
systemctl enable fail2ban
systemctl start fail2ban
```

## Configurazione
Il file di configurazione principale di *fail2ban* è posizionato in `/etc/fail2ban/jail.conf`. Questo potrebbe venir sovrascritto aggiornando il pacchetto, e andremo quindi a creare un nuovo file di configurazione `jail.conf` in `/etc/fail2ban/jail.d/`.

Al suo interno inseriamo il seguente contenuto:

```bash
[DEFAULT]
bantime = 3600
findtime = 150
maxretry = 3

backend = systemd

[sshd]
enabled = true
```

dove:
* *bantime* è il numero in secondi in cui un IP rimarrà bannato. In questo caso 3600 secondi, quindi un'ora
* *findtime* è il numero di secondi di attesa per ogni tentativo
* *maxretry* è il numero di tentativi permessi
* *backend* indica a fail2ban quale backend utilizzare. Di base questo è impostato in `auto`, e qui lo andremo ad istruire per utilizzare `systemd` nello specifico
* *sshd enabled* indica se fail2ban deve essere abilitato anche per le sessioni ssh, in questo caso `true`

Salviamo il nuovo file e riavviamo il servizio:

```bash
systemctl restart fail2ban
```

### Whitelist
Possiamo istruire *fail2ban* ad ignorare alcuni indirizzi IP, e per fare questo aggiungiamo alla nostra configurazione:

```bash
[DEFAULT]
ignoreip = 127.0.0.1/8
```

assegnando al parametro `ignoreip` gli indirizzi IP che vogliamo ignorare. In questo caso, impostando `127.0.0.1/8` ignoreremo tutti gli indirizzi IP locali da .1 a .8.

### Segnalazione via e-mail
Possiamo configurare l'invio di una nuova e-mail ad ogni tentativo fallito, questo usando `sendmail`. Nel nostro file di configurazione, sotto il blocco `DEFAULT` aggiungiamo:

```bash
destemail = la@tua.email
sendername = fail2ban
mta = sendmail
action = %(action_mw)s
```

dove:
* *destmail* è l'indirizzo e-mail a cui inviare la segnalazione
* *sendername* il mittente
* *mta* il metodo con cui inviare la mail
* *action* l'azione da effettuare: `%(action_)s` banna l'utente, mentre nel nostro caso `%(action_mwl)s` bannerà l'utente ed invierà una mail contenente il whois dell'indirizzo IP


Per ogni dubbio, chiarimento o curiosità ci trovate al nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.