---
class: post
title: '#howto - Applicazioni da usare con ssh' 
date: 2022-05-20 08:40
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- ssh 
- bash
---

Se pensate che ssh serva solo per connettervi ad un altro pc in remoto per gestirlo, beh potreste sbagliarvi. 
Esistono infatti alcune applicazioni che tramite ssh, vi permettono di fare qualcosa in più.




Se hai dei dubbi o vuoi avere dei chiarimenti su SSH, vai a leggere i nostri articoli citati sotto: 

- [Come usare ssh](https://linuxhub.it/articles/howto-usare-ssh)  
- [ssh parte 2](https://linuxhub.it/articles/howto-usare-ssh-pt2)  



## Banalmente: i git client

La prima e più banale applicazione di ssh è semplicemente git.  
Tramite ssh potrete gestire il vostro repository git senza dover accedere alla piattaforma. 



I client web come github e gitlab prevedono già la possibilità di autenticarsi, ecco ad esempio la nostra guida su [come autenticarsi su github con la chiave ssh](https://linuxhub.it/articles/howto-utilizzo-di-ssh-per-connettersi-a-github/).



In genere se avete un server con dei vostri repository git potete impostare il vostro repository su cui pushare a:

```bash
nomeutente@ind.iri.zzo.ip:/percorso/progetto/git
```

Un po' come se doveste usare `scp`. 

Nel caso di una porta diversa: 

```bash
nomeutente@ind.iri.zzo.ip:PORTA/percorso/progetto/git
```



Comando completo: 

```bash
git remote add mioserver nomeutente@ind.iri.zzo.ip:PORTA/percorso/progetto/git
```



## Trasferire file con sshfs 

E se vi dicessimo che potreste montare un'intera cartella remota sul vostro pc ? SSH File System, ovvero sshfs lo rende possibile. 



Installatelo con il vostro package manager di riferimento

### Installazione sshfs su Ubuntu o derivate

```bash
apt install sshfs
```



### Installazione sshfs su Fedora

```bash
dnf install -y sshfs
```



### Installazione sshfs su Archlinux 

```bash
pacman -S sshfs
```



### Utilizzo 

Per montare una cartella remota bisogna innanzitutto creare una cartella di destinazione del montaggio, come se fosse un device: 

```bash
mkdir puntodimount
```



Quindi potete montarlo così: 

```bash 
sshfs nomeutente@ind.iri.zzo.ip:/percorso/cartella/da/montare puntodimount
```



Se il vostro ssh server è montato su una porta diversa dalla 22 potete usare il flag `-p`: 

```bash
sshfs nomeutente@ind.iri.zzo.ip:/percorso/cartella/da/montare -p PORTA
```

Dovreste quindi trovarvi la cartella montata sul vostro file system locale, nel percorso creato ed indicato!

Se non doveste riuscire a scrivere, provate a montare la cartella utilizzando queste opzioni: 
`sshfs -o rw,allow_other nomeutente@ind.iri.zzo.ip:/percorso/cartella/da/montare -p PORTA`

### Smontare la cartella

Per smontare la cartella basta scrivere: 

```bash
umount puntodimount
```

Esattamente come se fosse un' unità esterna fisica.

## Filezilla

Esiste un programma che utilizza ssh per per fare trasferimento di file in `ftps`, ovvero `Filezilla`-

### Installare Filezilla su Ubuntu e derivate

```bash
apt install filezilla
```

### Installare Filezilla su Fedora 

```bash
dnf install -y filezilla
```

### Installare Filezilla su Archlinux 

```bash
pacman -S filezilla
```

### utilizzo 
Una volta scaricato non vi è tantissimo da spiegare in realtà, il tool è una GUI molto user friendly, in alto trovate dei campi di testo editabili dove inserire: 

- host: ovvero l'indirizzo della macchina o del server a cui desiderate connettervi
- Nome utente
- Password
- Porta 

Infine premendo su "Connessione rapida" dovreste vedere, nel riquadro a destra, le cartelle del server remoto. 

A sinistra vedrete invece le vostre cartelle, selezionate quella dove volete scaricare i vostri file.

## Condividere un terminale con tmux

Potete condividere una sessione di terminale con un amico o un altro dispositivo tramite ssh in maniera molto semplice.

Per farlo dovrete installare `tmux`

### Installare termux su Ubuntu e derivate

```bash
apt install tmux
```

### Installare termux su Fedora 

```bash
dnf install -y tmux
```

### Installare termux su Archlinux 

```bash
pacman -S tmux
```

### Condividere la sessione tmux

Una volta installato scrivete: 

```bash
tmux new-session 
```

Sulla macchina di cui volete condividere la sessione.  

Sull'altra macchina invece bisogna connettersi con ssh:

```bash 
ssh guest@ind.iri.zzo.ip -t tmux attach-session 
```

Se dovesse apparire un errore del genere: 

```plain
need UTF-8 locale (LC_CTYPE) but have ANSI_X3.4-1968
```

Andate a modificare il file `sshd_config` del server scrivendo : 

```bash
SendEnv LC_*
```

Quindi riavviate il demone ssh e riprovate a connettervi!

Se volete condividere la sessione con un amico, potrebbe essere meglio condividere una *sessione guest*, ecco [una guida su come crearne una](https://linuxhub.it/articles/howto-creare-un-utente-guest-su-linux/)!

## Messaggiare con sshchat

Potete messaggiare tramite ssh! Beh non credo ci siano tante persone con cui farlo... ma nel caso..

### Installazione 

Sul vostro server scriverete: 

```bash
git clone https://github.com/shazow/ssh-chat.git 
```

Quindi entriamo nella directory: 

```bash
cd ssh-chat 
```

Per compilare il progetto serve `go`, se non lo abbiamo, *installiamolo con il nostro package manager*.

Quindi diamo 

```bash
make 
```

### Generiamo le chiavi 

Per avviare il server dobbiamo generare delle chiavi, se non le abbiamo generate: 
```bash
ssh-keygen
```

### Avvio server

A fine compilazione potremmo avviare il server, supponendo il suo funzionamento su porta 2022:

```bash
./ssh-chat --bind ":2022" --identity ~/.ssh/id_rsa
```

### Connettersi lato client

Ora andiamo sui vari client, e colleghiamoci all'ip e a quella porta tramite ssh: 

```bash
ssh -p2022 ind.iri.zzo.ip
```

### Disconnettersi

Digitare `CTRL-D` oppure `/exit` per spegnere.
