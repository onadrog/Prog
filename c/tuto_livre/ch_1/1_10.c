#include <stdio.h>

#define MAXLIGNE 1000

int max;                    /* longueur maximum déjà rencontrée. */
char ligne[MAXLIGNE];       /* ligne d'entrée courante. */
char plus_longue[MAXLIGNE]; /* ligne la plus longue sauvée. */

int lire_ligne(void);
void copier(void);

/* Affiche la plus longue ligne en entrée (version spécialisée). */
int main() {

  int l;
  extern int max;
  extern char plus_longue[];

  max = 0;
  while ((l = lire_ligne()) > 0) {
    if (l > max) {
      max = l;
      copier();
    }
  }

  /* il y avait une ligne plus longue */
  if (max > 0) {
    printf("Ligne la plus longue (%d) :\n", max - 1);
    printf("%s", plus_longue);
  }

  return 0;
}

/* lire_ligne (version spécialisée) */
int lire_ligne(void) {
  int c, i;
  extern char ligne[];

  for (i = 0; i < MAXLIGNE - 1 && (c = getchar()) != EOF && c != '\n'; ++i) {
    ligne[i] = c;
  }
  if (c == '\n') {
    ligne[i] = c;
    ++i;
  }
  ligne[i] = '\0';
  return i;
}

/* copier (version spécialisée) */
void copier(void) {
  int i = 0;
  extern char ligne[], plus_longue[];

  while ((plus_longue[i] = ligne[i]) != '\0') {
    ++i;
  }
}
