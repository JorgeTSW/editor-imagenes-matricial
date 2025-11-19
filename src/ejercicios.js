// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: Gael Magaña Chan
// Fecha: 18/11/2025
// Grupo: 1A

const fs = require("fs");
const { PNG } = require("pngjs");
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  validarPixel,
  crearPixel,
  copiarMatriz
} = require("./utilidades");

/* ============================================================================
   1.1 imagenAMatriz
============================================================================ */
function imagenAMatriz(rutaImagen) {
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);

  const { width, height, data } = png;

  const matriz = crearMatrizVacia(height, width, 0);

  let i = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = data[i++];
      const g = data[i++];
      const b = data[i++];
      const a = data[i++];
      matriz[y][x] = crearPixel(r, g, b, a);
    }
  }

  return matriz;
}

/* ============================================================================
   1.2 matrizAImagen
============================================================================ */
function matrizAImagen(matrizPixeles, rutaSalida) {
  validarMatriz(matrizPixeles);
  const { filas, columnas } = obtenerDimensiones(matrizPixeles);

  const png = new PNG({ width: columnas, height: filas });

  let i = 0;
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const p = matrizPixeles[y][x];

      png.data[i++] = limitarValorColor(p.r);
      png.data[i++] = limitarValorColor(p.g);
      png.data[i++] = limitarValorColor(p.b);
      png.data[i++] = limitarValorColor(p.a);
    }
  }

  const buffer = PNG.sync.write(png);
  fs.writeFileSync(rutaSalida, buffer);

  return true;
}

/* ============================================================================
   1.3 obtenerCanal (CORREGIDO)
============================================================================ */
function obtenerCanal(matrizPixeles, canal) {
  validarMatriz(matrizPixeles);

  if (!["r", "g", "b"].includes(canal)) {
    throw new Error("Canal inválido");
  }

  const { filas, columnas } = obtenerDimensiones(matrizPixeles);
  const salida = crearMatrizVacia(filas, columnas, 0);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const valor = matrizPixeles[y][x][canal];

      salida[y][x] = crearPixel(valor, valor, valor, matrizPixeles[y][x].a);
    }
  }

  return salida;
}

/* ============================================================================
   1.4 obtenerDimensionesImagen
============================================================================ */
function obtenerDimensionesImagen(rutaImagen) {
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);

  return {
    ancho: png.width,
    alto: png.height,
    totalPixeles: png.width * png.height
  };
}

/* ============================================================================
   2.1 ajustarBrillo (CORREGIDO)
============================================================================ */
function ajustarBrillo(matrizPixeles, cantidad) {
  validarMatriz(matrizPixeles);

  const { filas, columnas } = obtenerDimensiones(matrizPixeles);

  const salida = crearMatrizVacia(filas, columnas, 0);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const p = matrizPixeles[y][x];

      salida[y][x] = crearPixel(
        limitarValorColor(p.r + cantidad),
        limitarValorColor(p.g + cantidad),
        limitarValorColor(p.b + cantidad),
        p.a
      );
    }
  }

  return salida;
}

/* ============================================================================
   2.2 invertirColores
============================================================================ */
function invertirColores(matrizPixeles) {
  validarMatriz(matrizPixeles);
  const { filas, columnas } = obtenerDimensiones(matrizPixeles);

  const salida = copiarMatriz(matrizPixeles);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const p = salida[y][x];
      p.r = 255 - p.r;
      p.g = 255 - p.g;
      p.b = 255 - p.b;
    }
  }

  return salida;
}

/* ============================================================================
   2.3 convertirEscalaGrises
============================================================================ */
function convertirEscalaGrises(matrizPixeles) {
  validarMatriz(matrizPixeles);
  const { filas, columnas } = obtenerDimensiones(matrizPixeles);

  const salida = copiarMatriz(matrizPixeles);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const p = salida[y][x];
      const gris = limitarValorColor((p.r + p.g + p.b) / 3);

      p.r = gris;
      p.g = gris;
      p.b = gris;
    }
  }

  return salida;
}

