import React from 'react';
import { Button, Collapse, Navbar, Nav, NavItem, NavLink, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import onClickOutside from 'react-onclickoutside'

class NavPane extends React.Component {
  constructor(props) {
    super(props);
    let lastX = 0;
    this.toggledropdown = this.toggledropdown.bind(this);
    this.toggledropdown2 = this.toggledropdown2.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdown2Open: false
    };
  }
  handleClickOutside = evt => {
    if(this.props.isOpen){
      this.props.toggle()
    }
  }
  _onTouchStart = e => {
    this.lastX = e.touches[0].clientX
  }
  _onTouchMove = e => {
    let currentX = e.touches[0].clientX;
    if(currentX > this.lastX + 10){
      this.props.toggle()
    }
    this.lastX = currentX;
  }
  toggledropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggledropdown2() {
    this.setState({
      dropdown2Open: !this.state.dropdown2Open
    });
  }
  render(){
    return(
      <Collapse isOpen={this.props.isOpen} navbar delay={{show: 0, hide: 350}} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove}>
        <div id="collapse-nav-head">
          <div id="collapse-nav-title" className="p-2">TaleSpinners</div>
          <Button outline color="secondary" onClick={this.props.toggle} className="m-auto"><span aria-hidden="true">&times;</span></Button>
        </div>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/browse">Browse</NavLink>
          </NavItem>
          <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavDropdown isOpen={this.state.dropdown2Open} toggle={this.toggledropdown2}>
            <DropdownToggle nav caret>
              Dropdown 2
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Third Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem>
            <NavLink href="/login">Sign In</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    )
  }
}
export default onClickOutside(NavPane)
