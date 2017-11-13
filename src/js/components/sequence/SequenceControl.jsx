import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import Requests from 'helpers/Requests'
import SequencePreview from 'sequence/SequencePreview'
import SequenceActionsButtonGroup from 'sequence/SequenceActionsButtonGroup'

import SequenceFormStore from 'stores/SequenceFormStore'
import SettingsConfig from 'components/SettingsConfig'
import { initSequence, setSequence }  from 'actions/SequenceFormActions'

const totalDuration = (sequence) =>  sequence.colorSequence.reduce((sum, next) => sum + next.duration, 0)

const DragHandle = SortableHandle( ({className}) => <span className={className + ' fa fa-bars'}></span>)

const SequenceItem = SortableElement( ({sequence, itemIndex, enableButtons, enableSort, startSequence, onDelete, onEdit}) => 
  <div className="sequence row">
      <div className="three columns">
        <h4> <DragHandle className={classNames({'drag-handle': true, 'hide': !enableSort})} /> {sequence.name} </h4>
      </div>
      <div className="six columns">
        Duration: {totalDuration(sequence)}s
        <SequencePreview colorSequence={sequence.colorSequence} />
       </div>
      <div className="three columns">
        <SequenceActionsButtonGroup enableButtons={enableButtons} startSequence={() => startSequence(sequence._id)} 
          onDelete={() => onDelete(sequence._id, itemIndex)} 
          onEdit={() => onEdit(sequence)}/>
      </div>
  </div>
)

const SequenceList = SortableContainer( ({sequences, enableButtons, enableSort, startSequence, onDelete, onEdit}) => 
  <div className="sequence-list">
    { sequences.map( (sequence, index) => 
      <SequenceItem key={`item-${index}`} index={index} sequence={sequence} itemIndex={index} enableButtons={enableButtons} enableSort={enableSort} 
        startSequence={startSequence} 
        onDelete={onDelete} 
        onEdit={onEdit} />
    )}
  </div>
)

class SequenceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sequences: props.sequences, enableButtons: true, enableSort: false};
    this.startSequence = this.startSequence.bind(this)
    this.onCreateClick = this.onCreateClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.onEnableSort = this.onEnableSort.bind(this)
  }

  startSequence(id) {
    Requests.put('/sequence/' + id).then(() => {
      this.setState({enableButtons: false})
      var sequence = this.state.sequences.find(item => item._id === id)
      var total = totalDuration(sequence)
      setTimeout(() => {
        this.setState({enableButtons: true})
      }, total * 1000)
    })
  }
  onCreateClick() {
    SequenceFormStore.dispatch(initSequence())
    this.props.history.push('/create')
  }
  onEditClick(sequence) {
    SequenceFormStore.dispatch(setSequence(sequence))
    this.props.history.push('/create')
  }
  onDelete(sequenceId, arrayIndex) {
    Requests.delete('/sequence/' + sequenceId).then(() => {
      var splicedList = this.state.sequences
      splicedList.splice(arrayIndex, 1)
      this.setState({sequences: splicedList})
    })
  }
  onConcludeShow() {
    Requests.put('/conclude')
  }
  onEnableSort() {
    this.setState({enableSort: !this.state.enableSort})
  }
  onSortEnd( {oldIndex, newIndex} ) {
    let reordered = arrayMove(this.state.sequences, oldIndex, newIndex)
      .map( (sequence, index) => Object.assign(sequence, { order_index: index}) )
    var newOrderArray = reordered.map( sequence => ({id: sequence._id, order_index: sequence.order_index}) )
    Requests.put('/sequence/reorder', { sequenceOrder: newOrderArray }).then(() => {
      this.setState({ sequences: reordered })
    })
  }
  
  render() {
    return (
      <div className="SequenceControl">
        <div className="row">
          <h3 className="six columns"> Sequences </h3>
          <div className="six columns">
            <button className="button-primary float-right" onClick={this.onCreateClick}>Create Sequence</button> 
            <button className="float-right" onClick={this.onEnableSort}> Sortable&nbsp;
              <span className={classNames({'fa fa-lg': true, 'fa-circle': this.state.enableSort, 'fa-circle-thin': !this.state.enableSort})}></span> 
            </button>
          </div>
        </div>
        <SequenceList sequences={this.state.sequences} enableButtons={this.state.enableButtons} enableSort={this.state.enableSort} useDragHandle={true} 
          onSortEnd={this.onSortEnd}
          startSequence={this.startSequence} 
          onDelete={this.onDelete} 
          onEdit={this.onEditClick}/>
        <div className="sequence row">
            <div className="three columns">
              <h4> Conclude Show </h4>
            </div>
            <div className="six columns">
              Users will be re-routed to the exit landing page (configured below)
             </div>
            <div className="three columns">
              <Button color="danger" className="float-right" onClick={this.onConcludeShow}>Conclude The Show</Button>
            </div>
        </div>

        <hr />
        <SettingsConfig />
      </div>
    )
  }
}

export default withRouter(SequenceControl)
