---
class: post
title: '#howto - Usare ssh' 
date: 2022-04-08 06:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- ssh 
- bash
---

In questa guida verrá spiegata la procedura  per connettersi su ssh e scambiare dati con un server remoto!



## Connessione e scambio dati

Per connetterci ad un dispositivo tramite ssh assicuriamoci essenzialmente di soddisfare questi requisiti: 

- SSHD aperto nel device alla quale dovremo connetterci
- Conoscere l'indirizzo ip (locale o meno)  
- Conoscere gli utenti abilitati a ssh 
- Conoscere la password

Avendo queste informazioni la connessione avviene in maniera molto semplice direttamente dalla nostra Distribuzione: 

```bash
ssh utente@ind.iri.zzo.ip
```



### SSHD ? Cosa é? 

`sshd`  è il nome del demone di sistema che fa da server ad ssh, installatelo con il vostro package manager, successivamente attivatelo.



#### Installazione su Debian/Ubuntu e derivate

```bash
apt install openssh-server
```



#### Installazione su Fedora

```bash
dnf install -y openssh-server
```



#### Installazione su Archlinux

```bash
pacman -S openssh
```



#### Avvio su sistemi systemd based

Nei sistemi systemd based è molto semplice interfacciarsi con ssh, per avviarlo in una sessione specifica digitare i seguenti comandi: 
```bash
systemctl start sshd 
```

Per avviarlo all'apertura del sistema operativo: 

```bash
systemctl enable sshd 
```



#### Avvio su systemi sprovvisti di systemd

In tal caso è necessario avviare manualmente il programma `sshd`: 

```bash
sshd
```



Se dovesse dare problemi del tipo: 
```
Missing privilege separation directory: /run/sshd
```

Creare manualmente la cartella: 
```bash
mkdir -p /run/sshd
chmod +755 /run/ssh
```



###  SSH, ma su un altra porta

La porta di default per `ssh` è la *22*. Ma potete anche avviare `sshd` su un altra porta, per farlo cercate nel file `/etc/ssh/sshd_config` la riga `#Port 22`.
Modificate la riga (eliminando il carattere `#`) e quindi scrivete la porta desiderata. Ad esempio per la porta `2044` scriverete: 

```properties
Port 2044
```

Quindi avviate `sshd` sul dispositivo server.

Sul dispositivo in connessione invece dovremmo specificare la porta con il parametro `-p`: 

```bash
ssh -p 2044 utente@ind.iri.zzo.ip
```



### Copiare i  dati con scp 



Per copiare i  dati con `scp` basterá scrivere: 
```bash
scp tuofile utente@ind.iri.zzo.ip:/posizione/cartella
```



#### Spazi nel percorso!

Se il percorso di destinazione comprende degli spazi, bisogna fare qualche "*trick*" per aggirare il problema.
Riflettiamoci: quando abbiamo degli spazi nei nomi di cartelle su bash abbiamo due modi per indicare il percorso: 

- usare le virgolette `" "`, tipo: `/percorso/"della mia cartella"` 
- usare il carattere escape `\`, tipo: `percorso/della\ mia\ cartella`

Qui li dobbiamo unire: servirà questo a specificare che localmente il comando è "unico", quando arriva in remoto sarà nuovamente interpretato.

Quindi: 

```bash
scp tuofile utente@ind.iri.zzo.ip:/posizione/"della\ mia\ cartella"
```



#### SCP, ma su un altra porta

Similmente bisogna usare un parametro, questa volta però la `P` è maiuscola!

```bash
scp -P 2044 tuofile utente@ind.iri.zzo.ip:/posizione/cartella
```



### Inviare comandi in ssh

Potete anche inviare dei singoli comandi in ssh, ed osservare quindi in uscita il risultato di tale comando. 
Ecco come: 

```bash
ssh utente@ind.iri.zzo.ip comando
```



### Avviare un software con GUI da remoto

Possiamo anche  avviare sulla macchina di destinazione un software con interfaccia grafica. Se è vero che normalmente `ssh` si usa con server (quindi dispositivi sprovvisti di schermo) è anche vero che con la diffusione dei raspberry è molto comune avere a che fare con media center ad esempio.  

Quindi vediamo come avviare sulla macchina target un software che necessita di UI: 

```bash
ssh utente@ind.iri.zzo.ip
export DISPLAY=:0
comando
```



### Mi son dimenticato da dove son connesso ...

Potete stampare il client da cui siete connessi così: 
```bash
echo $SSH_CLIENT 
```



Scoprirete indirizzo ip, porta e modalità di connessione.


