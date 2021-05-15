---
title: '#howto - Usare e comprendere Systemd' 
published: 2021-05-17
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- bash 
- systemd 
---

Osannato da alcuni, odiato da altri, **systemd** rappresenta. nel mondo linux, uno degli *strumenti di gestione centralizzata di init, demoni, librerie e amministrazione del sistema* più completo nel panorama. 

Non entreremo del merito del perché sia uno dei software più controversi, ma impareremo ad usarlo e capirne i meccanismi base.



## la compilation di tool che offre

Avvio dei processi, log, monitoraggio del sistema della sessione e anche dei tempi di avvio. Systemd ha una serie di tool che utilizzati possono analizzare tutti questi aspetti, vediamo quali sono i comandi da terminale che possiamo utilizzare: 

- systemctl
- journalctl
- systemd-notify
- systemd-analyze
- systemd-cgls
- systemd-cgtop
- loginctl
- systemd-nspawn

Tra questi approfondiremo **systemctl**,**journalctl**,**systemd-analyze**, **systemd-cgtop** e **loginctl** 


## Abilitare, avviare e gestire i servizi con systemctl

Il tool più abusato sicuramente, avvia i servizi  e ha alcune funzioni per la gestione della sessione.

### cosa sono i servizi

I servizi, o demoni di sistema, sono software che per lo più girano di sottofondo generando l'ambiente in cui l'utente e i programmi operano.

Tutti i servizi si trovano nella cartelle cartelle contenute in `/etc/systemd` e `/lib/systemd`

Normalmente i servizi sono nella cartella `system`,  acuni servizi, attivabili non a livello di sistema ma solo in sessione da un utente, son contenute nelle cartella `user`

#### attivare e disattivare i servizi

Un servizio **attivato** è un servizio che si avvia con il sistema, per farlo:  

`systemctl enable nomeservizio`   

Può essere poi disattivato con `systemctl disable nomeservizio` 

#### avviare un servizio e fermarlo

per avviare un servizio immediatamente digitare: 
`systemctl start nomeservice`   

per fermarlo 

`systemctl stop nomeservizio `  



Si può eventualmente "**riavviare**" con il comando: 
`systemctl restart nomeservizio `  

Ma ancora meglio, uno dei comandi più utili è sicuramente   

`systemctl enable --now nomeservizio`  

#### il caso `--user`

Se il servizio è in una directory **user** e non system, può essere avviato usando il parametro `--user`. Normalmente si usano questi servizi per limitare le tipologie di utenti che possono avviare quel servizio e più nel particolare, normalmente, lo si fa per far si che alcuni servizi possano essere abilitati senza permessi di amministratore.

### scrivere un servizio

Possiamo scrivere un servizio Systemd da noi, posizioniamoci nella cartella `/etc/systemd/system` e scrivendo un file che ha come estensione `.service` 

Vediamo la struttura base di un servizio 



### altre funzioni : avvio e sessione

### tabella dei comandi systemctl

La seguente tabella è stata presa da : https://github.com/PsykeDady/Archlinux_installazione e rappresenta un riassunto delle funzioni principali di `systemctl` e relativi comandi

|       sudo?        | comando                                       | spiegazione                                                  |
| :----------------: | :-------------------------------------------- | :----------------------------------------------------------- |
| :white_check_mark: | `systemctl enable <servizio>`                 | abilita il servizio all’avvio, che viene quindi attivato ogni qualvolta accedete |
| :white_check_mark: | `systemctl start <servizio>`                  | avvia immediatamente il servizio                             |
| :white_check_mark: | `systemctl restart <servizio>`                | spegne e riavvia il servizio                                 |
| :white_check_mark: | `systemctl stop <servizio>`                   | spegne il servizio, contrario di start                       |
| :white_check_mark: | `systemctl disable <servizio>`                | disabilita il servizio, contrario di enable                  |
| :white_check_mark: | `systemctl status <servizio>`                 | controlla lo stato del servizio, se è attivo, in errore o spento |
| :heavy_minus_sign: | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
|                    | `systemctl poweroff`                          | spegne il sistema                                            |
|                    | `systemctl reboot`                            | riavvia il sistema                                           |
|                    | `systemctl hibernate`                         | iberna il sistema, da usare solo se avete  attivato l’ibernazione in modo corretto |
|                    | `systemctl suspend`                           | sospende il sistema                                          |
|                    | `systemctl suspend-then-hibernate`            | sospende per un certo periodo di tempo.  Poi iberna          |
|                    | `systemctl hybrid-sleep`                      | Sospende e iberna il sistema. Così che se la batteria si scarica, il pc è comunque ibernato |



## Monitorare i servizi e i log con journalctl



## Analizzare i servizi e i tempi di avvio con Systemd-Analyze



## Le sessioni utente e loginctl



- loginctl list-sessions

- loginctl lock-session ID 
- loginctl unlock-session ID 
- loginctl lock-sessions
- loginctl unlock-sessions
- loginctl kill-user nomeutente




Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).