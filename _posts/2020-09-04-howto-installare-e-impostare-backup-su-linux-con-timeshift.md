---
title: '#howto - Installazione e configurazione di Timeshift'
published: 2020-09-04
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**Timeshift** è uno strumento opensource che offre funzionalità di backup simili a Strumento Ripristino configurazione di sistema di Windows e a Time Machine di MacOS. Timeshift, come alcuni di questi strumenti, è dotato di un'interfaccia grafica semplice ed intuitiva, permette di eseguire snapshot del sistema, ripristinabili in un momento successivo, ed effettua automaticamente uno snapshot all'avvio del sistema e permette di decidere la frequenza di ulteriori backup e il numero di essi da conservare.

Le modalità principali di Timeshift sono due:
- In modalità **RSYNC**, le istantanee sono prese usando rsync e hard-link. I file comuni sono condivisi tra le istantanee per risparmiare spazio su disco. Ogni istantanea è un backup di sistema completo che può essere sfogliato con un file manager.
- In modalità **BTRFS**, le istantanee vengono acquisite utilizzando le funzionalità integrate del filesystem BTRFS. Le istantanee BTRFS sono supportate solo su sistemi BTRFS con layout di sottovolume di tipo Ubuntu (con sottovolumi @ e @home).

Si consiglia vivamente di utilizzare gli snapshot BTRFS sui sistemi installati sulla partizione BTRFS. Le istantanee BTRFS sono copie perfette byte per byte del sistema, nulla è escluso. Le istantanee BTRFS possono essere create e ripristinate in pochi secondi e hanno un sovraccarico molto basso in termini di spazio su disco.

In questa guida vedremo come scaricare e configurare Timeshift.

## Installazione

Prima di tutto installiamo il pacchetto `timeshift`, disponibile sulle repo delle principali distribuzioni Linux.

### Ubuntu/Debian

Su Ubuntu e Debian possiamo usare `apt`:

```bash
apt install timeshift
```

### Fedora/CentOS/RedHat

Per Fedora, CentOS e derivate possiamo sfruttare `dnf`:
```
dnf install timeshift
```
o `yum`:
```
yum install timeshift
```

### openSUSE
Su OpenSUSE utilizziamo `zypper`:
```
zypper install timeshift
```

### Arch/Manjaro

Mentre per Arch e Manjaro utilizziamo `pacman`:
```
pacman -S timeshift
```

## Configurazione

Al primo avvio di TimeShift ci troveremo davanti ad una schermata di Quick Setup. Come prima cosa ci chiederà che modalità di backup vogliamo usare, se RSYNC o BTRFS. In questa guida sceglieremo rsync poiché è universale.

<img src="storage/TimeShift/Selezione_tipo.PNG" alt="Selezione_tipo" style="zoom:50%;" />

A quel punto uscirà una schermata che ci chiederà su quale disco vogliamo effettuare il backup, **che deve essere formattato in EXT4 per poter essere selezionato**. Oltre al disco, ovviamente, dovremo scegliere quale partizione utilizzare (es. /sda1/).

<img src="storage/TimeShift/Seleziona Disko.PNG" alt="Seleziona Disko" style="zoom:50%;" />

Dopo aver selezionato il disco e la partizione desiderati, ci verrà chiesto ogni quanto dovrà essere fatto uno Snapshot. La frequenza può essere mensile, settimanale, giornaliera, ogni ora o persino al boot. Oltre a ciò possiamo anche indicare quanti snapshot tenere salvati.

<img src="storage/TimeShift/SnapshotTempo.PNG" alt="SnapshotTempo" style="zoom:50%;" />

La prossima schermata ci farà scegliere se escludere tutti i file, includere solo i file nascosti oppure includere tutti i file della nostra cartella *home* o persino di *root* (/) nello snapshot. Qui dovrete scegliere voi.

<img src="storage/TimeShift/UserDirectory.PNG" alt="UserDirectory" style="zoom:50%;" />

Dopo aver finito il setup iniziale ci ritroveremo nella schermata principale di TimeShift. Da qua potremo gestire tutti gli Snapshot che si andranno a creare, e se si volesse provare a creare uno snapshot quando si vuole, basterà cliccare il tasto *Create*. Da questa schermata potremo anche eliminare, esplorare o ripristinare uno snapshot.

## Conclusione

Dopo aver seguito questi passaggi avremo un perfetto sistema di backup su un disco esterno, cosi se per caso qualcosa dovesse andare storto sul nostro PC potremmo sempre avere i file salvati.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.