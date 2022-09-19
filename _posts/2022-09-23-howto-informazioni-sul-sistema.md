---
title: '#howto - Raccogliere informazioni sul proprio pc da terminale' 
date: 2022-09-23 09:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags: 
- archlinux
- ubuntu
- fedora
- systeminfo 
---

Sui nostri gruppi di supporto la difficoltà più frequente è quella di capire configurazioni hardware e software di chi vuole farsi aiutare. Ecco una piccola guida su come raccogliere dati sul proprio sistema da dare a coloro a cui chiediamo aiuto!

## Nome della distribuzione

Normalmente l'unica informazione che non manca mai è proprio il nome della distribuzione, ma per non farci mancare nulla in questa guida copriamo anche il caso in cui non abbiamo quest'informazione basilare.

### OS-release

In alcune distribuzioni è disponibile la libreria `os-release` che rende disponibile quest'informazione, per interrogarla basta un semplice comando cat :

```bash
cat /etc/os-release
```

Le informazioni stampate includeranno il nome, la documentazione, il logo e modello di rilascio. 
Ecco un esempio di output:

```plain
NAME="Arch Linux"
PRETTY_NAME="Arch Linux"
ID=arch
BUILD_ID=rolling
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://archlinux.org/"
DOCUMENTATION_URL="https://wiki.archlinux.org/"
SUPPORT_URL="https://bbs.archlinux.org/"
BUG_REPORT_URL="https://bugs.archlinux.org/"
LOGO=archlinux-logo
```

### LSB Release

lsb-release è un tool più semplice, che mostra molte meno informazioni sulla distribuzione ma permette una maggiore malleabilità dell'output. Generalmente bisogna installarlo nelle varie distribuzioni esplicitamente, anche tramite il package manager.  

#### LSB Release su Ubuntu e derivate

Per installare il pacchetto in Ubuntu e derivate scrivere:

```bash
apt install lsb-release
```

#### LSB Release su Fedora

Per installare il pacchetto in Fedora è necessario un pacchetto chiamato `redhat-lsb`:

```bash
dnf install redhat-lsb
```

#### LSB Release su Archlinux

Per installare il pacchetto in Archlinux scrivere:

```bash
pacman -S lsb-release
```

#### Utilizzo di LSB Release

Scrivere:

```bash
lsb_release -a
```

