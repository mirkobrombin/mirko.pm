---
title: '#howto - Installazione e configurazione di systemd-boot'
published: 2020-04-15
layout: post
author: Niccolò Martiri
author_github: talebian
tags:
  - bash  
  - systemd
---
<p><strong>Systemd-boot</strong> è un bootloader per sistemi EFI. A differenza di GRUB lavora solo sulla ESP (EFI System Partition) del disco su cui è installato, dove dovrà essere presente anche il kernel e file di configurazione del bootloader.</p>
<h2 id="installazione">Installazione</h2>
<p>In questa parte vedremo come installare <em>systemd-boot</em>: la procedura è simile per tutte le distro, ma l&#39;unico accorgimento che è necessario fare riguarda la posizione dell&#39;ESP e il procedimento di installazione del kernel, che a volte può variare da sistema a sistema.</p>
<p>Il programma per la gestione di systemd-boot è [bootctl] (<a href="https://www.freedesktop.org/software/systemd/man/bootctl.html">https://www.freedesktop.org/software/systemd/man/bootctl.html</a>), che dovrà essere utilizzato sia per installare il bootloader che per visualizzare la configurazione attuale.
Su una ESP possibilmente vuota, eseguiamo il seguente comando come amministratore, presupponendo che l&#39;ESP sia montata su <code>/boot</code>:</p>
<pre><code class="lang-bash"><span class="hljs-keyword">bootctl </span>--path=/<span class="hljs-keyword">boot </span>install
</code></pre>
<h2 id="aggiornamento">Aggiornamento</h2>
<p>Quando necessario, possiamo <strong>aggiornare</strong> tramite l&#39;opzione <em>update</em>:</p>
<pre><code class="lang-bash"><span class="hljs-keyword">bootctl </span>update
</code></pre>
<p>Per assicurarci che systemd-boot sia stato installato correttamente, diamo questo comando:</p>
<pre><code class="lang-bash">bootctl <span class="hljs-keyword">is</span>-installed
</code></pre>
<p>Se l&#39;esito sarà positivo sarà possibile installare <em>linux</em> dal nostro package manager preferito. Per sicurezza, controllare nella ESP di avere <em>vmlinuz-linux</em>.</p>
<h2 id="configurazione">Configurazione</h2>
<p>A differenza di GRUB, sytemd-boot non fornisce una configurazione completa di default, e pertanto toccherà a noi impostare il tutto a dovere.
In seguito all&#39;installazione, con il comando <code>ls</code> eseguito nella ESP dovremo trovare le seguenti cartelle:</p>
<ul>
<li><em>loader</em> con al suo interno <em>loader.conf</em> per la configurazione del bootloader;</li>
<li><em>loader/entries</em>;</li>
<li>In <em>EFI</em> dovranno esserci <em>systemd</em> con al suo interno _systemd<em>bootx64.efi</em> e <em>boot</em> con al suo interno <em>bootx64.efi</em>;</li>
</ul>
<p>I file che interessano a noi sono <em>loader/loader.conf</em> e i file di configurazione che andranno messi dentro <em>loader/entries</em>.</p>
<h3 id="configurare-il-loader">Configurare il loader</h3>
<p>Per prima cosa apriamo <em>loader/loader.conf</em> come amministratori con il nostro editor di testo preferito.
La configurazione di default a noi non interessa, cancelliamola e riscriviamola in questo modo:</p>
<pre><code class="lang-bash">default  distro.<span class="hljs-keyword">conf</span>
timeout  <span class="hljs-number">10</span>
console-<span class="hljs-keyword">mode</span> <span class="hljs-built_in">max</span>
</code></pre>
<p>Ora vediamo ogni parametro a cosa serve:</p>
<ul>
<li><strong>default</strong>: definisce la entry di default, in questo caso distro.conf;</li>
<li><strong>timeout</strong>: il tempo tra la comparsa del menu e l&#39;avvio automatico della entry default;</li>
<li><strong>console-max</strong>: dimensione degli elementi del menu, noi usiamo <em>max</em>, sconsigliato in caso di display HiDPI;</li>
</ul>
<p>Ora salviamo il file e chiudiamolo.</p>
<h3 id="configurare-una-entry">Configurare una entry</h3>
<p>Ora passiamo ai file dentro <em>loader/entries</em>, dove dovranno trovarsi le configurazioni delle singole <em>boot entries</em>. Apriamo la cartella e dentro creiamo il file <em>distro.conf</em>, dove andremo a scrivere:</p>
<pre><code class="lang-bash">title      Nome Distribuzione
linux   /vmlinuz-linux
initrd  /initramfs-linux<span class="hljs-selector-class">.img</span>
options root=PARTUUID=part_uuid_root rw quiet
</code></pre>
<p>Al posto di _part_uuid<em>root</em> dovremo mettere il PARTUUID della nostra root, individuabile con <code>blkid</code>. <em>initramfs-linux.img</em> non è obbligatorio, e varia da distribuzione a distribuzione.</p>
<p>Ora possiamo riavviare, e se tutto è andato liscio dovremmo trovarci di fronte al menù di systemd-boot che dovrebbe di seguito avviare l&#39;entry da noi scelta.</p>
<p>Per maggiori informazioni, non esitate a fare domande sul nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.</p>
