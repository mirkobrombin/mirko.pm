---
title: '#howto - Controllare se una porta è in uso su Linux'
date: 2020-10-02
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - nginx  - bash  - ssh  - ssh  - bash
---
A volte, specialmente per chi possiede un server, controllare **quale porta è in uso** da parte di un servizio su **Linux** è essenziale, e potrebbe non essere così immediato, principalmente per chi possiede solamente un terminale.

In questa guida vedremo come capire se una porta che desideriamo sfruttare è usata da qualcosa oppure no tramite dei comodi comandi.

## Controllare se una porta è in uso con lsof

Il primo comando che possiamo utilizzare su Linux per controllare se una porta sta venendo utilizzata è `lsof`. La sua sintassi potrebbe essere complessa, ma in realtà l'output è abbastanza semplice da comprendere se si segue questa guida.

Come prima cosa, utilizziamo lsof seguito dai parametri *-i*, *-P* e *-n*, che vi spieghiamo subito a cosa servono:

- *-i* serve per selezionare i files IPv46 (senza di questo l'output sarebbe davvero lungo e incomprensibile)
- *-P* rimuove i nomi delle porte
- *-n* rimuove gli hostnames

Ora che abbiamo compreso ciò, eseguiamo il comando nel terminale:

```bash
lsof -i -P -n
```

e dovremmo ottenere un output simile al seguente:

```bash
COMMAND     PID      USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
ntpd        689       ntp   16u  IPv4    15409      0t0  UDP *:123 
ntpd        689       ntp   17u  IPv6    15410      0t0  UDP *:123 
ntpd        689       ntp   18u  IPv4    15415      0t0  UDP 127.0.0.1:123 
ntpd        689       ntp   19u  IPv6    15416      0t0  UDP [::1]:123 
ntpd        689       ntp   21u  IPv6    16427      0t0  UDP [IPv6]:123 
ntpd        689       ntp   22u  IPv4    18538      0t0  UDP IP:123
```

La prima colonna indica il comando che sta utilizzando una determinata porta, indicata alla fine di **NAME**, mentre il resto è piuttosto auto-esplicativo. Per filtrare i risultati e ottenere le porte che sono in ascolto e non stabilite, possiamo usare il comando di prima seguito da un *grep*:

```bash
lsof -i -P -n | grep LISTEN
```

e a quel punto l'output sarà più pulito come il seguente:

```bash
sshd       1020      root    3u  IPv4    17731      0t0  TCP *:PORTA (LISTEN)
sshd       1020      root    4u  IPv6    17751      0t0  TCP *:3743 (LISTEN)
gitea      1021       git   15u  IPv6    19147      0t0  TCP *:3000 (LISTEN)
memcached  1027 memcached   26u  IPv4    17524      0t0  TCP 127.0.0.1:PORTA (LISTEN)
redis-ser  1031     redis    4u  IPv4    17635      0t0  TCP 127.0.0.1:PORTA (LISTEN)
vsftpd     1035      root    4u  IPv6    17306      0t0  TCP *:PORTA (LISTEN)
postmaster  1068  postgres    3u  IPv6    18172      0t0  TCP [::1]:PORTA (LISTEN)
postmaster  1068  postgres    4u  IPv4    18173      0t0  TCP 127.0.0.1:PORTA (LISTEN)
```

Come è possibile vedere, in questo modo possiamo sapere esattamente quale porta sta venendo utilizzata in quell'esatto momento e da quale software. A quel punto, possiamo decidere noi cosa fare in base ai nostri bisogni.

## Controllare se una porta è in uso con netstat o ss

Oltre a `lsof`, altri due comandi a nostra disposizione sono `netstat` o `ss`. Il primo potrebbe essere stato deprecato per alcuni, pertanto è arrivato `ss` a sostituirlo, ma non del tutto.

### netstat

Se avete la possibilità di usare `netstat`, proviamo a sfruttarlo con la seguente sintassi:

```bash
netstat -tulpn | grep LISTEN
```

L'output che dovremmo avere a questo punto è il seguente:

```bash
tcp        0      0 127.0.0.1:PORTA         0.0.0.0:*               LISTEN      1117/mongod         
tcp        0      0 127.0.0.1:PORTA          0.0.0.0:*               LISTEN      1031/redis-server 1 
tcp        0      0 127.0.0.1:PORTA         0.0.0.0:*               LISTEN      1027/memcached      
tcp        0      0 0.0.0.0:PORTA              0.0.0.0:*               LISTEN      1084/nginx: master  
tcp        0      0 127.0.0.1:PORTA          0.0.0.0:*               LISTEN      1068/postmaster     
tcp        0      0 0.0.0.0:PORTA             0.0.0.0:*               LISTEN      1084/nginx: master  
tcp        0      0 127.0.0.1:PORTA          0.0.0.0:*               LISTEN      57349/netdata       
tcp        0      0 0.0.0.0:PORTA           0.0.0.0:*               LISTEN      57349/netdata       
tcp        0      0 0.0.0.0:PORTA            0.0.0.0:*               LISTEN      1020/sshd
```

In maniera simile a `lsof`, abbiamo delle comode colonne che ci indicano varie cose: la prima è il **protocollo di rete**, in questo caso *tcp*, e le altre due che dobbiamo guardare sono la **quarta**, che indica le porte in uso, e **l'ultima**, che svela invece i servizi che stanno utilizzando delle porte. In questo modo, dovrebbe essere ulteriormente chiaro il servizio che usa una porta e il PID (Process ID) che possiamo fermare all'evenienza.

### ss

A differenza di `netstat`, `ss` si deve utilizzare due volte e con parametri diversi se si vuole capire esattamente quale servizio sta facendo uso di una porta. Il primo:

```bash
ss -tulwn
```

ci darà la porta utilizzata da un determinato IP come si può vedere nella colonna centrale segnata da *Local Address:Port*, mentre per sapere che servizio sta utilizzando la porta dovremo sfruttare il comando senza il parametro *-n*:

```bash
ss -tulw
```

Dopo aver fatto ciò, possiamo renderci conto del fatto che l'output è molto simile al precedente, ma che al posto della porta viene indicata il servizio che la sta utilizzando. Per questo motivo è sempre meglio eseguire il comando nella prima maniera e poi nel secondo.


Per ogni dubbio, chiarimento o curiosità ci trovate al [nostro gruppo Telegram](https://t.me/linuxpeople).