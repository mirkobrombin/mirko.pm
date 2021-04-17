---
title: '#howto - Installazione di Visual Studio Code su Linux'
published: 2020-07-24
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
**Visual Studio Code** è un editor di testo molto potente realizzato da Microsoft e disponibile per Linux, Windows e macOS.

Sviluppato sulla base di [Electron](https://linuxhub.it/articles/howto-installare-e-usare-electron-framework-per-i-propri-progetti), questo editor supporta moltissimi linguaggi di programmazione, ed è personalizzabile con temi ed estensioni che possono facilitare le comuni operazioni.

In questa guida vedremo come installare il programma sulle principali distribuzioni Linux.

## Installazione

Con questo metodo otterremo sempre l'ultima versione del programma.

### Flatpak
Visual Studio Code è disponibile anche come pacchetto Flatpak, installabile dalla repository *FlatHub* (leggi <a href="https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub">qui</a>). In alcune distribuzioni, Flatpak è presente di sistema e (spesso) disponibile tramite GNOME Software (come per Ubuntu) o AppCenter per quanto riguarda PopOS ed elementary OS.

Possiamo procedere all'installazione direttamente dalla <a href="https://flathub.org/apps/details/com.visualstudio.code">pagina ufficiale</a>.

### Debian, Ubuntu e derivate

In **Debian, Ubuntu** e distribuzioni derivate possiamo facilmente installare VS Code aggiungendo la repository fornita direttamente da Microsoft al nostro sistema in questo modo.

Per prima cosa installiamo (se non è già presente) il pacchetto `apt-transport-https`:

```bash
apt-get install apt-transport-https

```

A quel punto otteniamo la chiave GPG fornita da Microsoft, aggiungiamola come "fidata" al sistema e aggiungiamo la repo dedicata a VS Code:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/

sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

Aggiorniamo la lista delle repo:

```bash
apt-get update
```

e installiamo Code:

```bash
apt-get install code
```

### Fedora, CentOS e derivate

Per installare Visual Studio Code in distribuzioni come **Fedora, CentOS e derivate** dobbiamo seguire un passaggio simile a quello per Ubuntu e derivate.

Con `rpm` importiamo la chiave di Microsoft:

```bash
rpm --import https://packages.microsoft.com/keys/microsoft.asc

```

e aggiungiamo la repo di VS Code al sistema:

```bash
sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
```

aggiorniamo la cache delle repo di `dnf`:

```bash
dnf check-update
```

e installiamo Code:

```bash
dnf install code
```

### openSUSE

In **openSUSE** il processo di installazione di VS Code è identico a quello di Fedora e derivate, se non con qualche piccolissima differenza.

Importiamo la chiave di Microsoft con `rpm`:

```bash
rpm --import https://packages.microsoft.com/keys/microsoft.asc
```

e aggiungiamo la repo al sistema:

```bash
sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/zypp/repos.d/vscode.repo'
```

Aggiorniamo la cache di `zypper`, il package manager, e installiamo `code`:

```bash
zypper refresh

zypper install code
```

### Arch Linux

Visual Studio Code non è presente nelle repository di default di **Arch Linux**, bensì nell'**AUR** (Arch User Repository).

Per poterlo installare su Arch Linux, dobbiamo utilizzare `yay`, di cui abbiamo già parlato in una [guida dedicata](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper#title2).

```bash
yay -S visual-studio-code-bin
```

Inoltre è presente la versione Open source installabile tramite il pacchetto `code`.

Arrivati a questo punto, su Arch (così come in tutte le altre distro) dovreste poter avviare Code dal terminale oppure dai menù del vostro DE (o WM) preferito.


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).