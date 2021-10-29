---
title: '#howtodev - Introduzione a typescript' 
date: 2021-10-29 10:42
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
tags: 
- javascript
- typescript
- node
---

Javascript `#chaiproblemigrossi`, quindi Microsoft ha ben pensato di strutturarci sopra un linguaggio che ne risolvesse i problemi principali, come **la tipizzazione debole**.

> TypeScript becomes JavaScript via the delete key
> 
> ~ [typescriptlang.org](typescriptlang.org)


## Obiettivi

In questo articolo vedremo :

- come compilare typescript ed eseguirlo 
- sintassi dei commenti
- variabili primitive
- array e tuple
- stampare a schermo 
- enumerazioni
- custom object ( json )



## Prerequisiti 

Per eseguire javascript e installare typescript avete bisogno di `node` e `npm`. Per comprendere a pieno l'articolo: 

- Conoscenze base di javascript 
- Conoscenze base di programmazione procedurale 
- Conoscenze base di logica di programmazione ( i.e. logica booleana )



 


## Testare typescript in locale 

Per testare typescript si deve installare il compilatore tramite `npm`:

```bash
npm install -g typescript
```

Quindi si può compilare il file con il suo cli, `tsc`: 

```bash
tsc nomefile.ts
```

> <u>**Nota:**</u>  
> Normalmente i file con estensione ts con TypeScript

Una volta compilato, troveremo un file javascript da poter testare come meglio sappiamo fare, ad esempio tramite `node`: 

```bash 
node nomefile.js  
```

## commenti  

Esistono due tipi di commenti in ts, inline: 

```typescript
// commento inline
```

oppure a blocco:

```typescript 
/*
commento 
su
più
righe
*/
```



## Variabili 

Le variabili si possono dichiarare nella maniera classica di javascript: 

```typescript
var lettera="a";
var buleano=true;
let numero=0;
const stringa="aaaaaaaa";
```



Tuttavia volendo sfruttare quelli che sono i meccanismi di TypeScript potremmo specificare la tipologia di ogni variabile dopo il suo nome, separato dal carattere `:` 

```typescript
var lettera:string="a";
var buleano:boolean=true;
let numero:number=0;
const stringa:string="aaaaaaaa";
```



### string concat e string interpolation

Si possono "sommare" due stringhe così facendo: 

```typescript
let stringa1: string="ciao";
let stringa2: string=" come stai?";
let stringaSomma: string=stringa1+stringa2; // diventa = "ciao come stai?"
```

Questa operazione è detta **concatenazione**.

La concatenazione è possibile anche con altre variabili non di tipo stringa: 

```typescript
let stringa1: string="ciao";
let variabile:number=3
let stringaSomma: string=stringa1+variabile;// diventa = "ciao3"
```

Il tutto diventa poi di tipo stringa ovviamente. 



Le stringhe hanno anche il concetto di **interpolazione**, questa operazione consente di inserire variabili all'interno di una stringa senza usare la somma ma richiamando le variabili direttamente al suo interno. Per farlo bisogna creare le stringhe con il **backtick** (carattere **&#96;**) e inserire le singole variabili all'interno della combinazione `${}`

```typescript
let codice:number=9
let stringa:string=`Identità numero ${numero}!` // diventa="Identità numero 9!"
```





### Console log

Per stampare una variabile possiamo usare la console log :

```typescript
console.log(nomevariabile)
```

Genericamente il console log fa il cast automatico delle variabili in stringhe, perciò è comune scrivere al suo interno direttamente le stringhe sommate o interpolate: 

```typescript
console.log("La variabile x ha valore "+x)
console.log(`La variabile y ha valore ${y}`)
```


Tuttavia al suo interno il metodo prende un numero infinito di stringhe che poi concatena automaticamente separando da spazi. Non è quindi affatto strano trovarsi di fronte anche ad una sintassi simile: 

