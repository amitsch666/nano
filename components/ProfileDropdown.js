import { Component } from 'react';
import PropTypes from 'prop-types';
import { NavDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

export default class ProfileDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggledropdown = this.toggledropdown.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggledropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    return (
      <NavDropdown className="py-1 profile-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
        <DropdownToggle nav>
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
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="font-weight-bold text-uppercase" header>{this.props.user.firstName}</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase" disabled>Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Another Action</DropdownItem>
          <hr className="my-0" />
          <DropdownItem className="font-weight-bold text-uppercase">Another Action</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userame: PropTypes.string.isRequired,
    img: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
