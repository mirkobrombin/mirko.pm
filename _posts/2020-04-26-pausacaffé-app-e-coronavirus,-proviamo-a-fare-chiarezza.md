---
title: '#pausacaffé - App e coronavirus, proviamo a fare chiarezza'
published: 2020-04-26
layout: post
author: Andrea Guzzon
author_github: beard33
tags:
  - github  - privacy  - privacy
---
Si é fatto un gran parlare in questi giorni di applicazioni e contact tracing come possibile aiuto in relazione all'attuale pandemia. Ma che cosa significa **contact tracing**? Com'é nata l'idea? Rispetterá la nostra **privacy**? E soprattutto, **serve veramente**?

## Cosa significa "Contact tracing"

L'idea di utilizzare la tecnologia per contrastare piú efficacemente l'attuale epidemia **ha origine in Cina** , con lo sviluppo di un'applicazione di tracciamento che permettesse alle autoritá di controllare gli spostamenti dei cittadini. Come si puó leggere [qui](https://thenextweb.com/china/2020/03/03/chinas-covid-19-app-reportedly-color-codes-people-and-shares-data-with-cops) vengono inviati i dati personali di una persona quali **locazione, cittá, nome e codice numerico identificativo** ad un server centrale, permettendo cosí un controllo assoluto dei possibili contagiati e dei loro spostamenti.

Una soluzione simile in Occidente non é chiaramente attuabile grazie ai vincoli delle normative sulla privacy. Per questo motivo diversi esperti di varie universitá e non solo si sono messi al lavoro per sviluppare **standard aperti** che permettessero di **rispettare la privacy** dei cittadini e allo stesso tempo **ad un cittadino di sapere se é stato esposto a rischio**. 

