---
title: '#howto - Installazione e configurazione di fish (shell) su Linux'
published: 2020-08-31
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - python  - bash
---
**Fish**, definita anche come Friendly Interactive Shell, è una shell pronta all'uso che offre suggerimenti automatici, completamento dei comandi automatico, un linguaggio di scripting completamente funzionale, leggibile e anche del testo colorato che guida all'uso del terminale.

In questa guida vedremo come installarlo e configurarlo, oltre che provare alcune funzionalità interessanti.

## Installazione di fish

### Ubuntu, Debian e derivate

Per installare `fish` su Ubuntu possiamo aggiungere una repo di terze parti (ufficiale) tramite *ppa*:

```bash
apt-add-repository ppa:fish-shell/release-3
apt-get update
apt-get install fish
```

Per quanto riguarda Debian, dobbiamo aggiungere la repo dal sito di OpenSuse:

```bash
# Debian 9
echo 'deb http://download.opensuse.org/repositories/shells:/fish:/release:/3/Debian_9.0/ /' | sudo tee /etc/apt/sources.list.d/shells:fish:release:3.list
apt update
apt install fish

# Debian 10
echo 'deb http://download.opensuse.org/repositories/shells:/fish:/release:/3/Debian_10/ /' | sudo tee /etc/apt/sources.list.d/shells:fish:release:3.list
apt update
apt install fish
```

### Fedora, CentOS e derivate

Su Fedora possiamo sfruttare `dnf`:

```bash
dnf install fish
```

mentre per CentOS e RHEL dobbiamo passare dal sito di OpenSuse come su Debian:

```bash
# CentOS 8
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/shells:fish:release:3/CentOS_8/shells:fish:release:3.repo

yum install fish

# CentOS 7
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/shells:fish:release:2/CentOS_7/shells:fish:release:2.repo

yum install fish

# RHEL 7
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/shells:fish:release:3/RHEL_7/shells:fish:release:3.repo
yum install fish
```

### Arch Linux

Su Arch Linux possiamo utilizzare `pacman`:

```bash
pacman -S fish

```

## Configurazione di fish

Una volta che abbiamo installato fish possiamo o renderla shell predefinita, argomento che [abbiamo toccato in una guida dedicata](https://linuxhub.it/articles/howto-come-cambiare-la-shell-di-default-su-linux), oppure aprirla con `fish` da terminale. A quel punto, la shell dovrebbe cambiare in un modo simile a:

```bash
Welcome to fish, the friendly interactive shell
Type `help` for instructions on how to use fish
alessandro@MSI ~>
```

A quel punto, possiamo iniziare ad utilizzare `fish`. Prima, però, vediamo come configurarla. 

Il comando `fish_config`, ad esempio, caricherà un server di personalizzazione sul browser, che possiamo utilizzare per cambiare i colori, creare variabili e tanto altro ancora. Quello però, dovete esplorarlo da voi, siccome c'è molto da scoprire!

![Fish config browser](storage/fish-config-browser.jpg)

## Come usare fish

`fish` ha diverse funzionalità che lo contraddistinguono da bash o zsh, come ad esempio l'**autocompletamento dei comandi**, che si può notare appena si scrive qualcosa e che si basa sui manuali, e l'**evidenziatura dei comandi**: quest'ultima, se il comando è rosso, mostra quando un comando non esiste, mentre se è in altri colori potrebbe avere un significato diverso, come quello di comando esistente e funzionante.

#### Funzioni

`fish` supporta delle **funzioni**, che sono simili agli alias, e permettono, come in un normale linguaggio di programmazione, di svolgere qualche attività, semplice o complessa che sia, con un semplice comando.

Digitando `functions`:

```bash
functions
```

possiamo vedere le funzioni che esistono di default o che abbiamo creato noi:

```bash
., :, N_, abbr, alias, bg, cd, cdh, contains_seq, delete-or-exit, dirh, dirs, disown, down-or-search,
edit_command_buffer, export, fg, fish_breakpoint_prompt, fish_clipboard_copy, fish_clipboard_paste, fish_config,
fish_default_key_bindings, fish_default_mode_prompt, fish_git_prompt, fish_hg_prompt, fish_hybrid_key_bindings,
fish_indent, fish_key_reader, fish_md5, fish_mode_prompt, fish_npm_helper, fish_opt, fish_print_git_action,
fish_print_hg_root, fish_prompt, fish_sigtrap_handler, fish_svn_prompt, fish_title, fish_update_completions,
fish_vcs_prompt, fish_vi_cursor, fish_vi_key_bindings, funced, funcsave, grep, help, history, home, hostname, isatty,
kill, la, ll, ls, man, nextd, nextd-or-forward-word, open, popd, prevd, prevd-or-backward-word, prompt_hostname,
prompt_pwd, psub, pushd, python3, realpath, seq, setenv, suspend, trap, type, umask, up-or-search, vared, wait,
```

Esatto, in fish possiamo creare le nostre funzioni. Per crearne una possiamo scrivere `function nome_funzione`:

```bash
function nome_funzione
```

quando si premerà INVIO potremo creare una funzione utilizzando normali comandi. Se vogliamo che a "ciao" il terminale ci dica "Hello World", possiamo creare una funzione come la seguente:

```bash
alessandro@MSI ~> function ciao

                       echo "Hello World!"

                   end
```

*end* deve essere sempre scritto per terminare una funzione. A quel punto, scrivendo "ciao", avremo un output come questo:

```bash
Hello World!
```

#### Combinazioni di comandi

In fish, infine, possiamo combinare i comandi utilizzando operatori come `&&` (che possiamo rimpiazzare con `;`) o anche `||` e `!` per negare qualcosa.

Per esempio, possiamo fare un comando che esegua`make` solo se la configurazione del progetto ha esito positivo. Di conseguenza, possiamo anche fare in modo che il terminale esegua `sudo make install` se `./configure` e `make` hanno esito positivo.

```bash
./configure && make && sudo make install
```

In fish c'è davvero molto da esplorare, e se volete davvero sapere tutto potete consultare l'ottima wiki ufficiale, visibile [qui](https://fishshell.com/docs/current/index.html).

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).