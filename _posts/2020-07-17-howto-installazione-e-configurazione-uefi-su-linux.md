---
title: '#howto - Installazione e configurazione di UEFI su Linux'
date: 2020-07-17
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
  - systemd
---
Da quando è stato introdotto, sono molti quelli che per un motivo o un altro si sono trovati spaesati di fronte alle novità del sistema **U**nified **E**xtensible **F**irmware **I**nterface (noto come UEFI).

In questo articolo tratteremo quali sono gli aspetti da ricordare quando si installa un qualunque sistema operativo su un PC che usa **UEFI**.

## Il nostro PC supporta UEFI?

### Le impostazioni firmware

La prima domanda da porsi è sicuramente se il proprio PC supporta o no il boot UEFI. Per scoprirlo, all'avvio del dispositivo premete (magari più volte) il tasto per entrare nelle impostazioni firmware, in genere `CANC (DEL)`, `ESC`, `F11` o `F12`.

Alternativamente, se avete installato **Windows** potete farlo da `Impostazioni` &rarr; `Aggiornamento e Sicurezza` &rarr; `Ripristino` &rarr; `Riavvia Ora` (sotto `Avvio Automatico`). Nella schermata blu che vi uscirà dovreste trovare `Risoluzione dei problemi` &rarr; `Opzioni avanzate` e quindi `impostazioni firmware UEFI`.

Se invece siete da Linux potete usare da terminare il comando: 

```bash
systemctl reboot --firmware-setup
```

Una volta che avremo davanti l'interfaccia dovremo trovare un modo per verificare la modalità di boot, in genere posizionata sotto il menù **Boot** dove si ha una voce "**UEFI/BIOS Boot Mode**".

Assicuratevi che la voce *non sia impostata* su **Legacy**.

Dopo aver capito se il nostro PC usa o no UEFI, una volta inserita la pennina USB con il vostro sistema operativo potete fare il boot override scegliendo quale sistema deve partire direttamente dal menu di UEFI.
Potete farlo impostando il **boot order** dalle *impostazioni Boot*, oppure fare **l'override** dai menu *Boot*, *Save & Exit* oppure *Quick boot* (dipende dal vostro pc, cercate bene).

### Verificare la modalità di boot corretta dalla "live" della distro

Potete infine controllare che tutto si sia avviato nella modalità corretta direttamente dal sistema Live, accedendo al terminale e scrivendo:

```bash
test -d /sys/firmware/efi && echo "sistema EFI" || echo "Sistema BIOS, oppure avviato in modalità LEGACY"
```

## Tipo di partizionamento del disco

É importante che il tipo di partizionamento del disco sia impostato su **GPT**, e non MBR. 

### Identificare il tipo di partizionamento del disco

Per sapere come sia formattato il nostro disco, da Linux basta digitare il comando:
```bash
fdisk -l
```

E cercare, sotto le informazioni del disco di interesse, la dicitura **Disklabel Type**. Ecco un output d'esempio:

```diff
Disk /dev/sdX: DIMENSIONE GiB, NUMERILUNGHI bytes, NUMERIMENULUNGHI sectors
Disk model: MODELLO-DISCO
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
+Disklabel type: gpt
Disk identifier: NUMERO-LUNGO-MOLTO

Dispositivo     Start       Fine    Settori   Size Tipo
/dev/sdX1        2048  830880954  830878907 DIMENSIONEG TIPO_FS
/dev/sdX2  830881792 1953523711 1122641920 DIMENSIONEG TIPO_FS

```

> NOTA:
>
> Nell'esempio il disco è GPT

Una volta identificata l'etichetta del disco (`/dev/sdX` nell'esempio), possiamo anche chiedere ulteriori informazioni sulla tipologia di partizionamento in questo modo:

```bash
gdisk -l /dev/sdX -A 4 | grep 'Partition table scan'
```

L'output risultante dovrebbe essere simile al seguente:

```json
Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present
```

Li dove la posizione della dicitura *present* indica la tipologia di disco.

