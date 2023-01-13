---
class: post
title: '#howto - Arch GNU/Linux su LXC' 
date: 2021-12-30 10:45
layout: post 
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- server 
- lxc
- archlinux
---

Configurare Arch GNU/Linux su container LXC non è molto semplice,  per il fatto che sono molto conosciuti problemi riguardo a dei certificati CA quando si prova a configurarlo. In questo articolo vediamo come configurare correttamente Arch GNU/Linux su LXC, e non incappare in problemi!

## Teoria su container LXC

I container LXC sono una tecnologia di virtualizzazione che permettono dei tempi di deployment corti e un minimo uso di memoria RAM. Ogni container LXC è isolato da ogni altro container e condivide lo stesso kernel dell'host.

Ad esempio se l'host, ossia la macchina nella quale vengono deployati i container LXC, possiede il kernel 5.15.7 anche i container che verranno deployati possiederanno il medesimo kernel.

## Selezione di un mirror

Prima di tutto è necessario selezionare un mirror dal quale ricevere aggiornamenti.

Basterà editare il file `/etc/pacman.d/mirrorlist` e selezionare il mirror che piú ci aggrada.

## Configurazione iniziale di pacman-key

Una volta deployato il container LXC di Arch GNU/Linux, è possibile svolgere la configurazione, iniziando con pacman-key.

Ecco il  primo comando che andremo ad eseguire:

```shell
pacman-key --init
```

Tramite questo comando siamo in grado di controllare che il keyring, ossia l'insieme delle chiavi, sia inizializzato correttamente. Se tutto funziona correttamente il comando non restituisce un output.

Una volta controllato che il keyring sia funzionante, è il momento di aggiungere le chiavi di Arch GNU/Linux mediante questo comando:

```shell
pacman-key --populate archlinux
```

In questo modo saremo in grado di inserire nel keyring le chiavi di Arch GNU/Linux che risiedono in `/usr/share/pacman/keyrings`

## Configurazione dei certificati CA

Arrivati a questo punto è importante configurare nel modo corretto i certificati CA così da poter eseguire gli aggiornamenti di Arch GNU/Linux senza riscontrare problemi.

```shell
trust extract-compat
```

Tramite questi due comandi siamo in grado di far funzionare correttamente gli aggiornamenti su Arch GNU/Linux.

Inoltre, grazie a questo comando i certificati vengono estratti permettendo così la loro lettura nel modo corretto.

## Configurazione del keyring aggiornato

Siamo giunti dunque alla fine della configurazione. 
In quest'ultima parte dovremmo solo installare i pacchetti `gnupg` e `archlinux-keyring` e ricaricare `pacman-key` con le chiavi aggiornate, appena scaricate.

Installiamo i due pacchetti:

```shell
pacman -Sy gnupg archlinux-keyring
```

Ricarichiamo le chiavi aggiornate:

```shell
pacman-key --refresh-keys
```

## Update finale

Ora abbiamo completato la configurazione di Arch GNU/Linux su LXC! L'unico passaggio che ci rimane è fare un update completo del sistema e verificare che tutto funzioni correttamente!
Quindi, da bravi Arch user eseguiamo il mistico comando:

```shell
pacman -Syyu
```

Specificando `yy`  forzeremo il ricaricamento delle informazioni sui pacchetti del mirror così da avere un mirror aggiornato ad-hoc!
