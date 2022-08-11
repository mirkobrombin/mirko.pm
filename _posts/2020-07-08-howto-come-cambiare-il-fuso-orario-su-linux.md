---
title: '#howto - Come cambiare il fuso orario su Linux'
date: 2020-07-08
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Su Linux, così come in tutti i sistemi operativi principali, avere il **fuso orario**, e dunque data e ora, configurati correttamente in base alla nostra locazione è essenziale per evitare che alcune operazioni vengano effettuate in un orario sbagliato, come un cron job o un riavvio pianificato del sistema.

Normalmente il fuso orario viene impostato durante l'installazione di qualsiasi distribuzione, ma a volte potrebbe non essere così. In questa guida vedremo come cambiare manualmente il fuso orario con un semplice comando, `timedatectl`.

> Nota: per sfruttare questo comando è necessario avere installato `systemd`.

## Verificare il fuso orario attuale

Supponiamo di star lavorando su un server che non si trova in Italia ma, ad esempio, in Regno Unito dove il fuso orario è diverso da quello del nostro Paese. L'output di `timedatectl` in quel caso dovrebbe essere simile al seguente:

```bash
Local time: Fri 2020-07-03 14:28:17 UTC

Universal time: Fri 2020-07-03 14:28:17 UTC

RTC time: n/a

Time zone: UTC (UTC, +0000)

System clock synchronized: yes
NTP service: active

RTC in local TZ: no
```

Un altro modo per trovare il proprio fuso orario è quello di catturare con cat il contenuto del file `/etc/timezone`:

```bash
cat /etc/timezone
```

dove l'output sarà simile al seguente:

```bash
UTC # Sarà mostrato il fuso orario attivo
```

## Cambiare il fuso orario

Se volessimo invece spostare il server in Italia oppure configurarlo per fare in modo che l'orario sia quello del Centro-Europa, possiamo utilizzare, come già anticipato in precedenza, `timedatectl`.

Per prima cosa vediamo quali sono le diverse regioni con il comando:

```bash
timedatectl list-timezones
```

l'output dovrebbe restituire una lunga lista delle diverse regioni e città configurabili. Scegliamo quella nostrana, **Europe/Rome**, e utilizziamo `timedatectl` in questo modo:

```bash
timedatectl set-timezone fuso_orario
```

dove *fuso_orario* lo sostituiamo con quello di Roma:

```bash
timedatectl set-timeztone Europe/Rome
```

e controlliamo che le modifiche siano state applicate correttamente:

```bash
Local time: Fri 2020-07-03 16:36:26 CEST
Universal time: Fri 2020-07-03 14:36:26 UTC

RTC time: n/a

Time zone: Europe/Rome (CEST, +0200)

System clock synchronized: yes
NTP service: active

RTC in local TZ: no
```

## Risoluzione dei problemi

In alcune distribuzioni Linux o per altri fattori, una volta eseguito questo comando e riavviato il dispositivo, il fuso orario tornerà ad essere quello precedente. Per risolvere questo problema, rieseguiamo `timedatectl` e modifichiamo il file `/etc/sysconfig/clock` (se esistente) aggiungendo la propria zona:

```bash
ZONE="Zona/Città"
```

Fatto ciò non dovrebbero più esserci problemi al riavvio del PC o server.



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul [nostro gruppo Telegram](https://t.me/linuxpeople).