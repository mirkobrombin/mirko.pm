---
title: '#howtodev - presentazioni con reveal.js' 
date: 2021-11-XX 11:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
tags: 
- javascript
- html
- css
- markdown 
- office 
- presentation 
---

E se vi dicessi che potete creare delle presentazioni con HTML, CSS, Javascript e persino... markdown?



## Obiettivi

A fine articolo il lettore acquisirà le competenze per utilizzare reveal.js allo scopo di creare delle presentazioni attraverso diverse tecnologie.



## Prerequisiti 

Al lettore son richieste alcune specifiche conoscenze in ambito di programmazione: 

- html
- css
- javascript 
- utilizzo di node e npm
- utilizzo di git 

Opzionalmente potrebbe esservi utile conoscere: 

- markdown
- scss



## Cos'è Reveal.js

[Reveal.js](https://revealjs.com) è un framework scritto con varie tecnologie *node* che permette all'utilizzatore di creare facilmente delle presentazioni in modalità **WYSIWYM** (**W**hat **Y**ou **S**ee **I**s **W**hat **Y**ou **M**ean) scrivendo codice html, js, css e opzionalmente markdown.   



> **NOTA :** 
>
> Per chi non sapesse la differenza tra *WYSUWYM* e **WYSIWYG** (**W**hat **Y**ou **S**ee **I**s **W**hat **Y**ou **G**et), gli editor del secondo tipo sono quelli in cui comunemente si compone visivamente quello che si ottiene nel risultato ( *word, powerpoint, excel* ), mentre gli editor del secondo tipo son quelli dietro cui si utilizza un linguaggio di programmazione o di strutturazione del documento e quindi si ottiene il risultato visivo solo dopo la fase di compilazione di tale linguaggio. Gli editor del primo tipo son anche detti **YAFIYGI**, ovvero **Y**ou **A**sked **F**or **I**t, **Y**ou **G**ot **I**t.



Un altro punto interessante di questo approccio è che non è necessario alcun software in particolare per visualizzare il risultato della presentazione, infatti reveal.js si utilizza tramite browser web come una qualunque webapp, può essere poi in caso esportata in pdf se si ha la necessità. 



## Iniziare con Reveal.js



La prima cosa da fare è clonarsi il repository di Reveal.js: 

```bash
git clone https://github.com/hakimel/reveal.js.git 
```

Entrate nella directory e fare partire i processi di installazione di npm: 
```bash
cd reveal.js

npm install
```

Quindi, quando siete pronti, potete avviare il server: 

```bash
npm start
```

Normalmente il server parte sulla porta `8000`, tuttavia  possiamo cambiarla a piacere. Ad esempio mettiamola sulla `8080`: 
```bash
npm start -- --port=8080
```

Apriamo il nostro browser sull'indirizzo: `http://localhost:8000` ( o qualunque porta abbiamo scelto ) e troveremo le nostre slide li, pronte ad essere visualizzate tramite browser e ricaricate per ogni singola modifica che facciamo.

Ora però che abbiamo tutti i tasselli in ordine, apriamo il nostro editor di codice preferito ( consiglio Visual studio code ) e iniziamo a scrivere i contenuti delle nostre slide.



## Scrivere le slide 

Tutto inizia dall' `index.html`. Focalizziamoci in maniera particolare sul **body** : 

```html
<div class="reveal">
    <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
    </div>
</div>
```

 

Dove troviamo una struttura del genere, ogni section rappresenta il contenuto di *una slide*.  

Se proviamo a cambiarne o aggiungerne una, salvando vedremo immediatamente l'effetto: cambia il contenuto sulla nostra pagina web. 

https://danielabaron.me/blog/build-and-publish-presentation-with-html-and-css/





