---
title: '#howto - Installazione di un Desktop Environment su Arch Linux'
published: 2019-11-16
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - php  - gnome  - archlinux  - bash
---
Il **Desktop Environment**, o _DE_, è uno dei programmi più importanti che andiamo ad installare durante il setup di Arch. Il _DE_ si occupa soprattutto di fornire un interfaccia grafica all'utente per interagire con il sistema e i software. 

Un DE è composto da un _Gestore di Finestre_, o **Window Manager(WM)**, che permette all'utente di operare con le finestre dei programmi. Poi abbiamo il resto delle funzioni grafiche, che cambiano da DE a DE, come _la Dock, la Barra degli Strumenti e altro_.

L'utente ha una ampia varietà di scelta di Desktop Environment da installare, dall'ambiente completo, al singolo Window Manager. Alcuni tra i Desktop Environment più famosi possiamo trovare _GNOME o KDE_ oppure per l'installazione del singolo Window Manager abbiamo ad esempio _I3WM e AwesomeWM_.

> Questa guida non vuole essere un sostituto alla wiki di Arch, per una lista di <a href="https://wiki.archlinux.org/index.php/Desktop_environment_(Italiano)">Desktop Environment</a> e <a href="https://wiki.archlinux.org/index.php/Window_manager_(Italiano)">Window Manager</a> consulta le pagine corrispondenti.

## Installazione

Installare un **DE** è semplicissimo, prima cosa dobbiamo aver gia installato un **Server Grafico**, _X11 o Wayland_, **avviso**, non tutti i DE e WM sono compatibili con Wayland. Dopo esserci assicurati di aver installato il corretto Server Grafico procediamo con l'installazione dell'ambiente grafico, DE o WM.

### Installazione DE

#### Gnome
Per installare **GNOME** procediamo ad installare il _gruppo di pacchetti di GNOME_ con il seguente comando:
```bash
sudo pacman -Sy gnome
```

Se vogliamo installare anche dei programmi extra possiamo installare anche _"gnome-extra"_, così:
```bash
sudo pacman -Sy gnome gnome-extra
```

Ora abilitiamo il **Display Manager** di Gnome con:
```bash
sudo systemctl enable gdm
```


#### KDE
Per installare **KDE** invece abbiamo due possibilità: la versione minimal o la versione completa. Ora, vediamo come installarle.

**Minimal**:
```bash
sudo pacman -Sy plasma-desktop
```
**Completa**:
```bash
sudo pacman -Sy plasma
```
abilitiamo il **Display Manager** di KDE con:
```bash
sudo systemctl enable sddm
```

### Installazione WM

Ora che abbiamo visto come installare un DE, è tempo di capire come inserire nel nostro sistema alcuni Window Manager, ecco degli esempi.

#### I3
**I3** è un Tiling Window Manager, di cui attualmente ne esistono 2 versioni, ovvero I3WM e I3Gaps. Il secondo, come dice il nome, ha dei "Gap" impostabili tra le finestre. Prima di poterli installare, però, abbiamo bisogno di ottenere lightdm, siccome i WM non comprendono un proprio Display Manager.

**I3WM**:
```bash
sudo pacman -Sy i3-wm lightdm
```
**I3Gaps**:
```bash
sudo pacman -Sy i3-gaps lightdm
```
Abilitiamo il **Display Manager** che abbiamo installato:
```bash
sudo systemctl enable lightdm
```

#### AwesomeWM
**AwesomeWM** invece è un Dynamic Window Manager. Per installare AwesomeWM procediamo semplicemente con un comando:
```bash
sudo pacman -Sy awesome lightdm
```
Ora abilitiamolo:
```bash
sudo systemctl enable lightdm
```

### Consigli
La scelta di installazione tra DE e WM dipende totalmente dall'utente e dei suo modo di usare Arch. I primi sono più pesanti e vengono configurati tramite settaggi grafici, pertanto sconsigliati su PC di bassa fascia, mentre i secondi sono più leggeri e vengono configurati tramite config file.
È inoltre possibile realizzare delle _"Fusioni"_ tra DE e WM: ad esempio, possiamo impostare I3 come Window Manager di default di GNOME.

Per dubbi e chiarimenti, utilizzate il nostro gruppo Telegram.