```
---
title: '#howto - Arch GNU/Linux su LXC' 
date: 2021-12-30 12:00
layout: post 
author: Alphvino
author_github: Alphvino
published: false
tags: 
- server 
- lxc
- archlinux
---
```

Configurare Arch GNU/Linux su container LXC non è una passeggiata, questo avviene per il fatto che sono molto conosciuti problemi riguardo a dei certificati CA quando si prova a configurarlo. Per mia esperienza personale, su proxmox, mentre cercavo di configurare Arch GNU/Linux su LXC ho riscontrato problemi simili. In questo articolo vediamo come configurare correttamente Arch GNU/Linux su LXC!

## Teoria su container LXC

I container LXC sono una tecnologia di virtualizzazione che permettono tempi di deployment corti e minimo uso di memoria RAM. Ogni container LXC è isolato da ogni altro container e condivide lo stesso kernel dell'host.

Ad esempio se l'host, ossia la macchina nella quale vengono deployati i container LXC, possiede il kernel 5.15.7 anche i container che verranno deployati possiederano il medesimo kernel.

## Selezione di un mirror

Prima di tutto è necessario selezionare un mirror dal quale ricevere aggiornamenti.

Basterà editare il file `/etc/pacman.d/mirrorlist` e selezionare un mirror appropriato.

## Configurazione iniziale di pacman-key

Una volta deployato il container LXC di Arch GNU/Linux, è possibile iniziare la configurazione, iniziando con pacman-key.

Il primo comando che andremo ad eseguire è il seguente:

```shell
pacman-key --init
```

Tramite questo comando siamo in grado di controllare che il keyring, ossia l'insieme delle chiavi, sia inizializzato correttamente. Se tutto funziona correttamente il comando non restituisce output.

Ora che abbiamo controllato che il keyring sia funzionante è il momento di aggiungere le chiavi di Arch GNU/Linux tramite questo comando:

```shell
pacman-key --populate archlinux
```

Così facendo saremo in grado di inserire nel keyring le chiavi di Arch GNU/Linux che risiedono in `/usr/share/pacman/keyrings`

## Configurazione dei certificati CA

Arrivati a questo punto è importante configurare nel modo corretto i certificati CA così da poter eseguire gli aggiornamenti di Arch GNU/Linux senza riscontrare problemi.

```shell
trust extract-compat
```

Tramite questi due comandi siamo in grado di far funzionare correttamente gli aggiornamenti su Arch GNU/Linux.

Grazie a questo comando i certificati vengono estratti permettendo così la loro lettura nel modo corretto!

## Configurazione del keyring aggiornato

Bene, siamo giunti alla fine della configurazione. In quest'ultima parte dovremmo solo installare i pacchetti `gnupg` e `archlinux-keyring` e ricaricare `pacman-key` con le chiavi aggiornate, appena scaricate.

Installiamo i due pacchetti:

```shell
pacman -Sy gnupg archlinux-keyring
```

Ricarichiamo le chiavi aggiornate:

```shell
pacman-key --refresh-keys
```

## Update finale

Ora abbiamo completato la configurazione di Arch GNU/Linux su LXC! L'unico passaggio che ci rimane è fare un bel update completo del sistema e verificare che funzioni tutto! Quindi, da bravi arch user eseguiamo il mistico comando:

```shell
pacman -Syyu
```

Specificando `yy` forzeremo il ricaricamento delle informazioni sui pacchetti del mirror così da avere un mirror aggiornato ad-hoc!
