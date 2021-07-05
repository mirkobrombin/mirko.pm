---
title: '#howto - Come ripulire un file su linux'
date: 2018-01-20
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Capita spesso e volentieri di trovarsi in situazioni dove é necessario svuotare o meglio pulire un file dal suo contenuto. Di preciso quindi, come si svuota un file senza cancellarlo o eliminarlo definitivamente?

Esistono diversi modi per eliminare l'intero contenuto di un file senza effettivamente eliminarlo fisicamente.

Di seguito ne elencheró alcuni, incentrati sul significato stesso di 'pulizia' del contenuto.

## Preparazione del file

Quel che faremo ora sará creare il nostro file cavia che useremo appunto per questa guida. Tramite il terminale, digitiamo:

    neal@linuxhub:~/linuxhub$ touch file_linuxhub

ed un file cavia sará pronto per essere prima riempito e poi svuotato.

## Modifica del file

Tramite l'editor di testo che preferiamo (io useró **vi**) andiamo a scrivere qualcosa nel nostro file. Dando per scontato che ci troviamo giá nella cartella che contiene il file:

    neal@linuxhub:~/linuxhub$ vi file_linuxhub

Una volta inserito il nostro testo, salviamo il documento mediante _:wq_ .

[![](https://linuxhub.it/wp-content/uploads/2018/01/linuxhub1.png)](https://linuxhub.it/wp-content/uploads/2018/01/linuxhub1.png)

Siccome **vi** puó risultare complesso ad un utente neofita, quest'ultimo potrá trovare piú comodo l'utilizzo di **nano**.

## Pulire il file

Passiamo ora alla fase in cui svuoteremo il file. I comandi sotto elencati permettono di avere, seppur con sintassi diversa, lo stesso risultato. Assumiamo che **filename** sia uguale al _PATH_ dove abbiamo salvato il file, nel mio caso _/home/neal/linuxhub/file_linuxhub_ :

    > filename
     : > filename
     truncate -s 0 filename
     echo -n > filename
     echo " " > filename

Se conoscete altri metodi per pulire un file linux da terminale, non esitate a segnalarcelo nei commenti.