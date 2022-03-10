---
title: '#howtodev - SPREAD vs REST Operators in Javascript'
date: 2022-03-11 11:30
layout: post 
author: Davide Galati (in arte PsykeDady) 
author_github: PsykeDady
published: false
tags:
- javascript
- REST
- SPREAD
---

Se per due punti passa una sola retta, è anche vero che con tre punti possiamo farci tantissime cose, come gli *spread operator* e i *rest parameters* in Javascript. 
Ma di cosa si tratta e quali sono le differenze? 


## Obiettivi

In questo articolo si raggiungeranno i seguenti obiettivi

- comprensione degli operatori SPREAD in javascript
- comprensione dei parametri REST in javascript

## Prerequisiti 

Lista dei prerequisiti e di conoscenze presenti in altri articoli che verranno date per scontato: 

- conoscenza dei tipi primitivi di Javascript
- padronanza degli array e dei json in javascript
- conoscenza delle funzioni in javascript e dei parametri 

## Significato

Entrambe le operazioni, come già detto, sono introdotte nel codice da tre caratteri punto messi insieme, tuttavia son operazioni diverse. La discriminante che li differenzia è soprattutto il contesto, infatti **se il parametro rest** è una notazione che *si può utilizzare sull'ultimo* parametro di una funzione, **l'operatore spread** invece è una notazione *che si utilizza nelle varie istruzioni sui vettori*.



## Spread operator

Entriamo nel particolare dello spread operator. Tecnicamente parlando è un operatore che *fa la copia uno ad uno degli elementi di un vettore* o di un json.

![spread](/uploads/javascript/RESTvsSPREAD/spread.jpg)


### Nella pratica 

Segue un piccolo pezzo di codice che introdurrà il concetto dal punto di vista prettamente pratico: 

```javascript
let a = ["Antonio","Davide","Domenico","Alfredo"]
// ora creiamo un elemento b che copia a con lo spread operator
let b = [...a]
```

Se andiamo a stampare gli elementi di b scopriremo che ha fatto correttamente la sua copia: 

```javascript
console.log("b=",b)
```

risultato: 

```javascript
b= [ 'Antonio', 'Davide', 'Domenico', 'Alfredo' ]
```



### Si, ma perché ? 

Molte volte in informatica alcune operazioni esistono già solo per semplificarti il lavoro, il corrispettivo "esteso" della stessa operazione si tradurrebbe in *un ciclo di for in cui si fa un assegnamento per ogni elemento*. Vediamo come: 

```javascript
let a = ["Antonio","Davide","Domenico","Alfredo"]

let b=[]

for (let i of a){
    b.push(i);
}
```

Se andiamo a stampare gli elementi di b scopriremo che ha fatto correttamente la sua copia anche con questa metodologia: 

```javascript
console.log("b=",b)
```

risultato: 

```javascript
b= [ 'Antonio', 'Davide', 'Domenico', 'Alfredo' ]
```



### Attenzione! 

Se state pensando che però quest'operazione si potrebbe anche tradurre anche in un banale: 

```javascript
let a = ["Antonio","Davide","Domenico","Alfredo"]

let b=a
```



Vi state sbagliando è anche tanto. 
Supponendo che, durante un compito in classe, stiate pensando di poter chiedere aiuto ad un vostro collega più preparato, ci si può arrivare benissimo da soli a capire che c'è un enorme differenza tra *copiare il suo compito* (ciò che fa lo spread operator) e *prendere direttamente il suo compito e consegnare lo stesso identico foglio in due* (**b=a**). 

Se già nella realtà questo vi sembra errato, dal punto di vista della programmazione corrisponde ad un concetto ben noto a cui il programmatore deve sempre fare molta attenzione, denominato "**aliasing**". Se fate aliasing di una variabile, quando ne cambiate il valore, cambierete il valore anche dell'altra variabile, contemporaneamente!  

Nella pratica, avrete questo problema: 

```javascript
let a=["Antonio","Davide","Domenico","Alfredo"]

let b=a

a[0]="Jojo"

console.log("b=",b)
```

risultato: 

```java
b= [ 'Jojo', 'Davide', 'Domenico', 'Alfredo' ]
```

Come vedete è cambiato **il primo nome di b**, ma **la variabile modificata era a** !

### Ti lascio copiare, ma cambia almeno qualcosa!

Un altro bel motivo per cui l'operatore spread è molto utile è puoi aggiungere in coda o in testa altri valori, rendendo il *nuovo vettore* o il *nuovo json* più di una semplice copia dell'originale.

Riprendiamo l'esempio con il vettore dei nomi: 

```javascript
let a = ["Antonio","Davide","Domenico","Alfredo"]

// aggiungiamo i nomi "Debora" e "Alessandra"
let b = ["Debora",...a,"Alessandra"]

console.log(b)
```

Ecco il risultato: 

```javascript
[ 'Debora', 'Antonio', 'Davide', 'Domenico', 'Alfredo', 'Alessandra' ]
```

Come si può notare, sia in testa che in coda son stati aggiunti i nuovi nomi nel vettore b, rendendo la nuova copia più completa!

## Parametri REST 

Se pur usa la stessa identica notazione, il significato è totalmente diverso. 

I Parametri REST (in altri linguaggi son chiamati anche *varargs*) servono a *raggruppare tanti parametri dello stesso tipo* nell'*intestazione di una funzione*, senza però saperne esattamente il numero! Questi parametri vengono poi raccolti e si possono utilizzare nel metodo sotto forma di vettore. 

![Cart](cart.png)

### Nella pratica 

Segue un piccolo pezzo di codice che introdurrà il concetto dal punto di vista prettamente pratico, ecco come si scrive ed utilizza un metodo con parametri rest: 

