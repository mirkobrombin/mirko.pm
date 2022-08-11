---
title: '#howto - Installazione di Java sulle principali distribuzioni' 
date: 2021-07-23 10:30
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- java 
- bash 
- ubuntu 
- fedora 
- archlinux 
---

Cerchi come programmare in java? [Qui la nostra guida &larr;](https://linuxhub.it/articles/howtodev-introduzione-alla-programmazione-in-java/) 

Java è stato per anni uno dei linguaggi di programmazione più utilizzati, da poco sorpassato da Python in fama, ma ancora oggi è fondamentale per tantissime aziende che lavorano nel mondo IT. 

> 3 Billion Devices "Run" Java
>
> ~cit necessaria

Ma come lo installiamo sulle nostre distribuzioni? 

## Quale java

È innanzitutto importante capire quale distribuzione di java si vuole installare o quale versione.   

### Distribuzioni di java

Si intende per *distribuzione java* una particolare **JVM** (**Java Virtual Machine**) con i suoi tools e librerie per compilare ed eseguire codice. 

Java è un linguaggio interpretato e compilato, il codice leggibile viene prima compilato in un linguaggio macchina intermedio chiamato *bytecode* attraverso il tool **javac** al quale poi vengono collegate le librerie della distribuzione, il tutto viene poi eseguito con il tool **java**

Da poco ( versione 10 in poi) nella compilation di tools vi si può trovare *jshell*, un interprete interattivo di java che vi permette di eseguire eseguire codice a riga di comando istruzione per istruzione, un po' come *python*.

Le principali distribuzioni java sono: 

- **OracleJDK**, ovvero l'originale
- **OpenJDK**, la versione open source
- **GraalVM** una versione ad alte prestazioni basata su *OpenJDK*



### Versione di Java

Java ogni anno viene migliorato aggiungendo funzioni, correggendo bug o eliminando del codice vecchio, questo processo fa si che ogni modifica faccia variare quella che invece è la *versione di Java*

Le versioni fino alla 5 *venivano identificate come 1.x*, dove x era appunto il numero di versione.
Da Java 6 in avanti è stato identificato con il solo numero di versione, ad oggi siamo a **Java 16**, uscita ad *Aprile 2021*

Altresì importanti sono le versioni: 

- **Java 8** : l'ultima versione di Java a mantenere alcune opzioni di compatibilità necessarie tutt'oggi a moltissime applicazioni IT, le aziende infatti lo usano ancora.

- **Java 11** : è la versione a lungo termine di supporto, o LTS. Il supporto agli aggiornamenti di sicurezza su Java8 son terminati nel 2019, quelli di Java 11 *termineranno invece nel 2026*



### JRE e JDK 

In tutti i casi vi è una differenza fondamentale tra **JRE**, o **Java Runtime Environment** e **JDK**, o **Java Development Kit**. 

Il primo contiene solo gli strumenti per eseguire software java, il secondo contiene i primi e anche gli strumenti per svilupparci su ( come il java compiler ).

Nell'articolo si vedrà *come installare i JDK* e non le JRE.

### Gestire più versioni di Java

Non è necessario scegliere una sola versione o distribuzione di java, possono coesistere più versioni sulla stessa macchina, tuttavia i comandi `java`,`javac` e `jshell` saranno assegnati a solo una di queste.  

Una delle tecniche più comuni per gestire facilmente il cambio tra più versioni è installare ogni versione di java in una directory a se stante e fare il collegamento di una di queste in una cartella chiamata semplicemente "`java`", i comandi vanno associati a quelli di quella cartella!



## Installare Java 

Vediamo come installare le varie distribuzioni java. 

Tenete presente che nella maggiorparte delle distribuzioni, java viene installato nella cartella:   

`/usr/lib/jvm `

### Installare OracleJDK

Dalla versione 8, Oracle ha reso la versione ufficiale di java più orientata al pubblico business. Teoricamente per utilizzarla nei progetti professionali, l'utente finale deve acquisirne una licenza!

Detto questo vediamo come scaricare ed installare *l'ultima versione di oracle JDK* nelle nostre distribuzioni



#### Ubuntu e derivate 

Potete installare java tramite le ppa di **Uprising Linux**

```bash
add-apt-repository ppa:linuxuprising/java

apt update 

apt install oracle-java16-installer

oracle-java16-installer --install-recommends
```



Il parametro `install-recommends` serve a rendere la versione di java quella predefinita



#### Fedora 

Potete scaricare [dal sito ufficiale](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html) il pacchetto rpm di java e quindi installarlo: 

```bash
dnf install  jdk*.rpm 
```

quindi aggiornate le configurazioni di sistema:

```bash
alternatives --config java
```

Vi verrà chiesto, se avete più versioni, quale volete rendere predefinita



#### Archlinux

Trovate i pacchetti oracle su AUR, supponendo usiate **paru** come aur-helper potete scrivere: 

```bash
paru -S jdk jdk-docs
```

Il procedimento è simile con tutti gli altri AUR-helper, se non ne usate alcuno potete clonare e installare manualmente i software da aur: 

```bash
# jdk
git clone https://aur.archlinux.org/jdk.git

cd jdk 

makepkg -si 

## jdk-docs
git clone https://aur.archlinux.org/jdk-docs.git 

cd jdk-docs

makepkg -si
```



#### Generico

Potreste anche andare per un approccio generico. Scaricate sempre [dal sito ufficiale](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html) il file **tar.gz**.  

Potreste anche utilizzare `wget` da terminale: 

```bash
wget -c --header "Cookie:oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otnpub/java/jdk/16.0.2%2B7/d4a915d82b4c4fbb9bde534da945d746/jdk-16.0.2_linux-x64_bin.tar.gz
```

> NOTA BENE :   
>
> il link potrebbe cambiare ad ogni aggiornamento di sottoversione, quindi se vi da `ERRORE 404: Not Found.` il motivo è semplicemente che è uscita una nuova sottoversione, usate quindi il sito



Una volta scaricato il pacchetto, scompattatelo e spostatelo sotto `/usr/lib/jvm`, se non esiste create la cartella : 

 ```bash
 tar -xzf jdk* 
 
 rm jdk*tar.gz
 
 mkdir -p /usr/lib/jvm
 
 mv jdk* /usr/lib/jvm
 ```



Consiglio quindi di fare il link ad una cartella *chiamata java* nella stessa directory: 

```bash
ln -sf /usr/lib/jvm/jdk-16.0.2 /usr/lib/jvm/java
```



Quindi fare il link ai tool eseguibili: 

```bash
ln -sf /usr/lib/jvm/java/bin/java /usr/bin/java
ln -sf /usr/lib/jvm/java/bin/javac /usr/bin/javac
ln -sf /usr/lib/jvm/java/bin/jar /usr/bin/jar
ln -sf /usr/lib/jvm/java/bin/jshell /usr/bin/jshell
```



E creare la variabile **JAVA_HOME** nel file `/etc/profile`

```bash
echo "JAVA_HOME=/usr/lib/jvm/java" | tee -a /etc/profile
```



> **NOTA BENE**: 
>
> se l'account non è root, il comando `sudo` va aggiunto prima di `tee`, non prima di `echo`



### Installare OpenJDK 

La versione open della jdk è più che sufficiente nella maggioranza delle nostre necessità, è anche più facile da installare e rientra nel nostro sistema più naturalmente, quindi perché non provarla come prima scelta? 

#### Ubuntu e derivate 

Il pacchetto da installare è 


```bash
apt-get install openjdk-jdk
```


#### Fedora

Su fedora bisogna installare il pacchetto

```bash
dnf install java-latest-openjdk.x86_64
```

Anche in questo caso, bisogna aggiornare la versione di default così: 

```bash
alternatives --config java
```




#### Archlinux

Bisogna installare i pacchetti: 

```bash
pacman -S jdk-openjdk openjdk-doc openjdk-src
```

#### Generico

Anche in questo caso possiamo installare genericamente la jdk. 
Trovate le release [sul sito ufficiale](https://jdk.java.net) oppure potete scaricarne una con wget così: 

```bash
wget https://download.java.net/java/GA/jdk16.0.2/d4a915d82b4c4fbb9bde534da945d746/7/GPL/openjdk-16.0.2_linux-x64_bin.tar.gz
```

> NOTA BENE :   
>
> il link potrebbe cambiare ad ogni aggiornamento di sottoversione, quindi se vi da `ERRORE 404: Not Found.` il motivo è semplicemente che è uscita una nuova sottoversione, usate quindi il sito

Una volta scaricato il pacchetto, scompattatelo e spostatelo sotto `/usr/lib/jvm`, se non esiste create la cartella : 

 ```bash
tar -xzf openjdk* 

rm openjdk*tar.gz

mkdir -p /usr/lib/jvm

mv jdk* /usr/lib/jvm
 ```



Consiglio quindi di fare il link ad una cartella *chiamata java* nella stessa directory: 

```bash
ln -sf /usr/lib/jvm/jdk-16.0.2 /usr/lib/jvm/java
```



Quindi fare il link ai tool eseguibili: 

```bash
ln -sf /usr/lib/jvm/java/bin/java /usr/bin/java
ln -sf /usr/lib/jvm/java/bin/javac /usr/bin/javac
ln -sf /usr/lib/jvm/java/bin/jar /usr/bin/jar
ln -sf /usr/lib/jvm/java/bin/jshell /usr/bin/jshell
```



#### La versione headless

Esiste un ulteriore versione di **openjdk**, la headless, ovvero senza GUI.   
Non vedo particolarissimi motivi per dover installare una versione headless su un pc desktop o un notebook ( ovviamente il discorso potrebbe cambiare su server o dispositivi per scopi precisi ) quindi l'articolo non ne tratterà l'installazione.


### Installare GraalVM

Non ci ho creduto fino a che non lo ho provato, ma graalvm è davvero una versione ottimizzata di openjdk. Non so bene quali siano i suoi limiti in verità ma provando a compilare un progetto grosso ha dato i suoi frutti.

Consideriamo che GraalVM si basa sulle versioni LTS di oracle, quindi l'ultima disponibile è con Java 11.

Vediamo ora come installarlo nelle nostre distribuzioni. 

#### Archlinux

Per archlinux potete installare il pacchetto `jdk11-graalvm-bin` da AUR. Con un aur-helper come `paru`:

```bash
paru -S jdk11-graalvm-bin
```



Oppure manualmente: 

```bash
git clone https://aur.archlinux.org/jdk11-graalvm-bin.git
makepkg -si
```



#### Genericamente 

Nelle altre distribuzioni dovrete usare il metodo generico. Scaricate quindi il tar.gz con `wget` oppure dalla [pagina ufficiale delle release su github](https://github.com/graalvm/graalvm-ce-builds/releases)

```bash
wget  https://github.com/graalvm/graalvm-ce-builds/releases/download/vm-21.2.0/graalvm-ce-java11-linux-amd64-21.2.0.tar.gz
```

> NOTA BENE :   
>
> il link potrebbe cambiare ad ogni aggiornamento di sottoversione, quindi se vi da `ERRORE 404: Not Found.` il motivo è semplicemente che è uscita una nuova sottoversione, usate quindi il sito

Una volta scaricato il pacchetto, scompattatelo e spostatelo sotto `/usr/lib/jvm`, se non esiste create la cartella : 


 ```bash
tar -xvzf graalvm*.tar.gz

rm graalvm*tar.gz

mkdir -p /usr/lib/jvm

mv graalvm* /usr/lib/jvm/graalvm-11
 ```



Consiglio quindi di fare il link ad una cartella *chiamata java* nella stessa directory: 

```bash
ln -sf /usr/lib/jvm/graalvm-11 /usr/lib/jvm/java
```

Ora potreste utilizzare in distribuzioni come Ubuntu e Fedora i tool ufficiali per l'update delle alternative ai programmi: 

```bash
update-alternatives --install /usr/bin/java java /usr/lib/jvm/graalvm-11/bin/java 2
update-alternatives --config java
```

Oppure fare il link ai tool eseguibili: 

```bash
ln -sf /usr/lib/jvm/java/bin/java /usr/bin/java
ln -sf /usr/lib/jvm/java/bin/javac /usr/bin/javac
ln -sf /usr/lib/jvm/java/bin/jar /usr/bin/jar
ln -sf /usr/lib/jvm/java/bin/jshell /usr/bin/jshell
```








