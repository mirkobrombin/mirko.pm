---
title: '#pausacaffé - Buone ferie estive (2021)' 
date: 2021-08-01 09:30
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- agosto 
- ferie 
- bash 
---

Questo è stato un anno particolare per la redazione di linux/hub, tra nuovi impegni, membri e progetti, ma anche vecchi progetti e membri che ci siamo lasciati alle spalle, abbiamo pensato di meritarci una piccola pausa estiva !

## Cosa implica la nostra pausa

Ci sarà un arco di un mese a partire da oggi in cui i nostri editori non seguiranno alcuna schedulazione degli articoli, saranno liberi se vorranno di scrivere articoli quando vogliono o di non scriverne alcuno. A loro volta non chiediamo la disponibilità ai nostri redattori, che potranno riposarsi gli occhi senza dover scovare errori di qualunque tipo tra le righe di un autore frettoloso con mille impegni!

In realtà confido da parte del nostro team in un assoluta pausa che li aiuti a riflettere e trovare nuovi spunti e idee di scrittura, in modo da poter ripartire con carica nei prossimi mesi.

## Ehi, voglio scrivere un articolo per voi!

Beh se tu caro lettore vuoi invece riempire di contenuti la nostra pagina al posto nostro, puoi ancora benissimo farlo.

Abbiamo [letteralmente dedicato un articolo](https://linuxhub.it/articles/howto-scrivere-un-articolo-per-linuxhub/) a come scrivere una guida per Linuxhub. 

Per ripercorrere brevemente i passi: 

- scrivete il vostro articolo seguendo [uno dei nostri template su github](https://github.com/linuxhubit/linuxhub.it/tree/main/_draft) in formato markdown
- create una pull request [sul nostro repository](https://github.com/linuxhubit/linuxhub.it/) 
- Aspettate che qualcuno di noi revisioni il vostro lavoro!

## Tutto qui? 

Un articolo così povero in effetti, non mi si confà! Ecco a voi un piccolo **trucco del giorno**

### Come cercare articoli linux/hub direttamente dal vostro terminale 

Potete creare una funzione da mettere nel vostro `~/.bashrc` che vi consenta di cercare articoli dal vostro terminale!

Ecco come: 

```bash
function cercaArticoli(){
        trucchi=$(wget http://linuxhub.it/search.json -O - -q)
        length=$(echo -nE "$trucchi" | jq length)

        for i in $(seq 0 $((length-1))); do
                url="https://linuxhub.it"$(echo -nE "$trucchi" | jq ".[$i].url" | cut -d '"' -f 2);
                if lynx $url --dump | grep -q "$1"; then
                        titolo=$(echo -nE "$trucchi" | jq ".[$i].title")
                        echo "$titolo → $url"
                fi
        done
}
```

Ecco un esempio di utilizzo:

```bash
cercaArticoli 'ssh'
```

Ed ecco un esempio di output: 

```bash
"#howto - Installazione e configurazione di un server Plex " → https://linuxhub.it/articles/howto-installazione-configurazione-plex/
"#howto - Installazione e configurazione di Endlessh" → https://linuxhub.it/articles/howto-installazione-e-configurazione-di-endlessh/
"#howto - Mostrare un banner o messaggio al login in SSH" → https://linuxhub.it/articles/howto-mostrare-un-banner-o-messaggio-al-login-in-ssh/
"#howto - Installazione e configurazione di fail2ban su Fedora 33/CentOS 8" → https://linuxhub.it/articles/howto-installazione-e-configurazione-di-fail2ban-su-fedora-33-centos-8/
"#howto - Installazione e configurazione di GitLab CE con SSL su Centos 8/RHEL 8" → https://linuxhub.it/articles/howto-installazione-e-configurazione-di-gitlab-ce-con-ssl-su-centos-8-rhel-8/
"#howto - Controllare se una porta è in uso su Linux" → https://linuxhub.it/articles/howto-come-controllare-se-una-porta-%C3%A8-in-uso-su-linux/
"#howto - Installazione e configurazione di GitHub CLI" → https://linuxhub.it/articles/howto-installare-configurare-github-cli/
"#howto - Utilizzo di SSH per connettersi a GitHub" → https://linuxhub.it/articles/howto-utilizzo-di-ssh-per-connettersi-a-github/
"#howto - Come identificare connessioni SSH attive sul proprio server" → https://linuxhub.it/articles/howto-come-trovare-connessioni-ssh-attive-sul-proprio-server/
"#howto - Installazione ed utilizzo di SSH" → https://linuxhub.it/articles/howto-come-usare-ssh-su-linux,-parte-1/
"#howto -  Come usare MOTD su Arch Linux - Pt. 1" → https://linuxhub.it/articles/howto-come-usare-motd-su-arch-linux-pt-1/
"#howto - Montare un file system remoto con sshfs" → https://linuxhub.it/articles/howto-montare-un-file-system-remoto-con-sshfs/
"#howto – Installare e configurare fail2ban in Centos 7" → https://linuxhub.it/articles/howto-installare-e-configurare-fail2ban-in-centos-7/
"#howto – Autenticazione via chiave SSH su server Centos/Fedora/Debian/Ubuntu e derivate" → https://linuxhub.it/articles/howto-autenticazione-via-chiave-ssh-su-server-centos-fedora-debian-ubuntu-e-derivate/
"#howto - Cambiare la porta SSH e disabilitare l&#39;accesso via root su Centos" → https://linuxhub.it/articles/howto-cambiare-la-porta-ssh-e-disabilitare-l-accesso-via-root-su-centos/
"#howto #ChromeOS - Sviluppare app Android" → https://linuxhub.it/articles/howto-chromeos-sviluppare-app-android/
"I nostri dati al sicuro con Rsync" → https://linuxhub.it/articles/i-nostri-dati-al-sicuro-con-rsync/
```

> **NOTA** :   
>
> Ci potrebbe mettere un pochino fino a quando finisce la ricerca

### I trucchi del giorno 

Ne approfitto anche per ricordarvi che abbiamo un altra bellissima rubrica che ad Agosto continuerà *ogni giorno* a produrre contenuti, ovvero i trucchi del giorno! 

Sono disponibili sia tramite telegram [qui](https://t.me/linuxpeople_feed), che nel nostro nuovissimo sito dedicato [feed.linuxpeople.org](https://feed.linuxpeople.org) 

> **NOTA**:   
> Il sito ha ancora un minor numero di contenuti rispetto al canale telegram

## Grazie 

Grazie a tutti voi che ogni giorno consultate il nostro sito! Ma soprattutto vorrei ringraziare i nostri attuali autori: 

- *Massimiliano Noviello*
- *Floppy Loppy* 

I nostri redattori: 

- *Michael Messaggi*
- *Alby, Mastro Alberto* 

E soprattutto colui che tiene su l'intera baracca, ovvero **Mirko Brombin** il fondatore del sito, del gruppo telegram e di tutti questi fantastici progetti che ci divertiamo a portare avanti.

*Buone vacanze a tutti, a Settembre!*



