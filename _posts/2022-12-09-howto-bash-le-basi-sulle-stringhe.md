---
title: '#howto - Bash: le basi sulle stringhe'
date: 2022-12-09 08:00
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
---

È decisamente un'ottima idea utilizzare il terminale, specie per svolgere una serie di azioni ripetitive, e ancor di più per quelle che - se svolte manualmente - sarebbero invece ben più dispendiose da portare a termine.

In questo articolo verrà approfondito un aspetto che, nonostante sia di fondamentale importanza nella creazione degli *script*, non è sempre chiaro fino in fondo: le **stringhe** e il loro comportamento in determinate circostanze.

Nonostante ci sia un buon margine di compatibilità tra le tre shell più utilizzate, ossia Dash, Bash e Zsh, il presente articolo risulterà specifico per la più comunemente usata delle tre, ossia **Bash**.


## Cos'è una stringa

Innanzitutto, una stringa è una sequenza di caratteri alfanumerici, solitamente racchiusi all'interno di apici singoli o doppi.
```bash
# Esempio di stringhe, stampate in console con echo

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


## L'importanza degli apici

Un dettaglio molto importante e che salta all'occhio già dal primo esempio è il ruolo degli spazi: le stringhe sono "whitespace-terminated", vale a dire che una sequenza smette di essere una stringa quando il prossimo carattere è uno spazio, una riga a capo, e simili.

Senza l'escape, il primo esempio sarebbe risultato nell'avvio dell'eseguibile "world" (qualora disponibile) con la variabile "nome\_stringa" che sarebbe stata impostata a "hello world" e visibile solo e soltanto per quel programma. In poche parole, con una combinazione diversa di parole gli effetti sarebbero potuti essere devastanti.

Da qui l'importanza degli apici: **per sicurezza** ma anche al fine di evitare continui e scomodi escape (uso del backslash \\) dinanzi agli spazi, è di gran lunga preferibile racchiudere una stringa tra apici singoli o doppi.

Tra i due tipi di apici c'è un'importante differenza:
- gli apici singoli lasciano la stringa così com'è, sempre;
- gli apici doppi potrebbero, in alcune circostanze, trasformare il contenuto della stringa.

```bash
# Esempio sulle differenze tra apici singoli e doppi

input=42

echo 'L'\''input inserito è $input'
# Stampa: L'input inserito è $input

echo "L'input inserito è $input"
# Stampa: L'input inserito è 42
```


## Concatenazione di variabili e testo

È possibile includere il valore di una variabile all'interno di un'altra stringa così come dimostrato dall'esempio appena sopra (da notare l'uso degli apici doppi). A permettere ciò è il carattere del dollaro americano seguito dal nome della variabile.
Tuttavia, non sempre ciò è sufficiente: in alcuni casi occorre utilizzare le parentesi graffe appena prima ed appena dopo il nome della variabile.

```bash
# Esempio di script che, dato il prefisso "ri" e la parola "scrivere",
# dovrebbe stampare "riscrivere"

prefisso=ri
parola=scrivere

testo=$prefissoscrivere     # Errato: $prefissoscrivere non esiste
testo=${prefisso}scrivere   # Corretto
testo="$prefisso"scrivere   # Corretto
```

Ma gli spazi non sono gli unici caratteri a cui prestare attenzione: anche l'asterisco (\*) può risultare in comportamenti inaspettati.

```bash
# Esempio di script che fa uso incontrollato dell'asterisco

cd /
note_pagina="* primo dell'elenco"
# Stampa: /bin /boot /etc [...] /usr /var primo dell'elenco
```


## In sintesi

È buona pratica usare gli apici singoli qualora possibile, e se proprio necessario gli apici doppi, soprattutto nel caso di input esterni su cui non si ha alcun controllo (ad esempio l'immissione di testo da parte dell'utente).

---

Per ora è tutto: analizzeremo le "Operazioni su stringhe" prossimamente, nella seconda parte di questa guida.

