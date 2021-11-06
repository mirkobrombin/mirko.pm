---
title: '#devcaffè - Naufrago in un mare di linguaggi' 
date: 2021-11-05 16:20
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit 
tags:
- caffe 
- chiacchiere
---

Ci sono così tanti linguaggi di programmazione in giro ma essi non sono certamente frutto della caduta di Babele, bensì dei numerosi bisogni dei programmatori sempre in grado di trovare nuovi problemi da risolvere.

In questo articolo daremo una breve occhiata ai seguenti linguaggi:

* Python
* Java
* JavaScript 
* TypeScript
* Go
* Rust
* C 
* C++
* Haskell



Ogni sezione, divisa propriamente in sottosezioni riguardanti i pro e i contro, tratterà i seguenti fattori:

- Paradigmi di programmazione
- se è compilato o interpretato ( o entrambi )
- influenze e similarità
- tipizzazione



Ecco un glossario di alcuni termini che si utilizzeranno nel corso dell'articolo: 

| Termine                             | Significato                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| Tipizzazione                        | Definisce se un linguaggio di programmazione definisce o meno il tipo delle variabili che usa |
| Programmazione orientata ad oggetti | Esiste il concetto di classe o oggetto, cioè un elemento informatico che contiene variabili e utilizza metodi per mutarsi |
| Programmazione dinamica             | Un linguaggio riesce a determinare il tipo di una variabile anche se non specificato in modo chiaro |
| Programmazione funzionale           | Un linguaggio di programmazione in cui l'utilizzo delle procedure assume la forma delle funzioni matematiche `f(x)=y`. Spesso questo genere di paradigma viene introdotto da elementi come funzioni lambda o funzioni anonime |
| garbage collector                   | è un elemento dei linguaggi che toglie dalla memoria elementi non più utilizzati |
| macro                               | è una porzione di codice che viene sostituita a tempo di compilazione e quindi non pesa nel runtime |

## Python

La particolarità di questo linguaggio è il suo basso livello di difficoltà, con una sintassi simile alla scrittura di pseudocodice.  È un linguaggio interpretato, orientato ad oggetti.

### pro

- Nonostante Python sia pieno di funzionalità intricate esso non risulta mai difficile da apprendere, ed infatti viene molto apprezzato per la sua rapidità di scrittura. 
- Viene utilizzato per quasi ogni genere di cosa: da dei semplici script di installazione a intere reti neurali
  -  questo garantisce anche la presenza di un ampio ecosistema (anche attraverso il suo package manager, *pip*).
- La sua natura da linguaggio interpretato favorisce il check immediato di eventuali dubbi che si creano durante la scrittura dei propri programmi
- È fortemente educativo per la pulizia del codice, infatti l'indentazione è obbligatoria.



### contro 

- A causa della tipizzazione dinamica risulta difficile trovare bug in fase di scrittura e rende difficile l'uso di Linkers e documentazioni.

- Il GIL (global interpreter lock) impedisce a Python di utilizzare più thread di sistema, cosa che potrebbe risultare scomoda a molti (si intravedono piani per la sua rimozione ma si parla di un futuro remoto)
- Le prestazioni rispetto ad altri linguaggi sono scadenti per via dell'interprete che aggiunge overhead
- Dipende strettamente dall'indentazione, per cui potrebbe creare problemi se si indenta in maniere diverse.




## JavaScript

Attualmente uno dei linguaggi più diffusi per la scrittura di backend, nonché il più popolare lato frontend, JavaScript domina il settore web.  La sua sintassi è simile per certi versi a quella dei linguaggi di programmazione Orientata agli Oggetti più famosi come Java e C++, ma contiene alcuni elementi che ricordano i linguaggi di scripting.  

È un linguaggio interpretato ( il suo interprete più famoso è V8 di chromium e node ), orientato ad oggetti e con elementi di tipo funzionale. 

### pro 

- È multi piattaforma 
- Ha un parco librerie molto ampio che spaziano dalle utility web a quelle desktop, queste possono essere facilmente installate tramite il suo package manager: `npm`
- Tramite lo stesso npm è possibile scaricare anche del software scritto in js che si può utilizzare standalone
- Possiede svariati framework front-end. Tra i più famosi Electron ( che ha aiutato a diffondere svariate applicazioni su più piattaforme )
- Essendo molto utilizzato in ambito web, semplifica parecchio le chiamate ad API e servizi esterni.
- Il debug può avvenire direttamente tramite browser 
- Ha una sintassi molto semplice, dinamica e poco restrittiva

### contro 

