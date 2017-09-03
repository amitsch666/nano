import { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

class NLabeledFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: '',
      isActive: '',
      inputText: '',
      visible: null,
      type: this.props.type,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.iFocus = this.iFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  // eslint-disable-next-line class-methods-use-this
  onMouseOver(e) {
    e.target.focus();
  }
  onFocus() {
    this.setState({
      isReady: 'ready',
      isActive: 'active',
    });
  }
  onChange(e) {
    this.props.onChange(e);
    this.setState({
      inputText: e.target.value,
    });
  }
  onBlur(e) {
    if (this.props.onBlur) this.props.onBlur(e);
    if (e.target.value === '') {
      this.setState({
        isReady: '',
        isActive: '',
      });
    } else {
      this.setState({
        isActive: '',
      });
    }
  }
  onClick() {
    if (this.state.type === 'password') {
      this.setState({
        type: 'text',
      });
    } else {
      this.setState({
        type: 'password',
      });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  iFocus(e) {
    e.target.nextSibling.focus();
  }
  render() {
    return (
      <div className={`lfs ${this.props.error ? 'lfs-error' : ''}`}>
        <i
          className={`labelicon ${this.props.icon} ${this.state.isReady} ${this.state.isActive}`}
          onMouseOver={this.iFocus}
          onClick={this.iFocus}
          role="presentation"
        />
        <input
          name={this.props.name}
          type={this.state.type}
          className={`${this.props.className} ${this.props.error ? 'error' : ''} ${this.props.type === 'password' ? 'pwdinput' : ''}`}
          id={this.props.id}
          onFocus={this.onFocus}
          onMouseOver={this.onMouseOver}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={this.props.value}
        />
        {this.props.password && this.state.type === 'password' ? (
          <span>
            <i
              id="showpwd"
              className="pwdicon fa fa-eye-slash"
              onClick={this.onClick}
              role="presentation"
            />
            <UncontrolledTooltip placement="top" target="showpwd">
              Show password
            </UncontrolledTooltip>
          </span>
        ) : ('')}
        {this.props.password && this.state.type === 'text' ? (
          <span>
            <i
              id="hidepwd"
              className="pwdicon fa fa-eye"
              onClick={this.onClick}
              role="presentation"
            />
            <UncontrolledTooltip placement="top" target="hidepwd">
              Hide password
            </UncontrolledTooltip>
          </span>
        ) : ('')}
        {this.props.error ? (
          <span className="inputError">
            <i id={`${this.props.id}-error`} className="fa fa-exclamation-circle" />
            <UncontrolledTooltip placement="left" target={`${this.props.id}-error`}>
              {this.props.error}
            </UncontrolledTooltip>
          </span>
        ) : ('')}
        <label
          htmlFor={this.props.id}
          className={`${this.state.isReady}  ${this.state.isActive}`}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

NLabeledFieldSet.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.bool,
};
NLabeledFieldSet.defaultProps = {
  password: false,
};

export default NLabeledFieldSet;
