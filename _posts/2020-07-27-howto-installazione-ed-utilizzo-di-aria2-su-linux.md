---
title: '#howto - Installazione ed utilizzo di Aria2 su Linux'
date: 2020-07-27
layout: post
author: Andrea Guzzon
author_github: beard33
tags:
  - github  - bash
---
**Aria2** è un download manager leggero, open source (qui il <a href="https://github.com/aria2/aria2">sorgente</a>),  ed estremamente completo disponibile per tutti i sistemi operativi desktop. Il suo punto di forza principale è il supporto a **molteplici** **protocolli** (HTTP/HTTPS, FTP, ma anche BitTorrent e link Magnet), con un'altissima possibilità di personalizzazione.

In questa guida vedremo come installarlo, senza dimenticare qualche esempio che ne dimostra la versatilità.

## Installazione

Aria2 è disponibile per tutte le principali distribuzioni nei repository di sistema.

### Ubuntu e derivate

Aria2 è presente nei repository di **Ubuntu e Debian**, pertanto basterá installarlo utilizzando `apt`:

```bash
apt install aria2
```

### Fedora e derivate

Similmente ad Ubuntu, anche su **Fedora, CentOS** e derivate Aria2 è presente nei repository ufficiali, pertanto sarà installabile semplicemente utilizzando `dnf`:

```bash
dnf install aria2
```

### Arch Linux

Come per le precedenti, anche nel caso di **Arch** Aria2 è disponibile nei repository di sistema e potremo installarla utilizzando `pacman`:

```bash
pacman -S aria2
```

### OpenSUSE

Per installare infine Aria2 su OpenSUSE ci basterà utilizzare `zypper`:

```bash
zypper install aria2
```

## Utilizzo

Vediamo ora alcune delle (quasi) infinite possibilità che offre `Aria2`.

>Nella presentazione dei comandi verranno utilizzati dei placeholder generici per indicare componenti che variano a seconda del caso d'uso (e.g. la directory di download, il link al file da scaricare etc.) che verranno specificati di volta in volta.

### Download HTTP(s):

Supponiamo di voler scaricare il file `.iso` della nostra distribuzione preferita. Per fare ciò ci basterà dare il comando:

```bash
aria2c http://esempio.it/topDistro.iso
```
dove il link è da sostituire con il link al file `ISO` di riferimento.

#### Specificare la directory del download

Qualora si voglia specificare **la directory in cui scaricare il file**, sarà sufficiente aggiungere il flag `-d` seguito dal percorso alla directory di interesse; ad esempio, per scaricare il file nella directory di Downloads (voi specificate la directory che preferite) utilizzeremo `aria2` in questo modo:

```bash
aria2c -d $HOME/Downloads/ http://esempio.it/topDistro.iso
```

#### Verificare l'integrità del file

Un'altra delle possibilità che ci offre Aria2 è quella di **scaricare un file e verificarne l'hash direttamente in un comando**. Ci basterà infatti aggiungere il flag `--checksum` seguito dal tipo di checksum che vogliamo calcolare (supportati sono i principali algoritmi di hash, `sha-1, sha-224,sha-256, sha-384, sha-512, md5, adler32`) e dal flag `-V`.

Supponiamo ad esempio di voler verificare la nostra ISO con un hash sha-1 fornito dal sito. Per fare ciò ci basterà usare `aria2` così:

```bash
aria2c http://esempio.it/topDistro.iso --checksum=sha-1=hashfornito -V
```
dove *sha-1* si può rimpiazzare con il tipo di checksum da calcolare e *hashfornito* con l'hash fornito in rete.

Se tutto dovesse filare liscio, dovremmo ottenere un output simile a questo, a **conferma dell'integrità** del file:

```bash
07/16 12:34:15 NOTICE Verification finished successfully. file=/percorso/del/file/topDistro.iso

07/16 12:34:15 NOTICE Download complete: file=/percorso/del/file/topDistro.iso
```

Mentre una **verifica fallita** ci verrà notificata tramite un messagio simile al seguente:

```bash
07/16 12:38:51 ERROR Checksum error detected. file=/percorso/del/file/topDistro.iso

07/16 12:38:51 NOTICE Download GID#92f2466539800757 not complete: file=/percorso/del/file/topDistro.iso
```

