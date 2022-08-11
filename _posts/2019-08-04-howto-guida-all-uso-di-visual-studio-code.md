---
title: "#howto - Guida all'uso di Visual Studio Code"
description: "Chi abitualmente chiacchiera con noi sul gruppo Telegram di linuxpeople sa già che il mio editor di codice pr.."
date: 2019-08-04
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Chi abitualmente chiacchiera con noi sul gruppo Telegram di [linuxpeople](https://t.me/linuxpeople) sa già che il mio editor di codice preferito è **Visual Studio Code**.

Sono tentato di chiamarlo "Ambiente di Sviluppo" (o **IDE**) poichè nonostante sia pubblicizzato come editor di codice estendibile, è in realtà talmente supportato dalla community da essere uno degli strumenti di programmazione più avanzati e completi che io conosca.

Visual studio code gode di un ottima documentazione fornita ufficialmente, di una ottima community e di supporto su tutti i sistemi operativi. Per questo motivo oggi ho deciso di elencarvi quali sono le motivazioni e gli strumenti che potete configurare sul vostro pc per avere un ambiente che si avvicina molto ad un ambiente di sviluppo integrato. Eviterò cose ovvie come le estensioni, per il quale il software ha già una serie di meccanismi che ne semplificano la scoperta e la l'installazione.

Tutti gli esempi li farò usando java come linguaggio d'esempio.

## Workspace setting

Il primo passo è sicuramente quello di impostare quelle che sono le impostazioni comuni per il vostro workspace. Apriamo quindi la cartella dove siamo intenzionati a inserire i file del nostro progetto e tramite menu bar selezioniamo **File->Save Workspace As->.**.. e diamo un nome al nostro file.

Ci si aprirà quindi un editor sul file creato, ci troviamo davanti un file json, non troppo difficile tranquilli, anche perchè è già parzialmente compilato. Inseriamo nella voce path, nelle virgolette che seguono i due punti, il percorso completo della cartella dei nostri sorgenti.

L'ambiente ora ci mostrerà nell'explorer solo quei file!

## Code Snippet

Anche chiamati code template da altri IDE, sono quegli strumenti che tramite un abbreviazione a scelta inseriscono dei blocchi di codice.

Per farvi un esempio provate a strivere sysout o syserr e premere ctrl-spazio. vi si aprirà un layout che vi proporrà di sostituire quell'abbreviazione con System.out.println(); o System.err.println();

Comodo vero?  
Vediamo come impostare i nostri snippet!

Dalla menu bar accediamo a **File->preferences->user snippet**, qui possiamo decidere se creare delle abbreviazioni globali o solo per la cartella src. Io sceglierei quelle globali.  
Ci troviamo anche qui un file json, se odiavate questa tipologia di file beh mi spiace.

Dovrete scrivere gli snippet tra parentesi graffe e separate ognuno da virgola, tutto racchiuso tra le due parentesi graffe già presenti nel file.

Studiamo la struttura di un singolo snippet:

    "NOME SNIPPET":{    "prefix": "abbreviazione",    "body":[        "linea di codice",        "altra linea di codice",        "va beh avete capito..."    ],    "description": "descrizione se volete"}

Dunque non mi soffermerò su cose ovvie come descrizione e nome dello snippet, vediamo gli altri due campi invece.

Il "prefix" è semplicemente quella frase che attiverà lo snippet, nel caso in esempio scrivendo abbreviazione e premendo ctrl-spazio, o premendo prima la combinazione per poi cercare la parola chiave in seguito, potrete assistere alla sostituzione del blocco di codice.

Inserendo nel blocco 'body' le variabili **$1,$2**...etc avrete dei tab-blocking, cioè segnaposti che vi permetteranno di compilare dei campi in successione premendo tab per spostarvi da uno all'altro. Ancora potete usare alcune variabili particolari per creare combinazioni veramente potenti, come ottenere all'interno del blocco il numero di riga, la data, il nome del file o del testo precedentemente selezionato. Altri dettagli nella documentazione [https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables]

Ecco un esempio di snippet:

    "System exit":{        "prefix": "sysex",        "body":[            "System.out.println(\"${1:messaggio_uscita}\");",            "System.exit(${TM_CURRENT_WORD:codice_uscita});"        ],        "description": "Exit method"    }

Questo snippet consente di sostituire all'abbreviazione sysexit la stampa di un messaggio e l'uscita di un programma java. Se prima di scriverlo viene selezionato un numero questo si sostituisce come codice di uscita all'interno del metodo che l'attua.

## Compilazione

L'autocompilazione del codice su un IDE è una delle cose sicuramente più importanti che ci sia per evitare inutili perdite di tempo a chi sviluppa.

Su visual studio code si possono impostare i così detti "task", cioè l'auto esecuzione di alcuni comandi tramite un semplice click.  
Per creare un task andiamo su **terminal->run task** ci chiederà se vogliamo creare un nuovo task e che tipo di task, selezioniamo quindi "other". Si aprirà un editor con un file json che rappresenterà il nostro task, inizialmente il template riporterà un task bash semplice, un echo.

    {"version": "2.0.0",    "tasks": [        {            "label": "echo",            "type": "shell",            "command": "echo Helloworld"        }    ]}

Non è difficile capire che questo task semplicemente esegue una stampa in bash della stringa hello world ma analizziamolo meglio:

*   label: indica il nome del task
*   type: attraverso questo parametro diremo a vscode che il comando eseguito è un comando da avviare con l'interprete dei comandi predefinito
*   command: potete inserire qua qualunque comando vogliate interpretabile tramite shell, oppure il percorso di uno script

Ora capirete da qua che questo approccio ha già infiniti risvolti, perchè già definendo uno script in particolare con i comandi che ci servono per compilare il nostro progetto abbiamo già tutte le possibilità che cerchiamo.

Possiamo concatenare più task aggiungendo una virgola dopo la parentesi graffa che segue command nell'esempio... così:

    {"version": "2.0.0",    "tasks": [        {            "label": "echo",            "type": "shell",            "command": "echo Helloworld"        },        {            "label": "cat",            "type": "shell",            "command": "cat Helloworld"        }    ]}

Questo ci fa capire che il blocco del task vero e proprio è quello più interno.

Ma noi siamo persone brutte, e vogliamo fare di più... esistono delle variabili particolari nei task che possono essere utilizzati per richiamare particolari testi. ad esempio la cartella di lavoro o il percorso del file, quindi troviamo la varibile che più ci aggrada in questa pagina [https://code.visualstudio.com/docs/editor/variables-reference] e scriviamo i nostri task complessi, ecco a voi quello che uso io per compilare in java:

    {    "label": "compila ",    "type": "shell",    "command": "javac ${file} ${workspaceFolder}/../bin"}

Si può fare molto di più con i task di VSCode, come le attività di compilazione continua, oppure i build task. Ma lascio queste scoperte a voi ricordandovi la documentazione.

La stesura completa di tutte le possibilità che si hanno con questo software è ancora lunga, ci sono altre potenzialità come il debug. Però vista la corposità dell'articolo lasciamo queste scoperte ad un possibile futuro approfondimento.