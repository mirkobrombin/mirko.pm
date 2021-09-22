

---
title: '#howto - giocare su Linux' 
date: 2021-09-24 
layout: post 
author: Floppy	
author_github: raspFloppy
tags: 
- archlinux 
- steam
---

Giocare su Linux non è più una leggenda metropolitana, dal 2015 ad oggi infatti grazie agli sviluppatori di Wine e a Valve con Steam è possibile giocare a molti titoli anche tripla A con prestazioni simili se non uguali a quelle che ottereste su Windows, ora vediamo come fare.


## Premessa
Per questa guida ci si è basati sull'esperienza con Archlinux e derivate anche se molti dei consigli a fine guida possono essere comunque replicati in altre distribuzioni come Ubuntu o Fedora.
Detto questo iniziamo.

## Wine 
Prima entrare direttamente nel mondo videoludico sarabbe bene dare una breve descrizioni di cosa sia Wine.
Prima di tutto Wine non è un emulatore (questa frase è meme), infatti il nome è un acronimo di **Wine Is Not an Emulator**, bensì un **layer di compatibilità** che traduce in tempo reale (per la maggior parte delle volte) istruzioni scritte per essere interpretate dalle **syscall di Windows** in istruzioni comprensibili per Linux. 

Per fare un esempio è come se Bob che parla russo volesse parlare con Alice che però essendo italiana non comprende ciò che dice, a questo punto interviene Pippo (Wine) che pur essendo italiano comprende il russo e traduce tutto quello che Bob sta dicendo ad Alice in tempo reale in modo che lei possa capire.
Questo è un esempio semplicistico del funzionamento di Wine ma ci basta per capire i meccanismi base di questo software.

Wine peccava però in campo videoludico, infatti le performance nei giochi erano decisamente poco soddisfacenti e siccome pochissimi giochi erano sviluppati anche per Linux giocare risultava praticamente impossibili, possiamo dire che Pippo era ancora poco esperto di russo, almeno fin quando non arrivò **Steam** su Linux.

Per installare wine su archlinux
`pacman -S wine`
la versione testing:
`pacman -S wine-staging`
 

## Steam
Valve nel 2015 decise di rilasciare Steam anche per Linux e di rendere i suoi titoli nativi anche per esso e decise di investire anche in questo OS creando SteamPlay che avrebbe reso possibile giocare ai titoli esclusivi su Windows anche su Linux.
Per farlo prese il codice di Wine (che è open source) e lo ottimizzò per tradurre le syscall delle **Diretx**, le API di Microsoft per la gestione dei contenuti multimediali, della grafica, audio e input soprattuto nei videogiochi andando a creare **Proton**.
Proton funziona esattamente come Wine ma è specializzato, se così possiamo dire, nella traduzione di Diretx.
Ovviamente come molti software Proton è dovuto migliorare nel il tempo ma ad oggi nella libreria di steam almeno 16 mila titoli sono compatibili con Linux stando a [ProtonDB](https://www.protondb.com/) il sito in cui utenti Linux valutano la loro esperienza videoludica ed in base a ciò il sito fa un ranking della "giocabilità" di un videogioco.

Ovviamente ci sono ancora molti giochi che hanno dei problemi soprattutto quelli al di fuori di Steam e per quelli che usano l'EAC un Anti-Cheat che bisogna installare sul proprio sistema che però non è compatibile con Linux e che quindi rende impossibile giocare a quei titoli che lo adottano.
Per il primo problema possiamo affidarci a Lutris di cui parleremo in seguito mentre per il secondo problema Valve sta ora sviluppando una console portatile, lo **Steam Deck**, su cui girerà una distribuzione di Linux, SteamOS (derivata di Arch btw).
Valve per evitare che sulla propria console molti titoli non funzionino ha affermato di star lavorando con le case videoludiche che adottano l'EAC per vedere di riuscira ad implementarlo o comunque renderlo compatibile con Proton quindi bisognerà solo aspettare il corso degli eventi e magari titoli che oggi sono ingiocabili potranno essere disponibili anche su Linux.

Per installare steam su archlinux:
`pacman -S steam`


## Lutris

Lutris è un software che permette di installare i launcher di programmi tra cui anche giochi.
Di default Lutris usa Wine stock ma è possibile sostituirlo con Proton o con i componenti che costituiscono proton tra cui **DXVK VKD3D, WINED3D**, **SDL** etc.
Ovviamente al di fuori di steam il parco titoli compatibili si restringe ma è comunque possibile trovare alcuni titoli che funzionano, per esempio Epic games store non ha un app ufficiale per Linux ma tramite Lutris è possibile averla ed eseguire alcuni giochi (soprattutto quelli che sono presenti anche su Steam) tramite Lutris.

Per installare lutris su archlinux:
`pacman -S lutris`

## Tips & Tricks

Il primo consiglio è quello di andare a controllare il sito di [ProtonDB](https://www.protondb.com/) per vedere la compatibilità del vostro gioco con Proton e nel caso nella sezione commenti vedere quali impostazioni che magari un altro utente ha utilizzato possono tornarvi utili

<br>
Il secondo e quello di installare una versione modificata di Proton chiamata [Proton-GE](https://github.com/GloriousEggroll/proton-ge-custom) questa versione molte volte diminusce i casi di drop di FPS e elimina alcuni effetti grafici fastidiosi tipo lo stuttering e implementa molto prima della versione di Valve alcune funzionalità introdotte da Wine molto utili tra cui l'FSR di AMD.


<br>

Installare tutti i driver della gpu

### Amd 
`pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon amdvlk lib32-amdvlk`

### Intel
`pacman -S mesa lib32-mesa`

### Nvidia
`pacman -S nvidia lib32-nvidia-utils`
 
<br>

Attivare l'**FSR di AMD** nei giochi se si usa Proton-GE per i giochi che girano tramite Proton, l' è in parole povere un upscaling sotto steroidi ovvero impostando una risoluzione più bassa riporta il gioco alla risoluzione nativa del tuo monitor diminuendo il carico di lavoro sulla GPU e di conseguenza aumentando gli FPS e mantenendo all'incirca la qualità grafica di quella nativa.
Per attivarla aggiungere: `WINE_FULLSCREEN_FSR=1`  alle variabili di lancio di steam

<br>

Installare ed attivare la gamemode `pacman -S gamemode` e nelle variabili di lancio di steam `gamemoderun %`

<br>

Disattivare il compositor o utilizzare un DE più leggero, su Plasma è possibile disattivare automaticamente il compositor su **Systemsettings>Display and Monitor>Compositor>Allow applications to block compositing** mettendo la spunta su quest'opzione.

<br>

Installando il kernel Zen ottimizzato per uso desktop
`pacman -S linux-zen linux-zen-headers` e anche `linux-zen-docs` se si vuole la documentazione.





Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).