#include <stdio.h>

int main() {

  int c;

  while ((c = getchar() != EOF)) {
    if (c == 1) {
      printf("%d\n", c);
    }
  }

  printf("EOF: %c", EOF);
  return 0;
}
