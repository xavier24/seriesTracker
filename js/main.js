/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function ( $ ) {
	"use strict";

	// -- globals
		var $onget_recherche,
			$barre_recherche,
			$resultats,
			$listElement;

	// -- methods
		var showSearch = function(){
			if($barre_recherche.is(':visible')){
				$barre_recherche.css('display','none');
			}
			else{
				$barre_recherche.css('display','block');
			}
		}
		var lister = function(){
			$.ajax({
				url: "http://api.betaseries.com/shows/display/all.json?key=af181b000037",
				dataType: "jsonp",
				success: function(data){
				console.log(data.root.shows.length);
					for( var i=0; i<10; i++){
						var $currentElement = $listElement.clone(true);
						$currentElement.attr('id',data.root.shows[i].url);
						$currentElement.find('p').html(data.root.shows[i].title);
						
						$currentElement.appendTo($resultats);
					//$resultats.child[i].find('.titre').html(data.root.shows[i].title);
					
					}
				}
			})
		}//lister
		
	$( function () {

		// -- onload routines
		$onget_recherche = $('nav .search');
		$barre_recherche = $('#search');
		$resultats = $('#resultats');
		$listElement = $resultats.find('.resultat').first().remove();
		
		$barre_recherche.css('display','none');
		
		$onget_recherche.on('click',showSearch);
		
		lister();
	} );

}( jQuery ) );

