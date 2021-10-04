---

title: '#devcaffè - Perché amo Rust' 
date: 2021-10-08
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

Beh, in questo articolo ti spiego come mai amo Rust.



---



## Compilatore piegati a me!

Rust offre vari tipi di macro che ti permettono di manipolare l'AST (abstract syntax tree) costruendo la tua sintassi o anche eseguire codice Rust in tempo di compilazione.



Questo consente l'introduzione di syntax sugar e ottimizzare meglio il codice, senza contare che in Rust anche cose come i generici sono trattati a compilazione.



\*sip\* ☕



Dunque... Un esempio di ottimizzazione che le macro garantiscono sono gli argomenti variadici.

In Go un argomento variadico non è altro che syntax sugar per le slice, mentre in Rust solo una macro può essere variadica, assicurando l'ottimizzazione.

Le macro più simili a quelle di Rust che mi sia capitato di trovare sono quelle di Nim, ma ritengo ancora che quelle di Rust diano la maggior flessibilità.



Qualcuno ha anche ricreato [lisp con le macro](https://github.com/JunSuzukiJapan/macro-lisp) di Rust!

```rust
lisp!(defun factorial ((n i32)) i32
  (if (<= n 1)
    1
    (* n (factorial (- n 1)))));

lisp!(defun main () ()
    (defconstant num (factorial 10))
    (println "10! = {}" num));
```



## Compilatore mi piego a te!

La più grande particolarità di Rust è il suo paradigma di gestione della memoria.

Tuttavia per alcuni esso può apparire un po' ostico da comprendere e padroneggiare, quindi il compilatore ti porta per mano, segnalandoti gli errori in modo preciso e fornendoti consigli su come risolverli.



Ad esempio con questo source:

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



Non è fantastico il livello di dettaglio?

E questo si accompagna con una quantità di documentazione e materiale di studio fantastica.



## Mi illumino di feature

Abbiamo già parlato di macro ma Rust è davvero pieno di cose.

La libreria standard ha un metodo per tutto, è anche ricca di strutture dati e algoritmi già implementati per noi.



Mi piace molto comparare Rust e Go da questo punto di vista.

Go non mira ad avere una libreria standard completa di ogni piccola funzione e anzi molte volte sarà necessario scrivere codice boilerplace, tuttavia esso fornisce cose molto complesse come un server web.

Rust è l'esatto contrario, il linguaggio è ricco di funzioni però non ti lascia la "pappa pronta" per quanto riguarda cose del genere.



Go mira ad essere minimale con poche feature ma cerca di evitarti molto lavoro, mentre Rust ti mette in mano una miriade di strumenti per svolgere al meglio il tuo lavoro.



\*sip\* ☕



Comunque allo stato attuale delle cose molta roba è stata già fatta dalla community ed è disponibile sul gestore dei progetti di Rust, Cargo.



## Ah sì! Cargo

Come potrei non parlarne? È fantastico.

Creare un progetto è semplicissimo e pubblicare è un attimo.



Molti linguaggi moderni implementano il loro gestore dei pacchetti oggi, ad esempio Python e Ruby hanno pip e gem che sono molto ispirati ai gestori dei pacchetti che troviamo sui sistemi Unix-like.



Beh, questo crea un'enorme problema di dipendenze che viene risolto da vari linguaggi in un modo più o meno elegante, come l'uso di ambienti virtuali e container.



Con Go abbiamo la possibilità di utilizzare la cartella del nostro progetto per le dipendenze, ma è un comportamento opzionale.



Con Rust il gestore dei pacchetti si occupa di mettere in comunicazione diverse edizioni del linguaggio (2015, 2018 e prossimamente 2021) e gestisce tutte le dipendenze in modo comodo tramite un semplice file di configurazione scritto in TOML.



---



Ah, temo di aver finito il caffè, magari in un prossimo articolo entreremo nel dettaglio, chissà.

Se vuoi saperne di più non esitare a scriverci sul nostro [gruppo](https://t.me/linuxpeople)!
