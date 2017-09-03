// import { Component } from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';

// export default class NSocial extends Component {
//   render() {
//     return (
//       <button className={`btn btn-social btn-${this.props.icon}`}>
//         <i className={`fa fa-2x fa-${this.props.icon}`} />
//       </button>
//     );
//   }
// }


const NSocial = props => (
  <button className={`btn btn-social btn-${props.icon}`}>
    <i className={`fa fa-2x fa-${props.icon}`} />
  </button>
);

export default NSocial;

NSocial.propTypes = {
  icon: PropTypes.string.isRequired,
};
