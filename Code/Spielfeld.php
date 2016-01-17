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
		
		<!-- Der CSS Teil wird jetzt über eine externe Datei eingebunden 
		
		body {
			margin: 0px;
			padding: 0px;
			width: 100%;
			overflow: hidden;
		}
		html, body {
			height: 100%;
		}
		article {
			margin: 0px;
			padding: 0px;
			height: 100%;
		}
		.container {
			margin: 0px;
			padding: 0px;
			width: 100%;
			height: 100%;
		}
		.playerrow {
			width: 100%;
			height: 24%;
		}
		.toprow {
			padding-top: -80px;
			padding-bottom: 80px;
		}
		.botrow {
			padding-top: 80px;
			padding-bottom: -80px;
		}
		.battlefield {
			width: 100%;
			height: 52%;
		}
		.cardwrapper {
			height: 90%;
			text-align: center;
			display: inline-block;
		}
		.card {
			float: left;
			margin-left: 5px;
			margin-right: 5px;
		}
		.cardtop {
			margin-top: -80px;
			margin-bottom: 80px;
			transform: rotate(180deg);
		}
		.cardbot {
			margin-top: 80px;
			margin-bottom: -80px;
		}
		.center {
			text-align: center;
		}
		.middle {
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
		.field {
			width: 500px;
			height: 500px;
			outline: 1px solid black;
			margin: 0 auto;
		}
		.playerstats1 {
			padding-left: 0;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			float: left;
			width: 200px;
			background-color: lightgray;
		}
		.playericon1 {
			top: 80%;
			left: 0;
			padding-bottom:100%;
			position: relative;
			background-color: gray;
		}
		.playerlife1 {
			float: left;
			position: absolute;
			background-color: red;
		}
		.playermana1 {
			float: left;
			position: absolute;
			background-color: blue;
		}
		.playerstats2 {
			padding-left: 0;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			float: right;
			width: 200px;
			background-color: lightgray;
		}
		.playericon2 {
			right: 0;
			position: relative;
			background-color: gray;
		}
		.playerlife2 {
			float: right;
			position: absolute;
			background-color: red;
		}
		.playermana2 {
			float: right;
			position: absolute;
			background-color: blue;
		}
		.playerinfo {
			height: auto;
			position: absolute;
			font-size: 16pt;
			display: block;
		}
		.previewwrapper {
			padding-left: 0;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			float: right;
			left: 70%;
			display: none;
		}
		.cardaction {
			height: auto;
		}
		-->
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
