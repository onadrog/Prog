#include <stdio.h>

#define TABSIZE 4

void tabuler(void);

void tauler(void) {

  int c, nb_spaces;

  while ((c = getchar()) != EOF) {

    if (c == ' ') {
      ++nb_spaces;
      while (c == ' ' && nb_spaces > 0) {
        if (nb_spaces % TABSIZE == 0) {
          putchar('\t');
          nb_spaces -= TABSIZE;
        } else {
          putchar(' ');
          --nb_spaces;
        }
      }
    } else {
      nb_spaces = 0;
      putchar(c);
    }
  }
}

int main(void) {
  tauler();
  return 0;
}
