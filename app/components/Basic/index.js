import React, { Component } from "react";
import PropTypes from "prop-types";


//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
      text:"Hi Here"
    };
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  componentDidMount(){
    setTimeout(()=>this.setState({
      text:"Baiiiii"
    }),4000);
  }

  //This is where you render your component
  render() {
  	//This is the "spread" syntax for object in ES6
    return (<Style {...this.props}>
          <div className="propDiv">{this.props.property}</div>
          <div className="stateDiv">{this.state.text}</div>
        </Style>);
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

Basic.defaultProps = {
};


Basic.propTypes = {
};