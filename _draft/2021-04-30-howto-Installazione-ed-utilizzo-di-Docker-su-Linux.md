---

title: '#howto - Installare Docker su Linux'
published:
layout: post
author: Floppy Loppy
author_github:
tags:
- bash
- docker
- ubuntu
- archlinux
- fedora
---


In un mondo in cui è diventata indispensabile la rapidità, l'efficienza e talvolta la leggerezza, soprattutto nello sviluppo software laddóve è necessario avere sistemi di deployment e testing veloci e non troppo esosi di risorse, Docker rappresenta un approccio, per aziende o privati, molto valido.

## Cos'è Docker

**Docker** è un software open source, multipiattaforma che permette di virtualizzare singole applicazioni in dei  **container** che sono isolati dal nostro **host principale** (il nostro sistema operativo per intenderci).
Il paragone con le **macchine virtuali** balza subito all'occhio ma ci sono delle differenze sostanziali:
- Docker non virtualizza l'hardware ma lo condivide col sistema operativo ( ogni container se li gestisce autonomia e isolamento )
- su Docker non viene virtualizzato un intero sistema operativo, ma una specifica applicazione, contenuta in un immagine che contiene software, dipendenze e che generalmente possiamo trovare nei [repository ufficiali](https://hub.docker.com/).

### i vantaggi di questo approccio

 I vantaggi di Docker sono molteplici:

1.  Le risorse richieste per far funzionare un container rispetto ad una macchina virtuale sono nettamente inferiori, si passa da ordini di grandezza calcolati in GB a MB.
2.  Possiamo avere diverse versioni della stessa applicazione sulla stessa macchina senza che vadano in conflitto tra loro per il fatto che i container sono isolati tra di loro (per esempio possiamo avere diverse versioni di **Python** in diversi container) con un dispendio di risorse esiguo rispetto ad avere molteplici macchine virtuali affamate di risore.
3.  Essendo di dimensione ridotte e con specifici scopi, i tempi di avvio, deployment e portabilità diminuiscono.

## Installazione

L'installazione di Docker segue diversi passaggi in base a quale distribuzione stiamo utilizzando, di seguito vedremo i vari procedimenti per Ubuntu, Fedora e Archlinux.

### Ubuntu ( > 18.04):

Prima di tutto dobbiamo aggiungere i repository `multiverse` e `universe` che contengono i pacchetti necessari all'installazione di **Docker** con i comandi:

```bash
add-apt-repository multiverse
add-apt-repository universe
```

Dopodichè aggiorniamo il sistema per abilitare i repository aggiunti:

```bash
apt update
```

E infine installiamo **Docker**:

```bash
apt install docker docker.io
```

### Fedora (32/33/34):

Su Fedora docker si trova già nei repository di sistema, basterà quindi eseguire il comando:

```bash
dnf install docker
```

### Archlinux:

Anche su Arch docker si trova già nei repository ufficiali perciò basterà installarlo con il comando:

```bash
pacman -S docker
```

## Attivazione

Una volta che avremo Docker installato sui nostri sistemi dovremo attivare e abilitare il suo servizio (siccome di default è inattivo), per farlo eseguiamo i seguenti comandi:

```bash
systemctl start docker
systemctl enable docker
```

`start` attiverà il servizio di Docker nella sessione corrente mentre `enable` farà in modo che il servizio di Docker si attivi ad ogni boot del sistema mentre in questo modo non dovremo ogni volta eseguire `systemctl start docker` ogni volta che entriamo un una nuova sessione.

Se siete dubbiosi possiamo verificare che Docker sia effettivamente attivo eseguendo:

```bash
systemctl status docker
```

o

```bash
docker ps
```

Se il primo comando darà come risultato **Active** oppure il secondo stamperà su terminale un risultato simile a questo:

```bash
CONTAINER    ID     IMAGE     COMMAND     CREATED     STATUS     PORTS     NAMES
```

Allora saremo sicuri che Docker è in funzione e possiamo utilizzarlo.

> **NOTA** :
> Se volessimo utilizzare docker senza ogni volta richiamare il comando `sudo` possiamo aggiungere
> il nostro utente al gruppo docker con il comando `usermod -aG docker <nomeutente>`

## Creazione di un container

Ora che abbiamo Docker proviamo a creare un semplice container funzionante.
Prima di iniziare però introdurremmo alcuni comandi base:

- `docker pull <nome immagine>` Verifica se l'immagine è già presente sul nostro sistema, se non c'è allora la scaricherà dal [repository di Docker](https://hub.docker.com/)
- `docker run <nome immagine>` Creerà il container partendo dall'immagine selezionata, se l'immagine è già presente sul nostro sistema la eseguira istantaneamente altrimenti la scaricherà dal repository di Docker e dopodichè la eseguirà.
- `docker ps` Mostra tutti i container attivi in questo momento
- `docker ps -a` Mostra tutti i container **che sono stati attivi**.

Bene ora proviamo a caricare una semplice immagine chiamata **hello-world** e creare il container su docker.

La scarichiamo eseguendo:

```bash
docker pull hello-world
```

> **NOTA** :
> Volendo possiamo skippare questo passaggio in quanto anche eseguendo `docker run` scarichiamo l'immagine dal repo di Docker.

Una volta scaricato eseguiamo:

```bash
docker run hello-world
```
Per creare il container ed eseguirlo.

Procediamo con il comando:

```bash
docker ps
```
Per vedere i container attivi.
In questo caso però non otterremo nessun risultato, questo perchè il container in questione si esegue una quando viene richiamato dal comando `run` e poi si chiude da solo.
Per vedere effettivamente che il tutto è andato come sperato eseguiamo:

```bash
docker ps -a
```

e dovremmo ottenere un output simile a questo:

```bash
CONTAINER ID       IMAGE             COMMAND       CREATED      STATUS        PORTS         NAMES
<id del contaier>   hello-world       "/hello"   14 seconds ago   Exited (0) 13 seconds ago <nome container>
```



A questo punto avremo Docker funzionante sul nostro sistema pronto all'uso per la creazione di container.

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).