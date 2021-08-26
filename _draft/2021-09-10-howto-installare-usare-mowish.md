---
title: '#howto - installare ed usare mowish' 
date: 2021-09-10 11:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
tags: 
- bash 
- ubuntu 
- archlinux 
- fedora 
---



Esistono alcune cartelle della nostra home che normalmente si riempiono di così tanti file che poi non riusciamo più a capire se ce ne sia qualcuno realmente utile tra questi.   
Nel mio caso ad esempio la cartella *Scaricati* o quella di *TelegramDesktop* dove difficilmente riesco a tenere ordine.   

Di necessità si fa virtù, e con la virtù ho creato una piccola utility che ho pensato potesse servire anche a voi! 



## Cos'è mowish

Letteralemente **M**ake **O**rder **WI**th ba**SH** (Fai ordine con bash)  è un progettino con il quale puoi categorizzare i tuoi file in base al tipo. Come saprete su linux il tipo dei file non è dato dall'estensione, ma viene individuato tramite il così detto "*magic number*". Mowish tenta di catalogare attraverso questo.   
Ad esempio avendo una cartella con immagini, audio e file di testo semplice, eseguendo mowish la tua cartella verrà riorganizzata e categorizzata in sotto cartelle ognuna delle quali conterrà solo file dello stesso tipo.

Attualmente, mowish supporta: 

- Audio
- Immagini
- Documenti (PDF)
- VIDEO
- testi
- file di codice
- archivi
- eseguibili
- immagini disco (ISO)
- Pacchetti installazione DEB e RPM

Lo script è facilmente estendibile, trovate [qui tutti i dettagli del progetto](https://github.com/PsykeDady/mowish)
## Installazione

### automatica
clona il repository: 
```bash
git clone https://github.com/PsykeDady/mowish
```

esegui lo script di installazione: 
```bash
./mowish/install.sh
```

Ti verrà chiesto se vuoi fare pulizia dei file di installazione.

### manuale
puoi installare il programma manualmente seguendo le seguenti istruzioni: 

1. copia la cartella di mowish in `/usr/share`: 
```bash 
sudo cp -r mowish /usr/share/mowish 
```
1. collega lo script nella cartella `/usr/bin`  
```bash
sudo ln -sf /usr/share/mowish/mowi.sh /usr/bin/mowish
```
1. installa l'estensione per il tuo gestore dei file

### servizio dolphin
Per il gestore dei file dolphin ( normalmente installato con plasma DE ) puoi seguire le seguenti istruzioni :   
```bash
printf "$(printf resources/mowish_dolphin.desktop)" "organizzaCartelle" "organizzaCartelle" "Organizza Cartelle" | sudo tee /usr/share/kservices5/mowish.desktop
```

Potrai quindi usare mowish dal menu azioni di dolphin (tasto destro su uno spazio vuoto &rarr; azioni &rarr; Organizza Cartelle)
#### script nautilus

Per il gestore dei file nautilus (normalmente installato con Gnome DE) puoi seguire le seguenti istruzioni:

```bash 
mkdir -p $HOME/.local/share/nautilus/scripts

cp resource/mowish_nautilus.sh $HOME/.local/share/nautilus/scripts/"Organizza Cartelle"

chmod +x $HOME/.local/share/nautilus/scripts/"Organizza Cartelle"
```

Potrai quindi usare mowish dal menu script di nautilus (seleziona un file qualunque della cartella da organizzare &rarr; tasto destro &rarr; scripts &rarr; Organizza Cartelle. Facendo tasto destro su una cartella mowish agirà su di essa) 

##### **LIMITAZIONI DI NAUTILUS**

- Il menu script appare solo se si selezionano uno o più file. 
- lo script non viene installato per tutti gli utenti, ogni utente dovrà installare il suo

#### azione nemo
Per il gestore dei file nemo (normalmente installato con Cinnamon DE) puoi seguire le seguenti istruzioni: 

```bash
printf "$(printf resources/mowish_nemo.nemo_action)" "Organizza Cartella" "Organizza Cartella" | sudo tee /usr/share/nemo/actions/mowish.nemo_action
```

Potrai quindi usare mowish dal menu contestuale di nemo (Tasto destro su uno spazio vuoto &rarr; Organizza cartella )

#### contratto di pantheon (gestore file di elementary)
Per il gestore dei file di elementary (normalmente installato con Pantheon DE) puoi seguire le seguenti istruzioni: 

```bash
printf "$(printf resources/mowish_elementary.contract)" "Organizza Cartella" "Organizza Cartella" | sudo tee /usr/share/contractor/mowish.contract
```

Potrai quindi usare mowish dal menu contestuale del file manager di pantheon (Tasto destro su uno spazio vuoto &rarr; Organizza cartella )

## Disinstallazione

### automatica
Puoi usare lo script di disinstallazione:

```bash
/usr/share/mowish/uninstall.sh
```

### manuale

cancella il collegamento simbolico di mowish in `/usr/bin` :
```bash
sudo rm /usr/bin/mowish
```

cancella la cartella mowish all'interno di `/usr/bin`
```bash
sudo rm -rf /usr/bin/mowish
```

cancella il file per il tuo gestore file se ne avevi installato uno.

#### servizio dolphin
cancella il file di servizio dalla cartella `/usr/share/kservices5`: 

```bash
rm /usr/share/kservices5/mowish.desktop
```
#### script nautilus
cancella lo script dalla cartella `$HOME/.local/share/nautilus/scripts`

```bash
rm $HOME/.local/share/nautilus/scripts/"Organize Directory"
```

#### azione nemo
cancella l'azione dalla cartella `/usr/share/nemo/actions` 

```bash
rm /usr/share/nemo/actions/mowish.nemo_action
```

#### contratto elementary
cancella il contratto dalla cartella `/usr/share/contractor` 

```bash
rm /usr/share/contractor/mowish.contract
```
## Uso

Puoi fare ordine nella cartella corrente scrivendo semplicemente: 

```bash
mowish
```

o specificare un percorso scrivendo: 
```bash
mowish percorso/cartella
```


### Opzioni

con il flag `-d` o `--debug` verranno stampate tutte le istruzioni ed i passaggi ( utile per il debug )
```bash
movish -d path/to/dir
```

con il flag `-r` o `--recursive` il software diventa ricorsivo, ogni sotto cartella verrà riorganizzata.
```bash
mowish -r path/to/dir
```

### Comandi per la stampa delle informazioni ( stampa ed esci )

con il flag `-h` o `--help` viene visualizzato questo menù di aiuto
con il flag `-e` o `--errors` viene visualizzata una lista di codici errore
con il flag `-v` o `--version` viene visualizzata la versione del programma



## Sviluppi futuri 

Ho parecchie idee in testa per mowish. Tra queste vorrei implementare l'identificazione e la disposizione in cartelle di: 

- codici sorgenti 
- immagini per risoluzione (da SD a UHD)
- progetti gimp (XCF)
- catalogazione per dimensione del file (sotto il KB, sotto il MB, sotto il GB ...etc)



Se volete partecipare con idee o direttamente sul codice, contattatemi pure tramite la sezione issue del repository o su Telegram! 



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).

