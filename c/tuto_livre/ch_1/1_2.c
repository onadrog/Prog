#include <stdio.h>

#define MINI 0        /* borne inferieure de la table */
#define MAXI 300      // borne superieure
#define INTERVALLE 20 // intervalle entre les valeurs en degrés Fahrenheit

/* affiche la table de conversation Fahrenheit-Celsius
 pour fahr = 0,20,...,300 */
int main() {

  float fahr, celsius;

  fahr = MINI;

  printf("------\tFharenheit to Celsius\t------\n");
  while (fahr <= MAXI) {
    celsius = (5.0 / 9.0) * (fahr - 32.0);
    printf("%10.0f\t%10.1f\n", fahr, celsius);
    fahr = fahr + INTERVALLE;
  }
  printf("\n");

  fahr = 0.0;
  celsius = MINI;

  printf("------\tCelsius to Fharenheit \t------\n");
  while (celsius <= MAXI) {
    fahr = celsius * (9.0 / 5.0) + 32.0;
    printf("%10.0f\t%10.0f\n", celsius, fahr);
    celsius = celsius + INTERVALLE;
  }

  return 0;
}
