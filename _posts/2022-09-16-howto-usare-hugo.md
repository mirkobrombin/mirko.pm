---
class: post
title: '#howto - Usare Hugo' 
date: 2022-09-16 09:34
layout: post 
author: Floppy  
author_github: raspFloppy
coauthor: Davide Galati (in arte PsykeDady) 
coauthor_github: PsykeDady
published: true
tags: 
- bash
- web
---

**Hugo** è un generatore di siti statici, opensource, scritto in Go, estremamente veloce, che permette la creazione di siti web statici in modo semplice e veloce. 
In questo articolo andremo a vedere come installarlo e come usarlo.


## Installazione

Per installare Hugo su Linux, abbiamo tre vie, la prima è quella di scaricare il binario dal sito ufficiale, la seconda è quella di installare il pacchetto dal repository della nostra distro, la terza è di utilizzare snap.

### Scaricare il binario

Per scaricare il binario, andiamo sul sito ufficiale nella sezione [Downloads](https://gohugo.io/getting-started/installing/#download-hugo), scegliamo la versione più recente, e scarichiamo il pacchetto,dopodichè lo decomprimiamo e lo spostiamo nella cartella `/usr/local/bin` e quindi lo rendiamo eseguibile con il comando `chmod +x hugo`.


### Installare il pacchetto dal repository

Se decidiamo di installare Hugo dal nostro repository allora andremo a cercare il pacchetto `hugo` e lo installeremo con il nostro gestore dei pacchetti preferito.

#### Arch Linux 

```bash
pacman -S hugo
```

#### Debian/Ubuntu 

```bash
apt install hugo
```

#### Fedora

```bash
dnf install hugo
```


#### Installare con snap

Tramite **snap** invece noi andremo a scaricare il pacchetto dallo store di snap e lo installeremo con il comando:
```bash
snap install hugo
```

Se non avete **snap** installato o non sapete come usarlo potete leggere [questo articolo](https://linuxhub.it/articles/howto-installazione-di-snap/).


## Creare un sito

Prima di tutto andiamo a verificare che Hugo sia installato correttamente, per farlo basterà digitare il comando `hugo version`, se tutto è andato a buon fine dovremmo ottenere un output simile a questo:
```bash
Hugo Static Site Generator <versione> linux/<architettura> BuildDate: <data>
```

A questo punto possiamo creare il nostro primo sito statico, lo facciamo eseguendo il comando:
```bash
hugo new site <nome_sito>
```

dove `<nome_sito>` è il nome del sito che vogliamo creare, ad esempio `hugo new site mysite`, questo comando ci creerà una cartella con il nome del sito che abbiamo scelto.
All'interno della cartella troveremo la configurazione di base di Hugo:
```
.
├── archetypes
│   └── default.md
├── config.toml
├── content
├── data
├── layouts
├── public
├── static
└── themes
```

Le cartelle che ci interessano sono `archetypes`, `content`, `layouts`, `static`.
`archetypes` contiene i template per i post, `content` contiene i post del sito, `layouts` contiene i template per i post e `static` contiene i file statici (come per esempio immagini, loghi ecc...).

Poi abbiamo il file `config.toml` che contiene la configurazione del sito, e la cartella `themes` che contiene i temi che possiamo usare per il nostro sito.

Adesso il nostro sito necessita di un tema del suo primo post, per farlo eseguiamo il comando:
```bash
hugo new posts/<nome_post>.md
```

Notate che l'estensione del post termina con `.md`, questo perché Hugo supporta diversi formati per i post, tra cui Markdown, HTML, XML ecc... e per indicare a Hugo che il nostro post è in Markdown dobbiamo aggiungere l'estensione `.md`.

Il post che abbiamo appena creato sarà salvato nella cartella `content/posts` e avrà un contenuto simile a questo:
```markdown
---
class: post
title: "<nome_post>"
date: <data>
draft: true
---

Contenuto del post
...
```

A questo punto possiamo fare il nostro primo build del sito e hostarlo sul in locale, per farlo eseguiamo il comando:
```bash
hugo server -D
```
Nella home del nostro sito,nell'output dovremmo vedere qualcosa di simile a questo:
```bash
Start building sites …
hugo <version> linux/<architettura> BuildDate=<date>
                   | EN
-------------------+-----
  Pages            |  4
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  0
  Processed images |  0
  Aliases          |  0
  Sitemaps         |  1
  Cleaned          |  0

Built in 2 ms
Watching for changes in /home/riot/test/{archetypes,content,data,layouts,static}
Watching for config changes in /home/riot/test/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Quindi andiamo su `http://localhost:1313/` con il nostro browser e dovremmo vedere il nostro primo sito.


## Aggiungere un tema

Perfetto, ma ora il nostro sito è un po' vuoto, quindi andremo a scaricare un tema e lo useremo per il nostro sito.

Hugo ha un [repository](https://themes.gohugo.io/) con tutti i temi disponibili creati dalla community, tutti i temi sono opensource e gratuiti quindi ci basterà sceglierne uno che useremo per il nostro sito.



Per esempio andiamo a scegliere il tema [terminal](https://themes.gohugo.io/themes/hugo-theme-terminal/), per implementarlo al nostro sito possiamo scaricare il tema e copiarlo nella cartella `themes` del nostro sito, oppure utilizzare **git**.

Per prima cosa dobbiamo però inizializzare il nostro sito come un repository git, per farlo eseguiamo il comando:
```bash
git init
git add .
git commit -m "init"
```

Poi possiamo aggiungere il tema come submodule, per farlo eseguiamo il comando:
```bash
git submodule add -f https://github.com/panr/hugo-theme-terminal.git themes/terminal
```

Per verificare che il tema sia stato installato correttamente possiamo eseguire il comando:
```bash
hugo server -t terminal -D
```
dove `-t terminal` indica il tema che vogliamo usare.
Se tutto è andato a buon fine dovremmo vedere il nostro sito con il tema che abbiamo scelto.

Per apportare modifiche al tema possiamo andare nella cartella `themes/terminal` e modificarlo, ma se vogliamo aggiornare il tema dobbiamo fare un `git pull` nella cartella `themes/terminal` e poi eseguire il comando `hugo server -t terminal -D` per vedere le modifiche apportate.







