---
class: post
title: '#howto - Installazione  di Pi-Hole su Raspberry Pi'
description: "Pi-Hole è un software che permette il blocco pubblicitario direttamente via router, rendendo la rete pulita senza la nec.."
date: 2020-03-14
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**Pi-Hole** è un software che permette il blocco pubblicitario direttamente via router, rendendo la rete pulita senza la necessità di utilizzare strumenti sul singolo dispositivo.

Uno dei punti forza di questo programma è quello che per usarlo basta avere un qualsiasi Raspberry Pi (è consigliato un Pi 0w grazie ai suoi consumi ridotti) e un router che permetta la modifica dei DNS.

## Installazione

Per prima cosa ci dobbiamo connettere al nostro Raspberry Pi tramite SSH ed impartire il seguente comando per ottenere ed eseguire lo script d'installazione:

```bash
curl -sSL https://install.pi-hole.net | bash
```

Seguirà a schermo la procedura guidata la quale vi aiuterà ad impostare tutto il necessario per far funzionare Pi-Hole, scaricando le blacklist aggiornate ed il software necessario.

Una volta completato il processo di installazione, possiamo accedere al pannello di Pi-Hole visitando l'indirizzo IP del Raspberry Pi alla porta `8080` di default. Dopodichè, ci troveremo davanti ad una schermata simile alla seguente:

![Pannello Pi-Hole](storage/Schermata%20da%202020-03-05%2020-12-45.png)

## Impostazione DNS su Router

Per rendere operativo il tutto dobbiamo impostare i DNS sul nostro router. Questa procedura può variare in base al modello e software del router.

Nello specifico dobbiamo entrare nella sezione **DHCP Server Settings** ed impostare come DNS primario l'IP del nostro Raspberry Pi e come secondo DNS `8.8.8.8`.

## Impostazione DNS sui dispositivi (opzionale)

Nel caso in cui non fosse possibile modificare questi record DNS direttamente dal router, possiamo effettuare l'operazione sul singolo dispositivo in cui vogliamo rimuovere le pubblicità, di seguito la lista completa delle procedure per sistema operativo.

### iOS

Dalle Impostazioni portiamoci alla voce **WiFi** e selezioniamo la nostra rete, successivamente selezioniamo la voce **Configura DNS > Manuale** ed inseriamo come primo DNS l'indirizzo IP del Raspberry Pi e come secondario `8.8.8.8`.

### Android

La procedura cambia in base alla ROM poichè alcune danno la possibilità di cambiare direttamente il DNS, mentre per altre non è così (es. EMUI), in questo caso vi consiglio di usare [quest'app](https://play.google.com/store/apps/details?id=com.burakgon.dnschanger&hl=it) e inserire come primo parametro l'IP del Pi e come secondo `8.8.8.8`.

### Linux

Come per Android, anche qui la procedura varia da distribuzione a distribuzione. Cercando di essere il più generico possibile, ci dobbiamo portare al pannello Impostazioni di Sistema, e nella voce **Reti** selezioniamo la nostra rete e modifichiamo i DNS di questa, inserendo come primo l'indirizzo IP del Pi e come secondo `8.8.8.8`.

## Conclusione

Abbiamo installato con successo Pi-Hole. Per controllare che tutto stia andando per il verso giusto possiamo usare il comando `pihole status`, il quale ritornerà come output lo stato del processo ed eventuali errori.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).