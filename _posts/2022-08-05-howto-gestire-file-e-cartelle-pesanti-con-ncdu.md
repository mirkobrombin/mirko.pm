---
title: '#howto - Gestire file e cartelle pesanti con ncdu'
date: 2022-08-05 09:00
layout: post 
author: Midblyte
author_github: Midblyte
published: true
tags: 
- ubuntu
- fedora
- archlinux
---

Prima o poi, capita a chiunque di dover fronteggiare problemi di spazio.

Tuttavia, non è sempre facile comprendere quali file convenga eliminare senza controllare, una ad una, cartella dopo cartella.

Per scoprire precisamente quali siano i file e cartelle che impattano maggiormente sulla memoria interna, risulta molto comodo l'utilizzo di [ncdu](https://dev.yorhel.nl/ncdu).


## Che cos'è ncdu

Ncdu, contrazione di "NCurses Disk Usage", è un software che fornisce una panoramica dei file più pesanti presenti sul disco.

Si tratta di una versione interattiva, più semplice e immediata del meglio noto `du`.

È possibile interagire con `ncdu` solamente da terminale mediante l'interfaccia grafica basata su ncurses: è una TUI ("*Text User Interface*"), una soluzione a metà tra la semplicità di una GUI e la convenienza di una CLI.

![](https://upload.wikimedia.org/wikipedia/commons/d/d7/Ncdu_screenshot.png)


## Installazione

### Ubuntu

```bash
apt install ncdu
```

### Fedora

```bash
dnf install ncdu
```

### Arch Linux

```bash
pacman -S ncdu
```

### Altri metodi di installazione

Una lista più esaustiva dei port di ncdu disponibili su altre distribuzioni è presente sul [sito ufficiale](https://dev.yorhel.nl/ncdu#packages-and-ports)


## Avvio

Per utilizzare il software, è necessario lanciare da terminale l'omonimo comando:
```bash
ncdu
```

### Flag principali
`ncdu` può essere lanciato specificando apposite le apposite *flag*.

Di seguente sono elencate le principali (per maggiori dettagli, ricorrere alla pagina di manuale con `man ncdu` oppure visitando sul Web il [manuale ufficiale](https://dev.yorhel.nl/ncdu/man)).

| Flag               | Descrizione                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------|
| -h, --help         | Visualizza il messaggio d'aiuto.                                                                                |
| -q                 | "*Quiet mode*", ricarica ogni 2 secondi aggiornando l'interfaccia (senza che sia necessario farlo manualmente). |
| -v, -V, --version  | Visualizza la versione.                                                                                         |
| -e                 | Attiva la visualizzazione di più informazioni (come la data di ultima modifica di ciascun file).                |
| -r                 | Modalità *read only* (non è possibile eliminare i file).                                                        |
| --si               | Utilizza i prefissi del [sistema decimale](https://it.wikipedia.org/wiki/Prefissi_del_Sistema_internazionale_di_unit%C3%A0_di_misura) anziché i prefissi del [sistema binario](https://it.wikipedia.org/wiki/Prefissi_per_multipli_binari) |
| --color <*SCHEME*> | Cambia lo schema dei colori utilizzato (parametri consentiti: "*off*", attivo di default, e "*dark*")           |

È anche possibile specificare la cartella da visualizzare all'avvio passandola come parametro (esempio: `ncdu ~/Downloads`)


## Utiizzo

Una volta avviato `ncdu`, è possibile navigare tra le directory, visualizzare informazioni su file e cartelle, ma anche eliminare file.

| Tasto               | Descrizione                                                                                        |
|---------------------|----------------------------------------------------------------------------------------------------|
| ?                   | Visualizza il riquadro d'aiuto, contentente l'elenco esaustivo dei tasti.                          |
| Freccia ↑, k        | Passa al file precedente.                                                                          |
| Freccia ↓, j        | Passa al file successivo.                                                                          |
| Freccia ←, <, h     | Ritorna alla cartella superiore (*parent dir*).                                                    |
| Freccia →, invio, l | Discendi nella cartella selezionata.                                                               |
| b                   | Avvia una shell a parte nella cartella corrente (una volta chiusa ritorna automaticamente a ncdu). |
| c                   | Mostra i file contenuti all'interno delle singole cartelle.                                        |
| **d**               | Elimina il file selezionato (richiede conferma).                                                   |
| g                   | Mostra in che percentuale il peso del file si trova rispetto al totale (testo, barra, entrambi).   |
| i                   | Visualizza maggiori informazioni sul file selezionato.                                             |
| m                   | Visualizza la data di ultima modifica accanto a ciascun file (richiede la flag *-e*).              |
| r                   | Ri-analizza la cartella attuale (non necessario se avviato con la flag *-q*).                      |
| q                   | Chiudi l'interfaccia e ritorna al terminale.                                                       |


## Ncdu2

Nel 2021, dopo quattordici anni dallo sviluppo della versione iniziale, il creatore nonché *mantainer* di `ncdu` ha avviato lo sviluppo di una sua nuova versione, `ncdu2`.

Va premesso che **sia ncdu che ncdu2 sono entrambi progetti attivi e in sviluppo**. La tradizionale versione di `ncdu`, si legge sulla [home page](https://dev.yorhel.nl/ncdu), "*è lievemente indietro rispetto alla versione 2.x in termini di funzionalità e prestazioni, ma è ancora in fase di sviluppo ed è perfettamente utilizzabile.*"

Secondo le [intenzioni originarie](https://dev.yorhel.nl/doc/ncdu2) dell'autore, la nuova versione sarebbe dovuta essere completamente compatibile con la precedente a livello di flag, comandi, interfaccia grafica e funzionalità.

Tuttavia, siccome la nuova versione è stata riscritta completamente da zero, vi sono alcune differenze. Di seguito un elenco breve e non esaustivo:

|                  | ncdu          | ncdu2                                                                      |
|------------------|---------------|----------------------------------------------------------------------------|
| Inizio sviluppo  | 2007          | 2021                                                                       |
| Tipo di versione | LTS           | Stable                                                                     |
| Linguaggio       | C             | [Zig](https://ziglang.org) (*instabile*)                                   |
| Risorse usate    | -             | Meno della metà della RAM, se confrontato a `ncdu` in condizioni ordinarie |
| Hard link        | Supporto base | Supporto avanzato, con un'interfaccia specifica e maggiormente dettagliata |
| Unicode          | Supporto base | Supportati i "full-width characters", non supportati i "combining marks"   |

I sorgenti di `ncdu2` sono disponibili per il download sulla [pagina apposita](https://dev.yorhel.nl/ncdu/changes2).
