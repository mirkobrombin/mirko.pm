---
class: post
title: '#howto - Soft link, hard link ed altri tipi di file'
date: 2022-11-18 08:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- ubuntu
- fedora
- archlinux
- windows
---

Oltre ai classici file e alle directory, Linux consente di utilizzare diversi tipi di file.

Anche in questo ambito, il kernel Linux ha chiaramente tratto ispirazione da Unix.

## Filesystem, inode e filename: cosa sono?

Per comprendere efficacemente quali siano le differenze tra *soft* e *hard* link, è essenziale conoscere i concetti base che vi sono dietro.

### Filesystem

Un **filesystem** è una struttura dati che stabilisce in che modo, ed in quale posizione, i file vengono salvati sulle memorie di massa (ossia memorie non temporanee, perciò solitamente ne è esclusa la RAM).

Senza un filesystem, i bit salvati in una qualsiasi memoria di massa non avrebbero alcun apparente significato: sarebbero nient'altro che una sequenza indecifrabile di zero e uno.

Se stai usando una distro Linux pensata per l'uso desktop, c'è una buona probabilità che il filesystem sia **Ext4** oppure uno più recente, come **Btrfs**.
Analogamente, per gli utenti Windows è **NTFS** il più comune, mentre per MacOS ci sono sia **HFS+** che il più recente **APFS**.

### Inode

Un **inode** è una sequenza di bit che identifica la posizione di un file sulla memoria di massa (<em>address</em>) ed i metadati associati (permessi di lettura, scrittura ed esecuzione; gruppo e utente; data di creazione, ultima modifica, ultimo accesso; etc...).

Tutti gli inode di un filesystem sono salvati in un indice specifico.

Per la natura stessa del concetto bisogna intendere che, se pur diversi file possono avere lo stesso inode, si riferiscono alla **stessa identica porzione di bit**. Semplificheremo questo concetto più avanti.

### Filename

Tra i metadati di un inode non vi rientra il **nome del file** (<em>filename</em>).

Proprio come gli inode, anche i filename sono salvati in un indice a parte.

Ciascun filename fa riferimento ad **un solo** ed **unico** inode.

### In sintesi

Ogni **filename** associa un **inode**, che a sua volta indica l'**indirizzo dei contenuti del file** sulla memoria.

## Tipi di file

### File regolari

Un **file** (<em>regular file</em>) rappresenta una sequenza limitata di bit, salvata in una memoria.

Sono di questo tipo la maggior parte, se non la quasi totalità, dei file salvati su una memoria.

### Directory

Una **directory** (cartella) è un particolare tipo di file contenente un elenco di filename.

Ciascuna directory contiene sempre altri due file:

* `.` (punto singolo), associa la cartella stessa;
* `..` (punto doppio), associa la cartella gerarchicamente superiore (se si è già nella cartella più in alto gerarchicamente,  ovverosia la root `/`, rimanda a sé stessa)

### Soft link

I **soft link** (o collegamenti simbolici) sono file che puntano ad un filename nella gerarchia del file system (e non nel disco).

Particolarità:

* Aprire e modificare un soft link equivale a svolgere la stessa operazione sul file a cui punta;

* Rimuovere un soft link comporta la cancellazione del collegamento, **NON** del file originario;

* Rimuovere il file originario farà sì che qualsiasi soft link ci punti smetta di funzionare, sempre e comunque.

* Un soft link può puntare dovunque, anche ad un percorso inesistente (<em>dangling link</em>);

* Spostare un soft link in un'altra cartella potrebbe trasformarlo in un dangling link se il filename a cui si punta è un percorso relativo piuttosto che assoluto.

* Un soft link occupa sempre pochi byte, a prescindere dalle dimensioni del file puntato.

Per fare un soft link bisogna passare il percorso completo del file:

```bash
ln -s /percorso/completo/fileorigine /percorso/completo/filedestinazione
```

### Hard link

Un **hard link** è un file che associa un altro file in base al suo inode, quindi copia il suo puntamento al disco, diventando un *file effettivo*.

Particolarità:

* Aprire e modificare un hard link equivale a svolgere la stessa operazione sul file a cui punta;

* Rimuovere un hard link comporta la cancellazione del file originario **SOLO SE** è l'ultimo collegamento rimasto (in altre parole, solo se l'inode non ha più nessun filename che punti a sé);

* Rimuovere il file originario non è un problema se si utilizzano hard link che vi puntavano, i quali infatti continueranno a funzionare.

* Un hard link può puntare solo a file (ma non cartelle) che devono necessariamente trovarsi sullo stesso filesystem;

* Spostare un hard link in un'altra cartella non lo farà smettere di funzionare.

