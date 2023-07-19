#include <stdio.h>

#define TABSIZE 4

void detabuler(void);

void detabuler(void) {

  int c, nb_char;

  while ((c = getchar()) != EOF) {

    if (c == '\t') {
      nb_char = TABSIZE;

      while (nb_char > 0) {
        putchar(' ');
        --nb_char;
      }
    } else {
      putchar(c);
    }
  }
}

int main(void) {

  detabuler();

  return 0;
}
