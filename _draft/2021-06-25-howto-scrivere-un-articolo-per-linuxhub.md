---
title: '#howto - Scrivere un articolo per Linuxhub' 
published: 2021-06-25
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- markdown 
- github
---



Quest'anno la redazione e l'organizzazione di Linuxhub hanno attraverso profondi cambiamenti. Il nostro staff si impegna ogni settimana a produrre contenuti di qualità, non banali ma neanche complessi, che possano portare utenti semplici a conoscere meglio la propria distribuzione e utenti più esperti a potersi costruire da soli software e script per la gestione di progetti e del sistema. 
I nostri autori non scrivono spinti dal lucro, il nostro sito non presenta pubblicità e questo ci consente di pubblicare articoli basati su quello che pensiamo possa servirvi e aiutarvi nella quotidianità e non per uno o due click in più. 

Abbiamo voluto, nei nostri ultimi cambiamenti, pensare un modo per includere il lettore **attivamente** alla scrittura dei nostri articoli, ecco quindi il nostro primo *meta-articolo* che vi illustrerà come scrivere ( o partecipare alla scrittura) di un articolo per Linuxhub.



> Ricordiamo a chiunque eventualmente voglia candidarsi per far parte ufficialmente dello staff che i nostri autori non ricevono alcun compenso essendo linuxhub un sito privo di entroiti. 
> Il nostro scopo è quello di portare a voi lettori le nostre esperienze, i nostri esperimenti e le nostre conoscenze. Condividiamo la cultura, non la vendiamo al miglior offerente.



## Il sistema di pubblicazione 

Tutto parte dal repository github https://github.com/linuxhubit/linuxhub.it. Tralasciando gran parte delle directory che son utilizzate internamente dal sito, il focus della pubblicazione comprende le sole cartelle : 

- `_draft` : in questa cartella risiedono gli articoli in bozza nonché articoli demo lasciati come esempio per le nostre categorie principali
- `_posts` : in questa cartella si trovano gli articoli pubblicati. 
- `uploads` : qui risiedono i file allegati alle varie pubblicazioni, come foto o pdf. Si precisare che per maggiore leggibilità nonché leggerezza del repository è nostra politica *limitare quanto più possibile gli allegati ad un articolo*
- `_trash` : qui vengono spostati vecchi articoli non più attuali che hanno subito una riedizione completa



### Schedulazione

La schedulazione degli articoli di linuxhub è di *cadenza settimanale* ed è soggetta a *variazioni mensili* nonché pubblicazioni **occasionali extra**.

Il numero di articoli settimanali viene deciso in base al numero di articolisti disponibili, negli anni è variato da 3 al più attuale 1 articolo a settimana. 



### Processo di scrittura, revisione pre-pubblicazione e post-pubblicazione

Lo staff di Linuxhub è diviso in editori e revisori, come intuibile dal nome, i primi scrivono gli articoli mentre i secondi lo correggono. I ruoli non sono né fissi né rigidi. In base alle necessità ogni editore può diventare redattore e viceversa. 

Ciò che invece è importante è che ogni mese venga rispettata dagli editori la cadenza fissata (o dare il giusto preavviso affinché si possa riassegnare). 

Ogni articolo deve essere scritto un giorno prima della pubblicazione, per dare il tempo ai revisori di poter correggere eventuali problemi al suo interno. 
Dopo la revisione l'articolo viene pubblicato e, se necessario, revisionato ulteriormente.



## Il formato di pubblicazione 

Tutti gli articoli vanno scritti in *formato testuale con sintassi markdown*, rinominati secondo il formato `aaaa-mm-gg-howto-nome-articolo.md` dove :

- `aaaa` è l'anno di pubblicazione
- `mm` è il mese di pubblicazione 
- M è il giorno di pubblicazione 
- howto è il format. Sono tre i format previsti attualmente da Linuxhub: 
  - `howto` - guide sul mondo linux
  - `howtodev` - guide di programmazione 
  - `pausacaffe` - riflessioni varie
- `nome-articolo` : il nome dell'articolo, sostituendo gli spazi con i trattini



Inoltre ogni articolo **deve contenere il seguente header** a partire dalla prima riga:

```
---
title: '#howto - nome articolo' 
published: aaaa-mm-gg 
layout: post 
author: Nome Autore
author_github: Nome github 
tags: 
- lista 
- dei 
- tags 
---
```



