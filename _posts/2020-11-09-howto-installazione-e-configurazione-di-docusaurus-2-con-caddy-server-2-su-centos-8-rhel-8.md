---
title: '#howto - Installazione e configurazione di Docusaurus 2 con Caddy Server 2 su CentOS 8/RHEL 8'
date: 2020-11-09
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  - github  - rhel  - caddy  - bash
---
**Docusaurus** è una applicazione in NodeJS con cui è possibile realizzare documentazioni, ma non solo: è infatti possibile creare veri e propri siti web e blog.

In questa guida vedremo come installare Docusaurus 2 con Caddy Server 2 su CentOS 8 e RHEL 8.

> In questo articolo trattiamo la seconda versione del software. Nel momento in cui scrivo, questa è in fase di svilupppo e distribuita come Alpha "potenzialmente instabile".

## Installazione
In questa guida dividiamo il procedimento in due parti:
- la *compilazione* sulla nostra macchina di sviluppo
- la *distribuzione* sul nostro server Centos 8/RHEL 8

Questa suddivisione è consigliata per evitare di portare il progetto sul server in produzione, in questo modo terremo solo la versione compilata e non avremo bisogno delle dipendenze di NodeJS.

### NodeJS
Prima di tutto abbiamo bisogno di NodeJS sulla nostra piattaforma di sviluppo. Come soluzione definitiva per l'intallazione, useremo NVM (Node Version Manager). Possiamo procedere con lo script automatizzato:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Una volta terminato il processo, potrebbe essere necessario riavviare la shell per poter usufruire del comando.

Tramite il comando `nvm`, installiamo l'ultima versione LTS (Long-term Support):

```bash
nvm install --lts
nvm use --lts
```

e verifichiamo l'effettiva installazione:

```bash
nvm run node --version
```

### Docusaurus
Per scaricare Docusaurus, dirigiamoci in un percorso pulito, dove è possibile generare il progetto. Procediamo quindi con `npx`:

```bash
npx @docusaurus/init@next init il-mio-progetto classic
```

dove:
- **il-mio-progetto** è il nome del percorso che vogliamo dare al progetto
- **classic** il template che andremo ad usare (fate riferimento alla [documentazione](https://v2.docusaurus.io/docs) ufficiale per altri template)

Una volta ultimato il processo ci troveremo davanti ai file del nostro nuovo progetto. A quel punto è possibile lavorarci tramite il nostro editor (o IDE) preferito.

Possiamo avviare un server per sviluppatori da cui visualizzare la nostra installazione:

```bash
npm run start
```

### Caddy
Spostiamoci un momento sul server che useremo per la distribuzione dei file ed installiamo/configuriamo Caddy. Vi rimando alla [guida specifica](https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8) avendo già trattato l'argomento.

Creiamo una nuova configurazione:

```json
il_mio_sito.ex {
	root * /path/il_mio_sito.ex/public
    try_files {path}.html {path}
    file_server
}
```

dove:
- *il_mio_sito.ex* è il dominio che vogliamo dedicare all'installazione
- */path/il_mio_sito.ex/public* il percorso dove andremo a posizionare i file

E riavviamo caddy:

```bash
systemctl restart caddy
```

## Build e distribuzione
Sul nostro PC, portiamoci alla posizione dei file del progetto e avviamo il processo di compilazione:

```bash
npm run build
```

questo andrà a generare tutti i file statici da poter distribuire via Caddy.

Carichiamo sul server, nella posizione configurata nel Caddyfile, i file generati nella path `/build` del progetto e sistemiamo i permessi:

```bash
find ./ -type d -exec chmod 755 {} +                                     
find ./ -type f -exec chmod 644 {} +
```

Ora, visitando il dominio precedentemente configurato, ci troveremo davanti alla nostra installazione di Docusaurus.

Ad ogni modifica, è necessario ripetere il processo di *build* e caricare nuovamente i file.

Per ogni dubbio, chiarimento o curiosità ci trovate al [nostro gruppo Telegram](https://t.me/linuxpeople).