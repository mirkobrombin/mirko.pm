---
title: '#howto - Installazione e configurazione di Caddy Server su 2 Centos 8/RHEL 8/Fedora 31+'
description: "Caddy è un Web Server altamente estensibile e performante scritto in linguaggio Go."
published: 2020-02-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  
  - fedora  
  - php  
  - rhel  
  - caddy  
  - bash
---
Caddy è un Web Server altamente estensibile e performante scritto in linguaggio Go.

Il beneficio nell'usare Caddy non è *esclusivamente* legato all'incremento di performance, ma nel godere di tutti i pregi di un software scritto in un linguaggio moderno, pulito e alla base di nuove tecnologie. 

Un altro aspetto importante di questo web server è la configurazione automatizzata del certificato SSL, il quale è diventato un aspetto fondamentale per il web dei nostri giorni.

## Installazione
Prima di tutto è bene accertarsi di aver installato *curl* dato che ci servirà per impartire istruzioni a Caddy (via API):

```bash
dnf install curl
```

L'installazione avviene tramite l'utilizzo di repository/build Copr di Fedora.

Per prima cosa aggiungiamo la repository Copr ufficiale di caddy, su Centos 8/RHEL 8:

```bash
yum-config-manager --add-repo https://copr.fedorainfracloud.org/coprs/g/caddy/caddy/repo/epel-7/group_caddy-caddy-epel-7.repo
```

mentre su Fedora 31+:

```bash
dnf copr enable @caddy/caddy
```

infine installiamo il pacchetto via **dnf**:

```bash
dnf install caddy
```

Una volta installato, possiamo abilitare il servizio all'avvio di sistema con *systemctl*:

```bash
systemctl enable caddy
```

## Utilizzo del servizio
Come ogni web server, anche caddy mette a disposizione un servizio per avviare e fermare il processo. È possibile comunicare con questo sia tramite comando `caddy` che via `systemctl`.

### Avvio
Per avviare il servizio possiamo usare l'opzione `start`:

```bash
caddy start
```

o via systemctl:

```bash
systemctl start caddy
```

il quale lavorerà in background lasciando all'amministratore l'accesso alla console. Possiamo invece usare l'opzione `run` per avviare il servizio tenendo impegnata la console e mostrandone il log:

```bash
caddy run
```

### Stop
Usando l'opzione `stop` possiamo fermare il servizio:

```bash
caddy stop
```

o via systemctl:

```bash
systemctl stop caddy
```

nel caso di una sessione eseguita via opzione `run`, ci basterà inoltrare la combinazione di tasti `CTRL+C` per fermarlo.

### Reload
Un'altra opzione è `reload` il quale (come su Nginx) si occupa di aggiornare e quindi ricaricare le configurazioni in uso:

```bash
caddy reload
```

## Configurazione
Esistono due modi per configurare caddy, il primo sfruttando le API e comunicando mediante curl, la seconda tramite Caddyfile e lavorando con i comandi integrati.

> Personalmente consiglio l'utilizzo dei Caddyfile non solo per la loro semplicità ma per poter sfruttare la conversione in tempo reale, passando il compito a caddy stesso.

### API
La comunicazione tramite API (che avviene sulla porta 2019), torna utile in un contesto in cui si vuole automatizzare la distribuzione delle configurazioni. In un ambiente in produzione, in un contesto professionale, è consigliabile utilizzare i *Caddyfile* che spiegheremo nella prossima sezione.

Creiamo la nostra prima configurazione in un file **json**:

```bash
nano myconf.json
```

col seguente contenuto:

```json
{
	"apps": {
		"http": {
			"servers": {
				"example": {
					"listen": [":2015"],
					"routes": [
						{
							"handle": [{
								"handler": "static_response",
								"body": "Ciao!"
							}]
						}
					]
				}
			}
		}
	}
}
```
dove:
- **example** è la configurazione del server che stiamo creando
- **listen** è la porta da cui possiamo accedere
- **routes** è la lista di percorsi (in Nginx locations) a cui andiamo ad aggiungere definizioni specifiche come ad esempio un testo personalizzato da mostrare nel body della pagina, la quale verrà servita come una risorsa statica *static_response*

