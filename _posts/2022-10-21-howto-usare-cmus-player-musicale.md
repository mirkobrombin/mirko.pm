---
title: '#howto - usare CMUS, player musicale'
date: 2022-10-21 09:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: false
tags:
- ubuntu
- fedora
- archlinux
---

Su terminale è ormai diventato possibile fare di tutto: non solo [modificare file di testo](2022-08-19-howto-installare-e-usare-neovim) con Neovim, oppure [cifrare messaggi](2022-09-09-cifrare-messaggi) via GPG e openSSL, o ancora [convertire file di markup](2022-05-27-howto-convertire-i-formati-con-pandoc) con Pandoc, ma anche ascoltare musica grazie a **CMUS**.


## Che cos'è CMUS

CMUS sta per C* Music Player ed è un player musicale, ossia un software che consente la riproduzione di file audio.

È basato su ncurses, proprio come [ncdu](howto-gestire-file-e-cartelle-pesanti-con-ncdu), vale a dire che è possibile interfacciarvisi da terminale pur avendo la stessa familiarità di una GUI.

CMUS ha molte funzionalità, tra cui le seguenti: tiene traccia del numero di volte che un certo file audio è stato riprodotto, consente la creazione delle playlist, offre due interfacce (oltre alla TUI, conveniente per l'uso generale da terminale, anche una CLI, ottima per lo scripting).


## Installazione

### Ubuntu

Su distribuzioni Debian, Ubuntu e derivate:

```bash
apt install cmus
```

### Fedora

Per Fedora:

```bash
dnf install cmus
```

### Arch Linux

Su distribuzioni Arch Linux e derivate:

```bash
pacman -S cmus
```

### Altre opzioni di download

Per ulteriori informazioni è possibile visitare il sito ufficiale [cmus.github.com](https://cmus.github.io/#download) o la repository github [github.com/cmus/cmus](https://github.com/cmus/cmus).


## Sette menu

Una volta avviato il programma con `cmus`, è possibile spostarsi tra le 7 diverse visualizzazioni mediante i sette tasti numerici che vanno da 1 a 7

| Tasto | Visualizzazione     | Descrizione                                                                                         |
|-------|---------------------|-----------------------------------------------------------------------------------------------------|
| 1     | Library view        | Elenco delle tracce audio riordinate autore per autore, album per album.                            |
| 2     | Sorted library view | Elenco delle tracce audio, analogo alla "Library view", ma racchiuso in una lista unica.            |
| 3     | Playlist view       | Elenco delle tracce audio in base alla playlist.                                                    |
| 4     | Playlist Queue view | Elenco delle tracce audio in lista per essere riprodotte dopo quella correntemente in riproduzione. |
| 5     | Browser             | Elenco di file e cartelle che possono essere riprodotte o caricate nel database interno.            |
| 6     | Filters view        | Elenco dei filtri definiti dall'utente.                                                             |
| 7     | Settings view       | Elenco delle opzioni, delle combinazioni di tasti e i comandi associati, e simili.                  |


## Principali scorciatoie da tastiera

| Tasto | Descrizione                                                                                              |
|-------|----------------------------------------------------------------------------------------------------------|
| Invio | Avvia la traccia selezionata.                                                                            |
| c     | Metti in pausa o riprendi la riproduzione della traccia corrente.                                        |
| z     | Vai alla traccia precedente.                                                                             |
| b     | Vai alla traccia successiva.                                                                             |
| a     | Aggiungi la traccia selezionata alla libreria (menu accessibili con i tasti 1 e 2).                      |
| y     | Aggiungi la traccia selezionata alla playlist attiva (menu accessibile con il tasto 3).                  |
| e     | Aggiungi la traccia selezionata alla fine delle tracce audio in coda (menu accessibile con il tasto 4).  |
| E     | Aggiungi la traccia selezionata all'inizio delle tracce audio in coda (menu accessibile con il tasto 4). |
| i     | Evidenzia la posizione, nel menu, della traccia attualmente in riproduzione.                             |
| q     | Esci dal player e ferma la riproduzione della traccia corrente.                                          |

Nota: dalla visualizzazione "Browser" (menu 5) è possibile anche intervenire su intere cartelle (si applica ai tasti a, y, e, E).


## Comandi interni, "alla Vim"

Dall'interfaccia TUI, avviabile via comando `cmus`, si possono inserire gli stessi comandi disponibili in `cmus-remote --raw`.

Per avviare la mini-shell (che offre una riga che funge sia come input che come output in tempi alternati) è sufficiente inserire i due punti ":".

Per l'elenco di tutti i comandi, è possibile consultare il manuale con `man cmus`.

Grazie al supporto del tasto **Tab**, è possibile iterare sui vari comandi disponibili in tutta comodità.


## Plugins e scripting

È possibile [estendere](https://github.com/cmus/cmus/wiki) le funzionalità di CMUS in vari aspetti: si possono aggiungere delle personalizzazioni (temi, combinazioni di tasti), frontend grafici per il controllo del player, supporto a siti remoti (come YouTube, Last.fm, e simili).

Alcuni di questi plugin sono basati su cmus-remote, il comando del pacchetto che offre una comoda interfaccia CLI del player.

Non tutti i plugin possono essere utilizzati nella versione precompilata di CMUS: altre volte, è necessario ricompilare il software <i>ex novo</i> aggiungendo alcuni sorgenti specifici. È questo il caso delle [patch di terze parti](https://github.com/cmus/cmus/wiki/external-patches).
