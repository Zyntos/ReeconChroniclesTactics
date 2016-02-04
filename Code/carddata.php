<?php
require_once("mysql.php");

echo msql_error();

function carddata($echo=false) {
	$result = mysql_query("SELECT * FROM card");

	$cards = "";

	$data = "{";

	while($line = mysql_fetch_array($result)) {
		if(strlen($cards) > 0) {
			$cards .= ",";
		}
		
		$id = $line['ID'];
		
		while(strlen($id) < 4) $id = "0".$id;
		
		$cards .= "\"".$id."\"";

		if(strlen($data) > 1) $data .= ',';
		
		$data .= '"'.$id.'":{"name":"'.$line['name'].'","mana":'.$line['mana'].',"range":'.$line['range'];
		
		if($line['direction']) $data .= ',"direction":"'.$line['direction'].'"';
		
		$effects = mysql_query("SELECT * FROM card INNER JOIN cardeffect ON card.ID = cardID INNER JOIN effect ON effect.ID = effectID WHERE card.ID = ".$line['ID']);
		
		/*
		* === Feedback Alpers, Jan. 5 ===
		*
		* Schön effizienter Code fürs Einlesen der Datensätze.
		*/
		
		$i = 0;
		
		$data .= ',"effect":{';
		
		while($effect = mysql_fetch_array($effects)) {
			if($i > 0) $data .= ",";
			
			$data .= '"'.$i.'":{"type":"'.$effect['type'].'","target":"'.$effect['target'].'","value":"'.$effect['value'].'"';
			
			if($effect['duration'] > 0) $data .= ',"duration":'.$effect['duration'];
			if(strlen($effect['timerevent']) > 0)  $data .= ',"timerevent":"'.$effect['timerevent'].'"';
			if(strlen($effect['callback']))  $data .= ',"callback":"'.$effect['callback'].'"';
			if(strlen($effect['trigger']))  $data .= ',"trigger":['.$effect['trigger'].']';
			if(strlen($effect['condition']))  $data .= ',"condition":"'.$effect['condition'].'"';
			
			$data .= '}';
			
			$i++;
		}
		
		$data .= '}}';
	}
		
	$data .= '}';
	
	if($echo) {
		echo 'var carddata = '.$data.';';

		echo 'var cards = ['.$cards.'];';
	}
	
	return $data;
}

$incFiles = get_included_files();

if($incFiles[0] == __FILE__) carddata(true);
?>