---
title: '#howto - Sincronizzazione di OneDrive sulle principali distribuzioni Linux'
date: 2020-05-23
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - github  
  - bash
---
In questa guida vediamo come utilizzare e sincronizzare **OneDrive** sulle principali distribuzioni Linux, tramite uno strumento gratuito sviluppato in D.

## Dipendenze

Prima di procedere all'installazione del client, andiamo a scaricare alcune dipendenze necessarie per un corretto funzionamento:

### Ubuntu e derivate

```bash
apt install libcurl4-openssl-dev git
apt install libsqlite3-dev
wget http://master.dl.sourceforge.net/project/d-apt/files/d-apt.list -O /etc/apt/sources.list.d/d-apt.list
```

Dopo aver aggiunto la repository, modifichiamola con il nostro editor di testo preferito (in questo caso `nano`):

```bash
nano /etc/apt/sources.list.d/d-apt.list
```

e subito dopo il *deb* aggiungiamo:

```bash
[trusted=yes]
```

Il risultato completo dovrebbe essere simile al seguente:

```bash
deb [trusted=yes] https://netcologne.dl.sourceforge.net/project/d-apt/ d-apt main
```

Salviamo e chiudiamo il file, ed una volta fatto ciò possiamo andare avanti con l'installazione. Ora, è necessario installare il compilatore di D:

### Ubuntu e derivate

```bash
apt-get update && apt-get -y install  d-apt-keyring
apt-get update && apt-get install dmd-compiler dub
```

### Arch e derivate

```bash
pacman -S curl sqlite dlang git
```

### Fedora, RHEL e CentOS

```bash
yum install libcurl-devel git
yum install sqlite-devel
curl -fsS https://dlang.org/install.sh | bash -s dmd
```

## Compilazione

Ora che abbiamo scaricato e installato le dipendenze possiamo passare all'installazione del client vera e propria. Cloniamo la repo da GitHub e compiliamola con `make`:

```bash
git clone https://github.com/skilion/onedrive.git
cd oneDrive
make
sudo make install
```

## Configurazione

Dopo aver installato corretamente il client di OneDrive è necessario creare un file di configurazione. Per prima cosa, creiamo una cartella dedicata e copiamo al suo interno la configurazione di default:

```bash
mkdir -p ~/.config/onedrive
cp ~/onedrive/config ~/.config/onedrive/config
```

Per modificare quella corretta digitiamo:

```bash
nano .config/onedrive/config
```

Una volta fatte le nostre modifiche possiamo salvare e eseguire OneDrive tramite il comando dedicato:

```bash
onedrive
```

La prima volta che si avvierà il programma vi sarà richiesto di effettuare il login: una volta che l'accesso è stato confermato vi sarà fornito un link da copiare ed incollare nel terminale.

Per mantenere attivo il client di OneDrive in background ed avviarlo automaticamente al boot del sistema utilizziamo `systemctl`:

```bash
systemctl --user enable onedrive
systemctl --user start onedrive
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).