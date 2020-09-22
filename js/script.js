$(document).ready(function(){

  // creare evento click sul bottone
  $(document).on("click", "#btn", function(){
    // prendo il titolo dall'input
    var titolo = $("#search").val();

    // invocare funzione
    getTheMovie(titolo);
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

        // template
        var context = {
        "name": results[i].title,
        "lingua": results[i].original_language,
        "vote": results[i].vote_average
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
