---
title: '#howto - Installazione di WSL 2 su Windows 10'
date: 2020-11-06
layout: post
author: WhiXard
author_github: Bildcraft1
tags:
  - bash
---
**WSL 2** è un potente strumento per quanti hanno bisogno di utilizzare Windows, ma non vogliono rinunciare alle potenzialità offerte da GNU/Linux. I requisiti necessari per completare con successo l’installazione della nuova versione di WSL sono:

* Possedere un computer che abbia il supporto per la tecnologia Hyper-V;
* Utilizzare una versione di Windows 10 aggiornata. In particolare, è richiesta una tra le seguenti versioni: 2004, 1903 o 1909.

In questa guida vedremo come installare WSL 2 su Windows.

## Installazione

Prima di tutto avviamo come Amministratore la PowerShell e digitiamo il seguente comando per abilitare WSL:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

e successivamente, questo solo su Windows 10 2004, Hyper-V nel caso in cui non fosse già attivo:
```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Invece, se abbiamo Windows v. 1903 o 1909, dovremo digitare quest'altro comando:
```
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -NoRestart
```

Infine, abilitiamo WSL 2:

```
wsl --set-default-version 2
```

Se il procedimento è stato completato con successo, riavviamo il PC.

### Installazione di una distro
Per scegliere quale distribuzione installare, apriamo il Windows Store e scarichiamone una che preferiamo. Nell'immagine di seguito viene mostrato Ubuntu, mentre nei consigliati è possibile trovarne altre.

![Windows Store Ubuntu](storage/Capture.PNG)

Una volta che abbiamo installato la distro che desideriamo usare, dovremo aprire l'applicazione della distro in questione e creare un utente (sarà la prima cosa che ci verrà chiesta),

## Comandi utili
Qua sotto metto alcuni comandi utili sopratutto per la gestione delle distro installate tramite WSL

### Elencare le distribuzioni

È possibile in qualsiasi momento visionare quale distribuzione avete sul vostro sistema e quale versione di WSL è in uso. Aperta la Powershell, infatti, basterà digitare il comando:

```
wsl -l -v
```

per avere un output simile al seguente:
```
  NAME      STATE           VERSION
* Ubuntu    Stopped         1
```

### Impostare una distribuzione predefinita

La distribuzione predefinita di Windows per Linux è quella che si avvia quando esegui `wsl` da una riga di comando. Nel caso in cui ne avessimo più di una, possiamo cambiare quella di default tramite il seguente comando:

```
wsl --setdefault <NomeDistro>
```

### Annullare la registrazione e reinstallare una distribuzione

Anche se le distribuzioni Linux possono essere installate tramite Windows Store, non è possibile procedere allo stesso modo per la disinstallazione. WSL Config consente di annullare la registrazione delle distribuzioni o di disinstallarle del tutto.

L'annullamento della registrazione consente anche di reinstallare le distribuzioni, sempre se necessario.

Per annullare la registrazione ad una distribuzione, possiamo procedere in questo modo:

```
wsl --unregister <NomeDistribuzione>
```

## Conclusione
Con questa guida avete imparato come installare Linux su Windows. Per usarlo, invece, dovrete conoscere come funziona la vostra distribuzione (o anche solo i comandi più base di bash).

Per ogni dubbio, chiarimento o curiosità ci trovate al <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.
