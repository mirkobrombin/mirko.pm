---
title: '#howto - Installare e configurare Oh My Zsh'
published: 2019-07-06
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - ubuntu  - github  - bash
---
**Oh My Zsh** è un framework open source creato per personalizzare la propria configurazione di default di **zsh**, una delle shell più utilizzate in alternativa alla classica bash, di recente è stata adottata da MacOS.

In questa guida vedremo insieme come installarlo e configurarlo.

## Installazione

Vediamo quali sono i passaggi per l'installazione, cominciando da zsh per poi passare a oh-my-zsh.

### Installazione di zsh

Come requisito, ovviamente, è necessaria l'installazione della shell zsh:

    # Debian/Ubuntu e derivate
    sudo apt install zsh
    
    # RHEL/Centos e derivate
    sudo yum install zsh
    
    # Fedora e derivate
    sudo dnf install zsh
    
    # Arch Linux e derivate
    sudo pacman -S zsh
    
    # Void Linux
    sudo xbps-install zsh

Per verificare di aver installato correttamente zsh, possiamo usare il parametro **--version**:

    zsh --version

Il risultato dovrebbe essere simile al seguente:

    zsh 5.5.1 (x86_64-ubuntu-linux-gnu)

### Installazione di Oh My Zsh

Per installare Oh My Zsh, possiamo utilizzare sia curl che wget:

    # curl
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    
    # wget
    sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

## Personalizzazione (Temi e plugin)

Uno dei tanti motivi per quale si installa Oh My Zsh è proprio la **personalizzazione**: è possibile infatti utilizzare temi e plugin per modificare a piacimento il proprio terminale e anche per velocizzare il proprio lavoro.

### Temi

Per utilizzare un tema diverso da quello predefinito (**robbyrussell**) è necessario modificare il file .zshrc presente nella propria home directory. Se volete cambiare tema e volete sceglierne uno pre-installato, consultate [questa lista](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) (sono presenti delle immagini per ciascun tema), scegliete quello che più vi aggrada e modificate il file nominato prima.

Aprendo, dovremo cercare il parametro **ZSH_THEME** e modificare il nome del tema presente nelle virgolette con quello che abbiamo scelto.

    ZSH_THEME="nome-del-tema"

Per applicare il tema, si può chiudere e riaprire il terminale o semplicemente_:_

    source .zshrc

### Plugins

I plugins possono tornare molto utili per velocizzare il nostro lavoro, ad esempio omettendo intere frasi.

Proviamo ad usare il plugin di apt. Abilitandolo, per esempio, invece di scrivere a mano "apt install nome-pacchetto", si può usare direttamente "ai nome-pacchetto"

    # Prima
    apt install nome-pacchetto
    
    # Dopo
    ai nome-pacchetto

In questo modo abbiamo risparmiato dei secondi nel non scrivere apt install, ma si tratta comunque di una funzionalità carina ed interessante.

Per installare un plugin, è necessario modificare il file **.zshrc** e cercare il parametro plugin. Possiamo abilitare più plugin, non bisogna inserire ne virgolette ne virgole, ma basta semplicemente inserire il nome del nuovo plugin lasciando uno spazio dopo quello precedente:

    plugin(nomeplugin1 nomeplugin2)

Per poterli abilitare basterà riavviare la sessione o sfruttare il comando **source** come già mostrato precedentemente.

La lista dei plugins ufficiale è reperibile [qui](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins). È anche possibile installare temi e plugins esterni (quindi non pre-installati), seguendo altri procedimenti, spesso offerti nella documentazione del plugin stesso.

Per dubbi e chiarimenti, consultare il nostro [Gruppo Telegram](https://t.me/gentedilinux).