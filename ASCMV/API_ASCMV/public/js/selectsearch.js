// Coran Search engine result and modal dialog
// par Thibaut LOMBARD
// Copyleft  - 2016 - 2017 
// License GNU - GPL3
$(function(){
var selectsearch = function choix(){
			var tableresult = 	$('#tableresult');
			var moteurresult = 	$('#moteurresult');

			var term = encodeURI(document.getElementById('search-text').value);
			$('#tableresult').contents().remove();
			$('#moteurresult').contents().remove();
			tableresult.html('<caption>Résultat(s)</caption><thead><tr><th scope="col">Verset(s)</th><th scope="col"> Sourate/Verset </th></tr></thead><tbody id="searchres"></tbody>');
			moteurresult.html('<p class="note-resultats" style="text-align:center;">Nombre de résultats : 0 </p>');
			$.ajax({
														url : "https://api.ascmv.net/search/api/mode/classiclimit-ALL/q/"+term+"/limit/300/callback/?",
														dataType:"jsonp",
														jsonp:"callback",
														success:function(data)
															{	
																var searchres = document.getElementById('searchres');
																var tableauaya = data.aya;
																
																for (var i=0; i<10; i++) {
																var dai = data.aya[i];
																var termtolow = decodeURIComponent(term).toLowerCase();
																var rgxp = new RegExp(termtolow, 'g');
																var repl = '<b>'+termtolow+'</b>';
																var highlightedaya = dai.replace(rgxp, repl);
																var donnees = '<tr><td data-label="" style="text-align:left;">'+highlightedaya+'</td><td data-label=""><a class="btn btn-lg btn-success modalclicked" name="'+data.surat[i]+'" data-toggle="modal" data-target="#basicModal" onclick="$(this).attr(\'name\');$(this).attr(\'id\');modaled(name,id);" id="'+data.id[i]+'">'+data.surat[i]+' / '+data.ayanumber[i]+'</a></td></tr>';
      

																searchres.innerHTML += donnees; 
																}
																$('#moteurresult').contents().remove();
																//le total d'entrées
																var numbertotal = data.totalquery;
																//arrondi le total d'entré à la dizaine supérieure
																var maxnumber = Math.ceil(numbertotal / 10) * 10;
																// divise le chiffre à la dizaine supérieure par 10 pour obtenir un entier
																var maxnumberinteger = (maxnumber / 10);
																// Récupère le nombre de pages

																moteurresult.html('<p class="note-resultats" style="text-align:center;"><br>Nombre de résultats : <a>'+numbertotal+'</a></p><p id="nbpage" style="text-align:center;"></p>');
																var nbpage = document.getElementById('nbpage');
																for (var i = 0; i < maxnumberinteger; i++) {
																	 var ifoisdix = i * 10;
																	 var iplusun = i + 1;
																	 //	$(\'#id'+iplusun+'\').click(lafonction(\''+encodeURI(term)+'\',\''+ifoisdix+'\'));

																	 var lesdata = ' | <a id="idpage'+iplusun+'" onclick="choixmultipage(\''+term+'\',\''+ifoisdix+'\');"> '+iplusun+' </a> |';
																	 nbpage.innerHTML += lesdata;
																 }
													
																	
															}
					});
			};//fin de fonction choix
	$('#search-button').click(selectsearch);
	// début de la fonction multipage

});// fin de fonction document ready
	function choixmultipage(term,thenumber){
			var term = decodeURIComponent(term);
			var nombre = Number(thenumber);
			var thenumberplusdix = nombre+10;
			var tableresult = 	$('#tableresult');
			var moteurresult = 	$('#moteurresult');
			$('#tableresult').contents().remove();
			tableresult.html('<caption>Résultat(s)</caption><thead><tr><th scope="col">Verset(s)</th><th scope="col"> Sourate/Verset </th></tr></thead><tbody id="searchres"></tbody>');
			$.ajax({
														url : "https://api.ascmv.net/search/api/mode/classiclimit-ALL/q/"+term+"/limit/300/callback/?",
														dataType:"jsonp",
														jsonp:"callback",
														success:function(data)
															{	
																var searchres = document.getElementById('searchres');
																var tableauaya = data.aya;

																for (var i=nombre; i<thenumberplusdix; i++) {
																var dai = data.aya[i];
																var termtolow = decodeURIComponent(term).toLowerCase();
																var rgxp = new RegExp(termtolow, 'g');
																var repl = '<b>'+termtolow+'</b>';
																var highlightedaya = dai.replace(rgxp, repl);
																var donnees = '<tr><td data-label="" style="text-align:left;">'+highlightedaya+'</td><td data-label=""><a class="btn btn-lg btn-success modalclicked" onclick="$(this).attr(\'name\');$(this).attr(\'id\');modaled(name,id);" name="'+data.surat[i]+'" data-toggle="modal" data-target="#basicModal" id="'+data.id[i]+'">'+data.surat[i]+' / '+data.ayanumber[i]+'</a></td></tr>';
																searchres.innerHTML += donnees; 
																}													
																	
															}
					});
			}
