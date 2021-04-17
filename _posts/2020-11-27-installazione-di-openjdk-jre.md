---
title: '#howto - Installazione di OpenJDK/JRE su Linux'
published: 2020-11-27
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - archlinux  - bash
---
Se hai intenzione di sviluppare o far girare programmi in **Java**, probabilmente avrai bisogno del software runtime **Java JRE** (e/o JDK) installato. Ci sono JRE e JDK proprietari di Oracle, e una versione open source chiamata OpenJDK/JRE.

Il JRE (Java Runtime Enviroment) serve per avviare applicazioni scritte in Java, mentre se vogliamo programmare in Java dovremo installare anche il JDK (Java Development Enviroment).

In questa guida vedremo come installare sia OpenJDK che JRE.

> Ricordo che il OpenJDK/JRE sono uguali alla versione proprietaria di entrambi.

## Installazione

### OpenJDK/JRE

Se vogliamo avviare esclusivamente applicazioni in Java e non programmare in Java vi basterà installare il JRE.

Ci sono 2 tipi di JRE:

* **Headless** = Se vogliamo avviare esclusivamente app senza GUI
* **Full** = Se dobbiamo avviare delle applicazioni con una GUI

#### Arch Linux

Se vogliamo installare OpenJRE su Arch Linux possiamo scaricare due pacchetti.

Per OpenJRE Headless:

```bash
pacman -S jre-openjre-headless
```

Per OpenJRE Full:

```bash
pacmna -S jre-openjdk
```

Se invece vogliamo installare il JDK direttamente (che installerà anche il JRE):

```bash
pacman -S jdk-openjdk
```

Se abbiamo più di una versione installata del software su Arch Linux possiamo selezionare quale usare con il comando:

```bash
archlinux-java status
```

Se vogliamo usare altre versioni possiamo invece utilizzare *set*:

```bash
archlunux-java set <versione>
```

#### Fedora

Su Fedora possiamo installare OpenJDK tramite *DNF*:

```bash
dnf install java-latest-openjdk.x86_64
```

Per cambiare versione di Java (nel caso in cui nel sistema siano installate più versioni) usiamo:

```bash
alternatives --config java
```

#### Ubuntu/Debian

Di seguito vediamo come installare il JRE su Debian, Ubuntu e derivate.

Per OpenJDK/JRE Headless installiamo il pacchetto con l'ultima versione, 11:

```bash
apt install openjdk-11-jre-headless
```

Per OpenJDK/JRE Full:

```bash
apt install default-jre
```

Invece per installare il JDK:

```bash
apt install default-jdk
```

## Configurazione e Comandi utili

### Impostare nella PATH la variabile JAVA_HOME

Per impostare la `JAVA_HOME`, variabile di sistema, facciamo questi passaggi:

1. Apriamo con il nostro Text Editor preferito il file `/etc/profile`.

2. Aggiungiamo al file le seguenti righe:

   ```bash
   export JAVA_HOME="percorso/java"
   
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. Effettuiamo il logout e rifacciamo l'accesso all'utente.

4. Con `echo $PATH` controlliamo se `JAVA_HOME` è stato impostato corretamente.

### Controllare la versione di Java installata

Per controllare la versione di Java installata possiamo dare:

```bash
# Per controllare la versione di Java
java --version

# Per controllare la versione del compilatore di Java
javac --version
```

## Conclusione

Se tutto è andato come previsto, sul sistema ora avrete sia JRE che JDK, oppure uno dei due in base a che cosa vi serve.

Per ogni dubbio, chiarimento o curiosità ci trovate al <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.