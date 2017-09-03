import { Component } from 'react';
import PropTypes from 'prop-types';

import NLoginModalContent from './NLoginModalContent';
import NRegisterModalContent from './NRegisterModalContent';

export default class NModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: null,
    };
    this.toggleRegister = this.toggleRegister.bind(this);
  }
  toggleRegister(val = null) {
    this.setState({
      register: val,
    });
  }
  render() {
    return (
      <div>
        {this.state.register ? (
          <NRegisterModalContent
            fade={this.props.fade}
            isOpen={this.props.isOpen}
            toggle={this.props.toggle}
            className={this.props.className}
            modalClassName={this.props.modalClassName}
            onLogin={this.props.onLogin}
            toggleRegister={this.toggleRegister}
          />
        ) : (
          <NLoginModalContent
            fade={this.props.fade}
            isOpen={this.props.isOpen}
            toggle={this.props.toggle}
            className={this.props.className}
            modalClassName={this.props.modalClassName}
            onLogin={this.props.onLogin}
            toggleRegister={this.toggleRegister}
          />
        )}
      </div>
    );
  }
}

NModalLogin.propTypes = {
  fade: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};
NModalLogin.defaultProps = {
  fade: true,
  className: '',
  modalClassName: '',
};
