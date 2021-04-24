---
title: '#howto - Come impostare un ambiente di sviluppo C/C++ su Arch Linux'
description: "Quando installiamo Arch Linux sappiamo che nulla sarà già pronto all'uso, anche compilatore e editor andranno installati e configur.."
published: 2019-12-21
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash
---
Quando installiamo Arch Linux sappiamo che nulla sarà già pronto all'uso, anche compilatore e editor andranno installati e configurati a parte, quindi ora accingiamoci ad impostare un ambiente di sviluppo, con **Visual Studio Code** o con un **IDE**.

## Configuriamo il compilatore

Il compilatore, per i meno avvezzi, è quel programma che tradurrà il nostro codice C o C++ in linguaggio macchina. Abbiamo due possibilità di scelta principali, **GCC** (_Gnu Compiler Collection_), che fornisce _gcc_ per compilare C e _g++_ per il C++. Poi abbiamo **Clang**, che ci fornisce _clang_ per il C e _clang++_ per C++. Io personalmente preferisco _Clang_, ma ora vediamo come installare entrambi.

### Installiamo GCC

Molto probabilmente avrete già installato **GCC** durante la configurazione, nel caso aveste installato il gruppo base-devel. In caso contrario, apriamo una finestra di terminale e diamo:

```bash
sudo pacman -S gcc
```

dopo, per assicurarci di averlo installato, diamo:

```bash
gcc -v

# Output
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-pc-linux-gnu/9.2.0/lto-wrapper
Target: x86_64-pc-linux-gnu
Configured with: /build/gcc/src/gcc/configure --prefix=/usr ...
gcc version 9.2.0 (GCC)
```

la versione non per forza deve combaciare, l'importante è ricevere l'output, segno che gcc è stato installato correttamente.

### Installiamo Clang

Invece, per installare **Clang** dobbiamo installare l'omonimo pacchetto da pacman. Per farlo diamo

```bash
sudo pacman -S clang
```

come prima, per assicurarci di averlo installato diamo:

```bash
clang -v                                                                   

# Output
clang version 9.0.0 (tags/RELEASE_900/final)
Target: x86_64-pc-linux-gnu
Thread model: posix
InstalledDir: /usr/bin
...
```
## Configuriamo l'editor

Ora abbiamo il compilatore, ma ci manca come scrivere il nostro codice, per questo ci serve un editor di testo: può andare bene il semplice _vim_ o _nano_, o editor più complessi, come **_Visual Studio Code_** o **Atom**. Per ora, noi ci concentreremo su _Visual Studio Code_. Visual Studio Code è un editor di testo Open Source scritto da Microsoft, e su arch possiamo scaricarne due versioni, il binario ufficiale e un binario alternativo, **vscodium**, che sarebbe niente poco di meno che Visual Studio Code senza la telemetria. 

### Installiamo Visual Studio Code

Per installare Visual Studio Code usiamo il nostro aur helper di fiducia, in questo caso yay, quindi diamo

```bash
yay -S visual-studio-code-bin
```

Dopo averlo installato, possiamo aprirlo o dal menù delle applicazioni o digitando sul terminale `code`.

### Configuriamo Visual Studio Code

Ora che abbiamo Visual Studio Code aperto, dobbiamo configurarlo per lo sviluppo C/C++, per questo andiamo nella scheda _estensioni_ e qui installiamo 2 plugin e un tema ( che consiglio ):

- vsc-material-theme

- material-icon-theme
- cpptools

ora dalle impostazioni scegliamo Color Theme e mettiamo quello che più ci aggrada e sempre da impostazioni scegliamo File Icon Theme e scegliamo quello installato.

Ora andiamo sempre su Impostazioni, settings e cerchiamo _C_Cpp › Default: Intelli Sense Mode_ e dal menù a tendina scegliamo il compiler che useremo.

### Scrittura e Compilazione di un primo programma

Ora torniamo alla schermata principale di Visual Studio Code, andiamo su File, Open Folder e apriamo la cartella dove creeremo il nostro progetto. Qui creiamo un nuovo file, chiamiamolo _test1.c o .cpp_, dipende da che linguaggio vogliamo usare e scriviamo il nostro primo programma. 

![VS Code CPP](storage/IMG_20191220_225106_321.jpg)

Finito di scrivere, salviamo e apriamo una nuova finestra del terminale, qui navighiamo nella cartella del progetto, e compiliamo il nostro file, vediamo come fare

```bash
# Se usiamo GCC

# Per C
gcc test1.c -o test1
# Per C++
g++ test1.cpp -o test1

# Se usiamo Clang

# Per C
clang test1.c -o test1
# Per C++
clang++ test1.cpp -o test1
```

ora basterà dare un semplice e universal `./test1` per vedere il nostro programma eseguito.

![Clang compiler](storage/IMG_20191220_225109_504.jpg)

Ci sono anche dei plugin che, se configurati nel modo giusto, possono compilare al posto vostro, ma io consiglio sempre di compilare a mano o di creare un MakeFile apposito, così da essere sicuri di inserire tutte le librerie corrette.

## Conclusione

Ora abbiamo un editor di testo funzionante per C e C++ e il compilatore, per chi magari vuole qualcosa di più pronto all'uso e non per forza più avanzato si può usare un IDE, un Ambiente di Sviluppo Integrato. Nel prossimo articolo parleremo di quali IDE installare e come configurare il compilatore.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://linuxhub.it/t.me/gentedilinux">gruppo telegram</a>.