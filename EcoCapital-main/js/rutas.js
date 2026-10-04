document.addEventListener("DOMContentLoaded", function() {
    const botones = document.querySelectorAll(".filtro-btn");
    const rutas = document.querySelectorAll(".ruta-tarjeta");

    botones.forEach(boton => {
        boton.addEventListener("click", function() {
            const filtro = this.getAttribute("data-filter");

            botones.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            rutas.forEach(ruta => {
                const dificultad = ruta.getAttribute("data-dificultad");
                if (filtro === "todas" || dificultad === filtro) {
                    ruta.style.display = "block";
                } else {
                    ruta.style.display = "none";
                }
            });
        });
    });
});