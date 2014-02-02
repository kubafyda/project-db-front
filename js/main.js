$( document ).ready(function() {
    
    var apiUrl = "http://localhost/projekt-db/api/public/";
    var content = $('#content'),
    pageHeader = $('#header h1');
 
    var renderMieszkanie = function() {
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
    };
    $('#nav-mieszkanie').click(function () {
        pageHeader.text('Mieszkania');
        renderMieszkanie();
    });
    /**
     * Add record
     */
    content.on('submit', '#mieszkanie-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        console.log('submit')
        $.ajax({
            type: "POST",
            url: apiUrl +"mieszkanie",
            data: data,
            success: function( data ) {
                renderMieszkanie();
            }
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

/**
 * Don't move or copy
 * @returns {String|Array|$.fn.serializeObject@pro;value}
 */
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