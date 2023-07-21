#include <ctype.h>
#include <errno.h>
#include <stdio.h>
#include <string.h>

typedef enum {
    IDENT,
    LBRACE,
    RBRACE,
    LPAREN,
    RPAREN,
    IF,
    ELSE,
    TYPE,
    RETURN,
    FUNC
} TOKEN;

const char *keywords[] = {"main", "if", "else", "void", "return", "int"};
#define keywords_count (sizeof(keywords) / sizeof(keywords[0]))

typedef struct {
    TOKEN type;
    char literal;
} Token;

typedef struct {
    int pos;
    int c;
} Lexer;

void read_char(Lexer *l);
void skip_whitespace(int c);
void usage(int n, char *program);
void parser(Lexer *l, Token *t);
Token lexer(int c, Token *t);

void skip_whitespace(int c) {
    while (isspace(c)) {
        continue;
    }
}

void read_char(Lexer *l) {
    int c;
    if (c == '\0') {
        return;
    }
    l->pos += 1;
}

void parser(Lexer *l, Token *t) {}

Token lexer(int c, Token *t) {
    Lexer l;
    switch (c) {
    case '\0':
        t->type = -1;
        t->literal = c;
    case '(':
        t->type = LPAREN;
        t->literal = c;
        break;
    case '{':
        t->type = LBRACE;
        t->literal = c;
        break;
    default:
        t->type = IDENT;
        t->literal = c;
    }

    return *t;
}

void usage(int n, char *program) {
    fprintf(stderr, "ERROR: expected 1 argument, got %d.\n", n - 1);
    printf("USAGE: %s [filepath]\n", program);
}

int main(int argc, char **argv) {

    if (argc == 1 || argc > 2) {
        usage(argc, argv[0]);
        return 1;
    }
    char *file_path = argv[1];

    FILE *file = fopen(file_path, "r");

    if (file == NULL) {
        fprintf(stderr, "ERROR: could not open %s\n%s\n", file_path,
                strerror(errno));
        return 1;
    }

    int c;
    Token t;

    while ((c = getc(file)) != EOF) {

        if (isspace(c)) {
            continue;
        }

        t = lexer(c, &t);

        if (t.type == IDENT) {
            continue;
        } else if (t.type == LPAREN) {
            printf("Type: %d\tliteral: %c\n", t.type, t.literal);
        } else if (t.type == LBRACE) {
            printf("Type: %d\tliteral: %c\n", t.type, t.literal);
        }
    }

    fclose(file);

    return 0;
}
