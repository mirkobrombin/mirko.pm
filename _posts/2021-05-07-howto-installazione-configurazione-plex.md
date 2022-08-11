---
title: '#howto - Installazione e configurazione di un server Plex ' 
date: 2021-05-07 
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- bash 
- archlinux 
- ubuntu 
- fedora
---

In passato abbiamo trattato come [installare un server kodi](https://linuxhub.it/articles/howto-creazione-impostazione-server-kodi/) da poter usare eventualmente come media center casalingo, ma se si vuole estendere l'uso del server al di fuori delle proprie mura, magari da poter anche utilizzare insieme agli amici per visionare alcuni filmati o ascoltare dei brani, possiamo invece ricorrere a [Plex Media Server](https://www.plex.tv/media-server-downloads/)

> Attenzione: Scaricare materiale protetto da copyright rappresenta un illecito punibile per legge oltre che un'azione a danno della proprietà intellettuale di chi crea quei contenuti.
> La redazione di linux/hub presuppone che tutto il materiale che andrete ad archiviare sia stato ottenuto con la giusta licenza.

## Cos'è Plex 

Plex è un software per creare un proprio media server raggiungibile eventualmente in WAN (ovvero da qualunque postazione internet).  

È per gran parte rilasciato sotto GPLv2, le parti open source sono per lo più quelle che riguardano l'host (ovvero i software da installare per creare il server).
Il servizio è totalmente gratuito, tuttavia Plex INC mette a disposizione alcuni meccanismi premium che potete comprare secondo diverse formule : 

- abbonamento mensile (5€/mese nel momento in cui scrivo)
- abbonamento annuale (40€/anno nel momento in cui scrivo)
- acquisto (120€ nel momento in cui scrivo)

Inoltre possiede un altro servizio a pagamento che consente di trasformare il media center in una retro gaming station da usare in cloud ( vedi [Plex Arcade](https://www.plex.tv/arcade/), attualmente non disponibile su host Linux )


### Note legali

Fondamentalmente plex fornisce un servizio per riprodurre ovunque i tuoi file multimediali, questi però devono essere di tua proprietà per evitare di incontrare  problemi che riguardano la legalità dei contenuti riprodotti. 

## Installare Plex Media Server 

Innanzitutto per poter sfruttare a pieno il servizio è necessario fare un account su [plex.tv](https://www.plex.tv).
Un po' come per Netflix, potete anche fare un account che contiene più profili, magari nell'ottica di gestire un server con i vostri più *cari amici o parenti*, tenete tuttavia conto che in questo caso l'email e la password saranno unici. 

Esiste comunque l'opzione di condividere alcune librerie con altri account totalmente diversi (quindi ognuno con la sua email e la sua password)

Una volta fatto l'account, possiamo passare all'installazione del server nel nostro host

### Debian, Ubuntu e derivate

Trovate il pacchetto di installazione sul [sito ufficiale](https://www.plex.tv/media-server-downloads/#plex-media-server), disponibile per intel/amd a 32bit/64bit o anche dispositivi arm a 32bit o 64bit.

Scaricatelo quindi installatelo: 

```bash 
cd "$HOME/Scaricati" # sostituire la directory con quella in cui si è scaricato il file
dpkg -i plexmediaserver*.deb
```


### Fedora 

Aggiungere il repository su Fedora: 

```bash
echo '[Plexrepo]
name=plexrepo
baseurl=https://downloads.plex.tv/repo/rpm/\$basearch/
enabled=1
gpgkey=https://downloads.plex.tv/plex-keys/PlexSign.key
gpgcheck=1' | sudo tee /etc/yum.repos.d/plex.repo
```

Aggiornare dnf e installare 

```bash
dnf upgrade 
dnf install plexmediaserver -y
```


### Archlinux 

Su archlinux, plex è disponibile tramite AUR: 

```bash
git clone https://aur.archlinux.org/plex-media-server.git 
cd plex-media-server
makepkg -si
```

Potete anche installarlo tramite un AUR-Helper, ad esempio con `yay`: 

```bash
yay -S plex-media-server
```


## Configurazioni e avvio

Innanzitutto consiglio di creare una cartella da usare appositamente per i contenuti multimediali e assegnare come permessi sia lettura che scrittura: 

```bash
mkdir -p /contenutiPlex/{Film,SerieTV,Musica}
chmod -R 777 /contenutiPlex
```

Una soluzione alternativa (più sicura) potrebbe essere quella di creare e gestire l'accesso alla cartella da un gruppo specifico per i media: 

```bash
mkdir -p /contenutiPlex/{Film,SerieTV,Musica}

groupadd plexmedia 
chgrp -R plexmedia /contenutiPlex
chmod -R g+rwx /contenutiPlex

usermod -a -G plexmedia $USER
usermod -a -G plexmedia plex
```

Non garantisco però che questa soluzione *funzioni sempre*.

### Connettersi e configurare il server

Quindi avviamo il server tramite `systemd`: 
```bash
systemctl start plexmediaserver.service
```

Possiamo renderlo persistente ad ogni avvio sostituendo **start** con **enable**  

```bash
systemctl enable plexmediaserver.service
```

Apriamo il browser e digitiamo nella barra degli indirizzi: 
`http://127.0.0.1:32400/web/index.html`

> Nota: Se stiamo configurando plex tramite ssh su un dispositivo che non è il nostro attuale pc, si deve riportare l'indirizzo ip della piattaforma in cui plex è installato)

Quindi colleghiamo il nostro account e indichiamo al server quali sono le nostre librerie, se sfogliando le cartelle non vedete quella che avete configurato, è *una questione di permessi*, riavviate il dispositivo o ricontrollate i permessi della cartella.


### Essere raggiungibili dall'esterno

Accedete alle vostre impostazioni del router di casa, in genere si va sull'indirizzo http://192.168.1.1 o il primo indirizzo segnato dal vostro *gateway* 

Quindi trovate le impostazioni per il routing statico, assegnatevi un ip.

Dopo bisogna andare nelle impostazioni del *port forwarding* e aprire le porte del router per il nostro indirizzo ip.
Plex opera per impostazione predefinita sulla porta `32400`, ma quest'impostazione può essere anche sovrascritta nelle impostazioni.

Disconnettete il server dalla linea quindi riconnettetelo.
Se tutto è andato a buon fine, dovreste vedere nella sezione in alto, cliccando sulla foto profilo, in seguito `Account` `impostazioni`&rarr;`Accesso Remoto` la frase: *Completamente accessibile dall'esterno della tua rete*.

Se così non è, giocate con le impostazioni, attivate l'accesso remoto e ricontrollate i processi spiegati in precedenza.


