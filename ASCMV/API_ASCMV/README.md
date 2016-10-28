# API_ASCMV
L'application web et mobile API_ASCMV est conçue pour répondre à plusieurs thématiques, qui sont : 
* D'offrir un outil de travail, réaliste et ludique de mettre en oeuvre l'innovation technologique au service du culte (Musulman).
* De proposer un moteur de recherche de pointe ,multilingue permettant de naviguer dans le coran dans plusieurs langues dont l'arabe Uthmani.
* D'avoir une liste des horaires de prières pour l'Association Spinalienne Culturelle Musulmane des Vosges.
* De proposer le site web gratuitement et librement téléchargeable et modifiable.
* D'avoir une compatibilité totale avec android en tant qu'application.
* D'avoir une compatibilité complète avec les différent navigateurs (au moins sur la page des horaires de prières).
* D'offrir une fonctionnalité innovante : la reconnaissance vocale.

## Démonstration
Le site est visualisable à cette adresse: [demo]

## Installation
Clonage du repository :
```sh
$ cd /var/www/ascmv.tld
$ git clone https://github.com/ctrlfagency/ASCMV.git
```
Installation de l'application : 
```sh
$ npm install

```
Fait rare, dans le cas ou vous utilisez apache2 au top de votre domaine, effectuez la manipulation suivante : 
Copier dans le répertoire suivant /etc/apache2/sites-available/ascmv.tld.conf .
N'oubliez pas de vous procurer un certificat ssl et de changer siteweb.tld par votre propre domaine.
```sh
SSLPassPhraseDialog exec:/etc/ssl/passphrase.sh
<VirtualHost *:80>
        ServerAdmin contact@siteweb.tld
        ServerName siteweb.tld
        DocumentRoot /var/www/siteweb.tld
    	ProxyPreserveHost on
   	ProxyPass / http://siteweb.tld:3000/
   	ProxyPassReverse / http://siteweb.tld:3000/
   <Directory "/var/www/siteweb.tld">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerAdmin webmaster@localhost
        ServerName siteweb.tld
        DocumentRoot /var/www/siteweb.tld
        SSLEngine on
	SSLCertificateChainFile /etc/ssl/sub.class2.server.ca.pem
	SSLCertificateFile /etc/ssl/ssl.crt
	SSLCertificateKeyFile /etc/ssl/ssl.key
	ProxyPreserveHost on
        ProxyPass / http://siteweb.tld:3000/
        ProxyPassReverse / http://siteweb.tld:3000/
	ProxyRequests off
   <Directory "/var/www/siteweb.tld">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
</IfModule>

```
Redémmarer apache ainsi que les modules :
```sh
$ a2enmod ssl && a2enmod proxy && a2enmod http_proxy && a2ensite /etc/apache2/sites-available/vocal.ascmv.net.conf && service apache2 restart
```
Démarrer l'application.
```sh
node server
```

## Lien externes
* [Annyang] - Bibliothèque de reconnaissance vocale par TalAter.
* [NodeJS] - NodeJS

## contact
Libre à vous de me contacter pour du travail sur **contact@ctrlfagency.com** ou pour boire un thé.

Sincèrement,
Thibaut LOMBARD.
[comment]: #
   [demo]: <https://vocal.ascmv.net/>
   [Annyang]: <https://www.talater.com/annyang/>
   [NodeJS]: <https://nodejs.org/>


  

