---
title: '#howto - Utilizzo del comando usermod'
date: 2021-01-25
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
`usermod` è un comando che viene utilizzato per cambiare le **informazioni di login** (ma non solo) di un qualsiasi **utente** su Linux.

In questa guida vedremo come sfruttarlo per aggiungere un utente a un gruppo, cambiare la shell e molto altro ancora.

## Utilizzo di usermod

La sintassi base di `usermod` è piuttosto semplice:

```bash
usermod OPZIONI UTENTE
```

Solamente utenti con accesso a *sudo*, oppure *root*, possono utilizzare il comando, che se eseguito correttamente **non mostrerà output**.

### Aggiungere un utente a un gruppo

`usermod`, la maggior parte delle volte, viene usato per aggiungere un **utente ad un gruppo secondario**. Per farlo, dovremo sfruttare le opzioni `-a` e `-G` seguite dal nome del gruppo e dell'utente, come di seguito:

```bash
usermod -a -G GRUPPO UTENTE
```

Se si vuole aggiungere l'utente a più gruppi nello stesso momento, bisognerà specificare i gruppi dopo l'opzione `-G` separati da una virgola e senza spazio.

> Bisogna **utilizzare sempre** l'opzione `-a` poiché, senza, l'utente sarà rimosso dai gruppi non elencati nel comando.

### Cambiare il gruppo primario di un utente

Per **cambiare il gruppo primario** di un utente si dovrà utilizzare `usermod` seguito dall'opzione `-g` (in minuscolo, è diversa da quella precedente):

```bash
usermod -g GRUPPO UTENTE
```

### Cambiare le informazioni di un utente

Per **cambiare le informazioni di un utente**, ossia una specie di commento che può essere fornito ad un profilo, bisogna utilizzare `usermod` seguito dall'opzione `-c` e dal nuovo commento e username:

```bash
usermod -c "Commento" UTENTE
```

Questa informazione sarà salvata nel file */etc/passwd*.

### Cambiare la Home di un utente

Come sa benissimo chi usa Linux, le cartelle *home* di un utente vengono create sotto la cartella `/home` e con il nome dell'account. Se, per qualche ragione, **si vuole cambiare la cartella *home*** di un utente, lo si può fare invocando `usermod` con l'opzione `-d`, il tutto seguito dal percorso assoluto della nuova cartella e dal nome dell'utente:

```bash
usermod -d CARTELLA_HOME UTENTE
```

In questo modo la cartella sarà cambiata, ma i contenuti della vecchia *home* non saranno spostati. Per fare in modo che i **contenuti vengano spostati col comando**, bisogna inserire l'opzione `-m` prima dell'utente:

```bash
usermod -d CARTELLA_HOME -m UTENTE
```

### Cambiare la shell default di un utente

La **shell** di default è quella che viene eseguita dopo il login nel sistema. Solitamente è *Bash*, ma è possibile cambiarla con `usermod` e l'opzione `-s`, seguiti dal percorso assoluto della shell e del nome utente:

```bash
usermod -s SHELL UTENTE
```

Ad esempio, se vogliamo cambiare la shell in *zsh*, è possibile eseguire il comando in questo modo:

```bash
usermod -s /usr/bin/zsh UTENTE
```

### Cambiare lo user UID

Lo **UID** è un numero univoco assegnato ad ogni utente che serve al sistema operativo per riconoscere su quale account bisogna eseguire qualche operazione, ma non solo. Per cambiarlo, è possibile usare `usermod` seguito da `-u` e dal nuovo UID dell'utente, specificato alla fine.

```bash
usermod -u UID UTENTE
```

> Cambiare lo UID dell'utente può portare a diversi problemi se non si pone attenzione alle possibili conseguenze.

### Cambiare uno username

Con `usermod` si può anche **cambiare lo username** di un utente. Per fare ciò è possibile usare l'opzione `-l` in questo modo:

```bash
usermod -l NUOVO_UTENTE UTENTE
```

Quando si cambia lo username, è preferibile cambiare anche la posizione della *home* con il nuovo nome.

### Bloccare e sbloccare un utente

L'opzione `-L` (in maiuscolo) di `usermod` consente all'amministratore di sistema di **bloccare l'accesso ad un utente**:

```bash
usermod -L UTENTE
```

La spiegazione del blocco all'accesso è la seguente: il comando aggiungerà un `!` (punto esclamativo) davanti alla password criptata nel file */etc/shadow*. Quando è presente quel segno, l'utente non potrà eseguire l'accesso tramite password, con accesso tramite chiavi SSH ancora possibile, però.

Per questo motivo, è possibile utilizzare un'altra opzione, `-e`, che serve a impostare la "data di scadenza" dell'account. Con il parametro pari a 1, tutti gli altri metodi di login saranno disabilitati.

```bash
usermod -L -e 1 UTENTE
```

Per sbloccare un utente, invece, si usa l'opzione -U:

```bash
usermod -U UTENTE
```

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.