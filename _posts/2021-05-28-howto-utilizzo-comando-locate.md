---
title: '#howto - Utilizzo del comando locate' 
date: 2021-05-28
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
tags: 
- bash
- archlinux
- ubuntu
- fedora
---



Trovare i propri oggetti all'interno della propria camera disordinata è sempre un problema, ci vorrebbe uno strumento come `mlocate`, che ci aiuta a trovare i file nei percorsi del nostro disco.

Vediamo oggi come configurarlo



> **Attenzione**:  
>
> il db creato da locate per indicizzare la ricerca potrebbe raggiungere dimensioni ragguardevoli sul vostro hard disk. Se pensate di avere problemi di spazio, usate altri strumenti come [find](https://linuxhub.it/articles/howto-utilizzo-del-comando-find/)





## Installazione

Normalmente il comando `locate` è disponibile nei vari sistemi, vediamo come installarlo nel caso contrario : 



### Ubuntu e derivate 

```bash
apt install mlocate
```



### Fedora 

```bash
yum -y install mlocate
```



### Archlinux 

```bash
pacman -S mlocate
```



## configurazione 

Potete configurare il database in modo da indicizzare alcuni percorsi piuttosto che altri, innanzitutto apriamo il file di configurazione

```bash
nano /etc/updatedb.conf
```

il file di configurazione presenta principalmente 4 righe con ognuna una variabile diversa: 

- `PRUNE_BIND_MOUNTS` : può essere `yes` o `no`, `1` o `0`, se è `1`o `yes` non indicizza i path **bind**

> un percorso è montato in **bind** se è in realtà un collegamento ad un altra cartella del nostro file system

- `PRUNE_FS`  : la lista di file system da ignorare nell'indicizzazione
- `PRUNE_NAMES` :  la lista di estensioni di file da ignorare nell'indicizzazione 
- `PRUNE_PATHS`  : la lista di percorsi da ignorare nell'indicizzazione

Tutte le liste hanno i vari valori separati da virgole.



Ad esempio se nel file è specificato il valore `PRUNE_PATHS="/tmp /usr"`i percorsi sotto `tmp` e `usr` non verranno indicizzati 



### aggiornamento del db

finita la configurazione, si può aggiornare il db con il comando 

```bash
updatedb
```



## usare locate

Supponiamo ad un certo punto del nostro file system la struttura : 

```bash
Ciao
├── asd
├── asd.png
├── ciao
├── ciao.png
├── dsa
└── dsa.jpg
```



Quindi possiamo iniziare le ricerche. Ad esempio: 

``` bash 
locate "ciao"
```

Restituirà Una lista di valori che corrispondono alla ricerca.

```bash
Ciao/ciao
Ciao/ciao.png
```



Possiamo specificare alcuni valori come opzioni: 

-i per ignorare la differenza tra maiuscole e minuscole

``` bash 
locate -i "ciao"
```

Restituirà:

```bash
Ciao
Ciao/asd
Ciao/asd.png
Ciao/ciao
Ciao/ciao.png
Ciao/dsa
Ciao/dsa.jpg
```


-c : manda in output solo il numero di file trovati
``` bash 
locate -c "Ciao"
```

Restituirà solo il numero:

```bash
7
```


-l <numero> : imposta un certo numero massimo di risultati

``` bash 
locate -l 2 "Ciao"
```

Restituirà:

```bash
Ciao
Ciao/asd
```


-0 : concatena gli output uno dopo l'altro ( attenti è uno zero non una o ) 

``` bash 
locate -0 "ciao"
```

Restituirà:

```bash
CiaoCiao/asdCiao/asd.pngCiao/ciaoCiao/ciao.pngCiao/dsaCiao/dsa.jpg
```


-r REGEX : per fare una ricerca con regex
( per chiarezza immaginate `locate -r '/home/.*png'` per avere tutti i png nella home) 

``` bash 
locate -r 'Ciao.*png' 
```

Restituirà:

```bash
Ciao/asd.png
Ciao/ciao.png
```

### le statistiche 
Si possono ottenere le statistiche su disco tramiite 
tramite

```bash
locate -S  
```

## il caso eCryptFS
Se avete la home cifrate probabilmente avrete ecryptfs che è ormai il default di queste consegne.
Normalmente mlocate evita queste cartelle. Andiamo nel file di configurazione e modifichiamo questo comportamento eliminando **ecryptFS** dalla riga dei **PRUNEFS**



Inoltre consiglio di aggiungere :

`/home/.ecryptfs/` 
Al `PRUNE_PATH`

## plocate 

plocate è presentata come un alternativa più leggera di mlocate, ed usa lo stesso db e gli stessi comandi.  

`plocate` va in conflitto con `mlocale`  



Installatelo con la vostra distribuzione disinstallando mlocate




