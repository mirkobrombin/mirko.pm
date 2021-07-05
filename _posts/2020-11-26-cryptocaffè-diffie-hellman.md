---
title: '# Cryptocaffè: Diffie-Hellman'
date: 2020-11-26
layout: post
author: Andrea Guzzon
author_github: beard33
tags:

---
Supponete di conoscere una persona per corrispondenza, senza averla mai incontrata. E di dover comunicare qualcosa si *segreto* a questa persona senza che nessuno sappia cosa vi state dicendo. Per farlo, anche per motivi di efficienza, l'idea migliore è utilizzare la **crittografia simmetrica**, ovvero quella tecnica per cui *si utilizza la stessa chiave, nota ad entrambe le parti, per cifrare e decifrare un messaggio* (un esempio è **AES**)

Perfetto. Ma come scambiarsi la chiave o accordarsi su di essa se il canale di comunicazione è insicuro? Non puoi certamente inviarla in chiaro, chiunque potrebbe leggerla. Serve quindi un *algoritmo in grado di generare in modo sicuro una chiave unica per entrambi*. Qui viene in aiuto **Diffie-Hellman**

### Aritmetica modulare

Alla base dell'algoritmo di scambio delle chiavi c'è quella che si chiama **aritmetica modulare**, che a discapito del nome apparentemente complesso *fa parte della nostra vita tutti i giorni.*

Si tratta di un modo di contare per cui gli interi "ruotano" intorno ad un numero `n` detto **modulo**. Ed è la logica che quotidianamente applichiamo alle ore dell'orologio. Nello specifico **modulo24** (o 12, se ragioniamo in AM/PM).

Se infatti alle `23` vi dicessi "*vediamoci tra 6 ore*" sapreste tutti che ci dovremmo vedere alle `5` . Ovvero **29 mod(24)** . In forma "matematica" diciamo che *29 e 5 sono **congruenti** modulo 24* 

![Mod](storage/dh/mod.png)

Diffie-Hellman si basa sullo stesso principio di base, utilizzando però *un numero primo* come modulo e aggiungendo l'elevamento a potenza



### L'algoritmo (semplificato)

Prendete sempre l'esempio precedente dell'orologio: _se vi dicessi che sono alle ore 14, e che sono partito dalle ore 9_, sapreste dirmi con certezza con quale numero ci sono arrivato?
La risposta è no, infatti partendo dalle *9* posso arrivare alle *14* sommando *5*, ma anche *29* infatti

![](storage/dh/mod2.png)

Derivante dal fatto che `38 - 24 = 14` che è pertanto raggiungibile in diversi modi.

Per concordare un'ora con un amico senza che nessuno la scopra si può adottare un algoritmo come quello seguente

- Decise a priori *ora di partenza* `o` (nell'esempio *17*) e modulo `p`  (nel caso delle ore 24), che possono essere pubblici

- Io, **Alice**, scelgo un numero < 24 ( supponiamo *9* ) **che rimarrà segreto **e lo sommo ad `o` modulo _24_

  ![](storage/dh/h.png)


- **Bob** fa altrettanto, supponiamo scelga *10*

![](/storage/dh/h2.png)

- Ci scambiamo i risultati ottenuti, *3* e *2* e sommiamo a questi il *nostro valore segreto*

  ![](/storage/dh/h3.png)

Come si può vedere **sono giunti alla stessa ora (chiave) senza scambiarsi dati segreti** . Come abbiamo visto infatti è _difficile_ risalire al valore segreto conoscendo il risultato della somma delle ore in modulo

### L'algoritmo effettivo

L'algoritmo effettivo funziona sullo stesso principio di base, ma con costrutti matematici più complessi. Parte infatti da un *modulo* `p` che **deve essere un numero primo**. Utilizza le potenze al posto delle somme e "la partenza" è un numero detto **generatore**, `g` 

Il nome è dovuto al fatto che elevando `g` ad una potenza `x`, al variare di `x` tra 1 e `p-1` , è possibile _generare_ tutti i numeri compresi tra *1* e `p`, in modulo

Ad esempio se prendiamo `p=5` *2* **è** un generatore infatti

  ![](/storage/dh/2.png)

e come si può vedere abbiamo "generato" tutti gli interi tra *1* e *4*



L'algoritmo procede come descritto per l'orologio. Ipotizziamo in questo caso `p` = *7* e `g`*= 3*

- **Alice** sceglie un numero segreto `a`< *7* , ipotizziamo 4, e calcola la potenza modulo

  ![](/storage/dh/alicereal.png)

- **Bob** fa lo stesso, supponiamo `b` = 2 e calcola

  ![](/storage/dh/bobreal.png)

- Si scambiano i risultati e applicano il loro esponente segreto ad essi

  ![](/storage/dh/final.png)

  

> NOTA: il fatto che b sia uguale al risultato ottenuto è assolutamente un caso

Come si vede entrambi ottengono lo stesso valore, *2*, che possono utilizzare come chiave per scambiarsi messaggi



### Perché funziona

Nell'algoritmo reale si utilizzano numeri estremamente più grandi, ma la difficoltà sta nel fatto che si ritiene essere *difficile per un computer* calcolare il **logaritmo discreto** di un numero in modulo. 

Dove per **logaritmo discreto si intende**

  ![](/storage/dh/logdisc.png)

Similmente al discorso del risalire al punto di partenza sull'orologio.

### Conclusioni

In conclusione questa era una presentazione (**molto**) semplificata di quel che sta alla base dello scambio di chiavi Diffie-Hellman. <br>
La teoria matematica alla base è estremamente affascinante (l'aritmetica modulare, i gruppi moltiplicativi, la scelta dei parametri, le curve ellittiche che si usano ultimamente e molto altro). Se siete curiosi potete contattarci al [nostro gruppo telegram](https://t.me/linuxpeople)