---
class: post
title: '#howto - Portatili Nvidia Optimus (Intel+Nvidia) su Arch Linux con optimus-manager'
description: "Optimus è una tecnologia sviluppata da Nvidia per la commutazione di GPU, ossia la gestione tra i due adattatori gra.."
date: 2019-12-31
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Optimus è una tecnologia sviluppata da Nvidia per la commutazione di GPU, ossia la gestione tra i due adattatori grafici al fine di fornire le massime prestazioni o il minimo consumo di energia in fase di rendering.

Esistono diverse soluzioni per l'utilizzo e la gestione di questa tecnologia, principalmente:
* optimus-manager (il sistema che andiamo a vedere in questa guida e che permette lo switch completo fra le due GPU o l'utilizzo della modalità ibrida "hybrid" fra le due)
* bumblebee (soluzione che permette l'utilizzo ibrido fra le due, ma con evidenti cali di prestazioni)

Come detto in questa guida vediamo l'installazione e l'utilizzo di **optimus-manager** su Arch Linux per la gestione delle schede commutabili.

> In questa guida viene utilizzato anche yay per l'installazione dei pacchetti, leggi <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper">qui</a> come installarlo

## Installazione dei driver
Per prima cosa dobbiamo installare i driver proprietari Nvidia, normalmente il driver corretto è presente nel pacchetto *nvidia* almeno per le schede più recenti:
```
pacman -S nvidia nvidia-settings
```
Procediamo con l'installazione delle librerie 32bit in modo da poter utilizzare software appunto 32bit. Per fare ciò dobbiamo prima di tutto abilitare la repository *multilib* di pacman, modifichiamo quindi il file in posizione */etc/pacman.conf* decommentando il seguente blocco:
```
[multilib]
Include = /etc/pacman.d/mirrorlist
```
ed aggiorniamo:
```
pacman -Syu
```
Infine installiamo quindi le librerie 32bit necessarie:
```
yay -S lib32-libglvnd lib32-nvidia-utils
```
consiglio inoltre l'installazione di *vulkan-icd-loader* e *lib32-vulkan-icd-loader* per utilizzare le API Vulkan compatibili e disponibili nel pacchetto *nvidia*.

## optimus-manager
Siamo arrivati all'installazione di optimus-manager, il software fondamentale per la gestione dele schede. Procediamo quindi con l'installazione del pacchetto:
```
yay -S optimus-manager
```
Una volta installato dobbiamo procedere all'abilitazione ed esecuzione del servizio via *systemctl*:
```
systemctl enable optimus-manager
systemctl start optimus-manager
```
e riavviamo il sistema:
```
reboot
```

### Switch delle schede
Lo scopo principale di optimus-manager è quello di permettere lo switch delle schede commutabili.

Sono disponibili 4 modalità per lo switch delle schede:
* **intel** per passare alla scheda Intel
* **nvidia** per passare alla scheda nvidia
* **hybrid** per utilizzare il servizio ibrido fra le due schede (Intel + Nvidia in offload)
* **auto** per passare automaticamente alla scheda non selezionata

Possiamo scegliere quale modalità tramite l'opzione *--switch*, ad esempio per passare a nvidia:
```
optimus-manager --switch nvidia
```
Da tenere in considerazione che ad ogni switch verrà effettuato al logout dell'utente che dovrà effettuare nuovamente il login.

Nel caso vogliate utilizzare la modalità **hybrid**, dovrete aggiungere i seguenti paraetri al software che volete eseguire tramite Nvidia:
```
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME="nvidia" __VK_LAYER_NV_optimus="NVIDIA_only"
```
ad esempio se vogliamo avviare gedit tramite Nvidia, il comando diventerà:
```
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME="nvidia" __VK_LAYER_NV_optimus="NVIDIA_only" gedit
```
Per quanto riguarda i giochi tramite la piattafora **Steam**, dovremmo modificare i parametri d'avvio del gioco in questo modo:
```
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME="nvidia" __VK_LAYER_NV_optimus="NVIDIA_only" %command%
```
specificando eventuali altri comandi specifici del gioco, dopo `%command%`.

Invece riguardo **Lutris** la procedura è più semplice, ci basterà modificare le impostazioni del gioco abilitando le impostazioni avanzate e selezionando NVIDIA Prime render offload nella scheda di sistema:
![NVIDIA Prime render offload](storage/Schermata%20da%202020-01-30%2007-50-08.png)

### Switch al boot
Possiamo specificare quale GPU/modalità impostare al boot del sistema tramite l'opzione **--set-startup** la quale supporta le prime 3 modalità sopra-citate. Ad esempio se vogliamo impostare la scheda Nvidia al boot, digitiamo:
```
optimus-manager --set-startup nvidia
```
quindi al prossimo avvio il sistema userà la scheda video Nvidia.

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://linuxhub.it/t.me/gentedilinux">gruppo telegram</a>.