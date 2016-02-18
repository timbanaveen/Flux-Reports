

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ReportConstants = require('../constants/ReportConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var reports = [
  {
    id: (new Date()).getTime(),
    name: 'Sample Report',
    createdBy: 'default',
    desc: 'Report is sample report, created just for first view.',
    type: 'Flat List',
    typeMark: 'F',
    executions: 20,
    lastExecution: '18-jan-2016'
  },
  {
    id: (new Date()).getTime(),
    name: 'Sample Report1',
    createdBy: 'default',
    desc: 'Report is sample report, created just for first view.',
    type: 'Group Report',
    typeMark: 'G',
    executions: 15,
    lastExecution: '18-jan-2016'
  }
];

/**
 *private methods
 */
function addReport(data) {
  reports.push(data);
}

function updateReport(data, idx) {
  reports[idx] = data;
}

function removeReport(idx) {
  reports.splice(idx, 1);
}

var ReportStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return reports;
  },

  getReportData: function(idx) {
    return reports[idx];
  },

  /**
   * every view should listen to change in store or this event.
   */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch (action.actionType) {

    case ReportConstants.REPORT_ADDED:

        addReport(action.data);
        ReportStore.emitChange();

        break;

    case ReportConstants.REPORT_EDITED:

        updateReport(action.data.data, action.data.idx);
        ReportStore.emitChange();

        break;

    case ReportConstants.REPORT_DELETE:

        break;

    case ReportConstants.REPORT_DELETED:

        removeReport(action.data);
        ReportStore.emitChange();

        break;

    default:

  }
});

module.exports = ReportStore;
