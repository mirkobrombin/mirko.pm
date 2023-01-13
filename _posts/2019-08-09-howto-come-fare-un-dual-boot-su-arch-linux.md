---
class: post
title: '#howto - Dual boot su Arch Linux'
description: "Arch Linux è una distribuzione molto amata dalla comunità, per via di una community attiva e una wiki completa, ma non per questo è esente da problemi di sorta o complicazioni nell'uso."
date: 2019-08-09
layout: post
author: Niccolò Martiri
author_github: talebian
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
**Arch Linux** è una distribuzione molto amata dalla comunità, per via di una community attiva e una wiki completa, ma non per questo è esente da problemi di sorta o complicazioni nell'uso.

Una nelle spine nel fianco di Arch Linux è _l'installazione_, a non tutti gli utenti può piacere, ma la maggior parte si ritroverà compatta su una cosa: _"Ma quanto è problematico fare un buon **Dual Boot con Arch Linux!"**._

Dato che l'installazione di Arch viene fatta da terminale, i tools per il partizionamento del disco sono molto più complessi da usare per un utente normale e bisogna fare attenzione a non fare passaggi sbagliati(cosa non scontata), ma soprattutto non c'è nessun riferimento su quale siano le partizioni da formattare e quali siano quelle del sistema da mantenere per il Dual Boot.

Io per il partizionamento procedo in un altro modo rispetto al partizionamento da terminale.

## Configurazione delle partizioni

Se siamo su Windows, prima cosa procurarsi una live di **GParted**, così da avere uno strumento grafico per vedere e gestire le partizioni su linux, se invece siete su una distribuzione linux potete usare lo strumento di partizionamento che più vi aggrada. Dopo aver preparato la chiavetta riavviare il PC e entrare nella live.

Ora _partizioniamo il disco con la GUI di GParted_, così da fare il tutto in modo più semplice che con il terminale e così da non rischiare di eliminare partizioni sbagliate, a questo punto prendiamo lo strumento per le note che più ci aggrada e ci appuntiamo quali sono esattamente le partizioni dove vogliamo installare il nostro Arch_(Es. /dev/sdx1 /, /dev/sdx2 /home)_. Ora riavviamo con una USB con Arch e procediamo a formattare le partizioni giuste e ovviamente, a montarle.

Alla fine dovremmo avere una struttura del tipo:

    Disco ->|-Partizione del secondo OS|-ESP del secondo OS|-Partizioni di Arch|-ESP di Arch

## Creazione del Dual Boot

A questo punto durante l'installazione quando installiamo grub installiamo anche **_os-prober_** e, finita l'installazione ed entrati in Arch Linux, entrando in un terminale possiamo creare il nuovo file _config_ di grub:

    sudo grub-mkconfig -o /boot/grub/grub.cfgGenerating grub configuration file ...Found linux image: /boot/vmlinuz-linuxFound initrd image: /boot/intel-ucode.img /boot/initramfs-linux.imgFound fallback initrd image(s) in /boot: initramfs-linux-fallback.imgFound Windows Boot Manager on /dev/sda3@/efi/Microsoft/Boot/bootmgfw.efidone

Così grub avrà aggiunto anche il secondo OS tra le boot entry e potremo usare il nostro **_Dual Boot con Arch._**

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).