```typescript
console.log("La variabile x ha valore",x,"e la variabile y ha valore",y)
```



### Array

Si può specificare il tipo array con la sintassi: 

```typescript
var vettore_numeri:number[] = [18,18,30];
```

Alternativamente anche con il tipo `Array<number>` 

Sugli array si possono fare le normali operazioni di javascript, segue esempio sulla media 

```typescript
let vettore_numeri:Array<number> = [18,30,18,21]

console.log("vettore_numeri:"+vettore_numeri);

console.log("lunghezza vettore:"+vettore_numeri.length);

let media:number=0;
for ( let i in vettore_numeri) { 
        media=media+vettore_numeri[i]/vettore_numeri.length; 
}

console.log("media=",media);
```



Si può inserire un valore in un vettore attraverso il metodo `push`:

```typescript
let nomi:string[] = ["davide","giulia","giovanni"]
nomi.push("emanuela")
```

Oppure usando l'indice della lunghezza del vettore: 

```typescript
let nomi:string[] = ["davide","giulia","giovanni"]
nomi[nomi.length]="emanuela";
```



Ancora, si può usare il metodo `concat`, che permette anche di aggiungere interi vettori.



### Tuple

Le tuple son vettori nel quale devi definire a priori il tipo di ogni cella. È un tipo che nativamente non presente in javascript ed introdotto su **typescript**. Supponiamo un vettore che rappresenta *nome,cognome ed età*

```typescript
var persona: [string,string, number]= ["Davide","Galati",30]
```

Se proviamo ad assegnare una combinazione diversa di tipi, ad esempio stringa, numero e stringa, succederà questo :

```typescript
persona: [string,string, number]= ["Davide",30,"Galati"]
```

output: 

```typescript
esempi.ts:40:20 - error TS2322: Type 'number' is not assignable to type 'string'.

40 persona= ["Davide",30,"Galati"];
                      ~~

esempi.ts:40:23 - error TS2322: Type 'string' is not assignable to type 'number'.

40 persona= ["Davide",30,"Galati"];
                         ~~~~~~~~
```

Le tuple hanno una dimensione fissa, se proviamo a creare una nuova cella (`persona[4]=123`) avremo in output un errore: 

```typescript
esempi.ts:46:9 - error TS2493: Tuple type '[string, string, number]' of length '3' has no element at index '4'.

46 persona[4]=123
           ~
```

Possiamo comunque utilizzare il metodo concat per creare una nuova variabile: 

```typescript
console.log(persona.concat(123))
```



### Enumerazioni

Typescript possiede il tipo "*enumerazione*" che crea delle costanti identificate dal loro nome molto comode da usare: 

```typescript
enum BIBITE {
    ACQUA,
    COCACOLA,
    FANTA
}
```



Per l'utilizzo: 

```typescript
var bibita:BIBITE=BIBITE.ACQUA;
```



Quindi si può stampare il suo valore numerico: 

```typescript
console.log("Il suo numero ordinale=",bibita)
```

output:

```typescript
0
```



L'enumerazione viene inizializzata come una sorta di vettore, quindi per avere il suo valore stringa bisogna accedere utilizzando il numero ordinale all'intera enumerazione. Così: 

```typescript
console.log("valore stringa="BIBITE[bibita])
```

output:

```typescript
ACQUA
```



Per ottenere questa relazione biunivoca, sotto la scocca l'enumerazione viene come un json valido da un lato e da un altro. Per essere chiari stampando un intera enumerazione viene su questo :

```typescript
tutte le bibite= {
  '0': 'ACQUA',
  '1': 'COCACOLA',
  '2': 'FANTA',
  ACQUA: 0,
  COCACOLA: 1,
  FANTA: 2
}
```

Così facendo se si chiede l'elemento '`0`' viene restituita la stringa "`ACQUA`", ma se si chiede l'elemento "`ACQUA`" viene restituito anche lo '`0`' 

