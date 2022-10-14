---
title: "#howto - Velocizzarsi nell'uso del terminale" 
date: 2022-10-14 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: Alberto Bella
coauthor_github: al6263
published: true
tags: 
- terminale
- shortcut
---

Il terminale rappresenta lo strumento quotidiano dell'utente Linux. Vediamo un po' quali sono i modi che possono velocizzarne l'utilizzo.  



## Shortcut, scorciatoie

Partendo dalle cose più banali ma più efficaci, si hanno sicuramente le scorciatoie da tastiera che consentono di spostarsi velocemente tra i caratteri, modificarne il contenuto o richiamare altri comandi velocemente.

### Spostarsi nel testo

Spostiamoci rapidamente nel testo di un comando che **stiamo ancora scrivendo** utilizzando le seguenti scorciatoie: 

| Scorciatoia 	| descrizione |
| :---- 		| :---: |
| CTRL+A 		| Spostati ad inizio linea |
| CTRL+E 		| Spostati a fine comando |
| ALT+F 		| Si sposta a destra di una parola |
| CTRL+&rarr; 	| Come `ALT+F` |
| ALT+B 		| Si sposta a sinistra di una parola |
| CTRL+&larr; 	| Come `ALT+B` |


Nel caso di comandi che si posizionano su più linee, le shortcut `CTRL+A` e `CTRL+E` portano alla fine ed all'inizio dell'intero comando (tranne su zsh, dove se ripetute più volte permettono di andare a righe successive o precedenti).

### Shortcuts dei segnali

Il concetto di "*segnale*" nei programmi di linux è molto importante. Infatti questo è il modo in cui il sistema comunica con un software chiedendogli di interrompersi, sospendersi o altro ancora.

Alcune di queste scorciatoie potrebbero essere sovrascritte dalle impostazioni dell'applicazione che accede all'interprete di terminale. 


| Scorciatoia 	| descrizione |
| :---- 		| :---: |
| CTRL+c 	| Manda il segnale di *Interruzione immediata* ad un comando. Terminandolo |
| CTRL+d 	| Manda il carattere di *EOF* (end of file), se usato su una shell vuota esegue il logout |
| CTRL+z 	| Manda il carattere di *sospensione*, il job corrente va in background e non consuma memoria, per riaprirlo scrivere `fg` sul terminale. Le nuove versioni di nano hanno riscritto la shortcut come `CTRL+t` `CTRL+z` |


### Oh-oh, ho premuto CTRL+S (sospensione dell'output)

In alcuni terminali (e con alcuni interpreti, come bash)
 può succedere che, premendo `CTRL+S`, possa sembrare che il terminale si blocchi con la conseguente impossibilità di digitare qualunque cosa. 

Quello che accade è denominato "*sospensione dell'output*" ed è in realtà una funzione studiata per permettere all'utente di bloccare l'output visivo del terminale per immortalare un determinato attimo (utile quando ci son output molto lunghi che escono velocemente e si rischia di perdere riferimento ad una certa riga che si ritiene più utile di altre).

Quindi per sospendere l'output digitiamo `CTRL+S` e per riprendere il normale flusso `CTRL+Q`

### Tagliare, copiare ed incollare 

Uno dei primi drammi che traumatizza chi si utilizza per le prime volte un terminale di linux è sicuramente il copia e incolla.  

Infatti se si prova ad usare su una porzione di testo evidenziata sul terminale si incombe in quello che abbiamo già detto essere il segnale di interruzione immediata del comando corrente.  

Ecco perché esistono delle scorciatoie dedicate:

| Scorciatoia 	| descrizione 									|
| :---- 		| :---: 										|
| CTRL+Shift+C 	| Copia selezione mouse in clipboard di sistema	| 
| CTRL+Shift+V 	| Incolla da clipboard di sistema 				|

I comandi di cui sopra lavorano a livello di **clipboard di sistema**, ovvero quello strumento che *rende disponibile i contenuti tra più applicazioni* con, per l'appunto, l'ausilio del *sistema operativo che conserva e condivide i dati*. 

