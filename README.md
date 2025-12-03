# Fundamentos de Algebra - Practica 1

## Información del Estudiante
- **Nombre:** Euruviel Márquez Martínez  
- **Matrícula:**  SW2509018
- **Grupo:** 1C 
- **Carrera:** TSW  
- **Cuatrimestre:** Primero  
- **Profesor:** Jorge Javier Pedrozo Romero  

##  Descripción del Proyecto

Este repositorio contiene mi solución a la práctica de **Fundamentos de Programación**, donde implemento funciones en JavaScript para resolver problemas de álgebra básica, preparándome para trabajar con operaciones matriciales más complejas.


## **Ejercicio 1: Determinante de una matriz 2×2**

Dada la matriz:


Dada la matriz:

    A = | a   b |
        | c   d |

El determinante se calcula como:

    det(A) = ad - bc

El determinante se calcula como:

$$
\det(A) = ad - bc
$$


---

## **Ejercicio 2: Suma, resta y multiplicación de matrices**

Dadas las matrices:


Dadas las matrices:

    A = | 2   1 |
        | 1   3 |

    B = | 1   2 |
        | 3   1 |

------------------------------------------------------------------------

## A + B

    A + B = | 3   3 |
            | 4   4 |

------------------------------------------------------------------------

## A - B

    A - B = |  1  -1 |
            | -2   2 |






### **Multiplicación AB**



    AB = | (2*1 + 1*3)   (2*2 + 1*1) |
         | (1*1 + 3*3)   (1*2 + 3*1) |

    AB = |  5   5 |
         | 10   5 |


---

## **Ejercicio 3: Determinante de AB, A y B**

### Determinante de A

    det(A) = (2*3) - (1*1) = 5

### Determinante de B

    det(B) = (1*1) - (2*3) = -5

### Determinante de AB

    det(AB) = (5*5) - (5*10) = -25

### Verificación

    det(AB) = det(A) * det(B)
    -25 = 5 * -5

✔ Propiedad verificada

---

---

## 📄 Licencia

Este proyecto es parte de las actividades académicas del **Tecnológico de Software** y está bajo la licencia MIT.

---

