---
class: post
title: "#howto - Come controllare l'uso della memoria (RAM) su Linux'"
date: 2021-02-15
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Non è raro dover sapere quanta **memoria** (RAM, specifichiamo) è attualmente occupata sul proprio sistema **Linux**.

Fortunatamente, ci sono diverse soluzioni per conoscere questo importante dato, e le analizzeremo in questa nuova guida.

## Come controllare quanta RAM è in uso su Linux

### free

Il comando `free` è il comando che più viene utilizzato per controllare quanta memoria è in uso su Linux, siccome mostra informazioni sulla RAM totale, usata e libera.

Generalmente, `free` viene chiamato con l'opzione *-h* che ci permette di ottenere un output molto più leggibile.

Ad esempio, il seguente comando:

```bash
free -h
```

ci darà un output simile a:

```bash
              total        used        free      shared  buff/cache   available
Mem:          924Mi       102Mi        22Mi       6.0Mi       799Mi       763Mi
Swap:          99Mi        83Mi        16Mi
```

Ecco una spiegazione delle diverse colonne:

- *total* - Indica l'ammontare totale di memoria che può essere usata dalle applicazioni

- *used* - Mostra la memoria usata

- *free* - Mostra la memoria libera

- *shared* - Questa colonna può essere ignorata siccome viene usata solo per "retrocompatibilità"

- *buff/cache* - Indica la memoria combinata usata dai buffer del kernel assieme alla page cache. Questa memoria può essere sfruttata in qualsiasi momento dalle applicazioni se necessario

- *available* - Una stima della memoria disponibile per avviare nuove applicazioni senza sfruttare lo swapping

### top

**`top`** (o `htop`, se installato) è una utility che mostra informazioni in tempo reale sui processi in esecuzione. Oltre a parametri come la CPU, top mostra quanta memoria viene usata.

Per avviare top è semplicemente necessario scrivere "`top`":

```bash
top
```

La parte superiore dell'output, che riepiloga le informazioni sull'hardware del sistema, mostra dettagli sulla memoria totale, libera ed usata anche della *swap*.

Quando si guardano i programmi, invece, la colonna *%MEM* indica la percentuale di memoria fisica usata da ogni singolo processo.

### /proc/meminfo

Un altro, facile modo per controllare l'ammontare di memoria in uso è mostrate i contenuti del file */proc/meminfo*. Questo file viene usato dai programmi sopracitati, tra l'altro.

Con `cat` è possibile catturare i contenuti del file in questione:

```bash
cat /proc/meminfo
```

L'output che ci ritroveremo mostrerà tante informazioni, ma quelle che davvero ci servono sono le prime tre righe, che indicano la memoria totale, libera e disponibile per le applicazioni.

