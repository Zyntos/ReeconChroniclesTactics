/* Ich würde die Datenbank ja über php einbinden, inwievern das über javascript zu steuern ist weiß ich zu jetzigen nicht.
Dazu kommt das da die Karteneffeckte noch nicht eingebunden sind und desshalb eine Datenbank noch nicht einbindbar ist.
Im umkehrschluss heißt das ich die Datenbank zum speichern der Namen und 
Karteneffeckte (da diese sich ja ehneln zb. bei schieße so und soviel schaden Effeckt)nutzen würde, um eine Redundanz zu vermeiden.
*/


// Variablen
var windowHeight = 0;
var ratio = 0;
		
var cardBaseWidth = 136;
var cardBaseHeight = 206;
		
var cardHoverPlayer = 0;
var cardSelectPlayer = 0;
		
var cardHover = -1;
var cardSelect = -1;
		
var previewActive = false;
		
// Konstanten
var PHASE_DRAW = 1;
var PHASE_MOVE = 2;
var PHASE_MAIN = 3;
var PHASE_END = 4;
		
var PLAYER_RED = 1;
var PLAYER_BLUE = 2;



// Karten-IDs und Kartendaten (Temporär, bis Kartendatenbank steht, dann werden die Karten aus der Datenbank gelesen, jetzt nur zum Test der Funktionen)
		var cards = ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010","0011"];
		
		var carddata = {
			"0001":{
				"mana":2,
				"name":"Feuerball",
				"effect":{
					0:{
						"type":"damage",
						"target":"enemy",
						"value":3
					}
				},
				"range":2,
				"direction":"diagonal",
			},
			"0002":{
				"mana":1,
				"name":"Geschenk des Himmels",
				"effect":{
					0:{
						"type":"heal",
						"target":"self",
						"value":3
					}
				}
			},
			"0003":{
				"mana":3,
				"name":"Eisball",
				"effect":{
					0:{
						"type":"status",
						"target":"enemy",
						"value":"freeze",
						"duration":1,
						"timerevent":"player_phase_move"
					}
				},
				"range":3,
				"direction":"radial"
			},
			"0004":{
				"mana":3,
				"name":"Zauberlähmung",
				"effect":{
					0:{
						"type":"status",
						"target":"enemy",
						"value":"silence",
						"duration":1,
						"timerevent":"player_phase_end"
					}
				},
				"range":2,
				"direction":"linear"
			},
			"0005":{
				"mana":4,
				"name":"Donnerschuss",
				"effect":{
					0:{
						"type":"damage",
						"target":"enemy",
						"value":2
					},
					1:{
						"type":"knockback",
						"target":"enemy",
						"value":2
					}
				},
				"range":2,
				"direction":"linear"
			},
			"0006":{
				"mana":4,
				"name":"Tobendes Inferno",
				"effect":{
					0:{
						"type":"damage",
						"target":"self",
						"value":3
					},
					1:{
						"type":"damage",
						"target":"enemy",
						"value":5
					}
				},
				"range":2,
				"direction":"radial"
			},
			"0007":{
				"mana":3,
				"name":"Segnung",
				"effect":{
					0:{
						"type":"heal",
						"target":"self",
						"value":2
					},
					1:{
						"type":"shield",
						"target":"self",
						"value":3,
					},
					2:{
						"type":"timerevent",
						"target":"self",
						"duration":1,
						"value":"player_phase_draw",
						"callback":function(player){
							destroyShield(player, 3);
						}
					}
				}
			},
			"0008":{
				"mana":4,
				"name":"Topf der Gier",
				"effect":{
					0:{
						"type":"card_draw",
						"target":"self",
						"value":2
					}
				}
			},
			"0009":{
				"mana":8,
				"name":"Wiederholen",
				"effect":{
					0:{
						"type":"card_graveyard_to_deck",
						"target":"self",
						"value":3
					},
					1:{
						"type":"card_graveyard_to_deck",
						"target":"enemy",
						"value":3
					},
					2:{
						"type":"card_draw",
						"target":"self",
						"value":1
					},
					3:{
						"type":"card_draw",
						"target":"enemy",
						"value":1
					}
				}
			},
			"0010":{
				"mana":5,
				"name":"Zauberreproduktion",
				"effect":{
					
				},
			},
			"0011":{
				"mana":3,
				"name":"Schneller Einfall",
				"effect":{
					
				},
			},
			"0012":{
				"mana":6,
				"name":"Hammerschlag",
				"effect":{
					0:{
						"type":"damage",
						"target":"enemy",
						"value":4
					},
					1:{
						"type":"damage_random",
						"target":"enemy",
						"value":"1-6"
					}
				},
				"range":2,
				"direction":"linear"
			}
		}
		
		// Spieldaten
		var startplayer = 0
		
		var round = 0;
		var activePlayer = 0;
		var phase = 0;
		var phaseAction = false;
		var discardMode = false;
		
		// Spielerdaten
		var playerRed = {};
		var playerBlue = {};
		
		// ----------------------------- Spielfunktionen ----------------------------- \\
		
		//IDs der Spieler und Gegner finden - Info auslesen
		
		var getPlayerById = function(id) {
			if(id == 1) return playerRed;
			if(id == 2) return playerBlue;
		}
		
		var setPlayerInfo = function(player, text) {
			document.getElementById("playerinfo"+player["id"]).innerHTML = text;
			if(player["id"] == 1) {
				document.getElementById("playerinfo"+player["id"]).style.left = (document.getElementById("playerstats"+player["id"]).offsetWidth)/2-(document.getElementById("playerinfo"+player["id"]).offsetWidth)/2;
			}
			else {
				document.getElementById("playerinfo"+player["id"]).style.right = (document.getElementById("playerstats"+player["id"]).offsetWidth)/2-(document.getElementById("playerinfo"+player["id"]).offsetWidth)/2;
			}
		};
		
		var getEnemy = function(player) {
			if(player == playerRed) {
				return playerBlue;
			}
			
			return playerRed;
		}
		
		// Karteneffekte
		
		var damagePlayer = function(player, amount) {
			if(player["life"] <= 0 || getEnemy(player)["life"] <= 0) return;
			
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			var remainingShield = player["shield"] - amount;
			
			if(remainingShield > 0) {
				player["shield"] = remainingShield;
			}
			else {
				player["shield"] = 0;
				player["life"] += remainingShield;
			}
			
			if(player["life"] <= 0) {
				if(player == playerRed) {
					document.getElementById("playerinfo1").innerHTML = "Verlierer!";
					document.getElementById("playerinfo2").innerHTML = "Gweinner!";
				}
				else {
					document.getElementById("playerinfo2").innerHTML = "Verlierer!";
					document.getElementById("playerinfo1").innerHTML = "Gweinner!";
				}
				resize();
			}
		}
		
		var destroyShield = function(player, amount) {
			player["shield"] -= amount;
			
			if(player["shield"] < 0) player["shield"] = 0;
		}
		
		var removeCard = function(player, card) {
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			var hand = player["hand"];
			
			var newHand = [];
			
			if(card == cardSelect && player["id"] == cardSelectPlayer) unselectCard();
			
			for(var i = 0; i < hand.length; i++) {
				if(i == card-1) {
					player["graveyard"].push(hand[i]);
				}
				else {
					newHand.push(hand[i]);
				}
			}
			
			player["hand"] = newHand;
			
			render();
		}
		
		var hasBuff = function(player, buffName) {
			for(var buff in player["buff"]) {
				if(buff["value"] == buffName) return true;
			}
			
			return false;
		}
		
		var hasTrigger = function(player, triggerName) {
			for(var buff in player["buff"]) {
				if(buff["trigger"] != null && buff["trigger"] != undefined && buff["trigger"].split(":")[0] == triggerName) return true;
			}
			
			return false;
		}
		
		var getTrigger = function(player, triggerName) {
			var triggers = [];
			
			for(var buff in player["buff"]) {
				if(buff["trigger"] != null && buff["trigger"] != undefined && buff["trigger"].split(":")[0] == triggerName) {
					triggers.push(buff["trigger"].split(":")[1]);
				}
			}
			
			return triggers;
		}
		
		var activate = function(player, c) {
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			if(!canActivate(player, c)) return false;
			
			var card = carddata[c];
			
			player["mana"] -= card["mana"];
			
			var effects = card["effect"];
			
			for (var i in effects) {
				if (effects.hasOwnProperty(i)) {
					var effect = effects[i];
					
					var target;
						
					if(effect["target"] == "enemy") target = getEnemy(player);
					else target = player;
					
					if(effect["type"] == "damage") {
						damagePlayer(target, effect["value"]);
					}
					if(effect["type"] == "damage_random") {
						var values = effect["value"].split("-");

						damagePlayer(target, Math.floor((Math.random() * (values[1]-values[0]+1)) + values[0]));
					}
					if(effect["type"] == "heal") {
						target["life"] += effect["value"];
						
						if(target["life"] > target["lifeMax"]) target["life"] = target["lifeMax"];
					}
					if(effect["type"] == "card_draw") {
						for(var i = 0; i < effect["value"]; i++) drawCard(target);
					}
					if(effect["type"] == "knockback") {
						var deltaX = target["x"] - player["x"];
						var deltaY = target["y"] - player["y"];
						
						if(deltaX == 0) {
							if(deltaY < 0) target["y"] -= effect["value"];
							if(deltaY > 0) target["y"] += effect["value"];
							
							if(target["y"] > 5) target["y"] = 5;
							if(target["y"] < 1) target["y"] = 1;
						}
						if(deltaY == 0) {
							if(deltaX < 0) target["x"] -= effect["value"];
							if(deltaX > 0) target["x"] += effect["value"];
							
							if(target["x"] > 5) target["x"] = 5;
							if(target["x"] < 1) target["x"] = 1;
						}
					}
					if(effect["type"] == "shield") {
						target["shield"] += effect["value"];
					}
					if(effect["type"] == "status") {
						target["buff"].push(clone(effect));
					}
				}
			}
			
			removeCard(player, cardSelect);
			
			renderField();
			
			renderPlayerStatistics();
		}
		
		var canActivate = function(player, c, ignorePhase) {
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			var card = carddata[c];
			
			if(activePlayer != player) {
				console.log("not your turn");
				return false;
			}
			
			if(phase != PHASE_MAIN && !ignorePhase) {
				console.log("not main phase");
				return false;
			}
			
			for(var i in player["buff"]) {
				if(player["buff"][i]["value"] == "silence") {
					console.log("you are silenced");
					return false;
				}
			}
			
			distance = Math.sqrt(Math.pow(playerRed["x"] - playerBlue["x"], 2) + Math.pow(playerRed["y"] - playerBlue["y"], 2));
			isLinear = playerRed["x"] - playerBlue["x"] == 0 || playerRed["y"] - playerBlue["y"] == 0;
			isDiagonal = Math.abs(playerRed["x"] - playerBlue["x"]) == Math.abs(playerRed["y"] - playerBlue["y"]);
			
			if(card["mana"] > player["mana"]) {
				console.log("insufficient mana");
				return false;
			}
			if(card["direction"] == "linear" && (!isLinear || card["range"] < distance)) {
				console.log("not in linear position");
				return false;
			}
			if((card["direction"] == "diagonal" && !isDiagonal) || ("range" in card && Math.abs(playerRed["x"] - playerBlue["x"]) > card["range"])) {
				console.log("not in diagonal position");
				return false;
			}
			if("range" in card && card["range"] < distance && card["direction"] == "radial") {
				console.log("out of range");
				return false;
			}
			
			return true;
		};
		
		//Bewegungsfunktion
		
		var move = function(player, x, y) {
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			if(phase == PHASE_MOVE) {
				var enemy = getEnemy(player);
				
				if(enemy["x"] != x || enemy["y"] != y) {
					if(Math.sqrt(Math.pow(player["x"]-x,2)+Math.pow(player["y"]-y,2)) > 1.5) return;
					
					player["x"] = x;
					player["y"] = y;
					
					setPhase(PHASE_MAIN);
					phaseAction = false;
				}
			}
		};
		
		
		// ----------------------------- Phasen ----------------------------- \\
		
		setInterval(function() {
			renderPreview();
			
			// display infos
			if(!phaseAction) {
				if(phase == PHASE_DRAW) {
					phaseAction = true;
					if(activePlayer["manaMax"] < 10) {
						activePlayer["manaMax"]++;
					}
					activePlayer["mana"] = activePlayer["manaMax"];
					
					render();
					
					setPlayerInfo(activePlayer, "Draw Phase<br /><input type=\"button\" style=\"width: 200; height: 150;\" onclick=\"drawCard("+activePlayer["id"]+");setPhase(PHASE_MOVE);\" value=\"Draw Card\">");
				}
				else if(phase == PHASE_MOVE) {
					phaseAction = true;
					
					render();
					
					setPlayerInfo(activePlayer, "Move Phase<br /><input type=\"button\" style=\"width: 200; height: 150;\" onclick=\"setPhase(PHASE_MAIN);\" value=\"Skip\">");
				}
				else if(phase == PHASE_MAIN) {
					phaseAction = true;
					
					render();
					
					setPlayerInfo(activePlayer, "Main Phase<br /><input type=\"button\" style=\"width: 200; height: 150;\" onclick=\"setPhase(PHASE_END);\" value=\"End Turn\">");
				}
				else if(phase == PHASE_END) {
					setPlayerInfo(activePlayer, "");
					
					unselectCard();
					
					render();
					
					if(activePlayer["hand"].length <= 5) {
						activePlayer = getEnemy(activePlayer);
						if(activePlayer == startplayer) round++;
						setPhase(PHASE_DRAW);
					}
					else {
						setPlayerInfo(activePlayer, "Discard "+(activePlayer["hand"].length-5)+" card(s)");
						
						resize();
						
						phaseAction = true;
						discardMode = true;
					}
				}
			}
			
			updateCardPositions();
		}, 20);
		
		var updateCardPositions = function() {
			for(var i = 1; i <= 10; i++) {
				if(document.getElementById("card_1_"+i) != null) {
					if((i == cardHover && cardHoverPlayer == 1) || (i == cardSelect && cardSelectPlayer == 1)) {
						document.getElementById("card_1_"+i).style.margin = (50*ratio)+"px 5px "+(-50*ratio)+"px 5px";
					}
					else {
						document.getElementById("card_1_"+i).style.margin = (80*ratio)+"px 5px "+(-80*ratio)+"px 5px";
					}
				}
				
				
				if(document.getElementById("card_2_"+i) != null) {
					if((i == cardHover && cardHoverPlayer == 2) || (i == cardSelect && cardSelectPlayer == 2)) {
						document.getElementById("card_2_"+i).style.margin = (-50*ratio)+"px 5px "+(50*ratio)+"px 5px";
					}
					else {
						document.getElementById("card_2_"+i).style.margin = (-80*ratio)+"px 5px "+(80*ratio)+"px 5px";
					}
				}
			}
		}
		
		var setPhase = function(p) {
			phase = p;
			
			onPhaseStart(activePlayer, p);
			
			phaseAction = false;
		}
		
		var onPhaseStart = function(player, phase) {
			var enemy = getEnemy(player);
			
			var phaseName;
			
			if(phase == PHASE_DRAW) phaseName = "draw";
			if(phase == PHASE_MOVE) phaseName = "move";
			if(phase == PHASE_MAIN) phaseName = "main";
			if(phase == PHASE_END ) phaseName = "end";
			
			buffTick(player, "player_phase_"+phaseName);
			buffTick(enemy,   "enemy_phase_"+phaseName);
		}
		
		var buffTick = function(player, phaseValue) {
			var newBuffsPlayer = [];
			
			for(var i in player["buff"]) {
				if(player["buff"][i] != null && player["buff"][i] != undefined && (player["buff"][i]["value"] == phaseValue || player["buff"][i]["timerevent"] == phaseValue)) {
					player["buff"][i]["duration"] -= 1;
					
					if(player["buff"][i]["duration"] <= 0) {
						if("callback" in player["buff"][i]) player["buff"][i]["callback"](player);
						
						if(player["buff"][i]["value"] == "freeze") setPhase(PHASE_MAIN);
					}
					else {
						newBuffsPlayer.push(player["buff"][i]);
					}
				}
				else {
					newBuffsPlayer.push(player["buff"][i]);
				}
			}
				
			player["buff"] = newBuffsPlayer;
			
			render();
		}
		
		var drawCard = function(player) {
			if(player == 1 || player == 2) player = getPlayerById(player);
			
			player["hand"].push(cards[Math.floor(Math.random() * cards.length)]);
			
			render();
		};
		
		// Initalisierung der Spielerdaten
		
		var initGame = function() {
			playerRed = {
				"id":1,
				"x":3,
				"y":5,
				"life":20,
				"lifeMax":20,
				"mana":0,
				"manaMax":0,
				"shield":0,
				"hand":[],
				"buff":[],
				"graveyard":[]
			}
			
			playerBlue = {
				"id":2,
				"x":3,
				"y":1,
				"life":20,
				"lifeMax":20,
				"mana":0,
				"manaMax":0,
				"shield":0,
				"hand":[],
				"buff":[],
				"graveyard":[]
			}
			
			if(Math.random() < 0.5) {
				startplayer = playerRed;
			}
			else {
				startplayer = playerBlue;
			}
			
			renderPlayerStatistics();
			
			round = 1;
			activePlayer = startplayer;
			setPhase(PHASE_DRAW);
			
			for(var i = 0; i < 3; i++) {
				drawCard(playerRed);
				drawCard(playerBlue);
			}
		};
		
		// ----------------------------- Renderfunktionen ----------------------------- \\
		
		var resize = function() {
			windowHeight = document.documentElement.clientHeight;
						
			ratio = windowHeight / 1000;
			
			// Karten & Kartenvorschau
			for(var i = 0, p = document.getElementsByClassName("card_hand"); i < p.length; i++) {
				p[i].style.width = cardBaseWidth*ratio+"px";
				p[i].style.height = cardBaseHeight*ratio+"px";
			}
			document.getElementsByClassName("card_preview")[0].style.width = cardBaseWidth*1.7*ratio+"px";
			document.getElementsByClassName("card_preview")[0].style.height = cardBaseHeight*1.7*ratio+"px";
			document.getElementsByClassName("previewwrapper")[0].style.width = cardBaseWidth*1.7*ratio+"px";
			document.getElementsByClassName("previewwrapper")[0].style.height = cardBaseHeight*1.7*ratio+"px";
			
			// Statusleisten der Spieler
			document.getElementsByClassName("playerstats1")[0].style.width = 200*ratio+"px";
			document.getElementsByClassName("playericon1")[0].style.width = document.getElementsByClassName("playerstats1")[0].offsetWidth+"px";
			document.getElementsByClassName("playericon1")[0].style.height = document.getElementsByClassName("playerstats1")[0].offsetWidth+"px";
			document.getElementsByClassName("playericon1")[0].style.top = (document.documentElement.clientHeight - document.getElementsByClassName("playerstats1")[0].offsetWidth)+"px";
			document.getElementsByClassName("playerlife1")[0].style.width = "50%";
			document.getElementsByClassName("playerlife1")[0].style.height = document.getElementsByClassName("playerlife1")[0].offsetWidth+"px";
			document.getElementsByClassName("playerlife1")[0].style.top = (document.documentElement.clientHeight - document.getElementsByClassName("playerstats1")[0].offsetWidth - document.getElementsByClassName("playerlife1")[0].offsetWidth)+"px";
			document.getElementsByClassName("playerlife1")[0].style.left = document.getElementsByClassName("playerlife1")[0].offsetWidth+"px";
			document.getElementsByClassName("playermana1")[0].style.width = "50%";
			document.getElementsByClassName("playermana1")[0].style.height = document.getElementsByClassName("playermana1")[0].offsetWidth+"px";
			document.getElementsByClassName("playermana1")[0].style.top = (document.documentElement.clientHeight - document.getElementsByClassName("playerstats1")[0].offsetWidth - document.getElementsByClassName("playermana1")[0].offsetWidth)+"px";
						
			document.getElementsByClassName("playerstats2")[0].style.width = 200*ratio+"px";
			document.getElementsByClassName("playerstats2")[0].style.left = (document.documentElement.clientWidth - document.getElementsByClassName("playerstats2")[0].offsetWidth)+"px";
			document.getElementsByClassName("playericon2")[0].style.width = document.getElementsByClassName("playerstats2")[0].offsetWidth+"px";
			document.getElementsByClassName("playericon2")[0].style.height = document.getElementsByClassName("playerstats2")[0].offsetWidth+"px";
			document.getElementsByClassName("playerlife2")[0].style.width = "50%";
			document.getElementsByClassName("playerlife2")[0].style.height = document.getElementsByClassName("playerlife2")[0].offsetWidth+"px";
			document.getElementsByClassName("playermana2")[0].style.width = "50%";
			document.getElementsByClassName("playermana2")[0].style.height = document.getElementsByClassName("playermana2")[0].offsetWidth+"px";
			document.getElementsByClassName("playermana2")[0].style.left = document.getElementsByClassName("playerlife2")[0].offsetWidth+"px";
			
			document.getElementById("playerinfo1").style.left = (document.getElementsByClassName("playerstats1")[0].offsetWidth)/2-(document.getElementById("playerinfo1").offsetWidth)/2+"px";
			document.getElementById("playerinfo2").style.right = (document.getElementsByClassName("playerstats2")[0].offsetWidth)/2-(document.getElementById("playerinfo2").offsetWidth)/2+"px";
			
			// Spielfeld
			var fieldSize = Math.round(500*ratio) - Math.round(500*ratio) % 5;
			
			document.getElementById("field").style.width = fieldSize+"px";
			document.getElementById("field").style.height = fieldSize+"px";
			
			document.getElementById("red").style.width = 60*ratio+"px";
			document.getElementById("red").style.height = 60*ratio+"px";
			document.getElementById("red").style.left = ((playerRed["x"]-1)*20+10)+"%";
			document.getElementById("red").style.left = (document.getElementById("red").offsetLeft - (60*ratio)/2)+"px";
			document.getElementById("blue").style.width = 60*ratio+"px";
			document.getElementById("blue").style.height = 60*ratio+"px";
			document.getElementById("blue").style.left = ((playerBlue["x"]-1)*20+10)+"%";
			document.getElementById("blue").style.left = (document.getElementById("blue").offsetLeft - (60*ratio)/2)+"px";
						
			renderPlayerStatistics();
						
			updateCardPositions();
		};
		
		var renderPlayerStatistics = function() {
			windowHeight = document.documentElement.clientHeight;
						
			ratio = windowHeight / 1000;
			
			document.getElementsByClassName("playerlife1")[0].innerHTML = "<div class=\"middle\" style=\"display: inline-block; height: auto; font-size: "+(30*ratio)+"pt;"+(playerRed["shield"] > 0 ? " color: blue;" : "")+"\">"+(playerRed["life"]+playerRed["shield"])+"/"+playerRed["lifeMax"]+"</div>";
			document.getElementsByClassName("playermana1")[0].innerHTML = "<div class=\"middle\" style=\"display: inline-block; height: auto; font-size: "+(30*ratio)+"pt;\">"+playerRed["mana"]+"/"+playerRed["manaMax"]+"</div>";
			document.getElementsByClassName("playerlife2")[0].innerHTML = "<div class=\"middle\" style=\"display: inline-block; height: auto; font-size: "+(30*ratio)+"pt;"+(playerBlue["shield"] > 0 ? " color: blue;" : "")+"\">"+(playerBlue["life"]+playerBlue["shield"])+"/"+playerBlue["lifeMax"]+"</div>";
			document.getElementsByClassName("playermana2")[0].innerHTML = "<div class=\"middle\" style=\"display: inline-block; height: auto; font-size: "+(30*ratio)+"pt;\">"+playerBlue["mana"]+"/"+playerBlue["manaMax"]+"</div>";
		};
		
		var renderHand = function() {
			document.getElementById("tophand").innerHTML = "";
			document.getElementById("bothand").innerHTML = "";
			
			for(var i = 0; i < playerBlue["hand"].length; i++) {
				document.getElementById("tophand").innerHTML += "<img src=\"img/"+playerBlue["hand"][i]+".png\" onmouseenter=\"cardHoverPlayer=2;cardHover="+(i+1)+"\" onmouseleave=\"cardHover=-1\" class=\"card cardtop card_hand\" id=\"card_2_"+(i+1)+"\" "+(canActivate(activePlayer, playerBlue["hand"][i], true) && activePlayer == playerBlue ? "style=\"outline: 3px solid blue;\"" : "")+" />";
			}
			
			for(var i = 0; i < playerRed["hand"].length; i++) {
				document.getElementById("bothand").innerHTML += "<img src=\"img/"+playerRed["hand"][i]+".png\" onmouseenter=\"cardHoverPlayer=1;cardHover="+(i+1)+"\" onmouseleave=\"cardHover=-1\" class=\"card cardbot card_hand\" id=\"card_1_"+(i+1)+"\" "+(canActivate(activePlayer, playerRed["hand"][i], true) && activePlayer == playerRed ? "style=\"outline: 3px solid blue;\"" : "")+" />";
			}
			
			resize();
		};
					
		var renderField = function() {
			windowHeight = document.documentElement.clientHeight;
						
			ratio = windowHeight / 1000;
			
			document.getElementById("field").innerHTML = "";
			
			for(var i = 1; i <= 5; i++) {
				for(var j = 1; j <= 5; j++) {
					var css = "left:"+((j-1)*20)+"%; top:"+((i-1)*20)+"%; width:20%; height:20%; float:left;";
					
					if(i % 2 == 0) {
						if(j == 2 || j == 4) css += " background-color:gray";
					}
					else {
						if(j == 1 || j == 3 || j == 5) css += " background-color:gray";
					}
					
					var div = "";
					
					if(cardSelect != -1) {
						var player = getPlayerById(cardSelectPlayer);
						var card = carddata[player["hand"][cardSelect-1]];
						
						var range = card["range"];
						var direction = card["direction"];
						
						if(direction == "linear") {
							if(j-player["x"] == 0) {
								if(Math.abs(i-player["y"]) <= range) div = "<div style=\"background-color: lightblue; opacity: 0.7;\"></div>";
							}
							else if(i-player["y"] == 0) {
								if(Math.abs(j-player["x"]) <= range) div = "<div style=\"background-color: lightblue; opacity: 0.7;\"></div>";
							}
						}
						else if(direction == "diagonal") {
							if(Math.abs(j-player["x"]) == Math.abs(i-player["y"])) {
								if(Math.abs(i-player["y"]) <= range) div = "<div style=\"background-color: lightblue; opacity: 0.7;\"></div>";
							}
						}
						else if(direction == "radial") {
							if(Math.sqrt(Math.pow(j-player["x"], 2) + Math.pow(i-player["y"], 2)) <= range) {
								div = "<div style=\"background-color: lightblue; opacity: 0.7;\"></div>";
							}
						}
						else if(direction == undefined) {
							if(j == player["x"] && i == player["y"]) div = "<div style=\"background-color: lightblue; opacity: 0.7;\"></div>";
						}
					}
					else if(phase == PHASE_MOVE) {
						var enemy = getEnemy(activePlayer);
						if(Math.sqrt(Math.pow(activePlayer["x"] - j, 2) + Math.pow(activePlayer["y"] - i, 2)) < 1.5 && Math.sqrt(Math.pow(activePlayer["x"] - j, 2) + Math.pow(activePlayer["y"] - i, 2)) > 0 && (enemy["x"] != j || enemy["y"] != i)) {
							div = "<div style=\"background-color: red; opacity: 0.3;\"></div>";
						}
					}
					
					document.getElementById("field").innerHTML += "<div id=\""+j+""+i+"\" onclick=\"move("+activePlayer["id"]+","+j+","+i+")\" style=\""+css+"\">"+div+"</div>";
				}
			}
			
			document.getElementById(""+playerRed["x"]+playerRed["y"]).innerHTML = "<img src=\"img/red.png\" style=\"margin: auto; display: inline-block; height: auto; position: absolute; top:"+((playerRed["y"]-1)*20+10)+"%;\" id=\"red\" class=\"middle center\" />";
			document.getElementById(""+playerBlue["x"]+playerBlue["y"]).innerHTML = "<img src=\"img/blue.png\" style=\"margin: auto; display: inline-block; height: auto; position: absolute; top:"+((playerBlue["y"]-1)*20+10)+"%;\" id=\"blue\" class=\"middle center\" />";

			resize();
		};
		
		var renderPreview = function(force) {
			// display selected card
			if(cardSelect != -1 && (!previewActive || force)) {
				previewActive = true;
			
				document.getElementsByClassName("previewwrapper")[0].style.display = "inline";
				
				document.getElementsByClassName("card_preview")[0].src = "img/"+getPlayerById(cardSelectPlayer)["hand"][cardSelect-1]+".png";
				
				if(discardMode && cardSelectPlayer == activePlayer["id"]) {
					document.getElementsByClassName("cardaction")[0].innerHTML = "<br><input type=\"button\" style=\"width: 200; height: 150;\" onclick=\"removeCard("+cardSelectPlayer+", '"+(cardSelect)+"'); unselectCard(); render(); discardMode=false; phaseAction=false;\" value=\"Discard\" />";
				}
				else if(canActivate(cardSelectPlayer, getPlayerById(cardSelectPlayer)["hand"][cardSelect-1])) {
					document.getElementsByClassName("cardaction")[0].innerHTML = "<br><input type=\"button\" style=\"width: 200; height: 150;\" onclick=\"activate("+cardSelectPlayer+", '"+getPlayerById(cardSelectPlayer)["hand"][cardSelect-1]+"')\" value=\"Activate\" />";
				}
			}
			else if(cardSelect == -1) {
				previewActive = false;
				
				document.getElementsByClassName("previewwrapper")[0].style.display = "none";
			}
		}
		
		var render = function() {
			renderField();
			renderHand();
			renderPlayerStatistics();
			renderPreview(true);
			resize();
		};
		
		var unselectCard = function() {
			cardHover = -1;
			cardHoverPlayer = 0;
			cardSelect = -1;
			cardSelectPlayer = 0;
		};
		
		// ----------------------------- Wenn Dokument geöffnet ----------------------------- \\
		
		var load = function() {
			initGame();
			
			render();
		};
		
		var mousedown = function() {
			if(cardSelect == cardHover && cardSelectPlayer == cardHoverPlayer && cardSelect != -1 && cardSelectPlayer != 0) {
				cardSelect = -1;
				cardSelectPlayer = 0;
				renderField();
			}
			else if(cardHover != -1) {
				cardSelect = cardHover;
				cardSelectPlayer = cardHoverPlayer;
				previewActive = false;
				renderField();
			}
		};
		
		// ----------------------------- Utility-Funktionen ----------------------------- \\
		
		var clone = function(obj) {
			var copy;

			if (null == obj || "object" != typeof obj) return obj;

			if (obj instanceof Date) {
				copy = new Date();
				copy.setTime(obj.getTime());
				return copy;
			}

			if (obj instanceof Array) {
				copy = [];
				
				for (var i = 0, len = obj.length; i < len; i++) {
					copy[i] = clone(obj[i]);
				}
				
				return copy;
			}

			if (obj instanceof Object) {
				copy = {};
				
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
				}
				
				return copy;
			}
		}
		
		var leadingZero = function(number) {
			if(number < 10) return "0"+number;
			
			return number;
		};

/*
=== Feedback Alpers, Dez 11 ===

Das Problem mit der DB-Anbindung ist einer der Gründe, aus denen ich eher zu PHP geraten hatte.
Bei JS müssen Sie dazu die Erweiterung node.js nutzen, was komplexer ist als die Anbindung über PHP.
Im Falle eines Falles binden Sie sie über PHP ein.

Ansonsten gefällt mir Ihr Teil ausgesprochen gut.

Das folgende ist nur ein Vorschlag:
Schauen Sie, ob Sie nicht dem HTML'er in Ihrer Gruppe ein wenig unter die Arme greifen mögen.
Unter Umständen fehlen ihm einfach nur die Ideen, was er in HTML noch einbauen könnte.

*/




