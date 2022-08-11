---
title: '#howto - Installazione ed uso di TagSH'
date: 2020-12-30
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
Più volte mi son trovato nella situazione di avere più file nel mio sistema sparsi in varie cartelle, ma che in un determinato contesto necessitavo di tenere d'occhio sotto una stessa cartella. Alcuni casi d'esempio sono:

- Appunti universitari di una determinata cartella che trovavano poi praticità in alcuni progetti in un'altra cartella
- Immagini o documenti sparsi per diversi sistemi di Cloud Storage, da voler vedere sotto una stessa cartella
- Raggruppare vari eseguibili di programmi che dovevano essere eseguiti insieme 

Di necessità si fa virtù, quindi mi son trovato a creare **[TagSH](https://github.com/PsykeDady/TagSH)**. 

## Introduzione di TagSH

**TagSH** è uno script bash che crea dei collegamenti nella home (sotto la cartella `$HOME/.tag`) e rende visibile nei *bookmark*, segnalibri, dei nostri File Manager la cartella da noi salvata, così da facilitarne l'accesso. I collegamenti vengono categorizzati in cartelle che ne rappresentano le etichette.

Con questo software è possibile:

- creare tag ed associazioni, dando eventualmente anche dei nomi alle associazioni stesse
- rinominare i tag in un secondo momento o rinominare le associazioni
- eliminare i tag e le associazioni
- creare la lista di tag ed associazioni

Il programma, inoltre, predispone uno script di installazione e uno di disinstallazione, così come uno di test (da utilizzare se si vuole verificare la compatibilità col sistema).

## Installazione

Per installare TagSH, scaricate il repository da Github e avviate lo script di installazione:

```bash 
git clone https://github.com/PsykeDady/TagSH

./TagSH/install.sh
```

Verrà fatta pulizia eliminando la cartella di download del repo.

> **Nota**: volendo è possibile eseguire dei test in fase di installazione, eseguendo lo script `./TagSH/test.sh` invece dell'install. Se tutto va bene, alla fine dei test verrà proposta l'installazione del software. Questi test son pensati più per la fase di sviluppo che per l'utente finale, quindi non sono necessari.

### Installazione manuale

Per installare TagSH è anche possibile evitare di usare lo script di installazione. Ciò che bisognerà fare è semplicementer scaricare il repository e spostare a mano i file:

```bash
git clone https://github.com/PsykeDady/TagSH
cp TagSH /usr/share/TagSH
ln -sf /usr/share/TagSH/tag.sh /usr/bin/tagsh
```

Potete, in questo modo, anche personalizzare il percorso di installazione del software, o il nome dello script.

## Disinstallazione

Se invece volete disinstallare il programma, sappiate che potete eseguire uno script di disinstallazione:

```bash
/usr/share/TagSH/uninstall.sh
```

> **ATTENZIONE**: Se avete installato TagSH manualmente in un'altra cartella, non disinstallatelo con lo script! 

Lo script di disinstallazione rimuove anche i bookmark eventualmente aggiunti e la cartella `~/.tag`

### Disinstallazione manuale

Parlando della disinstallazione manuale, si può semplicemente eseguire questi comandi:

```bash
rm /usr/bin/tagsh
rm -rf /usr/share/TagSH
rm -rf $HOME/.tag
```

Per eliminare i bookmark manualmente consiglio di aprire il vostro file manager e rimuoverli da lì, ma se proprio volete fare tutto da terminale potete eliminare a mano dai file di bookmark le righe che ha aggiunto **TagSH**.

> **Nota**: I bookmark sono due, quello generico e quello di GNOME. Se usate un sistema con solo GNOME è molto probabile che non abbiate il bookmark generico, viceversa se ad esempio usate KDE Plasma. Ignorate semplicemente il file che non trovate.

Aprite il file `$HOME/.local/share/user-places.xbel`, trovate e cancellate le righe:

```xml
<bookmark href="file:///home/yourname/.tag">
  <title>TagSH</title>
  <info>
   <metadata>
    <bookmark:icon name="tag-symbolic"/>
   </metadata>
  </info>
</bookmark>
```

Poi aprite il file `$HOME/.config/gtk-3.0/bookmarks` e cancellate la seguente riga:

```properties
file:///home/yourname/.tag TagSH
```

## Uso ed esempi di TagSH

>Non vuoi leggere tutta la guida? Allora vai al capitolo [TLDR](https://linuxhub.it/articles/howto-installare-ed-usare-tagsh#title16). Salta tutto e vai ad una freddissima tabella riassuntiva!

### Add

Usare `TagSH` è semplicissimo, supponiamo di avere le cartelle:

- `$HOME/Dropbox/Immagini`
- `$HOME/Mega/Immagini`
- `$HOME/Immagini`
- `/home/ImmaginiComuni` 

da voler raggruppare sotto un unico tag: "`Immagini`". Partiamo dall'ultimo elemento della lista ed iniziamo così ad aggiungere il nostro primo tag:

`tagsh /home/ImmaginiComuni Immagini`

Cosa ha fatto il nostro software?
- È stata prima creata la cartella `$HOME/.tag`
- Sono stati creati i *due bookmark* 
- Creata la cartella "**Immagini**" sotto la cartella di *TagSH*
- È stato creato il link simbolico di `/home/ImmaginiComuni` nella cartella `$HOME/.tag/Immagini/`.   

Possiamo controllare che tutto sia andato a buon fine aprendo il nostro f.m. e controllando l'esistenza di `$HOME/.tag/Immagini/ImmaginiComuni`. Inoltre, il messaggio di output del comando  dovrebbe essere questo:

> La cartella non esiste, creazione di Tag  
> nuovo tag, creo la directory  
> tag associato!, controlla la directory  
> bookmark aggiunto
> bookmark GTK3 aggiunto  

Se uno dei due bookmark dovesse dare errore, non ve ne preoccupate, potrebbe essere normale in alcuni sistemi non avere uno dei bookmark come già spiegato in precedenza. La presenza del bookmark verrà comunque controllata per ogni file aggiunto.

Continuiamo le nostre aggiunte:

```bash
tagsh $HOME/Immagini Immagini
```

Con l'output che, ora, dovrebbe essere:
> tag associato!, controlla la directory  
> bookmark presente  
> bookmark GTK3 presente  

Se adesso dovessimo dare il comando per aggiungere la cartella MEGA, ci sarebbe restituito un errore poiché esiste già un associazione Immagini sotto il tag Immagini. Come fare? basta dare un nome ai prossimi collegamenti:

```bash
tagsh $HOME/Dropbox/Immagini Immagini Dropbox

# Possiamo aggiungere collegamenti usando anche percorsi non assoluti

cd $HOME/MEGA

tagsh Immagini Immagini MEGA
```

### List 

Controlliamo il nostro operato tramite l'operazione `list`: 

```bash
tagsh -l
```

che dovrebbe restituirci:

> <u>I Tuoi Tag</u>:   
> "Immagini"

Andiamo più nel profondo con il parametro *-l*:

```bash
tagsh -l Immagini
```
L'output sarà:

><u>Immagini</u>:  
>"Dropbox" "Immagini" "ImmaginiComuni" "MEGA"

Possiamo quindi assicurarci così che tutto sia stato aggiunto a dovere.

### Rename

Rinominiamo il tag aggiunto da "*Immagini*" a "*Foto*":

```bash
tagsh -n Immagini Foto
```

poi rinominiamo l'associazione `ImmaginiComuni` in `Comuni`:

```bash
tagsh -n Foto ImmaginiComuni Comuni
```

Possiamo usare il comando `--list` (o `-l`)  per vedere se è stato rinominato tutto correttamente.

### Remove

Rimuoviamo l'associazione *Immagini* dal tag *Foto*:

`tagsh -r Foto Immagini`

Oppure eliminiamo l'intero tag `Foto` e tutte le sue associazioni:

`tagsh -r Foto`

### Help

Non esiste un vero e proprio help in TagSH, ma l'*usage* viene stampato per ogni errore. Ad esempio senza scrivere nulla:

`tagsh`

### Versione

Si può poi verificare la versione del software con:

`tagsh -v`

### Debug

Infine esiste un'opzione speciale concatenabile a tutte le altre, ovvero quella di **debug** (`-d` o `--debug`). Ad esempio vediamo il debug dell'opzione version:
`tagsh -v -d`

Output d'esempio:

```
[DEBUG] numero parametri rimasti=1
[DEBUG] gestendo -d
[DEBUG] numero parametri rimasti=0
[DEBUG] debug mode on
[DEBUG] lista parametri:
[DEBUG]         op=v
[DEBUG]         percorso=
[DEBUG]         tagname=
[DEBUG]         linkname=
=============================
tagsh version=0.7

Per i prossimi sviluppi seguite il progetto su github: https://github.com/PsykeDady/TagSH
=============================
[DEBUG] valore di uscita=0

```

## Prossimi sviluppi  
La tabella di marcia di TagSH è ancora lunga, si prevede di aggiungere il supporto multilingua, l'autoupdate del software e dei servizi GUI da aggiungere ai file manager.
Se siete interessati, seguite il progetto su GitHub!

## TLDR

TagSH permette di etichettare dei file con dei tag e averli sotto la cartella `$HOME/.tag` suddivisi in cartelle e raggiungibili con un bookmark tramite file manager.

| **Comando**                                   |                         **Cosa fa**                          |
| --------------------------------------------- | :----------------------------------------------------------: |
| `tagsh`                                       |                        Stampa l'help                         |
| `tagsh percorso nomeTag`                      | Etichetta il percorso (assoluto o relativo) con il tag specificato |
| `tagsh percorso nomeTag nomeCollegamento`     | Etichetta il percorso (assoluto o relativo) con il tag specificato con il nome specificato |
| `tagsh -l`                                    |                  Fa la lista di tutti i tag                  |
| `tagsh -l nomeTag`                            |          Fa la lista di tutti i collegamenti al tag          |
| `tagsh -r nomeTag`                            |          Elimina il tag e tutte le sue associazioni          |
| `tagsh -r nomeTag nomeAssociazione`           |                  Disassocia un file dal tag                  |
| `tagsh -n nomeTag nuovoNome`                  |            Rinomina un tag  con il nome indicato             |
| `tagsh -n nomeTag nomeAssociazione nuovoNome` |        Rinomina un associazione con il nome indicato         |
| `tagsh -v`                                    |               Stampa la versione del programma               |
| `tagsh -d altreOpzioni altriParametri`        | Attiva la modalità debug ad uno qualsiasi dei comandi elencati sopra |

