---
title: '#howto - Installazione di una telecamera su Raspberry Pi'
published: 2020-05-27
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - python  - bash
---
In questa guida vedremo come installare a dovere una **telecamera** sul nostro **Raspberry Pi**.

## Installazione della Telecamera

Per prima cosa colleghiamo il cavo della nostra telecamera sull'apposita porta che troviamo sul Raspberry Pi, come mostrato nell'immagine sottostante:

![Dove collegare il cavo per la telecamera](storage/IMG_20200501_142244.jpg)

## Configurazione

Dopo aver installato il dispositivo è necessario configurarlo. Avviamo il Raspberry Pi (con Raspbian Desktop), andiamo su `Menu > Settings > Raspberry Pi Configuration > Interfaces`, abilitiamo il supporto alla telecamera e riavviamo il Raspberry per applicare le modifiche.

![Setting su Raspbian OS](storage/enable-raspberry-pi-camera.jpg)

Nel caso non avessimo installato la versione desktop di Raspbian è necessario seguire le seguenti istruzioni via SSH (o, ancora meglio, con una tastiera collegata direttamente al Raspberry). Eseguiamo il comando `raspi-config` nel terminale e andiamo nella sezione `Interfacing Options -> Camera`. Abilitiamo il supporto alla telecamera, usciamo da `raspi-config` e riavviamo il Raspberry.

## Utilizzo

Per poter adoperare la telecamera sarà necessario creare uno o più script in Python. Nel caso la si volesse utilizzare senza dover creare degli script, invece, si possono usare dei semplicissimi comandi via terminale. Di seguito, ecco alcuni degli esempi per effettuare foto e video.

### Anteprima video

In una cartella a nostro piacere, apriamo un editor di testo come `nano`, creiamo un file con estensione `.py` e inseriamo il seguente codice:

> Potrebbe essere necessario installare la libreria picamera via apt come mostrato di seguito:
```bash
apt-get install python-picamera python3-picamera
```

```python
from picamera import PiCamera
from time import sleep

# definiamo la telcamera per avviare la libreria PiCamera
camera = PiCamera()
# Avvia la preview della foto
camera.start_preview()
# Mantiene aperta la preview per 10 secondi
sleep(10)
# Chiude la preview
camera.stop_preview()
```

È possibile anche utilizzare il comando `raspistill` da terminale, sempre nel path corrente:

```bash
$ raspistill -o testshot.jpg
```

### Foto

Per scattare una foto con uno script è necessario creare un file ed inserire il seguente codice:

```python
from picamera import PiCamera
from time import sleep

# definiamo la telcamera per avviare la libreria PiCamera
camera = PiCamera()
# Avvia la preview della foto
camera.start_preview()
sleep(5)
# La telecamera ha un delay di 2 secondi per consentire al sensore di impostare la luminosità
camera.capture('Directory dove salvare la foto in jpg')
# Chiude la preview
camera.stop_preview()
```
Mentre via terminale utilizziamo il medesimo comando dell'anteprima:

```bash
$ raspistill -o nomefile.jpg
```

### Video

Per realizzare un video, invece, possiamo utilizzare il seguente script:

```python
from picamera import PiCamera
from time import sleep

# definiamo la telcamera per avviare la libreria PiCamera
camera = PiCamera()
# Avvia la preview della video
camera.start_preview()
# Avvia la registrazione
camera.start_recording()
# Modificate il valore di sleep a seconda di quanto volete far durare la registrazione in sec
sleep(5)
# La telecamera ha un delay di 2 secondi per consentire al sensore di impostare la luminosità
# Chiude la registrazione
camera.stop_recording()
# Chiude la preview
camera.stop_preview()
```

oppure il comando `raspivid` via terminale con gli argomenti _-o_, per definire il nome del file del video e il codec corretto, e _-t_, che serve invece a specificare per quanti millisecondi far durare il filmato:

```bash
raspivid -o testvideo.h264 -t 5000
```

Per riprodurlo possiamo usare OMXPlayer con il comando:

```bash
omxplayer testvideo.h264
```

(Altri esempi sono disponibili sul sito ufficiale Raspberry al seguente [link](https://www.raspberrypi.org/camera))

## Conclusione

Con questi pochi comandi è possibile realizzare diversi progetti, dai più semplici a quelli più complicati. Ad esempio si potrebbe creare un sistema di videosorveglianza.

Per maggiori informazioni, e magari per farci sapere che progetto realizzerai, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).

