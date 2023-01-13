---
class: post
title: '#howto - Installazione e configurazione di  JACK su Linux'
date: 2020-06-12
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python 
  - bash
---
**JACK Audio Connection Kit** è un daemon server audio professionale che fornisce connessioni in tempo reale a bassa latenza per dati audio e MIDI tra applicazioni che implementano la sua API.

## Installazione
Prima di tutto assicuriamoci di avere l'accesso al gruppo `realtime`: possiamo controllare se si fa parte del gruppo `realtime` usando il comando `groups`:

```bash
groups
```

se il nostro utente non è dentro questo gruppo aggiungiamolo con il comando:
```bash
usermod -a -G realtime username
```
effettuiamo il logout e accediamo nuovamente al nostro account.

Ora è necessario installare il pacchetto `JACK2`, la sua dipendenza `python-dbus`e il suo front-end grafico `qjackctl` con il Package Manager della nostra distro preferita:

Ubuntu/Debian:
```
apt install jack2 python-dbus qjackctl
```

Fedora/CentOS/RHEL
```
dnf install jack2 python-dbus qjackctl
```

per Centos/RHEL
```
yum install jack2 python-dbus qjackctl
```

Arch Linux:
```
pacman -S jack2 python-dbus qjackctl
```

## Configurazione
Per prima cosa creiamo uno script che permetta a JACK2 di avviarsi automaticamente all'avvio del sistema (deve essere eseguito ad ogni boot):
```bash
#!/bin/bash

# Avvia il server JACK se non ancora attivo
jack_control start
# Imposto il Server JACK in modo da essere riconosciuto come driver ALSA
jack_control ds alsa
# Imposto JACK in modo che usi una scheda audio compatibile con ALSA. Il valore di HD2 deve essere cambiato con quello fornito dall'output del comando "cat /proc/asound/cards"
jack_control dps device hw:HD2
# Dichiarare a JACK di utilizzare il sampling a 48000 kHz
jack_control dps rate 48000
# Imposto JACK in modo che la latenza sia minore
jack_control dps nperiods 2
jack_control dps period 64
# Aspetto 5 secondi che il server JACK si svuoti
sleep 5
# Avvio il Bridge ALSA -> JACK Midi
a2jmidid -e &
# Aspetto che il bridge si avvii
sleep 10
# Avvia la GUI di QJACKCTL, questo serve per far partire la connessione tra JACK e D-BUS
qjackctl &
```

## Ottimizzazione
### ALSA
Per non avere problemi con ALSA vi consiglio di modificare (o creare) il file `/etc/asound.conf` con una configurazione specifica, come ad esempio la seguente:
```
pcm.!default {
    type plug
    slave.pcm "jack"
    hint.description "Jack Audio"
}
```

Se il vostro impianto audio è più complesso, create il vostro config prendendo come esempio il file `/etc/alsa/conf.d/50-jack.conf`

### PulseAudio
Se volete usare PulseAudio e JACK dovrete invece fare delle modifiche in più a QJACKCtl. Per permettere ciò, sarà necessario creare quattro script:

`pulse-jack-init.sh`

Codice dello script:
```bash
#!/bin/bash
pacmd suspend true
```

`pulse-jack-post-init.sh`

Codice dello script:
```bash
#!/bin/bash
pactl load-module module-jack-sink channels=2
pactl load-module module-jack-source channels=2
pacmd set-default-sink jack_out
pacmd set-default-source jack_in
```

`pulse-jack-pre-stop.sh`

Codice dello script:
```bash
#!/bin/bash
SINKID=$(LANG=C pactl list | grep -B 1 "Name: module-jack-sink" | grep Module | sed 's/[^0-9]//g')
SOURCEID=$(LANG=C pactl list | grep -B 1 "Name: module-jack-source" | grep Module | sed 's/[^0-9]//g')
pactl unload-module $SINKID
pactl unload-module $SOURCEID
sleep 5
```

`pulse-jack-post-stop.sh`

Codice dello script:
```bash
#!/bin/bash
pacmd suspend false
```

Questi script che servono a caricare all'avvio e a smontare allo spegnimento i moduli per PulseAudio per riconoscere JACK vanno impostati nelle impostazioni di QJACKCtl. Per fare ciò, avviate il programma, navigate nella sezione "Options" e impostate gli script come nell'immagine qui sotto:

![Immagine QJACK](storage/pic-selected-200610-1001-00.png)

Un problema comune con questo tipo di bridge è quello che Firefox, Chrome e altre app smettono di riprodurre casualmente video e audio. Questo problema è dovuto al fatto che PulseAudio non utilizza il Virtual Driver di JACK.

Per sistemare questo problema dobbiamo utilizzare il seguente comando:
```bash
pavucontrol
```
navigare nella sezione _Playback Tab_ e assicurarsi che tutti gli AudioStream utilizzino il driver "Jack Sink".

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.
