---
title: '#howto - Come proteggere una cartella di Nginx con una password'
date: 2021-03-05
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - nginx  
  - apache  
  - bash
---
Proteggere una cartella sul web con una password o un filtro può tornare molto utile: magari si sta lavorando ad un progetto che non deve essere ancora visibile al pubblico, e pertanto sorge la necessità di nascondere ciò che si sta sviluppando.

In **Nginx** è molto semplice fare tutto ciò, e in questa guida vedremo proprio come farlo impostando un nome utente ed una password.

## Prerequisiti

Per poter proteggere una cartella di Nginx è necessario aver installato il web server, ma anche delle dipendenze di `apache2` (non il software in sé, ma solo una parte). Questo perché il file in cui andremo a salvare le credenziali criptate sfrutta la **HTTP Basic Authentication**. La generazione delle password per l'HTTP Basic Authentication, al momento, può avvenire solo con Apache o httpd.

### Ubuntu, Debian e derivate

Per installare questi strumenti su Ubuntu, Debian e distribuzioni derivate dobbiamo ricorrere ad `apt` e al pacchetto `apache2-utils`:

```bash
apt install apache2-utils
```

### Fedora, CentOS e derivate

Su Fedora, CentOS e derivate dobbiamo invece installare `httpd-tools`:

```bash
# Si può sostituire dnf con yum
dnf install httpd-tools
```

## Protezione della cartella di Nginx tramite password

Una volta installati gli strumenti di httpd o Apache, modifichiamo il blocco location della nostra configurazione di Nginx aggiungendo due parametri, *auth_basic* e *auth_basic_user_file*:

```nginx
# Qui si indica come location la cartella di root, ma si può proteggere anche una sottocartella

location / {
    auth_basic          "Login";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

A questo punto, usiamo il comando `htpasswd` per creare il file *.htpasswd* in */etc/nginx* come sopra indicato.

Per creare il file specificando lo username scriviamo:

```bash
# /etc/nginx può essere sostituito, qui viene usato come esempio

htpasswd -c /etc/nginx/.htpasswd username
```

Se si vogliono aggiungere più username dovremo omettere il parametro "*-c*".

Ora, ci verrà chiesto di impostare la nostra password. Facciamolo, e per verificare che tutto sia andato a buon fine usiamo `cat` per "catturare" il contenuto criptato del file *.htpasswd*: 

```bash
cat /etc/nginx/.htpasswd
```

che ci dovrebbe dare un output simile al seguente:

```bash
username:$apr1$/woC1jnP$KAh0SsVn5qeSMjTtn0E9Q0
```

Infine, riavviamo il server Nginx:

```bash
service nginx restart
```

e visitando la cartella protetta dovrebbe apparirci un form che ci chiederà di inserire lo username e password specificati durante la configurazione del file *.htpasswd*.



Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