* Un hard link occupa sempre pochi byte, a prescindere dalle dimensioni del file puntato.

Per fare un link hard:

```bash
ln -h /percorso/completo/fileorigine /percorso/completo/filedestinazione
```

Come già spiegato non si può fare un hard link di una cartella, ma si può fare una copia di una cartella e l'hard link di tutti i file al suo interno: 

```bash
cp -lr cartella_origine cartella_copia
```

### Nota del redattore: hard link vs soft link

Risulta sempre complesso per qualche strano motivo comprendere la differenza tra hard link e soft link a chiunque io tenti di spiegarlo. Per cui ci spendo qualche parola in più.

Immaginiamo il `FileA` che punta in un disco ad una determinata sequenza di bit

![FileA->Settore Disco](https://kroki.io/mermaid/svg/eNpLL0osyFAIcbFW4FIAArfMnFRHBV1dO4Xg1JKS_KJULrAwlKOhoQFlKaRkFifnK6SmpQH5mWX5mpqaAB0JFqA)

Un collegamento simbolico è un file (`FileB`) che "punta" ad un `FileA`: 

![FileB->FileA->Settore Disco](https://kroki.io/mermaid/svg/eNpLL0osyFAIcbFW4FIAArfMnFRHBV1dO4Xg1JKS_KJUuKgTWBQszwUWhCrQ0NCAshRSMouT8xVS09KA_MyyfE1NTQDOxBuF)

Un collegamento forte, o link hard, è un FileC che punta alla stessa sezione del disco: 

![FileB->FileA->Settore Disco<-FileC](https://kroki.io/mermaid/svg/eNpLL0osyFAIcbFW4FIAArfMnFRHBV1dO4Xg1JKS_KJUuKgTWBQsDxdzRlEJFoZyNDQ0oCyFlMzi5HyF1LQ0ID-zLF9TUxMAOzYhkA)

Ne derivano tutte le proprietà spiegate in precedenza, che ora dovrebbero essere più intuitive. Ad esempio, eliminando `FileA`, `FileB` non saprebbe più a chi puntare, ma `FileC` continuerebbe benissimo a fare il suo lavoro.

## Tipi di file meno comuni

### Named Pipe

I file **named pipe** sono utilizzati per lo scambio di dati tra i processi dello stesso sistema.

Si comportano proprio come ci si aspetterebbe dall'operatore pipe (`|`) della shell.

Mentre l'operatore `|` crea un <em>(anonymous) pipe</em> che può essere usato solo nel momento stesso in cui si dà un comando via shell, un <em>named pipe</em> può essere usato anche in un secondo momento (grazie al fatto che ha un nome, scelto arbitrariamente, a cui riferirsi in un secondo momento).

Siccome i dati caricati in input arrivano nello stesso ordine in fase di output, questi file sono comunemente conosciuti anche come **FIFO** (<em>First In, First Out</em>; i primi bit ad entrare sono anche i primi ad uscire).

### Socket

Proprio come nel caso dei file named pipe, anche i socket sono utilizzati per lo scambio di dati tra i processi dello stesso sistema.

Le principali differenze vertono sul tipo di comunicazione (non più monodirezionale ma bidirezionale) e sul tipo di dati trasferibili (sono consentiti anche i "file descriptor" che, in breve, sono numeri identificativi che associano altri file, named pipe o, addirittura, altri socket).

### Device

I file di tipo **device** sono suddivisi in:
* **Character**, in cui lettura e/o scrittura avvengono in modalità seriale (sono sequenziali);
* **Block**, in cui lettura e/o scrittura sono casuali (non è necessario scrivere o leggere i bit precedenti a quelli desiderati).

## Come visualizzare il tipo di file

### Usando ls

Con `ls` è possibile determinare il tipo di file in due modi:
* Usando `-l` (<em>long listing format</em>), la prima **lettera** del primo campo (e perciò della riga) indica il tipo;
* Usando `-F`, come **suffisso** dei filename viene talvolta aggiunto un simbolo in particolare.

| Lettera | Suffisso | Tipo di file     |
|---------|----------|------------------|
| -       |          | regular file     |
| d       | /        | directory        |
| l       | @        | soft link        |
| -       |          | hard link        |
| s       |          | socket           |
| c       |          | character device |
| b       |          | block device     |
| p       | =        | named pipe       |

Osservazione: un hard link è per sua natura indistinguibile dal file originale; in comune, i due tipi di file hanno solo la proprietà di puntare ad uno stesso inode.

### Usando file

Sia "foobar" il nome del file che si vuole controllare, utilizzando l'utility `file` basterà digitare `file foobar`.
