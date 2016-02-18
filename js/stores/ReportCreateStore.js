

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ReportConstants = require('../constants/ReportConstants');
var assign = require('object-assign');
var ReportStore = require('./ReportStore');

var CHANGE_EVENT = 'change';

var ReportModel = function(data) {
  this.id = data && new Date().getTime();
  this.name = data && data.name;
  this.createdBy = data && data.createdBy;
  this.desc = data && data.desc;
  this.type = data && data.type;
  this.typeMark = data && data.typeMark || 'F';
  this.executions = data && data.executions;
  this.lastExecution = data && new Date().toDateString()
}

var reportData = {};
var toCreate = false;
var editMode = false;
var reportIdx = -1;

var ReportCreateStore = assign({}, EventEmitter.prototype, {

  getDataModel: function() {
    return new ReportModel();
  },

  toCreate: function() {
    return toCreate;
  },

  editMode: function() {
    return editMode;
  },

  reportIdx: function() {
    return reportIdx;
  },

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
    case ReportConstants.REPORT_CREATE:

      toCreate = true;
      editMode = false;
      reportData = new ReportModel();
      ReportCreateStore.emitChange();

      break;

    case ReportConstants.REPORT_EDIT:

      toCreate = true;
      editMode = true;
      reportIdx = action.data;
      reportData = new ReportModel(ReportStore.getReportData(action.data));
      ReportCreateStore.emitChange();

      break;

    case ReportConstants.CLOSE_CREATION:

      toCreate = false;
      ReportCreateStore.emitChange();

    default:

  }

});

module.exports = ReportCreateStore;
