---
title: "#howto - Cambiare la porta SSH e disabilitare l'accesso via root su Centos"
description: "Una delle principali procedure messe in atto da un amministratore di sistemi è quella di disabilitare l'accesso root via ssh."
date: 2019-01-13
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - debian  
  - ubuntu  
  - centos  
  - fedora  
  - ssh
---
L'utente **root** viene spesso utilizzato come principale per ogni scopo e operazione. Possiamo intendere l'user root come un superadmin, colui che ha accesso ad ogni angolo del sistema e che quindi, come tale, può arrecare seri danni se usato inconsciamente.

Una delle principali procedure messe in atto da un amministratore di sistemi è quella di disabilitare l'accesso root via ssh.

Seguire questa semplice procedura ci permette di proteggere il nostro server da possibili accessi malevoli. Basti pensare alla marea di bot online che ogni minuto tentano l'accesso via SSH ad un qualsiasi server. Nel caso uno di questi bot o un qualsiasi utente intenzionato, dovesse avere accesso root, avrà a disposizione letteralmente a tutti i vostri dati, senza eccezione. Per ovviare completamente a questo problema, esistono in realtà metodi migliori, come la disabilitazione dell'accesso via password e l'[abilitazione del login via chiave SSH](https://linuxhub.it/article/howto-autenticazione-chiave-ssh-su-server-centosfedoradebianubuntu-e-derivate) (che approfondiremo in un'altra guida) ed il cambio della porta SSH di cui parleremo in fondo questa guida.

Procediamo quindi alla disabilitazione dell'account root via SSH.

## Creazione di un nuovo utente

Prima di tutto dobbiamo creare un nuovo utente che useremo per accedere una volta disabilitato il RootLogin:

    adduser operator

dove **operator** è l'username del nostro nuovo utente. Impostiamo ora una password:

    passwd operator

ed aggiungiamo l'utente al gruppo wheel:

    usermod -aG wheel operator

in questo modo avremo accesso ai privilegi sudo.

> I privilegi sudo non sostituiscono una figura superadmin completa, non hanno accesso completo al sistema e non possono eliminare e/o modificare contenuti di proprietà root.

## Disabilitazione RootLogin

Per disabilitare l'accesso via root dobbiamo modificare la configurazione di **sshd**, modifichiamo il file in locazione **/etc/ssh/sshd_config** modificando il parametro che segue:

    ..PermitRootLogin no..

riavviamo infine il processo con **systemctl**:

    systemctl restart sshd

Possiamo ora effettuare il logout da root ed accedere col nostro nuovo utente **operator**.

## Cambiare porta SSH

Una delle migliori pratiche da applicare subito dopo la disabilitazione dell'account root, è quella di cambiare la porta SSH, in modo da rendere più difficile il suo raggiungimento.

Come per la RootLogin, anche la porta viene definita nel file di configurazione di **sshd**, apriamo quindi la configurazione in **/etc/ssh/sshd_config** e modifichiamo i parametri come segue:

    Port 2234

dove **2234** è la nuova porta da cui vogliamo fare accesso via SSH.

Prima di procedere col riavvio, assicuriamoci l'apertura della porta via firewall:

    sudo firewall-cmd --permanent --zone=public --add-port=2234/tcp

ed istruiamo SELinux:

    sudo semanage port -a -t ssh_port_t -p tcp 2234

Riavviamo infine firewall e sshd:

    sudo firewall-cmd --reloadsudo systemctl restart sshd

Effettuiamo il logout e colleghiamoci via SSH alla nuova porta.

_Good ***nix**?_  
_ - Mirko_