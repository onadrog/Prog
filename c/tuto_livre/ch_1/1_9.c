#include <stdio.h>
#include <string.h>

#define MAXLIGNE 1000 // longueur max des lignes

int lire_ligne(char ligne[], int maxligne);
void copier(char vers[], char de[]);
void inverser(char s[]);

/* lit une ligne dans `s`, retourne sa longueur. */
int lire_ligne(char s[], int lim) {
  int c, i;

  for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c != '\n'; ++i) {
    s[i] = c;
  }
  if (c == '\n' && i > 1) {
    if (s[i - 1] == '\t' || s[i - 1] == ' ') {
      s[i - 1] = c;
    } else {
      s[i] = c;
      ++i;
    }
  }
  s[i] = '\0'; // = null = 0 (fin de tableau)
  return i;
}

/* copie `de` dans `vers`, suppose que vers est assez longue */
void copier(char vers[], char de[]) {
  int i = 0;

  while ((vers[i] = de[i]) != '\0') {
    ++i;
  }
}

void inverser(char s[]) {
  int i;
  for (i = strlen(s) - 1; i >= 0; --i) {
    putchar(s[i]);
  }
    putchar('\n');
}

/* affiche la plus longue ligne en entrée. */
int main() {
  int i;

  int l;   // longueur de la ligne.
  int max; // longueur maximum déjà rencontrée.

  char ligne[MAXLIGNE];       // ligne d'entrée courante.
  char plus_longue[MAXLIGNE]; // on sauve la ligne la plus longue.

  max = 0;

  while ((l = lire_ligne(ligne, MAXLIGNE)) > 0) {
    if (l > max) {
      max = l;
      copier(plus_longue, ligne);
    }
  }
  // il y avait une ligne.
  if (max > 0) {
    printf("\n---------------------\n");
    printf("Ligne la plus longue (%d):\n", max - 1);
    printf("%s", plus_longue);
    printf("\n---------------\n");
    printf("Inverser:\n");
    inverser(plus_longue);
  }

  return 0;
}
