document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
    e.preventDefault(); // Esto evita que el navegador busque un servidor y lance el error 405
    alert("¡Muchas gracias! Hemos recibido tu mensaje correctamente.");
    this.reset(); // Esto limpia los campos del formulario tras el envío
});