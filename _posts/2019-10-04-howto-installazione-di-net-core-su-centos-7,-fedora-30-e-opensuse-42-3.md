---
class: post
title: '#howto - Installazione di .Net Core su Centos 7, Fedora 30 e openSUSE 42.3'
description: "In questa guida vediamo come installare il framework .Net Core di Microsoft su Centos 7 (e successivi), Fedora 30 e openSUSE 42.3."
date: 2019-10-04
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  
  - centos  
  - fedora
---
In questa guida vediamo come installare il framework .Net Core di Microsoft su Centos 7 (e successivi), Fedora 30 e openSUSE 42.3.

> Esiste una variante di questa guida per Debian, disponibile [qui](https://linuxhub.it/article/howto-installare-net-core-su-debian).

## Installazione su Centos 7

L'installazione è di per se molto semplice e non richiede particolari passaggi. Per prima cosa aggiungiamo la chiave Microsoft e la repository:

    sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm

Una volta fatto procediamo con l'installazione di .Net Core, nello specifico del pacchetto **dotnet-sdk-3.0**:

    sudo yum install dotnet-sdk-3.0

Possiamo verificare la corretta installazione tramitela flag **--info** del comando **dotnet** in questo modo:

    dotnet --info

se come output ci viene fornita la versione installata del framework, significa che è stato installato correttamente.

## Installazione su Fedora 30

Per prima cosa importiamo la chiave Microsoft per l'accesso alla repository:

    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

procediamo poi con l'aggiunta della repository nel sistema, nello specifico andiamo a scaricare la configurazione della repository nella locazione /etc/yum.repos.d/microsoft-prod.repo:

    sudo wget -q -O /etc/yum.repos.d/microsoft-prod.repo https://packages.microsoft.com/config/fedora/30/prod.repo

Infine installiamo il pacchetto dotnet-sdk-3.0 tramite **dnf**:

    sudo dnf install dotnet-sdk-3.0

e verifichiamo la corretta installazione tramitela flag **--info** del comando **dotnet** in questo modo:

    dotnet --info

il che restituirà come output la versione del framework.

## Installazione su openSUSE 42.3

Prima  di procedere con la configurazione delle repo, è necessario installare la dipendenza **libicu** tramite zypper:

    sudo zypper install libicu

a seguire importiamo la chiave Microsoft per l'accesso alla repository:

    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

Otteniamo una copia della configurazione per la repository, nello specifico verrà posizionata in /etc/zypp/repos.d/microsoft-prod.repo:

    sudo wget -q -O /etc/zypp/repos.d/microsoft-prod.repo https://packages.microsoft.com/config/opensuse/42.3/prod.repo

ed aggiorniamo i permessi di proprietà all'utente root:

    sudo chown root:root /etc/zypp/repos.d/microsoft-prod.repo

Infine possiamo installare il pacchetto **dotnet-sdk-3.0** tramite zypper:

    sudo zypper install dotnet-sdk-3.0

possiamo verificare la corretta installazione tramite comando **dotnet**, nello specifico tramite la flag **--info** in questo modo:

    dotnet --info

nel caso di corretta installazione, ci verrà restituito come output la versione corrente installata di .Net Core.

Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**