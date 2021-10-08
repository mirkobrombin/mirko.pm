---

title: '#devcaffè - Quattro chicchere su Rust' 
date: 2021-10-08 12:00
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit 
tags: 
- rust 
- caffe 
- chiacchiere
- confronto
---



Magari avrai sentito parlare di Rust ma non hai mai avuto motivo di provarlo o sei semplicemente incuriosito.

Parliamo quindi di Rust e alcune buone motivazioni per utilizzarlo.


> Lo scopo del seguente articolo &egrave; quello di fornirti una conoscenza di base dell'argomento accompagnato da alcune considerazioni soggettive.   
> Si consiglia di leggere in un momento di relax magari mentre di beve qualcosina di caldo  
> `*sip*` ☕ 




## Un compilatore flessibile

Rust offre vari tipi di macro che ti permettono di manipolare l'AST (abstract syntax tree) costruendo la tua sintassi o anche eseguire codice Rust in tempo di compilazione.

Questo consente l'introduzione di *syntax sugar* (zucchero sintattico) e ottimizzare meglio il codice. Una conseguenza immediata di ciò è ad esempio nei generici, che son trattati a livello di compilazione.

### argomenti variadici 
Un esempio di ottimizzazione che le macro garantiscono sono gli **argomenti variadici**.

Mentre in linguaggi come Go rappresentano solo dei costrutti eleganti, in Rust solo una macro può essere variadica, e ciò ne assicura l'ottimizzazione.

Le macro più simili a quelle di Rust che mi sia capitato di trovare sono quelle di **Nim**, ma ritengo ancora che quelle di Rust diano la maggior flessibilità.

Un caso di studio potrebbe essere quello di colui che ha anche ricreato [lisp con le macro](https://github.com/JunSuzukiJapan/macro-lisp) di Rust:

```rust
lisp!(defun factorial ((n i32)) i32
  (if (<= n 1)
    1
    (* n (factorial (- n 1)))));

lisp!(defun main () ()
    (defconstant num (factorial 10))
    (println "10! = {}" num));
```



## Un sistema di compilazione che ti accompagna alla giusta soluzione

La più grande particolarità di Rust è il suo paradigma di gestione della memoria.

Tuttavia per alcuni esso può apparire un po' ostico da comprendere e padroneggiare, quindi il compilatore ti aiuta, segnalandoti gli errori in modo preciso e fornendoti consigli su come risolverli.

Supponiamo:
```rust
#[allow(unused_variables)]
fn main() {
    let a = 1;
    let b = &mut a;
}
```


In fase di compilazione risulterà in questo errore:

```
error[E0596]: cannot borrow `a` as mutable, as it is not declared as mutable
 --> src/main.rs:4:13
  |
3 |     let a = 1;
  |         - help: consider changing this to be mutable: `mut a`
4 |     let b = &mut a;
  |             ^^^^^^ cannot borrow as mutable

For more information about this error, try `rustc --explain E0596`.

```



> Non è fantastico il livello di dettaglio?

Ovviamente tutto ciò è supportato da materiali e documentazioni molto precise, che aiutano ogni sviluppatore in erba ad orientarsi.

## Mi illumino di feature

La libreria standard è già di per sé molto completa,  *ricca di strutture dati e algoritmi già implementati per noi*.

Ritorniamo a confrontare Rust con Go, ma sotto questo punto di vista:

Go non mira ad avere una libreria standard completa di ogni piccola funzione e ci si ritrova spesso a scrivere codice *boilerplate* (procedure già standard, con il rischio di riscriverle in maniera anche meno ottimizzata), tuttavia esso fornisce cose molto complesse come un server web.

> Una delle leggi più solide dell'informatica e della programmazione è quello di non riscoprire l'acqua calda.  
> Procedure e metodologie già largamente studiate e implementate nelle librerie di riferimento dei nostri linguaggi son sicuramente già ottimizzate più di quello che scrivere noi.


Go mira ad essere minimale con poche feature ma cerca di evitarti molto lavoro, mentre Rust ti mette in mano una miriade di strumenti per svolgere al meglio il tuo lavoro.

Allo stato attuale delle cose molta roba è stata già fatta dalla community ed è disponibile sul gestore dei progetti di Rust, **Cargo**.



## Ah sì! Cargo

Molti linguaggi moderni implementano il loro gestore dei pacchetti ( o moduli che dir si voglia) oggi, ad esempio Python con *pip* o Ruby con *gem*, generalmente ispirati ai gestori dei pacchetti che troviamo sui sistemi Unix-like.  
Su Rust troviamo **cargo**.

> Come potrei non parlarne? È fantastico.

Con Rust il gestore dei pacchetti si occupa di mettere in comunicazione diverse edizioni del linguaggio (2015, 2018 e prossimamente 2021) e gestisce tutte le dipendenze in modo comodo tramite un semplice file di configurazione scritto in TOML.

Volendo fare un ulteriore paragone, anche con Go abbiamo la possibilità di utilizzare la cartella del nostro progetto per le dipendenze, ma è un comportamento opzionale.


Inoltre operazioni come la creazione e la pubblicazione di un progetto  son semplicissime nonché molto rapide.


> Ah, temo di aver finito il caffè, magari in un prossimo articolo entreremo nel dettaglio. Vi piacerebbe? Fatecelo sapere ! 
