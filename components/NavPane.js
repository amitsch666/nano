import React from 'react';
import {
  Button,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Form,
  Input,
  InputGroup
} from 'reactstrap';
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
          <NavItem className={`px-1`}>
            <Form className="form-inline my-2 my-lg-0">
              <InputGroup>
                <Input onMouseOver={this.focus} type="text" name="search" id="search" placeholder="Search..." />
                <i className="fa fa-search fa-lg"></i>
              </InputGroup>
            </Form>
          </NavItem>
          <NavItem className="py-1">
            <NavLink href="/browse"><i className="fa fa-folder-open"></i>Browse</NavLink>
          </NavItem>
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
          <NavDropdown className="py-1" isOpen={this.state.dropdown2Open} toggle={this.toggledropdown2}>
            <DropdownToggle nav caret>
              <i className="fa fa-folder-open"></i>Dropdown 2
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <hr className="my-0" />
              <DropdownItem disabled>Action</DropdownItem>
              <hr className="my-0" />
              <DropdownItem>Another Action</DropdownItem>
              <hr className="my-0" />
              <DropdownItem>Third Action</DropdownItem>
              <hr className="my-0" />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem className="py-1">
            <NavLink href="/login"><i className="fa fa-user"></i>Sign In</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    )
  }
}
export default onClickOutside(NavPane)
