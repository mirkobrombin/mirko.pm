---
title: '#howto - Aggiornamento del kernel su Debian/Ubuntu e derivate'
description: "Aggiornare il kernel di una distribuzione, è una operazione tanto semplice quanto indispensabile, nonostante spesso le di.."
published: 2019-11-03
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ubuntu
---
Aggiornare il kernel di una distribuzione, è una operazione tanto semplice quanto indispensabile, nonostante spesso le distribuzioni basate Debian, tendono a rallentare.

Un nuovo aggiornamento kernel, porta con se diversi miglioramenti, **risoluzioni di bug**, **supporto** a nuovo **hardware** e nuove funzionalità che **migliorano** in generale **le** **prestazioni** di sistema. In questa guida vediamo come aggiornare il kernel su distribuzioni come Debian, Ubuntu e derivate.

> Seppur il procedimento è semplice, non è completamente privo di rischi. In questa guida manteniamo la versione corrente del kernel installata sul sistema, la useremo nel caso il sistema rifiutasse l'avvio.

Ci sono diversi software e script pronti all'uso per semplificare questa operazione. Nello specifico oggi vediamo due metodi, quello da manuale che prevede l'installazione dei pacchetti precompilati da Ubuntu e quello semplificato tramite l'utilizzo di mainline.

## Metodo da manuale

Per prima cosa controlliamo tramite [kernel.ubuntu.com](https://kernel.ubuntu.com/~kernel-ppa/mainline/) la versione più recente disponibile del kernel, dove è importante fare attenzione alle build che contengono **RC** nel nome, questo significa che si tratta di una build ancora in fase di sviluppo e che potrebbe essere instabile, sconsiglio perciò la loro installazione.

Nel momento in cui scrivo, la versione più recente del pacchetto è la v5.3, portiamoci quindi alla sua directory nel sito e scarichiamo i seguenti pacchetti dalla lista dei proposti:

    linux-headers-5.3.0-050300_5.3.0-050300.201909152230_all.deb
    linux-headers-5.3.0-050300-generic_5.3.0-050300.201909152230_amd64.deb
    blinux-image-unsigned-5.3.0-050300-generic_5.3.0-050300.201909152230_amd64.deb
    linux-modules-5.3.0-050300-generic_5.3.0-050300.201909152230_amd64.deb

Una volta ottenuti i pacchetti qui sopra, portiamoci nella directory dove sono stati scaricati ed installiamoli mediante dpkg

    sudo dpkg -i linux-*.deb

Una volta terminata la procedura riavviamo il sistema e controlliamo la corretta installazione:

    uname -sr

## Metodo mainline

mainline (formalmente Ubuntu Kernel Update Utility) è uno strumento che semplifica di molto l'installazione del kernel su Ubuntu e derivate.

Prima di tutto scarichiamo una [versione recente](https://github.com/bkw777/mainline/releases) di mainline, dalla repository ufficiale del progetto.
Nello specifico ci servirà il pacchetto `.deb` più recente, che andremo ad installare via `dpkg`:

```bash
dpkg -i mainline*.deb
```

### Via interfaccia (GUI)

Avviamo l'interfaccia di mainline tramite l'icona presente nel menu applicazioni o tramite comando:

    mainline-gtk

L'applicazione si mostra con la lista dei kernel più recenti in prima posizione, da qui ci basterà selezionare il kernel di nostro interesse (normalmente l'ultimo è in cima) e premere il pulsante **Install** nella colonna di sinistra. Una volta terminato il processo di installazione automatizzato, ci verrà richiesto di riavviare il sistema.

Una volta riavviato digitiamo:

    uname -sr

per verificare la versione corrente del kernel e di conseguenza la sua corretta installazione.

### Via CLI

Prima di tutto mostriamo la lista dei kernel disponibili all'installazione via flag **--list**:

    mainline --list

l'attesa potrebbe essere particolarmente lunga e una volta terminato, mostrerà un output simile al seguente:

    =Available Kernels=
    v5.3.8                         5.3.8                     
    v5.3.7                         5.3.7                     
    v5.3.6                         5.3.6                     
    v5.3.5                         5.3.5                     
    v5.3.4                         5.3.4                     
    v5.3.3                         5.3.3                     
    v5.3.2                         5.3.2                     
    v5.3.1                         5.3.1                     
    v5.3                           5.3                      
    v5.2.21                        5.2.21         
    ...

in prima posizione troviamo il kernel più recente, ne copiamo il nome (prima colonna) e procediamo alla sua installazione via flag **--install**:

    sudo mainline --install v5.3.8

Una volta terminata l'installazione riavviamo e al successivo login verifichiamo la presenza del nuovo kernel:

    uname -sr

## Risoluzione avvio

Nel caso fosse impossibile avviare il sistema dopo l'installazione del nuovo kernel, teniamo premuto il pulsante **[SHIFT]** in fase di avvio del sistema per mostrare il **GRUB**, selezioniamo quindi la versione precedente del kernel.

Una volta avviato il sistema, possiamo procedere con la rimozione del kernel disinstallando i pacchetti (se usato il metodo da manuale) o tramite interfaccia mainline.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).

_?Good *nix_ **__Mirko_**