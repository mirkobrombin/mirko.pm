---
title: '#howto - Usare e comprendere Systemd' 
published: 2021-05-17
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- bash 
- systemd 
---

**Systemd** rappresenta nel mondo linux, uno degli strumenti di gestione centralizzata di init, demoni, librerie ed amministrazione del sistema più completo nel panorama. 

Non entreremo del merito del perché sia uno dei software più controversi, ma impareremo ad usarlo e capirne i meccanismi base.

## La suite di tool che offre

Avvio dei processi, log, monitoraggio del sistema, della sessione e anche dei tempi di avvio. Systemd ha una serie di tool che utilizzati possono analizzare tutti questi aspetti, vediamo quali sono i comandi da terminale che possiamo utilizzare: 

- systemctl
- journalctl
- systemd-notify
- systemd-analyze
- systemd-cgls
- systemd-cgtop
- loginctl
- systemd-nspawn

Tra questi approfondiremo *systemctl*, *journalctl*, *systemd-analyze* e *loginctl*.


## Abilitare, avviare e gestire i servizi con systemctl

Il tool sicuramente più utilizzato: avvia i servizi  e ha alcune funzioni per la gestione della sessione.

### Cosa sono i servizi

I servizi, o demoni di sistema, sono software che per lo più girano di sottofondo generando e gestendo l'ambiente in cui l'utente e i programmi operano.

Tutti i servizi si trovano nella cartelle cartelle contenute in `/etc/systemd` e `/lib/systemd`

Normalmente i servizi sono nella cartella `system`; alcuni servizi, attivabili non a livello di sistema ma solo in sessione da un utente, son contenute nelle cartella `user`.

#### Attivare e disattivare i servizi

Un servizio **attivato** è un servizio che si avvia con il sistema, per farlo:  

```
systemctl enable nomeservizio
```

Può essere poi disattivato con:

```
systemctl disable nomeservizio
```

#### Avviare e fermare i servizi

Per avviare un servizio utilizziamo l'opzione `start`:

```
systemctl start nomeservizio
```

invece possiamo interrompere il servizio utilizzando l'opzione `stop`:

```
systemctl stop nomeservizio
```

infine con `restart` possiamo riavviare il servizio:

```
systemctl restart nomeservizio
```

Ma ancora meglio, una delle opzioni più utili è sicuramente `enable --now`:

```
systemctl enable --now nomeservizio
```

che esegue `enable` e `start` in contemporanea


#### Il caso `--user`

Se il servizio è in una directory **user** e non *system*, può essere avviato usando il parametro `--user`. Normalmente si usano questi servizi per limitare le tipologie di utenti che possono avviare quel servizio e, più nel particolare, per far sì che alcuni servizi possano essere abilitati senza permessi di amministratore.

### Scrivere un servizio

Possiamo scrivere un servizio Systemd noi stessi, posizioniamoci nella cartella `/etc/systemd/system` e scrivendo un file che ha come estensione `.service` 

Vediamo la struttura base di un servizio molto semplice che avvia uno script:

```properties
[Unit]
Description=Scrivere una descrizione

[Service]
Type=simple
ExecStart=/percorso/eseguibile

[Install]
WantedBy=multi-user.target
```

lo script indicato nella sezione `ExecStart` deve essere eseguibile.

