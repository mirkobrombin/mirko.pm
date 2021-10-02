---
title: "#howtodev - Gestione dell'asincronia con javascript"
date: 2021-07-09 13:00
layout: post
author: Floppy Loppy
author_github: raspFloppy
tags:
    - bash
    - javascript
---

In questo articolo andremo a spiegare quella che è l'**asincronia ad eventi** in Javascript ed i tre principali metodi per gestirla i problemi e le differenze tra di essi.


## Introduzione

Prima di iniziare una breve spiegazione su come funziona la programmazione sincrona.
Per programmazione sincrona si intende che il codice viene eseguico sequenzialmente riga per riga ovvero ogni **task** viene eseguito solo se il precedente è stato eseguito con successo, un esempio in **Javascript**:

```javascript
var a = 1;
var b = 2;
console.log(a+b);
```

```bash
output: 3 
```

Come possiamo vedere il codice viene eseguito in sequenza, viene assegnato ad `a` il valore `1`, poi a `b` il valore `2` ed infine viene eseguita la funzione `console.log()` che somma le due variabili e le stampa a schermo.

Questo tipo di programmazione la utilizziamo spesso quando stiamo imparando un nuovo linguaggio di programmazione in quanto è di più facile comprensione.
Il problema è che ci sono casi in cui non è adatto utilizzarla perchè può risultare lenta ed inefficente, per esempio in **ambito web**.
Sul web abbiamo in genere un server (o più distribuiti) e dei client che fanno delle richieste al server, definiamo queste richieste dei **task**, ora immaginate se ogni client dovesse aspettare che il precedente abbia finito il proprio **task** per poter fare una richiesta al server, fintanto che i task riguardano semplici operazioni e i client sono giusto due o tre non ci sono problemi ma quando le operazioni si fanno più complesse e i client più numerosi abbiamo bisogno di un altrenativa per gestire più **task** insieme.

Molti linguaggi adottano la **programmazione parallela** o **multithreading**, in **Javascript** viene utilizzata la **asincronia ad eventi**.
Nell'asincronia ad eventi viene eseguito parte di un task dopodichè si passa ad eseguire un'altra parte di un'altro task e così via poi si ripete fin quando non sono conclusi tutti i task, ovviamente ogni task si completerà in tempi diversi perciò ci sararanno **alcuni task** che **finiranno prima di altri**. Questo è molto importante per capire perché esistono dei metodi per gestire l'asincronia con Javascript.
L'asincronia viene gestita così perchè Javascript è **single thread** ovvero ha solo un heap di memoria ed uno singolo stack per le chiamate e perciò per eseguire più task contemporaneamente deve fare in questo modo.

Esempio:

<table> <tbody><tr>
<td style="border-right:0.1em black solid">Single Thread</td>
<td style="border-right:0.1em black solid">T1</td>
<td style="border-right:0.1em black solid">T2</td>
<td style="border-right:0.1em black solid">T3</td>
<td style="border-right:0.1em black solid">T1</td>
<td style="border-right:0.1em black solid">T2</td>
<td style="border-right:0.1em black solid">T3</td>
<td style="border-right:0.1em black solid">T1</td>
<td style="border-right:0.1em black solid">T2</td>
<td style="border-right:0.1em black solid">T3</td>
<td style="border-right:0.1em black solid">...</td>
<td style="border-right:0.1em black solid">fine T2</td>
<td style="border-right:0.1em black solid">fine T1</td>
<td>fine T3</td>
</tr></tbody></table>

Nell'esempio viene mostrato come possono venire eseguiti tre task contemporaneamente in Javascript. 

Notiamo come il secondo task finisce per primo, questo perchè come spiegato prima non tutti i task hanno gli stessi tempi di esecuzione e questo può diventare un problema, se per esempio l'apertura di un file viene eseguita prima della verifica della sua esistenza, potremmo avere degli errori durante il runtime del codice, motivo per cui esistono tre metodi per gestire l'asincronia in javascript e specificatamente usati per controllare gli errori e i tempi di esecuzione:
- **Callback**
- **Promise**
- **Async/Await**

Ognuno di essi ha dei pro e dei contro che andremo ad analizzare di seguito.


## Callback

Prima di tutto iniziamo dicendo che in Javascript le **funzioni sono** considerati **oggetti**, è quindi possibile **passare come parametri altre funzioni**, queste funzioni passate come parametri sono le **callback**.

