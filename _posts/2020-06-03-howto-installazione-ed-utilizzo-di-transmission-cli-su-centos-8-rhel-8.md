---
class: post
title: '#howto - Installazione ed utilizzo di transmission-cli su Centos 8/RHEL 8/Fedora 30+'
date: 2020-06-03
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**transmission-cli** è ovviamente la versione da console del noto software **Transmission**. In questa guida vediamo come installarlo ed utilizzarlo su Centos 8/RHEL 8/Fedora 30 e successivi.

Sono molte le occasioni in cui è necessario scaricare un torrent. Questa è una procedura semplice quando si sfrutta una interfaccia grafica (GUI), ma se la necessità si presenta mentre stiamo operando su un server senza controllo remoto, allora può diventare complesso.

## Installazione
Alcune distribuzioni pre-installano *transmission-cli* con *transmission* e viceversa. Su Centos e RHEL, ma anche Fedora 30+, troviamo questi pacchetti "sconnessi".

Per prima cosa installiamo il software da gestore pacchetti (*dnf* su entrambe le sopra citate):

```bash
dnf install transmission-cli
```

> La guida potrebbe essere compatibile sia con Centos che con RHEL 7, unica accortezza è l'utilizzo di *yum* come gestore pacchetti.

Possiamo accertarci che sia andato tutto per il verso giusto controllandone la versione installata, questo sfruttando l'opzione `-V`:

```bash
transmission-cli -V
```

il quale nel mio caso ritorna come output:

```bash
transmission-cli 2.94
```

## Configurazione
Lo strumento arriva pronto all'uso sin da subito, ma può capitare l'esigenza di dover scegliere un percorso per i download diverso da quello base. Per fare ciò sfruttiamo il comando `transmission-daemon` con l'opzione `--download-dir`:

```bash
transmission-daemon --download-dir "/percorso"
```

dove *percorso* è appunto la locazione dove vogliamo che vengano posizionati i file in fase di download. Salviamo le impostazioni con l'opzione `--dump-settings`:

```bash
transmission-daemon --dump-settings
```

## Utilizzo
L'utilizzo può sembrare complesso, ma basta conoscere poche opzioni per poterlo sfruttare al meglio.
Prima di tutto ci dobbiamo ricordare di eseguire il servizio *daemon* ogni volta che vogliamo usare lo strumento:

```bash
transmission-daemon
```

### Aggiungere .torrent
Tutte le operazioni legate ai torrent devono essere impartite allo strumento `transmission-remote`. Per aggiungere un torrent sfruttiamo l'opzione `-a`:

```bash
transmission-remote -a "link_completo.torrent"
```

dove *link_completo.torrent* è appunto il link completo di prefisso http/https al file torrent. È possibile passare anche un percorso ad un file .torrent locale.

Per quanto riguarda i link magnetici, possiamo aggiungerli ponendo il prefisso `magnet:` al suo inizio:

```bash
transmission-remote -a "magnet:?....."
```

### Stato dei download
Come per molti altri strumenti, `-l` è l'opzione che ritorna una lista, in questa caso popolata con tutti i download in corso:

```bash
transmission-remote -l
```

l'output mostra principalmente il suo ID univoco (utile in caso dovessimo effettuare operazioni specifiche), la percentuale di download, la dimensione rimanente, la velocità di download e upload, oltre che il nome file e lo stato.

### Eliminazione download
Possiamo eliminare un download dalla coda sfruttando l'opzione `-r` e -`t`:

```bash
transmission-remote -t ID -r
```

dove `ID` è l'identificatore univoco per quel download, ottenibile come spiegato qui sopra. Questi possono essere di più e suddivisi tramite una virgola (`,`).
Possiamo in alternativa usare `all` come valore per `-t`, ma in questo modo andremo ad eliminare tutti i download.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).