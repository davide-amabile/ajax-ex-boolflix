$(document).ready(function(){

  // creare evento click sul bottone
  $("#btn").click(
    function(){
    // prendo il titolo dall'input
    var titolo = $("#search").val();
    // invoco funzione per la chiamata dei film
    getTheMovie(titolo);

    // invoco funzione per la chiamata delle srerie tv
    getSeries(titolo);

    // svuoto html di ul e il campo inpu
    reset();
});
// fine evento click

// creare evento keypress sull'input
$("#search").keypress(
  function(evento){
   if (evento.which == 13){
     // condizione dell'inpiut senza testo
     var titolo = $("#search").val();
     if ( titolo != "") {
       // invoco funzione per la chiamata dei film
       getTheMovie(titolo);

       // invoco funzione per la chiamata delle srerie tv
       getSeries(titolo);

       // svuoto html di ul e il campo inpu
       reset();
     }
   }
});
// fine vento keypress

// evento hover per far sparire le img e far apparire i menu descrizione
 $(document).on("mouseenter", '.poster', function(){
   $(this).toggleClass("hide");
   $(this).siblings(".container_info").toggleClass("hide");
 });

 $(document).on("mouseleave", '.container_info', function(){
   $(this).toggleClass("hide");
   $(this).siblings(".poster").toggleClass("hide");
 });

});
// fine jquery


// funzione chiamata  per film
function getTheMovie(titolo){
  // effettuare chiamata ajax
  $.ajax(
    {
    "url": "https://api.themoviedb.org/3/search/movie?api_key=d8103ee9346cae884496275cd6ea3a72",
    "data":{
      "query": titolo,
      "language": "it-IT"
    },
    "method": "GET",
    "success": function (data) {
     // invoco funzione per il template
    renderResult("film",data);
    },
    "error": function () {
    alert("E' avvenuto un errore. " );
    }
   }
  );
  // fine ajax
}
// fine funzione vento e template

// funzioni chiamata serie tv
function getSeries(titolo){
  $.ajax(
    {
    "url": "https://api.themoviedb.org/3/search/tv?api_key=d8103ee9346cae884496275cd6ea3a72",
    "data":{
      "query": titolo,
      "language" :"it-IT"
    },
    "method": "GET",
    "success": function (data) {
      // invoco funzione per il template
      renderResult("tv",data);
    },
    "error": function () {
    alert("E' avvenuto un errore. " );
    }
   }
  );
}
// fine funzione

// funzione reset
function reset(){
  $(".lista_film").html("");
  $("#search").val("");
}
// / funzione reset

// funzione template
function renderResult(type, data){
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  // array proprietà nelle chiamate
  var results = data.results;
  // ciclo per le proprietà
  for ( i = 0; i < results.length; i++) {

    // numeri interi tra 1 e 5 per i voti
    var numVote = Math.floor(results[i].vote_average / 2);

    //creare le stelle per che corrisponadno ai numeri dei voti
    var stars ="";
    for (j=1; j<=5; j++){
      if( j <= numVote) {
       stars += "<li><i class='fas fa-star'></i></li>";
     }else {
       stars += "<li><i class='far fa-star'></i></li>";
     }

    }

    // creare bandiera
    var lingua = results[i].original_language;
    var flags =' <img src="img/' + lingua +'.png " alt=" '
    + lingua+' " class="lingua">';

    // separare i titoli dei film e serie tv
    if (type == "film") {
     var nome = results[i].title;
     var nomeOr =  results[i].original_title;
   } else if (type == "tv") {
     var nome = results[i].name;
     var nomeOr =  results[i].original_name;
   }

   // creare poster immagine


   if( results[i].poster_path == null){
    var  immagine = "img/no_poster.png";
   } else {
    var immagine = "http://image.tmdb.org/t/p/w342/"+results[i].poster_path;
   }


    // template
    var context = {
    "name": nome,
    "lingua": flags,
    "stars" : stars,
    "immagine" : immagine,
    "originale" : nomeOr,
    "type" : type
    };
    var html = template(context);
    $(".lista_film").append(html);

  }
  // fine ciclo

}
// /funzione template
