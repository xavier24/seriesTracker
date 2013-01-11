<?php include('header.php') ?>
<div id="corps" class="fiche">
    <div id="resultats">
        <form>
            <label for="suivre"></label>
            <input type="checkbox" id="suivre" name="suivre" />
        </form>
        <div class="resultat">
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
            <a href="#"><p class="titre"></p></a>
        </div>
    </div>
</div>

<?php include('footer.php') ?>