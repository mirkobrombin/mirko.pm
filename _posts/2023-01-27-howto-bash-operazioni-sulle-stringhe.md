---
class: post
title: '#howto - Bash: operazioni sulle stringhe'
date: 2023-01-27 08:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: false
tags:
- ubuntu
- fedora
- archlinux
- bash
- zsh
---

Nell'[articolo precedente](https://linuxhub.it/articles/howto-bash-le-basi-sulle-stringhe), focalizzato nello specifico su **Bash**, è stato descritto cosa sono le stringhe, come crearle, come salvarle in una variabile; il tutto è stato corredato di esempi e consigli per evitare di ritrovarsi dinanzi a comportamenti inaspettati da parte delle shell.

In quest'articolo, riguardante le principali operazioni sulle stringhe, è stavolta incentrato sia su **Bash** che **Zsh**, due delle shell più comunemente utilizzate.
Il comportamento delle due shell è solitamente uguale nelle medesime condizioni, altre volte però diverge.


## Tipi di variabili

Le variabili si classificano principalmente in tre gruppi:
- definite e non vuote;
- definite ma vuote;
- indefinite (o inesistenti).

```bash
variabile="Hello World"  # variabile definita, non vuota
vuoto=""                 # variabile definita ma vuota
```


## ${variabile}

Sostituzione semplice con il suo contenuto.


### ${variabile-val}

Comporta la sostituzione con "val" solamente se la variabile non esiste.


### ${variabile:-val}

Comporta la sostituzione con "val" sia che la variabile non esista, sia che esista ma sia vuota.


### ${variabile+val}

Comporta la sostituzione con "val" solamente se la variabile esiste (a prescindere che sia vuota o meno).


### ${variabile:+val}

Comporta la sostituzione con "val" solamente se la variabile esiste e non è vuota.


### ${variabile=default}

Imposta il valore della variabile a "default" solamente se la variabile non esisteva in precedenza.


### ${variabile:=default}

Imposta il valore della variabile a "default" solamente se la variabile non esisteva o era vuota in precedenza.


### ${variabile::=default}

Su Bash, si tratta di un'operazione non valida.
Su Zsh, la variabile viene impostata sempre a "default", a prescindere che esista o meno.


### ${variabile?msg}

Si comporta come \$\{variabile\} se essa è definita e non è vuota, altrimenti stampa (in stderr) il messaggio "msg" e imposta il returncode (\$?) a 1 (se avviene in uno script, ne comporta la terminazione).


### ${variabile:?msg}

Si comporta come \$\{variabile\} se è definita, a prescindere che sia vuota o meno, altrimenti stampa (in stderr) il messaggio "msg" e imposta il returncode (\$?) a 1 (se avviene in uno script, ne comporta la terminazione).


### ${variabile#prefisso}

Se possibile, ritorna \$\{variabile\} senza la parte iniziale "prefisso", altrimenti ritorna \$\{variabile\} rimanendola invariata.
La rimozione avviene in modo che il **pattern** "prefisso" tolga quanti meno caratteri possibili.


### ${variabile##prefisso}

Se possibile, ritorna \$\{variabile\} senza la parte iniziale "prefisso", altrimenti ritorna \$\{variabile\} rimanendola invariata.
La rimozione avviene in modo che il **pattern** "prefisso" tolga quanti più caratteri possibili.


### ${variabile%suffisso}

Se possibile, ritorna \$\{variabile\} senza la parte finale "suffisso", altrimenti ritorna \$\{variabile\} rimanendola invariata.
La rimozione avviene in modo che il **pattern** "suffisso" tolga quanti meno caratteri possibili.


### ${variabile%%suffisso}

Se possibile, ritorna \${variabile\} senza la parte finale "suffisso", altrimenti ritorna \$\{variabile\} rimanendola invariata.
La rimozione avviene in modo che il **pattern** "suffisso" tolga quanti più caratteri possibili.


### ${variabile:#val}

