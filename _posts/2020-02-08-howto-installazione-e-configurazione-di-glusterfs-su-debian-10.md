---
title: '#howto - Installazione e configurazione di GlusterFS su Debian 10'
published: 2020-02-08
layout: post
author: Mattia Cosma
author_github: mattiacosma
tags:
  - bash  
  - systemd  
---
*GlusterFS * è un file system open source distribuito e scalabile che permette la memorizzazione di risorse su dispositivi di archiviazione in una rete.

Uno dei suoi vantaggi è la possibilità di distribuirlo sulla rete usufruendo di un sistema **client-server** e di poter quindi riuscire a gestire una grande mole di dati superando anche il petabyte.

## Requisiti
Per questa guida ci serviranno due server Debian 10 pronti all'uso dove uno funzionerà da server primario, ovvero dove risiedono i **dati "caldi"**, mentre l'altro ha il compito di **replica**, aumentando l'efficienza del sistema nella sfortunata necessità di un *disaster recovery*.

Ogni server dovrà avere un indirizzo IP locale statico in modo da evitare che non sia più possibile raggiungere i nodi per via di una riassegnazione. In questa guida faremo riferimento al primo server con l'indirizzo IP `x.x.x.x` e hostname `gluster1.mioserver.local` mentre al secondo con indirizzo IP `y.y.y.y` e hostname `gluster2.mioserver.local`.

Altro requisito è quello che entrambi i server dovranno avere una partizione da dedicare allo spazio dati. In questa guida faremo riferimento a `/dev/sdx` per la partizione dati di ogni nodo.

## Configurazione dei DNS
Sia sui server che su ogni client dovremo configurare i DNS per poter accedere ai due nodi di cui abbiamo precedentemente parlato. Supponendo quindi di avere i seguenti server:

```bash
Node 1 (Server):    
--- Hostname: gluster1.mioserver.local    
--- O.S: Debian 10    
--- Memory: 1gb    
--- Ip Address: x.x.x.x    
--- Disk: 8gb /dev/sdx

Node 2:    
--- Hostname: gluster2.mioserver.local    
--- O.S: Debian 10    
--- Memory: 1gb    
--- Ip Address: y.y.y.y    
--- Disk: 8gb /dev/sdx

```
andiamo a modificare il file in posizione `/etc/hosts` aggiungendo i seguenti record:

```bash
x.x.x.x gluster1.mioserver.local gluster1
y.y.y.y gluster2.mioserver.local gluster2
```

modificando:
- **x.x.x.x/y.y.y.y** con gli indirizzi IP locali assegnati
- **gluster1.mioserver.local/gluster2.mioserver.local** con i relativi hostname

## Installazione di GlusterFS
Come spiegato precedentemnete, l'installazione dovrà essere effettuata su entrambi i nodi.

Troviamo il pacchetto `glusterfs-server` direttamente nelle repository di Debian 10, procediamo quindi con l'installazione via **apt** su entrambi i server:

```bash
sudo apt install glusterfs-server
```

Una volta terminato il processo avviamo i servizi e controlliamone lo stato per essere sicuri del corretto funzionamento:

```bash
sudo systemctl start glusterd
sudo systemctl status glusterd

? glusterd.service - GlusterFS, a clustered file-system serverLoaded: loaded (/lib/systemd/system/glusterd.service; disabled; vendor preset: enabled)
Active: active (running) since Fri 2020-01-31 15:43:29 EDT; 27s
agoDocs: man:glusterd(8)
Process: 8708 ExecStart=/usr/sbin/glusterd -p /run/glusterd.pid --log-level $LOG_LEVEL $GLUSTERD_OPTIONS (code=exited, status=0/SUCCESS)
Main PID: 8709 (glusterd)Tasks: 8 (limit: 893)
Memory: 2.8M
CGroup: /system.slice/glusterd.service??8709 /usr/sbin/glusterd -p /run/glusterd.pid --log-level INFO
Jan 31 15:43:30 osradar systemd[1]: Starting GlusterFS, a clustered file-system server...
Jan 31 15:43:33 osradar systemd[1]: Started GlusterFS, a clustered file-system server.
```

## Aggiungere lo spazio di archiviazione sui nodi
Per ogni nodo eseguiamo i seguenti passaggi

Formattiamo la partizione dedicata ai dati in formato *xfs*:
```bash
sudo mkfs.xfs /dev/sdx1
```

Quindi creiamo, e montiamo, una cartella di riferimento:
```bash
sudo mkdir -p /data/glusterfs
sudo mount /dev/sdx1 /data/glusterfs
```

Si consiglia di montare la partizione all'avvio del sistema aggiungendo la seguente linea al file fstab in locazione `/etc/fstab`:
```bash
/dev/sdx1 /data/glusterfs xfs defaults 0 0
```

## Creazione del volume di GlusterFS
Il primo passaggio da effettuare è quello di indicare al nodo primario che il secondo (replica/slave) è affidabile. Utilizziamo quindi il seguente comando:

```bash
sudo gluster peer probe gluster2.mioserver.localpeer
probe: success.
```

Sul nodo primario (gluster1) creiamo il volume:

```bash
sudo gluster volume create glusterfsvolume replica 2 gluster1.mioserver.local:/data/glusterfs gluster2.mioserver.local:/data/glusterfs
```

ed attiviamolo:

```bash
sudo gluster volume start glusterfsvolume
```

## Installazione GlusterFS (Client)
Per prima cosa installiamo il pacchetto *glusterfs-client*:

```bash
sudo apt install glusterfs-client
```

Creiamo quindi una cartella su cui montare il volume remoto di Gluster:

```bash
mkdir -p /mnt/glusterfsvolume
mount -t glusterfs gluster1.mioserver.local:/glusterfsvolume /mnt/glusterfsvolume
```

Si consiglia di montarlo automaticamente quindi come già fatto per i nodi, modifichiamo il file in locazione `/etc/fstab` aggiungendo la seguente riga:

```bash
gluster1.mioserver.local:/glusterfsvolume /mnt/glusterfsvolume/ glusterfs  defaults,_netdev 0 0
```

Per testare il corretto funzionamento di Gluster puoi salvare dei file nella tua cartella locale (/mnt/glusterfsvolume) e verificare che lo stesso file venga (in realtà) salvato sul nodo primario e replicato sul nodo secondario.

Potete far riferimento alla documentazione ufficiale [qui](https://docs.gluster.org/en/latest/).

Per dubbi o chiarimenti, non esitate a contattarci tramite il nostro [gruppo Telegram](https://t.me/linuxpeople).