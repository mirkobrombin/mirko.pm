---
title: '#howto - Fedora 31 Post Installazione'
published: 2020-02-22
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - fedora  
  - gnome  
  - bash
---
Se stai consultando questo articolo è perchè, molto probabilmente, hai appena installato sul tuo PC **Fedora 31**, nuova versione della distro Linux sponsorizzata da Red Hat e derivata dall'omonima distribuzione.

In questa guida vi mostro una lista di programmi, piccoli trucchetti e driver di cui vi consiglio l'installazione subito dopo aver installato Fedora 31.

## Prima di tutto
Prima di cominciare con questa ma anche altre guide di post installazione, è importante effettuare un aggiornamento del sistema:
```bash
sudo dnf upgrade
```
completato il processo procediamo con le prossime sezioni.

## Abilitare RPM Fusion

Le repository stock di Fedora hanno già un parco applicazioni molto ampio, ma può capitare che qualcosa di cui abbiamo bisogno non sia disponibile.

Per rimediare a questa mancanza vengono in nostro soccorso le repository RPM Fusion.

Come per molte repository abbiamo a disposizione due *canali* ossia: **free** e **non-free**. Nel primo abbiamo a accesso ad applicazioni che utilizzano una licenza di tipo libero, mentre nel secondo sono presenti software con una licenza non libera (proprietaria), ma comunque ridistribuibili.

**Free:**
```bash
sudo rpm -Uvh http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf upgrade --refresh
```

**Non-Free:**
```bash
sudo rpm -Uvh http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf upgrade --refresh
```

## Driver Proprietari GPU
Abilitate le repository RPM Fusion abbiamo accesso ai driver proprietari per la nostra GPU. In questa sezione tratteremo solo NVIDIA poichè con i driver AMD Open source otteniamo molto spesso prestazioni migliori che con quelli proprietari.

Prima di procedere con l'installazione, controlliamo qual'è la versione della nostra GPU e di conseguenza quale sarà il driver che dovremo installare:
```bash
lspci -vnn | grep VGA
```
per schede **GeForce/Quadro/Tesla**:
```bash
dnf install akmod-nvidia
```
per **GeForce 400/500**:
```bash
dnf install xorg-x11-drv-nvidia-390xx akmod-nvidia-390xx
```
per **GeForce 8/9/200/300**:

```bash
dnf install xorg-x11-drv-nvidia-340xx akmod-nvidia-340xx
```
completata l'installazione riavviamo il sistema per sfruttare i nuovi driver.

### Portatili Optimus
Optimus è una tecnologia sviluppata da Nvidia per la commutazione di GPU, ossia la gestione tra i due adattatori grafici al fine di fornire le massime prestazioni o il minimo consumo di energia in fase di rendering.

Poco tempo fa era indispensabile ricorrere a sistemi secondari per la gestione di due GPU, sistemi come Bumblebee che svolgevano bene il loro compito ma al prezzo di un grosso calo di prestazioni.

Ad oggi nelle recenti versioni dei driver è presente il nuovo sistema **Prime Offload**, normalmente installati i driver proprietari noteremo che il Server grafico (sostanzialmente tutto ciò che verrà renderizzato a schermo) passerà per la scheda integrata (ad esempio Intel) e non Nvidia. Per sfruttarla dovremmo aggiungere all'inizio del comando del programma che vogliamo eseguira con la scheda secondaria:
```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia
```
ad esempio per eseguire steam con la scheda Nvidia:
```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia steam
```
per eseguire un gioco steam con la scheda nvidia dovremo modificarne i parametri d'avvio dalle proprietà del gioco:
```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia %command%
```
mantenendo la variabile *%command%* essenziale per il corretto funzionamento e lancio dei giochi su Steam.

## DeltaRPM e Fastest Mirror

Uno dei punti forza di DNF è la sua modularità che ne permette di estenderne le funzionalità abilitando nuovi moduli.

Uno di questi è **DeltaRPM** che permette di recuperare le differenze tra i pacchetti installati sul tuo sistema e quelli appena disponibili tramite aggiornamento.

**Fastest Mirror**, invece, cerca i mirror più vicini alla tua posizione permettendoti di ottenere velocità di download superiori.

Per abilitare entrambi i plugin aggiungiamo queste stringhe in */etc/dnf/dnf.conf*:
```bash
fastestmirror=true
deltarpm=true
```

I plugin inizieranno a funzionare in automatico non appena si utilizzerà DNF.

## Moduli Wifi
Solitamente questo driver non è necessario, ma può sempre servire in caso la scheda wifi non venga rilevata correttamente dal sistema:
```bash
sudo dnf install kmod-wl
```

## Codec, plugin, Java e utilità generali
Ecco alcuni pacchetti che potrebbero tornarvi molto utili, come Java, rar, zip e vari codec video per visualizzare video ed ascoltare vari formati di file audio:
```bash
sudo dnf install -y ffmpeg icedtea-web java-openjdk p7zip p7zip-plugins unrar gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-ugly gstreamer1-plugins-bad-free gstreamer1-plugins-bad-free gstreamer1-plugins-bad-freeworld gstreamer1-plugins-bad-free-extras gstreamer1-plugins-good-extras gstreamer1-plugins-ugly-free
```

## Ridurre l'utilizzo della batteria con TLP
**TLP** è un power manager avanzato che permette di ridurre notevolmente l'utilizzo della batteria su computer portatili:
```bash
sudo dnf install tlp tlp-rdw
```
infine abilitiamolo all'avvio col sistema in modo da renderlo operativo e completamente autonomo:
```bash
sudo systemctl enable tlp
```

## GNOME Tweaks
Nella versione workstation, Fedora utilizza il Desktop Enviroment GNOME. 

> Nel caso stessi usando una spin di Fedora (una versione con desktop differente da GNOME) non seguire le seguenti operazioni.

Uno strumento essenziale per chi usa GNOME è **Tweaks**, un utile strumento che permette la facile gestione di impostazioni extra come:
* tema della shell
* tema delle finestre
* tema delle icone
* posizione dei pulsanti delle finestre
* orientamento delle finestre

ma anche gestire e abilitare/disabilitare le estensioni, scegliere quali applicazioni eseguire all'avvio del sistema e tanto altro.

Per installarlo procediamo come sempre via **dnf**:
```bash
sudo dnf install gnome-tweaks
```


Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).