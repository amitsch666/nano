import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';

import RippleButton from '../components/RippleButton';
import NLabeledFieldSet from '../components/NLabeledFieldSet';
import NSocial from '../components/NSocial';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    axios.post('/api/authentication/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
				this.setState({
					username: '',
					password: '',
				});
				this.props.onLogin(response.data);
				this.props.toggle();
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
				this.setState({
					username: '',
          password: '',
				});
      });
  }
  render() {
    return (
      <Modal
				fade={this.props.fade}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
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
							onChange={this.onChange}
						/>
						<NLabeledFieldSet
							name="password"
							type="password"
							className="form-control"
							icon="fa fa-lock"
							id="login-password"
							label="Your password"
							value={this.state.password}
							onChange={this.onChange}
						/>
						<RippleButton
							type="submit"
							className="btn btn-nano-success w-100 my-2"
							disabled={((this.state.username === '') || (this.state.password === ''))}
						>
							LOGIN
							<i className="fa fa-lg fa-sign-in icon-right" />
						</RippleButton>
					</form>
        </ModalBody>
        <ModalFooter className="pt-0 border-0">
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
