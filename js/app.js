
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var ReportsApp = require('./components/ReportsApp.react');
var ReportCreation = require('./components/ReportCreation.react');
var NotFound = require('./components/NotFound.react');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={ReportsApp}>
			<Route path="edit/:idx" component={ReportCreation}></Route>
		</Route>
		<Route path="*" component={NotFound} />
	</Router>,
  	document.getElementById('app-container')
);
