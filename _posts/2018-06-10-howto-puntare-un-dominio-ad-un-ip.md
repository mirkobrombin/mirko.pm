---
title: '#howto - Puntare un dominio ad un IP'
description: "Capita spesso e volentieri di dover collegare un nome a dominio ad un indirizzo IP.."
published: 2018-06-10
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Capita spesso e volentieri di dover collegare un **nome** **a** **dominio** ad un **indirizzo IP,** rendendo facilmente agibile un server o una locazione online.

I nomi a dominio sono letteralmente maschere, ad esempio **Google.it** é la maschera dell'indirizzo IP **216.58.198.35** ed é un metodo semplice di accedere a **Google.**

## Prendiamo l'indirizzo IP

Nel caso non fossimo a conoscenza dell'indirizzo IP della nostra macchina, possiamo reperirlo con un semplice comando:

    curl ipinfo.io/ip

che ci restituirá l'indirizzo IP pubblico della macchina, nel nostro esempio sará 0.0.0.0.

## Le zone DNS

Un dominio per funzionare, deve avere delle zone DNS. Colleghiamoci quindi al sito web del nostro registrar (dove abbiamo comprato il nome a dominio) e rechiamoci nella gestione dei DNS.

In questa schermata, di norma, é possibile gestire le zone DNS di un dominio. Ci sono diverse tipologie di record DNS (A, CNAME, MX, ..) ogni uno per uno scopo specifico. Nel nostro caso il dominio verrá utilizzato per accedere ad un server web, avremo quindi bisogno di due soli record **(A, CNAME).**

Creiamo il primo record, di tipo **A** con nome **@**? e valore 0.0.0.0 (ossia l'indirizzo ip pubblico della vostra macchina). Questo record permetterá l'indirizzamento del traffico dalla maschera all'indirizzo IP.

Creiamo ora il secondo record, questa volta di tipo **CNAME** con nome **www** e valore **dominio.ex** (ossia il vostro dominio, ad esempio linuxhub.it). Questo record é un semplice alias, una maschera che reindirizza il traffico alla maschera principale (@) che, a sua volta, renderizza il traffico all'indirizzo IP.

_Good ***nix**?_  
_ - Mirko_