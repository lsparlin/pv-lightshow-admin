import React from 'react';
import { ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SequenceActionsButtonGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: false}
    this.toggle = this.toggle.bind(this)
  }
  componentWillUnMount() {
    this.setState({isOpen: false})
  }
  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <ButtonGroup className="float-right">
        <Button className="float-right" color="light" disabled={!this.props.enableButtons} onClick={this.props.startSequence}>Run Sequence</Button>

        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret color="light" />
          <DropdownMenu right>
            <DropdownItem onClick={this.props.onDelete}><span className="fa fa-trash"></span> Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    )
  }

}

export default SequenceActionsButtonGroup