- È un linguaggio molto confusionario, la quale tipizzazione debole rende alcuni meccanismi totalmente contro intuitivi che portano spesso molti bug ed errori
-  Il parco software ( e framework ) di npm contiene spesso librerie deprecate con gravi problemi anche di sicurezza
- La gestione delle dipendenze è molto intricata e spesso si tendono a formare catene di dipendenza di svariati Megabyte (che riempiono la nostra directory *node_modules*)
- L'interprete aggiunge overhead sia di computazione che di spazio nelle applicazioni grafiche che lo devono includere



## TypeScript

TypeScript è un linguaggio creato da Microsoft che estende Javascript introducendo i meccanismi della tipizzazione forte e che quindi mira a rendere più semplice trovare errori in fase di scrittura del codice nonché rendere la struttura del codice più solida.

È un linguaggio compilato, ma il risultato della compilazione è un file javascript che verrà poi eseguito con node. È il principale attore di tecnologie come Angular e React js. 

 

### pro 

- Estende la sintassi di Javascript, quindi si può essenzialmente utilizzare sia con una sintassi debole che una forte
- Il compilatore restituisce messaggi di errore puntuali, molto chiari che aiutano ad identificare errori 
- Comprende diversi meccanismi di programmazione che semplificano in modo unico la vita del programmatore stesso, ma non è obbligatorio usarli 

### contro 

- Non è obbligatorio usare la sintassi di Typescript, il che può far ricadere un programmatore poco esperto in uno qualsiasi dei problemi già sopra citati
- La compilazione di progetti grossi può essere molto elevata 
- Alla fine viene eseguito come codice javascript, alcuni problemi potrebbero derivare da questo ma non essere facilmente individuabili a causa del fatto che su typescript non esistono errori evidenti 



## Java

 È uno dei linguaggi più longevi e completi. Didatticamente parlando è spesso utilizzato per l'apprendimento della programmazione procedurale ed orientata ad Oggetti. Fino a pochi anni fa era anche il linguaggio più utilizzato al mondo.     

È un linguaggio compilato e poi interpretato, questo doppio approccio ha reso possibile la massima compatibilità con tutti i sistemi: ogni sorgente java viene prima compilato in un linguaggio intermedio chiamato bytecode, poi viene interpretato da un software chiamato Java Virtual Machine (JVM) che viene rilasciato per quasi tutti i sistemi software e hardware.  È un linguaggio imperativo, orientato ad oggetti, possiede meccanismi di reflection e concorrenza ( che viene poi ottimizzata dalla JVM ).  

Ha ricevuto forti influenze da C e C++, ma possiede meccanismi che rendono nascosta la gestione dei puntatori per evitare problematiche allo sviluppatore.

### pro

- Scrivi una volta, esegui ovunque il tuo codice ( completa indipendenza dalla piattaforma, sia GUI che BE )
- Ha un vastissimo parco software incluso e da terze parti, anche facilmente raggiungibile tramite il portale di Maven ( project e dependency manager non ufficiale )
- Fino alla versione 8, ogni versione di Java era perfettamente retrocompatibile. Ancora oggi è uno dei linguaggi che più di tutti assicura la retrocompatibilità se pur ora con qualche meccanismo deprecato 
- Possiede un suo sistema di "impacchettamento" del software, in grado di generare degli archivi eseguibili da ogni JVM
- Esiste un gran numero di software di sviluppo che lo supportano nativamente offrendo meccanismi di compilazione, building, debugging e strutturazione dei progetti automatizzati e incorporati
- Il sistema di import dei moduli è strutturato attraverso un meccanismo di classpath che permette la visibilità di tutto il progetto ed anche di codici esterni al progetto stesso.
- Ha uno dei più sofisticati Garbage Collector nel mondo della programmazione
- Possiede una buona documentazione 
- Possiede un meccanismo di generazione della documentazione che trasforma commenti del codice in pagine html (`javadoc`)
- Ha una libreria GUI nativa indipendente dalla piattaforma (facilmente estendibile)

### contro 

- La sua sintassi ormai vecchia e verbosa inizia a pesare agli sviluppatori.
- La libreria GUI nativa ha uno stile notoriamente "vecchio" e poco User Friendly
- Non incoraggia la pulizia del codice
- La curva di apprendimento è abbastanza ripida, senza una buona guida o insegnante è un linguaggio difficile e si rischiano molti errori 
- Dipendendo da un software esterno per la sua esecuzione, negli anni java è stato al centro di numerosi security issues indipendenti dai programmatori 



> **Cerchi come programmare in java** ?  
>
> Dai un occhiata [alla nostra guida](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java/)



