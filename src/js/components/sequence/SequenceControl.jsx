import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import Requests from 'helpers/Requests'
import SequencePreview from 'sequence/SequencePreview'
import SequenceActionsButtonGroup from 'sequence/SequenceActionsButtonGroup'

const totalDuration = (sequence) =>  sequence.colorSequence.reduce((sum, next) => sum + next.duration, 0)

const DragHandle = SortableHandle( ({className}) => <span className={className + ' fa fa-bars'}></span>)

const SequenceItem = SortableElement( ({sequence, itemIndex, enableButtons, enableSort, startSequence, onDelete}) => 
  <div className="sequence row">
      <div className="three columns">
        <h4> <DragHandle className={classNames({'drag-handle': true, 'hide': !enableSort})} /> {sequence.name} </h4>
      </div>
      <div className="six columns">
        Duration: {totalDuration(sequence)}s
        <SequencePreview colorSequence={sequence.colorSequence} />
       </div>
      <div className="three columns">
        <SequenceActionsButtonGroup enableButtons={enableButtons} startSequence={() => startSequence(sequence._id)} onDelete={() => onDelete(sequence._id, itemIndex)} />
      </div>
  </div>
)

const SequenceList = SortableContainer( ({sequences, enableButtons, enableSort, startSequence, onDelete}) => 
  <div className="sequence-list">
    { sequences.map( (sequence, index) => 
      <SequenceItem key={`item-${index}`} index={index} sequence={sequence} itemIndex={index} enableButtons={enableButtons} enableSort={enableSort} 
        startSequence={startSequence} 
        onDelete={onDelete} />
    )}
  </div>
)

class SequenceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sequences: props.sequences, enableButtons: true, enableSort: false};
    this.startSequence = this.startSequence.bind(this)
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
    this.setState({
      sequences: arrayMove(this.state.sequences, oldIndex, newIndex)
    })
    var newOrderArray = this.state.sequences.map( (sequence, index) => ({id: sequence._id, order_index: index}) )
    Requests.put('/sequence/reorder', { sequenceOrder: newOrderArray }).then(() => console.log('done'))
  }

  render() {
    return (
      <div className="SequenceControl">
        <div className="row">
          <h3 className="six columns"> Sequences </h3>
          <div className="six columns">
            <Link to="/create" className="button button-primary float-right">Create Sequence</Link> 
            <button className="float-right" onClick={this.onEnableSort}> Sortable&nbsp;
              <span className={classNames({'fa fa-lg': true, 'fa-circle': this.state.enableSort, 'fa-circle-thin': !this.state.enableSort})}></span> 
            </button>
          </div>
        </div>
        <SequenceList sequences={this.state.sequences} enableButtons={this.state.enableButtons} enableSort={this.state.enableSort} useDragHandle={true} 
          onSortEnd={this.onSortEnd}
          startSequence={this.startSequence} 
          onDelete={this.onDelete} />
        <div className="sequence row">
            <div className="three columns">
              <h4> Conclude Show </h4>
            </div>
            <div className="six columns">
              Users will be re-routed to the Liberty Light Show survey 
             </div>
            <div className="three columns">
              <Button color="danger" className="float-right" onClick={this.onConcludeShow}>Conclude The Show</Button>
            </div>
        </div>
      </div>
    )
  }
}

export default SequenceControl
