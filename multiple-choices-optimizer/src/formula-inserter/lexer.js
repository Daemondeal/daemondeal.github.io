import Queue from "./queue";

export const TokenType = Object.freeze({
    NUMBER_LITERAL: Symbol("NumberLiteral"),
    ALPHA_LITERAL: Symbol("AlphaLiteral"),
    PLUS: Symbol("+"),
    MINUS: Symbol("-"),
    STAR: Symbol("*"),
    SLASH: Symbol("/"), 
    LPAREN: Symbol("("),
    RPAREN: Symbol(")"),
    EOF: Symbol("EOF"),
});

export function tokenToString(token) {
    switch (token) {
        case TokenType.PLUS:
            return '+';
        case TokenType.MINUS:
            return '-';
        case TokenType.SLASH:
            return '/';
        case TokenType.STAR:
            return '*';
        case TokenType.LPAREN:
            return '(';
        case TokenType.RPAREN:
            return ')';
    }
}

export class FormulaLexerError extends Error {
    constructor(message) {
        super(message);
        this.name = "FormulaLexerError";
    }
}

function isWhitespace(ch) {
    return ch === "\t" || ch === "\n" || ch === " ";
}

function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
}

function isNumeric(ch) {
    return /^[0-9]$/i.test(ch) || ch === ".";
}

function isAlphanumeric(ch) {
    return isAlpha(ch) || isNumeric(ch);
}

export function lexFormula(formula) {
    let tokens = [];
    let queue = new Queue(formula);
    while (!queue.isEmpty()) {
        const ch = queue.consume();

        if (isAlpha(ch)) {
            let literal = ch;
            while (!queue.isEmpty() && isAlphanumeric(queue.peek())) {
                literal += queue.consume();
            }

            tokens.push({
                type: TokenType.ALPHA_LITERAL,
                literal
            });

        } else if (isNumeric(ch)) {
            let literal = ch;

            while (!queue.isEmpty() && isNumeric(queue.peek())) {
                literal += queue.consume();
            }
            
            tokens.push({
                type: TokenType.NUMBER_LITERAL,
                literal: parseFloat(literal)
            })
        } else if (isWhitespace(ch)) {
            // Do nothing
        }
        else {
            switch (ch) {
                case '+':
                    tokens.push({type: TokenType.PLUS});
                    break;
                case '-':
                    tokens.push({type: TokenType.MINUS});
                    break;
                case '*':
                    tokens.push({type: TokenType.STAR});
                    break;
                case '/':
                    tokens.push({type: TokenType.SLASH});
                    break;
                case '(':
                    tokens.push({type: TokenType.LPAREN});
                    break;
                case ')':
                    tokens.push({type: TokenType.RPAREN});
                    break;
                default:
                    throw new FormulaLexerError(`Unrecognized character ${ch}.`);
            }
        }
    }

    tokens.push({ type: TokenType.EOF });

    return tokens;
}