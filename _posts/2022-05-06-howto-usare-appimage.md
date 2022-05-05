---
title: '#howto - Usare appimage'
date: 2022-05-06 
layout: post
author: Floppy
author_github: raspFloppy
published: false
tags:
- appimage
---

Immaginate di poter installare e disinstallare un'applicazione rimuovendo un semplice file e poterlo utilizzare su qualsiasi distribuzione indipendetemente dal package manager, ecco questi sono gli **Appimage**.

## Cosa sono
Le appimage sono un formato di packaging di applicazioni che incapsulano un'applicazione e le sue librerie in un unico file `.AppImage`.

## Come funzionano
Un AppImage è essenzialmente le appimage contengono un'immagine che in eseguzione verrà montata con all'interno un filesystem (contenente l'applicazione e le dipendenze) nel quale viene eseguito il programma.

Gli appimage non hanno un repository perciò dovremmo trovare noi le applicazioni che usano questo formato, [qui](https://appimage.github.io/apps/) una piccola lista di software che usano questo sistema. 

Generalmente comunque nel sito dell'app, nella sezione download dovrebbe esserci l'opzione per questo formato se esso lo usa.

Una volta installato il file, apriamo il terminale ed eseguiamo:
```bash
chmod +x nomefile.AppImage

```
In questo modo avremo reso il file eseguibile e scrivendo:
```bash
./nomefile.AppImage
```
Eseguiremo la nostra applicazione.

> CONSIGLIO:
> Create una cartella ~/Applications per inseire tutte le vostre appimage


## Vantaggi e Svantaggi
Il vantaggio principale delle Appimage e che ci permette di avere la stessa applicazione con le stesse dipendeze su distribuzioni differenti senza incorrere in conflitti di alcun genere in quanto il filesystem del nostro sistema non viene intaccato, inoltre possiamo usufruire dell'estrema portabiilità,e la facilità nell'installare/disinstallare l'applicazione infatti basterà aggiungere e rimuovere il file ed il gioco è fatto.

Abbiamo però alcuni svantaggi, uno di questo è il  non poter aggiornare automaticamente  l'Appimage a meno che chi distribuisce il software non inserisca nel immagine un modulo per cercare, verificare ed installare una nuova versione del programma, inoltre al momento dell'installazione non viene creata nessuna entry nel nostro menù delle app obbligandovi a crearerle manualmente e infine come detto precedentemente non esiste un vero e proprio repository, perciò sarete voi a dovervi cercare se una determinata applicazione supporta il packaging con appimage. 

## Tool utiili
VI sono sono alcuni tool molto utili che vanno a sopperire ad alcuni svantaggi elencati prima:
- **[Appimagelauncher](https://github.com/TheAssassin/AppImageLauncher)** un piccolo programmino che crea in automatico le entry delle nostre appimage.
- **[Appimage Pool](https://github.com/prateekmedia/appimagepool)** Uno store non ufficiale per installare appimage installabile tramite flatpak `flatpak install flathub io.github.prateekmedia.appimagepool`
