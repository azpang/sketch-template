/* global window,document */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';

import MapGL from 'react-map-gl';
import Modal from 'react-modal';

import DeckGLOverlay from '../../components/DeckGLOverlay';
import Basic from '../../components/Basic';

import Style from './style';

import {json as requestJson, 
        csv as requestCSV} from 'd3-request';

import GeoDetailBox from '../../components/GeoDetailBox';
import IntroModal from '../../components/IntroModal';

const colors = {
  lightblue:"#87B6C9",
  yellow:"#D8BF09",
  green:"#347A64",
  salmon:"#FA8D62",
  darkblue:"#0E273A",
  lightgray:"#F2F2F2",
  darkgray:"#888888"
}

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN||"pk.eyJ1IjoidGFuaWF2YW0iLCJhIjoiY2loNmdlOGltMGJtNHYxajk2Z2s0ZG9rcyJ9.zIe4djc8Dq3EHmZHliBNCA"; // eslint-disable-line

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
      selectedGeo:{},
      selectedIcon:{},
      related:[],
      time:"past",
      currentTime: 0,
      firstClick:true,
      introModal:{
        isOpen:true
      }
    };
    this._selectGeo =this._selectGeo.bind(this);
    this._selectIcon = this._selectIcon.bind(this);
    this._setRelated = this._setRelated.bind(this);
    this._setTime = this._setTime.bind(this);
    this._setState= this._setState.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this._onMapClick = this._onMapClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
    // this._animate();
  }

  _animate() {
    const timestamp = Date.now();
    const loopLength = 1800;
    const loopTime = 60000;

    this.setState({
      currentTime: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
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

  _firstClick(){
    this.setState({
      firstClick:false
    })
  }

  _selectGeo(selectedGeo){
    let selectedIcon = {};
    let time = "past"
    if(this.state.firstClick){
      this._firstClick();
      this._onChangeViewport({
        longitude:-122.140286
      })
    }
    for(let icon of this.props.data.poi){
      if(icon.area==selectedGeo.id){
        selectedIcon = icon;
      }
    }
    //if you click on the region that is the same as the current icon area
    if(selectedGeo.id==this.state.selectedIcon.area && this.state.time=="present"){
      this.setState({
        time,
        related:[]
      })
    }
    else if(selectedGeo.id==this.state.selectedIcon.area){
      this.setState({
        selectedGeo:{},
        selectedIcon:{},
        related:[],
        time        
      })
    }else{
      this.setState({
        selectedGeo,
        selectedIcon,
        related:[],
        time
      })
    }
  }

  _selectIcon(selectedIcon){
    let selectedGeo = {};
    let time = "present"
    if(this.state.firstClick){
      this._firstClick();
      this._onChangeViewport({
        longitude:-122.140286
      })
    }
    for(let geo of this.props.data.geojson.features){
      if(geo.properties.id==selectedIcon.area){
        selectedGeo = geo.properties;
      }
    }
    if(this.state.selectedGeo.id==selectedIcon.area && this.state.time=="past"){
      this.setState({
        time,
        related:[]
      })
    }else if(this.state.selectedGeo.id==selectedIcon.area){
      this.setState({
        selectedGeo:{},
        selectedIcon:{},
        related:[],
        time
      })
    }else{
      this.setState({
        selectedGeo,
        selectedIcon,
        related:[],
        time
      })
    }
  }

  _setRelated(related){
    this.setState({
      related
    })
  }

  _setTime(time){
    this.setState({
      time
    })
  }

  _setState(d){
    this.setState(d);
  }

  openModal(){
    this.setState({
      introModal:{
        isOpen:true
      }
    });
  }  

  closeModal(){
    this.setState({
      introModal:{
        isOpen:false
      }
    });
  }

  _onMapClick(){
    if(Object.keys(this.state.selectedGeo).length>0 || Object.keys(this.state.selectedIcon).length>0){
      this.setState({
        selectedGeo:{},
        selectedIcon:{}
      })
    }
  }  


  render() {
    const {viewport, data, selectedGeo, selectedIcon, time, related} = this.state;
    const MapComponent = (<MapGL
        {...viewport}
        perspectiveEnabled={true}
        mapStyle="mapbox://styles/taniavam/cj70x3gnx05k62sshl2on3fv1"
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={this._onMapClick}
        maxZoom={12}
        minZoom={8}>
        
        <DeckGLOverlay viewport={viewport}
          data={this.props.data}
          strokeWidth={2}
          selectGeo={this._selectGeo}
          selectIcon={this._selectIcon}
          selectedGeo={selectedGeo}
          selectedIcon={selectedIcon}
          related={related}
          time={time}
          trailLength={180}
          currentTime={this.state.currentTime}
          />
         
      </MapGL>)
    /*
      Replace the inner div inside of <Style> component 
    */
    // console.log(this.state);
    return (
      <Style {...this.props}>
        
        {MapComponent}
        <button 
          className="about"
          onClick={this.openModal}>
          About
        </button>
       
        {Object.keys(this.state.selectedGeo).length > 0 ? 
          <GeoDetailBox
              colors={colors} 
              selectedGeo={selectedGeo}
              setRelated={this._setRelated}
              selectedIcon={selectedIcon}
              setTime={this._setTime}
              time={time}
              /> : <div></div>}

        <IntroModal 
          isOpen={this.state.introModal.isOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          />
      </Style>
    );
  }
}

//Renders the app, might need to rebuild this with React router
//this is how the state from the redux is connected and exposed to React components
function mapStateToProps(state){
  return {
    data:{
        geojson:state.data.oak,
        poi:state.data.poi,
        paths:state.data.paths
      }
  }
}



export default connect(mapStateToProps)(App)