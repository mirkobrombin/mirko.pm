---
title: '#howto - Installare Moodle su Ubuntu e derivate via Nginx'
published: 2018-06-10
layout: post
author: Mirko B.
author_github: mirkobrombin
tags:
  - nginx  
  - mysql  
  - php
---
<p>Moodle é un software riservato ai settori dell'istruzione. Si tratta di un gestionale per docenti, studenti e collaboratori, al momento il piú usato.</p>


<p>L'installazione é relativamente semplice ma richiede diversi passaggi.</p>


<p>Per prima cosa dobbiamo installare tutte le dipendenze. Andremo ad installare un server web (Nginx, in questo caso) e un server sql (MariaDB).</p>


<h2>Preparazione dipendenze</h2>


<p>Andremo ora ad installare Nginx (Server web), MariaDB (Server SQL), PHP e alcune librerie necessarie per l'esecuzione di Moodle.</p>


<pre><code>sudo apt-get update
sudo apt-get install software-properties-common sudo add-apt-repository ppa:ondrej/php
sudo apt-get install nginx mariadb-server mariadb-client php7.1-fpm php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-zip php7.1-curl
</code></pre>

<h2>Configurazione server</h2>


<p>Una volta installato tutto comincia la configurazione dei server Web e SQL. Procediamo avviando Nginx:</p>


<pre><code>systemctl enable nginx
systemctl start nginx</code></pre>


<p>e avviamo l'installazione guidata di MariaDB:</p>


<pre><code>sudo mysql_secure_installation</code></pre>


<p>durante l'installazione vi verrá chiesta la password dell'utente root di sistema e alla domanda&nbsp;<strong>Set root password?</strong> risponderemo <strong>Yes</strong>, digitando di seguito password e conferma password che useremo per l'utente root del server SQL.</p>


<p>Rispondete&nbsp;<strong>Yes</strong> o&nbsp;<strong>No</strong> alle prossime domande in base alle vostre preferenze, ricordando di rispondere&nbsp;<strong>Yes</strong> a&nbsp;<strong>Reload privilege tables now?</strong></p>


<p>Una volta ultimata l'installazione riavviamo il server SQL:</p>


<pre><code>systemctl restart mysql</code></pre>


<p>Torniamo a Nginx e creiamo una configurazione per Moodle. Apriamo il file di configurazione:</p>


<pre><code>sudo vi /etc/nginx/sites-available/default</code></pre>


<p>e assicuriamoci che diventi come di seguito:</p>


<pre><code>server {
    listen 80;
    listen [::]:80;
    root /var/www/html/moodle;
    index index.php index.html index.htm;
    server_name example.com www.example.com;
    
    location / {
        try_files $uri $uri/ =404;
    }
    location ~ .php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
    }
}</code></pre>

<p>dove <strong>example.com</strong> e <strong>www.example.com</strong> deve essere sostituito col il dominio che punta al nostro indirizzo pubblico (vedi <a href="https://linuxhub.it/article/howto-puntare-un-dominio-ad-un-ip">Come puntare un dominio ad un indirizzo IP</a>) nel caso di installazione su rete locale, sostituire con <strong>localhost.</strong></p>

<h2>Installazione Moodle</h2>

<p>Portiamoci nella directory <strong>/var/www/html</strong>&nbsp;e scarichiamo/decomprimiamo Moodle:</p>

<pre><code>cd /var/www/html
curl -L https://download.moodle.org/download.php/direct/stable32/moodle-latest-32.tgz &gt; moodle.tgz
sudo tar -xvzf moodle.tgz -C /var/www/html</code></pre>

<p>Creiamo ora una directory esterna per i dati dei corsi e impostiamo i permessi:</p>

<pre><code>sudo mkdir /var/moodle_data
sudo chown -R www-data /var/moodle_data
sudo chmod -R 0770 /var/moodle_data
sudo chmod -R 777 /var/www/html/moodle</code></pre>

<p>Per il corretto funzionamento di Moodle é necessario apportare qualche modifica al server SQL, procediamo quindi alla configurazione:</p>

