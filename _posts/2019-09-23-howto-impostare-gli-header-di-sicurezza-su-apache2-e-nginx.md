---
title: '#howto - Impostare gli header di sicurezza su Apache2 e Nginx'
description: "Possedete uno o più siti web, avete intero accesso al server e volete potenziare la loro sicurezza? Potete farlo con gli.."
date: 2019-09-23
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - nginx  
  - apache
---
Possedete uno o più siti web, avete intero accesso al server e volete potenziare la loro sicurezza? Potete farlo con gli **header di sicurezza**.

## Cosa sono gli header di sicurezza?

Gli header di sicurezza sono degli **header HTTP** ricevuti in risposta dal browser utilizzati per **migliorare la protezione** di un'applicazione web. Una volta impostati, questi header limitano i browser moderni dal cadere facilmente in alcune vulnerabilità conosciute e prevenibili.

## È facile impostare gli header di sicurezza?

Assolutamente sì. Infatti, è solamente necessario possedere l'accesso alle configurazioni di Apache2 o Nginx dei propri siti web, e dopo aver inserito delle piccole, ma utili stringhe di testo, il gioco sarà fatto.

## Principali header di sicurezza

Vediamo assieme una lista dei principali header di sicurezza, altamente consigliati da impostare:

*   **HTTP Strict Transport Security (HSTS)**
*   **X-Frame-Options**
*   **X-XSS-Protection**
*   **X-Content-Type-Options**
*   **Content-Security-Policy**
*   **Referrer-Policy**

## HTTP Strict Transport Security (HSTS)

L'HTTP Strict Transport Security, abbreviato in HSTS, è un meccanismo della policy della sicurezza web che aiuta a proteggere i siti web contro gli attacchi downgrade e l'hijacking dei cookie. L'HSTS indica ai web server che le connessioni con i browser (o user agent) devono essere effettuate **solamente in HTTPS**, e mai attraverso l'insicuro protocollo HTTP. La policy può essere impostata inserendo nella propria configurazione l'header Strict-Transport-Security, e deve essere utilizzato solo se desiderate che le connessioni al vostro sito web arrivino esclusivamente in HTTPS.

Un esempio di configurazione di questo header è il seguente:

    Strict-Transport-Security: max-age=31536000 ; includeSubDomains

Il parametro _max-age_ serve per indicare il tempo in cui il browser si deve ricordare che l'accesso al sito internet deve essere effettuato solo via HTTPS. _includeSubDomains_, invece, è un parametro opzionale, e può essere inserito per indicare che l'HSTS deve essere applicato anche ai sottodomini, nel caso ne aveste qualcuno.

## X-Frame-Options

L'header di risposta **X-Frame-Options** serve a proteggere le applicazioni web dal fenomeno chiamato Clickjacking. Esso indica al browser che non deve in alcun modo mostrare i contenuti trasmessi in frame di altre pagine web.

Un esempio di configurazione di X-Frame-Options è il seguente:

    X-Frame-Options: deny

Il valore deny vieta in tutti i modi che un frame mostri i contenuti di altre pagine web. A questo header possono essere impostati più valori:

*   deny
*   sameOrigin
*   allow-from: Dominio

Il primo. _deny_, è già stato spiegato. Impostando, invece, _sameOrigin_, si obbliga il browser a bloccare quanto impostato in un frame solamente se l'origine dei contenuti non è la stessa del sito web che si sta visitando. _allow-from: Dominio_ permette che il frame mostri dei contenuti solamente se provenienti da un dominio specificato.

## X-XSS-Protection

L'header **X-XSS-Protection** imposta delle regole per il filtro che protegge il browser dal Cross-Site Scripting, noto appunto come XSS.

Vediamo un esempio di impostazione dell'X-XSS-Protection:

    X-XSS-Protection: 1; mode=block

Ecco tutti i valori impostabili all'header:

*   _0_, disabilita il filtro
*   _1_, abilita il filtro, e quando si rileva un attacco XSS la pagina viene pulita
*   _1; mode=block_, abilita il filtro, e in caso di attacco XSS la pagina non viene pulita, bensì il suo caricamento è proprio bloccato
*   _1; report=http://[tuodominio]/URI_tua_segnalazione_, abilita il filtro, ed in caso di attacco XSS la pagina viene pulita e la violazione viene registrata su una pagina a tua scelta. Si tratta di una funzione di Chromium

## X-Content-Type-Options

Quando l'header **X-Content-Type-Options** viene impostato, si previene che il browser interpreti un file in modo diverso rispetto a quanto indicato dagli header HTTP con i tipi MIME.

Esempio di impostazione dell'X-Content-Type-Options:

    X-Content-Type-Options: nosniff

Solamente il valore _nosniff_ è utilizzabile, siccome non ne esistono altri. Il suo scopo è quello di evitare che il browser legga una risposta di un tipo MIME diverso rispetto a quanto indicato.

## Content-Security-Policy

L'header **Content-Security-Policy**, o CSP, è uno dei più difficili da impostare, e richiede un'approfondita conoscenza di quello che è presente nelle pagine web dei propri siti. Se abilitato, il CSP ha un impatto significativo sul come il browser carica una pagina: con questo header infatti possono essere scelti gli script JavaScript da non caricare, così come per i file di stile. Proprio per questo motivo il CSP aiuta a prevenire vari tipi di attacchi, tra cui il Cross-site scripting ed altre injection cross-site.

