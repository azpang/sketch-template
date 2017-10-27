import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';

//Use this for styling read through "styled-components" package
//https://github.com/styled-components/styled-components
import Style from "./style.js";


//Insert the name of your component here
export default class IntroModal extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //Read through the lifecycle methods here
  //https://facebook.github.io/react/docs/react-component.html

  //This is where you render your component
  render() {
  	//This is the "spread" syntax for object in ES6
    const isOpen = this.props.isOpen ? "show" : "hidden";
    return <Style {...this.props}>
      <div className={"overlay"} id={isOpen}>
        <div className="content">
          <div className="button-container">
            <button onClick={this.props.closeModal} className="close">
              X
            </button>
          </div>
          
          <h3>Redlining in Oakland:<br></br> Present Stories and Past Institutions</h3>
          <div className="info-container">
            <div className="intro-paragraph">
              <div className="title">Project Description</div>
              <p>All cities have a story, a reflection of the history and experiences of all the people who have made a home there. This project uncovers that layered history by juxtaposing the personal experiences of designers at Fjord SF with the history of redlining. Redlining was a tool used by the Federal Government throughout the 1930s to control and influence the fate and development of urban areas based on the ethnic and racial make-up of those neighborhoods. Our project interweaves our personal experiences of the cities with the district-descriptions used by the Federal Government to deny services (financial, healthcare, commercial, etc.) to inhabitants of areas deemed “at risk”. Though invisible to the every-day eye, the policies and politics of the past have played a key role in constructing the cities we call home today. We welcome you to explore these stories and hope that this visualization will inspire you to take the time to learn about your city.</p>
            </div>
            <div className="interaction-descriptions">
              <div className="title">Method and Language Analysis</div>
              <p>The data powering this experience focuses around language. We wanted to understand the power and frequency of discriminatory language and the commonalities that arise when creating institutional policies. By using the LDA topic-modeling method, we were able to extract topics from the descriptions of each redlined region. We highlighted the identified topics in yellow, and by clicking on these key phrases you are able to view districts that uses similar language.</p>
            </div>
          </div>
        </div>
      </div>
    </Style>;
  }
}

//If you need default props or propTypes fill them in here
//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

IntroModal.defaultProps = {
};

IntroModal.propTypes = {
};