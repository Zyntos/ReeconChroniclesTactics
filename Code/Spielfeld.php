<!DOCTYPE html>
<html lang="de">
	<head>
		
		<script type="text/javascript">window["_gaUserPrefs"] = { ioo : function() { return true; } }</script>
			
		<!-- Einbindung der Javascript Funktionen -->	
		<script src="jsfunctions.js"></script>
		
		<meta charset="UTF-8">
		<title>RCT-PRG</title>
			
		<!-- Einbindung der CSS Daten -->
		
		<link rel="stylesheet" href="style.css"\>
			
	</head>


	<!-- Inhalte welche mit dem CSS Code dargestellt werden -->


	<body onload="load()" onresize="resize()" onmousedown="mousedown()">
		<main class="container">
		
		<!-- Spieler "Oben" -->
		
			<section class="playerrow" id="toprow">
				<article class="center">
					<header class="cardwrapper middle" id="tophand">
					</header>
					<figcaption class="playerstats2" id="playerstats2">
						<figure class="playericon2">
						
						</figure>
						<figure class="playerlife2">
						
						</figure>
						<figure class="playermana2">
						
						</figure>
						<figure id="playerinfo2" class="playerinfo middle"></figure>
					</figcaption>
				</article>
			</section>
		

		<!-- Spielfeld -->
		
			<section class="battlefield center">
				
				<article class="field middle center" id="field">
					</article>
				
				<figure class="previewwrapper">
					<img class="card_preview" id="card_preview" />
					<article class="cardaction"><br><br></article>
				</figure>
				
			</section>
			
			
		<!-- Spieler "Unten" -->
	
			<section class="playerrow" id="botrow">
				<article class="center">
					<footer class="cardwrapper middle" id="bothand">
						</footer>
					
					<figcaption class="playerstats1" id="playerstats1">
						<figure class="playermana1">
						</figure>

						<figure class="playerlife1">						
						</figure>
						
						<figure class="playericon1">						
						</figure>
						
						<figure id="playerinfo1" class="playerinfo middle">
						</figure>
					</figcaption>
				</article>
			</section>
		</main>
	</body>
</html>
