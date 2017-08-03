import { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import Link from 'next/link';

import NavPane from './NavPane';

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      fatnav: (this.props.fat ? 'fatnav' : 'slimnav'),
    };
  }
  componentDidMount() {
    if ((window.pageYOffset > 0) && (this.state.fatnav === 'fatnav')) {
      this.changeNav();
    }
    if (this.props.fat) {
      this.handleScroll.bind(this);
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }
  changeNav() {
    this.setState({ fatnav: 'slimnav' });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({ fatnav: 'slimnav' });
    } else {
      this.setState({ fatnav: 'fatnav' });
    }
  }
  render() {
    return (
      <Navbar color="inverse" inverse toggleable={'md'} fixed={'top'} className={this.state.fatnav}>
        <NavbarToggler right onClick={this.toggle} />
        <Link prefetch href="/" passHref>
          <NavbarBrand>
            <img src={`/static/img/${process.env.NAVBAR_LOGO}.svg`} alt="TaleSpinners logo" />
            <span id="tale">Tale</span><span id="spinners">Spinners</span>
          </NavbarBrand>
        </Link>
        <NavPane isOpen={this.state.isOpen} toggle={this.toggle} />
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  fat: PropTypes.bool,
};
TopNav.defaultProps = {
  fat: false,
};
