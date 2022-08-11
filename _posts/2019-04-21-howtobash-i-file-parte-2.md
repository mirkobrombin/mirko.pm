---
title: '#howtobash - I file (Parte 2)'
date: 2019-04-21
layout: post
author: Leo
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Files: Endgame

Benvenuti al terzo appuntamento con **#howtobash**! Dopo aver imparato un po’ più nel dettaglio come funzionano i comandi ed essere diventati dei maghi  nella [copia dei file](https://linuxhub.it/article/howtobash-i-file-parte-1), è arrivato il momento di imparare alcune delle altre operazioni fondamentali che possiamo effettuare sui file.

Parliamo quindi di come:

*   Spostarli
*   Rinominarli
*   Cancellarli

## **Una breve premessa**

Come ormai ci siamo abituati nelle precedenti puntate, prima di cominciare apriamo una piccola parentesi e mettiamo giù un paio di concetti che ci saranno utili per proseguire nel nostro viaggio. Senza dilungarmi troppo, oggi faccio solo presente che tutte le considerazioni che abbiamo fatto per il comando _**cp**_, ossia:

*   Il passaggio multiplo di **argomenti**
*   La possibilità di modificarne il comportamento tramite **opzioni**
*   L’uso delle **wildcards**

valgono anche per i comandi che vedremo oggi (ed in generale sono applicabili per tutti i comandi per cui i ragionamenti che abbiamo fatto abbiano senso di esistere).

Detto ciò, siamo pronti per cominciare!

## **Spostare un file**

Il comando che che ci permette di **spostare** uno o più file è **mv** e si utilizza in modo pressoché identico a come abbiamo visto con **_cp_**, prendiamo il solito esempio del file _**Modulo.pdf**_ che abbiamo in _**~/Scaricat**_i e spostiamolo in _**~/Documenti**_, il comando sarà:

    leo@leo-pavillion:~$ mv Scaricati/Modulo.pdf Documenti

come sempre vi invito a _fare attenzione_ alla _posizione attuale_ (segnata fra i simboli “**:**” e “**$**” nel terminale) e il modo in cui compongo i **percorsi** da dare in pasto al comando. Cercherò di utilizzarli sempre in modo diverso per abituarvi a ragionarci sopra ed a trovare il metodo che più vi può essere comodo. In questo caso sono partito dalla mia cartella **home** e ho costruito i percorsi a partire da lì.

## **Rinominare un file**

Questo tipo di operazione è una di quelle che preferisco perché si tratta di una di quelle “meno intuitive”; questo perché non abbiamo un comando “_rename_” già pronto all'uso, o meglio, esiste ed è anche molto potente, ma lo vedremo più avanti perché richiede dimestichezza con qualche concetto più avanzato di quelli che conosciamo al momento.

L'operazione di **rinomina** come la vediamo oggi è di fatto un caso particolare di **spostamento**. Per **rinominare** un file, infatti, quello che dobbiamo fare è utilizzare il comando **_mv_** e “_spostare_” il file nel suo nuovo nome.

Prendiamo il nostro sempre caro _**Modulo.pdf**_ all’interno della nostra cartella _**~/Scaricati**_, sappiamo che questo modulo è un “_Allegato-A_” di una qualche norma che ci interessa e vogliamo quindi rinominarlo in _**Allegato-A.pdf**_ , il comando che dobbiamo dare diventa quindi:

    leo@leo-pavillion:~/Scaricati$ mv Modulo.pdf Allegato-A.pdf

> Mi raccomando, controllate sempre che nel percorso in cui operate non esista già un file con lo stesso nome, poichè qualora fosse presente il file esistente verrebbe sovrascritto ed andrebbe perso!

Se siete nel dubbio, il mio consiglio è quello di utilizzare il comando _**mv** _con l'opzione **-b**.

In questo modo il comando controllerà per voi che il file di destinazione non esista e, qualora esistesse, andrebbe ad effettuarne un backup ed a rinominarlo aggiungendo una **~** (tilde) in fondo al nome.

Riprendendo l'esempio appena fatto, se il file **_Allegato-A.pdf_ **esistesse già, dando il comando:

    leo@leo-pavillion:~/Scaricati$ mv -b Modulo.pdf Allegato-A.pdf

l'operazione verrenne effettuata comunque, ma dando un **_ls_ **avremmo un risultato del genere:

    leo@leo-pavillion:~/Scaricati$ lsAllegato-A.pdf Allegato-A.pdf~

Sintono del fatto che il file **_Allegato-A.pdf_ **esisteva già e che ne è stato fatto un backup il quale è stato rinominato in **_Allegato-A.pdf~_ **_._

### **Cancellare un file**

Per **cancellare** un file il comando da utilizzare è **_rm_** , non c’è molto da aggiungere rispetto a quello che abbiamo visto per **_cp_**, volendo vedere un esempio, immaginiamo di esserci rotti le scatole del famoso _**Modulo.pdf** _e di volerlo cancellare dal nostro sistema una volta per tutte, il comando sarà:

    leo@leo-pavillion:~/Scaricati$ rm Modulo.pdf

