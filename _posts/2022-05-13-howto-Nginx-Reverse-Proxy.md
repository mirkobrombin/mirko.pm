---
title: '#howto -  Nginx reverse proxy' 
date: 2022-05-13 08:45
layout: post 
author: Alphvino
author_github: Alphvino
published: true
tags: 

- server
- nginx
- ubuntu
- debian
---

I servizi che eseguite sul vostro server sono sicuri?

Una grande domanda! Oggi spiegheremo come ospitare  in sicurezza i servizi del tuo homelab!

> Puoi configurare un reverse proxy con solo nodejs, utilizzando quest'altra nostra guida:
> 
>  [#howto - Impostare un reverse proxy di un server NodeJS su Nginx](https://linuxhub.it/articles/howto-come-impostare-il-reverse-proxy-di-un-server-nodejs-su-nginx/)

## Quanto sono sicuri i servizi?

Ogni servizio ha i suoi standard di sicurezza, qualcuno usa https di default, qualcuno ha possibilità di abilitarlo e qualcun'altro non usa proprio https. 

Nel primo caso e nel secondo caso avremo https ma non un certificato SSL trusted, quindi vedremo sempre l'icona del lucchetto aperto ed altri messaggi noiosi del nostro browser! 
Nel terzo invece useremo direttamente il protocollo HTTP, quindi insicuro di base.

## Come sistemiamo?

Per sistemare questo problema faremo uso di un programma chiamato **Nginx Proxy Manager** che possiede una web UI dalla quale gestire il tutto.

Sostanzialmente è un front-end per la configurazione del reverse proxy su `nginx`, servizio molto popolare. Tramite esso non solo saremo in grado di rendere sicuri i nostri servizi ospitati localmente, ma anche di poter di esporre publicamente qualche servizio senza aprire più porte.

## Installazione

Provvediamo adesso all'installazione di tutti i vari componenti che ci permetteranno di configurare il reverse proxy.

## Installazione di nginx

Avete nginx? in caso contrario potete seguire una delle nostre guide al riguardo: 

- [#howto - Installazione e configurazione di Nginx su Clear Linux](https://linuxhub.it/articles/howto-installazione-e-configurazione-di-nginx-su-clear-linux/)
- [CentOS 7](https://linuxhub.it/articles/howto-installare-nginx-su-centos-7-e-configurazione-ssl) 
- [CentOS/RHEL 8](https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl)


## Installazione Docker 

Anche per docker, potete seguire [a nostra guida](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux/)

## Installazione Proxy manager 
Iniziamo a mettere in sicurezza i nostri servizi locali creando un `Dockerfile` per Nginx Proxy Manager copiando e incollando il seguente snippet di codice:

```bash
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

## Analizziamo le flag più importanti!

- `image`: Indica che immagine usare per il container, in questo caso quella di nginx proxy manager

- `restart unless-stopped`: indica che il container si riavvierà in automatico in caso di errori tranne se fermato manualmente

- `ports`: indica quali porte verranno esposte dal container all'host

- `volumes`: indica i dati che dovranno essere persistenti, in questo caso saranno `data` e `letsencrypt` (la cartella `/etc/letsencrypt` del container viene mappata alla cartella locale `letsencrypt`)

## Avviamo il container

Ora che conosciamo il nostro Dockerfile, è il momento di avviare il container con:

```shell
docker-compose up -d
```

## Accediamo alla web UI

Ora che abbiamo il nostro container in funzione è arrivato il momento di accedere alla pagina web dalla quale gestire il tutto.

Per fare ciò rechiamoci su: `http://localhost:81` e inseriamo come username `admin@example.com` e come password `changeme`.

Appena loggati avremo l'obbligo di cambiare la mail e la password, quindi procediamo a farlo.

## Generiamo il certificato SSL locale

Ora che sei arrivato a questo punto non ti resta altro che generare un certificato SSL locale e infine iniziare a proxare i tuoi servizi!

Per fare questo processo è necessario avere un dominio pubblico, quindi se non ne hai uno puoi prenderne uno gratis da freenom! Una volta preso conviene portarlo sotto cloudflare per una gestione dei record DNS migliore.

Una volta che abbiamo il nostro dominio su cloudflare possiamo procedere a generare il certificato SSL locale. Perciò spostiamoci nella tab `SSL Certificates`e poi clicchiamo nel bottone rosa `Add SSL Certificate`.

Ora mettiamo su domain names il dominio pubblico preceduto da `*.local`. 
Ad esempio `*.local.foodomain.tk`.

Dopodiché clicchiamo su `Use a DNS Challenge` e selezionamo come DNS Provider `Cloudflare`. L'unica cosa da cambiare sarà `dns_cloudflare_api_token` ossia un token API che permetterà la verifica del certificato SSL, quest'ultimo lo si può generare dalla pagina Account di cloudflare.

Una volta incollato il token API accettiamo i termini di servizio e poi clicchiamo su `Save`!

## Usiamo il nostro certificato!

Dopo aver generato il certificato SSL locale è arrivato il momento di proxare il nostro primo servizio! Per fare ciò rechiamochi nella `Dashboard` e clicchiamo su `Proxy Hosts`. Ora clicchiamo su `Add Proxy Host` e come `Domain name` mettiamo il nome di dominio locale che vogliamo assegnare al servizio che risiede su `Forward Hostname/IP` e sulla porta `Forward Port`.

Mettiamo caso che io voglia proxare heimdall, una dashboard per servizi.
Come domain name decido `heimdall.local.foodomain.tk` mentre come IP:porta, l'IP locale dove heimdall è esposto e come porta la porta dove esso viene eseguito, di base l'80!

Infine dal sottomenù clicchiamo sulla tab `SSL` e selezioniamo il certificato creato in precedenza e oltre a ciò abilitamo tutte le opzioni presenti sotto di esso.

**Piccolo appunto, se utilizzate un server DNS custom come Pi-Hole o Adguard dovete creare dei domini locali e assegnarli sempre all'IP dove risiede Nginx Proxy Manager!**

## Conclusioni

Se avete eseguito tutto correttamente e vi recate sul vostro nuovo dominio, nel caso dell'esempio `heimdall.local.foodomain.tk`, vi dovreste ritrovare la pagina del servizio messa in sicurezza grazie al certificato locale!


