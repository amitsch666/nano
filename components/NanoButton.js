import { Component } from 'react';
import PropTypes from 'prop-types';

class NanoButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.makeRipple(e);
    setTimeout(() => this.props.onClick(), 300);
  }
  // eslint-disable-next-line class-methods-use-this
  makeRipple(e) {
    const elements = e.target.getElementsByTagName('div');
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
    const circle = document.createElement('div');
    e.target.appendChild(circle);
    const d = Math.max(e.target.clientWidth, e.target.clientHeight);
    circle.style.width = `${d}px`;
    circle.style.height = `${d}px`;
    const rect = e.target.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left - (d / 2)}px`;
    circle.style.top = `${e.clientY - rect.top - (d / 2)}px`;
    circle.classList.add('ripple');
    // const circle = e.target.getElementsByTagName('div')[0];
    // const d = Math.max(e.target.clientWidth, e.target.clientHeight);
    // circle.style.width = `${d}px`;
    // circle.style.height = `${d}px`;
    // const rect = e.target.getBoundingClientRect();
    // circle.style.left = `${e.clientX - rect.left - (d / 2)}px`;
    // circle.style.top = `${e.clientY - rect.top - (d / 2)}px`;
  }
  render() {
    return (
      <button
        className={this.props.className}
        type={this.props.type}
        onClick={this.onClick}
      >
        {this.props.children}
        {/*<div className="ripple" />*/}
      </button>
    );
  }
}

export default NanoButton;

NanoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