Ma non è l'unico modo per condividere i dati, alcune applicazioni hanno anche una "clipboard" interna. L'interprete di bash ad esempio ne utilizza una, vediamo come sfruttarla per "tagliare" ed "incollare" parti o tutto un comando: 

| Scorciatoia 	| descrizione 									|
| :---- 		| :---: 										|
| CTRL+U	 	| Taglia tutto quello che parte dall'inizio della riga e finisce al cursore |
| CTRL+k	 	| Taglia tutto quello che parte dal cursore e finisce con la fine della riga |
| CTRL+W	 	| Taglia la parola prima del cursore |
| ALT+d 	| Taglia la parola dopo il cursore	| 
| CTRL+Y 	| Incolla da clipboard di sistema 	| 
| ALT+Y 	| Incolla da clipboard di sistema, continuandolo a premere sostituisce con le occorrenze precedenti copiate (se ci sono)	| 
| CTRL+ALT+Y 	| Incolla l'argomento del comando precedente	| 

### Undo e Redo 

È da decidere ancora oggi se abbia salvato più vite la medicina o *CTRL+z*, l'iconica shortcut per tornare indietro nelle modifiche.   
Anche il terminale ovviamente ha una modifica che permette di tornare indietro su una cosa appena scritta (o incollata, o cancellata). 

> Nota: non si parla di rimediare all'effetto di un comando, ma solo mentre il comando lo si sta scrivendo 

| Scorciatoia 	| descrizione 									|
| :---- 		| :---: 										|
| CTRL+_	 	| Ritorna indietro incrementale |
| CTRL+x CTRL+U	| Ritorna indietro incrementale (alternativa) |
| ESC+r	 		| Ritorna indietro totale, rimuove tutte le modifiche fatte sulla linea |

Per il "Redo", ovvero quell'operazione che rifà un operazione appena ritornata indietro con l'*undo*, non c'è alcuna scorciatoia. Ma può essere impostata [tramite la readline](https://linuxhub.it/articles/howto-inputrc/).  

### Aprire il comando corrente in un editor

Una delle funzioni più utili è probabilmente quella di poter aprire il comando corrente nell'editor di testo segnato dalla variabile d'ambiente `EDITOR`.


Prima di tutto va impostata la variabile d'ambiente del nostro editor, per farlo è necessario mettere nel bashrc la seguente riga: 

```bash
export EDITOR=nano
```

Sostituendo "nano" con l'editor da terminale preferito.

Quindi è possibile usare questa scorciatoia, `CTRL+x CTRL+e`, mentre si sta scrivendo un comando. 

Il risultato sarà l'apertura dell'editor scelto con all'interno il comando che si stava scrivendo, pronto da editare con tutte le comodità che fornisce il software.

Una volta finito, va salvato e chiuso l'editor, il comando verrà scritto nella nuova forma sul terminale pronto per essere eseguito! 

### Ricerca nella history tramite shortcut

Si può navigare nella storia dei comandi passati ricercando eventualmente anche vecchie occorrenze.  

| Scorciatoia 	| descrizione 									|
| :---- 		| :---: 										|
| &uarr;	 	| navigare passo passo nei comandi precedenti |
| &darr;		| navigare passo passo nei comandi successivi (funziona se state già navigando tra i precedenti) |
| CTRL+r 		| Ricerca per termine, dopo averlo premuto scrivere parte del comando, continuare a premere per le occorrenze precedenti |

Purtroppo la scorciatoia di "forward" (ovvero la ricerca in avanti) è associata per la maggiorparte alla stessa del comando suspend (ovvero `CTRL+S`), si può pensare di ridefinirla come si vuole usando [il file inputrc](https://linuxhub.it/articles/howto-inputrc/).


## Conclusione
Quali di questi conoscevi? Ne conosci altri? Facci sapere nel nostro [gruppo telegram](https://t.me/linuxpeople)! Nei prossimi articoli discuteremo ulteriori modi per rendere più efficiente il nostro operato da terminale
