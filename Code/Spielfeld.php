<!DOCTYPE html>
<html lang="de">
	<head>
		<script type="text/javascript">window["_gaUserPrefs"] = { ioo : function() { return true; } }</script>
			
		<!-- Einbindung der Javascript Funktionen -->	
		<script src="jsfunctions.js"></script>
		
		<!-- Kann weggelassen werden!!! Zeile 13 reicht. 
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		-->
		<meta charset="UTF-8">
		<title>RCT-PRG</title>
		
			<!-- Dieser CSS Teil kann in eine eigene Datei gebracht werden -->
			
		<style type="text/css">
		
		
		<script src="style.css"></script>
		
		<!-- Der CSS Teil wird jetzt über eine externe Datei eingebunden -->
		</style>

		
		<!-- Inhalte welche mit dem CSS Code dargestellt werden -->
	</head>
	<body onload="load()" onresize="resize()" onmousedown="mousedown()">
		<section class="container">
			<article class="playerrow" id="toprow">
				<article class="center">
					<article class="cardwrapper middle" id="tophand">
					</article>
					<article class="playerstats2" id="playerstats2">
						<article class="playericon2">
						
						</article>
						<article class="playerlife2">
						
						</article>
						<article class="playermana2">
						
						</article>
						<article id="playerinfo2" class="playerinfo middle"></article>
					</article>
				</article>
			</article>
			
			<article class="battlefield center">
				
				<article class="field middle center" id="field">
					</article>
				
				<article class="previewwrapper">
					<img class="card_preview" id="card_preview" />
					<article class="cardaction"><br><br></article>
				</article>
				
			</article>
			
			<article class="playerrow" id="botrow">
				<article class="center">
					<article class="cardwrapper middle" id="bothand">
						</article>
					
					<article class="playerstats1" id="playerstats1">
						<article class="playermana1">
						</article>

						<article class="playerlife1">						
						</article>
						
						<article class="playericon1">						
						</article>
						
						<article id="playerinfo1" class="playerinfo middle">
						</article>
					</article>
				</article>
			</article>
		</section>
	</body>
</html>
