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
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var mieszkania;
            var mieszkaniaRequest = $.ajax({
                type: "GET",
                url: apiUrl +"mieszkania",
                success: function( data ) {
                    mieszkania = data.mieszkania;
                }
            });  
            var editData = {};
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"osoby/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            $.when(editRequest, mieszkaniaRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"osoby",
                    success: function( data ) {
                        $.get('osoby.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.osoby,
                                mieszkania: mieszkania,
                                editData: editData
                            }));
                        });
                    }
                });
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
        var updateId = $(this).data('update-id');
        if(updateId) {
            console.log('update')
            $.ajax({
                type: "PUT",
                url: apiUrl +"osoby/"+ updateId,
                data: data,
                success: function() {
                    osoby.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"osoby",
                data: data,
                success: function() {
                    osoby.render();
                }
            });
        }
        
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
    /** Edit record **/
    content.on('click', '.osoba-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        osoby.editId = id;
        osoby.render();
    });

/***************************************************************************
  * Ksieza
  */
var ksieza = {
        headerText: 'Księża',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var editData = {};
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"ksieza/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            $.when(editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"ksieza",
                    success: function( data ) {
                        $.get('ksieza.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.ksieza,
                                editData: editData
                            }));
                        });
                    }
                });
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
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"ksieza/"+ updateId,
                data: data,
                success: function() {
                    ksieza.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"ksieza",
                data: data,
                success: function() {
                    ksieza.render();
                }
            });
        }
        
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
    /** Edit record **/
    content.on('click', '.ksiadz-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        ksieza.editId = id;
        ksieza.render();
    });
    
/***************************************************************************
  * Msze
  */
     var msze = {
        headerText: 'Msze Święte',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var osoby, ksieza;
            var editData = {};
            var editRequest = true;
           
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
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"msze/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            
            $.when(osobyRequest, ksiezaRequest, editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"msze",
                    success: function( data ) {
                        $.get('msze.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.msze,
                                osoby: osoby.osoby,
                                ksieza: ksieza.ksieza,
                                editData: editData
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
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"msze/"+ updateId,
                data: data,
                success: function() {
                    msze.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"msze",
                data: data,
                success: function() {
                    msze.render();
                }
            });
        }
        
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
    /** Edit record **/
    content.on('click', '.msza-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        msze.editId = id;
        msze.render();
    });

    
/***************************************************************************
  * Groby
  */
    var groby = {
        headerText: 'Groby',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var osoby;
            var editData = {};
            
            var osobyRequest = $.ajax({
                type: "GET",
                url: apiUrl +"osoby",
                success: function( data ) {
                    osoby = data;
                }
            });
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"groby/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            $.when(osobyRequest, editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"groby",
                    success: function( data ) {
                        $.get('groby.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.groby,
                                osoby: osoby.osoby,
                                editData: editData
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
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"groby/"+ updateId,
                data: data,
                success: function() {
                    groby.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"groby",
                data: data,
                success: function() {
                    groby.render();
                }
            });
        }
        
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
    /** Edit record **/
    content.on('click', '.grob-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        groby.editId = id;
        groby.render();
    });
    
   /***************************************************************************
  * Chrzty
  */
    var chrzty = {
        headerText: 'Chrzty',
        editId: 0,
        
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
            var editData = {};
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"groby/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            
            $.when(osobyRequest, ksiezaRequest, editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"chrzty",
                    success: function( data ) {
                        $.get('chrzty.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.chrzty,
                                osoby: osoby.osoby,
                                ksieza: ksieza.ksieza,
                                editData: editData
                            }));
                        });
                    }
                });
            });
        }
    };
 
    $('#nav-chrzty').click(function () {
        chrzty.render();
    });
    /** Add record **/
    content.on('submit', '#chrzest-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"chrzty/"+ updateId,
                data: data,
                success: function() {
                    chrzty.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"chrzty",
                data: data,
                success: function() {
                    chrzty.render();
                }
            });
        }
        
    });
    /** Delete record **/
    content.on('click', '.chrzest-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"chrzty/"+ id,
            success: function() {
                chrzty.render();
            }
        });
    });    
    /** Edit record **/
    content.on('click', '.chrzest-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        chrzty.editId = id;
        chrzty.render();
    });
    
     /***************************************************************************
  * Śluby
  */
    var sluby = {
        headerText: 'Śluby',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var osoby, ksieza;
            var editData = {};
            
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
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"sluby/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                    }
                });
                this.editId = 0;
            }
            $.when(osobyRequest, ksiezaRequest, editRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"sluby",
                    success: function( data ) {
                        $.get('sluby.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.sluby,
                                osoby: osoby.osoby,
                                ksieza: ksieza.ksieza,
                                editData: editData
                            }));
                        });
                    }
                });
            });
        }
    };
 
    $('#nav-sluby').click(function () {
        sluby.render();
    });
    /** Add record **/
    content.on('submit', '#slub-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"sluby/"+ updateId,
                data: data,
                success: function() {
                    sluby.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"sluby",
                data: data,
                success: function() {
                    sluby.render();
                }
            });
        }
        
    });
    /** Delete record **/
    content.on('click', '.slub-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"sluby/"+ id,
            success: function() {
                sluby.render();
            }
        });
    });    
    /** Edit record **/
    content.on('click', '.slub-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        sluby.editId = id;
        sluby.render();
    });
 
 /***************************************************************************
  * Pogrzeby
  */
    var pogrzeby = {
        headerText: 'Pogrzeby',
        editId: 0,
        
        render: function() {
            pageHeader.text(this.headerText);
            var osoby, ksieza, groby;
            var editData = {};
           
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
            var grobyRequest = $.ajax({
                type: "GET",
                url: apiUrl +"groby",
                success: function( data ) {
                    groby = data;
                }
            });
            var editData = {};
            var editRequest = true;
            if(this.editId) {
                editRequest = $.ajax({
                    type: "GET",
                    url: apiUrl +"pogrzeby/"+ this.editId,
                    success: function (data) {
                        editData = data.rekord;
                        console.log(editData)
                    }
                });
                this.editId = 0;
            }
            $.when(editRequest, osobyRequest, ksiezaRequest, grobyRequest).then(function () {
                $.ajax({
                    type: "GET",
                    url: apiUrl +"pogrzeby",
                    success: function( data ) {
                        $.get('pogrzeby.html', function (htmlTemplate) {
                            content.html(_.template(htmlTemplate, {
                                list: data.pogrzeby,
                                osoby: osoby.osoby,
                                ksieza: ksieza.ksieza,
                                groby: groby.groby,
                                editData: editData
                            }));
                        });
                    }
                });
            });
        }
    };
 
    $('#nav-pogrzeby').click(function () {
        pogrzeby.render();
    });
    /** Add record **/
    content.on('submit', '#pogrzeb-form', function (event) {
        event.preventDefault();
        var data = $(this).serializeObject();
        var updateId = $(this).data('update-id');
        if(updateId) {
            $.ajax({
                type: "PUT",
                url: apiUrl +"pogrzeby/"+ updateId,
                data: data,
                success: function() {
                    pogrzeby.render();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: apiUrl +"pogrzeby",
                data: data,
                success: function() {
                    pogrzeby.render();
                }
            });
        }
    });
    /** Delete record **/
    content.on('click', '.pogrzeb-delete', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        $.ajax({
            type: "DELETE",
            url: apiUrl +"pogrzeby/"+ id,
            success: function() {
                pogrzeby.render();
            }
        });
    });     
    /** Edit record **/
    content.on('click', '.pogrzeb-update', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        pogrzeby.editId = id;
        pogrzeby.render();
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
