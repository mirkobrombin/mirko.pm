---
title: '#howto - Aggiornare da Centos 6 a Centos 7/7.1'
description: "Spesso i server di produzione sono fermi ad una versione meno recente (ma non per forza obsoleta) del sistema.."
date: 2019-07-01
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos  
  - rhel
---
Spesso i server di produzione sono fermi ad una versione meno recente (ma non per forza obsoleta) del sistema operativo. Questo a causa di possibili conflitti, mancanza di compatibilità e soprattutto tempo.

In questa guida vediamo come è possibile aggiornare Centos dalla versione 6 alla versione 7.

> Se il tuo è un server in produzione, ti consiglio l'installazione di una macchina secondaria in cui installare una versione aggiornata e pulita del sistema, in modo da assicurare i tuoi progetti da possibili incompatibilità.

## Installazione del Upgrade Tool

Per questa operazione ci serve l'Upgrade Tool di RedHat, aggiungiamo quindi la sua repository:

    nano /etc/yum.repos.d/rhelupgrade.repo

col seguente contenuto:

    [upgrade]name=upgradebaseurl=http://dev.centos.org/centos/6/upg/x86_64/enabled=1gpgcheck=0

Proseguiamo con l'installazione dell'assistente e dello strumento d'aggiornamento:

    sudo yum install preupgrade-assistant-contents preupgrade-assistant redhat-upgrade-tool

## Fase pre-aggiornamento

Grazie allo strumento di pre-aggiornamento, possiamo verificare quali sono i possibili conflitti prima di aggiornare, digitiamo quindi:

    preupg

nell'output possiamo vedere quali sono i pacchetti che subiranno modifiche con l'aggiornamento.  Controllate attentamente se il loro aggiornamento può rendere incompatibili i vostri progetti.

## Aggiornamento

Passiamo alla fase di aggiornamento vero e prorprio

> Consiglio di effettuare un backup dei dati prima di procedere con l'aggiornamento.

importiamo la chiave per la repo:

    sudo rpm --import http://centos.excellmedia.net/7.0.1406/os/x86_64/RPM-GPG-KEY-CentOS-7

e tramite lo strumento di aggiornamento fornito da Red Hat, aggiorniamo il sistema:

    sudo redhat-upgrade-tool --network 7.0 --instrepo http://centos.excellmedia.net/7.0.1406/os/x86_64/

Nel caso in cui il comando restituisca un errore, significa che ci possono essere incongruenze nell'aggiornamento, in questo caso conviene controllare attentamente per possibili problemi. Possiamo comunque forzare l'installazione con la flag **-force**:

    sudo redhat-upgrade-tool --network 7.0 --force --instrepo http://centos.excellmedia.net/7.0.1406/os/x86_64/

Una volta completato, dovremmo ricevere un output simile al seguente:

    ..setting up system for upgradeFinished. Reboot to start upgrade.

riavviamo il sistema:

    sudo reboot

Il sistema viene ora avviato in una fase di aggiornamento, con un kernel personalizzato, il procedimento è automatico e possiamo controllare i log per eventuali problemi. Una volta completato, ci porterà in una console chiedendo il login, effettuiamo l'accesso col nostro utente e controlliamo la versione di sistema:

    cat /etc/redhat-release

che dovrebbe risultare in qualcosa di simile:

    CentOS Linux release 7.0.1406 (Core)

## Aggiornamento alla 7.1

Da questo momento, l'aggiornamento a tuttoil ramo 7.x, avviene tramite upgrade via yum:

    sudo yum upgrade

_Good ***nix**?_  
_ - Mirko_