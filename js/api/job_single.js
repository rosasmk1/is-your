(function($) {
	
	"use strict";
    // Define the endpoint for the API

    var endpoint = "https://api.isyours.us/api/";
    //var endpoint = "http://www.isyours.com/api/";
	
	$(window).on('load', function() {
        var token = sessionStorage.getItem('token');
        var token_type = sessionStorage.getItem('token_type');
        var email = sessionStorage.getItem('email');

        $.ajax({
            url: endpoint + "joboffers",
            type: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function(response) {
                // hacer algo con la respuesta del servicio
                console.log(response);
                var offer = response[3];



                $("#job_description").text(offer.description);
                $("#server_position").text(offer.server_position);
                $("#city").text(offer.city.name);

                const li = $('#city');

                // Nuevo texto
                const nuevoTexto = offer.city.name;

                // Selección del contenido del li sin afectar al contenido del span
                const contenido = li.contents().filter(function() {
                return this.nodeType === 3; // Filtra nodos de texto
                }).first();

                // Concatenar el contenido original del span con el nuevo texto
                const nuevoContenido = '<span class="icon flaticon-map-locator"></span> ' + nuevoTexto;

                // Reemplazar el contenido del li
                contenido.replaceWith(nuevoContenido);
                
                // Arreglo con la información
                
                // Selección del elemento ul y generación de elementos li
                const ul = $('#skill_list');
                $.each(offer.skills, function(index, item) {
                    const li = $('<li>').text(item.name);
                    ul.append(li);
                });
  

            },
            error: function(xhr, status, error) {
                // manejar el error de la solicitud
                console.error(error);
            }
        });

    });


})(window.jQuery);



