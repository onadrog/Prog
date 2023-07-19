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

struct Token {
    TOKEN type;
    char literal;
};

void read_char(void);
void skip_whitespace(int c);
void usage(int n, char *program);
void parser(struct Token *t);
struct Token lexer(int c, struct Token *t);

void skip_whitespace(int c) {
    while (c == '\n' || c == '\t' || c == ' ' || c == '\r') {
        continue;
    }
}

void read_char() {
    int c, pos;
    if (c == '\0') {
        return;
    }
    pos += 1;
}

void parser(struct Token *t) {}

struct Token lexer(int c, struct Token *t) {
    switch (c) {
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
    printf("ERROR: expected 1 argument, got %d.\n", n - 1);
    printf("USAGE: %s [filepath]\n", program);
}

int main(int argc, char **argv) {

    if (argc == 1) {
        usage(argc, argv[0]);
        return 1;
    } else if (argc > 2) {
        usage(argc, argv[0]);
        return 1;
    }

    char *file_path = argv[1];

    FILE *file = fopen(file_path, "r");

    if (file == NULL) {
        printf("ERROR: could not open %s\n%s\n", file_path, strerror(errno));
        return 1;
    }

    int c;
    struct Token t;
    while ((c = getc(file)) != EOF) {

        if (c == '\n' || c == '\t' || c == ' ' || c == '\r') {
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
