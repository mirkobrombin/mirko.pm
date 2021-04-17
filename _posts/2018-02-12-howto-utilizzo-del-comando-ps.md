---
title: '#howto - Utilizzo del comando ps'
published: 2018-02-12
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - gnome  
  - systemd
---
Comprendere la gestione dei processi di Linux può essere utile sia per gli sviluppatori che per gli amministratori di sistema. Il comando **ps** è un modo eccellente per ottenere informazioni sui processi in esecuzione.

### Cos'è un processo?

Un processo è una serie di attività eseguite dal sistema operativo. Nella maggior parte dei casi le attività sono definite in un programma per computer (una serie di istruzioni). Il risultato dell'esecuzione di questi programmi sono processi. Poiché Linux è un sistema operativo **multiprocessing**, i processi possono essere eseguiti contemporaneamente e indipendentemente l'uno dall'altro. Ogni processo ha le proprie autorizzazioni, lo spazio degli indirizzi di memoria virtuale e così via.

Un processo può accedere e utilizzare risorse di sistema come memoria, CPU, file sul file system e dispositivi fisici. Per gestire e controllare l'accesso a queste risorse, il kernel deve tenere traccia di quali processi sono in esecuzione e quali risorse sono in uso. Il kernel fa ciò usando una struttura dati per rappresentare i processi. Questa struttura di dati è abbastanza grande e complessa, quindi questo articolo si concentra solo su alcune categorie di informazioni.

### Stato

Ogni processo può essere in uno dei seguenti stati: RUNNING, WAITING, STOPPED o ZOMBIE. RUNNING e STOPPED sono relativamente semplici da capire. Lo stato WAITING indica che il processo è in attesa di un evento o di accedere a una risorsa, ad esempio in attesa dell'input da tastiera. Lo stato di ZOMBIE descrive un processo che per qualche motivo viene fermato ma ancora presente nell'elenco dei processi gestiti dal kernel.

### Identifiers/PID

Ogni processo nel sistema ha un identificatore di processo o PID. Il processo ha anche identificatori utente e di gruppo utilizzati per controllare l'accesso alle risorse del sistema.

### Relazioni

Ogni processo, ad eccezione di quello iniziale, ha un processo genitore. Il kernel tiene traccia della relazione gerarchica tra i processi.

### Memoria virtuale

Questa categoria viene utilizzata dal kernel per mappare la memoria virtuale di ogni processo nella memoria fisica del sistema. La memoria virtuale di un processo è uno spazio di indirizzi virtuali che contiene codice eseguibile e dati provenienti da fonti diverse. Ad esempio, quando un programma utilizza una libreria condivisa, il codice e i dati della libreria sono collegati alla memoria virtuale di questo processo.

## Il comando ps

Ora che hai un'idea migliore di cosa sia un processo, ecco uno sguardo al comando **ps** e come usarlo per ottenere informazioni sui processi in esecuzione sul nostro sistema. Per stampare rapidamente tutti i processi attivi, utilizzare il seguente comando:

    $ ps -ef 
    UID PID PPID C STIME TTY TIME CMD
    root 1 0 0 20:31 ? 00:00:03 /usr/lib/systemd/systemd --switched-root --system --deserialize 24
    root 2 0 0 20:31 ? 00:00:00 [kthreadd]
    root 4 2 0 20:31 ? 00:00:00 [kworker/0:0H]
    ....

Notare l'uso dell'opzione **-e** per visualizzare tutti i processi e **-f** per visualizzare il formato completo. Puoi anche usare **-F** per il formato completo esteso. Il formato completo stampa queste otto colonne:

**UID** = identificatore utente  
**PID** = identificativo del processo  
**PPID** = identificativo del processo genitore  
**C** = utilizzo della CPU  
**STIME** = orario in cui è iniziato il processo  
**TTY** = terminale  
**TIME** = sistema combinato e tempo di CPU utente utilizzato dal processo fino a quel momento  
**CMD** = nome del processo incluso comando

Il formato completo esteso aggiunge altre tre colonne all'output visualizzato:

    $ ps -eF
    UID PID PPID C SZ RSS PSR STIME TTY TIME CMD
    root 1 0 0 57658 11988 3 20:31 ? 00:00:03 /usr/lib/systemd/systemd --switched-root --system --deserialize 24
    root 2 0 0 0 0 0 20:31 ? 00:00:00 [kthreadd]
    root 4 2 0 0 0 0 20:31 ? 00:00:00 [kworker/0:0H]
    root 6 2 0 0 0 0 20:31 ? 00:00:00 [mm_percpu_wq]

