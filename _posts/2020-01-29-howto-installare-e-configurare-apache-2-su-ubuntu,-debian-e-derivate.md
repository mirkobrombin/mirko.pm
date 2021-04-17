---
title: '#howto - Installazione di Apache 2 su Ubuntu, Debian e derivate e configurazione del SSL'
published: 2020-01-29
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - apache  - bash
---
Una delle principali alternative al conosciutissimo Nginx è sicuramente **Apache**, web server molto utilizzato per via della sua semplicità, dei moduli che lo estendono e del suo supporto riconosciuto da quasi tutti i principali CMS e non solo.

In questa guida vedremo come installare e configurare correttamente Apache2 sulle distribuzioni **Ubuntu, Debian e derivate**.

## Installazione

Per installare Apache2 su Ubuntu e Debian dobbiamo utilizzare un semplice comando che, tramite il package manager *apt*, ci permetterà di scaricare direttamente dalle repo delle distro il pacchetto apposito.

Prima aggiorniamo le repo con:

```bash
sudo apt update
```

e installiamo Apache via:

```bash
sudo apt install apache2
```

## Configurazione del firewall

Chi possiede un **firewall** attivo sul proprio server, come ad esempio il pre-installato *ufw*, dovrà aprire le porte per i protocolli web principali, ossia **HTTP** e **HTTPS**. Per farlo possiamo eseguire i seguenti comandi:

```bash
# HTTP
sudo ufw allow 80

# HTTPS
sudo ufw allow 443
```

oppure:

```bash
# HTTP
sudo ufw allow 'Apache'

# HTTPS
sudo ufw allow 'Apache Full'
```

## Verifica del funzionamento

Dopo aver installato il software e aver aperto correttamente le porte sul proprio firewall, è possibile verificare se il nostro web server con Apache2 è già funzionante. Per fare ciò, possiamo recarci all'**indirizzo IP** del nostro server senza dover specificare alcuna porta. La pagina che dovremmo trovarci davanti è simile a questa di benvenuto (**Apache2 Debian Default Page**).

## Configurazione di Apache2

Ora che abbiamo verificato il funzionamento di Apache tramite l'IP del server, è necessario configurare i **Virtual Hosts** per poter accedere ai nostri siti web tramite il dominio da noi posseduto.

Per fare tutto questo, creiamo prima una cartella in cui andranno i file del nostro sito in una posizione qualsiasi:

```bash
sudo mkdir /var/www/sitoweb/
```

otteniamo i permessi di scrittura:

```bash
sudo chown -R $user:$user /var/www/sitoweb/
```

e per essere sicuri di aver impostato i giusti permessi digitamo il seguente comando:

```bash
sudo chmod -R 755 /var/www/sitoweb/
```

Ora, in questa cartella creiamo un file *.html* con del testo di prova:

```bash
nano /var/www/sitoweb/index.html
```

```html
<html>
    <head>
        <title>Sito di prova</title>

    </head>
    <body>
        <h1>Se vedi questo, il tuo Virtual Host funziona correttamente!</h1>

    </body>
</html>
```

Salviamo e chiudiamo il file quando abbiamo finito di modificarlo a nostro piacimento.



Ora, creiamo un nuovo Virtual Host nella cartella di Apache:

```bash
sudo nano /etc/apache2/sites-available/sitoweb.conf
```

e inseriamo il seguente testo con dei parametri che spiegherò tra pochissimo:

```apacheconf
<VirtualHost *:80>
    ServerAdmin webmaster@localhost  
    ServerName sitoweb
    ServerAlias sitoweb
    DocumentRoot /var/www/sitoweb
    ErrorLog ${APACHE_LOG_DIR}/error.log    
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### Spiegazione dei parametri

Di seguito la spiegazione della precedente configurazione:

- *VirtualHost* - indica l'indirizzo IP e la porta del nostro sito web

- *ServerAdmin* - indica la mail di contatto dell'amministratore del server

- *ServerName* - indica il nostro dominio (sitoweb.it)

- *ServerAlias* - indica gli alias del nostro dominio (www.sitoweb.it, sottodominio.sitoweb.it)

- *DocumentRoot* - indica la cartella in cui si trovano i file del nostro sito web

- *ErrorLog* - indica la cartella dei log di errore di Apache2

- *CustomLog* - indica la cartella dei log di accesso di Apache2

Ora abilitiamo il nostro sito con il seguente comando:

```bash
sudo a2ensite sitoweb.conf
```

disabilitiamo il sito di esempio:

```bash
sudo a2dissite 000-default.conf
```

controlliamo se ci sono errori di configurazione:

```bash
sudo apache2ctl configtest
```

l'output corretto dovrebbe essere il seguente:

```bash
Output
Syntax OK
```

e riavviamo Apache2 per applicare le modifiche:

```bash
sudo systemctl restart apache2
```

Accedendo al dominio da noi configurato dovremmo trovarci di fronte ad una pagina che cita: **Se vedi questo, il tuo Virtual Host funziona correttamente!**.

## Configurazione certificato SSL

Se abbiamo intenzione di rendere pubblico il sito utilizzando il protocollo HTTPS, sarà necessario possedere un **certificato SSL** rilasciato da un'ente autorizzato oppure utilizzandone uno self-signed.

In questi passaggi vedremo come creare un certificato **self-signed** e configurarlo correttamente nel nostro server. Se si volesse invece utilizzare Let's Encrypt, è possibile consultare [questa guida]([https://linuxhub.it/articles/howto-ottenere-e-rinnovare-un-certificato-ssl-con-let-s-encrypt]).

Per prima cosa, creiamo il certificato con OpenSSL con i seguenti comandi:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt

sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

e creiamo un file in cui andremo ad impostare la nostra configurazione dell'SSL:

```bash
sudo nano /etc/apache2/conf-available/ssl-params.conf
```

inseriamo il seguente codice:

```apacheconf
SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH
SSLProtocol All -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
SSLHonorCipherOrder On
# Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
SSLCompression off
SSLUseStapling on
SSLStaplingCache "shmcb:logs/stapling-cache(150000)"
SSLSessionTickets Off
```

salviamo il file, usciamo dall'editor di testo e modifichiamo il nostro Virtual Host aggiungendo il seguente blocco:

```apacheconf
<VirtualHost *:443>
    ServerAdmin webmaster@localhost
    ServerName sitoweb
    DocumentRoot /var/www/sitoweb
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
</VirtualHost>
```

Per forzare il **redirect** da HTTP ad HTTPS possiamo aggiungere nel VirtualHost della porta 80 il seguente parametro:

```apacheconf
<VirtualHost *:80>
    . . .
    Redirect "/" "https://sitoweb.tld/"
    . . .

</VirtualHost>
```

Abilitiamo alcuni moduli per permettere il funzionamento corretto dei parametri degli SSL snippets scritti in precedenza:

```bash
sudo a2enmod ssl
sudo a2enmod header
```

Abilitiamo la configurazione dell'SSL:

```bash
sudo a2enconf ssl-params
```

Controlliamo che non ci siano errori nella sintassi:

```bash
sudo apache2ctl configtest
```

E riavviamo Apache:

```bash
sudo systemctl restart apache2
```

Fatto ciò, visitiamo il nostro dominio per verificare che tutto funzioni a dovere.

Per dubbi o domande, non esitate a contattarci tramite il nostro [gruppo Telegram](https://t.me/gentedilinux).
