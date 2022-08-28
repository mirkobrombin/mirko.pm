---
title: '#howto - Installare Archlinux in una cartella' 
date: 2022-08-26 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Alberto Bella (in arte MastroAlberto)
coauthor_github: al6263 
published: true
tags: 
- archlinux 
- systemd 
- steamdeck 
---



Quando ho comprato steam deck mi son trovato davanti un ottima console, ma un pessimo pc. Castrato in ogni sua funzionalità e senza una vera possibilità per installare strumenti per lo sviluppo in una maniera semplice e permanente. Anche strumenti come distrobox non aiutavano inizialmente.



Ecco che ebbi un idea: 

> "*ma se installassi archlinux all'interno di una cartella e lo eseguissi in chroot?*"



E bene, ecco a voi come installare Archlinux in una cartella. Tratterò anche come avviare dal suo interno applicazioni GUI e quindi operare come se fosse un container pienamente integrato al sistema host.



## Installare il sistema

Se abbiamo un installazione di Archlinux preesistente sarà tutto più semplice, potremmo infatti utilizzare questa specifica [guida della wiki](https://wiki.archlinux.org/title/systemd-nspawn#Create_and_boot_a_minimal_Arch_Linux_container) che utilizza pacstrap per creare un installazione. Senza potrebbe essere leggermente più complesso, ma analizziamo comunque una metodologia adatta, partendo dalla pagina [della wiki apposita](https://wiki.archlinux.org/title/Install_Arch_Linux_from_existing_Linux).



### Metodologia con host archlinux

Possiamo utilizzare pacstrap per installare in una cartella tutti i pacchetti che necessitiamo.

Creiamo prima la cartella con: 

```bash
mkdir archilinux_container
```



Quindi: 

```bash
pacstrap -c $PWD/archlinux_container base
```



Dopo base possiamo inserire in coda tutti gli altri pacchetti che vogliamo nella nostra distribuzione, ad esempio installiamo nano e zsh: 

```
pacstrap -c $PWD/archlinux_container base nano zsh zsh-doc zsh-completions
```



#### Note aggiuntive per steam deck

Gli utenti di Steam Deck avranno problemi probabilmente per il file system read only. Disattivatelo momentaneamente: 

```bash
steamos-readonly disable
```



Aggiornate pacman: 

```bash
pacman-key --init

pacman -Syu archlinux-keyring

pacman -Syyu
```



Quindi potrete eseguire il pacstrap. Attenzione ad un ulteriore dettaglio: La nuova installazione di archlinux avrà purtroppo i repository di steam deck, sostituiteli poi manualmente per avere tutti i pacchetti a disposizione, [trovate qui la lista completa](https://archlinux.org/mirrorlist/all/).

#### Accesso al sistema con arch-chroot

Una volta installato il sistema accediamo per la prima volta con `arch-chroot`: 

```bash
arch-chroot archilinux_container
```



Adesso se avete già installato archlinux in passato, dovreste sapere più o meno come comportarvi. Seguite gli stessi passi. 
È necessario prima di tutto dare una password all'utente root:

```bash
passwd root
```



Assicuratevi che tra le shell sicure nel file `/etc/securetty` ci sia `pts0`, altrimenti inseritelo voi:  

```bash
echo "pts/0" | tee -a /etc/securetty 
```



Una volta terminate tutte le procedure di installazione potete uscire dall'ambiente: 

```bash
exit
```



### Metodologia con altri host 

Questa è probabilmente la fase più complessa. Scarichiamo dal garr l'ultima iso bootstrap di archlinux: 

```bash
wget https://archmirror.it/repos/iso/latest/archlinux-bootstrap-x86_64.tar.gz
```



Creiamo una cartella dove scompattare i file: 

```bash
mkdir BOOTSTRAP; 
cd !!; 
```

Quindi scompattiamo la tarball

```bash
tar xzf ../archlinux-bootstrap-x86_64.tar.gz --numeric-owner
```



Ora dobbiamo distinguere i due casi, se il nostro sistema ha una versione di bash superiore alla 4, possiamo utilizzare "`arch-chroot`", altrimenti dovremmo ripiegare sul vecchio sistema del `chroot`. Per controllare questa condizione: 

```bash
bash --version 
```



#### Versione 4 o maggiore 

Nel caso che bash abbia la versione 4 o maggiori è possibile utilizzare `arch-chroot`, digitiamo quindi: 

```bash
mount --bind root.x86_64 root.x86_64 
./root.x86_64/bin/arch-chroot root.x86_64
```



#### Versioni precedenti

In tal caso dovremmo utilizzare la metodologia manuale con il chroot. 

```bash
mount --bind root.x86_64 root.x86_64
cd root.x86_64
cp resolv.conf etc
mount -t proc /proc proc
mount --make-rslave --rbind /sys sys
mount --make-rslave --rbind /dev dev
mount --make-rslave --rbind /run run   
cd ..
chroot root.x86_64 /bin/bash
```



#### Dopo aver fatto l'accesso

È necessario innanzitutto cambiare la password di amministratore: 

```bash
passwd
```



Poi aggiungiamo "`pts/0`" alla lista di shell sicure da cui poter fare login, così: 

```bash
echo "pts/0" | sudo tee -a /etc/securetty 
```

 

Questo ci consentirà di fare il **login da host** con `systemd`.



Ora inizializziamo pacman: 

```bash
pacman-key --init 

pacman-key --populate
```



Decommentiamo dalla mirrorlist tutti i caratteri cancelletto prima di server, così da abilitare temporaneamente tutti i server: 

```bash
sed 's/^#Server/Server/' mirrorlist | tee mirrorlist.new
```

Controllate che il nuovo file sia effettivamente giusto, mostratelo a schermo con cat e quindi controllate i vari **Server**. Ogni riga di mirrorlist è simile a questa: 
```bash
Server = https://ind.iri.zzo.com/arch/$repo/os/$arch
```
Dove poi la parte iniziale dell'indirizzo è variabile. Se dovesse andare bene sovrascrivetelo così: 

```bash
mv mirrorlist.new mirrorlist
```

Altrimenti decommentate il file dal sistema host con un tool più accurato.



A procedura terminata aggiorniamo pacman: 

```bash
pacman -Syyu
```





E quindi installiamo tutti i pacchetti di cui pensiamo di avere bisogno con `pacman`:

```bash
pacman -S nomi pacchetti
```



## Accediamo con systemd

Una volta installato il sistema è possibile accederci con `systemd`. Spostate e rinominate come volete la cartella con il sistema installato ovviamente, supponiamo che sia un generico percorso `/cartella/archlinux`. Accedervi è molto facile: 

```
systemd-nspawn -D /cartella/archlinux -b 
```



Fate quindi il login come in un normalissimo sistema. Per poi spegnere scrivete: 

```bash
systemctl poweroff
```



Se per qualche motivo non aveste chiuso bene il container, potrebbe non essere più possibile accedervi. In tal caso potete chiuderlo con machinectl, cercate prima il nome del container aperto con: 

```bash
machinectl
```



Quindi chiudetelo: 

```bash
machinectl poweroff nomecontainer
```



Il container dovrebbe avere il nome della cartella in cui avete la vostra installazione.



### Aiuto non so usare e installare le cose che mi servono!

Ormai è una normalissima installazione di archlinux, potete benissimo informarvi [sulla wiki ufficiale](https://wiki.archlinux.org), ad oggi probabilmente l'insieme di guide sul mondo linux più completa che esista. 
Ma se tutto ciò ancora non vi basta, potete dare un occhiata alla [mia guida di installazione di archlinux](https://github.com/PsykeDady/Archlinux_installazione), solo una richiesta: seguitela si, ma con la wiki ufficiale accanto. Non tutto ciò che ho scritto è sempre aggiornato e comunque ognuno potrebbe avere necessità diverse. Seguite i capitoli dopo il primo riavvio.



### Accediamo e condividiamo una cartella

Potreste pensare di voler condividere una cartella con il sistema guest, in quel caso l'istruzione di accesso si modifica: 

```bash
systemd-nspawn -D /cartella/archlinux -b --bind /percorso/cartella/host:/percorso/cartella/container
```

Ad esempio, creiamo e condividiamo la cartella Documenti all'interno della nostra home: 
```bash
systemd-nspawn -D /cartella/archlinux -b --bind $HOME/Documenti:/home/DocumentiHost
```



Una volta fatto l'accesso dovremmo trovarci la cartella `/home/DocumentiHost` con tutti i nostri documenti.

Per una maggiore sicurezza esiste l'alternativa `--bind-ro` che condivide in sola lettura:
```bash
systemd-nspawn -D /cartella/archlinux -b --bind-ro $HOME/Documenti:/home/DocumentiHost
```



### Aprire una finestra con GUI

Per aprire una finestra con gui è necessario che nel nostro container sia innanzitutto installato `xserver` e `xhost`. Per installarli su archlinux: 

```bash
pacman -S xorg-server
```



È necessario che `xhost` sia installato anche nei sistemi host.



#### Ubuntu

Per installarlo su Ubuntu

```bash
apt install x11-xserver-utils
```





#### Fedora 

Per installarlo su Fedora

```bash
dnf install xorg-x11-server-utils
```





#### Archlinux 

Per installarlo su Archlinux 

```bash
pacman -S xserver-xhost
```



#### Utilizzare xhost

Dall'host scrivere: 

```bash
xhost +local:
```



Quindi fare la login con `systemd-nspawn` nel container. Ora esportare la variabile DISPLAY: 

```bash
export DISPLAY=:0
```

Quindi utilizzare xhost per consentire tutte le connessioni: 

```bash
xhost - 
```



Adesso potete tranquillamente avviare un applicazione. Installiamo ed avviamo ad esempio geany: 

```bash
pacman -S geany
```

Quindi avviamolo: 

```bash
geany
```



Possiamo anche sfruttare una subshell per evitare di tenere la shell impegnata fino alla chiusura del programma, per farlo: 

```bash
(geany >/dev/null 2>/dev/null &);
```



