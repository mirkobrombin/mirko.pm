---
title: "#howto - Introduzione all'utilizzo di Grep e delle RegEx"
description: "Con RegEx (REGular EXpression) espressione regolare, si intende una sequenza di caratteri che descrive uno speci.."
date: 2019-12-04
layout: post
author: Andrea Guzzon
author_github: beard33
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - regex
---
Con **RegEx (REGular EXpression)**, espressione regolare, si intende una **sequenza di caratteri che descrive uno specifico pattern** permettendo di identificare una o piú stringhe  
Nel mondo **Unix** ne esistono diverse tipolgie, tra cui le piú diffuse sono le **espressioni regolari stanrdard** (usate dal comando `grep`) e le **espressioni regolari estese**(usate da `egrep`, permettono di trattare **[]{}+| come operatori** e non come semplici char, a differenza della forme standard)

## Utilizzo del comando grep

Letteralmente `grep` sta per **General Regular Expression Print** e permette di utilizzare, appunto, le espressioni regolari in forma standard per filtrare il contenuto di file, cartelle o l'output di comandi  
Dello stesso comando esistono anche diverse varianti, come ad esempio `egrep` per le espressioni regolari estese o `pgrep` per ricercare all'interno dei processi in esecuzione  
Supponendo di avere un semplicissimo file `esempio.txt` del tipo:

    log1 => 12:34; 127.0.0.1
    log2 => 14:23; 192.168.1.1
    log3 => 14:56; 192.132.3.4
    log4 => 17:23; 193.168.65.67
    log168 => 19:23 127.0.0.1

vediamo alcuni esempi di pattern e flag che possono permetterci di filtrarne il contenuto

*   **Pattern semplice:**  
    Qualora nel file precedente fossimo interessati a stampare **tutti i risultati delle ore 14** potremo usare il comando

        grep '14:' esempio.txt

    per ottenere un output

        log2 => 14:23; 192.168.1.1
        log3 => 14:56; 192.132.3.4

*   **Negazione di un pattern:**  
    Qualora il nostro intento sia quello di filtrare per **tutti i risultati che NON matchano uno specifico pattern** possiamo utilizzare il flag `-v`

        grep -v '14:' esempio.txt

    Ottenendo cosí il seguente output

        log1 => 12:34; 127.0.0.1
        log4 => 17:23; 193.168.65.67
        log168 => 19:23 127.0.0.1

*   **Conteggio delle righe:**  
    Se fossimo interessati a sapere **quante righe** matchano l'espressione inserita basterebbe utilizzare il flag `-c`, ad esempio

        grep -c '14:' esempio.txt

    Che ci restituirebbe come output `2`

*   **Range di risultati**:  
    Supponiamo ora di voler filtrare il file per ottenere **soltanto i log dall'1 al 3**. Possiamo utilizzare la sintassi che permette di definire un range di valori

        grep log[1-3] esempio.txt

    dove `log[1-3]` seleziona le stringhe contenenti la parola `log` seguite dai numeri contenuti nella sequenza specificata, pertanto saranno selezionati `log1, log2, log3`

        log1 => 12:34; 127.0.0.1
        log2 => 14:23; 192.168.1.1
        log3 => 14:56; 192.132.3.4

*   **Moltiplicatori:**  
    Con le espressioni regolari é possibile anche definire pattern generici ripetuti; se ad esempio volessimo selezionare **tutti gli IP del testo in cui la seconda serie di cifre inizia per 1** possiamo farlo:

        egrep '[0-9]{3}.1' esempio.txt

    Dove `[0-9]` indica il pattern per selezionare tutti i numeri da 0 a 9 (compresi), `{3}` indica che il precedente pattern deve ripetersi 3 volte (per questo è necessario utilizzare `egrep`, per avere accesso alle regex estese e poter specificare la molteplicità) e `.1` indica che deve essere seguito da un punto seguito da un 1\. Pertanto otterremo:

        log2 => 14:23; 192.168.1.1
        log3 => 14:56; 192.132.3.4
        log4 => 17:23; 193.168.65.67

    ## Le PCRE

    Le **PCRE (Perl Compatible Regular Expression)** sono una libreria che implementa un motore di espressioni regolari direttamente derivato da quello del linguaggio Perl e sono richiamabili con il flag `-P` dal comando grep.  
    Sono piú potenti e versatili delle standard e permettono di complicare notevolmente i pattern, introducendo feature come **positive lookahead, positive lookbehind, multiline matching** e altro ancora, ma meriterebbero un articolo a parte solo loro  
    Giusto per dare un'idea delle capacità di questa libreria, un esempio di **positive lookbehind**, ovvero di ricerca di uno specifico pattern **preceduto da quello specificato**  
    Se nel nostro file d'esempio volessimo trovare **tutti gli IP il cui secondo elemento sia 168**;  
    Utilizzando l'espressione standard

          grep '.168' esempio.txt

    Otterremmo nell'output **anche il log168**

          log2 => 14:23; 192.168.1.1
          log4 => 17:23; 193.168.65.67
          log168 => 19:23 127.0.0.1

    Per evitare ciò possiamo utilizzare la seguente forma

        grep -P '(?<=[0-9]{3}).168'

    in cui matchamo **solo i 168 preceduti da cifre 0-9 ripetute 3 volte, ovvero solo gli IP**

        log2 => 14:23; 192.168.1.1
        log4 => 17:23; 193.168.65.67

## Conclusione

In conclusione quindi le **Espressioni Regolari** e il comando **grep** sono strumenti estremamente potenti che possono semplificare notevolmente la vita in moltissime situazioni in cui si renda necessario filtrare un determinato contenuto.  
Per questo vi lascio il link a [regex101](https://regex101.com/), un sito utilissimo per allenarsi e capire le varie funzioni di ogni token  

Per qualsiasi dubbio non esitate a contattarci sul [gruppo telegram](https://linuxhub.it/t.me/gentedilinux)