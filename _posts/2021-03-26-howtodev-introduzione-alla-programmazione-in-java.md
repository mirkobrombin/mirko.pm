---
title: '#howtodev - Introduzione alla programmazione in Java'
date: 2021-03-26
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - java  
---

[Come installare java&larr;](https://linuxhub.it/articles/howto-installare-java/)  

[SUCCESSIVO: Guida Java Parte 2 - Blocchi di codice&larr;](https://linuxhub.it/articles/howtodev-introduzione-ai-vari-blocchi-di-codice-in-java/)  

Java è stato per anni uno dei linguaggi più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 

## Obiettivi 

In questa guida spiegheremo le **basi della programmazione procedurale** in Java. 

Questo significa che porteremo il lettore da una conoscenza nulla del linguaggio ad una conoscenza base di Java, fino a poter scrivere e testare i primi programmi di calcolo senza un'interazione da parte dell'utente. 

Per farlo saranno affrontate le seguenti fasi: 

- Apprendimento di un template semplice per ogni programma
- Apprendimento dei vari termini chiave di Java
- Apprendimento dei tipi di base e alcuni tipi complessi
- Calcoli
- Stampe a schermo 

## Prerequisiti

La comprensione di questo articolo prevede prerequisiti logici e matematici di base:

- Operazioni aritmetiche di base (somme, sottrazioni, moltiplicazioni, potenze ecc..)
- Aritmetica booleana di base (true, false, and, or ...)
- Conoscenza dei calcoli matematici in base 2 (binario)
- Conoscenze preliminari di cosa sia la codifica ASCII

Dovete anche aver già scaricato una JDK funzionante (qualunque va bene), avere un editor di testo e conoscere le basi del terminale. Per questo vi rimando al nostro articolo [sull'installazione della JRE e della JDK](https://linuxhub.it/articles/installazione-di-openjdk-jre).

> Nota: Il prerequisito più importante, in realtà, è la **pazienza**. Spesso vedo giovani ignari avventurieri che sfavillanti esordiscono con: "*Salve io vorrei imparare a programmare. Come faccio a scrivere un gioco?*". La programmazione, così come ogni altra arte, ha bisogno di studio e dedizione, l'approccio migliore non è quello di avere fretta, ma iniziare da cose semplici e banali che però siano ottimi esempi didattici.

## public, static, void, main e altri paroloni scoraggianti

Un programma basilare di Java inizia con paroloni di cui, inizialmente, non capirete nulla, ma che diventeranno fino alla loro piena comprensione una sorta di mantra spirituale.

Le magiche scritture di cui parlo sono:

```java
public class NomeFile {
    public static void main (String [] args){
        // qui scriverete il vostro codice
    }
}
```

Se pur non è intenzione dell'articolo quello di demistificare subito l'alone di magia intorno a questi termini, vogliamo dare una leggera infarinatura del loro significato, in modo che restino inizialmente più impressi:

- `public class`: Java è un linguaggio *orientato ad oggetti*, ma cosa si intende per la parola **oggetto**? È una porzione di codice che rappresenta un concetto a sé stante, ad esempio un *Punto* nel piano, un *Prodotto* oppure un *Utente*. Questi oggetti in Java sono identificati dalla parolina `class`, e nello specifico la `public class` è un oggetto che rappresenta un intero file in cui scriverete il vostro codice. Per questo è importante chiamare il file `.java` con la stessa nomenclatura che userete dopo queste due parole. In poche parole, al file `NomeFile.java` corrisponderà la vostra `public class NomeFile`.
- `public static void main`: all'interno delle classi le porzioni di codice son suddivise ulteriormente in sezioni richiamabili con un nome, detti "**metodi**" o "**funzioni**". Queste sezioni in Java possono prelevare dei cosiddetti "**parametri**" che poi possono essere utilizzati all'interno, e possono restituire a loro volta un valore come risultato dell'esecuzione. In tantissimi linguaggi di programmazione il `main` è il metodo che viene eseguito quando si esegue quel file, e Java in questo non fa eccezione. Eseguendo quindi **NomeFile**, Java cercherà il metodo *main* con esattamente queste parole. Il *main* non restituisce alcun valore in Java, per questo motivo prima del suo nome viene scritto `void`, cioè "vuoto" o "nullo". Il metodo deve essere raggiungibile dalla JVM che lo chiama, perciò la parolina `public` lo rende visibile all'esterno. La parola "static" è un po' più complessa da spiegare senza informazioni pregresse, e verrà quindi chiarita dopo aver spiegato quanti e quali tipi di classi esistono in Java.   

Le porzioni, sezioni o i blocchi di codice in Java sono tutti delimitati da *parentesi graffe*, all'interno del quale possiamo scrivere poi il nostro codice. Ed è qui che inizia la vera programmazione.

## Compilare ed eseguire un programma in Java

Si provi per quest'operazione ad eseguire un programma completamente vuoto, come quello di cui sopra nell'esempio, scrivendo quindi in un file chiamato `NomeFile.java` le linee di codice: 

```java
public class NomeFile {
    public static void main (String [] args){
    }
}
```

Poi, con il terminale o command prompt, andiamo nella cartella del file e digitiamo: 

```bash 
# Per compilare:
javac NomeFile.java

# Per eseguire: 
java NomeFile
```

Non ci sarà alcun output ovviamente, il  programma è vuoto. Ma servirà come base per scrivere poco a poco le istruzioni di cui discuteremo in questo articolo.

## Le istruzioni di java

Ogni pezzo di codice che esegue un operazione è detta **istruzione**, e ogni istruzione in Java deve terminare con il `;`. A dire il vero, l'istruzione più semplice esistente è proprio quella vuota, formata cioè solo dal carattere delimitatore. Proviamo quindi a scrivere:

```java
public class NomeFile {
    public static void main (String [] args){
        ;
    }
}
```

Compliando ed eseguendo il file noteremo che l'output continua a rimanere vuoto.

Le istruzioni che iniziano per i caratteri `//` o stanno tra i caratteri `/*` e `*/`  son chiamati "**commenti**". Non sono interpretate da Java e vengono ignorate, poiché servono al programmatore e al suo team per lasciare spiegazioni o messaggi che, si spera, siano chiari. 

Si parlerà in un altro articolo di un particolare tipo di commento racchiuso tra i caratteri `/**` e `*/`  detto "*javadoc*", che consentirà di documentare in maniera accurata e intelligente il codice.

Ecco un esempio di codice con commenti: 


```java
public class NomeFile {
    public static void main (String [] args){
        //questo è un commento su una linea
        
        /* per scrivere un commento su più righe
         * è consigliato usare quest'altra 
         * forma di commento 
         * 
         */
        
        ; // <- questa è un istruzione vuota. ma già lo sapevate 
    }
}
```

Ovviamente la compilazione, così come l'esecuzione di tale programma, porterà ad un output vuoto, esattamente come se fosse senza commenti, poiché tutto viene ignorato.

### Inizializzazione di una variabile

Facciamo quindi un passo in più, e creiamo nel nostro programma un piccolo contenitore che al suo interno conserverà un valore a nostra scelta, un numero, un carattere o anche un testo. Questo contenitore è detto "**variabile**".
Si parta un attimo con una regressione: nelle versioni di *Java precedenti alla 10*, le variabili andavano create (o più correttamente **inizializzate**) con la loro tipologia davanti. Un po' come in fisica, Java voleva sapere se quando parlavate di qualcosa erano cavoli, metri o persone.

Le tipologie si dividono in tipi primitivi e oggetti complessi. Partiamo dai primitivi: 

| Tipo    | Descrizione                                                  | Bit  |
| ------- | ------------------------------------------------------------ | ---- |
| `byte`  | Tipo numerico intero base                                    | 8 |
| `short` | Tipo numerico intero piccolo                                 | 16 |
| `int`     | Tipo numerico intero utilizzato normalmente                  | 32 |
| `long`    | Tipo numerico intero più grande                              | 64 |
| `float`   | Tipo numerico con virgola                                    | 32 |
| `double`  | Tipo numerico con virgola più grande                         | 64 |
| `char`    | Una lettera                                                  | 16 |
| `boolean` | Booleano, per chi non fosse avvezzo significa indicare "**vero**" o "**falso**" | 1 |

I tipi complessi son veri e propri oggetti, ed ogni tipo primitivo ha un suo corrispettivo complesso (detta anche classe *wrapper*). Non è propriamente possibile calcolarne lo spazio occupato, ma superficialmente potremmo dire che ogni tipo complesso occupa 32/64 bit (in corrispondenza a quanti bit è la propria architettura).

Quello spazio occupato è in realtà un "**puntatore**" che indica un'area riservata in memoria che conterrà poi tutti i dati che richiede quel tipo. Il concetto di puntatore e di aree di memoria verrà trattato in un altro articolo.

Alcuni dei tipi complessi più usati sono:

| Tipo    | Descrizione                                                  |
| ------- | ------------------------------------------------------------ |
| `String` | Una sequenza di caratteri, non modificabile |
| `Object` | Il padre di tutti gli oggetti e tipi complessi di Java |
| `Byte` | Wrapper di `byte`                                      |
| `Short` | Wrapper di `short`                                     |
| `Integer` | Wrapper di `int`                                       |
| `Long` | Wrapper di `long`                                      |
| `Float` | Wrapper di `float`                                     |
| `Double` | Wrapper di `double`                                    |
| `Character` | Wrapper di `char`                                      |
| `Boolean` | Wrapper di `boolean` |

Senza entrare ancora più nel dettaglio, modifichiamo il nostro programma che inizializza tutti e soli i tipi primitivi: 

```java
public class NomeFile {
    public static void main (String [] args){
        /* Vediamo come inizializzare i tipi interi, e il range supportato */
        
        // byte, valori da -128 a 127
        byte by=127;
        
        // short, valori da -32768 a 32767
        short sh=32767;
        
        // int, valori da -2147483648 a 2147483647
        int in=2147483647;
        
        // long, valori da  -9223372036854775808 a 9223372036854775807
        long lo=9223372036854775807L;
        /* ^ notare che, per aggiungere un numero long che superi 
         * il numero di cifre di un normale int, va aggiunto il carattere L
         * alla fine dello stesso */
        
        /* Vediamo come inizializzare i tipi numerici con virgola, e la relativa precisione*/
        
        // float, precisione da 1.4E-45f a 3.4028235E38
        float fl=3.40282356e38f;
        /* ^ da notare due dettagli: 
         *    - È possibile usare la lettera 'e' per indicare la potenza di 10 ( 1e2 = 10^2 = 100 ), il risultato sarà sempre un double
         *    - f a fine numero lo fa diventare float, come l nel caso precedente
         */
        
        // float, precisione da 4.9E-324 a 1.7976931348623157E308
        double dl=1.7976931348623157e308;

        /* Ultimi due tipi primari: i booleani e i caratteri */
        
        // boolean, i valori possibili sono solo true e false
        boolean bl=true;
        
        /* char, i caratteri in java  
         * (differentemente da altri linguaggi) 
         * hanno 2 bytes di range, a coprire sia
         * i caratteri ASCII che UTF
         */ 
        char ch='a'; 
        // ^ i caratteri vanno messi tra apici singoli 
        
    }
}
```

Notiamo che, oltre al tipo, la variabile ha un **nome**. Possiamo dare qualunque nome purché non sia già definito: i nomi preferiti dagli informatici in erba sono **pippo**, **i**, **j** o semplicemente ripetere il nome del tipo o le sue iniziali, ma non c'è un qualche tipo di regola che dice cosa sia più giusto mettere rispetto ad altro.

I caratteri supportati sono quelli **Alfanumerici + underscore**, ma non è possibile avere un numero come primo carattere del nome. Nomi validi sono:

-  `la_variabile`
- `UN_ALTRA_VARIABILE` 
- `variabile2`
- `_un_serpente`

Esiste però una *convenzione* che ci aiuta a decidere la forma che questo nome deve avere (Maiuscolo? Minuscolo? Con i trattini bassi?). Parleremo successivamente, però, della **Java convention name**.

#### var: da Java 10 in poi

Come citato in precedenza, da Java 10 in poi è possibile inizializzare una variabile senza specificare direttamente il tipo, con la parolina magica `var`:

```java
public class NomeFile {
    public static void main (String [] args){
        var intera=1; // inizializza un int
    }
}
```

Non è però un abitudine che consiglio. Java resta un *linguaggio fortemente tipato*: per fare un paragone, se immaginiamo una variabile come una scatola, essa ha esattamente la forma di ciò che deve contenere. Una scatola creata per bicchieri non conterrà mai un piatto e viceversa. Scrivere il tipo di una variabile prima del suo nome è un po' come etichettare la scatola scrivendo "**CONTIENE BICCHIERI**".

Certo, chi ha impacchettato il bicchiere sa cosa contiene e magari non ha utilità tenere l'etichetta in quest'ottica, ma quando la stanza vi si riempirà di anonime scatole di dimensioni e forme diverse continuerete a capire cosa contiene ognuna di esse?

Spero di avervi fatto comprendere come, scrivere `var` al posto del tipo della variabile, può essere controproducente.

### Inizializzare e concatenare le stringhe

Tra i tipi base non vi è un modo per creare parole, frasi o testi. Questo genere di dato è detto comunemente **Stringhe** o meglio ancora, in Java, le `String`, e sono un oggetto complesso, figlio di `Object`. Sono oggetti un po' speciali, poiché interpretati "*nativamente*" dal compilatore di Java.

Ma un esempio vale più di mille parole: 

```java
String frase="sopra la panca la capra campa";
```

Si può notare che le stringhe sono racchiuse tra doppie virgolette! 

Questo non è l'unico modo per instanziare una String in Java, ma sicuramente il più comodo.

## Operazioni con i vari tipi di dato

Ogni tipo di dato primitivo (più le stringhe, che ricordiamo fare eccezione) può essere elaborato e trasformato attraverso delle operazioni matematiche e/o logiche. Parliamo di somme, sottrazioni, disgiunzioni e congiunzioni logiche e altro ancora. 

### Operazioni matematiche intere

Partiamo da quelle che sono sicuramente più intuitive, cioè le operazioni matematiche intere. Giusto per togliere ogni dubbio, si parla non solo degli `int`, ma anche `byte`, `short` e `long`.

Le operazioni disponibili sono: 

| Operazione                | Simbolo | Codice esempio | Risultato |
| ------------------------- | ------- | -------------- | --------- |
| **Somma**                 | `+`     | `2+5`          | *7*       |
| **Sottrazione**           | `-`     | `2-5`          | *-3*      |
| **Moltiplicazione**       | `*`     | `2*5`          | *10*      |
| **Divisione**             | `/`     | `2/5`          | *0*       |
| **Resto** (o **Modulo**) | `%`     | `2%5`          | *2*       |


#### zucchero sintassico e auto incremento
Si può usare nelle operazioni una particolare abbreviazione per aggiornare direttamente il valore di una variabile chiamata **auto-assegnamento**. 

L'esempio più inflazionato è l'**auto-incremento** (o **auto-decremento**): 
- `a++` che equivale a `a=a+1`
- `a--` che equivale a `a=a-1` 

Gli auto-incrementi possono essere a loro volta assegnati: 
```java
int a=1;
int b=a++;
int c=b--;
```

Nell'esempio di cui sopra, alla fine si avrà: 
- a=2
- b=0
- c=1

è importante notare che l'assegnamento avviene prima dell'incremento o del decremento, si può utilizzare però l'incremento a priori mettendo il nome della variabile dalla parte destra degli operatori:   
```java
int a=1;
int b=++a;
int c=--b;
```

In questo modo alla fine, a=2, b=1; c=1;

In modo equivalente si può utilizzare la sintassi srotolare l'incremento `a++` in `a+=1` che consente di cambiare il valore dell'incremento o del decremento, oltre che variare nell'operatore, facciamo ad esempio il quadrat di a e riassegnamolo ad a:  
`a*=a`

attenzione ad assegnare in un autoassegnamento troppe variabili, una cosa tipo: 
```java 
int i=0;
i+=12+2;
```
che si trasforma in 
`i=i+(12+2);`


#### Alcune precisazioni: il casting 

Le operazioni matematiche di norma tornano tutte un `int`. Per restituire un risultato in un altro tipo di intero, come `byte`, va fatto il così detto "**casting**". Ad esempio: 

```java
byte by=3; 
by=(byte)by+by;
```

In alcuni casi il casting viene fatto in automatico (se son utilizzati numeri costanti anziché variabili, oppure quando si passa da `int` a `long`), ma non conviene mai lasciare questo evento al caso.

#### Alcune precisazioni: l'overflow numerico

Se si tenta di inizializzare un numero con un valore non nel suo range si ottiene un errore di **overflow numerico** a tempo di compilazione. Questo non avviene quando si sommano due numeri che superano tale range, ma quello che accade è che tale numero viene interpretato "come negativo" partendo dal massimo negativo possibile.

Se state pensando che questo risultato è totalmente inaspettato e senza senso, il vero problema è che non sapete come vengono fatte le operazioni a livello di bit. 

Volendo fare una spiegazione breve e un po' superficiale: i numeri binari che iniziano con 1 son numeri negativi (*convenzione binaria C2*). Ora, se riflettete su un vettore binario di basse dimensioni (ad esempio un numero binario a 4 bit), noterete subito che il massimo valore non è `2^4` come ci si potrebbe aspettare, ma con questa regola è `2^3-1` e corrisponde al numero `0111` ovvero `7`. Se a questo aggiungete `1` otterrete `1000`, ovvero `-8` secondo la stessa convenzione. Ecco il motivo per cui l'overflow di un numero fa cambiare il segno oltre che il valore e non dà invece un errore. 

#### Alcune precisazioni: il risultato di una divisione non precisa

Il risultato di una divisione in una variabile intera viene troncato e non arrotondato, per cui anche un valore come `999/1000` sarà sempre `0`.

Ovviamente esistono dei metodi che consentono di ottenere un arrotondamento anziché troncare il risultato, ma saranno trattati in un altro articolo.

#### Alcune precisazioni: modulo e resto

Probabilmente il simbolo meno intuitivo è quello del **resto**, che nella matematica comune è il simbolo invece di percentuale. Esattamente come imparato fin dalle elementari il resto della divisione non è altro che la sottrazione tra dividendo e divisore moltiplicato per quoziente. Potremmo dire che:  `dividendo - (divisore * quoziente) = resto`.

Se vi state chiedendo perché mai dovreste usare il resto in programmazione, ve lo spieghiamo subito. Questo è uno degli operatori più utilizzati in assoluto, soprattutto per la sua proprietà di essere sempre minore del dividendo. Uno dei trucchi più utilizzati per far rimanere un numero in un range di valori infatti, sommando sempre una qualunque quantità ad esso, è farne il resto con il massimo del range. 

Per dirla in poche parole, supponiamo di volere un numero sempre nell'intervallo tra 0 e 10 (escluso il 10) sommando sempre un' unità, l'operatore resto ci aiuta così:

```java
(numero + 1)%10
```

Provate su carta per credere!

### Operazioni matematiche con virgola mobile

Le operazioni con la virgola sono pressoché le stesse (eliminando il resto), ma passiamo subito alle precisazioni: 

- Esattamente come nel caso degli interi, `int`, qui il `double` è un po' il risultato predefinito delle operazioni. In molti casi avviene il casting automatico a `float`, ma sempre come detto prima conviene accertarsene.
- L'overflow di un numero decimale non è negativo, ma risulta il valore "`Infinity`" o "`-Infinity`" nel caso di overflow negativo.

### Operazioni binarie intere

Alle variabili di tipo `int` è possibile applicare la matematica binaria, quindi utilizzare **and**, **or**, **not** , **xor** e gli **shift**.  

| Operatore |         Descrizione          |  Esempio  | Risultato |
| --------- | :--------------------------: | :-------: | --------: |
| `&`       |           **and**            |  `5 & 7`  |       *5* |
| <code>&#124;</code>|       **or**             | <code>5 &#124; 7</code>  |       *7* |
| `^`       |           **xor**            |  `5 ^ 7`  |       *2* |
| `~`       |           **not**            |   `~5`    |      *-6* |
| `<<`      |      **Shift sinistro**      |  `5<<2`   |      *20* |
| *`>>`*    |       **Shift destro**       | `-1>>31`  |      *-1* |
| `>>>`     | **Shift destro senza segno** | `-1>>>31` |       *1* |


Ricordiamo anche la tabella booleana:

| a    | b    | a&b   | a&#124;b  | a^b   |
| ---- | ---- | ----- | ----- | ----- |
| `0`  | `0`  | <b>0</b> | <b>0</b> | <b>0</b> |
| `0`  | `1`  | <b>0</b> | <b>1</b> | <b>1</b> |
| `1`  | `0`  | <b>0</b> | <b>1</b> | <b>1</b> |
| `1`  | `1`  | <b>1</b> | <b>1</b> | <b>0</b> |

E infine il risultato delle operazioni rimanenti: 

- `~1 = 0` (Inverso di 1)
- `0110>>1 = 0011` (Sposta tutti i bit a destra di uno, riempie con zeri se il numero è positivo, altrimenti con 1)
- `0110<<1 = 1100` (Sposta tutti i bit a sinistra di uno, riempie con zeri)

La differenza tra `>>` e `>>>` è dovuta al fatto che normalmente lo shift a destra mantiene il segno. Ciò significa che se il numero era negativo dopo lo shift, per non perdere il segno, rimette un 1. Lo shift senza segno (`>>>`) non ha questa proprietà e inserisce sempre zeri, a prescindere da quello che era il contenuto. 

> **Nota:** Ricordate sempre che le operazioni binarie son fatte considerando tutti e 32 i bit, anche gli **zeri**. Un intero si può inizializzare specificando tutti e 32 i bit nella forma:   
>
> `int ero = 0b000000000000000000000000000100` (cioè `4`)  
>
> ma si possono evitare di specificare gli zeri a sinistra nella forma abbreviata: 
>
> `int ero = 0b100` (sempre `4`)

### Operazioni con caratteri e stringhe

I caratteri di qualunque linguaggio **vengono comunque trattati come cifre** (viene fatto in genere il cast in automatico ad intero). I numeri ai quali corrispondono sono i primi 256 valori provenienti dalla *tabella ASCII*. Quindi possiamo presupporre che su qualsiasi macchina il valore del carattere `97` sia la lettera '`a`' .

Ma ora facciamo qualche esperimento trasformando, ad esempio, una lettera in una lettera maiuscola utilizzando i codici numerici:

```java
char carattere_minuscolo='b';
char carattere_MAIUSCOLO=(char)('A'-'a'+carattere_minuscolo);  // sarà B
```

> **Nota**: esistono alcuni caratteri speciali, detti `escape`, che si possono indicare per scrivere i così detti caratteri invisibili, come il fine linea o il TAB:
> 
> - `'\n'` equivale a fine linea.
> - `'\t'` equivale al tab
> 
> Qualora un determinato escape non fosse disponibile possiamo comunque il suo valore numerico!

È diverso però il discorso stringhe: le stringhe sono cosìdetti "`vettori`" di caratteri. Non spenderemo ora del tempo a capire cos'è un vettore, ma giusto per dare un'idea stiamo parlando di una sequenza di variabili carattere, che in questo caso non è modificabile. Nonostante tutto, Java predispone per le stringhe **l'operatore di somma**, meglio chiamato *concatenazione di stringhe*.

Supponendo:

```java
String parola1="ciao ";
```

e:

```java
String parola2="amico!";
```

La somma delle due parola darà vita alla frase : 
```java
String frase=parola1+parola2; // <- risultato= ciao amico!
```

Ogni operazione di concatenazione **genera in memoria una nuova Stringa**, anche se riassegnata ad una vecchia variabile. L'operatore di concatenazione trasforma in stringa qualunque altra variabile di qualunque tipo, complesso o meno. Per fare un esempio supponiamo di concatenare una stringa un carattere e un intero: 

```java
String a="Codice identificativo: ";
char attere='I'
int ero=99; 

a=a+attere+ero; 
/* ^ in questo momento è 
 * stata generata e assegnata
 * alla variabile 'a' la stringa:
 * 
 * "Codice identificativo: I99"
 * */
```

### Le operazioni logiche e i confronti

I tipi primitivi sopra citati (interi, caratteri, numeri decimali) possono essere confrontati tra di loro:

| Operatore di confronto | Descrizione       | Esempio      | Risultato |
| ---------------------- | ----------------- | ------------ | --------- |
| `>`                    | maggiore          | `2>0`        | vero      |
| `<`                    | minore            | `2<0`        | falso     |
| `==`                   | uguale            | `2.1f==2.0f` | falso     |
| `!=`                   | diverso           | `2.1f!=2.0f` | vero      |
| `>=`                   | maggiore o uguale | `'a'>='a'`   | vero      |
| `<=`                   | minore o uguale   | `'A'>='a'`   | falso     |

Notiamo che funziona con tutti i tipi trattati, ma assicuriamoci che siamo dello stesso tipo (o che vengano convertiti in automatico). È sicuramente lecito chiedersi come conservare tale risultato, che non è un numero, ma un valore binario che ne rappresenta la verità.

Si utilizzano quindi i `boolean`: 

```java
boolean uguale = 2.1f==2.0f;  // il valore sarà false
boolean diverso= 2.1f!=2.0; // il valore sarà true
```

Ma che operazioni si possono fare tra diversi `boolean`? Le operazioni logiche! Attenzione perché, seppur abbiano lo stesso significato, **le operazioni logiche non sono le operazioni binarie** trattate in precedenza. 

| Operatore logico | Descrizione                    | Esempio               | Risultato |
| ---------------- | ------------------------------ | --------------------- | --------- |
| `&&`             | **and, la e logica**           | `2-1>0 && 5/2!=2`     | `false`   |
| <code>&#124;&#124;</code>  | **or, la o logica**            | <code>2-1>0 &#124;&#124; 5/2!=2</code>     | `true`    |
| `^`              | **xor, la o esclusiva logica** | `2-1>0  ^ 5/2!=2`     | `true`    |
| `!`              | **not, il no logico**          | `! (2-1>0 && 5/2!=2)` | `true`    |

Da notare che:

- Usare un confronto con un operatore logico o usare una variabile booleana è la stessa cosa, poiché il confronto diventa automaticamente una variabile booleana
- Il risultato di un operazione logica è nuovamente un booleano
- Si può applicare un operazione logica su un operazione logica a catena
- Si possono includere nelle parentesi i risultati di operazioni logiche per dare priorità

## Vedere i propri progressi

Ancora non è stato chiarito come poter scrivere qualcosa sul terminale con il proprio programma. Anche qui è richiesto lo sforzo da parte del lettore di imparare delle parolette magiche che assumeranno senso una volta studiati concetti più avanzati.

La stampa a schermo in java si ottiene con l'istruzione :
```java
System.out.println(VARIABILE)
```

Proviamo a *demistificare* anche queste parole magiche: 

- Con **System** si intende un oggetto complesso che preleva una serie di funzioni e altri oggetti che rappresentano il **sistema e la JVM**.
- **out** è un oggetto all'interno di System che rappresenta ciò che appare nel terminale, esiste anche la variante **err** che viene usata per stampare errori (il sistema distingue i due flussi di stampa).
- **println** è una funzione che si applica sia ad **out** (ma anche ad **err**) che *stampa e poi va a capo*. Alternativamente a **println** si può utilizzare **print** che *non va a capo*. Si può dire che `System.out.println()` sia la stessa cosa di `System.out.print('\n')`

Questo non è l'unico modo per stampare a schermo. In generale in Java (ma in nessun linguaggio di programmazione) non esiste un unico modo di fare le cose, nel caso di cui sopra tuttavia ritengo sia il più semplice così come il primo da imparare.

Vediamo un po' di mettere insieme tutte le cose per stampare a schermo i nostri risultati di oggi: 

```java
public class NomeFile {
    public static void main (String [] args){

        // inizializziamo un po' di variabili
        byte by=127;
        System.out.println("byte by="+by);

        short sh=32767;
        System.out.println("short sh="+sh);
        
        int in=2147483647;
        System.out.println("int in="+in);
        
        long lo=9223372036854775807L;
        System.out.println("long lo="+lo);

        float fl=3.40282356e38f;
        System.out.println("float fl="+fl);

        double dl=1.7976931348623157e308;
        System.out.println("double dl="+dl);

        boolean bl=true;
        System.out.println("boolean bl="+bl);
        
        char ch='*'; 
        System.out.println("char ch="+ch);

        //operazioni su un intero: 
        System.out.println(((in+sh+by)*2)%50); // stampera un numero minore di 50

        /* notato qualcosa? ^     
         * non e' necessario che nel println 
         * ci sia una variabile specifica, puoi
         * inserirci un operazione             */

         System.out.println((char)(ch*2));

         //riassegnamo il char: 
         ch='g'; 
         System.out.println((char)('A'-'a'+ch)); //stampa G

         String nome="Luigi";   
         String cognome="Mario";
         System.out.println("c'e' solo "+1+' '+nome+' '+cognome+" al mondo"); 

         System.out.println("un numero è pari se il resto della divisione con due e' 0"); 
         System.out.print("la variabile by="+by+" e' pari? ");
         boolean pari=by%2==0;  
         System.out.println(pari);

    }
}
```

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.
