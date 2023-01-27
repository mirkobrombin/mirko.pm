---
class: post
title: '#howto - Bash: operazioni sulle stringhe'
date: 2023-01-27 08:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
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

## Sostituzione

Applica la sostituzione semplice con il suo contenuto.

```bash
${variabile}
```

### Sostituzione condizionata inesistenza

Applica la sostituzione con "val" solamente se la variabile non esiste.

```bash
${variabile-val}
```

### Sostituzione condizionata vuota o inesistente

Comporta la sostituzione con "val" sia che la variabile non esista, sia che esista ma sia vuota.

```bash
${variabile:-val}
```

### Sostituzione condizionata esistente

Comporta la sostituzione con "val" solamente se la variabile esiste (a prescindere che sia vuota o meno).

```bash
${variabile+val}
```

### Sostituzione condizionata vuota

Comporta la sostituzione con "val" solamente se la variabile esiste e non è vuota.

```bash
${variabile:+val}
```

### Sostituzione con valore di default

Imposta il valore della variabile a "default" solamente se la variabile non esisteva in precedenza.

```bash
${variabile=default}
```

### Sostituzione con valore di default Condizionata

Imposta il valore della variabile a "default" solamente se la variabile non esisteva o era vuota in precedenza.

```bash
${variabile:=default}
```


### Sostituzione su zsh con valore di default

Su Bash, si tratta di un'operazione non valida.
Su Zsh, la variabile viene impostata sempre a "default", a prescindere che esista o meno.

```bash
${variabile::=default}
```

### Sostituzione con errore per variabile vuota

Si comporta come `${variabile}` se essa è definita e non è vuota, altrimenti stampa (in stderr) il messaggio "msg" e imposta il returncode (\$?) a 1 (se avviene in uno script, ne comporta la terminazione).

```bash
${variabile?msg}
```

### Sostituzione con errore se non definita

Si comporta come `${variabile}` se è definita, a prescindere che sia vuota o meno, altrimenti stampa (in stderr) il messaggio "msg" e imposta il returncode (\$?) a 1 (se avviene in uno script, ne comporta la terminazione).

```bash
${variabile:?msg}
```

### Sostituzione corta rimuovendo il prefisso

Se possibile, ritorna `${variabile}` senza la parte iniziale "prefisso", altrimenti ritorna `${variabile}` rimanendola invariata. Si possono utilizzare anche i caratteri *glob* di bash come `*` per indicare una qualunque sequenza di caratteri.

Se non si è pratici, si può consultare l'articolo [velocizzarsi nel terminale parte 2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/).

La rimozione avviene in modo che il **pattern** "prefisso" tolga quanti meno caratteri possibili.

```bash
${variabile#prefisso}
```

### Sostituzione lunga rimuovendo il prefisso

```bash
${variabile##prefisso}
```

Se possibile, ritorna `${variabile}` senza la parte iniziale "prefisso", altrimenti ritorna `${variabile}` rimanendola invariata. Si possono utilizzare anche i caratteri *glob* di bash come `*` per indicare una qualunque sequenza di caratteri.

Se non si è pratici, si può consultare l'articolo [velocizzarsi nel terminale parte 2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/).

La rimozione avviene in modo che il **pattern** "prefisso" tolga quanti più caratteri possibili.  

#### Sostituzione corta e sostituzione lunga del prefisso

Per comprendere meglio la differenza tra questa versione e quella corta si può notare la differenza di questo esempio:

```bash
variabile="file_file_ciao"

 echo ${variabile#fi*_} 
# l'output sarà "file_ciao"

 echo ${variabile##fi*_}
# l'output sarà "ciao"
```

### Sostituzione corta rimuovendo il suffisso

Se possibile, ritorna `${variabile}` senza la parte finale "suffisso", altrimenti ritorna `${variabile}` rimanendola invariata.  Si possono utilizzare anche i caratteri *glob* di bash come `*` per indicare una qualunque sequenza di caratteri.

Se non si è pratici, si può consultare l'articolo [velocizzarsi nel terminale parte 2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/).

La rimozione avviene in modo che il **pattern** "suffisso" tolga quanti meno caratteri possibili.

```bash
${variabile%suffisso}
```

### Sostituzione lunga rimuovendo il suffisso

```bash
${variabile%%suffisso}
```

Se possibile, ritorna `${variabile}` senza la parte finale "suffisso", altrimenti ritorna `${variabile}` rimanendola invariata. Si possono utilizzare anche i caratteri *glob* di bash come `*` per indicare una qualunque sequenza di caratteri.

Se non si è pratici, si può consultare l'articolo [velocizzarsi nel terminale parte 2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/).

La rimozione avviene in modo che il **pattern** "suffisso" tolga quanti più caratteri possibili.

