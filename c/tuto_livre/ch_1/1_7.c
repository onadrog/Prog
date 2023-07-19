#include <stdio.h>
int puiss(int m, int n);
int fahrToCel(int fhar);

int main() {

  int i;

  /* for (i = 0; i < 10; ++i) {
    printf("%d %d %d\n", i, puiss(2, i), puiss(-3, i));
  } */
  for (i = 0; i <= 300; i += 20) {
    printf("%3d %6d\n", i, fahrToCel(i));
  }

  return 0;
}

int puiss(int base, int n) {
  int i, p;
  p = 1;
  for (i = 1; i <= n; ++i) {
    p *= base;
  }
  return p;
}

int fahrToCel(int n) { return 5 * (n - 32) / 9; }
