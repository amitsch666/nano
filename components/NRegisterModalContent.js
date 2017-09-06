import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';

import NanoButton from './elements/NanoButton';
import NanoFieldset from './elements/NanoFieldset';

import * as Validator from '../lib/validateInput';

export default class NLoginModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      errors: {},
      waiting: '',
    };
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    const tempState = this.state.errors;
    switch (e.target.name) {
      case 'firstName':
        tempState.firstName = Validator.validatefirstName(e.target.value);
        break;
      case 'lastName':
        tempState.lastName = Validator.validatelastName(e.target.value);
        break;
      case 'username':
        tempState.username = Validator.validateusername(e.target.value);
        break;
      case 'email':
        tempState.email = Validator.validateemail(e.target.value);
        break;
      case 'password':
        tempState.password = Validator.validatepassword(e.target.value);
        break;
      default: break;
    }
    this.setState({
      errors: tempState,
    });
    // this.toggleDisable(e);
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      waiting: 'waiting',
    });
    axios.post('/api/authentication/register', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data.error) {
        // handle error
        this.setState({
          errors: response.data.error,
          waiting: '',
        });
      } else {
        this.setState({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          errors: {},
          waiting: '',
        });
        this.props.toggleRegister();
      }
    }).catch((error) => {
      console.log(error); // eslint-disable-line no-console
      this.setState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        errors: {},
        waiting: '',
      });
    });
  }
  // eslint-disable-next-line class-methods-use-this
  isEmpty(obj) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in obj) {
      if (obj[i] !== '') return false;
    }
    return true;
  }
  toggleDisable() {
    if (this.isEmpty(this.state.errors) &&
      this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.username !== '' &&
      this.state.password !== '' &&
      this.state.email !== '' &&
      this.state.waiting === '') return false;
    else return true; // eslint-disable-line no-else-return
  }
  toggle() {
    this.props.toggleRegister();
    this.props.toggle();
  }
  toggleRegister(e, val) {
    e.preventDefault();
    this.props.toggleRegister(val);
  }
  render() {
    return (
      <Modal
        fade={this.props.fade}
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={this.props.className}
        modalClassName={this.props.modalClassName}
      >
        <div className="modal-header  border-0">
          <div className="modal-brand modal-title mx-auto">
            <div className="d-flex justify-content-center mb-2">
              <img src={`/static/img/${process.env.NAVBAR_LOGO}.svg`} alt="TaleSpinners logo" />
            </div>
            <div className="d-flex justify-content-center h2">
              <span className="tale">Tale</span><span className="spinners">Spinners</span>
            </div>
            <div className="modal-brand-tagline text-center">Just sign up and start spinning!</div>
          </div>
          <button type="button" className="close" onClick={this.toggle} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ModalBody className="py-0">
          <form className="login-form px-2 pt-3" onSubmit={this.onSubmit}>
            <NanoFieldset
              name="firstName"
              type="text"
              className="form-control"
              icon="fa fa-address-book"
              id="register-firstName"
              label="Your first name"
              value={this.state.firstName}
              error={this.state.errors !== '' ? this.state.errors.firstName : null}
              onChange={this.onChange}
            />
            <NanoFieldset
              name="lastName"
              type="text"
              className="form-control"
              icon="fa fa-address-book"
              id="register-lastName"
              label="Your last name"
              value={this.state.lastName}
              error={this.state.errors !== '' ? this.state.errors.lastName : null}
              onChange={this.onChange}
            />
            <NanoFieldset
              name="username"
              type="text"
              className="form-control"
              icon="fa fa-user"
              id="register-username"
              label="Your desired username"
              value={this.state.username}
              error={this.state.errors !== '' ? this.state.errors.username : null}
              onChange={this.onChange}
            />
            <NanoFieldset
              name="email"
              type="email"
              className="form-control"
              icon="fa fa-send"
              id="register-email"
              label="Your email address"
              value={this.state.email}
              error={this.state.errors !== '' ? this.state.errors.email : null}
              onChange={this.onChange}
            />
            <NanoFieldset
              password
              name="password"
              type="password"
              className="form-control"
              icon="fa fa-lock"
              id="register-password"
              label="Your password"
              value={this.state.password}
              error={this.state.errors !== '' ? this.state.errors.password : null}
              onChange={this.onChange}
            />
            <div className="small text-justify fineprint">
              By clicking Register, you agree to our&nbsp;
              <Link prefetch href="/about">
                <a className="dotted-line color-unchanged">Terms</a>
              </Link>
              &nbsp;and confirm that you have read our&nbsp;
              <Link prefetch href="/about">
                <a className="dotted-line color-unchanged">Privacy Policy</a>
              </Link>
              &nbsp;and&nbsp;
              <Link prefetch href="/about">
                <a className="dotted-line color-unchanged">Cookie Use Policy</a>
              </Link>
              . You may receive email notifications from TaleSpinners and can opt out at any time.
            </div>
            <NanoButton
              type="submit"
              className={`btn btn-nano-lg btn-nano-warning w-100 my-2 ${this.state.waiting}`}
              disabled={this.toggleDisable()}
            >
              sign up
              <i className="fa fa-lg fa-sign-in icon-right" />
            </NanoButton>
          </form>
        </ModalBody>
        <ModalFooter className="pt-0 border-0 justify-content-center">
          <div className="p-1 small auth-footer">
            Already have an account?&nbsp;
            <a href="#login" className="color-unchanged" onClick={e => this.toggleRegister(e, null)}>Log in</a>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

NLoginModalContent.propTypes = {
  fade: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  toggleRegister: PropTypes.func.isRequired,
};
NLoginModalContent.defaultProps = {
  className: '',
  modalClassName: '',
};
