import 'katex/dist/katex.min.css';
import { BlockMath } from './formula-inserter/BlockMath';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { strings } from "./strings";
import { Container, Form, Button } from 'react-bootstrap';
import React from 'react';
import { formulaParserTest } from './formula-inserter/formulaParser';
import { FormulaTextArea } from './formula-inserter/FormulaTextArea';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Form className="mt-5 border">
            <FormulaTextArea inputText={strings.formulaFormText} />

            <Form.Group>
              <Button variant="primary" className="mb-3" onClick={() => formulaParserTest()}>Test</Button>
            </Form.Group>
          </Form>
  
        </Container>
      </div>
    );
  }
}
