---
title: '#howto - Fedora 26 Workstation guida post installazione'
date: 2017-09-24
layout: post
author: Giuseppe F.
author_github: linuxhubit
tags:
  - fedora  
  - gnome
---
Come [annunciato](https://linuxhub.it/2017/07/11/fedora-26-disponibile-il-download/) diverse settimane fa, **Fedora 26 è** disponibile al download da tutti i mirror.

Come di consueto, abbiamo predisposto la presente guida per le azioni di post installazione, in questo caso, per Fedora 26\. La prima operazione da fare dopo aver installato Fedora 26 è aprire il Terminale e aggiornare il sistema con tutti gli ultimi aggiornamenti e patch, per fare ciò digitiamo:

<pre>sudo dnf upgrade</pre>

Andremo ora ad installare i repository RPM Fusion, questi offrono un grande parco software e viene diviso in **_free_** e **_nonfree_**, digitiamo il comando:

<pre>su -c 'dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm'</pre>

### Programmi utili

Installiamo di seguito alcuni codec e strumenti molto utili quali (**git, java e alcuni codec multimediali**):

<pre>sudo dnf install git icedtea-web java-openjdk gstreamer1-plugin-mpg123 mpg123-libs -y</pre>

se necessario, è anche possibile installare il **plugin Flash**, per farlo:

<pre>sudo dnf -y install http://linuxdownload.adobe.com/adobe-release/adobe-release-x86_64-1.0-1.noarch.rpm</pre>

importiamo le chiavi necessarie all'installazione del plugin flash:

<pre>sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-adobe-linux</pre>

e installiamolo:

<pre>sudo dnf install flash-plugin -y</pre>

Installare **Telegram Desktop**

<pre>sudo dnf install telegram-desktop</pre>

Per il player **VLC**

<pre>sudo dnf install vlc -y</pre>

Per molti utile, **Spotify**, un client multimediale streaming e locale cross-platform, per installarlo diamo:

<pre>sudo dnf config-manager --add-repo=http://negativo17.org/repos/fedora-spotify.reposudo dnf install spotify-client</pre>

per gli amanti dei giachi installeremo **Steam**

<pre>sudo dnf config-manager --add-repo=http://negativo17.org/repos/fedora-steam.reposudo dnf -y install steam</pre>

**Simple scan** è un tool molto compatto e leggero per la scannerizzazione dei documenti:

<pre>sudo dnf install simple-scan</pre>

Supporti extra per la **compressione** **e** **decompressione** dei file:

<pre>sudo dnf install unace unrar p7zip p7zip-plugins -y</pre>

Se utilizziamo GNOME è altrettanto utile **Gnome** **Tweak** **Tool** (ora solo **GNOME** **Tweaks**), questo tool permette la personalizzazione di GNOME stesso. Per installarlo:

<pre>sudo dnf install gnome-tweak-tool -y</pre>

**Fedora Media Writer** ottimo per creare usb bootable da immagini disco:

<pre>sudo dnf install mediawriter</pre>

**Qbittorrent** è un ottimo client per il download di file Torrent e Magnet Link torrent:

<pre>sudo dnf install qbittorrent</pre>

Per chi vuole scaricare i propri video da Youtube/Facebook/Twitter/.. installiamo **Youtube-DL**

<pre>sudo dnf install youtube-dl</pre>

### Desktop environment

Di seguito la lista dei comandi per l'installazione di un desktop environment alternativo a quello pre-installato. **GNOME**

<pre>sudo dnf install @gnome-desktop</pre>

**Mate Desktop**

<pre>sudo dnf install @mate-desktop</pre>

**KDE 5**

<pre>sudo dnf install @kde-desktop</pre>

**XFCE Desktop**

<pre>sudo dnf install @xfce-desktop</pre>

**Cinnamon Desktop**

<pre>sudo dnf install @cinnamon-desktop</pre>

**Lxde Desktop**

<pre>sudo dnf install @lxde-desktop</pre>

Concludo con l'augurarvi un buon divertimento con Fedora 26!

**RPM Fusion** |[ https://rpmfusion.org/](https://rpmfusion.org/)