<?php include('header.php') ?>
<div id="corps" class="agenda">
    <ul id="resultats">
        <li class="agenda_date">
        </li>
        <li class="resultat">
            <a href="">
                <p class="agenda_titre"></p>
                <p class="agenda_title"></p>
            </a>
        </li>
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
    </ul>
    <div id="recherches">
        <div class="recherche">
            <a href="#" transition="slide"><p class="titre"></p></a>
        </div>
    </div>
</div>

<?php include('footer.php') ?>