/* eslint-disable no-useless-constructor */
import React from 'react';

export default class HangmanStatus extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            fontSize: 42,
            display: 'flex',
            width: '2em',
            margin: '0px',
            padding: '0px',
            lineHeight: '33px'

        }

        const styleBody = {
            fontSize: 42,
            display: 'flex',
            width: '2em',
            margin: '0px',
            padding: '0px',
            lineHeight: '33px',
            letterSpacing:'-.366em'

        }

        const styleLegs = {
            fontSize: 42,
            display: 'flex',
            width: '2em',
            margin: '0px',
            padding: '0px',
            lineHeight: '33px',
            letterSpacing:'-.366em'

        }

        const head = (this.props.stage > 0)
            ? <pre style={style}>|  O</pre>
            : <pre style={style}>|   </pre>

        const body = (this.props.stage > 3)
            ? <pre style={styleBody}>|       /|\</pre>
            : (this.props.stage > 2)
                ? <pre style={styleBody}>|        |\</pre>
                : (this.props.stage > 1)
                    ? <pre style={styleBody}>|        |</pre>
                    : <pre style={styleBody}>|         </pre>

        const legs = (this.props.stage > 5)
            ? <pre style={styleLegs}>|       / \</pre>
            : (this.props.stage > 4)
                ? <pre style={styleLegs}>|         \</pre>
                : <pre style={styleLegs}>|   </pre>

        return (
            <div>
                <pre style={{...style, letterSpacing:'-.003em'}}>____</pre>
                <pre style={{...style, letterSpacing:'-.003em'}}>|  |</pre>
                {head}
                {body}
                {legs}
                <pre style={{...style, letterSpacing:'-.003em'}}>|</pre>
                <pre style={{...style, letterSpacing:'-.25em'}}>|______</pre>
            </div>
        );
    }
}