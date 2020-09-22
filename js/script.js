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
        var source = $("#film-template").html;
        var template = Handlebars.compile(source);


        // ciclo per le proprietà
        for ( i = 0; i < results.length; i++) {
          var name= results[i].title;
          var originalLanguage = results[i].original_language;
          var vote = results[i].vote_average;

          var context = {
          "name": name,
          "lingua": originalLanguage,
          "voto": vote
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
    // template
  //   var source = $("#film-template").html;
  //   var template = Handlebars.compile(source);
  //
  //   for (i=0; i < results.length; i++){
  //     var context = {
  //     "name": name,
  //     "lingua": originalLanguage,
  //     "voto": vote
  //     };
  //     var html = template(context);
  //
  //     $(".lista_film").append(html);
  //   }
  // });
  // fine evento
});
// fine jquery
