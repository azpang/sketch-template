import React, {Component} from 'react';
import {scaleQuantile} from 'd3-scale';

import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
import Style from "./style.js";

export const inFlowColors = [
  [0, 0, 255],
];

export const outFlowColors = [
  [255, 255, 0],
];

export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    //Sets the starting view port
    //TODO: Make this dynamic, and by location name
    return {
      longitude: -100,
      latitude: 40.7,
      zoom: 3,
      maxZoom: 15,
      pitch: 30,
      bearing: 30
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      arcs: this._getArcs(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    //If data exists and the selected Feature Exists
    //Set state
    //Add arcs to the state
    if (nextProps.data !== this.props.data ||
        nextProps.selectedFeature !== this.props.selectedFeature) {
      this.setState({
        arcs: this._getArcs(nextProps)
      });
    }
  }

  _getLatLng(loc){
  	return [loc.long, loc.lat]
  }

  //Creates the arcs for the arcs layer
  _getArcs({data, selectedFeature}) {
  	let that = this;
    if (!data || !selectedFeature) {
      return null;
    }
    const {cities, commute, counties} = data;
    //get source and target of the 
    // const selectedCity = cities[selectedFeature];
    // const sourceLatLng = this._getLatLng(selectedCity);


    const arcs = commute.map(route => {


    	if(route.placename_resid!="Remainder of County"){
    		console.log(route.county_resid)

    		console.log(counties[route.county_resid+", CA"])
    	}

		const sourceLatLng = route.placename_resid!="Remainder of County" ? 
								that._getLatLng(cities[route.placename_resid]) : counties[route.county_resid+", CA"];
		const targetLatLng = route.placename_work!="Remainder of County" ? 
								that._getLatLng(cities[route.placename_work]) : counties[route.county_work+", CA"];
		// console.log(sourceLatLng, targetLatLng);
		return {
			source: sourceLatLng,
			target: targetLatLng,
			value: route.total00
	      };
    });

    const scale = scaleQuantile()
      .domain(arcs.map(a => Math.abs(a.value)))
      .range(inFlowColors.map((c, i) => i));

    arcs.forEach(a => {
      a.gain = Math.sign(a.value);
      a.quantile = scale(Math.abs(a.value));
    });

    return arcs;
  }

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  render() {
    const {viewport, strokeWidth, data} = this.props;
    const {arcs} = this.state;

    if (!arcs) {
      return null;
    }

    const layers = [
      new ArcLayer({
        id: 'arc',
        data: arcs,
        getSourcePosition: d => d.source,
        getTargetPosition: d => d.target,
        getSourceColor: d => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
        getTargetColor: d => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
        strokeWidth
      })
    ];

    return (
      <Style {...this.props}>
        <DeckGL {...viewport} layers={ layers } onWebGLInitialized={this._initialize} />
      </Style>
    );
  }
}
