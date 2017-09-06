// import { Component } from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';

// export default class NanoSocial extends Component {
//   render() {
//     return (
//       <button className={`btn btn-social btn-${this.props.icon}`}>
//         <i className={`fa fa-2x fa-${this.props.icon}`} />
//       </button>
//     );
//   }
// }


const NanoSocial = props => (
  <button className={`btn btn-social btn-${props.icon}`}>
    <i className={`fa fa-2x fa-${props.icon}`} />
  </button>
);

export default NanoSocial;

NanoSocial.propTypes = {
  icon: PropTypes.string.isRequired,
};
