---
class: post
title: '#howto - Installare una versione specifica di un pacchetto su CentOS, Fedora, Debian, Ubuntu e derivate'
date: 2021-02-22
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - ubuntu  - centos  - bash
---
> Questa guida è stata inizialmente scritta in data 9 marzo 2018 da Mirko Brombin e revisionata e aggiornata quasi tre anni dopo da Alessandro Zangrandi.

Solitamente, quando si installa un pacchetto o un software su una distribuzione Linux, il programma di gestione dei pacchetti seleziona l'ultima versione del pacchetto dalla repository, per impostazione predefinita.

A volte, tuttavia, per problemi di compatibilitá e/o attività particolari, si potrebbe aver bisogno di una versione diversa e ben specifica di quel pacchetto o quel software.

In questa nuova guida spiegheró **come installare una versione specifica di un software/pacchetto** tramite `yum` (per CentOS e Fedora) ed `apt` (per Ubuntu e derivate).

## Procedimento per CentOS/Fedora

Grazie all'istruzione `--showduplicates` è possibile conoscere quante versioni del pacchetto a cui siamo interessati sono disponibili nelle repository. Nel mio caso specifico, è installata la versione  <strong>2.4.6.67.el7.centos.6</strong> del software <strong>httpd</strong> (Apache) del repository <strong><em>updates</em></strong>. Ricapitolando dunque la lettura dell'output avremo:

<ul>
	<li>A sinistra: nome del pacchetto</li>
    <li>Al centro: versione del pacchetto</li>
    <li>A destra: repository in cui il pacchetto si trova</li>
</ul>

Qualora volessimo installare una versione precedente del pacchetto `httpd`, è cosa buona e giusta disinstallare la versione attuale del software:
```bash
yum remove httpd
```
o, genericamente:
```bash
yum remove "software/pacchetto"
```

Per installare la versione del pacchetto che ci interessa, (come esempio useremo la versione <strong>2.4.6.67.el7.centos.2</strong> di Apache) dovremo digitare:
```bash
yum install httpd-2.4.6.67.el7.centos.2
```
## Procedura per Debian, Ubuntu e derivate

Per questa famiglia di distribuzioni, invece, che basano la gestione dei pacchetti su APT, possiamo fare la stessa cosa grazie all'istruzione:
```bash
apt-cache policy "nome pacchetto"
```
Con questo comando sarà possibile scoprire quante versioni del software/pacchetto sono presenti nei repository ed eventualmente installare una versione precedente. Come esempio useremo Firefox:
```bash
apt-cache policy firefox
```
con il comando che ci darà un output simile al seguente:
```bash
firefox:  Installato: 58.0.2+build1-0ubuntu0.16.04.1  Candidato:  58.0.2+build1-0ubuntu0.16.04.1  Tabella versione: *** 58.0.2+build1-0ubuntu0.16.04.1 500        500 http://de.archive.ubuntu.com/ubuntu xenial-updates/main amd64 Packages        500 http://security.ubuntu.com/ubuntu xenial-security/main amd64 Packages        100 /var/lib/dpkg/status     45.0.2+build1-0ubuntu1 500        500 http://de.archive.ubuntu.com/ubuntu xenial/main amd64 Packages
```
La versione installata sul sistema è la <strong>58.0.2+build1-0ubuntu0.16.04.1</strong>. Qualora volessimo installare la versione <strong>45.0.2+build1-0ubuntu1</strong>, possiamo digitare:
```bash
apt remove firefox
apt install firefox=45.0.2+build1-0ubuntu1
```

