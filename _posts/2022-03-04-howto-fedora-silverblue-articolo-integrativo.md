---
title: '#howto - Articolo integrativo su Fedora Silverblue'
date: 2022-03-04 12:47
layout: post 
author: MastroAlberto (aka Alberto Bella) 
author_github: al6263
tags:
- Container
- Fedora
---

Oggi parleremo di una distribuzione molto particolare: **Fedora Silverblue**, ampliando [il nostro precedente articolo](https://linuxhub.it/articles/howto-breve-introduzione-all-uso-di-silverblue/) sulla sezione delle installazioni e quanto riguarda alcune feature di `rpm-ostree`

## Un sistema immutabile

Ricordiamo che Silverblue ha un file system **immutabile**:

Un sistema si definisce tale se il sistema una volta installato risulta identico ad ogni altra installazione della stessa versione. 
L'accesso ai file radice è mantenuto in sola lettura, cioè nessuna modifica è consentita neanche dall'utente amminstratore.

### Quali sono i vantaggi?

Un sistema con questa struttura ha molti vantaggi in diversi ambiti.  
Innanzitutto *è più stabile* rispetto al normale, comportando quindi una minor possibilità di incontrar bug gravi che rendano impossibile l'esecuzione ordinaria del sistema

La maggioranza dei suoi applicativi agisce tramite container, il ciò rende molto più facile lavorare su di essi, più sicuro poiché isolati rispetto al resto, e permette una maggior libertà di sviluppo senza avere il vincolo di essere cauti nel non "rompere tutto".

## Bene, installiamo

L 'installazione è pressoché identica a quella di Fedora Workstation ma dobbiamo fare delle precisazioni:

- **Il dual boot non è ufficialmente supportato!** Sebbene non lo sia ufficialmente i più temerari possono provare

- **Attenti al partizionamento manuale!** Se proprio  dovete fare i partizionamenti manuali prestate molta attenzione, infatti Silverblue accetta solamente i seguenti punti di mount come partizioni: 
  - `/boot`
  - `/var`

- *Aggiungiamo ovviamente* anche le sotto directory di `/var`:

   - `/var/home`  -> reale posizione di `/home`, che è in realtà un collegamento
   - `/var/log`
   - `/var/containers`
   - `/`

La vera attenzione da riporre è sull'installer infatti con partizionamento manuale, accetterà anche filesystem e punti di mount **non compatibili senza dare errore!**

Per quanto riguarda i filesystem al momento sono supportati solo **btrfs** e **xfs** come metodo di encrypting LWM.

## Alcuni consigli su rpm-ostree

Ricordiamo innanzitutto che, tra i metodi di installazione software di fedora vi è rpm-ostree:

Il suo principale scopo è l'installazione di pacchetti con un interesse globale sul sistema, i quali non possono essere eseguiti all'interno dei container.

Possono essere per esempio driver, librerie o anche Desktop-Environment

la sintassi per installare di pacchetti è: 

```bash
$ rpm-ostree install <nome pacchetto>`
```

Questa operazione è comunque abbastanza lenta, abbiate pazienza in ogni caso, al termine del processo verrà richiesto un riavvio in modo da applicare le modifiche in stallo (si ricordi che il file system è in sola lettura, quindi ogni modifica al sistema necessita un riavvio), se invece desiderate applicare live le modifche potete utilizzare una flag particolare:

```bash
$ rpm-ostree --apply-live install <nome pacchetto>` 
```

tuttavia non lo consiglio anche per una questione di sicurezza.

Possiamo anche fare un **override** del pacchetto, ovvero possiamo aver per esempio una casistica dove vogliamo testare una nuova versione di un determinato software, ecco come:

```bash
$ rpm-ostree override replace <path to package>
```

E se volessimo rimuovere anche quello che stiamo sovrascrivendo, arrivando quindi a sostituirlo completamente? Ecco come:

```bash
$ rpm-ostree override remove <path to package>
```
