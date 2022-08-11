---
title: '#howto - Installazione e utilizzo di Electron framework'
description: "Electron è un framework open source creato e sviluppato da GitHub. Integra un browser Chromium minimale per il frontend e Node.js per il backend."
date: 2019-12-15
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - mysql
---
Electron è un framework open source creato e sviluppato da GitHub. Integra un browser Chromium minimale per il frontend e Node.js per il backend.

Con Electron possiamo sviluppare applicazioni desktop multi piattaforma, sfruttando la maggior parte delle risorse e librerie presenti online.

## Pro e contro
Tra le applicazioni più famose sviluppate tramite questo framework vi è sicuramente [Visual studio code](https://linuxhub.it/article/howto-guida-alluso-di-visual-studio-code), l'editor di codice estendibile sviluppato da Microsoft, che per diversi anni ha coperto le prime posizioni della [Stackoverflow survey](https://insights.stackoverflow.com/survey/2019#development-environments-and-tools) per editor di codice più utilizzati (al momento in cui scrivo è addirittura il più popolare).

È anche tuttavia una delle tecnologie più criticate, e son presto detti quelli che sono i punti più criticati di questo approccio:

* nonostante ne presenti una versione ridotta e limitata, l’utilizzo di una sandbox Chromium ha chiaramente delle contro indicazioni:
  * uso esagerato della memoria RAM, soprattutto per applicazioni corpose.
  * Spazio occupato sul disco di archiviazione molto elevato, anche per applicazioni semplici. Un Helloworld arriva ad occupare oltre 120Mb di spazio.
* Difficile code protection, molte app Electron sono infatti open source.
* Javascript è monothread, nonostante ci siano tecniche per creare delle finte parallelizzazioni resta una pratica non nativa.

A voler fare un esempio di quanto detto, un semplice Helloworld occupa poco meno di 120Mb.<br>

## Prerequisiti
Usare Electron non è difficile, ma essendo solo un framework, un insieme di moduli, prima di tutto bisogna partire dai software e linguaggi che ne consentono l’utilizzo. principalmente: Javascript, Node.js e NPM.

### Linguaggi Web
Avendo già specificato che Electron è basato su tecnologie di questo genere viene naturale pensare che il primo approccio avvenga proprio tramite i cosidetti "tre linguaggi del web", cioè **HTML**, **CSS** e **Javascript**.

Non è questo il contesto in cui verrà spiegato come gestire o come programmare una pagina internet statica, ma è doveroso comprendere in questo momento che è un prerequisito fondamentale saperne gestire una per fare il minimo indispensabile tramite Electron. 

Supponiamo ad esempio una semplicissima pagina web presa dal sito delle [demo di w3s](https://www.w3schools.com/w3css/w3css_templates.asp) e ricopiata in un file ( o più file per modularizzare e suddividere il più possibile).

Questa potrebbe rappresentare la base di un futuro applicativo scritto con Electron.

### Node.js
Al centro di tutto vi è quindi JS, ma questo linguaggio negli ambienti desktop come viene interpretato? qui entra in gioco Node, un ambiente di runtime multipiattaforma che esegue codice javascript al di fuori dei browser (similmente a come farebbe una vm), è orientato ad eventi e sfrutta la programmazione asincrona.

Attualmente questa è una delle tecnologie più apprezzate ed usate, sostenuta e utilizzata da grandi realtà come la Linux Foundation, Microsoft, LinkedIn, Netflix, IBM e altre ancora. Node.js è tipicamente usato per generare contenuti web dinamici ( accedendo anche a tutti gli elementi della pagina come form o caselle di controllo), permettendo di attuare operazioni di I/O sulla macchina su cui è eseguito (creare, cancellare e leggere file ad esempio) e potendo interagire quindi anche con i database.
Con node.js è facilissimo realizzare un server web dinamico, basta creare un file con scritto:

```
var http = require (‘http’);
http.createServer(function (req,res) {
    res.writeHead(200, {‘Content-Type’:’text/html’});
    res.end(‘Hello World!’);
}).listen(8080);
```
a seguire basterà posizionarsi nella directory del file e digitare: `node hello.js`.

Per vedere il risultato è necessario aprire un browser e scrivere sulla barra degli indirizzi `127.0.0.1:8080` (sostituendo ad 8080 la porta di ricezione specificata nel file nella chiamata a listen).

### NPM
**N**ode.js **P**ackage **M**anager, come lo stesso nome suggerisce, è un manager di moduli (o pacchetti che dir si voglia) sviluppati per Node.js, l’installazione dovrebbe avvenire durante quella dello stesso ambiente di Runtime.

Installare un pacchetto con NPM è molto semplice, basta aprire un prompt e digitare `npm install <nome pacchetto>`.

Il progetto include il client, il sito e un database (o registro), è aperto alla *community* e ne eredita tutti i *difetti*(qualità non sempre garantita, nessuna garanzia sul supporto, nessuna sicurezza riguardo codice malevolo) e i *pregi* (un gran numero di pacchetti, libertà di accesso, tutti possono cercare vulnerabilità e suggerirne risoluzioni)

Il seguente comando `npm install -save-dev <nome pacchetto>` fa in modo che il pacchetto venga installato solo nella cartella in cui si sta operando, utilizzandolo per lo sviluppo.  
Potrebbe avere senso installare alcuni pacchetti globalmente, poichè utilizzabili come utility standalone. in tal caso: `npm install -g <nome pacchetto>`

## Sviluppo Electron
Una volta installati Node.js, NPM e tutto ciò che serve, si può iniziare a sviluppare anche una semplice applicazione Electron. Si crei quindi quindi la cartella-progetto interessata nel proprio file system ed entrarci con il prompt dei comandi, in seguito diamo: `npm init` e quindi seguiamo le istruzioni indicate da npm.

Bisogna quindi installare electron stesso: `npm install -save-dev electron`

Nel codice va quindi richiesto esplicitamente l’uso del modulo **electron**:

```
const electron = require (‘electron’)`
```

Si deve quindi implementare la funzione **createWindow** che creerà una finestra del nostro mini-browser integrato:

```
function createWindow(){
    //creazione della finestra del browser.
    win=new BrowserWindow({width:800, height:600}) //specifichiamo larghezza e altezza

    //qui indichiamo quindi il file da caricare nella finestra create
    win.loadFile('index.html')

    //emesso quando la finestra viene chiusa.
    win.on('closed',()=> {
        //Eliminiamo il riferimento all’oggetto window; in genere si tiene traccie delle finestre in un array se l’applicazione supporta più finestre, questo è il momento in cui si dovrebbe eliminare nel caso l’elemento corrispondente.
        win=null
    })
}
```

Se ci si ritrova già qualche progetto html/css/js proprio, o si vuole implementare un semplice **helloworld** o ancora ci si ritrova scaricati quella famosa demo di w3s di cui sopra, basta <u>sostituire a index.html il nome del file principale da aprire</u>.

A questo punto per eseguire l’applicazione basterà digitare in sequenza:

```
npm install
npm test
```

Si possono anche cambiare o modificare i comandi di avvio editando la sezione scripts del file package.json.

## Altri moduli
Se fosse solo una questione di accedere offline a pagine web basterebbe creare i file e accedervi tramite browser, ma Electron è molto di più. Grazie all'imbarazzante numero di pacchetti sul web sono tantissimi i risvolti che può avere la vostra app, come ad esempio integrazione con database o con altri linguaggi. 

### Database
Ad esempio, ci si può approcciare con mysql, dopo aver scaricato il pacchetto con npm, con semplicità aggiungendo le seguenti righe al codice js:

```
var mysql = require('mysql');

var connessione = mysql.createConnection({
    host     : 'indirizzo host',
    user     : 'nome utente',
    password : INSERISCIPASSWORD,
    database : 'il_nome_del_database'
});
```

cosi facendo abbiamo creato una variabile che rappresenta la nostra connessione con quelle credenziali (non tutte obbligatorie eh, ad esempio localmente non avrebbe senso usare l'host, oppure se non indichiamo un database possiamo usare i comandi di amministrazione per crearne altri...).  

Tuttavia non siamo effettivamente connessi, per farlo:

```
connessione.connect(
    function(err) {
        if(err){
            console.log("c'e' stato un errore D:");
            console.log(err.fatal);
            console.log(err.code);
        } else {
            console.log("yeah ci siamo riusciti ! :D ")
        }
    }
);
```

Se la connessione è avvenuta non si avranno messaggi di errore: è inoltre possibile gestire diversamente gli errori, si usi la propria fantasia per questo.

Importante è ora vedere come funziona una query:

```
connessione.query("scrivi qua la query;", function(err, risultato, fields) {
    if(err){
        console.log("erroreeeeeeeeeeeeee");
        console.log(err);
        return;
    }

    console.log("Ecco il risultato:\n", risultato);
});
```

Fate attenzione poichè il risultato non è una stringa, ma un array di RowDataPacket, una sorta di dizionario. Trovate altre informazioni sulla pagina ufficiale del pacchetto npm.
Ora, chiudiamo la connessione al nostro database:

```
connessione.end();
```

### Pacchettizzazione
Esistono vari modi per pacchettizzare poi la nostra app, anche se electron consiglia un impacchettamento manuale.

Ad esempio, segnalo **electron-packager** che viene installato direttamente con electron stesso, e per avviarlo basta:

```
electron-packager . <nomeprogetto> --platform=all
```

Funziona su tutte le piattaforme, ma non è altro che una cartella con uno script eseguibile, sistema non  affatto comodo per distribuire poi il proprio software.

Alternativamente esiste il molto più completo electron-builder, che possiamo avviare tramite **npx**: `npx electron-builder -wlm`.

Qui lo dobbiamo però configurare tramite il file `package.json`, ad esempio lo possiamo configurare per ottenere un eseguibile portabile di windows, un appimage di linux e un dmg di mac (viene creato correttamente solo da sistemi mac quest'ultimo)

```
{
  "name": "nomeapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "electron ."
  },
  "author": "autore",
  "license": "licensa",
  "devDependencies": {
    "electron": "^7.1.1",
    "electron-builder": "^22.1.0"
  },
  "build": {
    "appId": "com.app.id",
    "dmg": {
      "title":"Titoloapp",
      "contents": [
        { "x": 100,
          "y": 100 
          },
          { "x" : 240,
          "y" : 150,
          "type" : "link",
          "path" : "/Applications"}          
      ],
      "window":{
        "x": 100,
        "y": 100 ,
        "width": 400,
        "height": 400
      }
    },
    "linux": {
      "target": [
        "AppImage"
      ]
    },
    "win": {
      "target": "portable"
    }
  }
}
```

Per domande o informazioni, potete consultare il nostro <a href="t.me/gentedilinux">gruppo Telegram</a>.