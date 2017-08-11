import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

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
        console.log(response); // eslint-disable-line no-console
        console.log('First: ', response.data.firstName); // eslint-disable-line no-console
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
          <div className="row social-login">
            <div className="col col-xs-4 d-flex m-2 p-3 fb">
              <i className="fa fa-lg fa-facebook m-auto" />
            </div>
            <div className="col col-xs-4 d-flex m-2 p-3 tw">
              <i className="fa fa-lg fa-twitter m-auto" />
            </div>
            <div className="col col-xs-4 d-flex m-2 p-3 gg">
              <i className="fa fa-lg fa-google m-auto" />
            </div>
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
            <button type="submit" className="btn btn-lg btn-primary w-100 my-2">LOGIN</button>
          </form>
        </ModalBody>
        <ModalFooter className="pt-0">
          <div className="p-1">
            <a className="small color-unchanged p-2" href="/forgot">Forgot password?</a>
            <a className="small color-unchanged p-2" href="/signup">New user?</a>
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
};
LoginModal.defaultProps = {
  className: '',
  modalClassName: '',
};