Le callback sono il metodo più comune e più semplice di gestire l'asincronia ma anche quello che porta poi a più problemi sopratutto per quanto riguarda l'ordine del codice.

Un esempio di callback:
```javascript
function a() { 
    console.log('I')
}

function b() {
    console.log('am')
}

function c() {
    console.log('Yoda')
}

function callback_test() {
    setTimeout(a, 1000)
    setTimeout(b,  2000)
    c();
}

callback_test()
```

```bash
output: 
Yoda
I
am
```

In questo esempio sono stati create tre funzioni che vengono eseguite tutte all'interno della funzione `callback-test()` ma la funzione `a()` e `b()` sono callback della funzione setTimeout che blocca l'esecuzione della funzione passata come parametro per un tot di millisecondi che noi impostiamo nel secondo parametro ovvero `1000` e `2000` mentre la funzione `c()` viene eseguita normalmente.
Ora nonostante l'ordine delle funzioni sarebbe `a->b->c` viene eseguita prima la funzione `c()` poi la `a()` ed infine la `b()`, questo perchè le prima due sono bloccate dal `setTimeout()` quindi nel frattempo Javascript esegue la funzione `c()` poi passa alla funzione `a()` dato che nel frattempo la funzione `b()`  è ancora in standby e poi esegue la `b()`.

> NOTA  
> la funzione `c()` è un semplice print su console e viene eseguito subito. Se fosse stata un'operazione 
> più complessa sarabbe stata eseguita solo una parte della funzione per poi eseguire parte delle altre 
> tornare a questa e così via fino al suo completamento.


Un esempio più serio è quello spiegato precedentemente dell'apertura e lettura di un file, per farlo dobbiamo specificare il nome del file (ed il suo PATH), poi verificare che esista, che sia leggibile ed infine stamparne il contenuto. Se uno di questi passaggi non dovesse andare a buon fine bisona bloccare l'intero processo ed è quindi necessario avere una gestione degli errori per ogni passaggio.
Nel frattempo però il resto del codice si eseguirà sempre seguendo l'asincronia ad eventi di Javascript.

Esempio:
```javascript
var fs = require('fs')
var file = 'file.txt'

fs.exists(file, function(exists) {
    if(exists) {
        fs.stat(file, function(err, stats) {
            if(err) { throw err; }

            if(stats.isFile()) {
                fs.readFile(file, 'utf-8', function(err, data) {
                    if(err) { throw err; }
                    
                    console.log('file data: ' + data);
                })
            }
        })
    }
})

console.log('Vengo stampato prima io XD !!!')
```

```
output:
Vengo stampato prima io XD !!!
file data: =(
```

Come vediamo nell'esempio eseguiamo una serie di **callback** in sequenza controllate da degli `if` che se risultano falsi ritornano un errore ed escono dalla sequenza.
Dall'output notiamo però che ad eseguirsi prima è stato il `console.log()` a fine programma e poi la lettura del file (che nel mio caso conteneva una faccina triste).

Ora un'altra cosa che possiamo notare nelle **callback** è il fatto che tutto il codice che le interessa si sposta sempre più verso destra ad ogni passaggio ed ad ogni controllo `if`.
Con le callback infatti ad ogni passaggio in più ed a ogni controllo il codice tende verso destra arrivando a diventare un codice molto difficile da leggere.
Questa condizione è chiamata **callback hell** ed è il motivo per cui si è deciso di creare nuovi metodi per gestire l'asincronia con Javascript.


## Promise

Come le funzioni in Javascript anche le promise sono oggetti e permettono di avere come parametri funzioni.
La gestione dell'asincronia è molto simile alle callback ma il tutto viene **diviso per blocchi**.
Prendiamo l'esempio di prima dell'apertura di un file ma trasposto in **Promise**:

