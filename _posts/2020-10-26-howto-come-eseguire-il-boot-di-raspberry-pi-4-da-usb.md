---
title: '#howto - Eseguire il boot di Raspberry Pi 4 da USB'
date: 2020-10-26
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
Nella beta del nuovo firmware per il **Raspberry Pi 4** è stata aggiunta la possibilità di avviare una qualsiasi distro da USB o anche da un SSD (Per avere più prestazioni invece di dover usare una SD che è più lenta di quest'ultimo).

In questa guida vedremo come eseguire il boot di Raspberry Pi 4 da USB.

> Ricordo che è possibile fare questa procedura solo su Raspberry Pi 4. Nei predecessori non è possibile poichè si tratta di una nuova funzionalità.

## Prerequisiti

Prima di poter fare il boot da USB dovremmo installare nella EEPROM del Raspberry Pi 4 il **firmware beta**, per fare questo dovremo avere su una SD il Raspberry Pi OS (aka Raspbian).

## Configurazione

Avviamo il nostro Raspberry Pi e colleghiamoci via SSH ad esso. Una volta aver fatto l'accesso, effettuiamo un aggiornamento del sistema:

```bash
apt update
apt full-upgrade
```

Dopo aver aggiornato il firmware, modifichiamo il file: `/etc/default/rpi-eeprom-update` con il nostro text editor preferito. A quel punto, ci ritroveremo con un file simile al seguente:

![WindowsTerminal GfMb7YSDgZ](storage/WindowsTerminal_GfMb7YSDgZ.png)

Modifichiamo il parametro da `critical` a `beta`:

> **NON bisogna spegnere il Raspberry PI in questa fase**. Farlo comportera il brick dell'EEPROM che dopo dovrete ripistrinare dal sito web di Raspberry Pi utilizzando un tool specifico.

Dopo aver fatto questa modifica, salviamo ed eseguiamo il seguente comando per aggiornare il firmware:

```bash
rpi-eeprom-update -d -f /lib/firmware/raspberrypi/bootloader/beta/pieeprom-YYYY-MM-DD.bin
```

Per vedere che versione della beta del bootloader abbiamo, eseguiamo quest'altro comando:

```bash
ls /lib/firmware/raspberrypi/bootloader/beta/
```

A quel punto ci sarà fornito un file .bin con una determinata data, che dovremo inserire nel comando `rpi-eeprom-update`. L'output dovrebbe in seguito essere simile al seguente:

![WindowsTerminal 8ImcPCeAqu](storage/WindowsTerminal_8ImcPCeAqu.png)

Dopo, riavviate il Raspberry Pi per completare l'aggiornamento. Per controllare che l'aggiornamento sia avvenuto con successo possiamo usare il comando:

```bash
vcgencmd bootloader_version
```

La data del bootloader dovrebbe coincidere con quella indicata nel file beta. Dopo aver controllato, su una USB possiamo flashare un OS compatibile con il Raspberry Pi. Copiamo in seguito il firmware beta dalla repo ufficiale del firmware di Raspberry Pi (che potete trovare <a href="https://github.com/raspberrypi/firmware/tree/master/boot">qui</a>) dentro la partizione BOOT della nostra USB.

## Utilizzo

Una volta aver configurato tutto possiamo inserire la USB che vogliamo utilizzare come boot (Possibilmente su una porta 3.0 se la USB lo supporta) e rimuovere la SD dal suo scompartimento. Quando si avvierà il sistema, vi troverete davanti una schermata simile alla seguente se tutto è andato come previsto:

![Pi sdcard failed to open device stuck soft reboot usb](storage/pi-sdcard-failed-to-open-device-stuck-soft-reboot-usb.png)

Dopo, dovrebbe avviarsi correttamente il sistema.

## Conclusione

Ora con la possibilità di poter avviare distro per il Raspberry PI da USB possiamo dotare il nostro dispositivo con memorie ancora più veloci e grandi grazie all'SSD.


