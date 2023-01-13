---
class: post
title: '#howto - Installazione di TeamSpeak 3 su Linux'
date: 2020-06-22
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**TeamSpeak** è uno dei programmi di comunicazione tramite VoIP più usati al mondo. In questa guida vedremo come installarlo su qualsiasi distribuzione Linux.

## Installazione
Prima di tutto è bene precisare che non si tratta di una vera e propria installazione, tutti i file sono portabili e possono essere spostati in qualsiasi momento.

Per prima cosa dobbiamo dirigerci sul sito <a href="https://teamspeak.com/en/downloads/">ufficiale</a> e scaricare la versione Linux per la nostra architettura (32bit o 64bit). Una volta selezionato partirà il download di un file `.run`.

Per poterlo aprire, eseguiamo il terminale e dirigiamoci nella posizione in cui si trova (normalmente in */home/utente/Scaricati*), qui impostiamo i permessi di esecuzione:

```bash
chmod a+x NomeFile.run
```

Una volta fatto ciò, possiamo eseguirlo:

```bash
./NomeFile.run
```

All'avvio si presenta l'installer di TeamSpeak, ci verrà richiesto di accettare l'EULA ed i Termini e Condizioni. Per farlo possiamo premere *INVIO* (per leggere i documenti, il cui scroll è effettuabile con le *freccette* o *INVIO*), *Q* per uscire dalla visione dei documenti e *Y* per accettarli.

Questo file non ha nient'altro che lo scopo di estrarre tutto il programma completo in una sottocartella che possiede un nome simile a *TeamSpeak3-Client-linux_architettura*.

Una volta ultimato entriamo nel percorso appena creato:

```bash
cd TeamSpeak3-Client-linux_architettura
```

ed eseguiamo lo script *ts3client_runscript.sh* al suo interno per eseguire il programma:

```
bash
./ts3client_runscript.sh
```

> Personalmente consiglio di spostare i file in una posizione sicura come `/opt` e `/home/utente`.

## Desktop File
Col metodo sopra indicato non verrà creato un nuovo lanciatore nel menù applicazioni ma possiamo ovviare al problema creando una nuova `Desktop entry` manualmente.

Per prima cosa creiamo un nuovo file `teamspeak.desktop` in `/home/utente/.local/share/applications`:

```bash
nano /home/utente/.local/share/applications/teamspeak.desktop
```

col seguente contenuto:

```bash
[Desktop Entry]
Name=TeamSpeak 3
Exec=/percorso/ts3client_runscript.sh
Icon=/percorso/icona.png
Type=Application
Categories=Network;
```

sostituendo:
* **/percorso/ts3client_runscript.sh** col percorso completo allo script eseguibile
* **/percorso/icona.png** col percorso dell'icona che vogliamo mostrare nel menù

Una volta salvate le modifiche troveremo il nuovo lanciatore nel menù delle applicazioni.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.