#include <stdio.h>

#define IN 1
#define OUT 0
#define MAX 10
#define ALPHASIZE 26

/* compte les chiffres, les caractères d'escpacement
et les autres caractères en entrée. */
void compte() {

  int c, i, nespace, nautre;
  int nchiffre[10];

  nespace = nautre = 0;
  for (i = 0; i < 10; ++i) {
    nchiffre[i] = 0;
  }

  while ((c = getchar()) != EOF) {
    if (c >= '0' && c <= '9') {
      ++nchiffre[c - '0'];
    } else if (c == ' ' || c == '\n' || c == '\t') {
      ++nespace;
    } else {
      ++nautre;
    }
  }

  printf("chiffres =");
  for (i = 0; i < 10; ++i) {
    if (nchiffre[i] > 0) {
      putchar('*');
    } else {
      printf(" %d", nchiffre[i]);
    }
  }
  printf(", espacement = %d, autre = %d\n", nespace, nautre);
}

/* affiche un histogramme des longueurs des motes qu'il reçoit en entrée. */

void longueur() {

  int c, state, i, j, wc, nchar[MAX];

  wc = 0;
  state = OUT;

  for (i = 0; i < MAX; ++i) {
    nchar[i] = 0;
  }

  while ((c = getchar()) != EOF) {
    if (c == ' ' || c == '\n' || c == '\t') {
      state = OUT;
      ++nchar[wc];
      wc = 0;
    } else if (state == OUT) {
      wc = 0;
      state = IN;
    }
    ++wc;
  }
  printf("|------\tLongueur\t------|\n");
  for (j = 0; j < MAX; ++j) {
    printf("%d: ", j);
    if (nchar[j] > 0) {
      for (i = 0; i < nchar[j]; ++i) {
        putchar('*');
      }
    }
    putchar('\n');
  }
}

/* compte la frequence des mots sur 10. */
void wordFreq() {
  int c, state, i, j, wc, tw, nchar[MAX], k;
  wc = tw = 0;
  state = OUT;
  for (i = 0; i < MAX; ++i) {
    nchar[i] = 0;
  }
  while ((c = getchar()) != EOF) {
    if (c == ' ' || c == '\n' || c == '\t') {
      state = OUT;
      ++nchar[wc];
      wc = 0;
    } else if (state == OUT) {
      tw += wc;
      wc = 0;
      state = IN;
    }
    ++wc;
  }
  ++tw;

  printf("|------\tFrequence des mots\t------|\n");
  for (j = 0; j < MAX; ++j) {
    printf("%d:\t", j);
    if (nchar[j] > 0) {
      k = MAX / (tw / nchar[j]);
      for (i = 0; i < k; ++i) {
        putchar('*');
      }
    }
    putchar('\n');
  }
}

void charFreq() {
  int c, state, i, j, wc, tw, nchar[ALPHASIZE], k;
  wc = tw = 0;
  state = OUT;
  for (i = 0; i < ALPHASIZE; ++i) {
    nchar[i] = 0;
  }
  while ((c = getchar()) != EOF) {
    if (c >= 'a' && c <= 'z') {
      ++nchar[c - 'a'];
    }
    if (c == ' ' || c == '\n' || c == '\t') {
      state = OUT;
      wc = 0;
    } else if (state == OUT) {
      tw += wc;
      wc = 0;
      state = IN;
    }
    ++wc;
  }
  ++tw;

  printf("|------\tFrequence des charactères\t------|\n");
  for (j = 0; j < ALPHASIZE; ++j) {
    printf("%c:\t", j + 'a');
    if (nchar[j] > 0) {
      k = ALPHASIZE / (tw / nchar[j]);
      for (i = 0; i < k; ++i) {
        putchar('*');
      }
    }
    putchar('\n');
  }
}

int main() {
  charFreq();
  // wordFreq();
  // longueur();
  return 0;
}
