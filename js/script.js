$(document).ready(function(){

  // creare evento click sul bottone
  $(document).on("click", "#btn", function(){
    var titolo = $("#search").val();

    // effettuare chiamata ajax
    $.ajax(
      {
      "url": "https://api.themoviedb.org/3/search/movie?api_key=d8103ee9346cae884496275cd6ea3a72",
      "data":{
        "title": titolo
      },
      "method": "GET",
      "success": function (data) {
         console.log(data.result);
       }
      },
      "error": function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
      }
      );
  });
  // fine evento
});
// fine jquery
