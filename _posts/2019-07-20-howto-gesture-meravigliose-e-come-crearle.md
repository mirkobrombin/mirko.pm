---
title: '#howto - Gesture meravigliose e come crearle'
published: 2019-07-20
layout: post
author: Davide Galati
author_github: psykedady
tags:

---
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
        <title>Installazione</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css" integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/markdown.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/highlight.css">
        <link href="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.css" rel="stylesheet" type="text/css">
        <style>
.task-list-item { list-style-type: none; } .task-list-item-checkbox { margin-left: -20px; vertical-align: middle; }
</style>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', 'Ubuntu', 'Droid Sans', sans-serif;
                font-size: 14px;
                line-height: 1.6;
            }
        </style>
        
        <script src="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.js"></script>
    </head>
    <body>
        <p>Invidiabili le gesture di MacOS?<br>
Vediamo come ottenere la stessa esperienza sulla nostra distribuzione Linux preferita!<br></p>
<p>In ambienti Linux possiamo trovare (nel bene e nel male) degli strumenti per la configurazione delle gesture del nostro touchpad. Nel particolare quello di cui vi vorrei parlare oggi è <strong>libinput-gestures</strong>, usato oltretutto da GNOME nella sua configurazione base (anche su Wayland).<br></p>
<h2 id="Installazione">Installazione</h2>
<p>Per prima cosa installiamo libinput e libinput-gestures:<br></p>
<pre><code><div># Debian/Ubuntu e derivate
sudo apt install libinput libinput-gestures

# Fedora e derivate
sudo dnf install libinput libinput-gestures

# Archlinux 
sudo pacman -S libinput
## nota - libinput-gestures si trova su AUR
</div></code></pre>
<br>
è inoltre consigliata l'installazione di wmctrl e xdotool:<br>
<pre><code><div># Debian/Ubuntu e derivate
sudo apt install wmctrl xdotool

# Fedora e derivate
sudo dnf install wmctrl xdotool

# Archlinux
sudo pacman -S wmctrl xdotool
</div></code></pre>
<br>
## Preparazione
<p>Prima di procedere con la pratica, vediamo quali sono i risultati che vogliamo ottenere, condivido quelle che sono le mie intenzioni ed i risultati che ho ottenuto:<br></p>
<ul>
<li>swipe alto con 4 dita: nascondi desktop</li>
<li>swipe basso con 4 dita: nascondi desktop</li>
<li>swite a sinistra con 4 dita: prossimo desktop</li>
<li>swite a destra con 4 dita: desktop precedente</li>
<li>swipe in alto con 3 dita: mostra i desktop</li>
<li>swite in basso con 3 dita: mostra le finestre aperte in questo desktop</li>
<li>swite a sinistra con 3 dita: prossimo desktop</li>
<li>swite a destra con 3 dita: desktop precedente</li>
<li>pinch verso l'esterno con due dita: ingrandisci il desktop</li>
<li>pinch verso l'interno con due dita: rimpicciolisci il desktop
<br></li>
</ul>
<blockquote>
<p><u>NOTA:</u><br>
Da tenere in considerazione che le vostre possibilità sono altamente influenzate dal DE che userete. Infatti con xfce4 ad esempio non vi è modo di presentare i desktop, e per presentare le finestre avrete bisogno di altri tool come <strong>skippy-xd</strong>.
Quindi scegliete in base alle possibilità offerte dal vostro DE.</p>
</blockquote>
<h2 id="Configurazione">Configurazione</h2>
<p>Procediamo con la creazione (o modifica) del file:<br></p>
<p><code>$(HOME)/.config/libinput-gestures.conf</code><br></p>
<p>Assocciando ad ogni azione un comando nel seguente formato: <br>
<code>&lt;azione touchpad&gt; &lt;comando&gt;</code><br></p>
<p>Il mio file di configurazione, in base alle intenzioni precedentemente citate, è il seguente:<br></p>
<pre><code><div>gesture swipe up 4 wmctrl -k on
gesture swipe down 4 wmctrl -k off
gesture swipe left 4 xdotool key ctrl+alt+n
gesture swipe right 4 xdotool key ctrl+alt+p

gesture swipe up 3 xdotool key super+w
gesture swipe down 3 xdotool key super+s
gesture swipe left 3 xdotool key ctrl+alt+n
gesture swipe right 3 xdotool key ctrl+alt+p

gesture pinch out 2 xdotool key super+shift+p
gesture pinch in 2 xdotool key super+shift+m
</div></code></pre>
<br>
<p>possiamo trovare maggiori informazioni e combinazioni dal file fornito di base al percorso:<br>
<code>/etc/libinput-gestures.conf</code></p>
<p>Nell'esempio qui sopra di configurazione, il comando <strong>xdotool key</strong>, consente sotto <strong>Xorg</strong> di inviare una determinata combinazione di tasti, come se li aveste realmente premuti, è importante quindi impostare delle shortcut nel caso in cui voleste sfruttare questa configurazione.<br></p>
<p>Concludo questa guida con alcune considerazioni.</p>
<ul>
<li><strong>libinput-gestures</strong> va avviato con il sistema. quindi scrivetevi un file <code>.desktop</code> ( o usate le impostazioni di avvio del vostro DE) richiamando <strong>lininput-gestures</strong> come comando.</li>
<li>non è purtroppo possibile con xorg e libinput in coppia variare le impostazioni in base all'accelerazione (ad esempio &quot;pizzicare&quot; maggiormente per ingrandire), esistono comunque altri gestures-manager come &quot;<strong>fusuma</strong>&quot; che permettono di farlo.</li>
<li>per capire se funziona o no <code>libinput</code>, potete usare <code>libinput-debug-events</code> e <code>libinput-debug-gui</code>, il loro utilizzo è abbastanza semplice.</li>
<li>consiglio inoltre ad ogni riavvio da sospensione o ibernazione di digitare <strong>libinput-gestures-setup restart</strong>  per riavviare il servizio, poichè potrebbe smettere di funzionare.</li>
</ul>

    </body>
    </html>