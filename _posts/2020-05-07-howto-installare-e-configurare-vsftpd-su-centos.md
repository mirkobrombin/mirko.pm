---
title: '#howto - Installazione e configurazione di vsftpd su CentOS/RHEL 7/8'
date: 2020-05-07
layout: post
author: Pietro di Caprio
author_github: pietrodicaprio
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - centos  
  - letsencrypt  
  - rhel  
  - bash
---
`vsftpd` è un server (S)FTP largamente utilizzato e nato specificatamente per sistemi UNIX-like.

Questa guida prende CentOS come distribuzione di riferimento ma, ad eccezione dei comandi di installazione, la configurazione è la medesima su tutti i sistemi.

> La guida da per scontato che siate loggati con utente *root*. Se così non fosse: ricordatevi di aggiungere *sudo* all'inizio di ogni comando in modo da eseguirlo con i permessi richiesti.

## Funzionalità
Di seguito un elenco non esaustivo delle principali funzionalità di vsftpd:

* IP virtuali
* utenti virtuali
* configurazione per-user
* bandwidth throttling (limitazione banda passante in base al traffico)
* supporto IPv6
* supporto SSL con TLS fino a versione 3
* ... tante altre

## Installazione
Il pacchetto è incluso nelle repository base di sistema, basterà quindi installarlo tramite il gestore pacchetti `yum` o `dnf` nel caso di Centos 8/RHEL 8:

```bash
yum install vsftpd
```

Una volta installato, sfruttiamo `systemctl` per avviare il servizio:

```bash
systemctl start vsftpd
```

Nel caso volessimo farlo partire in automatico sfruttiamo l'opzione `enable` per registrarlo con l'avvio del sistema:

```bash
systemctl enable vsftpd
```

## Firewalld

Normalmente `firewalld` è abilitato di base nel sistema, dobbiamo aprire qualche porta per rendere il servizio raggiungibile dall'esterno:

```bash
firewall-cmd --zone=public --permanent --add-port=20/tcp
firewall-cmd --zone=public --permanent --add-port=21/tcp
firewall-cmd --zone=public --permanent --add-service=ftp
```
e dobbiamo selezionare un range di porte per la modalità passiva. In questo esempio utilizziamo il range *10090-10100*:

```bash
firewall-cmd --zone=public --permanent --add-port=10090-10100/tcp
```

infine ricarichiamo le regole:

```bash
firewall-cmd --reload
```

## Configurazione

Ora modifichiamo il file di configurazione con il nostro editor di testo preferito (in questo caso `nano`):

```bash
nano /etc/vsftpd/vsftpd.conf
```

Guardiamo ora alcuni parametri da configurare a dovere.

`listen_ipv6=YES` abilita (YES) o disabilita (NO) l'ascolto su IPv6.

Disabilitiamo la lista degli utenti con accesso negato, consentiamo la scrittura di file e directory via FTP, indichiamo che ogni utente deve poter accedere solo alla sua home directory, consentiamo la scrittura di file e directory nella user home ed indichiamo quindi che solo gli utenti dell'apposita lista possono accedere:

```
userlist_deny=NO
write_enable=YES
chroot_local_user=YES
allow_writeable_chroot=YES
userlist_enable=YES
```

assicuriamoci che i seguenti parametri siano configurati come segue:

```
pam_service_name=vsftpd
tcp_wrappers=YES
use_localtime=YES
listen=YES
ftpd_banner=Benvenuto sul server
```

Ora, andiamo a definire qual è il percorso base che contiene tutti i nostri utenti. In questo caso, `local_root=/var/ftp/$USER` dove `$USER` corrisponde all'username che effettua il login.

Abilitiamo la modalità passiva:

```
# Passive mode enable
connect_from_port_20=YES
pasv_enable=YES
pasv_addr_resolve=YES
pasv_min_port=10090
pasv_max_port=10100
```

e ricordiamoci che il range di porte UDP indicato va aperto sul firewall (vedi sezione Firewalld di questa guida).

## Certificato SSL (certbot)
Per prima cosa abbiamo bisogno di ottenere un certificato valido con annessa chiave privata.

Per rendere l'installazione più facile utilizzeremo `certbot`: un famoso strumento per generare certificati con Let's Encrypt. Se non avete installato un server web e non utilizzate ancora certbot, vi consiglio le seguenti guide:  
* [#howto – Installazione di Nginx e ngx_pagespeed su Centos 7](https://linuxhub.it/articles/howto-%E2%80%93-installazione-di-nginx-e-ngx_pagespeed-su-centos-7)  
* [Guida ufficiale certbot](https://certbot.eff.org/lets-encrypt/centosrhel7-nginx)
* [#howto - Ottenere e rinnovare un certificato SSL con Let's Encrypt](https://linuxhub.it/articles/howto-ottenere-e-rinnovare-un-certificato-ssl-con-let-s-encrypt)  

assicuriamoci che un indirizzo a noi comodo, _ospitato sul medesimo server_, sia raggiungibile dal web, ad esempio `ftp.miosito.tld`, e chiediamo a certbot di generare un certificato per noi:

```bash
certbot --manual certonly -d ftp.miosito.tld
```

se tutto è andato a buon fine avremo un messaggio che ci indica dove sono stati salvati i file `fullchain.pem` e `privkey.pem`. Se è stata rispettata la directory default, li troveremo in `/etc/letsencrypt/live/ftp.miosito.tld/`.

Ricordiamoci questo percorso e torniamo a modificare il file `/etc/vsftpd/vsftpd.conf`:

```
rsa_cert_file=/etc/letsencrypt/live/ftp.miosito.tld/fullchain.pem
rsa_private_key_file=/etc/letsencrypt/live/ftp.miosito.tld/privkey.pem
ssl_enable=YES
#allow_anon_ssl=NO
force_local_data_ssl=YES
force_local_logins_ssl=YES
#ssl_tlsv1=YES
ssl_sslv2=YES
ssl_sslv3=YES
#require_ssl_reuse=NO
ssl_ciphers=HIGH
```

In questo modo abilitiamo e forziamo l'utilizzo di connessione SSL fornendo il certificato appena generato. Per scelta personale ho preferito tenere disabilitato lo standard `ssl_tlsv1` in favore dei più moderni `ssl_sslv2` e `ssl_sslv3`.

## Abilitare utenti all'accesso FTP
Se è stato impostato a YES il parametro `userlist_enable` come suggerito nella sezione Configurazione della presente guida: dobbiamo inserire uno o più utenti in tale lista. In questo esempio diamo per scontato che l'utente sia già presente a sistema ed utiliziamo quindi il seguente comando:

```bash
echo $USER >> /etc/vsftpd/user_list
service vsftpd restart
```

assicurandoci di riavviare vsftpd.

Se qualcosa dovesse essere andato storto, o per maggiori informazioni, dubbi e chiarimenti non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).