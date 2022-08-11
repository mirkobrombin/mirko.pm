---
title: '#howto - Utilizzo ed installazione di AppImage'
date: 2020-12-21
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
**AppImage** è un formato portabile per la distribuzione software. Si tratta di pacchetti completi ed eseguibili, simili a Flatpak e Snap, ma diversamente da questi non dipende e non necessita di strumenti e librerie di terze parti.

Possiamo vedere questo come un formato di distribuzione universale su Linux, indipendente dalla distribuzione.

## Utilizzo
Una AppImage è un *archivio compresso* dell'intera applicazione, e in base alla scelta dello sviluppatore può contenere tutte le dipendenze necessarie al suo corretto funzionamento o sfruttare quelle di sistema.

Prendiamo come esempio **Bottles**, un gestore di prefissi Wine distribuito appunto come AppImage. Scarichiamo l'ultima versione dalla [repository ufficiale](https://github.com/bottlesdevs/Bottles/releases/tag/continuous) (il file .AppImage). Una volta scaricato, portiamoci alla sua posizione ed impostiamo i permessi di esecuzione:

```bash
chmod +x Bottles*.AppImage
```

Infine eseguiamo semplicemente il file:

```bash
./Bottles*.AppImage
```

Questa operazione si può eseguire fuori dal terminale, modificando le proprietà del file direttamente dal gestore file di sistema (ad esempio *Nautilus* su GNOME o *dolphin* su KDE).

## Installazione
Come abbiamo detto, si tratta di file completi eseguibili e non occorre installarli.

Alcune AppImage sono auto-installanti, e infatti si integrano nel menù applicazioni al primo avvio. Non tutti gli sviluppatori offrono questa opzione, ma possiamo andare oltre il problema sfruttando *AppImageLauncher*, uno strumento che rileva le AppImage nel nostro sistema e le installa automaticamente.

Scarichiamo l'ultima versione per la nostra architettura dalla [repository ufficiale](https://github.com/TheAssassin/AppImageLauncher/releases/tag/continuous) (è disponibile in diversi formati: rpm, deb e AppImage, rimanendo in tema sceglieremo quest'ultimo). Una volta scaricato, rendiamo eseguibile il file:

```bash
chmod +x appimagelauncher*.AppImage
```

ed eseguiamolo:

```bash
./appimagelauncher*.AppImage
```

Ora, all'avvio di una qualsiasi AppImage, ci verrà proposto di installarla o semplicemente eseguirla.

