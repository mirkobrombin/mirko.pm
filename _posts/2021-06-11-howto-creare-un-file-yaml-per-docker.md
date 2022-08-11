---
title: "#howto - Creare un file yaml per docker"
date: 2021-06-11
layout: post
author: Floppy Loppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
    - bash
    - ubuntu
    - fedora
    - archlinux
    - docker	
---

Se volessimo creare un'**applicazione multiservizio** tramite docker, in nostro aiuto ci viene incontro il file `docker-compose.yml`.


## Prerequisiti 

Sono gia' stati fatti due articoli riguardanti Docker nel quale viene spiegato cos'è, come installarlo e come usarlo, che sarebbe necessario visionare prima di procedere con l'articolo:

- [Installare Docker su Linux](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux/)
- [Creare un Dockerfile](https://linuxhub.it/articles/howto-creare-un-Dockerfile/)


## Introduzione

**Docker** permette di creare un ed eseguire applicazioni **multicontainer** attraverso un file **YAML**, un tipo di file **human-readable** utilizzato solitamente come file di configurazione.
Per fare ciò dobbiamo creare un file denominato `docker-compose.yml` nel quale andremo ad inserire tutte le nostre configurazioni di ogni singolo servizio che andremo ad aggiungere all'interno del file.
Una volta configurato il file, andrà "composto" attraverso un comando `docker-compose up`, e se tutto è andato per il verso giusto avremo funzionanti i container dei servizi che abbiamo inserito e configurato nel nostro file `.yml`.
Ma andiamo con ordine. 


## Installazione

Per poter eseguire i file `docker-compose.yml` dobbiamo installare un pacchetto aggiuntivo:

### Ubuntu:
``` bash
apt install docker-compose
```

### Fedora:
``` bash
dnf install docker-compose
```

### Archlinux:
``` bash
pacman -S install docker-compose
```


## Utilizzo 

Ora sulla nostra macchina abbiamo `docker-compose` che ci permette di gestire i file `docker-compose.yml` ma vediamo nel dettaglio alcuni comandi che possono tornarci utili:

- `docker-compose up` "comporrà" la nostra applicazione multicontainer ed eseguirà tutti i servizi in base alle configurazioni da noi scelte.
- `docker-compose down` "decompone" tutte le configurazioni dell'applicazione e ferma l'esecuzione di tutti i container creati tramite quel file `.yml`.
- `docker-compose logs <nome servizio>` Mostra i log del servizio specificato all'interno del container.
- `docker-compose start` esegue i container dei servizi specificati nel `.yml`.
- `docker-compose stop` ferma l'esecuzione dei container dei servizi specificati nel `.yml`.
- `docker-compose restart` fa ripartire i container che non sono in esecuzione dei servizi specificati nel `.yml`. 
- `docker-compose rm` rimuove i container non in esecuzione dei servizi specificati nel `.yml`.

Tutti questi comandi devono essere eseguiti nella stessa cartella in cui si trova il nostro file `docker-compose.yml` infatti proprio come per il **Dockerfile** il file non va specificato ma sarà il comando a trovare il file che serve nel PATH in cui ci troviamo.
Anche il file `.yml` dovrà essere chiamato obbligatoriamente `docker-compose.yml` in quanto il `docker-compose` di default non riconosce altri nomi.

## Esempio

Ora che abbiamo un idea generale dei comandi principali proviamo a creare un'applicazione **LAMP** (Linux, Apache, Mysql/Mariadb, Php) tramite Docker e il **docker-compose.yml**.

``` YAML
services:
    php:
        image: php
        container_name: linuxhub_php
        restart: always
    
    apache:
        image: httpd
        container_name: linuxhub_apache
        restart: always
        ports:
            - 8080:80
        
    mariadb:
        image: mariadb
        container_name: linuxhub_mariadb
        restart: always
        environment: 
            MYSQL_ROOT_PASSWORD: ChangePassword
            MYSQL_USER: linuxhub
            MYSQL_PASSWORD: ChangePassword
            MYSQL_DATABASE: linuxhub_db
        ports:
            - 3306:3306
            
    phpmyadmin:
        image: phpmyadmin
        container_name: linuxhub_phpmyadmin
        restart: always
        links:
            - mariadb
        environment: 
            PMA_HOST: mariadb
            PMA_PORT: 3306
            PMA_USER: linuxhub
            PMA_PASSWORD: ChangePassword
        ports:
            - 8081:80   
```
Queste 40 righe possono sembrare confusionarie ad una prima occhiata, tuttavia vediamo cosa fanno esattamente.

I file YAML sono **TAB/SPACE-sensitive** ovvero la gerarchia e l'indentazione del codice e gestita dai TAB/SPACE perciò quando scrivete dei file **YAML** state attenti alle tabulazioni e gli spazi che mettete perché in caso di errore il file yaml o fa cose che non dovrebbe fare oppure restituisce un errore di sintassi un po come succede con Python quando indentate male.
Detto questo possiamo iniziare a commentare il codice:

- `services`:  all'interno di questo tag inseriamo tutti quelli che sono i nostri servizi.
    - `php`, `httpd`, `mariadb`, e `phpmyadmin`: sono i nomi opzionali che diamo ai servizi.
        - `image`: questo tag definisce quale immagine dobbiamo scaricare dai [repository di docker](https://hub.docker.com/).
        - `container_name`: questo tag è opzionale e serve per dare un nome al container che si andrà a creare.
        - `restart`: questo tag serve per dire a docker se riavviare i container in caso si fermassero, questo è utile per tenere i nostri servizi sempre accesi anche spegnamo e riaccendiamo la nostra macchina.
        - `ports`: specifica le porte di `esterne:interne` che il servizio e quindi il container userà.
        - `environment`: vengono specificate le variabili d'ambiente di ogni servizio (se le ha e se è possibile settarle).
        - `links`: collega due container permettendogli di "vedersi" sul localhost invece che sulla sottorete di docker. 

Andando un po' più nello specifico su `mariadb` nella parte di `environment` ho specificato la password di ROOT, l'utente, la password dell'utente e il nome del database da creare all'interno del container mentre su phpmyadmin le variabili d'ambiente inserite sono state l'host in cui si trova il database, ed in questo caso il nome che abbiamo scelto di dare al servizio del database (`mariadb`), questo è stato possibile perché il servizio mariadb è stato collegato attraverso il tag `links` al servizio di phpmyadmin, poi la porta in ascolto del database, il nome utente e la password per l'accesso a phpmyadmin.

Nel tag `ports` alcune porte sono state mappate in modo tale da essere accessibili dall'esterno da porte diverse da quelle che di solito sono default, questo viene fatto perché ad esempio potremmo avere più applicazioni diverse che però hanno alcuni servizi in comune e quindi le stesse porte e per evitare conflitti vengono mappate le porte esterne su porte diverse da quelle di default. 

Bene detto ciò ora ci manca solo comporre il nostro file:

``` bash
docker-compose up
```

che se tutto è andato a buon fine dovrebbe restituirci un messaggio così

``` bash
Starting linuxhub_php     ... done
Starting linuxhub_mariadb ... done
Starting linuxhub_apache  ... done
Starting linuxhub_phpmyadmin ... done
```

e se eseguiamo il comando:

``` bash
docker ps 
```

dovremmo ricevere come output questo:

```
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS                         PORTS                                       NAMES
6590dcdc6e5d   phpmyadmin   "/docker-entrypoint.…"   7 seconds ago   Up 6 seconds                   0.0.0.0:8081->80/tcp, :::8081->80/tcp       linuxhub_phpmyadmin
ea802686024f   httpd        "httpd-foreground"       8 seconds ago   Up 7 seconds                   0.0.0.0:8080->80/tcp, :::8080->80/tcp       linuxhub_apache
d22b12a7d73c   mariadb      "docker-entrypoint.s…"   8 seconds ago   Up 7 seconds                   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp   linuxhub_mariadb
017698cede9e   php          "docker-php-entrypoi…"   8 seconds ago   Restarting (0) 2 seconds ago                                               linuxhub_php

```

Se adesso proviamo ad accedere a `localhost:8080` dovremmo vedere il il messaggio "**It's Working**" di Apache mentre se andiamo su localhost:8081 riusciamo ad accedere a phpmyadmin e tra la lista dei database dovremmo vedere il database che abbiamo creato nel `.yml` (nel nostro caso `linuxhub_db`).




