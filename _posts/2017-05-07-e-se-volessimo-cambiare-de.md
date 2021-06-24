---
title: 'E se volessimo cambiare DE?'
published: 2017-05-07
layout: post
author: Giuliano Z.
author_github: linuxhubit
tags:
  - php  
  - gnome  
  - archlinux  
  - systemd
---
Una cosa a cui non sono affatto abituati gli utenti Windows e Mac, è quella di scegliere l'aspetto della scrivania: o meglio il DE. Mentre in GNU/Linux si può scegliere tra vari Desktop Environment: con somma gioia di alcuni e massima dannazione di altri. Mate, Xfce, Gnome, Plasma, Unity, etc sono una delle scelte che si presentano agli utenti del pinguino.Essendo immerso nel progetto <a href="http://unitlinux.org" target="_blank" rel="noopener noreferrer">Unit</a>, che basa il proprio Desktop su Gnome 3.24, ho deciso di installare quest'ultimo nel mio sistema Arch.Avendo sempre poco tempo, il metodo che uso per provare ed imparare è quello di usare il prodotto testato nella vita di tutti i giorni.Così ho fatto per <a href="https://www.deepin.org/it/" target="_blank" rel="noopener noreferrer">deepin</a> in vista della live del 5 maggio<iframe src="https://www.youtube.com/embed/dLDdaoKYz_U" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>Stessa cosa per approfondire la mia conoscenza di Gnome, capire cosa può fare e cosa si può riuscire a farli fare. Questo perché vorremmo mantenere quanto di buono è già stato fatto dal team di Gnome e modificare o creare dal nulla solo quello che sarà l'esperienza utente di Unity 7  nello Unit Desktop.Avrei dovuto quindi abbandonare Mate e non solo... Si perché Gnome si appoggia su Wayland, il server grafico del futuro e per apprezzarlo al meglio ho deciso di abbandonare il classico Xorg che già era installato.<span style="color: #ff0000;"> *</span> Che fare? Reinstallare da pulito il tutto?<blockquote><h3>               No: Con Arch non serve!!</h3></blockquote><h2 style="text-align: center;"></h2><h2 style="text-align: center;">I comandi da dare</h2>Prima di disinstallare Mate e Xorg ho voluto disinstallare Sddm, che è il login manager in Qt che stavo usando da quando precedentemente avevo provato Plasma.Sddm va rimosso con<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -R sddm</span></span></span></pre></blockquote>e disabilitandone definitivamente l'avvio dando<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;"> sudo rm /etc/systemd/system/display-manager.service</span></span></span></pre></blockquote>questo perchè altrimenti non riuscirete ad abilitare l'avvio automatico del prossimo login manager che sceglierete.Per disinstallare Mate basta dare<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;"> pacman - Rsc mate</span></span></span></pre></blockquote>e<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -Rsc mate-utils</span></span></span></pre></blockquote>(per chi, come me le aveva installate)Mentre per disinstallare il server grafico Xorg va dato<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -Rsc xorg-server</span></span></span></pre></blockquote>e<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;"> pacman - Rsc xorg-server-utils</span></span></span></pre></blockquote>(per chi come me le aveva installate)<h3 style="text-align: center;">Pronti per il nuovo DE</h3>[caption id="attachment_579" align="aligncenter" width="300"]<img class="size-medium wp-image-579" src="https://zambolinux.it/wp-content/uploads/2017/05/gnome-2-300x119.jpg" alt="" width="300" height="119" /> GNOME[/caption]per installare Wayland basta un comando:<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -S weston</span></span></span></pre></blockquote>per capirci di più sul funzionamento e sulle differenze da Xorg leggete <a href="https://wiki.archlinux.org/index.php/Wayland" target="_blank" rel="noopener noreferrer">qui</a>se avete letto la Wiki, avrete saputo che non tutte le applicazioni si interfacciano con Wayland (son rimaste poche comunque) per questo è opportuno dare anche<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -S xorg-server-xwayland</span></span></span></pre></blockquote>Incredibile,ma basta questo. Ora avete il famoso Wayland installato e funzionante nel vostro sistema!E Gnome? No, non mi son dimenticato, è che è talmente semplice:<blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">pacman -S gnome</span></span></span></pre></blockquote><blockquote><pre class="western"><span style="color: #333333;"><span style="font-family: Consolas, Monaco, monospace;"><span style="font-size: medium;">sudo systemctl enable gdm.service</span></span></span></pre></blockquote>Vedete che potenzialità ha Arch? E come le cose sembrino difficili, ma in realtà si tratta di pochi comandi? (che fra l'altro potete copiare: grazie a chi scrive guide come queste)E allora, cosa aspettate? Sotto a provare tutti i De che più vi piacciono!<span style="color: #ff0000;">*</span>(<span style="color: #3366ff;">Di rimuovere Mate e Xorg è stata una mia scelta per avere più pulizia:in realtà si potrebbe anche avere più DE nello stesso sistema e sceglierli all'avvio. Ad esempio tramite Login Manager. In questo caso il mio dubbio era sul far convivere due ambienti che abbisognano dei due diversi server grafici e ho preferito non intrigare troppo la faccenda.</span>)