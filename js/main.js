/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function ( $ ) {
	"use strict";

	// -- globals
        var sKey = 'key=af181b000037',
            sSiteUrl = 'http://127.0.0.1/seriesTracker',
            $corps,
            $onget_recherche,
            $barre_recherche,
            $resultats,
            $listResult,
            $recherches,
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
                                for(var j=0; j<aUrlParam.length; j++){
                                    if(aUrlParam[j][0]=='saison'){
                                        var saison = aUrlParam[j][1];
                                        for(var k=0; k<aUrlParam.length; k++){
                                            if(aUrlParam[k][0]=='episode'){
                                                var episode = aUrlParam[k][1];
                                                episode(saison,episode);
                                            }
                                        }
                                    }
                                    else{
                                        fiche(aUrlParam[i][1]);        
                                    }
                                }
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
                                var $currentElement = $listResult.clone(true);
                                $currentElement.attr('id',oData[i].url);
                                $currentElement.find('a').attr('href',sSiteUrl+'/fiche.php?serie='+oData[i].url);
                                $currentElement.find('img').attr('src',oData[i].banner).attr('alt','photo de la serie '+oData[i].title).attr('title','photo de la serie '+oData[i].title);
                                $currentElement.find('.titre').html(oData[i].title);
                                $currentElement.find('.saison').html(oData[i].season+' saisons - '+oData[i].episodes+' épisodes');
                                $currentElement.find('.suivi').html("suivie par "+oData[i].suivie+" membres");
                                $currentElement.find('.note').html(oData[i].note.mean+"/5");
                                $currentElement.appendTo($resultats);
                            }
                        }
                    })                    
                }//index
                var rechercher = function(param){
                    $corps.children().remove();
                    $.ajax({
                        url: "http://api.betaseries.com/shows/search.json?title="+param+"&"+sKey,
                        dataType: "jsonp",
                        success: function(data){
                            oData=data.root.shows;
                            for( var i=0; i<oData.length; i++){
                                var $currentElement = $listSearch.clone(true);
                                $currentElement.attr('id',oData[i].url);
                                $currentElement.find('a').attr('href',sSiteUrl+'/fiche.php?serie='+oData[i].url);
                                $currentElement.find('p').html(oData[i].title);
                                $currentElement.appendTo($corps);
                            }
                        }
                    })
                }//rechercher
                var fiche = function(param){
                    var $currentElement = $listResult.clone(true);
                    $.ajax({
                        url: "http://api.betaseries.com/shows/display/"+param+".json?"+sKey,
                        dataType: "jsonp",
                        success: function(data){
                            console.log(data);
                            oData=data.root.show;
                                
                            $currentElement.attr('id',oData.url);
                            $currentElement.find('img').attr('src',oData.banner).attr('alt','photo de la serie '+oData.title).attr('title','photo de la serie '+oData.title);
                            $currentElement.find('.titre').html(oData.title);
                            $currentElement.find('.description').html(oData.description);
                            $currentElement.find('.genre').html(oData.genres[0]);
                            $currentElement.find('.note').html(oData.note.mean+"/5");
                        }
                    })
                    $.ajax({
                        url: "http://api.betaseries.com/shows/episodes/"+param+".json?"+sKey,
                        dataType: "jsonp",
                        success: function(data){
                            console.log(data);
                            oData=data.root.seasons;
                            var ul = $currentElement.find('.saisons');
                            for( var i in oData){
                                ul.append('<li class="saison"><p>Saison '+oData[i].number+' - '+oData[i].episodes.length+' épisodes </p><ul class="episodes">');
                                var ul2 = ul.children().last().find('ul');
                                for(var j in oData[i].episodes){
                                    ul2.append('<li><a href="'+sSiteUrl+'/fiche.php?serie='+param+'&saison='+oData[i].number+'&episode='+oData[i].episodes[j].episode+'">'+oData[i].episodes[j].number+' - '+oData[i].episodes[j].title);
                                }
                            }
                            $currentElement.appendTo($resultats);
                            
                            $('.saison').on('click','p',showEpisode);
                        }
                        
                    })
                }//ficher
		var showEpisode = function(){
                    if($(this).next().is(':visible')){
                        $(this).next().slideUp('normal');
                    }
                    else{
                        $('.episodes').slideUp('normal');
                        $(this).next().slideDown('normal');   
                    }
                }//showEpisode
	$( function () {

		// -- onload routines
                //declaration
                $onget_recherche = $('nav .search');
		$barre_recherche = $('#search');
                $corps = $('#corps');
                $resultats = $('#resultats');
		$recherches = $('#recherches');
                
                //recupération
                $listResult = $resultats.find('.resultat').first().remove();
		$listSearch = $recherches.find('.recherche').first().remove();
		
                //affichage - suppression
		$barre_recherche.css('display','none');
		$recherches.remove();               
		
                //evenements
                $onget_recherche.on('click',showSearch);
                
		initial();
	} );

}( jQuery ) );

