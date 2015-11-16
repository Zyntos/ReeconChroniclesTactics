var player = 1;
var player1 = 0;
var player1loc = 0;
var player2 = 0;
var movePhase1 = 0;
var field = document.getElementsByClassName("Feld");
var playersFound = 0;
var highlighted = false;
var clicked_id = " ";

var i=0;
var f=0;
var g1=0, g2=0, g3=0, g4=0;




function movePhase() {
	movePhase1 = 1;
	
	highlight();
  
}


	


function highlight() {
	if (movePhase1==1) {
		
		findPlayer();
		playersFound=1;
		for (f=0;f<field.length; f++) {
			
			if (f<field.length-2) 
			{
				g1=f+1;
			}	
			
			if (f>0) 
			{
				g2=f-1;
			}
			
			if (f<field.length-6)  
			{
				g3=f+5;
			}
			
			if (f>5) 
			{
			    g4=f-5;
			}
			
			
			if (!(field[f].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
			{
				if(field[f].id==player1-(-1)+"") {
				
					field[f].src="highlighted.jpg";
				
				}
				if (!(field[g2].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
				{
					if(field[f].id==player1-(-2)+"") {
				
						field[f].src="highlighted.jpg";
					
					}
				}	
			}
			
			if (!(field[f].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
			{
				if(field[f].id==player1-(-10)+"") {
				
					field[f].src="highlighted.jpg";
				
				}
				if (!(field[g4].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
				{
					if(field[f].id==player1-(-20)+"") {
				
						field[f].src="highlighted.jpg";
					
					}
				}	
			}

			if (!(field[f].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
			{
				if(field[f].id==player1-1+"") {
				
					field[f].src="highlighted.jpg";
				
				}
				if (!(field[g1].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
				{
					if(field[f].id==player1-2+"") {
				
						field[f].src="highlighted.jpg";
					
					}
				}	
			}

			if (!(field[f].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
			{
				if(field[f].id==player1-10+"") {
				
					field[f].src="highlighted.jpg";
				
				}
				if (!(field[g3].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg"))
				{
					if(field[f].id==player1-20+"") {
				
						field[f].src="highlighted.jpg";
					
					}
				}	
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
				
				player1 = field[i].id;
				
				
				
			}}
			
		else {
			if (field[i].src=="file:///C:/Users/Darren/Documents/reec/Code/green.jpg") {
				player2 = field[i].id;
				
				
			}
		}	
		
		}
	}	}

function move(clicked_id) {
	
	if (player == 1) {
		if (highlighted==true) {
			
			
			if (document.getElementById(clicked_id).src=="file:///C:/Users/Darren/Documents/reec/Code/highlighted.jpg") {
				document.getElementById(clicked_id).src="red.jpg";
				document.getElementById(player1).src="weiss2.jpg";
				for (g=0; g<field.length; g++) {
					if (field[g].src=="file:///C:/Users/Darren/Documents/reec/Code/highlighted.jpg") {
						field[g].src = "weiss2.jpg";
						
					}
				player1 = clicked_id;	
					
				}
			
			}
		
		}
	}
	
}	
	
		
		

