---
title: '#howto – Installare screen su Fedora/Centos/Debian e derivate'
description: "Di norma questo strumento è preinstallato in quasi tutte le distribuzioni GNU/Linux ma, se così non dovesse essere, è possibile in.."
date: 2019-06-02
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:

---
[**Screen**](https://linuxhub.it/article/howto-utilizzo-del-comando-screen) è un potente strumento in grado di controllare più sessioni, dando loro un nome ed assegnandole ad un processo.

## Installazione

Di norma questo strumento è preinstallato in quasi tutte le distribuzioni GNU/Linux ma, se così non dovesse essere, è possibile installarlo dalla repository di sistema.

### Controllo versione

Prima di tutto verifichiamo che non sia già presente nel sistema, richiedendone la versione:

    screen --version

se l'output ricevuto è simile al seguente:

    Screen version 4.05.00 (GNU) 10-Dec-16

significa che screen è già installato sulla nostra macchina. Nel caso in cui l'output è simile al seguente:

    screen: comando non trovato

significa che non è presente.

### Debian, Ubuntu e derivate

Nel caso di Debian, Ubuntu e derivate, possiamo installare il pacchetto tramite **apt**:

    sudo apt install screen

### RHEL/CentOS

Per CentOS (ma anche RHEL), possiamo usare **yum** in questo modo:

    sudo yum install screen

### Fedora

Fedora e spin, dalle versioni più recenti, usano il gestore pacchetti **dnf**, proseguiamo quindi in questo modo:

    sudo dnf install screen

## Utilizzo

Ad installazione completata possiamo ripetere lo step **Controllo versione** per accertarci che tutto sia andato nel verso giusto.

Nel caso di esito positivo, vi rimando a [questa guida](https://linuxhub.it/article/howto-utilizzo-del-comando-screen) sull'utilizzo del comando screen.