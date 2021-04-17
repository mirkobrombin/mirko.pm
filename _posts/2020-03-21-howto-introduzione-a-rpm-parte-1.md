---
title: '#howto - Introduzione a RPM Parte  1'
published: 2020-03-21
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - bash
---
**RPM** (Red Hat Package Manager) è un gestore pacchetti sviluppato da Red Hat che è riuscito ad imporsi sul mercato diventando uno dei formati per la distribuzione di pacchetti maggiormente utilizzati nel mondo Linux.

Uno dei vantaggi di RPM è sicuramente la facilità e la flessibilità dell'installazione e il mantenimento dei pacchetti.

Questo gestore pacchetti mantiene:

-   Un database dei pacchetti installati sul proprio sistema;
    
-   La posizione dei file;
    
-   I numeri delle versioni;
    

Ogniqualvolta si installi un pacchetto in formato rpm, esso cercherà nel sistema eventuali conflitti tra i pacchetti installati e quelli già esistenti. Inoltre, avviserà in caso il download di altri pacchetti sia necessario per far funzionare correttamente un determinato software.

## Installazione di un file RPM

Per effettuare un installazione base di un file RPM basterà eseguire il seguente comando:

```bash
sudo rpm -ivh nomepacchetto.rpm
```

A questo punto RPM verificherà se i file richiesti sono installati o no. Se sarà necessario installare un altro pacchetto o se qualche file del pacchetto è già stato installato precedentemente, vi sarà notificato.

Possono anche essere specificati file multipli utilizzando i caratteri jolly, ad esempio:

```bash
sudo rpm -ivh nomepacchetto*.rpm
```

Vediamo più nel dettaglio i parametri utilizzati:

-   **-i** = specifica che l'azione da intraprendere è l'installazione;
    
-   **-v** = fa visualizzare informazioni addizionali durante l'installazione;
    
-   **-h** = mostra il progresso dell'installazione.
    

Altre opzioni che possono essere fornite in un comando sono:

-   **--replacepkgs** = Necessario nel caso si debba reinstallare un pacchetto danneggiato. In caso contrario, quando si effettuerà l'installazione, rpm avviserà che il pacchetto è già stato installato.
    
-   **--force** = Forza il proseguimento dell'installazione senza badare ad eventuali errori. Delle problematiche che derivano da dipendenze errate, però, possono interrompere il processo.
    
-   **--replacefiles** = Se si possiede un pacchetto con una versione più recente di un solo file e lo si vuole solo installare, allora bisogna usare questa opzione per sostituire il file in questione.
    
-   **--nodeps** = evita la ricerca di dipendenze nel processo di installazione del pacchetto.

RPM può anche effettuare le installazioni sulla rete:

```bash
rpm -ivh ftp://ftp.linux.tucows.com/pub/RedHat/nomepacchetto.rpm
```

Se il sito richiede l'autenticazione, è necessario inserire nell'URL uno username valido:

```bash
rpm -ivh ftp://nome@ftp.linux.tucows.com/pub/RedHat/nomepacchetto.rpm
```

Una volta fatto ciò vi chiederà di inserire la password, e dopo questo processo il file sarà scaricato e installato.

## Conclusioni

Siamo giunti alla fine della prima parte riguardo RPM. Nel prossimo articolo andremo a parlare di altre funzioni che potranno esserci utili durante la nostra vita quotidiana.
    
Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://t.me/linuxpeople).