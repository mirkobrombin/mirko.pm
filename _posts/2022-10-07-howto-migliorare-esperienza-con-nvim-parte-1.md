---
title: "#howto - Migliorare l'esperienza con Neovim parte 1"
date: 2022-10-07 08:00
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: 
coauthor_github: 
published: true
tags:  
- ubuntu 
- archlinux 
- fedora
- bash
- vim
---

Abbiamo parlato già parlato di **Vim** in questi tre articoli:
- [Utilizzo base di Vim](https://linuxhub.it/articles/howto-utilizzo-base-di-vim/)  
- [Installazione e configurazione di Vimplug](https://linuxhub.it/articles/howto-installazione-e-configurazione-di-vimplug/)  
- [Migliorare l'esperienza con Vim](https://linuxhub.it/articles/howto-migliorare-l-esperienza-VIM/)  

e abbiamo anche introdotto **Neovim** in [questo articolo](https://linuxhub.it/articles/howto-installare-e-usare-neovim/), ora però vediamo un pò di più nel dettaglio come migliorarne l'esperienza.


## Impostazioni di base

Partiamo con le impostazioni base di Neovim, che troviamo nel file `~/.config/nvim/init.vim` (o `~/.config/nvim/init.lua` se si usa Lua che però **non verrà trattato in questo articolo**), nel caso non esistessero ancora vanno creati con il comando:
```bash
mkdir -p ~/.config/nvim
touch ~/.config/nvim/init.vim
```
oppure per lua:
```bash
mkdir -p ~/.config/nvim
touch ~/.config/nvim/init.lua
```


Perfetto ora andiamo a popolare il file con delle impostazioni base per rendere il nostro editor più comodo da usare.

Prima di tutto aggiungiamo il seguente codice per abilitare **l'highlight della sintassi**:
```vim
syntax on
```

Ora aggiungiamo un po' di **estetica** per il nostro editor, aggiungendo il seguente codice:

```vim
set number
set relativenumber
set cursorline
set cursorcolumn
```

Ora per migliorare **l'indentazione** del nostro codice aggiungiamo il seguente codice:


```vim
"Possiamo impostare il numero a nostro piacimento (solitamente 2, 4 o 8)
set tabstop=4                   
set shiftwidth=4                
set softtabstop=4               

set expandtab                   
set autoindent

filetype plugin indent on       " abilita l'indentazione in base al tipo di file
```

Miglioriamo anche la ricerca nel file con le seguenti impostazioni:

```vim
set hlsearch
set incsearch
set showmatch
```

Miglioriamo anche l'utilizzo della **clipboard** e del **copia incolla**:
```vim
set clipboard=unnamedplus

```


Le impostazioni base sono complete, ora andiamo a vedere come espandere le capacità di Neovim tramite i plugin.



## Plugin Manager

Prima di tutto come per Vim per installare i plugin in Neovim è necessario utilizzare un plugin manager, a differenza di Vim però non andremo ad utilizzare vim-plug ma bensì [packer.nvim](https://github.com/wbthomason/packer.nvim).

Per installare packer.nvim basta eseguire il seguente comando:

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

Se usate Arch Linux potete installare il pacchetto `neovim-packer-git` da AUR tramite il vostro AUR helper preferito. Se usate `paru`: 

```bash
paru -S neovim-packer-git
```

Se usate yay
```bash
yay -S neovim-packer-git
```

e così via per gli altri...


Tutti i plugin vanno nel file `~/.config/nvim/lua/plugins.lua`, se non esiste ancora basta crearlo con il comando:
```bash
mkdir -p ~/.config/nvim/lua
touch ~/.config/nvim/lua/plugins.lua
```

Ora andiamo inserire nel file `plugins.lua` il seguente codice per abilitare packer.nvim:
```lua
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function()
  use 'wbthomason/packer.nvim'
end)
```

Usciamo e rientriamo in un qualsiasi file di Neovim ed ora in *normal mode* eseguiamo il comando `:PackerSync` per installare packer.nvim.
Una volta eseguito avremo packer installato e funzionante sul nostro editor.

Alcuni comandi utili sono:
- `:PackerSync` per installare tutti plugin
- `:PackerUpdate` per aggiornare i plugin
- `:PackerClean` per rimuovere i plugin non utilizzati
- `:PackerCompile` per compilare i plugin
- `:PackerStatus` per vedere lo stato dei plugin
- `:PackerInstall` per installare un singolo plugin


Perfetto adesso saremo in grado di installare i plugin che ci servono, ma questo lo vedremo nella seconda parte di questo articolo.


 