Per avere tutte le informazioni (notare che mentre il nome del pacchetto ha il carattere `-` che separa le parole `lsb` e `release`, il nome del comando usa l'underscore `_`).

È possibile come già detto in precedenza personalizzare leggermente l'output, utilizzando vari flag che fanno da filtro. Ad esempio per avere solo il nome della distribuzione senza numero di release è possibile usare il flag `-i`: 

```bash
lsb_release -i
```

O ancora per avere solo il nome in codice della release si può scrivere:

```bash
lsb_release -c
```

Per saperne di più, è possibile usare l'help:

```bash
lsb_release --help
```

### File release in /etc

Un ulteriore metodo per identificare la distribuzione è utilizzare il file `*-release` in `/etc`, un file che ha come postfisso sempre la parola "`release`" ma dove cambia il prefisso, che rappresenta la distribuzione.  

Purtroppo questo file non è comune a tutte le distribuzioni, lo si ha in Archlinux:

```bash
if [ -f /etc/arch-release ]; then 
	echo "Sei su Archlinux"; 
fi  
```

E lo si ha su Fedora:

```bash
if [ -f /etc/fedora-release ]; then 
	echo "Sei su Fedora"; 
fi  
```

Ma Ubuntu ad esempio ne è *sprovvisto*.

## Kernel in esecuzione

Per sapere il kernel in esecuzione è possibile utilizzare il comando `uname`:

```bash
uname -rs
```

Sul comando abbiamo già un [ottima guida che ne parla in maniera esaustiva](https://linuxhub.it/articles/howto-utilizzo-del-comando-uname/).

## Ram e swap

Sulla ram è importante avere tre tipi di informazioni:  

- Quanta memoria è rimasta/quanta ne è utilizzata.
- Quanta memoria totale è disponibile.
- Informazioni di natura hardware sui banchi di ram.

Sulla swap altresì è importante sapere:

- Quanta swap è utilizzata (se è utilizzzata).
- Quanta swap è disponibile.
- Su che file è montata la swap.

Si ricordi che la **swap** è una memoria volatile aggiuntiva che, anziché stare su RAM, *risiede sul disco*. È utile per quei pc che non hanno un basso quantitativo hardware di memoria RAM e rischiano di saturarla in fretta, è anche indispensabile per utilizzare la funzione di *ibernazione*, ovvero una funzione dei sistemi operativi atta a spegnere il computer memorizzando però tutta la sessione in modo da riprenderla all'accensione, come se fosse sospeso ma senza consumare energia elettrica.  

### Free, ovvero sapere la memoria libera, usata e totale

Per sapere la memoria libera sia di RAM che di Swap è sufficiente utilizzare il programma `free`.

```bash
free
```

eccone un output d'esempio:

```plain
             total        used        free      shared  buff/cache   available
Mem:         3978556     1349476      975324       82500     1653756     2315064
Swap:        8750568           0     8750568
```

È anche possibile utilizzare il parametro `-h` per avere l'output in funzione di **Gibibyte** (ovvero *Giga Binary Byte*, `1` GiB=`1024`MiB=`1073741824` bytes).

```bash
free -h
```

```plain
               total        used        free      shared  buff/cache   available
Mem:           3,8Gi       1,3Gi       988Mi        80Mi       1,6Gi       2,2Gi
Swap:          8,3Gi          0B       8,3Gi
```

> Grazie a Nik/yumacoy sul gruppo per aver fornito l'output dei comandi

### I banchi di ram disponibili

Per sapere le singole informazioni sui banchi di ram si può utilizzare `dmidecode`, non essendo uno strumento disponibile in tutti i sistemi è necessario assicurarsi di averlo installato

```bash
whereis dmidecode
```

In caso contrario (l'ouput non mostra un path) procediamo per l'installazione.

#### Installazione dmidecode su Ubuntu e derivate

Per installare `dmidecode` su Ubuntu è necessario scrivere:

```bash
apt install dmidecode
```

#### Installazione dmidecode su Fedora

Per installare `dmidecode` su Fedora è necessario scrivere:

```bash
dnf install dmidecode
```

#### Installazione dmidecode su Archlinux

Per installare `dmidecode` su Archlinux è necessario scrivere:

```bash
pacman -S dmidecode
```

#### Utilizzo di dmidecode

Per utilizzare dmidecode ed avere informazioni sui banchi di ram disponibili è necessario scrivere con i diritti di amministratore:

```bash
dmidecode --type 17
```

l'output dovrebbe essere simile a questo:

```plain
Memory Device
	Array Handle: 0x0028
	Error Information Handle: No Error
	Total Width: Unknown
	Data Width: Unknown
	Size: 4 GB
	Form Factor: SODIMM
	Set: None
	Locator: DIMM0
	Bank Locator: BANK 0
	Type: DDR3
	Type Detail: Synchronous
	Speed: 1600 MT/s
	Manufacturer: 0x80AD
	Serial Number: 0x00000000
	Asset Tag: Unknown
	Part Number: 0x484D54333531533642465238432D50422020
```

Per ogni riga "Memory Device" inizia la descrizione di un banco di RAM.

### Dove e quante swap son montate

Per controllare a quali swap il sistema fa riferimento, quante siano e dove siano montate è possibile utilizzare il comando `swapon`:

```bash
swapon
```

L'output dovrebbe essere simile a questo :

```plain
NAME       TYPE      SIZE  USED PRIO
/dev/zram0 partition   8G 14,3M  100
```

> Grazie a Martin per aver fornito l'output

## Disco usato e libero

Per il controllo della memoria di archiviazione esistono vari tool. 

### Controllare i drive attaccati

Per controllare quali drive sono attaccati al computer e in quante partizioni ognuno è diviso è possibile usare `fdisk`:

```bash
fdisk -l
```

### Controllare lo spazio libero dei dischi montati

Per controllare lo spazio libero nei dischi montati è possibile utilizzare il comando `df`: 

```bash
df
```

Con il parametro `-h` i conteggi verranno fatti in multipli di 1024 byte, Mib e Gib: 

```bash
df -h 
```

Ecco un esempio di ouput: 

```plain
File system               Dim. Usati Dispon. Uso% Montato su
dev                       3,9G     0    3,9G   0% /dev
run                       3,9G  1,9M    3,9G   1% /run
/dev/sda3                 131G  111G     14G  90% /
tmpfs                     3,9G  149M    3,7G   4% /dev/shm
/dev/sda1                 197M   28M    170M  14% /boot/efi
/home/username/.Private  131G  111G     14G  90% /home/username
tmpfs                     786M  140K    786M   1% /run/user/1000
```

Molti dei file system mostrati non sono veri e propri dischi ma memorie volatili e comunque non utili, per visualizzare solo quelli di interesse è possibile specificare il filesystem di cui vogliamo avere informazioni, ad esempio per avere informazioni solo su `ext4`:

```bash
df -t ext4
```

Oppure per avere informazioni su ext4, btrfs e ecryptfs: 

```bash
df -t ext4 -t btrfs -t ecryptfs
```

Per sapere i file system dei nostri dischi quali sono possiamo usare il comando 

```bash
blkid
```

## Le usb attaccate

Che periferiche usb sono attaccate ? per saperlo possiamo usare il comando `lsusb`. Non tutti i sistemi hanno preinstallato questo tool, quindi vediamo come si installa nelle varie distribuzioni


### Installare lsusb su Ubuntu e derivate

Per installarlo su Ubuntu scrivere:

```bash
apt install usbutils
```

### Installare lsusb su Fedora

Per installarlo su Fedora scrivere:

```bash
dnf install usbutils
```

### Installare lsusb su Archlinux

Per installarlo su Archlinux scrivere:

```bash
pacman -S usbutils
```

### Utilizzo di lsusb

Per utilizzare il comando scrivere semplicemente:

```bash
lsusb
```


L'output mostrerà una lunga lista di device identificati tramite protocollo usb con le descrizioni. Eccone un esempio: 

```plain
Bus 002 Device 005: ID 05ac:0263 Apple, Inc. Apple Internal Keyboard / Trackpad (MacBook Retina)
Bus 002 Device 008: ID 05ac:8286 Apple, Inc. Bluetooth Host Controller
Bus 002 Device 004: ID 0a5c:4500 Broadcom Corp. BCM2046B1 USB 2.0 Hub (part of BCM2046 Bluetooth)
Bus 002 Device 003: ID 0424:2512 Microchip Technology, Inc. (formerly SMSC) USB 2.0 Hub
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 05ac:8510 Apple, Inc. FaceTime HD Camera (Built-in)
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 006: ID 145f:02af Trust ZIVA Keyboard
Bus 003 Device 005: ID 14cd:1212 Super Top microSD card reader (SY-T18)
Bus 003 Device 010: ID 04d9:a09f Holtek Semiconductor, Inc. E-Signal LUOM G10 Mechanical Gaming Mouse
Bus 003 Device 003: ID 0a67:ffff Medeli Electronics Co., Ltd USB AUDIO
Bus 003 Device 002: ID 1a40:0101 Terminus Technology Inc. Hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

```

Staccando e riattaccando la periferica che vogliamo analizzare è possibile vedere se il sistema la rileva (l'output avrà una riga in meno senza la periferica attaccata) oppure no.  

Usando il comando `watch` con il flag `-d` è possibile notare meglio le differenze:

```bash
watch -d lsusb
```

Oppure ancora è possibile dare il comando in due momenti differenti, salvarlo in due variabili separate ed usare `diff` per vedere la riga aggiunta:

```bash
senzausb=$(lsusb) #senza usb attaccata

conusb=$(lsusb) # con usb attaccata

diff <(echo $senzausb) <(echo $conusb)
```

Ecco un esempio di output (attaccando e staccando il mio mouse):

```
> Bus 003 Device 010: ID 04d9:a09f Holtek Semiconductor, Inc. E-Signal LUOM G10 Mechanical Gaming Mouse
```

## Le periferiche pci

La Peripheral Component Interconnect (PCI) è uno standard che connette le periferiche direttamente alla scheda madre. Generalmente le periferiche di interesse son quelle di rete e le schede video.  

Il tool che identifica tali periferiche è `lspci`. Non tutte le distribuzioni lo hanno preinstallato. 

### LSPCI su Ubuntu e derivate 

Per installare lspci su Ubuntu: 

```bash
apt install pciutils
```


### LSPCI su Fedora

Per installare lspci su Fedora: 

```bash
dnf install pciutils
```


### LSPCI su Archlinux

Per installare lspci su Archlinux: 

```bash
pacman -S pciutils
```

### Utilizzo 

Per utilizzarlo basta scrivere: 

```bash
lspci
```

Potrebbe essere necessario filtrare con `grep` per avere subito i risultati della periferica ricercata. Ad esempio per cercare il nome della scheda video: 

```bash
lspci | grep -iP '(VGA|3d)'
```

### Driver in uso 

È possibile specificare il paramentro `-k` per verificare i moduli del kernel in uso per ogni periferica: 

```bash
lspci -k
```

Anche qui un uso consapevole di grep potrebbe aiutare ad ottenere subito i risultati ricercati. Ad esempio per sapere che driver sta utilizzando la periferica di rete si può scrivere:  

```bash
lspci -k | grep -i network -A 3
```

## CPU e core 

### cpuinfo

```bash
cat /proc/cpuinfo
```

### lscpu


## I software *fetch

I così detti software `*fetch` son programmi caratterizzati sia dalla comune desinenza (**fetch** per l'appunto) sia dalla caratteristica di fornire un *riassunto informativo* di tutte le informazioni di sistema, spesso incentrate su CPU, GPU, RAM e nome della distribuzione.

### screenfetch

### neofetch 

### cpufetch

## Software di monitoraggio completo

### top

### htop 

### bashtop 

### glances 