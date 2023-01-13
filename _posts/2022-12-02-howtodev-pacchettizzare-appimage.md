---
class: post
title: '#howtodev - Pacchettizzare in Appimage' 
date: 2022-12-02 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Alberto Bella
coauthor_github: al6263
published: true
tags: 
- appimage
---

Nonostante Appimage ha perso molto terreno rispetto a Flatpak, rimane un formato pacchetto valido, flessibile, leggero ma soprattutto portatile e decentralizzato, due plus da non sottovalutare che rendono questo formato uno dei più compatibili.

Perché quindi non spiegare come impacchettare un software con Appimage?

## Obiettivi

In questo articolo verrà spiegato:

- come creare un pacchetto Appimage
- creare un avviatore che prelevi anche i parametri
- inserire le librerie necessarie all'avvio

## Prerequisiti

Non è necessario alcun particolare prerequisito, son gradite però: 

- Conoscenza della struttura delle cartelle in un [file system linux](https://linuxhub.it/articles/howto-La-struttura-del-filesystem-Linux/).
- Conoscenza di programmazione degli script bash.

## Tool richiesto

Il tool richiesto per la creazione di un Appimage è [AppImageTool da AppImagekit](https://github.com/probonopd/AppImageKit).  

Posizioniamoci nel percorso che più ci aggrada e scarichiamo il pacchetto:

```bash
wget https://github.com/probonopd/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
```

impostiamolo quindi come eseguibile: 

```bash
chmod +x appimagetool-x86_64.AppImage
```


## Ho scritto un programma, come creo un Appimage?

Supponendo che il software sia collocato in una singola cartella, creiamo una [Desktop Entry](https://linuxhub.it/articles/howto-desktop-entry/) al suo interno: 

```bash
[Desktop Entry]
Name=NOME APP
Icon=percorso/icona
Type=Application
Categories=CATEGORIE
```

Come si può notare, manca la chiave *Exec*, poichè questa non è necessaria dato che il punto di avvio dell'applicazione sarà un file script bash chiamato **Apprun**, dove si potrà poi richiamare manualmente l'eseguibile del programma. Ecco un esempio del contenuto: 

```bash
#!/bin/sh

exec /percorso/eseguibile
```

Una volta creati questi file, possiamo costruire la nostra AppImage tramite AppimageTool che abbiamo scaricato poco fa:

```bash
ARCH=ARCHITETTURA /percorso/appimagetool-x86_64.AppImage CartellaProgetto nomeApp.AppImage 
```

Immaginando ad esempio una build per le seguenti condizioni: 

- Architettura 64 bit.
- Cartella progetto posizionata in `/home/utente/workspace/MioProgetto`.
- AppimageTool posizionato in `/home/utente/appimagetool-x86_64.AppImage`.

Il comando da dare sarà: 

```bash
ARCH=x86_64 /percorso/appimagetool-x86_64.AppImage CartellaProgetto MioProgetto.AppImage 
```

Al posto di x86_64 potete mettere l'architettura che più preferite, è ovviamente possibile utilizzare i percorsi relativi.

## Un Apprun migliore

Potrebbe essere necessario specificare alcune opzioni per un AppRun più robusto, ad esempio controllando alcune impostazioni di sistema come l'assenza di connessione, prima di avviare il programma.

### Indicare la cartella dell'appimage

Ad esempio se l'eseguibile che avviamo è a sua volta all'interno all'Appimage, è necessario specificare la cartella in cui si trova. Possiamo fare questo con l'ausilio di `dirname`:

```bash
#!/bin/sh
cartellaEseguibile="$(dirname "$0")"
exec "$cartellaEseguibile"/nomeeseguibile
```

La cartella verrà risolta al runtime, nota che non sarà la cartella dell'Appimage vera e propria, ma una copia del progetto estratta in `/tmp`.

### Indicare i parametri a linea di comando

Chi dice che le AppImage non possano essere utilizare da linea di comando? 

Per applicazioni che supportano parametri da riga di comando, è necessario istruire il nostro AppRun per trasferire questi al comando originale:

```bash
#!/bin/sh
cartellaEseguibile="$(dirname "$0")"
exec "$cartellaEseguibile"/nomeeseguibile "$@"
```

notiamo `"$@"` il quale si occupa di passare tutti gli argomenti a `nomeeseguibile`. Quindi passando ad AppRun uno o più argomenti:

```bash
nomeApp.AppImage  n1 n2 n3
```

questi verranno letto dal nostro comando originale: `nomecomando n1 n2 n3`, comportandosi come da programmazione.
