---
title: '#howto - Installare Xbox Cloud Gaming su Linux'
date: 2022-03-25 17:20
layout: post
author: Floppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags:
- ubuntu
- fedora
- archlinux
- gaming
---

Xbox Cloud Gaming è la nuova piattaforma Microsoft per il gaming sul cloud, diretta concorrente di Google Stadia e Amazon Luna.  
Nonostante la piattaforma sia ancora in sviluppo e non ci sia un vero e proprio port per Linux è possibile usufruire di questo servizio attraverso il port di Microsoft Edge ed attraverso alcuni tweaks che la stessa Microsoft ha reso disponibili.

Quindi preparatevi and entrare nel cloud della Microsoft con il vostro pinguino.

## Setup iniziale

Prima di tutto dobbiamo installare **Microsoft Edge Beta** tramite flatpak (per chi non sapesse cos'è dia un occhiata a [questo articolo](https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub/)

```bash
flatpak install com.microsoft.Edge
```

Dopodichè apriamo Steam, in basso a sinistra cliccate su "_ADD A GAME_" > "_ADD A NON STEAM GAME_", questo vi apre un menu con tutte le applicazioni installate sul
vostro pc scorrete in basso finchè non trovate **Microsof Edge (beta)**, mettete la spunta nella checkbox a sinistra e cliccate _ADD SELECTED PROGRAMS_.  

Perfetto ora sulla vostra libreria steam dovreste trovare Microsoft Edge.

Prima di passare alla parte successiva scaricate lo zip icone di Xbox Cloud da inserire dentro Steam a questo [link](https://aka.ms/EdgeXboxDeckArt).  
Estraendo lo zip troverete tre jpg:

- Xbox_Cloud_Gaming_Banner.jpg
- Xbox_Cloud_Gaming_Capsule.jpg
- Xbox_Cloud_Gaming_Icon.jpg

Che andranno messi nelle apposite sezioni.

## Configurazione di Xbox Cloud Gaming

Ora sempre sulla libreria di Steam, "_tasto destro su Microsoft Edge_" > "_Properties nel menu_", vi si aprira un menù nel quale cambieremo il nome da _Microsoft Edge (beta)_ a _Xbox Cloud Gaming_, imposteremo l'icona (clickando sull'area grigio scuro accanto al nome) inserendo l'_Xbox_Cloud_Gaming_Icon.jpg_, ed infine aggiungiamo nella sezione _LAUNCH OPTIONS_:

```bash
 --window-size=1024,640 --force-device-scale-factor=1.25 --device-scale-factor=1.25 --kiosk "https://www.xbox.com/play"
```

Ora possiamo chiudere il menu e inserire il banner e la capsule rispettivamente nelle aree grigio scure che avete sulla schermata di Xbox Cloud Gaming.

## Utilizzo

Finita la configurazione possiamo premere Play, si avvierà l'app di Xbox Cloud che essenzialmente sarà una pagina full screen di Microsof Edge nella quale dovremo loggarci con il nostro account Microsoft.

Fatto ciò avremo finito, potremo godere della libreria di Xbox Cloud sulla nostra macchina Linux e godere di alcune features quali:

- Utilizzare il Game Pass di Microsoft.
- Giocare a giochi che non sono compatibili con Proton/Wine attraverso il cloud di Xbox.
- Giocare anche fuori casa purchè si abbia una connessione ad internet.

Ovviamente non è tutto rose e fiori, ci sono anche dei contro:

- Questa è una piattaforma ancora in beta e perciò le performance non saranno al massimo.
- Saremo dipendenti da una buona connessione internet a cui alcune persone potrebbero non avere accesso.
- Questo non è un vero e proprio port di Xbox Cloud su Linux ma più una forzatura ad utilizzare Microsoft Edge per accedere al servizio.

## Conclusioni

In conclusione per dare giudizi finali sarebbe bene aspettare l'uscita ufficiale sia del port di Microsoft Edge che di Xbox Gaming Cloud per avere un effettivo riscontro delle vere performance.

Dopodichè rimangono due problemi del Cloud Gaming, uno legato ad un costante ed obligatorio networking e due dalla necessità di avere un'ottima connessione internet.

Se il primo problema è soggettivo di come una persona interpreta il videogiocare, il secondo problema rimane oggettivo in quanto dipende da fattori terzi come appunto essere raggiunti da una fibra ottica.
