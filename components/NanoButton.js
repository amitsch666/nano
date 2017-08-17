import { Component } from 'react';
import { Button } from 'reactstrap';

class NanoButton extends Component {
  constructor(props) {
    super(props);
		this.onClick = this.onClick.bind(this);
  }
	onClick = (e) => {
		var circle = document.createElement('div');
		e.target.appendChild(circle);
		var d = Math.max(e.target.clientWidth, e.target.clientHeight);
		circle.style.width = circle.style.height = d + 'px';
		var rect = e.target.getBoundingClientRect();
		circle.style.left = e.clientX - rect.left -d/2 + 'px';
		circle.style.top = e.clientY - rect.top - d/2 + 'px';
		circle.classList.add('ripple');

		this.props.onClick();
	}
  render() {
    return (
      <Button
        className={this.props.className}
        type={this.props.type}
        color={this.props.color}
        size={this.props.size}
        onClick={this.onClick}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default NanoButton;
