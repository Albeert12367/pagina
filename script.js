function agregarBloque() {
    var inputText = document.getElementById("inputText").value;

    if (inputText !== "") {
        // Obtener la fecha actual
        var fechaActual = new Date();

        // Parsear la hora y la información del bloque
        var partes = inputText.split(" ");
        var horaPartes = partes[0].split(":");
        var nuevaFecha = new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            fechaActual.getDate(),
            parseInt(horaPartes[0]),
            parseInt(horaPartes[1]),
            parseInt(horaPartes[2])
        );

        // Sumar 2 horas y 23 minutos
        nuevaFecha.setHours(nuevaFecha.getHours() + 2);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 23);

        // Formatear la nueva fecha como HH:mm:ss
        var nuevaHora = nuevaFecha.toTimeString().split(" ")[0];

        // Crear un nuevo bloque con la información actualizada
        var nuevoBloque = {
            tiempo: nuevaHora,
            contenido: partes.slice(1).join(" ")
        };

        // Obtener bloques actuales desde el almacenamiento local o inicializar un array vacío
        var bloques = JSON.parse(localStorage.getItem("bloques")) || [];

        // Agregar el nuevo bloque al array
        bloques.push(nuevoBloque);

        // Guardar el array actualizado en el almacenamiento local
        localStorage.setItem("bloques", JSON.stringify(bloques));

        // Mostrar los bloques
        cargarBloques();

        // Limpiar el campo de entrada
        document.getElementById("inputText").value = "";
    }
}

function cargarBloques() {
    // Obtener bloques desde el almacenamiento local
    var bloques = JSON.parse(localStorage.getItem("bloques")) || [];

    // Mostrar los bloques en el contenedor
    var bloquesContainer = document.getElementById("bloquesContainer");
    bloquesContainer.innerHTML = "";

    bloques.forEach(function (bloque) {
        var bloqueDiv = document.createElement("div");
        bloqueDiv.className = "bloque";
        bloqueDiv.innerHTML = `<div>${bloque.tiempo} ${bloque.contenido}</div>
                               <button onclick="eliminarBloque('${bloque.tiempo}')">Eliminar</button>`;
        bloquesContainer.appendChild(bloqueDiv);
    });
}

function eliminarBloque(tiempo) {
    // Obtener bloques actuales desde el almacenamiento local
    var bloques = JSON.parse(localStorage.getItem("bloques")) || [];

    // Filtrar el bloque a eliminar por tiempo
    var bloquesActualizados = bloques.filter(function (bloque) {
        return bloque.tiempo !== tiempo;
    });

    // Guardar los bloques actualizados en el almacenamiento local
    localStorage.setItem("bloques", JSON.stringify(bloquesActualizados));

    // Mostrar los bloques actualizados
    cargarBloques();
}

// Cargar bloques al cargar la página
cargarBloques();
