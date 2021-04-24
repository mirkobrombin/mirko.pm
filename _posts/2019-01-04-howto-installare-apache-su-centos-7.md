---
title: '#howto - Installare Apache su Centos 7'
description: "Apache è uno dei Web server più famosi ed utilizzati al mondo. In questa guida ne trattiamo l'installazione su Centos 7."
published: 2019-01-04
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - apache
  - nginx  
---
Apache è uno dei Web server più famosi ed utilizzati al mondo, in questa guida vediamo come installare e configurare un Web server con Apache su Centos 7.

## Installazione

Per prima cosa procediamo con l'installazione. Come da prassi quindi con **yum**:

    sudo yum -y install httpd

Per garantire il corretto funzionamento di apache, è buona idea quella di abilitarne l'auto-avvio al riavvio del server, questo via **systemctl**:

    sudo systemctl enable httpd

in questo modo verrà riavviato ogni qualvolta il server tornerà operativo.

## Configurazione firewall

Nel caso fosse attivo il firewall di sistema, dobbiamo aprire le porte per garantire il corretto entrare/uscire delle connessioni dalle porte **80** e **443**:

    sudo firewall-cmd --permanent --zone=public --add-service=httpsudo firewall-cmd --permanent --zone=public --add-service=httpssudo firewall-cmd --reload

## Configurazione di Apache

Apache come altri Web server, è disponibile una volta installato. È infatti possibile visitare l'indirizzo IP pubblico del server e notare una pagina di test gentilmente offerta da Apache. Ciò nonostante non significa che sia pronto all'uso, per questo motivo andiamo ora a creare una conifugrazione ipotizzando un dominio di prova ossia: **il_mio_dominio.ex**.

### Struttura locazione

Apache viene fornito con una struttura base per il posizionamento dei nostri siti web:

    /var/www/??? il_mio_dominio.ex?   ??? public_html??? il_mio_secondo_dominio.ex?   ??? public_html

dove:

*   /var/www - è la locazione principale contenente tutti i nostri siti web
*   il_mio_dominio.ex - è lo spazio dedicato al nostro sito web
*   public_html - la cartella dedicata ai file pubblici del sito web, ossia quelli che verranno mostrati e resi raggiungibili dal browser dell'utente

Per prima cosa andiamo quindi a creare la locazione dove posizionare i dati per il nostro sito web:

    mkdir -p /var/www/il_mio_dominio.ex/public_html

dove **il_mio_dominio.ex** è il nome della nostra cartella dedicata al dominio il_mio_dominio.ex. Impostiamo ora i permessi corretti:

    sudo chown apache:apache /var/www/il_mio_dominio.ex

e creiamo un file di prova:

    touch /var/www/il_mio_dominio.ex/index.htmlecho "Buon divertimento da linuxhub.it!" > /var/www/il_mio_dominio.ex/index.html

### Creazione Virtual host

Un Virtual host può essere inteso come un set di istruzioni che istruiscono Apache alla identificazione di un sito web. Di base Apache cerca queste istruzioni in **/etc/httpd/conf.d/**, andiamo quindi a creare il nostro primo virtualhost (o vhost).

Creiamo il file **/etc/httpd/conf.d/il_mio_dominio.ex.conf** col seguente contenuto:

    <VirtualHost *:80>    ServerName il_mio_dominio.ex    ServerAlias www.il_mio_dominio.ex    ServerAdmin admin@il_mio_dominio.ex    DocumentRoot /var/www/il_mio_dominio.ex/public_html    <Directory /var/www/il_mio_dominio.ex/public_html>        Options -Indexes +FollowSymLinks        AllowOverride All    </Directory>    ErrorLog /var/log/httpd/il_mio_dominio.ex-error.log    CustomLog /var/log/httpd/il_mio_dominio.ex-access.log combined</VirtualHost>

di cui seguono i dettagli:

*   <VirtualHost> - è il blocco contenente la configurazione del nostro vhost
*   ServerName - il nostro dominio
*   ServerAlias - in questo caso serve a far funzionare il nostro dominio col prefisso www
*   DocumentRoot - la locazione dove sono presenti i file del nosto sito web
*   <Directory> - è la configurazione di una locazione e fornisci set di istruzioni specifiche per essa
*   ErrorLog e CustomLog - sono le posizioni dedicate ai file di logging per la fase di debug

controlliamo la configurazione:

    sudo apachectl configtest

e riavviamo per completare:

    sudo systemctl restart httpd

Visitiamo ora il nostro dominio per verificarne il corretto funzionamento.

In questo modo ogni volta che vogliamo aggiungere un nuovo dominio a nginx, sarà necessario creare un file di configurazione in **/etc/httpd/conf.d/** e la locazione in **/var/www**.

_Good ***nix**?_  
_ - Mirko_