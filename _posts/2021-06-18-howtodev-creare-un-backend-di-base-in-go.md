---

title: '#howtodev - Creare un backend di base in Go'
published: 2021-06-18
layout: post
author: Massimiliano Noviello
author_github: linuxhubit
tags:

- Go

---



## Introduzione
Essendo Go stato concepito per sviluppare microservizi, include un network stack abbastanza completo direttamente nella standard library.

Lo scopo di questa breve guida è introdurre il lettore al modulo `net/http` così che possa poi condurre i propri studi in autonomia.


## Guida passo passo
Andiamo a capire come mettere in piedi questo backend passo dopo passo.

### Moduli in uso
Sarà necessario importare `net/http` e `fmt` (quest'ultimo non sarà necessario ma faciliterà le cose). Possiamo farlo con

```go
import (
    "net/http"
    "fmt"
)
```

### Creare degli handler
Ora è il momento di creare delle funzioni dette handler il cui scopo è elaborare le richieste sui vari percorsi (Es: `/`, `/percorso`)

Ogni funzione handler richiede due parametri, un `http.ResponseWriter` e un `*http.Request`.

A questo punto, ci basta definire la funzione con

```go
func mioHandler(res http.ResponseWriter, req *http.Request) {   
}
```

essendo `res` un `http.ResponseWriter`, esso soddisfa l'interfaccia `io.Writer`, permettendoci di scrivervi dati da inviare come risposta al client.

Possiamo farlo in vari modi, ma per comodità useremo `fmt.Fprint`.

`fmt.Fprint` è analoga a `fmt.Print` ma scrive lo standard output su un `io.Writer`.

| Funzione       | Analoga       |
| --------------:|:------------- |
| `fmt.Fprint`   | `fmt.Print`   |
| `fmt.Fprintln` | `fmt.Println` |
| `fmt.Fprintf`  | `fmt.Printf`  |

Quindi aggiorniamo la funzione `mioHandler` di conseguenza:

```go
func mioHandler(res http.ResponseWriter, req *http.Request) {
    fmt.Fprint(res, "<h1>Ciao Mondo<h1>")   
}
```

### Colleghiamo l'handler a un percorso
A questo punto nella funzione main ci basta utilizzare `http.HandleFunc` per collegare l'handler appena creato al percorso che desideriamo:

```go
func main() {
    http.HandleFunc("/", mioHandler)
}
```

In questo caso abbiamo collegato la funzione `mioHandler` al percorso `/`.

### Mettiamo il server in ascolto
Ora ci basta indicare al server su quale porta ascoltare. In questo caso userò la `8080`:

```go
func main() {
    http.HandlerFunc("/", mioHandler)

    http.ListenAndServe(":8080", nil)
}
```

Ora il server sarà in ascolto, contattando `127.0.0.1` (l'indirizzo locale) ci verrà restituito il codice HTML che abbiamo messo nella funzione `fmt.Fprint`.

## Riproviamoci
Questa volta mettendo insieme tutto quello che abbiamo creato, ne creeremo un altro con due handler:

```go
package main

import (
    "net/http"
    "fmt"
)


func mioHandler(res http.ResponseWriter, req *http.Request) {
    fmt.Fprint(res, "<h1>Ciao Mondo!<h1>")
}

func altroHandler(res http.ResponseWriter, req *http.Request) {
    fmt.Fprint(res, `
<h1>Titolo</h1>
<p>Altra pagina</p>
`)
}

func main() {
    http.HandleFunc("/", mioHandler)

    http.HandleFunc("/altrapagina", altroHandler)

    http.ListenAndServe(":8080", nil)
}
```



## Conclusione
Non era poi così complicato, ma se hai avuto problemi non esitare a contattarci sul nostro [gruppo Telegram](https://t.me/linuxpeople).