<pre><code>sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf</code></pre>

<p>e modifichiamo le seguenti voci:</p>

<pre><code>default_storage_engine = innodb 
innodb_file_per_table = 1 
innodb_file_format = Barracuda</code></pre>

<p>una volta salvato riavviamo il servizio:</p>

<pre><code>systemctl restart mysql</code></pre>

<h3>Il database</h3>

<p>Per funzionare, Moodle richiede un database dove salvare tutte le informazioni. Accediamo quindi alla console mysql via root:</p>

<pre><code>mysql -u root -p</code></pre>

<p>e creiamo un nuovo database per Moodle, digitiamo quindi la seguente query:</p>

<pre><code>CREATE DATABASE my_moodle DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;</code></pre>

<p>per accedere al database dobbiamo fornire a Moodle un utente, evitando quindi di esporre l'utente root ne creiamo uno nuovo, digitiamo la query:</p>

<pre><code>CREATE USER 'my_moodle_user'@'localhost' IDENTIFIED BY 'my_moodle_password';</code></pre>

<p>sostituendo&nbsp;<strong>my_moodle_user</strong> con l'username che preferiamo e&nbsp;<strong>my_moodle_password</strong> con una password complessa, ricordiamo di salvare questi dati per dopo.</p>

<p>ora diamo i permessi al nostro utente per accedere al database:</p>

<pre>&nbsp;</pre>

<pre><code>GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,CREATE TEMPORARY TABLES,DROP,INDEX,ALTER ON my_moodle.* TO 'my_moodle_user'@'localhost' IDENTIFIED BY 'my_moodle_password';
</code></pre>

<p>anche qui facendo particolare attenzione nel sostituire i dati con quelli precedentemente salvati.</p>

<p>Una volta impostati i permessi possiamo chiudere la console mysql:</p>

<pre><code>quit;</code></pre>

<h3>Installazione guidata</h3>

<p>Finalmente é tutto pronto per l'installazione vera e propria di Moodle che continuerá sul nostro browser. Visitiamo quindi il dominio precedentemente configurato (localhost se su rete locale) e ci ritroveremo davanti all'installazione guidata.</p>

<p><img alt="" height="527" src="https://linuxhub.it/wp-content/uploads/2018/06/moodle_1.png" width="820"></p>

<p>L'installazione da qui é semplicissima, selezioniamo la lingua Italiana e procediamo come da indicazioni.<br>
Ricordate solo di inserire il percorso che abbiamo creato a metá guida (/var/moodle_data) quando ci verrá richiesta la path per la <strong>Data Directory.</strong></p>

<p>Come dati per il database userete invece quelli creati nella console mysql <strong>(user:</strong> my_moodle_user, <strong>name:</strong> my_moodle,&nbsp;<strong>password:</strong> my_moodle_password) che avrete modificato e salvato per questo momento.</p>

<h3>Finalizzazione</h3>

<p>Una volta ultimata l'installazione guidata dobbiamo impostare i permessi alla directory:</p>

<pre><code>sudo chmod -R 0755 /var/www/html/moodle</code></pre>

<p>Diamo ora le istruzioni sui permessi a Moodle, apriamo quindi il file di configurazione</p>

<pre><code>sudo vi /var/www/html/moodle/config.php</code></pre>

<p>e modifichiamo questa linea:</p>

<pre><code>$CFG-&gt;directorypermissions = 0777;</code></pre>

<p>in questo modo:</p>

<pre><code>$CFG-&gt;directorypermissions = 0770;</code></pre>

<p>salviamo tutto e impostiamo i nuovi permessi alla path <strong>moodle_data:</strong></p>

<pre><code>sudo chmod -R 0770 /var/moodle_data</code></pre>

<p>Tutto é pronto all'uso, nel caso di dubbi e problemi usate il box dei commenti qui sotto.</p>

<p><em>Good <strong>*nix</strong></em><br><em>&nbsp;- Mirko</em></p>