import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  InputGroup,
} from 'reactstrap';
import onClickOutside from 'react-onclickoutside';
const cookies = require('browser-cookies');

import Dropdown1 from './Dropdown1';
import Dropdown2 from './Dropdown2';
import ProfileDropdown from './ProfileDropdown';
import NModalLogin from './NModalLogin';

class NavPane extends Component {
  constructor(props) {
    super(props);
    this.lastX = 0;
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }
  componentDidMount() {
    this.props.toggleLoginModalState(true);
    this.props.toggleClickOutsideState(true);
  }
  toggleLoginModal() {
		if(!this.props.LoginModalState && cookies.get('token')) {
			this.props.TokenFoundOnLogin();
		} else {
			if (!this.props.LoginModalState) {
	      this.props.toggleClickOutsideState(false);
	    } else {
	      this.props.toggleClickOutsideState(true);
	    }
	    this.props.toggleLoginModalState();
		}
  }
  handleClickOutside = () => {
    if (this.props.isOpen && this.props.ClickOutsideState) {
      this.props.toggle();
    }
  }
  NavOnTouchStart = (e) => {
    this.lastX = e.touches[0].clientX;
  }
  NavOnTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    if (currentX > this.lastX + 10) {
      this.props.toggle();
    }
    this.lastX = currentX;
  }
  render() {
    return (
      <Collapse
        isOpen={this.props.isOpen}
        navbar
        delay={{ show: 0, hide: 350 }}
        onTouchStart={this.NavOnTouchStart}
        onTouchMove={this.NavOnTouchMove}
      >
        <div id="collapse-nav-head">
          <div id="collapse-nav-title" className="p-2">TaleSpinners</div>
          <Button outline color="secondary" onClick={this.props.toggle} className="m-auto">
            <span className="cross-line line-a" aria-hidden="true" />
            <span className="cross-line line-b" aria-hidden="true" />
          </Button>
        </div>
        <Nav className="ml-auto text-uppercase font-weight-bold" navbar>
          <NavItem className="px-1">
            <Form className="form-inline my-2 my-lg-0">
              <InputGroup>
                <Input
                  onMouseOver={this.focus}
                  type="text"
                  name="search"
                  id="search"
                  className="input-rounded"
                  placeholder="Search..."
                />
                <i className="fa fa-search fa-lg" />
              </InputGroup>
            </Form>
          </NavItem>
          <NavItem className="py-1">
            <NavLink href="/browse"><i className="fa fa-folder-open" />Browse</NavLink>
          </NavItem>
          <Dropdown1 />
          <Dropdown2 />
          {this.props.user ? (
            <ProfileDropdown
							user={this.props.user}
							onLogout={this.props.onLogin}
						/>
          ) : (
            <NavItem className="py-1 login loggedout" onClick={this.toggleLoginModal}>
              <NavLink>
								<i className="fa fa-user" />
							  Log In
							</NavLink>
            </NavItem>
          )}
        </Nav>
        <NModalLogin
					fade={true}
					isOpen={this.props.LoginModalState}
					toggle={this.toggleLoginModal}
					className={'someclass'}
					modalClassName={'nmodal'}
					onLogin={this.props.onLogin}
				/>
      </Collapse>
    );
  }
}

NavPane.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    img: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
  LoginModalState: PropTypes.bool.isRequired,
  ClickOutsideState: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  toggleLoginModalState: PropTypes.func.isRequired,
  toggleClickOutsideState: PropTypes.func.isRequired,
};

export default onClickOutside(NavPane);
