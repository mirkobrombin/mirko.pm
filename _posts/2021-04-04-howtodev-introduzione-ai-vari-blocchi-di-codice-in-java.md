---
title: '#howtodev - Introduzione ai vari blocchi di codice in Java'
date: 2021-04-04
layout: post
author: Davide Galati
author_github: psykedady
tags:

---

[PRECEDENTE: Guida Java Parte 1 - Introduzione&larr;](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java/)

[SUCCESSIVO: Guida Java Parte 3 - Vettori&larr;](https://linuxhub.it/articles/howtodev-introduzione-ai-vettori-in-java/)



Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 

## Obiettivi 

In questo articolo saranno trattati i **blocchi di controllo** del codice in Java. Tra questi rientrano: 

- if 
- for 
- while
- switch-case
- do-while

Si approfondiranno anche alcuni aspetti di *zucchero sintattico* come: 

- if ternario
- switch expression 

## Prerequisti

I prerequisiti richiesti da questo articolo sono stati affrontati nel precedente capitolo della stessa serie, ovvero: [Introduzione alla programmazione in java](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java). Son richieste le seguenti conoscenze: 

- Scrittura di un semplice programma main
- Conoscenza dei vari termini chiave di Java
- Conoscenza dei tipi di base e alcuni tipi complessi
- Calcoli in Java e possibili operazioni
- Stampe a schermo 

Per altri prerequisiti e informazioni, è altamente consigliato leggere l'articolo precedente.

## Cosa sono e a che cosa servono i blocchi di controllo

Il concetto di base è semplice: in alcuni punti del nostro algoritmo si ha la necessità di "diramare" il flusso per **ripetere alcuni passi** o scegliere **un flusso anziché un altro**.

Le strutture di controllo servono a coprire questa necessità introducendo alcune istruzioni che permettono all'esecuzione di prendere delle *decisioni dinamiche*.

### uno sguardo al passato: le istruzioni di salto

Nei primi linguaggi di programmazione erano utilizzate le così dette *istruzioni di salto* (ereditate poi dalla programmazione Assembly), ovvero `goto`.

Supponiamo il seguente flusso:

![Java blocks giratiESpara mermaid](/uploads/java/java_blocks_giratiESpara_mermaid.png)

Potremmo rappresentarlo in questi passi con le istruzioni di salto: 

1. Segna i numeri dei passi con p
2. Rendi p uguale a 0
3. Fai un passo avanti
4. Aumenti p di 1 
5. p è maggiore di 10? 
   1. No: torna a passo numero 3
   2. Si: girati e spara

Tuttavia, questo genere di strumento di descrizione degli algoritmi fu superato definitivamente nel 1966 grazie al [Teorema di Böhm-Jacopini](https://it.wikipedia.org/wiki/Teorema_di_Böhm-Jacopini), il quale enunciava appunto che in un algoritmo tutte le istruzioni di salto potevano essere convertite in strutture di controllo.

## I blocchi di controllo in java

I blocchi sono in genere dominati da una certa **condizione booleana**, cioè un'espressione vera o falsa. Per interpretarne correttamente il senso, è necessario chiedersi "qual è la sua condizione" e "fino a quando è valida".

In Java, così come nella maggioranza dei linguaggi di programmazione, si hanno i seguenti blocchi di controllo: 

- `if`: biforca il codice in due strade separate da una condizione binaria. La strada opposta alla sua condizione è invece l'`else`
- `switch`: divide il codice in una serie di strade che si distinguono per il valore di una variabile
- `while`: leggetelo come "fintanto che", riesegue una porzione di codice fino a quando la condizione che controlla è vera
- `do-while`: come il While, ma la prima volta l'esecuzione viene eseguita senza controlli sulla condizione
- `for`: è un blocco un po' più complesso. Esegue un'inizializzazione, quindi un controllo, e ogni fine di ciclo un'istruzione. È uno dei blocchi più usati nella programmazione e ne esistono anche alcune varianti specifiche come il *for-each*, che vedremo in tutt'altro contesto

Tutti i blocchi in Java son seguiti da *un'istruzione* oppure da *una serie di istruzioni in una parentesi graffa*. Giusto per anticipare qualcosa, son entrambe valide le espressioni: 

<pre>
if&#40;true&#41;&#123;
    System.out.println("con parentesi");
&#125;
</pre>

```java
if(true)
    System.out.println("senza parentesi");
```

Ma se mettete più di un'istruzione senza parentesi graffe, verranno eseguite indipendentemente dal blocco di controllo.

### Trivia: le parentesi graffe

In realtà, in Java ciò che è racchiuso tra parentesi quadre è chiamato "*blocco anonimo*" ed ha una sua "vita", nel senso che ciò che viene creato al suo interno viene distrutto alla sua fine. 

Il blocco viene visto come un'unica istruzione dall'esterno, anche se al suo interno contiene più istruzioni. Ed ecco perché è usato dopo i cicli di controllo. Vediamo un esempio:

```java 
public class TestBloccoAnonimo{
    public static void main(String...args){
        { int variabile=4; System.out.println("qui la variabile vale 4 :"+variabile);}
        int variabile=5; System.out.println("qui è stata creata nuovamente e vale 5 : "+variabile);
        
        {
            System.out.println("ciò che viene creato al di fuori di un blocco, si può leggere e modificare al suo interno! "+variabile); 
            variabile=6;
        }
        
        System.out.println("IN questo punto la variabile sarà 6= "+variabile);
    }
}
```

### if-else, else if

Vediamo un esempio di if pratico. Supponiamo il seguente caso: 

![](/uploads/java/java_blocks_volumeIF.png)

Notiamo che il passo "ascolta musica" viene eseguito qualunque sia il path preso. Come trasformare questo concetto in Java e, più specificatamente, con un if?

```java
int volume; // riempito da qualche parte con un valore

if (volume>7)
    volume=4;

System.out.println("ascolta la musica con volume a "+volume);
```

Proviamo a complicare le cose, ascoltando la musica solo se il volume non è maggiore di 7, senza cambiarlo: 
![](/uploads/java/java_blocks_volumeIFELSE.png)

In Java, per esprimere questa situazione, useremo il costrutto *else* dopo l'if: 

```java
int volume; // riempito da qualche parte con un valore

if (volume>7)
    System.out.println("volume troppo alto :\ "+volume);

else 
    System.out.println("ascolta la musica con volume a "+volume);

```

Facciamo un ulteriore sforzo, volendo indicare ora che, se il volume supera una certa soglia, lo riportiamo a quella soglia.

![](/uploads/java/java_blocks_volumeIFELSEIF.jpeg)

Questo è leggermente più complesso, e in questo caso notiamo che c'è un if dentro il ramo di *else*. Vediamo il corrispettivo a codice:

```java 
int volume; // riempito da qualche parte con un valore

if (volume>7){
    System.out.println("volume troppo alto :\ "+volume+" procedo con la modifica");
    volume=7;
} 
else if (volume<4){
	System.out.println("volume troppo basso :\ "+volume+" procedo con la modifica");
    volume=4;
} else {
    System.out.println("il volume era già nell'intervallo 4-7");
}

System.out.println("ascolta la musica con volume a "+volume);
```

Potreste continuare inserendo altri `if-else` e finanché un `else` finale. Ma se la questione va per le lunghe potrebbe essere meglio utilizzare un altro tipo di struttura.

> *NOTA BENE:* è errore comune (e anche grave) concatenare due if pensando che siano esclusivi uno con l'altro (senza else). Questo porterebbe invece a due confronti in tempi diversi.

### switch-case

Lo switch-case è un'estremizzazione di un if con tanti casi e tutti incentrati su una sola variabile. 

La sua struttura, però, è diversa rispetto al normale if. Vediamone un template e analizziamola:

```java 
switch( variabileDaConfrontare ){
    case valore1: 
        istruzioni;
        da;
        eseguire;
        nel;
        caso1;
        break;
    case valore2 : case valore3 : 
        istruzioni;
        da;
        eseguire;
        nel;
        caso2; 
        o; caso3;
        break;
        
    default: istruzioni; da; eseguire; in; tutti; gli; altri; casi; 
}
```

Notiamo alcune cose principali:

- I vari "case" esprimono il valore preciso che deve avere la variabile, non va più bene un confronto generico come maggioranza o minoranza 
- Si possono concatenare più *case* per esprimere più valori 
- Dopo i *case* non ci sono blocchi. Potrebbero esserci, ma non servono poiché è obbligatorio specificare il `break` a fine caso (se non lo fate, lo switch continuerà ad eseguire il codice dopo fuoriuscendo in altri case)
- Dopo default ci sono le istruzioni da eseguire in tutti gli altri casi

Replichiamo l'ultimo esempio, quello del volume: 

```java
switch(volume) {
    case 0: case 1: case 2: case 3: 
        System.out.println("volume troppo basso :\ "+volume+" procedo con la modifica");
        volume=4; 
        break; 
    case 8: case 9: case 10: 
        System.out.println("volume troppo alto :\ "+volume+" procedo con la modifica");
        volume=7; 
        break;
    default : System.out.println("il volume era già nell'intervallo 4-7");
}
```

È proprio uguale? In realtà no, a meno che i valori di volume non vadano di sicuro da 0 a 10. 

Vediamo un esempio più calzante, ad esempio quanti giorni ci sono in un mese dato il numero del mese *(il mese 1 è gennaio)*:

<pre>
switch&#40;mese&#41;&#123;
    case 1:case 3: case 5: case 7:case 8: case 10: case 12: System.out.println("31"); break;
    case 4: case 6: case 9: case 11: System.out.println("30"); break;
    default: System.out.println("se bisestile 29, altrimenti 28"); break;
&#125;
</pre>

La variabile controllata dallo switch può essere: 

- un numero `int`ero (int o qualunque altra cosa possa essere convertita ad esso)
- un carattere `char`, in tal caso i vari case vanno scritti tra `' '` 
- una `String`a (da Java 7 in poi), in tal caso i vari case vanno scritti tra `" "`

### while e do-while

*while, do e for* son blocchi denominati anche "**cicli**", poiché ripetono più volte una determinata sequenza di istruzioni e son eseguiti "**fintanto che**" una determinata condizione risulta vera (avviene un *if implicito*).

In particolare, il while rappresenta un ciclo in cui se la condizione espressa è vera, viene eseguito fintanto che resta vera. Riprendriamo l'esempio spiegato nel capitolo [delle istruzioni di salto](https://linuxhub.it/articles/howtodev-introduzione-ai-vari-blocchi-di-codice-in-java#title3) ovvero "*fai 10 passi e poi spara*".

Ecco come lo si potrebbe proporre in Java: 

```java 
int passi=0
while(passi<10)
    passi++; 

System.out.println("si gira e spara!");
```

A differenza del **while**, il `do-while` salta il primo controllo e si richiama scrivendo solo `do`, le istruzioni in un blocco, e quindi il `while` dopo il blocco: 

```java
int passi=0
do {
    passi++; 
}while(passi<10); 

System.out.println("si gira e spara!");
```

A prima vista fare una differenza reale d'uso tra i due cicli illustrati potrebbe essere difficile, ma ci son casi in cui non è facile scegliere un valore iniziale della propria variabile, e questo è il fattore discriminante per cui si decide di utilizzare un `do-while` anziché il `while`.

### For 

Sicuramente il ciclo più abusato nella programmazione è il ciclo for. Utilizzatissimo in tante occasioni permette di inizializzare una variabile (che vive solo dentro il for stesso), fare un confronto e,se vero, eseguire il codice, alla fine del quale si può specificare un'ulteriore operazione utilizzata in genere come "aggiornamento" della variabile. 

Riprendiamo l'esempio dei 10 passi:

```java
for(int passi=0; passi<10; passi++); 

System.out.println("si gira e spara!");
```

Con questa tipologia di blocco si ha un espressività altissima in poche righe di codice. Vediamone un esempio più complesso facendo un confronto con un while, *stampiamo ad esempio tutte le tabelline fino al 10*:

con il `while`:  

```java
public class Tabelline {
        public static void main(String[]args){
            	int indice=0;
                while (indice<=10){
                    	int prodotto=0;
                        while (prodotto<=10){
                                System.out.print(""+(indice*prodotto)+"\t");
                           		prodotto++;
                        }
                        System.out.println();
                    	indice++;
                }
        }
}
```

con il `for` : 

```java
public class Tabelline {
        public static void main(String[]args){
                for (int indice=0; indice<=10; indice++){
                        for (int prodotto=0;prodotto<=10;prodotto++){
                                System.out.print(""+(indice*prodotto)+"\t");
                        }
                        System.out.println();
                }
        }
}
```

La differenza, in termini di eleganza così come in termini di numero di righe, è già visibile con un esempio così banale. Si lascia al lettore la capacità di immaginare come, in situazioni più complesse, possa davvero fare la differenza.

> *NOTA BENE:* l'intestazione del for è una concatenazione di un'istruzione di un assegnamento, una booleana e un'istruzione. Non è definito da nessuna parte che queste debbano essere legate da qualche senso logico.

## Zucchero sintattico e norme di buona programmazione

Anche tra programmatori si usano convenzioni che hanno a che fare con l'apparenza, ma non sull'abbigliamento quanto più sul codice.

Anche il codice ha la sua estetica e va rispettata quanto più possibile.

### L'indentazione

L'avete notato? All'interno dei vari blocchi il codice è sempre "**indentato**" di un livello a destra, ovvero ci son degli spazi prima dell'inizio. Questa è sicuramente una delle norme di programmazione più utilizzate e delle convenzioni date più per scontato.

Scrivere codice non indentato correttamente è una pratica che potrebbe fare perdere la pazienza a chiunque collabori con voi nel codice poiché potrebbe trovare il vostro operato poco leggibile, poco chiaro ed esteticamente brutto.

> NOTA: 
> Non esiste un solo modo di indentare, è giusto anche trovare un equilibrio con il proprio team al riguardo. Le domande più comuni sono: 
>
> - Spazi o Tab?
> - Le parentesi graffe vanno a capo? 
> - I case dello switch vanno indentati o no?

### continue e break

Nei cicli potrebbe essere utile avere alcune direttive che evitino a prescindere alcuni casi interrompendo una determinata iterazione del ciclo o, perché no, i cicli stessi. 

Giusto per fare un esempio, riprendiamo le tabelline, *ma saltiamo quella del 5*. Ci sono due modi in cui principalmente potremmo farla, la prima è con un if che contenga il for più interno:

```java
for (int indice=0; indice<=10; indice++){
    if (indice!=5) for (int prodotto=0;prodotto<=10;prodotto++){
        System.out.print(""+(indice*prodotto)+"\t");
    }
    System.out.println();
}
```

Il secondo è usando la parola "`continue`", che salta l'iterazione corrente:

```java
for (int indice=0; indice<=10; indice++){
    if (indice==5) continue; 
    for (int prodotto=0;prodotto<=10;prodotto++){
        System.out.print(""+(indice*prodotto)+"\t");
    }
    System.out.println();
}
```

Gli approcci sono diametralmente opposti: in un caso cerchiamo il caso in cui dobbiamo stampare i numeri (con un `if` che agisce quando l'*indice non è 5*), e nel secondo cerchiamo un caso in cui saltare l'iterazione, continuando con l'iterazione successiva.

Ora complichiamo un po' la situazione, supponendo di voler interrompere tutte le tabelline quando il prodotto è **maggiore di 50**. Anche qui le soluzioni son diverse in realtà, vediamone una utilizzando: 

```java
for (int indice=0; indice<=10; indice++){
    for (int prodotto=0;prodotto<=10;prodotto++){
        if (prodotto*indice>=50) prodotto=11; // facendo così al prossimo giro esce
        if (prodotto==11) System.out.print(""+(indice*prodotto)+"\t");
    }
    System.out.println();
}
```
Una soluzione un po' "*forzata*", ma funzionale. Si può fare di meglio introducendo il "`break`", un'istruzione che blocca totalmente l'esecuzione del ciclo.

```java
for (int indice=0; indice<=10; indice++){
    for (int prodotto=0;prodotto<=10;prodotto++){
        if(indice*prodotto>=50) break; 
        System.out.print(""+(indice*prodotto)+"\t");
    }
    System.out.println();
}
```

In questo caso abbiamo un controllo che appena controlla che `indice*prodotto>=50` interrompe il ciclo più interno e quindi ritorna su quello esterno.

### etichette dei cicli
La gestione di `break` e `continue` può diventare ancora più intelligente se associata alle etichette. Ad ogni ciclo può essere associato un nome che poi può essere utilizzato accanto a queste due istruzioni, riprendiamo l'esempio delle tabelle e usiamolo per stampare solo quelle i quali prodotti son minori di 50 : 
```java
public class VediamoLeEtichette {
        public static void main(String ... args ){
                indici: for (int indice=0; indice<=10; indice++){
                    prodotti: for (int prodotto=0;prodotto<=10;prodotto++){
                        if(indice*prodotto > 50){
                         continue indici ; 
                        }
                    }
                    prodotti: for (int prodotto=0;prodotto<=10;prodotto++){
                        System.out.print(""+(indice*prodotto)+"\t");
                    }
                    System.out.println();
                }
        }
}


```

Nel caso illustrato, *indici* è il nome del primo ciclo, mentre *prodotti* quello del secondo. `continue indici` applicherà l'istruzione al primo ciclo e non al secondo! in assenza di etichette dopo l'istruzione, si intende il ciclo più interno in cui sta l'istruzione. 


### I loop infiniti

Non è affatto raro l'utilizzo dei così detti loop infiniti, cioè cicli con condizioni che non terminano mai. Ovviamente in un qualche modo al suo interno ci sarà un meccanismo di terminazione o comunque di uscita. Normalmente sono utilizzati in casi in cui le condizioni di uscita sono più di una, ed è più semplice utilizzare dei break all'interno del ciclo che non con delle condizioni.

Il `while` o `do-while` infinito si implementa inserendo `true` nella condizione: 

```java
while(true){
    ...
}
```

il for è implementato non scrivendo alcuna condizione, un tipico **for infinito** è

```java
for(;;){
    ...
}
```

### l'if ternario

A mio parere, la struttura più elegante è proprio quella dell'if ternario, che altro non è che la compressione massima (in termini di caratteri) di un if. 
In java gli **if-ternari** hanno questa struttura : 

`(condizione) ? codice if : codice else  ;`

Ma possono essere usati solo per un assegnamento. Vediamo subito un esempio, il valore assoluto di un intero: 

```java
int ero=-5; 

int assoluto=(ero>0)?ero:-ero;
```

Ma ancora più interessante potrebbe essere intuire che in questa struttura si possono concatenare degli *if else*. Facciamo un esempio con il numero di giorni in un mese: 

```java
int mese=3; 
int anno=2001; 

boolean di31=mese==1||mese==3||mese==5||mese==7||mese==8||mese==10||mese==12;
boolean di30=mese==4||mese==6||mese==9||mese==11;
boolean bisestile= (anno%400==0) || (anno%4==0 && anno%100!=0);

int giorni= di31? 31 : di30 ? 30 : bisestile ? 29 : 28; 
```

### switch expression 

**Da Java 14** è stato introdotto un concetto simile all'`if ternario`, ma con lo `switch`, ovvero un assegnamento ad una variabile controllato da una serie di condizioni. La struttura è simile all'originale al netto di queste differenze: 

- Non vi è bisogno di `break` 
- L'unica istruzione ammessa nei vari case è l'assegnamento con i caratteri `->`
- I vari case si separano da virgola 

Facciamo un esempio veloce con il numero di giorni nel mese: 

```java
int mese=3;
int anno=2001; 

boolean bisestile= (anno%400==0) || (anno%4==0 && anno%100!=0);

int giorni= switch(mese) {
    case 1,3,5,7,8,10,12  -> 31;
    case 4,6,9,11 		  -> 30;
    default	-> bisestile? 29:28; 
}
```


