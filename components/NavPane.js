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

import Dropdown1 from './Dropdown1'
import Dropdown2 from './Dropdown2'

class NavPane extends React.Component {
  constructor(props) {
    super(props);
    let lastX = 0;
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
          <Dropdown1 />
          <Dropdown2 />
          <NavItem className="py-1">
            <NavLink href="/login"><i className="fa fa-user"></i>Sign In</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    )
  }
}
export default onClickOutside(NavPane)
