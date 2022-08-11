---
title: '#howto - Nextcloud su Docker'
date: 2022-06-17 07:00
layout: post
author: Floppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags:
- linux
- docker 
- yaml
---

Come già visto in articoli precedenti Docker si ritrova ad essere un tool molto comondo per fare il 
deploy di alcune applicazioni, oggi parliamo di **Nextcloud su Docker**.

## Prerequisiti
Alcuni articoli utili per i neofiti sono
- [Installare Docker su Linux](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux/)
- [Creare un file yaml per Docker](https://linuxhub.it/articles/howto-creare-un-file-yaml-per-docker/)


## Creazione yaml
Installeremo due immagini:
- Nextcloud.
- Mysql (anche mariadb va benissimo).
e connetteremo il database direttamente a nextcloud tramite il file yaml.

Iniziamo creando la configurazione di nextcloud:

```yaml
services:
    nextcloud:
        image: nextcloud
        container_name: nextcloud
        restart: always
        environment:
            NEXTCLOUD_ADMIN_USER: <your-username>
            NEXTCLOUD_ADMIN_PASSWORD: <your-password>
        volumes:
            - nextcloud-data:/var/www/html
        ports:
            - <port>:80

volumes:
    nextcloud-data: {}
```

In questo modo creeremo un semplice container con le configurazioni base di nextcloud, nella sezione `environment:` andremmo a impostare
le lo **user** e la **password** del nostro account nextcloud.
Inoltre creeremo un volume persistente di nome `nextcloud-data:` nel quale verranno archiviati i nostri dati.
Infine la porta di uscita di nextcloud andrà mappata.


Perfetto adesso settiamo invece il database:
```yaml
services:
    database:
        image: mariadb
        container_name: nextcloud_db
        restart: always
        command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
        environment: 
            MYSQL_ROOT_PASSWORD: <root-password>
            MYSQL_USER: <your-user>
            MYSQL_PASSWORD: <your-password>
            MYSQL_DATABASE: <database-name>
        volumes:
            - nextcloud_db-data:/var/lib/mysql
        ports:
            - <port>:3306
            
volumes:
    nextcloud_db-data: {}
```
Anche in questo caso abbiamo configurato user, password, root, root-password, creato il volume persistente e mappato la porta, inoltre eseguiamo
un comando alla creazione del container `--transaction-isolation=READ-COMMITTED --binlog-format=ROW` che serve ad evitare problematiche
quando il database effettuerà `DELETE` e `UPDATE`, per maggiori informazioni leggere [qui](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html#isolevel_read-committed).


Perfetto, ora uniamo in unico `docker-compose.yml`:
```yaml
services:
    database:
        image: mariadb
        container_name: nextcloud_db
        restart: always
        command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
        environment: 
            MYSQL_ROOT_PASSWORD: <root-password>
            MYSQL_USER: <your-user>
            MYSQL_PASSWORD: <your-password>
            MYSQL_DATABASE: <database-name>
        volumes:
            - nextcloud_db-data:/var/lib/mysql
        ports:
            - <port>:3306
        
   nextcloud:
        image: nextcloud
        container_name: nextcloud
        restart: always
        links: 
            - database
        environment:
            #  CONFIGURAZIONE DATABASE
            MYSQL_HOST: database 
            MYSQL_USER: <your-user>                       
            MYSQL_PASSWORD: <your-password> 
            MYSQL_DATABASE: <database-name> 
            
            NEXTCLOUD_ADMIN_USER: <your-username>
            NEXTCLOUD_ADMIN_PASSWORD: <your-password>
        volumes:
            - nextcloud-data:/var/www/html
        ports:
            - <port>:80

volumes:
    nextcloud-data: {}
    nextcloud_db-data: {}
```

Possiamo notare alcune differenze, iniziamo con `link:` che come dice il nome collega il container del database a quello di nextcloud, poi abbiamo la
configurazione del database nella sezione di nextcloud, questo serve per collegare in automatico il database quando noi eseguiamo il login.

## Utilizzo
Perfetto a questo punto possiamo "comporre" il tutto con:
```bash
docker-compose up -d
```

Per vedere se tutto è andato a buon fine eseguite:
```bash
docker ps
```

dovreste ottenere un output simile a questo:
```bash
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS         PORTS                                       NAMES
3388361f5f24   nextcloud   "/entrypoint.sh apac…"   9 seconds ago    Up 8 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp       nextcloud
31ad74931a49   mariadb     "docker-entrypoint.s…"   10 seconds ago   Up 8 seconds   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp   nextcloud_db
```

Perfetto ora sul vostro browser se andate su `localhost:<porta>` o `127.0.0.1:8080` accederete al vostro nuovo cloud containerizzato.


## Conclusione

Prima di concludere aggiungo che potrebbe essere necessario apportare modifiche ai file di configurazione di Nextcloud, per farlo entriamo nel container:
```bash
docker exec -it <nome-container-nextcloud> bash
```

Da qui ci si aprirà una shell in `/var/www/html`, dove troviamo tutti i file che compongono
Nextcloud.

Possiamo modificare a nostro piacimento i file che ci interessano, dopodichè usciamo dal container con `exit` e ricarichiamo il container con:
```bash
docker restart <nome-container>
```












