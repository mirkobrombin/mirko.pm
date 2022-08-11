---
title: '#howto - Desktop Entry'
date: 2021-11-26 10:00
layout: post
author: Ivonne
author_github: ivochan
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags:
- desktop
- entry
- lanciatore
- collegamento
- ubuntu
- archlinux
- fedora
---



Per "**Desktop Entry**" si intende un file con estensione `.desktop`, ovvero un collegamento che viene utilizzato per avviare una qualsiasi applicazione in ambiente Linux.

Infatti, dopo averlo definito, il programma corrispondente verrà visualizzato nel **Menu Applicazioni** e potrà essere eseguito cliccando direttamente sull'icona che lo identifica.

In generale, il programma di installazione di una qualsiasi applicazione si occupa anche della creazione del lanciatore, ovvero del collegamento che permetterà di accedere all'applicazione di interesse in maniera rapida, senza rendere necessario l'utilizzo del terminale.



### Come crearlo?

Nel caso in cui, però, questo non dovesse verificarsi, allora si potrà dotare l'applicazione in questione di un collegamento, attuando il procedimento che verrà riportato di seguito.

Dunque, bisognerà:

- creare un file vuoto con estensione `.desktop`;
- scrivere al suo interno i campi sottostanti, ovvero:
  - `[Desktop Entry]`, intestazione che specifica che il file descrive un collegamento all'applicazione;
  - **Type**, indica la categoria a cui appartiene l'applicazione per cui si deve creare il lanciatore;
  - **Terminal**, specificando un valore booleano, indica se si vuole che il terminale venga visualizzato o meno, durante l'esecuzione dell'applicazione, nel caso fosse necessaria un'azione di debug oppure l'utilizzo della linea di comando;
  - **Exec**, indica il path a cui trovare l'eseguibile dell'applicazione per cui si deve definire il collegamento;
  - **Name**, definisce il nome dell'applicazione;
  - **Icon**, indica il path ed il nome dell'icona che si vuole assegnare al lanciatore.
- dare i permessi di esecuzione al file, eseguendo il comando:
```bash
chmod +x path/nome_applicazione.desktop
```
- salvare il file nella cartella `$HOME/.local/share/applications` con il nome "nome_applicazione.desktop", tramite il comando seguente: 
```bash
mv path/nome_applicazione.desktop /usr/share/applications/
```

Si precisa che non tutti i campi del file sopraelencati sono necessari per il suo corretto funzionamento, infatti, al fine di ottenere un lanciatore che sia utilizzabile, è sufficiente che venga assegnato un valore solamente alle voci *Name*, *Type* e *Exec*.



### Come strutturarlo? 

Ecco il contenuto di un generico file che descrive un lanciatore:

```bash
[Desktop Entry]

Name=Name_of_Application
Type=Application
Comment=Description_of_Application
Terminal=false

Exec=/path_to_executable
Icon=/path_to_icon

Categories=category1;category2;category3;
Keywords=word1;word2;word3;
```

In questo modo, è possibile avere, anche su Linux, il tanto agognato collegamento sul Desktop, di qualsivoglia applicazione, creando, nel contempo, un vero e proprio lanciatore, di cui è possibile definire le più svariate opzioni, per renderlo adatto alle proprie esigenze.



### Come creare una Action?

Per dotare un lanciatore di alcune funzionalità aggiuntive è possibile definire delle "opzioni", cliccabili tramite il tasto destro del dispositivo di puntamento che si sta utilizzando, defininendo una Action.

Un esempio, se si considera un browser, potrebbe essere quello di visualizzare l'opzione "apri finestra di navigazione in incognito" , proprio al click del tasto destro del mouse.

Per farlo, basterà inserire nel file `.desktop` dell'applicazione, le seguenti righe di codice:

```bash
[Desktop Action]

Name=Type_of_Action
Exec=/path_to_executable/ options param1 param2 ...
```

Dove:

- `[Desktop Action]`, l'intestazione che specifica si sta definendo una **Action**;
- **Name**, il nome dell'azione che si vuole configurare;
- **Exec**, ovvero l'applicazione da eseguire, comprensiva di parametri che identifichino l'azione richiesta;

Allora, alla fine, il file `.desktop` completo sarà strutturato in questo modo:

```bash
[Desktop Entry]

Name=Name_of_Application
Type=Application
Comment=Description_of_Application
Terminal=false

Exec=/path_to_executable
Icon=/path_to_icon

Categories=category1;category2;category3;
Keywords=word1;word2;word3;

[Desktop Action]
Name=Type_of_Action
Exec=/path_to_executable/ options param1 param2 [...]
```

Talvolta, potrebbe presentarsi la necessità di definire,nel lanciatore che si sta configurando, più di una Action.

