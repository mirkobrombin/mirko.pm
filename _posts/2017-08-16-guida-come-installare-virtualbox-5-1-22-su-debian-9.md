---
title: 'Guida come installare VirtualBox 5.1.22 su Debian 9'
date: 2017-08-16
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - debian
---
VirtualBox è un software hypervisor gratuito e aperto, che consente di creare e gestire sistemi operativi guest ("macchine virtuali") come Linux e Windows.Ora vedremo come installare VirtualBox su Debian StretchPrima operazione andremo ad aggiungere alla sources.list i repository VirtualBoxAprire il terminale e digitare questo comando :<pre>sudo nano /etc/apt/sources.list</pre>e aggiungiamo la seguente riga :<pre>deb http://download.virtualbox.org/virtualbox/debian stretch contrib</pre>salviamo ctrl-o e chiudiamo con ctrl-xora aggiungiamo la chiave di firma di oracle VirtualBox con il seguentecomando :<pre>wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -</pre>e aggiorniamo con il comando .<pre>sudo apt-get update</pre>ora installeremo VirtualBox 5.1.22 con il seguente comando :<pre>sudo apt-get install virtualbox-5.1</pre>Installare i pacchetti dkms per assicurarsi che i moduli host virtuali siano aggiornati correttamente, se la versione del kernel cambia durante il prossimo aggiornamento.<pre>sudo apt-get install dkms</pre>