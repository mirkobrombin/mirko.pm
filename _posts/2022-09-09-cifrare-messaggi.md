---
title: '#howto - Cifrare un file o un messaggio' 
date: 2022-09-09 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhub 
published: true
tags: 
- cifrare 
- messaggi
- gpg
- sicurezza 
---



Non esistono più gli amici di penna! È più comune utilizzare i social e gli istant messenger ormai, ma quando vuoi mandare un messaggio che nessuno, oltre il destinatario, può capire, cosa puoi fare? Ecco come cifrare un file o un messaggio su Linux



## GPG

Un metodo quasi nativo, infatti molte distribuzioni di default usano gpg per firmare i loro pacchetti.  Se non presente si può installare con il gestore di pacchetti locale.



### Installare su Ubuntu e derivate

```bash
apt install gpg
```

 

### Installare su Fedora 

```bash
dnf install gpg 
```



### Installare su Archlinux 

```bash
pacman -S gnupg
```



### Come funziona

Gpg è un software che usa algoritmi a **doppia chiave cifrata** per cifrare o firmare i messaggi, dunque abbiamo bisogno di una coppia di chiavi per usarlo. 

Una delle due chiavi è detta "*pubblica*", l'altra "*privata*", ed hanno una particolarità: **ognuna di esse cifra un messaggio che può essere decifrato solo con l'altra chiave**.

La chiave pubblica è generalmente disponibile a chiunque (per tanto pubblica), e viene usata da chi si vuole mettere in contatto con noi. Usandola infatti per cifrare un messaggio, solo noi saremo in grado di decifrarlo. 


La chiave privata ha il ruolo quindi di decifrare in messaggi in arrivo, ma non solo. Si usa anche per "*firmare*" un messaggio, ovvero scrivere un messaggio che ha la proprietà di poter essere letto **solo con la nostra chiave pubblica** (che hanno tutti), a che scopo direte? Per assicurare al mondo che siamo stati proprio noi a scrivere quel messaggio (nessun altro avrebbe potuto scrivere un messaggio decifrabile con la nostra chiave pubblica).

### Generare le chiavi


Per generare una coppia di chiavi: 

```bash
gpg --full-generate-key
```





Scegliere algoritmo **RSA and RSA**, potete mandare `enter` per le scelte di default (lunghezza della chiave a 3072 bits e chiave senza scadenza) quindi `y`. Utilizzare poi un nome (vanno bene anche gli spazi per separare nome e cognome) e un indirizzo email. Infine, opzionale, si può inserire un commento.



>  Nota: Nelle versioni più vecchie di `gpg` il comando giusto dovrebbe essere:
>
>  `gpg --default-new-key-algo rsa4096 --gen-key`



### Esportare la chiave 

Dovrete esportare la vostra chiave pubblica, da dare a chi vuole scrivervi i messaggi cifrati. Normalmente quando si tratta di algoritmi a doppia chiave cifrata, bisogna avere la chiave pubblica della persona a cui si vuole scrivere. Con quella chiave si cifra il messaggio, solo la persona che vi ha dato quella chiave a sua volta potrà decifrare il messaggio.



Quindi dovete esportare la vostra chiave pubblica e scambiarla con il vostro amico, per farlo scrivete: 

```bash
gpg --armor --export indirizzoemail > chiave.asc
```

 Ed inviategli il file "`chiave.asc`"



### Importare la chiave

Ora bisogna importare la chiave dell'interlocutore, una volta in possesso della sua chiave pubblica scriviamo: 

```bash
gpg --import chiave.asc
```



### Cifrare un messaggio

Ora è possibile cifrare un messaggio. Con `echo` si può il messaggio, lo si passa in pipeline a `gpg` che lo cifra e lo si rediziona verso un altro file: 

```bash
echo 'testo del messaggio' | gpg -r indirizzoemailinterlocutore --encrypt  > messaggiocifrato.asc
```

 

Il messaggio cifrato finisce nel file "`messaggiocifrato.asc`", lo potrà aprire solo colui che vi ha dato la chiave pubblica. 



### Decifrare un messaggio 

L'operazione inversa è molto semplice: 

```bash
gpg -d messaggiocifrato.asc
```



### Riassunto 

Un piccolo riassunto per fissare il tutto: 

- InterlocutoreA e InterlocutoreB vogliono scambiarsi messaggi cifrati
- Entrambi creano delle chiavi con gpg 
- Esportano la propria chiave pubblica
- La scambiano
- InterlocutoreB manda un messaggio ad InterlocutoreA cifrandolo con la chiave pubblica di InterlocutoreA stesso.
- InterlocutoreA decifra il messaggio usando la propria chiave privata.



Beh un po' contorto, sicuramente vi state chiedendo se esistono modi più semplici di mandare un messaggio privato, ad esempio semplicemente utilizzando una parola d'ordine... 



## openSSL

Tramite openSSL possiamo utilizzare delle chiavi esadecimali per cifrare i nostri messaggi con `aes`.

Innanzitutto trasformiamo la nostra password testuale in esadecimale con `od`: 

```bash
echo "la mia password" | od -t x1 -An | tr -d ' \n'
```

Quindi usiamola dopo il parametro `-K`, supponiamo sia uscito `FF`

```bash
echo "testo del messaggio" | openssl enc -aes-128-cbc -A -a -nosalt -K "FF" -iv 999999 -out messaggioCifrato
```

il numero dopo "`-iv`" è in realtà *il vettore di inizializzazione*, potete mettere un numero casuale e a piacere. Più confuso è, più sicuro dovrebbe essere l'algoritmo. 

Il risultato invece si troverà sul file "`messaggioCifrato`".

### Decifrare il messaggio 

Per decifrarlo la persona deve avere due informazioni: 

- La password usata
- Il vettore di inizializzazione

Ovviamente la password deve essere utilizzata in esadecimale, quindi dopo averla trasformata con lo stesso metodo di cui sopra, andiamo a decifrare il messaggio. Il comando è pressoché lo stesso di sopra, cambia giusto qualcosa: 

```bash
openssl aes-128-cbc -A -a -nosalt -K "FF"  -iv 999999  -in messaggioCifrato -d 
```



