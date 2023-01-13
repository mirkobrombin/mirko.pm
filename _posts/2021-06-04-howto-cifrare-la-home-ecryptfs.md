---
class: post
title: '#howto - Cifrare la home con ecryptfs' 
date: 2021-06-04
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- bash 
- ubuntu 
- archlinux
- fedora
---



Abbiamo già parlato di cifrare file e cartelle [in questo articolo](https://linuxhub.it/articles/howto-cifrare-file-e-cartelle-con-cryfs-e-ecryptfs/). Il passo successivo è cifrare la propria home. Il tool che verrà usato per cifrarla è `ecryptfs`, già usato nell'articolo precedente.

> **ATTENZIONE:** 
>
> Alcuni software come dropbox non supportano `ecryptfs`, dovrete quindi posizionare la cartella al di fuori della vostra home.
> Inoltre è mio dovere avvisare che ho personalmente testato il procedimento solo su **Archlinux** e non su altre distribuzioni.



## Installazione 

Installate il tool ( se non lo avete già fatto ) sulla vostra distribuzione: 

### Debian/Ubuntu e derivate

```bash
apt install ecryptfs-utils keyutils rsync lsof
```

### RHEL/Centos e derivate

```bash
yum install ecryptfs-utils keyutils rsync lsof
```

### Fedora e derivate
```bash
dnf install ecryptfs-utils keyutils rsync lsof
```

### Archlinux

```bash
pacman -S ecryptfs-utils keyutils rsync lsof
```



## Migrare la propria home

> **ATTENZIONE:** 
>
> fate un backup dei vostri dati poiché i prossimi passi potrebbero renderli non più recuperabili



 Una volta installato il software, caricate l’apposito modulo del kernel

```bash
modprobe ecryptfs
```

Usate quindi il tool per la migrazione della home. Per avviare questa fase è necessario che voi non abbiate alcun processo aperto con l’utente di cui cifrerete la home (accedete quindi a pc appena aperto da tty con il vostro utente root):

`ecryptfs-migrate-home -u <nome utente>`

Seguite le istruzioni indicate dal tool.

Per completare la procedura, uscite dal vostro account root con `exit` ed entrate con quello dell’utente. 
Verificate quindi con `ls` che siano state criptate tutte le cartelle ( dovrebbero apparire `Access-your-data.desktop` e un altro file di testo).
Quindi decriptate e ri-criptate voi stessi la home usando i due tool:

```bash
ecryptfs-mount-private #per decriptare
ecryptfs-umount-private #per criptare
```

Potete usare i due comandi ogni volta che volete cifrare o decifrare la cartella home manualmente.

Alle volte, può accadere che la cifratura non avvenga per via di processi aperti con il proprio utente.
In caso potete forzare l'umount della cartella (quindi la cifratura):
`umount.ecryptfs_private`

uscite dall’account user (dopo aver smontato la cartella) e rientrate con root per maggiore comodità.


## Auto montare la cartella all'accesso 

Ora è necessario (a meno che non vogliate fare l’accesso a mano ogni volta) impostare l’automounting della home già decriptata all’accesso. Facciamo un backup del file `/etc/pam.d/system-auth` :

```bash 
cp /etc/pam.d/system-auth /etc/pam.d/system-auth.old
```

ed editiamo quindi il file `system-auth` con il nostro editor preferito

`<editor> /etc/pam.d/system-auth`

Da adesso facciamo MOLTA attenzione, sbagliando qualunque cosa potremmo non essere più in grado di accedere a nessun account ( dovremmo quindi aggiustare le cose da una live). 

Andiamo quindi ad aggiungere dopo la stringa che contiene **auth [default=die] pam_faillock.so authfail** la seguente linea:

`auth required pam_ecryptfs.so unwrap`

Prima della linea che contiene **password required pam_unix.so** aggiungiamo:

`password optional pam_ecryptfs.so`

E infine dopo la linea che contiene **session required pam_unix.so** aggiungiamo:

`session required pam_ecryptfs.so unwrap`

Usciamo dall’editor salvando. Per essere sicuri di aver fatto le cose a modo, apriamo un altro tty ( `ctrl-alt-f2` ) e facciamo l’accesso con l’utente. 

### caso 1: insuccesso
Se qualcosa è andato male, ritornate immediatamente nel primo tty ( `ctrl-alt-f1` )  e correggete l’errore nel file o, nel caso non riusciate, eliminate le modifiche e riprendete il file di backup:

`mv -f /etc/pam.d/system-auth.old /etc/pam.d/system-auth` 

Potete anche ricopiare anche la cartella di backup, fornita da ecryptfs :

```bash
sudo rm /home/nomeutente
sudo mv /home/nomeutente.numero /home/nomeutente
sudo rm -rf /home/.ecryptfs
```


### caso 2: successo
Se l’accesso avviene correttamente, e se la cartella viene decriptata, allora il processo è andato a buon fine.
Eliminate la cartella backup automaticamente creata da ecryptfs (ha il suffisso del vostro nome, ed un numero accanto), cercandola con 
`ls /home/` 

Rimuovetela in seguito con il comando:
```
rm -rf nomeutente.NUMERO
```


### infine
Ricordate di far uscire con `exit` l’utente. 

Se la cartella non viene ricriptata potreste avere problemi di accesso, nel caso accada entrate con un tty diverso e ricriptatela con il comando di umount, ripassate quindi al tty principale per continuare l’accesso. 



### Passo per archlinux 
Su **Archlinux**, è necessario apportare una modifica al file `/etc/mkinitcpio.conf` e scrivere all’interno della sezione **MODULES** il nome del modulo ( `ecryptfs` ) per forzarne il caricamento ad ogni avvio del pc.
Successivamente ricompilate il servizio di avvio

```bash
mkinitcpio -p linux
```




