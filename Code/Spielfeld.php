<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="de">
	<head>
		<script type="text/javascript">window["_gaUserPrefs"] = { ioo : function() { return true; } }</script>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="UTF-8">
		<title>RCT-PRG</title>
		<style type="text/css">
		body {
			margin: 0px;
			padding: 0px;
			width: 100%;
			overflow: hidden;
		}
		html, body {
			height: 100%;
		}
		div {
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
		</style>

	</head>
	<body onload="load()" onresize="resize()" onmousedown="mousedown()">
		<div class="container">
			<div class="playerrow" id="toprow">
				<div class="center">
					<div class="cardwrapper middle" id="tophand">
					</div>
					<div class="playerstats2" id="playerstats2">
						<div class="playericon2">
						
						</div>
						<div class="playerlife2">
						
						</div>
						<div class="playermana2">
						
						</div>
						<div id="playerinfo2" class="playerinfo middle"></div>
					</div>
				</div>
			</div>
			<div class="battlefield center">
				<div class="field middle center" id="field">
				
				</div>
				<div class="previewwrapper">
					<img class="card_preview" id="card_preview" />
					<div class="cardaction"><br><br></div>
				</div>
			</div>
			<div class="playerrow" id="botrow">
				<div class="center">
					<div class="cardwrapper middle" id="bothand">
					</div>
					<div class="playerstats1" id="playerstats1">
						<div class="playermana1">
						
						</div>
						<div class="playerlife1">
						
						</div>
						<div class="playericon1">
						
						</div>
						<div id="playerinfo1" class="playerinfo middle"></div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
