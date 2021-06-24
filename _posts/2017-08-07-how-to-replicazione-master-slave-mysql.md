---
title: 'HOW TO: Replicazione Master/Slave Mysql'
published: 2017-08-07
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - mysql
---
Una <em>replicazione Mysql</em> è una di quelle procedure a cui nessun Systemadmin può sottrarsi. Nello specifico, una replicazione Sql è la copia elettronica di una o più banche dati presenti in una macchina (computer o server) verso un'altra in modo che tutti gli utenti condividano lo stesso livello di informazioni. Il risultato è un database distribuito in cui un utente (o un amministratore) può accedere ai dati rilevanti per le proprie task senza interferire con il lavoro degli altri.L'implementazione di una replicazione di banche dati con lo scopo di eliminare ambiguità di dati o inconsistenza è detta normalizzazione.Di seguito spiegherò come implementare una replica di tipo <strong>Master/Slave</strong>.<h4>Fasi preliminari</h4>Come esempio, mi avvarrò di<em> Ubuntu Server 16.04</em> e <em>Mysql</em> alla versione 5.7. I server ovviamente saranno 2:<ul>    <li><span style="color: #ff0000;">Master con IP 192.168.10.10</span></li>    <li><span style="color: #ff0000;">Slave con IP  192.168.10.20</span></li></ul>Si può ovviamente creare più di uno Slave, il procedimento non cambia, va solo ripetuto di slave in slave.Prima di proseguire, assumiamo la condizione che entrambi i nodi abbiano la stessa configurazione e siano connessi alla stessa rete locale.<h4>Fase 1: Configurazione del Master Server</h4>Per prima cosa ci serve installare <em>mysql-server</em><pre>sudo apt install mysql-server</pre>per poi configurare il nostro file di configurazione presente in /etc/mysql/mysql.conf.d/mysqld.cnf . Per farlo potete usare <em>vim</em> o <em>nano</em>, io adopererò <a href="http://www.vim.org">vim</a>.<pre>sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf</pre>Il prossimo passo è modificare il suddetto file, decommentando i parametri che ci interessano e settandoli per la nostra causa:<pre>bind-address = 192.168.10.10server-id = 1log_bin = /var/log/mysql/mysql-bin.log</pre>Riavviamo ora mysql con:<pre> sudo service mysql restart</pre>Proseguiamo creando un utente mysql per la replicazione. Questo utente ci serve per connetterci al master server ed è generalmente usato nello slave server quando quest'ultimo si connette al master server. Questo account ha bisogno del privilegio <strong>REPLICATION SLAVE</strong>. Potete chiamare questo utente come meglio credete, non fa alcuna differenza. Io utilizzerò il nome <span style="color: #ff0000;"><strong>'replicante'</strong></span>.<pre> mysql -u root -p Enter password:mysql&gt; CREATE USER 'replicante'@'192.168.10.20' IDENTIFIED BY 'latuapassword';Query OK, 0 rows affected (0.00 sec)mysql&gt; GRANT REPLICATION SLAVE ON *.* TO 'replicante'@'192.168.10.20';Query OK, 0 rows affected (0.00 sec)</pre>Blocchiamo ora il nostro Master Server:<pre>mysql&gt; FLUSH TABLES WITH READ LOCK;Query OK, 0 rows affected (0.00 sec)</pre>Non dimentichiamo che questo blocco rimane finchè non si esce dalla console mysql o finchè non si richiama UNLOCK TABLES. Il blocco deve rimanere attivo finchè il dump mysql non sia terminato (ci arriveremo a breve).Possiamo adesso controllare lo stato del Master Server<img class="alignnone size-full wp-image-1325 size-full wp-image-85" src="https://linuxhub.it/wordpress/wp-content/uploads/2017/08/master-status.png" alt="" width="672" height="111" />L'output che otterrete sarà simile a questo."Dumpiamo" ora tutti i database del Master Server. Vi ricordo, qualora ce ne fosse bisogno, di aprire un nuovo terminale, poichè  il comando <em>mysqldump</em> va eseguito al di fuori della console mysql e perchè, come detto prima, è attivo il <strong>READ LOCK</strong>.<pre>mysqldump -u root -p --all-databases --master-data &gt; dump01.sql</pre>Potete chiamare il file <em>dum01.sql</em> come volete.I prossimi passi da fare sono rispettivamente, sbloccare il database del nostro Master Server<pre>mysql&gt; UNLOCK TABLES;</pre>e copiare il nostro file dump01.sql sul nostro Slave Server<pre>scp dump01.sql 192.168.10.20:/tmp</pre><h4>Fase 2: Configurazione dello Slave Server</h4>Assumiamo che il pacchetto mysql-server  sia già installato. Come fatto per il master server, andiamo anche nello Slave Server a modificare il file <em>mysqld.cnf</em>  in /<em>etc/mysql/mysql.conf.d/</em> .<pre>sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf</pre>e modificare quanto segue:<pre>bind-address = 192.168.10.20server-id = 2log_bin = /var/log/mysql/mysql-bin.log</pre>Riavviamo prima il servizio mysql:<pre> sudo service mysql restart</pre>per poi importare in mysql il dump file precedentemente trasferito dal Master Server:<pre>mysql -u root -p &lt; /tmp/dump01.sql</pre>Logghiamoci ora a mysql (sapete ormai come si fa) e stoppiamo il nostro slave<pre>mysql&gt; STOP SLAVE;</pre>per poi far si che questo comunichi correttamente con il nostro Master Slave.<pre>mysql&gt; CHANGE MASTER TO -&gt; MASTER_HOST='192.168.10.10', -&gt; MASTER_USER='replicante', -&gt; MASTER_PASSWORD='yourpassword', -&gt; MASTER_LOG_FILE='mysql-bin.113786', -&gt; MASTER_LOG_POS=29495809;</pre>Avviamo ora lo Slave:<pre>mysql&gt; START SLAVE;</pre>Bene, ora lo Slave Server e' pronto a comunicare con il Master Server. Per controllare lo stato dello Slave ci basta digitare:<pre>mysql&gt; SHOW SLAVE STATUS\G</pre>Per qualsiasi dubbio e/o domanda scriveteci pure nei commenti.