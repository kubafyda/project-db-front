$( document ).ready(function() {
    
    var apiUrl = "http://localhost/projekt-db/api/public/";
    var content = $('#content'),
    pageHeader = $('#header h1');
    
    
    
    /**
     * Mieszkanie
     */
    var mieszkania = {
        headerText: 'Mieszkania',
        
        render: function() {
            pageHeader.text(this.headerText);
            $.ajax({
                type: "GET",
                url: apiUrl +"mieszkania",
                success: function( data ) {
                    $.get('mieszkania.html', function (htmlTemplate) {
                        content.html(_.template(htmlTemplate, {
                            list: data.mieszkania
                        }));
                    });
                }
            });
        }
    };
 
    $('#nav-mieszkania').click(function () {
        mieszkania.render();
    });
    /** Add record **/
    content.on('submit', '#mieszkanie-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        $.ajax({
            type: "POST",
            url: apiUrl +"mieszkania",
            data: data,
            success: function() {
                mieszkania.render();
            }
        })
    });
    /** Delete record **/
    content.on('click', '.mieszkanie-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"mieszkania/"+ id,
            success: function() {
                mieszkania.render();
            }
        });
    });
   
 /****************************************************************************
  * Osoby
  */
    var osoby = {
        headerText: 'Osoby',
        
        render: function() {
            pageHeader.text(this.headerText);
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
        }
    };
     $('#nav-osoby').click(function () {
        osoby.render();
    });
    /** Add record **/
    content.on('submit', '#osoba-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        console.log('submit')
        console.log(data)
        $.ajax({
            type: "POST",
            url: apiUrl +"osoby",
            data: data,
            success: function() {
                osoby.render();
            }
        })
    });
    /** Delete record **/
    content.on('click', '.osoba-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"osoby/"+ id,
            success: function() {
                osoby.render();
            }
        });
    });


/***************************************************************************
  * Ksieza
  */
 
//  $('#nav-ksieza').click(function () {
//        pageHeader.text('Księża');
//        $.ajax({
//            type: "GET",
//            url: apiUrl +"ksieza",
//            success: function( data ) {
//                $.get('ksieza.html', function (htmlTemplate) {
//                    content.html(_.template(htmlTemplate, {
//                       list: data.ksieza
//                    }));
//                });
//            }
//        });
//    });
//    $('#ksieza-form').delegate('submit', function (event) {
//        console.log('submit')
//        event.preventDefault();
//    });
var ksieza = {
        headerText: 'Księża',
        
        render: function() {
            pageHeader.text(this.headerText);
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
        }
    };
     $('#nav-ksieza').click(function () {
        ksieza.render();
    });
    /** Add record **/
    content.on('submit', '#ksiadz-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        console.log('submit')
        console.log(data)
        $.ajax({
            type: "POST",
            url: apiUrl +"ksieza",
            data: data,
            success: function() {
                ksieza.render();
            }
        })
    });
    /** Delete record **/
    content.on('click', '.ksiadz-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"ksieza/"+ id,
            success: function() {
                ksieza.render();
            }
        });
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