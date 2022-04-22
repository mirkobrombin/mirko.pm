---
title: '#howto - Backup sicuri su linux con borg' 
date: 2022-04-22 08:17
layout: post 
author: Alphvino
author_github: Alphvino
published: true
tags:
- archlinux
- server
- backup
- debian
- ubuntu
---

Vi è mai capitato di aver eliminato per errore alcuni file importanti? Oppure sovrascrivere dei file per sbaglio? 
Nessuna preoccupazione, oggi vedremo come configurare i backup su linux per stare tranquilli e per dimenticarci la perdita dei dati disponendo di una copia, grazie a [borg backup](https://borgbackup.readthedocs.io/en/stable/)!

## Borg backup

Molto probabilmente non conosci ancora questo innovativo software di backup, ma una volta capito il suo funzionamento è incredibilmente facile da usare!

I punti chiave di borg sono i seguenti:

- Crittografia sicura e autentica
  
- Deduplicazione
  
- Vari tipi di compressione tra cui scegliere: LZ4, zlib, LZMA, zstd
  
- Facilmente installabile in macchine Linux, BSD, macOS
  
- Community di supporto multipiattaforma: IRC, reddit, twitter
  
- Ultima ma non per importanza, borg è software libero sotto licenza BSD!


## Come posso iniziare a usare borg?

Per iniziare a usare Borg, assicuriamoci di soddisfare i seguenti requisiti: 

- Chiave SSH cifrata con password, preferibilmente `ed25519`
  
- Il pacchetto `sshpass` e `borgbackup` installato nel client
  
- Una repository di borg creata seguendo la direttiva `keyfile-blake2`

Può sembrare molto confusionario,  ma in realtà i procedimenti da svolgere sono molto semplici.

1. Creiamo la nostra chiave SSH seguendo [questo articolo](https://linuxhub.it/articles/howto-Chiavi-ssh/)
  
2. Installiamo il pacchetto `sshpass` con il nostro package manager!  


## Creazione della repository borg

Dobbiamo ora creare la repository di borg nella quale dovranno essere immagazzinati i backup. Assicuriamoci di disporre accesso in un server esterno, come un NAS che supporta accesso tramite ssh. Creiamo una cartella nella quale creare la repository e infine tramite questo comando, creiamo ufficialmente la repository di borg:

```bash
borg init -e keyfile-blake2
```

Analizziamo le flag:

- `-e` indica al comando borg init che tipo di repository creare
  
- `keyfile-blake2` indica effettivamente in che modo creare la repository.

Questo metodo è il più sicuro tra tutti. Sfrutta blake2 come sistema di crittografia, generalmente più veloce e sicuro di SHA256. Per apportare qualsiasi modifica alla repository è necessario disporre di  un file contenente la chiave denominato `keyfile` all'interno del filesystem del client. Infine è necessaria una password.

Direi che siamo belli che sicuri se teniamo tutto sotto controllo e distribuiamo chiave + password solo nei client da noi posseduti!
  

## Esportiamo il keyfile

Prima menzionai  `keyfile`, il quale , esso deve essere presente nel filesystem di ogni client. Per ricavare questo file dobbiamo, sempre nel server di backup dove abbiamo inizializzato la repository, recarci nella seguente directory:  

`~/.config/borg/keys/`  

Qui dentro troveremo un file chiamato proprio keyfile, il quale dovrà essere esportato, nella stessa directory, nei vari client.

## Borg.sh, cos'è?

Borg.sh è un progetto  su github, creato da me, che permette di gestire, cancellare, ripristinare, creare backup in un modo molto più diretto e semplice! 
scrivere ogni volta il comando di creazione, elimazione, listing dei backup non è il massimo, ho deciso, perciò di semplificare il processo creando uno script reperibile al seguente link: (https://github.com/Alphvino/borg.sh)

## Settiamo lo script!

Una volta eseguito il git clone della repository è necessario dare i permessi di esecuzione allo script tramite `chmod +x borg.sh`.

Dobbiamo, successivamente configurare delle variabili all'interno dello script, il loro significato è descritto nel `README.md` della repository.

## Conclusioni

Se hai seguito correttamente il README.md su github non dovresti riscontrare problemi!
Ora ti ritrovi, quindi, con un sistema di backup sicuro e veloce! 
Inoltre, puoi anche creare un cronjob che crea un backup, magari ogni giorno, facendo uso dello script `borg.sh`!

Ricordiamo che i backup creati con borg aumentano di dimensione solo quando c'è qualcosa di nuovo. Quindi se un backup pesa 2GB, quello successivo non peserà sempre 2GB ma avrà il peso dei file non presenti nel backup precedente!
Ecco la prova pratica della "Deduplicazione"
