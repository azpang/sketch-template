import React, {Component} from 'react';
import {scaleQuantile} from 'd3-scale';

import DeckGL, {GeoJsonLayer, IconLayer} from 'deck.gl';
import Style from "./style.js";
const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
};  
import iconMapping from '../../../data/iconLayer/pin-mapping.json';

import BoundaryAnimationLayer from '../BoundaryAnimationLayer';

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};



const colorDict={
  A:[218,221,223],
  B:[197,202,206],
  C:[173,181,186],
  D:[151, 161,168]
}


export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    //Sets the starting view port
    //TODO: Make this dynamic, and by location name
    return {
      longitude: -122.2311,
      latitude: 37.8164,
      zoom: 11,
      maxZoom: 15,
      minZoom: 9,
      pitch: 0,
      bearing: 0
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedGeo:{}
    }
    this._onGeoClick = this._onGeoClick.bind(this)
    this._getFillColor = this._getFillColor.bind(this)
    this._onIconClick = this._onIconClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
  }



 

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  _onGeoClick(f){
    // console.log(f)
    this.props.selectGeo(f.object.properties)
  }
  _onIconClick(f){
    this.props.selectIcon(f.object)
  }

  _getLineColor(f){
    return [136,136,136];
  }

  _getFillColor(f){
    
    if(Object.keys(this.props.selectedGeo).length>0){
      if(f.properties.id==this.props.selectedGeo.id && this.props.time=="past"){
        return [14,39,58,255];
      }
      if(this.props.related.includes(f.properties.id)){
        return [218,191,9];
      }else{
        return colorDict[f.properties.grade];
      }
   
    }else{
        return colorDict[f.properties.grade];
    }
  }

  render() {
    let that = this;
    const {viewport, strokeWidth, data, trailLength, currentTime, selectedIcon, time} = this.props;
    // let trips = data.paths;

    const layers = [
      
      // new BoundaryAnimationLayer({
      //   id: 'trips',
      //   data: data.paths,
      //   getPath: d => d.segments,
      //   getColor: d => [253, 0, 0],
      //   opacity: 0.3,
      //   strokeWidth: 100,
      //   trailLength:180,
      //   currentTime
      // }),
      new GeoJsonLayer({
        id: 'geojson',
        data:data.geojson,
        stroked: true,
        filled: true,
        extruded: false,
        wireframe: true,
        pickable:true,
        fp64: true,
        getFillColor: this._getFillColor,
        getLineColor: this._getLineColor,
        getLineWidth:f=>20,
        onHover: (f)=>{},
        onClick: this._onGeoClick,
        updateTriggers:{
          getFillColor:[this.props.selectedGeo, this.props.related, this.props.time]
        },
        lightSettings: LIGHT_SETTINGS,
      }),
      new IconLayer({
        id: 'icon-layer',
        data: data.poi,
        pickable:true,
        iconAtlas: 'images/pin-atlas.png',
        iconMapping,
        onClick:this._onIconClick,
        sizeScale:5,
        getIcon:(f)=>{
          if(Object.keys(selectedIcon).length>0){
              if(f.id==selectedIcon.id){
                return "selected-marker";
              }else{
                return "marker";
              }
          }else{
            return "marker";
          }
          
        },
        updateTriggers:{
          getIcon:[this.props.selectedIcon]
        }
      })
    ];

    return (
      <Style {...this.props}>
        <DeckGL {...viewport} layers={ layers } onWebGLInitialized={this._initialize} />
      </Style>
    );
  }
}
