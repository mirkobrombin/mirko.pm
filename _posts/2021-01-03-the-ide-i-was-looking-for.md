---
title: "The IDE I was looking for"
description: ""
published: 2021-01-03
layout: post
published: true
translated: false
---
Sono uno sviluppatore da ormai diversi anni, cominciai a googlare <mark>come
creare un sito web</mark> quando avevo 14 anni e da allora di strada ne ho
fatta *(sono passato a StackOverflow 👅)*.

Ho la fortuna di essere cresciuto in un periodo in cui l'informatica,
precisamente la programmazione, era in forte evoluzione. A quei tempi nessuno
poteva immaginare che Javascript sarebbe diventato un linguaggio talmente
famoso da far nascere fiumi di framework basati su di esso.

La tecnologia in se è evoluta ad una velocità tale da mettersi alla portata di
tutti. Ci sono moltissimi linguaggi di programmazione, adatti ad ogni contesto,
ad ogni sviluppatore.

### IDE & Code editors
Cominciai la mia strada da programmatore su Windows, aprivo il notepad e mi
divertito a far comparire scritte colorate sulla mia pagina web che, per
fortuna, era in locale 😅.

Quando scoprii PHP, sentii la necessità di passare ad un editor più strutturato
come Notepad++. Questo forniva plugins, sintassi del codice, formattazione e
tanti altri strumenti che mi aiutavano a digerire meglio quel linguaggio.

In un anno passai a Visual Studio per esigenza di Visual Basic e C# anche se
abbandonai questi linguaggi abbastanza velocemente quando comprai un iMac con
OS X Mountain Lion. Li cominciai ad utilizzare editor come BBEdit e Brackets.

Il grande cambiamento fu quando diversi anni fa passai a Ubuntu. Da qui vi
risparmio la carrellata di editor e IDE che ho provato, volendone solo citare
alcuni: geany, gedit, eclipse, atom, code, elementary code e jetbrains*. Questi
mi sono serviti a trovare lui, l'IDE definitivo.

#### L'IDE definitivo.
Il mio modo di programmare ed il target in se sono cambiati molto di recente.
Dal 2017 ho cominciato a sviluppare 
[bot Telegram](https://unifiedban.solutions) per la sicurezza e gestione dei
gruppi, software per desktop e server (Linux), portali di pubblicazione e
gestione contenuti, [CMS](https://github.com/biskuitorg/) etc.

Essendo lo sviluppo di applicazioni GTK il mio target principale, ho
cominciato ad utilizzare <mark>GNOME Builder</mark>, l'IDE tutto in uno di
GNOME.

![](/uploads/2021-01-03 09-00-54-gnome-builder.png)

Evito di parlare della sua eleganza e del mio essere affezionato alle GTK in
generale o non finiamo più di parlarne.

GNOME Builder è uno strumento potentissimo, permette di sviluppare
principalmente in 7 linguaggi (quelli comunemente utilizzati da GNOME per le
sue applicazioni):

- C
- Javascript
- Python 💘
- Rust
- C++
- C#
- Vala

![](/uploads/2021-01-03 09-50-43-gnome-builder-new-project.png)

Permette di scegliere sin da subito la licenza con cui distribuire il software,
abilitare il versionamento Git e preconfigura il progetto per un determinato
contesto. È infatti possibile scegliere il target per il tipo di applicazione
che stiamo per sviluppare:

- Applicazione GNOME (quindi supporto ai widget GTK)
- Libreria condivisa
- Applicazione da riga di comando  

.. o banalmente un progetto vuoto.

Possiamo addirittura scegliere uno dei progetti di GNOME da cui imparare o
collaborare.

![](/uploads/2021-01-03 09-55-09-gnome-builder-gnome-sources.png)

#### Integrazione Meson & Flatpak
GNOME Builder è <mark>Flatpak e Meson</mark> by default. Questo significa che
ogni applicazione creata, nasce come Flatpak e col il sistema di build 
meson+ninja.

Si tratta di una scelta opzionale, basterà eliminare il manifesto `.json` nella
root del progetto per utilizzare solo la coppia meson+ninja. Ma apprezzo la
scelta, Flatpak è di GNOME e lo trovo un ottimo incentivo favorire la
distribuzione del progetto come Flatpak sin dalla sua nascita.

#### Glade, sei tu?
Da diverso tempo utilizzo Glade per la realizzazione delle interfacce GTK. Si
tratta di uno strumento, veramente potente che da un editor grafico restituisce
il progetto in formato interpretabile `xml`, normalmente con estensione `.ui` o
`.glade`.

![](/uploads/2021-01-03 10-03-31-glade.png)

Include tutti i [widget](https://developer.gnome.org/gtk3/stable/GtkWidget.html)
GTK, le proprietà, i segnali, accelleratori, tutto. Permette di realizzare una
interfaccia completa da zero. Inizialmente, stupito dalla efficienza di questo
strumento, non ho sentito la mancanza di una sua integrazione in GNOME Builder.
Ma con l'espansione continua del codice di
[Bottles](https://github.com/bottlesdevs/Bottles), una della applicazioni a cui
lavoro, ho cominciato a sentire *il peso* del dover passare da una applicazione
all'altra.

Ora, siccome sono una scimmia 🙈 e non analizzo mai per bene un programma prima
di usarlo, non avevo notato che Builder fornisce una integrazione di Glade.

![](/uploads/2021-01-03 09-05-21-gnome-builder-glade.png)

Credo si tratti di uno stadio ancora instabile perchè qualche rallentamento
l'ho percepito ma questa integrazione fa di Builder l'IDE completo per quanto
riguarda il mio utilizzo. Da qui posso iniziare e terminare lo sviluppo di una
applicazione, senza mai abbandonare la schermata. Permette di sfogliare le
documentazioni stesse senza passare al browser, integra la TODOlist, creata
analizzando il codice dell'applicazione. Fornisce un debugger funzionale, lo
strumento di analisi Valgrind e permette la profilazione del processo.

Grazie GNOME 💖, ti sarò per sempre riconoscente.

__Mirko_