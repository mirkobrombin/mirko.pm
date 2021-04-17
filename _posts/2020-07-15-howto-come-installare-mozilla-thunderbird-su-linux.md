---
title: '#howto - Installazione di Mozilla Thunderbird su Linux'
published: 2020-07-15
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash  - privacy  - bash  - privacy
---
**Thunderbird** è un client di posta realizzato da **Mozilla**, la stessa azienda che sviluppa Firefox. Alcuni dei suoi punti forza sono la velocità, il rispetto per la privacy e la presenza tecnologie recenti.

In questa guida vedremo come installare Mozilla Thunderbird sulle principali distribuzioni Linux.

## Installazione

Normalmente la versione presente nelle repository di sistema non è la versione più recente e consiglio di leggere la sezione **Altre distribuzioni** sempre in questa guida per installare l'ultima.

### Ubuntu e derivate
Thunderbird è presente nelle repository di sistema per quanto riguarda Ubuntu e derivate.
Per procedere con le repository di sistema usiamo `apt`:

```bash
apt install thunderbird
```

### Fedora e derivate
Come per Ubuntu, troviamo il pacchetto nelle repository base e possiamo installarlo via `dnf`, il gestore pacchetti di sistema:

```bash
dnf install thunderbird
```

### Arch Linux
Qui troviamo il pacchetto nelle reposiroy *extra*, procediamo via `pacman`:

```bash
pacman -S thunderbird
```

In *AUR* troviamo altre versioni di Thunderbird:
* thunderbird-esr-bin (la versione con supporto a lungo termine)
* thunderbird-beta-bin (la versione beta ufficiale)
* thunderbird-nightly (la versione nightly con aggiornamento costante ma instabile)

possiamo installare i pacchetti sopra citati via *yay* come spiegato <a href="https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper#title2">qui</a>.

### Flatpak
Thunderbird è disponibile anche come pacchetto Flatpak, installabile dalla repository *FlatHub* (leggi <a href="https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub">qui</a>). In alcune distribuzioni, Flatpak è presente di sistema e (spesso) disponibile tramite GNOME Software (come per Ubuntu) o AppCenter per quanto riguarda PopOS ed elementary OS.

Possiamo procedere all'installazione direttamente dalla <a href="https://flathub.org/apps/details/org.mozilla.Thunderbird">pagina ufficiale</a>.

### Altre distribuzioni

Prima di poter installare Thunderbird sul nostro PC dovremo verificare di avere alcune **librerie** necessarie per il funzionamento corretto, e che soprattutto siano aggiornate alla versione consigliata.

Le librerie in questione (con le versioni consigliate) sono:

- GTK+ 3.4 o superiore
- GLib 2.22 o superiore
- Pango 1.22 o superiore
- X.Org 1.0 o superiore (1.7 o superiore è consigliato)
- libstdc++ 4.7 o superiore

Una volta dopo che abbiamo verificato che queste librerie siano installate, possiamo procedere con il download di Thunderbird.

Arrivati a questo punto, è necessario visitare [questa pagina]([https://www.thunderbird.net/en-US/thunderbird/all/#I) e scaricare la versione a 64-bit (o 32-bit, in base all'archittettura della propria CPU) in italiano di Thunderbird.

Successivamente apriamo un terminale e dirigiamoci nella cartella in cui abbiamo scaricato il file *.tar.bz2*:

```bash
cd cartella-download
```

ed estraiamo i contenuti dell'archivio con `tar`:

```bash
tar xjf thunderbird-*.tar.bz2
```

entriamo nella cartella appena creata:

```bash
cd thunderbird
```

impostiamo i permessi di esecuzione al file `thunderbird`:

```bash
chmod +x thunderbird
```

ed eseguiamolo:

```bash
./thunderbird
```

Nel caso in cui tutto fosse andato per il verso giusto, potete creare un collegamento sul desktop oppure salvare dove volete l'eseguibile per un avvio rapido.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).