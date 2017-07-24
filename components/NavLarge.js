import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
          <NavbarBrand href="/">TaleSpinners</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