```javascript
function media(...voti){
    let totale=0;
    for ( let i =0; i<voti.length; i++){
        totale=totale+voti[i];
    }
    return totale/voti.length;
}
```

Come si è potuto notare, è utilizzato esattamente al pari di un vettore, il vero vantaggio di questo approccio infatti non è nel come viene utilizzato all'interno della funzione, ma quando quella funzione viene poi richiamata all'esterno. 
Nel pratico: 
```javascript
let la_media=media(18,20,30,18,29,27,24,33)
console.log(la_media)
```

Risultato: 
```
24.875
```



### Si, ma perché ? 

Anche in questo caso la domanda è lecita: perché usare questo approccio? È ovviamente una semplificazione di quello che era un processo più lungo da scrivere! 

La stessa logica si può infatti ottenere mettendo come *parametro un vettore*, e prima di richiamare il metodo, creare il suddetto vettore!

Rifacciamo l'esempio di sopra: 

```javascript
function media(voti){
    if(!voti || !voti.length){
        return 0;
    }
    let totale=0;
    for ( let i =0; voti && voti.length && i<voti.length; i++){
        totale=totale+voti[i];
    }
    return totale/voti.length;
}
```

In questo caso, dobbiamo far si che voti sia effettivamente un vettore a tempo di chiamata: 

```javascript
let voti=[18,20,30,18,29,27,24,33]

let la_media=media(voti)

console.log(la_media)
```

Ed il risultato: 

```
24.875
```

Come si può notare son stati fatti più passaggi, all'interno della funzione ad esempio ci siamo assicurati che voti avesse una proprietà di nome length e che esistesse, lato chiamato abbiamo dovuto creare un ulteriore variabile.

Nel settore della programmazione vi son sempre altri metodi per arrivare ad una determinata soluzione, ma visto che siamo fondamentalmente pigri, è sempre bene conoscere delle scorciatoie! 

### Fa si che REST-i l'ultimo parametro!

Visto e considerato che il computer non può sapere quanto lunga sarà la lista di parametri con cui chiamerai la funzione, vi sono dei vincoli importanti sui parametri REST:

- vi può essere un solo parametro di questo tipo nell'intestazione di un metodo
- deve essere l'ultimo

Tanto per comprenderci seguono degli **esempi Errati**. 

### esempio errato 1: l'ordina conta

```javascript
function inviaEmail(...destinatari,mittente,testo){
	console.log("Destinatari:",destinatari)
	console.log("Testo email:\n_________\n",testo)
	console.log("_________\nMittente: ",mittente)
}
```

Qui ad esempio l'errore è che il parametro REST non è l'ultimo parametro, l'interprete del browser ci farà uscire una bella scritta rossa dicendoci: 
```
SyntaxError: Rest parameter must be last formal parameter
```

Al di là dell'errore però che ci darebbe il browser, potete immaginare il casino di comprendere chi tra i tanti parametri rappresenta i destinatari, il mittente e il testo? Ecco un esempio di invocazione: 
```javascript
inviaEmail("Babbo Natale","Elfi","Gesù","Befana","Davide","Voglio un forno a legna ed un caminetto grazie T.T")
```

**Come possiamo aggiustare questo casotto?** *Semplice, invertiamo l'ordine dei parametri* :

```javascript
function inviaEmail(mittente,testo,...destinatari){
	console.log("Destinatari:",destinatari)
	console.log("Testo email:\n_________\n",testo)
	console.log("_________\nMittente: ",mittente)
}
```

In questo caso l'interprete capirà che i primi due parametri son per forza di cose mittente e testo, dal testo in poi son tutti REST. Ecco un esempio di invocazione: 
```javascript
inviaEmail("Davide","Voglio un forno a legna ed un caminetto grazie T.T","Babbo Natale","Elfi","Gesù","Befana")
```

Ecco l'output: 
```
Destinatari: [ 'Babbo Natale', 'Elfi', 'Gesù', 'Befana' ]
Testo email:
_________
 Voglio un forno a legna ed un caminetto grazie T.T
_________
Mittente:  Davide
```

### esempio errato 2: two is not melio che one

```javascript
function inviaEmail(mittente,testo,...destinatari,...cc){
	console.log("Destinatari:",destinatari)
	console.log("Copia Conoscenza:",cc)
	console.log("Testo email:\n_________\n",testo)
	console.log("_________\nMittente: ",mittente)
}
```

Come già anticipato, l'errore in questo è che non è possibile avere più di un parametro REST alla volta, d'altro canto si presenterebbe lo stesso identico problema di prima se ci si pensa: in una lunga lista di parametri dove avverrebbe quella linea di separazione che delimiterebbe un parametro REST da un altro ? Non esisterebbe, quindi : **errore**.

Anche in questo caso l'interprete ci risponderà: 

```
SyntaxError: Rest parameter must be last formal parameter
```

**Come possiamo sistemare questa situazione?** *Al posto di uno dei due parametri REST, inseriamo un vettore* :

```javascript
function inviaEmail(mittente,testo,destinatari,...cc){
	console.log("Destinatari:",destinatari)
	console.log("Copia Conoscenza:",cc)
	console.log("Testo email:\n_________\n",testo)
	console.log("_________\nMittente: ",mittente)
}
```

Quindi invocheremo il metodo così: 

```javascript
inviaEmail("Davide","Voglio un forno a legna ed un caminetto grazie T.T",["Babbo Natale","Elfi"],"Gesù","Befana")
```

Il risultato: 

```
Destinatari: [ 'Babbo Natale', 'Elfi' ]
Copia Conoscenza: [ 'Gesù', 'Befana' ]
Testo email:
_________
 Voglio un forno a legna ed un caminetto grazie T.T
_________
Mittente:  Davide
```

 
