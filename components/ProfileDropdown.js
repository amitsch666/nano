import { Component } from 'react';
import PropTypes from 'prop-types';
import { NavDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import axios from 'axios';

import makeStore from '../store';

export default class ProfileDropdown extends Component {
  constructor(props) {
    super(props);
		this.toggledropdown = this.toggledropdown.bind(this);
		this.logout = this.logout.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggledropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
	logout() {
		axios.get('/api/authentication/logout')
			.then((response) => {
				this.props.onLogout(null);
			})
			.catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
	}
  render() {
    return (
      <NavDropdown className="py-1 profile-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
        <DropdownToggle nav caret>
          <img
            className="user-thumbnail"
            src={
              this.props.user.img ?
                `${process.env.PROFILE_THUMBNAIL_PATH}${this.props.user.img}.jpg`
                :
                `${process.env.PROFILE_THUMBNAIL_PATH}default/default.jpg`
            }
            alt={`${this.props.user.firstName} ${this.props.user.lastName}`}
          />
				<span className="pdname">{this.props.user.username}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="font-weight-bold text-uppercase" header>{this.props.user.firstName}</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">My Profile</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Library</DropdownItem>
          <hr className="my-0" />
					<DropdownItem className="font-weight-bold text-uppercase">Help</DropdownItem>
          <hr className="my-0" />
					<DropdownItem className="font-weight-bold text-uppercase">Settings</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase" onClick={this.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    img: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
