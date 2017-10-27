import React, { Component } from "react";
import PropTypes from "prop-types";


//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";

import TextLinker from "../TextLinker";


//Insert the name of your component here
export default class DetailBoxPast extends Component {
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
    return <Style {...this.props} className="past">
        <div className="area-image">
          <div className="filter"></div>
          <img src={this.props.selected.image || "images/past/default.jpg"}/>
        </div>
        <div className="rando-bar"></div>
        <div className="text-area">
          <div className="title">
            1937: Area {selected.id}
          </div>
          <div className="influences">
            <div className="fav-title">FAVORABLE</div>
            <TextLinker
              color={this.props.colors.yellow}
              text={selected.ad3}
              connections={selected.in_common.fav_connections}
              setRelated={this.props.setRelated}/>
          </div>
          <div className="influences">
            <div className="detr-title">DETRIMENTAL</div>
            <TextLinker
              color={this.props.colors.yellow}
              text={selected.ad4}
              connections={selected.in_common.detr_connections}
              setRelated={this.props.setRelated}/>
          </div>
        </div>
        {this.props.hasPresent > 0 ? 
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

DetailBoxPast.defaultProps = {
};


DetailBoxPast.propTypes = {
};