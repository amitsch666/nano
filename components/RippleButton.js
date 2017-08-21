import { Component } from 'react';
import PropTypes from 'prop-types';

class RippleButton1 extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.makeRipple(e);
		const click = this.props.onClick;
		if(click) {
			setTimeout(() => this.props.onClick(), 200);
		}
  }
  // eslint-disable-next-line class-methods-use-this
  makeRipple(e) {
    const elements = e.target.getElementsByClassName('ripple');
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
    const $ripple = document.createElement('div');
    e.target.appendChild($ripple);
    const d = Math.max(e.target.clientWidth, e.target.clientHeight);
    $ripple.style.width = `${d}px`;
    $ripple.style.height = `${d}px`;
    const rect = e.target.getBoundingClientRect();
    $ripple.style.left = `${e.clientX - rect.left - (d / 2)}px`;
    $ripple.style.top = `${e.clientY - rect.top - (d / 2)}px`;
    $ripple.classList.add('ripple');
  }
  render() {
    return (
      <button
        className={`btn-nano ${this.props.className}`}
        type={this.props.type}
        onClick={this.onClick}
				disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default RippleButton1;

RippleButton1.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
