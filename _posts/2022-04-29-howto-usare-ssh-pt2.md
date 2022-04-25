---
title: '#howto - Usare ssh parte 2' 
date: 2022-04-29 06:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
published: false
tags: 
- ssh 
- bash
---

[&larr; Articolo precedente su ssh](https://linuxhub.it/articles/howto-usare-ssh)  



In questa guida vedremo come modificare il *file di configurazione* di ssh, salvare le nostre connessioni per *non reinserire i dati* e l'uso di `sshpass`,



## SSH config e SSHD config

SSH ha due file di configurazione per la connessione, come si può intuire sono uno per le connessioni in uscita (ssh) e uno per le connessioni in entrata (sshd), i percorsi sono rispettivamente: 

- `/etc/ssh/ssh_conf` (o localmente `~/ssh/config`)
- `/etc/ssh/sshd_conf`



Ovviamente le funzionalità di questi due file sono tantissime, troppe per elencarle tutte. Ne saranno quindi elencate alcune 



### Il file ssh_conf

In questo file possiamo inserire una lista di preconfigurazioni per ogni HOST a cui ci connettiamo più spesso, allo scopo di evitare di reinserire alcuni parametri come l'indirizzo ip, la porta di connessione, l'utente con il quale ci connettiamo o la chiave ssh (o l'identità).

Ogni "*sezione*" sarà strutturata come segue: 
```
Host nomeAPiacere
	Opzione valore
	AltraOpzione altroValore
	....
```



Vediamo le opzioni più utili. 

- Sicuramente `HostName`, dove potete segnare l'ip oppure il DNS a cui volete connettervi. 
- `User` se avete un determinato utente fisso a cui connettervi
- `Port` se non vi connettete alla **porta 22** come specificato in maniera predefinita dal protocollo ssh
4. Se avete più identità all'interno della vostra cartella ssh, ovvero più chiavi, potreste trovare utile `IdentityFile` per specificare con quale identità connettervi
- `ForwardX11`. Il forward di X11 è un argomento un attimo più complesso, ma in poche parole è possibile avviare applicazioni grafiche remote sulla nostra macchina tramite server X. Potete specificare `yes` o `no`
- `ConnectTimeout` puoi specificare un *timeout in secondi* per la tua connessione, il valore di default è `0`, che non significa "infinito" ma delega invece la decisione al socket TCP  



Vediamo un esempio completo:

```bash
Host ilMioHost
	HostName ind.iri.zzo.ip
    User ilmionomeutente
    Port 2052
    IdentityFile ~/.ssh/unaltroid_rsa
    ForwardX11 yes
    ConnectionTimeout 120
```



Per altre informazioni, digita: 
```bash
man ssh_config
```



### Il file sshd_config

Lato ricevente abbiamo `sshd_config`, un file che definisce le modalità in cui è consentito che un client si connetta al tuo device tramite ssh. 

Ovviamente per ogni modifica bisognerà riavviare il demone ssh, se questo era in esecuzione!



Alcune opzioni sono analoghe a quelle del file di cui sopra.

- `PermitRootLogin`, accetta come parametri `yes` o `no`, ed è ovviamente più sicuro impostare questa opzione a `no`, e consentire così l'accesso solo se si conosce il nome di un utente abilitato.
- `AllowUsers` consente di creare una whitelist (si può specificare più di un nome, separando con spazi) di nomi utente abilitati all'accesso. Se abilitato anche solo un utente, tutti quelli non specificati avranno accesso negato
- `AllowGroup` come sopra, ma la whitelist contiene nomi di gruppi utente e non utenti singoli. Questo potrebbe permettere un approccio ancora più flessibile
- Parallelamente abbiamo `DenyUsers` e `DenyGroups`, che fanno l'esatto contrario. Ovvero si può specificare una lista di utenti o gruppi che si devono vedere negati l'accesso da remoto con ssh.
- `Port` serve per cambiare eventualmente la porta di ascolto. Da impostazione predefinita è la **porta 22**
- `Banner` accetta come argomento il percorso di un file di testo. Il contenuto del file viene stampato prima che l'utente possa fare l'autenticazione su ssh
- `X11Forwarding` se impostato a `yes`, permette il forwarding di finestre x11

- `ListenAddress` consente di specificare coppie `indirizzi:porta` a cui consentire la connessione, a tutte le altre sarà rifiutata
- `Match` tramite quest'operazione è possibile creare delle configurazioni che si attivano solo per determinati utenti o host. Ad esempio creiamone una che per un utente "`utentissimo`" abilita `X11Forwarding` e manda un **Banner**: 

```bash
Match User utentissimo
	X11Forwarding yes
	Banner /etc/bannerutentissimo
```

 

Ora facciamo un esempio completo: 
```bash
PermitRootLogin no
AllowUsers guest utente1
Port 2052
ListenAddress 192.168.5.2:2052

Match User utentissimo
	X11Forwarding yes
	Banner /etc/bannerutentissimo
```



Per altre informazioni, digita: 
```bash
man sshd_config
```



## Password, come evitarla

Una delle domande che ricevo più spesso quanto riguarda la connessione ssh è: "ma devo inserire ogni volta la password? Che due scatole..."

Beh esistono delle opzioni per evitarlo in effetti. 
