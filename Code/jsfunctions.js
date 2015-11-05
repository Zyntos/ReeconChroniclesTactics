var player = 1;
var player1 = 0;
var player2 = 0;
var movePhase1 = 0;





function movePhase() {
	movePhase1 = 1;
	´
	
}

function findPlayer(p) {
	window.alert(p);
	for (var i=0; i<document.getElementsByClassName("Feld").length; i++) {
		if (p==1) {
			
			if (document.getElementsByClassName("Feld")[i].src=="red.jpg") {
				player1 = document.getElementsByClassName("Feld")[i].Id;
				window.alert(player1);
		    }
		}	
		else {
			if (document.getElementsByClassName("Feld")[i].src=="green.jpg") {
				player2 = document.getElementsByClassName("Feld")[i].Id;
				window.alert(player2);
			}
		}	
			
		}
		
}
	


function highlight() {
	if (movePhase1==1) {
		window.alert(movePhase1); 
		findPlayer(player)
        for (var i=0;i<length; i++) {
			if(document.getElementsByClassName("Feld")[i].Id==player1+1+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1+2+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1+10+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1+20+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1-1+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1-2+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1-10+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			if(document.getElementsByClassName("Feld")[i].Id==player1-20+"") {
				document.getElementsByClassName("Feld")[i].src=highlighted.jpg;
			}
			
				
			
		}		
			
		
			
		
	}
	
}
