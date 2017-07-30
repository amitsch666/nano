import React from 'react';
import { Button, Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import onClickOutside from 'react-onclickoutside'

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
          <NavItem>
            <NavLink href="/browse">Browse</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/community">Community</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Sign In</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    )
  }
}
export default onClickOutside(NavPane)
