---
title: "Un blog in HTML?"
description: "I più curiosi hanno di certo dato un'occhiata al sorgente di questo sito web, arrivando alla deduzione che sia stato realizzato in HTML."
published: 2020-01-11
layout: post
published: true
translated: false
---
I più curiosi hanno di certo dato un'occhiata al sorgente di questo sito web, arrivando alla deduzione che sia stato realizzato in HTML.

Oggi stesso nella chat staff di linux/hub, mi è stato chiesto se ho utilizzato sistemi come Jekyll/Hugo, prodotti per la scrittura di siti web in HTML partendo da fogli Markdown.

Ammetto che la scelta nasce principalmente dal mio non voler dipendere dall'ennesimo database e tutto ciò nasce quasi come sfida.

![we can! and we will!](https://media1.giphy.com/media/oe8Ii2ZyKl1fy/giphy.gif?cid=790b76115729d4ef79ae477ac3e11b2c64368203e0d0ca7a&rid=giphy.gif)

Nulla di tanto "complesso", passatemi il termine. Ho realizzato questo sito web con lo stesso presupposto per cui nasce: la semplicità. Ossia trattare e pubblicare argomenti di mio interesse in modo semplice e del tutto privo di pretese.

Essendo un progetto a tempo perso, non deve occupare troppo tempo in caso di migrazione su un nuovo server ne tanto meno richiedere troppo tempo in eventuali manutenzioni, per questo motivo ho deciso di realizzarlo completamente in HTML.

## Template e Struttura

Dato che questa scelta mi porta a metter mano direttamente sul codice senza l'utilizzo di pannelli per la pubblicazione, ho optato per un utilizzo drasticamente ridotto degli elementi, lasciando al CSS il compito di rendere il tutto accettabile visivamente.

La struttura di una ipotetica nuova pagina si presenta quindi così:

```html
<!DOCTYPE html>
<html lang="it"><head><base href="https://mirko.pm/">
<title>mirko.pm</title><link rel="icon" href="favicon.ico" type="image/x-icon">
<meta charset="utf-8"><meta name="theme-color" content="#ffffff" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Sito personale di Mirko Brombin." />
<link rel="stylesheet" type="text/css" href="css/index.min.css" /></head>
<body>
<header><!--header -->
    <h1>mirko.pm</h1>
    <a href="/">Home</a>
    <a href="sample" class="s">Sample</a>
</header><!--/header -->

<main><!-- content -->
    <h2>Ciao_</h2>
    <p>A very interesting phrase.</p>
</main><!--/content -->

<footer><!-- footer -->
    <p>All rights are biscuits!</p>
</footer><!--/footer -->

</body>
</html>
```

Nel dettaglio:

*   header
*   content
*   footer

Tutto ciò che devo fare è modificare il titolo della pagina, impostare la classe `s` al menu ed inserire il contenuto.

Ho scelto di affiancare le entries del `<haed>` in modo da ridurne all'osso lo spazio consumato, ciò nonostante rimanendo sugli 80 caratteri massimi per lunghezza (come gli sviluppatori più <del>fighetti</del> pignoli).

### CSS

Dato l'utilizzo di soli elementi standard, il grosso per quanto riguarda il design è svolto via CSS tramite operatori e selettori, ad esempio per quando riguarda la home del blog:

```html
    ...
    <main>
        <article>
        ...
        </article>
        <article>
        ...
        </article>
    </main>
    ...
```

per mostrare una suddivisione fra i vari articoli, anzichè inserire un divisore o aggiungere una propietà extra agli elementi, sfrutto l'operatore `+` per identificare il secondo elemento ogni 2 dello stesso tipo:

    ...
    article + article {
        border-top: 1px solid;
    }
    ...

In questo modo ho applicato un bordo superiore creando un divisore che rispettasse l'ordine (tutti eccetto il primo e l'ultimo della lista).

> Potevo usare un selettore :nth-child(odd) ma personalmente trovo questa soluzione più pratica per il caso specifico.

### Dark/Light

Dato il mio recente prediligere temi scuri a quelli chiari, ho scelto di rendere il sito dinamico in base al tema selezionato dal browser/siste operativo in uso. Questo sfruttando il `@media (prefers-color-scheme)`, in modo da dettare regole specifiche sia per la variante light che dark:

```css
...
@media (prefers-color-scheme: dark) {
    header::after {
        content: "Dark mode";
        position: fixed;
        top: initial;
        bottom: 0;
        right: 0;
        display: block;
        padding: 7px 15px;
        margin: 10px;
        border-radius: 4px;
        opacity: .3;
    }
    header a,
    body,
    .d span,
    header h1 span   {
        color: #f1f1f1c2;
    }
    ...
}
...
```

Non volevo integrare troppo javascript nel sito web, ho scelto questo pratico metodo esclusivamente via CSS, nonostante non sia ancora del tutto supportato ed integrato nei browser (anche se sia Chrome che Firefox lo integrano).

### Mobile

Per quanto riguarda i dispositivi mobili, ho sfruttato un tag `@media` il quale contiene diverse regole necessarie al corretto rendering su schermi più piccoli e/o a bassa risoluzione:

```css
@media screen and (max-width: 457px) {
    header {
        display: initial;
    }

    header > h1 {
        text-align: center;
        min-width: initial;
        margin: 0 0 14px 0;
    }

    header a {
        margin: 0 -4px;
        padding: 0 7px 0 7px;
    }
}
```

## Blog

Per quanto riguarda il blog, era necessario creare un percorso dedicato dove posizionare tutti i file degli articoli che andrò a scrivere. Ho creato quindi la directory `/blog` e creato al suo interno un file `index.html` il quale contiene la lista degli ultimi articoli scritti.

Posiziono ogni articolo nella stessa directory in modo da creare un link posizionato tipo: _https://mirko.pm/blog/titolo-articolo.html_

## Friendly Urls

Per quanto riguarda l'indicizzazione dei contenuti e la semplicità dei link, trattandosi di file `.html`, ho semplicemente scritto una regola per Nginx, il web server in uso, che va a riscrivere il link visualizzato rimuovendo l'estensione.

![it's alive!](https://media.giphy.com/media/YEL7FJP6ed008/giphy.gif)  

## Conclusioni

Ho trovato molti pregi ma anche diversi difetti in questo sistema, se da una parte troviamo la manutenzione e la migrazione più semplici, dall'altra ci sono diverse operazioni che devono essere ripetute file per file. Il grosso pregio di questo sistema è l'utilizzo minimale degli elementi e di conseguenza l'estrema velocita del sito web oltre che un alto punteggio in **PageSpeed Insights**.

La grossa differenza con sistemi basati su Vue.js e similari è la non necessità di un ambiente di sviluppo, un grande pregio se si pensa al fatto che basta avere un editor a portata di mano per pubblicare nuovi contenuti.

Hai letto sino a qui? Meriti un applauso.

__Mirko_