#### Sostituzione corta e sostituzione lunga del suffisso

Per comprendere meglio la differenza tra questa versione e quella corta si può notare la differenza di questo esempio:

```bash
variabile="ciao.php.txt"

echo ${variabile%.*}
# l'output sarà "ciao.php"

echo ${variabile%%.*}
# l'output sarà "ciao"
```

### Sostituzione inversa

Su Bash, si tratta di un'operazione non valida.  
Su Zsh, ritorna una stringa vuota ("") se `${variabile}` corrisponde esattamente a "val", altrimenti si comporta come `${variabile}`.

```bash
${variabile:#val}
```

### Sostituzione con sottostringa: offset iniziale

Ritorna una parte di `${variabile}`, dalla posizione "offset" in poi (l'offset deve essere necessariamente positivo).

```bash
${variabile:offset}
```

### Sostituzione con sottostringa: offset finale

Ritorna una parte di `${variabile}`, dalla posizione "offset" fino alla fine (l'offset deve essere necessariamente negativo).

```bash
${variabile: -offset}
```

> **Nota**:  
>
> tra i due punti (`:`) e il segno meno (`-`) deve esserci **sempre** almeno uno spazio affinché la shell non interpreti il formato come `${variabile:-val}` (il quale viene considerato un caso diverso, già trattato in precedenza).

### Sostituzione con sotto-stringa

Ritorna una parte di `${variabile}`, a partire dalla posizione "offset" fino ai successivi "lunghezza" caratteri.

Il comportamento di questa sostituzione varia in base al segno sia dell'offset che della lunghezza, i quali possono essere entrambi valori negativi.

```bash
${variabile:offset:lunghezza}
```

### Sostituzione con rimpiazzamento

Sostituisce la parte di stringa catturata da "pattern" con "sostituzione" (al massimo la prima occorrenza).

```bash
${variabile/pattern/sostituzione}
```

### Sostituzione con rimpiazzamento globale

Sostituisce la parte di stringa catturata da "pattern" con "sostituzione" (quante più occorrenze possibili).


```bash
${variabile//pattern/sostituzione}
```

### Lunghezza della variabile

Restituisce la lunghezza della stringa memorizzata in `${variabile}`.

```bash
${#variabile}
```

## Tabella riepilogativa

| Operazione                     | Parametri           | output con variabile="Hello World"    | output con variabile="" (variabile vuota)       | output con "$variabile" non definita            |
|------------------------------------|-------------------------|--------------------------------|------------------------------------------|------------------------------------------|
| `${variabile-val}`                   |                         | "Hello World"                  | ""                                       | "val"                                    |
| `${variabile:-val}`                  |                         | "Hello World"                  | "val"                                    | "val"                                    |
| `${variabile+val}`                   |                         | "val"                          | "val"                                    | ""                                       |
| `${variabile:+val}`                  |                         | "val"                          | ""                                       | ""                                       |
| `${variabile=default}`               |                         | "Hello World"                  | ""                                       | variabile="default"                      |
| `${variabile:=default}`              |                         | "Hello World"                  | variabile="default"                      | variabile="default"                      |
| `${variabile::=default}`             |                         | variabile="default" (solo Zsh) | variabile="default" (solo Zsh)           | variabile="default" (solo Zsh)           |
| `${variabile?msg}`                   |                         | "Hello World"                  | ""                                       | Return code $?=1, scrive in stderr "msg" |
| `${variabile:?msg}`                  |                         | "Hello World"                  | Return code $?=1, scrive in stderr "msg" | Return code $?=1, scrive in stderr "msg" |
| `${variabile#prefisso}`              | prefisso = \*o          | " World"                       | ""                                       | ""                                       |
| `${variabile##prefisso}`             | prefisso = \*o          | "rld"                          | ""                                       | ""                                       |
| `${variabile%suffisso}`              | suffisso = o\*          | "Hello W"                      | ""                                       | ""                                       |
| `${variabile%%suffisso}`             | suffisso = o\*          | "Hell"                         | ""                                       | ""                                       |
| `${variabile:#val}`                  | val = Hello             | "Hello World"                  | ""                                       | ""                                       |
| `${variabile:offset}`                | offset = 9              | "ld"                           | ""                                       | ""                                       |
| `${variabile: -offset}`              | offset = 9              | "Hello Wor"                    | ""                                       | ""                                       |
| `${variabile:offset:length}`         | offset = 1, length = -6 | "ello"                         | ""                                       | ""                                       |
| `${variabile/pattern/sostituzione}`  | pattern = l             | "He-lo World"                  | ""                                       | ""                                       |
| `${variabile//pattern/sostituzione}` | pattern = l             | "He--o Wor-d"                  | ""                                       | ""                                       |
| `${#variabile}`                      |                         | 11                             | 0                                        | 0                                        |
