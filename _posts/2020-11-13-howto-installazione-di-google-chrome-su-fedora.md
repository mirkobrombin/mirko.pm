---
class: post
title: '#howto - Installazione di Google Chrome su Fedora'
date: 2020-11-13
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - fedora
  - bash
---
**Fedora** di default presenta come browser Mozilla Firefox. Sebbene quest'ultimo sia un ottimo programma, alcune persone potrebbero preferire utilizzare **Google Chrome**.

In questa guida vedremo come installare facilmente Google Chrome su Fedora utilizzando due metodi.

## Installazione di Google Chrome su Fedora

### Installazione da file

La prima, quella forse più semplice, è l'installazione da **file**. Accedendo al [sito ufficiale di Google Chrome](https://www.google.com/chrome/), premete il tasto blu "Scarica Chrome", selezionate il file ".rpm" quando viene chiesto quale pacchetto scaricare, e accettate i termini di servizio.

Al termine del download, fai doppio clic sul file e premi il bottone "Installa" quando richiesto dal gestore dei pacchetti. Digita la tua password se richiesto e attendi fino al termine del processo. A quel punto, Chrome dovrebbe essere stato installato correttamente.

### Installazione da terminale

È possibile installare Google Chrome su Fedora anche da **terminale**. Per prima cosa, apriamo il terminale e aggiungiamo le repository per software di terza parte:

```bash
dnf install fedora-workstation-repositories
```

abilitiamo la repo di Chrome:

```bash
dnf config-manager --set-enabled google-chrome
```

installiamo Chrome:

```bash
dnf install google-chrome-stable
```

accettiamo l'inserimento nel sistema della chiave GPG e attendiamo il termine dell'installazione.