```javascript
var fs = require('fs');
var file = 'file.txt'


//Promise iniziale verifica che il path e se il file esiste
const fileExistsPromise = new Promise((resolve, reject) => {
    fs.exists(file, (exists) => {
        if(exists) { 
            resolve() 
        } else {
            reject()
        }
    })
})

//Verifica che il file sia leggibile
const fileStatPromise = () => {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if(err || !stats.isFile())  { 
                reject('Error reading file') 
            } else {
                resolve('File is readable')
            }
        })
    })
}

//Legge il file
const fileReadPromise = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err)  { 
                console.log('Error reading file')
                reject('Error reading file') 
            } else {
                console.log('file data: ' + data)
            }        
        })
        resolve()
    })
}


//Esecuzione promise
const filePromise = () => {
    fileExistsPromise
    .then(fileStatPromise)
    .then(fileReadPromise)
    .catch(() => {
        console.log('Liar')
    })
}

filePromise()
console.log('aaa vengo eseguito prima!!!')
```
```bash
output:
aaa vengo eseguito prima!!!
file data: ciao sono un file
```

Come vediamo i passaggi che con le callback venivano **innestati** ora sono **gestiti separatamente a blocchi**, la verifica dell'esistenza del file, la verifica della leggibilita del file e la lettura del file sono divisi in funzioni diverse che istanziano una nuova Promise(`new Promise(...)`).
La gestione degli errori viene gestita attraverso le condizioni `if / else` che restituiscono due funzioni, `resolve()` se la condizione viene soddisfatta altrimenti `reject()`, queste due sono alcune degli stati in cui una Promise si può trovare:

- **Pending**: quando viene eseguita una promise ma non si sa ancora il risultato essa si trova in questo stato, appunto in attesa.
- **Resolved**: quando la promessa viene mantenuta, ovvero non ci sono errori la promise risulta risolta.
- **Rejected**: se invece la promessa non viene mantenute, quindi vi è un errore la promise viene rigettata.


Questi tre stati sono importanti per la gestione dell'asincronia attraverso le promise.
Nell'ultima parte del codice troviamo la funzione `filePromise()` che contiene una serie di `.then()` e `.catch()` queste due funzioni servono appunto a gestire le promise.

Quello che succede è che la prima promise viene eseguita, entra in fase di `pending` in attesa di un risultato, se quest'ultimo ritorna un `resolve()` allora prosegue con il `then()` se ritorna `reject()` il `catch()` intercetta l'errore ed esce dalla promise.

Questo tipo di sintassi è migliore delle callback ma mantiene comunque alcuni problemi di chiarezza del codice
Motivo per cui è stato creato un terzo metodo per la gestione asincrona.

## Async/Await

**Async ed Await** sono due **keyword** aggiunte alla sintassi di Javascript che permettono di gestire blocchi di codice asincorno in maniera più lineare e pulito possibile cercando di essere più simile ad un codice sincrono.

Vediamone subito un esempio:

```javascript
function a() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('COME');
        console.log('COME')
      }, 1000);
    });
}


function b() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('CIAO');
        console.log('CIAO')
      }, 2000);
    });
}


function c() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('VA');
        console.log('VA \n')
      }, 3000);
    });
}


async function printAsync() { 
    await b()
    await a()   
    await c()
}


printAsync()
a()
```

```bash
output: 
COME

CIAO
COME
VA
```

Ora come vediamo abbiamo tre funzioni che contengono delle promise che si eseguono con un certo deley impostato dalla funzione `setTimeout()`.
Se noi chiamassimo queste tre funzione `a()`, `b()`, e `c()` normalmente per i motivi spiegati nell'introduzione verrebbero eseguiti si quasi contemporanemanente ma finirebbero in tempi diversi, in questo caso  a->b->c che però stamperebbero il messaggio in ordine sbagliato:

```bash
output:  COME CIAO VA
```

Per risolvere questo problema (che in questo caso non è grave ma nell'esempio della lettura di un file avrebbe potuto creare problemi) utilizziamo le keywords Async Await che controlla e blocca l'esecuzione di una parte di codice asincrona fin quando un altro blocco di codice asincrono non ha concluso.

Per farlo dichiariamo una funzione con la keyword `async` di nome `printAsync()`, all'interno di questa funzione vengono chiamate le tre promise precedute ciascuna di essa dalla keyword `await`.
Chiamando le funzioni in modo tale che il messaggio sia stampato nell'ordine corretto ed utilizzado l'`await` siamo in grado di controllare l'esecuzione del codice asincrono che si eseguira proprio come farebbe un codice sincrono all'interno dello **scope** della funzione `printAsync()`.

Ovviamente come già avrete capito il resto del codice sarà comunque eseguito asincornamente e ho utilizzato come esempio la chiamata della funzione `a()` all'esterno della funzione `printAsync()` che stampa prima delle altre funzioni all'interno di `printAsync()`.
