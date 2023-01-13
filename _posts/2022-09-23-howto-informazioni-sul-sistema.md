---
class: post
title: '#howto - Raccogliere informazioni sul proprio pc da terminale' 
date: 2022-09-23 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: ALberto Bella 
coauthor_github: al6263
published: true
tags: 
- archlinux
- ubuntu
- fedora
- systeminfo 
---

Sui nostri gruppi di supporto la difficoltà più frequente è quella di capire quali siano le configurazioni di tipo hardware e software di chi richiede supporto. Ecco una piccola guida su come raccogliere dei dati relativi al proprio sistema che sarà utile fornire a coloro a cui chiediamo aiuto!

## Nome della distribuzione

Normalmente l'unica informazione che non manca mai è proprio il nome della distribuzione, ma per non farci mancare nulla in questa guida consideriamo anche il caso in cui non abbiamo quest'informazione basilare.

### OS-release

In alcune distribuzioni si può usufruire della libreria `os-release` che rende disponibile quest'informazione, per interrogarla basta un semplice comando cat :

```bash
cat /etc/os-release
```

Le informazioni stampate includeranno il nome, la documentazione, il logo ed il  modello di rilascio. 
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

PEr quanto riguarda `lsb-release`, invece, si tratta di un tool più semplice, che seppur mostrano molte meno informazioni sulla distribuzione, permette, tuttavia, una maggiore malleabilità dell'output. Generalmente bisogna installarlo, nella distribuzione di interesse, esplicitamente, anche tramite il package manager.  

#### LSB Release su Ubuntu e derivate

Per installare il pacchetto in Ubuntu e derivate si può scrivere:

```bash
apt install lsb-release
```

#### LSB Release su Fedora

Per installare il pacchetto in Fedora è necessario un pacchetto chiamato `redhat-lsb`:

```bash
dnf install redhat-lsb
```

#### LSB Release su Archlinux

Per installare il pacchetto in Archlinux, invece, bisogna scrivere:

```bash
pacman -S lsb-release
```

#### Utilizzo di LSB Release

Inoltre, si può scrivere:

```bash
lsb_release -a
```

