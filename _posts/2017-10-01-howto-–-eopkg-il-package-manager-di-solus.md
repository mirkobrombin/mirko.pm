---
title: '#howto – Eopkg: il package-manager di Solus'
description: "Solus per chi non lo sapesse,  nasce nel 2011 su idea di Ikey Doherty, che era stato in precedenza uno dei.."
date: 2017-10-01
layout: post
author: Giuliano Z.
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Solus per chi non lo sapesse,  nasce nel 2011 su idea di Ikey Doherty, che era stato in precedenza uno dei principali sviluppatori di Linux Mint. Al momento del fork di Cinnamon, però, all'interno del team di sviluppo ci fu una spaccatura profonda fra lui e Clement Lefebvre che culminò con la scissione.

Dopo lo sviluppo travagliato di una distro basata su Debian, Solus nel 2014 viene riscritto FROM SCRATCH e trova la sua strada. Dalla versione 3.0 esistono tre versioni di Solus: La principale con Budgie (basato su Gnome, riscritto da zero in migrazione verso le librerie QT), una secondaria con MATE, la terza e ultima arrivata con Gnome Shell. Dopo questa piccola introduzione, veniamo a noi.

Solus per la gestione dei pacchetti usa un gestore poco conosciuto ai più, dal nome eopkg, il cui funzionamento è estremamente semplice per la gestione ordinaria del sistema. In realtà questo sistema di gestione dei pacchetti risulta essere molto potente e flessibile, basato sul vecchio pisi di PARDUS completamente riscritto da zero.

## Gestione sistema

Vediamo i comandi per una gestione ordinaria del sistema. Per installare un pacchetto da terminale digitiamo:

    sudo eopkg install nome-pacchetto

Per rimuovere un pacchetto:

    sudo eopkg remove nome-pacchetto

Per reperire informazioni su un determinato pacchetto:

    sudo eopkg info nome-pacchetto

Per aggiornare il sistema, prima aggiorniamo i repo con il comando:

    sudo eopkg update-repo

Poi aggiorniamo il sistema con:

    sudo eopkg upgrade

Per aggiornare un solo pacchetto:

    sudo eopkg upgrade nome-pacchetto

## Gestione repository

Passiamo ora alla gestione dei repository. I seguenti comandi sono da utilizzare con la massima attenzione e sopratutto si ricorda che l'aggiunta di repo non sicuri e/o non ufficiali compromette la stabilità e la funzionalità del sistema in uso. Verificare la lista dei repository inseriti, quali sono abilitati e quali disabilitati:

    sudo eopkg list-repo

aggiungere un repo:

    sudo eopkg add-repo nome-repo indirizzo-repo

rimuovere un repo:

    sudo eopkg remove-repo nome-repo

abilitare un repo:

    sudo eopkg enable-repo nome-repo

disabilitare un repo:

    sudo eopkg disable-repo nome-repo

## Package manager

Passiamo alla "pulizia" del package manager: per pulire la cache:

    sudo eopkg delete-cache

  Spero di essere stato esauriente, naturalmente questi sono i comandi di base per iniziare a gestire il sistema, preso dimestichezza con questi non dimenticate di chiedere l'ordine dei comandi da impartire a eopkg per conoscere alla perfezione questo sistema semplice ma senza dubbio moderno ed efficace.

    eopkg help

Vi consiglio di copiare questi comandi su carta e/o stamparli e tenerli sempre a portata di tastiera. Per gli utilizzatori più esperti esistono i comandi per creare, compilare e installare un pacchetto in modo simile a quanto avviene con Gentoo utilizzando eopkg apposito (che non riporto in quanto potrebbe creare problemi ad un'utenza poco esperta: se siete in grado di farlo sarete anche in grado di trovarlo!).  

Revisione di Giuliano Zamboni