---
title: '#howto - Cambiare i DNS su Linux'
date: 2021-01-18
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Per chi desidera una connessione reattiva e veloce (o per chi volesse visitare dei siti bloccati dal nostro operatore) i **DNS** non sono un parametro da sottovalutare: essi, infatti, svolgono un ruolo molto importante nella navigazione di tutti i giorni.

In questa guida vi spiegheremo come cambiare DNS su Linux tramite terminale, e, ancora meglio, direttamente dal **proprio router con OpenWRT** per applicare le modifiche su tutta la rete (ove possibile).

## Configurazione dei DNS

Prima di tutto dobbiamo scegliere che DNS usare sul nostro sistema. Tra i più popolari troviamo quelli di Google, Cloudflare e UncensoredDNS, ma ce ne sono molti altri ancora:

DNS di **Google**:

`8.8.8.8`
`8.8.4.4`

DNS di **Cloudflare**:

`1.1.1.1`
`1.0.0.1`

DNS di **UncensoredDNS**:

`91.239.100.100`
`89.233.43.71`

Dopo che abbiamo scelto che DNS utilizzare, con il nostro editor di testo preferito apriamo da terminale il file `/etc/resolv.conf`:

```bash
vim /etc/resolv.conf
```

Alla fine del file aggiungiamo successivamente queste due stringhe, dove in IP Primario e secondario dovete inserire, rispettivamente, l'IP primario e secondario del provider di DNS che avete scelto di usare:

```
nameserver <IP Primario del DNS>
nameserver <IP Secondario del DNS>
```

Per fare un esempio, se vogliamo usare i DNS di Google si procederà in questo modo:
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

Può accadere che al riavvio del sistema, nel caso in cui il programma sia presente, Network Manager scelga di rimuovere i DNS da noi impostati in precedenza. Possiamo verificarlo cliccando sull’applet di Network Manager e scegliendo l’opzione *“Informazioni di Connessione”*.

Nel caso in cui dovesse accadere, dovremo modificare un altro file posizionato in `/etc/dhcp/dhclient.conf`. Apriamo il file con il nostro editor di testo preferito:

```bash
vim /etc/dhcp/dhclient.conf
```

Andiamo a cercare la seguente riga:

```bash
#prepend domain-name-servers 127.0.0.1;
```

Cancelliamola e inseriamo:
```bash
prepend domain-name-servers <IP primario del DNS>, <IP secondario del DNS>;
```

Salviamo il file e riavviamo il nostro PC. Dopo il riavvio, i DNS dovrebbero essere impostati correttamente e NetworkManager non dovrebbe più ripristinarli.

### OpenWRT

Se possiediamo un router con **OpenWRT** è possibile modificare le impostazioni dei DNS direttamente da lì, cosi da poter avere tutti i nostri dispositivi connessi alla rete con i DNS da noi preferiti (utile nel caso in cui avessimo un Pi-Hole e volessimo indirizzare tutto il traffico a quest'ultimo).

#### Modifica dei DNS su OpenWRT

Accediamo all'interfaccia OpenWRT del nostro router e andiamo su `Network` -> `Interfaces`. Successivamente selezioniamo l'interfaccia dove vogliamo avere i DNS personalizzati e clicchiamo sul tasto "Edit".

![Screenshot 2021 01 16 at 16 52 16](storage/Screenshot_2021-01-16_at_16_52_16.png)

Dopo aver cliccato su "Edit", scorriamo la pagina finchè non troviamo la voce "Use custom DNS servers". Qui sarà possibile aggiungere quanti server DNS personalizzati vogliamo cliccando sul tasto "+" come è possibile vedere nelle immagini d'esempio.

![Screenshot%202021 01 16%20at%2017.06.32](storage/Screenshot%202021-01-16%20at%2017.06.32.png)

### Conclusione

Dopo aver seguito questi procedimenti avremo il nostro DNS personalizzato pronto e funzionante, su una macchina singola o su tutta la rete. 

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.