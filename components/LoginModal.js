import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonState: 'btn btn-lg btn-primary w-100 my-2',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      buttonState: 'btn btn-lg btn-primary w-100 my-2 disabled',
    });
    axios.post('/api/authentication/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        this.setState({
          username: '',
          password: '',
          buttonState: 'btn btn-lg btn-primary w-100 my-2',
        });
        this.props.onLogin(response.data);
        this.props.toggle();
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
        modalClassName={this.props.modalClassName}
      >
        <div className="modal-header">
          <div className="modal-brand modal-title mx-auto">
            <div className="d-flex justify-content-center mb-2">
              <img src={`/static/img/${process.env.NAVBAR_LOGO}.svg`} alt="TaleSpinners logo" />
            </div>
            <div className="d-flex justify-content-center h2">
              <span className="tale">Tale</span><span className="spinners">Spinners</span>
            </div>
            <div className="modal-brand-tagline text-center">Just log in and start spinning...</div>
          </div>
          <button type="button" className="close" onClick={this.props.toggle} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ModalBody className="py-0">
          <div className="row social-login px-5 py-2">
            <span id="facebook" className="fa-stack fa-2x m-auto">
              <i className="fa fa-facebook fa-stack-1x" />
            </span>
            <span id="twitter" className="fa-stack fa-2x m-auto">
              <i className="fa fa-twitter fa-stack-1x" />
            </span>
            <span id="google" className="fa-stack fa-2x m-auto">
              <i className="fa fa-google fa-stack-1x" />
            </span>
          </div>
          <div className="or row p-2">
            <p className="m-auto text-uppercase font-weight-bold">OR</p>
          </div>
          <form className="login-form" onSubmit={this.onSubmit}>
            <div className="input-group input-group">
              <input name="username" type="text" className="form-control form-control-lg my-2 input-custom" id="login-userid" placeholder="Your username or email" value={this.state.username} onChange={this.onChange} />
              <span className="fa fa fa-user input-box-icon" />
            </div>
            <div className="input-group input-group">
              <input name="password" type="password" className="form-control form-control-lg my-2 input-custom" id="login-password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
              <span className="fa fa fa-key input-box-icon" />
            </div>
            <button type="submit" className={this.state.buttonState}>LOGIN</button>
          </form>
        </ModalBody>
        <ModalFooter className="pt-0">
          <div className="p-1">
            <Link prefetch href="/about"><a className="small color-unchanged p-2">Forgot password?</a></Link>
            <Link prefetch href="/about"><a className="small color-unchanged p-2">New user?</a></Link>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};
LoginModal.defaultProps = {
  className: '',
  modalClassName: '',
};
