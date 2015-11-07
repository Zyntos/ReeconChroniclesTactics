var player = 1;
var player1 = 0;
var player1loc = 0;
var player2 = 0;
var movePhase1 = 0;
var field = document.getElementsByClassName("Feld");
var playersFound = 0;

var i=0;
var f=0;




function movePhase() {
	movePhase1 = 1;
  
}


	


function highlight() {
	if (movePhase1==1) {
		
		findPlayer();
		playersFound=1;
		for (f=0;f<field.length; f++) {
			if(field[f].id==player1-(-1)+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-(-2)+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-(-10)+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-(-20)+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-1+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-2+"") {
				
				field[f].src="highlighted.jpg";
							
			}
			if(field[f].id==player1-10+"") {
				
				field[f].src="highlighted.jpg";
				
			}
			if(field[f].id==player1-20+"") {
				
				field[f].src="highlighted.jpg";
				
				
			}
			
			
				
			
		}		
			
		
			
		
	}
	
}

function findPlayer() {
	
	for (i=0; i<field.length; i++) {
		
		if (player==1) {
			if (playersFound ==0){
			if (field[i].src=="file:///C:/Users/Darren/Desktop/STUDIUM%20PRG/ReeconChroniclesTactics/Code/red.jpg") {
				player1 = field[i].id;
				
				
				}
			
		else {
			if (field[i].src=="file:///C:/Users/Darren/Desktop/STUDIUM%20PRG/ReeconChroniclesTactics/Code/green.jpg") {
				player2 = field[i].id;
				
				
			}
		}	
		
		}
	}	}	
	}
		
		

