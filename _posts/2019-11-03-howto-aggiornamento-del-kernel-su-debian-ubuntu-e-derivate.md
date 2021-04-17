---
title: '#howto - Aggiornamento del kernel su Debian/Ubuntu e derivate'
published: 2019-11-03
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ubuntu
---
<p>Aggiornare il kernel di una distribuzione, è una operazione tanto semplice quanto indispensabile, nonostante spesso le distribuzioni basate Debian, tendono a rallentare.</p>
<p>Un nuovo aggiornamento kernel, porta con se diversi miglioramenti, <strong>risoluzioni di bug</strong>, <strong>supporto</strong> a nuovo <strong>hardware</strong> e nuove funzionalità che <strong>migliorano</strong> in generale <strong>le</strong> <strong>prestazioni</strong> di sistema. In questa guida vediamo come aggiornare il kernel su distribuzioni come Debian, Ubuntu e derivate.</p>
<blockquote>
<p>Seppur il procedimento è semplice, non è completamente privo di rischi. In questa guida manteniamo la versione corrente del kernel installata sul sistema, la useremo nel caso il sistema rifiutasse l&#39;avvio.</p>
</blockquote>
<p>Ci sono diversi software e script pronti all&#39;uso per semplificare questa operazione. Nello specifico oggi vediamo due metodi, quello da manuale che prevede l&#39;installazione dei pacchetti precompilati da Ubuntu e quello semplificato tramite l&#39;utilizzo di ukuu.</p>
<h2 id="metodo-da-manuale">Metodo da manuale</h2>
<p>Per prima cosa controlliamo tramite <a href="https://kernel.ubuntu.com/~kernel-ppa/mainline/">kernel.ubuntu.com</a> la versione più recente disponibile del kernel, dove è importante fare attenzione alle build che contengono <strong>RC</strong> nel nome, questo significa che si tratta di una build ancora in fase di sviluppo e che potrebbe essere instabile, sconsiglio perciò la loro installazione.</p>
<p>Nel momento in cui scrivo, la versione più recente del pacchetto è la v5.3, portiamoci quindi alla sua directory nel sito e scarichiamo i seguenti pacchetti dalla lista dei proposti:</p>
<pre><code><span class="hljs-selector-tag">linux-headers-5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300_5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300</span><span class="hljs-selector-class">.201909152230_all</span><span class="hljs-selector-class">.deb</span>
<span class="hljs-selector-tag">linux-headers-5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300-generic_5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300</span><span class="hljs-selector-class">.201909152230_amd64</span><span class="hljs-selector-class">.deb</span>
<span class="hljs-selector-tag">blinux-image-unsigned-5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300-generic_5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300</span><span class="hljs-selector-class">.201909152230_amd64</span><span class="hljs-selector-class">.deb</span>
<span class="hljs-selector-tag">linux-modules-5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300-generic_5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0-050300</span><span class="hljs-selector-class">.201909152230_amd64</span><span class="hljs-selector-class">.deb</span>
</code></pre><p>Una volta ottenuti i pacchetti qui sopra, portiamoci nella directory dove sono stati scaricati ed installiamoli mediante dpkg</p>
<pre><code><span class="hljs-attribute">sudo</span> dpkg -i linux-<span class="hljs-regexp">*.deb</span>
</code></pre><p>Una volta terminata la procedura riavviamo il sistema e controlliamo la corretta installazione:</p>
<pre><code><span class="hljs-attribute">uname -sr</span>
</code></pre><h2 id="metodo-ukuu">Metodo ukuu</h2>
<p>Ukuu (formalmente Ubuntu Kernel Update Utility) è uno strumento che semplifica di molto l&#39;installazione del kernel su Ubuntu e derivate.</p>
<p>Per prima cosa accertiamoci della presenza di software-properties-common nel sistema:</p>
<pre><code><span class="hljs-symbol">sudo</span> apt install software-properties-<span class="hljs-meta">common</span>
</code></pre><p>aggiungiamo poi la repository di ukuu:</p>
<pre><code>sudo<span class="hljs-built_in"> add-apt-repository </span>ppa:teejee2008/ppa
</code></pre><p>e procediamo all&#39;installazione via <strong>apt</strong>:</p>
<pre><code>sudo apt <span class="hljs-keyword">install</span> ukuu
</code></pre><h3 id="via-interfaccia-gui-">Via interfaccia (GUI)</h3>
<p>Avviamo l&#39;interfaccia di ukuu tramite l&#39;icona presente nel menu applicazioni o tramite comando:</p>
<pre><code><span class="hljs-attribute">ukuu-gtk</span>
</code></pre><p>L&#39;applicazione si mostra con la lista dei kernel più recenti in prima posizione, da qui ci basterà selezionare il kernel di nostro interesse (normalmente l&#39;ultimo è in cima) e premere il pulsante <strong>Install</strong> nella colonna di sinistra. Una volta terminato il processo di installazione automatizzato, ci verrà richiesto di riavviare il sistema.</p>
<p>Una volta riavviato digitiamo:</p>
<pre><code><span class="hljs-attribute">uname -sr</span>
</code></pre><p>per verificare la versione corrente del kernel e di conseguenza la sua corretta installazione.</p>
<h3 id="via-cli">Via CLI</h3>
<p>Prima di tutto mostriamo la lista dei kernel disponibili all&#39;installazione via flag <strong>--list</strong>:</p>
<pre><code>ukuu <span class="hljs-comment">--list</span>
</code></pre><p>l&#39;attesa potrebbe essere particolarmente lunga e una volta terminato, mostrerà un output simile al seguente:</p>
<pre><code>=Available Kernels=
v5<span class="hljs-number">.3</span><span class="hljs-number">.8</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.8</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.7</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.7</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.6</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.6</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.5</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.5</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.4</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.4</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.3</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.3</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.2</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.2</span>                     
v5<span class="hljs-number">.3</span><span class="hljs-number">.1</span>                         <span class="hljs-number">5.3</span><span class="hljs-number">.1</span>                     
v5<span class="hljs-number">.3</span>                           <span class="hljs-number">5.3</span>                      
v5<span class="hljs-number">.2</span><span class="hljs-number">.21</span>                        <span class="hljs-number">5.2</span><span class="hljs-number">.21</span>         
...
</code></pre><p>in prima posizione troviamo il kernel più recente, ne copiamo il nome (prima colonna) e procediamo alla sua installazione via flag <strong>--install</strong>:</p>
<pre><code><span class="hljs-selector-tag">sudo</span> <span class="hljs-selector-tag">ukuu</span> <span class="hljs-selector-tag">--install</span> <span class="hljs-selector-tag">v5</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.8</span>
</code></pre><p>Una volta terminata l&#39;installazione riavviamo e al successivo login verifichiamo la presenza del nuovo kernel:</p>
<pre><code><span class="hljs-attribute">uname -sr</span>
</code></pre><h2 id="risoluzione-avvio">Risoluzione avvio</h2>
<p>Nel caso fosse impossibile avviare il sistema dopo l&#39;installazione del nuovo kernel, teniamo premuto il pulsante <strong>[SHIFT]</strong> in fase di avvio del sistema per mostrare il <strong>GRUB</strong>, selezioniamo quindi la versione precedente del kernel.</p>
<p>Una volta avviato il sistema, possiamo procedere con la rimozione del kernel disinstallando i pacchetti (se usato il metodo da manuale) o tramite interfaccia ukuu.</p>
<p>Per dubbi e chiarimenti, utilizzate il nostro <a href="https://t.me/gentedilinux">gruppo Telegram</a>.</p>
<p><em>?Good *nix </em><strong>_<em>Mirko</em></strong></p>
