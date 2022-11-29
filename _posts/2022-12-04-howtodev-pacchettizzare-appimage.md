---
title: '#howtodev - Pacchettizzare in Appimage' 
date: 2022-12-04 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags: 
- appimage
---

Nonostante abbiano perso molto terreno rispetto ai flatpak, reputo i flatpak un formato per pacchettizzare i software ancora molto valido, flessibile e leggero. 

Perché quindi non spiegare come impacchettare un software con Appimage?

## Obiettivi

In questo articolo verrà spiegato:

- come creare un pacchetto Appimage.
- creare un avviatore che prelevi anche i parametri.
- inserire le librerie necessarie all'avvio.

## Prerequisiti

Non è necessario alcun particolare prerequisito, son gradite però: 

- Conoscenza della struttura delle cartelle in un [file system linux](https://linuxhub.it/articles/howto-La-struttura-del-filesystem-Linux/).
- Conoscenza di programmazione degli script bash.

## Tool richiesto

Il tool richiesto per la creazione di un Appimage è [AppImageTool da AppImagekit](https://github.com/probonopd/AppImageKit).  

Si può scaricare facilmente con wget:

```bash
wget https://github.com/probonopd/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
```

Una volta scaricato va reso eseguibile: 

```bash
chmod +x appimagetool-x86_64.AppImage
```


## Ho scritto un programma, come creo un Appimage?

Supponendo che il software sia interamente locato in una cartella (se non lo è, va creata una cartella con il contenuto al suo interno) si può iniziare scrivendo un [Desktop Entry](https://linuxhub.it/articles/howto-desktop-entry/) al suo interno: 

```bash
[Desktop Entry]
Name=NOME APP
Icon=percorso/icona
Type=Application
Categories=CATEGORIE
```

Come si può notare, non vi è una sezione *Exec*, infatti non risulta necessaria, il punto di avvio dell'applicazione sarà un file script bash chiamato **Apprun**, dove si potrà poi richiamare manualmente l'eseguibile del programma. Ecco un esempio del contenuto: 

```bash
#!/bin/sh

exec /percorso/eseguibile
```

Una volta creato il file Apprun ed il desktop file si può costruire l'Appimage semplicemente scrivendo:

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

Potrebbe essere necessario specificare alcune opzioni per un AppRun più robusto e con più funzioni.

### Indicare la cartella dell'appimage

Ad esempio se l'eseguibile che avviato è a sua volta interno all'Appimage è necessario specificare la cartella in cui si trova. Si può usare `dirname` per questo:

```bash
#!/bin/sh
cartellaEseguibile="$(dirname "$0")"
exec "$cartellaEseguibile"/nomeeseguibile
```

La cartella verrà risolta al runtime, nota che non sarà la cartella dell'Appimage vera e propria, ma una versione del progetto estratta in `/tmp`.

### Indicare i parametri a linea di comando

Chi dice che gli AppImage non possano essere a linea di comando? Ma per un buon software di questo genere è necessario avere un modo di prelevare anche i parametri passati, scrivendo nel Apprun:

```bash
#!/bin/sh
cartellaEseguibile="$(dirname "$0")"
exec "$cartellaEseguibile"/nomeeseguibile "$@"
```

Ora, ad AppRun verrà passato come parametro qualunque parametro con cui evocate il vostro appimage, ad esempio:

```bash
nomeApp.AppImage  n1 n2 n3
```

Avrà come valore `$@ = n1 n2 n3`.
