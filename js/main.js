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
            success: function(data) {
                renderMieszkanie();
            }
        })
    });
    content.on('click', '.mieszkanie-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"mieszkanie/"+ id,
            success: function(data) {
                renderMieszkanie();
            }
        });
    });
   
 /*
  * Osoby
  */
  $('#nav-osoby').click(function () {
        pageHeader.text('Osoby');
        $.ajax({
            type: "GET",
            url: apiUrl +"osoby",
            success: function( data ) {
                $.get('osoby.html', function (htmlTemplate) {
                    content.html(_.template(htmlTemplate, {
                        list: data.osoby
                    }));
                });
            }
        });
    });
    $('#osoby-form').delegate('submit', function (event) {
        console.log('submit')
        event.preventDefault();
    });
 


/*
  * Ksieza
  */
 
  $('#nav-ksieza').click(function () {
        pageHeader.text('Księża');
        $.ajax({
            type: "GET",
            url: apiUrl +"ksieza",
            success: function( data ) {
                $.get('ksieza.html', function (htmlTemplate) {
                    content.html(_.template(htmlTemplate, {
                       list: data.ksieza
                    }));
                });
            }
        });
    });
    $('#ksieza-form').delegate('submit', function (event) {
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