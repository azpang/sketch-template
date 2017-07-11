import React, { Component } from "react";
import PropTypes from "prop-types";


//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class /**/ extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  //This is where you render your component
  render() {
  	//This is the "spread" syntax for object in ES6
    return <Style {...this.props}/>;
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

/**/.defaultProps = {
};


/**/.propTypes = {
};