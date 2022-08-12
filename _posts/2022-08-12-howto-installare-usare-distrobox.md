---
title: "#howto - Installare ed usare Distrobox"
date: 2022-08-12 08:59
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: Alberto Bella
coauthor_github: al6263
published: true
tags: 
- distrobox
- fedora
- ubuntu
- archlinux
---

Macchina virtuale o installazione su hardware? come testate le vostre distribuzioni? I metodi ormai sono vari in realtà. I container hanno infatti aperto una nuova finestra su questo mondo, consentendo di avviare intere distribuzioni senza appesantire tutto con la virtualizzazione. 

In questo panorama si colloca distrobox.

## Cos'è

[Distrobox](https://github.com/89luca89/distrobox) è composto da una serie di script sh (POSIX compliant) che automatizza l'utilizzo di `docker` o `podman` per consentire all'utente di creare dei container all'interno del sistema dove poter testare o eventualmente utilizzare varie distribuzioni. 

Il container è fortemente connesso al sistema ospitante e consente anche di utilizzare dispositivi USB, applicazioni grafiche e audio.



## Guida all'installazione

Distrobox è supportato ufficilamente da un gran numero di distribuzioni: Ubuntu, Fedora, Silverblue, Archlinux, Suse ecc... e l'installazione non dipende dal package manager, ma si può installare direttamente tramite l'utilizzo di [curl](https://linuxhub.it/articles/howto-utilizzo-del-comando-curl/).



### Dipendenze

Prima di procedere con l'installazione bisogna scegliere se utilizzare **podman** o **docker** per l'installazione di distrobox. 

Abbiamo già [parlato qui](https://linuxhub.it/articles/howto-Installazione-ed-utilizzo-di-Docker-su-Linux) dell'installazione di docker, per la par condicio supponiamo invece ora di voler installare [podman](https://podman.io/getting-started/installation).



#### Podman su Ubuntu e derivate

Per installare su Ubuntu e derivate: 

```bash
apt install podman
```



#### Podman su Fedora 

Da Fedora 35 è necessario abilitare i repository COPR

```bash
dnf -y copr enable rhcontainerbot/podman4
dnf -y install podman
```



Silverblue invece ha già il pacchetto preinstallato.

#### Podman su Archlinux

Per installarlo su Archlinux digitare: 

```bash
pacman -S podman
```



#### Avviare il servizio

Che abbiate installato podman o docker, ricordatevi di avviare il servizio prima di utilizzare distrobox: 

```bash
# Per docker
systemctl start docker

# Per podman
systemctl start podman
```



### Installazione

Una volta che si è certi di avere installato e configurato le dipendenze possiamo installarlo semplicemente scrivendo: 

```bash
curl -s https://raw.githubusercontent.com/89luca89/distrobox/main/install | sudo sh
```



Se non si ha accesso ai diritti di amministratore si può utilizzare la variante: 

```bash
curl -s https://raw.githubusercontent.com/89luca89/distrobox/main/install | sh -s -- --prefix ~/.local
```



Quest'ultima scelta potrebbe essere più adatta anche per un installazione utente e non globale, sia per una maggiore pulizia che per quei sistemi che hanno un root file system non scrivibile. 

Da notare che il percorso `~/.local` può essere personalizzato specificando una cartella diversa dove attuare l'installazione. 



## Creazione di una "box"

Prima di fiondarci nel comando che creerà una box con la nostra distribuzione, consiglio di creare una home apposita.

```bash
mkdir /percorso/della/home/box
```



Quindi scegliamo la nostra distribuzione, la lista è vasta: 

- ubuntu
- fedora
- archlinux
- alpine 
- etc...



Sostanzialmente son tutte quelle che potete trovare [nell'hub di docker](https://hub.docker.com/search?image_filter=official&q=&type=image). Scegliamo quindi un nome da dare alla nostra installazione.

Scrivendo: 

```bash
distrobox help
```

Vedremo una lista di esempi.

Possiamo ora creare la nostra box, supponiamo di **ubuntu**, con nome **distribuzione** nella cartella /home/distrobox/sububuntu: 

```bash
distrobox create --image ubuntu --name distribuzione -H /home/distrobox/sububuntu
```



> NOTA: è importante che il percorso venga dato in maniera assoluta.



Come si può notare quindi si ha il nome dell'immagine introdotto dalla flag `--image`, il nome della nostra installazione introdotto dal flag `--distribuzione` e infine la home introdotta da `-H`. 



Una volta che la creazione va a buon fine digitiamo: 

```bash
distrobox enter distribuzione
```



Specificando quindi alla fine il nome che abbiamo dato precedentemente alla distribuzione, nel nostro caso "**distribuzione**". Dopo un po' di attesa avremo accesso alla nostra distribuzione. 



## Throubleshoot: problemi di overlay

In alcuni casi va specificato il flag `--root` che serve ad avviare distrobox con i permessi di root. 

**Quest'ultima opzione non è sempre necessaria**, aggiungetela se doveste avere problemi di overlay o incompatibilità (ad esempio se usate `ecryptfs`). Un tipico errore è: 

```
Error: 'overlay' is not supported over ecryptfs, a mount_program is required: backing file system is unsupported for this graph driver
```



Per creare un box con i permessi da root va quindi digitato: 

```bash
distrobox create --image ubuntu --name distribuzione -H /home/distrobox/sububuntu --root
```



Per entrarci: 

```bash
distrobox enter distribuzione --root
```



Ricordiamoci quindi di inserire **la flag per ogni altro comando**.



## Lista dei nostri box 

Possiamo fare una lista delle box attualmente installate digitando: 

```bash
distrobox-list
```



In realtà questo comando a sua volta utilizza un processo per identificare quali container di *podman* o *docker* son installati, giusto per farvi un idea potreste dare il comando (se state usando podman): 
```bash
podman ps -a --no-trunc --format "{{.ID}}|{{.Image}}|{{.Names}}|{{.State}}|{{.Labels}}{{.Mounts}}"

```

 

E notare che l'output dovrebbe essere simile, ovviamente solo le righe che contengono "*distrobox*" son quelle che cerchiamo. 

## Eliminare un box

Per eliminare un box basta digitare: 

```bash
distrobox-rm NOMEDISTROBOX
```



## Disinstallazione 

Per disinstallare possiamo utilizzare un metodo simile all'installazione, ovvero eseguendo degli script appositi. 

Se abbiamo installato con i diritti di amministratore digiteremo: 

```bash
curl -s https://raw.githubusercontent.com/89luca89/distrobox/main/uninstall | sudo sh
```



Altrimenti: 

```bash
curl -s https://raw.githubusercontent.com/89luca89/distrobox/main/uninstall | sh -s -- --prefix ~/.local
```



