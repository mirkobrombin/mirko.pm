---
title: '#howto - Simulazione di schermi più o meno grandi con xrandr'
published: 2019-06-26
layout: post
author: Davide Galati
author_github: psykedady
tags:

---
<p>Wayland offre diverse ottimizzazioni per HiDPI, nonostante ciò non è ancora possibile sfruttarlo ovunque a causa del supporto software non ancora completo.&nbsp; Possiamo però ottimizzare la nostra esperienza utente su Xorg, grazie a xrandr.</p>
<p>Il metodo che vediamo oggi, ci permette di simulare una particolare risoluzione su uno schermo che, non ufficialmente la supporta.</p>
<h2>Installazione</h2>
<p>Tramite il vostro gestore di pacchetti installate il pacchetto <strong>xrandr</strong>:</p>
<pre><code># Debian/Ubuntu e derivate
apt install xrandr

# Fedora e derivate
dnf install xrandr

# RHEL/Centos e derivate
yum install xrandr

# ArchLinux e derivate
pacman -S xorg-xrandr
</code></pre>

<h2>Utilizzo di xrandr</h2>
<p>Una volta installato il pacchetto, digitando <strong>xrandr</strong> dovremmo ricevere un output simile al seguente:</p>
<pre><code>Screen 0: minimum 8 x 8, current 2390 x 924, maximum 32767 x 32767eDP1 connected primary 1366x768+0+156 (normal left inverted right x axis y axis) 340mm x 190mm  1366x768      60.01*+  1280x720      59.86    60.00    59.74     1024x768      60.00     1024x576      60.00    59.90    59.82     960x540       60.00    59.63    59.82     800x600       60.32    56.25     864x486       60.00    59.92    59.57     640x480       59.94     720x405       59.51    60.00    58.99 680x384       60.00     640x360       59.84    59.32    60.00   
DP1 connected 1024x768+1366+0 (normal left inverted right x axis y axis) 0mm x 0mm  1024x768      60.00 +  75.03    60.00*    1280x768      59.87     800x600       72.19    75.00    60.32     640x480       75.00    72.81    59.94   
HDMI1 disconnected (normal left inverted right x axis y axis)VIRTUAL1 disconnected (normal left inverted right x axis y axis)
</code></pre>
<p>gli schermi riconosciuti vengono elencati con le loro modalità di output, nell'esempio potete vedere il mio schermo primario (quello del notebook) che supporta quelle risoluzioni (come <em>1366x768</em>) e con accanto il refresh rate (60 fps ad esempio)<br />Fate un po' di test con il vostro gestore di impostazioni per capire quali tra le risoluzioni elencate occupano l'intera porzione di schermo del monitor, annotatele e andiamo al passo successivo.</p><p>Supponiamo di voler avere la seguente configurazione: <em>1366x768</em> per il primo schermo e<em> 1280x768 </em>al secondo schermo che però deve emulare uno schermo <em>1920x1152</em>.</p><p>Come fare? Sfruttiamo framebuffer di xorg.</p><p>Troviamo quel numeretto tale che:</p><pre><code>[1280,768] * y= 1920x1152</code></pre><p>potete anche, in modo semplice, fare il passaggio inverso, cioè volendo ampliare ad esempio del doppio il vostro schermo secondario moltiplicate ogni dimensione per due e scegliete quindi la vostra modalità in base al risultato uscito.</p><p>Sempre sull'esempio, il fattore che cerco è di <strong>1.5</strong>, in quanto</p><pre><code>[1280,768] * 1.5= 1920x1152</code></pre><p>Se volessi immaginare uno schermo abbastanza grande da inglobare entrambi i monitor, nella configurazione in cui il secondo monitor &nbsp;sta alla destra del primo, questo monitor sarebbe grande <em>[1920+1366,1152]</em> cioè<em> [3286x1152]</em></p><p>Abbiamo tutti i dati che ci servono, procediamo col comando:</p><pre><code>xrandr --output eDP1 --mode 1366x768 --output DP1 --mode 1280x768 --scale 2x2 1920x1152 --fb 3286x1152 --pos 1366x0</code></pre><p>ora il nostro secondo schermo ha le sembianze di uno schermo <em>1920x1152</em>.</p><p>Supponiamo ora che il nostro schermo del notebook sia <strong>hidpi</strong> <em>2880x1800</em> &nbsp;e che il nostro secondo monitor invece sia un monitor <strong>HD</strong> <em>1920x1080 </em>per complicare un pochino le cose supponiamo anche di volere la predisposizione inversa, il pc a destra e lo schermo esterno a sinistra.&nbsp;<br />Il trucco ora sta nel far si che il secondo schermo, con questo tool, abbia più o meno le stesse dimensioni dello schermo hidpi, così quando porterete una finestra da uno schermo all'altro non avrete tutto ingigantito!</p><ul>	<li>Utilizzando i dati nell'esempio, si possono effettuare i seguenti calcoli:</li>	<li>il fattore di scala che dovrete utilizzare è 1.5, infatti 1920x1080 * 1.5 = 2880x1620</li>	<li>la lunghezza del frame buffer, mettendo gli schermi uno accanto all'altro, è la somma delle due lunghezze, 2880+2880=5760</li>	<li>al contrario l'altezza è semplicemente il massimo delle due quindi 1800</li>	<li>la posizione del monitor esterno è 0x0, si trova a sinistra</li>	<li>la posizione del monitor del pc è invece a destra del monitor esterno, quindi inizia esattamente dalla sua lunghezza virtuale, ovvero 2880x0</li></ul><p>il comando è :</p><pre><code>xrandr --output HDMI-1 --scale 1.5x1.5 --mode 1920x1080 --fb 5760x1800 --pos 0x0 --output eDP-1 --scale 1x1 --mode 2880x1800 --pos 2880x0</code></pre><p>Potete proseguire con la sperimentazione del comando, nel caso di problemi irreparabili, vi basterà scollegare il cavo del monitor per poi ricollegarlo.</p><p>Possiamo inoltre mettere due valori di scala diversi per la larghezza e l'altezza, equiparando in toto le dimensioni del vostro monitor più grande, ma le immagini potrebbero risultare distorte sullo schermo. Potete anche utilizzare questo comando per simulare che uno schermo hidpi sia più piccolo (riportandolo a dimensioni più globalmente compatibili, così che possiate utilizzare anche DE che non supportano nativamente lo scaling).</p><p>Per dubbi e chiarimenti, fate riferimento al nostro <a href="https://t.me/gentedilinux">Gruppo Telegram</a>.</p>