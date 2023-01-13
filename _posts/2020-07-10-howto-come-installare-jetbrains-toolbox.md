---
class: post
title: '#howto - Installazione di  JetBrains Toolbox su Linux'
date: 2020-07-10
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**JetBrains Toolbox** è un'applicazione creata da JetBrains che permette di gestire comodamente tutti i programmi della propria suite, che per lo più include IDE per molti linguaggi di programmazione, ma non solo. 

Alcuni dei punti di forza di questo programma sono la possibilità di aggiornare automaticamente i software, ma anche i plugin se necessario, o persino fare il rollback delle versioni in caso di problemi.

## Installazione

Per prima cosa è necessario scaricare da <a href="https://www.jetbrains.com/toolbox-app/download/download-thanks.html?platform=linux">dal sito ufficiale</a> il pacchetto *tar.gz* della Toolbox. È possibile utilizzare anche un comando da terminale sfruttando `wget` e il link diretto, tuttavia con questo metodo è garantita sempre l'**ultima versione** del software.

Apriamo il terminale dove si trova l'archivio appena scaricato ed estraiamolo:

```bash
tar xzf /percorso/di/jetbrains-toolbox-versione.tar.gz
```

Entriamo nel percorso dei file scompattati:

```bash
cd jetbrains-toolbox-versione
```

ed impostiamo il permesso di esecuzione all'unico file presente:

```bash
chmod +x jetbrains-toolbox
```

Infine avviamo la Toolbox:

```bash
./jetbrains-toolbox
```

Dopo alcuni secondi appare una schermata dove si chiede di accettare l'**EULA**. Una volta fatto ciò si presenterà il programma pronto per scaricare tutti gli IDE necessari.

> Per utilizzare alcuni IDE è necessario possedere un abbonamento o licenza acquistabile direttamente presso JetBrains.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.