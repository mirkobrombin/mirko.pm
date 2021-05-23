---
title: '#howto - Colorare il tuo terminale Linux' 
published: 2021-05-24 
layout: post 
author: Floppy
author_github: raspFloppy 
tags: 
- bash
- ubuntu
- fedora
- ruby 
---


Se vogliamo rendere più accattivante esteticamente il nostro terminale, allora dovremo sicuramente installare e provare `colorls`, uno script in **Ruby** che "colora" l'output del comando `ls` monstrando le icone di cartelle e dei file in base alla loro estensione. 

## Prerequisiti
Prima di tutto è necessario avere **ZSH** e **Oh-My-Zsh** installati, perciò vi rimando all'articolo precedente:

- [#howto - Installare e configurare Oh My Zsh](https://linuxhub.it/articles/howto-installare-e-configurare-oh-my-zsh/)

## Installazione 
 
Per poter visualzzare le icone dobbiamo essere muniti di font specifici.

I font di cui abbiamo bisogno fanno parte dei [NERD FONTS](https://github.com/ryanoasis/nerd-fonts), un insieme di font che contengono al loro interno moltissime icone.

Installiamo i font con:

``` bash
git clone --depth=1 https://github.com/ryanoasis/nerd-fonts ~/.nerd-fonts
cd ~/.nerd-fonts
./install.sh
```
Una volta finita l'installazione, impostiamo a scelta sul nostro terminale uno dei tanti font che abbiamo installato.
(Consiglio il font **Hack Regular Nerd Font Complete**).

Impostato il font, dobbiamo installare le dipendenze necessarie:

### Ubuntu
 
``` bash
apt install make gcc ruby-dev
```

### Fedora

``` bash
dns install make ruby ruby-dev
```
> Nota: Su Fedora a differenza di Ubuntu `gcc` è già preinstallato perciò non è necessario installarlo


## Attivazione

Ora dobbiamo installare il pacchetto `colorls` dai repository di Ruby, per farlo utiliziamo `gem` il **package manager** di Ruby:

``` bash
gem install colorls
gem update colorls
```

Una volta installato dobbiamo andare ad aggiungere due righe al nostro file di configurazione della shell che utilizziamo, `~/.zshrc` oppure `~/.bashrc`:

``` bash
alias ls='colorls --group-directories-first'
```
> NOTA: Per vedere che shell si sta utilizzando usate il comando `echo $0`

In questo modo abbiamo assegnato un alias al comando `ls`, che quando verrà "chiamato" eseguirà il comando `colorls`.

Possiamo anche aggiungere a `~/.zshrc` o `~/.bashrc`:
``` bash
alias ll='colorls -lA --sd --gs --group-directories-first''
```
Andando a creare un nuovo comando che corrisponde ad eseguire `ls -l` ma mostrando anche le icone di cartelle e file.


Una volta aggiunti gli alias ci basterà caricare i cambiamenti apportati ai file di configurazione della shell (`~/.zshrc`, `~/.bashrc`) eseguendo:
``` bash
source ~/.bashrc
```
oppure:
``` bash
source ~/.zshrc
```

Adesso possiamo goderci la nostra nuova shell customizzata con icone e cartelle colorate.


Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).

