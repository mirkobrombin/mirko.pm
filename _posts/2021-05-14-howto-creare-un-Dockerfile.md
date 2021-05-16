---
title: "#howto - Creare un Dockerfile"
published: 2021-05-14
layout: post
author: Floppy Loppy
author_github: raspFloppy
tags:
- bash
- docker	
---

Docker è un software open source, multipiattaforma che permette di virtualizzare singole applicazioni in dei container isolati dal sistema host principale.

Abbiamo già parlato di Docker in un [precedente articolo](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux/) a cui vi rimando per approfondire l'argomento.

In questa guida vediamo come realizzare un *Dockerfile*, ossia una immagine Docker personalizzata, su misura delle nostre necessità.

## Prerequisiti
Prima di procedere con questa lettura sarebbe bene visionare l'articolo precedente:

- [Installare Docker su Linux](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux/)


## Obiettivi 
In questo articolo verrà:

- Spiegato cos'è un Dockerfile, i principali comandi e l'utilità di esso
- Spiegato come eseguire un Dockerfile e creare un container da esso
- Fatti due esempi di Dockerfile 


## Cos'è un Dockerfile

Un Dockerfile è un file di testo contenente alcuni comandi comprensibili a Docker da cui è possibile, da un'immagine di partenza, creare una nostra immagine personalizzata.
Per essere riconosciuto da Docker, il Docker file dovrà chiamarsi proprio `Dockerfile` senza estensioni e senza modificare maiuscole e minuscole.

Alcuni dei comandi del Dockerfile che andremo ad utilizzare sono: 

- `FROM <nome-immagine>` specifica l'immagine di partenza (viene prima verificato se si trova nei repo locali altrimenti la scarica dal [Dockerhub](https://hub.docker.com/))
- `RUN <comando>` esegue uno o più comandi prima della creazione del container
- `ADD <file/dir> <path>` copia un file dell'host o remoto all'interno di una cartella del container
- `COPY <file/dir> <path>` copia un file dell'host all'interno di una cartella del container
- `CMD ["<comando>", ...]` specifica uno o più comandi da eseguire all'interno del container quando viene richiamato
- `WORKDIR <path>`	specifica la directory nel quale i comandi settati su CMD devono essere eseguiti

>  Nota: 
>
> La differenza tra `ADD` e `COPY` è che il primo ha funzionalità maggiori tra cui il poter copiare file remoti 
> all'interno del container tramite `URL` oppure estrarre un file compresso all'interno del container mentre  `COPY` copia solo i file locali dall'host al container.
> `COPY` è stato introdotto per problemi di funzionalità del comando `ADD` che per via delle sue troppe funzionalità
> può avere comportamenti inaspettati quando si cerca di copiaere un file su un container.
  
  

## Come eseguire un Dockerfile

Per eseguire un Dockerfile dobbiamo usare un comando di Docker, `build`.
Il comando build interpreta i comandi del dockerfile e li esegue in ordine. Crea e da un nome all'immagine personalizzata che abbiamo creato e la salva all'interno del nostro repository locale di Docker.

Per eseguire il comando dobbiamo specificare la directory nel quale abbiamo creato il nostro Dockerfile e quindi eseguire:

``` docker
docker build -t <nome-immagine> <path>
```

dove:
- `-t` per aggiungere un tag all'immagine
- `<nome-immagine>` il nome che vogliamo dare alla nostra immagine 
- `<path>` è la directory nel quale si trova il Dockerfile

>  Nota: 
>
> Possiamo anche escludere il `-t` ed il `<nome-immagine>` ma in questo il nome dell'immagine sarà un codice assegnato 
> da Docker che risulta molto scomodo da ricordare e da cercare perciò per comodità è sempre meglio assegnare sempre un 
> nome manualmente.


Quindi poi eseguire:

``` docker
docker run <nome-immagine> 
```
Per creare il container ed eseguirlo.


## Perchè utilizzare un Dockerfile

