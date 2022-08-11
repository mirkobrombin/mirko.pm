---
title: '#howto - La struttura del file system Linux'
date: 2022-06-10 07:30
layout: post
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags:
- linux
- filesystem 
---

Parliamo del file system Linux, cerchiamo di comprendere ogni cartella creata dalla nostra distribuzione che ruolo ha per il nostro sistema.

## Cos'è?

Un file system indica il modo con il quale i file e le cartelle sono organizzati all'interno del disco fisico, come devono essere scritti e come devono essere gestiti.  
Non ne esiste un solo tipo, le implementazioni sono varie, ognuna con le proprie caratteristiche, vantaggi e svantaggi. Generalmente ogni sistema operativo ha le sue preferenze inoltre, ed è capace di leggerne alcuni piuttosto che altri.
### Limiti ed funzionalità
Normalmente i parametri importanti da considerare quando si sceglie un file system anziché un altro sono: 
- La dimensione minima consentita del file.
- La dimensione massima consentita del file.
- La lunghezza massima del percorso (quindi il numero massimo di sotto cartelle gestibile).
- La tolleranza agli errori e la riparabilità dei file.
- La capacità o meno di creare snapshot e registrare ogni modifica.


### Alcune tipologie di file system
Attualmente, in molte distro Linux, il file system di base è **EXT4**, basato sul journaling dove la dimensione massima di un file arriva a `16TB` e le dimensioni dell'intera struttura fino a `1 exabyte` (*1 milione di TB*).

È anche vero che ci si sta spostando verso  **BTRFS**, di tipo copy-on-write e dotato di varie funzionalità, come quella di poter riconoscere modifiche e ripristinare a stati precedenti ogni singolo file.

Altrettanto degli di nota potrebbero essere FAT32 ed EXFAT, utilizzati su pen drive e dispositivi che devono essere condivisi tra più Sistemi operativi, sono infatti generalmente riconosciuti da ogni altro device.

### Un file system temporaneo - tmpfs

Una tipologia di file system particolare è `tmpfs`, quando una cartella viene montata tramite questo metodo, non esiste effettivamente sul disco ma viene creata sfruttando la RAM come se fosse un disco rigido. Questo ha una serie di implicazioni: 
- Il suo contenuto viene svuotato ogni qual volta si spegne il pc.
- Scrittura e lettura son ovviamente molto più veloci rispetto al disco normale.
- L'espansione dei contenuti in questa cartella è ovviamente va a diminuire il quantitativo di RAM libera e utilizzabile da programmi.

Di norma le cartelle che lo utilizzano sono: 
- La cartella dei file temporanei
- La cartella dei file del runtime
- La cartella dell'utente ospite

## Comune struttura dei file system su Linux

La struttura di un file system è molto simile tra le varie distribuzioni e tutte seguono lo standard FHS(File system Hierarchy Standard) seguito da tutti i sistemi operativi UNIX like.  
Ci possono essere piccole differenze.

- `/bin` &rarr; Contiene i software binari che dovrebbero stare alla base del nostro os, quindi software che svolgono ruoli precisi e limitati. Ad esempio il comando `rm`, `ls`, `ping` si trovano proprio qua.
  
- `/boot` &rarr; Contiene tutti i file necessari all'avvio del sistema, incluso il kernel Linux e il `grub`. A volte la cartella EFI, anche se quest'ultima potrebbe trovarsi in una cartella /efi a se stante in alcune distribuzioni. 
  
- `/dev` &rarr; Contiene i file di tutti i dispositivi hardware sulla macchina, come cpu, cdrom, dischi. (Sostanzialmente tutto è un file)
  
- `/etc` &rarr; Contiene tutti i file di configurazione delle applicazioni system-wide
  
- `/home` &rarr;  cartella forse che conoscete di più, al suo interno vi sono **tutte** le cartelle utenti. Specifico **tutte**, infatti la `/home` non contiene una home, ma *tante*, pensare il contrario è un errore comune nei neofiti, sappiate quindi che al suo interno vedrete tante cartelle ognuna chiamata con il nome dell'utente di cui contengono una home. Ad esempio `/home/nomeutente 
  `
- `/root` &rarr; Contiene i file e cartelle personali dell'utente root. Unico utente a non risiedere sotto `/home`

- `/lib` &rarr; contiene le librerie software, ovvero dei particolari binari che non sono direttamente eseguibili, ma contengono funzionalità che servono ad altri software. lib contiene tipicamente librerie a 32bit.

- `/lib64` &rarr; come lib, ma a 64 bit.
  
- `/lost+found` &rarr; Viene creata quando il sistema rileva (tramite `fsck` ad esempio) delle incongruenze sui file. I processi di recupero di dati corrotti sul file system qui usano questa cartella per tentare di ricostruire i file daneggiati, non tutti i file system per lo utilizzano (in genere gli `ext` ne fanno uso).
  
- `/mnt` &rarr; Non è usata spesso, però è la cartella più usata per montare dischi manualmente.
  
- `/opt` &rarr; Contiene software applicativo di terze parti, generamente senza codice sorgente.
  
- `/proc` &rarr; Contiene informazioni sull'esecuzione di un processo con un particolare Process-id noto anche come pid.
  
- `/run` &rarr; Quando un'applicazione ha bisogno di salvare dati temporanei, essi verranno messi qua. `run` sta per **runtime**, qui dentro vengono inserite informazioni riguardo la sessione desktop corrente, montata tmpfs, un particolare file system che sfrutta la ram anziché il disco rigido. Ad ogni reboot la cartella viene appunto svuotata. Alcune distribuzioni come arch utilizzano una loro subdirectory per montare dispositivi esterni 
  
- `/sbin` &rarr; Molto simile a `/bin`. Contiene file eseguibili ma che si usano quasi solamente in modalità di super utente. Ad esempio programmi per eseguire manutenzione su dischi come `mount`. In alcuni casi troverete che il significato del nome sta per "sudo bin", in altri troverete "system bin"
  
- `/srv` &rarr; Contiene file di servizi che vengono usati sui server come server FTP o webserver.
  
- `/sys` &rarr; Contiene informazioni utili sui dispositivi collegati al sistema. Come il modello di un disco.
  
- `/tmp` &rarr; Contiene file temporanei, anch'essa montata con tmpfs. Rispetto a /run questa cartella può essere usata da tutti senza particolari privilegi.
  
- `/usr` &rarr; Sta per user-data e contiene in genere le installazioni software, con tanto di alcuni file di configurazione per ognuno di essi.
  
- `/var` &rarr; Contiene file che tendono ad aumentare di dimensione come i log di sistema o di altre applicazioni.

- `/media` &rarr; questa cartella contiene generalmente i file system esterni montati, ma non tutte le distribuzioni la usano (vedi arch). Controllate il suo contenuto se state cercando dove è stata montata la vostra penna usb!
  