Quest'operazione è anche detta **Reverse mapping**

#### Enumerazioni : AVANZATE 

Si può assegnare alle enumerazioni un valore ben preciso, supponiamo questo esempio con i colori: 

```typescript
enum COLORI {
    ROSSO="#FF0000",
    VERDE="#00FF00",
    BLUE="#0000FF"
}
```



In questo modo quando andremo ad utilizzare l'enumerazione, il suo valore numerico è sostituito dal valore che gli abbiamo dato noi.

Stampando: 

```typescript
console.log(COLORI.ROSSO)
```

La risposta sarà 

```typescript
#FF0000
```



Ma cosa succede al *Reverse mapping*? Sostanzialmente si perde, infatti se proviamo a stampare l'enumerazione scopriremo sostanzialmente che le relazioni non sono più biunivoche: 

```typescript
console.log("Tutti i colori=",COLORI);
```



output:

```typescript
Tutti i colori= { ROSSO: '#FF0000', VERDE: '#00FF00', BLUE: '#0000FF' }
```



E se proviamo ad applicare lo stesso la tecnica di sopra, otterremo un valore totalmente errato : 

```typescript
console.log("valore colore rosso errato =",COLORI[rosso]);   
```

output:

```typescript
valore colore rosso errato = undefined
```



Come facciamo quindi a recuperare il valore delle chiavi? Sfruttiamo una funzione nativa di `Object`, ovvero `keys`: 

```typescript
var nomicolori= Object.keys(COLORI) ;
console.log("valore stringa colore rosso =", nomicolori[0]);
```



output:

```typescript
valore stringa colore rosso = ROSSO
```



Resta comunque possibile ciclare con un for in automatico tutte le chiavi di un enumerazione, così:

```typescript
for (let i in COLORI){ 
        console.log(i);
}
```

output:

```typescript
ROSSO
VERDE
BLUE
```



### Tipo any

Una dichiarazione che non ha vincoli di alcun tipo ( come in javascript per intenderci ) sottointende in typescript il tipo `any`

può essere usato come tipo in inizializzazioni di qualunque genere, variabili o vettori, e viene considerato implicito se non c'è nessun tipo nell'inizializzazione di una variabile :

```typescript 
let variabile="sono una stringa" // questa variabile è di tipo any

let variabilequalunque:any="sono una stringa qualunque" // anche questa variabile  
```

Questo tipo è molto comodo nei metodi, nel tipo di ritorno oppure nelle tuple, dove è necessario dichiarare a priori dei tipi. Altresì si potrebbe utilizzare per creare vettori misti 



### Tipo void 

Il `void` è invece utilizzato nelle funzioni per annunciare l'assenza di un valore di ritorno 

```typescript
function nomeFunzione():void{
    //cose
}
```



Si può creare una variabile di tipo void ma deve essere poi necessariamente associata al valore `null` o `undefined`.

Un esempio di utilizzo: 

```typescript
let nullo:void=null
let indefinito:void = undefined

console.log("nullo=",nullo)
console.log("indefinito=",indefinito)
```

output:

```typescript
nullo= null
indefinito= undefined
```



Ecco invece cosa succede ad assegnare un valore non valido:

```typescript
let asd:void="ciao"
```

output:

```typescript
esempi.ts:107:5 - error TS2322: Type 'string' is not assignable to type 'void'.

107 let asd:void="ciao"
```



### Tipo custom type o json 

Possiamo creare al volo un tipo custom, un json, formato da più tipi primitivi al suo interno. 
Ecco come: 

```json
var oggetto:{valore1:number,valore2:string};
```

Dopo va inizializzato come segue: 

```typescript
oggetto={valore1:1,valore2:"nome"};
```



Possiamo quindi richiamare ogni singolo valore all'interno dell'oggetto usando la sintassi `nomeoggetto.nomevariabile` : 

```typescript
console.log("valore 1 dell'oggetto=",oggetto.valore1);
```