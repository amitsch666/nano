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
        <div className="d-flex justify-content-center h1">
          <span className="tale">Tale</span><span className="spinners">Spinners</span>
        </div>
        <div className="modal-brand-tagline text-center lead">Just log in and start spinning...</div>
      </div>
      <button type="button" className="close" onClick={props.toggle} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <ModalBody className="pt-0">
      <div className="row social-login">
        <div className="col col-xs-4 d-flex m-2 p-4 fb">
          <i className="fa fa-lg fa-facebook m-auto"></i>
        </div>
        <div className="col col-xs-4 d-flex m-2 p-4 tw">
          <i className="fa fa-lg fa-twitter m-auto"></i>
        </div>
        <div className="col col-xs-4 d-flex m-2 p-4 gg">
          <i className="fa fa-lg fa-google m-auto"></i>
        </div>
      </div>
      <div className="or row p-2">
        <p className="m-auto text-uppercase font-weight-bold">OR</p>
      </div>
      <form className="login-form">
        <div className="input-group input-group-lg">
          <input type="text" className="form-control my-2" id="login-userid" placeholder="Your username or email" />
          <span className="fa fa-lg fa-user"></span>
        </div>
        <div className="input-group input-group-lg">
          <input type="password" className="form-control my-2" id="login-password" placeholder="Password" />
          <span className="fa fa-lg fa-key"></span>
        </div>
        <button type="submit" className="btn btn-lg btn-primary w-100 my-2">LOG IN</button>
      </form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.toggle}>Do Something</Button>{' '}
      <Button color="secondary" onClick={props.toggle}>Cancel</Button>
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
