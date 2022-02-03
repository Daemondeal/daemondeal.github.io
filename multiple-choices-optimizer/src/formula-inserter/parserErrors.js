export class FormulaLexerError extends Error {
    constructor(message) {
        super(message);
        this.name = "LexerError";
    }
}