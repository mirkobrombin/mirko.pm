---
title: '#pausacaffé - Buon 2023 con VanillaOS' 
date: 2022-12-31 20:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags:
  - capodanno
  - vanillaos
---

Mancano poche ore alla fine di questo 2022. Sicuramente un anno difficile, insieme a tutti quelli precedenti.

Ma noi non ci facciamo abbattere e troviamo sempre il modo di adattarci. Come una nuova distribuzione da installare!

Ecco per cui, per la fine di questo anno, voglio parlare un po' di quello che è il progetto del 2022, il progetto del creatore di LinuxHub: [Vanilla OS](https://vanillaos.org).

## Buon 2023

Prima di iniziare fatemi dare un buon 2023! Quest'anno niente numeri, niente statistiche, voglio solo darvi gli auguri e scrivere un po' di questo progetto, nato nel 2022 ma probabilmente al centro di grandi sviluppi del 2023.

## L'idea

Se cerco nella nostra chat, io e Mirko abbiamo parlato spesso di idee per creare nuove distribuzioni, alcuni estratti della nostra chat:

> Psyke Dady :
> Tu potevi fartela la distro
> 
> Mirko Brombin :
> chi ti dice che non ne ho già fatte?
> 
> Mirko Brombin :
> °L°
> 
> Mirko Brombin :
https://linux.softpedia.com/get/System/Operating-Systems/Linux-Distributions/UbyOS-102813.shtml


O ancora: 

> Mirko Brombin: 
> prima o poi la faccio una distro °L°
> 
> Mirko Brombin: 
> ho in mente un gestore pacchetti fighissimo: zap
> 
> Psyke Dady: 
> Ora però sai che  una distro "bottles" centrica ci stava ?

O ancora: 

> Psyke Dady :
> Comunque se io facessi una distro eviterei il concetto stesso di package
> 
> Mirko Brombin :
> cioè?
> 
> Mirko Brombin :
> il sistema a pacchetti è fallimentare è
> 
> Psyke Dady :
> Ormai abbiamo tanti strumenti diversi universali
> Creare un package manager sarebbe forse una cosa ormai superata
> 
> Mi baserei su un modello misto tra l utilizzo delle Appimage per le app comuni (passami il termine diciamo che intendo tutte le app fuori dal sistema) e un sistema misto tra quello di aur per eventuali binari non presenti e binari di sistema auto aggiornabili solo tramite i tool di sistema 
> 
> 
> Per intenderci
> Gli aggiornamenti li fa un simil package manager che si occupa solo delle cose di sistema 
> 
> Le app le installi con app image
> 
> Tutto quello che non esiste in appimage si appoggia a strumenti di compilazione automatizzata e ottimizzata

(*in realtà son estratti della tua stessa data circa ma shhhh*)

A settembre circa mi arriva un bel messaggio con la creazione di un README e li comprendo che oramai non è più solo una chiacchierata....Vanilla OS era realtà.


> **NOTA A MARGINE**
>
> Più che essere un amico di Mirko, redattore della rete linuxhub di sua creazione, non ho assolutamente nulla a che fare con VanillaOS o altre sue creazioni.

## Cos'è Vanilla OS 

Vanilla OS è una distribuzione GNU/Linux (sia mai a tralasciare il GNU arriva l'orda di gente a dirti che Linux è solo il kernel) basata su Ubuntu, che ne segue i rilasci principali. Il nome "Vanilla" richiama l'esperienza GNOME che offre nella loro distribuzione, o meglio una distribuzione vanilla, pulita, senza personalizzazioni.

## In cosa differisce da Ubuntu

Al di la delle già citate differenze UI, Vanilla ha due differenze principali rispetto Ubuntu: APX e ABR.

### APX

Questa distribuzione avrà un sistema di installazione delle applicazioni completamente diverso, basato sull'integrazione di varie metodologie e sui container. Tale sistema, chiamato [APX](https://github.com/Vanilla-OS/apx) sostituisce il package manager principale di ubuntu (APT, che resta comunque disponibile ma non più necessario, poiché richiamato da **APX**).

La gestione dei container di questo gestore di pacchetti è a sua volta demandata a distrobox.

[Altri dettagli qui](https://documentation.vanillaos.org/docs/apx/).

### ABR

[ABRoot o ABR](https://github.com/Vanilla-OS/ABRoot) è un tool, scritto appositamente per Vanilla, che fornisce al sistema l'immutabilità e l'atomicità, effettuando transazioni tra due partizioni root (A&lrarr;B). Per i profani del termine, l'**atomicità** è quel concetto che garantisce che il sistema non possa essere corrotto da installazioni, aggiornamenti o altre operazioni che non riescono a terminare l'esecuzione completa e quindi devono essere "*annullati*".

In modo analogo, l'*immutabilità* rende parte delle cartelle di sistema non modificabili se non sotto esplicità richiesta. APX, il gestore di cui sopra, in tal senso ha la capacità di coesistere e cooperare con ABR, essendo pienamente integrato.

[Altri dettagli qui](https://documentation.vanillaos.org/docs/ABRoot/).

## Video/Interviste

Se siete interessati a conoscere ancora meglio il progetto prima di provarlo, potreste guardare i seguenti video: 

- [Intervista italiana a Mirko e Luca Di Maio](https://www.youtube.com/watch?v=yTL7FTsrpls)
- [FAQ vanilla OS](https://www.youtube.com/watch?v=PU_NDCYTwCU)
- [Video stra-figo del rilascio](https://www.youtube.com/watch?v=x-stcw0-Sbo)

## Quindi

Buon 2023, installate le distro che vi piacciono di più, decidete se dare o meno una possibilità a Vanilla, ma soprattutto, buon anno sempre più linux a tutti voi <3.

> NOTA:
> 
> La redazione di Linux/hub rimarrà in "ferie" fino a venerdì 20 Gennaio.