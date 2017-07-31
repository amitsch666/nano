import React from 'react';
import { NavDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

class Dropdown1 extends React.Component {
  constructor(props) {
    super(props);
    this.toggledropdown = this.toggledropdown.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggledropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render(){
    return(
      <NavDropdown className="py-1" isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
        <DropdownToggle nav caret>
          <i className="fa fa-folder-open"></i>Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <hr className="my-0" />
          <DropdownItem disabled>Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem>Another Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    )
  }
}
export default Dropdown1
