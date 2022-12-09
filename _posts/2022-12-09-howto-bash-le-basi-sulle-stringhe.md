---
title: '#howto - Bash: le basi sulle stringhe'
date: 2022-12-09 08:00
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
---

È decisamente un'ottima idea utilizzare il terminale, specie per svolgere una serie di azioni ripetitive, ed ancor di più per quelle che, se svolte manualmente, sarebbero invece ben più dispendiose da portare a termine.

In questo articolo verrà approfondito un aspetto che, nonostante sia di fondamentale importanza nella creazione degli *script bash*, non è sempre chiaro fino in fondo: le **stringhe** e il loro comportamento in determinate circostanze.

Nonostante ci sia un buon margine di compatibilità tra le tre shell più utilizzate, ossia `Dash`, `Bash` e `Zsh`, il presente articolo risulterà specifico per la più comunemente usata delle tre, ossia **Bash**.

## Cos'è una stringa

Innanzitutto, una stringa è una sequenza di caratteri alfanumerici, solitamente racchiusi all'interno di apici singoli o doppi.

```bash
echo stringa1 'stringa2' "stringa3"
# Stampa: stringa1 stringa2 stringa3
```

## Le variabili di stringhe

Molte operazioni sulle stringhe possono essere effettuate solamente se queste sono state salvate in una variabile.

```bash
# Esempio di stringhe salvate in una variabile.
# Le tre istruzioni sono equivalenti.
# Nota: non sono ammessi spazi prima dell'uguale (=), né dopo
# (a meno che non si voglia creare una stringa vuota, o "nulla").

nome_stringa=Hello\ world
nome_stringa='Hello world'
nome_stringa="Hello world"
```

## Importanza e differenza degli apici

Un dettaglio molto importante e che salta all'occhio già dal primo esempio è il ruolo degli spazi: le stringhe sono "**whitespace-terminated**", vale a dire che una sequenza *smette di essere tale* quando il prossimo carattere è uno spazio, una riga a capo, e simili.

Riprendendo l'esempio:

```bash
nome_stringa=Hello\ world
```

Senza l'escape, bash avrebbe interpretato "world" come un comando a se stante, eseguito (se disponibile) con la variabile "nome\_stringa" pari a "hello". In poche parole, con una combinazione diversa di parole gli effetti sarebbero potuti essere devastanti.

Da qui l'importanza degli apici: **per sicurezza**, ma anche al fine di evitare continui e scomodi escape (uso del backslash \\) dinanzi agli spazi, è di gran lunga preferibile racchiudere una stringa tra apici singoli o doppi.

### Differenza tra apici

Tra i due tipi di apici c'è un'importante differenza:

- gli apici singoli non intepretano il contenuto della stringa, stampandola così come scritta.
- gli apici doppi potrebbero, in alcune circostanze, trasformare il contenuto della stringa.

```bash
input=42

echo 'L'\''input inserito è $input'
# Stampa: L'input inserito è $input

echo "L'input inserito è $input"
# Stampa: L'input inserito è 42
```

Si può notare come nel primo caso la stampa non abbia interpretato il valore della variabile `input`, nel secondo caso invece stampa il valore inserito precedentemente (ovvero `42`)

### Nota bene l'escape di un apice

Un ulteriore nota a margine si può fare sull'uso di un apice all'interno di una stringa. Se l'apice corrisponde con quello di inizio stringa va utilizzato l'escape. 

Ad esempio:

```bash
echo "Questa stringa contiene un \" con il carattere escape" 
```

Nel caso dell'apice singolo si ha un ulteriore problema: ovvero non interpreta la scritta (come spiegato in precedenza), perciò non interpreta nemmeno gli escape. L'apice singolo va quindi prima terminato, poi fatto l'escape e quindi riscritto, effettuando *una concatenazione*: 

```bash
echo 'Questa stringa contiene un '\'' con il carattere escape' 
```

## Concatenazione di variabili e testo

È possibile includere il valore di una variabile all'interno di un'altra stringa così come dimostrato dall'esempio appena sopra (da notare l'uso degli apici doppi). A permettere ciò è il carattere del dollaro americano (`$`) seguito dal nome della variabile.

Tuttavia, non sempre ciò è sufficiente: in alcuni casi occorre utilizzare le parentesi graffe appena prima ed appena dopo il nome della variabile.

Scriviamo ad esempio di script che, dato il prefisso "ri" e la parola "scrivere" memorizzato in due variabili diverse,dovrebbe stampare "riscrivere"

```bash
prefisso=ri

testo=$prefissoscrivere     # Errato: $prefissoscrivere non esiste
testo=${prefisso}scrivere   # Corretto
testo="$prefisso"scrivere   # Corretto
```

## Interpretazione dei glob

[Sui glob abbiamo dedicato un articolo a parte](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/).

Gli spazi non sono gli unici caratteri a cui prestare attenzione: i glob possono risultare in comportamenti inaspettati.

```bash
# Esempio di script che fa uso incontrollato dell'asterisco

cd /
note_pagina="* primo dell'elenco"
echo $note_pagina
# Stampa: /bin /boot /etc [...] /usr /var primo dell'elenco
```

### Note: bash vs zsh

Come già preannunciato all'inizio dell'articolo, alcune di queste considerazioni sono da farsi solamente per `bash`. Ad esempio `zsh` non interpreta i glob tra doppi apici.  

## In sintesi

È buona pratica usare gli apici singoli qualora possibile, e se proprio necessario gli apici doppi, soprattutto nel caso di input esterni su cui non si ha alcun controllo (ad esempio l'immissione di testo da parte dell'utente).

Per ora è tutto: analizzeremo le "Operazioni su stringhe" prossimamente, nella seconda parte di questa guida.