Ad esempio, se si considera un riproduttore musicale,  le opzioni da aggiungere potrebbero essere "Esegui", "Pausa", "Vai al brano successivo" e così via.

Dunque, nel caso in cui si vogliano definire più opzioni personalizzate, bisognerà scrivere nel file`.desktop` un listato di quelle che si andranno ad inserire, nel modo seguente:

```bash
Actions=Action1;Action2;Action3;
```

e poi specificare  una *Desktop Action* corrispondente ad ognuna delle azioni che si vogliono realizzare.



### Quale categoria scegliere?

La definizione di una determinata categoria, alla voce *Type* del file `.desktop`, è necessaria per permettere che l'applicazione venga visualizzata nella voce del **Menu Applicazioni**, che è riservata proprio a questa categoria.

Ad esempio, se si specificano più categorie, allora l'applicazione verrà visualizzata in tutte le voci del **Menu Applicazioni** che corrispondono ai parametri che sono stati definiti.

Alcune delle categorie che si possono utilizzare sono riportate in questa tabella:

| Categoria   | Descrizione                                                  |
| ----------- | ------------------------------------------------------------ |
| AudioVideo  | applicazione utilizzata per visualizzare, creare oppure elaborare file multimediali |
| Development | software per lo sviluppo                                     |
| Game        | applicazione ludica                                          |
| Graphics    | software per visualizzare, creare o elaborare immagini       |
| Network     | applicazione basata su internet                              |
| Office      | software per ufficio                                         |
| Utility     | accessori                                                    |
| Science     | software di tipo scientifico                                 |



### Esempio: creazione di un lanciatore per un IDE di sviluppo

Ecco un esempio di come è fatto il launcher di Visual Studio Code:

```bash
[Desktop Entry]

Name=Visual Studio Code

Type=Application

Comment=Editor for building and debugging modern web and cloud applications

Terminal=false

Exec=/opt/visual-studio-code/code %f

Icon=visual-studio-code

Categories=Development;WebDevelopment;IDE;Utility;TextEditor;
```



### Utilizzo del lanciatore per l'avvio automatico dell'applicazione

Un altro modo in cui sfruttare la creazione di un lanciatore potrebbe essere quello di utilizzarlo per eseguire una determinata applicazione all'avvio del sistema.

Questo può essere realizzato creando, se non è ancora stato definito, oppure copiando il launcher dall'applicazione di interesse all'interno della cartella `$HOME/.config/autostart`.



### Esempio: esecuzione automatica di un'applicazione all'avvio del sistema

Per esemplificare il procedimento descritto in precedenza, segue il codice utilizzato per la definizione, a linea di comando, del lanciatore di Kupfer, un avviatore di applicazioni in stile spotlight, in modo tale che  questo venga eseguito automaticamente, ad ogni accesso al sistema.

```bash
echo "[Desktop Entry]

Name=Kupfer

Type=Application

Exec=kupfer --no-splash

" > $HOME/.config/autostart/kup.desktop

```



### Esempio: utilizzo del lanciatore come scorciatoia per gli aggiornamenti

Su Ubuntu e derivate, il lanciatore può anche essere sfruttato per velocizzare la ricerca e l'esecuzione degli aggiornamenti di sistema, facendo in modo che l'utente avviarne l'esecuzione con un semplice click sull'icona "Update", che si troverà nel **Menu Applicazioni**.

Ecco come scrivere il file linea di comando:

```bash
echo "[Desktop Entry]

Type=Application

Name=Update

Icon=software-update-available

Categories=Utility;

Exec=sudo apt full-upgrade

Terminal=True" > ~/.local/share/applications/apt-update.desktop
```



### Software Dex: creazione di un lanciatore senza sporcarsi (troppo) le mani

Se per ogni nuova applicazione che verrà installata sul sistema, copiare ed incollare poche linee di codice per creare un lanciatore risulta un dispendio di energie non accettabile, allora si può utilizzare *Dex*.

**Desktop Entry Execution** è un software che permette di generare ed eseguire file `.desktop` di qualsiasi tipo di applicazioni.

Per utilizzarlo, basta installarlo tramite il package manager del sistema Linux che si sta utilizzando e poi digitare il comando sottostante:

```bash
dex -c /percorso/assoluto/eseguibile -t /directory/di/output 
```

Se si volessero avviare dei file `.desktop` già esistenti, invece, si può digitare:

```bash
dex -v /percorso/al/desktop_entry.desktop
```

Sebbene questo software sia ottimale per la creazione di un *Desktop Entry* da utilizzare per l'autostart di un'applicazione, tuttavia, non consente di definire e personalizzare alcuni aspetti di quest'ultimo, come la scelta dell'icona da visualizzare oppure la categoria di appartenenza.
