---
class: post
title: "#howto - Installare Nix"
date: 2023-02-10 
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: 
coauthor_github: 
published: false
tags:  
- ubuntu 
- archlinux 
- fedora
- bash
- nix
---

Esistono vari package manager per Linux, ogni distribuzione ha il suo, ad esempio `apt` per Ubuntu, `pacman` per Archlinux, `dnf` per Fedora, ecc...,
Esistono poi package manager multipiattaforma come `flatpak` e `snap` che installano in un ambiente "isolato" i pacchetti con le sue dipendenze.
Ci sono poi package manager che fanno questo e molto altro, oggi parliamo di `Nix`.

## Introduzione

Nix è il package manager sviluppato dagli sviluppatori di NixOS o forse sarebbe meglio dire che NixOS è una distribuzione basata su Nix.
Comunque sia, Nix è un package manager che oltre a garantire l'isolamenti dei pacchetti come `flatpak` e avere un repository con più di 80,000 pacchetti ha anche un sistema di **versionamento** e **rollback** dei pacchetti che ci permette di installare versioni precedenti di pacchetti per esempio quando un aggiornamento rompe qualcosa.

La particolarità di Nix però sta nel fatto che ha differenza dei package manager classici, Nix non installa pacchetti ma **ambienti**.
Viene infatti utilizzato un sistema di **derivazione** che permette di creare ambienti **riproducibili** con le dipendenze necessarie per eseguire un programma attraverso istruzioni scritte in Nix Language, un linguaggio funzionale scritto apposta per Nix.
Questa caratteristica ci permette di installare gli stessi pacchetti su qualsiasi macchina con Nix installato, senza dover installare le dipendenze del pacchetto. Ed essendo Nix compatibile anche con Mac OS e Windows possiamo avere lo stesso pacchetto anche su altri sistemi operativi. 

## Installazione

Per installare Nix dobbiamo abbiamo due vie

installazione multi-utente:
```bash
$ sh <(curl -L https://nixos.org/nix/install) --daemon
```

installazione singolo utente:
```bash
sh <(curl -L https://nixos.org/nix/install) --no-daemon
```

Sul sito ufficiale consigliano di utilizzare l'installazione multi-utente in quanto:
- Un miglior isolamento dei pacchetti.
- Una migliore sicurezza.
- Condiviso tra più utenti.


## Utilizzo

Una volta installato sulla nostra macchina possiamo utilizzare Nix per installare pacchetti, ad esempio per installare un pacchetto:
```bash
nix-env -iA <nome_pacchetto>
```

Per installare un pacchetto con una versione specifica:
```bash
nix-env -iA <nome_pacchetto>-<versione>
```

Se vogliamo cercare un pacchetto nel repository di Nix possiamo utilizzare il comando:
```bash
nix-env search <nome_pacchetto>
```
Oppure:
```bash
nix-env -qaP | grep <nome_pacchetto>
```


Per rimuovere un pacchetto ci basterà eseguire:
```bash
nix-env -e <nome_pacchetto>
```
*Attenzione* perché il pacchetto non verrà rimosso dal sistema, in quanto potresti voler fare un rollback, ma verrà disabilitato.
Per rimuovere completamente un pacchetto dobbiamo utilizzare il comando:
```bash
nix-collect-garbage
```

Se infine vogliamo aggiornare tutti i pacchetti installati con Nix possiamo utilizzare il comando:
```bash
nix-env -u
```
Quando aggiorniamo un pacchetto, la versione precedente non viene sovrascritta come avviene con i classici package manager, ma viene mantenuta in un ambiente isolato, in modo da poterla utilizzare in caso di problemi con la nuova versione, per cambiare versione del programma possiamo utilizzare il comando:
```bash
nix-env --rollback <nome_pacchetto>
```






