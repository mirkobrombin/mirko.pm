---
class: post
title: '#howto - Correggere vmlinuz-linux not found su Archlinux' 
date: 2022-04-02 09:00
layout: post 
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- archlinux
- pacman
---

Vi è mai capitato di riavviare la vostra macchina durante un aggiornamento? Può succedere che un riavvio improvviso possa causare danni. Oggi vediamo la risoluzione del seguente messaggio di errore dopo aver riavviato per sbaglio Arch Linux durante un aggiornamento:

```bash
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

Una prima strada la abbiamo già indicata in questo articolo [qui, sul GRUB RESCUE](https://linuxhub.it/articles/howto-avviare-il-sistema-da-grub-rescue/). Ma se avete una usb di archlinux tanto meglio usarla. Da usb con archlinux: 

1. Digitiamo `lsblk` per listare tutti i dischi e partizioni trovate. Ci tornerà utile per capire in quale disco e in quale partizione si trovano la root e la /boot

2. Mettiamo caso che la UEFI risieda in /dev/sda1 mentre la root in /dev/sda2

3. Ora dobbiamo montare le due partizioni ai seguenti punti di mount:
   `mount /dev/sda2 /mnt`
   `mount /dev/sda1 /mnt/boot/efi`

4. Digitiamo quindi:
   ```bash
   mount /dev/sda2 /mnt
   mount /dev/sda1 /mnt/boot/efi
   ```

5. Entriamo in chroot per eseguire le operazioni di recupero con:
   `arch-chroot /mnt`

## Una volta nel sistema
O che siate entrati con l'usb o che siate dentro tramite metodo GRUB RESCUE potete adesso sistemare così: 

1. Dato che il kernel Linux pare mancare è necessario riscaricarlo! Perciò eseguiamo questo comando: `pacman -Syy linux` Così facendo risincronizziamo i repository e sovrascriviamo il kernel Linux. Infatti con pacman è possibile reinstallare un pacchetto semplicemente riscaricandolo, esso sovrascriverà quello vecchio. Dato che mancano vari file, la sovrascrittura porterà con sé anche i file mancanti.

2. Infine, in caso ci fossero altri aggiornamenti digitiamo: `pacman -Syu` 

3. Ora possiamo uscire dalla chroot con `exit` e infine smontiamo tutti i dischi montati con `umount -a`

## Conclusioni

Finalmente abbiamo completato la riparazione del kernel Linux mancante. Ora dovremo solo riavviare la nostra macchina e assicuraci che tutto vada a buon fine!
