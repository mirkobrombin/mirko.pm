---
title: '#howtodev - Metodi ricorsivi e ordinamento dei vettori in java' 
date: 
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags: 
- java
---



Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi fondamentale per tantissime aziende che lavorano nel mondo IT. 



## Obiettivi

In questo articolo verranno affrontati i seguenti argomenti:

- il problema dell'ordinamento dei vettori;
- i metodi di ordinamento classici in java;
- divide et impera nei vettori;



## Prerequisiti   

I requisiti per la piena comprensione di questo articolo sono stati affrontati nell'articolo:   

[*metodi ricorsivi in java*](https://linuxhub.it/articles/howtodev-metodi-ricorsivi-java)  

 

E nei precedenti.  
Se siete novizi di Java potete iniziare direttamente da [*Introduzione alla programmazione java*](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java)



## Il problema dell'ordinamento dei vettori

Uno dei problemi più studiati nel mondo dell'informatica è come effettuare una ricerca in maniera veloce ed efficiente.  

I termini di paragone utilizzati sono lo spazio occupato ed il tempo. 

Per il calcolo delle prestazioni in tal senso viene, in genere, utilizzato un input di dati teoricamente infinito, senza mettere su troppa notazione matematica, questo comporta che se indichiamo infinito con &#8734; e con **c** un qualunque numero sappiate che: 

- *&#8734; + c = &#8734;*  ( una somma di un numero con infinito non modifica il risultato )
  - stessa cosa per la sottrazione 
- *c&#215;&#8734; = &#8734;*  ( una moltiplicazione di un numero con infinito non modifica il risultato )
  - stessa cosa per la divisione 
- *&#8734; + &#8734; = &#8734;* ( una somma di un numero con infinito non modifica il risultato )
  - stessa cosa per la sottrazione 
- *&#8734;&#215; &#8734; = &#8734;<sup>2</sup>* ( una moltiplicazione di un numero con infinito modifica il risultato )
  - stessa cosa per la divisione
- *&#8734;<sup>&#8734;</sup> &gt; &#8734;<sup>c</sup> &gt; &#8734;*
- *log<sub>2</sub>&#8734; &lt; &#8734;*



Questo concetto, se compreso, aiuterà a capire come alcune scelte nel codice *possono o non possono* influenzare le prestazioni in base anche semplicemente alla loro posizione.



### prestazioni generali

Detto questo, il miglior algoritmo di ordinamento generico risolve mediamente il problema in tempo  *&#8734; &#215; log<sub>2</sub>&#8734; &lt; &#8734;* . 

Gli algoritmi più famosi conosciuti sono: 

- **merge sort** 
- **quick sort**



Nell'articolo saranno trattati anche:

- **selection sort**
- **insertion sort**
- **bubble sort**





## Metodi di ordinamento classici

I metodi di ordinamento classici nonchè i primi studiati a livello didattico sono:

- **selection sort**
- **insertion sort**
- **bubble sort**



Questi rappresentano, anche dal punto di vista logico, quelli *più naturali*, così come anche quelli meno efficienti.   



### Selection sort

Se doveste raccogliere ed ordinare degli elementi manualmente, probabilmente utilizzereste il *selection sort*, anche se in maniera totalmente inconsapevole. Infatti questo algoritmo opera cercando *il minimo* ( o *il massimo*, specularmente ) *valore* del vettore per ogni elemento rimasto da ordinare fino a quando non ne rimangono più.



















