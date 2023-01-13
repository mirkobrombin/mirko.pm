---
class: post
title: "#howto - Installazione dell'ultima versione di Python 3 su CentOS 8/RHEL 8"
date: 2020-10-28
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python  
  - bash
---
**Python** è un linguaggio fondamentale per molti applicativi, come ad esempio <a href="https://linuxhub.it/articles/howto-come-installare-django-sulle-principali-distribuzioni-linux">Django</a> e Flask, entrambi framework utilizzati per lo sviluppo di applicazioni Web, ma non solo.

Dal **1 Gennaio 2020**, il team di sviluppo del linguaggio ha deciso di deprecare Python 2, in favore dell'ormai stabilissima terza versione.

Nelle repository base di CentOS 8 e RHEL 8, Python 3 è offerto nella versione *3.6.8*. Questa, seppur stabile, è una versione molto vecchia e potrebbe non essere compatibile con applicativi e librerie più recenti. In questa guida vedremo quindi come installare una seconda versione molto più recente (la *3.9.x* nel momento in cui scrivo) di Python 3 sul sistema.

## Dipendenze
Prima di procedere con l'installazione della versione interessata, assicuriamoci di avere un ambiente di sviluppo correttamente configurato.

Procediamo con un normale aggiornamento:

```bash
dnf update
```

e proseguiamo quindi con l'installazione degli strumenti per sviluppatori, sempre via `dnf`:

```bash
dnf groupinstall "Development Tools"
```

Installiamo anche alcune dipendenze necessarie alla compilazione:

```bash
dnf install bzip2-devel libffi-devel  openssl-devel wget
```

## Compilazione
Un processo di compilazione può spaventare chi non ci si è mai cimentato, ma si tratta in realtà di un qualcosa di semplice e (in questo caso) rapido.

Scarichiamo un archivio aggiornato del codice dall'<a href="https://www.python.org/ftp/python/">indice ufficiale</a>. Nel momento in cui scrivo, l'ultima release è la *3.9*, procediamo quindi con questa.

Entriamo in una locazione pulita (ad esempio una cartella libera nella nostra */home*):

```bash
cd
mkdir python_source
cd python_source
```

e scarichiamo/estraiamo l'archivio al suo interno:

```bash
wget https://www.python.org/ftp/python/3.9.0/Python-3.9.0.tgz
tar xvf Python-3.*.tgz
```

Verrà creato un percorso col nome del nostro archivio, entriamoci e procediamo con la configurazione:

```bash
./configure --enable-optimizations
```

Infine compiliamo ed installiamo:

```bash
make altinstall
```

Ora, digitando il comando relativo alla versione appena compilata:

```bash
python3.9 --version
```

dovremmo ottenere in output la sua versione come conferma.

Assieme a Python viene installato *pip*, il gestore pacchetti del linguaggio. Possiamo accedere a questo tramite il comando *pip3.9* dove la versione cambia in base alla versione che abbiamo compilato.

