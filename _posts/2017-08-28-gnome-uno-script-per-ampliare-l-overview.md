---
title: "Gnome: uno script per ampliare l'overview"
date: 2017-08-28
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github
  - gnome
---
Da ieri è disponibile su <strong>GitHub</strong> uno script che permette di ampliare l'overview di Gnome.Lo script in questione <strong>estende il numero di colonne delle applicazioni</strong> installate, sfruttando meglio lo spazio su grandi schermi.Ad ora non ci é dato sapere se verrà integrata una <strong>GUI per i settaggi dello script</strong>, come numero colonne, dimensione icone ecc.Apprezziamo comunque moltissimo gli sforzi profusi per rendere più efficiente e fruibile Gnome; attorno al quale notiamo sempre un continuo movimento. Buon segno per gli utenti desktop, specie i tanti orfani di Unity che se lo ritroveranno nelle prossime release di Ubuntu.L'installazione é relativamente semplice, composta da <strong>pochi semplici comandi:</strong><pre>$ git clone https://github.com/vbextreme/gnome-overview-conf.git$ cd gnome-overview-conf$ sudo ./install</pre>e per disinstallare:<pre>$ sudo ./uninstall</pre>Lo script viene offerto con una serie di comandi per l'utilizzo e la configurazione.Backup della configurazione corrente:<pre> $ sudo gnome-overview-conf backup</pre>Ripristino della configurazione in backup:<pre> $ sudo gnome-overview-conf restore</pre>Vedere la configurazione corrente:<pre> $ gnome-overview-conf view</pre>Modificare uno o più valori della configurazione:<pre> $ sudo gnome-overview-conf max_columns 10 min_rows 5 icon_size 64 horizontal 112 vertical 120</pre>una volta modificata la configurazione é necessario ricaricare la shell, tramite combinazione di tasti <strong>ALT+F2</strong> digitiamo nel form proposto <strong>r</strong> e diamo invio.<strong>Git</strong> | <a href="https://github.com/vbextreme/gnome-overview-conf">https://github.com/vbextreme/gnome-overview-conf</a>