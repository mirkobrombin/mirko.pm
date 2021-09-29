---
title: "#howto - usare l'editor di testo Nano"
date: 2020-11-30
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - github 
  - bash
---
**Nano** è un software di editing di testo incluso nella maggior parte delle nostre distribuzioni Linux. È leggero, funzionale e anche piuttosto facile da usare (per questo è preferito a **Vim** da alcuni), ma non tutti sanno a pieno come sfruttarne le qualità.

In questa guida vedremo quindi come personalizzarlo, usarlo ed apprezzarlo al massimo. 

## Configurazione tramite .nanorc

il file di configurazione di `nano` si trova nella **home** del nostro utente (se non lo si trova, lo si può creare manualmente) sotto il nome di `.nanorc`. Apriamolo con `nano`:
```bash 
nano ~/.nanorc
```

e scriviamo al suo interno:

```bash
set autoindent
set softwrap
set linenumbers

include /usr/share/nano/*nanorc
```
Salviamo e usciamo da `nano`.

Esaminiamo però le opzioni, per capire meglio a che cosa servono:

- `autoindent`: serve a mantenere indentata la riga successiva, ovviamente l'indentazione deriva dalla precedente
- `softwrap`: manda a capo le righe lunghe ma solo visivamente, il file ovviamente resta invariato
- `linenumbers`: mostra i numeri delle righe
- `include /usr/share/nano/*nanorc`: abilita la sintassi colorata per alcuni file in base all'estensione.

Quali altri opzioni possiamo indicare? Tutte le opzioni sono presenti nella pagina di manuale di **Nano**, che potete aprire con:

```bash
man nano
```

## Sintassi colorata

Con l'opzione *include* abilitate la sintassi colorata, ma è attiva solamente per determinati file estensione. Potete trovare sul [repository di scopatz](https://github.com/scopatz/nanorc) un'estensione dei linguaggi supportati. Per installarla seguite le seguenti istruzioni:

```bash
# Facciamo un backup dei vecchi file estensione 
cd /usr/share/nano
mkdir backup
mv *.nanorc backup

# Cloniamo la repository 
cd 
git clone https://github.com/scopatz/nanorc

# Copiamo i file
mv nanorc/*.nanorc /usr/share/nano/
```

Potremo ora utilizzare `Nano` per modificare al meglio i nostri file in **Kotlin**, ad esempio, ma anche tanti altri linguaggi.

## Utilizzare nano come un pro

Cosa si può fare con `Nano`? Più di quello che pensate, poco ma sicuro. 

Vediamo di seguito una serie di shortcut (scorciatoie da tastiera):

| Scorciatoia |                                                  Descrizione |
| ----------- | -----------------------------------------------------------: |
| `CTRL+o`    |                                                Salva il file |
| `CTRL+x`    |                                 Esce, eventualmente salvando |
| `CTRL+r`    |                       Indicate un file di testo da importare |
| `CTRL+j`    | Cerca di aggiustare gli spazi e i fine linea per giustificare un paragrafo |
| `ESC+j`     |                             Come sopra, ma con l'intero file |
| `CTRL+6`    |                       Inizia a selezionare/non seleziona più |
| `ESC+6`     | Copia una riga o la selezione (se si è in modalità selezione) |
| `CTRL+k`    |                              Taglia una riga o la selezione. |
| `CTRL+u`    |             Incollate ciò che avete tagliato o copiato prima |
| `CTRL+t`    |        Eseguite uno script, in Nano verrà ricopiato l'output |
| `CTRL+_`    |                          Va ad un determinato numero di riga |
| `ESC+]`     |                            Salta alla parentesi che combacia |
| `CTRL+a`    |                                                  Inizio riga |
| `CTRL+e`    |                                                    Fine riga |
| `ESC+d`     |                              Conta parole, righe e caratteri |
| `CTRL+g`    |                                    Apre la guida dei comandi |
| `CTRL+w`    |                       Cerca. Eventualmente sostituisce anche se richiesto |



Alcune note:

- In modalità selezione, se incollate, non sovrascrivete il contenuto come negli editor normali
- Se copiate o tagliate del contenuto, non viene messo nella clipboard di sistema, ma viene gestito internamente da `Nano`. Resta la possibilità di utilizzare `CTRL+SHIFT+C` e `CTRL+SHIFT+V` per copiare (selezione del mouse) e incollare (dove è posizionato il cursore) interagendo con la clipboard di sistema. 

### Approfondimenti ricerca

Approfondiamo il comando di ricerca (`CTRL+W`). Una volta premuto avete diverse opzioni da poter selezionare:

| Scorciatoia (dentro cerca) |                                           Descrizione |
| -------------------------- | ----------------------------------------------------: |
| `ESC+c`                    | Attiva e disattiva la distinzione maiuscole/minuscole |
| `ESC+b`                    |                           Attiva ricerca all'indietro |
| `ESC+r`                    |               Attiva ricerca con espressioni regolari |
| `freccia su`               |             Ricopia ricerca precedente (nella storia) |
| `freccia giu`              |             Ricopia ricerca successiva (nella storia) |
| `CTRL+p`                   |                 		  Ricopia la ricerca più vecchie |
| `CTRL+n`                   | 							Ricopia la ricerca più nuova |
| `CTRL+r` 					 | 								 Attiva menu sostituisci |

Altre note:
- per ripetere la ricerca precedente, potete premere `CTRL+W` ed `INVIO` senza scrivere nulla
- Da una ricerca ad un altra vengono ereditate anche le varie opzioni (minuscole/maiuscole, regex, etc..)

#### Cerca e sostituisci

Nota sul **menù sostituisci**: il menù sostituisci si può raggiungere immediatamente senza passare dal *cerca* con la scorciatoia `CTRL+\`, e una volta attivata vi permette di sostituire:

- con `s` un'occorrenza alla volta
- con `t` tutte le occorrenze 
- con `n` saltate un occorrenza
- `Ctrl+C` annullate

### La macro
Le ultime due scorciatoie che vorrei esporvi (non mostrate prima in tabella) sono:

- `esc+:` - inizia e termina la registrazione di una macro
- `esc+;` - ripete la macro

La macro è una cosa molto utile, registra una serie di azioni che volete eseguire e la ripete. Per capirne la potenza, usiamola ad esempio per scambiare due righe:

```bash
esc+:
Ctrl+k
tasto giù
Ctrl+u
esc+:
```

Poi per ripetere:

```bash
ESC+;
```

Molto comodo, vero? 

### Leggere l'help 

Ovviamente molte altre cose non son state citate in questa guida, come i comandi per abilitare il softwrap manualmente, i numeri di linea o salvare il file senza conferma e via discorrendo. Molto altro, praticamente tutto, lo trovate nell'help visualizzabile sempre con `Ctrl+G`. Come si legge? Invece dei tasti da premere, infatti, troviamo caratteri come `^` o `M-`. Ebbene, sappiate che `CTRL` corrisponderà a `^`, e `ESC` a `M-`.

Potete notare che alcune scorciatoie hanno ulteriori combinazioni tra parentesi, potrete usare una o l'altra combinazione, senza alcuna differenza.

