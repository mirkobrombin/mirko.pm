---
title: '#howto - Installazione di Django sulle principali distribuzioni Linux'
published: 2020-06-08
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - fedora  
  - python  
  - bash
---
**Django** è un web framework open-source scritto in **Python** con alcuni semplici principi alla base, come la scalabilità, la ri-usabilità e lo sviluppo rapido.

In questa guida vedremo come installare Django sul nostro computer o server utilizzando anche `virtualenv`.

## Prerequisiti

Per poter installare Django è prima necessario avere installato Python 3 ed una versione stabile ed aggiornata di `pip`, il gestore pacchetti per PyPi, la repository di Python.

Nonostante Python3 sia ormai preinstallato in molte distribuzioni, possiamo procedere col nostro gestore pacchetti nel caso non fosse appunto installato.

### Ubuntu, Debian e derivate
Procediamo tramie *apt*:

```bash
apt install python3
```

### Fedora, CentOS/RHEL 8
Da Centos/RHEL 8, si usa *dnf* come per Fedora:

```bash
dnf install python3
```

per Centos/RHEL 7 *yum*:

```bash
yum install python3
```

### Arch Linux
Qui troviamo invece *pacman*:

```bash
pacman -Syu python
```

In tutte le distribuzioni possiamo verificare che sia andato tutto per il verso giusto, controllandone la versione con l'opzione *-V*:

```bash
python3 -V
```

Procediamo con `pip` (già incluso su Fedora e derivate con il precedente comando), quindi per Ubuntu, Debian e derivate:

```bash
apt install python3-pip
```

mentre su Arch Linux:

```bash
pacman -Syu python-pip
```

e verifichiamo come fatto precedentemente:

```bash
pip3 -V
```

## Installazione di virtualenv

`virtualenv` è uno strumento che permette di creare ambienti virtuali dove è possibile installare ed eseguire pacchetti isolati dal sistema, ottima procedura che ci evita molti conflitti di dipendenze.

Per installare `virtualenv` utilizzeremo pip3, come mostrato nel comando qui sotto:

```bash
pip3 install virtualenv
```

E verifichiamo che `virtualenv` si sia installato correttamente:

```bash
virtualenv --version
```

L'output dovrebbe essere simile al seguente:

```bash
virtualenv 20.0.20 from /home/alessandro/.local/lib/python3.8/site-packages/virtualenv/__init__.py

```

## Installazione di Django

Per installare Django ci sono tre modi: utilizzare il `virtualenv`, modalità che sfrutteremo in questa guida, compilare il **codice sorgente** ufficiale o effettuare il download tramite `pip` globalmente.

Di seguito, vediamo come installare Django utilizzando `virtualenv`.

Creiamo prima una cartella nella locazione che preferiamo:

```bash
mkdir django-app
cd django app
```

e creiamo il nostro ambiente virtuale in questo modo:

```bash
virtualenv env
```

A questo punto, attiviamolo eseguendo il comando presente nella cartella *env/bin*:

```bash
. env/bin/activate
```

Per verificare che il nostro *venv* sia attivo, dobbiamo trovare la scritta `(env)` davanti al nostro nome utente sul terminale, come in questo modo:

```bash
(env) alessandro@fedora:$
```

Ora, installiamo Django con `pip`:

```bash
pip install django
```

e per verificare che l'installazione sia andata a buon termine controlliamo la versione del software:

```bash
django-admin --version
```

L'output dovrebbe essere simile al seguente:

```bash
3.0.7
```

## Configurazione e avvio del sito

In questa fase creeremo un'applicazione utilizzando `django-admin`, un comando dedito alla configurazione e alla gestione di un progetto di Django. Con `startproject` è possibile creare un progetto.

Mentre ci troviamo nella cartella indicata in precedenza, eseguiamo il seguente comando:

```bash
django-admin startproject nomesito
```

> Il parametro "nomesito" può essere rimpiazzato con qualsiasi nome si voglia dare al proprio progetto.

Entriamo nella cartella generata e controlliamo i file presenti:

```bash
cd nomesito
ls
```

L'output dovrebbe essere simile al seguente:

```bash
manage.py nomesito
```

Qui troviamo un file chiamato `manage.py` che, semplicemente, ha il compito di cercare le impostazioni del progetto e controllare se Django è presente nel proprio ambiente di svluppo. Nella cartella *nomesito*, invece, troveremo altri quattro file:

- `__init.py__` è il file di inizializzazione del progetto di Python

- `settings.py` descrive la configurazione della propria installazione di Django

- `urls.py` indica i percorsi visitabili via URL

- `wsgi.py` contiene la configurazione di WSGI, acronimo di Web Server Gateway Interface. Questo programma viene utilizzato da Python per avviare il web server e le applicazioni

A questo punto possiamo avviare il server e visualizzare il sito sul nostro browser. Per fare ciò, però, dovremo prima inserire il nostro IP (locale o pubblico) in una whitelist presente nel file `settings.py`.

Rechiamoci nella sottocartella `nomesito` (nel caso in cui fossimo ancora nella prima) e modifichiamo il file con il proprio editor preferito (utilizzeremo `nano`):

```bash
nano settings.py
```

Al parametro *ALLOWED_HOSTS* inseriamo l'IP:

```bash
ALLOWED_HOSTS = ['nostroIP']
```

e chiudiamo e salviamo il file.

Una volta fatto ciò, avviamo il server con `manage.py`, il parametro `runserver`e l'IP del nostro server (inclusa la porta):

```bash
python manage.py runserver nostroIP:porta
```

Se tutto è andato a buon fine, dovremmo trovarci davanti, caricando l'URL con il nostro IP e la porta specificata, ad un **benvenuto** da parte di Django.

Una volta provato, usciamo da Django con CTRL+C e disattiviamo il virtualenv con il seguente comando:

```bash
deactivate
```



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).