---
class: post
title: '#howto - Utilizzo del comando printenv'
date: 2020-05-13
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Il comando `printenv` permette di visualizzare le informazioni contenute nelle variabili d'ambiente oltre che la lista stessa.

Normalmente questo è uno strumento utilizzato in un contesto di sviluppo, dove è ad esempio necessario ottenere informazioni da variabili anzichè dati statici. Volendo fare un esempio, dovessi sviluppare uno script bash che salva un file nella `/home` dell'utente corrente, utilizzerei la variabile `HOME` per raggiungerla: utilizzando `printenv` mi accerto che quella variabile è definita.

## Sintassi

Lo scopo di questo comando è tanto semplice quanto la sua sintassi:

```bash
printenv [opzioni] [variabile]
```

di base, invocando il comando senza argomenti, mostra la lista completa di tutte le variabili di sistema.

## Informazioni per variabile

In questo esempio vogliamo ricevere solo le informazioni correlate alla variabile d'ambiente `HOME`, la quale definisce il percorso al nostro percorso `/home`, quindi:

```bash
printenv HOME
```

ritornerà un output simile al seguente:

```bash
/home/mirko
```

Nel secondo esempio vogliamo ottenere la shell in uso, facendo riferimento alla variabile `SHELL`:

```bash
printenv SHELL
```

nel mio caso usando `zsh`, otterrò il seguente risultato:

```bash
/usr/bin/zsh
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).