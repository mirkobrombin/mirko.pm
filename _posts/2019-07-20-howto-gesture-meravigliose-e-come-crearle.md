---
class: post
title: '#howto - Gesture meravigliose e come crearle'
description: "Invidiabili le gesture di MacOS?  Vediamo come ottenere la stessa esperienza sulla nostra distribuzione Linux preferita! "
date: 2019-07-20
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---
Invidiabili le gesture di MacOS?  
Vediamo come ottenere la stessa esperienza sulla nostra distribuzione Linux preferita!  

In ambienti Linux possiamo trovare (nel bene e nel male) degli strumenti per la configurazione delle gesture del nostro touchpad. Nel particolare quello di cui vi vorrei parlare oggi è **libinput-gestures**, usato oltretutto da GNOME nella sua configurazione base (anche su Wayland).  

## Installazione

Per prima cosa installiamo libinput e libinput-gestures:  

    # Debian/Ubuntu e derivate
    sudo apt install libinput libinput-gestures

    # Fedora e derivate
    sudo dnf install libinput libinput-gestures

    # Archlinux 
    sudo pacman -S libinput
    ## nota - libinput-gestures si trova su AUR

è inoltre consigliata l'installazione di wmctrl e xdotool:  

    # Debian/Ubuntu e derivate
    sudo apt install wmctrl xdotool

    # Fedora e derivate
    sudo dnf install wmctrl xdotool

    # Archlinux
    sudo pacman -S wmctrl xdotool

## Preparazione

Prima di procedere con la pratica, vediamo quali sono i risultati che vogliamo ottenere, condivido quelle che sono le mie intenzioni ed i risultati che ho ottenuto:  

*   swipe alto con 4 dita: nascondi desktop
*   swipe basso con 4 dita: nascondi desktop
*   swite a sinistra con 4 dita: prossimo desktop
*   swite a destra con 4 dita: desktop precedente
*   swipe in alto con 3 dita: mostra i desktop
*   swite in basso con 3 dita: mostra le finestre aperte in questo desktop
*   swite a sinistra con 3 dita: prossimo desktop
*   swite a destra con 3 dita: desktop precedente
*   pinch verso l'esterno con due dita: ingrandisci il desktop
*   pinch verso l'interno con due dita: rimpicciolisci il desktop  

> <u>NOTA:</u>  
> Da tenere in considerazione che le vostre possibilità sono altamente influenzate dal DE che userete. Infatti con xfce4 ad esempio non vi è modo di presentare i desktop, e per presentare le finestre avrete bisogno di altri tool come **skippy-xd**. Quindi scegliete in base alle possibilità offerte dal vostro DE.

## Configurazione

Procediamo con la creazione (o modifica) del file:  

`$(HOME)/.config/libinput-gestures.conf`  

Assocciando ad ogni azione un comando nel seguente formato:  
`<azione touchpad> <comando>`  

Il mio file di configurazione, in base alle intenzioni precedentemente citate, è il seguente:  

    gesture swipe up 4 wmctrl -k on
    gesture swipe down 4 wmctrl -k off
    gesture swipe left 4 xdotool key ctrl+alt+n
    gesture swipe right 4 xdotool key ctrl+alt+p

    gesture swipe up 3 xdotool key super+w
    gesture swipe down 3 xdotool key super+s
    gesture swipe left 3 xdotool key ctrl+alt+n
    gesture swipe right 3 xdotool key ctrl+alt+p

    gesture pinch out 2 xdotool key super+shift+p
    gesture pinch in 2 xdotool key super+shift+m

possiamo trovare maggiori informazioni e combinazioni dal file fornito di base al percorso:  
`/etc/libinput-gestures.conf`

Nell'esempio qui sopra di configurazione, il comando **xdotool key**, consente sotto **Xorg** di inviare una determinata combinazione di tasti, come se li aveste realmente premuti, è importante quindi impostare delle shortcut nel caso in cui voleste sfruttare questa configurazione.  

Concludo questa guida con alcune considerazioni.

*   **libinput-gestures** va avviato con il sistema. quindi scrivetevi un file `.desktop` ( o usate le impostazioni di avvio del vostro DE) richiamando **lininput-gestures** come comando.
*   non è purtroppo possibile con xorg e libinput in coppia variare le impostazioni in base all'accelerazione (ad esempio "pizzicare" maggiormente per ingrandire), esistono comunque altri gestures-manager come "**fusuma**" che permettono di farlo.
*   per capire se funziona o no `libinput`, potete usare `libinput-debug-events` e `libinput-debug-gui`, il loro utilizzo è abbastanza semplice.
*   consiglio inoltre ad ogni riavvio da sospensione o ibernazione di digitare **libinput-gestures-setup restart** per riavviare il servizio, poichè potrebbe smettere di funzionare.