---
title: '#howto - Installazione di Autodesk Maya 2020 su Arch Linux'
published: 2020-04-18
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - python  - archlinux  - bash
---
Maya è un software per la modellazione 3D sviluppato e distribuito da Autodesk.

Il programma è di facile installazione su sistemi basati su Debian e Fedora, ma troviamo complicazioni su tutte le altre distribuzioni che non supportano l'installazione di pacchetti **.deb** e **.rpm**.

In questa guida vediamo come procedere all'installazione su Arch Linux e derivate. C'è da tener conto che è presente su AUR il pacchetto <a href="https://aur.archlinux.org/packages/maya/">maya</a>, ma si tratta della release 2017 e non 2020.

## Pacchetto e dipendenze
Per prima cosa dobbiamo ottenere una copia di Maya dal <a href="https://manage.autodesk.com/products/maya">sito ufficiale</a>, e una volta effettuato l'accesso col nostro account arriviamo alla pagina di Download e scarichiamo l'archivio per *Linux 64*.

Una volta fatto ciò, portiamoci in una path vuota (nel nostro esempio `~/Scaricati/Maya`) e scompattiamo il contenuto:

```bash
unzip *zip
```

### Dipendenze
Procediamo all'installazione delle dipendenze necessarie per poter procedere con i prossimi step:

```bash
pacman -S libjpeg lib32-libjpeg libjpeg6 openssl-1.0 openssl audiofile xorg-fonts-misc libxp python2 python2-backports ld-lsb lsb-release cpio xorg-fonts-100dpi xorg-fonts-75dpi xorg-fonts gsfonts adobe-source-code-pro-fonts xorg-xlsfonts xorg-fonts-type1 libtiff ruby
```

