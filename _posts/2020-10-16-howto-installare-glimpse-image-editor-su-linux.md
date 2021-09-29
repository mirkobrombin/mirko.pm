---
title: '#howto - Installazione di Glimpse Image Editor su Linux'
date: 2020-10-16
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**Glimpse Image Editor** è un fork di GIMP pensato per essere il più professionale possibile (aggiungendo nuove funzioni presenti in programmi tipo Adobe Photoshop e Lightroom). Tra le altre cose, Glimpse permette  di installare in maniera semplice i plugin che possono tornare utili per molti motivi, come ad esempio PhotoGIMP, un add-on creato per gli utenti che vengono da Photoshop.

In questa guida vedremo come installare Glimpse sulle principali distribuzioni Linux.

## Installazione

> Voglio ricordare che Glimpse è un programma in beta, quindi si potrebbe incontrare qualche bug che è possibile segnalare nella sezione Issues della pagina GitHub ufficiale del programma

Per installare Glimpse su Linux possiamo in realtà sfruttare tre metodi, due universali e uno per determinate distribuzioni.

### Flatpak

Se utilizziamo **Flatpak** sul nostro sistema, il comando per installare Glimpse sarà:

```bash
flatpak install flathub org.glimpse_editor.Glimpse
```

### SnapCraft

Se abbiamo installato nella nostra macchina `snapd`, invece, possiamo procedere in questo modo:

```
snap install glimpse-editor
```

### Arch Linux e Manjaro

Su Arch Linux e Manjaro è possibile reperire il pacchetto di Glimpse tramite **AUR**, scaricabile via `yay` o altri comandi:

```
yay -s glimpse-editor-git
```

### OpenSUSE

Su openSUSE, invece, possiamo aggiungere una repository ed effettuare successivamente l'installazione via `zypper`:

```
zypper addrepo https://download.opensuse.org/repositories/home:IBBoard:desktop/openSUSE_Tumbleweed/home:IBBoard:desktop.repo
zypper refresh
zypper install glimpse
```

## Conclusione

Una volta che abbiamo installato e avviato Glimpse dovremmo trovarci di fronte ad una schermata simile alla seguente:
![Glimpse imageeditor 600x386](storage/glimpse-imageeditor-600x386.jpg)

Da qua in poi potremmo creare un nuovo file/modificarne uno gia esistente e fare tutte le modifiche che vogliamo.

