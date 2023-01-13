---
class: post
title: '#howto - Installazione e configurazione di WireGuard su Linux'
date: 2021-01-08
layout: post
author: WhiXard
author_github: Bildcraft1
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos  - bash
---
**WireGuard** è una VPN estremamente semplice da usare e configurare, ma veloce e moderna che ha come punto di forza la criptografia. Mira ad essere più veloce, più sicuro e più utile di IPsec, ed anche essere notevolmente più performante di OpenVPN.

È attualmente in fase di sviluppo attivo, ma potrebbe già essere considerata la soluzione VPN più sicura, più facile da usare e più semplice del settore.

## Come funziona WireGuard?

WireGuard incapsula in modo sicuro i pacchetti IP over UDP. Aggiungete un'interfaccia WireGuard, la configurate con la vostra chiave privata e le chiavi pubbliche dei vostri peer, quindi inviate i pacchetti attraverso di essa. WireGuard imita maggiormente il modello di SSH e Mosh; entrambe le parti hanno le chiavi pubbliche l'una dell'altra e quindi possono semplicemente iniziare a scambiare pacchetti attraverso l'interfaccia.

## Installazione di WireGuard

Prima di tutto installiamo il pacchetto `wireguard` o `wireguard-tools` a seconda della distribuzione che stiamo utilizzando.

### Ubuntu/Debian

Per Ubuntu/Debian installiamo il pacchetto `wireguard` tramite `apt`:

```bash
apt install wireguard
```

### Fedora 

Per Fedora installiamo il pacchetto `wireguard-tools` tramite `dnf`:

```bash
dnf install wireguard-tools
```

### CentOS

Per CentOS dovremmo seguire dei passaggi alternativi (ovvero abilitare il gruppo `Kernel-Plus` sulla nostra macchina) prima di poter installare WireGuard:

```bash
yum install yum-utils epel-release
yum-config-manager --setopt=centosplus.includepkgs="kernel-plus, kernel-plus-*" --setopt=centosplus.enabled=1 --save
sed -e 's/^DEFAULTKERNEL=kernel-core$/DEFAULTKERNEL=kernel-plus-core/' -i /etc/sysconfig/kernel
yum install kernel-plus wireguard-tools
```

### Arch Linux

Su Arch Linux installiamo il pacchetto `wireguard-tools` con `pacman`:

```bash
pacman -S wireguard-tools
```

## Configurazione di WireGuard

Una volta che avremo installato WireGuard dovremo generare una chiave per poter utilizzare il software. Possiamo fare tutto direttamente con un comando che dirà a WireGuard di generare una chiave privata e di trasformare quella chiave in una chiave pubblica:

```bash
wg genkey | tee privatekey | wg pubkey > publickey
```

Dopo aver creato la chiave, dovremo creare l'interfaccia di rete che servirà a WireGuard per funzionare. Creiamo dunque l'interfaccia di rete utilizzando `ip link` con i seguenti parametri:

```bash
ip link add dev wg0 type wireguard
```

e diamo un IP all'interfaccia di WireGuard:

```bash
ip address add dev wg0 192.168.2.1/24
```

Una volta che avremo assegnato l'IP alla nostra macchina, creiamo la configurazione di WireGuard con questo comando:

```bash
wg set wg0 listen-port 51820 private-key /path/to/private-key peer <Chiave Pubblica dell'altra macchina su cui vorremo connetterci con WireGuard> allowed-ips 192.168.88.0/24 endpoint 209.202.254.14:8172
```

Infine abilitiamo l'interfaccia con:

```bash
ip link set up dev wg0
```

Se non vogliamo seguire nuovamente questi passaggi ogni volta che vogliamo aggiungere un nuovo dispositivo possiamo usare l'utility:

```bash
wg-quick up nomeconfig
```

Se invece vogliamo spegnere la VPN usiamo:

```bash
wg-quick down nomeconfig
```

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/linuxpeople">gruppo telegram</a>.