function modaled(name,numerovers) {
	var name=Number(name);
	var numerovers=Number(numerovers);
    // On change les données contenu dans la boite de dialogue modal
	// Lorsque celle-ci s'affiche
	$("#basicModal").on('shown.bs.modal', function (e) {
		var modalbody = 	$('#modal-body');
		var mymodallabel = $('#myModalLabel');
		$('#myModalLabel').contents().remove();
		$('#modal-body').contents().remove();
		function getsuratByNumber(numerosourate) {
			var numerosourate = Number(numerosourate)-1;
			var lestitres = [
				"Al Fatiha (L\'ouverture)",
				"Al Baqara (La vache)",
				"Al \'Imran (La famille d\'Imran)",
				"An-Nisa (Les femmes)",
				"Al Ma-ida (La table servie)",
				"Al An\'am (Les bestiaux)",
				"Al A\'raf (Le mur d\'A\'raf)",
				"Al Anfal (Le butin)",
				"At-Tawba (Le repentir)",
				"Yunus (Jonas)",
				"Hud",
				"Yusuf (Joseph)",
				"Ar-Ra\'d (Le tonnerre)",
				"Ibrahim (Abraham)",
				"Al Hijr",
				"An-Nahl (Les abeilles)",
				"Al Isra (Le voyage nocturne)",
				"Al Kahf (La caverne)",
				"Maryam (Marie)",
				"Ta-Ha",
				"Al Anbya (Les proph\u00e8tes)",
				"Al Hajj (Le p\u00e9lerinage)",
				"Al Muminoon (Les croyants)",
				"An-Noor (La lumi\u00e8re)",
				"Al Furqan (Le discernement)",
				"Ash-Shu\'ara (Les po\u00e8tes)",
				"An-Naml (Les fourmis)",
				"Al Qasas (Le r\u00e9cit)",
				"Al \'Ankabut (L\'araign\u00e9e)",
				"Ar-Rum (Les romains)",
				"Luqman",
				"As-Sajda (La prosternation)",
				"Al Ahzab (Les coalis\u00e9s)",
				"Saba",
				"Al Fatir (Le Cr\u00e9ateur)",
				"Ya-Sin",
				"As-Saffat (Les rang\u00e9s)",
				"Sad",
				"Az-Zoumar (Les groupes)",
				"Al Ghafir (Le Pardonneur)",
				"Fussilat (Les versets d\u00e9taill\u00e9s)",
				"Ash-Shura (La consultation)",
				"Az-Zukhruf (L\'ornement)",
				"Ad-Dukhan (La fum\u00e9e)",
				"Al Jathiya (L\'agenouill\u00e9e)",
				"Al Ahqaf",
				"Muhammad",
				"Al Fath (La victoire \u00e9clatante)",
				"Al Hujurat (Les appartements)",
				"Qaf",
				"Ad-Dariyat (Qui \u00e9parpillent)",
				"At-Tur",
				"An-Najm (L\'\u00e9toile)",
				"Al Qamar (La lune)",
				"Ar-Rahman (Le Mis\u00e9ricordieux)",
				"Al Waqi\'a (L\'\u00e9v\u00e8nement)",
				"Al Hadid (Le fer)",
				"Al Mujadala (La discussion)",
				"Al Hashr (L\'exode)",
				"Al Mumtahana (L\'\u00e9prouv\u00e9e)",
				"As-Saff (Les rangs)",
				"Al Jumu\'a (Le vendredi)",
				"Al Munafiqoon (Les hypocrites)",
				"At-Taghabun (La grande perte)",
				"At-Talaq (Le divorce)",
				"At-Tahrim (L\'interdiction)",
				"Al Mulk (La royaut\u00e9)",
				"Al Qalam (La plume)",
				"Al Haqqah (Celle qui montre la v\u00e9rit\u00e9)",
				"Al Ma\'arij (Les voies d\'ascension)",
				"Nuh (No\u00e9)",
				"Al Jinn",
				"Al Muzzammil (L\'envelopp\u00e9)",
				"Al Muddathir (Le rev\u00eatu d\'un manteau)",
				"Al Qiyama (LA r\u00e9surrection)",
				"Al Insan (L\'homme)",
				"Al Mursalat (Les envoy\u00e9s)",
				"An-Naba (La nouvelle)",
				"An-Nazi\'at (Les anges qui arrachent les \u00e2mes)",
				"\'Abasa (Il s\'est renfrogn\u00e9)",
				"At-Takweer (L\'obscursissement)",
				"Al Infitar (La rupture)",
				"Al Mutaffifin (Les fraudeurs)",
				"Al Inshiqaq (La d\u00e9chirure)",
				"Al Buruj (Les constellations)",
				"At-Tariq (L\'astre nocturne)",
				"Al A\'la (Le Tr\u00e8s-Haut)",
				"Al Ghashiya (L\'enveloppante)",
				"Al Fajr (L\'aube)",
				"Al Balad (La cit\u00e9)",
				"Ash-Shams (Le soleil)",
				"Al Layl (La nuit)",
				"Ad-Duha (Le jour montant)",
				"Ash-Sharh (L\'ouverture)",
				"At-Teen (Le figuier)",
				"Al \'Alaq (L\'adh\u00e9rence)",
				"Al Qadr (La destin\u00e9e)",
				"Al Bayyina (La preuve)",
				"Al Zalzala (La secousse)",
				"Al \'adiyat (Les coursiers)",
				"Al Qari\'a (Le fracas)",
				"At-Takathur (La course aux richesses)",
				"Al \'Asr (Le temps)",
				"Al Humaza (Les calomniateurs)",
				"Al Fil (L\'\u00e9l\u00e9phant)",
				"Quraysh (Les Quraysh)",
				"Al Ma\'un (L\'ustensile)",
				"Al Kawthar (L\'abondance)",
				"Al kafiroon (Les infid\u00e8les)",
				"An-Nasr (Le secours)",
				"Al Masad (Les fibres)",
				"Al Ikhlas (Le monoth\u00e9isme pur)",
				"Al Falaq (L\'aube naissante)",
				"An-Nas (Les gens)"
			];
			return lestitres[numerosourate];
		}
		var labeltosuratname = getsuratByNumber(name);
		mymodallabel.html(labeltosuratname);
		modalbody.html('<h3>surate '+name+' verset '+numerovers+'</h3><div id="resultatayat"><p id="resultatayatuth">Veuillez sélectionner un nombre entre 1 et 6236 (versets). </p><p id="resultatimg"></p><p id="resultatrecitation"></p><p id="resultatayatfr"></p><p id="resultatayaten"></p></div>');
		
			$.ajax({
						url : "https://api.ascmv.net/hadith/api/mode/UTH-NUMBERS/num/"+numerovers+"/callback/?",
						dataType:"jsonp",
						jsonp:"callback",
						success:function(data)
						{
							var eleme = $('#resultatayatuth');
					var numsourate = data.numsurateUTH;
					var ayat = data.numayatUTH;
					eleme.html( '<b>Ayat numero :</b> '+numerovers+'<br><b>Sourate :</b> '+data.numsurateUTH+'<br><b>Verset numero:</b>'+data.numayatUTH+'<br><b> Verset : </b><p class="surateuthman" dir="rtl" lang="ar" style="font-size:200%;    line-height: 200%;">'+data.versetUTH+'</p>');
						ayatfr(numsourate, ayat);
						recitation(numsourate, ayat);
						eleme.className = 'aya';
						}
					});
			function ayatfr(numsourate, ayat){

			var elementfr = $('#resultatayatfr');
			$.ajax({
						url : "https://api.ascmv.net/hadith/api/mode/FR-AYATONLY/surat/"+numsourate+"/aya/"+ayat+"/callback/?",
						dataType:"jsonp",
						jsonp:"callback",
						success:function(data)
						{
					
					elementfr.html('<b>FR :</b> '+data.versetFR+'</p>');
						ayaten(numsourate, ayat);
							elementfr.className = 'aya';
						}
					});

			}
			function ayaten(numsourate, ayat){
			var elementen = $('#resultatayaten');
			$.ajax({
						url : "https://api.ascmv.net/hadith/api/mode/EN-AYATONLY/surat/"+numsourate+"/aya/"+ayat+"/callback/?",
						dataType:"jsonp",
						jsonp:"callback",
						success:function(data)
						{
					
					elementen.html('<b>EN :</b> '+data.versetEN+'</p>');
						loadimg(numsourate, ayat);
							elementen.className = 'aya';
						}
					});

			}
			function loadimg(numsourate, ayat){
			var elementimg = $('#resultatimg');
			$.ajax({
						url : "https://api.ascmv.net/hadith/api/mode/IMG-LOW/surat/"+numsourate+"/aya/"+ayat+"/callback/?",
						dataType:"jsonp",
						jsonp:"callback",
						success:function(data)
						{
					
					elementimg.html('<img src="'+data.imgurl+'" width="100%" />');
							elementimg.className = 'aya';
						}
					});

			}
			function recitation(numsourate, ayat){
			$('#resultrecitation').contents().remove();
			var cheikh = 'HUSARY';
			var elementrecitation = $('#resultatrecitation');
			//autoplay="autoplay"
			  
					$.ajax({
						url : "https://api.ascmv.net/hadith/api/mode/MP3-"+cheikh+"/surat/"+numsourate+"/aya/"+ayat+"/callback/?",
						dataType:"jsonp",
						jsonp:"callback",
						success:function(data)
						{
					var cheikhtolower = cheikh.toLowerCase();
					elementrecitation.html('<b>Cheikh '+cheikhtolower+'</b><br><audio controls style="width: 100%;"><source src="'+data.mp3+'" type="audio/mpeg">Votre navigateur ne supporte pas les balises audio.</audio>');
							elementrecitation.className = 'aya';
						}
					}); 
			}		
	});	//modification de modal terminée   
}
