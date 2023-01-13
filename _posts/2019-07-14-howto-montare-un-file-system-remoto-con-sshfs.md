---
class: post
title: '#howto - Montare un file system remoto con sshfs'
description: "Sono molti i casi che vedono la necessità, di dover accedere a percorsi remoti da un'altra postazione. Con sshfs possiamo 'collegare' una posizione remota da un server/pc ad un altro."
date: 2019-07-14
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash  
  - ssh
---
Sono molti i casi che vedono la necessità, di dover accedere a percorsi remoti da un'altra postazione. Con sshfs possiamo "collegare" una posizione remota da un server/pc ad un altro.

## Installazione

Per prima cosa installiamo il pacchetto **sshfs** (in alcune distribuzioni viene fornito con l'installazione di sistema), di norma questo è presente nelle repository di sistema:

    # Debian/Ubuntu e derivatesudo apt install sshfs# RHEL/Centos e derivatesudo yum install sshfs# Fedora e derivatesudo dnf install sshfs# Arch linux e derivatesudo pacman -S sshfs

una volta installato controlliamo il suo funzionamento, restituendone la versione con la flag **-V**:

    sshfs -V

il risultato sarà simile al seguente:

    Version 2.8FUSE library version: 2.9.7fusermount version: 2.9.7using FUSE kernel interface version 7.19

## Creazione del percorso locale

Creiamo ora un percorso locale dove posizionare quello remoto. Cerchiamo di usare una locazione a cui abbiamo accesso per evitare conflitti, nel nostro caso creiamo il percorso **server_docs** nella **home**:

    mkdir $HOME/server_docs

## Montare il percorso remoto

Procediamo col montare il percorso remoto in quello locale appena creato, per farlo:

    sshfs utente@INDIRIZZO_IP:/percorso/ $HOME/server_docs

dove:

*   **utente** è il nome dell'utente a cui abbiamo accesso sul server remoto
*   **INDIRIZZO_IP** è l'indirizzo IP del server remoto
*   **/percorso/** è il percorso remoto a cui vogliamo accedere
*   **$HOME/server_docs** il percorso locale dove posizionare quello remoto

possiamo inoltre usare la flag **-p** per specificare una porta differente:

    .. -p PORTA

Nel caso in cui il server richieda autenticazione via chiave, possiamo fornire la chiave via flag **-o** e parametro **IdentityFile**:

    .. -o IdentityFile=~/percorso/chiave

Una volta effettuata la connessione, possiamo accedere al contenuto del percorso remoto, da quello locale. Ovviamente ogni modifica al suo contenuto verrà effettuato in remoto.

### Montare in modo permanente

Nel caso in cui vogliamo montare il percorso remoto in modo permanente nel sistema, possiamo sfruttare il file **fstab**, apriamolo col nostro editor preferito:

    sudo nano /etc/fstab

ed aggiungiamo alla fine:

    sshfs#utente@INDIRIZZO_IP:percorso/ $HOME/server_docs

## Smontare il percorso remoto

Nel momento in cui vogliamo rimuovere la posizione remota, sfruttiamo il comando **umount**:

    sudo umount $HOME/server_docs

_Good ***nix**?_  
_ - Mirko_