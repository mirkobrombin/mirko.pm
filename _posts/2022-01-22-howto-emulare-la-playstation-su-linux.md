---
title: '#howto - Emulare la Playstation su Linux' 
date: 2022-01-21 
layout: post 
author: Floppy	
author_github: raspFloppy
published: false
tags: 

- gaming
- ubuntu
- fedora
- archlinux
---

Molti di voi probabilmente amano videogiocare e molti probabilmente saranno pc gamer e quindi tutti quei giochi che sono state e sono esclusive Sony e per cui non è mai stato fatto un porting rimangono inaccessibili per i più a meno che non si abbia la console necessaria.

A questo problema vengono in aiuto i fantastici emulatori di cui andrò a parlare qui sotto.



## PCSX-Reloaded (Playstation 1)
**PCSX-Reloaded** è la nuova versione di PCSX, emulatore opensource per playstation 1 che è ormai standard come emulatore per playstation 1.

Per usarlo è necessario installare il bios per ps1 che potete facilmente trovare su internet.


La installiamo come flatpak o come pacchetto:
### Flatpak 
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
**PCSX2** è l'emulatore PS2 opensource per eccellenza, multipiattaforma, con una community enorme che nel tempo ha permesso di rendere praticamente tutti i nostri giochi dell'infanzia rigiocabili sul nostro pc, anch'esso ormai e standard tra gli emulatori.

Per usarlo è necessario installare il bios per ps2 che potete facilmente trovare su internet.

Possiamo trovarla come flatpak o anche come pacchetto:
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
**RPCS3** è un fantastico emulatore  opensource per PS3 gestito da un'altrettanto fantastica community molto attiva (in media il software viene aggiornato 2 volte a settimana) che ha permesso a tutti noi di poter rigiocare a tutti quei titoli che erano esclusive Sony e per le quali non è mai stato fatto un porting per Pc.

Per usarlo è necessario installare il bios per ps3 che potete facilmente trovare su internet.

Per scaricare rpcs3 abbiamo tre possibilità:
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
**Spine** a differenza degli altri **non è un emulatore** ma bensì layer di compatibilità, infatti la PS4 utilizza un'architettura x86 compatibile con i nostri pc che permette una maggiore compatibilità a differenza di delle precedenti playstation che utilizzavano ripsettivamente MIPS per PS1 e PS2 e PowerPC per Ps3. 

Attualmente **Spine** è ancora agli albori dello sviluppo ed è gestito da un singolo programmatore che mantiene il codice closed (Anche se ha affermato la possibilità di renderlo open quando Spine sarà più maturo), il che rende difficile sapere esattamente a che punto sia il progetto.

Ad oggi il Dev afferma che molti titoli 2D girano senza problemi ma titoli più onerosi sono fuori discussione (quindi niente Bloodborne per ora).


Per restare aggiornati sui progressi fatti ecco un link alla lista aggiornata dei giochi compatibili [qui](https://docs.google.com/spreadsheets/d/1vebgZawcNhdZnGPaSuWrC6wo9OpR1miz/edit#gid=438411959)


Per ora non esiste un installer ufficiale per le distro linux anche se Spine risulta essere un esclusiva Linux (in quanto il dev lavora su questi sistemi) e inoltre per poterlo far funzionare bisogna essere in possesso di una Ps4 per reperire il bios di essa.
Resta comunque un progetto interessante che se decidesse di diventare Open potrebbe accellerare lo sviluppo e permettere a tutti noi un giorno di potere giocare a tutte quelle esclusive che non abbiamo sui nostri pc.
