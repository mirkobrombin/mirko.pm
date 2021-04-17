---
title: '#howto - Introduzione a systemd'
published: 2020-01-18
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash  - systemd  - bash  - systemd
---
**systemd** è un init system, gestore dei servizi e molto altro. Egli, essendo il primo processo avviato dal kernel al boot, avrà _PID 1_ e dal suo avvio inizierà ad inizializzare il sistema, avviando tutti i servizi necessari. Ma **systemd** è anche più di questo, egli è anche fornito di un set di funzioni di gestione del sistema, che vanno da un _boot loader_, ad un _software di gestione della rete_ e molti altri.

systemd è stato sviluppato da Red Hat e dal suo rilascio, una gran parte delle distro è passato a questo sistema di init, tra cui Ubuntu, Arch Linux e Fedora.

![Systemd dark](storage/systemd-dark.png)

## Come funziona systemd

Per l'appunto, systemd ha le funzioni di gestione dei servizi e init system, quindi all'avvio eseguirà tutte le procedure per completare il boot del nostro sistema e avvierà tutti i servizi utili al funzionamento di esso (es. NetworkManager, bluetooth).

Dopo il boot systemd continua a dare supporto all'utente con varie utility, come ad esempio _systemd-networkd_, per la gestione delle reti, ma uno strumento che possiamo usare prima dell'avvio di linux, _systemd-boot_, un bootloader, a mio parere molto veloce.

### systemd all'avvio

All'avvio _systemd_ procede col montare delle partizioni come definito nell'fstab. Dopo di questo, cerca il _default.target_, che è un link a uno dei target disponibili, solitamente graphical.target, sui server solitamente si usa multi-user.target, specifico per CLI, invece graphical è specifico per GUI. Quindi systemd avvierà tutti i servizi richiesti da quel target e procederà ad avviare servizi primari, secondari e il Display Manager.



### Comandi base

Come già detto, systemd ci permette anche di gestire i servizi, per farlo dobbiamo usare un tool integrato in systemd, **systemctl**, che ci permette tra le cose di spegnere, riavviare e sospendere il dispositivo, ma appunto anche abilitare, disabilitare, fermare e avviare i servizi.

Facciamo un esempio, se volessimo abilitare _systemd-networkd_ dobbiamo prima abilitare il suo servizio, e per farlo dobbiamo usare:

```bash
sudo systemctl enable systemd-networkd.service
sudo systemctl start systemd-networkd.service

# Possiamo anche abilitarlo e avviarlo in un solo comando

sudo systemctl enable systemd-networkd.service --now
```

Con _systemctl_ possiamo inoltre vedere lo status di un servizio:

```shell
systemctl status systemd-networkd.service
```
![Systemd status](storage/systemd-status.jpg)

qui possiamo vedere se il servizio è attivo, disattivo oppure se ha avuto un problema.

## Conclusioni

Questo è un primo inizio di gestione dei servizi con systemd, ma ci sono molte altre opzioni di gestione e daemon utili per l'utente. Nel prossimo articolo vedremo una gestione più approfondita dei servizi e della risoluzione dei problemi legata all'avvio, di servizi o sistema, usando journalctl.

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://linuxhub.it/t.me/gentedilinux).

