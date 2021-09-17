---
title: '#howto - Gestione dei servizi di Runit' 
date: 2021-09-17 10:00
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit 
tags: 
- init 
- daemon 
- systemd
- runit
---



## Introduzione

Systemd è, ad oggi, il sistema di init di default in moltissime distribuzioni. La piu grande controversia a riguardo è che sia un'intero set di software per la gestione del sistema, non rispettando quella filosofia tipica dei sistemi unix in cui generalmente si tende a specializzare l'obiettivo di un software e non generalizzarlo.  
Questo ha portato alcuni utenti ad usare diverse soluzioni, una di queste é **runit**.


> Nota bene: 
> 
> Le distribuzioni supportate da questo articolo sono:  
> Artix Linux, Void Linux e Devuan.
> Tuttavia i contenuti dell'articolo possono adattarsi anche ad altre distribuzioni



## Servizi di Runit

I servizi non sono altro che cartelle che si possono trovare in una posizione dipendente dal sistema

| Distro | Cartella dei servizi |
| ------:|:-------------------- |
| Artix  | /etc/runit/sv/       |
| Void   | /etc/sv/             |
| Devuan | /etc/sv/             |



## Attivazione dei servizi

Per abilitare ed avviare un servizio basta fare un collegamento dalla cartella dei servizi a quella di esecuzione, anche essa dipendente dal sistema

| Distro | Cartella di esecuzione |
| ------:| ---------------------- |
| Artix  | /var/run/              |
| Void   | /var/service/          |
| Devuan | /var/run/              |



Quindi se per esempio volessi abilitare ed avviare il servizio `gdm` su Void mi basterebbe eseguire il comando:

```bash
ln -s /etc/sv/gdm/ /var/service/
```

Mentre per disabilitarlo dovrei fare:

```bash
unlink /var/service/gdm
```

o rimuovere il symlink con rm ([i comandi di rimozione sono stati trattati in questo articolo](https://linuxhub.it/articles/howto-shredding-e-rimozione-dei-file/)).



## Comando sv

Per gestire i servizi abilitati è possibile usare il comando `sv`.

Ecco alcuni dei comandi utili di sv:

| Comando     | Utilizzo                                        |
| -----------:|:----------------------------------------------- |
| `sv down`   | Ferma un servizio                               |
| `sv up`     | Avvia un servizio e tienilo attivo              |
| `sv once`   | Avvia un servizio una sola volta                |
| `sv status` | Controlla lo stato di esecuzione di un servizio |



## Conclusione

Allora, hai intenzione di provare una distribuzione con runit oppure hai delle domande da porci? Vieni a farlo sul nostro [gruppo telegram](https://t.me/linuxpeople)!


