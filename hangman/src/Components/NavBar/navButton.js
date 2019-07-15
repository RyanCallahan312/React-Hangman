import React from 'react';

export default class NavButton extends React.Component{
    constructor(props){
        super(props)

    }

    render(){

        const styles = {
            navButtonClosed:{fontSize:26, cursor:'pointer', userSelect:'none'},
            navButtonOpen:{fontSize:26, cursor:'pointer', userSelect:'none'}
        }

        return(
            <div>
                <span style={this.props.navBarOpen ? styles.navButtonOpen : styles.navBarClosed} onClick={this.props.handleClick}>
                    {'\u2630'}
                </span>
                {this.props.navBarOpen ? <p>its open</p>: <p>its closed</p>}
            </div>
        );
    }
}