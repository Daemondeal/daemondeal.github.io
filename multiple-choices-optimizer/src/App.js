import 'katex/dist/katex.min.css';
import { BlockMath } from './components/BlockMath';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { strings } from "./strings";
import { Container, Row, Col, Form } from 'react-bootstrap';
import React from 'react';
import { parseFormula } from './formulaParser';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parsedEquation: {},
      katexEquation: ""
    };
  }

  handleTextChange(event) {
    this.setState(parseFormula(event.target.value));
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Form className="mt-5 border">
            <Form.Group className="mb-3" controlId="formInputFormula">
              <Form.Label>{strings.formulaFormText}</Form.Label>
              <Form.Control size="lg" className="text-center mx-auto" style={{width: "95%"}} type="text" placeholder="C*2/3 - I*1/3" onChange={(e) => this.handleTextChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formShowFormula">
              <Form.Label>{strings.formulaShowText}</Form.Label>
              <BlockMath equation={this.state.katexEquation}/>
            </Form.Group>
          </Form>
  
        </Container>

        Hi {this.state.katexEquation}
      </div>
    );
  }
}
