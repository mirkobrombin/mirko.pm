---
title: "Keep it fucking simple @css"
description: "Quello di cui vi voglio parlare oggi è il metodo con cui normalmente chiunque sviluppa l'interfaccia di un sito web."
published: 2020-03-04
layout: post
published: true
is_translation: false
translation: false
---
Quello di cui vi voglio parlare oggi è il metodo con cui normalmente chiunque sviluppa l'interfaccia di un sito web.

Inizialmente (e parlo di molti anni fa) i siti web erano limitati dalla scarsa presenza di regole ed elementi i quali obbligavano gli sviluppatori (al tempo ancora non classificati come web designer) ad arrangiare interfacce poco funzionali ma semplici.

Col passare degli anni sono aumentati gli strumenti in nostro possesso, HTML e CSS sono diventati dei veri e propri linguaggi per definizione e ci permettono oggi di creare interfacce funzionali e complesse.

![](https://media0.giphy.com/media/10rJCb79m16aRy/giphy.gif?cid=790b761110ab7d3263e17e79a1d6613a81f1f90e12e4e8b4&rid=giphy.gif)

Ciò nonostante questo è un'esempio in cui <mark>il progresso evolve più velocemente di quanto facciano gli sviluppatori/designer</mark>, portando questi a non sfruttare al meglio le risorse, arrivando così ad ottenere risultati di scarsa qualità e performance.

Facendo un esempio pratico, da molti anni si fa uso di CSS Framework, ossia un insieme di componenti e regole per la realizzazione di applicativi e siti web. Se da un lato abbiamo la garanzia che applicando queste regole una applicazione sarà ben integrata e coerente in ogni suo aspetto, dall'altra ci ritroviamo con fogli di stile pesanti, spesso con regole _inutili_ e codice morto che con molta probabilità non andremo mai ad impiegare.

Ricollegandomi alla frase **il progresso evolve più velocemente di quanto facciano gli sviluppatori/designer**, se prima avevamo meno risorse a nostra disposizione ma connessioni molto più lente, oggi abbiamo più risorse e connessioni incredibilmente veloci, cìò nonostante l'esperienza non è cambiata più di tanto ed un sito web carica in media nello stesso tempo.

Banalmente, arrivando al nocciolo, usando solo le risorse realmente indispensabili ed evitando quindi l'uso di CSS Framework, ci ritroviamo con applicativi non solo più performanti e leggeri ma con codice sorgente più semplice diminuendo non solo i tempi di caricamento ma anche quelli spesi nella comprensione e manutenzione dello stesso.

Volendo fare un esempio pratico citando il sorgnete della **navbar** offerta da Bootstrap:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        </ul>
    </div>
</nav>
```

volendo analizzare, ciò che salta subito all'occhio è:

*   la complessa leggibilità del codice
*   l'utilizzo compulsivo di classi
*   la ripetizione inutile di elementi di tipo contenitore

Il tutto può essere semplificato con una struttura minimale impiegando elementi base HTML, come nell'esempio qui sotto:

```html
<header>
    <a href="#">
        <h1>Brand</h1>
    </a>
    <button></button>
    <nav>
        <ul>
            <li selected><a href="#">Home</a></li>
            <li><a href="#">Link</a></li>
        </ul>
    </nav>
</header>
```

Bootstrap come molti altri CSS Framework, utilizza diverse classi per la gestione degli eventi e l'identificazione degli elementi negli script Javascript, ad esempio nell'apertura/chiusura del menu mobile.

![](https://media1.giphy.com/media/13XW2MJE0XCoM0/giphy.gif?cid=790b7611d6b872db885ff15e635a83fe915441b166232cf4&rid=giphy.gif)

L'impiego delle classi non è necessario se abbiamo bene a mente come sarà la struttura del progetto che vogliamo creare. Nell'esempio citato qui sopra abbiamo un semplice header con un logo, un pulsante ed un menu di navigazione.

Il nostro obbiettivo è quello di mostrare il pulsante solo da dispositivi mobili, ad esempio su schermi più piccoli di 720px, andremo quindi a nascondere tale pulsante (il quale non ha classe poichè è l'unico presente nell'header):

```css
header>button {
    display: none
}
```

per poi farlo apparire nuovamente su dispositivi più piccoli di 720px:

```css
@media screen and (max-width: 719px) {
    header>button {
        display: block
    }
}
```

Per quanto riguarda la gestione dell'evento di apertura e chiusura del menu da dispositivi mobili, possiamo optare per uno script Javascript sfruttando lo stesso elemento `header>button` per l'interazione. Altrimenti, essendo i dispositivi mobili muniti di schermo touch, possiamo sfruttare la loro percezione dello psuedo _:hover_ per ricreare l'evento di pressione:

```css
@media screen and (max-width: 719px) {
    header>nav {
        display: none;
    }
    header>button:hover>nav {
        display: block;
    }
}
```

il quale oterrà lo stesso identico risultato poichè lo psuedo _:hover_ su dispositivi touch viene interpretato come un click senza rilascio, in questo modo cliccando al di fuori dell'elemento oterremo l'effetto contrario eliminando il focus. Lo stesso procedimento si può applicare a menù contestuali.

![](https://media1.giphy.com/media/3OvvA11fPUvfYRFjxS/giphy.gif?cid=790b7611f2ed097755ca7a2d0285f73a616ed1d5649e50b0&rid=giphy.gif)

Il mio obbiettivo con questo articolo non è illustrare come creare una interfaccia ma spingere chiunque ci si voglia cimentare ad usare bene le risorse che ha a disposizione valutando attentamente quelli che sono i pregi e difetti nell'adottare un framework.

Il principio **KISS** (acronimo di Keep It Simple, Stupid) ci insegna che è importante mantenere un approccio semplice, questo per evitare di mettersi i bastoni fra le ruote. Un altro principio che può riassumere per intero questo articolo è di certo **Less is more**, poichè impiegando meno risorse o meglio le uniche necessarie ci permette di avere una visione più grande di quello che sarà il prodotto finale, migliorandone non solo la forma finale ma i tempi futuri di manutenzione.

Spero di avervi stancato al punto da disinstallare il sistema operativo.

Ci si vede.

__Mirko_
