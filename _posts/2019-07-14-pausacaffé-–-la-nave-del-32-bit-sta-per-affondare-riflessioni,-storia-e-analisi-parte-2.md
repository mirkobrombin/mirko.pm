---
title: '#pausacaffé – La nave del 32 bit sta per affondare! Riflessioni, storia e analisi (parte 2)'
description: "L'articolo che segue rappresenta la seconda parte della #pausacaffè presente.."
date: 2019-07-14
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
L'articolo che segue rappresenta la seconda parte della #pausacaffè presente [qui](https://linuxhub.it/article/pausacaffe-la-nave-del-32-bit-sta-affondare-riflessioni-storia-e-analisi-parte-1 ).  
Settimana prossima seguirà l'articolo finale.

## Introduzione

Ci si tiene a sottolineare che la maggior parte delle analisi deriva da un flusso logico personale maturato attraverso gli studi effettuati e attraverso l'esperienza, nessun opinione vuole quindi essere presa **in modo oggettivo, assolutamente per vera o inequivocabilmente così**.  
Buona lettura.

Spero che, chi di voi abbia letto l'articolo settimana scorsa, abbia maturato una propria opinione (che sottolineo, non deve essere in linea con la mia, ognuno deve essere libero di pensare ciò che vuole o ciò che gli conviene) perché oggi invece vi esporrò la mia.

## Parte 2

È normale che lo sviluppo di software commerciale a 64 bit non potesse iniziare 30 anni fa, da un punto di vista del rapporto guadagno/lavoro era sconveniente, e non si sapeva quanti vantaggi poteva davvero portare l'adozione di questa architettura, ne quando si sarebbero visti questi vantaggi.

Quindi parliamo degli anni che vanno dal 2003 ( ovvero quando uscirono i primi athlon64 ed apple introdusse i primi 64 bit basati su architettura powerpc di ibm) in poi. Al tempo tuttavia i sistemi operativi non erano pronti a questa innovazione e visto che anche windows XP due anni prima sviluppò un sistema di compatibilità che permetteva di avviare applicativi a 32 bit, si decise quindi che la strada da percorrere fino a stabilità fosse quella di sfruttare la retrocompatibilità.

### Il mio pensiero

Ecco ora che introduco il mio pensiero: questo fu il più grande accomodamento dei **grossi _sederoni_ da programmatori**.

Infatti anche volendo aggiungere altri sei anni per la diffusione dei sistemi operativi compatibili ( nel 2009 usciva windows 7 64 bit pienamente stabile) nei 10 anni successivi lo sviluppo di software con la nuova architettura pur avendo subito un accelerazione non ha sostituito lo sviluppo dei 32 bit. Ancora oggi vi sono team  che ci sviluppano, questo è giustificato spesso dallo svantaggio che provocano i puntatori a 64 bit, che occupano più spazio e saturano prima la cache (problemi che possono essere facilmente aggirati sfruttando più tipi di base rispetto a puntatori).

Prelevare un vantaggio significativo dalla nuova architettura richiede un maggiore sforzo di sviluppo e sicuramente una manutenzione più difficile del software che diventa anche meno modulare. 

La mia opinione è quindi che la comodità dovuta alla retrocompatibilità dei processori abbia reso l'abbandono del 32 bit una realtà che ancora oggi non si è verificata, anche causa di una grande mole di librerie e programmi attualmente molto usati e mai aggiornati alle versioni a 64 bit.

Non solo: parte della colpa deriva sicuramente da due tipologie di utenti: quelli che ancora oggi sperano di riesumare ed utilizzare vecchi calcolatori precedenti a questa tecnologia ( o comunque nati in un periodo in cui non era diffusa su tutti i pc) e quelli che ciechi di fronte al fatto che il loro computer è estremamente ottimizzato a girare software con nuova architettura sono troppo attaccati a quei software ancora non aggiornati e alle giustificazioni di chi li produce. Questi utenti hanno incoraggiato giocoforza la resistenza sul mercato di queste vecchie tecnologie.

Oggi però, _finalmente_, **il 32 bit sta affondando**. Tanti sono i casi dell'abbandono dei relativi progetti, che richiedevano sforzi e risorse inutili da parte di chi li manteneva (tempo tolto all'incremento delle performance o delle features di nuovi prodotti). Mi chiedo però quando si arriverà ad uno stacco completo senza essere intralciati da aziende e utenti nostalgici che promuovono giochi e software che per necessitano ancora delle vecchie librerie...

Nel prossimo, e ultimo, articolo vi introdurrò in maniera più tecnica degli esempi con tempi di esecuzione di codici c, asm a 32 e asm a 64 che dovrebbero chiarire quali sono i pro e i contro di sviluppare con una o l'altra architettura