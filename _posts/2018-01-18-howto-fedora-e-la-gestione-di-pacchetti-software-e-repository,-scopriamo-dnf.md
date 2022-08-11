---
title: "#howto - Guida all'utilizzo di DNF come gestore pacchetti"
date: 2018-01-18
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - fedora  
  - python
---
**Fedora** è la distribuzione sponsorizzata da **Red** **Hat** su cui basano **Red Hat Enterpise**, vediamo una guida a **DNF** che altro non è che la nuova versione di **yum** (il vecchio gestore di pacchetti) riscritto, inizialmente in **python** successivamente in **c**, e migliorando sopratutto la velocità di elaborazione e la gestione delle dipendenze. 


## Repository
Vediamo ad esempio come abilitare i repository per utilizzare il ramo testing di fedora: per prima cosa vediamo la lista dei repository abilitati con il comando

<pre>sudo dnf repolist</pre>

Per abilitare o disabilitare temporaneamente un repo i comandi da dare sono i seguenti

<pre>sudo dnf --enablerepo=<nomerepo></pre>

<pre>sudo dnf --disablerepo=<nomerepo></pre>

Se Per esempio vuoi abilitare l'aggiornamento del kernel dai repository testing di fedora puoi dare il seguente comando

<pre>sudo dnf --enablerepo=updates-testing install kernel\*</pre>

Altra particolarità di DNF è che puoi combinare i comandi di abilitazione e disabilitazione nella solita stringa

<pre>sudo dnf --enablerepo=repo1 --disablerepo=repo2, repo3 install <package></pre>

### Modifiche definitive

Se si vuole apportare una modifica definitiva allora dobbiamo dare i seguenti comandi

<pre>sudo dnf config-manager --set-enabled <nomerepo></pre>

<pre>sudo dnf config-manager --set-disabled <nomerepo></pre>

Se vogliamo tornare allo stato originale della lista repo, non dobbiamo far altro che digitare il comando precedente per la modifica definitiva e disabilitare i repo non voluti. sucessivamente dare il comand

<pre>sudo dnf distro-sync</pre>

Se invece vogliamo aggiungere un repository

<pre>sudo dnf config-manager -- add URL</pre>

## Cache ed aggiornamenti
Se vogliamo pulire la cache per "azzerare" DNF in caso di operazioni non andati a buon fine basta usare il comando

<pre>sudo dnf clean all</pre>

per cercare gli aggiornamenti usiamo

<pre>sudo dnf check-update</pre>

vediamo i tre comandi che permettono tre tipi di aggiornamento:

<pre>sudo dnf update</pre>

permette di aggiornare senza rimuovere i pacchetti obsoleti Il secondo

<pre>sudo dnf upgrade</pre>

## Installazione pacchetti
Per installare, rimuovere i pacchetti e rimuovere le dipendenze che non sono più necessarie, utilizzare i seguenti comandi:

<pre>sudo dnf install nomepacchetto</pre>

<pre>sudo dnf remove nomepacchetto</pre>

<pre>sudo dnf autoremove</pre>

Vi consiglio sempre di non copiare i comandi, ma di replicarli sul terminale dopo aver capito cosa fanno, un comando copiato e incollato non è altro che una serie di click, un comando digitato piano piano vi permette di memorizzare il comando e farlo vostro.