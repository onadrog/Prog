#include <stdio.h>

int main() {
  int c, lc;
  while ((c = getchar()) != EOF) {

    if (c == ' ' && lc == ' ') {
      lc = c;
      continue;
    }

    switch (c) {
    case '\n':
      putchar('\\');
      putchar('n');
      putchar(c);
      break;
    case '\t':
      putchar('\\');
      putchar('t');
      break;
    case '\b':
      putchar('\\');
      putchar('b');
      break;
    case '\\':
      putchar('\\');
      putchar('\\');
      break;
    default:
      putchar(c);
      break;
    }
    lc = c;
  }
  return 0;
}
