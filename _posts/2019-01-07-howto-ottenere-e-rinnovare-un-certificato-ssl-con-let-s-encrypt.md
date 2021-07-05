---
title: "#howto - Ottenere e rinnovare un certificato SSL con Let's Encrypt"
description: "Let's Encrypt è una autorità di certificazione che automatizza gratuitamente la creazione, la validazione, il rilascio ed il rinn.."
date: 2019-01-07
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - centos  
  - letsencrypt  
  - github
---
**Let's Encrypt** è una autorità di certificazione che automatizza gratuitamente la creazione, la validazione, il rilascio ed il rinnovo di certificati SSL.

In questa guida vediamo come ottenere gratuitamente un certificato SSL **Let’s Encrypt** via riga di comando con **letsencrypt**.

## Requisiti

Il certificato viene generato tramite un applicativo messo a disposizione da Let’s Encrypt. Lo strumento è disponibile tramite git, per questo è necessaria l'installazione di **git** nel sistema. Indifferentemente dalla distribuzione installata, il pacchetto si chiama nello stesso modo, ad esempio per installarlo in Centos 7:

    sudo yum install git

mentre per Ubuntu e derivate:

    sudo apt install git

## Utilizzo di Let's Encrypt

Una volta installato git possiamo procedere clonando il sorgente dalla repository, portiamoci nella locazione **/opt**:

    cd /opt

e cloniamo **letsencrypt**:

    cd letsencryptgit clone https://github.com/letsencrypt/letsencrypt

### Generare il certificato

Possiamo ora generare manualmente il nostro certificato **letsencrypt**:

    ./letsencrypt-auto certonly --standalone -d il_mio_dominio.ex -d www.il_mio_dominio.ex

dove **il_mio_dominio.ex **e **www.il_mio_dominio.ex** (i valori preceduti dalla flag **-d**) sono il dominio a cui vogliamo legare il certificato SSL. Una volta lanciato il comando possiamo seguire la procedura guidata.

Il nuovo certificato sarà disponibile alla locazione **/etc/letsencrypt/live/il_mio_dominio.ex**, pronto per essere utilizzato nella configurazione di Nginx, Apache o terzi.

Desideri configurare Nginx utilizzando il nuovo certificato SSL Let's Encrypt? Esiste una guida #howto disponibile a [questo link](https://linuxhub.it/article/howto-installare-nginx-su-centos-7-e-configurazione-ssl#title5).

### Rinnovo del certificato

Ogni certificato deve essere rinnovato alla sua sadenza, questa scadenza viene mostrata in fase di creazione e rinnovo dello stesso. Per rinnovare il nostro certificato possiamo procedere nel seguente modo:

    cd /opt/letsencryptsudo -H ./letsencrypt-auto certonly --standalone --renew-by-default -d il_mio_dominio.ex -d www.il_mio_dominio.ex

una volta completato il rinnovo ci verrà fornita la nuova data di scadenza.

_Good ***nix**?_  
_ - Mirko_