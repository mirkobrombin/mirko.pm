---
title: '#howto - Convertire i formati con Pandoc' 
date: 2022-05-27 10:06
layout: post 
author: Floppy
author_github: raspFloppy  
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- archlinux 
- ubuntu
- fedora
---

Potrebbe capitarci di dover convertire un file word in un semplice txt, oppure un file latex in markdown, un tool semplice e facile da usare che fa al caso nostro si chiama **pandoc**.


## Cos'è
**Pandoc** è un tool open source da linea di comando scritto in *Haskell*, che serve a convertire da un linguaggio di markup ad un altro in modo semplice e veloce.
Supporta svariati formati tra cui:
- `latex`
- `markdown`
- `html`
- `docx`
Una lista completa dei linguaggi supportati la trovate [qui](https://github.com/jgm/pandoc).

Inoltre è in grado di convertire i file da un determinato linguaggio di markup ad un formato pdf, epub ecc...

**Pandoc** è anche una libreria open source, perciò potrete implementarlo nel vostro codice per usufruire delle sue funzionalità, trovate la documentazione della libreria [qui](https://hackage.haskell.org/package/pandoc).

## Installazione
Come spiegato nella wiki, pandoc si trova in quasi tutti i repository delle distro principali perciò ci bastera scaricarlo con il nostro package manager preferito:

### Ubuntu e derivate
```bash
apt install pandoc
```

### Fedora
```bash
dnf install pandoc
```

## Archlinux
```bash
pacman -S pandoc
```



## Utilizzo

Per convertire un file da un formato all'altro ci basterà eseguire:
```bash
pandoc -s nomefile.formato -o nomefile.nuovoformato
```

Per esempio, immaginiamo di voler convertire il nostro file markdown `note.md` in un file latex `note.tex` ci bastera eseguire:

```bash
pandoc -s note.md -o note.tex
```

> NOTA BENE:
> NON è possibile convertire un pdf o epub in un linguaggio di markup

### Altre opzioni
esistono poi opzioni molto interessanti, ne elenchiamo alcune:

- **`--write=formato`:** che va a specificare la versione del formato, pensiamo magari di voler convertire un file in `html5` scriveremo `--write=html5`.
- **`--template=nometemplate`:** che va a creare un file partendo da un template creato da noi in formato `yaml`. 
- **`--log=nomefile`:** Scrive i log della conversione in un file `json` 
- **`--toc`:** Per aggiungere una table of contents, utile per `pdf` e `epub`
- **`--number-sections`:** Per numerare sezioni, chapitoli e sottocapitoli quando andremo a convertire un file in `pdf` e `epub`.

