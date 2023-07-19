#include <stdio.h>

#define DEDANS 1 // à l'interieur d'un mot
#define DEHORS 0 // à l'exterieur d'un mot

/* compte les lignes, les mots et les caractères en entrée. */
int main() {

  int c, nl, nm, nc, etat;

  etat = DEHORS;

  nl = nm = nc = 0;

  while ((c = getchar()) != EOF) {
    ++nc;
    if (c == '\n') {
      ++nl;
    }
    if (c == ' ' || c == '\n' || c == '\t' || c == '\\') {
      putchar('\n');
      etat = DEHORS;
    } else if (etat == DEHORS) {
      etat = DEDANS;
      ++nm;
      putchar(c);
    } else if (etat==DEDANS){
      putchar(c);
    }
  }
  printf("l:%3d\nm:%3d\nc:%3d\n", nl, nm, nc);

  return 0;
}