Per ottenere tutte le informazioni possibili (notare che, mentre il nome del pacchetto ha il carattere `-` che separa le parole `lsb` e `release`, il nome del comando usa l'underscore `_`).

È possibile, come già detto in precedenza, personalizzare leggermente l'output, utilizzando vari flag che fanno da filtro. Ad esempio, per avere solo il nome della distribuzione, senza numero di release, è sufficiente usare il flag `-i`: 

```bash
lsb_release -i
```

O ancora, per avere solo il nome in codice della release, basterà scrivere:

```bash
lsb_release -c
```

Per saperne di più, è possibile usare l'help:

```bash
lsb_release --help
```

### File release in /etc

Un ulteriore metodo per identificare la distribuzione consiste nell' utilizzare il file `*-release` in `/etc`. Questo file ha, come postfisso, sempre la parola "`release`", ma cambia il prefisso, che sarà indicativo della rispettiva distribuzione.  

Purtroppo questo file non è comune a tutte le distribuzioni. Infatti, lo si ha in Archlinux:

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

Ma Ubuntu, ad esempio, ne è *sprovvisto*.

## Kernel in esecuzione

Per sapere quale sia il kernel in esecuzione è possibile utilizzare il comando `uname`:

```bash
uname -rs
```

Sul comando abbiamo già un' [ottima guida che tratta l'argomento in maniera esaustiva](https://linuxhub.it/articles/howto-utilizzo-del-comando-uname/).

## Ram e swap

Per quanto riguarda la memoria RAM è importante acquisire tre tipi di informazioni:  

- Quanta memoria è rimasta libera e quanta ne è stata utilizzata;
- Quanta memoria è complessivamente disponibile;
- Informazioni di natura hardware sui banchi di ram;

In merito alla swap, altresì, è importante conoscere:

- Quanta swap è utilizzata (se è utilizzata);
- Quanta swap è disponibile;
- Su che file è montata la swap;

Si ricordi che la **swap** è una memoria volatile aggiuntiva che, anziché stare su RAM, *risiede sul disco*. È utile per quei pc che hanno un basso quantitativo hardware di memoria RAM e rischiano, quindi, di saturarla in fretta. È anche indispensabile per utilizzare la funzione di *ibernazione*, ovvero una funzione dei sistemi operativi atta a spegnere il computer, memorizzando, però, tutta la sessione corrente, in modo da riprenderla all'accensione, come se il sistema fosse sospeso, senza consumare, però, energia elettrica.  

### Free, ovvero determinazione della quantità di memoria libera, utilizzata e totale

Per ricavare tutte le informazioni relative alla quantità di memoria libera, sia per quanto riguarda la RAM, sia che si tratti di Swap, è sufficiente utilizzare il programma `free`.

```bash
free
```

Segue un output d'esempio:

```plain
             total        used        free      shared  buff/cache   available
Mem:         3978556     1349476      975324       82500     1653756     2315064
Swap:        8750568           0     8750568
```

È anche possibile utilizzare il parametro `-h` per visualizzare l'output in termini di **Gibibyte** (ovvero *Giga Binary Byte*, `1` GiB=`1024`MiB=`1073741824` bytes).

```bash
free -h
```

```plain
               total        used        free      shared  buff/cache   available
Mem:           3,8Gi       1,3Gi       988Mi        80Mi       1,6Gi       2,2Gi
Swap:          8,3Gi          0B       8,3Gi
```

> Grazie a Nik/yumacoy sul gruppo per aver fornito l'output dei comandi

### Numero dei banchi di ram disponibili

Per acquisire delle informazioni specifiche riguardanti i singoli banchi di ram si può utilizzare `dmidecode`. Tuttavia, non essendo uno strumento disponibile in tutti i sistemi, è necessario assicurarsi di averlo correttamente installato.

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

Per utilizzare dmidecode, ottenendo così tutte le informazioni riguardanti i banchi di ram disponibili, bisognerà scrivere i comandi con i diritti di amministratore:

```bash
dmidecode --type 17
```

L'output dovrebbe essere simile a quello sottostante:

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

Ogni riga che inzia con "Memory Device" introduce la descrizione di un banco di RAM.

### Verifica di dove e quante swap siano montate

Per controllare quali siano le swap a il sistema fa riferimento, quante siano e dove siano effettivamente montate è possibile utilizzare il comando `swapon`:

```bash
swapon
```

L'output dovrebbe essere simile a questo :

```plain
NAME       TYPE      SIZE  USED PRIO
/dev/zram0 partition   8G 14,3M  100
```

> Grazie a Martin per aver fornito l'output

## Informazioni relative al disco utilizzato e libero

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

Molti dei file system mostrati non sono veri e propri dischi, ma memorie volatili e comunque non utili, quindi, per visualizzare soltanto quelli di interesse si può specificare il filesystem di cui vogliamo avere informazioni. Ad esempio, per avere informazioni solo su `ext4` basterà scrivere:

```bash
df -t ext4
```

Di conseguenza, per avere informazioni su ext4, btrfs e ecryptfs, si può digitare: 

```bash
df -t ext4 -t btrfs -t ecryptfs
```

Per ricavare quali siano i file system dei nostri dischi si può usare il comando: 

```bash
blkid
```

## Identificazione delle periferiche usb

Che periferiche USB sono attaccate? Per saperlo possiamo usare il comando `lsusb`. Non tutti i sistemi hanno preinstallato questo tool, quindi vediamo come installarlo sulle varie distribuzioni.


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


L'output mostrerà una lunga lista di device, identificati tramite protocollo usb, con le rispettive descrizioni. Eccone un esempio: 

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

Oppure, ancora, è possibile dare il comando in due momenti differenti, salvarlo in due variabili separate ed usare `diff` per vedere la riga aggiuntiva:

```bash
senzausb=$(lsusb) #senza usb

conusb=$(lsusb) # con usb

diff <(echo $senzausb) <(echo $conusb)
```

Ecco un esempio di output (attaccando e staccando il mio mouse):

```
> Bus 003 Device 010: ID 04d9:a09f Holtek Semiconductor, Inc. E-Signal LUOM G10 Mechanical Gaming Mouse
```

## Le periferiche pci

La Peripheral Component Interconnect (PCI) è uno standard che connette le periferiche direttamente alla scheda madre. Generalmente, le periferiche di interesse sono quelle di rete e le schede video.  

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

Potrebbe essere necessario filtrare con `grep` per avere subito i risultati della periferica ricercata. Ad esempio, per cercare il nome della scheda video: 

```bash
lspci | grep -iP '(VGA|3d)'
```

### Driver in uso 

È possibile specificare il paramentro `-k` per verificare i moduli del kernel in uso per ogni periferica: 

```bash
lspci -k
```

Anche in questa circostanza, un utilizzo consapevole di grep potrebbe aiutare ad ottenere subito i risultati ricercati. Ad esempio, per individuare quale sia il driver che sta utilizzando la periferica di rete si può scrivere:  

```bash
lspci -k | grep -i network -A 3
```

## Informazioni su CPU e core 

Quanti core ha la vostra cpu? A quale frequenza? Vediamo quali strumenti esistono per fornire una risposta a questi interrogativi. 

### Utilizzo di nproc

Per ottenere il numero di processori e core, il metodo più semplice da utilizzare consiste nel digitare il comando preinstallato `nproc`: 

```bash
nproc
```


### Utilizzo di cpuinfo

Delle informazioni dettagliate sulle caratteristiche della cpu nonché sui singoli core si trovano nel file `/proc/cpuinfo`

```bash
cat /proc/cpuinfo
```

Tra queste, si possono trovare svariati dati, tra cui il set di istruzioni supportate, le mitigation attive, nome, frequenza e tanto altro.  

Ecco un estratto di layout:

```plain
processor       : 0
vendor_id       : AuthenticAMD
cpu family      : 25
model           : 80
model name      : AMD Ryzen 9 5900HX with Radeon Graphics
stepping        : 0
microcode       : 0xa50000c
cpu MHz         : 1567.354
cache size      : 512 KB
physical id     : 0
siblings        : 16
core id         : 0
cpu cores       : 8
apicid          : 0
initial apicid  : 0
fpu             : yes
fpu_exception   : yes
cpuid level     : 16
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm constant_tsc rep_good nopl nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpb cat_l3 cdp_l3 hw_pstate ssbd mba ibrs ibpb stibp vmmcall fsgsbase bmi1 avx2 smep bmi2 erms invpcid cqm rdt_a rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_occup_llc cqm_mbm_total cqm_mbm_local clzero irperf xsaveerptr rdpru wbnoinvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif v_spec_ctrl umip pku ospke vaes vpclmulqdq rdpid overflow_recov succor smca fsrm
bugs            : sysret_ss_attrs spectre_v1 spectre_v2 spec_store_bypass
bogomips        : 6590.85
TLB size        : 2560 4K pages
clflush size    : 64
cache_alignment : 64
address sizes   : 48 bits physical, 48 bits virtual
power management: ts ttp tm hwpstate cpb eff_freq_ro [13] [14]
```


### lscpu

L'esito del comando `lscpu` riassume le informazioni più importanti della cpu, quindi, pur essendo meno completo della lettura del file `cpuinfo`, nella maggior parte dei casi risulta sufficiente.  

Per utilizzarlo basterà digitare semplicemente: 

```bash
lscpu
```

Si può avere un output riassuntivo dei vari core tramite l'opzione `--all`, da usare così: 

```bash
lscpu --all --extended
```

## I software *fetch

I cosiddetti software `*fetch` sono dei programmi caratterizzati sia dalla comune desinenza (**fetch** per l'appunto), sia dallo scopo di fornire un *riassunto informativo* di tutti i dati del sistema, spesso incentrato su CPU, GPU, RAM e nome della distribuzione.  

### Screenfetch

Il software `screenfetch` è probabilmente il più semplice tra questi strumenti, per acquisire delle informazioni su OS, numero di pacchetti, uptime, DE, disco utilizzato, CPU, GPU e ram. Normalmente va installato prima di esere utilizzato. 


#### Installazione di screenfetch su Ubuntu e derivate 
Per installare il software su Ubuntu digitare: 

```bash 
apt install screenfetch
```

#### Installazione di screenfetch su Fedora
Per installare il software su Fedora digitare: 

```bash 
dnf install screenfetch
```

#### Installazione di screenfetch su Archlinux
Per installare il software su Archlinux digitare: 

```bash 
pacman -S screenfetch
```


#### Utilizzo di screenfetch

L'utilizzo base si ottiene scrivendo solo: 

```bash
screenfetch
```

Esistono alcune opzioni elencabili tramite l'opzione `--help`: 

```bash
screenfetch --help
```

Ad esempio, è possibile aggiungere delle linee extra con il flag `-c`, passando una stringa costituita da `CHIAVE=VALORE;ALTRACHIAVE=ALTROVALORE...etc..`. Ad esempio, aggiungiamo il wan ip: 

```bash
screenfetch -C "Global_IP=$(curl ifconfig.me 2> /dev/null)" 
```

### Neofetch 

Lo strumento `neofetch` è il software di questa tipologia più completo, nonché il più personalizzabile. 

#### Installazione di neofetch su Ubuntu e derivate 
Per installare il software su Ubuntu digitare: 

```bash 
apt install neofetch
```

#### Installazione di neofetch su Fedora
Per installare il software su Fedora digitare: 

```bash 
dnf install neofetch
```

#### Installazione di neofetch su Archlinux
Per installare il software su Archlinux digitare: 

```bash 
pacman -S neofetch
```


#### Utilizzo di neofetch

L'utilizzo base si ottiene scrivendo solo: 

```bash
neofetch
```

Esistono alcune opzioni elencabili tramite l'opzione `--help`: 

```bash
neofetch --help
```

Si può, ad esempio, forzare l'ascii style di una distribuzione. Forziamo, a titolo esemplificativo, quella di archlinux: 

```bash
neofetch --ascii_distro Arch
```

#### File di configurazione di neofetch

Il file di configurazione di neofetch si trova nella propria home, al percorso `$HOME/.config/neofetch/config.conf`.  

Le informazioni visualizzate, per impostazione predefinita, sono quelle richiamate nel metodo `print_info()`. Se si vuole aggiungere qualcosa si deve scrivere dentro il metodo, tra le parentesi graffe. 

Ad esempio, per mostrare la canzone che si sta ascoltando, nel momento corrente, basta scrivere, verso riga 36, il seguente comando:  

```bash
info "Song" song
```

### Cpufetch

Un tool atto a mostrare delle informazioni riguardanti le caratteristiche della CPU è `CPU-fetch`.  

#### Installazione di cpufetch su Ubuntu e derivate 

Per installarlo su Ubuntu scrivere:  

```bash
apt install cpufetch
```

#### Installazione di cpufetch su Fedora  

Per installarlo su Fedora scrivere:  

```bash
dnf install cpufetch
```

#### Installazione di cpufetch su Archlinux 

Per installarlo su Archlinux è possibile utilizzare AUR (con git o tramite AUR-helper). Supponiamo di adottare il metodo di installazione tradizionale: 

```bash
git clone https://aur.archlinux.org/cpufetch.git

cd cpufetch 

makepkg -si 
```

## Software di monitoraggio completo

I software di monitoraggio servono a verificare, in tempo reale, come si stanno comportando tutti i parametri controllati prima. Ne esistono diversi, alcuni dei quali semplici, altri, invece, più complessi, ma molto esaustivi. 

### Top

Il più comune è sicuramente `top`, basilare e leggero, presente in tutte le distribuzioni. 

Mostra informazioni sul numero di processi, memoria e cpu utilizzata. Per utilizzarlo basta scrivere:

```bash
top
``` 

Mentre è attivo, digitando `h`, si può visualizzare un help.

### Htop 

Il tool `htop` è poco più di un corrispettivo colorato di top. 

#### Installazione di htop su Ubuntu e derivate 
Per installare il software su Ubuntu digitare: 

```bash 
apt install htop
```

#### Installazione di htop su Fedora
Per installare il software su Fedora digitare: 

```bash 
dnf install htop
```

#### Installazione di htop su Archlinux
Per installare il software su Archlinux digitare: 

```bash 
pacman -S htop
```


#### Utilizzo di htop 

Per utilizzarlo: 

```bash
htop
```


### Bashtop 

Un ottimo software di monitoraggio è `bashtop`, comprensivo di grafici esemplificativi, informazioni dettagliate e dotato di temi. 

#### Installazione di bashtop su Ubuntu e derivate 
Per installare il software su Ubuntu digitare: 

```bash 
apt install bashtop
```

#### Installazione di bashtop su Fedora

Bashtop non è disponibile nei repository di Fedora, per cui procediamo con l'installazione. Installiamo `pip` : 

```bash
dnf install pip
```

Poi `psutils`: 

```bash
pip install psutil
```

Quindi compiliamolo: 

```bash
git clone https://github.com/aristocratos/bashtop.git
cd bashtop
sudo make install
```

Ovviamente, nel caso non li aveste, sono necessari anche `make` e `git`, che potete installare sempre con `dnf`.


#### Installazione di bashtop su Archlinux
Per installare il software su Archlinux digitare: 

```bash 
pacman install bashtop
```

#### Utilizzo di bashtop

Per utilizzare bashtop basta digitare: 

```bash
bashtop 
```

Con le frecce direzionali poi si possono selezionare i vari processi, con `esc` si mette il software in pausa e si può, quindi, selezionare il menu delle opzioni (dove si possono trovare eventualmente anche i temi).

### Glances 

Un valido software di monitoraggio è `glances`, completo e funzionale. L'installazione avviene tramite pip, superando quindi le barriere delle varie distribuzioni. Installiamo con il nostro package manager prima `pip` e poi Glances con un semplice comando: 

```bash
pip install glances
```

Utilizziamolo così: 

```bash
glances
```

Se disponiamo di un background del terminale bianco potrebbe essere più adatto utilizzare la versione white: 

```bash
glances --theme-white
```

### Nvtop 

Un'alternativa a top è costituita da `nvtop`, che analizza, in tempo reale, le informazioni dei processi che occupano la GPU. Non è compatibile con GPU intel, però supporta pienamente AMD e NVIDIA. 

#### Installazione di nvtop su Ubuntu e derivate 
Per installare il software su Ubuntu digitare: 

```bash 
apt install nvtop
```

#### Installazione di nvtop su Fedora
Il software non è disponibile nativamente su Fedora, perciò, per utilizzarlo, è necessario installarlo manualmente: 

Installiamo le dipendenze
```bash 
sudo dnf install libdrm-devel cmake ncurses-devel git gcc-c++
```

Quindi compiliamolo: 

```bash
git clone https://github.com/Syllo/nvtop.git
mkdir -p nvtop/build 
cd nvtop/build
cmake .. -DNVIDIA_SUPPORT=ON -DAMDGPU_SUPPORT=ON
make
```

Per installarlo effettivamente, scrivere infine: 

```
make install
```

#### Installazione di nvtop su Archlinux
Per installare il software su Archlinux digitare: 

```bash 
pacman install nvtop
```

#### Utilizzo di nvtop 
Per utilizzare nvtop basta scrivere: 

```bash
nvtop
```

Premendo `F2` è possibile accedere al setup, mentre con `F10` si chiude. 
