---
title: '#howto - Installazione di Sublime Text sulle principali distribuzioni Linux'
published: 2021-03-12
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
In questo articolo vedremo come installare **Sublime Text**, un popolare editor di testo che si distingue per la sua velocità ed un'interfaccia utente accattivante. Inoltre, è semplice da usare ed è molto supportato dalla community.

> Sublime Text non è né open source né gratuito. È necessario acquistare una licenza una tantum, ma hai la possibilità di usarlo gratuitamente per la valutazione e non ci sono limiti di tempo per acquistare la licenza.

Sublime Text è cross-platform, ed è disponibile sulle principali distribuzioni Linux come Ubuntu, Debian, Arch Linux, Fedora, CentOS e derivate.

## Installazione

> Le build elencate nel canale Dev sono disponibili solo per gli utenti con licenza. Gli utenti che stanno valutando Sublime Text prima dell'acquisto dovranno utilizzare il canale stabile.

### Ubuntu/Debian

Prima di tutto, installiamo sul sistema la **chiave GPG** di Sublime Text:

```bash
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | apt-key add -
```

Controlliamo che APT possa scaricare contenuti da siti HTTPS installando il pacchetto `apt-transport-https`, passaggio non necessario se il pacchetto è già sul sistema.

```bash
apt-get install apt-transport-https
```

Ora dobbiamo scegliere da che canale scaricare Sublime Text (Stable o Dev).

Se scegliamo di optare per il canale **stable**, aggiungiamo la repository corretta al nostro sistema:

```bash
echo "deb https://download.sublimetext.com/ apt/stable/" | tee /etc/apt/sources.list.d/sublime-text.list
```

mentre per il canale Dev aggiungiamo un'altra repository:

```bash
echo "deb https://download.sublimetext.com/ apt/dev/" | tee /etc/apt/sources.list.d/sublime-text.list
```

Dopo che abbiamo aggiunto la repository da noi preferita, aggiorniamo la lista delle repository via `apt` e installiamo Sublime Text:

```bash
apt-get update
apt-get install sublime-text
```

### Arch Linux

Anche su **Arch Linux** dovremo scaricare la chiave PGP, aggiungerla al sistema e firmarla:

```bash
# Scarichiamo la chiave GPG
curl -O https://download.sublimetext.com/sublimehq-pub.gpg

# Aggiungiamo la chiave appena scaricata
pacman-key --add sublimehq-pub.gpg

# Firmiamo la chiave
pacman-key --lsign-key 8A8F901A

# Cancelliamo la chiave
rm sublimehq-pub.gpg
```

Anche in questo caso dovremo scegliere il canale da cui installare Sublime Text, ma qui il processo è leggermente diverso.

Per il canale Stable dovremo eseguire il seguente comando, che, alla fine, aggiunge la repo Stable al file di configurazione di Pacman:

```bash
echo -e "\n[sublime-text]\nServer = https://download.sublimetext.com/arch/stable/x86_64" | tee -a /etc/pacman.conf
```

Per il canale Dev, invece, eseguiamo questo comando:

```bash
echo -e "\n[sublime-text]\nServer = https://download.sublimetext.com/arch/dev/x86_64" | tee -a /etc/pacman.conf
```

Dopo aver aggiunto la repo, in entrambi i casi installiamo Sublime Text con il comando:

```bash
pacman -Syu sublime-text
```

### Fedora/CentOS

Su Fedora, CentOS e distribuzioni derivate è necessario, come prerequisito, scaricare la chiave PGP di Sublime Text:

```bash
rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
```

Anche in questo caso, scegliamo da quale canale installare il programma.

Per il canale Stable possiamo procedere nel seguente modo:

```bash
dnf config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
```

per il canale Dev, invece, in quest'altro:

```bash
dnf config-manager --add-repo https://download.sublimetext.com/rpm/dev/x86_64/sublime-text.repo
```

Dopo aver aggiunto la repository, installiamo Sublime Text con il seguente comando:

```bash
dnf install sublime-text
```

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople). 