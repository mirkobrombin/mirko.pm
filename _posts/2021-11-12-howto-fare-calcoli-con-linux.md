---
class: post
title: '#howto - Fare calcoli con linux' 
date: 2021-11-12 17:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
tags:  
- ubuntu 
- archlinux 
- fedora
- qalc
- bash
---

Il motivo originale per cui son nati i computer è quello di fare calcoli. Oggi è una cosa che diamo per scontata, ma voi sapete in quanti modi si possono fare calcoli sulla vostra distribuzione? Vediamone alcuni



## Bash e let 

Iniziamo da quello che, a mio dire, è il metodo più scomodo. Ovvero il comando let.   

La sintassi corretta per usarlo è: 

```bash
let "espressione aritmetica"
```

Il comando di per sè non restituisce un output, ma è capace di utilizzare ed assegnare delle variabili esterne.  
Per fare qualche esempio possiamo creare una variabile che contiene un'espressione aritmetica con let e stamparla: 

```bash
let "ans=2+2"
echo $ans
```

output: 

```bash
4
```

Possiamo anche definire prima alcune variabili ed usarle poi all'interno: 

```bash
a=2
b=3
let "ans=a**b"
echo $ans
```

output: 

```bash
8
```



Che operazioni possiamo fare con let? Purtroppo non esiste un manuale vero e proprio.   

Innanzitutto dipende dalla nostra shell, infatti se bash, ad esempio, dispone di funzioni aritmetiche *molto limitate con let*, con zsh avrete accesso a molte più funzioni.

Quindi sono andato un po' a tentativi per cercarle tutte:

| Operazione                | Su let            | esempio                | echo $a |
| ------------------------- | ----------------- | ---------------------- | ------- |
| somma                     | +                 | let "a=1+1"            | 2       |
| sottrazione               | -                 | let "a=1-1"            | 0       |
| moltiplicazione           | *                 | let "a=2*2"            | 4       |
| divisione                 | /                 | let "a=2/2"            | 1       |
| potenza                   | **                | let "a=2**3"           | 8       |
| resto divisione           | %                 | let "a=5%3"            | 2       |
| dare più comandi          | ,                 | let "a=2,a=a*3"        | 6       |
| incremento +1             | ++                | let "a=2,a++"          | 3       |
| decremento -1             | --                | let "a=2,a--"          | 1       |
| incremento +n             | +=n               | let "a=4,a+=2"         | 6       |
| decremento -n             | -=n               | let "a=4,a-=2"         | 2       |
| operazione e assegnamento | op=n              | let "a=4,a*=2"         | 8       |
| negazione bit a bit       | ~                 | let "a=~0"             | -1      |
| shift bit a bit a sinitra | <<                | let 'a=32,a=a<<1'      | 64      |
| shift bit a bit a destra  | >>                | let 'a=32,a=a>>1'      | 16      |
| and bit a bit             | &                 | let 'a=29,a=a&7'       | 5       |
| or bit  a bit             | \|                | let 'a=29,a=a\|7'      | 31      |
| xor bit a bit             | ^                 | let 'a=29,a=a^7'       | 26      |
| negazione 1/0             | !                 | let "a=!0"             | 1       |
| maggiore                  | >                 | let "a=4,a=a>0"        | 1       |
| minore                    | <                 | let "a=4,a=a<0"        | 0       |
| uguale a                  | ==                | let "a=4,a=a==0"       | 0       |
| diverso da                | !=                | let "a=4,a=a!=0"       | 1       |
| minore uguale             | <=                | let "a=4,a=a<=0"       | 0       |
| maggiore uguale           | >=                | let "a=4,a=a>=0"       | 1       |
| and logico                | &&                | let 'a=1,a=a&&0'       | 0       |
| or logico                 | \|\|              | let 'a=1,a=a\|\|0'     | 1       |
| if ternario               | (cond==1)?if:else | let "a=1,a=(a>0)?5:-5" | 5       |

Esistono anche delle funzioni matematiche, *ma non potete applicarle con bash* :

