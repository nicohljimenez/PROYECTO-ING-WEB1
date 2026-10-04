// Configuración para Bogotá, Colombia
const LATITUD = 4.6097;
const LONGITUD = -74.0817;

// Función asíncrona para consultar la API meteorológica
async function actualizarClimaYAire() {
    try {
        // Consultamos datos de clima actual y calidad del aire en una sola petición a Open-Meteo
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LATITUD}&longitude=${LONGITUD}&current=pm2_5&timezone=America%2FBogota`;
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUD}&longitude=${LONGITUD}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=America%2FBogota`;

        // 1. Obtener Calidad del Aire (PM2.5)
        const respuestaAire = await fetch(url);
        const datosAire = await respuestaAire.json();
        const pm25 = datosAire.current.pm2_5;

        // Clasificación del nivel de PM2.5 según la escala estándar
        let nivelAire = "Bueno";
        if (pm25 > 12 && pm25 <= 35.4) {
            nivelAire = "Moderado";
        } else if (pm25 > 35.4) {
            nivelAire = "Dañino / Alerta";
        }

        // 2. Obtener Clima (Temperatura, Humedad, Viento)
        const respuestaClima = await fetch(urlClima);
        const datosClima = await respuestaClima.json();
        
        const temperatura = datosClima.current.temperature_2m;
        const humedad = datosClima.current.relative_humidity_2m;
        const velocidadViento = datosClima.current.wind_speed_10m;

        // Clasificación semántica del viento
        let tipoViento = "Calma o Leve";
        if (velocidadViento > 11 && velocidadViento <= 28) {
            tipoViento = "Moderado";
        } else if (velocidadViento > 28) {
            tipoViento = "Fuerte";
        }

        // 3. Inyectar los datos en tiempo real en el HTML usando los IDs
        document.getElementById("val-pm25").innerText = `${pm25} µg/m³ (${nivelAire})`;
        document.getElementById("val-temperatura").innerText = `${temperatura}°C`;
        document.getElementById("val-humedad").innerText = `${humedad}%`;
        document.getElementById("val-viento").innerText = `${velocidadViento} km/h (${tipoViento})`;

        console.log("¡Datos ambientales actualizados con éxito!");

    } catch (error) {
        console.error("Error al conectar con la API ambiental:", error);
        // Si falla la conexión, mostramos un mensaje amigable
        document.getElementById("val-pm25").innerText = "No disponible";
        document.getElementById("val-temperatura").innerText = "--";
        document.getElementById("val-humedad").innerText = "--";
        document.getElementById("val-viento").innerText = "--";
    }
}

// Ejecutar la función inmediatamente al cargar la página por primera vez
document.addEventListener("DOMContentLoaded", actualizarClimaYAire);

// REFRESCO EN TIEMPO REAL: Volver a ejecutar la función automáticamente cada 5 minutos
// (5 minutos = 300,000 milisegundos)
setInterval(actualizarClimaYAire, 300000);