#### Utilzzare più sorgenti per il download

Qualora si vogliano specificare più sorgenti di download per un file, in modo, ad esempio, da essere al sicuro da eventuali errori su una sorgente, sarà sufficiente elencarli in seguito al comando come in questo modo:

```bash
aria2c http://esempio_sorgente1.it/topDistro.iso http://esempio_sorgente2.it/topDistro.iso
```

### Download Torrent

Una delle caratteristiche più interessanti messe a disposizione da Aria2 è la possibilità di scaricare un file **Torrent** attraverso il suo protocollo.

Ad esempio, per scaricare la ISO della nostra distribuzione preferita utilizzando questo protocollo ci basterà usare il seguente comando:

```bash
aria2c http://esempio.it/topDistro.torrent
```
dove l'URI punterà alla sorgente del file torrent che vogliamo scaricare.

#### Rimozione del file al termine del download

Qualora si voglia fare in modo che il file `.torrent` non venga scritto su disco, ma solo tenuto in memoria durante il download è possibile specificarlo attraverso il flag `--follow-torrent=mem` (di default è `true`, ovvero con il file torrent che viene scaricato e parsato per il download. È possibile anche settarlo a `false` per scaricare il file `.torrent` **senza scaricare il file associato**).

```bash
aria2c --follow-torrent=mem http://esempio/topDistro.torrent
```

#### Non eseguire il seed una volta scaricato il file

Se si vuole bloccare il seeding (ovvero la condivisione con altri `seed`) del file una volta scaricato è possibile aggiungere il flag `--seed-ratio` andando a settarlo a `0`:

```bash
aria2c --seed-ratio=0 http://esempio/topDistro.torrent
```

#### Link Magnet

Aria2 consente anche di scaricare file Torrent a partire dai rispettivi link magnet, semplicemente passandoli come parametri al comando. È importante tuttavia **inserire tra virgolette il link, a causa dei caratteri speciali non sempre riconosciuti**.

Ecco un esempio (il link magnet varierà in base a cosa scaricherete):

```bash
aria2c "magnet:?xt=urn:btih:be55d9e3ab8e1eb8560061f7e679de6d&d"
```

### File di configurazione e alias

È possibile, al fine di evitare di dover specificare ogni volta i flag che usiamo comunemente, la creazione di un file di configurazione contenente le opzioni di cui abbiamo bisogno. Dopo l'installazione non viene creato (ed è facoltativo), ma se lo si volesse realizzare il percorso di default è `$HOME/.aria2/aria2.conf` dove `aria2.conf` è il file stesso.

Ad esempio potremmo voler specificare opzioni come la directory di download, il livello dei log e l'azione da eseguire quando il download è completo:

```
dir=${HOME}/Downloads
on-download-complete=exit
log-level=warn
```

In queste semplici righe stiamo dicendo ad Aria2 di **scaricare i file nella directory Downloads, di tenere un livello di log = warn e di uscire al completamento del comando**.

A questa possibilità si aggiunge la versatilità di Linux, che permette la creazione di **alias** nel nostro file `bashrc` (se non l'avete letta trovate la guida specifica <a href="https://linuxhub.it/articles/howto-creare-alias-su-bash">qui</a>) al fine di richiamare specifici comandi legati ad aria2 in relazione al tipo di download. Seguono un paio di esempi:

- Scaricare torrent senza conservare il file nè condividerlo, salvando il download in `$HOME/Downloads`:

```bash
alias torrent = "aria2 --seed-ratio=0 --follow-torrent=mem -d $HOME/Downloads/"
```

- Scaricare file da HTTP(s) uscendo al termine e nella stessa directory di cui sopra:

```bash
alias download = "aria2c --on-download-complete=exit -d $HOME/Downloads/"
```

## Conclusioni

Questa era una breve guida all'installazione di **aria2** ed una breve disamina dei comandi più basici che offre. [Qui](https://aria2.github.io/manual/en/html/aria2c.html) trovate il manuale ufficiale con l'elenco completo dei comandi mentre per ogni dubbio o chiarimento, ci trovate al solito [gruppo Telegram](https://t.me/linuxpeople).