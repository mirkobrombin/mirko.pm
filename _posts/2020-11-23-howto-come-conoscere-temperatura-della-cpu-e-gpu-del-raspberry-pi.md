---
title: '#howto - Come conoscere temperatura della CPU e GPU del Raspberry Pi'
date: 2020-11-23
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
Il **Raspberry Pi** è un mini computer in grado di effettuare diverse attività, come ospitare un web server, fare da media server (ove possibile) oppure navigare il web come se fosse una macchina vera e propria. A volte, però, ci si potrebbe chiedere a che **temperatura** si trovano componenti come **CPU** e **GPU**.

In questa guida vedremo proprio come conoscere la temperatura del processore e della scheda video di un qualsiasi Raspberry Pi.

## Mostrare temperatura della GPU del Raspberry Pi

Per sapere qual è la temperatura della GPU di un Raspberry Pi possiamo utilizzare il comando `vcgencmd`, già presente sul sistema, seguito dalla funzione che la misura e ce la dice.

Apriamo il terminale ed eseguiamo questo comando:

```bash
vcgencmd measure_temp
```

oppure:

```bash
/opt/vc/bin/vcgencmd measure_temp
```

In ogni caso, l'output sarà simile al seguente:

```bash
temp=39.0'C
```

## Mostrare temperatura della CPU del Raspberry Pi

Per conoscere invece la temperatura della CPU di un Raspberry Pi ci toccherà usare il comando `cat` seguito dal file in cui è contenuta questa informazione, come dimostrato dal seguente comando:

```bash
cat /sys/class/thermal/thermal_zone0/temp
```

l'output iniziale che ci verrà dato sarà simile al seguente:

```bash
38470
```

ma sappiate che per conoscere la temperatura corretta dovete solamente dividere il numero **per 1000**, oppure creare ed eseguire un file con il seguente contenuto che farà automaticamente tutto:

```bash
cpu=$(</sys/class/thermal/thermal_zone0/temp)
echo "$((cpu/1000)) C"
```

