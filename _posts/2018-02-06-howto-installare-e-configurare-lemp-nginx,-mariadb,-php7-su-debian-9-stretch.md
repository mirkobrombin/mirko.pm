---
title: '#howto - Installare e configurare LEMP (Nginx, MariaDB, PHP7) su Debian 9 Stretch'
date: 2018-02-06
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - debian  
  - mysql  
  - php
---
<p>Specialmente per l'utilizzo e la distribuzione di applicativi web, una corretta configurazione di un server web é indispensabile. Trattando questo argomento mi sento in dovere di dire che vi sono diverse scuole di pensiero. C'é chi predilige Apache a Nginx, chi viceversa, chi li sfrutta entrambi in sincronia. Lo stesso vale per MySQL e MariaDB. Quello che andró a spiegare in questa guida riguarda la seguente combinazione di software:</p>

<ul>
<li>Nginx</li>

<li>MariaDB</li>

<li>PHP 7</li>
</ul>

<p>Nginx servirá per la gestione degli spazi virtuali dove ospitare ed eseguire le applicazioni web (sostanzialmente siti web), MariaDB come database Sql e PHP 7 come linguaggio di programmazione indispensabile ad applicativi appunto scritti in PHP.</p>

<h2 id="installazione">Installazione</h2>

<p>Prima di tutto dobbiamo installare i pacchetti sopra-citati e per farlo non serve altro che l'accesso alla console e:</p>

<pre><code>apt install nginx mariadb-server php-fpm php-mysql
</code></pre>

<p>ricordate che durante la fase di installazione di mariadb-server, vi verrá chiesto di inserire una password root che dovrete segnare in quanto verrá utilizzata a fine guida.</p>

<p><img src="https://linuxhub.it/wp-content/uploads/2018/02/1745-mariadb-set-root-password.png" alt="" /></p>

<p>A questo punto é tutto pronto per la configurazione, seguiranno altre installazioni secondarie e non indispensabili.</p>

<h2 id="configurazione">Configurazione</h2>

<p>Prima ancora di passare alla vera configurazione dobbiamo abilitare e avviare il processo di <strong>PHP</strong> (php7.0-fpm) per renderlo eseguile in modo autonomo:</p>

<pre><code>systemctl start php7.0-fpm
systemctl enable php7.0-fpm
</code></pre>

<p>Infine possiamo controllare la corretta esecuzione digitando:</p>

<pre><code>systemctl status php7.0-fpm
</code></pre>

<p>Il che come output dovrebbe restituire <strong>[ ok ] php-fpm7.0 is running</strong>. Proseguiamo con la configurazione di <strong>Nginx</strong>. Dobbiamo tener conto che vi sono 2 path principali:</p>

<ul>
<li>/etc/nginx/sites-available/</li>

<li>/etc/nginx/sites-enabled/</li>
</ul>

<p>La prima path <strong>sites-available</strong>, contiene tutte le configurazioni che andremo a creare per ogni sito web ospitato, la seconda <strong>sites-enabled</strong>, contiene dei semplici link simbolici dei precedenti file di configurazione, ció serve ad abilitare i siti web. Per il momento procediamo col file default (/etc/nginx/sites-available/default) che risponderá alla visualizzazione dell'IP diretto al server. Apriamo quindi il file e sostituiamo il contenuto col seguente:</p>

<pre><code>### DEFAULT
server {
        # LISTEN
        listen 80 default_server;
        listen [::]:80 default_server;

        # ROOT
        root /var/www/html;
        index index.php index.html index.htm index.nginx-debian.html;

        server_name _;
        # LOCATIONS
        location / {
                try_files $uri $uri/ =404;
        }

        # PHP
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        }
}
</code></pre>

<p>Come possiamo vedere, il file é suddiviso in 4 sezioni:</p>

<ul>
<li># LISTEN indica la porta da cui é acessibile Nginx, la porta cambia in 443/ssl se l'applicativo web deve essere disponibile tramite tramite https (il che significa che deve disporre di un certificato SSL)</li>

<li># ROOT indica la path in cui Nginx andrá a cercare i file per quel determinato applicativo/sito web, in questo caso si tratta del predefinito ma per una miglior gestione consiglio di creare per ogni sito web, una path differente in /var/www, ad esempio: /var/www/example.ex</li>

<li># LOCATIONS i blocchi locations, non sono altro che zone in cui é possibile dichiarare determinate regole per una specifica tipologia di file e/o path, come la seguente PHP


<ul>
<li># PHP il blocco PHP é una Location contenente delle regole che vengono applicate ai soli file con estensione .php</li></ul>
</li>
</ul>

<p>Una volta inserito il contenuto qui sopra nel file, non ci resta che salvarlo e creare subito un file di prova in php per garantire il corretto funzionamento, per fare ció basta digitare:</p>

<pre><code>echo "&lt;?php phpinfo();" &gt; /var/www/html/index.php
</code></pre>

<p>Come per php7.0-fpm, avviamo ed abilitiamo nginx:</p>

<pre><code>systemctl start nginx
systemctl enable nginx
</code></pre>

<p>e verifichiamo lo stato come prima:</p>

<pre><code>systemctl status nginx
</code></pre>

<p>Tenete contro che ogni volta che metterete mano alle configurazioni nginx, dovrete eseguire il reload di nginx:</p>

<pre><code>systemctl reload nginx
</code></pre>

<p>e ogni volta che andrete ad aggiungere un nuovo sito web e quindi creare una configurazione in sites-available, dovrete effettuare il collegamento simbolico in sites-enabled</p>

<pre><code>ln -s /etc/nginx/sites-available/example.ex /etc/nginx/sites/enabled/example/ex
</code></pre>

<p>Digitando ora dal nostro browser, l'indirizzo IP della macchina, dovremmo trovarci davanti alla schermata delle informazioni PHP, se cosí non fosse controllate bene i passaggi precedenti. Procediamo con <strong>MariaDB</strong>. Prima di tutto avviamo ed abilitiamo il processo:</p>

<pre><code>systemctl start mariadb
systemctl enable mariadb
</code></pre>

<p>e verifichiamo il processo come di consueto:</p>

<pre><code>systemctl status mariadb
</code></pre>

<p>Ad inizio guida vi ho detto di segnarvi la password root per mariadb-server, ecco servirá ora. Andiamo a creare il file /var/www/html/sql.php col seguente contenuto, avendo la premuta di cambiare "PASSWORD" con una password di vostra scelta che dovrete ovviamente segnarvi:</p>

<pre><code>&lt;?php $dbh = mysqli_connect('localhost', 'admin', 'PASSWORD');
if (!$dbh) {
    die('Errore di connessione": ' . mysqli_error());
}
echo 'Connessione effettuata!';
mysqli_close($dbh);
</code></pre>

<p>questo file servirá a testare il corretto funzionamento del server mariadb. Andiamo ora a creare l'utente admin, per farlo ci serviremo dell'utente root e della password precedentemente salvata, ricordiamoci di cambiare PASSWORD con la password admin inserita poco fa nel file /var/www/html/sql.php:</p>

<pre><code>mysql -u root -e "CREATE USER 'admin'@'%' IDENTIFIED BY 'PASSWORD';"
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;"
</code></pre>

<p>Tutto é pronto, controlliamo il corretto funzionamento di mariadb da riga di comando, digitando:</p>

<pre><code>php /var/www/html/sql.php
</code></pre>

<p>Che dovrebbe restituire il messaggio "Connessione effettuata!", se cosí non fosse, controllate bene i passaggi precedenti e assicuratevi di averla eseguita su una macchina con Debian 9 Stretch.</p>