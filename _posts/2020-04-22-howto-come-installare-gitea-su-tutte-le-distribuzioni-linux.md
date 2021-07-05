---
title: '#howto - Installazione di Gitea su tutte le distribuzioni Linux'
date: 2020-04-22
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - bash  
  - systemd
---
**Gitea** è una soluzione hosting Git installabile senza troppe difficoltà su qualsiasi distribuzione Linux. Simile a GitHub, Bitbucket e GitLab, Gitea è un fork di Gogs, e due dei suoi punti di forza sono la **velocità** e la **leggerezza** con cui gira.

Gitea è molto facile da utilizzare e da configurare, e in questa guida vedremo come installarlo su un proprio server con qualsiasi distribuzione Linux come base.

## Requisiti

Prima di procedere con l'installazione di Gitea è necessario configurare un **database** ed un **utente di sistema** che dovrebbe essere utilizzato solamente per questo scopo. Per prima cosa, verifichiamo che `Git` sia installato sul sistema con il comando:

```bash
git --version
```

e l'output dovrebbe essere simile al seguente:

```bash
git version 2.17.1
```

In seguito, creiamo un utente che avrà lo scopo di eseguire Gitea. In questa guida utilizzeremo come esempio `git`:

```bash
sudo adduser --system --home /home/git --shell /bin/bash --group git
```

realizziamo la struttura delle cartelle in cui girerà il software:

```bash
sudo mkdir -p /var/lib/gitea/{custom,data,log}
sudo mkdir /etc/gitea
```

infine impostiamo i permessi corretti:

```bash
sudo chown -R git:git /var/lib/gitea/
sudo chmod -R 750 /var/lib/gitea/
sudo chown root:git /etc/gitea
sudo chmod 770 /etc/gitea
```

Per concludere, creiamo un database con MySQL, MariaDB o PostgreSQL con dei dati a nostra scelta. 

**NB**: vi consigliamo di creare un utente apposito per la gestione del database di Gitea per una maggior sicurezza.

## Installazione di Gitea

Rechiamoci nella nostra home o nella cartella `/tmp` e con `wget` procediamo al download di Gitea dalle repo ufficiali:

```bash
wget -O gitea https://dl.gitea.io/gitea/1.11.4/gitea-1.11.4-linux-amd64
```

E rendiamo il file scaricato eseguibile:

```bash
chmod +x gitea
```

Verifichiamo che il pacchetto di cui abbiamo effettuato il download sia firmato con la corretta chiave **GPG**:

```bash
gpg --keyserver pgp.mit.edu --recv 7C9E68152594688862D62AF62D9AE806EC1592E2
gpg --verify gitea-1.11.4-linux-amd64.asc gitea-1.11.4-linux-amd64
```

e per sicurezza forniamo a Gitea un'indicazione sulla directory su cui deve lavorare:

```bash
export GITEA_WORK_DIR=/var/lib/gitea/
```

Infine, copiamo il pacchetto scaricato in precedenza nella cartella principale di Gitea:

```bash
sudo cp gitea /usr/local/bin/gitea
```

## Esecuzione di Gitea

Per avviare Gitea ci sono **due opzioni**: con la prima creeremo **un servizio** che permetterà di eseguire automaticamente il programma (consigliato), mentre nella seconda ricorreremo al **semplice input da terminale**.

### Creazione di un servizio per avviare Gitea in automatico

Creare un servizio per Gitea con `systemd` è molto semplice: creiamo il file gitea.service nella cartella `/etc/systemd/system/` e copiamo il seguente blocco di codice, ricordandosi di decommentare la riga dove viene specificato il servizio del proprio programma di database attualmente in esecuzione:

Modificate il parametro dell'utente, del gruppo e della home directory se necessario.

```bash
[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target

[Service]
#LimitMEMLOCK=infinity
#LimitNOFILE=65535
RestartSec=2s
Type=simple
User=git
Group=git
WorkingDirectory=/var/lib/gitea/
#RuntimeDirectory=gitea
ExecStart=/usr/local/bin/gitea web --config /etc/gitea/app.ini
Restart=always
Environment=USER=git HOME=/home/git GITEA_WORK_DIR=/var/lib/gitea
#CapabilityBoundingSet=CAP_NET_BIND_SERVICE
#AmbientCapabilities=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

Salviamo il file, avviamo Gitea e facciamo in modo che parta automaticamente all'avvio del proprio sistema:

```bash
sudo systemctl enable gitea
sudo systemctl start gitea
```

### Esecuzione di Gitea da terminale

Per avviare Gitea attraverso la propria shell non dobbiamo fare altro che scrivere questo semplice comando:

```bash
GITEA_WORK_DIR=/var/lib/gitea/ /usr/local/bin/gitea web -c /etc/gitea/app.ini
```

#### Post-esecuzione

Nel caso in cui Gitea dovesse avviarsi senza alcun problema, visitiamo l'app web disponibile all'indirizzo: _ipdelserver:3000_. Se tutto è stato configurato correttamente, dovremmo trovarci di fronte ad una pagina di benvenuto da dove potremo configuare il database.

Per una questione di sicurezza, al termine di quest'ultimo passaggio, cambiate i permessi della cartella di Gitea e del file di configurazione in questo modo:

```bash
sudo chmod 750 /etc/gitea

sudo chmod 640 /etc/gitea/app.ini
```

## Conclusione

Gitea è un servizio Git che può tornare molto utile nel caso non si avesse intenzione di usufruire di applicazioni web, ed è consigliato vista la sua semplicità e velocità.

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).
