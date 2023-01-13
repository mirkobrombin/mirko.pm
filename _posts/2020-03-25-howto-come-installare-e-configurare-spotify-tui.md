---
class: post
title: '#howto - Installazione e configurazione di Spotify TUI'
description: "Spotify TUI è un vero e proprio client CLI per Spotify scritto in Rust."
date: 2020-03-25
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - bash
---
**Spotify TUI** è un vero e proprio client CLI per Spotify scritto in Rust.

Per installare Spotify TUI dovremo prima avere sul nostro sistema Rust e Cargo, la cui installazione viene spiegata [in questa guida dedicata](https://linuxhub.it/articles/howto-come-installare-rust-e-cargo-con-rustup).

## Installazione

Spotify TUI è presente nelle repository ufficiali di package manager di alcune distribuzioni, come sull'AUR di Arch Linux e su Void Linux.

Per quanto riguarda l'installazione su **Arch Linux** procediamo tramite *yay* (potete far riferimento a <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper#title2">questa</a> guida per l'installazione):

```bash
yay -S spotify-tui
```

Mentre su Void Linux usiamo *xbps*:
```bash
sudo xbps-install -Su spotify-tui
```

Possiamo installarlo tramite *snap* su tutte le distribuzioni che lo supportano:

```bash
snap install spt
```

Su distribuzioni come Ubuntu, Debian, Fedora e molte altre, Spotify TUI non è presente nelle repository dei principali package manager, perciò dovremo ricorrere a *Cargo*, il software che ci permette di installare sul nostro sistema un grosso numero di applicazioni scritte in Rust.

Procediamo quindi all'installazione tramite *cargo*:

```bash
cargo install spotify-tui
```

la compilazione dei file da sorgente inizierà immediatamente. Per aggiornare il pacchetto ci basterà usare l'opzione *--force* la quale forzerà l'installazione dell'ultima release:

```bash
cargo install spotify-tui --force

```

### Connessione alle API di Spotify

Per il corretto funzionamento del software è richiesta la connessione alle **API di Spotify** per ottenere i nomi delle tracce, riprodurle, delle playlist e molto altro.

**Nota**: per la riproduzione di un brano specifico è necessario possedere un account con **Spotify Premium**.

Procediamo per ordine nel seguente modo:

1. Dirigiamoci sulla [dashboard di Spotify](https://developer.spotify.com/dashboard/) e eseguiamo l'accesso se necessario
2. Premiamo "Create a Client ID" e creiamo un'applicazione
3. Clicchiamo "Edit Settings"
4. Aggiungiamo "http://localhost:8888/callback" alle URI di redirect
5. Salviamo e torniamo al terminale
6. Apriamo Spotify TUI con *spt*
7. Inseriamo il nostro Client ID e il Client Secret
8. Diamo i permessi all'applicazione tramite la pagina web che si aprirà
9. Se il redirect a localhost avverrà correttamente, possiamo utilizzare Spotify TUI

## Utilizzo

Come già accennato in precedenza, per eseguire Spotify TUI dovremo semplicemente eseguire il comando *spt* dalla nostra shell. In caso di necessità, premendo il tasto "?" si aprirà un menù d'aiuto con tutte le informazioni che mostrano i comandi e le loro rispettive azioni.

## Configurazione

Per configurare a piacere Spotify TUI, che sia per cambiare il colore del testo e del tema in generale o gli abbinamenti dei comandi, dovremo aprire e modificare il seguente file con il nostro editor di testo preferito (nell'esempio userò nano):

```bash
nano ${HOME}/.config/spotify-tui/config.yml

# Snap
nano ${HOME}/snap/spt/current/.config/spotify-tui/config.yml
```

Il file di configurazione dovrebbe essere simile a questo:

```yml
# Sample config file

# The theme colours can be an rgb string of the form "255, 255, 255" or a string that references the colours from your terminal theme: Reset, Black, Red, Green, Yellow, Blue, Magenta, Cyan, Gray, DarkGray, LightRed, LightGreen, LightYellow, LightBlue, LightMagenta, LightCyan, White.
theme:
  active: Cyan
  banner: LightCyan
  error_border: Red
  error_text: LightRed
  hint: Yellow
  hovered: Magenta
  inactive: Gray
  playbar_background: Black
  playbar_progress: LightCyan
  playbar_text: White
  selected: LightCyan
  text: "255, 255, 255"

behavior:
  seek_milliseconds: 5000
  volume_increment: 10
  # The lower the number the higher the "frames per second". You can decrease this number so that the audio visualisation is smoother but this can be expensive!
  tick_rate_milliseconds: 250

keybindings:
  # Key stroke can be used if it only uses two keys:
  # ctrl-q works,
  # ctrl-alt-q doesn't.
  back: "ctrl-q"

  jump_to_album: "a"

  # Shift modifiers use a capital letter (also applies with other modifier keys
  # like ctrl-A)
  jump_to_artist_album: "A"

  manage_devices: "d"
  decrease_volume: "-"
  increase_volume: "+"
  toggle_playback: " "
  seek_backwards: "<"
  seek_forwards: ">"
  next_track: "n"
  previous_track: "p"
  copy_song_url: "c"
  copy_album_url: "C"
  help: "?"
  shuffle: "s"
  repeat: "r"
  search: "/"
  audio_analysis: "v"
```

Per avere maggiori dettagli sulle funzionalità offerte da Spotify TUI, potete visitare la [repository GitHub ufficiale](https://github.com/Rigellute/spotify-tui).

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).