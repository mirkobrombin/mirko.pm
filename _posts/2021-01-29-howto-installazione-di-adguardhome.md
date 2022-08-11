---
title: '#howto - Installazione e configurazione di AdGuardHome'
date: 2021-01-29
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
**AdGuardHome** è la variante gratuita self-hostabile di AdGuard, un software commerciale di AdBlocking. AdGuardHome è simile ad Pi-Hole siccome entrambi funzionano da DNSBlocker, ovvero indirizzano tutte le richieste che facciamo al nostro server DNS per poi bloccare annunci o trackers.

## Installazione di AdGuardHome
Per AdGuardHome abbiamo due possibilità di installazione: possiamo scegliere se usare **Docker** o usare il **metodo standard**. In ogni caso, li esamineremo entrambi.

### Docker
Per installare AdGuardHome su Docker, dopo aver installato il software sul nostro PC, dovremo prima effettuare il `pull` della repo:

```bash
docker pull adguard/adguardhome
```

Creiamo successivamente due cartelle, una per i file eseguibili di AdGuardHome e una per quelli di configurazione (il nome può essere uno qualsiasi).

Dopo aver creato le cartelle, avviamo AdGuard attraverso Docker con questi comandi:

```bash
docker run --name adguardhome \
    -v /cartella/eseguibili:/opt/adguardhome/work \
    -v /cartella/config:/opt/adguardhome/conf \
    -p 53:53/tcp -p 53:53/udp \
    -p 80:80/tcp -p 3000:3000/tcp \
    -p 67:67/udp -p 68:68/tcp -p 68:68/udp \
    -p 443:443/tcp \
    -p 853:853/tcp \
    -d adguard/adguardhome
```

Le porte che abbiamo indicato nel comando servono per il web, ma non solo. Successivamente, potremo avviare, fermare o rimuovere AdGuardHome con i seguenti comandi:
* Per avviare: `docker start adguardhome`
* Per fermare: `docker stop adguardhome`
* Per rimuovere: `docker rm adguardhome`

### Installazione standard
Se non vogliamo usare Docker per installare AdGuardHome, è sempre possibile utilizzare l'eseguibile fornito dagli sviluppatori.

Scarichiamo dalla repo del software l'ultima versione di AdGuardHome ed estraiamola:

```bash
wget https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz
tar xvf AdGuardHome_linux_amd64.tar.gz
```

Una volta che abbiamo scompattato l'archivio possiamo entrare dentro la cartella di AdGuardHome ed eseguire il seguente comando:

```bash
./AdGuardHome -s install
```

Una volta che AdGuardHome si avvierà, sarà possibile usare vari comandi per effettuare diversi processi:
* `AdGuardHome -s uninstall` - Disinstalla AdGuardHome
* `AdGuardHome -s start` - Avvia il servizio
* `AdGuardHome -s stop` - Ferma il servizio.
* `AdGuardHome -s restart` - Riavvia il servizio
* `AdGuardHome -s status` - Controlla lo stato del servizio.

## Configurazione
Una volta che abbiamo installato AdGuard andiamo sul nostro browser e scriviamo l'indirizzo `http://1.2.3.4:3000/`.

> L'IP 1.2.3.4 dovrà essere sostituito con l'IP dove si trova AdGuardHome

Se tutto funziona come previsto, il browser dovrebbe presentarci una schermata di installazione di AdGuardHome come mostrato nell'immagine di seguito:

![Screenshot%202021 01 26%20at%2016.44.03](storage/Screenshot%202021-01-26%20at%2016.44.03.png)

Andiamo avanti, e ci verrà chiesto dove vogliamo che vengano hostate l'interfaccia amministratore e il DNS Server.

![Screenshot%202021 01 26%20at%2016.47.18](storage/Screenshot%202021-01-26%20at%2016.47.18.png)

Dopo aver creato un nostro account, visitiamo `http://1.2.3.4:80`, effettuiamo l'accesso e dovremmo trovarci di fronte ad una schermata riepilogo di AdGuardHome.

![Screenshot%202021 01 26%20at%2016.54.26](storage/Screenshot%202021-01-26%20at%2016.54.26.png)

## Conclusione

Se abbiamo installato AdGuardHome, è arrivato il momento di cambiare i DNS del nostro PC, e per farlo potete seguire questa [guida](https://linuxhub.it/articles/howto-cambiare-i-dns).

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.