Tra le decine di proposte possiamo ricordare [DP3T](https://github.com/DP-3T/documents), supportato dal Politecnico di Zurigo che annovera tra i suoi sostenitori l'ex presidente dell'associzione internazionale di ricerca crittologica o il co-fondatore di VMWare, e [PACT](https://pact.mit.edu), sviluppato dal MIT con la partecipazione di ingegneri del calibro di Rivest e Shamir (due dei creatori dell'algoritmo RSA); entrambi sono protocolli consultabili pubblicamente, orientati alla privacy e decentralizzati. 

Sul modello DP3T **si basano anche le API** che stanno sviluppando congiuntamente **Google e Apple**, al fine di rendere il tutto il piú trasparente possibile al sistema operativo e pertanto diffondibile.

Di pari passo sono nati anche consorzi per l'approvazione di questi standard, di cui l'esempio principale é il [PEPPT-PT](https://www.pepp-pt.org),
o PanEuropean Privacy Preserving Proximity Tracing,  che va a definire **cosa un protocollo deve garantire** (e.g. NON utilizzare la geolocalizzazione, preferendo il Bluetooth) e dove invece ha piú libertá.

Di fatto, supportando **sia un approccio centralizzato che decentrlizzato**.
Questo ha generato non pochi attriti all'interno del consorzio: i protocolli sopracitati infatti sono entrambi **decentralizzati** e questa sembra essere la strada preferita dai vari ricercatori, in contrasto con una soluzione centralizzata come quella scelta da Singapore con il suo protocollo open source [OpenTrace](https://github.com/opentrace-community)

## Centralizzato vs Decentralizzato: una differenza piccola ma enorme

La differenza principale tra i due approcci é apparentemente minima, ma da un punto di vista della salvaguardia della privacy é immensa: entrambi **utilizzano il Bluetooth** per tenere traccia delle persone con cui si entrá in prossimitá di contatto, salvandone gli **ID anonimi** generati (pseudo)casualmente (per i dettagli prettamente tecnici consiglio la lettura dei rispettivi whitepaper), in modo che dagli ID non sia "possibile" risalire al smartphone che l'ha generato.
Differiscono peró nel modo in cui un contagio é comunicato, per facilitá useremo `Alice` e `Bob` come attori:

* **TraceTogether:** é l'approccio adottato anche da Singapore, quando `Alice` comunica all'applicazione di essere infetta questa comunica al server l'intera lista di contatti di `Alice` oltre al suo ID e una notifica push viene inviata alla lista. Se `Bob` é nella lista riceverá una notifica in cui gli si comunica che potrebbe essere stato a contatto con un infetto
* **DP3T/PACT:** é l'approccio decentralizzato. Ogni smartphone genera un ID (pseudo)casuale che cambia continuamente, in modo che non sia possibile risalire al cittadino dal codice. Quando `Alice` risulta positiva comunica una "rappresentazione compatta" dei propri ID comunicati fino a quel momento. Lo smartphone di `Bob` ad intervalli di tempo regolari scarica la lista infetti dal server e la confonta **localmente** con la sua lista di contatti di prossimitá. Se trova corrispondenza tra la sua lista locale e quella degli infetti scaricata dal server centrale calcola un fattore di rischio basandosi su **numero di contatti e tempo di esposizione**

Come si puó notare il secondo appoccio risulta essere estremamente piú orientato alla privacy, in quanto il confronto con la lista di contatti **avviene localmente, non su un server centralizzato**; questo é il motivo per cui si son generati attriti interni tra gli sviluppatori del DP3T e il consorzio PEPPT-PT, con quest'ultimo che ha visto diverse defezioni tra i suoi fondatori (trovate un'analisi dettagliata del tutto sul [sito](https://nadim.computer/posts/2020-04-17-pepppt.html) di Nadim Kobeissi, crittografo e ricercatore che ha anche analizzato DP3T modellizzandolo attraverso *VerifPal*, un linguaggio di modellazione e analisi di protocolli crittofgrafici. Trovate l'analisi [qui](https://blog.symbolic.software/2020/04/05/dp-3t-verifpal)
) 

## E in Italia?

In Italia si é iniziato a parlare di app di contact tracing giá un mese fa, quando il 18 marzo Corriere titolava che l'app per "fermare l'epidemia" era pronta. Da quella data, **successivamente**, é stata indetta una Task Force dalla Ministra Pisano per scegliere quale delle 319 app proposte a seguito di una fast call dovesse essere la prediletta. 

La scelta é ricaduta sull'ormai celebre **Immuni**, sviluppata da Bending Spoons. Non é dato sapere quali siano state le modalitá di scelta dell'applicazione né come mai la task force sia stata posta sotto NDA o perché l'appliczione inizialmente sembrava dovesse basarsi sull'approccio centralizzato tra i modelli conformi al PEPPT-PT.

Tuttavia sembrerebbe che l'approccio finale scelto si rifaccia al **DP3T**, in quanto come affermato dalla societá il loro scopo é renderla adattabile alle API di Google e Apple quando queste saranno pronte e soprattutto **l'applicazione sará completamente open source**, pubblicata con licenza **Mozilla Public License 2.0**, come confermato da un'intervista di uno sviluppatore. Questo aumenta notevolmente il livello di trasparenza raggiunto, componente fondamentale quando si tratta di applicazioni con dati cosí sensibili.

## Concludendo, funzionerá?

Questo non é dato saperlo. Al momento gli esperti si dividono sull'efficacia effettiva dell'applicazione: secondo l'[Ada Lovelace Institute](https://www.adalovelaceinstitute.org/our-work/covid-19/covid-19-exit-through-the-app-store/) non ci sono prove dell'efficacia di un'applicazione nel contrasto alla pandemia. [Oxford](https://www.research.ox.ac.uk/Article/2020-04-16-digital-contact-tracing-can-slow-or-even-stop-coronavirus-transmission-and-ease-us-out-of-lockdown)
la pensa diversamente, ma pone come soglia minima per l'efficacia una diffusione di circa il **60%**, che in Italia significherebbe circa 37 milioni di installazioni uniche, piú delle attuali di Facebook. A questo va aggiunto che se non é supportata da un sistema di controlli adeguato (i.e. tamponi e notifiche al SSN tempestivi) l'app perde la sua efficacia.

Dal punto di vista informatico gli obiettivi di trasparenza possono dirsi quasi completamente raggiunti, con un'applicazione **open source che si appoggia ad un sistema decentralizzato**; ora bisogna garantire che le condizioni al contorno vengano rispettate, in modo da guadagnarsi la fiducia dei cittadini e invogliarli a scaricare l'applicazione. 

Senza inalberarsi in idee anticostituzionali come controlli di smartphone da parte delle forze dell'ordine o obblighi di installazione, senza attaccare chi ha sollevato dubbi legittimi riguardanti la privacy, ma con la massima trasparenza sia dal punto di vista informatico che di **come questa applicazione possa aiutarci ad uscire dall'epidemia**.

Se volete dirci la vostra ci trovate al solito [gruppo telegram](https://t.me/linuxpeople)

