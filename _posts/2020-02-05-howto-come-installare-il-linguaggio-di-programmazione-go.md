---
title: '#howto - Installazione del linguaggio Go'
description: "In questa guida vedremo come installare tutto il necessario per utilizzare Go in ambiente Linux."
published: 2020-02-05
layout: post
author: Andrea Guzzon
author_github: beard33
tags:
  - github
---
In questa guida vedremo come installare tutto il necessario per utilizzare Go in ambiente Linux.  
## Cos'è Go? 
Go è un linguaggio di programmazione open source nato recentemente (2009) e sviluppato da Google.  
Si tratta di un linguaggio compilato, con una sintassi vicina a C ed estremamente efficiente quando si tratta di programmazione concorrente; grazie a queste caratteristiche sta prendendo sempre più piede all'interno del mondo IT: oltre ai software noti scritti in Go, come ad esempio **Docker** o **HuGo**, esistono sempre più librerie per i diversi fini, tra cui [cobra](https://github.com/spf13/cobra) per sviluppare applicativi CLI, o [tinyGo](https://tinygo.org) per utilizzare Go su microcontrollori. ## Installazione di Go Per installare Go abbiamo due possibiltà: affidarci ai repository della nostra distribuzione o installarlo manualmente.  
### Installazione da repository 
È il metodo più rapido e comodo, in quanto Go è presente in praticamente tutte le principali distribuzioni, ma ha lo svantaggio di non fornire sempre l'ultima versione disponibile.  

* **Ubuntu e derivate** 
sulle distribuzioni *buntu e derivate possiamo installare Go sia attraverso il pacchetto `Snap` digitando:

```bash
sudo snap install go --classic
``` 

sia attraverso `apt` digitando:

```
sudo apt install golang-go
``` 

* **Fedora e derivate** 
Su Fedora e derivate possiamo installare Go attraverso l'utilizzo di `dnf`:

```bash
sudo dnf install go
``` 

* **Arch e derivate** 
Anche qui possiamo sfruttare i repository ufficiali per l'installazione di Go 

```bash
sudo pacman -S go
```

### Installazione manuale 
Per installare manualmente Go dovremo recarci ala [pagina di download](https://golang.org/dl/) e scaricare il file tar relativo a Linux.  
Scaricato il file dovremo quindi verificarne l'integrità, confrontando l'hash del file scaricato con quello fornito sul sito. Rechiamoci quindi nella cartella dove abbiamo scaricato l'archivio e digitiamo 
```bash
sha256sum go1.xx.x.linux-arch.tar.gz
```
(dove xx e arch dipenderanno dalla versione che avrete scaricato). 

Se l'hash è corretto estraiamo l'archivio all'interno di `/usr/local` con il comando
```bash
sudo tar -C /usr/local -xzf go1.xx.x.linux-arch.tar.gz
``` 

Dobbiamo ora aggiungere il percorso in cui si trova l'eseguibile alla variabile d'ambiente `$PATH` andando a modificare il file `~/.profile` con la seguente riga 

```bash 
export PATH=$PATH:/usr/local/go/bin
``` 
seguita da

```bash
source ~/.profile
```
per rendere subito disponibili le modifiche effettuate. ## Verifica dell'installazione Possiamo verificare l'installazione dando il comando

```bash
go version 
#OUTPUT 
go version go1.13.6 linux/amd64
```
e provando a scrivere il nostro primo programma. 

In un editor, dopo aver creato la cartella **hello_world** scriviamo un semplice file **helloworld.go** come segue:

```go
go 
package main 
import "fmt" 
func main() { 
  fmt.Println("Hello World") 
}
```

Digitando ora all'interno della cartella appena creata con il rispettivo file il seguente codice: 
```bash
go run helloworld.go
```
dovremmo avere un output di questo tipo:
```bash
Hello World
``` 

## Conclusione 
Questa era una semplice guida riguardante l'installazione di Go sulle principali distribuzioni Linux, con annessa scrittura ed esecuzione di un primo programma.  

Per qualsiasi dubbio non esitate a contattarci sul [gruppo telegram](https://linuxhub.it/t.me/linuxpeople).