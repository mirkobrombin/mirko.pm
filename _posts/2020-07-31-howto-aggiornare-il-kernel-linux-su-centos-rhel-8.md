---
class: post
title: '#howto – Aggiornare il kernel Linux su CentOS/RHEL 8'
date: 2020-07-31
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  - centos  - fedora  - bash
---
CentOS e RHEL 8 vengono normalmente forniti con una versione stabile, seppur molto vecchia, del kernel Linux (4.18 al momento in cui scrivo). Questa scelta può essere condivisa come può non esserlo, e in questa guida vedremo come aggiornarlo se necessario.

> Quando si parla di aggiornare il kernel Linux si parla in realtà di installarne una versione più recente oltre a quella già presente.

## Premessa

L'aggiornamento del kernel può essere un processo a primo impatto molto semplice, ma bisogna però tener conto di alcuni fattori come la compatibilità con il software che utilizziamo ed eventuali problemi nel boot del sistema legati appunto a queste incompatibilità.

## Aggiornamento di sistema

Per prima cosa controlliamo la presenza di aggiornamenti e proseguiamo quindi con la loro installazione:

```bash
dnf update
```

e riavviamo la macchina per prevenire conflitti post-installazione: `systemctl reboot`.

## Configurazione repository

Prima di tutto dobbiamo configurare la repository *ELRepo*. Per fare ciò installiamo la chiave:

```bash
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
```

e aggiungiamo/abilitiamo la repository:

```bash
dnf install https://www.elrepo.org/elrepo-release-8.0-2.el8.elrepo.noarch.rpm
```

## Installazione del kernel

Passiamo a questo punto all'installazione del kernel più recente (5.1.6 nel momento in cui scrivo), tramite **yum** e la repository **elrepo-kernel**:

```bash
dnf --enablerepo=elrepo-kernel install kernel-ml
```

E una volta completata l'operazione, la versione più recente del kernel è stata installata corretamente su CentOS 8.

## Configurazione del GRUB

In questa sezione andiamo a configurare il bootloader GRUB istruendolo nel caricare la versione più recente del kernel.

Otteniamo la lista dei kernel presenti:

```bash
awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
```

e cerchiamo quello più recente, in questo caso il numero `0`. Impostiamo quindi questo valore con *grub2-set-default*:

```bash
grub2-set-default 0
```

e riconfiguriamo il GRUB:

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

per poi riavviare il sistema: `reboot`.

Una volta tornati sul terminale, controlliamo la versione del kernel al momento in uso via **uname**:

```bash
uname -msr
```

## Rimuovere i vecchi kernel

Buona norma è quella di mantenere le ultime due versioni più recenti installate rimuovendo le precedenti, questo per prevenire l'impossibilità di accedere al proprio ssitema nel caso di una versione incompatibile.

Per questa parte della guida, vi rimando ad una [precedente](https://linuxhub.it/articles/howto-%E2%80%93-rimuovere-i-vecchi-kernel-da-debian-e-fedora-centos) già presente sul sito web.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).