Inviamo la nostra nuova configurazione a caddy:

```bash
curl localhost:2019/load \
  -X POST \
  -H "Content-Type: application/json" \
  -d @myconf.json
```

Ciò che abbiamo appena fatto è stato comunicare con caddy inviando una richiestra POST alle API col documento json contenente la nostra configurazione, il tutto tramite **curl**.

Testiamo quindi la nostra nuova configurazione con una nuova richiesta, questa volta di tipo GET:

```bash
curl localhost:2019/config/
```

se tutto è andato a buon fine dovremmo ricevere come output il testo che abbiamo precedentemente inserito come body, ossia `Ciao!`.

### Caddyfile
Creiamo un nuovo file di nome **Caddyfile** col seguente contenuto:

```bash
:2015

respond "Ciao!"
```

il quale ha lo stesso significato della precedente configurazione in json:
- **:2015** è la porta da cui si potrà accedere alla risorsa, inserendo un dominio senza dichiarare la porta questa configurazione verrà vincolata al dominio specificato e servita sulla porta *80*
- **respond** è il contenuto che andremo a mostrare nel body

fermiamo caddy nel caso fosse ancora operativo (`CTRL+C`) ed avviamolo sfruttando il nostro file:

```bash
caddy run --config /posizione/Caddyfile --adapter caddyfile
```

dove:
- **--config** richiede la posizione completa al nostro Caddyfile
- **--adapter** specifica che caddy dovrà usare una configurazione in formato *caddyfile* e di conseguenza procedere in modo autonomo alla conversione in formato json

Proviamo nuovamente a visualizzare il contenuto del nostro sito:

```bash
curl localhost:2015
```

il quale dovrà mostrare `Ciao!` nel caso fosse tutto configurato correttamente.

#### Domini multipli
> Questa sezione tratta l'utilizzo di Caddy in un contesto professionale. Vedremo come preparare una struttura che supporti più configurazioni e quindi più domini ed applicativi web.

Normalmente il *Caddyfile* principale è posizionato in `/etc/caddy/Caddyfile`, questo è il file di configurazione principale.

Per servire più domini e quindi più configurazioni, possiamo includere un percorso dinamico, sostituendo l'intero contenuto con:

```bash
import /etc/caddy/web/*/Caddyfile
```

creiamo quindi il percorso `/etc/caddy/web` e al suo interno creiamo un percorso per il nostro primo dominio, ad esempio *ilmiosito.ex* :

```bash
mkdir -p /etc/caddy/web/ilmiodominio.ex
```

e creiamo al suo interno il *Caddyfile*:

```bash
nano /etc/caddy/web/ilmiodominio.ex/Caddyfile
```

al suo interno inseriamo il contenuto:

```json
ilmiosito.ex {
        root * /etc/caddy/web/ilmiosito.ex/public
        try_files .html
        file_server
}
```

creiamo il percorso `public`:

```bash
mkdir -p /etc/caddy/web/ilmiodominio.ex/public
```

ed al suo interno un file `index.html` con un contenuto di prova:

```bash
echo "<h1>Caddy!</h1>" > /etc/caddy/web/ilmiodominio.ex/public/index.html
```

visitando il dominio `ilmiodominio.ex/index.html` riceveremo come output il contenuto inserito.


#### Eliminare estensione .html

Per siti web statici possiamo decidere di rendere disponibili i file `.html` anche omettendo l'estensione, per fare ciò dobbiamo modificare l'opzione *try_files*:

```bash
try_files {path}.html {path}
```

#### Routing Vue.js

Per applicazioni in Vue è necessario istruire caddy sull'utilizzo del routing. Per fare questo possiamo modificare l'opzione *try_files* nel seguente modo:

```bash
try_files {path} /index.html
```

#### Supporto PHP
Abbiamo scritto una guida su questo argomento, disponibile <a href="https://linuxhub.it/articles/howto-servire-applicazioni-php-con-caddy-server-su-centos-e-rhel-7-8">qui</a>.

Consiglio di proseguire la lettura tramite la documentazione ufficiale, nello specifico al punto <a href="https://caddyserver.com/docs/caddyfile">Caddyfile</a>.