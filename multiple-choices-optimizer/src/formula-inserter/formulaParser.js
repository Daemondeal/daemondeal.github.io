import { FormulaLexerError } from "./parserErrors"

const TokenType = Object.freeze({
    NUMBER_LITERAL: Symbol("NumberLiteral"),
    ALPHA_LITERAL: Symbol("AlphaLiteral"),
    PLUS: Symbol("+"),
    MINUS: Symbol("-"),
    STAR: Symbol("*"),
    SLASH: Symbol("/"), 
    LPAREN: Symbol("("),
    RPAREN: Symbol(")"),
});

function isWhitespace(ch) {
    return ch == "\t" || ch == "\n" || ch == " ";
}

function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
}

function isNumeric(ch) {
    return /^[0-9]$/i.test(ch) || ch == ".";
}

function isAlphanumeric(ch) {
    return isAlpha(ch) || isNumeric(ch);
}

class FormulaParserQueue {
    constructor(string) {
        this.string = string;
        this.position = 0;
    }

    lexTokens() {
        let tokens = [];
    }

    peek() {
        return this.string[this.position];
    }

    consume() {
        this.position++;
        return this.string[this.position - 1];
    }

    isEmpty() {
        return this.position >= this.string.length;
    }
}

function lexFormula(formula) {
    let tokens = [];
    let queue = new FormulaParserQueue(formula);
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
                type: TokenType.ALPHA_LITERAL,
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

    return tokens;
}

export function formulaParserTest() {
    console.log("Parsing");
    const formula = "1+2+3";
    const complexFormula = "1+(2+3)*4/5-(18sin(27))";
    const invalidFormula = "1+43('";
    const floatingFormula = "12.34 + 5";

    const lexedFormula = lexFormula(formula);
    const lexedComplex = lexFormula(complexFormula);
    const lexedFloating = lexFormula(floatingFormula);
    try {
        const invalid = lexFormula(invalidFormula);
    } catch (e) {
        console.log(e);
    }

    console.log(lexedFormula);
    console.log(lexedComplex);
    console.log(lexedFloating);

}

export function parseFormula(formula) {
    return {
        parsedEquation: {},
        katexEquation: formula
    }
}