Un esempio di impostazione del CSP è il seguente:

    Content-Security-Policy: script-src 'self'

Così impostato, il server indica al browser che solamente gli script JavaScript provenienti dallo stesso dominio possono essere eseguiti, mentre gli altri devono essere bloccati.

Ecco tutti i parametri impostabili nella CSP:

*   _base-uri_
*   _default-src_
*   _script-src_
*   _object-src_
*   _style-src_
*   _img-src_
*   _media-src_
*   _frame-src_
*   _child-src_
*   _frame-ancestors_
*   _font-src_
*   _connect-src_
*   _manifest-src_
*   _form-action_
*   _sandbox_
*   _script-nonce_
*   _plugin-types_
*   _reflected-xss_
*   _block-all-mixed-content_
*   _upgrade-insecure-requests_
*   _referrer_
*   _report-uri_
*   _report-to_

Se vengono impostati più valori, ricordatevi di separarli con un punto e virgola come nell'esempio qui sotto:

    Content-Security-Policy: script-src https://linuxhub.it/script.js https://google.it/scriptest123.js; style-src 'self'

Esatto, si possono anche impostare dei link o file multipli.

## Referrer Policy

L'header **Referrer Policy** definisce quante informazioni riguardanti il server o l'applicazione web devono essere mandati in risposta al browser.

Un esempio di impostazione della Referrer Policy:

    Referrer-Policy: no-referrer-when-downgrade

Ecco tutti i parametri impostabili per questo header di sicurezza:

*   _no-referrer_, l'header Referrer viene completamente omesso
*   _no-referrer-when-downgrade_, l'header Referrer viene mostrato se una risorsa viene caricata sullo stesso protocollo (in questo caso HTTPS), e si omette se si passa da quest'ultimo all'HTTP.
*   _origin_, indica solamente l'origine del documento
*   _origin-when-cross-domain_, manda un intero URL quando viene effettuata una richiesta su uno stesso dominio, mentre fa sapere esclusivamente l'origine del documento in altri casi
*   _same-origin_, un Referrer viene inviato solo se i documenti provengono dallo stesso sito, mentre le richieste cross-origin non mostreranno nessun'informazione
*   _strict-origin_, simile al secondo parametro, indica l'origine del documento invece dell'header
*   _strict-origin-when-cross-origin_, invia l'origine del documento tramite un URL intero solo se la richiesta viene effettuata da HTTPS a HTTPS
*   _unsafe-url_, fornisce un intero URL quando si effettua una richiesta dalla stessa o più origini

## Come inserire gli header di sicurezza in Apache2

Per prima cosa, apriamo il nostro file apache2.conf su Debian e derivate, o httpd.conf su CentOS e RHEL-based (la locazione della configurazione potrebbe variare, e qui sotto ho inserito le directory principali, pertanto dovete solo capire dove si trova):

    sudo nano /etc/apache2/apache2.confsudo nano /etc/apache2/httpd.confsudo nano /etc/httpd/httpd.confsudo nano /etc/httpd/conf/httpd.conf

e accertiamoci che la seguente riga non sia commentata:

    LoadModule headers_module modules/mod_headers.so

Se non è abilitato, controlliamo che questo modulo sia caricato (non eseguito) da Apache con il seguente comando:

    apache2ctl -M

Nel caso non fosse presente nella lista, abilitatelo con questo comando:

    a2enmod headers

e riavviamo Apache:

    sudo apache2ctl restart

Se il modulo è installato, alla fine del file potete inserire gli header di sicurezza che desiderate. Ecco un esempio basato sulla mia esperienza e preferenza:

    Header set X-XSS-Protection "1; mode=block"Header always append X-Frame-Options SAMEORIGINHeader set X-Content-Type-Options nosniffHeader always set Strict-Transport-Security "max-age=31536000; includeSubDomains"Header always set Referrer-Policy "no-referrer-when-downgrade"

Se volete aggiungere un header che io non utilizzo e/o non è presente tra i consigliati, ricordatevi sempre di aggiungere davanti ad esso _Header set_ o _Header always set_ in base alle situazioni.

Controlliamo se è tutto impostato correttamente:

    sudo apache2ctl -t

Ora possiamo riavviare Apache con:

    sudo apache2ctl restart

## Come inserire gli header di sicurezza su Nginx

Per poter inserire gli header di sicurezza su **Nginx**, il procedimento è quasi simile. Apriamo il nostro file di configurazione del web server:

    sudo nano /etc/nginx/nginx.conf

E inseriamo i nostri header preferiti:

    add_header X-XSS-Protection "1; mode=block";add_header X-Frame-Options SAMEORIGIN;add_header X-Content-Type-Options nosniff;add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;add_header Referrer-Policy no-referrer-when-downgrade;

Controlliamo di non aver effettuato errori nel file di configurazione:

    sudo nginx -t

Se è tutto a posto, riavviamo Nginx:

    sudo service nginx restart

## Conclusione

Dopo aver inserito i nostri header di sicurezza, per verificare se un sito web è protetto possiamo visitare [securityheaders.com](https://securityheaders.com) che ci dà una piccola panoramica di quello che viene rilevato.

Per dubbi e chiarimenti, fate accesso al nostro gruppo [Telegram](https://t.me/linuxpeople).