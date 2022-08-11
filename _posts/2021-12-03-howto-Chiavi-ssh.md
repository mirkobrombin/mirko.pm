---
title: '#howto - Chiavi SSH' 
date: 2021-12-03 13:15
layout: post 
author: Alphvino
author_github: Alphvino
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- server 
- ssh 
- archlinux
- ubuntu
- fedora
---

Conoscere l'uso delle chiavi SSH è, al giorno d'oggi una conoscenza essenziale.
Rispetto alle classiche password, che possono essere forzate attraverso un attacco a dizionario, le chiavi SSH sono in grado di resistere a questo tipo di forzatura. 
In questo articolo scopriamo come generare una coppia di chiavi SSH e sfruttarle per l'accesso a un server GNU/Linux!

## Teoria sulle chiavi SSH

Una coppia di chiavi SSH è suddivisa in due chiavi: Pubblica e Privata.

La chiave pubblica è in grado di criptare dati che solo la corrispondente chiave privata è in grado di decriptare. La chiave privata è in grado di decrptare ciò che viene criptato con la corrispondente chiave pubblica.

## Funzionamento di un login tramite chiavi SSH

Durante un login tramite SSH attraverso l'uso delle chiavi SSH avvengono le seguenti cose:

- Il client inizializza una connessione SSH al server inviando ad esso la chiave pubblica con la quale vuole accedere

- Il server controlla che la chiave SSH pubblica sia presente all'interno del file `authorized_keys`. Se così è, si procede l'autenticazione

- Il server invia un messaggio casuale al client, criptandolo con la chiave pubblica inviata al server, dal client, nel punto 1

- Il client, attraverso la chiave privata, decripta il messaggio inviato dal server

- Il client invia al server il messaggio decriptato

- Se i messaggi corrispondono allora il client può avere accesso al server

## Generazione delle chiavi SSH

Per generare una coppia di chiavi SSH utilizzeremo l'algoritmo "ED25519".

Spesso viene anche usato "RSA" come algoritmo, però presenta dei problemi, come il fatto di non essere resiliente a collisioni di funzioni hash, ossia quando un valore viene hashato nello stesso modo con il quale è stato hashato un altro valore. Tramite ED25519 questo problema viene risolto!

Dunque, generiamo la nostra coppia di chiavi SSH:

```bash
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "Coppia chiavi SSH di tuo nome"
```

Analizziamo le flag:

- -o: Indica che la coppia di chiavi SSH va slavata usando il nuovo formato OpenSSH e non più il formato PEM

- -a: Indica quante volte eseguire la KDF(Key Derivation Function). Maggiore è questo valore e maggiore è il tempo di verifica della password della chiave da parte del server della chiave

- -t: Indica che algoritmo usare, in questo caso ED25519

- -C: Indica un commento da poter inserire

Avviando questo comando, il software **ssh-keygen** ci chiederà di immettere una password con la quale criptare la nostra chiave privata per una maggiore sicurezza. 
Nel malaugurato caso in cui qualcuno ci rubasse la nostra chiave privata, non sarebbe  in grado di utilizzarla perché non conoscerebbe la password di essa.

## Importazione delle chiavi SSH sul server

Ora che possediamo la nostra coppia di chiavi SSH dobbiamo aggiungere al file `authorized_keys` la nostra chiave pubblica.

Per farlo usiamo un altro software chiamato **ssh-copy-id**, il quale dovrà connettersi per l'ultima volta attraverso l'uso della password al server per importare la chiave pubblica, tramite questo comando

```bash
ssh-copy-id utente@ipserver
```

In questo comando bisognerà sostituire ***utente*** con il nome utente che si desidera usare per l'autenticazione tramite chiavi SSH e ***ipserver*** che andrà sostituito con l'IP del server al quale connettersi.

## Passaggi finali

Adesso che abbiamo configurato l'accesso tramite chiavi SSH è consigliato effettuare dei passaggi per aumentare la sicurezza nell'accesso al server
Questi passaggi consistono nel cambiare la porta in ascolto del server SSH, che di default è 22, a una porta diversa come la **34821** e accettare solo autenticazioni tramite chiavi SSH.

La porta 22 infatti viene principalmente usata a scopi di bruteforce cioé a scopo di forzatura. Anche se usiamo l'autenticazione tramite chiavi SSH è consigliabile cambiare la porta di ascolto del server SSH.

Per farlo andremo ad editare il seguente file: `/etc/ssh/sshd_config`

Dato che  il tempo è denaro, tramite questo comando saremo in grado di completare i passaggi in modo semplice:

```bash
sed -i '1s/^/Port 34821\nPasswordAuthentication no\n/' /etc/ssh/sshd_config
```
