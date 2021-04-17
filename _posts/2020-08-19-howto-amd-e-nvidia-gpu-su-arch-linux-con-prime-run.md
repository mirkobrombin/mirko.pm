---
title: '#howto - AMD e Nvidia GPU su Arch Linux con prime-run'
published: 2020-08-19
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - bash  - systemd  - bash  - systemd
---
Abbiamo <a href="https://linuxhub.it/articles/howto-portatili-nvidia-optimus-intel-nvidia-su-arch-linux-con-optimus-manager">già parlato</a> di come gestire le schede Intel e Nvidia su portatili Optimus mediante l'uso di Optimus manager.

Il discorso per GPU AMD e Nvidia è simile se si fa uso di Optimus manager, purtroppo questo sistema è al momento instabile e sconsigliato in questa configurazione. Nella guida vedremo come utilizzare entrambe le GPU in modalità *ibrida* (AMD + Nvidia in offload) senza alcun calo di prestazione.

> La guida è applicabile a qualsiasi GPU AMD integrata, supportata dai driver Open source `xf86-video-amdgpu`.

## AMD
Prima di tutto dobbiamo installare i microcode AMD (proprietari) ed i driver Open source per la GPU:

```bash
pacman -S amd-ucode xf86-video-amdgpu
```

### Configurazione boot
Andremo ora ad istruire il boot al caricamento dell'immagine `amd-ucode.img` generata durante l'installazione dei microcode.

#### Systemdboot
Per gli utenti *systemdboot* dobbiamo modificare il file di configurazione dell'installazione, nel mio caso è posizionata in `/boot/loader/entries/arch.conf`. Al suo interno troveremo diverse istruzioni, tra cui due di tipo `initrd`, sotto a queste andremo a posizionare la nostra:

```bash
..
initrd /amd-ucode.img
..
```

> Possiamo verificare la configurazione in uso dal file `/boot/loader/loader.conf` o aggiungere li dentro la regola in modo globale.

una volta fatto salviamo il file.

#### GRUB
Gli utenti *GRUB* possono sfruttare il comando `grub-mkconfig` il quale rileverà da solo le nuove immagini:

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

in questo caso non sono richiesti altri passaggi.

## Nvidia
Per prima cosa dobbiamo installare i driver proprietari Nvidia, normalmente il driver corretto è presente nel pacchetto `nvidia` ma per evitare rischi con kernel custom, installeremo `nvidia-dkms` almeno per le schede più recenti:

```bash
pacman -S nvidia-dkms nvidia-prime nvidia-settings nvidia-utils
```

Procediamo con l'installazione delle librerie 32bit in modo da poter utilizzare software appunto 32bit. Per fare ciò dobbiamo prima di tutto abilitare la repository *multilib* di pacman, modifichiamo quindi il file in posizione `/etc/pacman.conf` decommentando il seguente blocco:

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

ed aggiorniamo:

```bash
pacman -Syu
```

infine installiamo le librerie 32bit:

```bash
pacman -S lib32-libglvnd lib32-nvidia-utils
```

consiglio inoltre l'installazione di `vulkan-icd-loader` e `lib32-vulkan-icd-loader` per utilizzare le API Vulkan compatibili.

### Blacklist nouveau
Per evitare conflitti andremo a disabilitare i driver Open source `nouveau`, creiamo il file al percorso `/etc/modprobe.d/nouveau-blacklist.conf` ed inseriamo al suo interno:

```
blacklist nouveau
```

### mkinitcpio
Andiamo ad abilitare il modulo Nvidia, per fare ciò dobbiamo modificare il file in posizione `/etc/mkinitcpio.conf`, nello specifico la voce *MODULES=(..)* e aggiungere al suo interno `nvidia nvidia_modeset nvidia_uvm nvidia_drm`:

```
..
MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)
..
```

fate attenzione a preservare altri eventuali moduli già presenti.

### Configurazione boot
Ora andremo ad aggiungere l'opzione `nvidia-drm.modeset=1` ai parametri di boot, questo in molti casi andrà a rimuovere eventuali episodi di *flickerig* e *tearing* dello schermo.

#### Systemdboot
Per utenti systemdboot modifichiamo il file specifico (normalmente in `/boot/loader/entries`) ed aggiungiamo alla fine della riga `options=..` la dicitura `nvidia-drm.modeset=1`:

```
...
options=.. nvidia-drm.modeset=1
...
```

#### GRUB
Gli utenti GRUB devono editare il file in posizione `/etc/default/grub` ed aggiungere la dicitura `nvidia-drm.modeset=1` alla linea `GRUB_CMDLINE_LINUX_DEFAULT`:

```
...
GRUB_CMDLINE_LINUX_DEFAULT=".. nvidia-drm.modeset=1"
...
```

## Configurazione Xorg
Come ultimo step dobbiamo configurare Xorg in modo da istruirlo alla gestione delle due GPU. Per fare ciò modifichiamo o creiamo il file in posizione `/etc/X11/xorg.conf` ed inseriamo all'interno il seguente set di istruzioni:

```
Section "Device"
  Identifier "iGPU"
  Driver "modesetting"
  BusID "PCI:5:0:0"
EndSection

Section "Screen"
  Identifier "iGPU"
  Device "iGPU"
EndSection

Section "Device"
  Identifier "dGPU"
  Driver "nvidia"
  BusID "PCI:1:0:0"
EndSection
```

fate attenzione a sostituire i *BusID* con i dati corretti, possiamo ottenerli dal comando:

```bash
lspci -nnk | grep VGA
```

Una volta fatto riavviamo il sistema per rendere effettive le modifiche.

## Utilizzo di prime-run
Di base ogni applicazione verrà renderizzata tramite la GPU AMD integrata, possiamo decidere di utilizzare la secheda Nvidia dedicata tramite comando `prime-run`, da utilizzare come prefisso del comando.

Mettiamo caso di voler eseguire lo strumento `glxgears` tramite la scheda dedicata Nvidia:

```bash
prime-run glxgears
```

Per quanto riguarda applicativi come *Lutris* e *Steam*, è consigliato eseguire il client stesso con `prime-run`. In alternativa in quest'ultimo è possibile modificare le proprietà di un gioco modificando i parametri di avvio con i seguenti:

```bash
prime-run %command%
```

in questo modo il client steam verrà renderizzato mediante la scheda integrata AMD ed il gioco tramite la scheda dedicata Nvidia.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).