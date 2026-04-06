let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

const form = document.getElementById("form");
const tabla = document.getElementById("tabla");
const stockLista = document.getElementById("stock");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        medicamento: document.getElementById("medicamento").value,
        tipo: document.getElementById("tipo").value,
        cantidad: parseInt(document.getElementById("cantidad").value),
        paciente: document.getElementById("paciente").value,
        usuario: document.getElementById("usuario").value
    };

    movimientos.push(data);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    form.reset();
    render();
});

function render() {
    tabla.innerHTML = "";
    stockLista.innerHTML = "";

    let stock = {};

    movimientos.forEach(m => {
        if (!stock[m.medicamento]) {
            stock[m.medicamento] = 0;
        }

        if (m.tipo === "Entrada") {
            stock[m.medicamento] += m.cantidad;
        } else {
            stock[m.medicamento] -= m.cantidad;
        }

        tabla.innerHTML += `
            <tr>
                <td>${m.medicamento}</td>
                <td>${m.tipo}</td>
                <td>${m.cantidad}</td>
                <td>${m.paciente}</td>
                <td>${m.usuario}</td>
            </tr>
        `;
    });

    for (let med in stock) {
        stockLista.innerHTML += `<li>${med}: ${stock[med]}</li>`;
    }
}

render();
