---
title: '#howto - Utilizzo del comando top'
description: "Spesso e volentieri, lavorando da riga di comando, torna utile verificare i dettagli relativi un processo.."
date: 2018-07-12
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Spesso e volentieri, lavorando da riga di comando, torna utile verificare i dettagli relativi un processo, ad esempio identificare quello che sta consumando maggiori prestazioni in quel momento. In questo caso entra in gioco il comando top.

## Sintassi e utilizzo

Il comando é di semplice apprendimento é non richiede configurazioni avanzate, eccone di seguito la sintassi:

    top [opzioni]

Il comando a livello pratico é semplicissimo, basterà infatti eseguirlo per ricevere tutte le informazioni di utilizzo e processi del sistema.

## Comprensione schema

L'output (immagine qui sopra) sembra complicato a primo impatto ma é in realtá di facile comprensione e, una volta memorizzato lo schema, diventerá uno strumento indispensabile nella vostra produttività.

Iniziamo con la prima riga che contiene in ordine:

*   ora corrente
*   tempo in cui il sistema è attivo e in esecuzione
*   sessioni utente attive
*   carico medio sul sistema (rispettivamente per un minuto, cinque minuti e quindici minuti)

La seconda riga contiene le seguenti informazioni:

*   totale processi
*   il numero di processi in esecuzione
*   quelli in sospensione
*   quelli interrotti
*   quelli nello stato di zombie

La terza riga contiene informazioni in percentuale sull'utilizzo della CPU, ecco le definizioni:

*   us = user - del carico dei processi utente
*   sy = system -  del carico dei processi di sistema
*   ni = nice - del carico dei processi con priorità di aggiornamento
*   id = idle - di inattività della cpu
*   wa = I/O wait - dei processi in attesa di operazioni
*   hi - di CPU che servono interrupt hardware
*   si - di CPU che servono interrupt software
*   st - di consumo da altre attività come ad esempio la macchina in hypervisor da cui eseguiamo top

La quarta e quinta riga sono dedicate alla memoria fisica RAM e Swap, abbiamo:

*   Memoria totale
*   Memoria in uso
*   Memoria libera
*   Buffer/Cached

L'ultimo componente é il piú importante ossia, la lista dei processi in uso e vengono forniti con le seguenti informazioni:

*   PID - ossia l'ID del processo
*   USER - il proprietario
*   PR - la priorità con cui é stato eseguito
*   NI - il valore NICE (quanto tempo di CPU dedicare all'esecuzione del processo)
*   VIRT - memoria virtuale in uso
*   RES - memoria fisica in uso
*   SHR - memoria condivisa
*   S - lo stato  
    - S = Riposo  
    - R = Esecuzione  
    - Z = Zombie
*   %CPU - carico sulla CPU
*   %MEM - carico sulla RAM
*   TIME+ - tempo di attività
*   COMMAND - il nome identificativo

## Terminare i processi

Terminare un processo da top é semplice, premere "K" e nella parte alta della schermata verrà chiesto il PID del processo che si vuole terminare.

    PID to signal/kill [default pid = 8274]

## Cambiare la priorità

Come nell'esempio precedente, basterà premere un tasto dopo aver prelevato il PID del processo interessato. In questo caso dovremo premere "R", inserire il PID e la priorità.

    PID to renice [default pid = 8274]
    Renice PID 8274 to value

## Limitare i processi utente

Non sempre é facile utilizzare top, sopratutto in situazioni di caos e su macchine condivise con piú utenti.

Fortunatamente é possibile impostare top per lavorare con un solo utente anziché tutti. Come per gli esempi precedenti, una volta avviato top basterá premere un comando, in questo caso digitiamo "U" e inseriamo l'username dell'utente interessato, una volta confermato ci verrá mostrata, non piú la schermata completa dei processi di ogni utente di sistema ma solo quelli dell'utente che abbiamo richiesto.

Questo comando é molto utile affiancato al comando "w" di cui [abbiamo parlato](https://linuxhub.it/article/howto-utilizzo-del-comando-w) in un precedente #howto.

Per dubbi e chiarimenti, utilizzate il box dei commenti qui sotto. 

_Good *nix_ **__Mirko_**