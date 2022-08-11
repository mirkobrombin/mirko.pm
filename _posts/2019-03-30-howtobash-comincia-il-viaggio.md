---
title: '#howtobash - Comincia il viaggio'
description: "Tutto quello che vorreste sapere sul terminale ma non avete mai osato chiedere."
date: 2019-03-30
layout: post
author: Leo
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ubuntu  
  - bash
---
Tutto quello che vorreste sapere sul terminale ma non avete mai osato chiedere.

Benvenuti, da oggi cominciamo una lunga ed avventurosa strada alla scoperta del magico mondo del terminale. Come già avete potuto leggere [qui](https://linuxhub.it/article/howto-utilizzo-del-comando-mv), [qui](https://linuxhub.it/article/howto-utilizzo-del-comando-man), [qui](https://linuxhub.it/article/howto-utilizzo-del-comando-dmesg) e, più in generale, [qui](https://linuxhub.it/node/528) , il **terminale**, una volta _unico mezzo di interazione con il pc_, nasconde tante funzioni molto interessanti che possono andare ad integrare (o anche sostituire) ciò che spesso facciamo _graficamente_ nel nostro amato ambiente **desktop**.

Sono assolutamente sicuro che nelle vostre scorribande in compagnia della vostra distro preferita vi sarete imbattuti in qualche operazione effettuabile solo dalla console, e se non siete utenti troppo esperti questo si traduce inevitabilmente in:

*   cerco una guida su internet
*   trovo un [RISOLTO] nel forum di supporto di ubuntu o qualche altro forum sperduto nell’internet
*   copio&incollo i comandi e mi tappo gli occhi sperando che tutto funzioni

Credo sia inutile dire che fin troppo spesso i passaggi di cui sopra hanno come risultato quello di mandarvi in palla il sistema da capo a piedi con pessime conseguenze.

## Cosa impariamo oggi:

Nel tempo mi è capitato spesso che mi si chiedesse: “si ok, ma come faccio ad imparare ad usare il terminale? come faccio a sapere quali comandi devo dare e capire cosa sto facendo?”. A partire da questo articolo vedremo, uno alla volta, tutti i comandi di base che servono per avere il pieno controllo delle nostre azioni, vedremo un po’ di situazioni ed applicazioni standard per ognuno di essi e anche qualche trucchetto per eseguire velocemente operazioni che fatte in ambiente desktop sarebbero molto più lente.

**Piccolo disclaimer:** tutte le puntate di questa raccolta (rivolta soprattutto ai principianti e a chi già conosce qualcosa ma vuole scoprire qualche trucco in più) avranno come shell di riferimento (se non si fosse capito dal titolo) la _bourne again shell _(**bash**, appunto) poiché si tratta di quella che più spesso si trova come shell di default prendendo una qualsiasi distro linux a caso, in modo da cercare di essere il più generale ,ed indipendente dalla distro utilizzata, possibile.

Detto ciò, bando alle ciance e partiamo dalle operazioni più semplici e più importanti allo stesso tempo:

*   Sapere cosa c’è dentro una cartella
*   Spostarci fra una cartella e l’altra

Non possiamo pretendere di imparare qualcosa leggendo e basta, quindi vediamo direttamente un esempio, aprite il vostro terminale, vi troverete davanti qualcosa del genere:

    leo@leo-pavillon:~$

dove come prima informazione compare il vostro **nome utente**, dopo la "**@**" invece c’è il nome del vostro pc (hostname) e dopo i "**:**" compare il simbolo "**~**" , quest’ultimo rappresenta un’abbreviazione per la cartella **home** associata al vostro utente, se volessimo ragionare in termini di percorso assoluto questa cartella sarebbe identificata (nel mio caso) come _/home/leo_ .

### Conoscere il contenuto di una cartella

Vediamo ora come possiamo sapere cosa c’è all’interno della nostra cartella home, il comando che ci serve in questo caso è :

    ls

il cui significato è un'abbreviazione di “_list_”, il quale mostrerà qualcosa di simile a questo:

    leo@leo-pavillon:~$ ls Documenti Immagini Modelli Musica Scaricati Scrivania Video

In questo modo abbiamo visualizzato il contenuto della cartella in cui siamo. Non è finita qui, perchè ls ci dà la possibilità di visualizzare anche il contenuto di una cartella differente da quella in cui siamo posizionati, per farlo è sufficiente specificare il percorso in cui ls deve andare a guardare. Se, per esempio, vogliamo visualizzare il contenuto della cartella Immagini dovremmo dare come comando:

    ls Immagini

con un risultato che dovrebbe ricordare qualcosa di questo tipo:

    leo@leo-pavillon:~$ ls ImmaginiIstantanea_2019-02-28_23-05-07.png linuxhub Screenshots Wallpapers

Ci sono ancora diversi utilizzi e sfaccettature del comando **_ls_ **che non abbiamo coperto qui, ma non voglio caricarvi di troppi concetti che sfruttereste poco all'inizio, quindi tutto ciò che manca lo scopriremo in una puntata più avanti.

### Spostarsi fra le cartelle

Ora che sappiamo come vedere cosa c’è dentro le cartelle è arrivato il momento di spostarci da una all’altra. Il comando che ci aiuterà a compiere questa azione è:

    cd

il cui nome è un'abbreviazione per “_change directory”_. Se, per esempio, vogliamo entrare nella cartella Documenti tutto ciò che dobbiamo fare è semplicemente dare come comando

    cd Documenti

il risultato sarà qualcosa che assomiglia molto a:

    leo@leo-pavillon:~$ cd Documentileo@leo-pavillon:~/Documenti$

Come potete vedere il percorso dopo i : è cambiato in**~/Documenti**, ad indicare che siamo all’interno della cartella Documenti, la quale risiede all’interno della cartella **~** .

### Comporre i percorsi

Ora che sappiamo spostarci fra le cartelle e guardarci dentro è bene imparare alcuni nomi “particolari” per indicare le cartelle e che ci saranno utili durante tutto il nostro viaggio alla scoperta del terminale.

*   Con il simbolo "**/**" indichiamo la radice (**root**) del sistema, la cartella più in alto di tutte e dalla quale, quindi, possiamo _solo scendere_. Quando vogliamo indicare un percorso assoluto (cioè indipendente dalla posizione in cui ci troviamo) infatti si comincia sempre con / , come abbiamo visto negli esempi precedenti (/home/leo , /usr/share etc. etc.)

*   Ho parlato di scendere, ma come si fa a salire? Semplice, la cartella indicata con .. rappresenta “un livello su” per cui se entriamo nella cartella /home/leo/Documenti il nostro livello su sarà /home/leo (vien da sè che dando come comando cd .. ci sposteremo al livello superiore). Possiamo anche indicare percorsi che prima salgono e poi scendono, ad esempio se siamo in /home/leo/Documenti e vogliamo sapere cosa c’è in /home/leo/Scaricati possiamo scrivere ls ../Scaricati, andando quindi prima un livello su e poi scendendo da in Scaricati.

*   Abbiamo già menzionato il simbolo ~ che indica la cartella home dell’utente loggato nel sistema. Possiamo quindi costruire dei percorsi di questo tipo ~/Documenti/1/2 complessi quanto ci pare che partono sempre dalla nostra home.

*   Come ultimo nome “speciale” vediamo carattere . indica sempre la cartella in cui ci troviamo al momento (non tanto utile nei casi di cd ed ls, ma scopriremo molto presto che questa informazione è vitale in un sacco di situazioni con comandi diversi)

## Tips & Tricks

Ad ogni tappa del nostro viaggio insieme vi lascerò con dei consigli e qualche trucchetto su come sfruttare al meglio i comandi che abbiamo appena imparato, piccoli gesti ed accortezze (pescati dal mio workflow quotidiano) che rendono la fruizione del terminale molto più fluida e lo trasformano da una noia mortale ad un vero e proprio asso nella manica.

### Tornare velocemente alla cartella home

Se vi siete inoltrati nei meandri del vostro sistema e volete tornare velocemente alla vostra cartella home i modi per farlo velocemente sono diversi, ad esempio potere sfruttare la ~ (che potete digitare effettuando la combinazione **<ALT GR>** + **ì** ) e dare come comando:

    cd ~

ma esiste un metodo ancora più veloce, e cioè dare come comando _**cd** _senza nessuna cartella come parametro. In questo modo sarete pronti a ripartire dalla vostra **home** nel minor tempo possibile!

### Scrittura veloce e suggerimenti

Qualcuno di voi, leggendo, avrà sicuramente pensato qualcosa del tipo “sì ok, ma tutte le volte che faccio un cd devo dare un _**ls**_ per sapere dove voglio andare? Che scocciatura!”

La risposta a questa domanda è: fortunatamente no. Il terminale infatti mette a disposizione una funzione di auto-completamento di ciò che stiamo digitando che possiamo attivare premendo il tasto , mi spiego meglio: se vogliamo scrivere “Desktop” possiamo digitare soltanto una parte della parola (ad esempio Des) e poi premere il tasto **<TAB>**. A questo punto, se Desktop è l’unica parola che inizia con Des , il terminale completerà il resto per noi, scrivendo Desktop senza doverlo digitare per intero. Qualora ci fossero più parole che iniziano con “Des”, una singola pressione del tasto **<TAB>** non mostrerebbe nulla, in questo caso ci basterà premerlo velocemente **due volte** ed il terminale ci mostrerà tutte le parole che iniziano con “Des” e potremo scegliere come continuare la nostra digitazione. Viene quasi da sé che possiamo sfruttare questo comodo strumento in combinazione ai nostri comandi (sia _**cd**_ che _**ls**_) ed essere molto più rapidi.

Le chicche non sono finite qui, se diamo un doppio **<TAB>** dopo il nostro comando senza aver scritto nulla, il terminale ci suggerirà tutte le cartelle (o i file nel caso di ls) che possiamo dare in pasto al comando! All’inizio può sembrare un po’ macchinoso ma vi assicuro che non appena ci prenderete la mano diventerete dei fulmini.

### Pulire il terminale

Avete dato un **doppio** **<TAB>** in una cartella piena zeppa di roba? Siete davanti ad un muro di testo da capogiro? Niente paura, non c’è bisogno di chiudere il terminale per avere una finestra pulita, basterà digitare il comando:

    clear

e la finestra verrà completamente svuotata. Oppure, se come me siete molto pigri e non avete voglia di digitare troppo, basterà un colpo della combinazione **<CTRL>** + **l** (elle) per ottenere lo stesso effetto ed avere un terminale nuovo di zecca!

Con questo direi che per oggi è tutto, io vi saluto e spero di avervi dato qualche spunto per iniziare ad usare in modo più piacevole il terminale. Se aveste dubbi o domande da porre trovate me e gli altri membri dello staff sul gruppo **telegram** della nostra community [**/linuxpeople**](https://t.me/linuxpeople).

Ci becchiamo col prossimo episodio di **#howtobash**!