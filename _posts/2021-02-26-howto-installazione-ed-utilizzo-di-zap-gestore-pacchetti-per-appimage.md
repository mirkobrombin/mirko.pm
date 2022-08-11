---
title: '#howto - Installazione ed utilizzo di zap, gestore pacchetti per AppImage'
date: 2021-02-26
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - bash
---
Abbiamo già parlato di AppImage in un [precedente articolo](https://linuxhub.it/articles/howto-utilizzo-ed-installazione-di-appimage): si tratta di un formato portabile per la distribuzione software. 

Questi pacchetti completi ed eseguibili, simili a Flatpak e Snap, possono sfruttare strumenti e dipendenze del sistema o inglobarle nel pacchetto stesso, facendo quindi della portabilità il suo punto forza.

Quello di cui andremo a parlare oggi è *zap*, un gestore pacchetti AppImage. Grazie a questo è infatti possibile trattare le AppImage come qualsiasi altro pacchetto di sistema (ad es. *deb* e *rpm*). Grazie a questo software potremo quindi installarle, ottenere informazioni, disinstallarle ecc. ma anche *integrarle nel sistema*.

## Installazione di Zap
*zap* viene fornito come [AppImage](https://github.com/srevinsaju/zap/releases), oltre che uno script di installazione semplificato, facilmente eseguibile tramite `curl`:

```bash
sh -c "$(curl -fsSL https://git.io/zapinit)"
```

Una volta eseguito, possiamo testarne l'effettiva installazione digitando:

```bash
zap --version
```

il quale restituirà la versione installata.

## Utilizzo
Questo gestore pacchetti condivide quasi tutte le opzioni di `apt` e programmi simili. Seguendo una sorta di standard comune fra gestori di pacchetti.

### Installare pacchetti
Possiamo installare un pacchetto tramite l'opzione `install`:

```bash
zap install nome_pacchetto
```

Potete trovare facilmente i nomi di pacchetto da questo <a href="https://g.srevinsaju.me/get-appimage/p/1">portale</a>.

Ad esempio, per *Code OSS*, ossia la versione OSS di Visual Studio Code, digitiamo:

```bash
zap install code_oss
```

In alternativa possiamo installare una AppImage tramite la sua repository GitHub, ad esempio per Bottles:

```bash
zap install-gh  https://github.com/bottlesdevs/Bottles 
```

### Rimuovere pacchetti
Il processo di rimozione dei pacchetti è simile all'installazione, con la differenza che in questo caso useremo l'opzione `remove` in questo modo:

```bash
zap remove code_oss
```

### Integrazione pacchetti
Questo strumento non ci permette solo di installare i pacchetti, ma anche di integrarli col sistema ed eseguirli. Per fare ciò basterà sfruttare l'opzione `integrate`:

```bash
zap integrate code_oss
```

e possiamo verificarne l'integrazione con l'opzione `is-integrated`.

### Avvio pacchetti
Indifferentemente dalla sua integrazione col sistema, possiamo avviare qualsiasi AppImage installata con *zap*, direttamente da quest'ultimo:

```bash
zap x code_oss
```

Possiamo visualizzare la lista completa delle opzioni sfruttando l'opzione `help`:

```bash
zap --help
```


