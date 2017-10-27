import React, { Component } from "react";
import PropTypes from "prop-types";


//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class DetailBoxPresent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  //This is where you render your component
  render() {
    let {selected} = this.props;
  	//This is the "spread" syntax for object in ES6

    
    return <Style {...this.props} className="present">
        <img className="bg-image" src={selected.image} />
        <div className="rando-bar"></div>
        <div className="title-section">
          <div className="title">{selected.title}</div>
          <div className="area-id">Area: {selected.area}</div>
        </div>
        
        <div className="area-description">
          {selected.description}
          
        </div>
        <div className="person">
          <div className="headshot-container">
            <img src={selected.headshot} />
          </div>
          <div className="person-description">
            <div className="name">{selected.person}</div>
            <div className="since">East Bay Resident Since {selected.since}</div>
          </div>
          
        </div>
        {Object.keys(selected).length > 0 ? 
            <div className="button-container"
              onClick={this.props.flip}>
              <img src="images/Arrow.png"/>
            </div>:
              <div></div>}
    </Style>;
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

DetailBoxPresent.defaultProps = {
};


DetailBoxPresent.propTypes = {
};