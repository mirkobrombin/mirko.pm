---
title: '#howto - Dimensionamento partizioni Linux'
description: "Quanti di voi avranno giocato con le partizioni di Linux, modificando le loro dimensioni per recuperare spazio e al successivo riavvio il sistema non si è più avviato?"
date: 2019-08-09
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Quanti di voi avranno giocato con le partizioni di Linux, modificando le loro dimensioni per recuperare spazio e al successivo riavvio il sistema non si è più avviato?

Per  chi si imbattono in questa pratica la prima volta, deve tener conto che ogni partizione  ha un suo UUID di riferimento, oggi vedremo come  modificare una partizione da modalità LIVE e apportare le variazioni in modo che il Sistema Operativo sia ancora funzionante, senza dover effettuare nessuna nuova Installazione.

## Preparazione

Iniziamo con avviare il sistema operativo da LIVE, con un supporto USB o CD (a voi la scelta) e appena  pronto al suo utilizzo, apriamo il terminale.

Con il comando blkid ,  possiamo vedere gli **UUID** delle rispettive partizioni.

    root@mint:/# blkid /dev/sda1: UUID="06959dcc-fc37-42d1-bf8c-115715743fdc" TYPE="ext4" PARTUUID="7515f0ae-01"/dev/sr0: UUID="2019-07-29-11-16-28-00" LABEL="Linux Mint 19.2 Cinnamon 64-bit" TYPE="iso9660" PTUUID="65dbb3bc" PTTYPE="dos"/dev/loop0: TYPE="squashfs"

## Riduzione Partizione

Nel nostro caso, abbiamo la partizione che risiede su /dev/sda1  con un UUID="06959dcc-fc37-42d1-bf8c-115715743fdc".  Ora  aprendo  lo strumento di Gestione Dischi (Gparted) andiamo a ridurre la dimensione di questa partizione e ne creeremo una ulteriore. Andate sulla parte alta di Gparted, tasto destro del mouse sul device (/dev/sda1) e selezionate "Resize/Move".

![gp](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/Screenshot-from-2019-08-09-14-32-37.png)

Impostate un valore di 'New size' a vostro piacere, ovviamente non potrete ridurre oltre la soglia della parte occupata. Per la nostra guida abbiamo settato il valore a 20000MB.  Confermiamo le nostre modifiche su "Resize/Move" e successivamente su 'Apply All Operations". Attendete il completamento.

## Creazione nuova partizione

Sulla spazio non allocato, andremo ora a creare la nuova partizione, tasto destro  su 'unallocated' e selezioniamo 'New'

![gparted](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/Untitled.png)

Adesso, stravolgiamo il nostro Sistema Operativo. Creeremo una partizione di boot dedicata. Assegnate una dimensione di circa 4 GB con un TYPE = 'fat32'  e un LABEL = 'BOOT' . Successivamente confermiamo e sempre da 'Apply All Operations' applichiamo i cambiamenti. Ovviamente sarete avvisati della possibilità della perdita di dati, ma se siete giunti a questo punto  potete correre anche questo rischio!

![boot_1](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/boot_1.png)

Ad attività concluse avremo 2 partizioni, la prima di 20 GB e la seconda di circa 4 GB, la restante è una partizione non formattata. Come abbiamo parlato all'inizio del nostro articolo una partizione ha il suo UUID, la nostra seconda partizione _Formattata_ ha un  nuovo UUID, possiamo verificarlo con il comando utilizzato inizialmente:

    root@mint:/# blkid /dev/sda1: UUID="06959dcc-fc37-42d1-bf8c-115715743fdc" TYPE="ext4" PARTUUID="7515f0ae-01"/dev/sr0: UUID="2019-07-29-11-16-28-00" LABEL="Linux Mint 19.2 Cinnamon 64-bit" TYPE="iso9660" PTUUID="65dbb3bc" PTTYPE="dos"/dev/loop0: TYPE="squashfs"/dev/sda2: LABEL="BOOT" UUID="F5E1-31D5" TYPE="vfat" PARTUUID="7515f0ae-02"

