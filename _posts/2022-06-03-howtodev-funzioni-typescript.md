---
title: '#howtodev - Funzioni in TypeScript' 
date: 2022-06-03 06:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- typescript 
- funzioni 
- sviluppo 
---



JavaScript `#chaiproblemigrossi`, quindi Microsoft ha ben pensato di strutturarci sopra un linguaggio che ne risolvesse i problemi principali, come **la tipizzazione debole**.

> TypeScript becomes JavaScript via the delete key
>  
> ~ [typescriptlang.org](typescriptlang.org)



Questo è il secondo di una serie di articoli su TypeScript, parleremo di funzioni.



[&larr; Articolo precedente](https://linuxhub.it/articles/howtodev-typescript-introduzione/)

## Obiettivi



Lista degli obiettivi che a fine articolo il lettore consegue:

- Scrivere una funzione 
- Distinguere tra vari tipi di argomenti
- Passare parametri opzionali
- Passare parametri REST
- Assegnare una funzione ad una variabile 
- Scrivere funzioni anonime 
- Le funzioni come argomento di una funzione
- Differenza tra arrow function e funzioni anonime



## Prerequisiti 

Lista dei prerequisiti e di conoscenze presenti in altri articoli che verranno date per scontato: 

- [I nostri articoli su TypeScript precedenti, a partire dal primo](https://linuxhub.it/articles/howtodev-typescript-introduzione/)
- Alcune nozioni di matematica basilari
- Alcune nozioni di logica booleana basilari



## Funzioni 

Creare una funzione con TypeScript è molto semplice: 

```typescript
function nomeFunzione(nomearg1:tipoarg1, nomearg2:tipoarg2):tiporitorno {
	
    // OPERAZIONI 
    
    return risultato;
}
```



Se il tipo di ritorno è `void` non si ha alcuna necessità di restituire un valore, anzi farlo è errato.



Normalmente le funzioni di TypeScript lavorano gli argomenti *usando il loro valore e non il loro riferimento in memoria* (**passaggio per valore**).

Ciò significa che funzioni del genere: 

```typescript
function cambioValore(variabile:number):void{
    variabile=13;
}
```

Cambieranno il valore della variabile solo localmente, al di fuori del metodo infatti, la variabile tornerà al suo valore originale.

```typescript
var variabile:number= 10
cambioValore(variabile); 
console.log("valore variabile=",variabile);
```

output: 

```typescript
valore variabile= 10
```



Come passare un valore per riferimento quindi? Come in altri linguaggi ad alto livello, i valori degli oggetti coincidono con il loro riferimento in memoria. Ciò rende il passaggio del valore di un oggetto un passaggio per riferimento a tutti gli effetti.

Incapsuliamo la variabile di tipo primitivo in un oggetto quindi

```typescript
function cambioValore(oggetto:any){
    oggetto.variabile=20
}

var oggetto:{ variabile:number}
oggetto={variabile:10}
cambioValore(oggetto)

console.log("valore variabile=",oggetto.variabile)
```

output:

```typescript
valore variabile= 20
```



Altresì funziona se usiamo tuple o vettori

```typescript
function cambioValore(tupla:[number]){
    tupla[0]=20
}

var tupla:[number] = [10]
cambioValore(tupla)

console.log("valore variabile=",tupla[0])
```

output:

```typescript
valore variabile= 20
```



### Gli arguments

In un metodo la parola chiave `arguments` è la lista di argomenti che viene passata in input. La si può interrogare come se fosse un json in cui ogni chiave è il numero posizionale del metodo: 

```typescript
function cambioValore(tupla:[number]){   
   console.log("Metodo cambioValore");
    console.log("lista argomenti=",arguments);  
    console.log("Numero argomenti=",arguments.length)
    console.log("primo argomento=",arguments[0])
    tupla[0]=20
}  
 
var tupla:[number] = [10]
cambioValore(tupla)

console.log("valore variabile=",tupla[0])
```

output: 

```typescript
lista argomenti= [Arguments] { '0': [ 20 ] }
Numero argomenti= 1
primo argomento= [ 20 ]
valore variabile= 20
```



### Gli argomenti opzionali 

Gli argomenti opzionali son particolari in quanto possono essere omessi quando si richiama la funzione, molto utile per evitare di creare overloading di metodi.

Un argomento è considerato opzionale se contiene il carattere `?` dopo il nome:

```typescript
function argomentiOpzionaliENon(a:number, b?:string){
        console.log("a=",a);
        console.log("b=",b);
        console.log("tutti gli argomenti=",arguments);
}
 
argomentiOpzionaliENon(1)
```

output:

```typescript
Argomenti opzionali
a= 1
b= undefined
tutti gli argomenti= [Arguments] { '0': 1 }
```

È da notare come gli argomenti non passati risultino poi `undefined`, è quindi consigliato utilizzare strumenti come `arguments`, `if` o `inizializzazioni ternarie` per controllare il flusso delle operazioni

> <u>**ATTENZIONE:**</u>
>
> Tutti gli argomenti opzionali devono essere posizionati a fine intestazione, dopo quelli obbligatori! 





### Argomenti REST (o varargs)

Gli argomenti variabili (varargs in alcuni linguaggi, REST in altri) son un numero indefinito di argomenti che vengono trasformati poi in un vettore, vanno inseriti a fine metodo e condividono tutti lo stesso tipo. 

Per inserire un argomento variabile bisogna farne precedere il nome da tre caratteri `.` di seguito, il tipo scelto deve essere poi un array: 

```typescript 
function funzioneConArgomentiVariabili(parametro1:number,parametro2:string,...argomentovarargs:string[]):void {
    console.log("varargs list:",argomentovarargs)
}
```

Possiamo richiamare la funzione concatenando un numero a scelta di parametri di quel tipo, ad esempio: 

```typescript
funzioneConArgomentiVariabili(1,"ciao","varargs1","varargs2","varargs3","varargs4")
```

L'output sarà: 

```typescript
varargs list: [ 'varargs1', 'varargs2', 'varargs3', 'varargs4' ]
```





Possiamo anche richiamare la funzione *senza alcun varargs*: 

```typescript
funzioneConArgomentiVariabili(1,"ciao")
```

output:

```typescript
varargs list: []
```



> NOTA BENE: 
>
> la variabile stringa prima del varargs non viene presa come parte del parametro variabile.



Gli argomenti variabili vengono poi trattati all'interno del metodo come fossero un array, con tutto quello che comporta, ad esempio è possibile richiamare la proprietà `length` oppure prelevare un particolare parametro: 

```typescript
function funzioneConArgomentiVariabili(...argomentovarargs:string[]):void {
    console.log("lunghezza", argomentovarargs.length)
    console.log("primo elemento", argomentovarargs[0])
}
funzioneConArgomentiVariabili("varargs1","varargs2","varargs3","varargs4")
```

output:

```typescript
lunghezza 4
primo elemento varargs1
```



Per inserire un vettore di stringhe come parametro al posto del varargs si può usare usare questa sintassi: 

```typescript
let arrayVarargs: string[] = ["varargs1","varargs2","varargs3","varargs4"]

funzioneConArgomentiVariabili(...arrayVarargs)
```



### Le variabili funzione e le funzioni anonime

In TypeScript *le funzioni sono a tutti gli effetti delle variabili*, questo consente di crearle e memorizzarle all'interno di una di esse.  

Facciamo un esempio con una funzione che stampa true se la prima stringa ha un numero di caratteri superiore oppure è alfa-numericamente maggiore della seconda:

```typescript
let funzioneConfrontoStringhe=(stringa1:string, stringa2:string) => {return stringa1.length==stringa2.length? stringa1>stringa2 : stringa1.length>stringa2.length;}
```

Se proviamo a stamparla:

```typescript
console.log(funzioneConfrontoStringhe)
```

ne uscirà fuori questo: 

```typescript
[Function: funzioneConfrontoStringhe]
```

In particolare, le funzioni definite come: 
```
(var1,var2):TipoRit => { corpo del metodo }
```
son dette "*arrow function*"

Una variabile può anche essere definita con la parolina `function` ma senza nome:  
```typescript 
let funzioneConfrontoNumeri : Function = function (int:number,int2:number): boolean{
	return Math.abs(int)>Math.abs(int2)
}
```



Possiamo poi chiamare la funzione all'interno della variabile come se la variabile stessa fosse il nome della funzione: 

```typescript
let stringa4caratteri:string="ciao"
let stringa9caratteri:string="caratteri"
console.log("stringa4caratteri \u00e8 pi\u00fa "+(funzioneConfrontoStringhe(stringa9caratteri,stringa4caratteri)?"piccola":"grande")+" di stringa9caratteri");
```

output: 

```typescript
stringa4caratteri è piú piccola di stringa9caratteri
```



**Questo approccio consente di poter creare metodi che a loro volta prelevano dei metodi come parametri**.   

Supponiamo ad esempio una funzione che, dato un vettore di stringhe e una funzione che mette a confronto due stringhe, cambia il vettore rendendolo ordinato (secondo il metodo che gli passiamo) e lo stampa alla fine :

```typescript
function ordinaStringheCustom (vettore:string[], funzioneOrdinamento: Function){
	
	let min:string =undefined;
	let imin:number=0; 
	for ( let index =0 ; index<vettore.length; index=index+1){
		for ( let index2= index; index2 <vettore.length; index2=index2+1){
			let stringa=vettore[index2]
			if( min && funzioneOrdinamento(stringa,min)) continue;
			
			min=stringa
			imin=index2	
		}	
		if(index===imin) {min=undefined; continue;}
		vettore[imin]=vettore[index]
		vettore[index]=min
		min=undefined; 
	}
	console.log(vettore)
}
```

Chiamiamolo: 

```typescript
ordinaStringheCustom(["abc","ad","bdd","cd"], funzioneConfrontoStringhe);
```

Quindi osserviamo il risultato: 

```typescript
[ 'ad', 'cd', 'abc', 'bdd' ]
```



#### Vincolare il tipo di funzione in ingresso

Si può vincolare il tipo di funzione in ingresso. Per chiarirci, allo stato attuale è possibile chiamare ordinaStringheCustom con una funzione in ingresso che non ordina le stringhe, ma incrementa un numero e lo restituisce: 

```typescript
ordinaStringheCustom(["abc","ad","bdd","cd"], (a:number):number=>{return 1+a;});
```

 Il compilatore non ci ferma, il programma viene comunque eseguito ed il risultato è imprevedibile ( in questo specifico caso semplicemente, non viene ordinato il vettore )

Possiamo prevenire questo comportamento chiedendo a `ordinaStringheCustom` di prelevare solo funzioni che prelevano due stringhe in ingresso e restituiscono un `boolean`, ovvero cambiando l'ultimo parametro in ingresso con `funzioneOrdinamento: (var1:string, var2:string)=> boolean`  : 

```typescript
function ordinaStringheCustom (vettore:string[], funzioneOrdinamento: (var1:string, var2:string)=> boolean){
	
	let min:string =undefined;
	let imin:number=0; 
	for ( let index =0 ; index<vettore.length; index=index+1){
		for ( let index2= index; index2 <vettore.length; index2=index2+1){
			let stringa=vettore[index2]
			if( min && funzioneOrdinamento(stringa,min)) continue;
			
			min=stringa
			imin=index2
		}	
		if(index===imin) {min=undefined; continue;}
		vettore[imin]=vettore[index]
		vettore[index]=min
		min=undefined; 
	}
	console.log(vettore)
}
```

Se adesso scriviamo: 

```typescript
ordinaStringheCustom(["abc","ad","bdd","cd"], (a:number):number=>{return 1+a;});
```

in output avremo: 

```typescript
Argument of type '() => string' is not assignable to parameter of type '(var1: string, var2: string) => boolean'.
```



Questo previene anche da un **passaggio errato dei parametri nella funzione anonima**. 
Supponiamo la funzione: 

```typescript
function funzioneOrdinamentoError (var1:string,var2:number,funzioneOrdinamento: Function){
	
	console.log ((funzioneOrdinamento(var1,var2) ? `${var1}` : `${var2}`) + " \u00e8 pi\u00f9 grande");
}
```

E chiamiamola con: 
```typescript
funzioneOrdinamentoError("ciao",1,funzioneConfrontoStringhe)
```


Cosa può accadere in questo caso? *Una conversione automatica? Un errore di runtime?*   
Generalmente è una *conversione automatica*, ma noi non vogliamo proprio porci il problema, poiché deve essere **impedito a livello di compilazione**. 

Se noi specifichiamo che tipo di funzione ci aspettiamo come sopra il risultato cambia. Quindi scrivendo: 

```typescript
function funzioneOrdinamentoCorretta (var1:string,var2:number,funzioneOrdinamento: (var1:string, var2:string)=> boolean){
	console.log ((funzioneOrdinamento(var1,var2) ? `${var1}` : `${var2}`) + " \u00e8 pi\u00f9 grande");
}
```
Otterremo un errore in output di compilazione: 
```
Argument of type 'number' is not assignable to parameter of type 'string'.
```



#### Best practice: usare type e funzioni anonime insieme 

Potrebbe essere un vantaggio quello di inizializzare con type un nuovo tipo che corrisponde ad un specifico tipo di funzione. Esempio: 

```typescript
type fConfrontoStringhe = (var1:string, var2:string)=> boolean; 
```



Quindi definire una funzione anonima ed assegnarla ad una variabile di questo tipo: 

```typescript
let funConfrontoStringhe:fConfrontoStringhe=(stringa1:string, stringa2:string) => {return stringa1.length==stringa2.length? stringa1>stringa2 : stringa1.length>stringa2.length;}
```



Infine, vincolarla in un metodo: 

```typescript
function fOrdinamentoCorretta (var1:string,var2:string,funzioneOrdinamento: fConfrontoStringhe){
	console.log ((funzioneOrdinamento(var1,var2) ? `${var1}` : `${var2}`) + " \u00e8 pi\u00f9 grande");
}
```



### Differenza tra arrow function e non

Come abbiamo già spiegato la funzione anonima può essere creata in due modi, con questa forma, detta Arrow: 

```
(arg1,arg2,...):tipoRitorno => {}
```

Ed in questa forma: 

```typescript
function (arg1,arg2...) : tipoRitorno {}
```



La differenza è che il primo metodo, seppur più elegante sintatticamente, ha delle limitazioni, non viene infatti creata <u>una funzione come oggetto</u> ma più come oggetto primitivo.
