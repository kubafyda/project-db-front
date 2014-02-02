$( document ).ready(function() {
    
    var apiUrl = "http://localhost/parafia-db/api/public/";
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
    
 
});