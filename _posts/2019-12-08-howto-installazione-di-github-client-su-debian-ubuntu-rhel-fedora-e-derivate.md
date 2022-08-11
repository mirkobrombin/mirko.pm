---
title: '#howto - Installazione di GitHub Client su Debian/Ubuntu RHEL/Fedora e derivate'
description: "GitHub Client è il client ufficiale per l'omonima piattaforma. Offre molte funzionalità e permette di gestire ed interagire con ogni repos.."
date: 2019-12-08
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - debian  
  - github
---
GitHub Client è il client ufficiale per l'omonima piattaforma. Offre molte funzionalità e permette di gestire ed interagire con ogni repository.

Purtroppo ad oggi non esiste una via ufficiale per installarlo su sistemi Linux, ma ciò nonostante è disponibile un fork che mette a disposizione binari non ufficiali, compatibili con le principali distribuzioni (Debian/Ubuntu/RHEL/Fedora e derivate), presenti in varie AppImage e snap package.

> È importante tenere in considerazione che si tratta di pacchetti non ufficiali. GitHub non è responsabile per eventuali bug, per tale motivo è necessario riferirsi <a href="https://github.com/shiftkey/desktop">qui</a> per eventuali problematiche.

## Installazione
Prima di tutto rechiamoci alla pagina <a href="https://github.com/shiftkey/desktop/releases">Releases</a>.

Nella lista che ci si presenta, portiamoci alla versione più recente (normalmente in cima), qui vediamo più binari disponibili in vari formati, specifici per la nostra distribuzione o gestore pacchetti.

## Debian/Ubuntu e derivate
Per quanto riguarda la famiglia di distribuzioni debian, scarichiamo il pacchetto che termina con l'estensione **.deb**, ad esempio: `GitHubDesktop-linux-2.1.0-linux1.deb`.

Portiamoci al percorso in cui abbiamo scaricato il pacchetto ed installiamolo via *dpkg*:
```
sudo dpkg -i GitHubDesktop*.deb
sudo apt install -f
```
## RHEL/Fedora e derivate
In questo caso è necessario scaricare dalla lista il pacchetto che termina per **.rpm**, ad esempio: `GitHubDesktop-linux-2.1.0-linux1.deb`. Installiamolo quindi via *dnf*:
```
sudo dnf install GitHubDesktop*.rpm
```
nel caso in cui non fosse presente *dnf*, procediamo tramite *rpm*:
```
sudo rpm -U GitHubDesktop*.rpm
```

## AppImage
Un pacchetto AppImage è un formato portatile, non necessita di installazione ed è possibile eseguirlo sin da subito. Scarichiamo dalla lista il pacchetto che termina per **.AppImage** ad esempio: `GitHubDesktop-linux-2.1.0-linux1.AppImage` ed impostiamo i permessi di esecuzione:
```
sudo chmod +x GitHubDesktop*.AppImage
```

## Snap
Snap è il gestore pacchetti ideato e sviluppato da Canonical. Similare a flatpak come struttura, permette l'installazione di pacchetti snap via repository di terze parti o localmente.

Scarichiamo dalla lista il pacchetto che termina per **.snap**, ad esempio: `GitHubDesktop-linux-2.1.0-linux1.snap` ed installiamolo via *snap*:

```
sudo snap install GitHubDesktop*.snap
```

Per dubbi e chiarimenti, utilizzate il nostro <a href="https://t.me/gentedilinux">gruppo Telegram</a>.

?Good *nix _Mirko