import React from 'react';
import NavButton from './navButton.js';

export default class NavBar extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            navBarOpen:false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        console.log('here')
        if(this.state.navBarOpen){
            this.setState({
                navBarOpen:false
            })
        }else{
            this.setState({
                navBarOpen:true
            })
        }
    }

    render(){

        return(
            <NavButton
            handleClick={this.toggleNavBar}
            navBarOpen={this.state.navBarOpen}/>
        );
    }
}