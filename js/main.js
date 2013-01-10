/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function ( $ ) {
	"use strict";
        // -- globals
        var sKey = 'key=af181b000037',
            sSiteUrl = 'http://127.0.0.1/seriesTracker',
            sSerie,
            sSaison,
            sEpisode,
            $corps,
            $onget_recherche,
            $barre_recherche,
            $resultats,
            $listResult,
            $listAgenda,
            $recherches,
            $listSearch,
            oData,
            title,
            i,
            $suivre;

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
                            if(aUrlParam[i][0]=='recherche'){// si recherche dans url
                                rechercher(aUrlParam[i][1]);
                            }
                            else if(aUrlParam[i][0]=='serie'){// si serie dans url
                                sSerie = aUrlParam[i][1];
                                for(var j=0; j<aUrlParam.length; j++){
                                    if(aUrlParam[j][0]=='saison'){// si saison dans url
                                        sSaison = aUrlParam[j][1];// recup la saison
                                        for(var k=0; k<aUrlParam.length; k++){
                                            if(aUrlParam[k][0]=='episode'){// si episode dans url
                                                sEpisode = aUrlParam[k][1];
                                                voirEpisode(sSerie,sSaison,sEpisode);
                                                return;
                                            }
                                        }
                                    }
                                }        
                            }
                        }
                    }
                    console.log('switch');
                    switch($corps.attr('class')){
                        case'accueil':index();
                            break;
                        case'fiche':fiche(sSerie);
                            break;
                        case'favoris':favoris();
                            break;
                        case'agenda':agenda();
                            break;
                    }
                }//showSearch
                var index =function(){
                    $.ajax({
                        url: sSiteUrl+"/json/populaire.json",
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
                    //window.localStorage.removeItem('suivi');
                    console.log(JSON.parse(window.localStorage.getItem('suivi')));
                }//index
                var rechercher = function(param){
                    $corps.children().remove();
                    $.ajax({
                        url: "http://api.betaseries.com/shows/search.json?title="+param+"&"+sKey,
                        dataType: "jsonp",
                        type:"POST",
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
                    var $currentElement = $listResult.clone(true),
                        suivi = [];
                    if(window.localStorage.getItem("suivi")){
                        suivi = JSON.parse(window.localStorage.getItem("suivi"));
                        for(var i=0;i<suivi.length;i++){
                            if(suivi[i][0]==sSerie){
                                $suivre.attr("checked","checked");
                            }
                        }
                    }
                    $.ajax({
                        url: "http://api.betaseries.com/shows/display/"+param+".json?"+sKey,
                        dataType: "jsonp",
                        type:"POST",
                        success: function(data){
                            oData=data.root.show;
                            title=oData.title;
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
                        type:"POST",
                        success: function(data){
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
                }//fiche
		var showEpisode = function(){
                    if($(this).next().is(':visible')){
                        $(this).next().slideUp('normal');
                    }
                    else{
                        $('.episodes').slideUp('normal');
                        $(this).next().slideDown('normal');   
                    }
                }//showEpisode
                var voirEpisode = function(serie,saison,episode){
                    var suivi = [];
                    if(window.localStorage.getItem("suivi")){
                        suivi = JSON.parse(window.localStorage.getItem("suivi"));
                        for(var i=0;i<suivi.length;i++){
                            console.log(suivi[i]);
                            if(suivi[i][0]==sSerie){
                                $suivre.attr("checked","checked");
                            }
                        }
                    }
                    $.ajax({
                        url: "http://api.betaseries.com/shows/episodes/"+serie+".json?season="+saison+"&"+sKey,
                        dataType: "jsonp",
                        type:"POST",
                        success: function(data){
                            
                            oData=data.root.seasons;
                            title = oData[0].episodes[(episode)-1].show;
                            var $currentElement = $listResult.clone(true);
                            $currentElement.attr('id',serie);
                            $currentElement.find('img').attr('src',oData[0].episodes[(episode)-1].screen).attr('alt','photo de la serie '+serie).attr('title','photo de la serie '+serie);
                            $currentElement.find('.titre').html(oData[0].episodes[(episode)-1].number+" - "+oData[0].episodes[(episode)-1].title);
                            $currentElement.find('.description').html(oData[0].episodes[(episode)-1].description);
                            var date = new Date((oData[0].episodes[(episode)-1].date)*1000);
                            $currentElement.find('.genre').html(date.toLocaleDateString());
                            $currentElement.find('.note').html(oData[0].episodes[(episode)-1].note.mean+"/5");
                            $currentElement.appendTo($resultats);
                        }
                    })
                }
                var suivre = function(){
                    var info = [],
                        suivi =[],
                        suiviCopie = [];
                        info.push(sSerie);
                        info.push(title);
                    if($suivre.is(':checked')){
                        if(window.localStorage.getItem("suivi")){
                            suivi = JSON.parse(window.localStorage.getItem("suivi"));
                            for(var i=0;i<suivi.length;i++){
                                if(suivi[i][0]==sSerie){
                                    suiviCopie.push(suivi[i]);
                                    return; 
                                }
                            }
                        }
                        suivi.push(info);
                        window.localStorage.setItem('suivi',JSON.stringify(suivi));
                    }
                    else{
                        if(window.localStorage.getItem("suivi")){
                            suivi = JSON.parse(window.localStorage.getItem("suivi"));
                            for(var j=0;j<suivi.length;j++){
                                if(suivi[j][0]!=sSerie){
                                    suiviCopie.push(suivi[j]);
                                }
                            }
                            suivi = suiviCopie;
                            window.localStorage.setItem('suivi',JSON.stringify(suivi));
                        }
                    }
                }
                var favoris = function(){
                    var suivi = [];
                    if(window.localStorage.getItem("suivi")){
                        suivi = JSON.parse(window.localStorage.getItem("suivi"));
                        console.log(suivi);
                        for( var i=0; i<suivi.length; i++){
                            var $currentElement = $listSearch.clone(true);
                            $currentElement.attr('id',suivi[i][0]);
                            $currentElement.find('a').attr('href',sSiteUrl+'/fiche.php?serie='+suivi[i][0]);
                            $currentElement.find('p').html(suivi[i][1]);
                            $currentElement.appendTo($corps);
                        }
                    }
                }
                var agenda = function(){
                    $.ajax({
                        url: "http://api.betaseries.com/planning/general.json?"+sKey,
                        dataType: "jsonp",
                        type:"POST",
                        success: function(data){
                            oData=data.root.planning;
                            var array =[];
                            var ordre
                            //creer array calendrier
                            for( var i in oData){
                                var info = [];
                                var inter = [];
                                if(ordre != oData[i].date){
                                    ordre = oData[i].date;
                                    info = oData[i];
                                    inter[0] = info;
                                    array['a_'+oData[i].date] = inter;
                                }
                                else{
                                    info=oData[i];
                                    array['a_'+oData[i].date].push(info);
                                }
                            }
                            console.log(array);
                            //console.log(array['a_1357326900'][0].number);
                            for( var i in array){
                                var $currentList = $listAgenda.clone(true);//li>ul
                                
                                
                               //console.log($currentUl);
                                var jour = new Date((array[i][0].date)*1000);
                                //console.log(jour.toLocaleDateString());
                                $currentList.append('<p>'+jour.toLocaleDateString()+'<ul class="agenda_episode">');
                                var $currentUl = $currentList.find('ul');//ul
                                for(var j in array[i]){
                                    var $currentElement = $listResult.clone(true);
                                    $currentElement.find('.general').attr("href",sSiteUrl+'/fiche.php?serie='+array[i][j].url+'&saison='+array[i][j].season+'&episode='+array[i][j].episode);
                                    $currentElement.find('.agenda_titre').html(array[i][j].show);
                                    $currentElement.find('.agenda_title').html(array[i][j].number+' - '+array[i][j].title);
                                    //console.log(array[i][j].show);
                                    
                                    $currentElement.appendTo($currentUl);//ul +
                                }
                                
                                //$currentElement.attr('id',oData[i].url);
                                //$currentElement.find('.general').attr('href',sSiteUrl+'/fiche.php?serie='+oData[i].url);
                                //$currentElement.find('p.serie').html(oData[i].show);
                                //$currentElement.find('.titre').attr('href',sSiteUrl+'/fiche.php?serie='+oData[i].url+'&saison='+oData[i].season+'&episode='+oData[i].episode).html(oData[i].title);
                                //$currentElement.find('.titre');
                                $currentList.appendTo($resultats);
                            }
                            $(".agenda_episode").css('display','none');
                            $('.agenda_date').on('click','p',showAgenda);
                        }
                    })
                }//agenda
                var showAgenda = function(e){
                    if($(this).next().is(':visible')){
                        $(this).next().slideUp('normal'); 
                    }
                    else{
                        $('.agenda_episode').slideUp('normal');
                        $(this).next().slideDown('normal');   
                    }
                }//showAgenda
	$( function () {

		// -- onload routines
                //declaration
                $onget_recherche = $('nav .search');
		$barre_recherche = $('#search');
                $corps = $('#corps');
                $resultats = $('#resultats');
		$recherches = $('#recherches');
                $suivre = $('#suivre');
                            
                //recupération gabari
                $listResult = $resultats.find('.resultat').first().remove();
		$listSearch = $recherches.find('.recherche').first().remove();
		$listAgenda = $resultats.find('.agenda_date').first().remove();
                
                //affichage - suppression
		$barre_recherche.css('display','none');
                $recherches.remove();               
		
                //evenements
                $onget_recherche.on('click',showSearch);
                $suivre.on('click',suivre);
		initial();
	} );

}( jQuery ) );

