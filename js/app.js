console.log("app.js cargado");

import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const formAdso = document.getElementById("formAdso");

formAdso.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarDatos();
});

const nombreEmpresa = document.getElementById("nombre_empresa");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const personaContacto = document.getElementById("persona_contacto");
const direccion = document.getElementById("direccion");
const fechaInicio = document.getElementById("fecha_inicio");
const fechaFin = document.getElementById("fecha_fin");
const estado = document.getElementById("estado");

function guardarDatos() {
    const nuevaReferencia = ref(db, "empresas");
    push(nuevaReferencia, {
        nombre: nombreEmpresa.value,
        telefono: telefono.value,
        email: email.value,
        personaContacto: personaContacto.value,
        direccion: direccion.value,
        fechaInicio: fechaInicio.value,
        fechaFin: fechaFin.value,
        estado: estado.value
    }).then(() => {
        console.log("Guardado correctamente");
    }).catch((error) => {
        console.error("Error:", error);
    });

}