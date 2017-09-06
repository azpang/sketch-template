import React, { Component } from "react";
import PropTypes from "prop-types";


//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class TextLinker extends Component {
  constructor() {
    super();
    this.state = {
      selectedWord:""
    };
    this._setRelated=this._setRelated.bind(this);
    this._onWordClick = this._onWordClick.bind(this);
  }

  _setRelated(related){
    this.props.setRelated(related);
  }

  _onWordClick(e){
    let value = e.target.getAttribute("value")
    console.log(e.target.innerHTML)
    this.setState({
      selectedWord:value
    })
    if(this.props.connections[value]){
      this._setRelated(this.props.connections[value]); 
    }
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  //This is where you render your component
  render() {
  	//This is the "spread" syntax for object in ES6
    let that = this;
    let text = this.props.text.split(" ").map((word, i)=>{
      let kw = "";
      let id = "";
      if(this.props.connections[word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")]){
        kw+=" keyword"
      }
      if(this.state.selectedWord==word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")){
        id = "underlined"
      }
      return (<span><span id={id} className={kw} value={word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")} key={i} onClick={that._onWordClick}>{word}</span><span> </span></span>)
    })
    return <Style {...this.props} className="text-linker">
      {text}
    </Style>;
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

TextLinker.defaultProps = {
};


TextLinker.propTypes = {
};