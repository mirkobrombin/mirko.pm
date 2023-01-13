---
class: post
title: '#howto - Nascondere la versione di Nginx'
date: 2020-06-26
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - nginx  
  - debian  
  - centos  
  - rhel  
  - bash
---
Quando si possiede un web server con installato **Nginx**, nelle pagine di errore o negli header è possibile identificare la **versione** del software installata, dato che potrebbe essere utilizzato da qualche malintenzionato per trovare vulnerabilità per accedere alla propria macchina.

Su Nginx, però, si può evitare che questa informazione venga resa pubblica, e in questa guida vedremo come farlo modificando il file di configurazione del programma.

> Per procedere con questa guida è necessario avere installato Nginx sul proprio sistema. <a href="https://linuxhub.it/articles/howto-installazione-e-configurazione-con-let%E2%80%99s-encrypt-di-nginx-su-debian-10">Qui</a> potete trovare una guida per l'installazione su Debian e derivate, e <a href="https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl">qui</a> per CentOS/RHEL 8.

## Parametro server_tokens

Per nascondere ad occhi indiscreti la versione di Nginx installata sul proprio server, si può aggiungere al file di configurazione, normalmente posizionato in `/etc/nginx/nginx.conf`, il parametro speciale `server_tokens`.

Modifichiamo quindi il file con un qualsiasi editor di testo (in questo caso `nano`):

```bash
nano /etc/nginx/nginx.conf
```

ed aggiungiamo all'interno della sezione `http` il parametro `server_tokens` con valore *off*:

```nginx
http {
	..
	server_tokens off;
}
```

Chiudiamo il file, controlliamo che non ci siano errori nella configurazione con:

```bash
nginx -t
```

e riavviamo Nginx:

```bash
systemctl restart nginx
```

Possiamo verificare la modifica visitando una pagina di errore del nostro sito, accessibile ad esempio consultando una cartella nascosta, e controllare che appaia scritto solo "nginx" al di sotto dell'errore.

Per fare ciò possiamo anche utilizzare `curl`:

```bash
curl -I https://dominio
```

dove l'output di *server* dovrebbe essere uguale a *nginx*:

```bash
server: nginx
```

### Valori di server_tokens

`server_tokens` può anche essere impostato con valori differenti da *off*, questi sono in tutto quattro:

- *on*: mostra la versione di Nginx
- *off*: nasconde la versione di Nginx
- *build*: imposta un nome per la nostra build di Nginx
- *string*: disponibile solo nella versione commerciale di Nginx (a pagamento), serve per impostare esplicitamente la firma sulle pagine di errore e nell'header di risposta "Server"


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).