### E se il disco non fosse GPT?

I problemi arrivano nel caso in cui un disco non è GPT, e per dei semplici motivi. Convertire il disco potrebbe non essere la migliore delle scelte possibili, anche perchè sarebbe necessario formattarlo, e pertanto *consiglio invece* di copiare i dati con **gparted** ( o qualunque altro metodo desideriate ) su un altro disco, formattare il disco in GPT e ricopiare i dati.

Ma per i più temeriari una soluzione potrebbe essere quella di usare `sgdisk`.

> **ATTENZIONE:**
>
> *La redazione di linux/hub non si assume la resposabilità di eventuali dati persi o dischi corrotti dall'esecuzione dell'istruzione che segue*

Con questo comando è possibile provare a convertire la partizione desiderata da MBR a GPT, ma come già detto è piuttosto rischioso:
```bash
sgdisk -s /dev/sda
```

> NOTA: 
>
> Dovrete reinstallare i bootloader dei sistemi operativi presenti su disco, altrimenti non partiranno.

## Prerequisiti per l'avvio del sistema

Nei sistemi **UEFI** con dischi partizionati **GPT** l'avvio è supportato tramite la presenza di una partizione speciale nel sistema detta **EFI System Partition** (o **ESP** ).

> Commento dell'autore:
>
> In realtà questo rende tutto molto più comodo rispetto al sistema BIOS Legacy. L'override di UEFI legge i sistemi dalla ESP e funziona come un "bootloader" nativo. Non impazzirete più a dover reinstallare GRUB se Windows si aggiorna e il bootloader deciderà a priori quale sistema si avvia, e anche senza la necessità di avere un sistema su ogni disco.

Verificate la presenza della partizione con `fdisk`:

```bash
fdisk -l  | grep EFI
```

Nel caso in cui non fosse presente, è necessario crearla. Per fare ciò, da Linux, si possono seguire più strade. 

### La GUI con gparted

> NOTA: 
> Le opzioni potrebbero essere in inglese

Se non siete molto sicuri nell'utilizzo del terminale potete usare `gparted`, un programma con interfaccia grafica. Una volta aperto, assicuratevi di aver selezionato il disco giusto dal menu in alto a destra (`/dev/sdX`).
Se non li avete, liberatevi 300M di spazio ridimensionando una partizione: `Selezionatela` &rarr;`Tasto destro` &rarr; `Ridimensiona/Sposta` .

Dalla finestra che vi si apre scrivete nel campo "**Spazio libero dopo(MiB)**" il valore **300**, premete su un altro campo a caso e in seguito si abiliterà il pulsante "**Ridimensiona/Sposta**" in basso a destra che dovrete premere.

Nella finestra principale adesso apparirà una nuova partizione di tipo (*colonna File System*) **non allocato**. `Selezionatela` &rarr;`Tasto destro` &rarr;`Nuova` e compilate i campi come segue:

- **Nome Partizione** : "EFI System Partition"
- **File System**  : "fat32"

Il resto dei campi lasciateli con i valori predefiniti e infine premete il tasto **Aggiungi**.

Cliccate l'icona in alto sotto la menubar con la <span style="color:green">spunta verde</span>, e attendete il completamento. In seguito chiudete la finestra di sopra. Individuate la partizione appena creata, `Selezionatela` &rarr;`Tasto destro` &rarr; `Gestione flag` e selezionate le caselle:

-  boot
-  esp

Quindi premete **Chiudi**. In questo modo avete creato la vostra partizione **ESP**! Segnatevi l'etichetta della partizione (**/dev/sdXY**, *dove X è una lettera e Y un numero*) perchè vi servirà in futuro.

### Crearla senza GUI con parted

Innanzitutto apriamo **parted** sulla partizione scelta:

```bash
parted /dev/sdX
```

Per visualizzare la situazione attuale del disco digitiamo `p` quindi **INVIO** (per una maggiore precisione vi consiglio di abilitare MiB come unità di misura tramite `unit Mib`, e poi di visualizzare a schermo la tabella).

