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
		
	$( function () {

		// -- onload routines
		$onget_recherche = $('nav .search');
		$barre_recherche = $('#search');
		$resultats = $('#resultats');
		$listElement = $resultats.find('.resultat').first().remove();
		
		$barre_recherche.css('display','none');
		
		$onget_recherche.on('click',showSearch);
		
	} );

}( jQuery ) );

