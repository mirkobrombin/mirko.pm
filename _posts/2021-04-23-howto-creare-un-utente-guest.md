---
title: '#howto - Creare un utente Guest '
published: 2021-04-23
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - bash
---
Se condividete il pc con utenti occasionali come familiari, colleghi o amici potrebbe essere un' ottima idea creare un utente Guest con una home temporanea.



## Creazione di un utente 

Innanzitutto creiamo il nostro utente con il comando *useradd*: 

 `useradd -m -g users -G video,audio,network,disk,input -s /bin/bash guest`   

Per i più curiosi: 

- `-m` sta per "crea la cartella home dell'utente";
- `-g` sta per "imposta gruppo principale del utente con il nome che segue", (in questo caso il gruppo è appunto `users`);
- `-G` sta per "aggiungi agli altri gruppi", quindi una lista di gruppi;
- `-s` indica "imposta il programma che segue come shell per l'utente", seguendo, quindi, il percorso della *shell bash*:
- `guest` è il nome dell'utente;



## Montare una directory in RAM all'avvio

In generale, per montare una directory in RAM, si usa il filesystem speciale `tmpfs`, mentre per montare una partizione all'avvio si usa il file `/etc/fstab`.

Unendo le due informazioni, si procede montando all'avvio una cartella in RAM, modificando il file di cui sopra, aggiungendo la linea seguente, dopo l'ultima riga: 

```bash
tmpfs    /home/guest     tmpfs        defaults,noatime,uid=guest,gid=users,mode=700,size=1G    0 0 
```

Nello specifico, si sta chiedendo che la dimensione sia massimo di `1Gb`. Questo valore potrebbe anche essere inferiore, scrivendo, ad esempio, `512M` , ma ricordate che anche solo aprire un browser potrebbe consumare rapidamente la memoria quindi non siate troppo stringati nella scelta, poichè tutti i dati verranno cancellati ogni riavvio, liberando così dell'altro spazio. 

> **NOTA** : 
>
> la size specifica il massimo uso che si potrà fare di quello spazio, quindi dormite sonni tranquilli poiché se solo montato ma non utilizzato, quello spazio non avrà alcun peso in memoria.



Con le opzioni **uid** e **gid** si specifica a chi appartiene una determinata cartella, in termini di *utente (uid)* e *gruppo (gid)*,  per cui, se il vostro utente ospite si chiama in un altro modo dovrete modificare il valore dopo `uid`.



### Test del file fstab



Mai fare modifiche ad un fstab e riavviare senza testarlo, perché potrebbe costarci l'avvio del sistema! 

Quindi testatelo con il comando: 
`mount -a`

Se tutto è andato a buon fine allora non avrete alcun output, altrimenti cancellate la riga che avete aggiunto in precedenza e cercate supporto da qualcuno che, in materia, è più ferrato di voi.



## Password

Normalmente gli utenti hanno una propria password, perciò il mio consiglio è quello di impostare per l'utente ospite una password semplice come "**guest**" con il comando : 

```bash
passwd guest
```

Sostituendo, eventualmente, a "guest" il nome dell'utente di interesse. 



Tuttavia, sono sicuro che in molti preferiranno creare un utente senza alcuna password, poiché più comodo all'atto pratico, per un utente temporaneo. In tal caso basta digitare: 

```bash
passwd -d guest 
```



Questo comando elimina la password di guest, permettendo quindi ad alcuni sistemi di fare l'accesso senza password. Attenzione però, *non tutti i sistemi supportano questo comportamento*!



## Eseguire uno script all'avvio con home temporanea

Con una partizione di home temporanea non è possibile eseguire uno script al login, oppure all'avvio di un terminale, poiché le proprie cartelle non esistono fino al momento in cui l'utente effettua l'ingresso nel sistema. Come fare quindi? 


### Sostituire "bashrc"

Per sostituire il bashrc si può agire sul file */etc/profile* aggiungendo questo if: 

```bash
if [[ $USER = "guest" ]]; then 
	#qui le istruzioni
fi
```



così facendo quel blocco di istruzioni verrà eseguito solo se l'utente corrente è `guest`.



### Sostituire ".autostart"

Un'altra cartella utente molto importante è autostart, che contiene una lista di file launcher (`.desktop`) che possono avviare programmi appena si effettua il login.

Ecco come ovviare alla sua mancanza:

Innanzitutto creiamo un nuovo script di sistema `/usr/bin/runifguest`: 

```bash
if [[ $USER = "guest" ]]; then
        $*
else
        echo "non sei guest"
fi
```

E diamo il comando

`chmod +x /usr/bin/runifguest` 



Per creare il nostro launcher useremo la directory globale `/etc/xdg/autostart` . Quindi creiamo il nostro *file .desktop* (supponiamo `/etc/xdg/autostart/nomefile.desktop`)

```bash
[Desktop Entry]
Name=programma per guest
Exec=sh -c "runifguest nomeprogramma"
Type=Application
```



E rendiamolo avviabile

`chmod +x /etc/xdg/autostart/nomefile.desktop`

## Effettuare l'accesso con "su"

Normalmente scrivendo 
`su nomeutente` 

Si può, tramite terminale, fare accesso su un altro utente. Tuttavia se l'utente non ha la password il comando fallisce, perciò, un'alternativa nel caso di utente "guest", ma senza password, potrebbe essere: 
`sudo su guest`

oppure
`su -c "su guest"`



Nel primo caso useremo la password del nostro utente amministratore, mentre, nel secondo caso, la password dell'utente `root`.



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
