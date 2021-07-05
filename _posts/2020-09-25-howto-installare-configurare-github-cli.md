---
title: '#howto - Installazione e configurazione di GitHub CLI'
date: 2020-09-25
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - ubuntu  - github  - bash  - ssh  - ssh  - bash
---
**GitHub CLI** è un nuovo tool in fase **beta** che permette di gestire repository presenti su GitHub, così come Pull Request e Issues, direttamente dal terminale senza dover visitare il sito web ogni qualvolta sia necessario.

In questa guida vedremo come installare GitHub CLI sulla propria repo e come configurarlo prima di poter effettuare qualsiasi operazione.

> Voglio ricordare che il tool è ancora in una fase beta quindi si potrebbero trovare dei bugs, poco importanti o notevoli.

## Installazione

### Debian, Ubuntu e derivate

Per installare GitHub CLI su Ubuntu, Debian e derivate possiamo aggiungere la repository ufficiale di GitHub al sistema:

```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
apt-add-repository https://cli.github.com/packages
```

e successivamente aggiornare il sistema ed installare il pacchetto:
```bash
apt update
apt install gh
```

### Fedora, CentOS e derivate

Anche su Fedora, CentOS e derivate, come Red Hat, dovremo aggiungere una repo esterna e installare il pacchetto da lì:

```bash
dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
dnf install gh
```

### openSUSE

Il procedimento di base non cambia nemmeno su openSUSE, dove possiamo fare tutto con `zypper`:

```bash
zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo
zypper ref
zypper install gh
```

### Arch Linux

Su Arch Linux possiamo invece procedere direttamente con `pacman`:

```bash
pacman -S github-cli
```

## Configurazione

Dopo aver installato il pacchetto per la nostra distribuzione, per prima cosa sarà necessario effettuare l'accesso con il proprio account GitHub.

Per fare ciò diamo dal terminale questo comando:

```bash
gh auth login
```
e a quel punto ci verrà chiesto se accedere direttamente con GitHub.com (sito ufficiale di GitHub) o con un server GitHub Enterprise, nel caso in cui si lavorasse in grosse compagnie. Noi sceglieremo GitHub.com per questa guida (come probabilmente molti altri).

Dopo ci verrà chiesto se eseguire il login via token o browser. Per essere più veloci, selezioniamo browser e copiamo il OTC (*One-Time Code*) che GitHub ci fornirà, per poi continuare il login dal browser. 

Una volta che avremo collegato il nostro account, GitHub CLI ci chiederà se vogliamo usare come protocollo di *git* HTTPS o SSH (Per usare SSH dobbiamo avere una chiave SSH collegata a GItHub, maggiori dettagli [qui](linuxhub.it/articles/howto-utilizzo-di-ssh-per-connettersi-a-github)).


Dopo aver configurato tutto il necessario potremo gestire le nostre Repository e altro direttamente dal terminale usando GitHub CLI. Per controllare la lista di comandi possiamo dare il comando `gh help` oppure consultare la documentazione online che troviamo [qui]([Manual | GitHub CLI](https://cli.github.com/manual/)).