Su Bash, si tratta di un'operazione non valida.
Su Zsh, ritorna una stringa vuota ("") se \$\{variabile\} corrisponde esattamente a "val", altrimenti si comporta come \$\{variabile\}.


### ${variabile:offset}

Ritorna una parte di ${variabile}, dalla posizione "offset" in poi (l'offset deve essere necessariamente positivo).


### ${variabile: -offset}

Ritorna una parte di \$\{variabile\}, dalla posizione "offset" fino alla fine (l'offset deve essere necessariamente negativo).

**Nota**: tra i due punti (:) e il segno meno (-) deve esserci **sempre** almeno uno spazio affinché la shell non interpreti il formato come \$\{variabile:-val\} (il quale viene considerato un caso diverso, già trattato in precedenza).


### ${variabile:offset:lunghezza}

Ritorna una parte di \$\{variabile\}, a partire dalla posizione "offset" fino ai successivi "lunghezza" caratteri.

Il comportamento di questa sostituzione varia in base al segno sia dell'offset che della lunghezza, i quali possono essere entrambi valori negativi.


### ${variabile/pattern/sostituzione}

Sostituisce la parte di stringa catturata da "pattern" con "sostituzione" (al massimo la prima occorrenza).


### ${variabile//pattern/sostituzione}

Sostituisce la parte di stringa catturata da "pattern" con "sostituzione" (quante più occorrenze possibili).


### ${#variabile}

Restituisce la lunghezza della stringa memorizzata in \$\{variabile\}.


## Tabella riepilogativa

| **Operazione**                     | **Parametri**           | **variabile="Hello World"**    | **variabile="" (variabile vuota)**       | **"$variabile" non definita**            |
|------------------------------------|-------------------------|--------------------------------|------------------------------------------|------------------------------------------|
| ${variabile-val}                   |                         | "Hello World"                  | ""                                       | "val"                                    |
| ${variabile:-val}                  |                         | "Hello World"                  | "val"                                    | "val"                                    |
| ${variabile+val}                   |                         | "val"                          | "val"                                    | ""                                       |
| ${variabile:+val}                  |                         | "val"                          | ""                                       | ""                                       |
| ${variabile=default}               |                         | "Hello World"                  | ""                                       | variabile="default"                      |
| ${variabile:=default}              |                         | "Hello World"                  | variabile="default"                      | variabile="default"                      |
| ${variabile::=default}             |                         | variabile="default" (solo Zsh) | variabile="default" (solo Zsh)           | variabile="default" (solo Zsh)           |
| ${variabile?msg}                   |                         | "Hello World"                  | ""                                       | Return code $?=1, scrive in stderr "msg" |
| ${variabile:?msg}                  |                         | "Hello World"                  | Return code $?=1, scrive in stderr "msg" | Return code $?=1, scrive in stderr "msg" |
| ${variabile#prefisso}              | prefisso = \*o          | " World"                       | ""                                       | ""                                       |
| ${variabile##prefisso}             | prefisso = \*o          | "rld"                          | ""                                       | ""                                       |
| ${variabile%suffisso}              | suffisso = o\*          | "Hello W"                      | ""                                       | ""                                       |
| ${variabile%%suffisso}             | suffisso = o\*          | "Hell"                         | ""                                       | ""                                       |
| ${variabile:#val}                  | val = Hello             | "Hello World"                  | ""                                       | ""                                       |
| ${variabile:offset}                | offset = 9              | "ld"                           | ""                                       | ""                                       |
| ${variabile: -offset}              | offset = 9              | "Hello Wor"                    | ""                                       | ""                                       |
| ${variabile:offset:length}         | offset = 1, length = -6 | "ello"                         | ""                                       | ""                                       |
| ${variabile/pattern/sostituzione}  | pattern = l             | "He-lo World"                  | ""                                       | ""                                       |
| ${variabile//pattern/sostituzione} | pattern = l             | "He--o Wor-d"                  | ""                                       | ""                                       |
| ${#variabile}                      |                         | 11                             | 0                                        | 0                                        |
