#include <stdio.h>

#define MAXLINE 20

void replie(void);

void replie() {
  int c, nb_char;

  while ((c = getchar()) != EOF) {
    ++nb_char;
    if (nb_char >= MAXLINE) {
      if (c == '\n' || c == '\t' || c == ' ') {
        putchar('\n');
        nb_char = 0;
      } else {
        putchar(c);
      }
    } else {
      putchar(c);
    }
  }
}

int main(void) {

  replie();

  return 0;
}
