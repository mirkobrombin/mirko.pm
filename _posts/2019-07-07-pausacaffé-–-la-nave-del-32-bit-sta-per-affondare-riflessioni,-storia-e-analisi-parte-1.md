---
title: '#pausacaffé – La nave del 32 bit sta per affondare! Riflessioni, storia e analisi (parte 1)'
description: "L'articolo che segue sarà suddiviso in più parti, ognuna della quale uscirà ogni settimana."
date: 2019-07-07
layout: post
author: Davide Galati
author_github: psykedady
tags:

---
L'articolo che segue sarà suddiviso in più parti, ognuna della quale uscirà ogni settimana.

## Introduzione

Ci si tiene a sottolineare che la maggior parte delle analisi deriva da un flusso logico personale maturato attraverso gli studi effettuati e attraverso l'esperienza, nessun opinione vuole quindi essere presa **in modo oggettivo, assolutamente per vera o inequivocabilmente così**.  
Buona lettura.

![Immagine sfocata circolarmente di un codice asm di mia proprietà insieme ad un circuito ](https://linuxhub.it/wordpress/wp-content/uploads/2019/07/Senzanome_0.png)

## Storia

Era il 1991 quando la MIPS lanciò ["_the first true 64-bit RISC microprocessor_"](https://www.cbronline.com/news/mips_previews_the_r4000_claims_it_to_be_the_first_true_64_bit_risc_microprocessor). L'azienda scelse un set di istruzioni ridotto (RISC) poichè era visione comune al tempo il fatto che il set di istruzioni complesse stesse portando il 32bit ad un blocco delle prestazioni.

Un insieme di queste scelte controcorrente portò però l'innovazione ad essere poi oscurata per parecchi anni, anche quando [Intel stesso (insieme ad HP)](https://www.hpl.hp.com/news/2001/apr-jun/itanium.html, https://it.wikipedia.org/wiki/IA-64) sviluppò la **IA-64** (1993), il primo vero processore destinato anche ad i consumer, ad altissime prestazioni e sviluppato insieme a **windows xp a 64-bit**. Ebbene si, non è da 10 anni (come molti pensano) che esiste l'architettura a 64bit, ma era stata pensata e sviluppata _quasi 30 anni fa_.

### Il cambiamento

Quale è stato il vero motivo di tanto ritardo nella diffusione di questa nuova tecnologia?  
Nient'altro che il **cambiamento**.

_Se domani venisse qualcuno a dirvi che non potete più usare i vostri programmi preferiti, perchè vanno riscritti, che gli dispiace per il disagio ma tutto questo gioverà in seguito alle performance delle vostre macchine, che cosa gli rispondereste? _

_E invece se venisse qualcun altro a dirvi che ha rivoluzionato il modo in cui potete svolgere il vostro lavoro, ma dovete riadattare tutto quello che avete fatto in questi anni, riscrivendo tutti quegli appunti e ricostruendo tutte quelle cose che vi facilitano ogni giorno la vita, cosa gli rispondereste? Sareste atti al cambiamento?_ La risposta di utenti e sviluppatori è stata no!

Facciamo un passo indietro e cerchiamo di capire ora cosa invece ha spinto la diffusione poi delle architetture a 64bit di AMD. Essi, se oggi tale architettura è diffusa come amd64 è perchè le prime CPU a diffondersi di questo genere son state sviluppate da AMD grazie all'Athlon64, i motivi per cui quest'architettura rispetto alle precedenti ha avuto successo si trova nelle due domande sopra, e sulla loro negazione.

L'Athlon era **retrocompatibile**, nessuno strumento sarebbe stato inutile anche se scritto per processori a 32 bit, athlon l'avrebbe capito. I lavori dei precedenti sviluppatori non erano inutili, si potevano riutilizzare! Questo a discapito però di un enorme aumento di complessità strutturale della cpu stessa a livello progettuale.

L'**AMD** riusò la sintassi delle istruzioni a 32 bit associandole ad istruzioni a 64 bit, permettendo anche la generazione di una nuova sintassi che dietro le quinte usava, in maniera poco performante ma comunque compatibile, le istruzioni della nuova architettura.  
Questo processo però non aiutò la diffusione dei software a 64bit, poiché non si trattava di una traduzione 1-ad-1 dei vecchi programmi e sistemi, ma bisogna ragionarli per sfruttare a pieno le nuove istruzioni e non incombere in cali di performance notevoli. 

Senza entrare troppo nei dettagli tecnici, il numero di bit denominazione dell'architettura si riferisce sia alla dimensione dei registri generali che alla portata delle operazioni native in linguaggio macchina; per chiarezza, un architettura a 32bit gestisce nativamente numeri a 32 bit (anche chiamati _int _in molti linguaggi di programmazione) ed operazioni sullo stesso numero di bit. Grazie ad i registri multimediali ( comune estensione delle cpu moderne) si possono gestire con la stessa architettura contemporaneamente 4 numeri in virgola mobile a 32 bit alla volta. 

Sulle cpu a 64 bit il ragionamento è diverso, si possono  infatti gestire nativamente 2 numeri interi a 32 bit alla volta oppure uno a 64 bit (chiamato _long_ o _long int _in alcuni linguaggi), con l'estensione multimediale arriviamo a 8 numeri in virgola mobile a 32 bit alla volta oppure 4 a 64 bit (detti anche virgola mobile a precisione doppia o _double_). Questo ragionamento lo si può fare sia attraverso mere istruzioni macchina che applicandosi dal punto di vista intellettuale sfruttando le proprietà dei numeri binari. Tra i vantaggi di un architettura a 64 bit c'è anche la possibilità di un indirizzamento RAM maggiore di 4GiB (che va fino ai 256TiB)

## L'errore

Passiamo ora a comprendere dove si può sbagliare in una traduzione 1-ad-1: innanzitutto non sfruttando i registri multimediali a dovere, infatti se prima ci si poteva gestire facilmente 4 numeri a 32 bit alla volta, la scelta più sbagliata sarebbe di decidere di gestirne 4 a 64 bit senza alcuna motivazione di raddoppiare la precisione, quando si può raddoppiare la velocità gestendone 8 alla volta.

Un altro errore potrebbe essere quello di lavorare con i puntatori alla memoria e non con i dati, infatti i puntatori a 64 bit pesano esattamente 64bit, quelli a 32 pesano 32bit. Quindi la dimensione di strutture che conservano altre strutture raddoppia, Sarebbe più conveniente invece gestire strutture fatte solo dai così detti tipi di base, la quale dimensione non cambia con il cambiare dell'architettura.

Esistono altri errori in cui si incombe come la pessima gestione della cache o l'uso di istruzioni a 32 bit sulle architetture a 64, ma sono **errori di programmazione** e non problemi dell'architettura.

Perché ancora oggi si usa il 32bit?  
Le mie personalissime opinioni nel prossimo articolo.