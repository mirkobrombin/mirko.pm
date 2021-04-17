---
title: '#howto - Come cambiare la shell di default su Linux'
published: 2020-07-06
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
Molte volte su Linux la shell impostata di default per ogni utente è *bash*: nonostante sia piuttosto basica rispetto alle sue concorrenti va molto bene per un uso quotidiano su PC personali, ma anche server.

Gli utenti più avanzati, però, vorranno scegliere sicuramente una delle sue alternative, tra cui *zsh* e *fish*. In questa guida vedremo **come cambiare la shell di default** utilizzando semplicemente il terminale usando un comando, `chsh`.

## Trovare la shell in uso

Per prima cosa è necessario sapere quali shell sono installate sul nostro sistema e, soprattutto, quale stiamo utilizzando in questo momento. Per rispondere al primo quesito possiamo utilizzare il comando `cat` per catturare i contenuti del file `/etc/shells`:

```bash
cat /etc/shells
```

l'output dovrebbe essere simile al seguente:

```bash
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
/bin/zsh
/usr/bin/zsh
/usr/bin/fish
```

Per sapere il nome della shell in uso posiamo utilizzare tre comandi diversi: `ps`, `printf` o `grep`. Con il primo:

```bash
ps -p $$
```

l'output dovrebbe dirci il PID del processo, la TTY, il tempo di esecuzione e, infine la shell:

```bash
  PID TTY          TIME CMD
    8 tty1     00:00:00 bash
```

Con `printf`, invece, ci sarà mostrata semplicemente il percorso della shell assieme ad un nostro messaggio personalizzato:

```bash
printf "La mia shell - %s\n" "$SHELL"

```

e l'output dovrebbe essere:

```
La mia shell - /bin/bash
```

`grep`, infine, se utilizzato con il file `/etc/passwd` ci fornirà delle impostazioni più complesse da comprendere, e proprio come `printf` ci dirà il percorso della nostra shell assieme a quello della nostra home:

```
grep "^${USER}" /etc/passwd
```

con output:

```bash
utente:x:1000:1000:,,,:/home/utente:/bin/bash
```

## Cambiare shell di default

Dopo aver compreso quale shell stiamo utilizzando, è arrivato il momento di sfruttare `chsh`. Scegliamo per prima cosa la shell che vogliamo impostare (è necessario segnarsi il percorso dell'output del primo comando della guida), ad esempio *zsh*.

Per fare ciò possiamo eseguire `chsh` seguito dal parametro *-s* e infine il percorso della shell preferita:

```bash
chsh -s /bin/zsh
```

Se volessimo invece impostare *fish* possiamo farlo allo stesso identico modo:

```bash
chsh -s /usr/bin/fish
```

Verifichiamo se l'operazione è andata a buon fine riutilizzando `grep`:

```bash
grep "^${USER}" /etc/passwd
```

dove questa volta l'output sarà:

```bash
utente:x:1000:1000:,,,:/home/utente:/bin/zsh
```

oppure:

```bash
utente:x:1000:1000:,,,:/home/utente:/usr/bin/fish
```

sempre ovviamente in base a quello che si sceglie. Per rendere permanenti le modifiche dovremo **chiudere il terminale e riaprirlo**.



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).