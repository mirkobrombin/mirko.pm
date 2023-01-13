---
class: post
title: '#howto - Creare un servizio o timer di systemd'
description: "In questa guida vediamo come programmare un servizio per systemd, il tutto cercando di riassumere e semplificare le già abbo.."
date: 2020-01-11
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ubuntu  
  - systemd  
  - bash
---
In questa guida vediamo come programmare un servizio per systemd, il tutto cercando di riassumere e semplificare le già abbondanti documentazioni della freedesktop ( [qua per la sezione service](https://www.freedesktop.org/software/systemd/man/systemd.service.html), [qua per il log degli eventi](https://www.freedesktop.org/software/systemd/man/systemd.exec.html#) e [qua per unit e install](https://www.freedesktop.org/software/systemd/man/systemd.unit.html) )

## Un generico service

Vediamo innanzitutto la struttura di un generico service. I servizi si dividono in tre sezioni:

*   **Unit**, descrive il servizio, il modo in cui è avviato, i processi che dipendono da esso o quelli da cui dipende, il modo in cui si relaziona al sistema.

*   **Service**, descrive il comando o lo script eseguito, come viene eseguito, quante volte e quando considerarlo un fallimento.

*   **Install**, ulteriori specifiche su come il sistema deve abilitare il servizio, eventuali alias con cui collegarlo, quante unità attiva con se e la cartella in cui verrà collegato.

Ogni sezione ha diverse opzioni disponibili, vediamo uno schema generico:

    [Unit]
    Description=una descrizione
    After=lista di servizi che vengono prima

    Before=lista di servizi che vengono dopo

    Condition...=se non verificata, il servizio non viene eseguito 
    altro, esistono vari tipi di condition! ConditionHost,ConditionPathExist..etc

    [Service]
    Type=indica il tipo di servizio, simple, exec, forking, oneshot, dbus, notify o idle

    RemainAfterExit=true o false, indica se il processo deve rimanere in esecuzione anche dopo l'avvio

    ExecStart=qui inserite lo script o  il comando da eseguire 

    ExecStop=qui indicare ciò che viene eseguito quando viene terminato il processo

    Restart=indica se il processo deve essere eseguito più volte, ad esempio al successo, al fallimento, sempre... viene configurato con un timer (valori: no, on-success, on-failure, on-abnormal,on-abort,always...)

    RestartSec=tempo prima di fare restart

    TimeoutStartSec=indica quanto tempo deve bloccare l'avvio prima di dire che un servizio è o non è fallito

    TimeoutStopSec=idem di sopra ma con lo script eseguito in chiusura

    Standard...=StandardOutput e StandardError (sono due opzioni distinte), cioè dove vengono stampati errori o messaggi, i valori possono essere journal, tty, journal+console, file:/path/per/file (sarà cancellato se esiste), append:/path/per/file (aggiunge alla fine) e altri. Guardare il link sul logging

    [Install]
    WantedBy=indica la cartella in cui viene collegato il servizio

Tagliamo subito la testa al toro:

*   sono tutte necessarie? no!
*   ne esistono altre di opzioni? Sì, guarda i link di sopra

Inoltre potete mettere in alcune opzioni dei parametri speciali, ad esempio _%L che sta per log directory_, o _%n che indica il nome del file di service_, trovate tutto nelle documentazioni ufficiali.

## Servizio di avvio

Scriviamo ad esempio un servizio di <u>avvio</u> generico, studiamone la struttura, testiamolo e mettiamolo in funzione. Un po' come il vecchio file `/etc/rc.local` che forniva ubuntu nelle sue installazioni.

Innanzitutto scriviamo uno script che deve essere avviato ogni accensione, non importa cosa sia, ma **ricordate** che questo script <u>sarà avviato con privilegi elevati</u> (_root_).

Poniamo ad esempio che il file sia: `/etc/avvio`

All'interno ricordate che la prima riga deve essere`#!/bin/bash`

e dopo che avete finito lo script, dovete renderlo eseguibile`sudo chmod +x /etc/avvio`

Poi scrivete il file `/etc/systemd/system/avvio.service`

All'interno scrivete:

    [Unit]
     Description=Esegue /etc/avvio
     ConditionPathExists=/etc/avvio

    [Service]
     Type=oneshot
     ExecStart=/etc/avvio
     StandardOutput=journal

    [Install]
     WantedBy=multi-user.target

Non è difficilissimo da leggere, ma facciamo un riepilogo:

La sezione `[Unit]` fornisce una descrizione del servizio attraverso l'opzione **Description** e poi verifica che lo script da eseguire esista tramite **ConditionPathExist**.

La parte `[Service]` ci dice che il comando è **oneshot**, cioè viene semplicemente eseguito, Lo **StandardOutput** dice dove avverrà il log della riuscita o del fallimento (ed eventuali stampe), nel nostro caso il journal.

La parte `[Install]` ci dice che il file verrà eseguito nella cartella _multi-user_ tramite opzione **WantedBy**. Su questo spendo giusto qualche parolina per spiegare cosa sono i livelli di running:  
Nei sistemi Linux l'avvio è sottoposto a più fasi, detti livelli:

*   **livello 0** è il livello di spegnimento (_poweroff_ ), raggiunto quando il pc viene spento
*   **livello 1** livello di emergenza (_rescue_ ), è intermedio tra l'avvio del sistema hardware e quello software
*   da **livello 2** a **livello 4** si parla di livelli utente (_multi-user_ ), ed è la fase di avvio del nostro sistema
*   **livello 5** è il livello grafico (_graphic_ ), usato dal nostro display manager
*   **livello 6** è il livello di spegnimento o riavvio (_reboot_ ) in cui il sistema torna a livello 0

Il sistema dei livelli è stato ridefinito su systemd con i target, che ha aggiunto diversi stadi come lo sleep.target o il target network, [qua](https://www.freedesktop.org/software/systemd/man/systemd.special.html) trovate tutti i target.  
Ora dovrebbe esservi chiaro perchè, a meno che non sia uno script abbastanza importante, è difficile vedere services con target diversi da _multi-user.target_.

Testate il nuovo servizio scritto con: `systemctl start avvio.servizio`

Potete poi chiedere che venga avviato insiema al sistema con `systemctl enable avvio.service`

Sul nostro canale [feed](https://t.me/gentedilinux_feed/598) di telegram trovate altri trick per l'amministrazione dei servizi di systemd.

## Trim SSD all'avvio

Proviamo quindi a fare un servizio per fare il trim di un SSD all'avvio del PC:

    [Unit]
     Description=Esegue il trim dell'ssd

    [Service]
     Type=oneshot
     ExecStart=fstrim -v /
     StandardOutput=journal

    [Install]
     WantedBy=multi-user.target

Come notate non ho richiamato uno script, ma direttamente il comando che volevo eseguire.  
Ovviamente è la stessa cosa: potrei richiamare lo script `/etc/avvio.sh` dentro il quale ho scritto l'operazione, ma questo tendezialmente potrebbe portarmi a scrivere più operazioni nello stesso file. Inoltre, <u>È sempre bene separare il più possibile la lista di operazioni</u>, questo per avere sempre chiaro eventualmente i dettagli sul fallimento dell'avvio o anche semplicemente perché queste operazioni andranno ad aumentare i tempi di avvio del nostro sistema e potremmo voler sapere quali di queste operazioni vogliamo eliminare.

## systemd timer

Ad ogni service si può associare un timer, questa pratica potrebbe essere utile ad esempio se vogliamo che un determinato script venga ripetuto ogni settimana oppure ogni minuto piuttosto che ogni accesso. Associamo al nostro _avvio.service_ un `avvio.timer` e inseriamo anche questo nella cartella `/etc/systemd/system` Scriviamo al suo interno:

    [Unit]
    Description=un timer associato ad avvio.service

    [Timer]
    Unit=avvio.service
    OnUnitActiveSec=1us
    OnUnitInactiveSec=10s

    [Install]
    WantedBy=multi-user.target

Sulle sezioni **Unit** e **Install** ho poco da dire, sono le stesse di sopra. Diversa la sezione **Timer** però; in questa sezione dobbiamo inserire fondamentalmente alune informazioni: che unità far partire, quando il timer deve partire, ogni quanto il comando deve ripetersi.

Innanzitutto:

*   Unit=per indicare la unità da avviare

Per quanto riguarda i tempi di attivazione invece:

*   OnActiveSec=quanti secondi dopo l'avvio del timer
*   OnBootSec=quanti secondi dopo l'avvio del pc
*   OnStartupSec=quanti secondi dopo l'avvio di systemd (poco usato)
*   OnUnitActiveSec=quanti secondi dopo l'attivazione dell'unità di riferimento
*   OnUnitInactiveSec=quanti secondi dopo che l'unità diventa inattiva

Le unità di tempo impostabili sono

*   us =microsecondo
*   ms =millisecondo
*   s =sec
*   m =minuto
*   h =ora
*   d =giorno
*   w =settimana
*   M =mese
*   y =anno

I tempi di attivazione, se combinati, danno vita al tempo di ripetizione. Supponiamo di avere **OnActiveSec=1us** e **OnUnitInactiveSec=10s**, il timer una volta dato lo start da **systemd** si avvierebbe subito (_1 microsecondo_ ), terminerebbe il job, e l'unità diventerebbe inattiva attivando il timer da **10s**. Possiamo ovviamente usare anche **OnUnitActiveSec** con la stessa logica.

Possiamo attivare un giorno preciso di attivazione attraverso:

*   OnCalendar =valore in formato yyyy-MM-gg hh:mm:ss o simili

Abbiamo inoltre le alcune opzioni speciali:

*   AccuracySec =una volta raggiunto il timeout del timer, quanti secondi può ritardare l'opzione se il processo non può essere avviato subito
*   WakeSystem =se il sistema è sospeso, può svegliarlo se questo parametro è impostato a true
*   RemainAfterElapse =se il timer non ha un tempo di ripetizione, può rimanere in memoria se impostato a true

**Attenzione** i timer di systemd non sono precisi sotto il minuto, e hanno un delay anche notevole a volte. Ha più senso usare i timer di systemd per job settimanali o giornalieri che non devono essere precisi al secondo, anche impostando AccuracySec ho riscontrato ritardi.  
[Qui](https://www.freedesktop.org/software/systemd/man/systemd.timer.html) potete trovare ulteriori informazioni sui timer di systemd

Per avviare un servizio tramite un timer, non va avviato il servizio, ma il timer stesso: `systemctl start avvio.timer`

In caso di dubbi o particolari domande, potete entrare nel [gruppo Telegram](https://t.me/gentedilinux) ufficiale di linux/hub.