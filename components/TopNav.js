import React from 'react';
import { Button, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

import NavPane from './NavPane'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
			fatnav: (this.props.fat ? `fatnav` : `slimnav`)
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
	componentDidMount() {
		this.handleScroll.bind(this);
		if(this.props.fat){
			window.addEventListener('scroll', this.handleScroll.bind(this));
		}
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
					<img src="/static/img/logo.svg" class="d-inline-block align-top" alt="TaleSpinners logo" />
					<span id="tale">Tale</span><span id="spinners">Spinners</span>
        </NavbarBrand>
        <NavPane isOpen={this.state.isOpen} evtToggler={this.toggle} />
      </Navbar>
    );
  }
}
