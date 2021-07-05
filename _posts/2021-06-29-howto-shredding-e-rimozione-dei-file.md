---

title: '#howto - Shredding e rimozione dei file'
date: 2021-06-29
layout: post
author: Massimiliano Noviello
author_github: linuxhubit
tags:

- shredding
- bash

---



## Introduzione

Quante volte ci è capitato di voler rimuovere un file? Per molti è un'operazione quotidiana.

Tuttavia parecchi di noi non sanno che quando cancelliamo un file sul disco non lo stiamo realmente rimuovendo, lo stiamo solamente segnando come riscrivibile e dicendo al sistema di considerarlo cancellato.

Per assicurarci che i dati vengano completamente distrutti esiste un'operazione chiamata shredding, che consiste essenzialmente nella riscrittura del file.

In questo breve articolo andremo a vedere come rimuovere ed effettuare lo shredding di un file.



## Cancellazione "semplice" tramite rm

È possibile cancellare file tramite il comando `rm`.

Vediamo anche alcune opzioni utili del suddetto comando:



### Rimozione forzata

È possibile forzare la rimozione di un file passando `-f` in argomento a `rm`:

```bash
rm -f nome_file
```

Questo farà sì che `rm` non chieda conferma e ignori gli errori.



### Rimozione ricorsiva di cartelle

Quanndo si vuole rimuovere una cartella è necessario dire a `rm` di farlo ricorsivamente passando l'opzione `-r`:

```bash
rm -r nome_file

rm -r nome_cartella
```



### Rimozione interattiva dei file

Se si desidera che `rm` chieda conferma su ogni rimozione è sufficiente usare `-i`:

```bash
rm -i nome_file

rm -rfi nome_cartella
```



### Rimozione verbosa

Sarà possibile ottenere un output verboso tramite l'opzione `-v`, così da poter avere un resoconto scritto di ogni rimozione:

```bash
rm -v nome_file 

rm -rv nome_cartella
```



## Shredding col comando shred

Per effettuare lo shredding dei file ci basterà usare il comando `shred`.

Vediamo come:



### Impostare un numero di sovrascritture

Possiamo decidere quante volte sovrascrivere un file usando `-n`.



Se per esempio volessimo sovrascrivere un file 5 volte potremmo fare:

```bash
shred -n 5 nome_file
```



### Azzerare il file

Se decidessimo di sovrascrivere il file un'ultima volta con soli zeri potremmo farlo con l'opzione `-z`:

```bash
shred -zn 5 nome_file
```

In questo esempio stiamo riscrivendo il file cinque volte e aggiungendo una sesta volta per sovrascriverlo con degli zeri.



### Mostrare un output

Esattamente come nel caso di `rm` l'opzione`-v` è usata per mostrare un resoconto di ogni operazione:

```bash
shred -vzn 5 nome_file
```

In questo caso, esattamente come prima stiamo riscrivendo il file cinque volte e aggiungendo una sesta volta per sovrascriverlo con degli zeri, ma questa volta stiamo mostrando a video il resoconto di ogni riscrittura.



### Operazione sui dispositivi

È possibile applicare questo anche ai singoli dispositivi, se per esempio volessi farlo su `/dev/sdX` allora farò

```bash
shred -vzn 5 /dev/sdX
```

*(Nota: Potrebbero essere richiesti permessi di superutente)*



## Conclusione

È bene tenere in mente però che questo metodo non garantisce sicurezza al 100%, e questa era solo un infarinatura di base sui comandi shred e rm.

Hai avuto problemi o hai domanda da porci? Non esitare a contattarci sul nostro [gruppo Telegram](https://t.me/linuxpeople).


