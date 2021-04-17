---
title: '#howto - Installlazione e configurazione di Varnish Cache 6 per Nginx su CentOS 8/RHEL 8'
published: 2020-09-18
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  - centos  - rhel  - bash  - systemd  - bash  - systemd
---
**Varnish** è un potete strumento per la gestione della **cache** di applicativi con grossi carichi di contenuti. Normalmente questo sistema viene utilizzato in combinazione con Apache o Nginx. 

In questa guida tratteremo l'installazione e configurazione per **Nginx**. Rimando qui (https://linuxhub.it/articles/howto-installazione-di-nginx-su-centos-8-rhel-8-e-configurazione-ssl) alla guida per la sua installazione su CentOS 8 e/o RHEL 8.

## Installazione
Varnish si trova nelle repository di base (nella versione 6.4), sia su CentOS 8 che RHEL 8. Procediamo alla sua installazione via `dnf`:

```bash
dnf module install varnish
```

Una volta ultimato il processo di installazione del modulo, avviamo il servizio via `systemctl`:

```bash
systemctl start varnish
```

## Configurazione
Per poter funzionare con Nginx, Varnish dovrà essere messo in ascolto sulla porta **:80**, andiamo a modificare la sua unità su `systemctl`:

```bash
systemctl edit --full varnish
```

cerchiamo la seguente riga:

```
ExecStart=/usr/sbin/varnishd -a :6081 -f /etc/varnish/default.vcl -s malloc,256m
```

e modifichiamo il parametro della porta da **:6081** a **:80**:

```
ExecStart=/usr/sbin/varnishd -a :80 -f /etc/varnish/default.vcl -s malloc,256m
```

Una volta effettuata la modifica, salviamo e passiamo alla configurazione del server backend. Modifichiamo quindi il file di configurazione in posizione `/etc/varnish/default.vcl`, adattando il contenuto come il seguente:

```
backend myserver {
    .host = "127.0.0.1";
    .port = "8080";
}
```

infine riavviamo il servizio di `systemd`:

```bash
systemctl daemon-reload
```

A quel putno riavviamo ed abilitiamo il servizio di varnish:

```
systemctl restart varnish
systemctl enable varnish
```

Possiamo verificare che Varnish sia effettivamente in ascolto sulla porta **:80** via `netstat`:

```bash
netstat -tpln | grep 80
```

## SELinux
**SELinux** potrebbe influire sul corretto funzionamento di Varnish, per risolvere andiamo ad abilitare la regola `httpd_can_network_connect`:

```bash
setsebool -P httpd_can_network_connect 1
```


Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).