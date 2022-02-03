import { lexFormula, TokenType, tokenToString } from "./lexer";
import Queue from "./queue";

export class FormulaParserError extends Error {
    constructor(message) {
        super(message);
        this.name = "FormulaParserError";
    }
}

export const NodeType = Object.freeze({
    NUMBER_LITERAL: Symbol("NumberLiteral"),
    ALPHA_LITERAL: Symbol("AlphaLiteral"),
    BINARY: Symbol("Binary"),
    UNARY: Symbol("Unary"),
    GROUPING: Symbol("Grouping")
});

function getInfixBindingPower(token) {
    switch (token.type) {
        case TokenType.PLUS:
        case TokenType.MINUS:
            return [1, 2];
        case TokenType.SLASH:
        case TokenType.STAR:
            return [3, 4];
        default:
            throw new FormulaParserError(`Invalid operator ${token.type}`);
    }
}

function getPrefixBindingPower(token) {
    switch (token.type) {
        case TokenType.PLUS:
        case TokenType.MINUS:
            return [-1, 5];
        default:
            throw new FormulaParserError(`Invalid operator ${token.type}`);
    }
}

function createLiteralNode(token) {
    const { literal, type } = token;
    let nodeType;

    if (type === TokenType.ALPHA_LITERAL) {
        nodeType = NodeType.ALPHA_LITERAL;
    } else if (type === TokenType.NUMBER_LITERAL) {
        nodeType = NodeType.NUMBER_LITERAL;
    } else {
        throw new FormulaParserError(`Invalid token ${token} for literal.`);
    }

    return { type: nodeType, value: literal };
}

function createBinaryNode(op, lhs, rhs) {
    return {
        type: NodeType.BINARY,
        operator: op,
        lhs,
        rhs
    };
}

function createUnaryNode(op, target) {
    return {
        type: NodeType.UNARY,
        operator: op,
        target
    };
}

function createGroupingNode(expr) {
    return {
        type: NodeType.GROUPING,
        expr
    }
}

function expr(queue, minBp) {
    if (queue.peek().type === TokenType.EOF)
        return {};

    const lhsToken = queue.consume();
    let lhs;

    switch (lhsToken.type) {
        case TokenType.ALPHA_LITERAL:
        case TokenType.NUMBER_LITERAL:
            lhs = createLiteralNode(lhsToken);
            break;
            
        case TokenType.STAR:
        case TokenType.SLASH:
        case TokenType.PLUS:
        case TokenType.MINUS:
            let [_, rbp] = getPrefixBindingPower(lhsToken.type);
            lhs = createUnaryNode(lhsToken.type, expr(queue, rbp));
            break;

        case TokenType.LPAREN:
            lhs = createGroupingNode(expr(queue, 0));
            if (queue.consume().type !== TokenType.RPAREN)
                throw new FormulaParserError("Mismatched parenthesis.");
            break;
        default:
            throw new FormulaParserError(`Unexpected token ${lhsToken}.`);
    }


    Outer:
    while (true) {
        const op = queue.peek();

        let lbp, rbp;

        switch (op.type) {
            case TokenType.EOF:
                break Outer;
            case TokenType.STAR:
            case TokenType.SLASH:
            case TokenType.PLUS:
            case TokenType.MINUS:
                [lbp, rbp] = getInfixBindingPower(op);
                if (lbp < minBp)
                    break;

                queue.consume();
                const rhs = expr(queue, rbp);
                if (rhs === undefined)
                    throw new FormulaParserError(`Expected rhs on ${op} operator.`);
                
                lhs = createBinaryNode(op.type, lhs, rhs);

                continue;
            default:
                break Outer;
        }

        break;        
    }

    return lhs;
}

function parseTokens(tokens) {
    return expr(new Queue(tokens), 0);
}

function getSExpression(node) {
    switch (node.type) {
        case NodeType.ALPHA_LITERAL:
            return node.value;
        case NodeType.NUMBER_LITERAL:
            return String(node.value);
        case NodeType.BINARY:
            return `(${tokenToString(node.operator)} ${getSExpression(node.lhs)} ${getSExpression(node.rhs)})`;
        case NodeType.UNARY:
            return `(${tokenToString(node.operator)} ${getSExpression(node.target)})`;
        case NodeType.GROUPING:
            return `(${getSExpression(node.expr)})`;
        default:
            return "";
    }
}

function tryPrettifyMultiplication(node) {
    const { lhs, rhs } = node;

    function tryPrettify(first, second) {
        if (first.type === NodeType.ALPHA_LITERAL && second.type === NodeType.NUMBER_LITERAL) {
            return `${second.value} ${first.value}`;
        } else if (first.type === NodeType.GROUPING && (second.type === NodeType.NUMBER_LITERAL || second.type === NodeType.ALPHA_LITERAL)) {
            return `${second.value} ${getKatexExpression(first)}`;
        } else {
            return null;
        }
    }

    return tryPrettify(lhs, rhs) ?? tryPrettify(rhs, lhs);
}

export function getKatexExpression(node) {
    switch (node.type) {
        case NodeType.ALPHA_LITERAL:
            if (node.value.length > 1)
                return `\\text{${node.value}}`
            else
                return node.value;
        case NodeType.NUMBER_LITERAL:
            return String(node.value);
        case NodeType.BINARY:
            if (node.operator === TokenType.STAR) {
                const res = tryPrettifyMultiplication(node);
                if (res === null)
                    return `${getKatexExpression(node.lhs)} \\cdot ${getKatexExpression(node.rhs)}`;
                else
                    return res;
            } else if (node.operator === TokenType.SLASH) {
                return `\\frac{${getKatexExpression(node.lhs)}}{${getKatexExpression(node.rhs)}}`;
            } else {
                return `${getKatexExpression(node.lhs)} ${tokenToString(node.operator)} ${getKatexExpression(node.rhs)}`
            }
        case NodeType.UNARY:
            return `${tokenToString(node.operator)}${getKatexExpression(node.target)}`;
        case NodeType.GROUPING:
            return `\\left(${getKatexExpression(node.expr)}\\right)`;
        default:
            return "";
    }
}

export function formulaParserTest() {
    const formula = "1+2-";

    const lexedFormula = lexFormula(formula);
    const parsedFormula = parseTokens(lexedFormula);

    console.log(getKatexExpression(parsedFormula));
}

export function parseFormula(formula) {
    try {
        return parseTokens(lexFormula(formula));
    } catch (e) {
        return {};
    }
}

