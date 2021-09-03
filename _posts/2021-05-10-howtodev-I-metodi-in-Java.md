---
title: '#howtodev - I metodi in Java' 
date: 2021-05-10
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- java  
---

[PRECEDENTE: Guida Java Parte 3 - Vettori&larr;](https://linuxhub.it/articles/howtodev-introduzione-ai-vettori-in-java/)

[SUCCESSIVO: Guida Java Parte 5 - Metodi Ricorsivi&larr;](https://linuxhub.it/articles/howtodev-metodi-ricorsivi-java/)

Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 



## Obiettivi 

In questo articolo saranno trattate le funzioni e le variabili statiche in Java ed i migliori metodi per suddividere in sezioni il proprio file di codice. Nel dettaglio si vedranno:

- creazione dei metodi statici in un file 
- il main come funzione statica


## Prerequisti 

I requisiti per la piena comprensione di questo articolo sono stati affrontati nell'articolo:   

[*Introduzione ai vettori in java*](https://linuxhub.it/articles/howtodev-introduzione-ai-vettori-in-java) 



E nei precedenti. 
Se siete novizi di Java potete iniziare direttamente da [*Introduzione alla programmazione java*](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java)



## Organizzazione del codice 

Istintivamente son sicuro che molti novizi son portati a scrivere il codice in un unico listone continuo, il che mi vien da dire anche che, in una prima stesura, è una cosa corretta per fare brainstorming.   

Ma le cose non possono restare così, il codice ha bisogno di una buona organizzazione per facilitarne alcuni dei più importanti principi di progettazione.



### I principi dell'ingegneria del software

Quando si parla di strutturare un progetto di programmazione si sente parlare spesso di *suddividere in sotto problemi* e di *qualità del codice*, questo perché esistono dei punti fissi della logica che quando si lavora su grandi idee e in grandi team fanno la differenza ed aiutano a semplificare quella che si chiama "**manutenzione del codice**", che rappresenta poi il 90% dell'intero operato.

Giusto per elencare alcune di queste buone norme, detti anche **i principi dell'ingegneria del software**, si parla di: 

- **Riusabilità**: in quanti altri posti si potrebbe riusare questa logica senza riscriverla? 
- **Evolvibilità**: è semplice aggiungere funzionalità a questo codice? 
- **Riparabilità**: è semplice riparare questo codice ed individuare subito la causa del problema? 
- **Manutentibilità**: è semplice modificare il comportamento del software?


Già solo rispondere al primo quesito con gli strumenti affrontati fin ora è difficile, se non si ha conoscenza dei *metodi* o  *funzioni*



## Le funzioni in Java 

Supponiamo per un momento di poter prendere un pezzo del nostro codice, dargli un nome, e poterlo richiamare attraverso quel nome come se fosse una sola istruzione. Sarebbe comodo vero? I metodi (o funzioni) rispondono a questa necessità. 



### Metodi statici in Java

Esistono varie tipologie di metodi, vediamo come si strutturano i così detti metodi *statici*:

```java 
static tiporitorno nomeMetodo(lista, parametri){
	// corpo del metodo
}
```

dove al posto di:
- *tiporitorno* dobbiamo inserire un tipo primitivo o una classe. Questo valore indicherà cosa produce il metodo
- *lista,parametri* potrete inserire una lista di coppie: `tipoparametro nomeparametro` separate da virgola e rappresenteranno delle variabili che potrete passare dall'esterno del metodo


### Esempio



Per fare un esempio immediato, vediamo subito di risolvere un problema prima con un approccio classico, quindi poi con i metodi.



Immaginiamo la seguente situazione: dati 10 caratteri vogliamo trasformare da maiuscolo a minuscolo e viceversa tutti i caratteri se son lettere. Il codice in un main sarebbe una cosa del genere: 

```java 
public class MaiuscoleMinuscole{

        public static void main (String [] args) {

                char [] c= {
                        'c','I','a','O',
                        ' ','A',' ',
                        'v','O','i'
                };

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



Supponiamo ora di voler impostare una struttura che faccia la conversione per qualsiasi altro vettore.  



Facciamo quindi un metodo che prende un vettore di caratteri in input e lo modifica:

```java
static void convertiMaiuscole(char [] lettere){
    for (int i=0; i<lettere.length;i++){ 
        if(lettere[i]>='a'&&lettere[i]<='z')
            lettere[i]=(char)(lettere[i]-'a'+'A');
        else if ( lettere[i]>='A'&&lettere[i]<='Z') 
            lettere[i]=(char)(lettere[i]-'A'+'a'); 
    }
}
```



Sostituiamolo al main di cui sopra: 

```java
public class MaiuscoleMinuscole{
    static void convertiMaiuscole(char [] lettere){
        for (int i=0; i<lettere.length;i++){ 
            if(lettere[i]>='a'&&lettere[i]<='z')
                lettere[i]=(char)(lettere[i]-'a'+'A');
            else if ( lettere[i]>='A'&&lettere[i]<='Z') 
                lettere[i]=(char)(lettere[i]-'A'+'a'); 
        }
    }
    public static void main (String [] args) {

        char [] c= {
            'c','I','a','O',
            ' ','A',' ',
            'v','O','i'
        };

        convertiMaiuscole(c);

        for (int i=0;i<c.length;i++) {
            System.out.print(c[i]);
        }


        System.out.println();
    }

}
```


Il software funziona esattamente come prima! 

Analizziamo l'intestazione del metodo:  

`static void convertiMaiuscole(char [] lettere)`

- `static` : appare nuovamente questa parolina magica e ne ritarderemo un altra volta l'apprendimento. Per ora ricordiamoci solo di scriverla in ogni metodo
- `void` se non avete un tipo di ritorno, la sua mancanza si indica con questa parola 
- `convertiMaiuscole` questo è il nome che abbiamo scelto per il metodo. Per la convenzione di Java i nomi di metodi iniziano con minuscola ed un cambio di parola si indica con una lettera maiuscola. Questa metodologia è detta **dromerdaryCase**
- `char [] lettere` è il parametro del metodo, rappresenta una variabile che verrà data da fuori il metodo ma verrà operata come se fosse una variabile del metodo stesso. 



### Complichiamo l'esempio

Complichiamo di più le cose, aggiungiamo i seguenti metodi:

- un metodo per stampare a schermo un vettore
- un metodo per sapere se una lettera è minuscola
- un metodo per convertire una minuscola in Maiuscola e viceversa

E poi applichiamoli per rendere il nostro codice ancora più malleabile e comprensibile.



Ma come si costruisce un metodo? dobbiamo avere ben saldi *qual'è il nostro obiettivo*, ragionare **su quali parametri ci servono* e *cosa dovrà restituire il metodo* nel punto in cui lo richiameremo dall'esterno



#### Stampare un vettore

Rispondiamo alle domande di cui sopra:

- qual è il nostro obiettivo? dato un vettore di caratteri, visualizzarlo a schermo tramite `System.out.print` come se fosse una parola o una frase

- quali parametri servono per stampare un vettore? il vettore!
- cosa viene restituito? Nulla, poichè la stampa viene effettuata già nel metodo



Ora possiamo costruire il nostro metodo:

```java
static void stampaCaratteri(char[]lettere){
    for(int i=0;i<lettere.length;i++) System.out.print(lettere[i]);
}
```



> **NOTA**:  
>
> In genere non vale la pena creare un metodo per un istruzione o due. Creare troppi metodi potrebbe diventare più confusionario che farne uno che faccia più cose, tuttavia alcune volte potrebbe essere anche necessario. In ogni caso è sempre buona norma fare un brainstorming iniziale in un listato di codice intero inizialmente e poi suddividere le varie zone del codice



#### stampare un vettore, variante 

Normalmente non si delega un metodo a stampare una variabile, si preferisce invece far si che il metodo produca una `String` che poi può essere manipolata in seguito. Questo approccio oltre ad essere più malleabile è anche più performante nel caso di dover stampare più volte una determinata variabile complessa.

Vediamo come migliorare quindi il codice precedente rispondendo alle tre solite domande 

- qual è il nostro obiettivo? dato un vettore di caratteri, generare una stringa che ne racchiuda i valori
- quali parametri servono? Il vettore!
- cosa viene restituito? Una stringa

Quindi:

```java
static String stampaCaratteri(char[]lettere){
    String risultato="";
    for(int i=0;i<lettere.length;i++) risultato=risultato+lettere[i];
    return risultato;
}
```



Notiamo subito la presenza di una nuova parolina, ovvero `return`.  Quando un metodo incontra la parola `return` si aspetta dopo una variabile che ha lo stesso tipo indicato come ritorno, genera quindi il risultato del  metodo e si ferma. *Se ci sono istruzioni in seguito non vengono eseguite.* 

Scrivere istruzioni dopo una return, *senza che ci sia alcuna struttura di controllo che può generare un caso in cui quella return non viene eseguita*, darà come risultato degli errori per cui il vostro codice **non verrà compilato**, l'errore in questione dirà che alcune parti di codice sono *irrangiugibili*, ovvero **unreachable statement**. 



#### Sapere se una lettera è minuscola 

- qual è il nostro obiettivo? Dato un char, sapere se è minuscolo
- quali parametri servono? Il char
- cosa viene restituito? Un boolean, true se la variabile è minuscola

Urge una domanda, *un carattere che non è minuscolo, è maiuscolo*? Se avete risposto di sì, non avete ancora chiaro che un carattere non significa una lettera dell'alfabeto. Anche uno spazio o un punto esclamativo sono caratteri. Tuttavia, un carattere che non è né minuscolo né maiuscolo si può per certo dire che non faccia parte dell'alfabeto, quindi **faremo entrambe le varianti** !

  

```java
static boolean minuscola(char lettera){
    return 'a'<=lettera && lettera <='z';
}

static boolean maiuscola(char lettera){
    return 'A'<=lettera && lettera <='Z';
}
```



#### Conversione di una lettera in maiuscola o minuscola

- qual è il nostro obiettivo? Dato un char, se è una lettera minuscola trasformarlo in maiuscolo, se è una lettera maiuscola trasformarla in minuscola
- quali parametri servono? Il char
- cosa viene restituito? Il char trasformato se faceva parte dell'alfabeto, altrimenti se stesso



```java
static char invertiMinuscolaMaiuscola (char lettera) {
    return (char) ( lettera + (
        minuscola(lettera) ? 'A' - 'a' : 
        maiuscola(lettera) ? 'a' - 'A' :
        0 )
	);
}
```



#### Unendo tutto

Vediamo ora come uscirebbe un software con tutti questi metodi 

 ```java
public class MaiuscoleMinuscole { 
    
	static char invertiMinuscolaMaiuscola (char lettera) {
        return (char) ( lettera + (
            minuscola(lettera) ? 'A' - 'a' : 
            maiuscola(lettera) ? 'a' - 'A' :
            0 )
        );
	}
    
    static boolean minuscola(char lettera){
        return 'a'<=lettera && lettera <='z';
    }

    static boolean maiuscola(char lettera){
        return 'A'<=lettera && lettera <='Z';
    }
    
    static String stampaCaratteri(char[]lettere){
        String risultato="";
        for(int i=0;i<lettere.length;i++) risultato=risultato+lettere[i];
        return risultato;
    }
    
    static void convertiMaiuscole(char [] lettere){
        for (int i=0; i<lettere.length;i++) 
            lettere[i]= invertiMinuscolaMaiuscola(lettere[i]);
    }
    
    public static void main (String [] args ) {
        char [] c= {
            'c','I','a','O',
            ' ','A',' ',
            'v','O','i'
        };
        
        convertiMaiuscole(c);
        
        System.out.println(stampaCaratteri(c));
        
    }
    
}
 ```



#### Ma a che vantaggio? 

Sembra che invece di aver semplificato un codice, lo abbiamo reso più complesso, più lungo e forse anche meno performante.  

Vediamo ora perché non è affatto così, analizzando i principi elencati ad inizio articolo.

- **Riusabilità**: l' esempio più banale è quello di voler attuare la stessa operazione a più vettori, quest'operazione allo stato attuale non aggiungerebbe alcuna complessità al codice infatti, basterebbe inizializzare il vettore e darlo in pasto ai due metodi
- **Evolvibilità**: Supponendo di voler aggiungere un ulteriore funzione al processo, si dovrebbe scrivere solo un ulteriore metodo decidendo poi dove va inserito
- **Riparabilità**: Se si scoprisse un bug nel processo, sarebbe semplice individuare dove fare la correzione poichè ogni metodo in media a poche righe di codice da controllare
- **Manutentibilità**: Supponendo di voler modificare un comportamento, come stampare un fine linea ogni vettore, basterebbe agire su un solo metodo (quello della stampa)



### Passaggio per valore 

Le variabili ai metodi son **passate per valore**, ciò significa che *cambiando il valore di una variabile in un metodo, la modifica non si ripercuote al di fuori del metodo*.

Ma qualcuno avrà già notato che nel caso del metodo che modifica il vettore di caratteri non è stato così. Cosa cambia in quel caso?

Nulla, come già detto in passato, una variabile complessa (esattamente come un vettore, che è un insieme di valore quindi più complesso di un tipo primitivo semplice) è conservata in memoria tramite un numero intero detto **puntatore**.

Il puntatore è poi un indirizzo di memoria in cui vengono scritti effettivamente i valori. Quando in un metodo viene passato un puntatore, se si fa una modifica ad un dato che viene indicato dal puntatore e non al puntatore stesso, la modifica è effettiva in memoria



Se non è ancora chiaro si osservi questo schema: 

![stack](/uploads/java/stack.png)



Normalmente le variabili sono memorizzate nello stack, ovvero *una parte della memoria ordinata* che lavora con ordine **LIFO** ( l' ultimo arrivato è il primo valore che viene poi operato ). Un puntatore come è stato già detto, è un numero che indica l'indirizzo dove si può trovare quel dato, ma quel dato si trova in un area di memoria detta **HEAP** in cui non esiste un ordine:

![stackheap](/uploads/java/vettore.png) 

quando viene modificato un dato in un vettore, non viene modificato il suo valore nello stack, ma uno dei suoi valori nell'heap.

*Quando viene invocato un metodo, viene duplicato il suo valore sullo stack*, ma che succede se quel valore è un puntatore? Il valore del puntatore viene duplicato ma punterà sempre allo stesso dato dell'heap.



**Per riassumere:** *le variabili passate ai metodi normalmente non ripercuotono modifiche al di fuori del metodo, ció non vale però per oggetti e dati complessi.*



## Il main 

L'avrete quindi capito, anche *il main è una funzione*

>  *Sò Lillo*. cit

Precisamente il main è la prima funzione avviata in una classe da Java, se presente; non restituisce alcun valore e prende come parametro un vettore di stringhe.

Dove troviamo questo vettore di stringhe? È una lista di parole che possiamo passare da terminale quando eseguiamo il codice. 
Supponiamo il codice: 

```java
public class TestParametriMain {
    public static void main(String [] args) { 
    	for ( int i=0 ; i<args.length;i++) {
            System.out.println(args[i]);
        }
    }
}
```

Compiliamolo ed eseguiamolo così: 

```bash
javac TestParametriMain
java TestParametriMain ciao come stai
```


il risultato sarà 

```bash
ciao
come 
stai
```

Poiché per ogni spazio viene sotto inteso un nuovo parametro.

Se vogliamo passare un parametro che contenga spazi dobbiamo usare le virgolette: 

```bash
>java TestParametriMain "ciao come stai"

ciao come stai
```







Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople)
