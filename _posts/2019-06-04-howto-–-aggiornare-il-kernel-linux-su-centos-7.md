---
title: '#howto – Aggiornare il kernel linux su Centos 7'
published: 2019-06-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - debian  - centos  - fedora
---
Centos 7 viene normalmente fornito con una versione stabile seppur molto vecchia, del kernel Linux. Questa scelta può essere condivisa come no, vediamo in questa guida come aggiornarlo.

> Quando si parla di agiornare il kernel Linux, si parla in realtà di installarne una versione più recente oltre a quella già presente.

## Premessa

L'aggiornamento del kernel può essere un processo a primo impatto molto semplice, bisogna però tener conto di alcuni fattori, come la compatibilità con il software che utilizziamo ed eventuali problemi nel boot del sistema legati appunto a queste incompatibilità.

## Aggiornamento di sistema

Per prima cosa controlliamo la presenza di aggiornamenti e proseguiamo quindi con la loro installazione:

    sudo yum update

e riavviamo la macchina per prevenire conflitti post-installazione:

    sudo reboot

## Configurazione repository

Installiamo il plugin **yum-plugin-fastestmirror**:

    sudo yum install yum-plugin-fastestmirror

Proseguiamo con la confiurazione della repository ELRepo, installiamo la chiave:

    sudo rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org

e aggiungiamo/abilitiamo la repository:

    sudo rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm

## Installazione del kernel

Passiamo all'installazione del kernel più recente (5.1.6 nel momento in cui scrivo), tramite **yum** e la repository **elrepo-kernel**:

    sudo yum --enablerepo=elrepo-kernel install kernel-ml

una volta completata l'operazione, la versione più recente del kernel è stata installata corretamente su Centos 7.

## Configurazione del GRUB

In questa sezione andiamo a configurare il GRUB, istruendolo nel caricare la versione più recente del kernel.

Otteniamo la lista dei kernel presenti:

    sudo awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg

e cerchiamo quello più recente, in questo caso il numero **0**, impostiamo quindi questo valore con **grub2-set-default**:

    sudo grub2-set-default 0

e riconfiguriamo il grub:

    sudo grub2-mkconfig -o /boot/grub2/grub.cfg

per poi riavviare:

    sudo reboot

Una volta riavviato controlliamo la versione al momento in uso del kernel via **uname**:

    uname -msr

## Rimuovere i vecchi kernel

Buona norma è quella di mantenere le ultime due versioni più recenti installate, rimuovendo le precedenti, questo per prevenire l'impossibilità di accedere al proprio ssitema nel caso di una versione incompatibile.

Per questa parte della guida, vi rimando ad una [precedente](https://linuxhub.it/articles/howto-%E2%80%93-rimuovere-i-vecchi-kernel-da-debian-e-fedora-centos) già presente sul sito web.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**