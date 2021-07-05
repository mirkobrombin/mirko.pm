---
title: '#howto – Utilizzo base di Vim'
description: "(Vi IMproved) è uno degli da riga di comando più conosciuti ed utilizzati in ambito UNIX, ed è preinstallato in parecchie distribuzioni GNU/Linux."
date: 2018-10-27
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
**Vim** (Vi IMproved) è uno degli **editor di testo** da riga di comando più conosciuti ed utilizzati in ambito UNIX, ed è preinstallato in parecchie distribuzioni GNU/Linux.

## Avvio

Appena avviato Vim, ci si trova nella **command mode**, una modalità che permette appunto di dare comandi. Per tornare in questa modalità, è necessario premere in tasto Escape sulla tastiera.

Si sottolinea che, nella command mode, non è possibile inserire testo.

<figure class="wp-block-image">![](https://linuxhub.it/wordpress/wp-content/uploads/2018/10/2018-10-25-193419_1280x800_scrot.png)

<figcaption>Schermata iniziale di Vim su Fedora</figcaption>

</figure>

## Inserire testo

Per inserire del testo (e quindi iniziare a scrivere), è necessario entrare nella **insert mode**. Esistono molteplici modi per farlo:

*   `a` - inserisce testo dopo il cursore;  

*   `A` - inserisce testo alla fine della riga corrente;
*   `i` - inserisce testo prima del cursore;
*   `I` - inserisce testo all'inizio della riga corrente;
*   `o` - inserisce testo in una nuova riga.

## Copiare e incollare

Per copiare ed incollare del testo, è necessario trovarsi nella command mode, posizionare il cursore prima dei caratteri da selezionare, e premere `v` per entrare nella **visual mode**. Sarà quindi possibile selezionare il testo, premere `y` per copiarlo, e `p` per incollarlo.

## Salvare le modifiche

È possibile salvare le modifiche apportate ad un file dalla command mode, digitando `:w`. Se è un file nuovo, sarà necessario specificare il nome del file (esempio: `:w file.txt`).

## Uscire da Vim

Argomento di parecchie [discussioni](https://stackoverflow.com/questions/11828270/how-to-exit-the-vim-editor) e [meme](https://www.reddit.com/r/ProgrammerHumor/comments/8vihj5/when_you_try_to_exit_vim/), uscire da Vim è meno complicato di quanto possa sembrare.  

Dalla command mode, è possibile uscire da Vim nei seguenti modi:

*   `:q` - chiude l'editor;
*   `:q!` - chiude l'editor anche se ci sono cambiamenti non salvati;
*   `:wq` - salva le modifiche e chiude l'editor.

Spero di essere stato chiaro, in caso di quesiti riguardo Vim o altri argomenti, potete usufruire della sezione [domande](https://linuxhub.it/domande-risposte/) del sito.