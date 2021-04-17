---
title: '#howto - Utilizzo di SSH per connettersi a GitHub'
published: 2020-08-28
layout: post
author: Andrea Guzzon
author_github: beard33
tags:
  - github  - bash  - ssh  - ssh  - bash
---
Solitamente quando si utilizza GitHub come hosting Git remoto per i progetti (sviluppati da noi o a cui contribuiamo) si è soliti eseguire le principali operazioni di `clone, push` o `pull` **autenticandosi attraverso username e password**. È tuttavia possibile semplificare al massimo l'utilizzo e l'identificazione su GitHub **utilizzando il protocollo SSH** e una **coppia di chiavi**.

> *Disclaimer:* In questa guida darò per scontato che `ssh` sia installato sui vostri dispositivi (qualora non lo fosse vi rimando alla nostra [guida sull'installazione](https://linuxhub.it/articles/howto-come-usare-ssh-su-linux,-parte-1) 
), **che non abbiate ancora una coppia di chiavi generata** e che abbiate dimestichezza con l'utilizzo di **git** (se così non fosse, anche in questo caso, vi rimando alla [nostra guida](https://linuxhub.it/articles/howto-git-comprenderlo,-usarlo-e-amarlo)
).

## Generare una coppia di chiavi

Per generare una **coppia di chiavi**, pubblica e privata, attraverso l'algoritmo `RSA` sarà sufficiente dare da terminale il seguente comando:

```bash
ssh-keygen -t rsa -b 4096 -C "email@esempio.com"
```

dove:

- `-t` ci permette di selezionare l'algoritmo da utilizzare, in questo caso `RSA`

- `-b` ci permette di selezionare la dimensione della chiave, in questo caso `4096` bit (per una questione di sicurezza è fortemente consigliato l'utilizzo, con RSA, di chaivi di **almeno 2096 bit**)

- `-C` serve a specificare un commento per il keyfile (che viene aggiunto in coda alla chiave pubblica, non influente per l'algoritmo in sé); in questo caso il consiglio è di associare l'email associata all'account GitHub, per facilitare il riconoscimento della chiave

L'output del comando sarà simile al seguente:

```bash
Generating public/private rsa key pair.
Enter file in which to save the key ($HOME/.ssh/id_rsa):
```

A questo punto premiamo INVIO se decidiamo di usare la dirctory di default per le chiavi (quella specifiata dall'output, `$HOME/.ssh/id_rsa`) o specifichiamone un'altra in caso contrario.

Segue il prompt di richiesta di una password da utilizzare insieme alla nostra chiave:

```bash
Enter passphrase (empty for no passphrase):
```

Anche qui, per una questione di sicurezza, è consigliabile **scegliere una password** e non lasciare vuoto il campo.

Una volta inserita la nostra password e confermata, la coppia di chiavi è stata generata. Se infatti controlliamo all'interno della directory specificata troviamo due file, `id_rsa` e `id_rsa.pub` che identificano rispettivamente la nostra chiave privata e la rispettiva chiave pubblica.

## Aggiungere la chiave pubblica su GitHub

Per poterci autenticare attraverso l'uso di SSH su GitHub è necessario aggiungere la chiave pubblica appena generata al nostro account GitHub.

Per farlo dobbiamo recarci su GitHub e dal menù in alto a destra selezionare la voce **Impostazioni**:

![github impostazioni](storage/github1.png)

E selezionare nella colonna di sinistra la voce **SSH and GPG keys** e da qui selezionare **nuova chiave SSH**:

![github chiave ssh](storage/ssh2.png)

Ci troveremo davanti ad una schermata come la seguente, con spazio per un **titolo** e per la **chiave pubblica**:

![github titolo e chiave pubblica](storage/ssh4.png)

Il titolo è un campo utile a ricordare la chiave che stiamo usando (e.g. potrebbe essere utile assegnare il nome del PC da qui ci stiamo connettendo). Per inserire la chiave pubblica invece è necessario copiarla.

Potete aprirla con un qualunque edior di testo o da terminale dare il seguente comando:

```bash
cat /percorso/chiave/id_rsa.pub
```
copiandone l 'output ed incollandolo nello spazio apposito.

Riempiti i due campi possiamo confermare l'aggiunta della chiave con il pulsante apposito.

### Verifica della connessione SSH

Possiamo verificare l'effettiva riuscita dell'associazione via SSH con il nostro account GitHub dando da terminale il seguente comando:

```bash
ssh -T git@github.com
```

Una volta inserita la password per l'utilizzo della chiave, se tutto è andato a buon fine dovremmo avere un output simile a questo:

```bash
Hi username_github! You've successfully authenticated, but GitHub does not provide shell access.

```

## Utilizzo di GitHub via SSH

Se tutto è andato per il verso giusto è possibile iniziare ad utilizzare GitHub attravrso SSH.

### Clonare un repository

Per clonare un repository attraverso l'utilizzo di SSH è sufficiente, in fase di `clone` dello stesso, selezionare attraverso il pulsante dedicato il link apposito e dare il solito comando di `clone`. La forma usuale sarà:

```bash
git clone git@github.com:utente/progetto_esempio.git
```

### Push su un repository

Per eseguire il push su un nostro repository è innanzitutto necessario assicurarsi di avere il `remote` nella forma corretta per l'utilizzo di SSH. Tramite il comando:

```bash
git remote -v
```

controlliamo che esso sia nella forma di cui sopra. Qualora non lo fosse (magari perchè il repository è stato clonato prima della creazione delle chiavi) è possibile andare a modificarlo attraverso il comando:

```bash
git remote set-url origin git@github.com:nomeutente/progetto.git
```

Fatto ciò possiamo andare ad eseguire un `git push` senza necessità di autenticarci ogni volta, ma soltanto utilizzando le chiavi SSH.

## Aggiungere la chiave al SSH-Agent

Al fine di evitare di dover inserire la password ogni volta che utilizziamo SSH è possibile aggiungere la nostra chiave al `ssh-agent`.

Per farlo assicuriamoci di aver attivo l'agent attraverso il comando:

```bash
eval "$(ssh-agent -s)"
```

Fatto ciò possiamo aggiungere la chiave attraverso il comando:

```bash
ssh-add percorso/chiave/id_rsa
```

ed inserire la password quando richiesto. Questo ci permetterà di poter utilizzare SSH senza dover inserire ogni volta la password relativa alla chiave.

Per maggiori informazioni, dubbi, chiarimenti sulla generazione delle chiavi, o approfondimenti legati ai vari algoritmi possibili (Ed25519, ECDSA etc) non esitate a contattarci sul nostro [gruppo Telegram](https://t.me/linuxpeople).
