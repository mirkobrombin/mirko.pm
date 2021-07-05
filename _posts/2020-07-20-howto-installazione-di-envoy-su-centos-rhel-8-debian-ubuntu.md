---
title: '#howto - Installazione di Envoy Proxy su Centos/RHEL 8/Debian 8+/Ubuntu 16.04+'
date: 2020-07-20
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  - bash
---
**Envoy** è un proxy leggero e moderno ad alte prestazioni. Si tratta di uno strumento paragonabile ad altri load balancers come **NGINX** e **HAProxy**.

In questa guida vediamo come installarlo tramite il metodo offerto da *GetEnvoy* che permette una facile installazione.

## Installazione
L'installazione avviene tramite le repository di *GetEnvoy*, procederemo quindi all'aggiunta di queste nel sistema e successivamente all'installazione del pacchetto.

### Centos/RHEL 7
Per prima cosa dobbiamo aggiungere la repository ufficiale del progetto *GetEnvoy*, possiamo farlo tramite *yum-config-manager* che andiamo ora ad installare assieme a *yum-utils*:

```bash
yum install yum-utils
```

Proseguiamo quindi con la repository:

```bash
yum-config-manager --add-repo https://getenvoy.io/linux/centos/tetrate-getenvoy.repo
```

infine installiamo il pacchetto *getenvoy-envoy* via `yum`:

```bash
yum install getenvoy-envoy
```

### Debian 8+, Ubuntu 16.04+
Su Debian/Ubuntu è necessario abilitare le repository di terze parti installando `software-properties-common`:

```bash
apt install software-properties-common
```

È necessario importare la chiave *gpg* della repository. Prima di tutto installiamo alcune dipendenze necessarie:

```bash
apt install apt-transport-https ca-certificates curl gnupg-agent
```

quindi importiamo la chiave:

```bash
curl -sL 'https://getenvoy.io/gpg' | sudo apt-key add -
```

ed aggiungiamo la repository:

```bash
sudo add-apt-repository "deb [arch=amd64] https://dl.bintray.com/tetrate/getenvoy-deb \
$(lsb_release -cs) \
stable"
```

infine aggiorniamo l'indice delle repository ed installiamo il pacchetto:

```bash
apt update
apt install getenvoy-envoy
```

## Verifica
Possiamo verificarne la corretta installazione in entrambe le distribuzioni tramite l'opzione `--version` del comando `envoy`:

```bash
envoy --version
```

il quale deve restituire la versione installata di envoy, la *1.15.0* nel momento in cui scrivo.

Consiglio di proseguire la lettura con la <a href="https://www.envoyproxy.io/docs/envoy/latest/start/start">documentazione ufficiale</a> offerta da *envoy*.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).