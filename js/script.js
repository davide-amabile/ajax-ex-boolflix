$(document).ready(function(){

  // creare evento click sul bottone
  $(document).on("click", "#btn", function(){
    var titolo = $("#search").val();

    // effettuare chiamata ajax
    $.ajax(
      {
      "url": "https://api.themoviedb.org/3/search/movie?api_key=d8103ee9346cae884496275cd6ea3a72",
      "data":{
        "query": titolo,

      },
      "method": "GET",
      "success": function (data) {
        var results = data.results;

        // ciclo per le proprietà
        for ( i = 0; i < results.length; i++) {
          console.log(results[i].title);
          console.log(results[i].original_language);
          console.log(results[i].vote_average);

        }
        // fine ciclo
      },
      "error": function () {
      alert("E' avvenuto un errore. " );
      }
    }
      );
      // fine ajax
  });
  // fine evento
});
// fine jquery
