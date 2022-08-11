---
title: '#howto - Installazione ed utilizzo di Snap'
date: 2021-04-09
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - archlinux  
  - bash
---
Le snap sono pacchetti di app per desktop, cloud e IoT facili da installare, sicuri, multipiattaforma e privi di dipendenze, queste vengono infatti pacchettizzate assieme al software, per tanto non è necessario installarle a parte.

Si tratta di un progetto Open source, ideato, sviluppato e mantenuto da Canonical Ltd., è inoltre il formato pacchetto di sistema su Ubuntu.

> Sei interessato ai pacchetti containerizzati? Dai un'occhiata anche alla nostra guida su [Flatpak](https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub).

## Installazione
Il pacchetto viene chiamato `snapd` su quasi tutte le distribuzioni Linux. Di seguito vediamo come installarlo sulle principali.

### Arch Linux
Troviamo il pacchetto nella repository AUR, possiamo procedere tramite un [AUR Helper](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper) o manualmente:

```bash
git clone https://aur.archlinux.org/snapd.git
cd snapd
makepkg -si
```

### Debian/Ubuntu e derivate
Da Ubuntu 19.04, snap è preinstallato nel sistema. Per distribuzioni che si basano su Ubuntu come Pop OS ed elementary OS ma anche Debian 10 e derivate (come Raspberry Pi OS), il pacchetto è presente nelle repository di sistema:

```bash
apt install snapd
```

### Fedora e derivate
Da Fedora 32, `snapd` è presente nelle repository di sistema, procdiamo quindi via gestore pacchetti `dnf`:

```bash
dnf install snapd
```

### Centos/RHEL 8
Troviamo `snapd` nelle repository EPEL (Extra Packages for Enterprise Linux ), la procedura è la stessa sia per Centos 8 che RHEL 8, aggiungiamo quindi la repository:

```bash
dnf install epel-release
dnf upgrade
```

Installiamo quindi il pacchetto:

```bash
dnf install snapd
```

### openSUSE
Come per Centos e RHEL, dobbiamo aggiungere una repository, in questo caso tramite `zypper`:

```bash
zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.2 snappy
```

ed importiamo la chiave GPG della repository:

```bash
zypper --gpg-auto-import-keys refres
```

infine includiamo la nuova repository:

```bash
zypper install snapd
```

quindi installiamo il pacchetto `snapd`:

```bash
zypper dup --from snappy
```

## Configurazione
Una volta installato, dobbiamo abilitare il servizio via `systemctl`:

```bash
systemctl enable --now snapd.socket
```

assicurandoci che questo venga eseguito all'avvio.

Dobbiamo inoltre creare un link simbolico per di `/var/lib/snapd/snap` verso `/snap`:

```bash
ln -s /var/lib/snapd/snap /snap
```

questo serve ad abilitare il supporto *classic* di snap, ossia il supporto ai pacchetti che utilizzano il vecchio formato snap.

## Utilizzo
Tutti i pacchetti sono presenti nella repository [Snapcraft](https://snapcraft.io), scegliamo il pacchetto dalla lista e installiamolo tramite commando `snap` con l'opzione `install`. Ad esempio per Teelgra:

```bash
snap install telegram-desktop
```

Per i pacchetti che utilizzano il vecchio formato *classic*, dobbiamo indicarlo con l'opzione `--classic`, ad esempio per VS Codium:

```bash
snap install codium --classic
```


