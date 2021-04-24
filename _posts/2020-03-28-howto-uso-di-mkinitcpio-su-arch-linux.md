---
title: '#howto - Utilizzo di mkinitcpio su Arch Linux'
description: "In un sistema con kernel Linux, un initramfs, o initial ramdisk filesystem, è un'immagine che viene caricata.."
published: 2020-03-28
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash
---
In un sistema con kernel Linux, un **initramfs**, o _initial ramdisk filesystem_, è un'immagine che viene caricata all'avvio del proprio dispositivo per eseguire determinate operazioni come il caricamento di alcuni driver prima del System Init. Sulla distribuzione Arch Linux l'initramfs può essere generata grazie ad un utile strumento chiamato **mkinitcpio** che, in base ad una configurazione ed un preset specifico per il kernel, ci permette di creare la nostra immagine.

## Installazione
Di norma _mkinitpcio_ è già installato come dipendenza del kernel, ma per assicurarci che sia presente sul nostro sistema possiamo utilizzare il seguente comando:

```bash
sudo pacman -S --needed mkinitcpio
```

## Configurazione
mkinitcpio può essere configurato attraverso due file chiamati _mkinitcpio.conf_ e _kernel.preset_. Il primo è il file di configurazione principale, dove vengono definiti moduli, binari, altri file da includere e gli hooks. Nel secondo, invece, si specificano i .preset: quest'ultimi includono informazioni come la posizione dei file del kernel, dell'initramfs in uscita e tutti i presets interni.

### mkinitcpio.conf
Per poter utilizzare mkinitcpio, come prima cosa, dovremo configurare mkinitcpio.conf. Aprendo il file con il nostro editor di testo preferito troveremo cinque sezioni: _MODULES, BINARIES, FILES, HOOKS, COMPRESSION_.

* La prima sezione, __MODULES__, include tutti i moduli che vogliamo aggiungere manualmente all'avvio, come ad esempio _amdgpu_ o _i915_ per impostare la risoluzione massima in early boot su GPU AMD o Intel. 

* La sezione seguente è __BINARIES__, che comprende tutti i binari che vogliamo includere nell'initramfs, come ad esempio _systemctl, journalctl o fsck_. 

* __FILES__ consente di includere in initramfs dei file di configurazione utili, come ad esempio quello di modprobe, solitamente posizionato in _/etc/modprobe.d/modprobe.conf_. 

* L'ultimo nella categoria di configurazione "pre-costruzione" è __HOOKS__, dove possiamo indicare scripts che permettono di eseguire delle operazioni automatiche. Queste possono essere diverse, e tra essere troviamo l'auto rilevamento dei driver delle periferiche, dei filesystem in uso e altri ancora. Il primo hook, che normalmente non viene mai eliminato dal file di configurazione, è _base_. 

Con questi parametri di "pre-costruzione" è possibile costruire l'initramfs che, se desiderato, può essere compressa. Per poterlo fare è necessario aggiungere nella sezione __COMPRESSION__ il nome dell'algoritmo di compressione e, in **COMPRESSION_OPTIONS**, i parametri di compressione.

Il risultato finale dovrebbe simile essere al seguente:
```bash
MODULES=(amdgpu i915 ext4 ...)

BINARIES=(fsck ...)

FILES=("/etc/modprobe.d/modprobe.conf" ...)

HOOKS=(base udev autodetect filesystem ...)

COMPRESSION="lz4"
COMPRESSION_OPTIONS=(--best ...)
```

È necessario sottolineare che le seguenti opzioni variano in base all'architettura del proprio PC, ai suoi componenti e a tanti altri fattori.

### Preset file
Dopo aver impostato tutti i nostri parametri in mkinitcpio.conf, passiamo alla configurazione del preset per il kernel. Scriverlo è molto semplice, ma di seguito vediamo nel dettaglio i parametri essenziali. 

* Il primo, **ALL_config**, dovrà avere il percorso di mkinitcpio.conf come valore
* Il secondo è **ALL_kver**, che invece dovrà avere come valore il percorso del kernel di cui vogliamo generare l'initramfs
* All'interno del terzo parametro, **PRESETS=()**, dobbiamo inserire il nome dei presets che vogliamo creare. Nel nostro caso, come esempio, chiamiamolo _'default'_
* Dobbiamo infine dichiarare dove verrà salvata la nostra initramfs, e per questo è necessario assegnare un valore alla variabile **nomepreset_image**, dove _nomepreset_ è il nome del preset che abbiamo scelto in precedenza (_'default'_ nel nostro caso). Un altro valore obbligatorio è, ovviamente, il percorso di dove vogliamo che sia salvata la nostra immagine.

Di seguito ecco un esempio del nostro Preset file:
```bash
ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux"

PRESETS=('default')
default_image="/boot/initramfs-linux.img"
```

## Creazione e ispezione dell'immagine
Finito di scrivere le configurazioni, ora possiamo procedere alla generazione dell'initamfs. Per poter creare l'immagine sarà necessario utilizzare mkinitcpio in questo modo:
```bash
sudo mkinitcpio -p nomepreset
```
Fatto ciò, la nostra initramfs è stata generata secondo i parametri che abbiamo assegnato in precedenza ai file di configurazione.
Per leggere invece il contenuto della nostra initramfs dobbiamo usare un altro tool di Arch, *lsinitcpio*. Basta un semplice comando per vedere tutti i moduli, file, binari e hooks con cui è stato creato:

```bash
sudo lsinitcpio -a /percorso/initramfs.img
```
![Initramfs ls](storage/gio%2026%20mar%202020%2C%2013%3A54%3A48%2C%20CET_area.jpg)

In questo modo possiamo vedere il contenuto dell'immagine, personalizzare la configurazione per ridurre il peso e aumentare la velocità all'avvio.


Per chiarimenti o dubbi non esitare a chiedere nel nostro [gruppo telegram](https://t.me/linuxpeople)