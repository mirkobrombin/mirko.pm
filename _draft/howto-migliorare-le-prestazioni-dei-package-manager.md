

---
title: '#howto - 'migliorare le prestazioni dei package manager' 
date: aaaa-mm-gg H:M
layout: post 
author: Nome Floppy Loppy
author_github: raspFloppy 
tags: 
- bash 
- ubuntu
- fedora
- archlinux
---

Il package manager è quel insieme ti tool che gestisce ed automatizza tutti quei processi che riguardano l'installazione, l'aggiornamento, la rimozione e la configurazione dei software all'interno di un sistema operativo, per questo motivo utilizzare qualche trucchetto per accelerare questi processi potrebbe tornare utilie.
In particolare in questo articolo andremo a trattare di **apt**, **dnf** e **pacman** rispettivamente i package manager di **Ubuntu/Debian**, **Fedora** e **Archlinux**.

> NOTA: 
> Molti dei consigli che verranno dati di seguito potrebbero non tornare utili in quei casi in cui l'hardware non è molto prestante oppure la connessione internet non è delle migliori.


## Cosa andremo a fare
Per avere delle prestazioni migliori con i nostri package manager andremo a selezionare i migliori mirror ovvero i server da dove installiamo i nostri pacchetti con una connesisone più veloce e più stabile e poi andremo ad abilitare il download parallelo dei pacchetti sfruttato i thread del nostro processore.


## Ubuntu

Con le nuove versioni di Ubuntu i mirror vengono impostati in base alla propria posizione geografica quindi in questo senso non dobbiamo apportare modifiche ai mirror.
Per quanto riguarda l'installazione in parallelo dei pacchetti `apt` non ha nessuna impostazione per eseguire questo tipo di operazione in questo senzo dobbiamo quindi affidarci a software di terze parti: `aria2` e `apt-fast`

Prima di tutto aggiorniamo il sistema con:
```
apt update && apt upgrade
```

poi installiamo `aria2`:
```
apt install aria2
```

ed aggiungiamo il repository per `apt-fast`:
```
add-apt-repository ppa:apt-fast/stabe
```

aggiorniamo nuovamente e installiamo apt-fast con:
```
apt update && apt install apt-fast -y
```

Quando installeremo apt-fast si aprirà un popup che ce lo farà configurare selezionare `apt` per il package manager e nella successima opzione che chiede *Maximum number of connections:* impostare il valore pari ai vostri thread e selezionare *Ok*.

Un file di configurazione per `apt-fast`  verra creato in `/etc/apt-fast.conf` nel caso volessimo modificare manualmente qualche impostazione.

Infine profiamo ad installare qualsiasi pacchetto con:
```
apt-fast install <nome-pacchetto>
```


## Fedora 
 
 Come detto prima su Fedora troviamo dnf come package manager, andiamo quindi a modificare il file `dnf.conf` situato in  `/etc/dnf/dnf.conf` con il vostro editor preferito
 
 Al suo interno troveremo:
 ```
[main]
gpgcheck=1
installonly_limit=3
clean_requirements_on_remove=True
best=False
skip_if_unavailable=True
 ```
 
 Aggiungiamo in fondo le righe: 
 ```
deltarpm=True
fastestmirror=True
max_parallel_downloads=8
```

Dove `deltarpm=True` e `fastestmirror=True` vanno ad impostare i mirror più veloci mentre `max_parallel_downloads=8` imposta il numero di download paralleli permessi, quel numero solitamente va impostato in base a quanti thread ha la vostra CPU ma si può benissimo  aumentare (o diminuire) fin quando non si notano significativi aumenti di prestazioni o addiritura cali.

Una volta fatto ciò andiamo ad aggiornare il nostro sistema con:
``` bash
dnf update
```

e a questo punto i cambiamenti saranno stati apportati.


## Archlinux

Su arch troviamo pacman il cui file di configurazione si trova in `/etc/pacman.conf` 
apriamolo e cerchiamo la riga `ParallelDownloads`  (se non c'è aggiungiamola noi a mano) e la impostiamo anchessa con un valore pari ai nostri thread per avere delle prestazioni ottimale nel mio  caso:
```
ParallelDownloads=8
```

Anche in questo caso comunque è possibile aumentare o diminuire il valore numerico. 
Per quanto riguarda i mirror prima di tutto effettuiamo un backup della lista di mirror attuali che si trovano in `/etc/pacman.d/mirrorlist`  in quanto andremo a **sovrascriverli** con:
```
cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
```

poi installiamo il pacchetto `reflector`:
```
pacman -S reflector
```

ed eseguiamo:
```
reflector --sort rate --save /etc/pacman.d/mirrorlist
```

In questo modo faremo un benchmark dei mirror e li  mirror in ordine di velocità all'interno del file `/etc/pacman.d/mirrorlist`
>NOTE
>Questa procedura potrebbe richiedere parecchio tempo in base a quanti mirror abbiamo selezionato e alla velocità della nostra connessione

Infine eseguiamo:
``` 
pacman -Syyu
```

Per apportare i cambiamenti.



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).