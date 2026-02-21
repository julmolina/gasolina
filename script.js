const pKmLlenado = document.getElementById("pKmLlenado");
const pGalones = document.getElementById("pGalones");
const txtKm = document.getElementById("txtKmDespues");

const btnGuardar = document.getElementById("btnGuardar");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpiar = document.getElementById("btnLimpiar");

const canvas = document.getElementById("cvTanque");
const ctx = canvas.getContext("2d");

let kmAlLlenar = null;
const MAX_GAL = 12;

function dibujarTanque(galones) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = 60;
  const y = 40;
  const w = 80;
  const h = 240;

  // Fondo del tanque
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  // Escala
  ctx.font = "12px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("12", 20, y + 5);
  ctx.fillText("6", 20, y + h / 2 + 5);
  ctx.fillText("0", 20, y + h + 5);

  if (galones === null) return;

  const galDibujo = Math.min(galones, MAX_GAL);
  const altura = (galDibujo / MAX_GAL) * h;

  ctx.fillStyle = galones >= 10 ? "red" : "blue";
  ctx.fillRect(x, y + h - altura, w, altura);

  ctx.fillStyle = "#000";
  ctx.fillText(`${galones.toFixed(2)} gal`, 55, y + h + 25);
}

// Dibujo inicial
dibujarTanque(null);

// Guardar km al llenar
btnGuardar.addEventListener("click", () => {
  const valor = parseFloat(txtKm.value);
  if (isNaN(valor)) {
    alert("Ingrese un valor válido");
    return;
  }

  kmAlLlenar = valor;
  pKmLlenado.textContent =
    `Kilómetros al momento de llenar el tanque: ${valor.toFixed(0)} km`;
  pGalones.textContent = "Galones consumidos: --";
  dibujarTanque(null);
});

// Calcular galones
btnCalcular.addEventListener("click", () => {
  if (kmAlLlenar === null) {
    alert("Primero guarde los km al llenar");
    return;
  }

  const km = parseFloat(txtKm.value);
  if (isNaN(km) || km < kmAlLlenar) {
    alert("Dato inválido");
    return;
  }

  const galones = (km - kmAlLlenar) / 28.5;
  pGalones.textContent =
    `Galones consumidos: ${galones.toFixed(1)} gal`;

  dibujarTanque(galones);
});

// Limpiar
btnLimpiar.addEventListener("click", () => {
  kmAlLlenar = null;
  txtKm.value = "";
  pKmLlenado.textContent =
    "Kilómetros al momento de llenar el tanque: --";
  pGalones.textContent = "Galones consumidos: --";
  dibujarTanque(null);
});
