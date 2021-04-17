---
title: "#howto - Installazione e configurazione di Nginx con Let's Encrypt su Debian 10"
published: 2020-01-22
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - nginx 
  - letsencrypt 
  - python  
  - bash  
  - systemd 
---
In questa guida andremo a vedere come procedere alla installazione e configurazione con Let’s Encrypt di Nginx su Debian 10.

## Installazione di Nginx

L'installazione del seguente web server è piuttosto semplice essendo incluso nei repository Debian Buster predefiniti. Come prima cosa aggiorniamo il gestore dei pacchetti con:

```bash
sudo apt update
```

Dopodichè procediamo all'installazione di Nginx:

```bash
sudo apt install nginx
```

Una volta terminata l'installazione, il servizio si avvierà automaticamente. Per verificare il suo stato andiamo a digitare:

```bash
sudo systemctl status nginx
```

Se avete eseguito tutto correttamente vi comparirà un output simile a questo:

```bash
nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-01-16 14:20:30 CET; 9s ago
```

Infine abilitiamo l'esecuzione al riavvio del server, così da riavviarsi ogni volta che il server tornerà online:

```bash
sudo systemctl enable nginx
```

> La prossima parte della guida non sarà obbligatoria per chi non utilizza alcun tipo di firewall.

## Regolazione del firewall

Per gli utenti che utilizzano `ufw` possono aprire la porta HTTP (`80`) abilitando il profilo `'Nginx HTTP'`:

```bash
sudo ufw allow 'Nginx HTTP'
```

Per chi invece utilizza `nftables` per aprire la porta HTTP è necessario eseguire questo comando:

```bash
nft add rule inet filter input tcp dport {80} ct state new,established counter accept
```

## Configurazione Nginx con Let’s Encrypt

Ora procediamo alla configurazione con *Let's Encrypt*, una certification authority che fornisce certificati SSL gratuiti con un sistema automatizzato. 

Come primo step installiamo alcune dipendenze: 

```bash
sudo apt install python3-acme python3-certbot python3-mock python3-openssl python3-pkg-resources python3-pyparsing python3-zope.interface
```

Adesso possiamo installare il pacchetto `python3-certbot-nginx`:

```bash
sudo apt install python3-certbot-nginx
```

Ora dobbiamo far sì che Certbot rilevi il "blocco" server corretto nella nostra configurazione di Nginx cosi da configurare SSL automaticamente.

Supponendo di aver già settato il nostro "blocco" server, dovremmo avere all'interno di */etc/nginx/sites-available/nostro_dominio*  il nome del nostro server settato correttamente.

Per verificare ciò apriamo la seguente directory con il nostro text editor preferito:

```bash
sudo nano /etc/nginx/sites-available/nostro_dominio
```

E cerchiamo la stringa *server_name*:

```bash
server_name nostro_dominio www.nostro_dominio;
```

Se il risultato è corretto, possiamo uscire dal nostro editor e muoverci nel prossimo step.

In caso contrario, salviamo il file, usciamo dal editor e verifichiamo la sintassi della nostra configurazione:

```bash
sudo nginx -t
```

Se si ottiene un errore, riaprire il file e verificare che non ci sia alcun tipo di carattere errato o mancante.

Una volta fatto ciò, ricaricare Nginx con la nuova configurazione:

```bash
sudo systemctl reload nginx
```

Se tutto ha funzionato correttamente, possiamo procedere ad aggiornare il firewall per consentire il traffico HTTPS.

## Consentire il traffico HTTPS tramite Firewall

Se si possiede `ufw` come firewall, bisognerà aggiustare alcune impostazioni per consentire il traffico HTTPS.

Per vedere lo stato corrente digitiamo:

```bash
sudo ufw status
```

Dovrebbe dare un output del genere, simbolo che solo il traffico HTTP è consentito:

```bash
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

Per consentire il traffico HTTPS è necessario consentire il profilo `'Nginx-Full'` e eliminare `'Nginx-HTTP'`:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Ora digitando di nuovo:

```bash
sudo ufw status
```

L'output dovrebbe risultare nel seguente modo:

```bash
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

## Ottenere un certificato SSL

È tempo di generare il nostro certificato SSL sfruttando il plugin installato in precedenza, ovvero Certbot.

Per fare ciò digitiamo:

```bash
sudo certbot --nginx -d nostro_dominio -d www.nostro_dominio
```

Se è la prima volta che si esegue `certbot` vi verrà chiesto di inserire la vostra mail e di accettare i termini e condizioni. Una volta fatto ciò, Certbot comunicherà con i server di Let's Encrypt e verificherà se sei tu il proprietario del dominio al quale stai richiedendo un certificato.

Se il processo termina correttamente, Certbot ti chiederà come vorresti configurare le impostazioni per il certificato HTTPS:

```bash
OutputPlease choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

Una volta fatte le vostre scelte vi apparirà un messaggio riguardo alla corretta esecuzione del processo:

```bash
Output
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/your_domain/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/your_domain/privkey.pem
   Your cert will expire on 2019-10-08. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

Ecco a voi i certificati scaricati, installati e caricati, l'unica cosa che vi rimane è di ricaricare il vostro sito web per verificarne il corretto funzionamento.

Per ulteriori chiarimenti visitare il nostro [gruppo Telegram](https://t.me/gentedilinux).