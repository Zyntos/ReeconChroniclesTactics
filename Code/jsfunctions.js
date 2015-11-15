var player = 1;
var player1 = 0;
var player1loc = 0;
var player2 = 0;
var movePhase1 = 0;
var field = document.getElementsByClassName("Feld");
var playersFound = 0;
var highlighted = false;

var i=0;
var f=0;




function movePhase() {
	movePhase1 = 1;
	window.alert(movePhase1);
	highlight();
  
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
			
			
				
		highlighted = true;	
		}		
			
		
			
		
	}
	
}

function findPlayer() {
	
	for (i=0; i<field.length; i++) {
		if (playersFound ==0) {
			
			if (player==1){
				
				
			if (field[i].src=="file:///C:/Users/Darren/Documents/reec/Code/red.jpg") {
				window.alert(field[i].src);
				player1 = field[i].id;
				window.alert(player1);
				
				
			}}
			
		else {
			if (field[i].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg") {
				player2 = field[i].id;
				
				
			}
		}	
		
		}
	}	}

function move(clicked_id) {
	window.alert(clicked_id);
	if (player == 1) {
		if (highlighted==true) {
			window.alert("clicked");
			if (document.getElementbyId(clicked_id).src=="file:///C:/Users/Darren/Documents/reec/Code/highlighted.jpg") {
				document.getElementbyId(clicked_id).src=red.jpg;
			
			}
		
		}
	}
	
}	
	
		
		

