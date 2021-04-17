---
title: '#howto - Configurazione di un reverse_proxy su Caddy Server 2'
published: 2020-08-21
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - centos  - php  - rhel  - caddy  - bash
---
**Caddy** è un Web Server altamente estensibile e performante scritto in linguaggio Go.

Abbiamo già visto come <a href="https://linuxhub.it/articles/howto-servire-applicazioni-php-con-caddy-server-su-centos-e-rhel-7-8">servire applicazioni PHP con Caddy Server</a>. In questa piccola guida vediamo come effettuare un *reverse_proxy*, ossia servire tramite caddy, una applicazione che viene già eseguita su una porta e/o un indirizzo/posizione differente.

Questo sistema torna utile quando si vuole servire applicazioni Python, Asp.NET, NodeJS e simili che spesso ospitano il processo su una porta dedicata.

## Installazione di Caddy 2
Abbiamo già trattato l'argomento <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8">installazione</a>, è importante averne una funzionante prima di procedere con le altre istruzioni in questa guida.

## Configurazione reverse_proxy
Caddy offre due tipologie di configurazione, da linea di comando e tramite Caddyfile. In questa guida tratteremo solo il metodo tramite *Caddyfile* che risulta essere il più semplice e versatile oltre che facile da mantenere.

> Consiglio di leggere la sezione <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-di-caddy-server-su-centos-8-rhel-8#title8">Domini multipli</a> della guida di installazione per le istruzioni su come configurare i Caddyfile.

### Caddyfile
Creiamo un nuovo Caddyfile con la seguente configurazione esempio:

```json
ilmiosito.ex {
		reverse_proxy 127.0.0.1:9000
}
```

dove:
* **ilmiosito.ex** è il nome a dominio che punta al server
* reverse_proxy **127.0.0.1:9000** sono indirizzo IP e porta del servizio a cui vogliamo effettuare il reverse proxy

L'opzione `reverse_proxy` supporta anche altri upstream:

* localhost:9000
* http://dominio_esterno.ex:9000
* https://dominio_esterno.ex (quando la porta non è specificata viene intesa quella definita dal protocollo, in questo caso 443 poichè servita con SSL)
* unix//socket_name.sock (possiamo usare questa direttiva per servire ad esempio contenuti php, puntando quindi al socket php-fpm)
* srv+http://internal.service.consul

Mettiamo caso di avere una applicazione Django in esecuzione sullo stesso server in modalità sviluppo su porta 9090, l'indirizzo sarà quindi locale *127.0.0.1* e la porta *9090*, nell'esempio quindi:

```json
ilmiosito.ex {
		reverse_proxy 127.0.0.1:9090
}
```

Salviamo la configurazione e riavviamo caddy via `systemctl`:

```bash
systemctl restart caddy
```

Visitando *ilmiosito.ex* verrà mostrato il contenuto a cui stiamo puntando, passando quindi dalla porta *9090* alla porta *443*.


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).
