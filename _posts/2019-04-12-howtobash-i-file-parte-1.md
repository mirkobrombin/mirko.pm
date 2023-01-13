---
class: post
title: '#howtobash - I file (Parte 1)'
date: 2019-04-12
layout: post
author: Leo
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
File fantastici e come copiarli

Benvenuti al secondo appuntamento con **#howtobash.**

Dopo aver mosso i primi passi all’interno del **terminale**, che a partire dall’inizio di questo magnifico viaggio (per chi se lo fosse perso, lo trovate in [questa pagina](https://linuxhub.it/node/558), dove verranno raccolte anche tutte le prossime puntate) è diventato un nostro nuovo e fedele alleato, oggi scopriamo come interagire con file che troviamo all’interno delle cartelle fra le quali abbiamo imparato a muoverci.

Quindi non perdiamo tempo in chiacchiere e cominciamo subito col nuovo episodio!

## Un pizzico di “teoria”

Nella scorsa puntata abbiamo sempre utilizzato i comandi del terminale con le forme seguenti:

**comando**

come ad esempio:

    leo@leo-pavillion:$ ls

oppure:

**comando** _bersaglio_

come ad esempio:

    leo@leo-pavillion:$ cd Documenti

Tuttavia questi non sono gli unici modi di utilizzare i comandi. Vediamo quindi di fare un altro passo in avanti verso la padronanza del terminale. Quindi prima di partire chiariamo meglio i concetti di **passaggio**, **argomento** ed **opzione**:

*   E’ possibile che vi sia già capitato di sentire l’espressione “**passa** _X_ al comando Y”, e per quanto sia un concetto davvero molto semplice magari non è sempre così ovvio. Quindi per “**passare**” qualcosa ad un comando si intende fornire un’informazione che il comando andrà ad utilizzare in qualche maniera durante la sua esecuzione.  
    Un (perchè vedremo più avanti che ce n’è più di uno) modo tipico con cui si passa qualcosa, tipicamente uno o più **argomenti** e/o una o più **opzioni**, ad un comando è “banalmente” scrivere l’informazione da passare dopo il nome del comando da eseguire.

*   Un **argomento** è ciò che sopra abbiamo indicato come _bersaglio_ ovvero il file/cartella/variabile su cui il nostro comando andrà effettivamente ad agire.

*   Una **opzione** (spesso anche chiamate flag) è un’informazione che permette di **cambiare** il comportamento del programma e fargli eseguire operazioni diverse rispetto a quelle che farebbe se lanciato senza. Il modo con cui le opzioni vengono passate ad un comando è utilizzando il carattere “-” seguito da una lettera (e qui dovremo fare attenzione perchè spesso fra maiuscolo e minuscolo c’è differenza), oppure, nel caso di opzioni con nomi più lunghi di una lettera, si utilizza “--” seguito dal nome dell’opzione.

Negli esempi che abbiamo visto fino ad oggi non abbiamo mai utilizzato opzioni di alcun tipo, ma oggi ne vedremo più di uno, motivo per cui queste premesse sono state necessarie. Direi che per oggi con la teoria possiamo fermarci qui, veniamo quindi ai nostri comandi del giorno!

## Copiare un file

Una delle operazioni più comuni che potremmo voler eseguire su un file è quella della semplice copia, per farlo ci basterà utilizzare il comando _**cp**_ seguito , nell’ordine, da:

*   file _da copiare_ (eventualmente preceduto dal percorso)
*   percorso _in cui copiare_ il file

Vediamo un esempio per chiarire il tutto, supponiamo di trovarci nella cartella ~/Documenti e di volervi copiare un documento _**Modulo.pdf**_ che abbiamo appena scaricato e che si trova nella cartella _**~/Scaricati**_.

Se vi ricordate le [**regolette**](https://linuxhub.it/article/howtobash-comincia-il-viaggio#title3) che abbiamo visto l’ultima volta, sapete che abbiamo diversi modi comporre il percorso “sorgente” e diversi modi per specificare la destinazione, qui ve ne riporto volutamente soltanto uno (quello a mio avviso un po’ più criptico per chi comincia, analizzandolo nei punti critici), ma vi invito a sperimentarne anche altri per comprendere meglio ciò che ci siamo detti l’altra volta. Quindi, per copiare il nostro file digitiamo:

    leo@pavillion:~/Documenti$ cp ../Scaricati/Modulo.pdf .

Se ricordate bene o avete ripassato le regolette a questo punto dovrebbe essere evidente che ho scelto di costruire i percorsi a partire dal punto in cui mi trovo, ovvero andando a pescare il mio file andando su di un livello (utilizzando “.. “) e riscendendo le cartelle fino ad arrivare al file e ho specificato la destinazione dicendo “_qui_” utilizzando il “**.**” .

## Copiare una cartella e il suo contenuto

Ciò che abbiamo appena visto funziona benissimo se vogliamo maneggiare un **singolo** file, ma se volessimo copiare una **cartella** **con** **tutto ciò che c’è dentro**? Dovremmo forse copiare tutto quanto una cosa alla volta? La risposta, è ovviamente no. Se però avete provato ad utilizzare il comando _**cp**_ utilizzando come argomento una cartella avrete ottenuto un **errore** simile a questo:

    cp: -r not specified; omitting directory 'Scaricati/'

il quale ci informa del fatto che la cartella non verrà copiata perchè non abbiamo specificato **-r** .

Quest’ultima è infatti l’**opzione** che dobbiamo passare al comando cp per dirgli che vogliamo copiare una cartella ed il suo contenuto. Ne consegue che se, per esempio, partendo dalle condizioni di prima, volessimo copiare una cartella _**Moduli**_, posta all’interno della cartella _**~/Scaricati**_, nella nostra cartella **_~/Documenti_**, dovremmo utilizzare il comando:

    leo@pavillion:~/Documenti$ cp -r ../Scaricati/Moduli .

## Tips & Tricks

Ora che sappiamo come si copiano i file e le cartelle veniamo alla parte più interessante: un po’ di trucchetti per fare più alla svelta e meno fatica!

### Copiare più file alla volta

Sono abbastanza certo che una grossa fetta di voi si sarà chiesta: “ma se volessi copiare più di un file per volta? Come devo fare?”. Niente di più semplice, infatti possiamo passare al comando cp tutti i file che vogliamo copiare in un colpo solo, basterà separarli con uno spazio e ricordandosi di lasciare per ultima la cartella di destinazione! Sempre riferendoci all’esempio di prima, immaginiamo di voler copiare Modulo1.pdf e Modulo2.odt presenti in ~/Scaricati nella cartella ~/Documenti. Il comando sarà:

    leo@leo-pavillion:~/Scaricati$ cp Modulo1.pdf Modulo2.odt ~/Documenti

### Copiare tutti i file insieme

Posso già sentire le proteste: “E se in una cartella ci sono 100 file? Devo scriverli tutti?”.

Anche per questo problema (e tutti quelli che vi assomigliano) il nostro fantastico **terminale** ha già una soluzione, e questa soluzione si chiama **wildcards** , un set di armi potentissime che ci permetterà di fare cose anche molto complesse con pochissima fatica.

Non entriamo oggi nei dettagli delle **wildcards** (non spiegherò cosa siano di preciso né tutto quello che possiamo farci; vi lascio con un po’ di curiosità per le prossime puntate :P )perché per poterle apprezzare come si deve, secondo me, è ancora un po’ presto.

Quello che vorrei fare è introdurle una alla volta man mano che ci serviranno e fare un po’ di recap, e magari vederle tutte, una volta che saremo più esperti e potremo sfruttarle come si deve.

La **wildcard** che vediamo oggi è “*****” che ha il significato di “_tutto_”, e la utilizzeremo in accoppiata col comando cp per dirgli di copiare tutti i file in una cartella.

Immaginiamo di aver scaricato un pack di 30 sfondi bellissimo che adesso si trova nella cartella _**~/Scaricati/Wallpapers**_ e che vogliamo tenere in una cartella Sfondi che abbiamo creato dentro alla cartella **_~/Immagini_**, mettersi lì a copiare i file uno alla volta, o anche tutti insieme ma passando tutti i nomi al comando cp sarebbe un’operazione più che sufficientemente lunga e noiosa da farci perdere qualsiasi buona volontà possiamo aver raccolto per imparare ad utilizzare il terminale. Per effettuare l’operazione senza sbattimenti di sorta ci basterà ricorrere alla nostra nuova alleata, la wildcard * e, supponendo di trovarci all’interno della cartella Sfondi in cui vogliamo copiare i file, ci basterà dare il comando:

    leo@leo-pavillion:~/Immagini/Sfondi$ cp ~/Scaricati/Wallpapers/* .

Anche per oggi direi che è tutto, vi saluto e spero di avervi dato qualche spunto per iniziare ad usare in modo più piacevole il terminale.

Ci becchiamo col prossimo episodio di **#howtobash**!