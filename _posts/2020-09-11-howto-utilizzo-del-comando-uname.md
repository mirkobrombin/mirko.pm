---
title: '#howto - Utilizzo del comando uname'
date: 2020-09-11
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
Che tu sia un sistemista, uno sviluppatore o un normale utente Linux, potresti trovarti in una situazione in cui hai bisogno di conoscere delle informazioni sul sistema che stai utilizzando, come la versione del kernel ad esempio. Per fare ciò, esiste il comando apposito `uname`.

In questa guida vedremo come utilizzare questo comando e perché può tornare utile certe volte.

## Utilizzo del comando

uname è preinstallato su ogni sistema, e si può utilizzare con varie opzioni e parametri, ma partiamo dalle basi. Su Linux, provando a scrivere semplicemente nel terminale `uname` senza qualcos'altro:

```bash
uname
```

dovremmo ottenere un risultato simile a:

```bash
Linux
```

Questo potrebbe cambiare anche se state utilizzando una normale distribuzione Linux, ma è difficile che ciò accada, e di seguito potete capire il perché.

### Kernel

#### Ottenere nome del kernel

Per ottenere il **nome del kernel** dovremo utilizzare `uname` seguito dall'opzione *-s*. Facendo come di seguito:

```bash
uname -s
```

dovremmo avere un output simile a:

```bash
Linux
```

che non è nient'altro che il nome del kernel che stiamo utilizzando, ovvero **Linux**. Quindi puoi vedere che è il nome del kernel che il comando `uname` produce anche per impostazione predefinita (ovvero quando non vengono passate opzioni), come riportato qui sopra.

#### Ottenere la release del kernel

Per sapere quale **release del kernel** è attualmente attiva sul sistema, dovremo utilizzare l'opzione *-r*. Come definito qui sotto:

```bash
uname -r
```

l'output dovrebbe essere simile a:

```bash
3.10.0-1127.19.1.el7.x86_64
```

Qui viene mostrata la release dell'ultimo kernel disponibile su CentOS 7, ad esempio, che gira su un normale web server, e per questo motivo l'output varia in base alla versione che voi avete installata.

#### Ottenere la versione del kernel

`uname` assieme all'opzione *-v* potrebbe far pensare che dica quale sia la **versione del kernel**, ma in realtà non è proprio così visto che la otteniamo assieme alla release. Con questo comando:

```bash
uname -v
```

si otterrà un output simile a:

```bash
#1 SMP Tue Aug 25 17:23:54 UTC 2020
```

che dovrebbe invece rappresentare quando è stato compilato il kernel in uso, che tuttavia nel manuale ufficiale del software viene definita versione.

### Ottenere l'hostname nella rete

Con `uname` possiamo anche conoscere che **hostname** ha attualmente in uso il nostro sistema quando viene visualizzato nella rete. Utilizzando `uname` e l'opzione *-n*:

```bash
uname -n
```

otterremo un output simile a:

```bash
MSI-Fedora
```

o qualunque sia il vostro hostname attivo.

### Hardware

#### Ottenere il nome dell'hardware del sistema

La traduzione in italiano (così come la definizione originale) di questo comando potrebbe non essere troppo chiara, ma in poche parole dirà di **che tipo è la vostra macchina**, se a 32 bit o 64, che non è da confondere con il tipo di processore o piattaforma dell'hardware, che vedremo più avanti.

Con `uname` e l'opzione *-m*:

```bash
uname -m
```

dovremo ottenere un output simile a:

```bash
x86_64
```

che, però, può variare, ovviamente. Su un Raspberry PI, ad esempio, l'output sarà simile a:

```bash
armv7l
```

#### Ottenere il tipo di processore

Con `uname` è possibile anche venire a conoscenza del **tipo di processore** montato sulla nostra macchina che può dare risultati differenti. Su un sistema a 64bit, ad esempio, con `uname` e l'opzione *-p*:

```bash
uname -p
```

avremo un output come:

```bash
x86_64
```

che su altri sistemi, ad esempio un Raspberry Pi, può essere:

```bash
unknown
```

o, se per esempio avete una CPU AMD Athlon:

```bash
athlon
```

#### Ottenere la piattaforma hardware del sistema

È possibile accedere alle informazioni relative alla **piattaforma hardware** utilizzando l'opzione *-i*:

```bash
uname -i
```

che darà un output simile a:

```bash
x86_64
```

o, se state usando un sistema a 32bit:

```bash
i686
```

Come avete potuto constatare, dunque, nonostante a volte i risultati dei comandi di questa sezione possano sembrare uguali, in realtà sono diversi.

### Ottenere il sistema operativo

Con `uname` seguito dall'opzione *-o* possiamo conoscere che **sistema operativo** stiamo usando:

```bash
uname -o
```

che su Linux, senza troppa ombra di dubbio, sarà:

```bash
GNU/Linux
```

### Ottenere tutte le informazioni che uname offre

Se lo desideri, puoi anche ottenere **tutte le informazioni**, a cui abbiamo avuto accesso finora tramite singole opzioni, in una volta sola. Per questo, usa l'opzione -a:

```bash
uname -a
```

dove, ad esempio sul web server di cui abbiamo parlato prima, darà un output simile al seguente:

```bash
Linux web-server 3.10.0-1127.19.1.el7.x86_64 #1 SMP Tue Aug 25 17:23:54 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

Se riuscite a comprendere a che cosa appartiene ogni singola parte, possiamo affermare con certezza che avete appreso appieno come funziona uname.



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).