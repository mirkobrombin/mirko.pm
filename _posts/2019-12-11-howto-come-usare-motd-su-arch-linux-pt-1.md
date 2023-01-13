---
class: post
title: '#howto -  Come usare MOTD su Arch Linux - Pt. 1'
description: "MOTD o Message Of The Day è un programma che viene eseguito dalla shell di login.."
date: 2019-12-11
layout: post
author: Niccolò Martiri
author_github: talebian
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ssh
---
**MOTD**, o _Message Of The Day_ è un programma che viene eseguito dalla shell di login ( **getty** ) dopo aver fatto l'accesso e che può mostrare delle informazioni, statiche o dinamiche. MOTD per questo viene spesso usato nei server, dove viene mostrato dopo il login ssh, ma può essere funzionale anche su Ambienti Desktop standard a scopo di abbellimento grafico. Vediamo quindi come utilizzare MOTD.

## Utilizzare MOTD in modo statico

MOTD ha 2 possibilità di utilizzo, **statico**, per mostrare appunto informazioni statiche all'utente e **dinamico**, per mostrare informazioni dinamiche, le quali possono essere l'hardware, la versione del kernel o il nome della distro. Noi ora andremo a vedere come utilizzare MOTD in modo statico.

### Scrittura del MOTD

Prima cosa, assicurarsi di avere sul pc *pam_motd*, componente che sicuramente già avrai essendo parte di _PAM_, ma per sicurezza conrolliamo dando **` man pam_motd`** : se ti verrà restituito il manuale è sicuro che è già installato, quindi ora possiamo andare avanti a scrivere. Per modificare il MOTD basta semplicemente aprirlo con il nostro editor di testo preferito, grafico o da terminale non cambia, l'importante è che abbiamo permessi di amministratore, alla locazione */etc/motd*.

![Shell motd](storage/shell_motd.png)

**Apertura di /etc/motd con neovim, attenzione usate sudo**

Qui ora possiamo scrivere quel che vogliamo, anche un banale Ciao. Scritto il MOTD possiamo salvarlo.
Ora, per osservare se funziona basta aprire una finestra di _tty_ con la combinazione di tasti _` ctrl+alt+f2 `_ e fare il login. Fatto questo, insieme alla  nostra shell verrà stampato a schermo il MOTD.

![Edit motd](storage/edit_motd.png)

**Esempio di un MOTD statico**

## Conclusioni

Come detto in precedenza MOTD può anche essere utilizzato in modo dinamico, con degli script che ne modificano il contenuto ad ogni login, per cambiarne il comportamento e le informazioni rese. Nel prossimo articolo su MOTD vedremo come creare questi script e personalizzarlo più a fondo con tutte le funzioni della shell, come ad esempio un messaggo di _cowsay_

Per dubbi o chiarimenti non esitate a chiedere sul nostro <a href="https://t.me/gentedilinux">Gruppo Telegram</a>