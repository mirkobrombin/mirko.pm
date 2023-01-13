---
class: post
title: '#howto - Creare un sito statico con Jekyll e le Github Pages (seconda parte)'
description: "In questa seconda parte vedremo come pubblicarlo su GitHub sfruttando GitHub Pages per avere un sito web personale."
date: 2020-01-08
layout: post
author: Andrea Guzzon
author_github: beard33
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github
---

Dopo aver visto nell'[articolo precedente](https://linuxhub.it/articles/how-to-creare-un-sito-statico-con-jekyll-e-le-github-pages-1) come creare localmente un sito con Jekyll, in questa seconda parte vedremo come pubblicarlo su GitHub sfruttando GitHub Pages per avere un sito web personale.

## Creare una nuova repository
Dopo aver creato un account GitHub dalla seguente [pagina](https://github.com/join?source=header-home), qualora ancora non lo aveste, recatevi sul vostro profilo e dalla voce **Repositosies** cliccate sul bottone verde **New**
![](https://i.ibb.co/jZrsfGD/new.png")<br>
La repository dovrá avere il nome nel seguente formato: 
```
nomeUtente.github.io
```
(questo sará anche l'URL definitivo della nostra pagina)<br>
Nelle **impostazioni di visilibilitá** della repository possiamo decidere se lasciarla pubblica o renderla privata: se disponete di un account Pro potete scegliere la seconda opzione; in caso contrario, affinché la pagina sia visibile, la repository deve essere pubblica.

## Aggiungere il codice
Creata la repository su GitHub, é giunto il momento di aggiungere alla stessa il codice del sito che abbiamo creato grazie all'articolo precedente.<br>
Come prima cosa é necessario recarsi all'interno della cartella radice del sito, rinominarla come la repository creata precedentemente e **inizializzare localmente una repository git**, digitando il comando
```
git init
```
<br>
Dobbiamo ora associare al git appena creato localmente la repository remota. Per farlo, digitiamo il comando

```
git remote add origin https://github.com/nomeUtente/nomeUtente.github.io.git
```
Ovvero l'URL git della repository creata in precedenza<br>
<br>
Il passo successivo consiste nell'aggiungere il codice del nostro sito alla repository locale, digitando il comando

```
git add listaFile
```
dove `listaFile` sará l'elenco di tutti i file modificati di volta in volta (in questo caso essendo il primo commit dovrá comprendere tutti i file nella cartella del nostro sito)<br><br>
Fatto ció é necessario **committare localmente le modifiche**, affinché queste possano essere poi caricate sulla repository creata in precedenza, attraverso il comando
```
git commit -m "messaggio commit"
```
Dove "messaggio commit" é un messaggio che indica le modifiche apportate ai file (in questo caso essendo il primo commit possiamo digitare "Primo commit")<br><br>
L'ultimo passaggio consiste nel portare le modifiche appena effettuate sulla repository creata in precedenza: per farlo usiamo il comando
```
git push origin master
```
digitando, quando richieste, le nostre credenziali GitHub. <br><br>
Fatto ció possiamo recarci all'URL `nomeUtente.github.io` per vedere il nostro sito funzionante e attivo


## Conclusione
Concludendo, abbiamo visto come GitHub può essere sfruttato per ospitare un nostro sito personale senza alcun costo.
Per qualsiasi dubbio non esitate a contattarci sul [gruppo Telegram](https://linuxhub.it/t.me/gentedilinux)