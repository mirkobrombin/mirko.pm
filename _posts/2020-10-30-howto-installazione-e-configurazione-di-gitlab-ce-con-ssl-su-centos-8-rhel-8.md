---
class: post
title: '#howto - Installazione e configurazione di GitLab CE con SSL su Centos 8/RHEL 8'
date: 2020-10-30
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  - bash  - ssh  - ssh  - bash
---
GitLab è una piattaforma Open source per la gestione di repository git. Molto simile a GitHub, Gitea e Bitbucket, GitLab può essere installato sul proprio server, come per appunto [Gitea](https://linuxhub.it/articles/howto-come-installare-gitea-su-tutte-le-distribuzioni-linux).

In questa guida affrontiamo l'installazione di GitLab CE (Community Edition) su Centos 8/RHEL 8.

## Dipendenze
Prima di tutto dobbiamo installare alcune dipendenze indispensabili, procediamo via `dnf`:

```bash
dnf install curl epel-release openssh-clients openssh-server policycoreutils postfix
```

Abilitiamo ed avviamo i servizi `ssh` e `postfix` appena installati, via `systemctl`:

```bash
systemctl enable sshd postfix
systemctl start sshd postfix
```

## Installazione
Procediamo all'installazione automatica della repository ufficiale:

```bash
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```

Una volta completata l'installazione della repository, dovremmo ricevere un output simile al seguente:

```
The repository is setup! You can now install packages.
```

Quindi ora possiamo effettivamente installare GitLab Community Edition tramite il pacchetto `gitlab-ce`:

```bash
dnf install gitlab-ce
```

## SSL
Abbiamo bisogno di un *certificato SSL* per il nostro server GitLab. Possiamo generarne uno con *Let's Encrypt*, tramite lo strumento *certbot*. Procediamo quindi alla sua installazione:

```bash
dnf install certbot
```

Una volta ultimata l'installazione, possiamo procedere col generare il nostro nuovo certificato SSL:

```bash
certbot certonly --rsa-key-size 2048 --standalone --agree-tos --no-eff-email --email la@tua.email -d il_tuo_dominio.ex
```

dove:
- **la@tua.email** è l'indirizzo e-mail dell'intestatario del certificato
- **il_tuo_dominio.ex** è il nome del dominio a cui verrà intestato il certificato, ossia il dominio da cui verrà raggiunta l'installazione di GitLab

> Ricordate di prendere nota del percorso in cui venngono creati i certificati

Ora dobbiamo generare il certificato *DHPARAM* ([Scambio di chiavi Diffie-Hellman](https://it.wikipedia.org/wiki/Scambio_di_chiavi_Diffie-Hellman)):

```bash
openssl dhparam -out /etc/gitlab/dhparams.pem 2048
```

ed impostiamo i permessi corretti al nuovo certificato:

```bash
chmod 600 /etc/gitlab/dhparams.pem
```

## Configurazione
Procediamo con la configurazione del file `/etc/gitlab/gitlab.rb`, andiamo a modificare i parametri:

- `external_url` con il dominio che vogliamo dedicare all'installazione
- `nginx['redirect_http_to_https']` in `true`
- `nginx['ssl_certificate']` = col percorso al certificato generato
- `nginx['ssl_certificate_key']` = col percorso alla chiave del privata del certificato generato
- `nginx['ssl_dhparam']` = questa volta col percorso del nostro `dhparams.pem`

Una volta completate le modifiche, riconfiguriamo il servizio tramite il comando `gitlab-ctl`:

```bash
gitlab-ctl reconfigure
```

### Firewall
Andiamo a creare alcune regole nel [firewall](https://linuxhub.it/articles/howto-aprire-e-chiudere-porte-con-firewalld) di sistema, per assicurarci che GitLab sia raggiungibile all'esterno:

```bash
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --add-service=https --permanent
firewall-cmd --reload
```

Visitando il dominio che abbiamo configurato, ci ritroveremo davanti la nostra nuova installazione di GitLab.

