---
title: '#howto – Installare e configurare fail2ban in Centos 7'
published: 2019-06-01
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - ssh  - systemd  - ssh  - systemd
---
Lo strumento **fail2ban** si occupa di controllare il log accessi del server in tempo reale, bloccando l'indirizzo IP di quelli con ripetuti tentativi falliti.

## Installazione

Per prima cosa dobbiamo installare la repository EPEL:

    yum install epel-release

successivamente possiamo procedere con l'installazione:

    yum install fail2ban fail2ban-systemd

infine aggiorniamo le policy di SELinux:

    yum update -y selinux-policy*

## Configurazione

Cominciamo con la configurazione, portiamoci nella locazione **/etc/fail2ban**:

    cd /etc/fail2ban

e creiamo una copia del file **jail.conf** dal nome **jail.local**:

    cp jail.conf jail.local

Modifichiamo la copia appena creata con l'editor preferito, nel nostro caso **nano**:

    nano jail.local

ora abbiamo accesso ad una serie di opzioni configurabili:

*   **ignoreip** supporta una serie di valori (indirizzi IP), separati da uno spazio fra loro, questi sono gli indirizzi a cui fal2ban non farà caso
*   **bantime** il numero in secondi in cui durerà il blocco di un indirizzo IP
*   **findtime** il numero in secondi in cui è possibile effettuare tentativi errati
*   **maxretry** il numero di tentativi errati concessi nel lasso di tempo dichiarato come **findtime**

di seguito la configurazione da me raccomandata:

    [DEFAULT]
    ignoreip = 127.0.0.1/8
    bantime = 1200
    findtime = 400
    maxretry = 3

### Configurazione fail2ban per SSH

Portiamoci nella locazione **/etc/fail2ban/jail.d/** e creiamo il file **sshd.local**:

    cd /etc/fail2ban/jail.d/touch sshd.local

apriamolo con l'editor preferito:

    nano sshd.local

ed inseriamo la seguente configurazione:

    [sshd]
    enabled = true
    port = ssh
    logpath = %(sshd_log)s
    maxretry = 3
    bantime = 10000

dove:

*   **enabled** indica se fail2ban è abilitato su SSH
*   **port** è ovviamente la porta in cui è accessibile il servizio SSH
*   **logpath** la locazione in cui è presente il log accessi SSH (usato da fail2ban per controllare i tentativi di accesso)
*   **maxretry** il numero di tentativi errati concessi
*   **bantime** il numero in secondi in cui durerà il blocco IP

salviamo infine il file di configurazione, nel caso di **nano** come editor, usiamo la combinazione di tasti:

    CTRL+X

Abilitiamo il servizio fail2ban e riavviamolo assieme a firewalld:

    systemctl enable fail2ban
    systemctl restart firewalld fail2ban

Ora possiamo tener traccia delle statistiche di fail2ban nel seguente modo:

    fail2ban-client status

### Sblocco indirizzo IP

Nel caso in cui volessimo sbloccare un indirizzo IP, possiamo procedere in questo modo:

    fail2ban-client set sshd unbanip INDIRIZZO_IP

modificando **INDIRIZZO_IP** con l'indirizzo da sbloccare.

### Utilizzare iptables al posto di firewalld

Nel caso in cui volessimo usare iptables al posto di firewalld con fail2ban, sarà necessario procedere in questo modo. Per prima cosa disabilitiamo firewalld:

    systemctl disable firewalld
    systemctl stop firewalld

disabilitiamo il file di configurazione per firewalld:

    sudo mv /etc/fail2ban/jail.d/00-firewalld.conf /etc/fail2ban/jail.d/00-firewalld.disabled

Modifichiamo la configurazione locale con l'editor preferito, per **nano**:

    nano /etc/fail2ban/jail.local

e aggiungiamo la seguente opzione a fondo pagina (se non già presente):

    banaction = iptables-multiport

salviamo e riavviamo:

    sudo systemctl restart fail2ban

ora fail2ban funzionerà con iptables anzichè firewalld.

_Good ***nix**?_  
_ - Mirko_