import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class NSocial extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
			<button className={`btn btn-social btn-${this.props.icon}`}>
				<i className={`fa fa-2x fa-${this.props.icon}`} />
			</button>
		);
  }
}
