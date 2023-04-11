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

        // Make a GET request to retrieve countries
        $.ajax({
            url: endpoint_countries,
            method: 'GET',
            success: function(response) {
                var data = response.countries
                fillSelect("country", "id", "name", data, 'Country');
            },
            error: function(error) {
                console.log(error);
            }
        });

    });

    // When the country select element changes, retrieve states for the selected country and fill the state select element
    $('#country').change(function() {
        var countryId = $(this).val();

        $.ajax({
        url: endpoint + "country/"+countryId+"/states",
        method: 'GET',
        success: function(response) {
            // Get the state select element
            var data = response.states

            // Fill the select element with the retrieved data
            fillSelect('state', 'id', 'name', data, 'State');
        },
        error: function(error) {
            console.log(error);
        }
        });
    });

    // When the state select element changes, retrieve states for the selected state and fill the city select element
    $('#state').change(function() {
        var stateId = $(this).val();

        $.ajax({
        url: endpoint + "state/"+stateId+"/cities",
        method: 'GET',
        success: function(response) {
            // Get the state select element
            var data = response.cities

            // Fill the select element with the retrieved data
            fillSelect('city', 'id', 'name', data, 'City');
        },
        error: function(error) {
            console.log(error);
        }
        });

        // Bind form submit event
        $('#registrationForm').submit(function(event) {
            // Prevent default form submission
            event.preventDefault();

            var formDataArray = $('#registrationForm').serializeArray();

            // Convertir el array a un objeto JSON
            var formData = formDataArray.reduce(function(obj, item) {
                                                                        obj[item.name] = item.value;
                                                                        return obj;
                                                                    }, {});
            // Submit AJAX request
            $.ajax({
                url: endpoint + "register",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    // Handle successful response
                   // alert(response.message);
                    window.location.replace("login.html")

                },
                error: function(error) {
                    if (error.status === 422) {
                        var errors = error.responseJSON.errors;
                        var errorList = "<ul>";
                        $.each(errors, function(field, fieldErrors) {
                          errorList += "<li>" + field + ": " + fieldErrors.join(", ") + "</li>";
                        });
                        errorList += "</ul>";
                        $("#errors").html(errorList);
                      } else {
                        console.log(error);
                      }
                }
            });
        });

    });


    



    // Function to fill a select element with data
    function fillSelect(idSelect, idData, nameValue, data, displaySelectName) {
        // Get the select element
        var select = $('#' + idSelect);
        // Clear the select element
        select.empty();
        // Add default option to the select element
        select.append($('<option>').val('').text('--Select '+displaySelectName+'--'));
        // Loop through the data and add options to the select element
        for (var i = 0; i < data.length; i++) {
            var dato = data[i];
            select.append($('<option>').val(dato[idData]).text(dato[nameValue]));
        }
    }


    

})(window.jQuery);



