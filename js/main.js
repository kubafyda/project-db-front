$( document ).ready(function() {
    
    var apiUrl = "http://localhost/projekt-db/api/public/";
    var content = $('#content'),
    pageHeader = $('#header h1');
 
    $('#nav-mieszkanie').click(function () {
        pageHeader.text('Mieszkania');
        $.ajax({
            type: "GET",
            url: apiUrl +"mieszkanie",
            success: function( data ) {
                $.get('mieszkanie.html', function (htmlTemplate) {
                    content.html(_.template(htmlTemplate, {
                        list: data.mieszkania
                    }));
                });
            }
        });
    });
    $('#mieszkanie-form').delegate('submit', function (event) {
        console.log('submit')
        event.preventDefault();
    });
 /*
  * Osoby
  */
  $('#nav-osoby').click(function () {
        pageHeader.text('Osoby');
        $.ajax({
            type: "GET",
            url: apiUrl +"osoba",
            success: function( data ) {
                $.get('osoba.html', function (htmlTemplate) {
                    content.html(_.template(htmlTemplate, {
                        list: data.mieszkania
                    }));
                });
            }
        });
    });
    $('#osoba-form').delegate('submit', function (event) {
        console.log('submit')
        event.preventDefault();
    });
 
});