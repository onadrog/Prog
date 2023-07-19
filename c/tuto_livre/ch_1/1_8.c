#include <stdio.h>
int puiss(int m, int n);

int main() {

  int i;

  for (i = 10; i > 0; --i) {
    printf("%d %d\n", i, puiss(2, i));
  }

  return 0;
}

int puiss(int base, int n) {

  int p;

  for (p = 1; n > 0; --n) {
    p *= base;
  }

  return p;
}
