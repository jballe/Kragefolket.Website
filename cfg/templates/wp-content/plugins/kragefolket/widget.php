<?php 

function krageplugin_linkwidget() {
    wp_add_dashboard_widget('kragefolket-links', 'Kragefolket links', 'krageplugin_adminlinks_widget');
}
function krageplugin_adminlinks_widget() {
  echo '
    <div class="wrap">
	  <ul>
      <li><a href="<%= widget.gallerylink %>" onclick="window.open(this.href);return false;">Fotos (/fotos)</a>
 	  <br />Brugernavn: <%= widget.galleryuser %> &nbsp; Password:  <%= widget.gallerypass %></li>
      <li><a href="<%= widget.fileslink %>" onclick="window.open(this.href);return false;">Filbibliotek (/filer)</a>
	  <br />Brugernavn: <%= widget.filesuser %> &nbsp; Password:  <%= widget.filespass %></li>
      <li><a href="<%= widget.maillink %>" onclick="window.open(this.href);return false;">Gmail til mailudsendelse og kontaktpersoner</a>
	  <br />Brugernavn: <%= widget.mailuser %> &nbsp; Password:  <%= widget.mailpass %></li>
      <li><a href="<%= widget.sharepoint %>" onclick="window.open(this.href);return false;">Gammel sharepoint (der er nok ikke noget vigtigt l&aelig;ngere)</a></li>
	  <li style="font-size:85%">
        <a href="<%= widget.sourcecode %>" onclick="window.open(this.href);return false;">Kildekode til websitet</a> og 
        <a href="<%= widget.siteconfig %>" onclick="window.open(this.href);return false;">konfiguration</a> og 
        <a href="<%= widget.siteci %>" onclick="window.open(this.href);return false;">ci</a></li>
	  </ul>
      <p style="font-size:85%">Denne version er bygget på <%= build.machine %> build no. <%= build.counter %> commit no. <%= build.commit %></p>  
    </div>';
}