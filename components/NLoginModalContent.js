import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import RippleButton from './RippleButton';
import NLabeledFieldSet from './NLabeledFieldSet';
import NSocial from './NSocial';

import * as Validator from '../lib/validateInput';

export default class NLoginModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      waiting: '',
    };
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case 'username':
        this.setState({
          errors: {
            username: Validator.validateusernameoremail(e.target.value),
            password: this.state.errors.password,
          },
        });
        break;
      case 'password':
        this.setState({
          errors: {
            username: this.state.errors.username,
            password: Validator.validatepassword(e.target.value),
          },
        });
        break;
      default: break;
    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ waiting: 'waiting' });
    axios.post('/api/authentication/login', {
      username: this.state.username,
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
          username: '',
          password: '',
          errors: {},
          waiting: '',
        });
        this.props.onLogin(response.data);
        this.props.toggle();
      }
    }).catch((err) => {
      console.log(err.response.status); // eslint-disable-line no-console
      if (err.response.status === 401) {
        this.setState({
          errors: {
            username: 'Invalid credentials',
            password: 'Invalid credentials',
          },
          waiting: '',
        });
      } else {
        this.setState({
          waiting: '',
        });
      }
    });
  }
  toggle() {
    this.setState({
      username: '',
      password: '',
      errors: {},
      waiting: '',
    });
    this.props.toggle();
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
      this.state.username !== '' &&
      this.state.password !== '' &&
      this.state.waiting === '') return false;
    else return true; // eslint-disable-line no-else-return
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
            <div className="modal-brand-tagline text-center">Just log in and start spinning!</div>
          </div>
          <button type="button" className="close" onClick={this.props.toggle} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ModalBody className="py-0">
          <div className="row social-login px-5 py-2 d-flex justify-content-around">
            <NSocial icon="facebook" />
            <NSocial icon="twitter" />
            <NSocial icon="google" />
          </div>
          <div className="or row p-2">
            <span className="mx-auto rounded-circle">
              <p className="m-auto text-uppercase font-weight-bold">OR</p>
            </span>
          </div>

          <form className="login-form px-2 pt-3" onSubmit={this.onSubmit}>
            <NLabeledFieldSet
              name="username"
              type="text"
              className="form-control"
              icon="fa fa-user"
              id="login-userid"
              label="Your username or email"
              value={this.state.username}
              error={this.state.errors !== '' ? this.state.errors.username : null}
              onChange={this.onChange}
            />
            <NLabeledFieldSet
              password
              name="password"
              type="password"
              className="form-control"
              icon="fa fa-lock"
              id="login-password"
              label="Your password"
              value={this.state.password}
              error={this.state.errors !== '' ? this.state.errors.password : null}
              onChange={this.onChange}
            />
            <RippleButton
              type="submit"
              className={`btn btn-nano-lg btn-nano-warning w-100 my-2 ${this.state.waiting}`}
              disabled={this.toggleDisable()}
            >
              log in
              <i className="fa fa-lg fa-power-off icon-right" />
            </RippleButton>
          </form>
        </ModalBody>
        <ModalFooter className="pt-0 border-0 justify-content-center">
          <div className="p-1 small auth-footer">
            Forgot password?&nbsp;
            <a href="#recover" className="color-unchanged" onClick={e => this.toggleRegister(e, 'yes')}>Recover</a>
          </div>
          <div className="p-1 small auth-footer">|</div>
          <div className="p-1 small auth-footer">
            New user?&nbsp;
            <a href="#register" className="color-unchanged" onClick={e => this.toggleRegister(e, 'yes')}>Sign up</a>
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
  onLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
};
NLoginModalContent.defaultProps = {
  className: '',
  modalClassName: '',
};
