import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavLarge extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
			fatnav: `fatnav`
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
	componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
	}
	handleScroll() {
		if(window.scrollY !== 0){
			this.setState({ fatnav: `slimnav` })
		}
		else {
			this.setState({ fatnav: `fatnav` })
		}
	}
  render() {
    return (
        <Navbar color="inverse" inverse toggleable={`md`} fixed={`top`} className={this.state.fatnav}>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
						<img src="/static/img/talespinners-logo.png" class="d-inline-block align-top" alt="TaleSpinners logo" />
						<span id="tale">Tale</span><span id="spinners">Spinners</span>
          </NavbarBrand>
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
