var React = require('react');
var ReportActions = require('../actions/ReportActions');

var Link = require('react-router').Link;

var ReportDetail = React.createClass({

  onClose: function() {
    ReportActions.reportDeleted(this.props.reportIndex);
  },

  onEdit: function() {
    //removing it no longer required.
    //ReportActions.reportEdit(this.props.reportIndex);
  },

  render: function() {
    var details = this.props.reportDetail;

    return (

      <div className="report-details">
        <div className="report-header">
          <span className="report-header-item delete" title="delete" onClick={this.onClose}></span>
          <Link to={`edit/${this.props.reportIndex}`}>
            <span className="report-header-item edit" title="edit" onClick={this.onEdit}></span>
          </Link>
        </div>
        <div className="report-body">
          <div className="report-body-item-type">
            <span className="report-body-item type">{details.typeMark}</span>
            <span className="report-body-item name">{details.name}</span>
          </div>
          <div className="report-body-item desc">{details.desc}</div>
        </div>
        <div className="report-footer">
          <span className="report-footer-item created">{details.createdBy}</span>
          <span className="report-footer-item last">{details.lastExecution}</span>
        </div>
      </div>

    );
  }

});

module.exports = ReportDetail;
