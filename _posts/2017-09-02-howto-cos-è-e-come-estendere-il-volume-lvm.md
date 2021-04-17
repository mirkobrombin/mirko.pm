---
title: "#howto - Cos'è e come estendere il volume LVM"
published: 2017-09-02
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Si può pensare a LVM come delle "partizioni dinamiche", facili da creare, ridimensionare ed eliminare, in questo caso queste "partizioni" vengono chiamate "volumi logici".

Per la creazione di un volume logico è necessario un gruppo di volumi, a sua volta composto da volumi fisici. Questa struttura permette la completa scalabilità del volume logico, permettendo la facile espansione del disco stesso.

![Struttura LVM](storage/linuxhub.it-gruppo-di-volumi-rappresentazione.png)

L'immagine qui sopra mostra 3 volumi fisici (es. sda1/sdb1/sdc1) che riferiscono allo stesso gruppo di volumi, possiamo quindi rivolgerci a quest'ultimo come un disco vero e proprio su cui creare partizioni (volumi logici), in questo specifico caso sono stati creati 4 volumi logici.

In un esempio pratico d'installazione Linux su struttura LVM, possiamo sfruttare l'immagine qui sotto, che mostra 3 dischi (sda/sdb/sdc) le cui partizioni (sda2/sdb1/sdb2/sdc1) riferiscono al gruppo di volumi (VolumeGroup1) da cui, a loro volta vengono creati i volumi logici (home/dati/spool), questi volumi vengono formattati col file system appropriato e montate nella corretta locazione /home /backup /var).

<img src="storage/12-0.jpg" alt="lvm">

Di certo hai notato che la partizione sda1 del disco sda è stata esclusa dal gruppo di volumi (VolumeGroup1), questo siccome la partizione di boot non può risiedere in un volume logico. Per questa guida abbiamo 2 dischi:

*   sda da 80G
*   sdb da 500G

### Prepariamo le partizioni

Per prima cosa preparate le partizioni che volete portare a volume fisico, potete usare un qualsiasi tool di partizionamento ([fdisk](http://www.pluto.it/files/ildp/HOWTO/Partition/x591.html), [Gparted](https://gparted.org/), [kdepartitionmanager](https://www.kde.org/applications/system/kdepartitionmanager/)). Per questo esempio andremo a creare 3 partizioni per sda, e una per sdb:

*   sda1 300M
*   sda2 300M
*   sda3 lo spazio restante
*   sdb1 tutto lo spazio del disco

### Creiamo i volumi fisici

Per portare una partizione a volume fisico, ci viene un contro un comando semplicissimo "pvcreate", digitiamo quindi da terminale:

    pvcreate /dev/sda3 /dev/sdb1

in questo esempio escludiamo **sda1** e **sda2** in quanto verranno utilizzate come partizioni boot/efi di sistema. Possiamo verificare i dettagli dei volumi fisici appena creati digitando:

    pvdisplay

### Creiamo il gruppo di volumi

È ora il turno del gruppo di volumi che raggruppa appunto tutti i volumi fisici appena creati. Digitiamo quindi:

    vgcreate VolumeGroup1 /dev/sda3 /dev/sdb1

in questo caso il nostro gruppo volume si chiamerà **VolumeGroup1** e racchiude i volumi fisici **sda3** e **sdb1**. Possiamo verificare il gruppo di volumi appena creato digitando:

    vgdisplay

### Creiamo i volumi logici

Da un gruppo di volumi si possono creare più volumi logici. Nel nostro caso necessitiamo di uno solo, andremo quindi ad utilizzare tutto lo spazio:

    lvcreate -n lvmroot -l 100%FREE VolumeGroup1

analizzando il comando: lvmroot è il nome del volume logico appena creato, 100%FREE è la quantità di spazio che deve allocare, VolumeGroup1 è il gruppo da dove creare il volume logico. Verifichiamo il volume logico appena creato, digitiamo:

    lvdisplay

tra i dettagli notiamo la voce **LV Name** che specifica la directory del volume logico appena creato che nel nostro caso è: **/dev/VolumeGroup1/lvmroot** teniamolo a mente, ci servirà.

### **Creiamo il filesystem**

Come per una partizione, per utilizzarla è necessario creare il filesystem corretto, nel nostro caso useremo ext4:

    mkfs.ext4 /dev/VolumeGroup1/lvmroot

Ora il volume è pronto all'uso e possiamo sceglierlo in fase d'installazione del sistema (é possibile che in fase di installazione venga specificata una path differente: /dev/mapper.., facciamo quindi riferimento alla dimensione).

### Come estendere il volume logico

In una situazione in cui lo spazio del volume logico è insufficiente, è necessario aumentarne la dimensione, nel caso sopra citato, tutto lo spazio del gruppo di volumi VolumeGroup1 è stato occupato, sarà quindi necessario aggiungere un nuovo disco. Per prima cosa, identificato il nuovo disco collegato (nel nostro caso sdc da 500G), una volta appuntato creiamo una partizione dello spazio necessario (nel nostro caso sdc1 da 500G) e procediamo con la creazione del volume fisico:

    pvcreate /dev/sdc1

aggiungiamolo al gruppo di volume VolumeGroup1:

    vgextend VolumeGroup1 /dev/sdc1

Ora che il nostro gruppo di volumi è stato ampliato di altri 500G, è necessario espandere il volume logico, per farlo ci serviamo di un comando simile al precedente "**lvextend**":

    lvextend -l+100%FREE /dev/VolumeGroup1/lvmroot

Ora il nostro volume logico ha una maggiore capienza ma il sistema non rileverà le modifiche in quanto il filesystem necessita di essere esteso, nel nostro caso (ext4) digitiamo:

    resize2fs /dev/VolumeGroup1/lvmroot

Attenzione: in questa guida abbiamo utilizzato il filesystem ext4, il comando può variare in base al filesystem da te scelto, ad esempio per **xfs**:

    xfs_growfs /dev/VolumeGroup1/lvmroot

Le modifiche sono subito applicate e riconosciute.

Diverse distribuzioni (ad es. Fedora & OpenSuse) offrono un installer con gestore LVM e RAID ad interfaccia grafica, molto comodi da gestire. Nello specifico caso di Fedora, è disponibile il partizionamento automatico LVM.  
Nel caso decideste di installare una distribuzione che non offre il partizionamento LVM, dovrete preparare il tutto prima seguendo gli step di questa guida. Per farlo potete sfruttare la live del sistema in quanto necessario il solo terminale.

Revisione di gstux & Leonardo Occhiuzzi