---
title: '#howto - Installazione e configurazione di systemd-boot'
description: "Systemd-boot è un bootloader per sistemi EFI. A differenza di GRUB lavora solo sulla ESP (EFI System Partit.."
published: 2020-04-15
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash  
  - systemd
---
**Systemd-boot** è un bootloader per sistemi EFI. A differenza di GRUB lavora solo sulla ESP (EFI System Partition) del disco su cui è installato, dove dovrà essere presente anche il kernel e file di configurazione del bootloader.

## Installazione

In questa parte vedremo come installare _systemd-boot_: la procedura è simile per tutte le distro, ma l'unico accorgimento che è necessario fare riguarda la posizione dell'ESP e il procedimento di installazione del kernel, che a volte può variare da sistema a sistema.

Il programma per la gestione di systemd-boot è [bootctl] ([https://www.freedesktop.org/software/systemd/man/bootctl.html](https://www.freedesktop.org/software/systemd/man/bootctl.html)), che dovrà essere utilizzato sia per installare il bootloader che per visualizzare la configurazione attuale. Su una ESP possibilmente vuota, eseguiamo il seguente comando come amministratore, presupponendo che l'ESP sia montata su `/boot`:

    bootctl --path=/boot install

## Aggiornamento

Quando necessario, possiamo **aggiornare** tramite l'opzione _update_:

    bootctl update

Per assicurarci che systemd-boot sia stato installato correttamente, diamo questo comando:

    bootctl is-installed

Se l'esito sarà positivo sarà possibile installare _linux_ dal nostro package manager preferito. Per sicurezza, controllare nella ESP di avere _vmlinuz-linux_.

## Configurazione

A differenza di GRUB, sytemd-boot non fornisce una configurazione completa di default, e pertanto toccherà a noi impostare il tutto a dovere. In seguito all'installazione, con il comando `ls` eseguito nella ESP dovremo trovare le seguenti cartelle:

*   _loader_ con al suo interno _loader.conf_ per la configurazione del bootloader;
*   _loader/entries_;
*   In _EFI_ dovranno esserci _systemd_ con al suo interno _systemd_bootx64.efi_ e _boot_ con al suo interno _bootx64.efi_;

I file che interessano a noi sono _loader/loader.conf_ e i file di configurazione che andranno messi dentro _loader/entries_.

### Configurare il loader

Per prima cosa apriamo _loader/loader.conf_ come amministratori con il nostro editor di testo preferito. La configurazione di default a noi non interessa, cancelliamola e riscriviamola in questo modo:

    default  distro.conf
    timeout  10
    console-mode max

Ora vediamo ogni parametro a cosa serve:

*   **default**: definisce la entry di default, in questo caso distro.conf;
*   **timeout**: il tempo tra la comparsa del menu e l'avvio automatico della entry default;
*   **console-max**: dimensione degli elementi del menu, noi usiamo _max_, sconsigliato in caso di display HiDPI;

Ora salviamo il file e chiudiamolo.

### Configurare una entry

Ora passiamo ai file dentro _loader/entries_, dove dovranno trovarsi le configurazioni delle singole _boot entries_. Apriamo la cartella e dentro creiamo il file _distro.conf_, dove andremo a scrivere:

    title      Nome Distribuzione
    linux   /vmlinuz-linux
    initrd  /initramfs-linux.img
    options root=PARTUUID=part_uuid_root rw quiet

Al posto di _part_uuid_root_ dovremo mettere il PARTUUID della nostra root, individuabile con `blkid`. _initramfs-linux.img_ non è obbligatorio, e varia da distribuzione a distribuzione.

Ora possiamo riavviare, e se tutto è andato liscio dovremmo trovarci di fronte al menù di systemd-boot che dovrebbe di seguito avviare l'entry da noi scelta.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).