Le nuove colonne sono:

**SZ** = utilizzo della memoria virtuale  
**RSS** = utilizzo della memoria reale (dimensione del set residente)  
**PSR** = processore a cui è attualmente assegnato il processo  
È inoltre possibile personalizzare l'output del comando ps. Utilizzare l'opzione **-o** per specificare quali colonne si desidera vengano visualizzate. Questo può essere utile quando si usa ps in uno script.

    $ ps -ef -o pid,cmd
    PID CMD
    1   /usr/lib/systemd/systemd --switched-root --system --deserialize 24
    2   [kthreadd]
    4   [kworker/0:0H]

Un'altra opzione utile è **-u**, che consente di filtrare i processi visualizzati dall'ID utente. Ad esempio, per visualizzare tutti i processi di proprietà dell'utente root, eseguire un comando come questo:

    $ ps -u root -o user,pid,cpu,cmd 
    USER       PID   CPU CMD
    root         1   -   /usr/lib/systemd/systemd --switched-root --system --deserialize 24
    root         2   -   [kthreadd]
    root         4   -   [kworker/0:0H]
    root         6   -   [mm_percpu_wq]
    root         7   -   [ksoftirqd/0]

Un altro esempio per stampare i processi di proprietà dell'utente gdm.

## Debug con ps

Il comando ps è utile quando esegui il **debug** di un'applicazione. Più in particolare, è possibile utilizzarlo per determinare le risorse utilizzate da un'applicazione. Per elencare tutti i thread per un particolare processo, eseguire un comando come questo:

    $ ps -C firefox -L -o pid,tid,pcpu,state,nlwp,cmd 
     PID  TID  %CPU S NLWP COMMAND 
     3015 3015 7.6  S 69   /usr/lib64/firefox/firefox 
     3015 3040 0.0  S 69   /usr/lib64/firefox/firefox 
     3015 3041 0.0  S 69   /usr/lib64/firefox/firefox 
     3015 3042 0.5  S 69   /usr/lib64/firefox/firefox 
     3015 3043 0.3  S 69   /usr/lib64/firefox/firefox 
     3015 3044 0.0  S 69   /usr/lib64/firefox/firefox
    ....

Questo esempio usa l'opzione **-C** per selezionare i processi che usano il comando firefox. L'opzione **-L** mostra i thread per quel processo. L'opzione **-o** visualizza nuovamente le colonne selezionate, in questo caso PID e CMD, insieme ad alcune altre nuove colonne:

**TID** = identificatore di thread  
**PCPU** = percentuale di utilizzo della CPU  
**STATO** = stato del processo, come visto in precedenza in questo articolo. Nell'esempio i thread sono nello stato S, che significa sleep interrompibile: questi processi sono in attesa di un evento da eseguire.  
**NLWP** = numero di processi luminosi; nell'esempio sopra, firefox utilizza 69 thread

Infine, puoi usare ps per tenere traccia di una perdita di memoria. È possibile monitorare **Resident Set Size (RSS)** per avere un'idea della quantità di memoria RAM utilizzata da un processo.

    $ ps -eF --sort -rss
    PID  PPID C  SZ     RSS   PSR  STIME TTY  TIME     CMD
    3015 2352 11 807180 761056 3   14:20 tty2 00:06:47 /usr/lib64/firefox/firefox
    3152 3015 7  611589 394944 0   14:20 tty2 00:04:23 /usr/lib64/firefox/firefox
    3087 3015 1  598306 350224 0   14:20 tty2 00:00:40 /usr/lib64/firefox/firefox
    3715 3015 2  579774 314300 1   14:44 tty2 00:00:46 /usr/lib64/firefox/firefox
    2352 2235 2  921991 228908 1   14:15 tty2 00:01:50 /usr/bin/gnome-shell

Questo comando utilizza l'opzione **-sort -rss** per mostrare il processo con l'RSS più alto alto. È possibile ordinare i processi nella direzione opposta utilizzando la seguente opzione **-sort rss**.