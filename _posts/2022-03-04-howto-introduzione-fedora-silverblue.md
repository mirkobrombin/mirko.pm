---
title: '#howto - introduzione a Fedora Silverblue'
date: 2022-02-04 11:15
layout: post 
author: MastroAlberto (aka Alberto Bella) 
author_github: al6263
published: true
tags:
- Container
- Fedora
---

Oggi parleremo di una distribuzione molto particolare: **Fedora Silverblue**, basata su **os-tree**, ma che cosa differisce questa versione rispetto alla "classica" *Fedora workstation*?

## Un sistema immutabile

Silverblue ha un file system **immutabile**, andiamo ad analizzarne il significato.  

Un sistema si definisce tale se il sistema una volta installato risulta identico ad ogni altra installazione della stessa versione. 
L'accesso ai file radice è mantenuto in sola lettura, cioè nessuna modifica è consentita neanche dall'utente amminstratore.

### Quali sono i vantaggi?

Un sistema con questa struttura ha molti vantaggi in diversi ambiti.  
Innanzitutto *è più stabile* rispetto al normale, comportando quindi una minor possibilità di incontrar bug gravi che rendano impossibile l'esecuzione ordinaria del sistema

La maggioranza dei suoi applicativi agisce tramite container, il ciò rende molto più facile lavorare su di essi, più sicuro poiché isolati rispetto al resto, e permette una maggior libertà di sviluppo senza avere il vincolo di essere cauti nel non "rompere tutto".

### Rollback? Ne abbiamo!

E se avessi bisogno di fare un rollback? No problem! 
Il package manager utilizzato in silverblue, **rpm-ostree** permette di fare tranquillamente un rollback allo stato precendente all'utilizzo del PM.

> *Difatti ci basterà selezionare l'opportuna voce in systemd-boot all'avvio*



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



## Step 3: pacchetti

Abbiamo tre metodi per installare i pacchetti:

- `Flatpak`
- `Toolbox`
- `rpm-ostree`

Vediamoli in dettaglio:



### Flatpak

La maggiore fonte di pacchetti è sicuramente Flatpak, difatti questo metodo di pacchettizzazione è perticolarmente prediletto in Silverblue 

Di default Flatpak è già abilitato (bisogna comunque aggiungere [flathub](https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub/))

I pacchetti possono essere installati comodamente sia da GUI ( gnome-software ) che da CLI 

### Toolbox

Passiamo a un vero vantaggio di questa distro, Toolbox ovvero uno strumento che ci permette di creare dei container contenenti fedora 

Quali sono i vantaggi? 

Beh iniziamo sicuramente da DNF, difatti con i container abbiamo una versione di Fedora Workstation a nostra disposizione con tutte le repo relative ( possiamo anche abilitare RPM fusion )

All'interno di Toolbox tutte le applicazioni sono isolate dal sistema principale, sebbene porti dei vantaggi sopratutto in termini di sviluppo, è una soluzione meno adatta ad applicazioni lato GUI, infatti dovremo copiare il `.desktop` e modificarlo a dovere per poter vedere le nostre applicazioni girare come se fossero integrate, ma tranquilli arriverà una guida a proposito. 

Nei casi più generali dal punto di vista delle prestazioni non vi è alcun calo, personalmente ho potuto osservare che per software del calibro di Chromium ritarda qualche secondo nell'apertura

Un altro difetto che può essere fastidioso è che su GNOME non si possono appuntare le applicazioni installate con questo metodo

### Rpm-ostree

Questo terzo metodo a differenza dei primi due si tratta di fare una vera e propria estensione dei pacchetti di cui è composto il sistema di base.

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