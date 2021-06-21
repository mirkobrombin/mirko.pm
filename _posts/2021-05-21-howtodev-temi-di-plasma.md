---
title: '#howtodev - I temi di Plasma' 
published: 2021-05-21 
layout: post 
author: Niccolò Venerandi
author_github: veggero 
tags: 
- kde 
---

Il metodo più semplice per fare in modo che Plasma abbia un aspetto stupendo e adatto ai tuoi gusti è - sicuramente - lasciare il tema di default, Breeze, e ammirarlo in tutta la sua bellezza.

Nonostante questo, ci sono utenti che apprezzano maggiormente temi terzi [tra le centinaia](https://store.kde.org/browse/cat/104/ord/rating/) di cui si ha a disposizione sullo store. In KDE siamo inclusivi e accettiamo anche questi utenti.

Ma nel caso tu fossi nella categoria peggiore - gli utenti che vogliono modificare il proprio tema, o crearne uno proprio - ecco una breve guida che dovrebbe aiutarti a realizzare un tema che incontri perfettamente i tuoi gusti estetici.

## Cos'è un tema plasma
Un tema plasma personalizza l'aspetto di plasma esclusivamente (il pannello, gli applet, krunner). Le applicazioni seguono un tema diverso e non sono coperte da questa guida. 

I temi plasma sono fatti di SVG. Se non sapeste cosa sono gli svg, vi rimando a [questa breve guida](https://www.w3.org/TR/SVG2/); in particolare, è supportato un subset di SVG chiamato [SVG tiny](https://www.w3.org/TR/SVGTiny12/intro.html).

I temi plasma hanno anche un file metadata con varie informazioni riguardo allo stesso.

Infine, l'habitat naturale di questi temi è `/usr/share/plasma/desktoptheme/` per i temi globali e `~/.local/share/plasma/desktoptheme/` per i locali. Andate a darci un'occhio, già solo guardando i temi esistenti si impara molto.

Andiamo ora a vedere brevemente questi aspetti.

## I Metadati 
Il file metadata.desktop risiete nella parent directory del tema e contiene innanzitutto queste informazioni:

```
[DesktopEntry]
Name=Sonea
Comment=Example Theme
```

in breve, andiamo a descrivere il nome e il sottotitolo che il tema avrà nelle impostazioni di sistema. Si possono anche localizzare nome e commento:

```
Name[ar]=نسيم
Name[az]=Breeze
Name[ca]=Brisa
...
Comment[az]=KDE VDG tərəfindən Breeze
Comment[ca]=Brisa, creat pel VDG del KDE
Comment[ca@valencia]=Brisa pel VDG del KDE
...
```
 
 Dopodiché, si va a definire un po' di informazioni meno importanti ma comunque comode:
 
```
X-KDE-PluginInfo-Author=KDE Visual Design Group
X-KDE-PluginInfo-Email=kde-artists@kde.org
X-KDE-PluginInfo-Name=default
X-KDE-PluginInfo-Version=5.83.0
X-KDE-PluginInfo-Website=https://plasma.kde.org
X-KDE-PluginInfo-Category=
X-KDE-PluginInfo-License=LGPL
```
 
Dovrebbe essere qui tutto abbastanza intuitivo: autore, email, versione e così via. Potrebbe invece confondere questa riga:

```
X-Plasma-API=5.0
```

Molto semplicemente, stiamo dicendo che questo tema supporta l'api di Plasma, ovvero: potremo (e dovremo!) usare i colori del colorscheme globale negli SVG. Vedremo dopo come questo avviene nella pratica.

```
[Wallpaper]
defaultWallpaperTheme=Next
defaultFileSuffix=.png
defaultWidth=1920
defaultHeight=1080
```

In caso volessimo utilizzare uno sfondo in particolare, lo definiamo qui. "Next" è il nome del wallpaper di default in Plasma.

```
[ContrastEffect]
enabled=true
contrast=0.2
intensity=1.4
saturation=10
```

Questo è particolarmente importante per i temi che utilizzano la trasparenza. Andiamo a definire contrasto, intensità e saturazione da applicare al di sotto del pannello e degli applet. Andare ad aumentare la saturazione può essere utile per "prendere" il colore dominante sotto il pannello e renderlo più evidente al blur. L'intensitàa può invece aiutare ad avere finestre chiare e leggibili anche su sfondi scuri. Sono valori un po' difficili da azzeccare, che è perché ho creato [un piccolo tool](https://niccolo.venerandi.com/backstage/files/ownopacity/main.html) che dovrebbe aiutarvi a gestirli.

```
[AdaptiveTransparency]
enabled=true
```

Questa riga attiva le funzionalità di trasparenza adattiva. Semplicemente, l'utente potra scegliere di avere il proprio pannello opaco quando una finestra è massimizzata e trasparente altrimenti.

Va anche supportato a livello di SVG, come vedremo dopo.

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).

## File Directory
Le cartelle che un tema può usare sono: `widgets/`, `weather/`, `icons/`, `dialogs/`, `solid/`, `translucent/`, `opaque/`.

Widgets, Weather, Icons, Dialogs sono le cartelle che contengono gli effettivi SVG.

Invece solid contiene un'altra versione del tema opaca da usare quando una finestra è massimizzata se è attiva la trasparenza adattiva.

Translucent contiene una versione del tema ma da utilizzare quando il contrast effect è abilitato (può essere spento dall'utente).

Opaque contiene una versione opaca e semplificata da usare quando il compositing è disattivo.

## I file SVG
Attivate nel vostro editor SVG il pannello per vedere gli id degli elementi.

Intanto, nei vari SVG potrebbero esserci degli hint. Useranno con l'id `hint-qualcosa`. 

Poi, ci sarà il contenuto effettivo, spesso diviso in nove elementi chiamati `center`, `top`, `topleft`, `bottomright`, `right` e così via.

A volte questi hanno dei prefissi particolari. Ad esempio, l'aspetto di un elemento quando il mouse è sopra di esso sarà `hover-center`, `hover-top` e così via.

Ci sono infine i margini: `margin-top`, `margin-bottom`... nel caso senza prefissi, e `hover-margin-top`, `hover-margin-right`... con un prefisso. Il comportamento dei margini varia di SVG a SVG.

Principalmente tutti gli SVG sono composti da questi elementi. Utilizzate sempre Breeze come riferimento nel fare il proprio tema; possibilmente modificatene uno esistente, che semplifica molto il processo.

Vi ho anche parlato di supportare il coloscheme. Per far ciò basti utilizzare `class="ColorScheme-Background" fill="currentColor"` nell'elemento SVG desiderato; ovviamente la classe può essere diversa da "background" (ci sono vari colori disponibili, basti editare un file SVG di breeze con Kate per scoprirli) come anche `currentColor` può essere usato sia in fill che nel colore dell'outline.

## Iniziamo!
Ok, no, non vi dirò tutti i dettagli di tutti gli SVG. Ci vorrebbero ore.

Fortunatamente, ho già speso varie ore a descrivere molti SVG. Potete vedere [qui una playlist](https://www.youtube.com/watch?v=XrNWYt_vciA&list=PLX3_anRd8Mp7ibLDlSEJHNzSBaTslFp-x) di video che descrivono come editare i componenti più importanti di un tema: pannello, applet, highlights, bottoni e così via.

Trovo che sia molto più utile vedere come i file SVG vengono effettivamente creati piuttosto che cercare di spiegarli con del semplice testo: non avrebbe lo stesso effetto.

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
