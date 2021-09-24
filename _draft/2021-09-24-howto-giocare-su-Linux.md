---
title: '#howto - giocare su Linux' 
date: 2021-09-24 10:00
layout: post 
author: Floppy	
author_github: raspFloppy
tags: 
- ubuntu
- archlinux 
- steam
---

Giocare su Linux non è più una leggenda metropolitana, dal 2015 ad oggi infatti grazie agli sviluppatori di Wine e a Valve con Steam è possibile giocare a molti titoli anche tripla A con prestazioni simili se non uguali a quelle che ottereste su Windows, ora vediamo come fare.


## Wine 
Prima di entrare direttamente nel mondo videoludico sarabbe bene dare una breve descrizione di cosa sia **Wine**: *non è un emulatore*, il nome è un acronimo di **Wine Is Not an Emulator**, consiste invece in un **layer di compatibilità** che traduce in tempo reale (per la maggior parte delle volte) istruzioni scritte per essere interpretate dalle **syscall di Windows** in istruzioni comprensibili per Linux. 

Un po' come accade per gli interpreti di lingua umana: supponiamo due persone di cui uno parla la lingua A e l'altro la lingua B, l'interprete (che capisce sia A che B) è colui che sta di mezzo e traduce la conversazione in tempo reale.   
Questo è un esempio semplicistico del funzionamento di Wine ma ci basta per capire i meccanismi base di questo software.

Wine peccava però in campo videoludico, infatti le performance nei giochi erano decisamente poco soddisfacenti e siccome pochissimi giochi erano sviluppati anche per Linux giocare risultava praticamente impossibili, almeno fin quando non arrivò **Steam** su Linux.

### archlinux
Per installare wine su archlinux
```bash 
pacman -S wine
```
la versione testing:
```bash
pacman -S wine-staging
```

### ubuntu
Per installare su ubuntu digitare 

```bash
apt install --install-recommends winehq-stable
```

per la versione testing

```bash
apt install --install-recommends winehq-staging
```

## Steam
Valve nel 2015 decise di rilasciare Steam anche per Linux e di rendere i suoi titoli nativi anche per esso e decise di investire anche in questo OS creando SteamPlay che avrebbe reso possibile giocare ai titoli esclusivi su Windows anche su Linux.  
Per farlo prese il codice di Wine (che è open source) e lo ottimizzò per tradurre le syscall delle **DirectX**, le API di Microsoft per la gestione dei contenuti multimediali, della grafica, audio e input soprattuto nei videogiochi andando a creare **Proton**.  
Proton funziona esattamente come Wine ma è specializzato, se così possiamo dire, nella traduzione di **DirectX**.

