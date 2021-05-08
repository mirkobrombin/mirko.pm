---
title: '#howto - Installazione di Bottles su Linux'
published: 2021-01-04
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - github  
  - archlinux  
  - bash
  - fedora
  - flatpak
  - snap
  - flathub
  - snapcraft
---
**Bottles** è un programma open-source che consente di eseguire in maniera molto rapida e veloce software sviluppati principalmente per Windows su Linux. Questo programma offre ambienti preconfigurati con dipendenze e configurazioni specifiche che possono tornare utili per determinati software, che siano applicazioni di comune utilità oppure giochi.

In questa guida vedremo **come installare la versione 2** di Bottles sulle principali distribuzioni Linux.

## Installazione di Bottles

> Questa versione è in fase di sviluppo, pertanto potrebbero esserci bug o ulteriori problemi che possono essere segnalati sulla [repo GitHub di Bottles](https://github.com/bottlesdevs/Bottles/issues).

### AppImage

Come già trattato in [questa guida](https://linuxhub.it/articles/howto-utilizzo-ed-installazione-di-appimage), Bottles può essere installato tramite **AppImage**. Come spiegano gli sviluppatori, questo è l'unico metodo di installazione supportato ufficialmente, ma non l'unico.

Per prima cosa, scarichiamo l'ultima versione di Bottles da GitHub, apriamo il terminale e diamo i permessi di esecuzione al file con estensione "*.AppImage*".

```bash
chmod +x Bottles-devel-x86_64.AppImage
```

A questo punto, eseguiamo l'AppImage ed il gioco è fatto: il programma si avvierà correttamente e sarà pronto all'uso.

```bash
./Bottles-devel-x86_64.AppImage
```

### Flatpak

Gli sviluppatori mettono a disposizione Bottles anche sotto forma di Flatpak, il formato pacchetto di GNOME.

Prima di tutto dobbiamo assicurarci che il nostro sistema supporti le Flatpak, possiamo verificarlo richiedendo la versione installata:

```bash
flatpak --version
```

il quale dovrà ritornare un output simile al seguente:

```bash
flatpak --version
Flatpak 1.8.4
```

In caso contrario vi rimando a [questa](https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub) guida per la configurazione.

Non ci resta che installare Bottles, apriamo la pagina ufficiale su [Flathub](https://flathub.org/apps/details/com.usebottles.bottles) e clicchiamo su **Install**. Questo scaricherà il file `.flatpakref` o aprirà lo store di sistema con la pagina di installazione, a seconda di come è stato configurato.

### Snapcraft
Bottles viene offerto anche sotto forma di snap, il formato pacchetto offerto da Canonical.

Possiamo installarla accedendo alla [pagina ufficiale](https://snapcraft.io/bottles) dello store Snapcraft.

### Pacchetti non ufficiali

Bottles viene anche distribuito tramite pacchetti non ufficialmente supportati presenti in diverse estensioni. 

#### Fedora 32+

Bottles è disponibile nelle repository di Fedora ed è quindi facile installarlo, procediamo infatti tramite `dnf`, il gestore pacchetti di sistema:

```bash
dnf install bottles
```

#### Arch Linux

Per installare questi pacchetti ci servirà un AUR Helper o la conoscenza del comando `makepkg`, vi rimando a [questa](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper) guida.

Ci sono due pacchetti:
- [bottles-git](https://aur.archlinux.org/packages/bottles-git)
- [bottles](https://aur.archlinux.org/packages/bottles)

Nel caso di `bottles-git` abbiamo sempre l'ultima versione di Bottles, questa potrebbe essere una versione instabile ma riceverà gli aggiornamenti in tempo reale.

Per quanto riguarda `bottles` invece, ci viene fornita l'ultima versione stabile.

#### Open SUSE Tumbleweed

Per Open SUSE è possibile scaricare il pacchetto `.rpm` disponibile da [qui](https://download.opensuse.org/repositories/home:/WhiXard/openSUSE_Tumbleweed/x86_64/). Una volta scaricato procediamo all'installazione tramite il comando `rpm`:

```bash
rpm -i nome_pacchetto.rpm
```

### Build da sorgente

Il terzo ed ultimo modo con cui è possibile installare Bottles sul proprio sistema, al momento, è il classico **build del codice sorgente**. Per fare ciò ci serviranno Meson, Ninja e Python 3 come requisiti.

Una volta che avremo tutti i prerequisiti installati sulla nostra distribuzione Linux, scarichiamo il sorgente di Bottles, creiamo una cartella chiamata "*build*" ed eseguiamo sia Meson che Ninja:

```bash
mkdir build
meson build && cd build
ninja -j$(nproc)
ninja install
```

Se invece desideriamo disinstallare Bottles, possiamo farlo tornando nella cartella build ed eseguendo il comando "*uninstall*" di Ninja:

```bash
cd build
ninja uninstall
```

## Conclusione

Una volta installato Bottles con qualsiasi metodo da voi scelto potrete finalmente eseguire la maggior parte dei programmi Windows che desiderate con molta semplicità e velocità.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.
