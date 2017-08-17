import { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import Link from 'next/link';

import NavPane from './NavPane';

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NavType: (this.props.fat ? 'fatnav' : 'slimnav'),
    };
  }
  componentDidMount() {
    if ((window.pageYOffset > 0) && (this.state.NavType === 'fatnav')) {
      this.changeNav();
    }
    if (this.props.fat) {
      this.handleScroll.bind(this);
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }
  changeNav() {
    this.setState({ NavType: 'slimnav' });
  }
  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({ NavType: 'slimnav' });
    } else {
      this.setState({ NavType: 'fatnav' });
    }
  }
  render() {
    return (
      <Navbar color="inverse" inverse toggleable={'md'} fixed={'top'} className={this.state.NavType}>
        <NavbarToggler right onClick={this.props.toggleNav} />
        <Link prefetch href="/" passHref>
          <NavbarBrand>
            <img src={`/static/img/${process.env.NAVBAR_LOGO}.svg`} alt="TaleSpinners logo" />
            <span className="tale">Tale</span><span className="spinners">Spinners</span>
          </NavbarBrand>
        </Link>
        <NavPane
          user={this.props.user}
          isOpen={this.props.isOpen}
          toggle={this.props.toggleNav}
          onLogin={this.props.onLogin}
          LoginModalState={this.props.LoginModalState}
          toggleLoginModalState={this.props.toggleLoginModalState}
          toggleClickOutsideState={this.props.toggleClickOutsideState}
          ClickOutsideState={this.props.ClickOutsideState}
        />
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userame: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  fat: PropTypes.bool,
  LoginModalState: PropTypes.bool.isRequired,
  ClickOutsideState: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
  toggleLoginModalState: PropTypes.func.isRequired,
  toggleClickOutsideState: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};
TopNav.defaultProps = {
  fat: false,
};
