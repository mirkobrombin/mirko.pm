---
class: post
title: '#howtodev - Bash introduzione' 
date: 2022-12-16 09:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Martin Ligabue
coauthor_github: MartinLigabue
published: true
tags:
  - bash
---

[NON CI SONO ARTICOLI SUCCESSIVI ANCORA](https://linuxhub.it/articles/howtodev-bash-introduzione/)



Tramite il linguaggio interpretato da `bash` è possibile creare dei veri e propri programmi? In questa serie di guide vedremo come. 

## Obiettivi

In questo articolo verrà spiegato:

- shellbang 
- differenza tra sh e bash
- assegnamento di variabili
- tipologia di variabili
- interpolazione
- commenti
- stampa
- lettura di variabili
- avvio di un programma bash

## Prerequisiti

Abbiamo già affrontato le stringhe nell'articolo: 

- [bash le basi sulle stringhe](https://linuxhub.it/articles/howto-bash-le-basi-sulle-stringhe/)

È gradita una conoscenza pregressa di valori booleani, logica matematica e logica di programmazione.

## Programmazione bash e shellbang

Anche lo scripting shell fa parte dei linguaggi di programmazione e come tale è possibile utilizzarlo per veri e propri programmi.

La programmazione bash inizia dal cosiddetto shellbang, ovvero un'istruzione a inizio file di testo che recita: 

```bash
#!/bin/bash
```

Questa particolare istruzione, detta anche di "preprocessore", indica al sistema operativo che per eseguire quel file deve essere utilizzato il programma `/bin/bash`, e non un altro interprete (come può essere ad esempio `/bin/sh` o `/bin/zsh`).

A tal proposito viene da chiedersi, quando usare `/bin/bash` e quando usare invece `/bin/sh` ? 

## POSIX standard

Il **P**ortable **O**perating **S**ystem **I**nterface for uni**X** standard è un insieme di regole e servizi (descritto in 15 documenti) che un sistema operativo deve offrire per essere compatibile con programmi ed ambienti UNIX-based.

Scrivere uno script in linguaggio `sh` anziché `bash` garantisce che questo abbia accesso solo a questi servizi e che sia quindi *POSIX standard*. 

### Quindi perché usare bash? Nota dell'editore

Se strettamente necessario, ad esempio scrivendo uno script che viene avviato in fase di avvio quando molti servizi ancora non sono attivi, o facendo un programma che deve garantire una certa compatibilità tra vari sistemi è possibile utilizzare *sh*, ma in generale, per quanto mi riguarda, consiglio *bash*, che mantiene un ottimo grado di compatibilità ma allo stesso tempo ha una sintassi più ampia e avanzata di *sh*. In ogni caso questa guida non tratterà la POSIX standard, ma **bash**.

## Gli spazi in bash

Nel linguaggio di scripting bisogna stare innanzitutto sempre molto **attenti agli spazi**. A differenza di tantissimi altri linguaggi infatti, gli spazi giocano un ruolo fondamentale in quanto delimitano i parametri di un comando.

È quindi **nota importantissima** di **non usare spazi** se *non necessariamente indicato*, cose banali come le condizioni di un if o assegnamenti di variabili potrebbero rompere le loro funzionalità utilizzando spazi non necessari.

## Creare una variabile

Il primo passo per imparare tali linguaggi è sicuramente quello di imparare come si inizializza ed usa una variabile.

Una variabile in bash si assegna semplicemente con un `=`, senza alcun spazio tra nome e valore:

```bash
variabile=valore
```

bash non distingue fra tipi specifici di variabili, rimangono le distinzioni fra stringhe e numeri.

### Esempio

Assegniamo quindi una stringa e un numero a due variabili bash: 

```bash
variabilenumerica=10

variabilestringa="ciao sono una stringa"
```

> **NOTA**:  
> 
> Per maggiori approfondimenti sulle variabili stringa potete leggere l'articolo [bash le basi sulle stringhe](https://linuxhub.it/articles/howto-bash-le-basi-sulle-stringhe/)
>

### Richiamare una variabile

Per richiamare una variabile bash si utilizza il carattere del dollaro americano `$`. 

Esempio:

```bash
variabile1="valore"
variabile2="$variabile1"
echo $variabile2
```

Alla fine, `variabile2` sarà uguale a `variabile1`.

## Interpolazione

L'interpolazione è un concetto presente in molti linguaggi moderni e consente di creare delle stringhe inserendo al loro interno delle variabili senza doverle concatenarle con funzioni o altri espedienti che ne renderebero complessa la leggibilità.

In bash l'interpolazione è automatica, basta richiamare una variabile all'interno di una stringa per utilizzarla. Esempio:  

```bash
variabilenumerica=2

variabilestringa="La variabilenumerica vale $variabilenumerica" 
```

## Commenti

In bash un commento inizia con `#` ed esistono solo i commenti in linea (non a blocchi).  

Per chi non fosse pratico di programmazione i commenti son linee di codici che non vengono lette dall'interprete, quindi non eseguiti, solitamente utilizzati per documentare il codice o lasciare chiarimenti.

Ecco un esempio di commento: 

```bash
# questa linea di codice non verrà letta
# neanche questa 
assegnamentovar=2 # I commenti possono iniziare anche dopo un'istruzione
```

## Stampa

La stampa di un testo in *bash* può avvenire tramite due direttive, `printf` ed `echo`.

> **NOTA**:
> 
> Per chi fosse nuovo della programmazione, la "stampa" di un testo è da intendersi come "stampa a schermo" o "visualizzazione di un output testo tramite un istruzione".

Normalmente in bash si utilizza direttamente `echo` con le funzioni di interpolazione, ma potrebbe essere utile per varie motivazioni anche appellarsi a `printf`.

### echo

Per stampare con echo, è sufficiente scrivere le stringhe da stampare separandole con uno spazio: 

```bash
echo stringa1 stringa2 stringa3
```

Ogni parametro viene poi separato da uno *spazio*, a fine comando viene mandato un carattere di *fine linea*.

#### Variabili e parametri di echo

Ovviamente si possono passare ad echo anche delle variabili:

```bash
ciao="ciao sono un testo"
echo $ciao
```

O effettuare anche interpolazioni all'interno di una stringa:

```bash
variabilenumerica=2
echo "la variabilenumerica vale $variabilenumerica"
```

Bisogna inoltre fare una distinzione tra la seguente scrittura:

```bash 
echo ciao come stai
```

E la stessa utilizzando le virgolette

```bash
echo "ciao come stai"
```

*Nel primo caso* stiamo passando ad `echo` 3 variabili, che poi verranno separati da spazio e stampati. *Nel secondo caso* stiamo utilizzando un unico parametro che già concatena le tre parole usando uno spazio come divisore 

#### Alcune opzioni di echo

`echo` ha diverse opzioni disponibili. Vediamone qualuna

Ad esempio per stampare senza mandare a capo si può utilizzare la flag `-n`

```bash
echo -n "questa stringa terminerà senza un a capo"
```

Si può abilitare o disabilitare la lettura degli escape con le opzioni `-e` e `-E`.  

Nell'esempio che verrà l'output *sarà commentato*:

```bash
echo -E "stringa con escape\ndisabilitati"
# stringa con escape\ndisabilitati

echo -e "stringa con escape\ndisabilitati"
# stringa con escape
# disabilitati
```

> **NOTA**: 
>
> Per chi fosse nuovo di programmazione, gli escape son particolari sequenze di caratteri che, introdotte dal backslash, poi vengono tradotte con caratteri normalmente non scrivibili in formato stringa, come tab, fine linea e così via... oppure per utilizzare caratteri che altrimenti verrebbero interpretati come parte del linguaggio, come virgolette, apici o simboli. 
> 
> Ad esempio l'escape `\n` indica il fine linea, mentre `\$` viene letto come carattere dollaro, non come variabile.

### printf

Il `printf`, ovvero **print format**, è una delle più vecchie funzioni di programmazione, presente anche in `c`.

Preleva come parametro la stringa da stampare e vari altri argomenti che verranno interpolati nella stringa utilizzando alcuni caratteri speciali come placeholder.

Andiamo per gradi, stampiamo una semplice stringa:

```bash
printf "ciao"
```

Normalmente in quella stringa ci si può inserire anche un interpolazione ovviamente:

```bash
variabilenumero=2
printf "la variabilenumero vale $variabilenumero"
# la variabilenumero vale 2
```

Ma `printf` è famoso per poter formattare attraverso delle sequenze particolari le variabili. 

#### Formattare stringhe

Per inserire una stringa con `printf` basta utilizzare, al posto della variabile, il placeholder %s, e poi passare come parametro la variabile o la stringa da inserire. 

Ad esempio:

```bash
variabilestringa="Davide" 

printf "Il mio nome è %s." $variabilestringa
```

Perché mai questo approccio dovrebbe servire? Sembrerebbe assurdo visto e considerata la comodità dell'interpolazione, tuttavia la formattazione di stringhe permette anche altro oltre la semplice concatenazione, ad esempio organizziamo il testo in colonne da 10 caratteri inserendo spazi se le stringhe non sono abbastanza lunghe:

```bash
h1="nome"
h2="cognome"

printf "%-10s %-10s\n%-10s %-10s" $h1 $h2 "Mario" "Mariani"
```

Il risultato sarà:

```plain
nome       cognome   
Mario     Mariani 
```

Per spiegare meglio, con il placeholder `%-10s` stiamo chiedendo a printf di creare un array di 10 caratteri e piazzarci all'inizio la nostra stringa e coprire i buchi restanti con spazi. Se la stringa fosse più lunga verrebbe allungato l'array.

Il `-` in tal caso sta dicendo che vogliamo piazzare l'allineamento di tale stringa verso sinistra, con `+` lo avrebbe messo a destra.

Per dare anche una dimensione massima, avremo potutto aggiungere dopo 10 `.n`, con n la dimensione massima. 
Ad esempio: 

```bash
printf "%-10.5s %-10.5s\n%-10.5s %-10.5s" $h1 $h2 "Mario" "Mariani"
```

Darebbe come output:

```plain
nome       cogno     
Mario      Maria  
```

Ovvero troncando le parole a 5 lettere.

#### Formattare numeri 

È possibile ovviamente formattare anche numeri, con il placeholder `%d` per gli interi, `%f` per i numeri decimali.

> **NOTA**: 
>
> La formattazione dei decimali dipende dalla lingua del sistema, ad esempio i sistemi in lingua italiana, utilizzeranno la virgola e non il punto.

Facciamo subito un esempio di prova: 

```bash
printf "la media dei numeri %d, %d e %d è %f" 18 20 30 22,667
```

Il risultato sarà: 

```plain
la media dei numeri 18, 20 e 30 è 22,667000
```

Anche qui è possibile utilizzare varie opzioni per formattare, ad esempio troncare i numeri decimali o aggiungere zeri a sinistra ai numeri interi: 

```bash
printf "la media dei numeri %03d, %03d e %03d è %.2f" 18 20 30 22,667"
```

Risultato:

```bash
la media dei numeri 018, 020 e 030 è 22,67
```

> **NOTA**: 
> se vi interessa un articolo su come utilizzare al meglio i formattatori di printf in vari linguaggi, scrivetecelo nei nostri gruppi! 

Con la sintassi `%03d` stiamo indicando a `printf` di riempire con 0 a sinistra i numeri per raggiungere le tre cifre, mentre con la sintassi `%.2f` stiamo chiedendo che venga ridotta la precisione a due numeri dopo la virgola.

## Leggere una variabile

Infine è importante sapere come leggere una variabile, il comando per questo è `read`, seguito dal nome della variabile: 

```bash
echo -n "inserisci valore:> "

read a

echo "hai inserito $a"
```

Normalmente negli script si utilizza con l'opzione `-r` che serve a non interpretare i caratteri speciali (come lo `\`):

```bash
read -r a
```

Questo consente una maggiore protezione nel caso qualcuno inserisca un carattere escape, che potrebbe compromettere il programma. In questo caso verrebbe trattato non come escape ma come sequenza di due caratteri letterali.

### Leggere silenziosamente

Si può anche far in modo che l'utente non veda ciò che sta digitando, misura importantissima per inserire ad esempio password sotto occhi indiscreti.  
Per farlo usare l'opzione `-s:

```bash
echo -n "inserisci password:> "

read -s psk

echo "grazie."
```

## Avvio di un programma bash

Per avviare uno script bash bisogna prima renderlo eseguibile utilizzando `chmod`: 

```bash
chmod +x /percorso/file/script.sh
```

Quindi basta scrivere il nome preceduto dal percorso assoluto: 

```bash
/percorso/file/script.sh
```

Non si può utilizzare il percorso relativo per eseguire uno script, a meno che questo non sia preceduto dal carattere `.`, che viene sostituito in automatico dal percorso corrente: 

```bash
./percorso/file/script.sh
```
