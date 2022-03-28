---
title: '#howto - vmlinuz-linux not found' 
date: 2022-03-01 10:45
layout: post 
author: Alphvino
author_github: Alphvino
published: false
tags: 
- archlinux
- pacman
- linux
- ramdisk
---

Vi è mai capitato di riavviare la vostra macchina durante un aggiornamento? Può succedere che un riavvio improvviso possa causare danni. Oggi vediamo la risoluzione del seguente messaggio di errore dopo aver riavviato per sbaglio Arch Linux durante un aggiornamento:

```shell
Loading Linux linux ...
error: file "/boot/vmlinuz-linux" not found
Loading initial ramdisk ...
error: it's necessary to load the kernel first.
```

## Analizziamo i log

La prima linea dei log ci dice che sta cercando di caricare il famigerato kernel Linux

La seconda mostra un errore secondo il quale vmlinuz-linux non è stato trovato. Ma cos'è vmlinuz-linux? Esso non è altro che un file eseguibile collegato staticamente, che contiene il kernel Linux in uno dei formati supportati. Senza questo file non è possibile avviare il kernel, perché giustamente lo contiene. 

Dopodichè, ignorando l'errore della riga sopra, viene caricato il ramdisk iniziale. 
Esso è un mini disco che contiene l'insieme dei driver indispensabili per montare la partizione nella quale risiede il sistema operativo e magari anche qualche altro driver basico di I/O, video ecc...

Infine, all'ultima riga, troviamo un altro errore che ci dice che prima di caricare il ramdisk iniziale è necessario caricare il kernel Linux, che però non viene trovato.

## E ora? Come possiamo sistemare?

Sistemare questo errore non è molto difficile.

Ecco i passaggi che dovremo seguire:

1) Innanzitutto procuriamoci una USB live di arch linux

2) Facciamo il boot nella live

3) Digitiamo `lsblk` per listare tutti i dischi e partizioni trovate. Ci tornerà utile per capire in quale disco e in quale partizione si trovano la root e la /boot

4) Mettiamo caso che la UEFI risieda in /dev/sda1 mentre la root in /dev/sda2

5) Ora dobbiamo montare le due partizioni ai seguenti punti di mount:
   /mnt -> /dev/sda2
   /mnt/boot/efi -> /dev/sda1

6) Digitiamo quindi:
   
   ```shell
   mount /dev/sda2 /mnt
   mount /dev/sda1 /mnt/boot/efi
   ```
7. Entriamo in chroot per eseguire le operazioni di recupero con:
   `arch-chroot /mnt`

8. Dato che il kernel Linux pare mancare è necessario riscaricarlo! Perciò eseguiamo questo comando:
   `sudo pacman -Syy linux`
   Così facendo risincronizziamo i repository e sovrascriviamo il kernel Linux. Infatti con pacman è possibile reinstallare un pacchetto semplicemente riscaricandolo, esso sovrascriverà quello vecchio. Dato che mancano vari file, la sovrascrittura porterà con sé anche i file mancanti.

9. Infine, in caso ci fossero altri aggiornamenti digitiamo:
   `sudo pacman -Syu` 

10. Ora possiamo uscire dalla chroot con `exit` e infine smontiamo tutti i dischi montati con `umount -a`

## Conclusioni

Finalmente abbiamo completato la riparazione del kernel Linux mancante. Ora dovremo solo riavviare la nostra macchina e assicuraci che tutto vada a buon fine!