/* ============================================================================
   3.1 voltearHorizontal
============================================================================ */
function voltearHorizontal(matrizPixeles) {
  validarMatriz(matrizPixeles);
  const salida = copiarMatriz(matrizPixeles);

  for (let y = 0; y < salida.length; y++) {
    salida[y] = salida[y].reverse();
  }

  return salida;
}

/* ============================================================================
   3.2 voltearVertical
============================================================================ */
function voltearVertical(matrizPixeles) {
  validarMatriz(matrizPixeles);
  const salida = copiarMatriz(matrizPixeles);

  return salida.reverse();
}

/* ============================================================================
   3.3 rotar90Grados
============================================================================ */
function rotar90Grados(matrizPixeles) {
  validarMatriz(matrizPixeles);

  const { filas, columnas } = obtenerDimensiones(matrizPixeles);
  const salida = crearMatrizVacia(columnas, filas, 0);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      salida[x][filas - 1 - y] = { ...matrizPixeles[y][x] };
    }
  }

  return salida;
}

/* ============================================================================
   4.1 mezclarImagenes
============================================================================ */
function mezclarImagenes(imgA, imgB, factor) {
  validarMatriz(imgA);
  validarMatriz(imgB);

  const { filas, columnas } = obtenerDimensiones(imgA);

  if (filas !== imgB.length || columnas !== imgB[0].length) {
    throw new Error("Las imágenes deben tener el mismo tamaño");
  }

  const salida = crearMatrizVacia(filas, columnas, 0);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const A = imgA[y][x];
      const B = imgB[y][x];

      salida[y][x] = crearPixel(
        limitarValorColor(A.r * (1 - factor) + B.r * factor),
        limitarValorColor(A.g * (1 - factor) + B.g * factor),
        limitarValorColor(A.b * (1 - factor) + B.b * factor),
        255
      );
    }
  }

  return salida;
}

/* ============================================================================
   4.2 aplicarSepia
============================================================================ */
function aplicarSepia(matrizPixeles) {
  validarMatriz(matrizPixeles);
  const { filas, columnas } = obtenerDimensiones(matrizPixeles);

  const salida = copiarMatriz(matrizPixeles);

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const p = salida[y][x];

      const r = p.r;
      const g = p.g;
      const b = p.b;

      p.r = limitarValorColor(0.393 * r + 0.769 * g + 0.189 * b);
      p.g = limitarValorColor(0.349 * r + 0.686 * g + 0.168 * b);
      p.b = limitarValorColor(0.272 * r + 0.534 * g + 0.131 * b);
    }
  }

  return salida;
}

/* ============================================================================
   4.3 detectarBordes (CORREGIDO PARA JEST)
============================================================================ */
function detectarBordes(matrizPixeles, umbral = 50) {
  validarMatriz(matrizPixeles);

  const gris = convertirEscalaGrises(matrizPixeles);
  const { filas, columnas } = obtenerDimensiones(gris);

  const salida = crearMatrizVacia(filas, columnas, crearPixel(0, 0, 0, 255));

  for (let y = 0; y < filas - 1; y++) {
    for (let x = 0; x < columnas - 1; x++) {
      const centro = gris[y][x].r;
      const der = gris[y][x + 1].r;
      const ab = gris[y + 1][x].r;

      const diff = Math.abs(centro - der) + Math.abs(centro - ab);

      const valor = diff > umbral ? 255 : 0;

      salida[y][x] = crearPixel(valor, valor, valor, 255);
    }
  }

  return salida;
}

// ============================================
// NO MODIFICAR - Exportación de funciones
// ============================================
module.exports = {
  // Sección 1: Fundamentos
  imagenAMatriz,
  matrizAImagen,
  obtenerCanal,
  obtenerDimensionesImagen,
  
  // Sección 2: Operaciones Básicas
  ajustarBrillo,
  invertirColores,
  convertirEscalaGrises,
  
  // Sección 3: Transformaciones
  voltearHorizontal,
  voltearVertical,
  rotar90Grados,
  
  // Sección 4: Filtros Avanzados
  mezclarImagenes,
  aplicarSepia,
  detectarBordes
};
