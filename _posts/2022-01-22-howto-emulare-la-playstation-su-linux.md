---
title: '#howto - Emulare la Playstation su Linux' 
date: 2022-01-21 15:40
layout: post 
author: Floppy	
author_github: raspFloppy
published: true
tags: 
- gaming
- ubuntu
- fedora
- archlinux
---

Siete PC Gamer Nostalgici, o desiderate rigiocare i vostri giochi d'infanzia della famosissima PS1 di casa Sony? Nessun problema, ci viene in soccorso PCSX-Reloaded.
Scopriamo subito come avverare il nostro desiderio.

> Disclaimer:
> 
> Lo staff di LinuxHub é contro ogni forma di pirateria, pertanto questo articolo é soltanto a scopo informativo.


## PCSX-Reloaded (Playstation 1)
**PCSX-Reloaded** è la nuova versione di PCSX, emulatore Opensource (ormai standard) , per emulare i titoli PS1

Per utilizzarlo è necessario installare il bios per PS1, estraendolo dalla Console di vostra proprietá (Legale) o scaricandolo sui siti Internet (Illegale)


Per installarlo possiamo ricorrere ai classici metodi utilizzati per installare un app normalmente sui sistemi linux, ci avvarremo di 2 sistemi: Flatpak o i classici pacchetti  ### Flatpak 
```
flatpak install pcsx
```

### Pacchetto
#### Archlinux:
Su arch lo troviamo come pacchetto **AUR** che andremo ad installare con **paru**:
 ```
paru -S pcsxr
```
#### Ubuntu:
```
apt install pcsxr
```
#### Fedora:
```
dnf install pcsxr
```


## PCSX2 (Playstation 2)
**PCSX2** è l'emulatore PS2 opensource, piú diffuso,  multipiattaforma e con una community enorme che nel tempo ha permesso di rendere tutti i nostri giochi dell'infanzia compatibili sul nostro pc.

Per utilizzarlo è necessario installare il bios per PS2, estraendolo dalla Console di vostra proprietá (Legale) o scaricandolo sui siti Internet (Illegale)

Per installarlo possiamo ricorrere ai classici metodi utilizzati per installare un app normalmente sui sistemi linux, ci avvarremo di 2 sistemi: Flatpak o i classici pacchetti  
### Flatpak 
```
flatpak install pcsx2
```

### Pacchetto
#### Archlinux:
```
pacman -S pcsx2
```
#### Ubuntu:
```
apt install pcsx2
```
#### Fedora:
```
dnf install pcsx2
```



## RPCS3 (Playstation 3)
**RPCS3** è un  emulatore  opensource per PS3 gestito da una community molto attiva (in media il software viene aggiornato 2 volte a settimana) che ha permesso a tutti noi di poter rigiocare a tutti quei titoli che erano esclusive Sony e per le quali non è mai stato fatto un porting per PC.

Per utilizzarlo è necessario installare il bios per PS2, estraendolo dalla Console di vostra proprietá (Legale) o scaricandolo sui siti Internet (Illegale)

Per installarlo possiamo ricorrere ai classici metodi utilizzati per installare un app normalmente sui sistemi linux, ci avvarremo di 3 sistemi: Appimage, Flatpak o i classici pacchetti  

### Appimage
**Appimage** sul [sito ufficiale](https://rpcs3.net/download)

### Flatpak
**Flatpak** con il comando:
```
flatpak install rpcs3
```

### Pacchetto

#### Archlinux:
Lo troviamo nell'**AUR** come `rpcs3` oppure `rpcs3-git` (per la versione aggiornata al repository) e la installiamo con il nostro **AUR-helper**, in questo caso `paru`:
```
paru -S rpcs3-git
```

#### Ubuntu:
Su Ubuntu possiamo trovarlo sullo snap store e lo installiamo con:
```
snap install rpcs3-emu
```

#### Fedora:
Per Fedora non esiste un pacchetto ufficiale quindi possiamo optare o per con le possibilità precedenti o installando snap sul nostro sistema.



## Spine (Playstation 4)
**Spine** a differenza degli altri **non è un emulatore** ma bensì layer di compatibilità, infatti la PS4 utilizza un'architettura x86 compatibile con i nostri pc che permette una maggiore compatibilità a differenza  delle precedenti playstation che utilizzavano rispettivamente MIPS per PS1 e PS2 e PowerPC per Ps3. 

Attualmente **Spine** è ancora acerbo, ed è gestito da un singolo programmatore che mantiene il codice closed (Anche se ha affermato la possibilità di renderlo open quando Spine sarà più maturo), il che rende difficile sapere esattamente a che punto sia il progetto.

Ad oggi il Dev afferma che molti titoli 2D girano senza problemi ma titoli più onerosi sono fuori discussione (quindi niente Bloodborne per ora).


Per restare aggiornati sui progressi fatti ecco un link alla lista aggiornata dei giochi compatibili [qui](https://docs.google.com/spreadsheets/d/1vebgZawcNhdZnGPaSuWrC6wo9OpR1miz/edit#gid=438411959)


Per adesso non esiste un installer ufficiale per le distro linux anche se Spine risulta essere un esclusiva Linux (in quanto il dev lavora su questi sistemi) e inoltre per poterlo far funzionare bisogna essere in possesso di una Ps4 per reperire il bios di essa.
Resta comunque un progetto interessante che se decidesse di diventare Open potrebbe accellerare lo sviluppo e permettere a tutti noi un giorno di potere giocare a tutte quelle esclusive che non abbiamo sui nostri pc.


Disclaimer: Tutto lo staff di LinuxHub é contro ogni forma di pirateria, pertanto questo articolo é soltanto a scopo informativo.
