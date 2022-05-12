---

title: '#howto -  Nginx reverse proxy' 
date: 2022-05-13 10:45
layout: post 
author: Alphvino
author_github: Alphvino
published: false
tags: 

- server
- nginx
- ubuntu
- debian

---

Mettiamo caso che stiate hostando qualcosa nel vostro homelab però vi sale un dubbio: "I servizi che selfhosto sono sicuri?"

Una grande domanda! Però oggi sei nel posto fortunato, oggi vediamo come hostare in sicurezza i servizi del tuo homelab!

## Quanto sono sicuri i servizi?

Ogni servizio ha i suoi standard di sicurezza, qualcuno usa https di default, qualcuno ha possibilità di abilitarlo e qualcun'altro non usa proprio https. In generale tutti e tre non sono proprio lo standard ideale di sicurezza. Nel primo caso avremo https però non avremo un certificato SSL trusted, quindi vedremo sempre l'icona del lucchetto aperto! Nel secondo caso si ripeterà la stessa situazione del primo caso. Nel terzo invece useremo direttamente il protocollo HTTP, quindi insicuro di base.

## Come sistemiamo?

Per sistemare questo problema faremo uso di un programma chiamato Nginx Proxy Manager. Quest'ultimo possiede una web UI dalla quale gestire il tutto. Sostanzialmente si tratta di un servizio chiamato nginx, molto popolare, ma la cui configurazione per il reverse proxy è stata semplificata grazie appunto alla web UI. Tramite esso non solo saremo in grado di rendere sicuri i nostri servizi hostati localmente, ma anche di poter di esporre publicamente qualche servizio senza aprire più porte.

## Installazione

Iniziamo a mettere in sicurezza i nostri servizi locali creando un Dockerfile per Nginx Proxy Manager copiando e incollando il seguente snippet di codice:

```
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

Per fare ciò rechiamoci su: `iplocale:81` e inseriamo come username `admin@example.com` e come password `changeme`.

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


