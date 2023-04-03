(function($) {
	
	"use strict";
    // Define the endpoint for the API

    var endpoint = "https://api.isyours.us/api/";
    //var endpoint = "http://www.isyours.com/api/";
	
	$(window).on('load', function() {

        $.get(endpoint+'get_csrf_token', function(data) {
            $('input[name="_token"]').val(data);
            $('meta[name="csrf-token"]').attr('content', data);
        });

        // Use the endpoint to retrieve countries data and fill a select element
        var endpoint_countries = endpoint + "countries";

    });

    $('#loginForm').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();

        var formDataArray = $('#loginForm').serializeArray();

        // Convertir el array a un objeto JSON
        var formData = formDataArray.reduce(function(obj, item) {
                                                                    obj[item.name] = item.value;
                                                                    return obj;
                                                                }, {});
        // Submit AJAX request
        $.ajax({
            url: endpoint + "login",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle successful response
                sessionStorage.setItem("token", response.access_token);
                sessionStorage.setItem("token_type", response.token_type);
                sessionStorage.setItem("email", response.email);
                window.location.replace("job-list-v1.html")
            },
            error: function(error) {
                if (error.status === 401) {
                    var errorList = "<ul>";
                    errorList += "<li>" + error.responseJSON.message + "</li>";
                    errorList += "</ul>";
                    $("#errors").html(errorList);
                }
            }
        });
    });


})(window.jQuery);



