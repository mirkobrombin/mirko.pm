---

title: '#devcaffè - Confronto tra linguaggi di programmazione' 
date: 2021-11-05 09:00
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit 
tags:

- caffe 
- chiacchiere
- confronto

---



## Naufrago in un mare di linguaggi

Ci sono così tanti linguaggi di programmazione in giro, ma essi non sono certamente frutto della caduta di Babele, bensì dei numerosi bisogni dei programmatori, sempre in grado di trovare nuovi problemi da risolvere.

In questo articolo daremo un'occhiata ai seguenti linguaggi:

* Python

* JavaScript e TypeScript

* Go

* Rust

* C e C++

* Haskell

## Python

La particolarità di questo linguaggio è il suo basso livello di difficoltà.



Nonostante Python sia pieno di funzionalità intricate esso non risulta mai difficile da apprendere, ed infatti viene molto apprezzato per la sua rapidità di scrittura.



Esso viene utilizzato per quasi ogni genere di cose, da dei semplici script di installazione a intere reti neurali e questo garantisce anche la presenza di un ampio ecosistema.





L'altra faccia della medaglia?

A causa della tipizzazione dinamica risulta difficile trovare bug in fase di scrittura, ponendo quindi il programma a rischio di bug in fase di esecuzione.



Il GIL (global interpreter lock) impedisce a Python di utilizzare più thread di sistema, cosa che potrebbe risultare scomoda a molti (si intravedono piani per la sua rimozione ma si parla di un futuro remoto).



Infine uno dei più grandi svantaggi è dato dalla natura stessa del linguaggio, infatti l'interprete aggiunge non poco overhead e le prestazioni non sono il massimo comparate ad altri linguaggi.



## JavaScript e TypeScript

Attualmente uno dei linguaggi più diffusi per la scrittura di backend, nonché il più popolare lato frontend, JavaScript domina il settore web.



Viene comunemente eseguito sui browser tramite il loro interprete incorporato, tuttavia recentemente viene apprezzato anche per applicativi desktop tramite Electron (Discord e Slack sono due esempi degni di nota) oppure lato server tramite Node.js (tra alcuni dei suoi utenti troviamo LinkedIn e Uber).

Come Python, JavaScript risulta facile da imparare e dispone di un ampio parco librerie.



I lati negativi sono quasi gli stessi di python: in primis difficoltà nel trovare errori in fase di scrittura e nonostante le prestazioni notevolmente migliori, JavaScript rimane non poco pesante.



TypeScript mira a rendere più semplice trovare errori in fase di scrittura del codice introducendo tipizzazione statica. Esso sta acquisendo popolarità lato server grazie a Deno.



## Go

Linguaggio creato da Google con il solo scopo di essere semplice e rendere chiunque produttivo, Go è uno dei linguaggi più in voga al momento della scrittura.



Esso mette nelle mani dello sviluppatore tutto il necessario per creare microservizi o applicativi desktop.



La sua particolarità più grande sono dei green thread chiamati goroutine e come Python e JavaScript utilizza garbage collection ma a differenza loro non è interpretato, bensì compilato per garantire prestazioni migliori.



## Rust

Nato da Mozilla per poter scrivere codice prestante e a basso livello in modo sicuro, Rust ha detenuto numerose volte il titolo di linguaggio più amato nei sondaggi di Stack Overflow.

Alcuni esempi dell'uso di Rust sono Deno e i backend di Discord e Dropbox.



Le sue particolarità più grandi sono il suo paradigma di gestione della memoria chiamato ownership e l'immensa predisposizione alla metaprogrammazione tramite macro.



Sfortunamente nonostante la presenza di una potente strumentazione e un'ampia documentazione, Rust viene considerato particolarmente difficile a causa della su verbosità e dell'inusuale gestione della memoria.



## C e C++

Notoriamente in cima ai benchmark, C gode del parco software più ampio mai creato con tutte le librerie più famose scritte in esso.



C è l'eterno giovane, è possibile fare tutto in esso, tuttavia esso potrebbe non risultare particolarmente amichevole a chi è alle prime armi a causa del suo livello relativamente basso e delle poche astrazioni.

Può risultare difficoltoso catturare errori in anticipo a causa della sua gestione della memoria manuale.



C++ prova a rendere C più sicuro e semplice aggiungendo numerose astrazioni, aiutando l'utente nella gestione della memoria e introducendo il paradigma di programmazione ad oggetti.



# Haskell

Haskell è un linguaggio puramente funzionale, questo vuol dire che non segue molte delle regole alle quali linguaggi impartivi come C ci hanno abituato.



Esso è particolarmente apprezzato in ambito matematico e per l'intelligenza artificiale.

Facebook attualmente usa Haskell per Sigma, il suo sistema di filtraggio dello spam.



Haskell viene spesso apprezzato per le prestazioni elevate raggiunte grazie alla valutazione lazy e altre ottimizzazioni, senza contare i benefici che l'uso di un linguaggio puramente funzionale possono dare alla nostra mente.



Sfortunamente anch'esso viene spesso considerato ostile a causa del paradigma poco diffuso e della sua particolare sintassi.



## Cosa ne pensi?f

Hai domande da porci o vorresti vedere altri linguaggi trattati?

Vieni a trovarci sul nostro [gruppo Telegram](https://t.me/linuxpeople)!
