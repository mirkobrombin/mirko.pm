---
title: '#howto - Compressione di un file o di una cartella (gz, tar, bz2, zip, rar, 7z)'
description: "Spesso, per diminuire il peso di un file o raggruppare tanti documenti (o cartelle) si ricorre alla compressione in archivi.."
date: 2019-07-02
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:

---
Spesso, per diminuire il peso di un file o raggruppare tanti documenti (o cartelle) si ricorre alla compressione in archivi. Sono molti i formati in cui è possibile creare un archivio.

In questa guida vedremo come creare degli archivi utilizzando noti formati. Se volete invece decomprimere degli archivi creati con questi formati, consultate questa [guida](https://linuxhub.it/article/howto-decompressione-di-un-archivio-gz-tar-bz2-zip-rar-7z),

## Gz

Per comprimere un file in .gz, possiamo usare il comando gzip:

    gzip file

Di norma, durante la compressione i file originali vengono eliminati. Per evitare che ciò accada, basta semplicemente aggiungere la flag -k al comando:

    gzip -k file

Con gzip non è possibile creare un archivio comprimendo delle cartelle.

## Bzip2

Per comprimere un file in .bz, possiamo usare il comando bzip2:

    bzip2 file

Di norma, durante la compressione i file originali vengono eliminati. Per evitare che ciò accada, basta semplicemente aggiungere la flag -k al comando:

    bzip2 -k file

Anche con Bzip2 non è possibile comprimere cartelle.

## Zip

Uno dei formati più utilizzati per gli archivi è .zip: essi possono essere creati utilizzando il comando zip (in molti sistemi non è pre-installato).

Per installarlo, è sufficiente eseguire il seguente comando (in base alla distribuzione utilizzata è necessario usare il gestore di pacchetti fornito con essa):

    # Debian/Ubuntu e derivateapt install zip# RHEL/Centos e derivateyum install zip# Fedora e derivatednf install zip# Arch Linux e derivatepacman -S zip

Per creare un archivio in .zip basta semplicemente utilizzare il comando zip (l'asterisco viene usato per aggiungere all'archivio tutti i file presenti nella cartella in cui ci si trova)

    zip nome_archivio *

Per includere tutti i file (anche quelli nascosti) e le sottocartelle in un archivio, possiamo usare la flag -r:

    zip -r nome_archivio .

## Tar

Per archiviare dei file o delle cartelle in un file con estensione .tar è sufficiente utilizzare l'omonimo comando insieme ad una flag:

    tar -czvf nome_archivio.tar /path/cartella-o-file

Vediamo cosa significano le lettere presenti nella flag:

*   -c: Crea un archivio
*   -z: Comprime l'archivio con gzip
*   -v: Attiva la verbose mode che ci permette di vedere in tempo reale cosa il nostro sistema sta comprimendo (opzionale)
*   -f: Ci permette di dare un nome all'archivio

**Tar.gz**

Nel caso si volesse creare un archivio con estensione .tar.gz, invece che .tar, è sufficiente utilizzare questo comando:

    tar -czvf nome_archivio.tar.gz /path/cartella-o-file

**Tar.bz2**

Per creare un archivio con estensione .tar.bz2 la flag è leggermente diversa:

    tar -cjvf nome_archivio.tar.bz2 /path/cartella-o-file

## Rar

Per creare un archivio con formato .rar, è necessario installare il pacchetto unrar.

    # Debian/Ubuntu e derivateapt install rar# RHEL/Centos e derivateyum install rar# Fedora e derivatednf install rar# Arch Linux e derivatepacman -S rar

Creare un archivio con rar è molto facile, basta utilizzare il seguente comando:

    rar a nome_archivio.rar nome-cartella-o-file

## 7z

Per creare un archivio con formato .7z è necessario utilizzare il comando 7z, disponibile nel pacchetto p7zip che deve essere installato separatamente:

    # Debian/Ubuntu e derivateapt install p7zip-full# RHEL/Centos e derivateyum install p7zip p7zip-plugins# Fedora e derivatednf install p7zip p7zip-plugins# Arch Linux e derivatepacman -S p7zip

Creare un archivio con p7zip è molto semplice, basta utilizzare il comando 7z con la flag -a:

    7z a nome_archivio.7z nome-cartella-o-file