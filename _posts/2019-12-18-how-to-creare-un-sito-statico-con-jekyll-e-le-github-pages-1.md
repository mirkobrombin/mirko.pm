---
class: post
title: '#howto - Creare un sito statico con Jekyll e le Github pages'
description: "Questa è una guida in due parti in cui, dopo aver presentato il generatore di siti statici Jekyll.."
date: 2019-12-18
layout: post
author: Andrea Guzzon
author_github: beard33
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github
---
Questa è una guida in due parti in cui, dopo aver presentato il generatore di siti statici **Jekyll**, verrà illustrato come utilizzarlo combinato alle **github pages** per avere in modo completamente gratuito un sito personale (sia esso un blog, una landing page o un portfolio)

## Cos'é Jekyll:

Jekyll è un **generatore di siti statici**, ovvero siti composti unicamente da codice HTML/CSS/JS che vengono presentati a qualunque richiesta di qualunque utente nel medesimo modo (non hanno quindi le caratteristiche dei più moderni siti dinamici, come form di login, accessi a database et similia); si tratta di siti dalle funzionalità basilari, ma eccezionali come blog, portfolio, pagine di documentazione o landing pages.  

Jekyll ci aiuta nella generazione di questo genere di conenuti, rendendo estremamente semplice la stesura di una pagina o un post di un blog (di fatto semplice testo markdown) e la gestione generale del tutto.  

Per rendersi conto delle potenzialità di Jekyll é sufficiente recarsi sul sito, sotto la voce ["showcase"](https://jekyllrb.com/showcase/) per vedere come **compagnie del calibro di Spofify e IBM ne facciano uso.**

## Installazione e primo progetto
Per utilizzare Jekyll avremo bisogno dei seguenti elementi:

*   **Ruby:** v 2.4.0, verificabile con il comando `ruby -v`, qui la [pagina](https://www.ruby-lang.org/en/downloads/) per l'installazione
*   **RubyGems:** necessario in quanto Jekyll è una gemma, paragonabile ai moduli pip di python. Si può verificarne la presenza con `gem -v`. [Qui](https://rubygems.org/pages/download) per l'installazione
*   **Gcc e Make:** verificabili attraverso `gcc -v` e `make -v`
*   **Bundler:** non necessario, ma fortemente consigliato per l'installazione e la gestione coerente di gemme e relative versioni, installabile con il comando `gem install bundler`

Ora che siamo pronti per avviare un progetto, digitiamo il comando

    jekyll new nomesito

per **creare una nuova directory dal nome nomesito**, che conterrà il set di default di gemme necessarie a Jekyll per costruire il contenuto del sito e la struttura di cartelle nella forma di un progetto Jekyll

    ??? _config.yml             // file YML di configurazione del sito
    |
    ??? 404.html                // pagina 404 di default
    |
    ??? about.md                // pagina descrittiva di default
    |
    ??? gemfile                 // file conenente l'elenco delle gemme necessarie
    |  
    ??? index.html              // pagina iniziale di default
    | 
    ??? _posts                  // cartella contenente tutti i post, file in formato .md
    |     |
    |     ??? yyyy-mm-dd-welcome-to-jekyll.md // esempio di post, di default è un benvenuto in jekyll
    |
    ??? _site                   // directory contenente l'effettivo sito generato
    .

Generato la struttura base del sito è già possibile vederlo in esecuzione; sarà sufficiente recarsi nella directory `nomesito` e digitare il comando

    bundler install

per installare le gemme necessarie e successivamente

    bundler exec jekyll serve

per generare il sito e le relative pagine. Sarà quindi sufficiente recarsi all'indirizzo `127.0.0.1:4000` da qualuque browser per vedere qualcosa di simile a questo: ![](https://i.ibb.co/NSGSSvy/jekyllsite.png)

## Personalizzare il proprio sito:

Per personalizzare il proprio sito vi sono due strade:

*   **Utilizzare un template personale:** sicuramente la strada più originale, richiede tuttavia conoscenze di web design e sviluppo web. Jekyll permette infatti di importare ed utilizzare file `html/css` personali. Nel caso dei file html, essi andranno in una nuova directory `_layouts` e **dovranno essere formati da un default.html**, attorno dal quale poi gli altri layout dovranno ereditare. Per quanto riguarda i css invece si troveranno all'interno di una cartella `assets` insieme ad eventuali script Js, immagini ausiliarie e simili. [Qui](https://jekyllrb.com/docs/layouts/) la wiki dettagliata di Jekyll.

*   **Utilizzare un tema esistente:** la strada piú immediata (e comoda) è l'utilizzo di uno dei temi già disponibili. La community é infatti estremamente attiva ed esistono diversi siti che raccolgono temi e template. [Qui](http://jekyllthemes.org/) potete trovarne una raccolta ben fornita. <br>
Da qui possiamo partire con una base già fatta e personalizzare il tema che più ci piace, magari migliorandolo secondo le nostre necessitá. Personalmente, ad esempio, per la mia landing page utilizzo [kasper](https://github.com/rosario/kasper).  
    Per percorrere questa strada dobbiamo semplicemente clonare il tema di nostro interesse e **seguire le istruzioni presenti nel readme.md** per personalizzarlo (solitamente si tratta di modificare il file `_config.yml` e personalizzare i post); da qui possiamo partire **modificandone gli assets per renderlo più nostro**. Per vedere le modifiche basterà eseguire il solito comando `bundler exec jekyll serve` e recarsi all'indirizzo `127.0.0.1:4000`.

## Aggiungere un post

Ogni qualvolta volessimo aggiungere un post al nostro blog non dovremo far altro che recarci all'interno della cartella `_posts` e aggiungere il file **in formato markdown** del post.  
Questi dovrà semplicemente contenere un'intestazione nel seguente formato ( "`---`" compresi) per comunicare a Jekyll informazioni relative al post

    ---
    layout: nomelayout      // comunica a jekyll quale layout utilizzare
    title: titolo           // titolo del post
    date: yyyy-mm-dd-hh     // data di pubblicazione
    ---

Fatto ciò sarà sufficiente digitare il comando `bundler exec jekyll serve` e recarci al solito indirizzo per vedere il risultato finale.  

## Conclusione

Concludendo, jekyll è una risorsa comodissima per chiunque voglia avere un proprio sito web statico, blog o portfolio online senza dover progettare da zero un sito. Nella prossima parte vedremo **come utilizzare github come hosting gratuito, attraverso le Pages** .

Per qualsiasi dubbio non esitate a contattarci sul nostro [gruppo telegram](https://linuxhub.it/t.me/gentedilinux)