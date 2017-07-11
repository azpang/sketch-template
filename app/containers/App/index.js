/* global window,document */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';

import MapGL from 'react-map-gl';

import DeckGLOverlay from '../../components/DeckGLOverlay';
import Basic from '../../components/Basic';

import Style from './style';

import {json as requestJson, 
        csv as requestCSV} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN||"pk.eyJ1IjoiYWFyb24tcGFuZyIsImEiOiJjajI3dHo4eDgwMGc3MzJtbTA0anhlcnB4In0.BNH54WoTEPggVnV9Ok13rA"; // eslint-disable-line

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //Sets the viewport
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      data: null,
      selectedCounty: "Oakland"
    };

    // Loads the data
    // requestJson('./data/counties.json', (error, response) => {
    //   if (!error) {
    //     this.setState({
    //       data: response.features,
    //       selectedCounty: response.features.find(f => f.properties.name === 'Alameda, CA') //The County that we would care about
    //     });
    //   }
    // });

  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
    setTimeout(()=>this.setState({
      selectedCounty:"Dublin"
    }),5000);
  }

  _resize() {
    //This is called when the window width is resized. Sets the viewport to the size of the window. Must rerender each time window is resized.
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onChangeViewport(viewport) {
    //Sets the new viewport dimensions
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }


  render() {
    const {viewport, data, selectedCounty} = this.state;

    const BasicComponent = (
        <Basic 
          property = {this.state.selectedCounty}/>
      )

    const MapComponent = (<MapGL
        {...viewport}
        perspectiveEnabled={true}
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewport}
          data={this.props.data}
          selectedFeature={selectedCounty}
          strokeWidth={2}
          />
      </MapGL>)
    /*
      Replace the inner div inside of <Style> component 
    */
    return (
      <Style {...this.props}>
        {MapComponent}
      </Style>
    );
  }
}

//Renders the app, might need to rebuild this with React router
//this is how the state from the redux is connected and exposed to React components
function mapStateToProps(state){
  return {
    data:state.data
  }
}



export default connect(mapStateToProps)(App)