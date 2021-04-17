---
title: '#howto - Creare uno script di post installazione con UPI (Universal Post Install)'
published: 2019-09-02
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  - apache  - centos  - python  - php  - github  - gnome  - bash
---
Uno script di post installazione può semplificare il lavoro in molti casi, come per un rollout, la configurazione di un ambiente di sviluppo o il semplice cambio di distribuzione.

**UPI (Universal Post Install)** è uno strumento sviluppato da linux/hub che permette di creare semplici script di post installazione in pochi minuti.

## Introduzione

Ogni script viene identificato da una distribuzione e dalla sua versione. Nell'esempio in cui dobbiamo predisporre una postazione con Centos 7, lo script sarà identificato dalla distribuzione **centos** in versione **7**.

### Funzionamento

Il funzionamento di UPi è semplice e logico. In primis identifica la distribuzione in cui viene eseguito, successivamente controlla se è presente uno script compatibile e lo carica.

Una volta caricato lo script viene visualizzato a schermo un menu di installazione da cui è possibile selezionare le voci di interesse (come nell'esempio qui sotto):

```bash
=== Centos ===
Author: Mirko Brombin
Website: https://linuxhub.it

This script is intended for use in server environments.
Detected centos -  - 7 (Core)

[0] Quit
[1] Install updates
[2] Install EPEL repo
[3] Install postfix
[4] Install dovecot
[5] Install nginx
[6] Install apache2
[7] Install php-fpm

Select operation:
```

Esiste inoltre una versione GTK (sperimentale) del menu, accessibile passando la flag **-gtk** all'avvio del programma.

Nonostante non siano ancora stati riscontrati bug, questa versione è ancora in fase di sviluppo e pertanto sconsigliata in un ambiente di produzione.

## Creare uno script

Siccome UPI lavora in locale, possiamo creare script per ogni esigenza, indifferentemente dal fatto che sia definito per Ubuntu o Fedora in modo generico. Basterà infatti inserire lo script nella cartella script, ed eseguire poi il programma sulla postazione di nostro interesse.

Nell'esempio seguente andiamo a creare uno script di post installazione per elementaryOS 5.0 juno. Per prima cosa scarichiamo una copia di UPI:

    wget https://github.com/mirkobrombin/Universal-Post-Install/archive/master.zip

e scompattiamo l'archivio:

    unzip master.zip

andiamo nella directory scripts e creiamo il nostro script (in questo caso è già presente e possiamo procedere con la sua modifica). Il file si deve chiamare come la distribuzione interessata e terminare con l'estensione **.py.** Il nome corretto della distribuzione è reperibile digitando:

    lsb_release -i 2> /dev/null | sed 's/:\t/:/' | cut -d ':' -f 2-

Il contenuto dello script sarà il seguente:

```python
import helper
import sys
import osg = False
for px in sys.argv:    
    if px == '-gtk':        
        g = True
        # Define the package manager
        E = "apt"
        helper.title("ElementaryOS")
        helper.author("Mario Rossi")
        helper.website("https://linuxhub.it")
        supported_versions = [    
            "0.4.1",     
            "5.0"
        ]
        # Check for release
        distro = helper.get_distro()
        if distro.release in supported_versions:    
            class PostInstall:        
                global E        
                # Define menu voices        
                voices_en_US = [            
                    ("Install updates ", "install_updates"),         
                ]        
                voices_it_IT = [            
                    ("Installa aggiornamenti", "install_updates"),         
                ]               
                # Define functions for each menu voice        
                def install_updates(self, g=False):            
                    helper.pkg_update(E)            
                    helper.pkg_sys_upgrade(E)        
                    helper.not_compatible()
                    # Load script
                    pi = PostInstall()
                    try:    
                        voices = eval('pi.voices_' + distro.lang)
                    except AttributeError:    
                        voices = pi.voices_en_US
                        helper.steps(voices, pi, g)
```

dove andiamo a compilare:

*   **helper.title** col nome personalizzato del nostro script, in questo caso ElementaryOS
*   **helper.author** col nostro nome e cognome
*   **helper.website** con un sito web di referenza
*   **supported_versions** con una lista di versioni con cui il nostro script è compatibile
*   **E** che definisce il package manager di sistema, in questo caso apt

Possiamo reperire la versione della distribuzione digitando:

    lsb_release -r 2> /dev/null | sed 's/:\t/:/' | cut -d ':' -f 2-

in questo caso restituirà **5.0**.

Ogni script è compatibile in più lingue: basterà inserire la sigla di interesse. In questo caso utilizzeremo sia l'inglese (en_US) che l'italiano (it_IT) e sarà quindi necessario compilarli entrambi. Portiamoci quindi alla voce **PostInstall**:

```python
class PostInstall:        
    global E        
    # Define menu voices        
    voices_en_US = [            
        ("Install updates ", "install_updates"),         
    ]        
    voices_it_IT = [            
        ("Installa aggiornamenti", "install_updates"),         
    ]                
    # Define functions for each menu voice        
    def install_updates(self, g=False):            
        helper.pkg_update(E)            
        helper.pkg_sys_upgrade(E)        
        helper.not_compatible()
```

precisamente alle voci:

*   **voices_en_US** per la lingua inglese
*   **voices_it_IT** per la lingua italiana

Ogni voce è composta da titolo e nome funzione:

    ("Install updates ", "install_updates"), 

dove:

*   **Install updates** è il titolo
*   **install_updates** la funzione

aggiungiamo una nuova voce, ad esempio:

    ("Install Blender ", "install_blender"), 

e la relativa traduzione italiana:

    ("Installa Blender ", "install_blender"), 

notare che la funzione non viene mai tradotta.

Portiamoci alla voce:

    # Define functions for each menu voice

e creiamo una nuova funzione chiamata **install_blender**:

    def install_blender(self, g=False):    helper.pkg_install("blender", E)

ogni funzione può sfruttare i metodi pkg messi a disposizione dall'helper:

**pkg_install** per installare un pacchetto

    helper.pkg_install("blender", E)

**pkg_add_repo** per aggiungere una repository

    helper.pkg_add_repo("ppa:philip.scott/elementary-tweaks", E)helper.pkg_update(E)

**pkg_update** per aggiornare la lista dei pacchetti

**pkg_remove** per rimuovere un pacchetto

    helper.pkg_remove("blender", E)

**pkg_sys_upgrade** per effettuare un aggiornamento di sistema

    helper.pkg_sys_upgrade(E)

Una volta creata la nostra prima funzione, salviamo ed eseguiamo lo script sulla postazione interessata con:

    python main.py

per visualizzarne il risultato.

### Funzioni avanzate

Ci sono alcuni metodi messi a disposizione da helper, con la quale possiamo effettuare operazioni avanzate nel nostro script.

Possiamo utilizzare **helper.do** per eseguire comandi nella shell:

    helper.do("touch $HOME/hello.world", False)

o via sudo cambiando l'ultimo parametro in **True**.

Sfruttiamo invece la funzione **helper.perm** per cambiare i permessi di una directory:

    helper.perm("/directory", "755", False)

anche qui cambiando in **True** per utilizzare sudo.

### Personalizzazione

Possiamo sfruttare alcune funzioni per mostrare informazioni personalizzate nello script. Ogni funzione richiede un unico parametro, ossia il testo da mostrare:

*   **helper.title(**"Hello World!"**)**
*   **helper.text(**"Testo normale"**)**
*   **helper.info(**"Testo informativo"**)**
*   **helper.bold(**"Testo in grassetto"**)**
*   **helper.success(**"Testo di successo"**)**
*   **helper.error(**"Testo errore"**)**
*   **helper.warning(**"Testo avviso"**)**

È possibile proporre script "ufficiali" e generici nel progetto **GitHub**: [https://github.com/mirkobrombin/Universal-Post-Install](https://github.com/mirkobrombin/Universal-Post-Install)

Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/gentedilinux).

_?Good *nix _**__Mirko_**