#include <stdio.h>

#define MINI 0
#define MAX 300
#define INTER 20

/* affiche la table de conversion Fahreneit-Celsius en utilisant
 la boucle for */
int main() {

  int fahr;

  for (fahr = MAX; fahr >= MINI; fahr -= INTER) {
    printf("%3d\t%6.1f\n", fahr, (5.0 / 9.0) * (fahr - 32));
  }

  return 0;
}
