---
title: '#howto - Installazione e configurazione di VimPlug'
date: 2020-11-16
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - github  
  - bash
---
**VimPlug** è un Plugin Manager per Vim minimale e facile da configuare. Un plugin manager serve per aggiungere delle estensioni a Vim (ad esempio un file manager integrato per aprire file in un progetto).

VimPlug è:

* Facile da installare
* Facile da configurare
* Veloce

In questa guida vedremo come installare VimPlug sulla propria macchina.

## Installazione di VimPlug

Per scaricare e installare VimPlug dobbiamo prima scaricare Vim Plug dalla repository ufficiale su GitHub ed inserirlo nella cartella `autoload` di Vim/NeoVim.

Per Vim:
```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Invece per Neovim:
```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

## Configurazione di VimPlug

Una volta che abbiamo scaricato ed installato VimPlug dobbiamo definire i suoi comandi nel config di Vim. Creiamo quindi un file di nome `.vimrc` e inseriamo le seguenti linee come qui sotto nell'esempio:
```vim
call plug#begin('~/.vim/plugged')

# Lista di plugins che iniziano con "Plug". Come esempio installo vim-airline

Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

call plug#end()
```

> Per gli utenti di Neovim consiglio invece di creare la configurazione dentro alla cartella .config e un symlink a .vimrc con il seguente comando:

```bash
ln -s ~/.vimrc ~/.config/nvim/init.vim
```

Dopo aver creato il nostro file di config con i plugin che vogliamo installare avviamo Vim/Neovim e digitiamo il seugente comando `:PlugInstall`.

Una volta fatto ciò, il software ci installerà i plugins che abbiamo inserito dentro il config e funzioneranno immediatamente se tutto è andato a buon fine.

## Conclusione

Dopo aver seguito tutti questi passaggi avrete un Plugin Manager installato su Vim che permette di avere molte più funzionalità di un semplice text editor. Per altre estensioni consiglio il sito
<a href="https://vimawesome.com/">vimawesome</a>


