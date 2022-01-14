---

title: '#howto - Creare un server minecraft in container' 
date: 2022-01-14 10:36
layout: post 
author: Massimiliano Noviello
author_github: linuxhubit
published: true
tags: 
- minecraft
- minecraft-server
- docker
- podman
- container
- docker-compose

---

## Come creare un server di minecraft dockerizzato

Quante volte vi siete trovati in difficoltà nel gestire diversi server minecraft sulla vostra macchina? Beh, i container possono risolvere tutto questo.

*Nota: Questo articolo fa uso di Docker o Podman, se desideri maggiori delucidazioni in materia potresti dare un'occhiata a [quest'altro articolo.](https://github.com/linuxhubit/linuxhub.it/blob/main/_posts/2021-04-30-howto-Installazione-ed-utilizzo-di-Docker-su-Linux.md)*

## Impostazione del container

Per il container useremo [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) e docker-compose.

 

Iniziamo creando una nuova cartella in cui lavorare.

Dopodiché creiamo un file chiamato `docker-compose.yml`.

### Versione

All'interno del file dobbiamo specificare la versione del formato (non la versione di docker-compose):

```yaml
version: '3'
```

### Creazione del servizio

Un file di docker-compose è composto da servizi. Andiamo a creare il servizio del nostro server e chiamiamolo `mcserver`:

```yaml
version: '3'

services:
  mcserver:
```

### Immagine e nome del servizio

Andiamo a specificare l'immagine che useremo per il server e il nome che comparirà nella lista dei container attivi col comando `docker ps -a` o `podman ps -a` (in questo caso `server-1`)

```yaml
version: '3'

services:
  mcserver:
    image: "itzg/minecraft-server"

    container_name: "server-1"
```

### Porta e cartella dei dati

Adesso diamo al container la possibilità di esporre la porta `35565` e impostiamo la cartella dove i dati del server verranno salvati (che in questo caso chiameremo `dati_server`):

```yaml
version: '3'

services:
  mcserver:
    image: "itzg/minecraft-server"

    container_name: "server-1"

    ports:
      - 25565:25565

    volumes:
      - "./dati_server:/data"

```

### EULA e restart

Come in per ogni altro server minecraft è necessario accettare l'accordo con l'utente finale di Mojang prima di poter effettuare l'avvio.

```yaml
version: '3'

services:
  mcserver:
    image: "itzg/minecraft-server"

    container_name: "server-1"

    ports:
      - 25565:25565

    volumes:
      - "./dati_server:/data"
    
    environment:
      EULA: "TRUE"

    restart: "unless-stopped"
```

L'opzione `restart` ci permette di indicare in questo caso di riavviare il server se mai dovesse involontariamente spegnersi.

### Impostazioni aggiuntive

È possibile tramite la sezione `environment` fornire alcune impostazioni che normalmente specificheremmo nel file `server.properties` o addirittura utilizzare un host per plugin come spigot o paper (nonostante sia possibile modificare a mano i file di configurazione consiglio sempre di fare il più possibile nel `docker-compose.yml`).

Ecco un paio di esempi in cui viene disabilitata la `online mode` (cioè viene disattivata l'autenticazione tramite account ufficiale) e impostato paper come plugin host.

```yaml
version: '3'

services:
  mcserver:
    image: "itzg/minecraft-server"

    container_name: "server-1"

    ports:
      - 25565:25565

    volumes:
      - "./dati_server:/data"
    
    environment:
      EULA: "TRUE"
      ONLINE_MODE: "FALSE"
      TYPE: "PAPER"

    restart: "unless-stopped"
```

Potrete trovarne altri direttamente nel README della repository del progetto su github: [itzg/docker-minecraft-server](https://github.com/itzg/docker-minecraft-server#readme)

## Interazione col server

### Avvio e spegnimento

Ora che il nostro file `docker-compose.yml` è pronto per avviare il server ci basterà dare il comando `docker-compose up -d` (la flag `-d` serve per evitare che il server catturi l'input della nostra tastiera).

Per disattivare il server ci basterà dare il comando `docker-compose down`.

*Nota: Ogni comando di docker-compose dovrà essere eseguito nella stessa cartella dove è presente il nostro `docker-compose.yml`*.

### Connessione alla console

A questo punto è possibile connetterci alla console del server tramite rcon col comando:

```bash
docker exec -i server-1 rcon-cli
```

Prestando bene attenzione a sostituire "server-1" con il `container_name` che abbiamo scelto all'interno del nostro `docker-compose.yml`.

### Accedere ai file

Sarà possibile modificare tutti i file di configurazione del server e aggiungere plugin accedendo alla cartella che abbiamo impostato per il salvataggio dati (in questo caso `dati_server`).
