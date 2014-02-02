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
    content.on('submit', '#mieszkanie-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        console.log('submit')
        $.ajax({
            type: "POST",
            url: apiUrl +"mieszkanie",
            data: data,
            success: function( data ) {
                $('.form-success').text('Mieszkanie dodane');
                $(this).trigger('reset');
            }.bind(this)
        })
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

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};