import React from 'react';
import KaTeX from 'katex';

export class BlockMath extends React.Component {
    constructor(props) {
        super(props);

        this.state = BlockMath.createNewState(null, props);
    }

    static getDerivedStateFromProps(props, state) {
        return BlockMath.createNewState(state, props);
    }    

    static createNewState(prevState, props) {
        try {
            const html = this.generateHtml(props);

            return { html, error: undefined };
        } catch (error) {
            if (error instanceof KaTeX.ParseError || error instanceof TypeError)
                return { error };

            throw error;
        }
    }

    static generateHtml(props) {
        const { equation, errorColor, renderError } = props;
        return KaTeX.renderToString(equation, {
            displayMode: true,
            errorColor,
            throwOnError: !!renderError
        });
    }

    render() {
        const { error, html } = this.state;
        const { renderError } = this.props;


        if (error) {
            return renderError ? (renderError(error)) : (<p>{error.message}</p>);
        }

        return <div dangerouslySetInnerHTML={{__html: html}}/>;
    }
}

