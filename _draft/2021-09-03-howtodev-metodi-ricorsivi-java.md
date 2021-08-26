---
title: '#howtodev - Metodi ricorsivi e ordinamento dei vettori in java' 
date: 2021-09-03 11:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- java
---



Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 



## Obiettivi

In questo articolo verranno affrontati i seguenti argomenti

- l'approccio ricorsivo
- ricorsivo contro iterativo
- divide et impera
- simulare l'approccio ricorsivo

## Prerequisiti   

I requisiti per la piena comprensione di questo articolo sono stati affrontati nell'articolo:   

[*I metodi in java*](https://linuxhub.it/articles/howtodev-i-metodi-in-java)  

 

E nei precedenti.  
Se siete novizi di Java potete iniziare direttamente da [*Introduzione alla programmazione java*](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java)



## L'approccio ricorsivo

> **Definizione di ricorsione:**
> `vedere voce "ricorsione"`
>   *~ cit necessaria*





La ricorsione è considerata uno degli espedienti di programmazione più elegante per risolvere un problema. Come suggerisce il nome si tratta di una procedura che richiama se stessa per risolvere un problema, normalmente è contro intuitivo scrivere e pensare in maniera ricorsiva, *la sensazione è quella di un cane che si morde la coda*, ma con alcuni piccoli accorgimenti diventa anche divertente. 



### Come pensare ricorsivo

La ricorsione innanzitutto si applica in tutti quegli algoritmi per cui utilizzeresti dei cicli iterativi, il senso è quello di sostituire la ripetizione del ciclo con una chiamata a se stessi, ma variando i parametri passati. 

La prima cosa, nonché la più importante, da analizzare è il così detto "**caso di uscita**", esso vi permetterà di arrivare ad un punto in cui il ciclo di ricorsioni si completerà e *inizierà la catena di ritorni*. **Il caso di uscità deve essere posizionato sempre prima della chiamata ricorsiva**!  

Per citare il professore universitario che mi introdusse questi concetti, *L.Nigro*, possiamo vedere questa fase come se il nostro algoritmo, per magia, fosse già concluso e ci mancasse "solo un istruzione". 

Dunque consideriamo un metodo con ciclo generico: 

```java
public static int metodoIterativo(){
    int risultato=0;
    for (int i=0;i<n; i++){
    	//istruzioni che coinvolgono calcoli su risultato
    }
    return risultato;
}
```

E riformuliamolo in maniera ricorsiva: 

```java
public static int metodoRicorsivo(int i, int risultato){
    //caso di uscita
    if(i>=n)
        return risultato;
   
    //istruzioni che coinvolgono calcoli su risultato
    return metodoRicorsivo(i+1,risultato);
}
```



Ovviamente affinché abbia senso la prima volta necessita che venga chiamato con i due parametri a zero. Per non scaricare questa responsabilità a chi usa il metodo, in genere si prevede un *metodo privato senza parametri* ed *uno pubblico con i parametri*:

```java
public static int metodoRicorsivo(){
	return metodoRicorsivo(0,0);
}
private static int metodoRicorsivo(int i, int risultato){
    //caso di uscita
    if(i>=n)
        return risultato;
   
    //istruzioni che coinvolgono calcoli su risultato
    return metodoRicorsivo(i+1,risultato);
}
```



### tipi di ricorsione

Non esiste un solo tipo di ricorsione e non esiste un solo modo di fare un metodo ricorsivo, la fantasia in questo caso la fa da padrona. Ma possiamo identificare due categorie specifiche di ricorsione in base a cosa viene ritornato e definire quale delle due sia meglio a livello prestazionale, parliamo quindi della **ricorsione semplice** e della **ricorsione di coda** ( o *tail recursion* )



Supponiamo il seguente metodo ricorsivo: 

```java
public static int metodoRicorsivoA(int i){
    //caso di uscita
    int risultato=0;
    if(i>=n)
        return risultato;
   
    //istruzioni che coinvolgono calcoli su risultato
    return risultato+metodoRicorsivoA(i+1);
}
```

E ora consideriamo questo: 

```java
public static int metodoRicorsivoB(int i, int risultato){
    //caso di uscita
    if(i>=n)
        return risultato;
   
    //istruzioni che coinvolgono calcoli su risultato
    return metodoRicorsivoB(i+1,risultato);
}
```



In cosa differiscono principalmente? il return nel **metodoRicorsivoA** fa sia una chiamata ricorsiva che un calcolo, mentre il return del **metodoRicorsivoB** fa solo la chiamata ricorsiva. 



Il **metodoRicorsivoB** applica la *tail recursion*. In java non c'è differenza nelle prestazioni, tuttavia è bene tenere sempre in mente l'approccio della ricorsione di coda poiché esistono dei linguaggi in cui, se riconosciuta, occupa *meno spazio in RAM*; il risparmio è dovuto al ragionamento per cui *se una determinata chiamata ricorsiva dipende solo da se stessa* e non da altri calcoli, *è inutile tenere allocata in memoria la chiamata precedente*. 


## Un paio di esempi 

Si veda qualcuno tra i più famosi esempi di approcci ricorsivi, comparandoli anche ai relativi codici iterativi.

### Esempio 1: la serie di fibonacci 

Uno dei più celebri esempi è quello della serie di fibonacci. Per chi non la conoscesse, si tratta di una sequenza di numeri che parte da `0` e `1` e dove ogni successivo è la somma dei due precedenti. La serie dei primi 10 numeri è: 

```
0 1 1 2 3 5 8 13 21 34 55
```



Vediamo subito un algoritmo iterativo per visualizzarla come stringa in java: 

```java
public static String serieF(int n){
    if(n<0) return "serie di fibonacci non possibile per "+n+" elementi";

    int tmp1=1, tmp2=0;
    String risultato="0 ";

    for (int i=0; i<n; i++){
        int tmp3=tmp1+tmp2;
        tmp1=tmp2;
        tmp2=tmp3;
        risultato=risultato+tmp3+" ";

    }
    return risultato;
}
```



Vediamo ora come possiamo rendere ricorsivo questo metodo, utilizziamo una coppia di metodi per farlo, uno dei due farà da innesco per la ricorsione

```java
 public static String serieFR(int n){
     if(n<0) return "serie di fibonacci non possibile per "+n+" elementi";

     return "0 "+serieFR(1,0,n);
 }

private static String serieFR(int tmp1, int tmp2,int n){
    //caso di uscita   
    if(n<=0) return "";

    return ""+(tmp1+tmp2)+" "+serieFR(tmp2,tmp2+tmp1,n-1);
}
```



> Beh non so voi, ma personalmente trovo l'eleganza e la semplicità con la quale la ricorsione ha espresso la serie semplicemente devastante.
>
> ~ Autore



### Esempio 2 : il massimo comun divisore

Un altro degli esempi più significativi della potenza espressiva della ricorsione a livello didattico è il **MCD**, che un po' tutti dovremmo conoscere. 

Per chi non si ricordasse, il massimo comun divisore tra due numeri si ottiene calcolando per ogni numero tutti i divisori ( ovvero i numeri che possono essere divisi per quel numero ) cercando quello in comune dal valore maggiore. 

> **Tra 18 e 27, il MCD è 9** ( i *divisori di 18* sono *1,2,3,6,8,9 e 18* mentre *quelli di 27* sono *1,3,9 e 27* ). 

Vediamo come farne un algoritmo iterativo 



```java
public static int MCD(int n1, int n2){
    if(n1<1 || n2 <1) 
        return 0; 

    if(n1<n2){
        int n3=n1;
        n1=n2;
        n2=n3;
    }

    while(n2>0){
        int n3=n1%n2;
        n1=n2;
        n2=n3;
    }

    return n1;
}
```

Se non capite l'algoritmo a livello logico *state tranquilli*, non siete voi poco intelligenti.
Questo procedimento è chiamato "[Algoritmo di Euclide](https://it.wikipedia.org/wiki/Algoritmo_di_Euclide)" ed è uno dei più antichi di cui siamo a conoscenza ( si usava questo calcolo già nel 300ac ).

Cosa avviene : 

1. si identifica il maggiore dei due numeri
2. fino a che il minore dei due è maggiore di zero:
   a. calcoli il resto della divisione intera tra maggiore e minore
   b. assegni il vecchio valore del minor numero al maggiore
   c. assegni il resto calcolato in precedenza al minore 
   e. riparti da punto 
3. il maggiore dei due numeri è il MCD dei numeri di partenza



Proviamo ora a vedere come sarebbe l'algoritmo con un approccio ricorsivo: 

```java
public static int MCDR( int n1,int n2){
    if(n2>n1) return MCDR(n2,n1);

    if (n2<=0) return 0;

    return MCDRp(n1,n2);
}

private static int MCDRp(int n1,int n2){  
    return (n2==0)? n1: MCDRp(n2,n1%n2);
}
```



> **NOTA:**   
>
> aggiungete sempre un metodo che controlli i parametri per norma di programmazione prima di buttarvi in un metodo ricorsivo, per quanto elegante possa essere scrivere tutto in una riga di codice, la sicurezza va sempre al primo posto



In questo approccio abbiamo utilizzato un if ternario nel codice del metodo ricorsivo in modo da dare ancora più forza all'espressività. 



## Ricorsivo vs Iterativo 

Più bello = meglio ?   

No purtroppo, la ricorsività quasi mai è l'approccio più efficiente per quanto elegante. 
Ogni chiamata ad un metodo alloca in memoria diverse variabili: 

- i parametri in ingresso
- l'indirizzo di memoria che dice al computer dove ritornare una volta terminata la funzione 
- non c'è possibilità di riutilizzare variabili locali

Se le chiamate sono innestate una dopo l'altra, senza che si richiudano ( in java ricordo, la tail recursion purtroppo non viene riconosciuta ), ciò creerà molte più variabili in memoria di quante ne usereste normalmente senza ricorsione.

L'altra faccia della moneta è che generalmente, se ben strutturati, potrebbero avere delle performance a livello di tempo migliori. 
Un caso simbolico è quello del **merge sort**, uno degli algoritmi di ordinamento più efficienti a livello temporale, con esso tutti gli algoritmi del tipo *divide et impera* in genere hanno un  



### Divide et Impera 

La tecnica del divide et impera è molto sfruttata tramite gli algoritmi ricorsivi. Quando si ha una grande mole di dati è generalmente conveniente pensare ad un modo per operare su porzioni piccole e quindi poter unire "intelligentemente" i vari sotto problemi. 

Pensiamo al problema più semplice a cui tutti, inconsapevolmente, applichiamo il divide et impera fin da quando andiamo alle elementari: 
**il metodo di moltiplicazione carta e penna**.



Quando si moltiplica con metodo carta e penna si divide mentalmente ogni cifra del moltiplicatore e si moltiplica per il moltiplicando, per poi sommare tutto quanto alla fine. Facciamo un esempio con 4 cifre:

```
               A1 A2 A3 A4 x
               B1 B2 B3 B4 =
              _____________
         A1 A2 A3 A4 x B4 +
      A1 A2 A3 A4  0 x B3 + 
   A1 A2 A3 A4  0  0 x B2 +
A1 A2 A3 A4  0  0  0 x B1 +
___________________________
                 TOTALE
```

   

Tuttavia si può fare di meglio, negli algoritmi la vera essenza del dividi e conquista, il vero vantaggio, *si ottiene quando si divide il problema a metà per ogni ricorsione.* 



Possiamo attuare ulteriori miglioramenti all'algoritmo sfruttando maggiormente il concetto di divisione del problema. 

> ATTENZIONE: segue un ragionamento matematico, se sei interessato direttamente all'algoritmo passa qua



Rifacciamo la somma ma prendendo coppie di due a due. 

`A1 A2 A3 A4` non è altro che `A1 A2 *10^2 + A3 A4`. Stesso ragionamento per i 4 elementi di sotto.



```
              					 A1 A2 A3 A4 x
              					 B1 B2 B3 B4 =
            					  _____________           
     			 A1 A2 x B3 B4	 A3 A4 x B3 B4 +
A1 A2 x  B1 B2   A3 A4 x B1 B2			00	   +
_______________________________________________
                 TOTALE
```



Usando queste considerazioni si può riscrivere come: 

```
( A1 A2 x 10^2 + A3 A4 ) x ( B1 B2 x 10^2 + B3 B4 ) = 
A1 A2 x B1 B2 x 10^4 + ( A1 A2 x B3 B4 + B1 B2 x A3 A4 )x10^2 + A3 A4xB3 B4
```

Con questo calcolo, nel 1962, Karatsuba *ha dimostrato che il metodo carta e penna è nativamente ricorsivo se prendi coppie di numeri*. 


Questo algoritmo è noto in letteratura come **Moltiplicazione di Karatsuba**, dal suo creatore per l'appunto.



### Esempio di Divide et Impera:  Moltiplicazione di Karatsuba

Il nostro scopo è di suddividere quindi sempre a metà i due moltiplicatori ed applicare ricorsivamente la formula carta e penna. 
Se il numero di cifre è n, possiamo dire il nostro risultato è dato da: 

```
ab * 
cd =
_______________________
a*c*10^n + (a*d+b*c)*10^n/2 + b*d
```



Normalmente questo algoritmo si usa per ottimizzare i calcoli tra numeri molto grandi, rappresentati tramite vettori, stringhe o liste ( e che quindi i tipi primitivi di java non possono calcolare ), potrebbe quindi sembrare che un approccio del genere sia esagerato per una moltiplicazione.  
Lo scopo è quello di ridurre i calcoli a `cifraxcifra`! Prendete comunque questo come un esempio didattico più che realmente utile.

```java
private static int dividi(int ab, int maxp2){
	return ab/maxp2;
}

private static int resto(int ab, int maxp2){
	return ab%maxp2;
}

private static int karatsubaR(int ab, int lab, int cd, int lcd){
    //caso di uscita: i numeri hanno entrambi una cifra
	if (lab<=1&&lcd<=1) return ab*cd;
    
    // calcolo la metà delle lunghezze, approssimate per eccesso
	int lab2=lab/2+lab%2;
	int lcd2=lcd/2+lcd%2;
    
    // calcolo la più grande delle lunghezze, non si deve fare sulle lunghezze originali ma sulle metà per evitare massimi dispari
	int max=lab2<lcd2?lcd2*2:lab2*2;
    
    // 10^max
	int maxp=(int)(Math.pow(10, max));
    // 10^max/2
	int maxp2=(int)(Math.pow(10, max/2));
    
    // divido a metà le cifre dei numeri
	int a=dividi(ab,maxp2);
	int b=resto(ab,maxp2);
	int c=dividi(cd,maxp2);
	int d=resto(cd,maxp2);
    
    // chiamata ricorsiva
	return karatsubaR(a,lab2,c,lcd2)* maxp+ (karatsubaR(a,lab2,d,lcd2) + karatsubaR(b,lab2,c,lcd2))*maxp2+   karatsubaR(b,lab2,d,lcd2);
}


public static int karatsuba(int ab, int cd){
	boolean neg=ab<0;
	ab=neg?-ab:ab;
	if(cd<0){
		cd=-cd;
		neg=neg^true;
	}

    // il log in base 10 di un numero ti dice quante cifre ci sono in quel numero (-1)
	int lab=ab==0? 0: (int)(Math.log10(ab))+1;
	int lcd=cd==0? 0: (int)(Math.log10(cd))+1;
	
	return (neg? -1 : 1) *  karatsubaR(ab,lab,cd,lcd);
} 
```



Come potete notare, rispetto ai normali metodi ricorsivi, quelli basati su approccio divide et impera sono molto più ragionati e complessi.   

Non è affatto semplice lavorare con questo genere di approccio, il consiglio che posso dare è quello di partire supponendo sempre di dovervi fermare alla prima metà (Senza chiamate ricorsive) 

Se funziona allora procedete pensando a cosa succede nella ricorsione.



## Simulazione dell'approccio ricorsivo 

Si possono avere i vantaggi della ricorsione senza ricorsione? La risposta è **ni**   

Il motivo di questa domanda ovviamente è per evitare gli "svantaggi" della ricorsione, quindi liberando man mano la memoria occupata dalle chiamate dello stack.   
E bene è proprio *nello stack la soluzione*. Riscrivendo in maniera iterativa un algoritmo ricorsivo, bisogna emulare le dinamiche dello stack per conservare le variabili durante le varie chiamate *ma avendone il pieno controllo*. Il vantaggio di un approccio simile? Potete sfruttare la tail recursion!  

Tuttavia per emulare dinamiche così complesse, c'è necessità di strumenti più potenti di quelli visti fin ora, come array e il concetto di classe, si rimanda quindi lo studio ad un momento successivo.




Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).

