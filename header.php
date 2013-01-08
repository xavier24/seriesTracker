<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
		<link rel="stylesheet" href="css/fontello.css">
		<link rel="stylesheet" href="css/animation.css"><!--[if IE 7]>
		<link rel="stylesheet" href="css/fontello-ie7.css"><![endif]-->
		<script>
		  function toggleCodes(on) {
			var obj = document.getElementById('icons');
			if (on) {
			  obj.className += ' codesOn';
			} else {
			  obj.className = obj.className.replace(' codesOn', '');
			}
		  }
		</script>
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
	<body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
		<header>
			<h1>SeriesTracker</h1>
		</header>
		<nav>
			<a href="http://127.0.0.1/seriesTracker" class="accueil icon-home"></a><a href="#" class="favoris icon-star"></a><a href="#" class="calendrier icon-calendar"></a><p href="#" class="search icon-search"></p>
		</nav>
		<div id="search">
			<form>
				<input type="texte" name="recherche" id="chercher"/>
				<button class="icon-search chercher" type="submit"></button>
			</form>
		</div>