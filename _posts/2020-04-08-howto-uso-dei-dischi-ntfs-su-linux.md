---
title: '#howto - Utilizzo di NTFS su Ubuntu, Fedora e Arch Linux'
published: 2020-04-08
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash
---
**NTFS** è il filesystem di Microsoft per sistemi NT, nonché quello predefinito su Windows.

Le principali distribuzioni forniscono il *modulo NTFS* abilitato di base che permette, però, il montaggio in sola lettura di dischi e partizioni.

Tramite l'impiego di due software è possibile avere un supporto completo, sia in lettura che in scrittura: il primo è **NTFS-3G**, mentre il secondo, da cui il primo dipende, è **FUSE**, acronimo di Filesystem in Userspace.

## Installazione di FUSE e NTFS-3G

Procediamo quindi con l'installazione di FUSE e NTFS-3G sulle tre principali distribuzioni: **Ubuntu**, **Fedora** e **Arch Linux**. 

FUSE è fornito di base nelle distribuzioni di cui andremo a parlare, e non dovrebbe essere quindi necessario installarlo, ma nel caso in cui non fosse presente verrà comunque installato come dipendenza di NTFS-3G.

Vediamo quindi come installare quest'ultimo sulle principali distribuzioni.

### Ubuntu

```bash
sudo apt install ntfs-3g
```

Qualora FUSE non dovesse venir installato come dipendenza, possiamo procedere manualmente:

```bash
sudo apt install fuse
```

### Fedora

```bash
sudo dnf install ntfs-3g
```

Mentre per l'installazione manuale di FUSE:

```bash
sudo dnf install fuse fuse-libs
```

### Arch Linux

```bash
sudo pacman -S ntfs-3g
```

Invece per quanto riguarda FUSE:

```bash
sudo pacman -S fuse-common fuse2
```

## Montare partizioni

Montare un disco NTFS è molto semplice. Dobbiamo innanzitutto trovare il nome del nostro disco NTFS utilizzando il comando `fdisk -l`, il quale mostrerà la lista dei dischi e delle partizioni presenti sul sistema, e dopodichè scegliamo quindi il percorso in cui vogliamo montare uno dei due.

Procediamo quindi con il seguente procedimento mediante uso del comando `mount`:

```bash
sudo mount /dev/sdXX /mnt
```

Nel caso venisse mostrato un errore che afferma che il filesystem non è riconosciuto, possiamo impartirlo come istruzione mediante opzione `-t`:

```bash
sudo mount -t ntfs-3g /dev/sdXX /mnt
```

negli esempi qui sopra troviamo:
* **/dev/sdXX** ossia la partizione che vogliamo montare
* **/mnt** è il percorso in cui vogliamo montarla

> Nel caso in cui volessimo montare la partizione per una lettura/scrittura momentanea, possiamo usare la directory `/mnt` senza alcun problema. È comunque possibile montare la partizione dal Gestore File presente nel sistema, il quale però sfruterà la path `/media` o `/run`.

## Creare partizioni

Possiamo usare questi strumenti anche per creare nuove partizioni NTFS, questo mediante l'uso del comando `mkfs.ntfs`:


```bash
sudo mkfs.ntfs -Q -L newdisklabel /dev/sdXX
```

dove:
* **-Q** serve per evitare la formattazione lenta
* **-L** per fornire una etichetta al disco

## Montare in modo automatico

Nel caso in cui fosse necessario montare il disco all'avvio del sistema, possiamo procedere con la modifica del file `/etc/fstab`, aggiungendo una nuova istruzione:

```bash
# disk            directory            filesystem_type            options        dump    pass

/dev/sdXX        /mnt/ntfs_disk        ntfs-3g                    defaults    0        0
```

Così facendo il nostro disco verrà montato automaticamente in locazione `/mnt/ntfs_disk` all'avvio del sistema. Ovviamente possiamo cambiare le opzioni per ogni utente/gruppo autorizzato alla scrittura.

## Consigli

NTFS-3G, oltre alla lettura e scrittura, ci permette di *modificare la partizione, formattarla, espanderla o restringerla*. Per fare ciò, possiamo utilizzare un tool grafico come **GParted**.

Importante tenere a mente che montare dischi NTFS non sempre è una operazione che va a buon fine, e un errore comune è il seguente: *Metadata kept in Windows cache, refused to mount.*.
Per ovviare a questo problema possiamo disabilitare l'avvio rapido, o "Hybrid Boot" su Windows, lanciando semplicemente da Powershell, con permessi di amministratore, il seguente comando:

```powershell
powercfg /h off
```

Un altro metodo per risolvere questo problema è aggiungere nel file `/etc/fstab` dopo `defaults`, tra le opzioni di montaggio, `remove_hiberfile`, oppure in comando mount aggiungendo l'argomento `-o remove_hiberfile`.

A volte può capitare che i nostri dischi cambino nomenclatura. Facendo un breve esempio, può capitare che il disco NTFS si chiami `/dev/sda2` e un'altra volta `/dev/sdb2`. Per ovviare a questo problema possimo usare il **PARTUUID** il quale è un dato univoco. Digitiamo `blkid` e una volta identificato il disco, ne copiamo il PARTUUID e sostituiamolo nella sezione `_disk_` in `/etc/fstab` il disco `/dev/sdXX` con `PARTUUID=partuuid_copiato`.

## Conclusioni

Su Linux abbiamo qundi la possibilità di usare dischi NTFS senza troppe complicazioni. Tra l'altro, FUSE ci fornisce supporto per numerosi altri filesystem come MTP e APFS di cui parleremo in un altra guida.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).