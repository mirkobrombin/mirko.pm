---
title: '#howto - Aprire e chiudere porte con firewalld'
description: "Firewalld è un potente strumento per il controllo del firewall su Linux."
date: 2019-11-13
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
**Firewalld** è un potente strumento per il controllo del firewall su Linux.

Si tratta di un frontend del framework netfilter del kernel Linux e viene usato come alternativa semplificata dello strumento da riga di comando: **nft**.

Tutte le istruzioni vengono impartite mediante comando firewall-cmd. In questa guida vediamo come svolgere delle operazioni standard, ossia aprire e chiudere una porta predefinita o personalizzata.

## Aprire/chiudere una porta
L'esigenza più comune per chi gestisce un server è l'apertura di eventuali porte, permettendo quindi il passaggio di traffico.

> Notare che ad ogni apertura/chiusura di una porta, è necessario effettuare il reload delle regole del firewall mediante opzione **--reload**.

Per aprire una porta tramite firewall-cmd, dobbiamo utilizzare l'opzione **--add-port**, eventualmente preceduta da **--permanent** per renderla permanente:
```
firewall-cmd --permanent --add-port=9000/tcp
firewall-cmd --reload
```
### Range di porte
Possiamo aprire un range di porte (ex. da 9000 a 9010) dividendo porta iniziale e finale, nello specifico in questo modo:
```
firewall-cmd --permanent --add-port=9000-9010/tcp
firewall-cmd --reload
```
vengono quindi aperte tutte le porte dalla 9000 alla 9010, per intenderci la porta 8999 non verrà resa disponibile.
### Porte predefinite
Usando l'opzione **--add-service** possiamo aprire porte standard per un servizio. Ad esempio per quanto riguarda la porta utilizzata da web server come Nginx o Apache, possiamo usare il servizio **http**:
```
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```
in questo modo verrà aperta la porta **80**.
Possiamo trovare la lista dei servizi disponibile mediante opzione **--list-services**:
```
firewall-cmd --list-services
```
### Chiudere una porta
Chiudere una porta richiede il procedimento inverso usato nell'apertura, adottando quindi l'opzione **--remove-port** in questo modo:
```
firewall-cmd --remove-port=9000/tcp
firewall-cmd --reload
```
## Lista delle porte
Altrettanto utile è la lista delle porte aperte, ottenibile tramite opzione **--list-ports**, la quale restituirà come output tutte le regole attive nel firewall:
```
firewall-cmd --list-ports
```

Per dubbi e chiarimenti, utilizzate il nostro <a href="https://t.me/gentedilinux">gruppo Telegram</a>.

?Good *nix _Mirko