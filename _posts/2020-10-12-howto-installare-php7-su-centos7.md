---
title: '#howto - Installazione di PHP 7 su CentOS 7 e derivate'
date: 2020-10-12
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql  - fedora  - php  - bash
---
> Questa guida è stata inizialmente scritta in data 13 ottobre 2017 da Mirko Brombin e revisionata e aggiornata quasi tre anni dopo da Alessandro Zangrandi. Versione originale visibile a [questa pagina](https://archive.vn/xHcFG).

Come ben sapete, nei repository di **CentOS** è presente la versione 5.4 di PHP che ha da poco raggiunto l'**EOL (end-of-life)**. Installare dunque una versione di **PHP** (PHP 7) aggiornata e che riceve update di sicurezza è sicuramente "cosa buona e giusta" nella maggior parte dei casi

## Installazione di PHP 7

Per prima cosa vanno installati ed abilitati i repository **EPEL** e **Remi**:

```bash
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
```

L'installazione di **yum-utils**, una raccolta di programmi utili per gestire pacchetti e repository, non è obbligatoria ma fortemente consigliata per queste situazioni. Questo tool estende semplicemente le funzioni base di yum stesso, e può essere usato per gestire (abilitare e disabilitare) repository così come pacchetti senza alcuna configurazione manuale, e molto altro. Per installarlo possiamo procedere così:

```bash
yum install yum-utils
```

Tra i tools presenti in yum-utils troviamo **yum-config-manager**, che può essere usato per abilitare il repo Remi come repo di default per installare una versione di PHP differente:

```bash
yum-config-manager --enable remi-php73
```

installerà PHP 7.3, mentre se volessimo invece PHP 7.4 possiamo procedere in questo modo:

```bash
yum-config-manager --enable remi-php74
```

Non ci resta quindi che installare PHP 7 ed i moduli necessari per eseguire moltissime applicazioni scritte in PHP:

```bash
yum install php php-mcrypt php-cli php-gd php-curl php-mysql php-ldap php-zip php-fileinfo
```

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).