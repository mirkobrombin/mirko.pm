---
title: ' #howto - Come controllare se CentOS o RHEL necessita di un riavvio completo dopo un aggiornamento'
published: 2020-09-21
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash  
  - systemd
---
Dopo aver aggiornato il proprio sistema con **CentOS** o **RHEL** non è raro porsi la seguente domanda: "Devo proprio riavviare il PC / server?". Ebbene, grazie ad un comando sarà proprio la nostra macchina a darci la risposta, e ad evitare riavvii superflui.

Il comando `needs-restarting` permette di riportare una lista di ID di processi di programmi che hanno iniziato a girare prima che essi o qualche componente ha ricevuto un update, ed è molto comodo.

## Come installare needs-restarting

Per prima cosa, prima di installare `needs-restarting`, dobbiamo sapere da che repo di `yum` proviene il programma. Per fare ciò possiamo eseguire il seguente comando:

```bash
yum whatprovides needs-restarting
```

che dovrebbe fornire un output simile al seguente:

```bash
yum-utils-1.1.31-53.el7.noarch : Utilities based around the yum package manager
Repo        : base
Matched from:
Filename    : /usr/bin/needs-restarting

yum-utils-1.1.31-54.el7_8.noarch : Utilities based around the yum package manager
Repo        : updates
Matched from:
Filename    : /usr/bin/needs-restarting

yum-utils-1.1.31-54.el7_8.noarch : Utilities based around the yum package manager
Repo        : @updates
Matched from:
Filename    : /bin/needs-restarting

yum-utils-1.1.31-54.el7_8.noarch : Utilities based around the yum package manager
Repo        : @updates
Matched from:
Filename    : /usr/bin/needs-restarting
```

Da qui sappiamo che needs-restarting è incluso in `yum-utils`, già presente nella repo "base".

A questo punto installiamo `yum-utils`:

```bash
yum install yum-utils
```

e `needs-restarting` dovrebbe essere ora presente sulla macchina.

## Utilizzo di needs-restarting

`needs-restarting` non è difficile da utilizzare, ma all'inizio comprendere che cosa fa potrebbe essere complesso. Scrivendo via terminale il comando senza parametri:

```bash
needs-restarting
```

avremo un output simile a:

```bash
1 : /usr/lib/systemd/systemd --switched-root --system --deserialize 22 
538 : /usr/lib/systemd/systemd-udevd 
523 : /usr/sbin/lvmetad -f
```

che, come anticipato in precedenza, indica i processi che hanno ricevuto qualche aggiornamento o i cui componenti sono stati modificati da un update.

Per sapere però se dobbiamo riavviare il PC, abbiamo bisogno del "**exit code**" del comando, ottenibile in questo modo dopo aver usato `needs-restarting`:

```bash
echo $?
```

se l'output sarà **1**, allora il sistema **dovrà essere riavviato**, mentre se è **0** **non dovrete preoccuparvi**. 

Per avere la risposta diretta, invece, possiamo utilizzare `needs-restarting` con il parametro *-r*:

```bash
needs-restarting -r
```

se non dovremo riavviare l'output sarà come il seguente:

```bash
No core libraries or services have been updated.
Reboot is probably not necessary.
```

mentre se dovremo riavviare, il comando ci dirà quali pacchetti fondamentali sono stati aggiornati, come nell'output qui di seguito:

```bash
Core libraries or services have been updated:
  dbus -> 1:1.10.24-14.el7_8
  systemd -> 219-73.el7_8.9

Reboot is required to ensure that your system benefits from these updates.
```

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).