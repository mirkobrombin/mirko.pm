---
class: post
title: '#howto - Chiavi GPG' 
date: 2022-02-18 10:45
layout: post 
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- server
- chiavi
- gpg
- ubuntu
- debian
---

Molto probabilmente avete già letto l'articolo riguardo l'utilizzo delle [chiavi SSH](https://linuxhub.it/articles/howto-Chiavi-ssh/) e avete sicuramente capito che queste vengono usate per autenticarsi ad un server. Oggi parliamo, invece, di chiavi GPG, un ottimo metodo per inviare e ricevere messaggi criptati.


## GPG? Da dove deriva?

GNU Privacy Guard, o meglio conosciuto come GPG, è un software libero (rigorosamente) che fu ideato per sostituire la vecchia PGP (Pretty Good Privacy).

Attualmente vengono mantenuti 3 rami di sviluppo differente per questo software:

- **modern** v2.2.x, contiene tutte le funzionalità proposte

- **stable** v2.0x, consigliata per uso standard

- **classic** v1.4.x, disponibile per retro-compatibilità

## Dove posso installare la suite GPG?

GPG è disponibile su sistemi GNU/Linux, *BSD, Windows e MacOS. Questo ci permette di poter criptare e decriptare messaggi cifrati in qualsiasi sistema ci troviamo.

Esistono inoltre anche software grafici che semplificano l'uso di GPG come [Kleopatra](https://www.openpgp.org/software/kleopatra/) o [Seahorse](https://it.wikipedia.org/wiki/Seahorse).

## Concetto di chiave pubblica e privata

Il funzionamento di GPG si basa sull'uso di una coppia di chiavi *pubblica* e *privata*.

Come dice il nome la chiave pubblica è quella che possiamo condividere con terzi, mentre quella privata deve rimanere solo al proprietario.

Mettiamo caso una situazione dove Marco vuole inviare un messaggio criptato ad Andrea via GPG:

1) Marco scrive il messaggio e lo cripta con la chiave pubblica di Andrea
2) Marco invia il messaggio ad Andrea via mail o tramite altri servizi
3) Andrea riceve il messaggio e lo decripta attraverso la sua chiave privata
4) Andrea legge il messaggio e in caso risponde criptando il messaggio con la chiave pubblica di Marco

Da ciò abbiamo capito che per inviare messaggi criptati con GPG dobbiamo essere in possesso della chiave pubblica del destinatario mentre per decriptarli dobbiamo essere in possesso della chiave privata.

## Generazione della coppia di chiavi

Iniziamo a generare la nostra coppia di chiavi lanciando questo comando:

```shell
gpg --full-generate-key
```

Analizziamo il processo:

1) Ci viene chiesto che tipo di chiave creare, scegliamo l'opzione 1.
2) Ci viene chiesta la lunghezza della chiave, scegliamo 4096 bits dato che sarà ancora più difficile da bucare. Anche 3072 bits è una buona lunghezza quasi imbucabile, però è sempre meglio avere 4096 bits.
3) Ci viene chiesto di inserire il tempo per il quale la chiave rimarrà valida. Se si vuole specificare che la chiave scada fra 340 giorni basta semplicemente scrivere 340. Se invece si vuol far scadere la chiave fra 5 anni basta scrivere 5y. Oppure è possibile rendere la chiave valida a vita scrivendo 0.
4) Ora confermiamo le informazioni inserite con "y"
5) Inseriamo il nostro nome per la chiave, ad esempio "Andrea".
6) Inseriamo la nostra mail.
7) In caso aggiungiamo un commento come "Chiavi di Andrea"
8) Confermiamo scrivendo "O".
9) Infine inseriamo una password.
10) Ora dobbiamo fare qualche azione casuale, come scrivere cose a caso nel blocco note, per generare entropia.

## Esportiamo la nostra coppia di chiavi!

Ora che possediamo la nostra coppia di chiavi è necessario esportare rispettivamente chiave pubblica e privata.

Per esportare la chiave privata eseguiamo il seguente comando:

Iniziamo a generare la nostra coppia di chiavi lanciando questo comando:

```shell
gpg --armor --export-secret-key mailusatapergpg@dominio.com > private.gpg
```

Così facendo esporteremo la nostra chiave privata all'interno del file private.gpg in modo "armored", così da non ritrovarsi dati incomprensibili all'interno ma bensì qualcosa di più strutturato e leggibile.

Ora esportiamo la nostra chiave pubblica:

```shell
gpg --armor --export mailusatapergpg@dominio.com > public.gpg
```

## Creiamo il certificato di revoca

Se per caso dovessimo perdere la nostra chiave privata è molto importante avere un certificato di revoca con se in modo da poter segnalare il fatto che la chiave non è più valida. Il certificato di revoca torna molto utile quando la propria chiave viene pubblicata in un keyserver. 

Tutti gli utenti che cercheranno la nostra chiave nel keyserver, se la revocheremo, vedranno che essa è stata revocata, permettendo all'utente di capire che quella chiave non deve essere usata.

Per generare un certificato di revoca eseguiamo il seguente comando:

```shell
gpg --output revoke.asc --gen-revoke mailusatapergpg@dominio.com
```

## Inviamo un messaggio criptato!

Per prima cosa dobbiamo importare nel nostro portachiavi di GPG la chiave pubblica del destinatario.

Per farlo eseguiamo questo comando:

```shell
gpg --import chiavepubblicadestinatario
```

Durante l'importazione notiamo anche altri dati associati alla chiave pubblica del destinatario come la mail oppure il suo ID univoco che ci saranno utili per specificare il destinatario del file.

Ora possiamo creare il messaggio criptato con la chiave pubblica del destinatario:

```shell
gpg --output documentocriptato.gpg --encrypt --sign --armor --recipient maildestinatario@dominio.com doc-to-encrypt.txt
```

Così facendo cripteremo con la chiave pubblica del destinatario, la quale viene presa dalla mail specificata perché essa è associata al file `chiavepubblicadestinatario`, il file `testo.txt` ottenendo il file criptato `documentocriptato.gpg`. Quest'ultimo dovrà essere mandato al destinatario così che lo possa ricevere e decriptare con la sua chiave privata.

## Decriptiamo un messaggio!

Dopo aver inviato il messaggio al destinatario, riceviamo risposta. La risposta è chiaramente criptata con la nostra chiave pubblica e l'unico modo per leggere la risposta è decriptare il file con la nostra chiave privata tramite questo comando:

```shell
gpg --decrypt testodirisposta.txt.gpg > rispostaplain.txt
```

## Conclusioni

Oggi abbiamo imparato come generare una coppia di chiavi GPG, assieme al certificato di revoca, e come inviare e ricevere messaggi criptati utilizzando chiave pubblica e privata! 
