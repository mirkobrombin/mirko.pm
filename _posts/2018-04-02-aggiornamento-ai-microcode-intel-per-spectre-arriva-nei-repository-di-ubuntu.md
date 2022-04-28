---
title: 'Aggiornamento ai Microcode Intel per Spectre arriva nei repository di Ubuntu'
date: 2018-04-02
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ubuntu
---
Il 22 gennaio 2018, Canonical sostituì il firmware del microcode Intel in versione 20180108 con la versione 20170707 precedente su richiesta di Intel, quindi non proteggeva più i computer degli utenti dalla vulnerabilità della sicurezza Spectre che poteva consentire a un utente malintenzionato locale di esporre informazioni sensibili dalla memoria del kernel.<blockquote>Jann Horn ha scoperto che i microprocessori che utilizzano l'esecuzione speculativa e la predizione del branch, possono consentire letture non autorizzate della memoria tramite attacchi di canale laterale.Questo difetto è noto come Spectre. Un utente malintenzionato locale può utilizzare questo per esporre informazioni sensibili, inclusa la memoria del kernel (CVE-2017-5715 ).</blockquote>cita l'advisory sulla sicurezza.Mentre gli utenti rimasero senza una soluzione ufficiale per mesi, il <strong>22 febbraio 2018</strong>, Canonical ha rilasciato nuovi aggiornamenti del kernel per tutte le versioni di Ubuntu supportate per fornire una soluzione in grado di mitigare <strong>Spectre</strong> nella sua seconda variante, su entrambe le architetture hardware <strong>amd64</strong> e <strong>i386</strong>.A partire dal <strong>29 marzo 2018</strong>, il nuovo firmware Intel contenente le attenuazioni per la vulnerabilità di sicurezza di Spectre sulle CPU Intel è di nuovo disponibile nei repository software di Ubuntu. Secondo la consulenza sulla sicurezza, questo include gli aggiornamenti microcode corretti necessari per gli aggiornamenti del kernel di Ubuntu.La nuova versione <strong>20180312</strong> del firmware Intel può essere installata su Ubuntu 17.10 (Artful Aardvark), Ubuntu 16.04 LTS (Xenial Xerus) e Ubuntu 14.04 LTS (Trusty Tahr), nonché su tutti i loro derivati, incluso Kubuntu , Xubuntu, Lubuntu, Ubuntu MATE, Ubuntu Budgie e Ubuntu Kylin.Sono supportate sia le installazioni a 64-bit che 32-bit. Canonical invita gli utenti ad aggiornare alla nuova versione del microcode Intel il prima possibile.<strong>CVE-2017-5715</strong> | <a href="https://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-5715.html">https://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-5715.html</a><strong>[USN-3531-3] intel-microcode update</strong> | <a href="https://lists.ubuntu.com/archives/ubuntu-security-announce/2018-March/004335.html">https://lists.ubuntu.com/archives/ubuntu-security-announce/2018-March/004335.html</a><strong>Piú info su Meltdown &amp; Spectre</strong> | <a href="https://linuxhub.it/?s=spectre">https://linuxhub.it/?s=spectre</a>