e a questo punto, **puf!** andato, sparito per sempre! Ed è proprio su questo punto che invito a riflettere: **da _rm_ non si torna indietro**. Non entro nei dettagli tecnici della cosa e su come con dei barbatrucchi mirabolanti a volte si riesca a recuperare qualcosa. Per l’utente normale _**rm**_ è una decisione **definitiva**.

Adesso che vi ho spaventati abbastanza sulle conseguenze di rm vi ricordo che, per **cancellare** una cartella con tutto il suo contenuto, in modo identico a ciò che avviene con la copia, bisogna utilizzare l’opzione -r . Quindi, per cancellare l’altrettanto famosa cartella Moduli daremo:

    leo@leo-pavillion:~/Scaricati$ rm -r Moduli

Vediamo ora un paio di opzioni che vi possono tornare utili per **non sbagliare** quando utilizzate **rm**:

*   **-i** questa opzione vi chiede conferma prima di cancellare qualsiasi file

*   -**I** (i maiuscolo) vi chiede conferma quando utilizzate l’opzione -r oppure se state per cancellare più di 3 file contemporaneamente

Potrebbero sembrare poco utili in un primo momento, ma si rivelano essere quasi dei salvavita nel momento in cui doveste andare ad utilizzare **rm** con le **wildcards** (che abbiamo solo accennato qui, ma che arriveremo a discutere nel dettaglio).

## **Tips & tricks**

Come ormai è consuetudine, prima di salutarci vi lascio con un paio di **trucchetti** che possono tornarvi utili durante l’utilizzo quotidiano del **terminale**.

### **Conoscere il tipo di file**

E’ possibile che molti leggendo il titolo di questa sezione abbiano storto il naso: “ma come, l’estensione non mi dice già tutto quello che devo sapere del file?”, la risposta è no, e i motivi sono molteplici, ma a noi ne bastano 2:

*   a volte potrebbe semplicemente essere sbagliata
*   è un’estensione che non conosciamo e non abbiamo idea di cosa ci aspetti dentro al file

Per toglierci qualsiasi tipo di dubbio ci basta utilizzare il comando **file** seguito dal nome del file di cui vogliamo conoscere le proprietà, un esempio potrebbe essere:

    leo@leo-pavillion:~/Scaricati$ file Modulo.pdf

Che avrà un **output** molto simile a questo:

    Modulo.pdf: PDF document, version 1.5

Quest'ultimo, oltre a ricordarci che ormai questo file ce lo sogniamo pure di notte, ci dice che il file è **effett****ivamente** un file di tipo pdf.

### Opzioni multiple

Se ricordate quello che ci siamo detti l’[altra volta](https://linuxhub.it/article/howtobash-i-file-parte-1), quando vogliamo passare un’opzione rappresentata da una singola lettera, dobbiamo utilizzare il carattere “-” seguito dalla lettera che indica l’opzione che vogliamo utilizzare, mentre se vogliamo utilizzare i nomi lunghi (composti quindi da più caratteri) dobbiamo utilizzare “--” .

Nel caso in cui invece volessimo utilizzare più di un’opzione, come facciamo?  
La risposta “ovvia” è che ci basta ripetere “-” e specificare una nuova opzione, in modo simile a questo:

    leo@leo-pavillion:~/Scaricati$ rm -r -I Moduli

la risposta un po’ meno ovvia è che possiamo mettere in coda al singolo “-” più di un’opzione a carattere singolo, quindi il comando precedente possiamo anche scriverlo così:

    leo@leo-pavillion:~/Scaricati$ rm -rI Moduli

Questo metodo rivela particolarmente utile quando le opzioni che dobbiamo passare ad un comando sono diverse (qualcuno ha detto tar ?!?). Prima di salutarci voglio quindi farvi riflettere su un comando che, molto probabilmente, avete già visto in giro e magari qualcuno vi ha anche consigliato di lanciare come soluzione al vostro problema (per carità, **non fatelo**):

    leo@leo-pavillion:~/Scaricati$ rm -rf /

Se avete letto la guida con un minimo di attenzione (salvo per l’opzione **-f** che è semplicemente una forzatura, ma la vedremo nel dettaglio nel prossimo appuntamento) dovreste aver intuito perchè dare quel comando è una pessima idea e chi ve lo consiglia ha un pessimo senso dell’umorismo e non sta cercando di aiutarvi.

Anche per oggi direi che è tutto, vi saluto e spero di avervi dato qualche spunto per iniziare ad usare in modo più piacevole il terminale.

Per quanto riguarda l'utilizzo del comando 'mv', è [qui presente](https://linuxhub.it/article/howto-utilizzo-del-comando-mv) una guida tecnica nella nostra raccolta.

Se aveste dubbi o domande (magari anche sull’ultimo comando “misterioso”) da porre trovate me e gli altri membri dello staff sul gruppo **telegram** della nostra community[  **/gentedilinux**](https://t.me/gentedilinux).