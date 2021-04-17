---
title: '#howto - Creare un servizio o timer di systemd'
published: 2020-01-11
layout: post
author: Davide Galati
author_github: psykedady
tags:
  - ubuntu  - bash  - systemd  - bash  - systemd
---
<p>Oggi vediamo come programmare un servizio per systemd, il tutto cercando di riassumere e semplificare le già abbondanti documentazioni della freedesktop ( <a href=https://www.freedesktop.org/software/systemd/man/systemd.service.html>qua per la sezione service</a>, <a href="https://www.freedesktop.org/software/systemd/man/systemd.exec.html#">qua per il log degli eventi</a> e <a href="https://www.freedesktop.org/software/systemd/man/systemd.unit.html">qua per unit e install</a> )</p>
<h2 id="un-generico-service">Un generico service</h2>
<p>Vediamo innanzitutto la struttura di un generico service. I servizi si dividono in tre sezioni:</p>
<ul>
<li><p><strong>Unit</strong>, descrive il servizio, il modo in cui è avviato, i processi che dipendono da esso o quelli da cui dipende, il modo in cui si relaziona al sistema.</p>
</li>
<li><p><strong>Service</strong>, descrive il comando o lo script eseguito, come viene eseguito, quante volte e quando considerarlo un fallimento.</p>
</li>
<li><p><strong>Install</strong>, ulteriori specifiche su come il sistema deve abilitare il servizio, eventuali alias con cui collegarlo, quante unità attiva con se e la cartella in cui verrà collegato.</p>
</li>
</ul>
<p>Ogni sezione ha diverse opzioni disponibili, vediamo uno schema generico:</p>
<pre><code>[Unit]
Description=una descrizione
After=lista <span class="hljs-keyword">di</span> servizi che vengono prima

Before=lista <span class="hljs-keyword">di</span> servizi che vengono dopo

Condition...=<span class="hljs-keyword">se</span> non verificata, il servizio non viene eseguito 
altro, esistono vari tipi <span class="hljs-keyword">di</span> condition! ConditionHost,ConditionPathExist..etc


[Service]
<span class="hljs-keyword">Type</span>=indica il tipo <span class="hljs-keyword">di</span> servizio, simple, exec, forking, oneshot, dbus, notify o idle

RemainAfterExit=true o false, indica <span class="hljs-keyword">se</span> il processo deve rimanere <span class="hljs-keyword">in</span> esecuzione anche dopo <span class="hljs-keyword">l</span>'avvio

ExecStart=<span class="hljs-keyword">qui</span> inserite lo script o  il comando da eseguire 

ExecStop=<span class="hljs-keyword">qui</span> indicare <span class="hljs-keyword">ci</span>ò che viene eseguito quando viene terminato il processo

Restart=indica <span class="hljs-keyword">se</span> il processo deve essere eseguito più volte, ad esempio al successo, al fallimento, sempre... viene configurato con un <span class="hljs-keyword">timer</span> (valori: <span class="hljs-keyword">no</span>, <span class="hljs-keyword">on</span>-success, <span class="hljs-keyword">on</span>-failure, <span class="hljs-keyword">on</span>-abnormal,<span class="hljs-keyword">on</span>-abort,always...)

RestartSec=tempo prima <span class="hljs-keyword">di</span> fare restart

TimeoutStartSec=indica quanto tempo deve bloccare <span class="hljs-keyword">l</span>'avvio prima <span class="hljs-keyword">di</span> dire che un servizio è o non è fallito

TimeoutStopSec=idem <span class="hljs-keyword">di</span> sopra <span class="hljs-keyword">ma</span> con lo script eseguito <span class="hljs-keyword">in</span> chiusura

Standard...=StandardOutput <span class="hljs-keyword">e</span> StandardError (sono due opzioni distinte), cioè dove vengono stampati errori o messaggi, i valori possono essere journal, tty, journal+console, <span class="hljs-keyword">file</span>:/path/per/<span class="hljs-keyword">file</span> (sarà cancellato <span class="hljs-keyword">se</span> esiste), <span class="hljs-keyword">append</span>:/path/per/<span class="hljs-keyword">file</span> (aggiunge alla fine) <span class="hljs-keyword">e</span> altri. Guardare il link sul logging


[Install]
WantedBy=indica <span class="hljs-keyword">la</span> cartella <span class="hljs-keyword">in</span> cui viene collegato il servizio
</code></pre><p>Tagliamo subito la testa al toro:</p>
<ul>
<li>sono tutte necessarie? no!</li>
<li>ne esistono altre di opzioni? Sì, guarda i link di sopra</li>
</ul>
<p>Inoltre potete mettere in alcune opzioni dei parametri speciali, ad esempio <em>%L che sta per log directory</em>,  o <em>%n che indica il nome del file di service</em>, trovate tutto nelle documentazioni ufficiali.</p>
<h2 id="servizio-di-avvio">Servizio di avvio</h2>
<p>Scriviamo ad esempio un servizio di <u>avvio</u> generico, studiamone la struttura, testiamolo e mettiamolo in funzione. Un po&#39; come il vecchio file <code>/etc/rc.local</code> che forniva ubuntu nelle sue installazioni.</p>
<p>Innanzitutto scriviamo uno script che deve essere avviato ogni accensione, non importa cosa sia, ma <strong>ricordate</strong> che questo script <u>sarà avviato con privilegi elevati</u> (<em>root</em>).</p>
<p>Poniamo ad esempio che il file sia:
<code>/etc/avvio</code></p>
<p>All&#39;interno ricordate che la prima riga deve essere<code>#!/bin/bash</code></p>
<p>e dopo che avete finito lo script, dovete renderlo eseguibile<code>sudo chmod +x /etc/avvio</code></p>
<p>Poi scrivete il file
<code>/etc/systemd/system/avvio.service</code></p>
<p>All&#39;interno scrivete:</p>
<pre><code>[Unit]
 <span class="hljs-attr">Description=Esegue</span> /etc/avvio
 <span class="hljs-attr">ConditionPathExists=/etc/avvio</span>

[Service]
 <span class="hljs-attr">Type=oneshot</span>
 <span class="hljs-attr">ExecStart=/etc/avvio</span>
 <span class="hljs-attr">StandardOutput=journal</span>

[Install]
 <span class="hljs-attr">WantedBy=multi-user.target</span>
</code></pre><p>Non è difficilissimo da leggere, ma facciamo un riepilogo:</p>
<p>La sezione <code>[Unit]</code> fornisce una descrizione del servizio attraverso l&#39;opzione <strong>Description</strong> e poi verifica che lo script da eseguire esista tramite <strong>ConditionPathExist</strong>.</p>
<p>La parte <code>[Service]</code> ci dice che il comando è <strong>oneshot</strong>, cioè viene semplicemente eseguito, 
Lo <strong>StandardOutput</strong> dice dove avverrà il log della riuscita o del fallimento (ed eventuali stampe), nel nostro caso il journal.</p>
<p>La parte <code>[Install]</code> ci dice che il file verrà eseguito nella cartella <em>multi-user</em> tramite opzione <strong>WantedBy</strong>.
Su questo spendo giusto qualche parolina per spiegare cosa sono i livelli di running:<br>Nei sistemi Linux l&#39;avvio è sottoposto a più fasi, detti livelli:</p>
<ul>
<li><strong>livello 0</strong> è il livello di spegnimento (<em>poweroff</em> ), raggiunto quando il pc viene spento </li>
<li><strong>livello 1</strong> livello di emergenza (<em>rescue</em> ), è intermedio tra l&#39;avvio del sistema hardware e quello software</li>
<li>da <strong>livello 2</strong> a <strong>livello 4</strong> si parla di livelli utente (<em>multi-user</em> ), ed è la fase di avvio del nostro sistema </li>
<li><strong>livello 5</strong> è il livello grafico (<em>graphic</em> ), usato dal nostro display manager</li>
<li><strong>livello 6</strong> è il livello di spegnimento o riavvio (<em>reboot</em> ) in cui il sistema torna a livello 0</li>
</ul>
<p>Il sistema dei livelli è stato ridefinito su systemd con i target, che ha aggiunto diversi stadi come lo sleep.target o il target network, <a href="https://www.freedesktop.org/software/systemd/man/systemd.special.html">qua</a> trovate tutti i target.<br>Ora dovrebbe esservi chiaro perchè, a meno che non sia uno script abbastanza importante, è difficile vedere services con target diversi da <em>multi-user.target</em>.</p>
<p>Testate il nuovo servizio scritto con:
<code>systemctl start avvio.servizio</code>  </p>
<p>Potete poi chiedere che venga avviato insiema al sistema con
<code>systemctl enable avvio.service</code></p>
<p>Sul nostro canale <a href="https://t.me/gentedilinux_feed/598">feed</a> di telegram trovate altri trick per l&#39;amministrazione dei servizi di systemd.</p>
<h2 id="trim-ssd-all-avvio">Trim SSD all&#39;avvio</h2>
<p>Proviamo quindi a fare un servizio per fare il trim di un SSD all&#39;avvio del PC:</p>
<pre><code>[Unit]
 <span class="hljs-attr">Description=Esegue</span> il trim dell'ssd

[Service]
 <span class="hljs-attr">Type=oneshot</span>
 <span class="hljs-attr">ExecStart=fstrim</span> -v /
 <span class="hljs-attr">StandardOutput=journal</span>

[Install]
 <span class="hljs-attr">WantedBy=multi-user.target</span>
</code></pre><p>Come notate non ho richiamato uno script, ma direttamente il comando che volevo eseguire.<br>Ovviamente è la stessa cosa: potrei richiamare lo script <code>/etc/avvio.sh</code> dentro il quale ho scritto l&#39;operazione, ma questo tendezialmente potrebbe portarmi a scrivere più operazioni nello stesso file. Inoltre, <u>È sempre bene separare il più possibile la lista di operazioni</u>, questo per avere sempre chiaro eventualmente i dettagli sul fallimento dell&#39;avvio o anche semplicemente perché queste operazioni andranno ad aumentare i tempi di avvio del nostro sistema e potremmo voler sapere quali di queste operazioni vogliamo eliminare.</p>
<h2 id="systemd-timer">systemd timer</h2>
<p>Ad ogni service si può associare un timer, questa pratica potrebbe essere utile ad esempio se vogliamo che un determinato script venga ripetuto ogni settimana oppure ogni minuto piuttosto che ogni accesso. 
Associamo al nostro <em>avvio.service</em> un <code>avvio.timer</code> e inseriamo anche questo nella cartella <code>/etc/systemd/system</code>
Scriviamo al suo interno:</p>
<pre><code><span class="hljs-symbol">[</span>Unit<span class="hljs-symbol">]</span>
Description=un timer associato ad avvio.service

<span class="hljs-symbol">[</span>Timer<span class="hljs-symbol">]</span>
Unit=avvio.service
OnUnitActiveSec=1us
OnUnitInactiveSec=10s

<span class="hljs-symbol">[</span>Install<span class="hljs-symbol">]</span>
WantedBy=multi-user.target
</code></pre><p>Sulle sezioni <strong>Unit</strong> e <strong>Install</strong> ho poco da dire, sono le stesse di sopra.
Diversa la sezione <strong>Timer</strong> però; in questa sezione dobbiamo inserire fondamentalmente alune informazioni: che unità far partire, quando il timer deve partire, ogni quanto il comando deve ripetersi.</p>
<p>Innanzitutto:</p>
<ul>
<li>Unit=per indicare la unità da avviare</li>
</ul>
<p>Per quanto riguarda i tempi di attivazione invece:</p>
<ul>
<li>OnActiveSec=quanti secondi dopo l&#39;avvio del timer</li>
<li>OnBootSec=quanti secondi dopo l&#39;avvio del pc</li>
<li>OnStartupSec=quanti secondi dopo l&#39;avvio di systemd (poco usato)</li>
<li>OnUnitActiveSec=quanti secondi dopo l&#39;attivazione dell&#39;unità di riferimento</li>
<li>OnUnitInactiveSec=quanti secondi dopo che l&#39;unità diventa inattiva</li>
</ul>
<p>Le unità di tempo impostabili sono</p>
<ul>
<li>us =microsecondo</li>
<li>ms =millisecondo</li>
<li>s =sec</li>
<li>m =minuto</li>
<li>h =ora</li>
<li>d =giorno</li>
<li>w =settimana </li>
<li>M =mese</li>
<li>y =anno</li>
</ul>
<p>I tempi di attivazione, se combinati, danno vita al tempo di ripetizione. Supponiamo di avere <strong>OnActiveSec=1us</strong> e <strong>OnUnitInactiveSec=10s</strong>, il timer una volta dato lo start da <strong>systemd</strong> si avvierebbe subito (<em>1 microsecondo</em> ), terminerebbe il job, e l&#39;unità diventerebbe inattiva attivando il timer da <strong>10s</strong>. Possiamo ovviamente usare anche <strong>OnUnitActiveSec</strong> con la stessa logica.  </p>
<p>Possiamo attivare un giorno preciso di attivazione attraverso:</p>
<ul>
<li>OnCalendar =valore in formato yyyy-MM-gg hh:mm:ss o simili</li>
</ul>
<p>Abbiamo inoltre le alcune opzioni speciali:</p>
<ul>
<li>AccuracySec =una volta raggiunto il timeout del timer, quanti secondi può ritardare l&#39;opzione se il processo non può essere avviato subito</li>
<li>WakeSystem =se il sistema è sospeso, può svegliarlo se questo parametro è impostato a true </li>
<li>RemainAfterElapse =se il timer non ha un tempo di ripetizione, può rimanere in memoria se impostato a true</li>
</ul>
<p><strong>Attenzione</strong> i timer di systemd non sono precisi sotto il minuto, e hanno un delay anche notevole a volte. Ha più senso usare i timer di systemd per job settimanali o giornalieri che non devono essere precisi al secondo, anche impostando AccuracySec ho riscontrato ritardi.<br><a href="https://www.freedesktop.org/software/systemd/man/systemd.timer.html">Qui</a> potete trovare ulteriori informazioni sui timer di systemd </p>
<p>Per avviare un servizio tramite un timer, non va avviato il servizio, ma il timer stesso:
<code>systemctl start avvio.timer</code></p>
<p>In caso di dubbi o particolari domande, potete entrare nel <a href="https://t.me/gentedilinux">gruppo Telegram</a> ufficiale di linux/hub.</p>
