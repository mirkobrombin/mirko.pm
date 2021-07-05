---
title: '#howtodev - Le interfacce in Go'
date: 2021-04-28
layout: post
author: Massimiliano Noviello
author_github: DumbMahreeo
tags:
  - Go
---
## Introduzione

Al momento della scrittura di questo articolo Go non ha ancora i tipi generici, tuttavia le interfacce risultano molto comode per questo genere di casi, scopriamo di cosa si tratta.

## Cosa sono le interfacce

Esse non sono altro che dei set di metodi che un tipo deve aver implementato per soddisfare una determinata interfaccia.

Esiste anche un tipo di interfaccia detta "vuota", `interface{}`. 

Ogni tipo la soddisfa, ed è quindi utile quando vogliamo che una funzione parametri generici.



## Pratica

### Definizione

Un interfaccia è un tipo, e quindi può essere definita come tale:

```go
type nome dell'interfaccia interface{
    firme dei metodi
}
```

Quindi se volessimo un interfaccia chiamata "valuta" che richiede un metodo chiamato "valoreInEuro" che ritorna un `float32` potremmo farlo semplicemente con

```go
type valuta interface {
    valoreInEuro() float32
}
```



### Implementazione

E ora se volessi creare due tipi chiamati "dollaro" e "sterlina" partendo dal tipo`float32` che soddisfino quest'interfaccia ci basterà implementare quel metodo:

```go
type dollaro float32

func (v dollaro) valoreInEuro() float32 {
    return float32(v) * 0.83
}



type sterlina float32

func (v sterlina) valoreInEuro() float32 {
    return float32(v) * 1.15
}
```



### Nelle funzioni

#### Parametro interfaccia

È possibile definire una funzione che accetti interfacce come parametri.

Seguendo l'esempio di prima possiamo definirne una che stampi il risultato di `valoreInEuro()`:

```go
func stampaValore(v valuta) {
    fmt.Println(v.valoreInEuro())
}
```



#### Parametro interfaccia vuota

Se volessimo creare una funzione che accetti un tipo qualsiasi possiamo utilizzare il tipo `interface{}`:

```go
func funzioneGenerica(i interface{}) {}
```

Si può anche decidere il comportamento della funzione in base al tipo del parametro usando `parametro.(type)`. Per esempio possiamo usare uno switch in questo modo:

```go
func funzioneGenerica(i interface{}) {
    switch i.(type) {
    case int:
        fmt.Printf("Il numero vale %d\n", i.(int))
    
    case valuta:
        fmt.Println(i.(valuta).valoreInEuro())
    
    default:
        fmt.Println(i)
    }
}
```

*NB: Per accedere al tipo sotto che soddisfa l'interfaccia si può usare* `i.(nomeDelTipo)`



### Confronto

Possiamo controllare uguaglianza e disuguaglianza di due variabili interfaccia usando gli operatori `==` e `!=`.

Esse risulteranno uguali se il valore del loro tipo è il medesimo oppure se entrambe `nil`.

```go
var a interface{} = 10
var b interface{} = 10

fmt.Println(a == b) // stamperà true
```


Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
