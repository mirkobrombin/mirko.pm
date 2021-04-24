---
title: 'Rilasciato GNOME 3.36.1, risolve diversi bug'
description: "GNOME 3.36.1 è la prima point release del ramo 3.36. Rilasciata da poco, porta con se tre settima.."
published: 2020-04-03
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - gnome
---
Con questo articolo innauguriamo un mese di prova in cui linux/hub torna a pubblicare notizie sul mondo Linux e Open source (la pubblicazione delle guide rimane costante e programmata come al solito).

GNOME 3.36.1 è la prima point release del ramo 3.36. Rilasciata da poco, porta con se tre settimane di bugfix a vari componenti ma anche diverse patch dedicate all'esperienza utente.

> GNOME 3.36.1 is now available. This release is dedicated to community members who have been impacted by COVID-19. Our thoughts are with you during this difficult time.
>  
> GNOME 3.36.1 is a stable release containing three weeks of bugfixes since the 3.36.0 release. All distributions shipping GNOME 3.36 should upgrade.
>   
> _Michael Catanzaro, GNOME Release Team

Michael Catanzaro del GNOME Release Team invita ad aggiornare tutte le distribuioni che forniscono GNOME 3.36 nelle proprie repository.

## Modifiche evidenti
Tra le modifiche visibili ad occhio nudo, troviamo miglioramenti alle **cartelle** nel menù applicazioni della Overview e alle **notifiche**. 

![GNOME 3 36 1 cartelle](storage/GNOME-3-36-1-cartelle.png)

Le applicazioni poste nelle cartelle vengono ora mostrare su un numero di colonne variabile da 3 a 4, questo valore viene definito in base alla risoluzione dello schermo in uso e non è più forzato a 3 come nella release precedente.

Anche il design delle cartelle è stato impattato dall'aggiornamento, è infatti stato ridotto il padding ed il margine, riducendo lo spazio impegnato e facendo così spazio alla quarta colonna. Sono inoltre nascoste le barre di scorrimento, le quali evidentemente toglievano spazio prezioso alla nuova colonna.

Per quanto riguarda la gestione delle scorciatoie, è ora possibile usarle per interagire con le **notifiche** <a href="https://gitlab.gnome.org/GNOME/gnome-shell/-/issues/2319">#2319</a>: una volta aperto il menù notifiche possiamo spostarci al loro interno tramite l'uso della tastiera.

## Modifiche principali a gnome-shell
Tra le modifiche meno evidenti ma "forse" più importanti troviamo:

* l'icona per le connessioni mobili
* correzione per le icone miste ad alto contrasto
* il controllo dell'aggiornamento per nuove estensioni ora viene eseguito solo se effettivamente sono presenti estensioni
* risolto un bug che portava al crash di gnome-shell quando si provava ad aggiornare una estensione eliminata
* i fusi orari frazionari vengono ora mostrati come ore : minuti
* risolti i problemi di ricezione notifiche con telepathy
* risolti i problemi all'effetto blur quando si usa il fractional scaling
* viene ora fornito il nome della località nella sezione meteo
* risolta una regressione nella visualizzazione della tastiera a schermo
* corretto il ridimensionamento all'inserimento della password nella schermata di login/blocco
* risolto un bug che portava al crash all'apertura dell'app picker

## Modifiche ad altri componenti
Troviamo diverse modifiche interessanti ad altre applicazioni, di seguito quelle secondo me più importanti.

### Altre applicazioni
* l'applicazione per la gestione delle estensioni è stata portata a Flatpak

### Mutter
* supporto al mirroring dello schermo via driver proprietari Nvidia
* risolto un bug che posizionava delle bande nere nel ridimensionamento delle finestre su Wayland
* aggiunto il supporto alla emulazione del tasto centrale del mouse
* risolto un bug che portava alla perdita del focus una volta aperto un popup
* supporto per le tavolette con pulsanti di commutazione a modalità multipla
* risolto un bug specifico con Firefox che impediva la copia delle immagini su Wayland

### Epiphany
* risolto un bug che bloccava l'uso dei segnalibri
* risolto un bug che portava ad un loop infinito nel caricamento di link con protocollo ftp://
* migliorato il gestore dei download il quale non permetteva di scaricare risorse in certi contesti <a href="https://gitlab.gnome.org/GNOME/epiphany/-/issues/1127">#1127</a>

L'aggiornamento porta miglioramenti su altri fronti, ho citato quelle per me più rilevanti ma vi rimando al <a href="https://download.gnome.org/core/3.36/3.36.1/NEWS">changelog</a> completo per maggiori informazioni.

## Aggiornamento
Il nuovo aggiornamento è già presente per utenti Arch Linux, Fedora e Open Suse Tumbleweed. Nei prossimi giorni dovrebbe essere possibile effettuare l'aggiornamento su ogni distribuzione che offre GNOME alla versione 3.36.

Per maggiori informazioni, non esitate a fare domande sul nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.