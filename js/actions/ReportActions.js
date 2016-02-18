

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ReportConstants = require('../constants/ReportConstants');

var ReportActions = {

  reportCreate: function(data) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_CREATE,
      data: data
    });
  },

  reportAdded: function(reportData) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_ADDED,
      data: reportData
    });
  },

  reportEdit: function(reportIndex) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_EDIT,
      data: reportIndex
    });
  },

  reportEdited: function(reports) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_EDITED,
      data: reports
    });
  },

  reportDelete: function(report) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_DELETE,
      data: report
    });
  },

  reportDeleted: function(idx) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.REPORT_DELETED,
      data: idx
    });
  },

  closeCreation: function(data) {
    AppDispatcher.dispatch({
      actionType: ReportConstants.CLOSE_CREATION,
      data: data
    });
  }
};

module.exports = ReportActions;
