$(document).ready(function(){

  // creare evento click sul bottone
  $(document).on("click", "#btn", function(){
    // prendo il titolo dall'input
    var titolo = $("#search").val();
    // invocare funzione
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


// funzione chiamata e template
function getTheMovie(titolo){
  // effettuare chiamata ajax
  $.ajax(
    {
    "url": "https://api.themoviedb.org/3/search/movie?api_key=d8103ee9346cae884496275cd6ea3a72",
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
        var numVote = Math.floor(results[i].vote_average / 2);

        $(".list_star li i:nth(-n+"numVote")").addClass("yellow");

        // template
        var context = {
        "name": results[i].title,
        "lingua": results[i].original_language,
        };

        var html = template(context);

        $(".lista_film").append(html);
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

// funzione reset
function reset(){
  $(".lista_film").html("");
  $("#search").val("");
}
