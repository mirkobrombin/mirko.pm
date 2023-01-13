---
class: post
title: '#howto - Introduzione a RPM Parte  2'
description: "In questa seconda guida dedicata a RPM, il gestore pacchetti sviluppato da Red Hat, vedremo alcuni comandi avanz.."
date: 2020-04-04
layout: post
author: Mattia Cosma
author_github: mattiacosma
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
In questa seconda guida dedicata a **RPM**, il gestore pacchetti sviluppato da Red Hat, vedremo alcuni comandi avanzati e utili per configurare a modo il nostro sistema.

Nel caso fossi nuovo e non avessi letto la prima parte, puoi recarti a [questo link](https://linuxhub.it/articles/howto-introduzione-a-rpm-parte-1).

## Aggiornamento

Per aggiornare un pacchetto la sintassi è pressapoco lo stessa dell'installazione.

RPM prima cercherà un versione vecchia del pacchetto: se trova una versione più recente viene aggiornato, altrimenti procede con l'installazione normale.

Il seguente comando è raccomandato quando si vuole evitare l'installazione di versioni multiple dello stesso pacchetto:

```bash
rpm -Uvh nomepacchetto.rpm
```

## Disintallazione

Un pacchetto RPM può essere disinstallato grazie al parametro **-e**:

```bash
rpm -e nomepacchetto
```

A volte quando si vuole rimuovere dei pacchetti è necessario lavorare con le dipendenze. Per ovviare a dei comuni errori è sufficiente utilizzare l'opzione **--nodeps**:

```bash
rpm -e nomepacchetto --nodeps
```

## Query

La possibilità di effettuare delle query può rivelarsi una funzione molto utile.

In genere una query viene effettuata inserendo l'opzione **-q** seguita dal comando di query. Ad esempio, se si vuole conoscere la versione di un pacchetto installato basterà digitare:

```bash
rpm -q nomepacchettonomepacchetto-2.0.9-64
```

## Ulteriori opzioni

Ecco una lista delle altre opzioni disponibili:

**-f** = se si vuole conoscere da quale pacchetto proviene un determinato file:

```bash
rpm -qf /usr/sbin/filenomepacchetto-2.0.9-64
```

**-i** = se si vuole ottenere informazioni su un determinato pacchetto:

```bash
rpm -qi nomepacchetto

```

**-l** = mostra i file di un pacchetto installato sul proprio sistema:

Esempio:

```bash
rpm -ql samba/usr/bin/addtosmbpass/usr/bin/convert_smbpasswd/usr/bin/mksmbpasswd.sh/usr/bin/smbadduser/usr/bin/smbpasswd/usr/bin/smbstatus.....
```

**-a** = Mostra una lista di tutti i pacchetti installati sul vostro sistema:

```bash
rpm -qa | grep nomepacchettonomepacchetto-2.0.9-64
```

Con questa guida concludiamo il nostro viaggio nel mondo del package manager RPM.

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://t.me/linuxpeople).