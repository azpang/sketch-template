import React, { Component } from "react";
import PropTypes from "prop-types";

import GeoShapeRender from '../GeoShapeRender';
import DetailBoxPast from '../DetailBoxPast';
import DetailBoxPresent from '../DetailBoxPresent';

//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class GeoDetailBox extends Component {
  constructor() {
    super();
    this.state = {
      boxSide:"past"
    };
    this._flipBox =this._flipBox.bind(this);
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  _flipBox(){
    if(this.props.time=="past"){
      this.props.setTime("present");
    }else{
      this.props.setTime("past");
    }
  }

  //This is where you render your component
  render() {
  	//This is the "spread" syntax for object in ES6
    let {selectedGeo, selectedIcon, colors} = this.props;

    let displaySide = this.props.time=="past" ?
                            (<DetailBoxPast
                              colors={colors}
                              selected={selectedGeo}
                              hasPresent={Object.keys(selectedIcon).length > 0}
                              setRelated={this.props.setRelated}
                              flip={this._flipBox}
                              />) :
                            (<DetailBoxPresent
                              colors={colors}
                              selected={selectedIcon}
                              flip={this._flipBox}
                              />)
            
    let showBack = this.props.time == "past" ? "showBack": ""
    return <Style {...this.props}>
      <div className={"geo-detail-box flip-container "+ showBack}>
        <div className="flipper">
            {displaySide}
        </div>
        
      </div>
    </Style>;
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

GeoDetailBox.defaultProps = {
};


GeoDetailBox.propTypes = {
};