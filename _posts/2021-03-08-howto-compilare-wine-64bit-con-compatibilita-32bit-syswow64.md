---
title: '#howto - Compilare Wine 64Bit con compatibilità 32Bit e patch staging'
date: 2021-03-08
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
**Wine** è uno strumento capace di eseguire software Windows su altri sistemi (Linux, MacOS, FreeBSD e Android, anche se quest'ultimo è ancora in fase sperimentale).

Si tratta di un livello di compatibilità e non di un emulatore: questo significa che non emula un sistema Windows dove eseguire applicazioni, ma monta una struttura capace di leggere ed eseguire DLL ed eseguibili creati per Windows. Questo avviene tramite specifico software scritto prevalentemente dagli sviluppatori di ReactOS, un sistema operativo Open source capace di supportare l'intero ecosistema Windows, a partire dal semplice eseguibile fino ad arrivare ai Driver stessi scritti per Windows.

Wine è disponibile in quasi tutte le distribuzioni Linux tramite le repository di sistema. Ad ogni modo, fatta eccezione per alcune distribuzioni come Arch Linux ed OpenSUSE, il pacchetto è spesso poco aggiornato o non mantenuto. Grosso problema dal punto di vista della compatibilità, dato che ogni settimana vengono inviati oltre **10.000 commit** contenenti fix e miglioramenti.

In questa guida vedremo come compilare Wine in modo da ottenere l'ultima build stabile (o instabile) e, opzionalmente, applicare delle patch che ne estendono il supporto.

## Requisiti
Questo processo di compilazione è stato pensato, scritto e testato su Ubuntu. Pertanto sarà necessaria una VM, un server o un container per procedere, dato che si tratta di una versione specifica di Ubuntu (la 18.04 LTS).

### Strumenti di compilazione
Prima di tutto, dobbiamo preparare l'ambiente dove compilare. Accediamo quindi nella nostra macchina virtuale, container, server che sia ed aggiorniamo il sistema via `apt`:

```bash
apt update
apt upgrade
systemctl reboot
```

Successivamente installiamo `git`, essenziale per ottenere gli strumenti con cui andremo a compilare il programma:

```bash
apt install git
```

Creiamo il percorso `~/runner/work/wine` e cloniamo al suo interno la repository GitHub di Wine:

```bash
mkdir -p ~/runner/work/wine
cd ~/runner/work/wine && git clone https://github.com/bottlesdevs/wine
```

Torniamo alla *home* del nostro utente ed otteniamo gli strumenti per la compilazione dalla sua repository:

```bash
cd ~ && git clone https://github.com/bottlesdevs/build-tools
```

## Compilazione
La parte *manuale* del processo è quasi completa, il resto è facilitato ed automatizzato dagli strumenti di compilazione, creati e messi a disposizione dal Team di sviluppo di [Bottles](https://github.com/bottlesdevs/build-tools).

Entriamo quindi nel percorso `build-tools`:

```bash
cd build-tools
```

ed impostiamo i permessi di esecuzione agli scripts al suo interno:

```bash
chmod +x *.sh
```

### Ambiente
Il prossimo step servirà a configurare l'ambiente con tutte le dipendenze necessarie alla compilazione:

```bash
./environment.sh
```

Lo script mostrerà a schermo gli step eseguiti con successo in verde, in caso contrario saranno rossi.

### Patches
Uno dei pregi di compilare la propria build di Wine è sicuramente quello di poter applicare delle patch che normalmente non sono presenti nelle versioni delle repository di sistema o qualsiasi altra versione Vanilla.

Online esistono molte patch, in questa guida ne tratteremo 2, nello specifico:
- josh flat theme patch
- staging patch

La prima applica un tema moderno ed elegante alle applicazioni eseguite tramite Wine. La seconda applica un insieme di fix e miglioramenti che non sono presenti nelle build finali di Wine.

#### josh flat theme patch
Possiamo applicare questa patch tramite lo script dedicato:

```bash
./patch-josh-flat-theme.sh
```

#### staging patch
Come per la patch precedente, anche questa ha uno script dedicato, ma cambia il modo con cui viene applicata. In questo caso dovremo specificare la versione di Wine che stiamo compilando, in modo da selezionare la versione corretta del sorgente:

```bash
./patch-staging.sh -r [versione] (es. -r 6.0)
```

Se stiamo compilando l'ultima versione di Wine (ramo *master*) basterà non dichiarare la versione:

```bash
./patch-staging.sh
```

e questo utilizzera l'ultima versione del sorgente dal branch master di *wine-staging*.

Nel caso in cui stessimo compilando una versione specifica di Wine, ad esempio la *6.3*:

```bash
./patch-staging.sh -r 6.3
```

#### Patch di terze parti
Le patch che non hanno uno script dedicato possono essere installate tramite il commando `patch`. Basterà ottenere il file `.patch` della patch di nostro interesse, collocarlo nel percorso `$HOME/work/wine/extra` e procedere come segue:

```bash
cd $HOME/work/wine/wine
patch -p1 < ../extra/josh-flat-theme.patch
```

### Compilazione
Una volta predisposto l'ambiente ed eseguite le patch di nostro interesse, possiamo procedere con la vera compilazione.

Si tratta di 3 step totali:
- compilazione degli strumenti Wine
- compilazione della versione a 64Bit
- compilazione della versione a 32Bit con supporto 64Bit

quindi, in sequenza:

```bash
./build-tools.sh
./build64.sh
./build32.sh
```

il processo richiederà circa 1h e 30min di tempo su una macchina con 2 core e 7GB di RAM.

### Creazione del pacchetto
Se la compilazione è andata a buon fine possiamo procedere con l'ultimo step, ossia la creazione del pacchetto contenente la nostra build di Wine.

Come per tutti gli step precedenti, anche qui è disponibile uno script:

```bash
./package.sh
```

Possiamo sfruttare l'opzione `-s` per aggiungere un suffisso al nome della nostra build, ad esempio:

```bash
./package.sh -s unstable
```

La nostra build si chiamerà quindi `chardonnay-6.3-x86_64.tar.gz` nel primo caso e `chardonnay-6.3-unstable-x86_64.tar.gz` nel secondo.

Possiamo modificare lo script per cambiare nome al pacchetto da `chardonnay` a qualsiasi altro.

Una volta completato il processo, la nostra build sarà disponibile al percorso `$HOME/work/wine/wine/`. Entriamoci e testiamo il tutto avviando ad esempio `winecfg`:

```bash
cd $HOME/work/wine/wine/chardonnay-*-x86_64/bin
./wine64 winecfg
```

 Mentre per problemi legati agli strumenti di compilazione, vi invito ad aprire una <a href="https://github.com/bottlesdevs/build-tools/issues">Issue</a> nella repository dedicata.