Ci sono due motivi per utilizzare un Dockerfile e quindi creare una nostra immagine personalizzata.
Il primo motivo è che nonostante sul [Dockerhub](https://hub.docker.com/) (il repository di Docker) vi siano migliaia di immagini per Docker magari non esiste quella specifica per le nostre esigenze perciò siamo costretti a crearela noi manualmente.
Il secondo motivo è che magari vogliamo poter avere un container basato sulla nostra immagine su diverse macchine ed utilizzare un Dockerfile è perfetto per questo scopo grazie al suo alto livello di portabilità, infatti sarà necessario solamente avere Docker installato ed eseguire `docker build` e `docker run` per avere quello che ci serve.

## Creazione di un Dockerfile

Adesso andremo a vedere come creare un Dockerfile, caricare l'immagine e eseguire il container.
Prima di ciò eseguiamo:

``` docker
docker pull python:3
docker pull node 
```
Per avere gia scaricate le immagini che andremo ad utilizzare negli esempi.


### Esempio 1

Nel primo esempio andremo a creare un semplice file in python che stampa a schermo un "hello world" e lo faremo eseguire da un container.

Quindi creiamo un semplice file python che stampa "hello world":

``` python3
print('Hello, world')
```

E salviamiamolo come `app.py`

Dopodichè andiamo a creare il `Dockerfile` nella stessa directory di `app.py` che sarà composto in questo modo:

``` Dockerfile
	FROM python:3
	COPY ./app.py /
	CMD ["python", "./app.py"]
```
prima di eseguire il `build` commentiamo il codice:

- `FROM python:3` Specifico di utilizzare l'immagine di python3
- `COPY ./app.py /` Specifico di copiare il file `app.py` nella `root` del container
- `CMD ["python", "./app.py"]` Specifico di eseguire il comando `python app.py` quando il container viene eseguito (senza il `WORKDIR` `CMD` esegue nella `root`)

Quindi ora creiamo l'immagine:

``` docker
docker build -t hello-python .
```

e successivamente eseguiamo il container:

``` docker
docker run hello-python
``` 
E se tutto è andato a buon fine stamperà un "Hello, world".

### Esempio 2 

In questo esempio creeremo un semplice webserver in python tramite `Flask` eseguito dentro un container.

Per prima cosa creiamo il file `app.py`:

``` python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"
```
Questo codice creerà un semplice webserver.

Nella stessa cartella di `app.py` creaiamo il `requirements.txt` contenente i nomi delle librerie utilizzate da python (in questo caso solo Flask):

``` txt
Flask==2.0.0
```

Infine andiamo a definire il nostro `Dockerfile`:

``` Dockerfile
FROM python:3
RUN mkdir /webserver
WORKDIR /webserver
COPY requirements.txt /webserver/
RUN pip install -r requirements.txt
COPY ./app.py /webserver/
CMD ["flask", "run", "--host=0.0.0.0"]
```
e adesso andiamo a commentarlo:

- `FROM python:3` Specifico di utilizzare l'immagine di python3
- `RUN mkdir /webserver` Esegue il comando `mkdir` che crea una sottocartella della `root` denominata `webserver`
- `WORKDIR /webserver` Sposta la directory di lavoro del container in `/webserver`
- `COPY ./requirements.txt /webserver/` Copia il file `requirements.txt` nella cartella `/webserver`
- `RUN pip install -r requirements.txt` Esegue il comando `pip install -r` che crea installa tutte le librerie specificate nel `requirements.txt`
- `COPY ./app.py /webserver/`	Copia `app.py` dall'host e lo salva nella cartella `/webserver` del container
- `CMD ["flask", "run", "--host=0.0.0.0"]` Esegue il comando `flask run --host=0.0.0.0` che esegue `app.py` e crea il webserver sul `localhost` (che in questo caso è il localhost del container 172.17.0.x) 

Eseguiamo quindi:

``` docker
docker build -t flask-webserver 
```

ed infine:
``` docker 
docker run flask-webserver
```
che dovrebbe stampare un messaggio simile:
``` bash
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.17.0.2:5000/ (Press CTRL+C to quit)
```

Se quindi proviamo andare in `http://172.17.0.2:5000` potrevo vedere stampato il messaggio "Hello, world", mentre se premiamo `CTRL+C` chiuderemo il webserver e  di conseguenza anche il container.



Per ogni dubbio, chiarimento o curiosità ci trovate sul nostro [gruppo Telegram](https://t.me/linuxpeople).
