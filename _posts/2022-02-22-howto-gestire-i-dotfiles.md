---
title: '#howto - Gestire i dotfiles' 
date: 2022-02-25 10:45
layout: post 
author: Floppy
author_github: raspFloppy
published: false
tags: 
- ubuntu
- fedora
- archlinux
---

Talvolta i nostri dotfiles mettono disordine nella nostra home e nelle varie sottocartelle e rendono difficile la gestione ed il mantenimento dei vari cambiamenti che apportiamo.
Questo è un problema soprattuto quando vogliamo usare su più pc le stesse configurazioni.

GNU stow e git sono due strumenti che ci aiutano portare un pò di ordine nella nostra home e sincronizzare i nostri dotfile tra le nostre macchine.


## Cos'è un dotfile
Prima di spiegare come gestirli è opportuno spiegare cosa sono.
Essenzialmente i dotfile sono tutti quei file (e cartelle) che iniziano con `.` e come file nascosti dai nostri filemanager. \
Solitamente questi file contengono le configurazioni di vari software ed in genere vanno a crearsi e salvarsi nella cartella `~/.config`, altre volte invece si vanno a salvare semplicemente nella nostra home `~/` creando un pò di disordine (esempio Steam andrà a creare la cartella `~/.steam`).


## Cos'è GNU stow
GNU stow è un generatore di symlink che ha lo scopo di gestire file cartelle di vario genere dislocate per il nostro filesystem in un unica cartella.
Capiamo meglio come funziona nella pratica.

## Installazione
Installiamo `stow` con: \
Ubuntu:
``` 
apt install stow
```
Fedora:
``` 
dnf install stow
```
Archlinux:
``` 
pacman -S stow
```


## Setup
Andiamo a creare una cartella nella quale copieremo tutti i nostri dotfile con:
``` bash
mkdir ~/.dotfiles
cd ~/.dotfiles
``` 

Tratteremo questa cartella come se fosse la nostra home utente `~/` con una struttura di questo tipo (esempio):
``` bash
├── cartella1
│   ├── .dotfile1
│   └── .dotfile2
│ 
├── cartella2
│   └── .dotfile3
│ 
└── cartella3
│   └── .sottocartella
│       └── cartella4
│           └── .dotfile4
```

La struttura di `cartella1` e `cartella2` è quella che stow riconosce per creare dei `symlink` nella cartella `~/`, per esempio i file `~/.profile`, `~/.zshrc`, `~/.vimrc` 
sono tutti file che vengono salvati in `~/` e quindi prendendo lo schema di prima andremo a creare dentro a `~/.dotfiles` una cosa di questo tipo:
``` bash
├── zsh
│   ├── .zshrc
│   └── .profile
│ 
├── vim
│   └── .vimrc
```
dove tutti i dotfile andranno spostati dalla lora posizione originale dentro `~\.dotfiles`, esempio:
``` bash
mv ~/.vimrc ~/.dotfiles/vim/
```


`cartella3` invece ha una struttura diversa, essa contiene una sottocartella che a sua volta contiene una cartella contenente un dotfile, questo tipo di schema è per
tutti quei file che si trovano in una sottocartella di `~/` come `~/.config`, per esempio `Alacritty` crea il proprio file di configurazione all'interno di `~/.config/alacritty/`
quindi dentro `~/.dotfiles` andremo a creare:
``` bash
└── config
│   └── .config
│       └── alacritty
│           └── alacritty.yml
```
in questo caso andremo a spostare il singolo file `alacritty.yml`:
``` bash
mv ~/.config/alacritty/alacritty.yml ~/.dotfiles/config/.config/alacritty/
```
Ora eseguite la procedura per tutti i dotfiles che volete spostare utilizzande le due strutture in base a dove essi sono salvati (su `~/` o in una sottocartella di `~/`)


## Creazione dei symlink
Perfetto, ora dentro `~/.dotfiles` andiamo ad eseguire:
``` bash
stow *
```
oppure se preferiamo possiamo singolarmente selezionare le varie cartelle:
``` bash
stow vim
stow zsh
stow config
```
così facendo avremo creato dei symlink nella `~/`


torniamo nella nostra home e visualiziamo tutti i file, anche quelli nascosti:
``` bash
cd 
ls -la
```

Se scorrete l'output, dovreste trovare un risultato simile (in base a quele dotfile avete scelto di spostare in `~/.dotfiles`):
```
lrwxrwxrwx    20 utente gg mm hh:mm  .vimrc -> .dotfiles/vim/.vimrc
```
Se invece andiamo dentro `~/.config` per esempio nella cartella di Alacritty o quella/e che avete scelto voi avrete un risultato simile:
```
lrwxrwxrwx    54 utente gg mm hh:mm  alacritty.yml -> ../../.dotfiles/config/.config/alacritty/alacritty.yml
```


## Gestione con git
Git è un ottimo software per il versionamento del codice ma è altrettanto comodo in casi come questo in cui vogliamo avere la stessa versione del _dotfile/file di configurazione_ sui nostri pc.
Prima di tutto assicuriamoci di averlo installato su i nostri pc:
Installiamo `git` con: \
Ubuntu:
``` 
apt install git
```
Fedora:
``` 
dnf install git
```
Archlinux:
``` 
pacman -S git
```
Se utilizzate altre distro guardate [qui](https://linuxhub.it/articles/howto-installazione-di-git-su-ogni-distribuzione-linux/)



Dopodichè  entriamo nella cartella `~/.dotfiles` e inizializiamo un repo locale:
``` bash
cd ~/.dotfiles
git init .
git add -A
git commit -m "creato repo locale"
```

Su github o gitlab (o quello che preferite voi) andate a creare un repository, una volta fatto tornate sul terminale ed eseguite (sempre dentro `~/.dotfiles`):
``` bash
git remote add origin https://github.com/{vostro-nome}/{nome-repo}.git
```
e se tutto è andato per il verso giusto eseguendo:
``` bash
git remote
```
otterremo come output `origin`. \
A questo punto potremo avere a portata di `git clone` i nostri dotfiles, e sincronizzare ogni modifica che effetuiamo.

> Per una maggiore infarinatura di git vi consiglio di andarvi a vedere la [guida](https://linuxhub.it/articles/howto-git-comprenderlo,-usarlo-e-amarlo/)
> e [Utilizzo di SSH per connettersi a GitHub](https://linuxhub.it/articles/howto-utilizzo-di-ssh-per-connettersi-a-github/)