Nel caso in cui non li aveste, liberatevi 300M di spazio ridimensionando una partizione. Dopo aver selezionato quale partizione ridimensionare potete digitare:
```bash
resizepart <numero partizione>
```
Quindi al valore in output *togliete 300MiB*, scrivete il valore e digitate **invio**.

> **Segnatevi il valore appena digitato, sarà il vostro punto di inizio per la prossima partizione**

Creiamo una nuova partizione:

```bash
mkpart
```

e inseriamo le seguenti informazioni:

- *nome* = **EFI System Partition**
- *tipo* = **fat32**
- *Inizio*
  - Se avevate ridimensionato la partizione mettete l'ultimo valore che avete inserito
  - Se avevate già lo spazio disponibile, mettete il valore più alto della colonna "Fine"
- *Fine* = Aggiungete **300** a **Inizio**

visualizziamo nuovamente con **p** la situazione corrente e quindi verifichiamo sia stata correttamente creata la partizione. In seguito cambiamo **le flag**:

```bash
toggle <numero partizione> esp
```

E infine premiamo il tasto **q** per uscire.

## Montare e gestire ESP

Installando distribuzioni come Ubuntu o Fedora (più user-friendly e automatizzate) l'ESP e l'avvio dovrebbero essere gestiti in maniera automatica, ma assicuratevi solo di indicare la partizione appena creata. Nei sistemi invece più grezzi (vedi Arch Linux) potrebbe essere necessario indicarla manualmente.

### Installare il bootloader

Per installare manualmente il bootloader dobbiamo prima montare la partizione EFI. Per fare questo possiamo digitare:

```bash
mount | grep "efi"
```
oppure:

```bash
mount | grep "/dev/sdXY"
```

Se non si è sicuri se la partizione sia già montata, assicuratevi di ciò con questo comando:

```bash
mount /dev/sdXY /boot/efi
```

Se la cartella di destinazione non esiste, createla:

```bash
mkdir -p /boot/efi
```

A questo punto potete installare il vostro bootloader. Per GRUB:

```bash
grub-install /dev/sdX
grub-mkconfig /boot/grub/grub.cfg
```

Per installare [systemd-boot](https://linuxhub.it/articles/howto-installazione-e-configurazione-di-systemd-boot) abbiamo invece una guida dedicata e più specifica.

## Montaggio automatico all'avvio

Linux gestisce il mount automatizzato delle partizioni all'avvio tramite il file `/etc/fstab`.

> **ATTENZIONE**:
>
> *La pena per un fstab creato male è l'impossibilità di avvio del sistema, quindi se qualcosa non dovesse andare bene e non riuscite in alcun modo a far partire il comando ripristinate assolutamente il suo vecchio valore*.

Per aggiungere la partizione appena creata alla lista innanzitutto vi serve la UUID della partizione, ottenibile con: 
```bash
blkid
```
Vi sarà restituita una lista di partizioni con le loro informazioni principali. Ogni partizione sarà simile a:

```bash
/dev/sda1: UUID="ALFA-NUMERICO" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="14591492-99de-4f1b-8d2d-88595526b0dc"
```

Cercate quella che porta come **PARTLABEL** il valore **EFI System Partition** e ricopiatevi il valore di **UUID**.

Dopo andrete ad aggiungere al file `/etc/fstab` una riga come segue:

```bash
UUID=VALORE-COPIATO /boot/efi vfat defaults 0 0
```

e per testare che la riga sia stata inserita correttamente, assicuratevi che la **ESP** non sia montata:
```bash
umount /boot/efi
```

Infine utilizzate questo comando per montarla:
```bash
mount -a
```

Se non ci sono errori potrete dormire sogni tranquilli, *altrimenti eliminate la riga o correggetela*. A quel punto, potete installare la distribuzione di vostra scelta come previsto dalla sua documentazione senza più preoccuparvi della parte del bootloader.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.