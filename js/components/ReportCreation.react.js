
var React = require('react');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');

var ReportActions = require('../actions/ReportActions');
var ReportCreateStore = require('../stores/ReportCreateStore');
var ReportStore = require('../stores/ReportStore');

var Link = require('react-router').Link;

var getState = function() {
  return {
    reportData: ReportCreateStore.getDataModel(),
    showModal: ReportCreateStore.toCreate(),
    editMode: ReportCreateStore.editMode()
  };
}

var ReportCreation = React.createClass({

  getInitialState: function() {
    return getState.bind(this)();
  },

  close: function() {
    ReportActions.closeCreation({
      toCreate: false
    });
  },

  save: function() {
    var prDate = new Date(),
        data;

    if(this.state.editMode)
    {
        data = {};

        data.data = this.state.reportData;
        data.idx = ReportCreateStore.reportIdx();

        ReportActions.reportEdited(data);
    }
    else
    {
        this.state.reportData['lastExecution'] = prDate.getDate() + "-" + prDate.getMonth() + "-" + prDate.getYear();
        ReportActions.reportAdded(this.state.reportData);     
    }

    this.close();
  },

  onChange: function(name, e) {
    
    this.state.reportData[name] = e.target.value;

    this.setState({
        reportData: this.state.reportData
    });

  },

  render: function() {
    if( this.props.params
        && this.props.params.idx >= 0 )
    {    
        this.state.reportData = ReportStore.getReportData(this.props.params.idx);

        if (this.state.reportData) {
            this.state.showModal = true;
            this.state.editMode = true;     
        }
        else
            this.state.reportData = ReportCreateStore.getDataModel();
    }

    return (
      <div className="modal-container report-creation">

        <Modal show={this.state.showModal} onHide={this.close} dialogClassName="report-create-modal">
         <Modal.Header>
           <Modal.Title>Create Report</Modal.Title>
         </Modal.Header>
         <Modal.Body className="report-create-body">
           <form className="form-horizontal">
             <Input type="text" 
                    label="Name" 
                    key="name" 
                    labelClassName="col-xs-2" 
                    wrapperClassName="col-xs-10" 
                    onChange={this.onChange.bind(this, 'name')}
                    value={this.state.reportData.name} 
              />
             <Input type="text" 
                    label="Created By" 
                    key="createdBy" 
                    labelClassName="col-xs-2" 
                    wrapperClassName="col-xs-10" 
                    onChange={this.onChange.bind(this, 'createdBy')}
                    value={this.state.reportData.createdBy}
            />
             <Input type="select" 
                    label="Type" 
                    key="typeMark" 
                    placeholder="Report Type" 
                    labelClassName="col-xs-2" 
                    wrapperClassName="col-xs-10" 
                    onChange={this.onChange.bind(this, 'typeMark')}
                    value={this.state.reportData.typeMark}
                    >
               <option value="F">Flat List</option>
               <option value="G">Group Report</option>
               <option value="H">Hierarchy Report</option>
               <option value="C">Cross Tab</option>
               <option value="D">Data Extract</option>
             </Input>
             <Input type="textarea" 
                    label="Description" 
                    key="desc" 
                    labelClassName="col-xs-2" 
                    wrapperClassName="col-xs-10" 
                    onChange={this.onChange.bind(this, 'desc')}
                    value={this.state.reportData.desc}
            />
           </form>
         </Modal.Body>
         <Modal.Footer>
            <Link to="/">
                <Button onClick={this.save} bsStyle="primary" className="save-btn">Save</Button>
            </Link>
            <Link to="/">
                <Button onClick={this.close}>Close</Button>
            </Link>
         </Modal.Footer>
        </Modal>

      </div>
    );
  }

});

module.exports = ReportCreation;