## Sintassi Markdown

Linuxhub utilizza la sintassi Markdown standard, riportata di seguito in esempio di utilizzo per chi ne fosse nuovo: 

```markdown
## TITOLO 2
### TITOLO 3 
#### TITOLO 4

**testo in grassetto**
*testo in corsivo*
~~testosbarrato~~

![](/uploads/percorso/immagine.png)

- lista
- con i punti
	- innescati
	- basta un tab prima del trattino

1. lista
2. numerata

`codice in linea`

​```
codice a blocco anonimo
​```

​```java
public class Java { 
	codice a blocco con sintassi di java 
	( dei buoni renderer  di markdown evidenzieranno la sintassi)
}
​```

> questo sarà messo in un box
> stile citazione

Tabella: 
| colonna1 | colonna2 | colonna3 |
| :----: | :---- | :---- |
| riga1 valore1 | riga1 valore2 | riga1 valore3 |
| riga2 valore1 | riga2 valore2 | riga2 valore3 |
```



Nei nostri articoli non utilizziamo mai il **titolo 1**, ma si parte sempre *da Titolo 2* ( e comunque dopo *l'header* ) e massimo fino a **Titolo 4**

## Linee guida per la pubblicazione 

Le nostre regole di buona scrittura per un articolo attualmente sono :

-  mai citare `sudo` nelle guide (l'utente deve capire solo quando utilizzare i privilegi di amministratore )

- Le guide devono trattare argomenti testati da chi li scrive 

- per chi scrive guide di programmazione (categoria `howtodev`), va considerata l'idea di mettere **prerequisiti** e **obiettivi** della guida come capitoli a se stanti

- nelle guide di installazione devono essere supportate almeno le tre famiglie di distribuzioni principali: 

  - Ubuntu e derivate
  - Fedora 
  - Archlinux

  Ogni guida per una distribuzione o famiglia differente deve essere posizionato sotto un titolo a se stante

- i titoli dei vari paragrafi vanno da H2 a H4

- Non utilizzare le immagini li dove non indispensabili 

  - in particolare gli output dei software vanno inseriti come blocco di codice ad esempio
  - Tutti i media utilizzati devono essere di proprietà dell'articolista o legalmente riutilizzabili

- Non scrivere codice inline troppo lungo, se supera un determinato numero di colonne, ricorrere al blocco di codice



## Tipologie di articoli accettati 

Attualmente son previste tre categorie di articoli attualmente : 

- howto : guide generiche sul mondo Linux/Unix
- howtodev : guide sul mondo della programmazione 
- pausacaffé : riflessioni varie 



Le guide devono trattare argomenti legali, di interesse per l'utente e non devono essere banali. Inoltre è necessario che chiunque scriva gli articoli non metta in pericolo i dati dell'utente pubblicando passaggi non testati da lui. 

Le guide sull'installazione di un determinato software per non essere considerate banali devono necessariamente contenere informazioni su cosa e a chi serve quel software e come utilizzarlo 

**È necessario che chiunque si appresta a scrivere un articolo per Linuxhub eviti il freebooting:** *non siete obbligati a scrivere nulla, meglio non scrivere che rubare le idee altrui*.

## Come richiedere una pubblicazione o modifica


Chiunque può scrivere un articolo per linuxhub, modificarne uno esistente o proporne una nuova versione. 

### creare un nuovo articolo 
I membri dello staff possono creare un nuovo articolo creando un file nella cartella  **_draft** e chiedendone una revisione. Il file verrà poi pubblicato spostandolo nella cartella **_post**

I lettori interessati a partecipare attivamente possono invece fare [un fork e quindi aprire una pull request](https://github.com/linuxhubit/linuxhub.it/pulls) sulla pagina del progetto, nel farlo ovviamente le modalità rimangono le stesse descritte sopra 



### modificare un articolo esistente 

I membri dello staff possono modificare un articolo semplicemente modificandone il file nella cartella **_posts**. Se le modifiche sono consistenti, possono decidere di farlo attraverso una pull request o far revisionare le modifiche chiedendo al resto dello staff. 

Per i lettori la modalità rimane la stessa della creazione di un nuovo articolo, cioè attraverso una pull request



### cestinare un vecchio articolo 

Gli articoli che vengono riscritti devono essere spostati nella cartella **_trash**




Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).