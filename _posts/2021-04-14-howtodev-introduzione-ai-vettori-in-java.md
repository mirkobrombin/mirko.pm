---
title: '#howtodev - introduzione ai vettori in java'
published: 2021-04-14
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - java
---
Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 


## Obiettivi 

In questo articolo saranno trattati:

- I vettori o array di tipi primitivi 
- La scomposizione di una stringa in tutti i suoi caratteri

## Prerequisiti

I prerequisiti richiesti da questo articolo sono stati affrontati nei due precedenti articoli:

- [Introduzione alla programmazione in java](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java) : variabili, main e operazioni tra tipi di base
- [Introduzione ai vari blocchi di codice in Java](https://linuxhub.it/articles/howtodev-introduzione-ai-vari-blocchi-di-codice-in-java) : If, switch, for, while e do-while in java



## Accumulare più dati dello stesso tipo: i vettori

A volte è necessario, nonché comodo, che tanti dati simili tra di loro siano agglomerati in un unico luogo dove poterli operare insieme, pensando ad una serie di casi d'uso tra cui:

- Una serie di voti scolastici di cui poi farne una media
- Coppie di numeri che indicano coordinate di un punto
- Una serie di "booleani" che potrebbero indicare dei check "vero-falso" di una tabella o un quiz.

Nei linguaggi di programmazione questo concetto è detto "vettore" o "array".



### Creazione di un vettore 

Vediamo come creare un vettore in java, genericamente: 
`tipo [] nomevariabile = new tipo [dimensione];`



Più nel dettaglio, creiamo un vettore di 10 interi: 
`int [] voti = new int [10];`



Possiamo peraltro crearlo direttamente con degli elementi al suo interno, senza specificare la dimensione, così:

```java
tipo [] nomevariabile= {
  elemento1,elemento2,elemento3  
};
```



Esempio concreto con degli interi: 

```java
int [] voti={
    1,2,3,10,-1
};
```



> **Attenzione**: 
>
> la sintassi di creazione "diretta" usando gli elementi è possibile solo alla prima creazione, in fase di nuovo assegnamento non è più possibile.   
>
> Praticamente parlando:  `int[]voti={1,2,3,4};` va bene. `voti={3,4,5,6};`  scritto successivamente no.



Normalmente tutti gli elementi di un vettore vengono creati con i così detti "**valori di default**", se non specificati con la sintassi diretta. 
Questo significa che : 

- i numeri son tutti a `0`
- i booleani a `false` 
- i caratteri son tutti uguali al carattere `vuoto`
- Stringhe ed oggetti complessi sono `null`, ovvero come se non esistessero.

Quando si utilizza un vettore, la prima cosa da fare quindi è pensare a cosa devono essere assegnati i singoli elementi.



### Richiamare i vettori all'interno di un vettore

E come richiamare un valore di un vettore? Anche qui nulla di complesso, supponendo di voler richiamare l'elemento "`n`", lo si può richiamare scrivendo: 
`nomevettore[n-1]` 

>  Nota: 
>
>  gli indici dei vettori partono da `0`, quindi il vettore `int [] voti {3,2,5};` ha si tre celle, ma la prima ha indice `0`, la seconda indice `1` e la terza indice `2`. 
>  Riferendoci all'esempio quindi: 
>
>  - `voti[0] = 3`
>  - `voti[1] = 2`
>  - `voti[2] = 5`



Avendo il numero della cella (o indice) possiamo operare per l'appunto su quel singolo valore:

- assegnargli un valore : `nomevettore[indice]=valore;` 
- stamparlo o usarlo in un calcolo : `System.out.println(nomevettore[indice]);` 



Possiamo sempre sapere quante celle ha un vettore (numero **massimo** degli elementi) usando la parolina magica `length`:

`nomevettore.length`. L'ultimo elemento avrà indice `nomevettore.length-1`



### Uso dei vettori

In generale i vettori si operano *a partire dai loro elementi*, per stampare ad esempio i valori di un vettore, dovrete prendere ad uno ad uno le celle e stamparle. 

Detta così sembra complicato ed inutile, immaginatevi vettori di 100 elementi operati singolarmente uno ad uno, *cosa ci porterebbe ad usare un vettore e non tante variabili separate*?

In realtà usando i *loop* le operazioni su un vettore risultano molto semplici! 
Vediamo un esempio concreto. Supponiamo di avere 5 voti, e volerne fare la media.
Senza vettori sarebbe: 

```java
public class SenzaVettore{
        public static void main(String...args){

                int voto1=7, voto2=5,voto3=9,voto4=6,voto5=10;

                int media=voto1+voto2+voto3+voto4+voto5; 
                media=media/5;

                System.out.println(media);

        }
}
```



Ora vediamo come sarebbe  lo stesso codice ma con i vettori: 

```java 
public class vettore{
        public static void main(String...args){

                int[] voti = {7,5,9,6,10};

                int media=0;  
                for(int i=0;i<voti.length;i++) media+=voti[i];

                media=media/voti.length;

                System.out.println(media);

        }
}
```



Ad un primo occhio: **abbiamo scritto addirittura un istruzione in più**! Ma osserviamo alcuni vantaggi: 

- non abbiamo dovuto creare 5 variabili per i voti, ma una sola che le rappresenta tutte e 5, che è più facile da richiamare
- il codice non dipende più dal numero di voti: se un giorno i voti diventassero 10, ci sarebbe solo da aumentare i numeri nel vettore, il resto verrebbe tutto aggiornato di conseguenza
- se ci fosse più di un operazione per ogni singolo elemento da fare, il numero di istruzioni aumenterebbe in proporzione: due istruzioni per variabile raddoppierebbero; con la gestione del `for` invece, ogni istruzione viene applicata a tutte le variabili.



### Un esempio più chiaro

Se non siete ancora convinti, vediamo un esempio più complesso: *avendo una serie di 10 caratteri, vogliamo trasformare le maiuscole in minuscole e le minuscole in maiuscole, stampare tutte le variabili e mandare solo all'ultima variabile a capo*. 

Già solo il pensiero di inizializzare *10 variabili char* personalmente mi fa venire l'angoscia, senza scriverlo dunque tutto, ecco come apparirebbe un programma senza i vettori nelle sue prime righe:



```java
public class SenzaVettore{

        public static void main (String [] args) {
                //inizializziamo le variabili
                char c1='c',
                        c2='I',
                        c3='a',
                        c4='O',
                        c5=' ',
                        c6='A',
                        c7=' ',
                        c8='v',
                        c9='O',
                        c10='i';

                //controlliamo una per una
                //che sia una lettera e che sia minuscola o maiuscola
                if (c1>='a'&&c1<='z'){
                        // c1 è minuscola, va trasformata in maiuscola
                        c1=(char)(c1-'a'+'A');
                } else if(c1>='A' && c1<='Z'){
                        //c1 è maiuscola, va trasformata in minuscola
                        c1=(char)(c1+'a'-'A');
                } 
                // se non è ne una lettera minuscola ne maiuscola non faremo nulla

                //controlliamo ora c2..
                if (c2>='a'&&c2<='z'){
                        // c2 è minuscola, va trasformata in maiuscola
                        c2=(char)(c2-'a'+'A');
                } else if(c2>='A' && c2<='Z'){
                        //c1 è maiuscola, va trasformata in minuscola
                        c2=(char)(c2+'a'-'A');
                } 

                // e cosi via per altre 8 volte...
            	System.out.println(""+c1+c2+c3+c4+c5+c6+c7+c8+c9+c10);
        }

}

```



Inizia a diventare un po' più difficile da leggere vero? Vediamo ora lo stesso programma, con i vettori: 

```java
public class ConVettore{

        public static void main (String [] args) {

                char [] c= {
                        'c','I','a','O',
                        ' ','A',' ',
                        'v','O','i'
                };
                
                //controlliamo una per una
                //che sia una lettera e che sia minuscola o maiuscola

                for (int i=0; i<c.length;i++){ 
                        if(c[i]>='a'&&c[i]<='z')
                            c[i]=(char)(c[i]-'a'+'A');
                        else if ( c[i]>='A'&&c[i]<='Z') 
                       		c[i]=(char)(c[i]-'A'+'a'); 

                        System.out.print(c[i]);
                }

                System.out.println();
        }

}

```



- più corto
- più semplice da modificare
- più semplice da leggere 



### Problemi con i vettori : cosa non bisogna fare

I problemi più comuni con i vettori son sicuramente i così detti `IndexOutOfBound`: ovvero quando, per difetto o per eccesso che sia, si esce al di fuori delle celle riservate. 
Replichiamo uno dei casi che sicuramente si verifica di più : 

```java
int [] voti = new voti[5];

voti[5]=3;
```

`voti[5]` **non esiste**. Come già detto in precedenza, gli indici dei vettori partono da 0, quindi variano da *0 al numero di elementi meno 1*. `voti[5]` esce fuori dal range, poiché l'ultimo elemento è `voti[4]`

Analogamente non esiste, per ovvi motivi, `voti[-1]`. Difficilmente in programmazione si utilizzano gli indici espliciti comunque, in genere si utilizzano all'interno di un *ciclo di for*, vediamo in questo caso come si potrebbe sbagliare: 

```java 
for (int i=0; i<=vettore.length; i++)
```

Questo è **sbagliato** poichè gli indici come già detto prima dovrebbero arrivare a `vettore.length-1`, motivo per cui all'interno di un for si utilizza il `<` non `<=`



### Scorrere i vettori al contrario, come non farlo e come farlo

Un altro caso tipico, scorriamo un vettore ma al contrario (dall'ultima cella fino alla prima):

```java
for (int i=vettore.length; i>0; i++)
```

Questo è sbagliato per diversi motivi: 

- se `i` parte da `vettore.length` si ricade negli errori di cui sopra 
- Al contrario del caso precedente, scorrendo un vettore al contrario ci sarà sempre l'uguaglianza nella comparazione, poiché l'ultima cella da visitare sarà proprio `0`. 
- `i` dovrà decrementare, non incrementare

La forma giusta sarebbe stata:

```java
for (int i=vettore.length; i>0; i++)
```



## Le stringhe sono un vettore di caratteri ? 

La risposta è **si**. 

In alcuni linguaggi questo è esplicito mentre in Java è tutto nascosto dietro al tipo "Stringa", che consente poi di operare su una serie di operazioni, tuttavia questo introduce delle complicazioni a coloro che ancora non sanno cos'è un **oggetto**.

Innanzitutto le Stringhe sono **vettori immutabili**, non potete modificarne i singoli caratteri, ogni aggiunta o modifica ad una stringa porterà ad una nuova istanza. *Ho purtroppo visto professionisti fare errori gravi non sapendo questa cosa*.

Essendo immutabile, una stringa può solo essere letta, e questo accade tramite la parolina magica `charAt` *seguita dall'indice del carattere tra parentesi tonde*. Vediamo come usarla: 

```java 
String alfa="Ciao a tutti";
System.out.println(alfa.charAt(2)); // stamperà a
```



Per sapere la lunghezza useremo sempre la parolina "`length`" ma seguita da due parentesi tonde: `()`



Riprendiamo l'esempio delle maiuscole e vediamo come affrontarlo usando però la Stringa come un vettore: 

```java
public class ConStringa{

        public static void main (String [] args) {
                String frase="cIaO A vOi";
            
                for (int i=0; i<frase.length();i++){ 
                    System.out.print( 
                        (frase.charAt(i)>='a'&&frase.charAt(i)<='z') ? // if ternario
                            (char)(frase.charAt(i)-'a'+'A') :
                        (frase.charAt(i)>='A'&&frase.charAt(i)<='Z') ? //elseif ternario
                       		(char)(frase.charAt(i)-'A'+'a') :
                        frase.charAt(i) // else
                     ); // qui finisce System.out.print
                }
                System.out.println();
        }

}
```



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
