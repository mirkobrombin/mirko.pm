---
class: post
title: '#howto – Rimuovere i vecchi kernel da Debian e Fedora/CentOS'
description: "Disinstallare i vecchi kernel inutilizzati è un ottimo metodo per recuperare spazio e alleggerire il sistema in generale."
date: 2019-04-05
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
    - centos
    - fedora

---
Disinstallare i vecchi kernel inutilizzati è un ottimo metodo per recuperare spazio e alleggerire il sistema in generale.

Buona norma è quella di mantenere le ultime due versioni più recenti installate, rimuovendo le precedenti, questo per prevenire l'impossibilità di accedere al proprio ssitema nel caso di una versione incompatibile.

> Prima di procedere con la guida, accertiamoci di aver installato i più recenti aggiornamenti e riavviato con l'ultima versione del kernel disponibile (possiamo selezionarlo direttamente da GRUB se presente).

In questa guida vediamo come è possibile rimuovere i vecchi kernel su Debian e Fedora/CentOS.

## Debian e derivate

Su Debian, Ubuntu e derivati, quesa operazione è facilitata da APT, il gestore pacchetti predefinito di sistema:

    sudo apt autoremove --purge

questa operazione andrà ad eliminare tutte le vecchie versioni presenti del kernel, mantenendo le ultime due, rimuoverà inoltre possibili vecchie dipendenze non più necessarie e quindi obsolete allo scopo.

Nel caso venga restituito un errore, accertiamoci che non siano presenti aggiornamenti in sospeso:

    sudo apt install -fsudo apt update

ed effettuiamo nuovamente l'operazione.

## Fedora/CentOS

Il metodo più comune e pronto all'uso, è quello di sfruttare **package-cleanup** offerto da **yum-utils** installabile digitando:

    yum install yum-utils

nel caso non fosse presente. Proseguiamo poi con la rimozione dei kernel meno recenti:

    package-cleanup --oldkernels --count=2

dove:

*   **--oldkernels** identifica ovviamente i vecchi kernel obsoleti installati nel sistema
*   **--count** il numero di versioni da mantenere nel sistema (consigliati 2)

### Metodo manuale

Per prima cosa dobbiamo controllare la versione del kernel al momento in uso dal sistema, il metodo più semplice è digitando:

    uname -r

una volta identificata la versione corrente (ipotesi **4.20.1-1.el7.elrepo.x86_64**), controlliamo le versioni installate:

    rpm -q kernel

l'output sarà una lista di kernel nel formato: **kernel-x.x86_64**.

Eliminiamo da questa lista la versione al momento in uso e quella più recente rispetto ad essa:

    yum remove kernel-versione

sostituendo **kernel-versione** all'esatto contenuto di una delle righe restituite da comando **rpm -q kernel**.

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**