dovremo installare anche <a href="https://aur.archlinux.org/packages/libpng15/">libpng15</a>, disponibile presso AUR. Per farlo possiamo usare yay (dove l'installazione è spiegata <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper#title2">qui</a>):

```bash
yay -S libpng15
```

Ultima dipendenza è **FPM**, ossia uno strumento in grado di convertire pacchetti **.rpm**. Possiamo ottenerlo tramite `gem` precedentemente installato col pacchetto `ruby`:

```bash
gem install --no-document fpm
```

Una volta scaricato creiamo un alias verso il suo percorso di installazione:

```bash
alias fpm="~/.gem/ruby/2.7.0/gems/fpm-1.11.0/bin/fpm
```

> Il percorso potrebbe variare in caso di incremento versione, in questa guida faremo riferimento alla 1.11.0.

e digitiamo `fpm -h` per verificarne il corretto funzionamento.


## Conversione RPM
Portiamoci dai file estratti in locazione `/Packages` dove dovremmo trovare 7 pacchetti **.rpm**:

- adlmapps17-17.0.49-0.x86.rpm
- adlmflexnetclient-17.0.49-0.x86_64.rpm
- adlmflexnetserverIPV6-17.0.50-0.x86_64.rpm
- adsklicensing9.2.1.2399-0-0.x86.rpm
- Bitfrost2020-2.0.3.0-1.x86_64.rpm
- Maya2020_64-2020.0-235.x86_64.rpm
- Substance_in_Maya-2020-2.0.3-1.el7.x86_64.rpm

Possiamo procedere alla loro conversione via `fpm` in questo modo:

```bash
fpm -t pacman -s rpm Bifrost2020-2.0.3.0-1.x86_64.rpm 
fpm -t pacman -s rpm Maya2020_64-2020.0-235.x86_64.rpm 
fpm -t pacman -s rpm Substance_in_Maya-2020-2.0.3-1.el7.x86_64.rpm
fpm -t pacman -s rpm adlmflexnetclient-17.0.49-0.x86_64.rpm 
fpm -t pacman -s rpm adlmflexnetserverIPV6-17.0.50-0.x86_64.rpm 
fpm -t pacman -s rpm adlmapps17-17.0.49-0.x86_64.rpm 
fpm -t pacman -s rpm adsklicensing9.2.1.2399-0-0.x86_64.rpm
```

il processo potrebbe richiedere diversi minuti per i pacchetti più pesanti.

## Installazione
Una volta convertiti tutti i pacchetti possiamo procedere con l'installazione del server per le licenze via `pacman` come di consueto:

```bash
pacman -U adlmapps17-17.0.49-0-x86_64.pkg.tar.xz adsklicensing9.2.1.2399-0-0-x86_64.pkg.tar.xz adlmflexnetserverIPV6-17.0.50-0-x86_64.pkg.tar.xz adlmflexnetclient-17.0.49-0-x86_64.pkg.tar.xz
```

e inviamo le seguenti istruzioni:

```bash
sudo getent group adsklic &>/dev/null || sudo groupadd adsklic

sudo id -u adsklic &>/dev/null || sudo useradd -M -r -g adsklic adsklic -d / -s /usr/bin/nologin 

/opt/Autodesk/Adlm/FLEXnet/bin/toolkitinstall.sh
/opt/Autodesk/Adlm/FLEXnet/bin/install_fnp.sh /opt/Autodesk/Adlm/FLEXnet/bin/FNPLicensingService

```

Avviamo il servizio via `systemctl`:

```bash
systemctl enable adsklicensing --quiet
systemctl start adsklicensing
```

e infine installiamo Maya 2020:
```bash
pacman -U Maya2020_64-2020.0-235-x86_64.pkg.tar.xz
```

### Collegamenti librerie
Andiamo ora a creare alcuni collegamenti simbolici per le librerie necessarie al funzionamento di Maya:

```bash
ln -s /usr/lib64/libssl.so.1.0.0 /usr/lib64/libssl.so.10
ln -s /usr/lib64/libcrypto.so.1.0.0 /usr/lib64/libcrypto.so.10
```

### Bitfrost e Substance
Trattandosi di software opzionale, non è necessario installarli a meno che non si intenda usarli, ma nel caso ne necessitaste procediamo via `pacman`:

```bash
pacman -U Bifrost2020-2.0.3.0-1-x86_64.pkg.tar.xz Substance_in_Maya-2020-2.0.3-1.el7-x86_64.pkg.tar.xz
```

## Licenza
Una volta completata l'installazione dobbiamo aggiungere Maya al sistema licenze:

```bash
sudo /opt/Autodesk/AdskLicensing/9.2.1.2399/helper/AdskLicensingInstHelper register -pk 657L1 -pv 2020.0.0.F -el EN_US -cf /var/opt/Autodesk/Adlm/Maya2020/MayaConfig.pit
```

possiamo verificare che tutto sia andato per il verso giusto restituendo la lista delle licenze:

```bash
/opt/Autodesk/AdskLicensing/9.2.1.2399/helper/AdskLicensingInstHelper list
```

## Utilizzo
Per avviare il programma possiamo usare il file `maya2020` in locazione `/usr/autodesk/maya2020/bin/`:

```bash
cd /usr/autodesk/maya2020/bin/
./maya2020
```

### Desktop file
Possiamo aggiungere Maya al menu applicazioni creando un nuovo `desktop file`.

Scarichiamo da <a href="https://i.imgur.com/Tq3ReZ0.jpg">qui</a> l'icona e posizioniamola in `~/.local/share/icons/maya.png`.

Creiamo un nuovo file in locazione `~.local/share/applications`:

```bash
nano ~.local/share/applications/Maya.desktop
```

ed inseriamo al suo interno il seguente contenuto:
```
[Desktop Entry]
Name=Maya 2020
Exec=/usr/autodesk/maya2020/bin/maya2020
Icon=maya
Type=Application
Categories=Utility;
```

dovrebbe ora essere comparsa una nuova icona nel menu applicazioni del vostro desktop.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).