---
class: post
title: "#howto - Breve introduzione all'uso di Silverblue"
date: 2020-05-24
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Silverblue è una versione di Fedora di tipo "immutabile". Punta ad essere estremamente stabile ed una piattaforma per sviluppatori e per coloro che utilizzano container.

## Il concetto immutabile
A differenza di altre distribuzioni, Silverblue è appunto immutabile, ciò significa che ogni installazione è identica, il sistema operativo è esattamente lo stesso da una macchina all'altra e non cambia mai mentre viene utilizzato.

Il concetto di sistema "immutabile" lo troviamo anche su Android, Chrome OS e Mac OS Catalina, ed ha lo scopo di rendere il sistema più stabile, meno soggetto a bug e più facile da testare ed installare. La sua struttura lo rende anche un'ottima piattaforma per applicazioni container e sviluppo di software basato su questi. Tutte le applicazioni ed i contenitori sono tenuti separati dal sistema host.

## OSTree
Il sistema è basato su un sistema di versionamento e distribuzione chiamato OSTree, questo è molto simile a git come concetto, infatti ogni "aggiornamento" viene identificato come commit e successivamente applicato al sistema tramite merge. 

Questo sistema permette non solo di avere appunto un sistema "perfetto", in linea con l'immagine originale ma anche di poter ripristinare la versione precedente del sistema operativo, se qualcosa dovesse andare storto.

## Installazione software
Il sistema preferisce e consiglia l'installazione di software di terze parti mediante l'uso di container o pacchetti completi. Possiamo ad esempio installare:

* Flatpak
* AppImage
* Pacchetti stratificati

### Flatpak
Questo è il formato *preferito* da Silverblue, si tratta di una tipologia di pacchetto creato e mantenuto da GNOME, ed adottato ormai da tempo su distribuzioni come Fedora e Pop! OS, per quanto riguarda la distribuzione software nello store.

Le Flatpak si possono installare da GNOME Software, applicativo preinstallato di sistema. Si possono aggiungere repository per ampliare il parco software, di base è presente quella ufficiale del progetto Fedora. La più grande e mantenuta è Flathub.

#### Configurazione di Flathub
Per poter usufruire di Flathub, dobbiamo prima di tutto accedere via browser al link ufficiale (<a href="https://flatpak.org/setup/Fedora/">qui</a>) e cliccare sul pulsante blu il quale aprirà GNOME Software con una schermata di installazione, installiamo e riavviamo lo store per visualizzare le nuove applicazioni.

In alternativa possiamo installare la repository da terminale tramite comando `flatpak`, assicuriamoci che GNOME Software sia chiuso e diamo:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Una volta completato il processo di installazione della repository, apriamo nuovamente lo store per visualizzare le nuove applicazioni.

### AppImage
Si tratta di una tipologia di pacchetto (non container) che porta con se tutte le dipendenze necessarie. Questo non è ufficialmente consigliato dagli sviluppatori di Silverblue ma è comunque possibile usarle senza alcun problema.

#### Installazione
Le AppImage sono formati archivio esegubili, non richiedono installazione ed è possibile eseguire direttamente da una cartella.

Tramite il portale <a href="https://www.appimagehub.com/">AppImageHub</a> è possibile scaricare AppImage per diverse applicazioni. 

Una volta scaricato il pacchetto, lo dobbiamo rendere eseguibile, per fare ciò digitiamo a terminale:

```bash
chmod +x archivio.appimage
```

Il mio consiglio è quello di creare una cartella "Applicazioni" nella propria home, ed inserire li tutte le AppImage.

### Pacchetti stratificati
La stratificazione dei pacchetti agisce modificando l'installazione ma non il sistema. Questo sistema **estende** i pacchetti con cui è composto Silverblue.

All'installazione di un nuovo pacchetto, viene creato una nuova root eseguibile del filesystem. Questa non influisce sulla root originale di sistema e ne mantiene tutti i pregi dell'immutabilità. Unico aspetto "negativo" è che ad ogni stratificazione è necessario riavviare il sistema per far si che questi vengano distribuiti nel sistema e resi disponibili.

#### Gestore pacchetti
Questo nuovo concetto di stratificazione si può usare tramite il gestore pacchetti *rpm-ostree*. Il funzionamento è sicuramente molto diverso da *dnf* e *yum*, visti precedentemente su Fedora ma l'uso è pressochè lo stesso:

* *install* seguito dal nome di un pacchetto per installarlo
* *remove* per rimuoverlo
* *update* per aggiornarlo

Nel seguente esempio vogliamo installare la console `zsh`, proseguiamo quindi con l'opzione `install` nel seguente modo:

```bash
rpm-ostree install zsh
```

effettuato il riavvio possiamo digitare `zsh` per vedere il nuovo pacchetto in funzione sullo strato creato.

Nel caso in cui volessimo rimuovere questo pacchetto, usiamo l'opzione `remove`:

```bash
rpm-ostree remove zsh
```

e riavviamo il sistema.

## Rollback
La struttura di sistema permette di conservare uno stato precedentemente dell'immagine di sistema, in modo da poter recuperare una versione precedente in pochi secondi.

Esistono due metodi per effettuare un rollback:
* **temporaneo** il quale permette appunto di tornare temporaneamente ad una immagine precedente del sistema
* **permanente**

Per accedere **temporaneamente** ad una versione precedente del sistema, ci basterà selezionare questa dal menù del boot, il quale conserverà gli ultimi stati (questi non andranno ad influire sul peso di sistema se non di pochissimi MB).

Nel caso volessimo tornare ad una precedente versione in via definitiva, possiamo sfruttare il gestore *rpm-ostree* con l'opzione `rollback`, per farlo ci basterà digitare a terminale:

```bash
rpm-ostree rollback
```

## Toolbox
In un contesto di sviluppo può tornare utile installare librerie e strumenti di sviluppo. Toolbox (preinstallato in Silverblue) permette la creazione di contenitori dove poterle installare in sicurezza. Questo torna utile soprattutto se dobbiamo installare più versioni di un dato strumento o libreria, è infatti possibile creare un contenitore con una libreria in **versione X** e un nuovo contenitore con la stessa libreria in **versione Y**.

Ogni contenitore è sicuro ed impedisce al sistema di danneggiarsi, infatti nel caso qualcosa dovesse andare storto, nel caso in cui una libreria dovesse compromettere l'esecuzione di un programma nello stesso contenitore, per dipendenza non andrà a "rompere" nulla nel sistema, il quale rimarrà inalterato. Sarà quindi possibile sistemare il contenitore o eliminarlo/ricrearlo per risolvere.

### Utilizzo di Toolbox
Creiamo il nostro primo contenitore, per farlo usiamo l'opzione `create` del comando `toolbox`:

```bash
toolbox create
```

ci verrà richiesto di scaricare una immagine OCI (Open container image), accettiamo ed attendiamo il download (circa 500MB).

Una volta terminata l'installazione posiamo entrare nel nuovo contenitore sfruttando l'opzione `enter`:

```bash
toolbox enter
```

Questa è stata una breve introduzione a Silverblue, trattandosi appunto di una distribuzione molto diversa dalle comuni. Seguiranno altre guide.


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).