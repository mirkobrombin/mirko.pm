---
title: "#howto – Utilizzo del comando 'cksum'"
published: 2019-05-31
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
<p>Capita spesso di dover verificare l'integrità di un documento trasferito/scaricato e&nbsp;controllarne quindi la validità con la fonte, procedura semplificata da <strong>cksum</strong>.</p><p>Nello scenario in cui scarichiamo l'immagine ISO di una distribuzione e vogliamo essere sicuri che corrisponda all'originale e che quindi non sia compromessa o incompleta, ci viene in soccorso il comando&nbsp;<strong>cksum</strong>&nbsp;con cui possiamo verificare il&nbsp;checksum originale con quello ottenuto dalla copia da noi scaricata.</p><h2>Sintassi</h2><p>La sintassi del comando è la seguente:</p><pre><code>cksum [file]</code></pre><p>ed offre le seguenti opzioni:</p><ul>	<li><strong>--help&nbsp;</strong>per la guida</li>	<li><strong>--version</strong>&nbsp;per mostrare la versione dello strumento</li></ul><h2>Utilizzo del comando</h2><p>Non ci sono più modi di usare il comando, questo strumento è molto semplice e fa esclusivamente ciò per cui è stato creato, ossia mostrare la&nbsp;checksum da un dato file:</p><pre><code>cksum file_scaricato</code></pre><p>come output ci verrà fornita la checksum da confrontare con quella originale, di norma messa a disposizione dello sviluppatore/creatore sul sito ufficiale della risorsa. Nel caso in cui le stringhe corrispondano, il file è integro.</p><p>La checksum cambierà ad ogni aggiornamento/modifica del file.</p><p>&nbsp;</p><p><em>Good&nbsp;<strong>*nix</strong>?</em><br /><em>&nbsp;- Mirko</em></p><p>&nbsp;</p>