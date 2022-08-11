---
title: '#howto – Dedicare un disco/partizione alla cartella /home'
description: "Grazie al Cloud e a dischi sempre più capienti, è meno frequente l'esigenza di espandere lo spazio di sistema ma in certe circosta.."
date: 2019-04-21
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Grazie al Cloud e a dischi sempre più capienti, è meno frequente l'esigenza di espandere lo spazio di sistema ma in certe circostanze, come ad esempio in ambienti di produzione, può essere indispensabile muovere la cartella **/home** su un nuovo disco o partizione.

Ci sono metodi più strutturati come LVM, con cui possiamo [organizzare dischi e partizioni](https://linuxhub.it/article/howto-cose-e-come-estendere-il-volume-lvm) in una struttura similare ad un RAID 0, forse il miglior metodo per rendere "elastico" il nostro sistema, potendolo ridimensionare ed espandere facilmente.

Esistono poi metodi più pratici come l'utilizzo della tabella dei file system (fstab), ossia il metodo che andiamo a vedere oggi.

## Precauzioni

Dobbiamo tenere in considerazione che questa procedura è tanto facile quanto fatale per i nostri dati. Facciamo una copia della cartella /home, almeno fino a che non abbiamo raggiunto lo scopo.

Nel caso abbiate appena aggiunto un disco per questa guida, evitate di montare in una locazione, sarà più facile identificarlo.

Consiglio, se possibile effettuate queste azioni al di fuori dell'ambiente grafico, evitando possibili malfunzionamenti poichè eventuali file di configurazione sono presenti nella cartella **.config** della nostra home e non solo:

    CTRL+ALT+F1

## Preparazione partizione

In questa sezione andiamo a preparare la partizione di cui abbiamo bisogno, indifferentemente che sia un nuovo disco o uno già presente.

Identifichiamo con [**lsblk**](https://linuxhub.it/article/howto-utilizzo-del-comando-lsblk) il disco in cui vogliamo creare la partizione:

    sudo lsblk

andando per esclusione, troviamo il disco target, nel caso abbiate appena aggiunto un nuovo disco, escludiamo tutti quelli che non hanno un mount point.

Nel nostro output:

    NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTsdb    253:0   0  80G  1 disksda    253:0    0   80G  0 disk??sda1 253:1    0   80G  0 part /

Nel nostro caso, il disco che vogliamo usare è **sdb,** quindi **/dev/sdb**.

> Nel caso fosse già presente una partizione nel disco che vogliamo usare, saltiamo il prossimo step.

## Creazione partizione

Creiamo ora la nuova partizione, configuriamo **fdisk** sul nostro disco:

    sudo fdisk /dev/sdb

premendo **n** ci verrà chiesto se vogliamo una partizione:

*   primary
*   extended

in questo caso la partizione non dovrà ospitare un sistema da boot, scegliamo quindi **extended**.

Ci viene ora richiesta la dimensione della partizione che deve essere fornita in MB e preceduta dal simbolo **+**, quindi se il nostro disco è di 80G, possiamo creare una partizione non più grande di 80G, nel nostro esempio sarà di 40G, quindi (**40*1000=40000**):

    +40000

salviamo infine digitando **w**.

Controlliamo l'effettiva creazione della nostra partizione con **lsblk**:

    sudo lsblk

il che nel nostro caso mostrerà **sdb1** in lista.

### File system partizione

Una volta creata la nuova partizione, è indispensabile creare un file system al suo interno, nel nostro caso useremo **ext4**:

    sudo mkfs.ext4 /dev/sdb1

## Locazione temporanea

Andiamo ora a creare un percorso temporaneo per la nuova partizione:

    sudo mkdir /mnt/home_tmp

e montiamo la nuova partizione al suo interno:

    sudo mount /dev/sdb1 /mnt/home_tmp

In questo momento abbiamo:

*   **/home** con tutti i contenuti originali
*   **/mnt/home_tmp** che punta alla nuova partizione che andremo a dedicare a **/home**

## Copiare i contenuti

Procediamo ora col copiare il contenuto della cartella /home nella nuova partizione quindi in /mnt/home_tmp:

    sudo rsync -avx /home/ /mnt/home_tmp

> **rsync** è uno strumento che permette appunto la sincronizzazione completa di file e directory fra dischi e network.

Montiamo ora provvisoriamente la partizione in /home per controllare il suo contenuto:

    sudo umount /mnt/home_tmpsudo mount /dev/sdb1 /home

## Partizione permanente

Prima di procedere con l'eliminazione della vecchia cartella /home, assicuriamoci che la nuova partizione venga montata correttamente all'avvio di sistema, questo sfruttando **fstab**.

Prima di tutto procuriamoci il **UUID** della nostra partizione:

    sudo blkid

nel nostro caso: **4e9871e2-d91d-4f875-8d6c-02d5fda71a9b**.

Modifichiamo ora il file **/etc/fstab**:

    sudo nano /etc/fstab

e aggiungiamo come ultima riga la nuova istruzione:

    UUID=4e9871e2-d91d-4f875-8d6c-02d5fda71a9b /home ext4 defaults 0 2

ricordando di sostituire il UUID qui sopra col vostro ottenuto precedentemente e nel caso di un file system differente, sostituiamo ext4 con quello corretto.

Procediamo col reboot e la cartella /home risiede ora nella nuova partizione dedicata. Possiamo eliminare i vecchi contenuti smontando la partizione e pulendo la cartella /home, per poi montare nuovamente a seguito del riavvio.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**