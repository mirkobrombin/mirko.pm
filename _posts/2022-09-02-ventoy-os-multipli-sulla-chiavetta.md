---
title: '#howto - Ventoy: OS multipli sulla chiavetta'
date: 2022-09-02 09:00
layout: post 
author: Midblyte
author_github: Midblyte
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: false
tags:
- ubuntu
- fedora
- archlinux
- debian
- chromeos
- rhel
- Windows
---

## Il problema

Spesso è sufficiente l'idea per giungere a procrastinare.
Chiunque abbia mai provato ad installare un nuovo sistema operativo lo sa bene.
Sa quanto possa essere noioso, se non addirittura frustrante, formattare una chiavetta (o qualsiasi altro mezzo di storage) nel modo corretto.

Funziona? Inaspettato, ma meglio così.
E se non parte? Cos'è che, di preciso, sarà mai andato storto? Forse un'impostazione non era selezionata sul valore corretto?
Poco da fare: in ogni caso **bisognerà ricominciare tutto da capo**.

Senza parlare di quando era necessario aggiornare un sistema operativo, oppure aggiungerne uno nuovo senza dover ricorrere ad altre chiavette, e casi simili.
Perlomeno, questo è ciò che accadeva in un passato - nemmeno troppo lontano - usando tool tradizionali come Rufus, dd, Gnome Disks, Fedora Media Writer, Etcher, e così via.


## La soluzione: ecco Ventoy

[Ventoy](https://ventoy.net) è un tool open source che permette il <em>boot</em> (l'avvio) **diretto** di file .ISO e simili (immagini disco).

Grazie a Ventoy, **non** è necessario formattare continuamente una chiavetta ogni volta che si vuole utilizzare un sistema operativo diverso.

Ventoy necessita di due partizioni: in una ci sono file di sistema, nell'altra possono essere semplicemente copia-incollati i file .ISO.

In questo modo, è possibile avere su un'unica chiavetta più sistemi operativi senza alcuna difficoltà aggiunta; inoltre, se avanza dello spazio libero, nulla vieta di ridimensionare le partizioni per crearne una terza da utilizzare per altri scopi (es. per il classico storage).
Anche se in casi ordinari potrebbe non essere la scelta migliore, può tornare molto comodo utilizzare una chiavetta per due scopi diversi.

Ma Ventoy non permette solo live USB: un altro suo vantaggio, forse meno noto, è il supporto alla **persistenza**.
Ciò sta a significare che Ventoy è in grado di installare un sistema operativo sullo stesso disco da cui viene avviato.


## Download

La pagina di riferimento per il download è https://ventoy.net/en/download.html.
Sono disponibili tre versioni: Linux, Windows e ISO.

### Linux

Il software viene fornito in formato .TAR.GZ, anche se in realtà non va compilato ma va solamente estratto ed è subito pronto all'uso.

```bash
tar -xvf ventoy-*-linux.tar.gz
```

Dopo l'estrazione, per una questione di ordine, è consigliato di spostare la cartella sotto /opt (potrebbe essere necessario avere i permessi di root).

```bash
mv ventoy-*-linux /opt
```


### Windows

Il software viene fornito in formato .ZIP.
Una volta estratti i contenuti in una cartella, è possibile utilizzare Ventoy avviando gli eseguibili .EXE.


### ISO

A voler essere precisi, non si tratta della "Versione ISO di Ventoy" quanto piuttosto della versione Live dello stesso, identico programma disponibile nativamente per Windows e Linux.

Il motivo di esistere di questa "terza opzione" è [spiegato sullo stesso sito ufficiale](https://www.ventoy.net/en/doc_livecd.html): Windows potrebbe non consentire a Ventoy (Ventoy2Disk.exe) di eseguire operazioni di basso livello. E poiché chi usa Windows spesso non sa come utilizzare un ambiente Linux, allora può usare direttamente una versione live di Ventoy (il che è un po'ironico).

Per avviare Ventoy in live, in ordine viene ufficialmente consigliato di scegliere un'opzione tra le seguenti:
- ricorrere a Ventoy, ossia avviare Ventoy da Ventoy (utilizzando una chiavetta su cui era già stato installato precedentemente)
- ricorrere a [Rufus](https://rufus.ie)
- formattare una pennetta in FAT32 e scompattare il file .ISO al suo interno.
- ricorrere ad una virtual machine (come VMWare)

In sintesi: è sempre bene utilizzare le due versioni precedenti di Ventoy, **questa è un'opzione di ripiego** e **non ha nessun vantaggio** rispetto alle due precedenti.


## Installazione - su storage

Ventoy ha sia un'interfaccia CLI che un'interfaccia GUI (una nativa, più recente, ed un'altra raggiungibile mediante browser).
Per ragioni di brevità, in questa guida sarà approfondita solamente l'interfaccia GUI:

- Sulla barra in alto ci sono due menu a tendina, "Opzioni" e "Lingua". Le opzioni sono particolarmente interessanti e si consiglia di visionarle.
- Appena sotto, c'è un altro menu a tendina che consente di scegliere lo storage **esterno** dove installare Ventoy, ossia la chiavetta, l'HDD esterno o altro.
- Al centro vi sono due riquadri contornati di blu: a sinistra la versione di Ventoy che si sta per installare, a destra la versione di Ventoy che è stata rilevata essere già installata.
- In fondo a tutto vi sono i due pulsanti "Installa" (per la prima installazione) e "Aggiorna" (per aggiornare la versione di Ventoy preservando quanto vi era già presente all'interno)

Una volta installato Ventoy sullo storage, è possibile chiudere l'interfaccia (CLI o GUI che sia).
Da questo momento in poi bisognerà utilizzare **un file manager** per caricare i file immagine.


## Caricamento delle immagini disco (es. file .ISO)

In base alla configurazione, Ventoy installerà almeno due partizioni.
Una di queste risulterà essere **vuota**: è qui che vanno copia-incollate le immagini disco.
Proprio come se fossero file qualsiasi.


## Ultimo passaggio: boot

Terminato il caricamento dei file, va smontata la periferica su cui è presente Ventoy.

È possibile avviare Ventoy selezionandolo tra le opzioni di boot (potrebbe essere necessario configurare il BIOS e per dargli maggiore priorità).

Dal menu di Ventoy verranno elencati i sistemi operativi avviabili: basterà navigare con le frecce `↑` e `↓`  ed infine premere `invio` per selezionare.


## Ventoy: cosa è supportato?

Ventoy è un progetto molto maturo: al momento di scrittura dell'articolo supporta oltre [940+ immagini](https://www.ventoy.net/en/isolist.html) (testate) corrispondenti al [90%](https://www.ventoy.net/en/distrowatch.html) di quanto presente su [distrowatch.com](http://distrowatch.com/dwres.php?resource=popularity).
Ciò include anche Windows (da 7 in su), ChromeOS, BSD, e molto altro ancora. 
