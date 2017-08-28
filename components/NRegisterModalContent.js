import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';

import RippleButton from './RippleButton';
import NLabeledFieldSet from './NLabeledFieldSet';
import NSocial from './NSocial';

import { validatefirstName, validatelastName, validateusername, validateemail, validatepassword } from '../lib/validateInput';

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
		this.isEmpty = this.isEmpty.bind(this);
  }
	isEmpty(obj) {
		for (let i in obj) {
      if (obj[i] !== '') return false;
    }
		return true;
	}
	toggleDisable() {
		if(this.isEmpty(this.state.errors) &&
		  this.state.firstName !== '' &&
			this.state.lastName !== '' &&
		  this.state.username !== '' &&
		  this.state.password !== '' &&
		  this.state.email !== '' &&
		  this.state.waiting === '') {
			return false;
		} else {
			return true;
		}
	}
  onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
		switch(e.target.name) {
			case 'firstName':
				this.setState({ errors:{firstName: validatefirstName(e)} });
				break;
			case 'lastName':
				this.setState({ errors: {lastName: validatelastName(e)} });
				break;
			case 'username':
				this.setState({ errors: {username: validateusername(e)} });
				break;
			case 'email':
				this.setState({ errors: {email: validateemail(e)} });
				break;
			case 'password':
				this.setState({ errors: {password: validatepassword(e)} });
				break;
			default: break;
		}
		// this.toggleDisable(e);
  }
  onSubmit(e) {
    e.preventDefault();
		this.setState({
			waiting: 'waiting',
			disabled: true,
		});
    axios.post('/api/authentication/register', {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
	  }).then((response) => {
				// this.props.onLogin(response.data);
				if(response.data.error) {
					// handle error
					console.log(response.data.error);
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
					this.props.toggle();
				}
      })
      .catch((error) => {
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
	toggle() {
		this.props.toggleRegister();
		this.props.toggle();
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
          <button type="button" className="close" onClick={this.props.toggle} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ModalBody className="py-0">
					<form className="login-form px-2 pt-3" onSubmit={this.onSubmit}>
						<NLabeledFieldSet
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
						<NLabeledFieldSet
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
						<NLabeledFieldSet
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
						<NLabeledFieldSet
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
						<NLabeledFieldSet
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
						<RippleButton
							type="submit"
							className={`btn btn-nano-success w-100 my-2 ${this.state.waiting}`}
							disabled={this.toggleDisable()}
						>
							<i className="fa fa-lg fa-pencil icon-left" />
							register
						</RippleButton>
					</form>
        </ModalBody>
        <ModalFooter className="pt-0 border-0">
          <div className="p-1">
						<a href="#" className="small color-unchanged p-2" onClick={(e) => this.toggleRegister(e, 'yes')}>Already have an account?</a>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

NLoginModalContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};
NLoginModalContent.defaultProps = {
  className: '',
  modalClassName: '',
};