Per ulteriori informazioni su come scrivere un servizio systemd abbiamo già una guida dedicata [qui](https://linuxhub.it/articles/howto-creare-un-servizio-o-un-timer-di-systemd/)


### Altre funzioni : avvio e sessione

Systemctl può gestire attività semplici di gestione della sessione, vediamo quali: 

- spegnere ( `poweroff` )
- riavviare ( `reboot` )
- ibernare ( `hibernate` )  
- sospendere ( `suspend` )
- sospensione ibrida ( `hybrid-suspend` )
- sospendi e iberna dopo un lasso di tempo ( `suspend-then-hibernate` )

per le funzioni di ibernazione, dovete avere una swap funzionante e configurare il grub per la ripresa dell'ibernazione dal file di swap

Scendendo nel particolare è addirittura possibile riavviare direttamente su interfaccia EFI se disponibile: 

```
systemctl reboot --firmware-setup
```

### Tabella dei comandi systemctl

La seguente tabella è stata presa da https://github.com/PsykeDady/Archlinux_installazione e rappresenta un riassunto delle funzioni principali di `systemctl` e relativi comandi

|       sudo        | comando                                       | spiegazione                                                  |
| :----------------: | :-------------------------------------------- | :----------------------------------------------------------- |
| ✅ | `systemctl enable <servizio>`                 | abilita il servizio all’avvio, che viene quindi attivato ogni qualvolta accedete |
| ✅ | `systemctl start <servizio>`                  | avvia immediatamente il servizio                             |
| ✅ | `systemctl restart <servizio>`                | spegne e riavvia il servizio                                 |
| ✅ | `systemctl stop <servizio>`                   | spegne il servizio, contrario di start                       |
| ✅ | `systemctl disable <servizio>`                | disabilita il servizio, contrario di enable                  |
| ✅ | `systemctl status <servizio>`                 | controlla lo stato del servizio, se è attivo, in errore o spento |
|| `systemctl poweroff`                          | spegne il sistema                                            |
|| `systemctl reboot`                            | riavvia il sistema                                           |
|| `systemctl hibernate`                         | iberna il sistema, da usare solo se avete  attivato l’ibernazione in modo corretto |
|| `systemctl suspend`                           | sospende il sistema                                          |
|| `systemctl suspend-then-hibernate`            | sospende per un certo periodo di tempo.  Poi iberna          |
|| `systemctl hybrid-sleep`                      | Sospende e iberna il sistema. Così che se la batteria si scarica, il pc è comunque ibernato |


## Monitorare i servizi e i log con journalctl

Attraverso `journalctl` possiamo verificare lo stato dei servizi attivi ed eventualmente i loro errori, ma anche vari log degli eventi di sistema. 
Richiamando `journalctl` possiamo guardare il registro di tutte le attività e scorrerlo con una text interface stile less.


### Analizzare il log per specifici boot

Possiamo specificare di voler leggere il log di una specifica sessione con il parametro `-b` e specificando l ordine di boot subito dopo. 
Gli ordini partono da `0` che sottointende poi *il boot attuale*. 
Ad esempio `journalctl -b 0` restituirà il log a partire *da quando avete aperto il pc* fino allo stato attuale. 

Aumentando il numero, tornerete dietro nella storia: 

```
journalctl -b 1
```

Preleverà solo i log del boot precedente a quello attuale, fino a quando non è stato chiuso il pc.

Potete chiedere una lista di tutte le sessioni memorizzate con:

```
journalctl --list-boots
```

### Analizzare il log per range di data

Si può chiedere di analizzare specifici intervalli temporali, specificando una data di inizio, di fine o entrambe. 

Per imporre un *limite inferiore di data* ad un log bisogna specificare l'opzione `--since` e quindi la data, in formato `"aaaa-mm-gg HH:MM:SS"`

Per imporre invece un *limite superiore di data* ad un log bisogna specificare l'opzione `--until` e quindi la data.

Ad esempio riduciamo la finestra temporale tra il *2021-04-30 ore 00:01* alle *2021-05-02 ore 13:01*

```
journalctl --since "2021-04-30 00:01" --until "2021-05-02 13:01"
```

> **Note** : ovviamente il log effettivo partirà poi dalla prima occorrenza memorizzata del registro fino all'ultima, se non vi è nulla in data *2021-04-30 ore 00:01* ma i log iniziano dal *2021-05-01 ore 01:00* la finestra temporale si sposterà in automatico



### Analizzare il log di uno specifico servizio 

Possiamo analizzare anche il log per uno specifico servizio, semplicemente digitando il nome del servizio dopo il parametro `-u`

```
journalctl -u servizio
```

Ne possiamo concatenare anche più servizi in uno stesso comando 

```
journalctl -u servizio -u servizio2
```

### Filtrare le priorità 

Un altra funzione utile è quella di poter filtrare le priorità attraverso il parametro `-p`: questo ci permetterà di visualizzare solo messaggi di errore o solo di warning o solo console log. 
I livelli di priorità sono:   

0. emergenza
1. alert
2. criticità
3. errori
4. avvisi (warning) 
5. notiifiche (notice) 
6. informazioni
7. debug

Ad esempio, per visualizzare criticità ed errori scriviamo:

```
journalctl -p 2 -p 3
```

### Varie altre funzioni 

Tutte le funzioni descritte possono essere usate insieme, per una ricerca molto dettagliata. Inoltre possiamo chiedere a journalctl di spostarci direttamente all'ultimo log disponibile con il parametro `-e` e di essere molto dettagliato con il parametro `-x`.
Vediamo un comando completo: 

```
journalctl -p 3 -b 1 --since "2021-05-01" -xeu NetworkManager
```

Abbiamo così chiesto a journalctl di prelevare i log di errore, del boot precedente, a partire dal 2021 05 01 e solo di NetworkManager


## Analizzare i servizi e i tempi di avvio con Systemd-Analyze

Attraverso `systemd-analyze` si possono analizzare alcuni aspetti delle performance del sistema. 

Digitandolo con il parametro `time` o senza alcun parametro (viene sottointeso):

```
systemd-analyze time
```

ci verranno restituiti in output quattro tempi diversi (tre in sistemi senza UEFI) che indicano tempo per il raggiungimento dal grub all'avvio del kernel, il tempo di avvio del kernel, quindi quello degli altri servizi e infine quello grafico se esiste.

Facciamo un passo in più e analizziamo quanto ogni singolo servizio ci ha messo ad avviarsi con: 

```
systemd-analyze blame
```

> **Attenzione** a decifrare questi dati, i processi possono essere eseguiti anche parallelamente e il complessivo dei tempi stampati non è anche il complessivo dei tempi di avvio, non tutti i processi bloccano il boot. 

Con il comando `dump` farete una lista molto dettagliata di tutti i servizi e con quali opzioni sono avviati 

Altri due comandi molto utili sono  `plot` e `dot` che creano dei grafici esplicanti lo stato del sistema. 

In particolare:

```
systemd-analyze plot > file.svg
```

Serve a generare un file svg contenente tutti i comandi `systemd-analyze time ` e `systemd-analyze blame `

Con `systemd-analyze dot  | dot -T svg > grafico2.svg` viene generato un grafo delle dipendenze di avvio.


## Le sessioni utente e loginctl

Potete infine gestire alcuni aspetti che riguardano la sessione utente con `loginctl`

I comandi possibili sono

- `loginctl list-sessions` ( fa una lista delle sessioni )
- `loginctl lock-session ID` ( blocca lo schermo della sessione con l'id passato in input )
- `loginctl unlock-session ID` ( sblocca lo schermo della sessione con l'id passato in input )
- `loginctl lock-sessions` ( blocca lo schermo di tutte le sessioni )
- `loginctl unlock-sessions` ( sblocca lo schermo di tutte le sessioni )
- `loginctl kill-user nomeutente` ( equivalente a `pkill -u nomeutente`, termina brutalmente la sessione )


Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
