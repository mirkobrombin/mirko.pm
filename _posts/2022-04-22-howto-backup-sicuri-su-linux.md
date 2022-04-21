---
title: '#howto - Backup sicuri su linux con borg' 
date: 2022-04-22 09:00
layout: post 
author: Alphvino
author_github: Alphvino
published: false
tags:
- archlinux
- server
- backup
- debian
- ubuntu
---

Vi è mai capitato di aver cancellato per errore alcuni file importanti? Oppure di aver sovrascritto uno di essi? Ora vi ritrovate con un lavoro che non vi piace e non avete modo di ricercare la versione originale.
Oggi vediamo come configurare i backup su linux in modo da avere sempre copie di file importanti, grazie a [borg backup](https://borgbackup.readthedocs.io/en/stable/)!

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

Per iniziare a usare borg in maniera sicura abbiamo bisogno dei seguenti requisiti:

- Chiave SSH cifrata con password, preferibilmente `ed25519`
  
- Il pacchetto `sshpass` e `borgbackup` installato nel client
  
- Una repository di borg creata seguendo la direttiva `keyfile-blake2`

Può sembrare molto confusivo, in realtà le cose da fare sono davvero poche!

1. Creiamo la nostra chiave SSH seguendo [questo articolo](https://linuxhub.it/articles/howto-Chiavi-ssh/)
  
2. Installiamo il pacchetto `sshpass` con il nostro package manager!  


## Creazione della repository borg

Ora dobbiamo creare la repository di borg nella quale dovranno essere immagazzinati i backup. Assicuriamoci di essere in un server esterno, come un NAS che supporta accesso tramite ssh. Creiamo una cartella nella quale creare la repository e infine tramite questo comando, creiamo ufficialmente la repository di borg:

```bash
borg init -e keyfile-blake2
```

Analizziamo le flag:

- `-e` indica al comando borg init che tipo di repository creare
  
- `keyfile-blake2` indica effettivamente in che modo creare la repository.

Questo metodo è il più sicuro tra tutti. Sfrutta blake2 come sistema di crittografia, generalmente più veloce e sicuro di SHA256. Per apportare qualsiasi modifica alla repository è necessario avere un file contenente la chiave denominato `keyfile` all'interno del filesystem del client. Infine è necessaria una password.

Direi che siamo belli che sicuri se teniamo tutto sotto controllo e distribuiamo chiave + password solo nei client da noi posseduti!
  

## Esportiamo il keyfile

Prima avevo menzionato questo famigerato `keyfile`, il quale deve essere presente nel filesystem di ogni client. Per ricavare questo file dobbiamo, sempre nel server di backup dove abbiamo inizializzato la repository, recarci nella seguente directory:  

`~/.config/borg/keys/`  

Qui dentro troveremo un file chiamato proprio keyfile, il quale dovrà essere esportato, nella stessa directory, nei vari client.

## Borg.sh, cos'è?

Borg.sh è un progetto su github, creato da me, che permette di gestire, cancellare, ripristinare, creare backup in un modo molto più diretto e semplice! 
Infatti scrivere ogni volta il comando di creazione, elimazione, listing dei backup non è il massimo, perciò ho deciso di semplificarmi la vita creando questo script che potete trovare [qui!](https://github.com/Alphvino/borg.sh)

## Settiamo lo script!

Una volta eseguito il git clone della repository è necessario darei i permessi di esecuzione allo script tramite `chmod +x borg.sh`.

Dopodiché dobbiamo configurare delle variabili all'interno dello script, il loro significato è descritto nel `README.md` della repository.

## Conclusioni

Se hai seguito il README.md su github completamente non dovresti avere problemi!
Ora ti ritrovi, quindi, con un sistema di backup sicuro e veloce! 
Inoltre, puoi anche creare un cronjob che crea un backup, magari ogni giorno, facendo uso dello script `borg.sh`!

Infine ti ricordo che i backup creati con borg aumentano di dimensione solo quando c'è qualcosa di nuovo. Quindi se un backup pesa 2GB, quello successivo non peserà sempre 2GB ma bensì avrà il peso dei file nuovi non presenti nel backup precedente!
Ecco appunto cosa significa deduplicazione!
