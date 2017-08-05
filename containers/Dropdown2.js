import { Component } from 'react';
import { NavDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

class Dropdown2 extends Component {
  constructor(props) {
    super(props);
    this.toggledropdown = this.toggledropdown.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggledropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    return (
      <NavDropdown className="py-1" isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
        <DropdownToggle nav caret>
          <i className="fa fa-folder-open" />Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="font-weight-bold text-uppercase" header>Header</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase" disabled>Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Another Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Third Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Another Action</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}
export default Dropdown2;
