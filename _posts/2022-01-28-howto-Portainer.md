---
title: '#howto - Portainer' 
date: 2022-01-28 10:20
layout: post 
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 

- server
- docker
- ubuntu
- debian
- archlinux

---

Docker, il magico software che ti permette di spawnare innumerevoli container per ogni tipo di attività di cui hai bisogno. Tutto divertente finché non ci stanchiamo di scrivere ogni volta, nel terminale, i vari comandi per spawnare i container. 
E se vi dicessi che è possibile scampare a tutto ciò grazie a portainer? Bene, oggi vediamo come installare e configurare a livello base portainer!

## Portainer? Cos'è?

Portainer non è altro che un software, che è possibile configurare via web, che ci permette di controllare meglio i nostri container docker e magari di spawnarni anche di nuovi, scegliendoli dalla ***App List***, la quale ci propone vari container che possiamo spawnare in modo automatico, basta solo qualche click!

## Prerequisito fondamentale

**Per seguire questo articolo è necessario avere Docker installato. Per installarlo puoi fare riferimento [alla documentazione ufficiale](https://docs.docker.com/engine/install/), essa ti guiderà nell'installazione di Docker.*

## Creazione del volume per Portainer

Ora che ci troviamo ai comandi di una macchina con Docker installato, possiamo iniziare l'installazione di Portainer.

```shell
docker volume create portainer_data
```

Tramite questo comando stiamo dicendo a Docker di creare un nuovo volume, come si nota dalle parole `volume create`, di nome `portainer_data`.

Creare un volume permette a Portainer di salvare i suoi file di configurazione, così da non perdere la nostra configurazione in caso volessimo aggiornare il container oppure muoverlo su un altra macchina.

Di default Docker crea i volumi nella directory `/var/lib/docker/volumes/`.

*Per maggiori informazioni riguardo ai volumi consiglio vivamente di dare un'occhiata alla [documentazione di Docker riguardo ai volumi](https://docs.docker.com/storage/volumes/)*

## Deployment del container di Portainer

Dopo aver creato il volume `portainer_data` possiamo procedere con la creazione del container di Portainer vero e proprio:

```shell
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    cr.portainer.io/portainer/portainer-ce:latest
```

Analizziamo le flag:

- `-d` -> Avvia il container in modalità *detached*, ossia verrà avviato in background. 

- `-p 8000:8000 -p 9443:9443` -> Mappa la porta 8000 del container con la porta 8000 dell'host e stessa storia per la porta 9443.

- `--name portainer` -> Indica il nome con il quale creare il container, in questo caso `"portainer"`

- `--restart=always` -> Specifica che il container dovrà essere sempre avviato. Se per qualche motivo il container si fermerà, Docker lo riavvierà all'infinito per assicurare che rimanga sempre acceso.

- `-v /var/run/docker.sock:/var/run/docker.sock` -> [Binda](https://docs.docker.com/storage/bind-mounts/) lo Unix socket di Docker dell'host con quello del container per permettere la comunicazione tra essi.

- `-v portainer_data:/data` -> Monta i dati di Portainer, contenuti nella cartella `/data` del container, con il volume `portainer_data` creato in precedenza.

- `cr.portainer.io/portainer/portainer-ce:latest` -> Indica che immagine usare per creare il container di Portainer.

## Primo login

Ora che il container di Portainer è in esecuzione è il momento di accedere all'interfaccia web! Rechiamoci quindi su: `https://MIOIP:9443`

Se tutto è andato secondo i piani dovremmo ritrovarci la finestra del primo login, dove avremo la possibilità di selezionare un nome utente per l'account con privilegi elevati e una password.

*Consiglio di disabilitare l'invio di dati statistici anonimi togliendo il tick dall'apposita checkbox*

![Primo login](/uploads/portainer/primologin.png)

Ora procediamo a configurare Portainer cliccando su "Get started" e magicamente verrà riconosciuto automaticamente il nostro unico nodo chiamato "local" con Docker installato sopra.

## Bonus, lista di applicazioni e Force SSL!

Dato che può tornare utile avere una lista di applicazioni dalla quale scegliere cosa poter deployare in modo automatico e rapido, procediamo a inserirne una!

Selezioniamo il nostro nodo "local" e rechiamoci nella sezione Settings, l'ultima opzione nella barra di sinistra e infine incolliamo il seguente URL nel campo URL di "App Templates" `https://raw.githubusercontent.com/Qballjos/portainer_templates/master/Template/template.json`

![App list](/uploads/portainer/apps.png)

Ora dobbiamo solo attivare il "Force SSL" che si trova in fondo alla stessa pagina delle impostazioni nella quale abbiamo configurato l'App List. Ci basterà attivare quell'opzione, applicare i cambiamenti e da ora in poi avremo SSL forzato!

## Conclusioni

Finalmente abbiamo completato l'installazione e configurazione base di Portainer.

Ora non ti resta altro che scoprire i vari container che puoi spawnare grazie alla App List
