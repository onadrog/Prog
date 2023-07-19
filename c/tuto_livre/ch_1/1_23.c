#include <stdio.h>

void remove_comm(void);

void remove_comm(void) {

  int c, comm_tok;
  comm_tok = '\0';
  while ((c = getchar()) != EOF) {

    if (c == '/' && comm_tok == '\0') {
      comm_tok = c;
    } else if (comm_tok == '/' && c == '*') {
      comm_tok = c;
    } else if (comm_tok == '*' && c == '/') {
      comm_tok = '\0';
      continue;
    } else if (comm_tok == '/' && c != '*') {
      putchar('/');
      comm_tok = '\0';
    }
    if (comm_tok == '\0') {
      putchar(c);
    }
  }
}

int main(void) {

  remove_comm();
  return 0;
}