| Operazione                  | Su let  | esempio             | risultato           |
| --------------------------- | ------- | ------------------- | ------------------- |
| trasformazione float        | float() | let "a=float(4)"    | 4.0000              |
| valore assoluto             | abs()   | let 'a=abs(-3)'     | 3                   |
| logaritmo naturale          | log()   | let 'a=log(2.73)'   | 1.0043016091968684  |
| logaritmo base 10           | log10() | let 'a=log(100)'    | 2.                  |
| logaritmo base 2            | log2()  | let 'a=log(32)'     | 5.                  |
| coseno (in rad)             | cos()   | let 'a=cos(0)'      | 1.                  |
| seno (in rad)               | sin()   | let 'a=sin(3.14/2)' | 0.99999968293183461 |
| tangente (in rad)           | tan()   | let 'a=tan(3.14/4)' | 0.99920399010504268 |
| troncamento cifre decimali  | floor() | let 'a=floor(3.14)' | 3.                  |
| approssimazione per eccesso | ceil    | let 'a=ceil(3.14)'  | 4.                  |

Altre informazioni le trovate qui: [manuale di bash](https://man7.org/linux/man-pages/man1/bash.1.html#ARITHMETIC_EVALUATION) e qua: [manuale di zsh](https://zsh.sourceforge.io/Doc/Release/Arithmetic-Evaluation.html)

## Bash e la valutazione aritmetica 

Potete applicare le valutazioni aritmetiche sopra specificate utilizzando una scorciatoia di bash, ovvero la sintassi: 

```bash
$((espressione aritmetica))
```



Trovo questa sintassi molto più comoda, soprattutto in vista di dover stampare o utilizzare un determinato calcolo. Le regole son le stesse di `let` (attinge alle stesse funzioni essendo in realtà una funzione interna a bash), ma vediamo come cambia il nostro modo di fare calcoli utilizzandola.
Ad esempio calcoliamo l'area di un triangolo rettangolo con base 5 e altezza 3: 

```bash
base=5
altezza=3
echo -e "l'area \u00e8 $((base*altezza/2))"
```

output: 

```bash 
l'area è 7
```



Ovviamente non è precisa dal punto di vista decimale, però in zsh potrete effettivamente attingere anche a questa funzione volendo: 

```bash
base=5.
altezza=3.
echo "l'area \u00e8 $((base*altezza/2))"
```

output: 

```bash
l'area è 7.5
```



Infatti, mettendo un punto dopo il numero, fate intendere a zsh di voler calcolare il risultato come numero decimale.



## Perché non un linguaggio di programmazione? Python 

Un ottimo metodo, veloce e senza molti limiti, è quello di utilizzare le funzioni matematiche dei linguaggi di programmazione interpretati. 
Ad esempio troviamo *python in quasi tutte le distribuzioni linux*. **Non serve saper programmare per utilizzare tali funzioni tranquilli!**



Avviamolo: 

```bash
python
```



Nel prompt dei comandi possiamo fare già tutti i calcoli che vogliamo: 

```python
3+1
```

output: 

```python
4
```



Possiamo assegnare variabili e utilizzarle per i nostri calcoli: 

```python
base=5
altezza=3
base*altezza/2
```

output: 

```python
7.5
```

Come notiamo, i numeri decimali son pienamente già supportati dal linguaggio. 



Abbiamo per lo più le stesse operazioni di `let`, ad eccezione delle seguenti: 

| Operazione                 | in python                                      | esempio                       | output |
| -------------------------- | ---------------------------------------------- | ----------------------------- | ------ |
| dare più comandi           | ;                                              | a=1;b=2;a+b                   | 3      |
| incremento                 | Non disponibile, servono pi&ugrave; operazioni | a=1;a=a+1;a                   | 2      |
| decremento                 | Non disponibile, servono pi&ugrave; operazioni | a=1;a=a-1;a                   | 0      |
| operazione ed assegnamento | Non disponibile, servono pi&ugrave; operazioni | a=1;a=a-5;a                   | -4     |
| and logico                 | and                                            | 1 and 0                       | 0      |
| or logico                  | or                                             | 1 or 0                        | 1      |
| if ternario                | risultato if condizione else altro risultato   | i=0; <br />a= 5 if i>0 else 7 | 7      |

Possiamo utilizzare svariate funzioni e costanti matematiche, tuttavia è necessario conoscere qualche passaggio in più rispetto alle normali operazioni. 

Innanzitutto dobbiamo chiedere al linguaggio di "importarle", ovvero dichiarare di volerle utilizzare: 

```python
from math import * 
```

Ora possiamo utilizzarle senza problemi. Abbiamo accesso ad una serie di costanti come: 

| costante         | in python | valore approssimativo |
| ---------------- | --------- | --------------------- |
| Pi greco         | pi        | 3.141592653589793     |
| Numero di nepero | e         | 2.718281828459045     |



Ed a molte funzioni matematiche, ad esempio : 

| operazione             | in python | esempio   | valore |
| ---------------------- | --------- | --------- | ------ |
| Logaritmo naturale     | log       | log(e)    | 1.0    |
| coseno                 | cos       | cos(pi)   | -1.0   |
| seno                   | sin       | sin(pi/2) | 1.0    |
| massimo comun divisore | gcd       | gcd(6,9)  | 3      |

Le funzioni son davvero tante per elencarle tutte, avete una lista completa [sulla documentazione ufficiale di python](https://docs.python.org/3/library/math.html)



Per uscire dalla shell interattiva di python potete digitare `CTRL+D` o scrivere `exit`.



Potete anche accedere alle funzioni di Python in maniera "non interattiva" richiamandolo così: 

```bash
python -c "comando"
```


Tuttavia, per vedere il suo output, dovrete richiedere esplicitamente quale operazione o risultato con la funzione `print`. 
Ad esempio: 

```bash
python -c "from math import *; b=3;n=81;print(log(n)/log(b))"
```

output : 

```bash
4.0
```


Usare questa sintassi però potrebbe risultare poco leggibile ed un po' caotico.

## Octave, il simil Matlab

Nato come sostituto open source di Matlab, Octave è davvero un bel software di calcolo, ha tante estensioni *tramite il suo plugin manager forge* e offre già di base molte operazioni.  

Va installato come pacchetto a parte tramite il package manager della vostra distribuzione.



### Installare su Ubuntu 

```bash
apt install octave
```



### Installare su Archlinux 

``` bash
pacman -S octave 
```



### Installare su Fedora

```bash
dnf install octave
```



### Avviare o eseguire comandi con Octave 

Una volta installato avrete quattro modi di interagire con il software: 

- in modalità interattiva, digitando semplicemente `octave`
- inviando i singoli comandi, digitando:

```bash
octave --eval 'istruzioni'
```

- in modalità GUI, digitando `octave --gui`
- scrivendo le istruzioni in un file, quindi digitando: 

```bash
octave /percorso/file
```



### Utilizzo

Come già sottolineato, Octave è un software con molte funzioni, più di quelle che probabilmente vi servono. Ma le funzioni di base son tutte molto intuitive.   

Ogni comando che scrivete viene immediatamente calcolato e quindi mandato in output. Ad esempio: 

```octave
1+1
```

output: 

```octave
ans = 2
```

Se non volete stampare il risultato di un'operazione, semplicemente scrivete alla fine il punto e virgola: 

```octave
1+3;
```



Potete anche assegnare delle variabili e riutilizzarle: 

```octave
a=3; 
7+a
```

output: 

```octave
ans = 10
```

Se non assegnate una variabile ad una determinata istruzione, viene in automatico assegnata ad una variabile detta `ans`, che potrete liberamente utilizzare a vostro piacimento: 

```octave
8+3;
ans*2
```

output: 

```octave
ans = 22
```



Octave gestisce nativamente anche il calcolo vettoriale, perciò potete applicare operatori su interi vettori: 

```octave
[1,2,3]+2
```

output:

```octave
ans = 
   3   4   5
```

Oppure procedere con operazioni più complesse utilizzando operazioni come *il prodotto vettoriale*

``` octave
[1,2,3] * [-1;-2;-3]
```

output: 

```octave
ans = -14
```

In questo caso, come potete notare, abbiamo due vettori creati con diversa sintassi.  

I vettori creati separando gli elementi con le virgole son *vettori riga*, ovvero nell'esempio son *1&times;3*.

I vettori creati separando gli elementi con punto e virgola son *vettori colonna*, ovvero nell'esempio il secondo vettore è un *3&times;1*  

Vediamo ora le operazioni aritmetiche di base: 

| Operazione                | Su octave        | esempio         | output |
| ------------------------- | ---------------- | --------------- | ------ |
| somma                     | +                | 1+1             | 3      |
| sottrazione               | -                | 1-1             | 0      |
| moltiplicazione           | *                | 2*2             | 4      |
| divisione                 | /                | 2/2             | 1      |
| potenza                   | ^                | 2^3             | 8      |
| resto divisione           | mod()            | mod(5,3)        | 2      |
| dare più comandi          | ;                | a=2;a*3         | 6      |
| incremento +1             | ++               | a=2;a++;a       | 3      |
| decremento -1             | --               | a=2;a--;a       | 1      |
| incremento +n             | +=n              | a=2;a+=3;a      | 5      |
| decremento -n             | -=n              | a=2;a-=3;a      | -1     |
| operazione e assegnamento | op=n             | a=2;a*=3;a      | 6      |
| negazione bit a bit       | bitcmp(n,cifre)  | bitcmp(4,5)     | 27     |
| shift bit a bit a sinitra | bitshift(n,pos)  | bitshift(32,1)  | 64     |
| shift bit a bit a destra  | bitshift(n,-pos) | bitshift(32,-1) | 16     |
| and bit a bit             | bitand(a,b)      | bitand(29,7)    | 5      |
| or bit  a bit             | bitor(a,b)       | bitor(29,7)     | 31     |
| xor bit a bit             | bitxor(a,b)      | bitxor(29,7)    | 26     |
| negazione 1/0             | ~                | ~0              | 1      |
| maggiore                  | >                | a=4;a=a>0       | 1      |
| minore                    | <                | a=4;a=a<0       | 0      |
| uguale a                  | ==               | a=4;a=a==0      | 0      |
| diverso da                | !=               | a=4;a=a!=0      | 1      |
| minore uguale             | <=               | a=4;a=a<=0      | 0      |
| maggiore uguale           | >=               | a=4;a=a>=0      | 1      |
| and logico                | &&               | a=1;a=a&&0      | 0      |
| or logico                 | \|\|             | a=1;a=a\|\|0    | 1      |

Potete accingere alle costanti `pi` ed `e` per i vostri calcoli, inoltre avete diverse funzioni a disposizione: 



| operazione                  | octave  | esempio   | output |
| --------------------------- | ------- | --------- | ------ |
| Logaritmo naturale          | log     | log(e)    | 1      |
| coseno                      | cos     | cos(pi)   | -1     |
| seno                        | sin     | sin(pi/2) | 1      |
| massimo comun divisore      | gcd     | gcd(6,9)  | 3      |
| troncamento cifre decimali  | floor() | floor(pi) | 3      |
| approssimazione per eccesso | ceil()  | ceil(pi)  | 4      |
| arrotondamento              | round() | round(e)  | 3      |

E molte altre, per attingere a tutte le possibili funzioni utilizzate il comando `doc`



## Qalculate!

Arriviamo a quello che, secondo me, è il tool più bilanciato e utile. Cioè `qalc` o **qalculate**. 



### Installare su Ubuntu 

```bash
apt install qalculate
```



### Installare su Fedora

```bash
dnf install qalculate
```



### Installare su Archlinux

```bash
pacman -S libqalculate
```



### Avviare o eseguire comandi qalc

Potete utilizzare qalc in due modi: 

- in modalità interattiva, digitando solo `qalc`
- a singolo comando, scrivendo `qalc espressione`
  - se il risultato del comando vi serve all'interno di una variabile, conviene utilizzare il parametro: `qalc -t espressione` poiché normalmente l'output viene generato tenendo conto di tutta l'espressione



### Utilizzo

La sintassi di qalc è molto semplice ed espressiva, da ogni comando viene generato un output.   

*In qalc non si possono inserire variabili*. Tuttavia in modalità "shell" (quindi non interattiva) potete utilizzare le variabili della shell e memorizzarci dentro il risultato del calcolo. Per fare un esempio: 

```bash
base=5
altezza=3
area=$(qalc -t "$base*$altezza/2")
echo "Area triangolo $area"
```

output: 

```bash
Area triangolo 7,5
```

Notare come la virgola, vista come separatore tra interi e decimali, sia specificata nel formato italiano. Questo dipende dalla lingua di sistema: per forzare ad utilizzare il punto come divisore, anteporre `LANG=C` davanti l'uso di `qalc` oppure definire temporaneamente la variabile `LANG` con export: 

```bash
base=5
altezza=3
area=$(LANG=C qalc -t "$base*$altezza/2")
echo "Area triangolo $area"
```

output: 

```
Area triangolo 7.5
```





Vediamo ora le operazioni di base: 

| Operazione                | Su qalc      | esempio                | output |
| ------------------------- | ----------------- | ---------------------- | ------ |
| somma                     | +                 | 1+1                    | 3      |
| sottrazione               | -                 | 1-1                    | 0      |
| moltiplicazione           | *                 | 2*2                    | 4      |
| divisione                 | /                 | 2/2                    | 1      |
| potenza                   | ^                 | 2^3                    | 8      |
| resto divisione           | %            | mod(5,3)               | 2      |
| dare più comandi          | non disponibile  | non disponibile | non disponibile |
| incremento +1             | non disponibile | non disponibile | non disponibile |
| decremento -1             | non disponibile | non disponibile | non disponibile |
| incremento +n             | non disponibile | non disponibile | non disponibile |
| decremento -n             | non disponibile | non disponibile | non disponibile |
| operazione e assegnamento | non disponibile | non disponibile | non disponibile |
| negazione bit a bit       | ~   | ~4           | -5    |
| shift bit a bit a sinitra | <<              | 32<<1     | 64     |
| shift bit a bit a destra  | >>              | 32>>1  | 16     |
| and bit a bit             | &               | 29 & 7          | 5      |
| or bit  a bit             | \|              | 29\|7   | 31     |
| xor bit a bit             | xor             | 29 xor 7 | 26     |
| negazione 1/0             | !               | !0          | 1      |
| maggiore                  | >                 | e>0       | 1      |
| minore                    | <                 | e<0        | 0      |
| uguale a                  | ==                | e==0       | 0      |
| diverso da                | !=                | e!=0       | 1      |
| minore uguale             | <=                | e<=0       | 0      |
| maggiore ugual Operazione                  e | Su let          | esempio | risultato |
| and logico                | non disponibile | non disponibile | non disponibile |
| or logico                 | non disponibile | non disponibile | non disponibile |



Con qalc avrete accesso a costanti matematiche e scientifiche: 

| costante                   | su qalc |
| -------------------------- | ------- |
| pi greco                   | pi      |
| costante di nepero         | e       |
| velocità della luce        | c       |
| costante di planck         | planck  |
| costante di gravit&agrave; | g_0     |



Per trovare una variabile di cui conoscete il nome ma non la traduzione su qalc, scrivete 

```
/find termine ricerca
```

ricordate di scrivere in inglese.



Ovviamente ci sono anche numerose funzioni, quali:

| operazione                  | qalc                  | esempio    | output |
| --------------------------- | --------------------- | ---------- | ------ |
| Logaritmo naturale          | log                   | log(e)     | 1      |
| coseno                      | cos                   | cos(pi)    | -1     |
| seno                        | sin                   | sin(pi/2)  | 1      |
| massimo comun divisore      | gcd                   | gcd(6;9)   | 3      |
| troncamento cifre decimali  | floor()               | floor(pi)  | 3      |
| approssimazione per eccesso | ceil()                | ceil(pi)   | 4      |
| arrotondamento              | round()               | round(e)   | 3      |
| sommatoria                  | sum(funzione,min,max) | sum(x;1;4) | 10     |
| minimo comune multiplo      | lcm                   | lcm(6;9)   | 18     |



### Immediatezza

Capiamoci, perché qalc dovrebbe essere così speciale? 

In realtà octave offre molte più funzioni, tuttavia l'immediatezza con la quale qalc offre alcune funzioni particolari è disarmante.   
Facciamo alcuni esempi banali, come risolvere l'equazione di secondo grado:   

x<sup>2</sup> + 4x + 4  

Quindi scriviamo su `qalc`: 

```
xx+4x+4
```

Il risultato sarà: 

```
(((x × x) + (4 × x) + 4) = 0) = (x = −2)
```



Essendo che non ci son variabili, con qalc mettere una lettera vicino un numero è, esattamente come in matematica, simbolo di ripetizione e quindi di moltiplicazione.
Anche mettere due simboli insieme ha lo stesso significato, infatti la scrittura seguente: 

```
epi
```

Dà in output: 

```
e x pi ~ 8,5397342226735670654635508695
```



### Le conversioni 

Qalc converte qualsiasi unità o valuta e mantiene quanto più possibile aggiornato il database di conversione. 

Facciamo subito qualche esempio e convertiamo kb in GiB: 

```
80000000 kbit to GiByte
```

output: 

```
80000000 × kilobit = 9,31322574615478515625 GiB
```





Euro in dollari

```
1 euro to dollars
```

output : 

```
 123 x EUR = $142,42170
```



Bitcoin in euro: 

```
1 bitcoin to euro
```



```
1 x BTC ~ €58543,850
```



### Precisione

È possibile impostare la precisione dei calcoli tramite l'istruzione: 

```bash
set precision n
```



Oppure in modalità non interpretata con: 

```bash
qalc -s "precision n" "espressione"
```



Il numero indicato sarà il totale di cifre tra intere e decimali che ne uscirà fuori, la priorità verrà data ovviamente alle cifre intere.



### GUI 

Esistono due interfacce grafiche per Qalculate, una *scritta in gtk* e una in **qt**.   
Penso che la migliore delle due sia quella scritta in gtk, oltre che la più facile da installare. Se non la trovate nei vostri repository potete comodamente sfruttare flatpak: 

```bash
flatpak install qalculate
```

