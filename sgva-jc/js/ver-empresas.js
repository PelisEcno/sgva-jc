import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const tbody = document.getElementById("tablaEmpresas");
const buscador = document.getElementById("buscador");
const filtroEstado = document.getElementById("filtroEstado");
const resultadosCount = document.getElementById("resultadosCount");

let todasEmpresas = [];

function renderTabla() {
    const texto = buscador.value.toLowerCase();
    const estado = filtroEstado.value.toLowerCase();

    const filtradas = todasEmpresas.filter(e => {
        const coincideTexto = !texto ||
            (e.nombre || "").toLowerCase().includes(texto) ||
            (e.personaContacto || "").toLowerCase().includes(texto) ||
            (e.email || "").toLowerCase().includes(texto);
        const coincideEstado = !estado || (e.estado || "").toLowerCase() === estado;
        return coincideTexto && coincideEstado;
    });

    tbody.innerHTML = "";

    if (filtradas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="no-results">No se encontraron empresas.</td></tr>`;
    } else {
        filtradas.forEach((empresa, i) => {
            const fila = document.createElement("tr");
            const estadoClass = (empresa.estado || "").toLowerCase();
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${empresa.nombre || "-"}</td>
                <td>${empresa.telefono || "-"}</td>
                <td>${empresa.email || "-"}</td>
                <td>${empresa.personaContacto || "-"}</td>
                <td>${empresa.direccion || "-"}</td>
                <td>${empresa.fechaInicio || "-"}</td>
                <td>${empresa.fechaFin || "-"}</td>
                <td><span class="badge ${estadoClass}">${empresa.estado || "-"}</span></td>
            `;
            tbody.appendChild(fila);
        });
    }

    resultadosCount.textContent = `${filtradas.length} de ${todasEmpresas.length} empresas`;
}

function actualizarStats(empresas) {
    document.getElementById("totalEmpresas").textContent = empresas.length;
    document.getElementById("totalPendiente").textContent = empresas.filter(e => (e.estado || "").toLowerCase() === "pendiente").length;
    document.getElementById("totalLlamado").textContent = empresas.filter(e => (e.estado || "").toLowerCase() === "llamado").length;
    document.getElementById("totalDescartado").textContent = empresas.filter(e => (e.estado || "").toLowerCase() === "descartado").length;
}

onValue(ref(db, "empresas"), (snapshot) => {
    if (!snapshot.exists()) {
        tbody.innerHTML = `<tr><td colspan="9" class="no-results">No hay empresas registradas.</td></tr>`;
        return;
    }
    todasEmpresas = Object.values(snapshot.val()).reverse();
    actualizarStats(todasEmpresas);
    renderTabla();
});

buscador.addEventListener("input", renderTabla);
filtroEstado.addEventListener("change", renderTabla);