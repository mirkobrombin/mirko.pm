---
class: post
title: "#howto - Migliorare l'esperienza con VIM"
date: 2021-11-19 11:00
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
tags:  
- ubuntu 
- archlinux 
- fedora
- bash
---


**Vim** è un editor di testo da CLI, veloce, leggero, ricco di shortcut che aumentano la produttività degli utilizzatori. 
C'è però un problema: di default Vim risulta sprovvisto di tutte quelle features che hanno gli editor moderni come **Visual Studio Code**, **Sublime Text**, **Atom** ecc...
Ma se vi dicessi che è possibile "sporcandosi un pò le mani" rendere Vim alla pari degli editor citati mantenendo però tutti i pro? Andiamolo a scoprire in questo articolo!

## Prerequisiti
Prima di procedere con l'articolo è doveroso prima leggere questi due articoli:
- [#howto – Utilizzo base di Vim](https://linuxhub.it/articles/howto-utilizzo-base-di-vim/) per le basi di Vim.
- [#howto - Installazione e configurazione di VimPlug](https://linuxhub.it/articles/howto-installazione-e-configurazione-di-vimplug/) per imparare ad usare il plugin manager che utilizzeremo anche in questa articolo.

Inoltre, anche se in quasi tutte le distro è installato, è necessario avere python.


## Impostazioni di Vim 
Iniziamo con la modifica di alcune impostazioni di vim, per farlo dobbiamo modificare il file `~/.vimrc` con:.
```
syntax enable		"evidenzia il testo in base al formato del file"
set encoding=utf-8	"abilita la decodifica unicode per il testo"

set number		"abilita la colonna che numera le righe"
set cursorline		"evidenzia la riga in cui il cursore è"


set autoindent		"auto indenta in base al formato del file"
set smarttab		"la tabulazione viene eseguita in automatico in modo intelligente"
set tabstop=8		"imposta il valore della tabulazione (solitamente viene cosigliato 4 o 8)"
``` 
Chiudendo e riaprendo Vim noteremo che il nostro editor è cambiato sia esteticame che funzionalmente ma non radicalmente, abbiamo apportato per ora solo alcune piccolezze, possiamo fare di più.

## Autocompletamento
**L'autocompletamento** del codice è forse una delle comodità maggiori quandi si vanno ad utilizzare gli editor di testo e Vim di default ne è sprovvisto, ma nessun problema in nostro soccorso arriva un plugin chiamato **YouCompleteMe (YCM)** che supporta qualche decina di linguaggio  ma che può essere integrato con altri plugin per aumentare il supporto come ad esempio **vimtex** per la sintassi di *LaTeX*.
Dopo averlo installato attraverso **VimPlug**, dovremo "attivare" l'autocompletamento andando nella cartella `~/.vim/plugged/youcompleteme/` qui troveremo un file chiamato `install.py` eseguiamo quindi da linea di comando:
``` 
python install.py --all
```
> NOTA BENE:
> la cartella ~/.vim/plugged/youcompleteme verrà creata solo se
> il plugin lo si è installato tramite VimPlug.

In questo modo abiliteremo il completamento del codice dei linguaggi che noi abbiamo installato sul nostro computer, infatti probabilmente alla fine dell'esecuzione del programma riceveremo dei *WARNINGS* sul fatto che *il completamente del linguaggio x non è stato trovato* proprio perchè non abbiamo i compilatori e gli interpreti di questi linguaggi installati sul nostro pc.
Inoltre se un giorno decidessimo di installarci per esempio *Go* sul nostro pc dovremmo rieseguire la procedura di installazione, è possibile però accorciare il tutto dicendo di abilitare solo il completamento per quel linguaggio, utilizzando l'esempio di Go:
```
python install.py --go-completer
```

Infine se un linguaggio utilizza diversi compilatori o comunque tool per la semantica è possibile scegliere anch'esso, per esempio di default C/C++ utilizzano GCC ma possiamo dire a **YCM** di utilizzare clang:
```
python install.py --clangd-completer
```
**YouCompleteMe** è comunque un plugin molto vasto e consiglierei per chi vuole approfondire di leggersi la [wiki](https://github.com/ycm-core/YouCompleteMe#intro).


Un altro plugin molto comodo è **auto-pairs** per l'autocompletamento di parentesi e apici.

## Snippets 
Oltre all'autocompletamento è molto utile avere dei cosiddetti snippets ovvero delle parole/simboli che quando vengono "triggerate" vanno a creare una parte di testo più ampia, mi spiego meglio immaginiamo uno snippet per **python** di nome `func` che crea una generica funzione, se noi scriviamo `func` e triggeriamo lo snippet in automatico si andrà a creare:
```python
def func():
	#Aggiungere interno della funzione
```
Questo ci permetterà di aumentare notevolmente la nostra produttività quando ad esempio appunto andremo a scrivere codice.

I plugin che fanno questo sono **vim-snippets** insieme a **ultisnips** che cooperano e includono già snippets per molti linguaggi.
Il punto di forza si trova nel fatto che questi snippets, che si trovano nella cartella `~/.vim/plugged/vim-snippets/UltiSnips/` e hanno estensione `.snippets`, sono modificabili e in oltre possiamo crearne di nostri per linguaggi che non sono inclusi in modo tale da massimizzare la nostra produttivita al massimo.

Inoltre è possibile anche dire allo snippets dove muovere il cursore una volta triggerato, mettiamo caso che triggeriamo lo snippet di una funzione e gli diciamo di portare il cursore all'interno delle parentesi tonde per impostare i parametri della funzione e poi di spostare all'interno della funzione per scriverne il contenuto, il trigger dello snippet e lo spostamento in esso viene eseguito con *TAB* il problema però è che *TAB* viene utilizzato anche da **YCM**, è meglio quindi modificare la shortcut per evitare conflitti, facciamolo modificando sempre `~/.vimrc` scrivendo:
``` vim
let g:UltiSnipsExpandTrigger = '<C-q>'
let g:UltiSnipsJumpForwardTrigger = '<C-j>'
```
Utilizzeremo ora `Ctrl+q` per triggerare lo snippet e `Ctrl+j` per muoverci al suo interno.


## Directory
Se si sta facendo un progetto sviluppato su più cartelle come per esempio un sito web, è comodo tenere traccia di esse mentre si sta scrivendo codice, per questo utilizziamo **Nerdtree** che quando verrà eseguito aprirà una piccola finestra che mostra tutte le cartelle e le sottocartelle presenti nella cartella del file su cui stiamo lavorando.
Anche qui dobbiamo impostare alcune shortcut sempre su `~/.vimrc`:
``` vim
nnoremap <C-n> :NERDTreeToggle<CR>
```
Utilizzando `Ctrl+n` apriremo e chiuderemo Nerdtree


## Aspetto
Anche l'estetica del nostro editor è importante per alcune persone, ecco allora alcuni plugin utili:
Il primo è **vim-airline** che aggiungerà a Vim una statusline contente alcune informazioni riguardanti il file su cui stiamo lavorano come ad esempio numero di righe, numero di parole, formato, nome del file, nel caso in cui il file si trovasse all'interno di un repo git ci dirà su che *branch* stiamo lavorando e inoltre in che modalità di Vim siamo (Command,Insert,Visual,Replace,...).
Il secondo plugin è **space-vim-dark** che più che un plugin è un tema che verrà aggiunto nel pacchetto di temi di Vim.
Per abilitarlo di default una volta installato con **VimPlug** dovremo aggiungere:
``` vim
colorscheme space-vim-dark
```
al nostro `~/.vimrc`, nel caso non vi piaccia questo tema esistono un miriade di altri temi aggiuntivi che possono essere installati tramite **VimPlug** e abilitati con il comando `colorscheme {nome tema}`

Infine abbiamo **goyo**, questo plugin ci permette di rendere il nostro editor simile a un foglio di carta eliminando quelle distrazioni come possono essere la colonna del numero di riga o la statusline quando invece che scrivere codice stiamo che so scrivendo un articolo magari per [linuxhub.it](https://linuxhub.it/).
È possibile abilitare `goyo` modificando il `~/.vimrc` ma siccome molte volte se scriviamo codice le cose che questo plugin ci servono, consiglio di abilitarlo dalla command mode di Vim solo quanto queste features ci servono, per farlo: `:Goyo LxH` dove `L` è la lunghezza in pixel e `H` l'altezza, sempre in pixel.
