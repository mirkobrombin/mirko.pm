---
title: '#howto - La struttura del filesystem Linux'
date: 2022-06-10
layout: post
author: Alphvino
author_github: Alphvino
published: false
tags:
- linux
- filesystem 
---

Ogni giorno, non solo noi, ma anche altre persone nel mondo usano distro linux.
Ognuna di quest'ultime ha le sue peculiarità, magari il package manager oppure il loro init di sistema. Probabilmente c'è solo una cosa che è molto simile, quasi spiccicata, in tutte le distribuzioni linux. La struttura del filesystem.

## Cos'è un filesystem?

Un filesystem indica il modo con il quale i file e le cartelle sono organizzate all'interno del disco fisico. All'interno di un filesystem Linux i dati vengono scritti all'interno di blocchi e successivamente vengono aggiornate tutte le tabelle e le strutture.

Attualmente, in molte distro Linux, il filesystem di base è EXT4, basato sul journaling dove la dimensione massima di un file arriva a 16TB e le dimensioni dell'intera struttura del filesystem fino a 1 exabyte. (1 milione di TB).

### Struttura del filesystem Linux

La struttura di un filesystem è molto simile tra le varie distro e tutte seguono lo standard FHS(Filesystem Hierarchy Standard). Ci possono essere piccole differenze come nel caso di Ubuntu che tende a creare nella`/`(radice di sistema) una cartella chiamata snap, non presente di default in altre distro.

- /bin -> Contiene tutti gli eseguibili richiamabili da chiunque nel sistema.
  Ad esempio il comando `rm`, `ls`, `ping` si trovano proprio qua.
  
- /boot -> Contiene tutti i file necessari all'avvio del sistema, incluso il kernel Linux.
  
- /dev -> Contiene i file di tutti i dispositivi hardware sulla macchina, come cpu, cdrom, dischi. (Sostanzialmente tutto è un file)
  
- /etc -> Contiene tutti i file di configurazione delle applicazioni system-wide
  
- /home -> Contiene le cartelle e file personali di tutti gli utenti del sistema
  
- /lib -> Contengono tutte le librerie che servono al funzionamento dei programmi che si trovano in `/bin`
  
- /lost+found -> Viene creata quando il sistema va in crash. Qui vengono salvati i file al momento del crash
  
- /media -> Contengono i file dei dispositivi removibili inseriti nel sistema, come USB
  
- /mnt -> Non è usata spesso, però è la cartella più usata per montare dischi
  
- /opt -> Contiene software applicativo di terze parti
  
- /proc -> Contiene informazioni sull'esecuzione di un processo con un particolare Process-id noto anche com pid
  
- /root -> Contiene i file e cartelle personali dell'utente root. Unico utente a non risiedere sotto `/home`
  
- /run -> Quando un'applicazione ha bisogno di salvare dati temporanei, essi verranno messi qua. La cartella non esiste sul disco ma è creata con tempfs che si trova sulla ram. A ogni reboot la cartella viene appunto svuotata.
  
- /sbin -> Molto simile a `/bin`. Contiene file eseguibili ma che si usano quasi solamente in modalità di super utente. Ad esempio programmi per eseguire manutenzione su dischi come `mount`
  
- /srv -> Contiene file di servizi che vengono usati sui server come server FTP o webserver.
  
- /sys -> Contiene informazioni utili sui dispositivi collegati al sistema. Come il modello di un disco.
  
- /tmp -> Contiene file temporanei. Rispetto a /run questa cartella può essere usata da tutti senza particolari privilegi.
  
- /usr -> Contiene eseguibili, codice sorgente, manuali, librerie di altre applicazioni
  
- /var -> Contiene file che tendono ad aumentare di dimensione come i log di sistema o di altre applicazioni.
  

### Conclusioni

Bene, oggi sei venuto a conoscenza della struttura del filesystem Linux!
Abbiamo parlato di cos'è un filesystem per finire poi con l'utilità delle varie cartelle in una comune distribuzione Linux :)
