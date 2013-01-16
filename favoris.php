<?php include('header.php') ?>
<div id="corps" class="favoris">
    <div id="resultats">
        <div class="resultat">
            <img class="banner" width="100%" />
            <a href="">
                <div class="info">
                    <p class="titre"></p>
                    <p class="saison"></p>
                    <p class="suivi"></p>
                    <p class="note"></p>
                </div>
            </a>
        </div>
        <div class="resultat fiche">
            <form>
                <label for="suivre"></label>
                <input type="checkbox" id="suivre" name="suivre" />
            </form>
            <div class="image">
                <img class="banner" width="100%" />
                <p class="titre"></p>
                <p class="note"></p>
            </div>
            <div class="info">
                <p class="genre"></p>
                <p class="description"></p>
            </div>    
            <ul class="saisons">
            </ul>
        </div>
    </div>
    <div id="recherches">
        <div class="recherche">
            <a href="#" transition="slide"><p class="titre"></p></a>
        </div>
    </div>
</div>

<?php include('footer.php') ?>