Come possiamo vedere ora abbiamo 2 device **/dev/sda1** e **/dev/sda2** , con i loro relativi UUID.

**Nota Bene:** Una partizione che è solo stata ridimensionata, non cambia di UUID, mentre la _Formattazione_  va ad assegnare un nuovo UUID

## Partizione di Boot

Dopo la Formattazione in fat32 ed aver assegnato  un LABEL = "BOOT" , faciamo tasto destro sulla nostra piccola partizione e  dal menu a tendina  selezioniamo "Manage Flag" e assegniamo 'boot'. Applicate le modifiche!

![boot_2](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/boot_2.png)

Adesso non ci resta che effettuare lo spostamento del path /boot che risiede sul device principale /dev/sda1  e lo sposteremo nella sua nuova posizione /dev/sda2,  procediamo!

    root@mint:/# # verifica partizioniroot@mint:/# blkid /dev/sda1: UUID="06959dcc-fc37-42d1-bf8c-115715743fdc" TYPE="ext4" PARTUUID="7515f0ae-01"/dev/sr0: UUID="2019-07-29-11-16-28-00" LABEL="Linux Mint 19.2 Cinnamon 64-bit" TYPE="iso9660" PTUUID="65dbb3bc" PTTYPE="dos"/dev/loop0: TYPE="squashfs"/dev/sda2: LABEL="BOOT" UUID="F5E1-31D5" TYPE="vfat" PARTUUID="7515f0ae-02"root@mint:/# root@mint:/# # creazione path temporanei per i 'mount point'root@mint:/# mkdir /tmp/sda1root@mint:/# mkdir /tmp/sda2root@mint:/# root@mint:/# # montaggio partizioniroot@mint:/# mount /dev/sda1 /tmp/sda1root@mint:/# mount /dev/sda2 /tmp/sda2root@mint:/# root@mint:/# # spostamento path di /boot del device /dev/sda1 nel nuovo path /boot del device /dev/sda2root@mint:/# mv /tmp/sda1/boot/ /tmp/sda2/root@mint:/#root@mint:/# # smontiamo le partizioni root@mint:/# umount /tmp/sda*

Le fasi di mount, sono necessarie perchè un device fisico non è accessibile finché non venga reso visibile al sistema operativo.

## Aggiornamento Boot

Adesso il nostro sistema operativo principale  ha subito delle modifiche che potrebbero aver influito sul corretto avvio. Principalmente quando un Sistema Linux si avvia, ha bisogno di alcuni file  che si chiamano rispettivamente grub.cfg e fstab.

il **grub.cfg**  è una parte del boot-loader  dove sono riportati i sistemi operativi installati sui device e il loro ordine di avvio, nell'immagine seguente un esempio

![grub](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/Screenshot-from-2019-08-09-16-52-13.png)

Mentre il file **/est/fstab** è dove sono memorizzate le informazioni dei vari device, che verranno montati nei loro path (le cartelle visibili dal gestore file). Ogni sistema operativo Linux ha il suo file fstab.

Se nel nostro sistema operativo , avessimo trovato diverse partizioni tra cui quella separata  con un _mount point_ **/boot** , Con il tool boot-repair, potremmo effettuare le modifiche al grub, senza doverci cimentare nell'utilizzo del terminale. Nella presente guida è stato utilizzato un Sistema Operativo Ubuntu Based avviamo in modalità Live , di conseguenza il tool boot-reapir era presente, ma se non dovesse essere presente tra i vostri software  è necessario installarlo. Di seguito il comodo comando di APT

    sudo apt updatesudo apt install boot-repair

A seguire avviatelo e procediamo all'aggiornamento del grub. Selezionate "Advance options"  e spostatevi nel tab 'GRUB location"

![boot2](https://linuxhub.it/wordpress/wp-content/uploads/2019/08/boot2.png)

Come potete vedere nella prossima immagine, la scelta della partizione di  /boot è quello che stavamo cercando. Il Tool ha  trovato che nel device sda