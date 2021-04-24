---
title: "#howto - Utilizzo del comando 'ls'"
description: "ls è uno dei principali comandi che un amministratore di sistema (ma non solo) utilizza nella vita di tutti i giorni per poter sfru.."
published: 2020-01-04
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash
---
**ls** è uno dei principali comandi che un amministratore di sistema (ma non solo) utilizza nella vita di tutti i giorni per poter sfruttare come si deve il terminale di qualsiasi distro Linux. 

Il nome del comando in sè è un'abbreviazione di Listing Files, che è esattamente quello che fa. ls, infatti, serve a **mostrare i contenuti di una cartella** (sottocartelle o file che siano) senza troppi fronzoli.

## Utilizzo del comando
Ipotizziamo che ci troviamo nel terminale di un PC non nostro e desideriamo visualizzare i contenuti della cartella home di qualsiasi utente. Per farlo, bisognerà semplicemente scrivere *ls*

```bash
~$ ls

Desktop    Downloads      Immagini  Video
Documenti  fileprova.txt  Musica
```

### Visualizzazione dettagliata
Per visualizzare i file (o le cartelle) con diversi dettagli come la dimensione, i permessi, o ultima modifica, possiamo utilizzare il parametro *-l* (è una L minuscola, non un 1)
```bash
~$ ls -l

total 30
-rw-r--r--. 1 utente gruppo 21262 Aug 12 12:42 fileprova.txt
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Desktop
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Documents
drwxr-xr-x. 4 utente gruppo  4096 Aug 16 02:55 Downloads
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Immagini
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Musica
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Video
```

### Ordine inverso
Possiamo mostrare in ordine inverso i file presenti in una cartella mediante il parametro *-r*:
```bash
~$ ls -r

Musica  Downloads  Desktop
```

### Contenuti delle sottocartelle
Per la natura case-sensitive della shell utilizzando il maiuscolo per il parametro precedente, il risultato cambia mostrando il contenuto di tutte le sottocartelle nella directory:
```bash
~$ ls -R
Musica
Example.mp3

Downloads
pony.jpg linux.img

Desktop
strangethings.txt
```

### Ordine in base all'estensione
Nel caso volessimo mostrare i file di una directory in ordine alfabetico basandosi sull'estensione, possiamo utilizzare il parametro *-X*:
```bash
~$ ls -x
```

### Ordine in base all'ultima modifica
Un'altra funzionalità utile è quella che permette la visualizzazione dei file ordinati in base all'ultima modifica, questo sfruttando il parametro *-t*:
```bash
~$ ls -t
```

### File nascosti
Per vedere tutti i file nascosti inclusi in una cartella (quelli che iniziano con un . davanti al nome), dovremo usare il parametro *-a*
```bash
~$ ls -a

.htaccess  Documenti  fileprova.txt  Video
.bashrc    Desktop    Immagini
.config    Downloads  Musica
```

### Dimensione in formato leggibile
Nel caso volessimo mostrare la dimensione dei file in un formato leggibile senza problemi dall'occhio umano, si utilizzerà il parametro *-lh*
```bash
~$ ls -lh

total 30
-rw-r--r--. 1 utente gruppo  21K  Aug 12 12:42 fileprova.txt
drwxr-xr-x. 2 utente gruppo  4.0K Jul 31 02:48 Desktop
drwxr-xr-x. 2 utente gruppo  4.0K Jul 31 02:48 Documents
drwxr-xr-x. 4 utente gruppo  4.0K Aug 16 02:55 Downloads
drwxr-xr-x. 2 utente gruppo  4.0K Jul 31 02:48 Immagini
drwxr-xr-x. 2 utente gruppo  4.0K Jul 31 02:48 Musica
drwxr-xr-x. 2 utente gruppo  4.0K Jul 31 02:48 Video
```

### Visualizzazione in base alle dimensione
Per visualizzare i file in base alla loro dimensione, si può utilizzare il parametro *-lS*
```bash
~$ ls -lS

total 30
-rw-r--r--. 1 utente gruppo 21262 Aug 12 12:42 fileprova.txt
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Desktop
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Documents
drwxr-xr-x. 4 utente gruppo  4096 Aug 16 02:55 Downloads
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Immagini
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Musica
drwxr-xr-x. 2 utente gruppo  4096 Jul 31 02:48 Video
```

Ultimo, ma non meno importante, è il caso in cui volessimo mostrare i contenuti di una cartella senza entrarci. In questo caso, si utilizza il parametro -l seguito dalla cartella di destinazione
```bash
~$ ls -l /tmp

total 408
drwx------. 2 utente gruppo 4096 Aug  2 02:00 filecasuale
-r--------. 1 root  root  384683 Aug  4 12:28 htop-1.0.1.tar.gz
drwx------. 2 root  root    4096 Aug  4 11:20 keyring-32BWdI
drwx------. 2 root  root    4096 Aug 16 01:33 keyring-pioZJr
drwx------. 2 gdm   gdm     4096 Aug 21 11:26 orbit-gdm
drwx------. 2 root  root    4096 Aug 19 08:41 pulse-gl6o4ZdxQVrX
drwx------. 2 utente gruppo 4096 Aug  4 08:16 pulse-UDH76ExwUVoU
drwx------. 2 gdm   gdm     4096 Aug 21 11:26 pulse-wJtcweUCtvhn
```

In caso di dubbi o particolari domande, potete entrare nel gruppo Telegram ufficiale di linux/hub, disponibile a <a href="https://t.me/gentedilinux">questo indirizzo</a>.