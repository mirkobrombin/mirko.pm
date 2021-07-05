---
title: '#howto - Installazione e configurazione di Endlessh'
date: 2020-12-28
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - github  - bash  - ssh  - systemd  - ssh  - bash  - systemd
---
**Endlessh** è un **SSH tarpit** (servizio che ritarda intenzionalmente le connessioni in entrata) che, essenzialmente, invia molto lentamente un banner SSH casuale e infinito.

Quest'app serve a mantenere i client SSH bloccati per ore o addirittura giorni sulla schermata di login. Un software simile viene usato per inserire il vero server SSH su un'altra porta e lasciare che persone malintenzionate tentino di entrare con la porta di default rimanendo bloccati nel tarpit.

In questa guida vedremo come installare Endlessh sul nostro server.

## Prerequisiti e installazione

Prima di tutto, controlliamo se abbiamo i tool necessari per compilare un software in C. Per installarli è necessario scaricare i seguenti gruppi o pacchetti di programmi singoli.

### Prerequisiti

#### Ubuntu, Debian e derivate

Se abbiamo Ubuntu, Debian e distro derivate installiamo il pacchetto `build-essentials` con il seguente comando:

```bash
apt install build-essential
```

#### Arch Linux

Se abbiamo Arch Linux possiamo usare invece `base-devel`:
```bash
pacman -S base-devel
```

#### CentOS/RHEL

Su CentOS, RHEL e Fedora possiamo procedere con:

```bash
yum install make automake gcc gcc-c++ kernel-devel
```

### Installazione

Dopo aver installato le dipendenze possiamo procedere con l'installazione di Endlessh. Prima di tutto, cloniamo il codice sorgente del programma usando `git`:

```bash
git clone https://github.com/skeeto/endlessh.git
```

Entriamo nella cartella appena creata ed eseguiamo il seguente comando:

```bash
cd endlessh
make
```

Una volta che la compilazione è andata a buon termine, è consigliabile copiare il file eseguibile dentro la cartella `/usr/local/bin` per inserirlo nel PATH. Inoltre, copiamo il servizio per *systemd*:

```bash
cp endlessh /usr/local/bin
cp util/endlessh.service /etc/systemd/system/
```

## Configurazione

Come prima cosa, abilitiamo il servizio in modo che si avvii automaticamente al boot del sistema:

```bash
systemctl enable endlessh
```

E creiamo il file di configurazione iniziale, chiamato `config`, dentro la cartella `/etc/endlessh`.

Apriamo a quel punto un editor di testo e modifichiamo il file, che dovrebbe avere parametri simili ai seguenti:

```config
# Porta del nostro server SSH di default (solitamente 22)
Port 22

# Il tempo di delay in millisecondi in cui viene mandata una nuova linea del banner
Delay 10000

# Lunghezza in caratteri massima di ogni linea del banner
MaxLineLength 32

# Numero massmo di connessioni accettabili
MaxClients 4096

# Livello di Log
#   0 = Nessun log
#   1 = Standard
#   2 = Debug
LogLevel 0

# Numero di bind desiderato
#   0 = IPv4 e IPv6
#   4 = IPv4 Only
#   6 = IPv6 Only
BindFamily 0
```

E avviamo il servizio *systemd* con:

```bash
systemctl start endlessh
```

> Prima di avviare il processo è necessario controllare la porta presente nella configurazione di SSH, posizionata nel file `/etc/ssh/sshd_config`. Visto che la porta 22 verrà sostituita con endlessh, per collegarci al nostro server dovremo usare un'altra porta.

Fatto ciò, chiunque proverà ad accedere al server via porta 22 si troverà bloccato in questo loop. Noi, per connetterci, utilizzeremo la porta che abbiamo impostato nel file di configurazione del vero server SSH in questo modo:

```ssh
ssh utente@ipserver -p PortaDelVeroServer
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.