## Go

Linguaggio creato da Google con il solo scopo di essere semplice e rendere chiunque produttivo, Go è uno dei linguaggi più in voga al momento della scrittura.

È un linguaggio Orientato ad Oggetti, concorrente, funzionale e imperativo, è anche un linguaggio compilato molto simile a C ed altri linguaggi orientati ad oggetti ed ha una tipizzazione forte. Viene utilizzato per lo più per creare micro servizi o applicativi desktop.

### pro 

- Ha una gestione molto avanzata e leggera della concorrenza ( le go routine o green thread ). I thread sono virtuali e gestiti tramite libreria, non pesano quindi sulla concorrenza di sistema. 
- Ha un garbage collector molto performante 
- La sua sintassi è molto pulita e contiene elementi di programmazione funzionale che rendono il codice elegante 
- Possiede un package manager integrato
- Anche se tipizzato fortemente, è dinamico e flessibile 
- Le performance di GO sono comparabili a quelle di Java o C 

### Contro 

- I green thread rendono più difficoltosa la gestione della thread safety 
- Nativamente non possiede alcun framework per la gestione del Front end 
- La sua dinamicità e semplicità può indurre facilmente in cattive abitudini di programmazione 







## Rust

Nato da Mozilla per poter scrivere codice prestante e a basso livello in modo sicuro. Ha una tipizzazione forte, è compilato con paradigma orientato ad oggetti ed elementi di programmazione funzionale. Riceve forti influenze da C e C++.  

Alcuni esempi dell'uso di Rust sono Deno e i backend di Discord e Dropbox.  



### pro 

- È un linguaggio dalle alte prestazioni in termini di velocità 
- Gestione safe della memoria: non ha un Garbage collector, ma viene comunque deallocata la memoria tramite istruzioni inserite in fase di compilazione.
- Gestione thread safe: il compilatore impedisce la gestione indeterminata di azioni concorrenti
- Consente la programmazione dinamica
- Buona documentazione 

Le sue particolarità più grandi sono il suo paradigma di gestione della memoria chiamato ownership e l'immensa predisposizione alla metaprogrammazione tramite macro.

### contro 

- Il suo paradigma di gestione della memoria nonostante prevenga perdite e dimenticanze tende ad essere complessa da afferrare
- Ha una curva di apprendimento molto ripida



## C

Notoriamente in cima ai benchmark, C gode del parco software più ampio mai creato con tutte le librerie più famose scritte in esso. È un linguaggio che si avvicina molto di più al basso livello, ma consente di utilizzare anche sofisticati meccanismi che non sono in genere accessibili da altri linguaggi ( come la programmazione `SIMD` )  

È un linguaggio imperativo e fortemente tipizzato e compilato.



### pro 

- Se sfruttato a dovere, è il linguaggio dalle prestazioni più elevate
- Possiede di utilizzare meccanismi molto vicini al livello macchina, generalmente inaccessibili da altri linguaggi 
- È il padre di qualunque altro linguaggio ad alto livello ed ha una sintassi semplice 
- Fa uso di macro



### contro 

- È un linguaggio molto difficile da usare
- Non ha gestione della memoria automatica
- Non ha gestione dei thread safe
- È fortemente dipendente dalla piattaforma
- Non ha una libreria GUI nativa 
- Il processo di building è macchinoso 
- Non ha package o dependency manager



## C++

L'evoluzione di C, prova a rendere il linguaggio Object Oriented. Nonostante non sia il primo linguaggio orientato ad oggetti mai creato, è quello probabilmente che si utilizza da più tempo  



### pro 

- possiede meccanismi di alto livello 
- Tutti gli altri pro di c 

### contro 

- tutti i contro di C 





## Haskell

Haskell è un linguaggio puramente funzionale, questo vuol dire che non segue molte delle regole alle quali linguaggi impartivi come C ci hanno abituato.  

Esso è particolarmente apprezzato in ambito matematico e per l'intelligenza artificiale, inoltre Facebook attualmente usa Haskell per Sigma, il suo sistema di filtraggio dello spam.  

È fortemente tipizzato.



### pro

- È molto performante, soprattutto grazie alla sua parallelizzazione nativa
- Il codice è minimalista ed elegante 
- Possiede diversi meccanismi di ottimizzazione come la valutazione lazy 
- Ha una gestione sicura degli accessi in memoria

### contro 

- Ha una curva di apprendimento molto, molto, molto ripida
- La sua natura di programmazione puramente funzionale tende a rendere i codici sorgenti incomprensibili
