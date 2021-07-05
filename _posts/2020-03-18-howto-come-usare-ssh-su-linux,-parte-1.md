---
title: '#howto - Installazione ed utilizzo di SSH'
description: "SSH è uno strumento fondamentale per gestire server e PC locali, come ad esempio un Raspberry PI.."
date: 2020-03-18
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash
  - ssh
---
**SSH** è uno strumento fondamentale per gestire server e PC locali, come ad esempio un Raspberry PI. Con questo protocollo è possibile collegarsi direttamente alla console del computer remoto. SSH è l'acronimo di **Secure Shell**.

## Installazione

Nelle principali distribuzioni Linux il client SSH è già pre-installato. Nel caso così non fosse: installarlo è molto semplice. Per farlo basta scaricare dalle repository ufficiali di ogni distro uno dei pacchetti che lo fornisce. Noi utilizzeremo **OpenSSH** installabile con i seguenti comandi:

```bash
# Ubuntu / Debian
sudo apt install openssh-client

# Fedora
sudo dnf install openssh-clients

# Arch Linux
sudo pacman -S openssh

```

Ora che abbiamo installato OpenSSH possiamo iniziare ad usarlo.

## Il funzionamento del protocollo

Il funzionamento di SSH si basa su una comunicazione sicura e autenticata tra *Client e Server*. Nella pratica, durante la connessione SSH il client inizializza la connessione al Server, che esso a sua volta invierà la sua *chiave pubblica* per permetterci di identificarlo: a questo punto noi possiamo controllare che la chiave sia corretta e così passare al login via password. 

È anche possibile l'accesso in un modo più sicuro della password, cioè con **una coppia di chiavi SSH**, ma questo argomento lo approfondiremo nelle prossime guide.

### Utilizzo

Utilizzare SSH è molto semplice:

```bash
ssh username@x.x.x.x
```

Analizziamo il comando:
Abbiamo __username__, che sarà l'username da utilizzare sulla macchina di destinazione e __x.x.x.x__, che sarà invece l'IP della macchina di destinazione.

```bash
> ssh pi@10.0.0.9
pi@10.0.0.9's password:
```

Se invece volessimo semplicemente invocare un comando sulla macchina ospite ci basterà aggiungere il comando da eseguire dopo l'indirizzo nel seguente modo:

```bash
ssh username@x.x.x.x command
```

### Prime utility SSH

SSH ci consente di usare delle utilità per eseguire delle operazioni via SSH, e uno di questi tool è **SCP**, acronimo di *Secure CoPy*. Questo strumento ci permette di copiare velocemente dei file tra due device tramite SSH. Un esempio di utilizzo è:

```bash
scp username@x.x.x.x:/dir/to/file dir/dest/file
```

Con questo comando noi possiamo copiare il file nella cartella _/dir/to/file_ del dispositivo remoto nella cartella _dir/dest/file_ del nostro PC. Viceversa possiamo copiare un file dal nostro PC verso il dispositivo remoto.

![SCP](storage/RUST.jpg)

È possibile anche montare un filesystem remoto via SSH con **SSHFS**, un filesystem basato su FUSE.

## Conclusioni

SSH è un strumento fondamentale per la gestione di server sia remoti sia locali. Ci permette di eseguire operazioni essenziali o complesse in modo sicuro tra i due dispositivi. Come spiegherò nella seconda parte sull'uso di SSH, vedremo come questo protocollo permette anche il login automatico tramite *una coppia di chiavi SSH autorizzate*, il *forwarding del display server*, quindi poter usare un desktop remoto via SSH, l'utilizzo di una repository remota *GIT tramite SSH* e l'uso di *SFTP*.

Per dubbi o consigli su tutte le funzioni di SSH, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).