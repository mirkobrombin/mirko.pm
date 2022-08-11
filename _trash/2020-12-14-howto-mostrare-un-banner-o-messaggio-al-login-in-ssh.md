---
title: '#howto - Mostrare un banner o messaggio al login in SSH'
date: 2020-12-14
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash  - ssh  - ssh  - bash
---
Grazie ad OpenSSH è possibile fare in modo che, durante la fase di login ad una macchina tramite **SSH**, il sistema mostri un **messaggio** o un **banner**. Questo potrebbe essere qualsiasi cosa, da un semplice saluto ad un avviso ben importante.

In questa guida vedremo come impostare e mostrare un banner o messaggio nella fase di autenticazione in SSH.

## Come mostrare un messaggio al login in SSH

Per mostrare un messaggio nella fase di login in SSH, come prima cosa dovremo creare un file dove è contenuto il testo da inserire. Per fare ciò, creiamo un file senza estensione (preferibilmente nella cartella di *ssh*):

```bash
nano /etc/ssh/banner
```

e scriviamo al suo interno ciò che desideriamo. È possibile inserire anche un **ASCII Art**, ossia una sorta di disegno mostrato al login. Vogliamo che ci venga mostrato Tux al login? Inseriamo questo:

```bash
         _nnnn_
        dGGGGMMb
       @p~qp~~qMb
       M|@||@) M|
       @,----.JM|
      JS^\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\dS"qML
 |    `.       | `' \Zq
_)      \.___.,|     .'
\____   )MMMMMP|   .'
     `-'       `--' hjm
```

Fatto ciò, salviamo il file ed apriamo quello di configurazione di SSH, solitamente posizionato in:

```bash
nano /etc/ssh/sshd_config
```

Andiamo a cercare la sezione *banner*, la decommentiamo e sostituiamo *none* con il percorso del messaggio, in questo caso /etc/ssh/banner. Chiudiamo e salviamo il file e riavviamo *ssh*:

```bash
service ssh restart
```

Ora, se proviamo a loggarci in remoto via SSH alla nostra macchina, come ad esempio:

```bash
ssh utente@indirizzo.IP
```

dovremmo avere un risultato simile al seguente:

```bash
alessandro@MSI:~$ ssh pi@192.168.2.44
         _nnnn_
        dGGGGMMb
       @p~qp~~qMb
       M|@||@) M|
       @,----.JM|
      JS^\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\dS"qML
 |    `.       | `' \Zq
_)      \.___.,|     .'
\____   )MMMMMP|   .'
     `-'       `--' hjm

pi@192.168.2.44's password:
```

Ora sapete come inserire un messaggio al login di SSH e mostrare a chi effettuerà l'accesso qual è la vostra ASCII Art preferita, o più semplicemente alcune semplici regole per la gestione del server o PC.

