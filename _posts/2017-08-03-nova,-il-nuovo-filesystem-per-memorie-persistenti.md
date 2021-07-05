---
title: 'Nova, il nuovo filesystem per memorie persistenti'
date: 2017-08-03
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - github
---
L' Università della California di San Diego, ha annunciato oggi la realizzazione di un nuovo filesystem per memorie persistenti.Certo, non c'è che dire: fra annunci riguardanti btrfs deprecato da RHEL e i piani per STRATIS (il piano per lo storage Linux di nuova generazione), il mondo dello storage Linux è  in grande movimento questa settimana!Dall'annuncio stesso riportiamo: "<em>l'obiettivo di NOVA è quello di fornire un <strong>file system ad alte prestazioni</strong>, completo e pronto per la produzione, su misura per memorie non volatili indirizzabili da byte (ad es. NVDIMM e DIMM 3DXpoint da lanciare a breve per Intel). </em>Combina gli elementi di progettazione da molti altri file system per offrire una combinazione di garanzie di consistenza elevate e di forte coerenza e protezione completa dei dati. NOVA supporta mmap in stile DAX, che è una priorità di primo ordine nel design di NOVA. "Gli sviluppatori ritengono che NOVA è abbastanza stabile in questo momento per "applicazioni complesse", ma che c'è ancora un lavoro sostanziale.NOVA è log-strutturato con un disegno log-per-file, le modifiche di file sono copy-on-write, replication e Controlli di tutte le strutture di metadati, supporti dei controlli, e molto altro ancora.Ne riparleremo presto!NOVA | <a href="https://github.com/Andiry/nova">https://github.com/Andiry/nova</a>