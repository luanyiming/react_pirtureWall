/*var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/lymReact.js');
ReactDOM.render(<App />, document.getElementById('content'));*/


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/lymReact.js';
class Hello extends React.Component {
	render() {
		return <h1>Hqqqq</h1>
	}
}
ReactDOM.render(<App />, document.getElementById('content'));