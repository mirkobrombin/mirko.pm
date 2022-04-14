---
title: '#howto - Ottimizzare l uso della batteria su linux'
date: 2022-04-15 
layout: post
author: Floppy
author_github: raspFloppy
published: false
tags:
- battery
- bash
---

Le nostre care distribuzioni Linux soffrono di un problema che va ad intaccare l'autonomia dei nostri portatili, ovvero che il nostro governator della 
CPU si troverà quasi sempre in _performance mode_ indifferentemente dalle operazioni che stiamo eseguendo.
Questo comporta un maggiore consumo della batteria e una conseguente minore autonomia dei nostri portatili.
Esistono molti tool che vanno a sopperire a questa problematica gestendo il governator in modo più intelligente, uno di questi si chiama **auto-cpufreq.**



## Cos'è auto-cpufreq

**auto-cpufreq** è un software che automatizza le operazioni del governator della nostra CPU capendo quando è necessario sforzare il nostro processore
e quando invece lo si può "lasciar rilassare", per chi non lo sapesse il governator è quel software che gestisce la frequenza della nostra cpu 
in particolare dei core e dei thread di essa.
A differenza di `tlp` e altri software simili auto-cpufreq non disabilita completamente il turbo-boost del processore ma lo tiene disattivo fin quando
non è necessario sfornzare la CPU, per esempio quando compiliamo dei programmi.

> N.B. i dev di auto-cpufreq sconsiglano di utilizzarlo insieme ad altri tool come tlp in 
> quando questo potrebbe causare effetti indesiderati.



## Installazione

Abbiamo tre vie per installare auto-cpufreq:

**Installazione manuale:**
cloniamo il repository con git e dopodichè installiamo il programma:
``` bash
git clone https://github.com/AdnanHodzic/auto-cpufreq.git
cd auto-cpufreq && sudo ./auto-cpufreq-installer
```

**Snap:** 
Troviamo un pacchetto anche nello snap store, possiamo quindi installare il tutto con:
```
snap install auto-cpufreq 
```

**Aur:**
Se utilizziamo archlinux o derivate possiamo usufruire dell'AUR, in tal caso eseguiamo:
```
yay -S auto-cpufreq
oppure
paru -S auto-cpufreq
```



## Configurazione e funzionamento

Una volta installato dobbiamo attivare il deamon nel caso lo abbiate installato da git o da snap basterà eseguire:
``` bash
auto-cpufreq --install
```

mentre se abbiamo utilizzato l'AUR eseguite:
```bash
systemctl enable auto-cpufreq
systemctl start auto-cpufreq
```


A questo punto potete verificare che il tutto funzione eseguendo:
```
auto-cpufrq --stat
```

che vi restituirà una serie di informazioni tra le quali, la frequenza dei vostri core/thread, la temperatura della CPU,
in che modialità si trova il governator, e se il turbo boost è attivo.

Se il vostro pc è collegato alla corrente in automatico auto-cpufreq passerà alla `performance-mode` e con il turbo boost attivo, questo significa che
tutti i core/thread funzioneranno a frequenza massima.
Se invece il vostro laptop è scollegato dalla corrente in automatico il vostro governator andrà in modalità `powersave-mode` portando tutti i core/thread
a funzionare alla frequenza minima. In questo caso però se noi dovessimo svolgere operazioni dispendiose allora auto-cpufreq dirà al governator di aumentare
la frequenza della nostra cpu oppure su singoli core che in quel momento sono dedicate e quelle operazioni e nel caso, se necessario, attiverà il turbo boost.

Questi comportamenti possono essere modificati nel file `/etc/auto-cpufreq.conf`, per esempio potete decidere che quando la batteria è scollegata
invece di passare in `powersave` il governator vada in `balanced` in modo tale da non consumare troppo ma neanche ridurre le prestazione della nostra cpu,
oppure di tenere sempre accesso o sempre spento il turbo boost.
Insomma potete modificare a vostro piacimento in base alle vostre esigenze il comportamento di `auto-cpufreq` per rendere la vostra esperienza portatile
con linux meno energivora.

