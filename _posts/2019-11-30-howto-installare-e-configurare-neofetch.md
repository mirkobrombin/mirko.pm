---
title: '#howto - Installazione e configurazione di neofetch'
description: "neofetch è un interessante e leggero strumento utilizzabile da terminale che, su ben 150 sistemi operativi diversi.."
published: 2019-11-30
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
tags:
  - fedora  - github
---
**neofetch** è un interessante e leggero strumento utilizzabile da terminale che, su ben 150 sistemi operativi diversi, fornisce informazioni sul proprio sistema e hardware, indicando anche CPU, GPU, RAM, disco e molto altro.

![Neofetch terminale dylanaraps](storage/neofetch-terminale-dylanaraps.png)

*Esempio di output di neofetch, immagine di <a href="https://github.com/dylanaraps/">dylanaraps</a>.*

## Installazione
neofetch può essere installato in due maniere: tramite compilazione del codice 
sorgente, o scaricando direttamente il pacchetto dalle repo ufficiali (e non) del 
proprio sistema operativo.

### Compilazione da codice sorgente
Per compilare neofetch è sufficiente installare l'ultima release dalla repo 
ufficiale GitHub ed utilizzare lo strumento *make*:

```
wget https://github.com/dylanaraps/neofetch/releases/latest
make install
```

Fatto ciò, per verificare che tutto sia stato installato correttamente, provate a 
digitare il comando *neofetch* nel terminale. Il risultato dovrebbe essere simile a 
questo:

![Neofetch terminale fedora 1](storage/neofetch-terminale-fedora-1.png)

### Installazione da repo ufficiali
neofetch, essendo disponibile su 150 sistemi operativi tra cui Windows, è incluso in 
moltissime repo ufficiali del sistema da noi utilizzato. Ecco alcuni esempi di 
installazione sulle distro più popolari:

```
# Arch Linux
  sudo pacman -S neofetch

# Debian / Ubuntu
  sudo apt-get install neofetch

# Fedora / RHEL / CentOS
  sudo dnf install neofetch

# Gentoo
  sudo emerge neofetch

# Void Linux
  sudo xbps-install -S neofetch
```

## Configurazione
E ora, arriva la parte più divertente di neofetch: la configurazione. Di default, 
neofetch mostrerà informazioni sul nostro OS, host, Kernel, pacchetti, DE, RAM e 
quant'altro. Per aggiungere ulteriori informazioni, è necessario andare a modificare 
il file di configurazione presente nella nostra home directory. Modificate il file 
*.config/neofetch/config* (se vi trovate nella home) con il vostro editor di testo 
preferito, e guardiamo alcune cose.

```
print_info () {
    info title
    info underline

    info "Host" model
    info "OS" distro
    info "Kernel" kernel
    info "Uptime" uptime
    info "Packages" packages
    info "Shell" shell
    info "Resolution" resolution
    info "DE" de
    info "WM" wm
    info "WM Theme" wm_theme
    info "Theme" theme
    info "Icons" icons
    info "Terminal" term
    info "Terminal Font" term_font
    info "CPU" cpu
    info "GPU" gpu
    info "Memory" memory

    # info "CPU Usage" cpu_usage
    # info "Disk" disk
    # info "Battery" battery
    # info "Font" font
    # info "Song" song
    # info "Local IP" local_ip
    # info "Public IP" public_ip
    # info "Users" users
    # info "Birthday" birthday

    info cols
}
```

Le righe precedute da un cancelletto (o hashtag, chiamatelo come vi pare) servono a 
fare in modo che neofetch non mostri queste determinate informazioni. Per mostrarle, 
invece, basta semplicemente togliere *#*. Se, ad esempio, non commentiamo più le 
informazioni sulla canzone che stiamo ascoltando e l'IP locale, neofetch li mostrerà 
quando richiameremo il comando.

Nel file di configurazione ci sono moltissime cose da scoprire, aggiungere e 
modificare: per saperne di più, potete visitare la wiki dedicata su GitHub, 
disponibile <a href="https://github.com/dylanaraps/neofetch/wiki/">qui</a>.

## Conclusione
neofetch è uno strumento molto utile, anche il suo scopo principale è quello di 
aggiungere un po' più di estetica nei vostri screenshot che condividerete con i 
vostri amici (e su <a href="https://gentedilinux.linuxhub.it/">GenteDiLinux</a> :D).

Per dubbi e chiarimenti, utilizzate il nostro <a href="t.me/gentedilinux">gruppo Telegram</a>.