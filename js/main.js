/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function ( $ ) {
	"use strict";

	// -- globals
        var sKey = '&key=af181b000037',
            sSiteUrl = 'http://127.0.0.1/seriesTracker',
            $corps,
            $onget_recherche,
            $barre_recherche,
            $populaires,
            $listPopular,
            $resultats,
            $listSearch,
            oData,
            i;

	// -- methods
                var showSearch = function(){
                    if($barre_recherche.is(':visible')){
                        $barre_recherche.css('display','none');
                    }
                    else{
                        $barre_recherche.css('display','block');
                    } 
                }
                
                var initial = function(){
                    var sUrl = window.location.search,
                        aUrlSplit =[],
                        aUrlParam =[];
                    
                    if(sUrl){
                        sUrl = sUrl.replace('?','');
                        aUrlSplit = sUrl.split("&");
                        for(i=0;i<aUrlSplit.length;i++){
                            aUrlParam.push(aUrlSplit[i].split("="));
                        }
                        for(i=0; i<aUrlParam.length; i++){
                            if(aUrlParam[i][0]=='recherche'){
                                rechercher(aUrlParam[i][1]);
                            }
                            else if(aUrlParam[i][0]=='serie'){
                                ficher(aUrlParam[i][1]);
                            }
                        }
                    }
                    else{
                        index();
                    }
                }
                var index =function(){
                    $.ajax({
                        url: "http://127.0.0.1/seriesTracker/json/populaire.json",
                        dataType: "json",
                        success: function(data){
                            oData=data.root.shows;
                            for( var i=0; i<4; i++){
                                var $currentElement = $listPopular.clone(true);
                                $currentElement.attr('id',oData[i].url);
                                $currentElement.find('a').attr('href',sSiteUrl+'/fiche.php?serie='+oData[i].url);
                                $currentElement.find('img').attr('src',oData[i].banner).attr('alt','photo de la serie '+oData[i].title).attr('title','photo de la serie '+oData[i].title);
                                $currentElement.find('.titre').html(oData[i].title);
                                $currentElement.find('.saison').html(oData[i].season+' saisons - '+oData[i].episodes+' épisodes');
                                $currentElement.find('.suivi').html("suivie par "+oData[i].suivie+" membres");
                                $currentElement.find('.note').html(oData[i].note.mean+"/5");
                                $currentElement.appendTo($populaires);
                            }
                        }
                    })                    
                }//index
                var rechercher = function(param){
                    $corps.children().remove();
                    $.ajax({
                        url: "http://api.betaseries.com/shows/search.json?title="+param+sKey,
                        dataType: "jsonp",
                        success: function(data){
                            oData=data.root.shows;
                            for( var i=0; i<oData.length; i++){
                                var $currentElement = $listSearch.clone(true);
                                $currentElement.attr('id',oData[i].url);
                                $currentElement.find('p').html(oData[i].title);
                                $currentElement.appendTo($corps);
                            }
                        }
                    })
                }//rechercher
                var ficher = function(param){
                    //$corps.children().remove();
                    $.ajax({
                        url: "http://api.betaseries.com/shows/display/"+param+".json?"+sKey,
                        dataType: "jsonp",
                        success: function(data){
                            console.log(data);
                            oData=data.root.show;
                            for( var i=0; i<oData.length; i++){
                                var $currentElement = $listSearch.clone(true);
                                $currentElement.attr('id',oData[i].url);
                                $currentElement.find('p').html(oData[i].title);
                                $currentElement.appendTo($corps);
                            }
                        }
                    })
                }//ficher
		
	$( function () {

		// -- onload routines
                //declaration
                $onget_recherche = $('nav .search');
		$barre_recherche = $('#search');
                $corps = $('#corps');
                $populaires = $('#populaires');
		$resultats = $('#resultats');
                
                //recupération
                $listPopular = $populaires.find('.populaire').first().remove();
		$listSearch = $resultats.find('.resultat').first().remove();
		
                //affichage - suppression
		$barre_recherche.css('display','none');
		$resultats.remove();               
		
                //evenements
                $onget_recherche.on('click',showSearch);
		initial();
	} );

}( jQuery ) );

