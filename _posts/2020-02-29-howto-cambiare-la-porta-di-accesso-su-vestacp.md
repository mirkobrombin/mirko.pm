---
title: '#howto - Cambiare la porta di accesso su VestaCP'
description: "VestaCP è un pannello di gestione e controllo per web server Nginx + php-fpm e/o Apache, oltre che database server come MySQL e.."
date: 2020-02-29
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - debian  
  - ubuntu  
  - centos 
  - vestacp  
  - php  
  - bash
---
**VestaCP** è un pannello di gestione e controllo per web server Nginx + php-fpm e/o Apache, oltre che database server come MySQL e PostgreSQL.

Uno dei punti forza di questo pannello è la semplicità d'uso, ma in esso troviamo funzionalità interessanti come la gestione del firewall ed il monitoring del carico della CPU e della RAM.

Abbiamo già visto <a href="https://linuxhub.it/articles/howto-%E2%80%93-installazione-di-vestacp-su-centos-7-debian-ubuntu">come installare VestaCP su Centos 7, Debian ed Ubuntu</a>. In questa guida vediamo invece come modificare la porta d'accesso standard *8083* in una alternativa, in modo da renderne più difficile l'individuazione e riducendo quindi la facile esposizione all'accesso.

## Impostazione del firewall
Prima di tutto ci dobbiamo accertare che la porta che abbiamo scelto (nel nostro esempio sarà la *9021*) non sia già in uso da un altro processo. Per fare ciò sfruttiamo il tool *netstat* filtrando per la porta desiderata tramite *grep*:
```bash
netstat -tulpn | grep :9021
```
controlliamo l'output e se la nostra porta risulta libera procediamo alla configurazione del firewall.

Per questo step si può ricorrere all'uso di iptables o firewalld come spiegato <a href="https://linuxhub.it/articles/howto-aprire-e-chiudere-porte-con-firewalld">qui</a>. La procedura che andremo ad utilizzare in questa guida è tramite il pannello stesso di VestaCP, precisamente portiamoci alla voce **Firewall** ed aggiungiamo una nuova regola come segue:
* **Action** - ACCEPT
* **Protocol** - TCP
* **Port** - 9021
* **Ip Address** - 0.0.0.0/0
* **Comment** - VESTA

sostituendo la porta con quella da voi scelta. Una volta salvato, Vesta dovrebbe caricare subito la nuova regola ma questo non sempre avviene, e ciò che consiglio è di riavviare a mano il servizio o il server stesso nel caso non siate sicuri.

## Configurazione di Vesta
Ora dobbiamo istruire il server delle recenti modifiche, portiamoci quindi al file in locazione `/usr/local/vesta/nginx/conf/nginx.conf`, precisamente alla seguente porzione:
```
# Vhost
    server {
        listen          8083;
```

e modifichiamo il valore *8083* con quello nuovo che nel nostro esempio è *9021*, salviamo il file e riavviamo vesta via systemctl:
```bash
systemctl restart vesta
```
Se la nuova porta è stata accettata ci basterà visitare il nuovo percorso (`indirizzo-ip-pubblico:9021`) per effettuare l'accesso. In alternativa, se non dovesse funzionare, facciamo riferimento a *journalctl* per maggiori informazioni:
```bash
journalctl -xe
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).