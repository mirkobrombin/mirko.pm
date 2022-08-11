---
title: '#howtodev - Creare una applicazione GTK in Python'
date: 2021-01-11
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python  
  - github  
  - gnome
---
In questo articolo della serie di *#howtodev* vedremo come iniziare a sviluppare applicazioni con la libreria grafica GTK in Python. Si tratta di una guida introduttiva, e dunque non tratteremo l'argomento a 360 gradi.

## Strumenti
Per creare un'applicazione GTK su Python in questa guida useremo un unico strumento, ossia [GNOME Builder](https://wiki.gnome.org/Apps/Builder), in quanto permette sia la stesura del codice (ed il debug) che la realizzazione dell'interfaccia grafica.

Il pacchetto è disponibile in tutte le distribuzioni Linux sotto il nome pacchetto `gnome-builder`. In alternativa è disponibile come Flatpak da [Flathub](https://flathub.org/apps/details/org.gnome.Builder). Vi rimando a [questa](https://linuxhub.it/articles/howto-installazione-di-flatpak-e-configurazione-di-flathub) guida per maggiori informazioni sull'installazione e uso delle Flatpak.

### Dipendenze
Per la creazione di un'app GTK in Python indispensabili le seguenti dipendenze:
- `python3` o `python` in versione `3.8` o superiore
- `python-gi` o `python3-gi` a seconda di come è stato pacchettizzato dalla distribuzione
- `meson` e `ninja` per il build dell'applicazione

## Breve introduzione
Prima di tutto è bene tenere a mente che questa guida è specifica per Python, ma è possibile realizzare applicazioni GTK in molti linguaggi: C, C++, C#, Javascript, Rust, Vala, ecc.

Vediamo alcune definizioni importanti:
- *GTK* è il toolkit di GNOME per la realizzazione delle interfacce per le applicazioni (maggiori informazioni [qui](https://www.gtk.org/docs/getting-started/))
- *Widget* è uno degli elementi GTK che compone l'interfaccia grafica, ad esempio i bottoni
- *Python* è ovviamente il linguaggio con cui andremo a scrivere la nostra applicazione, si tratta di un linguaggio di programmazione di [alto livello](https://it.wikipedia.org/wiki/Linguaggio_di_programmazione_ad_alto_livello). Nello specifico faremo riferimento alla terza versione e quindi `python3` nella versione `3.9.1` nel mio caso

## Preparazione del progetto
Al primo avvio di GNOME Builder ci ritroveremo davanti ad una schermata abbastanza intuitiva. Focalizziamoci sui 3 pulsanti in basso e clicchiamo su **Crea nuovo progetto**. Ci viene proposto un form da compilare con i dettagli della nostra applicazione che compileremo come segue:

> Potete compilare il form come preferite, i contenuti presentati in seguito fungono semplicemente da esempio.

- **Nome progetto**: MyFirstApplication
- **ID Applicazione** è un nome di tipo RDNN (Reverse domain name notation) ossia un nome a dominio inverso, ad esempio per Geary l'ID sarà `org.gnome.Geary`. Nel nostro caso andremo a compilare questo campo col nostro nome utente: nel mio caso è `mirko`, di conseguenza scriveremo `com.mirko.MyFirstApplication`
- **Posizione progetto**: `~/Progetti`
- **Linguaggio**: Python
- **Licenza**: `GPLv3+` [qui](https://www.gnu.org/licenses/quick-guide-gplv3.it.html) maggiori informazioni sulla licenza *GPLv3*, in alternativa potete scegliere qualsiasi altra licenza
- **Controllo versione**: Sì (questo abiliterà il versionamento `git` per tutti i file del progetto). Maggiori informazioni su Git sono disponibili [a questa pagina](https://linuxhub.it/articles/howto-git-comprenderlo,-usarlo-e-amarlo).
- **Template**: Applicazione GNOME

Una volta compilati tutti i campi e salvato ci verrà presentata la schermata dell'IDE con i file del nostro progetto.

![GNOME Builder MyFirstApplication](storage/gnome-builder-progetto.png)

Gli elementi importanti che andremo ad utilizzare sono:
- il **pannello laterale a sinistra** (Project Tree), contenente tutti i file del progetto e quelli aperti
- lo **stato centrale nella barra superiore**, la quale verrà utilizzata per eseguire la nostra applicazione
- il **pannello inferiore** dove controlleremo eventuali errori in fase di avvio e debug dell'applicazione

## UI
Per *UI* si intende la **User Interface**, quindi l'Interfaccia Utente. Praticamente ciò con cui un utente avrà a che fare per tutto il tempo in cui utilizzerà la nostra applicazione. Volendo fare un esempio, di seguito la UI di Geary, il famoso client Mail di GNOME:

![Geary UI](storage/geary-ui.png)

Queste interfacce non sono altro che un insieme di widget, posizionati e "incastrati" per realizzare una procedura, ad esempio un form da compilare o una lista di elementi.

Le interfacce, una volta assemblate, vengono salvate in file `XML` con estensione `.ui` o `.glade`. Questi file vengono poi importati come risorse nel progetto e tutti gli elementi vengono riconosciuti.

### Introduzione alle UI
Apriamo dal Project Tree in Builder il file `src/window.ui`, questo (come spiegato) è un file `XML` contenente tutte le istruzioni della nostra interfaccia. In questo caso, contiene le istruzioni dell'interfaccia per la finestra della nostra applicazione.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
	<requires lib="gtk+" version="3.24"/>
	<template class="MyfirstapplicationWindow" parent="GtkApplicationWindow">
		<property name="default-width">600</property>
		<property name="default-height">300</property>
		<child type="titlebar">
			<object class="GtkHeaderBar" id="header_bar">
				<property name="visible">True</property>
				<property name="show-close-button">True</property>
				<property name="title">Hello, World!</property>
			</object>
		</child>
		<child>
			<object class="GtkLabel" id="label">
				<property name="label">Hello, World!</property>
				<property name="visible">True</property>
				<attributes>
					<attribute name="weight" value="bold"/>
					<attribute name="scale" value="2"/>
				</attributes>
			</object>
		</child>
	</template>
</interface>
```

Nella parte superiore del documento, notiamo tre elementi importanti:
- `src/window.ui`, ossia il nome del file aperto
- **Seleziona simbolo**, il quale una volta premuto ci mostra l'alberatura del file xml
- e **Visualizza Design**

clicchiamo su questa ultima voce, che aprirà il costruttore per l'interfaccia (questa è in realtà una implementazione di [Glade](https://glade.gnome.org) e può essere utilizzata esternamente se installato a parte).

![GNOME Builder - Glade](storage/GNOME%20Builder%20glade.png)

Come per la schermata precedente, nella barra superiore troviamo l'alberatura del file, ma per ora mostrerà gli elementi sotto forma di widget anzichè elemento XML. È possibile usare questo menù per raggiungere con facilità ogni widget della schermata. Clicchiamo ad esempio sul widget `label GtkLabel`, che verrà a questo punto selezionato.

Nella colonna laterale a destra troviamo tutti i dettagli e la configurazione del widget selezionato, suddivisa a sua volta in quattro categorie:
- **Proprietà specifiche del widget**
- **Proprietà figlio del genitore**, ossia tutte le proprietà derivate dal genitore a cui è collegato il widget; ad esempio `label`, che è un widget di tipo `GtkLabel`, è figlio di `MyfirstapplicationWindow`, a sua volta un widget di tipo `GtkWindow`. Da questa schermata è quindi possibile configurare tutte le proprietà per `label`, derivate da `MyFirstApplicationWindow`
- **Proprietà comuni e di style** sono tutte le proprietà condivise dai widget. Ciò non significa che queste proprietà vengono applicate a tutti i widget, ma che sono specifiche del widget selezionato. Nonostante ciò, le troviamo comuni in tutti i widget
- **Proprietà di accessibilità**

Con `label` selezionato, portiamoci su *Proprietà specifiche del widget* e modifichiamo il valore `Label` in `Ciao!`. Salviamo e premiamo il pulsante d'avvio nella parte superiore di Builder per visualizzare la modifica.

![MyFirstApplication - GTK](storage/MyFirstApplication-GTK.png)

Nella barra inferiore a destra invece, possiamo sfogliare i widget disponibili, suddivisi in categorie:
- **Livello principale**, quindi finstre normali e di dialogo
- **Contenitori**, sono widget utilizzati per appunto contenere altri widget
- **Controllo**, sono tutti i widget che servono per controllare un'azione, come ad esempio i pulsanti
- **Visualizzazione**, invece, sono widget che mostrano uno o più dati

### Realizzare una UI
Supponiamo di voler creare un'applicazione che mostra notizie interessanti inerenti i gatti. 

Consiglio di tenere sotto mano [questa](https://developer.gnome.org/gtk3/stable/ch03.html) documentazione: si tratta di una galleria contenenti le demo e le informazioni per quasi tutti i widget disponibili e che potremo utilizzare per il progetto.

#### Studio della UI
Prima di procedere con la realizzazione della UI è bene capire quali siano i dati che vogliamo mostrare e quale debba essere la UX (User Experience), ossia l'esperienza utente che vogliamo dare alla nostra applicazione. In questo caso, si tratta di una applicazione veramente molto banale e semplice e non approfondirei troppo la questione UX.

Per prendere i dati che vogliamo mostrare useremo delle API (Application Programming Interface), ovvero un'interfaccia di programmazione applicazioni. Nel caso specifico useremo [queste](https://alexwohlbruck.github.io/cat-facts/docs/), messe a disposizione da [alexwohlbruck](https://github.com/alexwohlbruck). Vediamo queste API come un bundle di dati accessibili grazie ad un set di istruzioni.

Nell'esempio di questa guida utilizzeremo un'unica istruzione, `/facts`, con diversi filtri:
- `random`, che richiede alle API un fatto [casuale](https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html) dal database
- `amount=1`, che indica che vogliamo un solo risultato dalle API

con risultato finale:
```
https://cat-fact.herokuapp.com/facts/random?amount=1
```

Chiamando quel link riceveremo un output simile al seguente:
```json
{
  "status": {
    "verified": true,
    "sentCount": 1
  },
  "type": "cat",
  "deleted": false,
  "_id": "591f98783b90f7150a19c19c",
  "__v": 0,
  "text": "In households in the UK and USA, there are more cats kept as pets than dogs. At least 35% of households with cats have 2 or more cats.",
  "source": "api",
  "updatedAt": "2020-08-23T20:20:01.611Z",
  "createdAt": "2018-01-04T01:10:54.673Z",
  "used": false,
  "user": "5a9ac18c7478810ea6c06381"
}
```

Per questa applicazione, dai dati ricevuti vogliamo mostrare esclusivamente `text`:
```
In households in the UK and USA, there are more cats kept as pets than dogs. At least 35% of households with cats have 2 or more cats.
```

#### Realizzazione della UI
Ci servirà un Widget di tipo `GtkLabel` dove mostrare il testo citato sopra. Una volta aggiunto, possiamo modificare gli attributi del testo, come ad esempio il Font (carattere) per renderlo facilmente leggibile.

![MyFirstApplication text GtkLabel](storage/MyFirstApplication-text-label.png)

Ciò non basta, però: i dati possono mutare e dobbiamo permettere all'utente di mostrare un risultato diverso in un qualsiasi momento. Per fare ciò andremo ad aggiungere un nuovo pulsante nella barra superiore della finestra, ovvero nella `header_bar` che è un widget di tipo `GtkHeaderBar`. Portiamoci in *Proprietà specifiche* del widget `header_bar` e modifichiamo il **Numero di elementi** in `1`. Questo creerà uno spazio dove andremo ad aggiungere un nuovo widget di tipo `GtkButton` e in cui inseriremo come testo `Nuovo fatto`.

![MyFirstApplication header_bar GtkButton](storage/MyFirstApplication-header_bar-button.png)

La nostra UI potrebbe essere completa, ma vogliamo semplificare il pulsante aggiungendo una icona e spostando il testo nella tooltip (didascalia) che normalmente viene mostrata al passaggio del mouse. Portiamoci quindi nuovamente nelle *Proprietà specifiche* del widget, e sotto *Contesto pulsante* selezioniamo *Aggiungi contenuto personalizzato*: possiamo notare come nel bottone sia comparso uno spazio che ci permette di aggiungere ulteriori widget. Aggiungiamone uno di tipo `GtkImage`, e dalle Proprietà specifiche di questo andiamo a modificare il campo *Nome Icona* in `view-refresh-symbolic`.

Torniamo sul bottone e dalle *Proprietà comuni e di style* modifichiamo la Tooltip (didascalia) in:
```
Mostrami un nuovo fatto
```

Il risultato finale sarà il seguente:
![MyFirstApplication GtkButton con GtkImage](storage/MyFirstApplication-GtkButton-con-GtkImage.png)

Per poter utilizzare questi widget lato codice dovremo assegnare loro un ID specifico dalle Proprietà specifiche:
- `btn_refresh` per il pulsante
- `label_text` per il testo

Ora siamo pronti per passare al codice della nostra applicazione. Assicuriamoci di aver salvato e chiudiamo il file aperto.

## Codice (python)
Apriamo per modificare il file in posizione `src/main.py`: questo è il file principale che viene caricato all'avvio della nostra applicazione.

```python
import sys
import gi

gi.require_version('Gtk', '3.0')

from gi.repository import Gtk, Gio
from .window import MyfirstapplicationWindow

class Application(Gtk.Application):
    def __init__(self):
        super().__init__(application_id='com.mirko.MyFirstApplication',
                         flags=Gio.ApplicationFlags.FLAGS_NONE)

    def do_activate(self):
        win = self.props.active_window
        if not win:
            win = MyfirstapplicationWindow(application=self)
        win.present()


def main(version):
    app = Application()
    return app.run(sys.argv)
```

Come possiamo vedere, nel codice importiamo `gi`, ossia `python-gi`, la dipendenza di cui abbiamo parlato ad inizio articolo. Questo è in realtà `PyGObject`, una libreria che fornisce i bindings degli oggetti GTK a Python, ossia permette la comunicazione appunto fra Python e GTK.

Successivamente vediamo la classe `Application(Gtk.Application)`: si tratta del componente principale di ogni applicazione GTK, ed è, molto semplicemente, l'applicazione in sé.

In seguito, apriamo il file in posizione `src/window.py`. Questo file consiste nella finestra dell'applicazione, quella che abbiamo costruito poco fa.

```python
from gi.repository import Gtk

@Gtk.Template(resource_path='/com/mirko/MyFirstApplication/window.ui')
class MyfirstapplicationWindow(Gtk.ApplicationWindow):
    __gtype_name__ = 'MyfirstapplicationWindow'

    label = Gtk.Template.Child()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
```

La "connessione" tra il file `window.ui` costruito prima e `window.py` non avviene per magia, poiché si utilizza un cosiddetto decoratore:

```python
@Gtk.Template(resource_path='/com/mirko/MyFirstApplication/window.ui')
```

Il compito del decoratore è quello di informare la classe di utilizzare un template specifico. Come possiamo vedere, `resource_path` fa riferimento ad un percorso "inesistente", ossia `/com/mirko/MyFirstApplication/window.ui`. Questo in realtà è un percorso che esiste nelle `gresources`, le risorse incluse nella applicazione. Questo file è disponibile nel percorso `src/` col nome `myfirstapplication.gresource.xml`. Si tratta appunto di un file contenente tutte le risorse che intendiamo utilizzare nella nostra applicazione, pertanto è indispensabile aggiungere ogni nuovo template che andiamo a creare.

Tornando alla nostra finestra, è necessario dichiarare le variabili per entrambi i widget della nostra UI. L'esempio iniziale forniva un widget `GtkLabel` con ID `label`. Nel nostro caso abbiamo un widget `GtkButton` con ID `btn_refresh` e `GtkLabel` con ID `label_text`, e adattiamo quindi l'esempio:

```
...
__gtype_name__ = 'MyfirstapplicationWindow'

label = Gtk.Template.Child()

def __init__(self, **kwargs):
---
```

al nostro caso:

```
...
__gtype_name__ = 'MyfirstapplicationWindow'

btn_refresh = Gtk.Template.Child()
label_text = Gtk.Template.Child()

def __init__(self, **kwargs):
---
```

Come possiamo notare, ogni widget è assegnato a `Gtk.Template.Child()`, che si occupa di creare la "connessione" fra il nostro sorgente in Python ed il template. Si occupa di trasformare, ad esempio, questo:

```python
btn_refresh = Gtk.Template.Child()
```

in questo:

```python
btn_refresh_icon = Gtk.Image()
btn_refresh_icon.set_from_icon_name("view-refresh-symbolic", Gtk.IconSize.BUTTON)
btn_refresh = Gtk.Button(None, image=btn_refresh_icon)
```

### Popolare i widget
Come abbiamo detto, per questo programma vogliamo prendere i dati delle API e mostrarli nel nostro widget `label_text`. Creiamo quindi una nuova funzione che ci permetta di ottenere i dati dalle API:

```python
@staticmethod
def get_facts():
    api_url = "https://cat-fact.herokuapp.com/facts/random?amount=1"
    with urllib.request.urlopen(api_url) as data:
        result = json.loads(data.read().decode())

    if len(result) > 0: # check for results
        return result

    # if not return helpful text
    return {"text": "Non ho trovato alcun fatto."}
```

Analizzando il codice:
- definiamo la variable `api_url` col link della nostra chiamata API vista precedentemente
- creiamo una connessione al link ed ottengo il risultato come `JSON`
- conto i risultati e, se non trovo nulla, creo a mia volta un risultato con chiave `text` personalizzata, la quale indica l'errore.

Andiamo ora ad implementare la funzione: vogliamo far sì che questa venga eseguita al click del nostro bottone e che ne assegni il risultato al widget `label_text`. Ci servirà una nuova funzione che faccia da tramite:

```python
def on_btn_refresh_pressed(self, widget):
    text = self.get_facts().get("text")
    self.label_text.set_text(text)
```

che andiamo a connettere al widget `btn_refresh` tramite i [segnali](https://developer.gnome.org/gtk3/stable/GtkButton.html#GtkButton.signals):

```python
self.btn_refresh.connect("pressed", self.on_btn_refresh_pressed)
```

Quindi il risultato sarà il seguente:

```python
@Gtk.Template(resource_path='/com/mirko/MyFirstApplication/window.ui')
class MyfirstapplicationWindow(Gtk.ApplicationWindow):
    __gtype_name__ = 'MyfirstapplicationWindow'

    btn_refresh = Gtk.Template.Child()
    label_text = Gtk.Template.Child()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.btn_refresh.connect("pressed", self.on_btn_refresh_pressed)

    def on_btn_refresh_pressed(self, widget):
        text = self.get_facts().get("text")
        self.label_text.set_text(text)

    @staticmethod
    def get_facts():
        api_url = "https://cat-fact.herokuapp.com/facts/random?amount=1"
        with urllib.request.urlopen(api_url) as data:
            result = json.loads(data.read().decode())

        if len(result) > 0: # check for results
            return result

        # if not return helpful text
        return {"text": "Non ho trovato alcun fatto."}
```

Come detto, abbiamo collegato il bottone ad una funzione tramite segnali, questo perchè ogni widget ha accesso ad una serie di eventi chiamati appunto segnali che ne identificano lo stato o l'azione, ad esempio:
- **pressed** alla pressione
- **activate** alla attivazione

In questo caso abbiamo istruito il widget dicendogli di eseguire `on_btn_refresh_pressed` alla pressione (`pressed`).

Ora la nostra applicazione ritorna il testo del fatto alla pressione del pulsante. Vogliamo però che la funzione venga eseguita anche all'avvio dell'applicazione. Come visto abbiamo creato la funzuine `on_btn_refresh_pressed` esplicitamente per il nostro pulsante: questa (come qualsiasi funzione connessa tramite segnale) riceve il pulsante stesso come parametro `widget`. Potremmo banalmente dichiarare `widget` ad un dato fisso e richiamare la funzione direttamente in `__init__`, quindi:

```python
def __init__(self, **kwargs):
    super().__init__(**kwargs)
	self.on_btn_refresh_pressed()
    
    self.btn_refresh.connect("pressed", self.on_btn_refresh_pressed)

def on_btn_refresh_pressed(self, widget=False):
    text = self.get_facts().get("text")
    self.label_text.set_text(text)
```

Questa però non è una "best practice" (la miglior pratica), e conviene infatti per miglior leggibilità ed "eleganza" rinominare la funzione `on_btn_refresh_pressed` in `update_fact` o crearne una terza che faccia da tramite:

```python
from gi.repository import Gtk
import urllib.request, json

@Gtk.Template(resource_path='/com/mirko/MyFirstApplication/window.ui')
class MyfirstapplicationWindow(Gtk.ApplicationWindow):
    __gtype_name__ = 'MyfirstapplicationWindow'

    btn_refresh = Gtk.Template.Child()
    label_text = Gtk.Template.Child()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.update_fact() # Execute on window spawn

        self.btn_refresh.connect("pressed", self.on_btn_refresh_pressed)

    def update_fact(self):
        self.on_btn_refresh_pressed()

    def on_btn_refresh_pressed(self, widget=False):
        text = self.get_facts().get("text")
        self.label_text.set_text(text)

    @staticmethod
    def get_facts():
        api_url = "https://cat-fact.herokuapp.com/facts/random?amount=1"
        with urllib.request.urlopen(api_url) as data:
            result = json.loads(data.read().decode())

        if len(result) > 0: # check for results
            return result

        # if not return helpful text
        return {"text": "Non ho trovato alcun fatto."}
```

Il risultato, ora, sarà il seguente:
![MyFirstApplication GtkWindow](storage/MyFirstApplication-GtkWindow.png)

La nostra applicazione potrebbe essere definita completa, ma, dopo qualche test, notiamo che alcuni fatti ottenuti dalle API sono molto lunghi. Dobbiamo quindi istruire il widget `label_text` a comportarsi di conseguenza.

Torniamo al file `window.ui` e selezioniamo il widget appena citato. Nelle Proprietà specifiche portiamoci alla sezione *Formattazione* e impostiamo **Wrap automatico** su "Parola". Dalle Proprietà comuni e di stile, nella sezione *Spaziatura Widget*, abilitiamo **Espansione** Orizzontale e Verticale e nella sezione *Margini* modifichiamo i margini Sopra, Sotto, Inizio e Fine a 10, questo impedirà al testo di toccare i bordi della finestra quando troppo lungo.

![GNOME Builder UI GtkLabel](storage/GNOME-Builder-UI-GtkLabel.png)

Abbiamo finito il lavoro, e la nostra prima applicazione GTK in Python è pronta e completamente funzionante.

![MyFirstApplication risultato finale](storage/MyFirstApplication-risultato-finale.png)

Vi lascio alla repository GitHub dove potete trovare [l'esempio completo](https://github.com/linuxhubit/examples-MyFirstApplication).

