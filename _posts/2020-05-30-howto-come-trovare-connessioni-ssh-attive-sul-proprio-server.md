---
title: '#howto - Come identificare connessioni SSH attive sul proprio server'
date: 2020-05-30
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash  
  - ssh
---
In questa guida vedremo **come identificare le connessioni SSH attive su una macchina**, questo grazie all'ausilio di cinque comandi, `who`, `w`, `ps`, `netstat`e `last`.

## Trovare connessioni SSH attive con who

`who` è un comando utilizzabile da linea di comando che permette di visualizzare una lista di utenti attualmente collegati alla propria macchina.

Aprendo il terminale ed eseguendo il comando:

```bash
who
```

l'output che si otterrà dovrebbe essere simile al seguente:

```bash
nomeutente    pts/0     2020-05-28 14:04 (INDIRIZZO_IP)
```

Come è possibile comprendere, il comando `who` ci darà la possibilità di sapere con quale nome utente, da quale IP e in che momento una persona è collegata al server. In caso di ulteriori connessioni attive, il numero nel parametro *pts* aumenterà.

## Trovare connessioni SSH attive con w

`w`, proprio come `who`, è un comando per il terminale che mostra le informazioni sugli utenti attualmente connessi alla macchina, ma con molti più dettagli ed in un formato più leggibile.

Eseguendo il comando corretto:

```bash
w
```

L'output che si otterrà sarà simile a questo:

```bash
14:09:03 up 11 days, 10:08,  1 user,  load average: 0.24, 0.22, 0.23USER        TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHATnomeutente  pts/0    INDIRIZZO_IP     14:09    1.00s  0.07s  0.03s w
```

La parte superiore dell'output mostra l'orario attuale, l'uptime del server, il numero di utenti collegati e il carico medio sulla CPU e la RAM del sistema. Oltre al nome utente, al TTY e all'indirizzo IP, `w` permette anche di conoscere l'orario in cui è stato effettuato il login, il tempo per cui è stato in idle l'utente e il comando che ha eseguito.

## Trovare connessioni SSH attive con ps

`ps` è un altro utile comando, la cui sintassi potrebbe però risultare molto più avanzata rispetto agli altri sopracitati. Quest'ultimo, infatti, permette di avere informazioni sui processi attivi, ma non è quello che desideriamo sapere ora.

Eseguendo il comando nel terminale:

```bash
ps
```

l'output che si otterrà dovrebbe essere simile al seguente:

```bash
PID  TTY      TIME     CMD5561 pts/0    00:00:00 bash5661 pts/0    00:00:00 ps
```

La prima colonna indica il PID della connessione attiva, la seconda il numero del terminale virtuale in cui si è connessi, la terza il tempo in cui è stato eseguito l'ultimo comando da noi specificato, che è invece indicato nella quarta.

Con `ps`, tuttavia, è possibile anche utilizzare combinazioni di altri comandi (come ad esempio `grep`) e particolari parametri. La più comune, e quella che mostra le informazioni necessarie, è la seguente:

```bash
ps auxwww | grep sshd: | grep -v grep

```

Prima di vedere l'output, analizziamo questo comando: `ps` è seguito da *auxwww*, che non è nient'altro che un'indicazione al programma del numero delle colonne da visualizzare, utile in caso in cui avessimo molti dati da visualizzare, che a sua volta è seguito da una combinazione di `grep` che ha come compito quello di mostrarci informazioni solamente sull'SSH.

L'output del comando qui sopra dovrebbe essere simile al seguente:

```bash
root      5556  0.0  0.2 152656  5372 ?        Ss   14:09   0:00 sshd: nomeutente [priv]nomeutente   5560  0.0  0.1 152656  2424 ?        S    14:09   0:00 sshd: nomeutente@pts/0
```

In questo caso, `ps` mostrerà l'utente connesso (*root* è sempre presente), il momento in cui è stato effettuato l'accesso e la TTY su cui si trova ogni utente.

## Trovare connessioni SSH attive con netstat

`netstat` è un altro comando avanzato che, se ben utilizzato, può fornirci chiare informazioni sulle connessioni di rete effettuate, in attesa o rifiutate dal server. Eseguendo il comando senza alcun parametro, però, in questo caso, non ci potrà tornare utile, visto che verranno mostrati solamente dei tentativi di connessione ad altre macchine.

Per sfruttare al meglio `netstat`, per l'SSH, invece, è possibile utilizzare una particolare combinazione di comandi con `grep`. Come è possibile vedere nel comando qui sotto, andiamo a dire a `netstat `di utilizzare alcuni determinati parametri e mostrare solamente le connessioni stabilite (da ESTABILISHED) a *sshd*:

```bash
netstat -tnpa | grep 'ESTABLISHED.*sshd'

```

e l'output dovrebbe essere simile al seguente:

```bash
tcp        0      0 IP_Server:3743       IP_PC:11536    ESTABLISHED 5556/sshd: nomeutente
```

La prima colonna indica il protocollo di rete con cui è stata effettuata la connessione (tcp in questo caso), la quarta l'IP del server a cui siamo connessi, la quinta l'IP della nostra macchina. La sesta, invece, ci dice che la connessione è stata stabilita correttamente senza alcun problema.

## Trovare connessioni SSH attive con last

Il quinto ed ultimo comando di questa guida, invece, è `last`. Quest'ultimo ci permette di mostrare la lista di tutti gli utenti che, sin dalla creazione del file presente in */var/log/wtmp*, hanno eseguito l'accesso e si sono scollegati. Con `grep`, invece possiamo venire a conoscenza di chi è connesso in questo esatto momento:

```bash
last -a | grep -i still

```

ed in questo caso l'output sarà simile al seguente:

```
nomeutente    pts/0        Thu May 28 14:09   still logged in    IP_PC
```

La prima colonna indica il nome utente di chi è connesso, la seconda il numero del TTY a cui è collegato, la terza la data e ora in cui è stato effettuato l'accesso. La quarta ci fa sapere che questo utente è ancora collegato (come è possibile intuire da *still logged in*), mentre la quinta è l'IP del nostro dispositivo.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).