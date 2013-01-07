/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function ( $ ) {
	"use strict";

	// -- globals
        var $onget_recherche,
            $barre_recherche,
            $populaires,
            $listPopular,
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
                var index =function(){
                    $.ajax({
                        url: "http://127.0.0.1/seriesTracker/json/populaire.json",
                        dataType: "json",
                        success: function(data){
                        console.log(data.root.shows[1].url);
                        console.log('dd');
                            for(var i=0; i<4; i++){
                                var $currentElement = $listPopular.clone(true);
                                $currentElement.attr('id',data.root.shows[i].url);
                                $currentElement.find('img').attr('src',data.root.shows[i].banner).attr('alt','photo de la serie '+data.root.shows[i].title).attr('title','photo de la serie '+data.root.shows[i].title);
                                $currentElement.find('.titre').html(data.root.shows[i].title);
                                $currentElement.find('.saison').html(data.root.shows[i].season+' saisons - '+data.root.shows[i].episodes+' épisodes');
                                $currentElement.find('.suivi').html("suivie par "+data.root.shows[i].suivie+" membres");
                                $currentElement.find('.note').html(data.root.shows[i].note.mean+"/5");
                                $currentElement.appendTo($populaires);
                            }
                        }
                    })                    
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
                $populaires = $('#populaires');
		$listPopular = $populaires.find('.populaire').first().remove();
		$resultats = $('#resultats');
		$listElement = $resultats.find('.resultat').first().remove();
		
		$barre_recherche.css('display','none');
		
		$onget_recherche.on('click',showSearch);
		
		index();
	} );

}( jQuery ) );