Ovviamente come molti software Proton è migliorato nel tempo ma ad oggi nella libreria di steam almeno 16 mila titoli sono compatibili con Linux stando a [ProtonDB](https://www.protondb.com/), sito di ranking dell'esperienza di gioco su linux dei vari titoli non nativi.

Ovviamente ci sono ancora molti giochi che hanno dei problemi, ad esempio quelli al di fuori di Steam o quelli con sistemi Anti-Cheat, ma steam sta lavorando sodo per offrire in futuro esperienze ancora migliori.

### archlinux 
Per installare steam su archlinux:
`pacman -S steam`

### ubuntu 
```bash
wget http://media.steampowered.com/client/installer/steam.deb
dpkg --install steam.deb
```


### Approfondimenti: Steam OS e Steam Deck

*SteamOS* è un sistema operativo sviluppato da *steam* ed ottimizzato per la loro piattaforma e per il gaming. Attualmente basato su **debian** e pubblicizzato tramite le **steam machine** è un progetto che non ha visto tantissima fortuna ed è sempre rimasto marginale rispetto ad altre piattaforme videoludiche.  

Steam quest'anno ha voluto sorprendere un po' tutti ristrutturando le fondamenta di questo progetto: ha di fatti presentato un nuovo tipo di steam machina, la Steam Deck (una console portatile simile alla Nintendo Switch con una nuova versione di Steam OS) e cambiando la base del sistema operativo da Debian ad Archlinux.  

Il progetto ha avuto una certa risonanza al punto da meritarsi le attenzioni degli esponenti di *Microsoft e Epic Games*.



## Lutris

Lutris è un software che permette di installare i launcher di programmi tra cui anche giochi.
Di default usa Wine stock ma è possibile sostituirlo con Proton o con alcuni suoi componenti tra cui **DXVK VKD3D, WINED3D**, **SDL** etc...
Estende il parco giochi al di fuori di quello di steam includendo anche Epic Game ed altro

### archlinux
Per installare lutris su archlinux:
```bash
pacman -S lutris
```

### ubuntu
```bash
apt install lutris
```



## Bottles 

Bottles è un software sviluppato da Mirko Brombin (creatore di Linux/hub). Abbiamo già un articolo dedicato sulla sua installazione [qui](https://linuxhub.it/articles/howto-installazione-di-bottles-su-linux/).



## Tips & Tricks



### ProtonDB

Controllate sempre il sito di [ProtonDB](https://www.protondb.com/) per vedere la compatibilità del vostro gioco con Proton e nel caso nella sezione commenti vedere quali impostazioni che magari un altro utente ha utilizzato possono tornarvi utili



### Proton Glorious Eggroll

Se non si è su Steam potrebbe essere comodo installare una versione modificata di Proton: [Proton-GE](https://github.com/GloriousEggroll/proton-ge-custom).

Questa versione molte volte diminusce i casi di drop di FPS e elimina alcuni effetti grafici fastidiosi tipo lo stuttering e implementa molto prima della versione di Valve alcune funzionalità introdotte da Wine molto utili tra cui l'FSR di AMD.



### Driver

Installare tutti i driver della gpu, preferibilmente quelli proprietari. 

#### Ubuntu 

Da ubuntu quest'operazione avviene tranquillamente tramite GUI. 



#### Archlinux 

Per amd: 
```bash
pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon amdvlk lib32-amdvlk
```

Per Intel graphics:
```bash
pacman -S mesa lib32-mesa
```

Per  Nvidia:
```bash
pacman -S nvidia lib32-nvidia-utils
```

### FSR per amd 
Attivare l'**FSR di AMD** nei giochi se si usa Proton-GE per i giochi che girano tramite Proton, l' è in parole povere un upscaling sotto steroidi ovvero impostando una risoluzione più bassa riporta il gioco alla risoluzione nativa del tuo monitor diminuendo il carico di lavoro sulla GPU e di conseguenza aumentando gli FPS e mantenendo all'incirca la qualità grafica di quella nativa.
Per attivarla aggiungere: `WINE_FULLSCREEN_FSR=1`  alle variabili di lancio di steam


### GAME Mode

Installare ed attivare la gamemode ed inserire nelle variabili di gioco di Steam scrivendo:
```bash
gamemoderun %
```

#### Archlinux

```bash 
pacman -S gamemode
``` 

### Compositor

Disattivare il compositor o utilizzare un DE più leggero, su Plasma è possibile disattivare automaticamente il compositor su **Systemsettings>Display and Monitor>Compositor>Allow applications to block compositing** mettendo la spunta su quest'opzione.

### Cambio di kernel

A volte il cambio di kernel può essere proficuo per il gaming o per altri scopi. Non che il kernel linux non sia adatto, ma essendo un kernel generico usato sia su server che su portatili presenta alcuni meccanismi che sono sono ottimizzati né per usi generici né per usi specifici. 

#### Kernel zen
Dedicheremo un articolo a se stante per la varietà dei kernel ed il loro utilizzo, qui verrà spiegato come installare quello zen 

Su archlinux: 
```
pacman -S linux-zen linux-zen-headers linux-zen-docs
```

Su Ubuntu potete gestire i kernel tramite UKUU: 

```bash
add-apt-repository ppa:teejee2008/ppa
apt update
apt install ukuu
```




Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
