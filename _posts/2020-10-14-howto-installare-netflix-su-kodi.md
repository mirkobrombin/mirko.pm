---
title: '#howto - Installazione e configurazione di Netflix su Kodi'
date: 2020-10-14
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - python  - github  - bash
---
In tutti i tool che fanno parte del mondo dell'open source, il più grande vantaggio è sicuramente la creatività della community che estende i vari software con componenti aggiuntivi più o meno utili. 
**Kodi** non è da meno, e tra i tanti plugin disponibili, oggi si vuole approfondire quello di *CastagnaIT* che permette di collegarsi al proprio account **Netflix**.

> **NOTA**:
>
> Neofita di Kodi? Si vuol sapere come un server accessibile dal proprio smartphone? [Qui abbiamo un'altra guida dedicata a te](https://linuxhub.it/articles/howto-creazione-impostazione-server-kodi). 
>
> Il resto della guida supporrà che il lettore abbia le conoscenze base di cosa sia Kodi, di come utilizzarlo e che il tema sia quello di default (se si hanno differenze di menù, reimpostare la skin **ESTUARY**) 

Che si abbia Kodi sul proprio *Raspberry PI* insieme a *libreELEC*, su un *server remoto* o su un *personal computer*, si consiglia di seguire la prima parte della guida da un PC con un *sistema operativo completo*. 

## Download e installazione plugin di Netflix di Kodi

Sapendo qual'è la propria versione di Kodi, bisogna connettersi al [repository di CastagnaIT su GitHub](https://github.com/CastagnaIT/plugin.video.netflix) e quindi scaricare lo .zip relativo alla propria versione. 

Quest'informazione si trova su Kodi nel menù: `Impostazioni` *(simbolo rotella)* &rarr; `Informazioni sul sistema` e infine **Info versione**.

Supponendo di avere **Kodi LEIA (18.x)** e di essere su un sistema operativo munito di `wget` si può digitare:

```bash
wget https://github.com/castagnait/repository.castagnait/raw/master/repository.castagnait-1.0.1.zip 
```

*Il link dovrebbe valere per tutte le versioni current-stable di kodi*.

A questo punto bisogna portare il file sul sistema con installato Kodi, *se si è su un server remoto*, potrebbe essere utile utilizzare `scp`: 

```bash
scp repository.castagnait-1.0.1.zip utente@ind.iri.zzo.ip:/percorso/destinazione
```

Si può quindi procedere sul proprio media center installando manualmente l'add-on.

### Installare add-on da repository sconosciuti

Per installare un add-on proveniente da una repository sconosciuta, per prima cosa vanno disabilitate le impostazioni di sicurezza, raggiungibili come mostrato di seguito:

`Menù impostazioni` &rarr; `Sistema` &rarr; `Add-on` &rarr; `Sorgenti sconosciute` (Impostare ad **ON**)

e di seguito accedere al menù degli add-on: `Menu impostazioni` &rarr; `Add-on` &rarr; `Installa da file zip`. Indicare quindi il percorso del file .zip appena scaricato o copiato. A questo punto il repository **CastagnaIT** è installato e presente sul proprio media center.

### Installare il plugin di kodi

Per installare il plugin di Kodi di Netflix dobbiamo nuovamente accedere alle impostazioni add-on:

`Menu impostazioni` &rarr; `Add-on` &rarr; `Installa da repository` &rarr; `CastagnaIT Repository for Kodi (propria versione)` &rarr; `Add-on video` &rarr; `Netflix`

Arrivati lì, installiamo la versione più recente del plugin dopo la richiesta del pop-up quindi attendiamo il download. **Netflix è installato**, ma ora va configurato.

### Altri prerequisiti

Nel caso non lo si avesse, è necessario anche installare **inputstream-adaptive**. Questo add-on è disponibile in diverse forme, innanzitutto tramite *il proprio package manager* (metodo di installazione consigliato, se presente).

Su Ubuntu e derivate: 
```bash
## Aggiungete il repo da terze parti
add-apt-repository ppa:team-xbmc/ppa
## Aggiornate 
apt update
## Installate
apt install kodi-inputstream-adaptive
```

Su Fedora, CentOS, RHEL e derivate:
```bash
## Abilitate i repository fusion
## Installate
dnf install kodi-inputstream-adaptive
```

E infine su Arch Linux:
```bash
pacman -S kodi-addon-inputstream-adaptive 
```

Altrimenti si può trovare come add-on sotto: `Impostazioni` &rarr; `Add-on` &rarr; `Installa da repository` &rarr; `Tutte le repository` &rarr; `Inputstream VideoPlayer`

Se non si trova sotto questo percorso, si può provare ad installare una versione diversa di Kodi. Purtroppo questo add-on è strettamente legato alla piattaforma di destinazione, e non esiste uno .zip installante. Questo è il motivo per cui in genere è il package manager della propria distribuzione che ne provvede una versione facilmente installabile.

## Configurazione del plugin Netflix di Kodi

### Autenticarsi sul plugin di Netflix con la chiave

Se si prova ad autenticarsi tramite plugin, non viene riconosciuta la password, probabilmente a causa delle protezioni del sito di Netflix. È necessario, quindi, attuare una procedura diversa. In questo passaggio avremo bisogno del PC da cui si è effettuato il download del plugin. Si deve avere installato anche **l'interprete di Python** e il browser di Google **Chrome**.

Con il package manager di Python, `pip`, si installino i seguenti pacchetti:

```bash
pip install pycryptodomex
pip install websocket-client
```

Quindi scaricare lo script per l'autenticazione [da qua](https://www.dropbox.com/sh/ls3veptflvneub1/AABz9Tt3EqKUb90PQXNarNxga?dl=0). Estrarre dallo zip ed eseguire:

```bash
python3 NFAuthenticationKey.py
```
Si aprirà una finestra di *Chrome privata*, dove poter fare l'accesso via web a Netflix. Una volta effettuato l'accesso si chiuderà la finestra e quindi lo script creerà un file con estensione **.key** da inviare al proprio server Kodi, e nel messaggio apparirà un **PIN**, da segnare poiché servirà al plugin.

### Avviare l'add-on

Dal menu principale cliccare su Add-on: `Add-on` &rarr; `Netflix` per avviare il plugin correttamente.

Se mancano dei plugin (Widevine), li scaricherà autonomamente l'add-on stesso. *Se l'installazione va male*, durante la prima riproduzione di un qualsiasi contenuto verrà richiesto nuovamente il download.

Selezionare quindi l'accesso **con chiave di autenticazione**, indicare il percorso del file e digitare prima il **PIN** segnato in precedenza, dopo *inserire la password dell'account*.

Se tutto va bene si dovrebbero vedere i profili del proprio account Netflix, pronti da utilizzare comodamente sul media center.

## Le impostazioni del plugin

Come comportamento predefinito il plugin non si sincronizza con gli episodi visti nella piattaforma. Per fare ciò possiamo accedere al menu add-on:

`Add-on` &rarr; `Netflix` ( cliccare ora *col tasto destro del mouse* il pulsante del menù oppure la lettera **I**). Accedere quindi alle impostazioni di Netflix (o **Configura**) e spuntare "**Sincronizza lo stato guardato dei video con Netflix**".

 Dallo stesso si è in grado di:
- installare **Up next - add-on** che permette di passare al prossimo episodio
- impostare colori e personalizzare lo stato guardato a livello grafico

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.