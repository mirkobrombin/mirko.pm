---
title: 'Virtualbox 5.2.8 disponibile e supporta il kernel Linux 4.15'
date: 2018-03-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:

---
Oracle ha rilasciato una nuova versione stabile di Virtualbox, il noto software di virtualizzazione open source e multipiattaforma , aggiungendo il supporto al <strong>kernel Linux 4.15</strong> per i guest Linux, oltre ad introdurre numerosi miglioramenti.<strong>VirtualBox 5.2.8</strong> è ora disponibile per il download, portando infine il supporto al kernel di Linux 4.15 per sistemi operativi guest basati su Linux che potresti voler eseguire sulle tue macchine virtuali, questo comporta inoltre la compatibilitá dei moduli col kernel 4.15.VirtualBox 5.2.8 risolve finalmente il fastidioso problema della schermata nera che si verificava quando <strong>3D</strong> veniva abilitato in alcuni guest Linux e aggiunge il supporto per sopprimere <strong>setuid</strong> e <strong>setgid</strong> nelle <strong>cartelle</strong> <strong>condivise</strong>.<h2>Miglioramenti di frontend, audio, storage e networking</h2>Un altro miglioramento interessante implementato dagli ingegneri di <strong>Oracle</strong> nell'ultima versione di VirtualBox è il supporto per le funzioni <strong>CPU</strong> <strong>PCID</strong>, <strong>FSGSBASE</strong> e <strong>INVPCID</strong> per i guest Linux, Mac OS X, FreeBSD, Solaris e Windows. Inoltre, l'aggiornamento risolve un problema <strong>EMM386</strong> durante il rilevamento di una base di frame.Oracle ha aggiornato il frontend dell'applicazione per utilizzare i download via ssl (HTTPS) durante l'aggiornamento dell'app o altri componenti, corregge una regressione senza problemi causata dalla funzionalità <strong>wm_class</strong> sui sistemi Linux e l'arresto anomalo che si verificava durante l'apertura della procedura guidata per una <strong>Nuova macchina</strong> su tutte le piattaforme supportate.Sul fronte audio, VirtualBox 5.2.8 aggiunge il supporto per l'identificazione delle sorgenti di registrazione nel mixer audio <strong>PulseAudio</strong> sul sistema operativo host quando si utilizzano più macchine virtuali allo stesso tempo, migliora il back-end <strong>DirectSound</strong>, l'emulazione <strong>HDA</strong> e le impostazioni surround per i guest Windows.Un paio di correzioni di rete sono presenti anche in questa nuova versione, migliorando l'avvio <strong>PXE</strong> per le schede <strong>E1000</strong> e aggiungendo una soluzione alternativa per i guest piú datati che non sono in grado di abilitare il <strong>bus</strong> <strong>mastering</strong> per il dispositivo virtio <strong>PCI</strong>.L'aggiornamento dovrebbe essere presto disponibile nelle repo ufficiali delle varie distribuzioni, mentre lo é giá per <strong>OpenSUSE</strong> <strong>Tumbleweed</strong> e <strong>Fedora</strong>.<strong>Download</strong> | <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank" rel="noopener noreferrer">https://www.virtualbox.org/wiki/Downloads</a><strong>Changelog</strong> | <a href="https://www.virtualbox.org/wiki/Changelog" target="_blank" rel="noopener noreferrer">https://www.virtualbox.org/wiki/Changelog</a>