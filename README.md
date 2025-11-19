# Documentación de Ejercicios - Gael Magaña Chan

## Información General

-   **Materia:** Fundamentos de Álgebra\
-   **Tema:** Determinantes y Propiedades del Determinante\
-   **Fecha:** 18/11/2025\
-   **Estudiante:** Gael Magaña Chan\
-   **Grupo:** 1A

------------------------------------------------------------------------

## Objetivo de la Documentación

El objetivo de este documento es explicar y resolver los ejercicios
vistos en clase sobre determinantes, aplicando distintos métodos como
determinantes 2×2, regla de Sarrus, cofactores, verificación de
propiedades y aplicación geométrica.\
Se incluyen procedimientos detallados y resultados finales para cada
ejercicio.

------------------------------------------------------------------------

# Ejercicios Realizados

------------------------------------------------------------------------

## \### Ejercicio 1: Determinantes 2×2

### **Enunciado**

Calcular los determinantes de las matrices:

\[ A=egin{pmatrix}5 & 2\\3 & 1\\end{pmatrix},`\quad`{=tex}
B=egin{pmatrix}-1 & 4\\2 & -8\\end{pmatrix},`\quad`{=tex}
C=egin{pmatrix}6 & 9\\2 & 3\\end{pmatrix},`\quad`{=tex}
D=egin{pmatrix}0 & 5\\-5 & 0\\end{pmatrix} \]

### **Solución**

Usamos la fórmula de determinante 2×2: \[ `\det`{=tex}egin{pmatrix}a &
b\\c & d\\end{pmatrix}=ad-bc \]

-   **det(A) = 5(1) - 2(3) = 5 - 6 = -1**
-   **det(B) = (-1)(-8) - 4(2) = 8 - 8 = 0**
-   **det(C) = 6(3) - 9(2) = 18 - 18 = 0**
-   **det(D) = 0(0) - 5(-5) = 25**

### **Resultado Final**

-   det(A) = **-1**\
-   det(B) = **0**\
-   det(C) = **0**\
-   det(D) = **25**

------------------------------------------------------------------------

## \### Ejercicio 2: Regla de Sarrus (Determinante 3×3)

### **Enunciado**

Calcular usando Sarrus:

\[ E=egin{pmatrix}1 & 2 & 3\\0 & 1 & 4\\5 & 6 & 0\\end{pmatrix},
`\quad`{=tex} F=egin{pmatrix}2 & -1 & 3\\1 & 4 & 0\\3 & 2 &
-2\\end{pmatrix} \]

### **Proceso**

Aplicamos la regla de Sarrus extendiendo columnas.

### **Solución E**

Diagonal positiva:\
1·1·0 + 2·4·5 + 3·0·6 = 0 + 40 + 0 = 40\
Diagonal negativa:\
3·1·5 + 2·0·0 + 1·4·6 = 15 + 0 + 24 = 39

Det(E) = 40 − 39 = **1**

### **Solución F**

Diagonal positiva:\
2·4·(-2) + (-1)·0·3 + 3·1·2 = -16 + 0 + 6 = -10\
Diagonal negativa:\
3·4·3 + 2·0·2 + (-1)·1·(-2) = 36 + 0 + 2 = 38

Det(F) = -10 − 38 = **-48**

------------------------------------------------------------------------

## \### Ejercicio 3: Método de Cofactores

### **Enunciado**

\[ G=egin{pmatrix}1 & 0 & 2\\-1 & 3 & 1\\2 & 0 & 1\\end{pmatrix} \]

### **Proceso**

Expandimos por la columna del centro (más ceros).

### **Solución**

El determinante es:

\[ `\det`{=tex}(G) = -0 + 3egin{vmatrix}1 & 2\\2 & 1\\end{vmatrix} - 0
\]

Menor 2×2:\
1·1 − 2·2 = 1 − 4 = -3

Entonces:\
det(G) = 3(-3) = **-9**

------------------------------------------------------------------------

## \### Ejercicio 4: Verificar propiedades del determinante

Matrices:

\[ A=egin{pmatrix}2 & 1\\1 & 3\\end{pmatrix},`\quad`{=tex}
B=egin{pmatrix}1 & 2\\3 & 1\\end{pmatrix} \]

### **Propiedad 1: det(AB) = det(A)·det(B)**

-   det(A) = (2)(3) − (1)(1) = 5\
-   det(B) = (1)(1) − (2)(3) = -5

det(A)·det(B) = -25

Calculamos AB:

\[ AB=egin{pmatrix}2(1)+1(3) & 2(2)+1(1)\\1(1)+3(3) &
1(2)+3(1)\\end{pmatrix} =egin{pmatrix}5 & 5\\10 & 5\\end{pmatrix} \]

det(AB) = 5·5 − 5·10 = 25 − 50 = **-25 ✔️**

### **Propiedad 2: det(Aᵀ) = det(A)**

La transpuesta no cambia el determinante.\
det(Aᵀ) = det(A) = **5 ✔️**

------------------------------------------------------------------------

## \### Ejercicio 5: Aplicación geométrica

Dados los vectores:\
\[ ec{u} = (3,2),`\quad `{=tex}ec{v} = (1,4) \]

### a) Área del paralelogramo

Se calcula con:

\[ ext{Área}=\|`\det`{=tex}egin{pmatrix}3 & 1\\2 & 4\\end{pmatrix}\| \]

Determinante:\
3·4 − 1·2 = 12 − 2 = **10**

Área = \|10\| = **10 unidades²**

### b) ¿Cambia el área si intercambiamos los vectores?

El determinante cambia de signo:\
\[ `\det`{=tex}=`\pm 10`{=tex} \] Pero el área usa valor absoluto.\
➡️ **El área NO cambia.**

### c) ¿Qué representa el signo del determinante?

-   Positivo → orientación antihoraria\
-   Negativo → orientación horaria\
    ➡️ Representa la **orientación** de los vectores.

------------------------------------------------------------------------

# ✔️ Documento completo generado correctamente
