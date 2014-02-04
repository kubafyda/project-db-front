$( document ).ready(function() {
    
    var apiUrl = "http://localhost/projekt-db/api/public/";
    var content = $('#content'),
    pageHeader = $('#header h1');
    
    
    
    /**
     * Mieszkanie
     */
    var mieszkania = {
        headerText: 'Mieszkania',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var editData = {};
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"mieszkania/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            $.when(editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"mieszkania",
                    success: function( data ) {
                        $.get('mieszkania.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.mieszkania,
                                editData: editData
                            }));
                        });
                    }
                });
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
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"mieszkania/"+ updateId,
                data: data,
                success: function() {
                    mieszkania.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"mieszkania",
                data: data,
                success: function() {
                    mieszkania.render();
                }
            });
        }
        
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
    /** Edit record **/
    content.on('click', '.mieszkanie-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        mieszkania.editId = id;
        mieszkania.render();
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
    
    
/***************************************************************************
  * Msze
  */
    var msze = {
        headerText: 'Msze Święte',
        
        /* Zapytania najpierw o liste osób oraz listę księzy i potem zapytanie o msze i wypisanie formularza i tabeli mszy */
        render: function() {
            pageHeader.text(this.headerText);
            var osoby, ksieza;
            var osobyRequest = $.ajax({
                type: "GET",
                url: apiUrl +"osoby",
                success: function( data ) {
                    osoby = data;
                }
            });
            var ksiezaRequest = $.ajax({
                type: "GET",
                url: apiUrl +"ksieza",
                success: function( data ) {
                    ksieza = data;
                }
            });
            $.when(osobyRequest, ksiezaRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"msze",
                    success: function( data ) {
                        $.get('msze.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.msze,
                                osoby: osoby.osoby,
                                ksieza: ksieza.ksieza
                            }));
                        });
                    }
                });
            });
            
        }
    };
     $('#nav-msze').click(function () {
        msze.render();
    });
    /** Add record **/
    content.on('submit', '#msza-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        $.ajax({
            type: "POST",
            url: apiUrl +"msze",
            data: data,
            success: function() {
                msze.render();
            }
        })
    });
    /** Delete record **/
    content.on('click', '.msza-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"msze/"+ id,
            success: function() {
                msze.render();
            }
        });
    });    

    
/***************************************************************************
  * Groby
  */
    var groby = {
        headerText: 'Groby',
        
        render: function() {
            pageHeader.text(this.headerText);
            var osoby;
            var osobyRequest = $.ajax({
                type: "GET",
                url: apiUrl +"osoby",
                success: function( data ) {
                    osoby = data;
                }
            });
            $.when(osobyRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"groby",
                    success: function( data ) {
                        $.get('groby.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.groby,
                                osoby: osoby.osoby
                            }));
                        });
                    }
                });
            });
        }
    };
    $('#nav-groby').click(function () {
        groby.render();
    });
    /** Add record **/
    content.on('submit', '#grob-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        $.ajax({
            type: "POST",
            url: apiUrl +"groby",
            data: data,
            success: function() {
                groby.render();
            }
        })
    });
    /** Delete record **/
    content.on('click', '.grob-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"groby/"+ id,
            success: function() {
                groby.render();
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