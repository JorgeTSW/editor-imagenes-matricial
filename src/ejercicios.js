// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ===========================================
// Nombre del estudiante: __________Dylan
// Fecha: _18/11/2025________________
// Grupo: ________1ª A____

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones auxiliares (puedes usarlas)
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  crearPixel,
  copiarMatriz,
  asegurarDirectorio
} = require('./utilidades');

// Importar operaciones matriciales (puedes usarlas)
const {
  sumarMatrices,
  restarMatrices,
  multiplicarPorEscalar,
  multiplicarMatrices,
  transponerMatriz
} = require('./matriz');

// ============================================
// SECCIÓN 1: FUNDAMENTOS (20 puntos)
// Conversión entre imágenes y matrices
// ============================================

// =====================================================
// Ejercicio 1 — Determinantes de matrices 2x2
// ===================================================== 

/**
 * /**
 * Calcula determinantes de matrices 2x2 dadas.
 * Matrices:
 * A = [[5, 2], [3, 1]]
 * B = [[6, 9], [2, 3]]
 * C = [[-1, 4], [2, -5]]
 * D = [[0, 5], [-5, 0]]
 *
 * @returns {Object} - Determinantes de A, B, C y D
 */
function determinantes2x2() {

  const A = [[5, 2], [3, 1]];
  const B = [[6, 9], [2, 3]];
  const C = [[-1, 4], [2, -5]];
  const D = [[0, 5], [-5, 0]];

  const detA = 5*1 - 2*3;     // -1
  const detB = 6*3 - 9*2;     // 0
  const detC = (-1)*(-5) - 4*2; // -3
  const detD = 0*0 - (5*(-5));  // 25

  return { detA, detB, detC, detD };

}

// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS (25 puntos)
// Aplicar álgebra matricial a píxeles
// ============================================

// =====================================================
// Ejercicio 2 — Regla de Sarrus para matriz 3x3
// =====================================================

/**
 * Calcula el determinante de la matriz:
 * G = [
 *  [1, 0, 2],
 *  [1, 3, 1],
 *  [2, 0, 1]
 * ]
 *
 * Aplicando la regla de Sarrus:
 *
 * det(G) =
 *   1*3*1 + 0*1*2 + 2*1*0
 * - (2*3*2 + 1*1*1 + 1*0*0)
 *
 * @returns {number} - Determinante de G
 */
function determinanteSarrus() {
  const G = [
    [1, 0, 2],
    [1, 3, 1],
    [2, 0, 1]
  ];

  const positivo =
      G[0][0]*G[1][1]*G[2][2] +
      G[0][1]*G[1][2]*G[2][0] +
      G[0][2]*G[1][0]*G[2][1];

  const negativo =
      G[0][2]*G[1][1]*G[2][0] +
      G[0][0]*G[1][2]*G[2][1] +
      G[0][1]*G[1][0]*G[2][2];

  return positivo - negativo;
}


// ============================================
// SECCIÓN 3: TRANSFORMACIONES GEOMÉTRICAS (30 puntos)
// Aplicar operaciones matriciales para transformar
// ============================================

// =====================================================
// Ejercicio 3 — Método de cofactores (3x3)
// =====================================================

/**
 * Determinante general de una matriz 3x3 usando cofactores:
 *
 * G = | g11 g12 g13 |
 *     | g21 g22 g23 |
 *     | g31 g32 g33 |
 *
 * det(G) = g11*C11 - g12*C12 + g13*C13
 *
 * (Este ejercicio es conceptual. No calcula valores reales
 * porque los gᵢⱼ no están definidos.)
 *
 * @returns {string} - Fórmula utilizada
 */
function metodoCofactores() {
  return "det(G) = g11*C11 - g12*C12 + g13*C13";
}


// ============================================
// SECCIÓN 4: FILTROS AVANZADOS (25 puntos)
// Operaciones más complejas
// ============================================

// =====================================================
// Ejercicio 4 — Propiedad: det(AB) = det(A)*det(B)
// =====================================================

/**
 * Verifica la propiedad del determinante:
 * det(AB) = det(A) * det(B)
 *
 * Matrices:
 * A = [[2, 1], [1, 3]]
 * B = [[1, 2], [3, 1]]
 *
 * AB ya fue calculada:
 * AB = [[5, 5], [10, 5]]
 *
 * @returns {Object} - determinantes y verificación
 */
function verificarPropiedadDeterminantes() {

  const detA = 2*3 - 1*1; // 5
  const detB = 1*1 - 2*3; // -5
  const detAB = 5*5 - 5*10; // -25

  const propiedad = detAB === detA * detB;

  return { detA, detB, detAB, propiedad };
}

// =====================================================
// Ejercicio 5 — Aplicación geométrica del determinante
// =====================================================

/**
 * Calcula el área del paralelogramo formado por dos vectores
 * usando el valor absoluto del determinante.
 * También determina la orientación relativa entre los vectores.
 *
 * Fórmula:
 * Área = |det(u, v)| = |a*d - b*c|
 *
 * Ejemplos:
 * a) u = [3, 1], v = [2, 4]
 * b) u = [4, 3], v = [3, 2]
 */

function determinante2x2(u, v) {
  const [a, b] = u;
  const [c, d] = v;
  return a * d - b * c;
}

function areaYOrientacion(u, v) {
  const det = determinante2x2(u, v);
  const area = Math.abs(det);
  const orientacion = det > 0
    ? "v gira en sentido contrario a las manecillas del reloj respecto a u"
    : det < 0
    ? "v gira en sentido de las manecillas del reloj respecto a u"
    : "Los vectores son linealmente dependientes";

  return { area, orientacion };
}

// Ejemplo a)
const u1 = [3, 1];
const v1 = [2, 4];
const resultado1 = areaYOrientacion(u1, v1);
console.log("Ejemplo a) Área =", resultado1.area); // 10
console.log("Orientación:", resultado1.orientacion);

// Ejemplo b)
const u2 = [4, 3];
const v2 = [3, 2];
const resultado2 = areaYOrientacion(u2, v2);
console.log("Ejemplo b) Área =", resultado2.area); // 1
console.log("Orientación:", resultado2.orientacion);

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

