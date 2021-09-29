---
title: '#howto - Installazione di CentOS 8 Stream da Netinstall'
date: 2020-10-19
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  - bash
---
Con l'arrivo di **RHEL 8**, e di conseguenza **CentOS 8**, è stata annunciata la prima rolling-release di CentOS, una versione che si pone tra Fedora e RHEL come ciclo di rilascio.

Precedentemente, la sequenza di rilasci era così strutturata:
- **Prima fase** ossia Fedora, con ogni aggiornamento destinato alle future release di RHEL (upstream)
- **Seconda fase**, cioè RHEL la quale ottiene tutto ciò che precedentemente vedeva una Fedora stabile (downstream)
- **Terza fase** CentOS (non stream), ossia una copia di tutto ciò che ottiene RHEL

Con l'arrivo di Stream, la struttura cambia leggermente e si pone fra la prima e la seconda fase, ottenendo aggiornamenti prima di RHEL.

## Download
Prima di tutto dobbiamo ottenere l'immagine ISO della netinstall, questa è presente col nome *boot* sul sito. Colleghiamoci quindi alla pagina di <a href="https://www.centos.org/centos-stream/">download</a> e nella tabella che ci si presenta, scegliamo l'architettura di cui abbiamo bisogno (probabilmente *x86_64*), e nella pagina che si apre scegliamo uno dei mirror (il primo della lista è consigliato in base alla propria regione).

Nella directory che si apre troviamo:

```
../
..
CentOS-Stream-8-x86_64-20201007-boot.iso  
CentOS-Stream-8-x86_64-20201007-boot.iso.manifest 
CentOS-Stream-8-x86_64-20201007-dvd1.iso  
CentOS-Stream-8-x86_64-20201007-dvd1.iso.manifest 
```

a noi interessa la *boot* ISO, quindi `CentOS-Stream-8-x86_64-20201007-boot.iso`.

## Creazione del supporto
Una volta ottenuta la copia dell'immagine ISO, procediamo alla creazione di un supporto di installazione. In merito a questo vi rimando a <a href="https://linuxhub.it/articles/howto-creare-un-supporto-usb-avviabile-usando-dd">questa guida</a>.

## Installazione
Riavviamo la macchina destinata ad ospitare CentOS Stream, col supporto di installazione. Una volta avviato Anaconda (l'installer grafico), selezioniamo la lingua desiderata e ci dovremmo trovare di fronte ad una schermata come la seguente:

![Centos Stream Anaconda Installer](storage/centos8-stream-anaconda.png)

Ad eccezione delle sezioni:
- Keyboard (tastiera)
- Language supporto (supporto linguistico)
- Time & Date (data e ora)
- Network and Host name (connettività)
- Installation Destination (destinazione installazione/partizionamento)

che non richiedono spiegazione, tutte le altre devono essere configurate.

### Partizionamento
In questa guida non andremo a coprire nel dettaglio il partizionamento dei dischi poichè si tratta di una operazione già estremamente semplificata da Anaconda.

#### RAID
Nel caso di installazione su più dischi, ci viene incontro l'installer. Selezionando tutti i dischi che vogliamo dedicare e scegliendo il partizionamento automatico, Anaconda creerà uno o più volumi logici nello stesso gruppo LVM da cui andrà poi a creare le partizioni necessarie per l'installazione. Il processo è automatizzato.

Nel caso di partizionamento manuale, può essere utile tenere sotto mano la struttura base di una installazione CentOS 8:

- **/** xfs 70GB
- **/boot** xfs 1024MB
- **/boot/efi** EFI 600MB
- **/home** xfs (la rimanenza del disco)
- **swap** (in base alla dimensione della memoria installata)

### KDUMP
Una delle sezioni è *KDUMP*, dove è possibile scegliere di abilitare o disabilitare il sistema di monitoraggio dei crash del kernel. Questo sistema è utile su installazioni server e ambienti in produzione ma riserva una parte di memoria per il servizio.

Consiglio di tenerlo disattivato su installazioni dedicate a Workstation.

### Creazione utente
Di base l'account *root* è disabilitato e non ci sono altri utenti nel sistema. Per abilitare l'account root possiamo semplicemente aggiungere una password dalla sezione dedicata. Per aggiungere altri utenti ci portiamo alla sezione User Creation (*Creazione Utente*), dove  è indispensabile spuntare la voce "Make this user administrator" (*Rendi amministratore questo utente*) nel caso non fosse stata impostata una password per l'account root. Questo ci impedisce di venir tagliati fuori dal sistema quando abbiamo la necessità di installare altri pacchetti o effettuare modifiche a file di configurazione protetti.

### Software
Per quanto riguarda l'installazione da netinstall, è necessario configurare la repository da cui scaricare tutti i pacchetti necessari all'installazione del sistema.

#### Sorgente installazione
Portiamoci alla sezione dedicata, qui ci si presenta una schermata in cui è possibile fare due scelte:
- utilizzare i server Red Hat come repository di installazione
- utilizzare server di terze parti

Nel primo caso **Red Hat** richiede una licenza valida, proseguite oltre se non è il vostro caso.

Selezioniamo la seconda opzione e nel primo selettore scegliamo *https*, nell'area di testo accanto andremo ad inserire un mirror compatibile col contesto, ad esempio per utilizzare il mirrror GARR andremo ad inserire `centos.mirror.garr.it/centos/8-stream/BaseOS/x86_64/os/`. Infine, nel selettore successivo selezioniamo *repository URL*.

Una volta ultimate e confermate le modifiche, procediamo con la prossima sezione.

#### Selezione software
Qui possiamo decidere quale software installare nel sistema. Ci vengono proposti diversi contesti d'utilizzo:
- Server with GUI (server con interfaccia grafica)
- Server (in un contesto generale)
- Minimal Install (installazione minimale del sistema)
- Workstation (destinata all'uso su PC desktop e portatili)
- Custom Operating System (Sistema Operativo Personalizzato)
- Virtualization Host

Nel caso di installazione su **Server** (e quindi di installazione dedicata ad uso web server, database server o ad esempio server git e similari) possiamo scegliere *Server* o *Server with GUI*.

Nel caso di uso su **PC Desktop e portatili**, andremo a scegliere *Workstation*. In questo caso verrà preinstallato e configurato GNOME come Desktop Environment e GDM come Desktop Manager.

Per ogni contesto è possibile scegliere e aggiungere pacchetti aggiuntivi nella colonna di destra.

Una volta completata la scelta del software da installare ed in generale tutte le sezioni dell'installazione, proseguiamo con l'installazione vera e propria.

## Aggiornamenti
CentOS Stream annuncia di effettuare anche più aggiornamenti al giorno. A differenza delle precedenti versioni, qui il gestore pacchetti è *dnf* e non *yum* (il quale diventa un semplice alias a dnf stesso).

Quindi come per Fedora e RHEL 8, per aggiornare:

```bash
dnf upgrade
```

per installare pacchetti:

```bash
dnf install <pacchetto>
```

### EPEL
Possiamo abilitare le repository EPEL (Extra Packages for Enterprise Linux) via dnf:

```bash
dnf install epel-release
```

