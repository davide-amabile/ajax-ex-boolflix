$(document).ready(function(){

  // creare evento click sul bottone
  $(document).on("click", "#btn", function(){
    // prendo il titolo dall'input
    var titolo = $("#search").val();
    // invocare funzione per film
    getTheMovie(titolo);

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
       // invoco funzione
       getTheMovie(titolo);

       // svuoto html di ul e il campo inpu
       reset();
     }
   }
});
// fine vento keypress
});
// fine jquery




// funzione chiamata e template per film
function getTheMovie(titolo){
  // effettuare chiamata ajax
  $.ajax(
    {
    "url": "https://api.themoviedb.org/3/search/tv?api_key=d8103ee9346cae884496275cd6ea3a72",
    "data":{
      "query": titolo,


    },
    "method": "GET",
    "success": function (data) {

      var source = $("#film-template").html();
      var template = Handlebars.compile(source);

      var results = data.results;
      // ciclo per le proprietà
      for ( i = 0; i < results.length; i++) {

        // numeri interi tra 1 e 5 per i voti
        var numVote = Math.floor(results[i].vote_average / 2);

        //creare le stelle per che corrisponadno ai numeri dei voti
        var stars ="";
        for (j=1; j<=numVote; j++){
           stars += "<li><i class='fas fa-star'></i></li>";
        }

        // creare bandiera
         var lingua = results[i].original_language;
        var flags =' <img src="img/' + lingua +'.png " alt=" '
        + lingua+' " class="lingua">';



        // template
        var context = {
        "name": results[i].title,
        "lingua": flags,
        "stars" : stars
        };
        var html = template(context);
        $(".lista_film").append(html);
         console.log(results[i].original_language);
      }
      // fine ciclo

    },

    "error": function () {
    alert("E' avvenuto un errore. " );
    }
   }
  );
  // fine ajax
}
// fine funzione vento e template

// funzioni serie tv




function reset(){
  $(".lista_film").html("");
  $("#search").val("");
}
