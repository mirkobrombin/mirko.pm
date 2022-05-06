---
title: '#howto - Avviare il sistema da GRUB Rescue'
date: 2020-11-20
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
tags:
  - fedora  - bash
---
Tra le piaghe più comuni di un aggiornamento andato male su sistemi operativi Linux c'è sicuramente la corruzione di **GRUB**, un bootloader ancora diffuso oggi.
Ma, senza disperarsi troppo cercando vecchie chiavette di Ubuntu nascoste sotto il letto, vediamo cosa si può fare per avviare lo stesso il nostro sistema operativo! 

> **ATTENZIONE**:
> Numeri e output variano da sistema a sistema.
> *Non eseguite dei semplici copia e incolla*, controllate quello che scrivete.

## Avvio di Linux da GRUB Rescue
Prima di continuare, vi consigliamo di munirvi della foto di una tastiera con layout USA. Infatti, oltre a quello che sarà il layout della vostra tastiera, in grub-rescue verrà caricato sempre il layout americano.

### Orientarsi nei dischi

Per conoscere, come prima cosa, i dischi presenti nel nostro sistema possiamo usare il nostro amato `ls`, che dovrebbe darci un output simile al seguente:

```lisp
(hd0)(hd0,msdos1)(hd0,msdos2)(hd1)(hd1,gpt1)
```

Il numero dopo la dicitura **hd** altro non è che un identificativo per l'hard disk. Gli identificativi `msdos` e `gpt`, seguiti da un numero, identificano le partizioni di quel disco o di quella memoria.

Se non si hanno informazioni su quale disco/partizione contiene il vostro sistema, non resta che controllarli tutti. Quello che possiamo fare è iniziare a dare `ls` in qualsiasi disco noi vogliamo. Ad esempio, andiamo sul primo HDD rilevato e la sua prima partizione:

`ls (hd1,gpt1)/`

E così via fino a che non notiamo la tipica struttura dei sistemi Linux, cioè con le varie cartelle:

```bash 
./ ../ bin/ boot/ .... 
```

Se riceviamo in ouput un **"Filesystem is unknown"** andiamo oltre, sperando non sia la nostra partizione ma corrotta.

Se non mettete lo slash `/` nel comando come mostrato sopra, il comando darà informazioni sul tipo di partizione del disco. `ls (hd1,gpt1)`, ad esempio, restituirà il tipo di partizione. Se nell'output troviamo la scritta *Filesystem type ext&#42;* allora potremmo essere sulla buona strada.

### Impostare i parametri di avvio del sistema

Supponendo di aver trovato la partizione giusta, o una qualunque partizione con un sistema Linux funzionante, bisogna ora impostare i vari parametri di avvio.

Supponiamo sia *(hd1,gpt1)*. Annotiamoci prima il nome dei file che si trovano nella cartella *boot*:
```
ls (hd1,gpt1)/boot
```

siccome ci servirà più in là.

#### Impostare la root

Con il comando simile al seguente:
```
set root=(hd1,gpt1)/ root=/dev/sdb1
```
è possibile impostare la root del sistema. Notate che il percorso specificato è **/dev/sdb1**. Arriviamoci insieme: 

I così detti device speciali (cioè quei file che identificano le nostre memorie di archiviazione collegate) sono tutti identificati dal percorso */dev/sdXY*, dove la **X** è una lettera *il quale ordine parte da a* e identifica il disco, mentre **Y** è un *numero maggiore o uguale a 1* e identifica la partizione. 

Abbiamo supposto di aver trovato il nostro sistema in **hd1** (il secondo dispositivo rilevato) nella sua prima partizione **gpt1**. *La seconda lettera dell'alfabeto è b, il primo numero è 1*, quindi impostiamo come root `/dev/sdb1`.

Se avessimo trovato la root nel *device hd0 partizione 3* sarebbe stato corretto `root=/dev/sda3` ad esempio.

#### Indicare il kernel di avvio

Nel prossimo comando andremo a specificare **il kernel da utilizzare**. Per i neofiti magari non c'è bisogno di ulteriori specifiche, ma se avete più kernel invece (compreso quello di fallback) potreste volere avviare uno più che un altro. Per sapere i nomi basta vedere quali iniziano per *vmlinux* o *vmlinuz* nella lista di file all'interno di */boot*. Qui prenderemo quello standard:

```
linux (hd1,gpt1)/boot/vmlinuz-linux
```

#### Initial ramdisk

Va poi specificato anche l'initial ramdisk, una serie di file temporanei precaricati all'avvio del sistema nella nostra RAM. Questa lista si trova nei file che come estensione hanno **.img**:

```
initrd (hd1,gpt1)/boot/initrd-linux.img
```

### Avvio del sistema

Se avete seguito correttamente i passaggi qui sopra e siete pronti ad avviare il sistema, date semplicemente il comando:
```
boot
```
Sperando che sia andato tutto bene, dovrebbe partire il sistema. Notate che non è sempre detto che questi passi funzionino come da noi riportato, le vostre opzioni di boot potrebbero essere diverse da caso a caso.

Vi consiglio di tenervi da qualche parte (anche su cloud) una copia del vostro `grub.cfg` da cui copiare eventualmente i dati di cui sopra in caso si rompa il GRUB. 

Farlo potrebbe garantire la riuscita di questo processo di riparazione. 

> Ricordate che "*il backup, è quella cosa che dovevi farla prima*."

#### Consigli di post-avvio

Se riuscite a fare l'accesso al sistema, ricordatevi di reinstallare e riaggiornare il GRUB:

```bash
# Installare il GRUB
grub-install /dev/sdX # X indica il numero del disco

# Aggiornarlo
## Su Ubuntu e derivate
update-grub2 

## Su Fedora
grub2-mkconfig -o /boot/grub2/grub.cfg

### Su Fedora, ma con EFI
grub2-mkconfig -o /boot/efi/EFI/fedora/grub.cfg

## Sulle altre distribuzioni
grub-mkconfig -o /boot/grub/grub.cfg
```

