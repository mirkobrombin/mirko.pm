---
title: '#howto - Approfondimenti del comando cUrl' 
date: 2022-03-18 10:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- curl

---

Abbiamo già parlato del comando `curl` [in un articolo precedente](https://linuxhub.it/articles/howto-utilizzo-del-comando-curl/), ma spendiamoci qualche parola in più

## Descrizione approfondita

`cUrl` è in realtà un acronimo di **Client URL** e si tratta principalmente di una libreria (`libcurl`) scritta per lo più in *linguaggio c* per la prima volta da **Daniel Stenberg** nel 1996.

Questa libreria fornisce anche il noto command line tool che ancora oggi si usa anche in ambito professionale per interrogare siti, testare API e reperire oggetti online. 

Giusto per farci un idea della potenza di questo tool, supporta una varietà di protocolli e funzioni come: 

- cookies
- FTP
- HTTP 1,2 e 3
- POST e PUT 
- HTTPS
- IMAP
- POP3
- SMTP
- Autenticazione e molto altro...

##  Richieste GET autenticate

È una richiesta HTTP GET tutto ciò che, dato un indirizzo, restituisce un oggetto. Ad esempio: 

```bash
curl http://ind.iri.zzo.ip:porta/risorsa/
```



Tuttavia alcuni siti hanno necessità di credenziali per determinate operazioni, anche solo per navigare. 

**cURL** ti consente di autenticarti tramite protocollo **BASIC AUTHENTICATION** così: 

```bash
curl -v http://ind.iri.zzo.ip:porta/risorsa/ --user nomeutente:password
```



## Parsing di HTML

Le richieste GET prelevano degli html, ma poi che ce ne facciamo ? Esistono vari strumenti che fanno un parsing abbastanza blando di html, proviamone però a costruire uno molto rudimentale ma con strumenti in genere presenti in tante distribuzioni: 

```bash
htmlparsing () {            
        local IFS='>'
        read -d '<' TAG VALUE
        VALUE="$(echo $VALUE | xargs -0)"
}

curl 'http://ind.iri.zzo.ip:porta/risorsa/' | while htmlparsing ; do if [[ "$VALUE" != "" ]]; then echo $VALUE;fi  ; done
```

Non è proprio bellissimo il risultato ma qualcosa la riuscirete a capire!  

Premete poi `CTRL+C` per terminare  

## POST 

Con curl potete effettuare richieste POST! per la precisione, le richieste di questo genere richiedono una risorsa ma non prima di aver inviato dei dati, in genere in formato `json`.
Ecco come inviarne una: 

```bash
curl -X post -H "Content-Type: application/json;" -d "{json}" ind.iri.zzo.ip
```



Potete anche sostituire a "post" un altra tipologia di richiesta, come PUT, realizzandone quindi una di quel tipo!

## IMAP 

Potete fare delle richieste IMAP per navigare la posta.  
Ad esempio chiedere la lista delle cartelle email:

```bash
curl --ssl imaps://ind.iri.zzo.ip:porta -u 'ind.iri.zzo@email':'password'
```


Più praticamente con email outlook: 

```bash
curl --ssl imaps://imap-mail.outlook.com:993 -u 'ind.iri.zzo@email':'password'  
```


Ma se vogliamo analizzare una cartella? Dobbiamo aggiungere una richiesta con il parametro `--request` (oppure il flag `-X`)

```bash
curl --ssl imaps://imap-mail.outlook.com:993 -u 'ind.iri.zzo@email':'password'  --request "EXAMINE nomecartella"
```

La parola "`EXAMINE`" è un comando imap, ne esistono diversi.  

Supponiamo ora di voler vedere i primi 5 UID (ovvero gli **identificativi unici** che rappresentano ogni messaggio) della cartella "**inbox**": 

```bash
curl --ssl imaps://imap-mail.outlook.com:993/inbox -u 'ind.iri.zzo@email':'password'  -X "fetch 1:5 (UID FLAGS)"
```

 Il risultato sarà una cosa del genere: 

```
* 1 FETCH (UID 13 FLAGS (\Seen))
* 2 FETCH (UID 16 FLAGS (\Seen))
* 3 FETCH (UID 19 FLAGS (\Seen))
* 4 FETCH (UID 25 FLAGS (\Seen))
* 5 FETCH (UID 26 FLAGS (\Seen))
```

Leggiamo quella con **id 13**, per farlo introduciamo anche il flag `-v` o meglio **verbose**, ricordate che le email vengono scritte con codice HTML quindi ci vedremo ritornare un body formattato in quel modo:

```bash
curl --ssl imaps://imap-mail.outlook.com:993/inbox -u 'ind.iri.zzo@email':'password' -X "FETCH 1 BODY.PEEK[]" -v
```

Ovviamente esistono molti altri comandi IMAP da poter utilizzare con curl per eliminare la propria posta ad esempio, marcarla come letta oppure come da leggere, spostarla o archiviarla. Leggere e gestire la propria email attraverso curl potrebbe sembrare complesso, ma potrebbe essere un buon modo per evitare di cadere in attacchi informatici a cui son soggette le letture tramite i normali client di posta.

