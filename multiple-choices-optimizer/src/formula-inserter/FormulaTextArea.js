import React from "react";
import KaTeX from 'katex';
import { Form } from "react-bootstrap";
import { parseFormula, getKatexExpression } from "./formulaParser";

function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }
  

const DEFAULT_STATE = {
    parsedFormula: {},
    renderedKatexHTML: "",
}

export class FormulaTextArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_STATE;
    }

    handleTextChange(event) {
        try {
            const equation = event.target.value;
            const parsedFormula = parseFormula(equation);

            if (isEmpty(parsedFormula))
                this.setState(DEFAULT_STATE);
            else {
                const katexExpression = getKatexExpression(parsedFormula);

                const renderedKatexHTML = KaTeX.renderToString(katexExpression, {
                    displayMode: true,
                    throwOnError: true,
                });


                this.setState({
                    parsedFormula,
                    renderedKatexHTML,
                });
            } 

        } catch (e) {
            this.setState(DEFAULT_STATE);
        }
    }

    render() {
        const { inputText } = this.props;
        const { renderedKatexHTML } = this.state;


        return (
            <Form.Group className="mb-3">
                <Form.Label>{inputText}</Form.Label>
                <Form.Control size="lg" className="text-center mx-auto" style={{width: "95%"}} type="text" onChange={(e) => this.handleTextChange(e)} />
                <div dangerouslySetInnerHTML={{__html: renderedKatexHTML}} />
            </Form.Group>
        );
    }
}