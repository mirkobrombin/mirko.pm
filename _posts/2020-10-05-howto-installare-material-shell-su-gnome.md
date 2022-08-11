---
title: '#howto - Installazione di Material Shell su GNOME'
date: 2020-10-05
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - gnome  
  - bash
---
**Material Shell** è un estensione per il Desktop Environment **GNOME** che serve a dare quel tocco di WM (Window Manager) a GNOME.

Le principali funzionalità di Material Shell sono:
* **Workspace Manager**: Il Workspace Manager di Material Shell è stato creato  in modo da essere comodo da usare, intuitivo e facile da gestire utilizzando solamente la tastiera
* **Tilting Engine**: Questo engine è alla base di questa estensione, e serve a dare le funzionalità di un WM (Come ad esempio i3, dwm e etc...). Aprendo un'applicazione, per dire, quest'ultima si affiancherà ad un'altra allo stesso tempo. Ovviamente ci sono altre caratteristiche di un WM
* **Hotkeys**: La possibilità di gestire tutto il sistema utilizzando solo la tastiera per effettuare azioni come aprire un app, spostarla, mandarla in un altro workspace e altro ancora

In questa guida vedremo dunque come installare in maniera piuttosto semplice Material Shell per GNOME.

## Installazione di Material Shell

> Material Shell richiede la presenza sul sistema di GNOME 3.34 o versioni superiori.

### Tramite GNOME Extensions

Questo metodo funziona su ogni distro che usa GNOME, pertanto che stiate utilizzando Ubuntu, Arch Linux o Fedora non cambierà nulla. Per installare l'estensione andiamo <a href="https://extensions.gnome.org/extension/3357/material-shell/">alla seguente pagina</a> e clicchiamo sul toggle "OFF" per attivare l'estensione. Nel caso in cui non vedeste il toggle, dovete installare l'estensione di GNOME per il vostro browser.

### Tramite Package Manager

Su alcune distro è possibile installare questa estensione direttamente dal package manager presente nel sistema.

#### Fedora, CentOS e derivate
Su Fedora, CentOS e distro derivate utilizziamo `dnf`:

```bash
dnf install gnome-shell-extension-material-shell
```

#### Arch Linux
Su Arch Linux è invece disponibile nell'AUR:

```bash
yay -S gnome-shell-extension-material-shell-git
```

#### Manjaro
Mentre da Manjaro è possibile reperire il pacchetto attraverso pacman:
```bash
pacman -S gnome-shell-extension-material-shell
```

#### Altre distribuzioni
Su altre distribuzioni non citate in questa lista, Material Shell si può installare da sorgente:
```bash
git clone https://github.com/material-shell/material-shell.git ~/.local/share/gnome-shell/extensions/material-shell@papyelgringo
```

Una volta che abbiamo installato il pacchetto chiudiamo e riapriamo GNOME (`ALT+F2`, comando "`r`" su X.org, logout e login su Wayland) e dal terminale abilitiamo l'estensione con questo comando da terminale:

```bash
gnome-extensions enable material-shell@papyelgringo
```

## Conclusione
Dopo aver installato e abilitato questa estensione, ora il nostro GNOME somiglierà decisamente di più ad un WM. A <a href="https://material-shell.com/#hotkeys">questa pagina</a> potete trovare una serie di keybinds di default per comprendere come muoversi con la tastiera.

