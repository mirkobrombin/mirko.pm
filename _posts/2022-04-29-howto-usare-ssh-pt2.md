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

### Inviare la propria chiave al server

Tramite `ssh-copy-id` potete copiare la vostra chiave pubblica nel server allo scopo di non inviare più la password per accedere. 

Il primo passo è proprio generare la password, potete seguire [la guida di linuxhub dedicata](https://linuxhub.it/articles/howto-Chiavi-ssh/).

Ovviamente se avete protetto la vostra chiave pubblica con password alla generazione, dovrete inserire quella. 

Dopo aver generate la vostra chiave potete mandarla tramite questo comando: 

```bash
ssh-copy-id -i /percorso/alla/chiave.pub user@host
```

Se eventualmente volete cambiare porta basta specificare l'apposito parametro:

```bash
ssh-copy-id -i /percorso/alla/chiave.pub -p <numero> user@host
```

Normalmente la chiave viene salvata nel percorso `/home/nomeutente/.ssh/id_qualcosa.pub`  



#### Come vengono conservate le autorizzazioni lato server

Lato server, se siete curiosi, le chiavi autorizzate lato server vengono conservate nel file: 

```bash
/home/nomeutente/.ssh/keys_authorized
```



#### Eventuali problematiche: Lato client

Se non doveste riuscire per qualche problema a inviare la chiave, controllate localmente che la chiave abbia i giusti permessi, devono essere `600` (ovvero lettura e scrittura per l'owner, nessun permesso per gli altri), ecco come cambiare permessi nel caso: 

```bash
chmod 600 ~/.ssh/id_algoritmo.pub
```



#### Eventuali problematiche: Lato server

In caso di altri problemi potete verificare le impostazioni lato server, aprite il file di configurazione di sshd ( `/etc/ssh/sshd_config`) e cercate le tre impostazioni: 

- `RSAAuthentication` e verificate sia decommentata (senza carattere `#`) e con valore `yes`
- `PubkeyAuthentication` e verificate sia decommentata (senza carattere `#`) e con valore `yes`
- `AuthorizedKeysFile` e verificate sia decommentata (senza carattere `#`) e con valore `.ssh/authorized_keys`

se qualcuna delle tre impostazioni non dovesse esserci, potete anche scriverla manualmente.



Se ancora dovesse dare problemi, create a mano il file delle autorizzazioni: 
```bash
touch ~/.ssh/authorized_keys
```



### sshpass

Se qualcosa dovesse andar male con il primo metodo, potete usare `sshpass`. Questo software (normalmente scaricabile dai repository) consente di inserire manualmente nel comando stesso la password (oppure specificarlo tramite file)



#### Installare sshpass su Ubuntu/Debian

```bash
apt install sshpass
```

#### Installare sshpass su Fedora

```bash
dnf install sshpass 
```

#### Installare sshpass su Archlinux

```bash
pacman -S sshpass
```

#### Uso di sshpass

Potete usarlo in modalità "manuale" così: 
```bash
sshpass -p "latuapassword" ssh user@ind.iri.zzo.ip
```

Ovviamente potete usarlo anche per altri comandi che implicano ssh, come scp: 
```bash
sshpass -p "latuapassword" scp file user@ind.iri.zzo.ip
```

Ma alcuni di voi potranno pensare che scrivere manualmente la password (che poi rimane in chiaro su `bash_history`) non sia proprio la migliore delle idee, ecco perché sshpass offre un altra possibilità, ovvero specificare un file da cui prendere una password: 
```bash
sshpass -f /percorso/file/password ssh user@ind.iri.zzo.ip
```

