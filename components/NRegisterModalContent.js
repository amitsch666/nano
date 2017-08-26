import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';

import RippleButton from './RippleButton';
import NLabeledFieldSet from './NLabeledFieldSet';
import NSocial from './NSocial';

export default class NLoginModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			waiting: '',
    };
		this.toggle = this.toggle.bind(this);
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
		this.setState({ waiting: 'waiting' });
    axios.post('/api/authentication/register', {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			img: 'untouchable',
	  }).then((response) => {
				this.setState({
					firstName: '',
					lastName: '',
					username: '',
					email: '',
					password: '',
					waiting: '',
				});
				this.props.onLogin(response.data);
				this.props.toggle();
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
				this.setState({
					firstName: '',
					lastName: '',
					username: '',
					email: '',
					password: '',
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
							icon="fa fa-user"
							id="register-firstName"
							label="Your first name"
							value={this.state.firstName}
							onChange={this.onChange}
						/>
						<NLabeledFieldSet
							name="lastName"
							type="text"
							className="form-control"
							icon="fa fa-user"
							id="register-lastName"
							label="Your last name"
							value={this.state.lastName}
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
							onChange={this.onChange}
						/>
						<NLabeledFieldSet
							name="password"
							type="password"
							className="form-control"
							icon="fa fa-lock"
							id="register-password"
							label="Your password"
							value={this.state.password}
							onChange={this.onChange}
						/>
						<RippleButton
							type="submit"
							className={`btn btn-nano-success w-100 my-2 ${this.state.waiting}`}
							disabled={((this.state.username === '') || (this.state.password === ''))}
						>
							<i className="fa fa-lg fa-pencil icon-left" />
							register
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
