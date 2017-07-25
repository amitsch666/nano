import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavSmall extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar color="inverse" inverse toggleable={`md`} fixed={`top`}>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">TaleSpinners</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
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
        </Navbar>
    );
  }
}
