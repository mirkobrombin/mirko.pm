---
title: '#howto-cercare i duplicati da terminale con fdupes'
published: 2021-30-04T10:40
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags:
- bash
- ubuntu
- archlinux
- fedora
---

Essì. Sicuramente quel file l'hai già scaricato 10 volte, e quell'altra foto ? ce l'hai in almeno due directory.
L'unico modo per esserne certi però è lasciare che dei software analizzino le nostre cartelle. 

## fdupes
Uno dei software, utilizzabili direttamente da terminale, tra i più immediati è sicuramente `fdupes`.  Presente nella maggiorparte delle repository possiamo installarlo con il nostro gestore di pacchetti di sistema

### Ubuntu 

Su Ubuntu tramite apt  

```bash 
apt install fdupes
```

### Fedora
Su fedora tramite dnf  

```bash
yum install fdupes
```

### Archlinux
Su archlinux tramite pacman  

```bash
pacman -S fdupes
```

## utilizzo 

Normalmente possiamo utilizzare fdupes da linea di comando indicando una o più cartelle in cui cercare i duplicati così:

```bash
# nel caso di una sola cartella
fdupes Cartella

# nel caso di più cartelle
fdupes Cartella1 Cartella2
```

> **NOTA:**  
> 
> fdupes può essere utilizzato solo su cartelle, verrà poi eseguito l'algoritmo sui file al suo interno ( solo i file )

I file trovati simili verranno elencati e quindi raggruppati (ogni gruppo è separato da uno spazio da un altro), ecco un esempio di output:

```
./unfile                                
./file4

./asd.txt
./file2
./file3

./Screenshot_20210501_122948.png
./ciao.png
```

Possiamo notare tre gruppi di file uguali, il primo formato dai due file `unfile` e `file4` il secondo dai tre file `asd.txt`,`file2`,`file3` e così via...

### l'opzione --delete

Potrebbe essere comodo cercare i duplicati ed eliminarli anche, magari scegliendo quali tenere. Quindi lo facciamo con l'opzione `--delete`. 

`fdupes --delete Cartella` 

Una volta avviata la grafica, viene subito all'occhio che i file restano raggruppati per duplicati, e ogni duplicato è numerato. 
Navighiamo, all'interno della lista con le frecce direzionali su e giu, eventuali azioni devono essere scritte tramite comandi precisi, visualizzabili scrivendo `h` e premendo invio. 

#### operazioni a gruppo

Per ogni blocco si possono specificare alcune operazioni, supponiamo di avere un gruppo di tre duplicati, numerati quindi da 1 a 3. 
La prima operazione da poter fare è poter indicare uno o più file da preservare, ad esempio conserviamo solo il primo digitando `1`, oppure *più file separati da virgole*, scrivendo ad esempio `1,2`. 

Nel gruppo, i file da conservare avranno un segno +, quelli che saranno eliminati il segno -, vediamo un esempio: 
```bash
    [+] ./asd.txt
    [+] ./file2
    [-] ./file3
```

In questo caso i file asd e file2 saranno conservati. 
Potete anche tracciare i file digitando `Maiuscolo + destra` per conservarlo e `Maiuscolo + sinistra` per eliminarlo.

Se abbiamo sbagliato una determinata selezione, possiamo tornare con le frecce sul gruppo e quindi scrivere: `rg`, per resettare singolarmente basta digitare invece sul file `?`.
Se in un determinato gruppo non vogliamo eliminare nessun duplicato, possiamo digitare `all` e quindi invio.

#### operazioni su più gruppi 
Non è sicurament il massimo operare un gruppo alla volta nel caso di tantissimi duplicati, quindi possiamo operare anche per "**selezioni**"

Si possono selezionare tutti i file che, nel percorso, contengono un determinato testo con: `sel testocontenuto` 
Esistono le varianti: 
- `selb` : iniziano con quel testo
- `sele` : finiscono con quel testo
- `selm` :  è precisamente quel testo

Nell'esempio di cui sopra, scrivendo: 
`sel file`
verranno selezionati : 
- unfile
- file2
- file3
- file4

Una volta che alcuni file son stati selezionati, con `ks` vengono marcati come `+`, con `ds` si marcano come `-` e con `rs` si eliminano i tag.

Possiamo poi invertire la selezione con `isel` o deselezionare tutti con `csel`.

Più particolare è la selezione `selr` che consente di selezionare tramite **espressioni regolari**
Se non te ne intendi, abbiamo scritto un articolo su [come scrivere le espressioni regolari in vari linguaggi](https://linuxhub.it/articles/howtodev-sfruttare-le-espressioni-regolari-in-vari-linguaggi/)

Per fare un esempio, scrivendo `selr .*file\d.*` stiamo cercando tutti i file che nel percorso hanno la scritta `file` *seguita da una cifra numerica*

#### chiudere o applicare

Per chiudere un eliminazione fdupes **senza applicare modifiche** basta digitare `quit` o `exit` 

Per applicare le modifiche invece possiamo digitare `prune` oppure premere solo il tasto `canc`

### l'opzione ricorsiva

Probabilmente non avrete alcun interesse nell'analizzare una sola cartella con i suoi file. fdupes può essere lanciata in maniera ricorsiva analizzando anche cartelle dentro altre cartelle e tutti i file all'interno. Questo grazie all'opzione `-r`

`fdupes -r Cartella`

L'opzione ricorsiva funziona anche con l'opzione `delete`


## Throubleshoot con --delete
Per quanto riguarda la mia esperienza ho notato che il carattere backspace non funziona con `fdupes --delete` mentre si scrive un comando ( se si sbaglia)
Bisogna invece spostarsi col cursore sul carattere errato e premere `canc`


Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).