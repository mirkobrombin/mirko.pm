---
title: '#howto - Installazione e uso di gtop'
description: "In questa guida vediamo come installare gtop oltre che ad una breve introduzione a questo sistema di monitoraggio basato su NodeJS."
published: 2019-07-18
layout: post
author: Hersel Giannella
author_github: hersel
tags:
  - debian
---
In questa guida vediamo come installare **gtop** oltre che ad una breve introduzione a questo sistema di monitoraggio basato su NodeJS.

## Installazione di NodeJS

Inanzitutto è essenziale installare NodeJS per il funzionamento di **gtop**.  
Abbiamo scritto una guida semplificata in merito a cui vi rimando [qui](https://linuxhub.it/article/howto-installare-node-version-manager-nvm-su-debian-9 ).

## Installazione

L'installazione è semplice grazie all'utilizzo di npm, il package manager affiancato a NodeJS, procediamo quindi all'installazione in questo modo:

    npm install gtop -g

### Utilizzo

Una volta installato, possiamo banalmente avviarlo da comando:

    gtop

a questo punto dovremmo ricevere un output simile al seguente:

![gtop](https://linuxhub.it/wordpress/wp-content/uploads/2019/07/GTOP.PNG)

Vediamo ora qualche opzione interessante per sfruttare al meglio questa dashboard, digitando:

*   **p** filtriamo i processi dal loro ID
*   **c** filtriamo per uso della CPU
*   **m** per memoria usata

digitiamo infine **q** per uscire dal programma.