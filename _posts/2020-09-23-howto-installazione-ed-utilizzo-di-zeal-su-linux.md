---
title: '#howto -  installazione ed utilizzo di Zeal su Linux'
published: 2020-09-23
layout: post
author: Andrea Guzzon
author_github: beard33
tags:
  - github  - bash
---
Da studente spesso mi ritrovo a scrivere del codice in mobilità e più volte mi sono scontrato con la necessità di consultare una documentazione in assenza di connessione. La soluzione al problema è data da **Zeal**.

Zeal è un *docset offline*, alternativa open source disponibile per tutte le piattaforme della più famosa applicazione *Dash*, disponibile purtropppo solo per MacOS.

In questa guida vedremo come installarlo sulle principali distribuzioni ed utilizzarlo per avere sempre disponibili con noi le documentazioni di cui necessitiamo.

## Installazione
Per installare Zeal abbiamo due possibilità:
- scaricare i file dalle repository ufficiali della nostra distribuzione
- compilarlo manualmente dal sorgente presente su GitHub
  
### Installazione da repository:
Zeal è disponibile come applicazione ufficiale all'interno dei repository di tutte le principali distribuzioni, pertanto non avrete bisogno di configurare repository esterne o simili.

#### Ubuntu e derivate
Per installare Zeal su Ubuntu, Debian o derivate utilizziamo `apt`:

```bash
apt install zeal
```

#### Fedora e derivate
Su Fedora, CentOS o RHEL sfruttiamo `dnf`:

```bash
dnf install zeal
```

#### Arch Linux
Su Arch Linux è possibile usare `pacman`:

```bash
pacman install zeal
```

#### openSUSE
Per quanto riguarda openSUSE, sfruttiamo `zypper`:

```bash
zypper install zeal
```

#### Compilazione da sorgente
Per compilare Zeal a partire dal codice sorgente disponibile su GitHub sarà sufficiente recarsi sulla [wiki ufficiale](https://github.com/zealdocs/zeal/wiki/Build-Instructions) del software e seguire le regole di compilazione per la nostra distribuzione.

## Utilizzo
Al primo avvio di Zeal sarà necessario aggiungere i docset di nostro interesse, nell'articolo supporrò di voler utilizzare le docset di `go` e `ruby`.

Dalla schermata di primo avvio sarà necessario selezionare `Tools` nel menù e da lì `Docset`, come si può vedere nell'immagine qui sotto.

![Zeal tools](storage/zeal.png)

Nella schermata che ci apparirà potremo vedere due tab:
- **Installate**, con le docset già scaricate
- **Disponibili** con le docset disponibili per il download

Rechiamoci in quest'ultima tab e dopo aver trovato le doc che ci interessano scarichiamole con un doppio click.

### Ricerca
Per effettuare la ricerca, una volta scaricate le risorse di cui abbiamo bisogno, abbiamo due possibilità:
- **Ricerca globale**: sarà sufficiente cercare la parola chiave all'interno del campo di ricerca, ad esempio `print`, per vedere i metodi con relativi esempi *in tutti i linguaggi di cui abbiamo scaricato la documentazione*

![Zealprint](storage/zealprint.png)
- **Ricerca mirata**: è possibile limitare la ricerca *all'interno di un linguaggio specifico* preponendone il nome al comando da ricercare seguito dai due punti, ad esempio `ruby:print`

![Rubyprint](storage/rubyprint.png)

### CLI
Zeal è richiamabile anche direttamente da CLI. Se infatti da terminale daremo il comando nella forma:

```bash
zeal linguaggio:comando
```
aviveremo l'applicazione eseguendo direttamente la ricerca mirata. 

### Eliminare una docset
Per cancellare una docset tra quelle scaricate sarà sufficiente recarci all'interno della tab **scaricate** (nello stesso menù da dove abbiamo scaricato le nostre documentazioni), selezionare quella che vogliamo eliminare e cancellarla dalla lista.

## Conclusione
Questo era Zeal, uno strumento che personalmente ritengo fondamentale per poter consultare tutte le documentazioni di cui necessito anche in assenza di connessione e in mobilitá.

Per ogni dubbio, chiarimento o curiosità ci trovate al [nostro gruppo Telegram](https://t.me/linuxpeople).