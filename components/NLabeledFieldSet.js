import { Component } from 'react';
import PropTypes from 'prop-types';

class NLabeledFieldSet extends Component {
  constructor(props) {
    super(props);
		this.state = {
			isReady: '',
			isActive: '',
			inputText: '',
		};
		this.onFocus = this.onFocus.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.iFocus = this.iFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
  }
	onMouseOver(e) {
		e.target.focus();
	}
	iFocus(e) {
		e.target.nextSibling.focus();
	}
	onFocus(e) {
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
		if(e.target.value === '') {
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
  render() {
    return (
			<div className="lfs">
				<i
					className={`${this.props.icon} ${this.state.isReady} ${this.state.isActive}`}
					onMouseOver={this.iFocus}
					onClick={this.iFocus}
				/>
				<input
					name={this.props.name}
					type={this.props.type}
					className={this.props.className}
					id={this.props.id}
					onFocus={this.onFocus}
					onMouseOver={this.onMouseOver}
					onBlur={this.onBlur}
					onChange={this.onChange}
					value={this.props.value}
				/>
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

export default NLabeledFieldSet;
