---
title: '#howto - Installare driver NVIDIA su Silverblue' 
date: 2022-02-04 17:47
layout: post 
author: Mirko Brombin
author_github: mirkobrombin 
published: true
tags: 
- silverblue 
- fedora
- nvidia
---

Silverblue è una versione di Fedora di tipo “immutabile”. Punta ad essere estremamente stabile ed una piattaforma per sviluppatori e per coloro che utilizzano container. Per maggiori informazioni su questa distribuzione, leggi l’articolo [dedicato](https://linuxhub.it/articles/howto-breve-introduzione-all-uso-di-silverblue/).

## Installazione

L’installazione non differisce troppo da Fedora, cambia l’uso del package manager che su Silverblue è `rpm-ostree` piuttosto che `dnf`, oltre che il metodo con cui andremo a configurare alcune flag del kernel.

### RPMFusion

Per l'installazione useremo la repository RPMFusion che andiamo quindi ad installare:

```bash
rpm-ostree install --apply-live https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Nell'esempio qui sopra usiamo l'opzione `--apply-live` per applicare subito le modifiche nel branch corrente (perchè Silverblue è basata su OSTree, un sistema simile a git, ogni modifica viene applicata con un commit sul branch attivo e questo richiede normalmente un riavvio per applicare le modifiche).

Se abbiamo precedentemente installato la repository RPMFusion specifica per la nostra versione di Silverblue, assicuriamoci di rimuoverle e installare quelle comuni per non doverle re-installare ad ogni rilascio:

```bash
rpm-ostree update \
            --uninstall rpmfusion-free-release-35-1.noarch \
            --uninstall rpmfusion-nonfree-release-35-1.noarch \
            --install rpmfusion-free-release \
            --install rpmfusion-nonfree-release 
```

### Driver

Procediamo con l'installazione dei driver NVIDIA. Ci sono diversi altri 2 pacchetti oltre al driver in se (`akmod-nvidia`) e dobbiamo scegliere quelli di cui abbiamo bisogno:

* `xorg-x11-drv-nvidia-cuda` per il supporto a CUDA
* `xorg-x11-drv-nvidia-power` per la gestione dei profili
Nel nostro caso li installeremo tutti:

```bash
rpm-ostree install akmod-nvidia xorg-x11-drv-nvidia-cuda xorg-x11-drv-nvidia-power
```

Una volta installato il driver ed eventuali altri pacchetti necessari, procediamo con la configurazione dei parametri del kernel:

* blacklist del driver open source nouveau
* disattivazione di modeset (questo evita il tearing)

```bash
rpm-ostree kargs --append=rd.driver.blacklist=nouveau --append=modprobe.blacklist=nouveau --append=nvidia-drm.modeset=0
```

Quindi riavviamo semplicemente: `systemctl reboot`.

## Wayland (GDM)

Wayland potrebbe risultare disattivato quando si usano i driver proprietari di NVIDIA, nonostante le recenti versioni lo supportano egregiamente. Per abilitarlo ci basterà modificare la configurazione di GDM e per farlo dovremo creare una copia della configurazione in `/etc` che è un percorso in cui possiamo scrivere (data l'immutabilità della root):

```bash
cp /usr/lib/udev/rules.d/61-gdm.rules /etc/udev/rules.d/  
nano  /etc/udev/rules.d/61-gdm.rules
```

e nel nuovo file cambiamo ogni occorrenza di `WaylandEnable false` in `WaylandEnable true`.

Quindi riavviamo nuovamente.

## Profili

Per utilizzare i profili NVIDIA (se installato il pacchetto dedicato), ci basterà abilitare i servizi dedicati via systemctl:

```bash
systemctl enable nvidia-{suspend,resume,hibernate}
```
