---
class: post
title: '#howtodev - presentazioni con reveal.js' 
date: 2022-10-28 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags: 
- revealjs
- javascript
- html
- css
- markdown 
- office 
- presentation 
---

E se vi dicessi che potete creare delle presentazioni con HTML, CSS, Javascript e persino... markdown?

Ecco quindi a voi **reveal.js**.

## Obiettivi

A fine articolo il lettore acquisirà le competenze per utilizzare **reveal.js** allo scopo di creare delle presentazioni attraverso diverse tecnologie.



## Prerequisiti 

Al lettore son richieste alcune specifiche conoscenze in ambito di programmazione, quali: 

- html
- utilizzo di node e npm
- utilizzo di git 

Opzionalmente, potrebbe essere utile conoscere: 

- markdown
- css 


## Cos'è Reveal.js

[Reveal.js](https://revealjs.com) è un framework, scritto con varie tecnologie *node*, che permette all'utilizzatore di creare facilmente delle presentazioni in modalità **WYSIWYM** (**W**hat **Y**ou **S**ee **I**s **W**hat **Y**ou **M**ean), scrivendo codice *html, js, css* e opzionalmente *markdown*.   



> **NOTA :** 
>
> Per chi non sapesse la differenza tra *WYSIWYM* e **WYSIWYG** (**W**hat **Y**ou **S**ee **I**s **W**hat **Y**ou **G**et), gli editor del secondo tipo sono quelli in cui comunemente si compone visivamente quello che si ottiene nel risultato (*word, powerpoint, excel*), mentre gli editor del secondo tipo son quelli dietro cui si utilizza un linguaggio di programmazione o di strutturazione del documento e quindi si ottiene il risultato visivo solo dopo la fase di compilazione di tale linguaggio. Gli editor del primo tipo son anche detti **YAFIYGI**, ovvero **Y**ou **A**sked **F**or **I**t, **Y**ou **G**ot **I**t.



Un altro punto interessante di questo approccio è che non è necessario alcun software in particolare per visualizzare il risultato della presentazione, infatti reveal.js si utilizza tramite browser web come una qualunque webapp, può essere poi in caso esportata in pdf se si ha la necessità. 



## Iniziare con Reveal.js



La prima cosa da fare è clonarsi il repository di Reveal.js: 

```bash
git clone https://github.com/hakimel/reveal.js.git 
```

Entra nella directory e fate partire i processi di installazione di npm: 
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

Apriamo il nostro browser sull'indirizzo: `http://localhost:8000` ( o qualunque porta abbiamo scelto ) e troveremo le nostre slide lì, pronte ad essere visualizzate tramite browser e ricaricate per ogni singola modifica che facciamo.

Ora però che abbiamo tutti i tasselli in ordine, apriamo il nostro editor di codice preferito ( consiglio Visual studio code ) ed iniziamo a scrivere i contenuti delle nostre slide.



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

 

Dove troviamo una struttura del genere, ogni `section` rappresenta il contenuto di *una slide*. Si può scrivere al suo interno qualunque testo con *formattazione html* a sua volta. 

Ad esempio scriviamo una prima slide usando un po' di marcatori di testo misti: 

```html
<div class="reveal">
    <section>
            <h2>Slide HTML</h2>  
            Sono una slide con dati <code>html</code>.<br>
            Formattami in <strong>grassetto</strong>, <em>corsivœ</em> oppure ancora <u>sottolineami</u>! 
    </section>
</div>
```



Salvando ora il file, l'anteprima delle slide dovrebbe risultare immediata: il server aggiorna in automatico la pagina internet delle slide



### Navigare le slide 

Si può navigare all'interno delle slide sia con gli appositi controlli su schermo (in basso a destra le frecce), sia eventualmente con le frecce direzionali della nostra tastiera **&larr; &uarr; &rarr; &darr;** .

È possibile eventualmente anche effettuare un overview delle slide con la scorciatoria `o`, navigare con le frecce direzionali e quindi premere `esc` per ritornare in modalità slide. 

### Struttura innestata 

Normalmente le slide di una presentazione vanno da sinistra a destra. **Reveal.js** consente di inserire slide dall'alto al basso, inserendo `<section>` innestate.

```html
<section>
    <section>
        <h2>Slide INNESTATE</h2>  
        In questa sezione c'è una slide verso il basso. &darr; 
    </section>

    <section>
        <h3>Slide</h3>
        <p>Sono una slide disposta verticalmente!</p>
    </section>
</section>
```



### Scrivere in markdown 

È possibile scrivere in linguaggio Markdown specificando nel tag `<section>` l'attributo `data-markdown`: 

```html
<div class="reveal">
    <div class="slides">
        <section data-markdown>
					# Markdown Slide  
					Sono una slide con dati **markdown**, uno dei linguaggi di *markup* più belli che esista! 
		</section>
    </div>
</div>
```

Nel caso di sezioni innestate è **necessario** specificare per ogni sezione se la si vuole o meno con sintassi *markdown*: 
```html
<div class="reveal">
    <div class="slides">
        <section>
            <section>
                <h2>Slide INNESTATE</h2>  
                In questa sezione c'è una slide verso il basso. &darr; 
            </section>

            <section data-markdown>
                ### Slide Markdown
                Sono una slide **markdown**
            </section>
        </section>
    </div>
</div>

```



## Styling 

Ovviamente ci son più modi per rendere graficamente più accattivanti le slide, cambiando sfondo, cambiare le animazioni, etc..

### Temi inclusi 

Esitono già alcuni temi nel framework che possiamo utilizzare per abbellire le slide. Per accedervi, andare nella sezione `<head>` del file quindi cercare il pezzo di codice: 

```html
<!-- Theme used for syntax highlighted code -->
<link rel="stylesheet" href="plugin/highlight/NOMETEMA.css">
```

Al posto di NOMETEMA si può inserire uno qualunque tra i temi sotto elencati: 

- `black` ovvero  nero
- `white` ovvero  bianco
- `league` ovvero sfondo grigio e testo bianco  (leggeremente sfumato al centro)
- `beige` ovvero sfondo beige e scritte più scure 
- `sky` ovvero  background blu e testo nero 
- `night` ovvero  come "black" ma le scritte son più grosse (cambiano anche barra e comandi)
- `serif` ovvero  sfondo "biancastro" e testo "inchiostro", ricorda molto un giornale
- `simple` ovvero  come "white" ma le scritte son leggermente più sottili
- `solarized` ovvero  come lo schema omonimo. Sfondo color "crema", testo verde scurissimo controlli blu
- `blood` come "black" ma i controlli son rossi  
- `moon` ovvero  sfondo blu scuro e scritte grigie.

Ad esempio per avere il tema "moon" bisogna scrivere: 

```html
<!-- Theme used for syntax highlighted code -->
<link rel="stylesheet" href="plugin/highlight/moon.css">
```

Normalmente il tema predefinito è "dark".

### Cambiare background

Si può cambiare lo sfondo di una singola slide. Ad esempio per creare una slide verde: 

```html
<section data-background-color="rgb(10, 250, 0)">
  Sono una slide verde!
</section>
```

Il colore del testo dovrebbe automaticamente cambiare per garantire il miglior contrasto, in caso contrario basta aggiungere la proprietà css all'attributo slide: 

```html
	<section data-background-color="rgb(10, 250, 0)" >
		Sono una slide verde!
		</section>
```

### Inserire immagine come background 

Si può inserire eventualmente anche un immagine come background. Per farlo è necessario scrivere come attributo della section `data-background` e passare il link dell'immagine: 

```html
<section data-background="/percorso/immagine/gustosa" data-transition="convex">
	Sono una slide con un background gustoso!
</section>
```

### Effetti slide 

Si può aggiungere l'animazione di cambio slide molto facilmente. Va aggiunto l'attributo `data-transition` specificando il tipo di effetto tra i seguenti:

- `none`	Nessun effetto.
- `fade`	scompare gradualmente
- `slide`	effetto predefinito, la slide si muove da sinistra a destra
- `convex`	la slide "ruota" verso l'esterno
- `concave`	la slide "ruota" verso l'interno
- `zoom`	la slide viene ingrandita 


Ad esempio inseriamo l'effetto "convex" in due slide e zoom in una: 

```html
<section data-transition="zoom">
	<h2>Slide HTML</h2>  
	Sono una slide con dati <code>html</code>.<br>
	Formattami in <strong>grassetto</strong>, <em>corsivœ</em> oppure ancora <u>sottolineami</u>! 
</section>
<section data-background-color="rgb(10, 250, 0)" style="color:red" data-transition="convex">
	Sono una slide verde!
	</section>
<section data-transition="convex">
	<section>
		<h2>Slide INNESTATE</h2>  
		In questa sezione c'è una slide verso il basso. &darr; 
	</section>

	<section data-markdown>
		### Slide Markdown
		Sono una slide **markdown**
	</section>
</section>
```



## Slides.com, reveal.js ma online

Un ottimo servizio online relativo a reveal.js lo offre il sito [Slides.com](Slides.com).

Oltre i vari piani a pagamento, questo sito offre la possibilità di creare gratuitamente delle slide attraverso un interfaccia grafica molto intuitiva. 

Nel pannello delle slide è anche possibile importare un pdf o un powerpoint e visualizzarlo. Ovviamente lo stesso pannello riesce ad importare anche codice reveal.js.

## Plugin, export e tanto altro 

Reveal.js è una libreria con tantissime potenzialità e tantissime altre caratteristiche, vedremo in futuro altre funzionalità. 

A voi interessa? Fatecelo sapere nei nostri gruppi! 
