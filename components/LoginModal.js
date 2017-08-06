import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const LoginModal = props => (
  <Modal
    isOpen={props.isOpen}
    toggle={props.toggle}
    className={props.className}
    modalClassName={props.modalClassName}
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
      <button type="button" className="close" onClick={props.toggle} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <ModalBody className="py-0">
      <div className="row social-login">
        <div className="col col-xs-4 d-flex m-2 p-3 fb">
          <i className="fa fa-lg fa-facebook m-auto"></i>
        </div>
        <div className="col col-xs-4 d-flex m-2 p-3 tw">
          <i className="fa fa-lg fa-twitter m-auto"></i>
        </div>
        <div className="col col-xs-4 d-flex m-2 p-3 gg">
          <i className="fa fa-lg fa-google m-auto"></i>
        </div>
      </div>
      <div className="or row p-2">
        <p className="m-auto text-uppercase font-weight-bold">OR</p>
      </div>
      <form className="login-form">
        <div className="input-group input-group">
          <input type="text" className="form-control my-2 input-on-colorbg" id="login-userid" placeholder="Your username or email" />
          <span className="fa fa fa-user input-box-icon"></span>
        </div>
        <div className="input-group input-group">
          <input type="password" className="form-control my-2 input-on-colorbg" id="login-password" placeholder="Password" />
          <span className="fa fa fa-key input-box-icon"></span>
        </div>
        <button type="submit" className="btn btn btn-primary w-100 my-2">LOGIN</button>
      </form>
    </ModalBody>
    <ModalFooter className="pt-0">
    <div className="p-1">
      <a className="small color-unchanged p-2" href="#">Forgot password?</a>
      <a className="small color-unchanged p-2" href="#">New user?</a>
    </div>
    </ModalFooter>
  </Modal>
);

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

export default LoginModal;
