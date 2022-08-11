---
title: '#howto – Autenticazione via chiave SSH su server Centos/Fedora/Debian/Ubuntu e derivate'
description: "Oltre ai grossi benefici sulla comodità che una chiave SSH offre rispetto alle password, sono molti i motivi per cui è im.."
date: 2019-05-31
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ssh
  - fedora
  - centos
  - ubuntu
  - debian
---
Oltre ai grossi benefici sulla comodità che una chiave SSH offre rispetto alle password, sono molti i motivi per cui è importante scegliere una chiave rispetto allo standard più comune di autenticazione, in primis la sicurezza.

Il processo di autenticazione attraverso chiave avviene tramite la verifica in due parti, una server e l'altra client. Dopo la richiesta di accesso, il server invia un messaggo codificato al client e ne attende la decodifica basata sulla chiave presente sul nostro PC (client) e se l'esito è positivo, permette l'accesso.

## Creazione della chiave RSA

Procediamo quindi con la creazione della chiave sul nostro PC, in questo si tratta di una chiave RSA a 2048-bit, ossia una chiave decisamente complessa da raggirare.

> Le chiavi da 2048-bit sono al momento le più diffuse ma per questo non meno sicure. Lo standard massimo per una chiave è di 4096-bit, equivalente ad una password di 12 caratteri misti.

Per creare la nostra chiave possiamo usare **ssh-keygen**:

    ssh-keygen

a cui possiamo passare l'opzione **-b** con uno una dimensione differente, ad esempio 4096 (di base sarà 2048).

Come output del comando precedente, riceviamo la richiesta di inserire una locazione in cui salvare la nostra chiave, possiamo premere semplicemnete **Invio** per salvarla nella cartella **.ssh** nella nostra **/home**, successivamente ci verrà chiesto di inserire una **passphrase** (frase di accesso), si tratta di un valore opzionale raccomandato che aggiunge un secondo livello di sicurezza alla nostra chiave.

> La passphrase verrà richiesta all'accesso come una normale password, subito dopo l'approvazione della chiave.

Una volta finito, nella locazione scelta (.ssh), sono presenti le due chiavi (pubblica e privata).

## Configurazione server

Ora che le nostre chiavi sono pronte, possiamo procedere con la configurazione vera e propria sul server.

Tutto il processo di configurazione della chiave è semplificato grazie a **ssh-copy-id**, offerto di base nella maggior parte delle distribuzioni Linux. Avviamo quindi il tool sul nostro PC (client):

    ssh-copy-id utente@server

dove:

*   **utente ** è l'username a cui abbiamo accesso sul server
*   **server** il dominio o indirizzo IP del server

ci verrà mostrato un output simile:

    The authenticity of host 'server' can't be established.ECDSA key fingerprint is ----.Are you sure you want to continue connecting (yes/no)? yes

a cui rispondiamo **yes** (potrebbe non essere necessario in caso questa non è la prima volta in cui facciamo accesso via SSH al server).

Una volta trovata la chiave creata precedentemente, ci verrà richiesta la password dell'utente sul server, digitiamola e premiamo invio, dovremmo avere un risultato come il seguente:

    Number of key(s) added: 1

il che significa che la chiave è stata copiata correttamente sul server. Da ora le prossime connessioni SSH da client a server non richiedono password (a meno che non sia stata inserita una passphrase).

### Disabilitazione della password

Come forma di sicurezza, è consigliato disabilitare il login ssh via password, vincolando esclusivamente l'accesso via chiave SSH, per fare ciò apriamo il file **/etc/ssh/sshd_config** sul server col nostro editor preferito, ad esempio **nano**:

    sudo nano /etc/ssh/sshd_config

sfruttiamo la combinazione **CTRL+W** (in caso di nano) e cerchiamo il parametro **PasswordAuthentication**, da modificare come segue:

    PasswordAuthentication no

salviamo (**CTRL+X)** e riavviamo il processo **ssh**:

    sudo systemctl restart sshd

Da ora le prossime connessioni SSH non accettano l'accesso tramite password.

_Good ***nix**?_  
_ - Mirko_