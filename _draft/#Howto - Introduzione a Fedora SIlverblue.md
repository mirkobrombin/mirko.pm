# #Howto - Introduzione a Fedora SIlverblue 

---

title: '#Howto - introduzione a Fedora Silverblue'

date: 04/03/22

layout: post 

author: MastroAlberto ( aka Alberto Bella ) 

author_github: al6263

published: false

tags:

- Container

- Fedora

---



## Introduzione

Oggi parleremo di una distribuzione molto particolare: **Fedora Silverblue**, ma che cosa differisce questa versione rispetto alla "classica" *Fedora workstation*?

la differenza principale è la sua struttura, difatti Fedora Silverblue è basata sul **os-tree**, ma cos'è? in questa guida andremo a ricoprire in modo generale tutti gli aspetti, le analogie e le differenze rispetto a fedora normale in modo da aver una infarinatura generale sul funzionamento del sistema.

Detto questo, iniziamo!



## Un sistema immutabile

la prima caratteristica fondamentale della distro è sicuramente la caratteristica della **immutabilità** del sistema, andiamo ad analizzarne il significato: 

Un sistema immutabile vale a dire che alla base il sistema risulta identico ad ogni altra installazione della stessa versione, infatti esso è in sola lettura, ciò vale a dire che di base un' installazione di Silverblue nel mio sistema è ( almeno sotto la scocca ) identica a una tua eventuale installazione nel tuo computer.



### Quali sono i vantaggi?

Un sistema con questa struttura ha diversi vantaggi in diversi ambiti, inanzitutto il sistema è più stabile rispetto al normale, comportando quindi una minor possibilità di incontrar bug gravi che rendano impossibile l'esecuzione ordinaria del sistema

inoltre basa molto il suo funzionamento su dei container, è infatti molto più facile anche lavorare su di essi, in ogni caso tutti i software che sono all'interno dei container sono isolati rispetto al resto, ciò ovviamente permette una maggior libertà di sviluppo senza avere il vincolo di essere cauti nel non "rompere tutto".



### Rollback? Ne abbiamo!

E se avessi bisogno di fare un rollback? No problem! 
Il package manager utilizzato in silverblue, *rpm-ostree* permette di fare tranquillamente un rollback allo stato precendente all'utilizzo del PM.

> *Difatti ci basterà selezionare l'opportuna voce in systemd-boot all'avvio*



## Bene, installiamo

in verità in questa sezione non c'è molto da dire, infatti l'installazione è pressoché identica a quella di Fedora Workstation ma dobbiamo fare delle precisazioni:

- **Il dual boot non è ufficialmente supportato!**

  > *Sebbene non lo sia ufficialmente i più temerari possono provare, potrebbe essere argomento di una prossima guida quindi stay tuned*

- **Attenti ai partizionamenti manuali!**

> *Attenti se proprio  dovete fare i partizionamenti manuali prestate molta attenzione, infatti Silverblue accetta solamente i seguenti punti di mount come partizioni:* 
>
> - *`/boot`*
>
> - *`/var`*
>
>   *Aggiungiamo ovviamente anche le sotto directory di `/var`*
>
>   - *`/var/home`  -> reale posizione di `/home`  in Silverblue difatti è un symlink a `/var/home`*
>   - `/var/log`
>   - `/var/containers`
>   - *E ovviamente* `/`

La vera attenzione da riporre è sull'installer difatti con partizionamento manuale, accetterà anche filesystm e punti di mount **non compatibili senza dare errore!**

Per quanto riguarda i filesystem al momento sono supportati solo btrfs e xfs come metodo di encrypting LWM.



## Step 3: pacchetti

Ok ora che siamo arrivati alla fine dell'installazione le cose si fanno interessanti, come funzionano i pacchetti?

Abbiamo tre metodi per installare i pacchetti:

- Flatpak
- Toolbox
- rpm-ostree

Vediamoli in dettaglio:



### Flatpak

La maggiore fonte di pacchetti è sicuramente Flatpak, difatti questo metodo di pacchettizzazione è perticolarmente prediletto in Silverblue 

Di default Flatpak è già abilitato ( bisogna comunque aggiungere flathub ma nulla di difficoltoso )

I pacchetti possono essere installati comodamente sia da GUI ( gnome-software ) che da CLI 

E se non trovo il pacchetto che cerco? Bene, non è un problema potete comunque ricorrere al prossimo metodo:



### Toolbox

Passiamo a un vero vantaggio di questa distro, Toolbox ovvero uno strumento che ci permette di creare dei container contenenti fedora 

Quali sono i vantaggi? 

Beh iniziamo sicuramente da DNF, difatti con i container abbiamo una versione di Fedora Workstation a nostra disposizione con tutte le repo relative ( possiamo anche abilitare RPM fusion )

All'interno di Toolbox tutte le applicazioni sono isolate dal sistema principale, sebbene porti dei vantaggi sopratutto in termini di sviluppo, è una soluzione meno adatta ad applicazioni lato GUI, infatti dovremo copiare il .desktop e modificarlo a dovere per poter vedere le nostre applicazioni girare come se fossero integrate, ma tranquilli arriverà una guida a proposito. 

Prestazionalmente invece, non ho notato alcun calo, c'è da dire però che per esempio Chromium  ritarda qualche secondo nell'apertura e su GNOME non si può appuntare nella dock ( piccolezze insomma )



### Rpm-ostree

Questo terzo metodo a differenza dei primi due si tratta di fare una vera e propria estensione dei pacchetti di cui è composto il sistema di base.

Il suo principale scopo è l'installazione di pacchetti con un interesse globale sul sistema, i quali non possono essere eseguiti all'interno dei container:

Possono essere per esempio driver, librerie o anche Desktop-Environment

la sintassi per installare di pacchetti è: 

```bash
$ rpm-ostree install <nome pacchetto>`
```

Questa operazione è comunque abbastanza lenta, abbiate pazienza in ogni caso, al termine del processo verrà richiesto un riavvio in modo da applicare le modifiche in stallo, se invece desiderate applicare live le modifche potete utilizzare una flag particolare:

```bash
$ rpm-ostree --apply-live install <nome pacchetto>` 
```
tuttavia non lo consiglio anche per una questione di sicurezza 

Possiamo anche fare un **override** del pacchetto, ovvero possiamo aver per esempio una casistica dove vogliamo testare una nuova versione di un determinato software; 

La sintassi:

```bash
$ rpm-ostree override replace <path to package>
```

E se volessimo rimuovere anche quello che stiamo sovrascrivendo, arrivando quindi a sostituirlo completamente? 

SI puo!

```bash	
$ rpm-ostree override remove <path to package>
```


E questo è tutto per oggi, abbiamo parlato in generale della distro se avete qualsiasi dubbio non esitate a scrivere nel [nostro gruppo telegram](t.me/linuxpeople)