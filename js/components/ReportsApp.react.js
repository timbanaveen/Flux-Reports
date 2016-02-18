

var React = require('react');
var ReportStore = require('../stores/ReportStore');
var ReportCreateStore = require('../stores/ReportCreateStore');
var ReportDetails = require('./ReportDetails.react');
var ReportCreation = require('./ReportCreation.react');
var ReportActions = require('../actions/ReportActions');

function getReportState() {
  return {
    allReports: ReportStore.getAll(),
    toCreate: ReportCreateStore.toCreate()
  };
}

var ReportApp = React.createClass({

  getInitialState: function() {
    return getReportState();
  },

  componentDidMount: function() {
    ReportStore.addChangeListener(this._onChange);
    ReportCreateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ReportStore.removeChangeListener(this._onChange);
    ReportCreateStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getReportState());
  },

  createView: function() {
    ReportActions.reportCreate({
      toCreate: true
    });
  },

  render: function() {
    var reports = [],
        createCmp,
        reportsLength = this.state.allReports.length;

    for (var i = 0; i < reportsLength; i++) {
      reports.push(<ReportDetails key={i} reportIndex={i} reportDetail={this.state.allReports[i]} />);
    }

    if(this.state.toCreate)
      createCmp = <ReportCreation
                    toCreate="true"
                    reportData={this.state.reportData}
                  />

    return (
      <div>
        <div className="all-reports">
          {reports}
          <div className="report-details empty" title="Add Report" onClick={this.createView}>
            <div className="icon-container">
              <span className="add-icon"></span>
            </div>
          </div>
        </div>
        {this.props.children} || {createCmp}
      </div>
    );
  }

});

module.exports = ReportApp;
